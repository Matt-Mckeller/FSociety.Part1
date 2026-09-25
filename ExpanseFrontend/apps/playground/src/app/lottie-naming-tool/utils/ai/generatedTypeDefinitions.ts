/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from: packages/dynamicAssets/types/ExpanseLottie.ts
 * Generated at: 2025-10-24T21:32:06.401Z
 *
 * To regenerate: npm run generate:ai-types
 *
 * This file provides TypeScript type definitions to AI models for structured output.
 * It ensures the AI knows exactly what fields to include in its JSON responses.
 */

export const TYPE_DEFINITIONS = `
/**
 * Lottie Theme Types
 *
 * Type definitions for the Lottie theming system.
 * Separated from lottieColorMapping.ts for better organization.
 */

/**
 * Role function - core purpose of element in animation
 */
export type RoleFunction =
  | "primary_subject"
  | "supporting_object"
  | "background"
  | "text"
  | "ui_indicator"
  | "transition"
  | "highlight"
  | "mask"
  | "control"
  | "lighting"
  | "particle"
  | "other"

/**
 * Visual level - importance hierarchy
 */
export type VisualLevel = "primary" | "secondary" | "tertiary" | "hidden"

/**
 * Semantic role - semantic categorization
 */
export type SemanticRole =
  | "illustrative_object"
  | "decorative_element"
  | "motion_cue"
  | "structural_group"
  | "textual_element"
  | "interactive_component"
  | "effect"
  | "other"

/**
 * Element type detected from path
 */
export type ElementType =
  | "fill"
  | "stroke"
  | "gradient"
  | "group"
  | "layer"
  | "effect"
  | "transform"
  | "unknown"

/**
 * Gradient color stop with offset and color
 */
export interface GradientColorStop {
  offset: number // 0-1 range (0 = start, 1 = end)
  color: string // Hex format with alpha: "#rrggbbaa"
}

/**
 * Represents detailed information about a single element within a Lottie animation.
 * Used by AI to identify, categorize, and theme individual elements.
 */
export interface ExpanseLottieElementDetails {
  name: string
  alternativeNames?: string[]
  description: string
  path: string
  originalColor: string | GradientColorStop[] | null
  elementType?: ElementType
  roleFunction?: RoleFunction
  visualLevel?: VisualLevel
  semanticRole?: SemanticRole
  isThemeable?: boolean
  isSkinTone?: boolean
  isClothing?: boolean
  isEffect?: boolean
  isBackground?: boolean
  elementGroups: string[]
  tags?: string[]
}

export interface AnimationDescription {
  short: string
  detailed: string
  visualCharacteristics: string[]
}

export interface AINamingResponse {
  elementNames: ExpanseLottieElementDetails[] // Updated from NameSuggestion[]
  description: AnimationDescription
}
`
