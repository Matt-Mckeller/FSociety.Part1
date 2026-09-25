"use client";

/**
 * useHeroToOrbMorph — fires a single-shot FLIP-style morph from the hero
 * "Play" CTA button to the bottom play orb in SlideshowControls.
 *
 * Usage:
 *   const morph = useHeroToOrbMorph();
 *   // On hero button click:
 *   morph(() => { goto(1); setPlaying(true); });
 *
 * Design notes:
 *   - Creates a fixed-position clone at the hero button's rect and tweens
 *     it to the play orb's rect while fading the real button out.
 *   - Respects `prefers-reduced-motion`: skips the clone animation entirely
 *     and just calls the callback.
 *   - Targets the play orb via `[data-orb-id="play"]` (set in
 *     SlideshowControls). Gracefully degrades if the orb can't be found.
 *   - Animation runs at ~450 ms with power3.inOut so it feels snappy but
 *     clearly communicates the relationship between the button and the orb.
 */

import { useCallback, useRef } from "react";
import gsap from "gsap";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const ORB_LG_PX = 56; // ActionOrb size="lg" diameter

export function useHeroToOrbMorph(
  playOrbSelector = '[data-orb-id="play"]',
) {
  const animatingRef = useRef(false);

  const trigger = useCallback(
    (onComplete?: () => void) => {
      if (animatingRef.current) {
        onComplete?.();
        return;
      }

      // Bail early for reduced-motion preference.
      if (prefersReducedMotion()) {
        onComplete?.();
        return;
      }

      const heroEl = document.querySelector(".hero-action") as HTMLElement | null;
      const orbWrapper = document.querySelector(playOrbSelector) as HTMLElement | null;

      if (!heroEl || !orbWrapper) {
        onComplete?.();
        return;
      }

      const heroRect = heroEl.getBoundingClientRect();
      const orbRect = orbWrapper.getBoundingClientRect();

      // Create a floating clone positioned at the hero button.
      const clone = document.createElement("div");
      clone.setAttribute("aria-hidden", "true");
      Object.assign(clone.style, {
        position: "fixed",
        left: `${heroRect.left}px`,
        top: `${heroRect.top}px`,
        width: `${heroRect.width}px`,
        height: `${heroRect.height}px`,
        borderRadius: "9999px",
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        zIndex: "9998",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.05rem",
        fontWeight: "700",
        color: "white",
        fontFamily: "inherit",
        letterSpacing: "-0.005em",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(25,118,210,0.45)",
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });
      clone.textContent = "Play";
      document.body.appendChild(clone);

      animatingRef.current = true;

      // Immediately dim the real hero button.
      gsap.to(heroEl, { opacity: 0, duration: 0.2 });

      // Target center + offset by half the orb size to reach orb center.
      const targetLeft = orbRect.left + orbRect.width / 2 - ORB_LG_PX / 2;
      const targetTop = orbRect.top + orbRect.height / 2 - ORB_LG_PX / 2;

      const tl = gsap.timeline({
        onComplete: () => {
          clone.remove();
          animatingRef.current = false;
          onComplete?.();
        },
      });

      // Shrink text first (quick fade).
      tl.to(clone, { color: "rgba(255,255,255,0)", duration: 0.12, ease: "power1.in" });

      // Morph to orb shape and fly to orb position.
      tl.to(
        clone,
        {
          left: targetLeft,
          top: targetTop,
          width: ORB_LG_PX,
          height: ORB_LG_PX,
          duration: 0.44,
          ease: "power3.inOut",
        },
        "-=0.08",
      );

      // Fade out as it arrives.
      tl.to(clone, { opacity: 0, duration: 0.18, ease: "power2.in" }, "-=0.12");
    },
    [playOrbSelector],
  );

  return trigger;
}
