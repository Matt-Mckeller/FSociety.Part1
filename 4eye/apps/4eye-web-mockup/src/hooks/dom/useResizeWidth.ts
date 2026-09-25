"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Track the rendered width of an element via ResizeObserver.
 * Returns 0 until the element is mounted and observed at least once.
 */
export function useResizeWidth(
  ref: RefObject<HTMLElement | null>,
): number {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof ResizeObserver === "undefined") {
      setWidth(el.getBoundingClientRect().width);
      return;
    }
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      setWidth((prev) => (prev === w ? prev : w));
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}
