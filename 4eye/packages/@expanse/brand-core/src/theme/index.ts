/**
 * @expanse/brand-core Theme Module
 * 
 * Provides theme types and factory functions for brand-core components.
 * 
 * ## Usage
 * 
 * 1. Import the augmentation for TypeScript support (side-effect):
 * ```ts
 * import "@expanse/brand-core/theme/augmentation"
 * ```
 * 
 * 2. Import factory functions to create configs:
 * ```ts
 * import { createProgressBarConfig, createGemConfig } from "@expanse/brand-core/theme"
 * ```
 * 
 * 3. Create configs using palettes from @expanse/theme:
 * ```ts
 * import { purpleLightPalette, purpleDarkPalette } from "@expanse/theme"
 * 
 * const extensions = {
 *   light: {
 *     ProgressBar: createProgressBarConfig(purpleLightPalette),
 *     Gem: createGemConfig(purpleLightPalette),
 *   },
 *   dark: {
 *     ProgressBar: createProgressBarConfig(purpleDarkPalette),
 *     Gem: createGemConfig(purpleDarkPalette),
 *   },
 * }
 * ```
 * 
 * 4. Pass to ThemeProvider:
 * ```tsx
 * <ThemeProvider componentExtensions={extensions}>
 *   <App />
 * </ThemeProvider>
 * ```
 */

// Re-export types
export * from "./types"

// Re-export factories
export * from "./factories"
