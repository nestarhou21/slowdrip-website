import { Menu } from '@/components/store/menu';
import { getMenuItems } from '@/lib/menu-api';

export const metadata = {
  title: 'Menu · Slow Drip Cafe & Eatery',
  description: 'Browse our full menu of coffees, matchas, teas and more. Order online for pickup or at the counter.',
};

export default async function MenuPage() {
  const items = await getMenuItems();
  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <section id="menu" className="min-h-screen bg-[#FAF9F6]">
      {/* Page header */}
      <div className="bg-[#1A4B75] py-14 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-widest">
          Our Menu
        </h1>
        <p className="mt-3 text-white/60 text-xs uppercase tracking-widest">
          {items.length} items · {categories.join(' · ')}
        </p>
      </div>

      <Menu items={items} />
    </section>
  );
}
