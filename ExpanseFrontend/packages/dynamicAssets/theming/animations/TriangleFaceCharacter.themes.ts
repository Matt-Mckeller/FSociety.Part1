/**
 * TriangleFaceCharacter Theme Support
 * Auto-registered via animations/index.ts
 */

import type { VariantThemeSupport } from "../lottieThemeRegistry"

// Themes supported by TriangleFaceCharacter (from theme-configs.ts)
const SUPPORTED_THEMES = [
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

export const animationName = "TriangleFaceCharacter"

export const variantThemes: VariantThemeSupport[] = [
  { variant: "default", themes: SUPPORTED_THEMES },
]
