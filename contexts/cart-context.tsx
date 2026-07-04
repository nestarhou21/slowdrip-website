'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CartItem {
  cartId: string;
  menuItemId: number;
  name: string;
  size: 'M' | 'L';
  price: number;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cartId' | 'quantity'>) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, 'cartId' | 'quantity'>) => {
    setItems(prev => {
      const idx = prev.findIndex(
        i => i.menuItemId === item.menuItemId && i.size === item.size
      );
      if (idx >= 0) {
        return prev.map((i, n) => n === idx ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, cartId: `${item.menuItemId}-${item.size}-${Date.now()}`, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.cartId !== cartId));
    } else {
      setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      total, count, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
