import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notoKhmer } from '@/lib/fonts';
import { KNY_DAYS } from '@/lib/kny-data';

export const metadata: Metadata = {
  title: 'Songkran · Slow Drip',
  description:
    'Slow Drip celebrates Khmer New Year (Choul Chnam Thmey) with a limited edition Songkran campaign inspired by the colors, flavors, and traditions of the festival.',
};

const VIDEOS = [
  { src: '/asset/kny/kny-campaign.mp4', poster: '/asset/kny/kny-campaign-poster.jpg', title: 'The Campaign Film' },
  { src: '/asset/kny/kny-campaign-2.mp4', poster: '/asset/kny/kny-campaign-2-poster.jpg', title: 'Behind the Drinks' },
  { src: '/asset/kny/kny-campagin-3.mp4', poster: '/asset/kny/kny-campagin-3-poster.jpg', title: 'Festival Moments' },
];

const PHOTOS = [
  { src: '/asset/kny/kny-campaign2.jpg', alt: 'Slow Drip Songkran limited edition drinks' },
  { src: '/asset/kny/kny-campaign.jpg', alt: 'Songkran campaign at Slow Drip' },
  { src: '/asset/kny/kny-campaign3.jpg', alt: 'Festival styling at Slow Drip' },
];

export default function SongkranPage() {
  return (
    <main className="pt-16">

      {/* Hero */}
      <section className="w-full bg-[#FAF6EC] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A4B75] mb-5">
            Seasonal Campaign
          </p>
          <p className={`${notoKhmer.className} text-5xl md:text-7xl font-bold text-[#1A4B75] leading-snug`}>
            សួស្តីឆ្នាំថ្មី
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A4B75] leading-tight mt-4">
            Songkran at Slow Drip.
          </h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto mt-6">
            Khmer New Year (Choul Chnam Thmey) marks the traditional Cambodian New Year and the
            end of the harvest season. It is a time to reconnect with family, celebrate
            tradition, and welcome fresh beginnings through joyful gatherings, shared meals,
            and cherished customs.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-[#1A4B75]" aria-hidden>
            <span>✦</span><span className="h-px w-16 bg-[#1A4B75]/30" /><span>✦</span>
            <span className="h-px w-16 bg-[#1A4B75]/30" /><span>✦</span>
          </div>
        </div>
      </section>

      {/* The three days */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A4B75] mb-3">
              Three Days of Celebration
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A4B75] leading-tight">
              The heart of the festival.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {KNY_DAYS.map(({ icon, title, khmer, chip, desc, tint, chipTint, circle }) => (
              <div key={title} className={`rounded-2xl ${tint} p-7 flex flex-col items-start gap-4`}>
                <span className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl ${circle}`}>
                  {icon}
                </span>
                <div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${chipTint}`}>
                    {chip}
                  </span>
                  <h3 className="text-xl font-bold text-[#1A4B75] mt-3">{title}</h3>
                  <p className={`${notoKhmer.className} text-base font-semibold text-[#1A4B75]/80 mt-1`}>
                    {khmer}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-3">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign story + photos */}
      <section className="w-full bg-[#FAF6EC] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A4B75] mb-3">
                The Collection
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1A4B75] leading-tight">
                Made for the festival.
              </h2>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-5">
                For our Khmer New Year seasonal campaign, SlowDrip celebrated the spirit of the
                festival with a limited edition collection inspired by its vibrant colors,
                refreshing flavors, and warm traditions. Crafted to be enjoyed and shared, each
                drink reflected the joy of celebrating Cambodia&rsquo;s most cherished holiday.
              </p>
              <Link
                href="/menu"
                className="mt-8 inline-block rounded-lg bg-[#1A4B75] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#153d5f] transition-colors"
              >
                See our menu
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
                <Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
              </div>
              {PHOTOS.slice(1).map(({ src, alt }) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                  <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 45vw, 275px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Campaign films */}
      <section className="w-full bg-[#1A4B75] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-3">
              Songkran Films
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Watch the celebration.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {VIDEOS.map(({ src, poster, title }) => (
              <div key={src} className="flex flex-col gap-3">
                <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black/30">
                  <video
                    src={src}
                    poster={poster}
                    controls
                    playsInline
                    preload="none"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-white text-center">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="w-full bg-[#FAF6EC] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className={`${notoKhmer.className} text-2xl md:text-3xl font-bold text-[#1A4B75]`}>
            រីករាយបុណ្យចូលឆ្នាំថ្មី
          </p>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-4">
            Choul Chnam Thmey brings us together. Thank you for being part of our celebrations.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-lg border border-[#1A4B75]/30 px-8 py-3.5 text-sm font-semibold text-[#1A4B75] hover:border-[#1A4B75] transition-colors"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
