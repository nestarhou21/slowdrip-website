'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useMarquee } from '@/hooks/use-marquee';
import { SectionHeading } from '@/components/store/section-heading';
import { PHOTOS_ROW_ONE, PHOTOS_ROW_TWO } from '@/lib/photoshoot-data';

const COPIES = 3;

export function MarqueeRow({
  images,
  direction,
  speed = 0.5,
}: {
  images: { src: string; alt: string }[];
  direction: 'left' | 'right';
  speed?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  useMarquee(rowRef, { speed, direction, copies: COPIES });

  const strip = Array.from({ length: COPIES }, () => images).flat();
  return (
    <div ref={rowRef} className="no-scrollbar overflow-x-auto">
      <div className="flex w-max gap-4 md:gap-5">
        {strip.map(({ src, alt }, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-56 md:h-72 w-40 md:w-52 flex-shrink-0 overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 160px, 208px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhotoshootGallery() {
  return (
    <section id="gallery" className="w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <SectionHeading
          center
          eyebrow="The Outdoor Shoot"
          title="Drinks that love daylight."
          sub={
            <>
              We took the menu outside: picnic blankets, golden light, and every drink
              photographed the way it&rsquo;s meant to be enjoyed. Slowly, in the open air.
            </>
          }
        />
      </div>

      <div className="flex flex-col gap-4 md:gap-5">
        <MarqueeRow images={PHOTOS_ROW_ONE} direction="left" />
        <MarqueeRow images={PHOTOS_ROW_TWO} direction="right" speed={0.4} />
      </div>
    </section>
  );
}
