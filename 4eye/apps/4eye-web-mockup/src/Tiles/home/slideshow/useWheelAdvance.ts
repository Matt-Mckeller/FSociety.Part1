"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { WHEEL_LOCK_MS, WHEEL_THRESHOLD } from "@4eye/web/Tiles/home/slideshow/steps";

/**
 * Wheel → slide advance, with two compatibility behaviors:
 *
 *   1. **Inner-scroll preemption** — if the wheel target lives inside an
 *      element marked `data-slide-scroll` and that scroll container has
 *      not yet hit its top/bottom edge in the wheel direction, we bail
 *      and let the browser scroll instead of advancing the deck.
 *   2. **Debounce** — after a successful advance we lock for
 *      `WHEEL_LOCK_MS` to avoid a single trackpad gesture firing dozens
 *      of advances.
 */
export function useWheelAdvance(stageRef: RefObject<HTMLElement>) {
  const { dispatch } = useSlideshow();
  const lockRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      if (lockRef.current) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest("[data-slide-scroll]") as HTMLElement | null;
      if (scrollable) {
        const atTop = scrollable.scrollTop <= 0;
        const atBottom =
          scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight <= 1;
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      lockRef.current = true;
      window.setTimeout(() => {
        lockRef.current = false;
      }, WHEEL_LOCK_MS);

      dispatch({ type: e.deltaY > 0 ? "NEXT" : "PREV" });
    };

    stage.addEventListener("wheel", handleWheel, { passive: true });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [stageRef, dispatch]);
}
