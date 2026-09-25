"use client";

import { useEffect, useState, type RefObject } from "react";

export interface ElementSize {
  width: number;
  height: number;
}

/** Track width and height of an element via ResizeObserver. */
export function useResizeObserver(
  ref: RefObject<HTMLElement | null>,
): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof ResizeObserver === "undefined") {
      const r = el.getBoundingClientRect();
      setSize({ width: r.width, height: r.height });
      return;
    }
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height },
      );
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setSize({ width: r.width, height: r.height });
    return () => ro.disconnect();
  }, [ref]);
  return size;
}
