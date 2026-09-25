/**
 * Lottie Theming Module
 *
 * Centralized theming system for Lottie animations.
 * Provides utilities for color mapping, theme loading, discovery, and registration.
 */

// Types re-exported from types package
export type {
  ExpanseLottie,
  ExpanseLottieElementDetails,
  RoleFunction,
  VisualLevel,
  SemanticRole,
  ElementType,
} from "../types"

// Color mapping utilities
export {
  applyColorMapping,
  type ElementConfig,
  type ThemeConfig,
  type LottieThemeConfig,
} from "./lottieColorMapping"

// Theme loader
export {
  loadTheme,
  preloadThemes,
  clearThemeCache,
  getCacheStats,
  isThemeCached,
} from "./lottieGenericThemeLoader"

// Theme registry (single source of truth for all theme/variant data)
export {
  THEME_REGISTRY,
  ANIMATION_THEME_SUPPORT,
  getThemeDefinition,
  getThemesByColor,
  getAvailableThemes,
  getAvailableVariants,
  isThemeAvailable,
  getThemesForVariant,
  getAllVariants,
  getAllThemes,
  themeExists,
  type ThemeVariant,
  type ThemeName,
  getAllVariants,
  getAllThemes,
  themeExists,
  type ThemeDefinition,
  type AnimationThemeSupport,
  type VariantThemeSupport,
} from "./lottieThemeRegistry"

// Theming utilities (color conversion, adaptive theming)
export {
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  createThemedAnimation,
  type LayerCustomization,
  type LayerCustomizations,
  type LottieFill,
  type LottieStroke,
  type LottieGroup,
  type LottieItem,
  type LottieShape,
  type LottieLayer,
} from "./lottieTheming"

// Themed Lottie hook
export { useThemedLottie, type UseThemedLottieOptions } from "./useThemedLottie"

// Lottie Component Factory
export {
  createLottieComponent,
  type LottieComponentProps,
  type LottieComponentRef,
  type LottieComponentConfig,
} from "./createLottieComponent"
