import type { Metadata } from 'next';
import { OurStory } from '@/components/store/our-story';
import { Location } from '@/components/store/location';

export const metadata: Metadata = {
  title: 'About Us · Slow Drip',
  description:
    'The story behind Slow Drip, a calm cafe and eatery in Phnom Penh built for slow moments and thoughtfully brewed coffee.',
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      <OurStory />
      <Location />
    </main>
  );
}
