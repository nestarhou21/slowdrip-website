'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#1A4B75]" />
            <h2 className="font-semibold text-[#1A4B75] text-sm uppercase tracking-widest">
              Cart {count > 0 && <span className="text-gray-400">({count})</span>}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
              <ShoppingBag className="w-10 h-10 text-gray-200" />
              <p className="text-sm font-medium text-gray-400">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-xs text-[#1A4B75] underline underline-offset-2 mt-1"
              >
                Browse the menu
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.cartId} className="flex gap-3 items-start">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1A4B75] leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Size {item.size}</p>
                  <p className="text-xs font-bold text-[#1A4B75] mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="flex items-center gap-1 border border-gray-200 rounded-sm">
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="px-1.5 py-1 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-2.5 h-2.5 text-gray-500" />
                    </button>
                    <span className="text-xs font-semibold w-5 text-center text-[#1A4B75]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="px-1.5 py-1 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Total</span>
              <span className="text-base font-bold text-[#1A4B75]">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-3 bg-[#1A4B75] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#1A4B75]/90 transition-colors rounded-sm text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
