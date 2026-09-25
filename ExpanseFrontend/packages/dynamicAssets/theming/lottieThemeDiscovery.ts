/**
 * @deprecated This file is deprecated. Import from './lottieThemeRegistry' instead.
 *
 * Lottie Theme Discovery Utility
 *
 * This file now re-exports from lottieThemeRegistry.ts for backwards compatibility.
 * All theme discovery functions have been consolidated into the registry.
 */

// Re-export everything from the consolidated registry
export {
  getThemesForVariant,
  getAllVariants,
  getAllThemes,
  themeExists,
  type ThemeVariant,
  type ThemeName,
} from "./lottieThemeRegistry"
