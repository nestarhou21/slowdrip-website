'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CreditCard, Stamp, QrCode, Gift } from 'lucide-react';
import { SectionHeading } from '@/components/store/section-heading';

const STEPS = [
  { icon: CreditCard, title: 'Get your card', desc: 'Free with your first order, no app required.' },
  { icon: Stamp, title: 'Order & we stamp it', desc: 'One stamp per visit, any drink on the menu.' },
  { icon: QrCode, title: 'Scan & spin', desc: 'Scan the QR on your card anytime for a spin on the Slow Drip wheel.' },
  { icon: Gift, title: 'Fill it, get free', desc: '10 stamps, your 11th drink is on us.' },
];

const FILLED_STAMPS = 4;

// QR images point at placeholder URLs — swap the data param once the wheel game is live.
const QR = (data: string, size: number) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;

function CupIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke={filled ? '#1A4B75' : 'rgba(26,75,117,.42)'}
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.4 8.7h9.2v3a4.6 4.6 0 0 1-9.2 0z" />
      <path d="M15.6 9.4h1.5a2.05 2.05 0 0 1 0 4.1h-1" />
      <path d="M4.9 18.1q6.1 2 14.2 0" />
      <path d="M9.3 6.5q1.1-1.3 0-2.6" opacity=".75" />
      <path d="M12.7 6.5q1.1-1.3 0-2.6" opacity=".75" />
    </svg>
  );
}

export function Membership() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="membership" className="w-full bg-[#FAF6EC] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-x-16 lg:gap-y-10 items-start">

          {/* Heading + copy */}
          <div className="lg:col-start-1 lg:row-start-1">
            <SectionHeading
              eyebrow="Membership"
              title={<>Every sip earns<br />you something.</>}
              sub={
                <>
                  Pick up a Slow Drip loyalty card at the counter. Order any drink and
                  we&rsquo;ll stamp it. Fill all 10 and your 11th is free, or spin our wheel
                  for a surprise reward.
                </>
              }
            />
          </div>

          {/* Floating flip card */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 relative flex flex-col items-center justify-center min-h-[420px] lg:min-h-[520px]">
            <div className="absolute w-[500px] h-[500px] max-w-full rounded-full bg-[radial-gradient(circle,rgba(26,75,117,.07),transparent_70%)]" />

            <div className="animate-float-card [perspective:1400px]">
              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                aria-label="Flip membership card"
                className={`relative block w-[480px] aspect-[400/262] max-w-[90vw] cursor-pointer [transform-style:preserve-3d] transition-transform duration-700 ${
                  flipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 rounded-[22px] overflow-hidden bg-white shadow-[0_30px_60px_-20px_rgba(20,40,70,.4)] [backface-visibility:hidden] flex text-left">
                  <div className="w-[130px] bg-gradient-to-br from-[#1A4B75] to-[#12385a] text-white flex flex-col items-center justify-center gap-2.5 px-3">
                    <span className="font-mono text-[9px] tracking-[.16em] text-white/65 text-center">SCAN HERE</span>
                    <span className="w-20 h-20 bg-white rounded-lg p-1.5 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={QR('https://slowdrip.cafe/spin', 120)} alt="Spin & win QR" className="w-full h-full" />
                    </span>
                    <span className="font-mono text-[9px] tracking-[.16em] text-white/65 text-center">SPIN &amp; WIN</span>
                  </div>
                  <div className="flex-1 p-5 flex flex-col text-[#1A4B75]">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-[8px] tracking-[.2em] text-[#1A4B75]/55">MEMBER CARD</p>
                        <p className="text-[15px] font-semibold mt-0.5">Loyalty Card</p>
                      </div>
                      <Image src="/asset/Logo/black_logo.png" alt="Slow Drip" width={64} height={30} className="h-[34px] w-auto object-contain" />
                    </div>
                    <div className="flex-1 grid grid-cols-5 gap-2 justify-items-center items-center mt-1">
                      {Array.from({ length: 10 }, (_, i) => (
                        <span
                          key={i}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            i < FILLED_STAMPS
                              ? 'border-[1.6px] border-solid border-[#1A4B75]'
                              : 'border-[1.2px] border-dashed border-[#1A4B75]/30'
                          }`}
                        >
                          <CupIcon filled={i < FILLED_STAMPS} />
                        </span>
                      ))}
                    </div>
                    <p className="font-mono text-[9px] text-[#1A4B75]/70 border-t border-[#1A4B75]/15 pt-2">
                      slowdrip cafe &amp; eatery
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 rounded-[22px] overflow-hidden bg-white shadow-[0_30px_60px_-20px_rgba(20,40,70,.4)] [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col text-left">
                  <div className="flex-1 px-5 pt-5 pb-3 flex flex-col text-[#1A4B75]">
                    <div className="flex justify-between items-center">
                      <Image src="/asset/Logo/black_logo.png" alt="Slow Drip" width={48} height={22} className="h-[26px] w-auto object-contain" />
                      <div className="text-right">
                        <p className="font-mono text-[7px] tracking-[.18em] text-[#1A4B75]/55">VISIT US ONLINE</p>
                        <p className="text-[11px] font-medium mt-px">slowdrip.cafe</p>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-1 mt-2 items-center">
                      <div className="flex-1">
                        <p className="font-mono text-[7px] tracking-[.2em] text-[#1A4B75]/55 mb-1.5">HOW IT WORKS</p>
                        <div className="flex flex-col gap-1.5">
                          {[
                            'Order & we stamp your card',
                            'Earn a stamp every visit',
                            'Fill all 10, 11th free or 1 spin',
                          ].map((line, i) => (
                            <p key={line} className="flex gap-1.5 items-baseline">
                              <span className="font-mono text-[7px] text-[#1A4B75]/50">{String(i + 1).padStart(2, '0')}</span>
                              <span className="text-[9px] text-[#1A4B75]/90">{line}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="w-[64px] h-[64px] bg-white rounded-md p-1 shadow border border-[#e7e1d2]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={QR('https://slowdrip.cafe', 128)} alt="Website QR" className="w-full h-full" />
                        </span>
                        <span className="font-mono text-[6.5px] tracking-[.12em] text-[#1A4B75]/60">SCAN TO VISIT</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1A4B75] text-white px-5 py-2.5 flex justify-between items-center font-mono text-[7.5px]">
                    <span>Keo Chenda St, Phnom Penh</span>
                    <span className="opacity-50">·</span>
                    <span>Daily 7AM-7PM</span>
                  </div>
                </div>
              </button>
            </div>

            <p className="font-mono text-[10.5px] tracking-[.1em] text-[#1A4B75]/45 mt-6">
              ⟲ tap the card to flip
            </p>
          </div>

          {/* Steps timeline + CTAs */}
          <div className="lg:col-start-1 lg:row-start-2">
            <div className="flex flex-col">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Dashed connector */}
                  {i < STEPS.length - 1 && (
                    <span className="absolute left-[17px] top-10 bottom-0 border-l border-dashed border-[#1A4B75]/25" aria-hidden />
                  )}
                  <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1A4B75] font-mono text-xs font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1A4B75]/8 text-[#1A4B75] -mt-1.5">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-base font-semibold text-[#1A4B75]">{title}</p>
                    <p className="text-xs md:text-sm text-gray-400 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a
                href="/spin"
                className="inline-block w-full sm:w-auto text-center px-7 py-4 rounded-lg bg-[#1A4B75] text-white text-sm font-semibold hover:bg-[#153d5f] transition-colors"
              >
                Spin the wheel
              </a>
              <a
                href="/#location"
                className="inline-block w-full sm:w-auto text-center px-7 py-4 rounded-lg border border-[#1A4B75]/30 text-[#1A4B75] text-sm font-semibold hover:border-[#1A4B75] transition-colors"
              >
                Visit us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
