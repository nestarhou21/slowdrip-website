'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/store/section-heading';
import { MarqueeRow } from '@/components/store/photoshoot-gallery';
import { PHOTOS_ROW_ONE } from '@/lib/photoshoot-data';
import { notoKhmer } from '@/lib/fonts';
import { PRIZES, WHEEL_GRADIENT } from '@/lib/spin-data';

const BUTTON_PRIMARY =
  'inline-block rounded-lg bg-[#1A4B75] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#153d5f] transition-colors';
const BUTTON_LIGHT =
  'inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#1A4B75] hover:bg-white/90 transition-colors';

/** Homepage summary of the outdoor photoshoot → /photoshoot */
export function PhotoshootTeaser() {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <SectionHeading
          center
          eyebrow="The Outdoor Shoot"
          title="Drinks that love daylight."
        />
      </div>
      <MarqueeRow images={PHOTOS_ROW_ONE} direction="left" />
      <div className="text-center mt-10">
        <Link href="/photoshoot" className={BUTTON_PRIMARY}>
          See the full shoot
        </Link>
      </div>
    </section>
  );
}

/** Homepage summary of the Khmer New Year campaign → /songkran */
export function KnyTeaser() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A4B75] mb-3">
              Seasonal Campaign
            </p>
            <p className={`${notoKhmer.className} text-4xl md:text-5xl font-bold text-[#1A4B75] leading-snug`}>
              សួស្តីឆ្នាំថ្មី
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A4B75] leading-tight mt-3">
              Celebrating<br />Khmer New Year.
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-5 max-w-md">
              For Choul Chnam Thmey we dressed Slow Drip in festival colors: a limited
              edition collection inspired by the vibrant flavors and warm traditions of
              Cambodia&rsquo;s most cherished holiday.
            </p>
            <Link href="/songkran" className={`${BUTTON_PRIMARY} mt-8`}>
              Explore the campaign
            </Link>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/asset/kny/kny-campaign2.jpg"
              alt="Slow Drip Khmer New Year limited edition drinks"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const REEL_POSTERS = [
  { src: '/asset/video/teaser-drink-poster.jpg', alt: 'The Teaser reel' },
  { src: '/asset/video/three-drinks-spanner-poster.jpg', alt: 'Three Einspänners reel' },
  { src: '/asset/video/matcha-perison-poster.jpg', alt: 'Matcha Moment reel' },
  { src: '/asset/video/hojicha-drink-poster.jpg', alt: 'Hojicha reel' },
  { src: '/asset/video/latte-bisscot-poster.jpg', alt: 'Biscoff Latte reel' },
  { src: '/asset/video/tiktok-trend-poster.jpg', alt: 'The Trend reel' },
];

/** Homepage summary of the reels → /reels */
export function ReelsTeaser() {
  return (
    <section className="w-full bg-[#1A4B75] py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <SectionHeading
          center
          dark
          eyebrow="Slow Drip Reels"
          title="Watch it poured."
        />
      </div>
      <MarqueeRow images={REEL_POSTERS} direction="right" speed={0.4} />
      <div className="text-center mt-10">
        <Link href="/reels" className={BUTTON_LIGHT}>
          Watch all reels
        </Link>
      </div>
    </section>
  );
}

/** Homepage summary of the prize wheel → /spin. Mobile-first: wheel + prizes visible. */
export function SpinTeaser() {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <SectionHeading
              eyebrow="Feeling Lucky?"
              title={<>Spin the wheel,<br />win a treat.</>}
            />

            {/* Decorative slow-spinning mini wheel: sits between heading and prizes on phone */}
            <div className="flex lg:hidden items-center justify-center py-8">
              <MiniWheel />
            </div>

            {/* What's inside */}
            <div className="mt-2 lg:mt-8 grid grid-cols-2 gap-2.5 max-w-md mx-auto lg:mx-0 text-left">
              {PRIZES.map(({ emoji, full }) => (
                <div
                  key={full}
                  className="flex items-center gap-2.5 rounded-xl bg-[#FAF6EC] px-3.5 py-3"
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="text-xs md:text-sm font-medium text-[#1A4B75] leading-snug">{full}</span>
                </div>
              ))}
            </div>

            <Link href="/spin" className={`${BUTTON_PRIMARY} mt-8 w-full sm:w-auto`}>
              Try your luck
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center py-4">
            <MiniWheel large />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniWheel({ large = false }: { large?: boolean }) {
  return (
    <div className={`relative ${large ? 'h-80 w-80' : 'h-64 w-64'}`} aria-hidden>
      {/* Floor shadow for depth */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 h-7 w-3/4 rounded-full bg-black/15 blur-lg" />

      {/* Pointer */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20 h-0 w-0 border-x-[12px] border-x-transparent border-t-[18px] border-t-[#D97D54] drop-shadow-md" />

      {/* Spinning wheel */}
      <div
        className="absolute inset-0 rounded-full border-8 border-[#1A4B75] shadow-2xl [animation:spin_24s_linear_infinite]"
        style={{ background: WHEEL_GRADIENT }}
      >
        {/* Prize emojis */}
        {PRIZES.map(({ emoji, label }, i) => (
          <div
            key={label}
            className="absolute inset-0 flex justify-center"
            style={{ transform: `rotate(${i * 60 + 30}deg)` }}
          >
            <span className={large ? 'mt-6 text-2xl' : 'mt-4 text-xl'}>{emoji}</span>
          </div>
        ))}

        {/* Carnival rim pegs */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute inset-1 flex justify-center"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <span className="mt-0 h-2 w-2 rounded-full bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,.4)]" />
          </div>
        ))}
      </div>

      {/* Static gloss + depth overlays (light stays put while wheel spins) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 32% 24%, rgba(255,255,255,.4), rgba(255,255,255,0) 45%), radial-gradient(circle at 70% 88%, rgba(0,0,0,.22), rgba(0,0,0,0) 55%)',
        }}
      />
      <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_8px_20px_rgba(0,0,0,.28)]" />

      {/* Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-16 w-16 rounded-full bg-gradient-to-br from-white to-[#e6dfd0] border-4 border-[#1A4B75] shadow-lg flex items-center justify-center">
        <span className="text-2xl">☕</span>
      </div>
    </div>
  );
}

const CARD_STAMPS = 4;

/** Homepage summary of the loyalty program → /membership. Mobile-first. */
export function MembershipTeaser() {
  return (
    <section className="w-full bg-[#FAF6EC] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Copy + chips + CTA */}
          <div className="text-center lg:text-left order-1">
            <SectionHeading
              eyebrow="Membership"
              title={<>Every sip earns<br />you something.</>}
              sub={
                <>
                  Pick up a Slow Drip loyalty card at the counter. Order any drink and
                  we&rsquo;ll stamp it. No app, no sign-up, just coffee.
                </>
              }
            />

            <div className="mt-8 hidden lg:grid grid-cols-3 gap-2.5 max-w-md text-left">
              <MembershipChips />
            </div>

            <Link href="/membership" className={`${BUTTON_PRIMARY} mt-8 w-full sm:w-auto hidden lg:inline-block`}>
              See how it works
            </Link>
          </div>

          {/* Loyalty card */}
          <div className="order-2 flex justify-center">
            <div className="w-[420px] max-w-full rounded-3xl bg-white shadow-[0_30px_60px_-20px_rgba(20,40,70,.4)] overflow-hidden flex text-left">
              <div className="w-28 bg-gradient-to-br from-[#1A4B75] to-[#12385a] text-white flex flex-col items-center justify-center gap-2 p-3.5">
                <span className="font-mono text-[8px] tracking-[.16em] text-white/65">SCAN HERE</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-[#1A4B75]">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM18 18h3v3h-3z" />
                  </svg>
                </span>
                <span className="font-mono text-[8px] tracking-[.16em] text-white/65">SPIN &amp; WIN</span>
              </div>
              <div className="flex-1 p-5 flex flex-col gap-4 text-[#1A4B75]">
                <div>
                  <p className="font-mono text-[8px] tracking-[.2em] text-[#1A4B75]/55">MEMBER CARD</p>
                  <p className="text-base font-semibold mt-0.5">Loyalty Card</p>
                </div>
                <div className="grid grid-cols-5 gap-2 justify-items-center">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] ${
                        i < CARD_STAMPS
                          ? 'border-[1.6px] border-solid border-[#1A4B75]'
                          : 'border-[1.2px] border-dashed border-[#1A4B75]/30'
                      }`}
                    >
                      {i < CARD_STAMPS ? '☕' : ''}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-[9px] text-[#1A4B75]/70 border-t border-[#1A4B75]/15 pt-2.5">
                  slowdrip cafe &amp; eatery
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: chips + CTA come after the card */}
          <div className="order-3 lg:hidden text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-md mx-auto text-left">
              <MembershipChips />
            </div>
            <Link href="/membership" className={`${BUTTON_PRIMARY} mt-8 w-full sm:w-auto`}>
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MembershipChips() {
  return (
    <>
      {[
        { emoji: '🖊️', text: '1 stamp per visit' },
        { emoji: '🎡', text: 'Scan QR to spin' },
        { emoji: '☕', text: '11th drink free' },
      ].map(({ emoji, text }) => (
        <div key={text} className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-3">
          <span className="text-lg">{emoji}</span>
          <span className="text-xs md:text-sm font-medium text-[#1A4B75]">{text}</span>
        </div>
      ))}
    </>
  );
}
