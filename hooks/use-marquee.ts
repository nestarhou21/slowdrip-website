'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Infinite auto-scrolling marquee on a horizontally scrollable element whose
 * content is repeated `copies` times. The scroll position wraps by exactly one
 * copy-width (visually seamless, since the content repeats).
 *
 * Position is tracked as a float in JS because browsers round fractional
 * scrollLeft writes, which would swallow small per-frame steps.
 *
 * Requires: viewport width <= (copies - 1) * copyWidth, otherwise the wrap
 * point sits past the max scroll position and the marquee can stall.
 */
export function useMarquee(
  ref: RefObject<HTMLElement | null>,
  {
    speed = 0.5,
    direction = 'left',
    copies,
    paused = false,
  }: {
    speed?: number;
    direction?: 'left' | 'right';
    copies: number;
    paused?: boolean;
  },
) {
  const posRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame: number;
    const step = direction === 'left' ? speed : -speed;
    const wrap = (pos: number, set: number) => ((pos % set) + set) % set;

    // One copy-width must be measured between repeated items, not as
    // scrollWidth / copies: the flex gap between copies is part of the visual
    // period but there is no trailing gap in scrollWidth, so dividing leaves
    // the wrap short by gap/copies and the strip snaps sideways at every loop.
    const copyWidth = () => {
      const items = el.firstElementChild?.children;
      const perCopy = items ? Math.floor(items.length / copies) : 0;
      if (items && perCopy > 0 && items.length > perCopy) {
        return (
          (items[perCopy] as HTMLElement).offsetLeft -
          (items[0] as HTMLElement).offsetLeft
        );
      }
      return el.scrollWidth / copies;
    };

    const tick = () => {
      const set = copyWidth();
      if (set > 0) {
        if (posRef.current === null) {
          posRef.current = set / 2;
          el.scrollLeft = posRef.current;
        }
        let pos: number;

        if (draggingRef.current || paused) {
          // Hands off: follow the user, only jump when they cross a seam.
          pos = el.scrollLeft;
          const wrapped = wrap(pos, set);
          if (Math.abs(wrapped - pos) > 0.5) {
            pos = wrapped;
            el.scrollLeft = pos;
          }
        } else {
          pos = posRef.current;
          // Adopt momentum / mouse-wheel movement since last frame.
          if (Math.abs(el.scrollLeft - pos) > 1.5) pos = el.scrollLeft;
          pos = wrap(pos + step, set);
          el.scrollLeft = pos;
        }
        posRef.current = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const start = () => { draggingRef.current = true; };
    const stop = () => { draggingRef.current = false; };
    // touchcancel matters: iOS fires it (not touchend) when native scrolling
    // takes over the gesture — missing it froze the marquee after one swipe.
    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', stop, { passive: true });
    el.addEventListener('touchcancel', stop, { passive: true });
    el.addEventListener('mousedown', start);
    window.addEventListener('mouseup', stop);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('touchstart', start);
      el.removeEventListener('touchend', stop);
      el.removeEventListener('touchcancel', stop);
      el.removeEventListener('mousedown', start);
      window.removeEventListener('mouseup', stop);
    };
  }, [ref, speed, direction, copies, paused]);
}
