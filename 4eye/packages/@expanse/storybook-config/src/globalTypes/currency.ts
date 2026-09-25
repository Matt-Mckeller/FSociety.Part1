/**
 * currencyGlobalType - Currency toolbar control
 *
 * Adds a toolbar dropdown to switch currencies.
 * The selected value is available as `context.globals.currency`.
 *
 * @example
 * ```tsx
 * // In preview.tsx
 * export const globalTypes = {
 *   currency: currencyGlobalType,
 * }
 *
 * // In a decorator
 * const currency = context.globals.currency // "USD" | "EUR" | ...
 * ```
 */

import { currencyConfigs } from "@expanse/i18n"

export const currencyGlobalType = {
  name: "Currency",
  description: "Currency for price display",
  defaultValue: "USD",
  toolbar: {
    icon: "credit",
    items: Object.values(currencyConfigs).map((config) => ({
      value: config.code,
      title: `${config.icon} ${config.code} (${config.symbol})`,
    })),
    showName: false,
    dynamicTitle: true,
  },
}
