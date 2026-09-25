import type { ThemeMode, ExpanseTheme } from "@expanse/theme"

/**
 * Factory function that packages provide to add their component themes.
 *
 * @param palette - The current palette object
 * @param color - The current color theme (purple, neon, etc.)
 * @param mode - The current mode (light/dark)
 * @returns Component theme extensions to merge into MUI theme
 *
 * @example
 * ```tsx
 * const brandCoreFactory: ComponentExtensionFactory = (palette, color, mode) => {
 *   return createBrandCoreTheme(palette)
 * }
 * ```
 */
export type ComponentExtensionFactory = (
  palette: any,
  color: ExpanseTheme,
  mode: ThemeMode
) => Record<string, unknown>
