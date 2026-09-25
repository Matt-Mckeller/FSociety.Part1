/**
 * @expanse/theme - MUI Theme Augmentation
 *
 * Extends MUI's Components interface with layout component theme props.
 * Import this file to add type support for layout components in theme.components.
 *
 * Usage:
 * ```ts
 * import "@expanse/theme/component-themes/augmentation"
 *
 * const theme = createTheme({
 *   components: {
 *     ExpanseNavigationPad: { ... }, // Now type-safe
 *     ExpanseBoardChrome: { ... },
 *   }
 * })
 * ```
 */

import type { LayoutComponentsThemeProps } from "./types"

declare module "@mui/material/styles" {
  interface Components<Theme = unknown> extends LayoutComponentsThemeProps {}
}

