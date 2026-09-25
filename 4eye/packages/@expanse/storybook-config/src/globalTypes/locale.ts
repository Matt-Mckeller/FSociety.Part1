/**
 * localeGlobalType - Locale toolbar control
 *
 * Adds a toolbar dropdown to switch locales (en-US, es-MX, etc.).
 * The selected value is available as `context.globals.locale`.
 *
 * @example
 * ```tsx
 * // In preview.tsx
 * export const globalTypes = {
 *   locale: localeGlobalType,
 * }
 *
 * // In a decorator
 * const locale = context.globals.locale // "en-US" | "es-MX" | ...
 * ```
 */

import { localeConfigs } from "@expanse/i18n"

export const localeGlobalType = {
  name: "Locale",
  description: "Language and region for formatting",
  defaultValue: "en-US",
  toolbar: {
    icon: "globe",
    items: Object.values(localeConfigs).map((config) => ({
      value: config.code,
      title: `${config.flag} ${config.nativeName}`,
    })),
    showName: false,
    dynamicTitle: true,
  },
}
