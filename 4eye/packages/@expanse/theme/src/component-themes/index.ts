/**
 * @expanse/theme - Theme Module
 *
 * This module provides everything needed for layout component theming:
 *
 * ## Types
 * - `NavigationPadThemeProps`, `BoardChromeThemeProps`, etc. - Component theme types
 * - `LayoutComponentsThemeProps` - Aggregate type for MUI augmentation
 *
 * ## Augmentation
 * Import `@expanse/theme/component-themes/augmentation` to extend MUI's Components interface
 *
 * ## Factory Functions
 * Factory functions that create component theme configs from a Palette:
 * - `createGameDrawerConfig(palette)` - Simple width config
 * - `createNavigationPadConfig(palette)` - Navigation buttons with glass styling
 * - `createBoardChromeConfig(palette)` - Overlay chrome elements
 * - `createFloatingToolbarConfig(palette)` - Floating action bars
 * - `createTileConfig(palette)` - Grid tiles with selection states
 *
 * ## Usage with ThemeProvider
 *
 * ```tsx
 * import { ThemeProvider } from "@expanse/theme"
 * import {
 *   createNavigationPadConfig,
 *   createBoardChromeConfig,
 *   // ... other factories
 * } from "@expanse/theme"
 *
 * // Create extensions per mode
 * function createLayoutExtensions(palette: Palette) {
 *   return {
 *     ExpanseNavigationPad: createNavigationPadConfig(palette),
 *     ExpanseBoardChrome: createBoardChromeConfig(palette),
 *     // ... etc
 *   }
 * }
 *
 * <ThemeProvider
 *   componentExtensions={{
 *     light: createLayoutExtensions(lightPalette),
 *     dark: createLayoutExtensions(darkPalette),
 *   }}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */

// Types
export * from "./types"

// Factory functions
export * from "./factories"

// MUI module augmentation (adds Expanse* component theme props to Components)
import "./augmentation"
