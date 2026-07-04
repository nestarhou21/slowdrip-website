export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderItem {
  menuItemId: number;
  name: string;
  size: 'M' | 'L';
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
  customerName?: string;
  phone?: string;
  pickupType?: 'dine-in' | 'takeaway';
  sweetness?: string;
  notes?: string;
  telegramChatId?: string;
}
