/**
 * VersusClash Theme Support
 * Auto-registered via animations/index.ts
 */

import type { VariantThemeSupport } from "../lottieThemeRegistry"

// VersusClash themes
const VERSUS_CLASH_THEMES = [
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
]

export const animationName = "VersusClash"

export const variantThemes: VariantThemeSupport[] = [
  { variant: "default", themes: VERSUS_CLASH_THEMES },
]
