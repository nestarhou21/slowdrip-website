'use client';

import { useRef, useState } from 'react';
import { SectionHeading } from '@/components/store/section-heading';
import { PRIZES } from '@/lib/spin-data';

const SEGMENT = 360 / PRIZES.length;
const TOTAL_WEIGHT = PRIZES.reduce((sum, p) => sum + p.weight, 0);

function pickPrize() {
  let roll = Math.random() * TOTAL_WEIGHT;
  for (let i = 0; i < PRIZES.length; i++) {
    roll -= PRIZES[i].weight;
    if (roll <= 0) return i;
  }
  return PRIZES.length - 1;
}

export function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState<number | null>(null);
  const rotationRef = useRef(0);

  const spin = () => {
    if (spinning) return;
    setWon(null);
    setSpinning(true);

    const prize = pickPrize();
    // Land the chosen segment's center under the top pointer, with slight jitter.
    const jitter = (Math.random() - 0.5) * (SEGMENT * 0.6);
    const targetAngle = 360 - (prize * SEGMENT + SEGMENT / 2) + jitter;
    const current = rotationRef.current;
    const next = current - (current % 360) + 360 * 6 + targetAngle;
    rotationRef.current = next;
    setRotation(next);

    window.setTimeout(() => {
      setSpinning(false);
      setWon(prize);
    }, 4600);
  };

  const gradient = PRIZES.map(
    (p, i) => `${p.bg} ${i * SEGMENT}deg ${(i + 1) * SEGMENT}deg`,
  ).join(', ');

  return (
    <section id="spin" className="w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 items-start">

          {/* Copy + prize list */}
          <div className="lg:col-start-1 lg:row-start-1">
            <SectionHeading
              eyebrow="Feeling Lucky?"
              title={<>Spin the wheel,<br />win a treat.</>}
              sub={
                <>
                  Every visit earns you a spin. Give the wheel a try. Whatever it lands on,
                  show the result at the counter and it&rsquo;s yours.
                </>
              }
            />

            <div className="mt-8 grid grid-cols-2 max-w-md">
              {PRIZES.map(({ emoji, full }, i) => (
                <div
                  key={full}
                  className={`flex items-center gap-2.5 py-3.5 ${
                    i % 2 === 0 ? 'border-r border-gray-100 pr-4' : 'pl-4'
                  } ${i < PRIZES.length - 2 ? 'border-b border-gray-100' : ''}`}
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="text-xs md:text-sm font-medium text-[#1A4B75]">{full}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wheel */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 relative flex items-center justify-center py-6">
            <div className="relative h-[320px] w-[320px] md:h-[400px] md:w-[400px]">
              {/* Floor shadow for depth */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-8 w-3/4 rounded-full bg-black/15 blur-lg" />

              {/* Pointer */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 h-0 w-0 border-x-[14px] border-x-transparent border-t-[22px] border-t-[#D97D54] drop-shadow-md" />

              {/* Spinning wheel */}
              <div
                className="absolute inset-0 rounded-full border-8 border-[#1A4B75] shadow-2xl transition-transform duration-[4500ms] [transition-timing-function:cubic-bezier(0.12,0.8,0.16,1)]"
                style={{
                  background: `conic-gradient(${gradient})`,
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {PRIZES.map(({ emoji, label, text }, i) => (
                  <div
                    key={label}
                    className="absolute inset-0 flex justify-center"
                    style={{ transform: `rotate(${i * SEGMENT + SEGMENT / 2}deg)` }}
                  >
                    <div
                      className="mt-8 md:mt-10 flex flex-col items-center gap-1 text-center"
                      style={{ color: text }}
                    >
                      <span className="text-xl md:text-2xl">{emoji}</span>
                      <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wide max-w-[70px] md:max-w-[90px] leading-tight">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Carnival rim pegs */}
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute inset-1 flex justify-center"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  >
                    <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,.4)]" />
                  </div>
                ))}
              </div>

              {/* Static gloss + depth overlays (light stays put while wheel spins) */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 32% 24%, rgba(255,255,255,.35), rgba(255,255,255,0) 45%), radial-gradient(circle at 70% 88%, rgba(0,0,0,.2), rgba(0,0,0,0) 55%)',
                }}
              />
              <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_8px_22px_rgba(0,0,0,.28)]" />

              {/* Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-white to-[#e6dfd0] border-4 border-[#1A4B75] shadow-lg flex items-center justify-center">
                <span className="text-2xl md:text-3xl">☕</span>
              </div>
            </div>
          </div>

          {/* Spin button: after the wheel on mobile, under the copy on desktop */}
          <div className="lg:col-start-1 lg:row-start-2">
            <button
              type="button"
              onClick={spin}
              disabled={spinning}
              className="w-full sm:w-auto px-12 py-4 rounded-lg bg-[#1A4B75] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#153d5f] transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {spinning ? 'Spinning…' : 'Spin now'}
            </button>
          </div>
        </div>
      </div>

      {/* Win popup */}
      {won !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setWon(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl animate-in zoom-in-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">{PRIZES[won].emoji}</div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A4B75]/60 mb-2">
              You won
            </p>
            <h3 className="text-2xl font-bold text-[#1A4B75]">{PRIZES[won].full}</h3>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Show this screen at the counter to claim your reward. See you soon!
            </p>
            <button
              type="button"
              onClick={() => setWon(null)}
              className="mt-6 w-full rounded-lg bg-[#1A4B75] py-3.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#153d5f] transition-colors"
            >
              Claim it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
