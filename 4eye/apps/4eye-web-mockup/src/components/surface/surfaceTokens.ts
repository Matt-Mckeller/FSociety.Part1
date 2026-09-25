"use client";

/**
 * useSurface — the neutral chrome tokens (page bg, card bg, tooltip bg, text
 * ramp, …) for whichever light/dark mode this screen is currently in, plus
 * `ink(hex)` — a WCAG-safe version of any one-off accent hex (status colors,
 * role tags, chest rarities, …) that has no paired dark/light anchor of its
 * own. In dark mode `ink` returns the hex unchanged (today's colors already
 * measure well there); in light mode it runs `ensureContrast` against the page
 * background, since that's the *darkest* of this screen's light-mode surfaces
 * (page bg / card bg / chrome bg are all near-white, but page bg has the least
 * luminance of the three) — the hardest case to contrast against, and therefore
 * the correct reference: anything that passes against it passes against every
 * lighter surface too. (An earlier version of this used pure white as the
 * reference, which is *lighter* than the real page background — that let a few
 * borderline colors, like the status pills, pass against white but still
 * measure under 4.5:1 against the actual page. Caught by the contrast sweep,
 * not by eye.)
 *
 * useInk — the paired-anchor version, for any surface that carries two related
 * colors: a dark saturated `color` and a bright `accentColor`. Measured
 * contrast showed `color` reads 6–15:1 against light surfaces — a ready-made
 * light-mode text ink — while `accentColor` reads 1.4–2.6:1 there (it was only
 * ever tuned for dark backgrounds). So which anchor is the *fill/tint* source
 * and which is the *text ink* source flips with mode, instead of light mode
 * reusing dark's pairing with swapped neutrals:
 *   - dark:  tint = color,       ink = accentColor  (unchanged)
 *   - light: tint = accentColor, ink = color (safety-net checked)
 *
 * Moved here from `Tiles/integration-layers/components/` so any surface can use
 * it — the profile page and the integration-layer panels now share one
 * contrast-safe token source. The parameter is structural (`{ color,
 * accentColor }`), not an `IntegrationLayer`, so nothing has to fake a layer
 * object to get correct ink.
 */

import { useTheme } from "@mui/material";
import { SOFT_TEXT, SOFT_TEXT_LIGHT, SOFT_SURFACE, SOFT_SURFACE_LIGHT, ensureContrast } from "@expanse/theme";

/** Darkest of this screen's light-mode surfaces — the hardest case for ink to contrast against. */
const LIGHT_MODE_REFERENCE_BG = "#eceffa";
const MIN_TEXT_CONTRAST = 4.5;

export interface InkAnchors {
  /** Dark, saturated. The base a bright accent sits on in dark mode. */
  color: string;
  /** Bright. Tuned for dark backgrounds. */
  accentColor: string;
}

export function useSurface() {
  const { palette } = useTheme();
  const dark = palette.mode === "dark";

  function ink(hex: string): string {
    return dark ? hex : ensureContrast(hex, LIGHT_MODE_REFERENCE_BG, MIN_TEXT_CONTRAST);
  }

  return {
    mode: palette.mode,
    text: dark ? SOFT_TEXT : SOFT_TEXT_LIGHT,
    ...(dark ? SOFT_SURFACE : SOFT_SURFACE_LIGHT),
    ink,
  };
}

export function useInk({ color, accentColor }: InkAnchors) {
  const { palette } = useTheme();
  const dark = palette.mode === "dark";
  if (dark) {
    return { mode: palette.mode, ink: accentColor, tint: color };
  }
  return {
    mode: palette.mode,
    ink: ensureContrast(color, LIGHT_MODE_REFERENCE_BG, MIN_TEXT_CONTRAST),
    tint: accentColor,
  };
}
