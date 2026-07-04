'use client';

import Image from 'next/image';
import Link from 'next/link';

export function SlowMoments() {
  return (
    <section className="relative w-full overflow-hidden lg:h-screen lg:flex lg:items-center">
      {/* Mobile: image shown in full at its natural ratio. Desktop: full-bleed background. */}
      <div className="relative w-full aspect-[1443/833] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <Image
          src="/asset/herosection/coffe_herosection.png"
          alt="Slow Drip Cafe"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-white/15 hidden lg:block" />
      </div>

      <div className="container mx-auto px-6 sm:px-10 relative z-10 max-w-7xl bg-white lg:bg-transparent py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left spacer */}
          <div className="hidden lg:block lg:w-1/2" />

          {/* Right: logo + text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 lg:space-y-7">

            {/* SLOWDRIP brand: hidden on mobile, the hero image already carries the logo */}
            <div className="relative hidden lg:block w-full max-w-[460px] h-64">
              <Image
                src="/logo.jpg"
                alt="Slow Drip Logo"
                fill
                sizes="460px"
                className="object-contain object-right"
                priority
              />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <h1 className="text-[27px] leading-snug md:text-5xl lg:text-[52px] font-bold text-[#1A4B75] md:leading-tight">
                Slow moments,<br />thoughtfully brewed.
              </h1>
              <p className="text-xs md:text-base text-[#1A4B75]/65 font-medium">
                Specialty coffee &amp; quiet comfort in the heart of the city.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-block px-10 py-3 border border-[#1A4B75] text-[#1A4B75] text-xs font-bold uppercase tracking-widest hover:bg-[#1A4B75] hover:text-white transition-all duration-300 rounded-sm"
            >
              See Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
