'use client';

import { useEffect, useRef, useState } from 'react';
import { useMarquee } from '@/hooks/use-marquee';
import { SectionHeading } from '@/components/store/section-heading';

const REELS = [
  { src: '/asset/video/teaser-drink.mp4', poster: '/asset/video/teaser-drink-poster.jpg', title: 'The Teaser' },
  { src: '/asset/video/three-drinks-spanner.mp4', poster: '/asset/video/three-drinks-spanner-poster.jpg', title: 'Three Einspänners' },
  { src: '/asset/video/matcha-perison.mp4', poster: '/asset/video/matcha-perison-poster.jpg', title: 'Matcha Moment' },
  { src: '/asset/video/hojicha-drink.mp4', poster: '/asset/video/hojicha-drink-poster.jpg', title: 'Hojicha' },
  { src: '/asset/video/latte-bisscot.mp4', poster: '/asset/video/latte-bisscot-poster.jpg', title: 'Biscoff Latte' },
  { src: '/asset/video/matcha-eipspanner.mp4', poster: '/asset/video/matcha-eipspanner-poster.jpg', title: 'Matcha Einspänner' },
  { src: '/asset/video/chines-honey-tea-drink.mp4', poster: '/asset/video/chines-honey-tea-drink-poster.jpg', title: 'Honey Tea' },
  { src: '/asset/video/compare-drink-video.mp4', poster: '/asset/video/compare-drink-video-poster.jpg', title: 'Side by Side' },
  { src: '/asset/video/tiktok-trend.mp4', poster: '/asset/video/tiktok-trend-poster.jpg', title: 'The Trend' },
  { src: '/asset/video/drink-campaign.mp4', poster: '/asset/video/drink-campaign-poster.jpg', title: 'Campaign Cut' },
];

const COPIES = 2;
const STRIP = Array.from({ length: COPIES }, () => REELS).flat();

type Lightbox = { src: string; poster: string; title: string; time: number };

export function VideoReels() {
  const stripRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  // Auto-drift so every reel comes past; hold still while someone is watching.
  useMarquee(stripRef, {
    speed: 0.5,
    direction: 'left',
    copies: COPIES,
    paused: playing !== null || lightbox !== null,
  });

  const toggle = (i: number) => {
    const video = videoRefs.current[i];
    if (!video) return;

    if (playing === i) {
      video.pause();
      setPlaying(null);
      return;
    }
    if (playing !== null) videoRefs.current[playing]?.pause();
    video.play().catch(() => {});
    setPlaying(i);
  };

  const openLightbox = (i: number) => {
    const video = videoRefs.current[i];
    const reel = STRIP[i];
    video?.pause();
    setPlaying(null);
    setLightbox({ ...reel, time: video?.currentTime ?? 0 });
  };

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <section id="reels" className="w-full bg-[#1A4B75] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <SectionHeading dark eyebrow="Slow Drip Reels" title="Watch our reels." />
        <p className="text-sm text-white/60 max-w-sm leading-relaxed">
          Little films from behind the bar. Tap any reel to play it right here.
        </p>
      </div>

      <div ref={stripRef} className="no-scrollbar overflow-x-auto pb-6">
        <div className="flex gap-4 md:gap-5 px-6 w-max">
          {STRIP.map(({ src, poster, title }, i) => (
            <div
              key={`${src}-${i}`}
              className="group relative aspect-[9/16] h-80 md:h-[26rem] flex-shrink-0 overflow-hidden rounded-2xl bg-black/30"
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={src}
                poster={poster}
                preload="none"
                playsInline
                loop
                onClick={() => toggle(i)}
                className="absolute inset-0 h-full w-full object-cover cursor-pointer"
              />

              {/* Top row: reel chip + fullscreen (only while playing) */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <span className="rounded-full bg-black/40 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {playing === i ? 'Playing' : 'Reel'}
                </span>
                {playing === i && (
                  <button
                    type="button"
                    onClick={() => openLightbox(i)}
                    aria-label={`Watch ${title} fullscreen`}
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 1H1v4M9 1h4v4M5 13H1V9M9 13h4V9" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Bottom row: title + play/pause */}
              <div
                className={`absolute bottom-0 inset-x-0 flex items-center justify-between gap-3 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 pointer-events-none ${
                  playing === i ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
              >
                <span className="text-sm font-semibold text-white drop-shadow">{title}</span>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={playing === i ? `Pause ${title}` : `Play ${title}`}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1A4B75] flex-shrink-0"
                >
                  {playing === i ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <rect x="2" y="1" width="3.5" height="12" rx="1" />
                      <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M3 1.5v11l9-5.5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen pop-up player: original ratio, animated in */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close video"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>

          <div
            className="animate-in zoom-in-95 duration-300 max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={lightbox.src}
              poster={lightbox.poster}
              controls
              autoPlay
              playsInline
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = lightbox.time;
              }}
              className="max-h-[85vh] max-w-full rounded-2xl"
            />
            <p className="mt-3 text-center text-sm font-semibold text-white">{lightbox.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
