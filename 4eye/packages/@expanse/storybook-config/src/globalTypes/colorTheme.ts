/**
 * colorThemeGlobalType - Color theme toolbar control
 *
 * Adds a toolbar dropdown to switch between color themes (purple, neon, slate, etc.).
 * The selected value is available as `context.globals.colorTheme`.
 *
 * @example
 * ```tsx
 * // In preview.tsx
 * export const globalTypes = {
 *   colorTheme: colorThemeGlobalType,
 * }
 *
 * // In a decorator
 * const colorTheme = context.globals.colorTheme // "purple" | "neon" | ...
 * ```
 */

import { themeColorItems, DEFAULT_COLOR } from "../toolbar"

export const colorThemeGlobalType = {
  name: "Color Theme",
  description: "Theme color palette",
  defaultValue: DEFAULT_COLOR,
  toolbar: {
    icon: "paintbrush",
    items: themeColorItems,
    showName: false,
    dynamicTitle: true,
  },
}
