/**
 * Theme Generation Service
 *
 * Provides AI-powered theme generation for Lottie animations
 */

// Theme generator
export { generateThemes } from "./themeGenerator"

// File generators
export {
  generateThemeFileContent,
  generateThemeFilename,
  generateAllThemeFiles,
  generateConsolidatedThemesFile,
  generateComponentFileContent,
  generateRegistryEntrySnippet,
  generateThemeIndexContent,
  generateAnimationThemesFileContent,
  getAnimationThemesFilename,
} from "./themeFileGenerator"

// Color palettes
export {
  COLOR_PALETTES,
  BASE_COLORS,
  getPaletteById,
  getPalettesByBaseColor,
  getPalettesByMode,
  formatPaletteForPrompt,
} from "./colorPalettes"
export type { ColorPalette, BaseColor } from "./colorPalettes"

// Types
export type {
  ThemeGenerationRequest,
  ThemeGenerationResult,
  ThemeGenerationProgress,
  GeneratedTheme,
  ThemeGenerationError,
  AIThemeGenerationResponse,
  ElementContextInfo,
} from "./types"
