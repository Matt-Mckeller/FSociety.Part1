// ============================================================================
// Import unified types from packages
// ============================================================================

import type {
  ExpanseLottie,
  ExpanseLottieElementDetails,
  GradientColorStop,
  RoleFunction,
  VisualLevel,
  SemanticRole,
  ElementType,
} from "expanse.dynamicAssets"

// Re-export for backwards compatibility
export type {
  ExpanseLottie,
  ExpanseLottieElementDetails,
  GradientColorStop,
  RoleFunction,
  VisualLevel,
  SemanticRole,
  ElementType,
}

// ============================================================================
// AI Response Types
// ============================================================================

/**
 * Response from AI naming operation.
 * This is the full ExpanseLottie schema combining metadata and elements.
 */
export type AINamingResponse = ExpanseLottie

/**
 * @deprecated Use ExpanseLottieElementDetails from expanse.dynamicAssets instead.
 * This type is kept for backwards compatibility but will be removed in a future version.
 */
export interface NameSuggestion {
  // Core identification (matches prompt exactly)
  path: string
  currentName?: string
  suggestedName: string
  originalColor?: string | GradientColorStop[] | null
  roleFunction?: RoleFunction
  visualLevel?: VisualLevel
  semanticRole?: SemanticRole
  needsName?: boolean

  // Computed/derived fields
  isThemeable?: boolean
  elementType?: ElementType
}

// ============================================================================
// Helper Functions & Utilities
// ============================================================================

/**
 * Check if a color value represents a themeable element
 */
export function hasThemeableColor(
  originalColor?: string | GradientColorStop[] | null,
): boolean {
  return originalColor !== null && originalColor !== undefined
}

/**
 * Check if color is a gradient (array of stops)
 */
export function isGradientColor(
  originalColor?: string | GradientColorStop[] | null,
): originalColor is GradientColorStop[] {
  return Array.isArray(originalColor)
}

/**
 * Get gradient stop count
 */
export function getGradientStopCount(
  originalColor?: string | GradientColorStop[] | null,
): number {
  return isGradientColor(originalColor) ? originalColor.length : 0
}
