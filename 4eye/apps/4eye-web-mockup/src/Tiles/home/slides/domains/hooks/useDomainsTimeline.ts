"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGsap, useGsapOnEnterViewport } from "@4eye/web/hooks/animation";
import { DOMAINS_SELECTORS } from "../state/domains.constants";

export function useDomainsTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.set(`${DOMAINS_SELECTORS.eyebrow}, ${DOMAINS_SELECTORS.headline}`, { opacity: 0, y: 16 });
    gsap.set(DOMAINS_SELECTORS.whenBand, { opacity: 0, y: 20 });
    gsap.set(DOMAINS_SELECTORS.whenPill, { opacity: 0, y: 20, scale: 0.9 });
    gsap.set(DOMAINS_SELECTORS.whereBand, { opacity: 0, y: 24 });
    gsap.set(DOMAINS_SELECTORS.wherePill, { opacity: 0, y: 16, scale: 0.85 });
  });

  useGsapOnEnterViewport(
    ref,
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        gsap.set(`${DOMAINS_SELECTORS.eyebrow}, ${DOMAINS_SELECTORS.headline}`, { opacity: 1, y: 0 });
        gsap.set(`${DOMAINS_SELECTORS.whenBand}, ${DOMAINS_SELECTORS.whenPill}`, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(`${DOMAINS_SELECTORS.whereBand}, ${DOMAINS_SELECTORS.wherePill}`, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(DOMAINS_SELECTORS.eyebrow, { opacity: 1, y: 0, duration: 0.4 });
      tl.to(DOMAINS_SELECTORS.headline, { opacity: 1, y: 0, duration: 0.55, stagger: 0.15 }, "-=0.25");

      tl.to(DOMAINS_SELECTORS.whenBand, { opacity: 1, y: 0, duration: 0.4 }, "-=0.1");
      tl.to(
        DOMAINS_SELECTORS.whenPill,
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.4)" },
        "-=0.2",
      );

      tl.to(DOMAINS_SELECTORS.whereBand, { opacity: 1, y: 0, duration: 0.45 }, "-=0.1");
      tl.to(
        DOMAINS_SELECTORS.wherePill,
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07, ease: "back.out(1.4)" },
        "-=0.25",
      );
    },
    { threshold: 0.2 },
  );

  return ref;
}
