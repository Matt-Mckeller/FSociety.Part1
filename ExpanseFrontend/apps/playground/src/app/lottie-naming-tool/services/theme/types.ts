/**
 * Types for Theme Generation Service
 */

import type {
  ExpanseLottieElementDetails,
  ExpanseLottie,
} from "expanse.dynamicAssets"
import type { ColorPalette, BaseColor } from "./colorPalettes"

/**
 * Request to generate themes for an animation
 */
export interface ThemeGenerationRequest {
  /** Animation name in PascalCase */
  animationName: string
  /** ExpanseLottie schema with element definitions */
  schema: ExpanseLottie
  /** Original Lottie JSON (for context) */
  lottieJson: any
  /** Which palettes to generate themes for */
  palettes: ColorPalette[]
  /** Variant name (e.g., "default", "minimal") */
  variant?: string
  /** Optional callback for streaming progress */
  onProgress?: (update: ThemeGenerationProgress) => void
  /**
   * Allow AI to venture outside the provided color palettes to create better themes.
   * When true, AI can use colors not in the palette if they create a more cohesive result.
   * Defaults to true.
   */
  allowCreativeColors?: boolean
}

/**
 * Progress update during theme generation
 */
export interface ThemeGenerationProgress {
  /** Current phase of generation */
  phase: "initializing" | "generating" | "complete" | "error"
  /** Index of current theme being generated */
  currentThemeIndex: number
  /** Total number of themes to generate */
  totalThemes: number
  /** ID of current theme being generated */
  currentThemeId?: string
  /** Progress message for UI */
  message: string
  /** Any error that occurred */
  error?: string
}

/**
 * Generated theme result
 */
export interface GeneratedTheme {
  /** Theme identifier (e.g., "default-blue-dark") */
  themeId: string
  /** Palette used to generate this theme */
  palette: ColorPalette
  /** Generated color mappings */
  colors: Record<string, string>
  /** Elements that were skipped */
  skippedElements: string[]
  /** Human-readable name */
  name: string
  /** Theme description */
  description: string
  /** Generation metadata */
  generatedAt: string
}

/**
 * Result of theme generation
 */
export interface ThemeGenerationResult {
  /** Animation name */
  animationName: string
  /** Variant name */
  variant: string
  /** All generated themes */
  themes: GeneratedTheme[]
  /** Any errors during generation */
  errors: ThemeGenerationError[]
}

/**
 * Error during theme generation
 */
export interface ThemeGenerationError {
  /** Theme ID that failed */
  themeId: string
  /** Error message */
  message: string
  /** Whether it's recoverable */
  recoverable: boolean
}

/**
 * AI response for theme generation (1-3 themes per call)
 */
export interface AIThemeGenerationResponse {
  /** Generated themes */
  themes: Array<{
    themeId: string
    name: string
    description: string
    baseColor: BaseColor
    mode: "light" | "dark"
    colors: Record<string, string>
    skippedElements: string[]
    reasoning?: string
  }>
}

/**
 * Element info for AI context
 */
export interface ElementContextInfo {
  /** Element name (e.g., "PencilBodyFill") */
  name: string
  /** Element path in Lottie JSON */
  path: string
  /** Original color (if available) */
  originalColor?: string
  /** Element type */
  type?: "fill" | "stroke" | "gradient" | "unknown"
  /** Role/purpose of element */
  role?: string
  /** Visual level (foreground, background, etc.) */
  visualLevel?: string
}
