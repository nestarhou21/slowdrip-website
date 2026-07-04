import type { Metadata } from 'next';
import Link from 'next/link';
import { VideoReels } from '@/components/store/video-reels';

export const metadata: Metadata = {
  title: 'Reels · Slow Drip',
  description:
    'Watch Slow Drip reels: little films from behind the bar, from matcha pours to festival campaigns.',
};

export default function ReelsPage() {
  return (
    <main className="pt-16">
      <VideoReels />

      <section className="w-full bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Want more? Follow us on socials for new reels every week, or come see the real
            thing at the bar.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#location"
              className="w-full sm:w-auto rounded-lg bg-[#1A4B75] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#153d5f] transition-colors"
            >
              Find our socials
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto rounded-lg border border-[#1A4B75]/30 px-8 py-3.5 text-sm font-semibold text-[#1A4B75] hover:border-[#1A4B75] transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
