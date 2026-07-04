import type { Order } from '@/types/order';

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function sendMessage(chatId: string, text: string) {
  const res = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  return res.json();
}

export async function notifyNewOrder(order: Order) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) return;

  const lines = order.items.map(
    (i) => `  • ${i.name} (${i.size}) ×${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`
  );

  const message = [
    `🛎 <b>New Order #${order.id}</b>`,
    '',
    `<b>Customer:</b> ${order.customerName ?? 'Unknown'}`,
    order.phone ? `<b>Phone:</b> ${order.phone}` : '',
    `<b>Pickup:</b> ${order.pickupType === 'dine-in' ? 'Dine-in' : 'Takeaway'}`,
    order.sweetness ? `<b>Sweetness:</b> ${order.sweetness}` : '',
    '',
    '<b>Items:</b>',
    ...lines,
    '',
    `<b>Total: $${order.total.toFixed(2)}</b>`,
    order.notes ? `\n<b>Notes:</b> ${order.notes}` : '',
  ]
    .filter((l) => l !== undefined && l !== null)
    .join('\n');

  return sendMessage(chatId, message);
}
