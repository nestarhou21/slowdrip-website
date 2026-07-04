import { CartProvider } from '@/contexts/cart-context';
import { CartDrawer } from '@/components/store/cart-drawer';
import { Header } from '@/components/store/header';
import { Footer } from '@/components/store/footer';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
