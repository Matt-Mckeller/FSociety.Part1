"use client";

import { type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { useGsap } from "@4eye/web/hooks/animation/useGsap";

/**
 * One-shot `gsap.from()` enter animation on a single selector inside `scope`.
 *
 * Equivalent to:
 *   useGsap(scope, () => { gsap.from(selector, vars); }, deps);
 *
 * Common defaults: `duration: 0.5`, `ease: "power2.out"` if not provided.
 */
export function useGsapEnter(
  scope: RefObject<HTMLElement | null>,
  selector: string,
  vars: gsap.TweenVars,
  deps: DependencyList = [],
): void {
  useGsap(
    scope,
    () => {
      gsap.from(selector, {
        duration: 0.5,
        ease: "power2.out",
        ...vars,
      });
    },
    deps,
  );
}
