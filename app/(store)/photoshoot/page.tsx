import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoshootGallery } from '@/components/store/photoshoot-gallery';
import { PHOTOS_ROW_ONE, PHOTOS_ROW_TWO } from '@/lib/photoshoot-data';
import { SectionHeading } from '@/components/store/section-heading';

export const metadata: Metadata = {
  title: 'The Outdoor Shoot · Slow Drip',
  description:
    'The full Slow Drip outdoor photoshoot: our drinks in golden light, picnic blankets, and open air.',
};

const ALL_PHOTOS = [
  ...PHOTOS_ROW_ONE,
  ...PHOTOS_ROW_TWO,
  { src: '/asset/photoshoot_outdoor/poster.jpg', alt: 'Outdoor shoot poster' },
];

export default function PhotoshootPage() {
  return (
    <main className="pt-16">
      <PhotoshootGallery />

      {/* Full grid */}
      <section className="w-full bg-[#FAF6EC] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <SectionHeading
              center
              eyebrow="Every Shot"
              title="The whole roll."
              sub="All the keepers from the shoot, in one place."
            />
          </div>

          <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
            {ALL_PHOTOS.map(({ src, alt }) => (
              <div key={src} className="relative overflow-hidden rounded-xl break-inside-avoid">
                <Image
                  src={src}
                  alt={alt}
                  width={640}
                  height={900}
                  sizes="(max-width: 768px) 45vw, 30vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block rounded-lg border border-[#1A4B75]/30 px-8 py-3.5 text-sm font-semibold text-[#1A4B75] hover:border-[#1A4B75] transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
