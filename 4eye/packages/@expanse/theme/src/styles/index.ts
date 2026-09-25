/**
 * Common styling utilities for @expanse/theme
 * 
 * Reusable style patterns to reduce duplication and ensure consistency.
 */

// Glass effects
export {
  glassEffect,
} from "./glassEffect"
export type { GlassEffectOptions } from "./glassEffect"

// Elevation
export {
  elevation,
  getElevation,
  subtleElevation,
  mediumElevation,
  strongElevation,
  maxElevation,
} from "./elevation"
export type { ElevationLevel, ElevationDirection } from "./elevation"

// Gradients
export {
  linearGradient,
  radialGradient,
  primaryGradientOverlay,
  accentGradientOverlay,
  darkOverlayGradient,
  lightOverlayGradient,
  shimmerGradient,
} from "./gradients"
export type { GradientDirection } from "./gradients"

// Dusk Horizon — shared starry twilight surface for AI Chat HUD
export {
  DUSK_HORIZON_BASE,
  DUSK_HORIZON_TEXTURE,
  DUSK_HORIZON_BACKGROUND,
} from "./duskHorizon"

// Soft colors — muted accent + text ramp for product-story surfaces
export {
  SOFT_EMERALD,
  SOFT_CYAN,
  SOFT_BLUE,
  SOFT_AMBER,
  SOFT_VIOLET,
  SOFT_LILAC,
  SOFT_PERIWINKLE,
  SOFT_INDIGO,
  SOFT_ACCENTS,
  SOFT_TEXT,
  SOFT_TEXT_LIGHT,
  SOFT_STATUS,
  SOFT_SURFACE,
  SOFT_SURFACE_LIGHT,
} from "./softColors"

// Contrast — WCAG luminance/ratio utilities + auto-correction
export {
  relativeLuminance,
  contrastRatio,
  ensureContrast,
  compositeOverHex,
  hue,
  hslToHex,
} from "./contrast"
export type { RGB } from "./contrast"
export type { SoftAccentKey, SoftStatusKey } from "./softColors"

// Brand concentric ring — TripleLayerPill / Expanse logo 1:2:3 strokes
export { brandConcentricRing, brandRingScale } from "./brandRing"
