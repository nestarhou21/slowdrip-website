import Image from 'next/image';
import { SectionHeading } from '@/components/store/section-heading';

export function OurStory() {
  return (
    <section id="our-story" className="w-full bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden">
            <Image
              src="/asset/redesign/newspaper-coffee.jpg"
              alt="Slow Drip atmosphere"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-7">
            <SectionHeading
              eyebrow="Our Story"
              title={<>A place built for<br />slow moments.</>}
            />

            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              Slow Drip started with a simple belief: that a great cup of coffee is worth taking
              your time over. We source our beans thoughtfully, brew with intention, and create
              a space where you can breathe, connect, and stay a little longer.
            </p>

            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              Every drink on our menu is crafted to be savored, from the first sip of your
              morning americano to the last drop of a late-afternoon matcha.
            </p>

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6">
              {[
                { label: 'Specialty Grade', sub: 'Only the top 1% of beans' },
                { label: 'Craft Brewing', sub: 'Every order made to order' },
                { label: 'Community First', sub: 'A café rooted in the neighborhood' },
              ].map(({ label, sub }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1A4B75] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#1A4B75]">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
