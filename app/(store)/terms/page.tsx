import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use · Slow Drip',
  description: 'Website and account terms for Slow Drip cafe and eatery.',
};

const SECTIONS = [
  {
    title: 'Website terms',
    body: 'This website is provided by Slow Drip cafe and eatery for browsing our menu, placing orders, and learning about our promotions. Content, images, and branding on this site belong to Slow Drip and may not be reused without permission. Menu items, prices, and promotions may change without notice.',
  },
  {
    title: 'Orders & payment',
    body: 'Orders placed through this website are confirmed once you receive an order confirmation. Prices shown are in USD. If an item becomes unavailable after you order, we will contact you to arrange a replacement or refund.',
  },
  {
    title: 'Rewards & promotions',
    body: 'Loyalty stamps, wheel spins, and promotional rewards are redeemable in store only, cannot be exchanged for cash, and may be limited to one per customer per visit. Slow Drip reserves the right to adjust or end promotions at any time.',
  },
  {
    title: 'Privacy',
    body: 'We only collect the information needed to fulfill your order, such as your name and contact details. We never sell your information to third parties.',
  },
];

export default function TermsPage() {
  return (
    <main className="pt-20">
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A4B75]/50 mb-3">
            The Fine Print
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A4B75] leading-tight">
            Terms of use.
          </h1>

          <div className="mt-12 flex flex-col gap-10">
            {SECTIONS.map(({ title, body }) => (
              <div key={title} className="border-t border-gray-100 pt-8">
                <h2 className="text-lg font-semibold text-[#1A4B75]">{title}</h2>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-3">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
