'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, ShoppingBag, User, PartyPopper, Minus, Plus, X, Banknote, Bike, MapPin, Send } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

type Step = 'review' | 'details' | 'confirmation';

type SweetnessOption = '0%' | '25%' | '50%' | '75%' | '100%';
type PickupType = 'dine-in' | 'takeaway' | 'delivery';

const SWEETNESS: SweetnessOption[] = ['0%', '25%', '50%', '75%', '100%'];
const SWEETNESS_LABELS: Record<SweetnessOption, string> = {
  '0%': 'No Sugar',
  '25%': 'Less Sweet',
  '50%': 'Medium',
  '75%': 'Regular',
  '100%': 'Extra Sweet',
};

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'review',       label: 'Your Drinks', icon: <ShoppingBag className="w-4 h-4" /> },
  { key: 'details',      label: 'Your Details', icon: <User className="w-4 h-4" /> },
  { key: 'confirmation', label: 'Done',         icon: <Check className="w-4 h-4" /> },
];

function generateOrderId() {
  return 'SD' + Date.now().toString(36).toUpperCase();
}

function isValidPhone(phone: string) {
  return phone.replace(/\D/g, '').length >= 8;
}

export function CheckoutFlow() {
  const router = useRouter();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>('review');
  const [orderId] = useState(generateOrderId);
  // Order number assigned by the POS backend (shown on confirmation)
  const [posOrderNumber, setPosOrderNumber] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    pickupType: 'dine-in' as PickupType,
    address: '',
    telegram: '',
    sweetness: '50%' as SweetnessOption,
    notes: '',
  });

  const stepIndex = STEPS.findIndex(s => s.key === step);
  // Delivery orders cannot be placed without somewhere to deliver to.
  const canPlaceOrder =
    isValidPhone(form.phone) &&
    (form.pickupType !== 'delivery' || form.address.trim().length >= 6);

  function set(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function placeOrder() {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          items: items.map(({ menuItemId, name, size, price, quantity }) => ({
            menuItemId, name, size, price, quantity,
          })),
          customerName: form.name,
          phone: form.phone,
          pickupType: form.pickupType,
          address: form.address,
          telegram: form.telegram,
          sweetness: form.sweetness,
          notes: form.notes,
          total,
        }),
      });
      if (!res.ok) throw new Error('Failed to place order');
      const data = await res.json().catch(() => null);
      if (data?.orderId) setPosOrderNumber(data.orderId);
      clearCart();
      setStep('confirmation');
    } catch {
      setError('Something went wrong. Please try again or contact staff.');
    } finally {
      setSubmitting(false);
    }
  }

  // Redirect if cart is empty and not on confirmation
  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
        <ShoppingBag className="w-12 h-12 text-gray-200" />
        <p className="text-gray-500 font-medium">Your cart is empty.</p>
        <Link
          href="/menu"
          className="px-8 py-3 bg-[#1A4B75] text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#1A4B75]/90 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-10 px-4">
      <div className="max-w-xl mx-auto">

        {/* Step indicator */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-between mb-10">
            {STEPS.slice(0, 3).map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className={`flex items-center gap-2 ${i <= stepIndex ? 'text-[#1A4B75]' : 'text-gray-300'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    i < stepIndex
                      ? 'bg-[#1A4B75] border-[#1A4B75] text-white'
                      : i === stepIndex
                        ? 'border-[#1A4B75] text-[#1A4B75] bg-white'
                        : 'border-gray-200 text-gray-300 bg-white'
                  }`}>
                    {i < stepIndex ? <Check className="w-4 h-4" /> : s.icon}
                  </div>
                  <span className="hidden sm:block text-xs font-semibold uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`h-px w-8 sm:w-16 mx-2 transition-all ${i < stepIndex ? 'bg-[#1A4B75]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Step 1: Review ── */}
        {step === 'review' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#1A4B75]">Review Your Order</h1>

            <div className="bg-white rounded-sm border border-gray-100 divide-y divide-gray-50">
              {items.map(item => (
                <div key={item.cartId} className="flex items-center gap-4 p-4">
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-sm overflow-hidden bg-gray-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1A4B75] truncate">{item.name}</p>
                    <p className="text-[11px] text-gray-400">Size {item.size}</p>
                    <p className="text-xs font-bold text-[#1A4B75] mt-0.5">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-gray-400" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center text-[#1A4B75]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="text-gray-300 hover:text-red-400 transition-colors p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-[#1A4B75]">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setStep('details')}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1A4B75] text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#1A4B75]/90 transition-colors"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Step 2: Details ── */}
        {step === 'details' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#1A4B75]">Order Details</h1>

            <div className="bg-white rounded-sm border border-gray-100 p-5 space-y-5">

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="+855 12 345 678"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1A4B75] transition-colors"
                />
                <p className="text-[10px] text-gray-400">So we can reach you if there&apos;s an issue with your order.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Your Name <span className="text-gray-300 normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="e.g. Sophea"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1A4B75] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['dine-in', 'takeaway', 'delivery'] as PickupType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => set('pickupType', type)}
                      className={`py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm border transition-all ${
                        form.pickupType === type
                          ? 'bg-[#1A4B75] text-white border-[#1A4B75]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A4B75]/40'
                      }`}
                    >
                      {type === 'dine-in' ? 'Dine In' : type === 'takeaway' ? 'Takeaway' : 'Delivery'}
                    </button>
                  ))}
                </div>

              {/* Delivery: location is required, and we reach them on Telegram */}
              {form.pickupType === 'delivery' && (
                <div className="space-y-4 rounded-sm border border-[#1A4B75]/20 bg-[#1A4B75]/[0.03] p-4">
                  <div className="flex items-start gap-2.5">
                    <Send className="w-4 h-4 text-[#1A4B75] shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Our team will message you on <span className="font-semibold text-[#1A4B75]">Telegram</span> to
                      confirm your delivery time and any delivery fee before we set off.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> Delivery Location <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={form.address}
                      onChange={e => set('address', e.target.value)}
                      placeholder="Street, house number, building, floor &mdash; and any landmark that helps us find you"
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1A4B75] transition-colors resize-none"
                    />
                    <p className="text-[10px] text-gray-400">You can also share a Google Maps or Telegram location link.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                      Telegram Username <span className="text-gray-300 normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.telegram}
                      onChange={e => set('telegram', e.target.value)}
                      placeholder="@yourname"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1A4B75] transition-colors"
                    />
                    <p className="text-[10px] text-gray-400">Leave empty and we&apos;ll reach you on the phone number above.</p>
                  </div>
                </div>
              )}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {SWEETNESS.map(level => (
                    <button
                      key={level}
                      onClick={() => set('sweetness', level)}
                      className={`flex flex-col items-center py-2 rounded-sm border text-center transition-all ${
                        form.sweetness === level
                          ? 'bg-[#1A4B75] text-white border-[#1A4B75]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A4B75]/40'
                      }`}
                    >
                      <span className="text-[11px] font-bold">{level}</span>
                      <span className={`text-[9px] leading-tight mt-0.5 ${form.sweetness === level ? 'text-white/70' : 'text-gray-400'}`}>
                        {SWEETNESS_LABELS[level]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Special Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  placeholder="Less ice, extra shot, allergies, etc."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1A4B75] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Cash only — no online payment step */}
            <div className="flex items-start gap-3 rounded-sm border border-emerald-200 bg-emerald-50/60 p-4">
              <Banknote className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-900">
                  {form.pickupType === 'delivery' ? 'Cash on Delivery' : 'Pay When You Collect'}
                </p>
                <p className="text-xs text-emerald-800/80 mt-0.5 leading-relaxed">
                  {form.pickupType === 'delivery'
                    ? 'No payment needed now — simply pay our rider in cash when your order arrives.'
                    : 'No payment needed now — just pay at the counter when you pick up your drinks.'}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total</span>
              <span className="text-xl font-bold text-[#1A4B75]">${total.toFixed(2)}</span>
            </div>

            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('review')}
                className="flex-none px-6 py-3.5 border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => { if (canPlaceOrder) placeOrder(); }}
                disabled={!canPlaceOrder || submitting}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#1A4B75] text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#1A4B75]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? 'Placing Order…' : <>Place Order <ChevronRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        )}

        {/* ── Confirmation ── */}
        {step === 'confirmation' && (
          <div className="flex flex-col items-center text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1A4B75] flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1A4B75]">Order Placed!</h1>
              <p className="text-sm text-gray-500 mt-2">
                Thank you, {form.name || 'friend'}. Your order is confirmed.
              </p>
            </div>

            <div className="w-full max-w-sm bg-white border border-gray-100 rounded-sm p-5 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order Number</span>
                <span className="font-mono font-bold text-[#1A4B75]">{posOrderNumber ?? orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <span className="font-semibold text-[#1A4B75]">
                  {form.pickupType === 'dine-in' ? 'Dine In' : form.pickupType === 'takeaway' ? 'Takeaway' : 'Delivery'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment</span>
                <span className="font-semibold text-[#1A4B75]">
                  {form.pickupType === 'delivery' ? 'Cash on Delivery' : 'Cash on Pickup'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sweetness</span>
                <span className="font-semibold text-[#1A4B75]">{form.sweetness}</span>
              </div>
            </div>

            {form.pickupType === 'delivery' ? (
              <div className="w-full max-w-sm rounded-sm border border-[#1A4B75]/20 bg-[#1A4B75]/[0.03] p-4 space-y-2 text-left">
                <p className="text-xs font-bold text-[#1A4B75] flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5" /> Delivering to
                </p>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{form.address}</p>
                <p className="text-xs text-gray-500 leading-relaxed pt-1 border-t border-[#1A4B75]/10">
                  We&apos;ll message you on Telegram shortly to confirm the delivery time and fee.
                  Please have cash ready for the rider.
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Show this screen to our staff, or quote your order number. Pay at the counter when you collect &mdash;
                we&apos;ll have it ready shortly.
              </p>
            )}

            <Link
              href="/menu"
              className="px-10 py-3 bg-[#1A4B75] text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#1A4B75]/90 transition-colors"
            >
              Back to Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
