import type { ReactNode } from 'react';

/**
 * Single source of truth for section headers so every section shares the same
 * eyebrow, title, and body styles. `dark` switches to white text for navy
 * backgrounds.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  center = false,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-3 ${dark ? 'text-white' : 'text-[#1A4B75]'}`}>
        {eyebrow}
      </p>
      <h2 className={`text-4xl md:text-5xl font-bold leading-tight ${dark ? 'text-white' : 'text-[#1A4B75]'}`}>
        {title}
      </h2>
      {sub && (
        <p className={`text-sm md:text-base leading-relaxed mt-4 ${center ? 'max-w-xl mx-auto' : 'max-w-md'} ${dark ? 'text-white/60' : 'text-gray-500'}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
