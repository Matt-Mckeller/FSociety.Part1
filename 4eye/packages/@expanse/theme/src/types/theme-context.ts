/**
 * Theme Context Types
 * 
 * Types for React theme provider and context.
 */

import { Theme } from "@mui/material"
import type { ExpanseTheme } from "./theme-identifiers"

/**
 * Theme mode (light or dark)
 */
export type ThemeMode = "light" | "dark"

/**
 * Initial theme mode setting
 * - "light" / "dark": Force specific mode
 * - "system": Detect from OS preference (prefers-color-scheme)
 */
export type InitialThemeMode = ThemeMode | "system"

/**
 * Map of component theme configs by light/dark mode.
 * 
 * Used to pass app-specific or package-specific component theme
 * configurations to the ThemeProvider.
 * 
 * @example
 * ```ts
 * const extensions: ComponentExtensionMap = {
 *   light: {
 *     ProgressBar: createProgressBarConfig(purpleLightPalette),
 *     NavigationPad: createNavigationPadConfig(purpleLightPalette),
 *   },
 *   dark: {
 *     ProgressBar: createProgressBarConfig(purpleDarkPalette),
 *     NavigationPad: createNavigationPadConfig(purpleDarkPalette),
 *   },
 * }
 * ```
 */
export interface ComponentExtensionMap {
  /** Component configs for light mode */
  light?: Record<string, unknown>
  /** Component configs for dark mode */
  dark?: Record<string, unknown>
}

/**
 * Props for ThemeProvider component
 */
export interface ThemeProviderProps {
  children: React.ReactNode
  /** Color theme to use */
  initialTheme?: ExpanseTheme
  /** Light/dark mode or "system" for OS preference detection */
  initialThemeMode?: InitialThemeMode
  /**
   * App-specific component theme extensions.
   * 
   * These are merged on top of the base theme's component configs,
   * allowing packages to provide their own themed component configurations.
   * 
   * @example
   * ```tsx
   * import { createProgressBarConfig } from "@expanse/brand-core/theme"
   * import { purpleLightPalette, purpleDarkPalette } from "@expanse/theme"
   * 
   * const extensions = {
   *   light: { ProgressBar: createProgressBarConfig(purpleLightPalette) },
   *   dark: { ProgressBar: createProgressBarConfig(purpleDarkPalette) },
   * }
   * 
   * <ThemeProvider componentExtensions={extensions}>
   *   <App />
   * </ThemeProvider>
   * ```
   */
  componentExtensions?: ComponentExtensionMap
}

/**
 * Theme context value interface
 */
export interface ThemeContextProps {
  /** The current MUI theme object */
  currentTheme: Theme
  /** Current light/dark mode */
  themeMode: ThemeMode
  /** Current color theme selection */
  themeSelection: ExpanseTheme
  /** Update light/dark mode */
  setThemeMode: (mode: ThemeMode) => void
  /** Update color theme */
  setThemeSelection: (theme: ExpanseTheme) => void
  /** Toggle between light and dark mode */
  toggleThemeMode: () => void
}
