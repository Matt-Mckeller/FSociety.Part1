"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";

/**
 * Run a `gsap.context()` builder scoped to a ref, with automatic cleanup.
 *
 * Replaces the boilerplate:
 *   useEffect(() => {
 *     if (!ref.current) return;
 *     const ctx = gsap.context(() => { ... }, ref);
 *     return () => ctx.revert();
 *   }, [...]);
 *
 * The builder receives the live `gsap.Context` so callers can return a
 * cleanup function or attach long-lived timelines to it.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  builder: (ctx: gsap.Context) => void | (() => void),
  deps: DependencyList = [],
): void {
  useEffect(() => {
    if (!scope.current) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      cleanup = builder(self);
    }, scope);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
