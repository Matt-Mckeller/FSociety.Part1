/**
 * directionGlobalType - Text direction toolbar control
 *
 * Adds a toolbar dropdown to switch text direction (LTR/RTL/Auto).
 * The selected value is available as `context.globals.direction`.
 *
 * @example
 * ```tsx
 * // In preview.tsx
 * export const globalTypes = {
 *   direction: directionGlobalType,
 * }
 *
 * // In a decorator
 * const direction = context.globals.direction // "auto" | "ltr" | "rtl"
 * ```
 */

export const directionGlobalType = {
  name: "Direction",
  description: "Text direction (LTR/RTL)",
  defaultValue: "auto",
  toolbar: {
    icon: "menu",
    items: [
      { value: "auto", title: "🔄 Auto (from locale)" },
      { value: "ltr", title: "➡️ LTR (Left-to-Right)" },
      { value: "rtl", title: "⬅️ RTL (Right-to-Left)" },
    ],
    showName: false,
    dynamicTitle: true,
  },
}
