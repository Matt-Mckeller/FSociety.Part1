/**
 * Storybook Global Types
 *
 * Toolbar control definitions for theme and i18n settings.
 * Standardized naming: mode, colorTheme, locale, timezone, currency, direction
 */

// Individual global types
export { modeGlobalType } from "./mode"
export { colorThemeGlobalType } from "./colorTheme"
export { localeGlobalType } from "./locale"
export { timezoneGlobalType } from "./timezone"
export { currencyGlobalType } from "./currency"
export { directionGlobalType } from "./direction"

// Import for composition
import { modeGlobalType } from "./mode"
import { colorThemeGlobalType } from "./colorTheme"
import { localeGlobalType } from "./locale"
import { timezoneGlobalType } from "./timezone"
import { currencyGlobalType } from "./currency"
import { directionGlobalType } from "./direction"

/**
 * Complete globalTypes object for Storybook preview.
 * Includes theme and i18n controls.
 */
export const globalTypes = {
  mode: modeGlobalType,
  colorTheme: colorThemeGlobalType,
  direction: directionGlobalType,
  locale: localeGlobalType,
  timezone: timezoneGlobalType,
  currency: currencyGlobalType,
}

/**
 * Theme-only globalTypes (no i18n).
 * Use when a package doesn't need internationalization.
 */
export const themeGlobalTypes = {
  mode: modeGlobalType,
  colorTheme: colorThemeGlobalType,
}
