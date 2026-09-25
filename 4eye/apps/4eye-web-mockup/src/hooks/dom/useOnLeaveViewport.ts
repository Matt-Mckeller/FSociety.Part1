"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Fire `onLeave` exactly once when `ref` first leaves the viewport.
 * Resets when the element re-enters, so the next exit fires again.
 *
 * Useful for handoff animations that should play when a slide scrolls away.
 */
export function useOnLeaveViewport(
  ref: RefObject<HTMLElement | null>,
  onLeave: () => void,
  options: { threshold?: number; onReturn?: () => void } = {},
): void {
  const onLeaveRef = useRef(onLeave);
  const onReturnRef = useRef(options.onReturn);
  onLeaveRef.current = onLeave;
  onReturnRef.current = options.onReturn;

  const threshold = options.threshold ?? 0.05;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          if (played) {
            played = false;
            onReturnRef.current?.();
          }
          return;
        }
        if (played) return;
        played = true;
        onLeaveRef.current();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
}
