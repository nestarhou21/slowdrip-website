import type { Metadata } from 'next';
import Link from 'next/link';
import { SpinWheel } from '@/components/store/spin-wheel';

export const metadata: Metadata = {
  title: 'Spin the Wheel · Slow Drip',
  description:
    'Spin the Slow Drip wheel and win free drinks, buy one get one, toppings, and discounts.',
};

export default function SpinPage() {
  return (
    <main className="pt-16">
      <SpinWheel />

      <section className="w-full bg-[#FAF6EC] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            One spin per visit. Rewards are redeemable at the counter and pair nicely with
            your loyalty card stamps.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#membership"
              className="w-full sm:w-auto rounded-lg bg-[#1A4B75] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#153d5f] transition-colors"
            >
              About membership
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
