"use client";

import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Pixel footprint of the FLIP overlay holding the persistent mascot.
 * Decoupled from `getBoundingClientRect()` of the slide's slot so transient
 * GSAP entrance scales on slide ancestors don't shrink the overlay. Mirrors
 * the `HOME_MASCOT_SIZE` tiers in `MascotSlot`.
 */
export const MASCOT_SIZE_BY_TIER = {
  zero: 280,
  tablet: 320,
  laptop: 360,
  desktop: 380,
} as const;

/**
 * Floor for the mascot size on very short viewports (e.g. landscape
 * phones, laptops with the AI chat open). Prevents the mascot from
 * shrinking below something legible while still letting the slide's
 * title + CTA fit on screen.
 */
const MASCOT_SIZE_MIN = 160;

/**
 * Fraction of viewport height the mascot is allowed to occupy. Used as
 * a height-based ceiling on top of the width-based tiers so the mascot
 * shrinks proportionally on short viewports rather than overflowing the
 * slide content stack.
 *
 * Tuned conservatively because the slide also has to fit a title, an
 * eyebrow, a CTA button, the floating timeline header, the bottom
 * orb-bar chrome, and SlideShell's top/bottom breathing buffers within
 * the same viewport. At 0.24, the mascot caps around ~192px on an
 * 800px-tall viewport, leaving comfortable room for everything else.
 */
const MASCOT_HEIGHT_RATIO = 0.24;

/**
 * Pixels to nudge the persistent mascot UP from its measured slot top.
 * Positive number = upward shift. Lets us position the character a touch
 * higher than its raw slot rect would imply, so it reads as floating above
 * the title rather than sitting on it.
 */
export const MASCOT_TOP_NUDGE_PX = 56;

/**
 * Tracks `window.innerHeight` so the mascot size can also react to
 * viewport-height changes (chrome opening, mobile address-bar collapse,
 * landscape rotation). SSR-safe: starts at 0, fills in after mount.
 */
function useViewportHeight() {
  const [h, setH] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return h;
}

/**
 * Resolves the active mascot size + breakpoint flags from the viewport.
 * Inlines the @expanse breakpoints (768/1024/1440) rather than pulling
 * `useTheme()` to sidestep a pre-existing typing issue in the home tree.
 *
 * The size is the smaller of:
 *   1. The width-tier base (zero/tablet/laptop/desktop), and
 *   2. `viewportHeight * MASCOT_HEIGHT_RATIO`
 *
 * clamped to a minimum of {@link MASCOT_SIZE_MIN}. This keeps the mascot
 * comfortably inside the safe area even when vertical room is tight (e.g.
 * landscape phones, laptops with the AI chat open).
 */
export function useResponsiveMascotSize() {
  const isTabletUp = useMediaQuery("(min-width:768px)", { noSsr: true });
  const isLaptopUp = useMediaQuery("(min-width:1024px)", { noSsr: true });
  const isDesktopUp = useMediaQuery("(min-width:1440px)", { noSsr: true });

  const widthTier = isDesktopUp
    ? MASCOT_SIZE_BY_TIER.desktop
    : isLaptopUp
      ? MASCOT_SIZE_BY_TIER.laptop
      : isTabletUp
        ? MASCOT_SIZE_BY_TIER.tablet
        : MASCOT_SIZE_BY_TIER.zero;

  const vh = useViewportHeight();
  const heightCeiling = vh > 0 ? vh * MASCOT_HEIGHT_RATIO : widthTier;
  const size = Math.max(MASCOT_SIZE_MIN, Math.min(widthTier, heightCeiling));

  return { size, isTabletUp, isLaptopUp, isDesktopUp };
}
