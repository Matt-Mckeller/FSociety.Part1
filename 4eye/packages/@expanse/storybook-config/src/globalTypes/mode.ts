/**
 * modeGlobalType - Light/Dark mode toolbar control
 *
 * Adds a toolbar button to switch between light and dark mode.
 * The selected value is available as `context.globals.mode`.
 *
 * @example
 * ```tsx
 * // In preview.tsx
 * export const globalTypes = {
 *   mode: modeGlobalType,
 * }
 *
 * // In a decorator
 * const mode = context.globals.mode // "light" | "dark"
 * ```
 */

import { themeModeItems, DEFAULT_MODE } from "../toolbar"

export const modeGlobalType = {
  name: "Mode",
  description: "Light or dark mode",
  defaultValue: DEFAULT_MODE,
  toolbar: {
    icon: "circlehollow",
    items: themeModeItems,
    showName: false,
    dynamicTitle: true,
  },
}
