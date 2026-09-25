/**
 * Soft colors — the muted accent + text ramp used across product-story surfaces
 * (e.g. the AI Integration Layers screen). Exported as named constants so any
 * app or package can share the exact palette instead of re-declaring hex/rgba
 * literals. Follows the mono-theme precedent for named color exports.
 *
 * Two text ramps are provided so the same design reads correctly on either a
 * dark surface (`SOFT_TEXT`) or a light surface (`SOFT_TEXT_LIGHT`).
 */

// ── Soft accents (per integration-layer family) ──────────────────────────────
export const SOFT_EMERALD = "#4fe0b0";
export const SOFT_CYAN = "#4dd0e1";
export const SOFT_BLUE = "#64b5f6";
export const SOFT_AMBER = "#ffb74d";
export const SOFT_VIOLET = "#b39ddb";
export const SOFT_LILAC = "#ce93d8";
export const SOFT_PERIWINKLE = "#9fa8da";
export const SOFT_INDIGO = "#8b9cf4";

/** Ordered accent set, handy for mapping over layer families. */
export const SOFT_ACCENTS = {
  emerald: SOFT_EMERALD,
  cyan: SOFT_CYAN,
  blue: SOFT_BLUE,
  amber: SOFT_AMBER,
  violet: SOFT_VIOLET,
  lilac: SOFT_LILAC,
  periwinkle: SOFT_PERIWINKLE,
  indigo: SOFT_INDIGO,
} as const;

// ── Soft text ramp — for DARK surfaces ───────────────────────────────────────
export const SOFT_TEXT = {
  hi: "rgba(255,255,255,0.92)",
  md: "rgba(255,255,255,0.80)",
  lo: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.50)",
  overline: "rgba(255,255,255,0.55)",
} as const;

// ── Soft text ramp — for LIGHT surfaces (the light-mode color set) ────────────
// Opacities are WCAG-checked against both the light page and card surfaces
// (see packages/@expanse/theme/src/styles/contrast.ts) — every tier clears
// 4.5:1, unlike the original values (lo/faint/overline previously measured
// 2.6–3.9:1, below the AA floor for normal text).
export const SOFT_TEXT_LIGHT = {
  hi: "rgba(20,26,48,0.92)",
  md: "rgba(20,26,48,0.72)",
  lo: "rgba(20,26,48,0.68)",
  faint: "rgba(20,26,48,0.63)",
  overline: "rgba(20,26,48,0.65)",
} as const;

// ── Build-status colors (Live / Building / Future) ───────────────────────────
export const SOFT_STATUS = {
  live: "#34d399", // emerald
  building: "#fbbf24", // amber
  future: "#818cf8", // indigo
} as const;

// ── Soft surface — neutral chrome (page bg, cards, tooltips) for DARK mode ───
export const SOFT_SURFACE = {
  pageBg: "linear-gradient(160deg, #07091a 0%, #0b1228 60%, #0a0e22 100%)",
  panelWash: "rgba(7,9,26,0.96)",
  cardBg: "rgba(10,12,28,0.92)",
  chromeBg: "rgba(10,12,28,0.7)",
  chipBg: "rgba(0,0,0,0.32)",
  tooltipBg: "rgba(6,10,24,0.96)",
  dividerBorder: "rgba(255,255,255,0.08)",
  dotColor: "rgba(255,255,255,0.75)",
} as const;

// ── Soft surface — neutral chrome, the LIGHT-mode counterpart ────────────────
export const SOFT_SURFACE_LIGHT = {
  pageBg: "linear-gradient(160deg, #f6f7fb 0%, #eceffa 55%, #f4f5fa 100%)",
  panelWash: "rgba(255,255,255,0.92)",
  cardBg: "rgba(255,255,255,0.82)",
  chromeBg: "rgba(255,255,255,0.65)",
  chipBg: "rgba(20,26,48,0.05)",
  tooltipBg: "rgba(255,255,255,0.98)",
  dividerBorder: "rgba(20,26,48,0.10)",
  dotColor: "rgba(20,26,48,0.35)",
} as const;

export type SoftAccentKey = keyof typeof SOFT_ACCENTS;
export type SoftStatusKey = keyof typeof SOFT_STATUS;
