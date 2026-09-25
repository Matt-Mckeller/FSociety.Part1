/**
 * timezoneGlobalType - Timezone toolbar control
 *
 * Adds a toolbar dropdown to switch timezones.
 * The selected value is available as `context.globals.timezone`.
 *
 * @example
 * ```tsx
 * // In preview.tsx
 * export const globalTypes = {
 *   timezone: timezoneGlobalType,
 * }
 *
 * // In a decorator
 * const timezone = context.globals.timezone // "local" | "America/New_York" | ...
 * ```
 */

import { timezoneConfigs } from "@expanse/i18n"

export const timezoneGlobalType = {
  name: "Timezone",
  description: "Timezone for date/time display",
  defaultValue: "local",
  toolbar: {
    icon: "time",
    items: Object.values(timezoneConfigs).map((config) => ({
      value: config.id,
      title: `${config.icon} ${config.abbr} (${config.utcOffset})`,
    })),
    showName: false,
    dynamicTitle: true,
  },
}
