import { SlowMoments } from '@/components/store/slow-moments';
import { PhotoshootTeaser, KnyTeaser, ReelsTeaser, SpinTeaser, MembershipTeaser } from '@/components/store/teasers';
import { Location } from '@/components/store/location';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <SlowMoments />

      {/* Quote band */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden bg-[#1A4B75]">
        <div className="absolute inset-0 opacity-35">
          <Image
            src="/asset/redesign/about-picnic.jpg"
            alt="Slow Drip atmosphere"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
          <p className="text-white text-xl md:text-3xl font-light italic max-w-2xl leading-relaxed">
            &ldquo;Slow, deliberate, and crafted with care.&rdquo;
          </p>
        </div>
      </div>

      <PhotoshootTeaser />
      <KnyTeaser />
      <ReelsTeaser />
      <SpinTeaser />
      <MembershipTeaser />
      <Location />
    </>
  );
}
