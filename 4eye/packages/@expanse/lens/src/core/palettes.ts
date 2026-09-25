/**
 * Theme palettes — one four-stop palette per brand pillar.
 * Tuned for crisp rendering on a white background (brand default).
 */

import type { LensPalette, LensTheme } from "./types"

export const LENS_PALETTES: Record<LensTheme, LensPalette> = {
  /** Improve — indigo/violet: learning, progression, resilience. */
  improve: {
    base: "#6366f1",
    accent: "#8b5cf6",
    glow: "#a5b4fc",
    soft: "#eef2ff",
  },
  /** Innovate — cyan/blue: engagement, novelty, gamification. */
  innovate: {
    base: "#0ea5e9",
    accent: "#22d3ee",
    glow: "#7dd3fc",
    soft: "#ecfeff",
  },
  /** Win — amber/gold: currency, score, rankings. */
  win: {
    base: "#f59e0b",
    accent: "#fbbf24",
    glow: "#fcd34d",
    soft: "#fffbeb",
  },
  /** Heal — emerald/teal: positivity, optimism, recovery. */
  heal: {
    base: "#10b981",
    accent: "#34d399",
    glow: "#6ee7b7",
    soft: "#ecfdf5",
  },
  /** Protect — steel-blue/slate: security, safety, stability. */
  protect: {
    base: "#475569",
    accent: "#3b82f6",
    glow: "#94a3b8",
    soft: "#f1f5f9",
  },
  /** Neutral — slate: unthemed utility lenses. */
  neutral: {
    base: "#334155",
    accent: "#64748b",
    glow: "#cbd5e1",
    soft: "#f8fafc",
  },
}

/** Resolve a palette for a theme. */
export function paletteFor(theme: LensTheme): LensPalette {
  return LENS_PALETTES[theme] ?? LENS_PALETTES.neutral
}
