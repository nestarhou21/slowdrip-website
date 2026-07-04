import Link from 'next/link';

const COLUMNS = [
  {
    heading: 'Information',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Menu', href: '/menu' },
      { label: 'Our Story', href: '/about' },
    ],
  },
  {
    heading: 'Experience',
    links: [
      { label: 'Campaigns', href: '/campaign' },
      { label: 'Songkran', href: '/songkran' },
      { label: 'Reels', href: '/reels' },
      { label: 'The Outdoor Shoot', href: '/photoshoot' },
      { label: 'Membership', href: '/membership' },
      { label: 'Spin the Wheel', href: '/spin' },
    ],
  },
  {
    heading: 'Terms of Use',
    links: [
      { label: 'Website Terms', href: '/terms' },
      { label: 'Rewards & Privacy', href: '/terms' },
    ],
  },
  {
    heading: 'About Us',
    links: [
      { label: 'About Slow Drip', href: '/about' },
      {
        label: 'Google Map',
        href: 'https://www.google.com/maps/search/?api=1&query=SLOW+DRIP+cafe+and+eatery+Phnom+Penh',
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#EFE9DB] py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 text-center">
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading} className="space-y-6 flex flex-col items-center">
              <h4 className="text-sm font-bold text-[#1A4B75] uppercase tracking-[0.2em]">
                {heading}
              </h4>
              <ul className="space-y-3 text-center">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#1A4B75] border-b border-[#1A4B75]/30 hover:border-[#1A4B75] transition-all"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm font-medium text-[#1A4B75] border-b border-[#1A4B75]/30 hover:border-[#1A4B75] transition-all"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-[#1A4B75]/10 text-center space-y-4">
          <Link
            href="/terms"
            className="inline-block text-sm font-bold text-[#1A4B75] uppercase tracking-[0.2em] hover:text-[#D97D54] transition-colors"
          >
            Privacy Policy
          </Link>
          <p className="text-[10px] md:text-xs font-medium text-[#1A4B75]/60 uppercase tracking-widest">
            All rights reserved. © 2026 - Slowdrip Cafe & Eatery
          </p>
        </div>
      </div>
    </footer>
  );
}
