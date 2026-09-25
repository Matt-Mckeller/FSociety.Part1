/**
 * Homework Theme Support
 * Auto-registered via animations/index.ts
 */

import type { VariantThemeSupport } from "../lottieThemeRegistry"

// Homework-specific themes (limited set)
const HOMEWORK_THEMES = [
  "purple-light",
  "purple-dark",
  "blue-light",
  "blue-dark",
]

export const animationName = "Homework"

export const variantThemes: VariantThemeSupport[] = [
  { variant: "default", themes: HOMEWORK_THEMES },
  { variant: "minimal", themes: HOMEWORK_THEMES },
]
