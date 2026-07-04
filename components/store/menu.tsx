'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, X, Plus, Coffee } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import type { MenuItem } from '@/types/menu';

function parsePrice(p: string) {
  return parseFloat(p.replace('$', ''));
}

function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<'M' | 'L'>('M');

  const price = size === 'L' && item.priceL ? parsePrice(item.priceL) : parsePrice(item.priceM);

  function handleAdd() {
    addItem({
      menuItemId: item.id,
      name: item.name,
      size,
      price,
      image: item.image,
    });
  }

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-[#FAF9F6] overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover p-3 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Coffee className="w-10 h-10 text-[#1A4B75]/15" />
          </div>
        )}
        <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-[#1A4B75]/80 text-white px-1.5 py-0.5 rounded-sm">
          {item.category}
        </span>
      </div>

      {/* Info + actions */}
      <div className="flex flex-col flex-1 bg-[#1A4B75] px-3 py-2.5 gap-2">
        <div className="flex-1">
          <h3 className="text-[11px] font-bold text-white leading-tight">{item.name}</h3>
          {item.description && (
            <p className="text-[9px] text-white/55 leading-snug mt-0.5">{item.description}</p>
          )}
        </div>

        {/* Size selector — single price when the item has no L size */}
        {item.priceL ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSize('M')}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-sm transition-all ${
                size === 'M'
                  ? 'bg-white text-[#1A4B75]'
                  : 'text-white/60 border border-white/20 hover:border-white/50'
              }`}
            >
              M {item.priceM}
            </button>
            <button
              onClick={() => setSize('L')}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-sm transition-all ${
                size === 'L'
                  ? 'bg-white text-[#1A4B75]'
                  : 'text-white/60 border border-white/20 hover:border-white/50'
              }`}
            >
              L {item.priceL}
            </button>
          </div>
        ) : (
          <p className="text-[10px] font-bold text-white">{item.priceM}</p>
        )}

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-1 w-full py-1.5 bg-white/10 hover:bg-white hover:text-[#1A4B75] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all duration-200"
        >
          <Plus className="w-3 h-3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export function Menu({ items }: { items: MenuItem[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  // Category tabs are built from the data, so new POS categories
  // (e.g. Food) appear automatically.
  const filters = useMemo(() => {
    const cats = Array.from(new Set(items.map(i => i.category)));
    return ['All', ...cats];
  }, [items]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    items.forEach(i => { c[i.category] = (c[i.category] ?? 0) + 1; });
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(item => {
      const matchCat  = activeFilter === 'All' || item.category === activeFilter;
      const matchText = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [items, activeFilter, search]);

  return (
    <div>
      {/* Search + filter bar */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search menu…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#1A4B75] transition-colors bg-gray-50"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex items-center border border-gray-200 rounded-sm p-0.5 gap-0.5 bg-gray-50 overflow-x-auto flex-shrink-0">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap rounded-sm transition-all ${
                  activeFilter === f ? 'bg-[#1A4B75] text-white' : 'text-gray-400 hover:text-[#1A4B75]'
                }`}
              >
                {f} <span className="opacity-50">({counts[f] ?? 0})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {search && (
          <p className="text-xs text-gray-400 mb-5 uppercase tracking-widest">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-base font-medium">No items match &ldquo;{search}&rdquo;</p>
            <button onClick={() => setSearch('')} className="mt-3 text-xs text-[#1A4B75] underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
