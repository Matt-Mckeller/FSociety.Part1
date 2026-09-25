/**
 * Theme Data
 *
 * Aggregated palette and shadow lookups for all Expanse themes.
 * Used by decorators to create themes without reimporting everything.
 */

import type { ExpanseTheme, ThemeMode } from "@expanse/theme"
import {
  // Primary tier palettes
  lightThemePalette,
  darkThemePalette,
  blueLightThemePalette,
  blueDarkThemePalette,
  redLightThemePalette,
  redDarkThemePalette,
  // Secondary tier palettes
  orangeLightThemePalette,
  orangeDarkThemePalette,
  neonLightPalette,
  neonDarkPalette,
  monoLightThemePalette,
  monoDarkThemePalette,
  // Tertiary tier palettes
  greenLightThemePalette,
  greenDarkThemePalette,
  tealLightThemePalette,
  tealDarkThemePalette,
  gamifiedLightPalette,
  gamifiedDarkPalette,
  gamifiedDesaturatedLightPalette,
  gamifiedDesaturatedDarkPalette,
  // Shadows
  lightThemeShadows,
  darkThemeEmptyShadowArray,
  neonLightEmptyShadowArray,
  neonDarkEmptyShadowArray,
  monoLightEmptyShadowArray,
  monoDarkEmptyShadowArray,
  gamifiedLightEmptyShadowArray,
  gamifiedDarkEmptyShadowArray,
  gamifiedDesaturatedLightEmptyShadowArray,
  gamifiedDesaturatedDarkEmptyShadowArray,
} from "@expanse/theme"

/**
 * Palette lookup by theme color and mode
 */
export const PALETTES: Record<ExpanseTheme, Record<ThemeMode, any>> = {
  // PRIMARY TIER (blue = #1 focus, red = #2, neon = #3)
  blue: { light: blueLightThemePalette, dark: blueDarkThemePalette },
  red: { light: redLightThemePalette, dark: redDarkThemePalette },
  neon: { light: neonLightPalette, dark: neonDarkPalette },
  // SECONDARY TIER (purple deprecated)
  orange: { light: orangeLightThemePalette, dark: orangeDarkThemePalette },
  mono: { light: monoLightThemePalette, dark: monoDarkThemePalette },
  purple: { light: lightThemePalette, dark: darkThemePalette },
  // TERTIARY TIER
  green: { light: greenLightThemePalette, dark: greenDarkThemePalette },
  teal: { light: tealLightThemePalette, dark: tealDarkThemePalette },
  gamified: { light: gamifiedLightPalette, dark: gamifiedDarkPalette },
  "gamified-desaturated": { light: gamifiedDesaturatedLightPalette, dark: gamifiedDesaturatedDarkPalette },
}

/**
 * Default shadows by mode
 */
export const DEFAULT_SHADOWS: Record<ThemeMode, any> = {
  light: lightThemeShadows,
  dark: darkThemeEmptyShadowArray,
}

/**
 * Theme-specific shadows (some themes use empty shadows)
 */
export const SHADOWS_BY_THEME: Record<ExpanseTheme, Record<ThemeMode, any>> = {
  // PRIMARY TIER
  blue: DEFAULT_SHADOWS,
  red: DEFAULT_SHADOWS,
  neon: { light: neonLightEmptyShadowArray, dark: neonDarkEmptyShadowArray },
  // SECONDARY TIER (purple deprecated)
  orange: DEFAULT_SHADOWS,
  mono: { light: monoLightEmptyShadowArray, dark: monoDarkEmptyShadowArray },
  purple: DEFAULT_SHADOWS,
  // TERTIARY TIER
  green: DEFAULT_SHADOWS,
  teal: DEFAULT_SHADOWS,
  gamified: { light: gamifiedLightEmptyShadowArray, dark: gamifiedDarkEmptyShadowArray },
  "gamified-desaturated": { light: gamifiedDesaturatedLightEmptyShadowArray, dark: gamifiedDesaturatedDarkEmptyShadowArray },
}

/**
 * All available theme colors
 */
export const THEME_COLORS: ExpanseTheme[] = [
  "blue", "red", "neon",
  "orange", "mono", "purple",
  "green", "teal", "gamified", "gamified-desaturated",
]

/**
 * Theme modes
 */
export const THEME_MODES: ThemeMode[] = ["light", "dark"]
