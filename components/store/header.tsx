'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  {
    label: 'Campaign',
    href: '/campaign',
    children: [
      { label: 'Songkran', href: '/songkran' },
      { label: 'Photoshoot', href: '/photoshoot' },
      { label: 'Reels', href: '/reels' },
    ],
  },
  {
    label: 'Membership',
    href: '/membership',
    children: [
      { label: 'Loyalty Card', href: '/membership' },
      { label: 'Spin the Wheel', href: '/spin' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about' },
      { label: 'Contact', href: '/about#location' },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-28 md:h-36 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 ml-3 md:ml-8">
          <Image src="/asset/Logo/black_logo.png" alt="Slow Drip — cafe and eatery" width={220} height={48} className="h-24 md:h-32 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link =>
            link.children ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-[#1A4B75] transition-colors py-5"
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                {/* Dropdown */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="min-w-44 rounded-xl bg-white shadow-xl border border-gray-100 py-2">
                    {link.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-[#1A4B75] hover:bg-[#FAF6EC] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-[#1A4B75] transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 text-[#1A4B75]" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1A4B75] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-[#1A4B75]" />
              : <Menu className="w-5 h-5 text-[#1A4B75]" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 pb-5">
          <nav className="flex flex-col pt-2">
            {NAV_LINKS.map(link => (
              <div key={link.href} className="border-b border-gray-50 last:border-0">
                <Link
                  href={link.href}
                  onClick={closeMobile}
                  className="block py-3 text-sm font-semibold uppercase tracking-widest text-gray-500 hover:text-[#1A4B75] transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pb-3 pl-4 flex flex-col gap-0.5">
                    {link.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMobile}
                        className="flex items-center gap-2 py-2 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-[#1A4B75] transition-colors"
                      >
                        <span className="h-px w-3 bg-gray-300" aria-hidden />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
