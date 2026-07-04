import type { Metadata } from 'next';
import Link from 'next/link';
import { Membership } from '@/components/store/membership';
import { SpinTeaser } from '@/components/store/teasers';

export const metadata: Metadata = {
  title: 'Membership · Slow Drip',
  description:
    'The Slow Drip loyalty card: collect 10 stamps for a free drink, scan to spin the wheel, no app required.',
};

export default function MembershipPage() {
  return (
    <main className="pt-16">
      <Membership />
      <SpinTeaser />

      <section className="w-full bg-[#FAF6EC] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Cards are free at the counter. Stamps never expire, and every filled card also
            earns a spin on the wheel.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/spin"
              className="w-full sm:w-auto rounded-lg bg-[#1A4B75] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#153d5f] transition-colors"
            >
              Spin the wheel
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
