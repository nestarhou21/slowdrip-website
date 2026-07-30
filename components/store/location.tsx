import Image from 'next/image';
import { SectionHeading } from '@/components/store/section-heading';

const SOCIALS = [
  {
    platform: 'Instagram',
    href: 'https://www.instagram.com/slowdrip_cafeandeatery',
    tagline: 'Stay fresh like strawberry,\nand keep moving forward.',
    image: '/asset/photoshoot_outdoor/strawberryamericano.jpg',
    imageAlt: 'Strawberry Americano',
    gradient: 'radial-gradient(120% 90% at 50% 0%, #000 0%, #43181c 45%, #8a3a3f 100%)',
  },
  {
    platform: 'TikTok',
    href: 'https://www.tiktok.com/@slowdripcafeandeatery',
    tagline: 'Let the bitterness remind you that\nlife’s best moments are worth the wait.',
    image: '/asset/photoshoot_outdoor/mintchocolate.jpg',
    imageAlt: 'Mint Chocolate',
    gradient: 'radial-gradient(120% 90% at 50% 0%, #000 0%, #0e2b20 45%, #1e4d3a 100%)',
  },
  {
    platform: 'Facebook',
    href: 'https://www.facebook.com/kleanmehomemadelocalfood',
    tagline: 'Slow mornings, sweet caramel,\ncomfort in every sip.',
    image: '/asset/photoshoot_outdoor/caramellatte.jpg',
    imageAlt: 'Caramel Latte',
    gradient: 'radial-gradient(120% 90% at 50% 0%, #000 0%, #102c45 45%, #1A4B75 100%)',
  },
];

export function Location() {
  return (
    <section id="location" className="w-full bg-white">

      {/* About + map */}
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

          {/* Info panel */}
          <div className="lg:col-span-2 rounded-3xl bg-[#1A4B75] text-white p-8 md:p-10 flex flex-col justify-between gap-10">
            <div>
              <SectionHeading
                dark
                eyebrow="Find Us"
                title={<>About our<br />cafe shop.</>}
                sub={
                  <>
                    A calm café and eatery designed for slow moments, quality coffee, and
                    simple comfort, whether you&rsquo;re stopping by or staying awhile.
                  </>
                }
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="border-t border-white/15 pt-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">Location</p>
                <p className="text-sm font-medium">Keo Chenda St, Phnom Penh</p>
              </div>
              <div className="border-t border-white/15 pt-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">Hours</p>
                <p className="text-sm font-medium">Mon - Sun · 7:30 AM - 7:30 PM</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=SLOW+DRIP+cafe+and+eatery+Phnom+Penh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-white text-[#1A4B75] px-6 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
              >
                Get directions
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 11L11 2M4.5 2H11v6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map in a framed card */}
          <div className="lg:col-span-3 relative min-h-[360px] md:min-h-[460px]">
            {/* Offset backdrop frame */}
            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full rounded-3xl bg-[#EFE9DB]" />

            <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-[#1A4B75] shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2105138.409582302!2d101.61299515280078!3d12.288526205557066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109530010a5a12d%3A0x162b69b7fe964e75!2sSLOW%20DRIP%20cafe%20and%20eatery!5e1!3m2!1sen!2skh!4v1769935104498!5m2!1sen!2skh"
                width="100%"
                height="100%"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Slow Drip Cafe Location"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Social posters */}
      <div className="w-full bg-[#EFE9DB] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <SectionHeading center eyebrow="Follow Along" title="Our social handles." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIALS.map(({ platform, href, tagline, gradient }) => (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grain group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-xl transition-transform duration-300 hover:-translate-y-1.5"
                style={{ background: gradient }}
              >
                {/* Platform chip */}
                <span className="absolute top-5 right-5 z-10 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  {platform}
                </span>

                {/* Logo */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%] block h-52 w-52 md:h-56 md:w-56 rounded-full bg-white overflow-hidden ring-1 ring-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/logo.jpg"
                    alt="Slow Drip"
                    fill
                    sizes="(max-width: 768px) 90vw, 300px"
                    className="object-contain p-6"
                  />
                </span>

                {/* Wordmark + tagline */}
                <span className="absolute bottom-7 left-7 right-7 block">
                  <span className="block text-3xl font-bold lowercase text-white leading-none">
                    slowdrip<span className="text-[#D97D54]">.</span>
                  </span>
                  <span className="mt-2.5 block text-[13px] leading-snug text-white/85 whitespace-pre-line font-serif">
                    {tagline}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
