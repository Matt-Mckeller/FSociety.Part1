/**
 * @expanse/brand-core MUI Theme Augmentation
 * 
 * Extends MUI's Components interface with brand-core component theme types.
 * Import this file as a side-effect to enable TypeScript support:
 * 
 * @example
 * ```ts
 * import "@expanse/brand-core/theme/augmentation"
 * ```
 */

import type { BrandCoreComponentsThemeProps } from "./types"

declare module "@mui/material/styles" {
  interface Components<Theme = unknown> extends BrandCoreComponentsThemeProps {}
}
