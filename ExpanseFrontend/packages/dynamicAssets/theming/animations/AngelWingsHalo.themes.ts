/**
 * AngelWingsHalo Theme Support
 * Auto-registered via animations/index.ts
 */

import type { VariantThemeSupport } from "../lottieThemeRegistry"

// Universal themes
const UNIVERSAL_THEMES = [
  "purple-light",
  "purple-dark",
  "blue-light",
  "blue-dark",
  "green-light",
  "green-dark",
  "orange-light",
  "orange-dark",
  "red-light",
  "red-dark",
  "teal-light",
  "teal-dark",
]

// Extended themes for halo-only variant
const HALO_ONLY_THEMES = [
  "amber-light",
  "amber-dark",
  "blue-light",
  "blue-dark",
  "cyan-light",
  "cyan-dark",
  "gold-light",
  "gold-dark",
  "green-light",
  "green-dark",
  "indigo-light",
  "indigo-dark",
  "lime-light",
  "lime-dark",
  "orange-light",
  "orange-dark",
  "pink-light",
  "pink-dark",
  "purple-light",
  "purple-dark",
  "red-light",
  "red-dark",
  "teal-light",
  "teal-dark",
]

export const animationName = "AngelWingsHalo"

export const variantThemes: VariantThemeSupport[] = [
  { variant: "default", themes: UNIVERSAL_THEMES },
  { variant: "up", themes: UNIVERSAL_THEMES },
  { variant: "halo-only", themes: HALO_ONLY_THEMES },
]
