/**
 * Lottie Color Mapping Utilities
 *
 * Utilities for applying color mappings to Lottie animations using
 * layer-config.json and theme files.
 *
 * This approach separates structure (layer-config) from styling (themes),
 * making it easy to create and manage multiple color themes.
 */

import { cloneDeep, set } from "lodash"
import type { ExpanseLottieSchema } from "../types/ExpanseLottie"

/**
 * Element configuration interface
 * Defines individual elements that can be themed
 */
export interface ElementConfig {
  name: string
  path: string
  originalColor: string
  variant?: string
  elementType?:
    | "fill"
    | "stroke"
    | "gradient"
    | "group"
    | "layer"
    | "effect"
    | "transform"
    | "unknown"
}

/**
 * Theme file interface
 * Comprehensive theme configuration with metadata
 */
export interface ThemeConfig {
  /** Theme identifier (e.g., "purple-light", "blue-dark") */
  themeId: string
  /** Human-readable theme name */
  name: string
  /** Theme description */
  description: string
  /** Base color name (purple, blue, green, etc.) */
  baseColor: string
  /** Light or dark mode */
  mode: "light" | "dark"
  /** Color mappings for themeable elements */
  colors: Record<string, string> // elementId -> hex color
  /** Optional theme-specific overrides */
  overrides?: Record<string, any>
  /** Theme metadata */
  metadata?: {
    created?: string
    version?: string
    author?: string
  }
}

/**
 * Lottie Theme Configuration
 *
 * Shared type for actual theme files (e.g., blue-dark.ts, purple-light.ts).
 * Based on the blueDarkTheme structure for consistency.
 */
export interface LottieThemeConfig {
  /** Theme identifier (e.g., "blue-dark", "purple-light") */
  themeId: string
  /** Human-readable theme name */
  name: string
  /** Theme description */
  description: string
  /** Base color name (purple, blue, green, etc.) */
  baseColor: string
  /** Light or dark mode */
  mode: "light" | "dark"
  /** Color mappings for themeable elements */
  colors: Record<string, string> // elementId -> hex color
  /** Element IDs to skip during theming */
  skippedElements: string[]
  /** Optional theme-specific overrides */
  overrides?: Record<string, any>
  /** Theme metadata */
  metadata?: {
    created?: string
    version?: string
    author?: string
  }
}

/**
 * Convert hex color to Lottie RGB array format
 *
 * Lottie expects colors as [r, g, b, a] where values are 0-1
 *
 * @param hex - Hex color string (e.g., "#FF5733" or "FF5733")
 * @returns RGB array [r, g, b, 1] with values 0-1
 *
 * @example
 * hexToLottieRgb("#FF5733") // [1, 0.341, 0.2, 1]
 */
export function hexToLottieRgb(hex: string): [number, number, number, number] {
  // Remove # if present
  const cleanHex = hex.replace("#", "")

  // Parse hex values
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255

  return [r, g, b, 1]
}

/**
 * Apply color mappings to Lottie animation data
 *
 * Takes a base animation, layer config, and theme colors,
 * then applies the theme colors to the appropriate layers.
 *
 * **Skipping Layers:**
 * Elements omitted from themeColors will retain their original colors.
 * This allows selective theming (e.g., only change the halo, keep wings unchanged).
 *
 * @param baseAnimationData - Original Lottie animation JSON
 * @param layerConfig - Layer configuration (from layer-config.json)
 * @param themeColors - Theme color mappings (from themes/*.json). Only includes elements to change.
 * @returns New animation data with colors applied
 *
 * @example
 * // Theme all elements
 * const themed = applyColorMapping(
 *   baseAnimation,
 *   layerConfig,
 *   { "LeftWingOuterFeatherFill": "#b19cd9", "HaloGradientFill2": "#6a1b9a", ... }
 * )
 *
 * @example
 * // Theme only halo (skip wings)
 * const haloOnly = applyColorMapping(
 *   baseAnimation,
 *   layerConfig,
 *   { "HaloGradientFill2": "#ff1744", "HaloGradientFill5": "#ff5252" }
 * )
 */
export function applyColorMapping(
  baseAnimationData: any,
  elementConfig: LottieThemeConfig,
  elementPaths: Record<string, string>, // elementId -> path mapping
): any {
  // Deep clone to avoid mutating the original
  const animationData = cloneDeep(baseAnimationData)

  // Apply each color mapping from the theme
  Object.entries(elementConfig.colors).forEach(([elementId, hexColor]) => {
    // Skip elements that are marked as skipped
    if (elementConfig.skippedElements.includes(elementId)) {
      return
    }

    // Get the path for this element
    const path = elementPaths[elementId]
    if (!path) {
      console.warn(
        `[lottieColorMapping] No path found for element: ${elementId}`,
      )
      return
    }

    // Convert hex to Lottie RGB format
    const rgbColor = hexToLottieRgb(hexColor)

    // Apply color to the specified path
    try {
      set(animationData, path, rgbColor)
    } catch (error) {
      console.error(
        `[lottieColorMapping] Failed to set color for ${elementId} at path ${path}:`,
        error,
      )
    }
  })

  return animationData
}

/**
 * Create themed animation from layer config and theme
 *
 * Convenience function that combines loading and applying in one step.
 *
 * @param baseAnimationData - Original Lottie animation JSON
 * @param layerConfig - Layer configuration object
 * @param theme - Theme configuration object
 * @returns Themed animation data
 *
 * @example
 * import layerConfig from './layer-config.json'
 * import purpleTheme from './themes/purple.json'
 *
 * const themed = createThemedAnimationFromConfig(
 *   baseAnimation,
 *   layerConfig,
 *   purpleTheme
 * )
 */
export function createThemedAnimationFromConfig(
  baseAnimationData: any,
  elementConfig: LottieThemeConfig,
  elementPaths: Record<string, string>, // elementId -> path mapping
): any {
  return applyColorMapping(baseAnimationData, elementConfig, elementPaths)
}
