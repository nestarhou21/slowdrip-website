import { NextRequest, NextResponse } from 'next/server';
import { notifyNewOrder } from '@/lib/telegram';
import type { Order } from '@/types/order';

const POS_API_URL = process.env.POS_API_URL ?? 'http://localhost:8000/api';

// A cold Render instance can take ~30s to wake; beyond that the customer is
// better served by an error they can retry than by a spinner.
const POS_TIMEOUT_MS = 30_000;

export const maxDuration = 45;

export async function GET(req: NextRequest) {
  // Order status lookup by order number, e.g. /api/orders?number=WEB-ABC123
  const number = req.nextUrl.searchParams.get('number');
  if (!number) {
    return NextResponse.json({ orders: [] });
  }
  try {
    const res = await fetch(`${POS_API_URL}/public/orders/${encodeURIComponent(number)}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(POS_TIMEOUT_MS),
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    const json = await res.json();
    return NextResponse.json({ order: json.data });
  } catch {
    return NextResponse.json({ error: 'Order service unavailable' }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerName, phone, pickupType, address, telegram, sweetness, notes, total, orderId } = body;

    if (!items?.length || !phone || !total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isDelivery = pickupType === 'delivery';
    if (isDelivery && !address?.trim()) {
      return NextResponse.json({ error: 'A delivery address is required' }, { status: 400 });
    }

    // Forward to the Slow Drip POS backend so the order shows up
    // in the admin portal as a new online order.
    const posNotes = [
      sweetness ? `Sweetness: ${sweetness}` : null,
      isDelivery ? `DELIVERY to: ${address.trim()}` : null,
      isDelivery && telegram?.trim() ? `Telegram: ${telegram.trim()}` : null,
      notes || null,
      orderId ? `Web ref: ${orderId}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    let posOrder: { id: string; order_number: string } | null = null;
    try {
      const posRes = await fetch(`${POS_API_URL}/public/orders`, {
        method: 'POST',
        signal: AbortSignal.timeout(POS_TIMEOUT_MS),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          customer_name: customerName || null,
          customer_phone: phone,
          order_type: isDelivery ? 'delivery' : pickupType === 'takeaway' ? 'takeaway' : 'dine_in',
          delivery_address: isDelivery ? address.trim() : null,
          notes: posNotes || null,
          items: items.map((i: { name: string; size?: string; price: number; quantity: number }) => ({
            name: i.name,
            size: i.size ?? null,
            quantity: i.quantity,
            unit_price: i.price,
            customisation: null,
          })),
        }),
      });

      if (!posRes.ok) {
        const errBody = await posRes.text().catch(() => '');
        console.error('POS order creation failed:', posRes.status, errBody);
        return NextResponse.json(
          { error: 'Could not reach the store. Please try again in a moment.' },
          { status: 502 }
        );
      }

      const posJson = await posRes.json();
      posOrder = posJson.data;
    } catch (err) {
      console.error('POS backend unreachable:', err);
      return NextResponse.json(
        { error: 'Could not reach the store. Please try again in a moment.' },
        { status: 502 }
      );
    }

    const order: Order = {
      id: posOrder?.order_number ?? orderId ?? `SD${Date.now().toString(36).toUpperCase()}`,
      items,
      status: 'pending',
      total,
      createdAt: new Date(),
      customerName,
      phone,
      pickupType,
      address: isDelivery ? address.trim() : undefined,
      telegram: isDelivery ? telegram?.trim() || undefined : undefined,
      sweetness,
      notes,
    };

    // Fire Telegram notification (non-blocking — don't fail the order if it errors)
    notifyNewOrder(order).catch((err) => {
      console.error('Telegram notification failed:', err);
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (err) {
    console.error('Order creation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
