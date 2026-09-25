/**
 * @expanse/theme - Theme Configuration Exports
 * 
 * Themes are organized by tier:
 * - PRIMARY: Core business themes (blue, red, purple)
 * - SECONDARY: Broader appeal themes (orange, neon, mono)
 * - TERTIARY: Exploration/fun themes (green, teal, gamified, gamified-desaturated)
 * 
 * Note: Component theme configs have been moved to their respective packages:
 * - @expanse/brand-core: ProgressBar, Gem, ExperienceIcon, ExpanseCharacter, ExpandingBorderBox
 * - @expanse/shell: NavigationPad, BoardChrome, FloatingToolbar, Tile, GameDrawer
 */

// ============================================================================
// COMMON
// ============================================================================

export { AppBarHeight } from "./theme-constants"

export {
  spacing,
  typography,
  breakpoints,
  zIndex,
  mixins,
  getComponents,
} from "./common-theme"

// ============================================================================
// PRIMARY TIER - Core Business Themes
// ============================================================================

// Purple (brand) theme - formerly "primary"
export {
  lightThemePalette,
  lightThemeShadows,
} from "./themes/primary/purple/light-theme"

export {
  darkThemePalette,
  darkThemeEmptyShadowArray,
} from "./themes/primary/purple/dark-theme"

// Blue theme
export {
  blueLightThemePalette,
} from "./themes/primary/blue/blue-light-theme"

export {
  blueDarkThemePalette,
} from "./themes/primary/blue/blue-dark-theme"

// Red theme
export {
  redLightThemePalette,
} from "./themes/primary/red/red-light-theme"

export {
  redDarkThemePalette,
} from "./themes/primary/red/red-dark-theme"

// ============================================================================
// SECONDARY TIER - Broader Appeal Themes
// ============================================================================

// Orange theme
export {
  orangeLightThemePalette,
} from "./themes/secondary/orange/orange-light-theme"

export {
  orangeDarkThemePalette,
} from "./themes/secondary/orange/orange-dark-theme"

// Neon theme (electric cyan/mint)
export * from "./themes/secondary/neon"

// Mono theme (grayscale for mental health/wellness)
export {
  monoLightThemePalette,
  monoLightEmptyShadowArray,
  MONO_BLACK,
  MONO_CHARCOAL,
  MONO_DARK,
  MONO_MEDIUM,
  MONO_LIGHT,
  MONO_PALE,
  MONO_PAPER,
  MONO_WHITE,
  MONO_SUCCESS,
  MONO_ERROR,
  MONO_WARNING,
  MONO_INFO,
} from "./themes/secondary/mono/mono-light-theme"

export {
  monoDarkThemePalette,
  monoDarkEmptyShadowArray,
} from "./themes/secondary/mono/mono-dark-theme"

// ============================================================================
// TERTIARY TIER - Exploration & Fun Themes
// ============================================================================

// Green theme
export {
  greenLightThemePalette,
} from "./themes/tertiary/green/green-light-theme"

export {
  greenDarkThemePalette,
} from "./themes/tertiary/green/green-dark-theme"

// Teal theme
export {
  tealLightThemePalette,
} from "./themes/tertiary/teal/teal-light-theme"

export {
  tealDarkThemePalette,
} from "./themes/tertiary/teal/teal-dark-theme"

// Gamified theme (vibrant game abilities)
export {
  gamifiedDarkPalette,
  gamifiedDarkEmptyShadowArray,
} from "./themes/tertiary/gamified/gamified-dark-theme"

export {
  gamifiedLightPalette,
  gamifiedLightEmptyShadowArray,
} from "./themes/tertiary/gamified/gamified-light-theme"

// Gamified Desaturated theme (Japan-style soft palette)
export {
  gamifiedDesaturatedDarkPalette,
  gamifiedDesaturatedDarkEmptyShadowArray,
} from "./themes/tertiary/gamified-desaturated/gamified-desaturated-dark-theme"

export {
  gamifiedDesaturatedLightPalette,
  gamifiedDesaturatedLightEmptyShadowArray,
} from "./themes/tertiary/gamified-desaturated/gamified-desaturated-light-theme"
