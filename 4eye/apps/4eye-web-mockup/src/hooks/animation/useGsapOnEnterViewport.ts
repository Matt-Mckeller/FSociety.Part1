"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";

/**
 * Run a `gsap.context()` builder the first time `scope` enters the viewport.
 * The context is cleaned up on unmount; the builder does not re-run if the
 * scope re-enters later (one-shot enter animation).
 *
 * Useful for slide-deck animations that should play when the slide first
 * scrolls into view but not replay on subsequent revisits.
 */
export function useGsapOnEnterViewport(
  scope: RefObject<HTMLElement | null>,
  builder: (ctx: gsap.Context) => void | (() => void),
  options: { threshold?: number; deps?: DependencyList } = {},
): void {
  const builderRef = useRef(builder);
  builderRef.current = builder;
  const threshold = options.threshold ?? 0.25;
  const deps = options.deps ?? [];

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    let ctx: gsap.Context | null = null;
    let cleanup: void | (() => void);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !ctx) {
          ctx = gsap.context((self) => {
            cleanup = builderRef.current(self);
          }, el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, threshold, ...deps]);
}
