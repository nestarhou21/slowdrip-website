import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/store/section-heading';
import { notoKhmer } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Campaigns · Slow Drip',
  description:
    'Everything Slow Drip is pouring right now: the Songkran seasonal campaign, the outdoor photoshoot, and our reels.',
};

const CAMPAIGNS = [
  {
    href: '/songkran',
    title: 'Songkran',
    khmer: 'សួស្តីឆ្នាំថ្មី',
    desc: 'Our Khmer New Year campaign: a limited edition collection inspired by the colors and traditions of Choul Chnam Thmey.',
    image: '/asset/kny/kny-campaign2.jpg',
    cta: 'Explore the campaign',
  },
  {
    href: '/photoshoot',
    title: 'The Outdoor Shoot',
    desc: 'The whole menu photographed outside: picnic blankets, golden light, and drinks the way they were meant to be enjoyed.',
    image: '/asset/photoshoot_outdoor/strawberryamericano.jpg',
    cta: 'See the full shoot',
  },
  {
    href: '/reels',
    title: 'Slow Drip Reels',
    desc: 'Little films from behind the bar, from matcha pours to festival moments. Tap in and watch.',
    image: '/asset/video/teaser-drink-poster.jpg',
    cta: 'Watch the reels',
  },
];

export default function CampaignPage() {
  return (
    <main className="pt-16">
      <section className="w-full bg-[#FAF6EC] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            center
            eyebrow="Slow Drip Campaigns"
            title="Stories we're pouring."
            sub="Seasonal campaigns, photo stories, and films from the bar. Pick one and dive in."
          />
        </div>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16 md:gap-24">
          {CAMPAIGNS.map(({ href, title, khmer, desc, image, cta }, i) => (
            <div
              key={href}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              <Link
                href={href}
                className={`relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-lg group ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                {khmer && (
                  <p className={`${notoKhmer.className} text-2xl font-bold text-[#1A4B75]/70 mb-2`}>{khmer}</p>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A4B75] leading-tight">
                  {title}
                </h2>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-4 max-w-md">
                  {desc}
                </p>
                <Link
                  href={href}
                  className="mt-7 inline-block rounded-lg bg-[#1A4B75] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#153d5f] transition-colors"
                >
                  {cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
