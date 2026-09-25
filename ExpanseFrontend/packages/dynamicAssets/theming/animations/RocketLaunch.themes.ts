/**
 * RocketLaunch Theme Support
 * Auto-registered via animations/index.ts
 */

import type { VariantThemeSupport } from "../lottieThemeRegistry"

// Universal themes - includes teal
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

// Default variant themes (no teal)
const DEFAULT_THEMES = [
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

export const animationName = "RocketLaunch"

export const variantThemes: VariantThemeSupport[] = [
  { variant: "default", themes: DEFAULT_THEMES },
  { variant: "ImprovedMonochromeColoring", themes: UNIVERSAL_THEMES },
  { variant: "ImprovedDualToneColor", themes: UNIVERSAL_THEMES },
]
