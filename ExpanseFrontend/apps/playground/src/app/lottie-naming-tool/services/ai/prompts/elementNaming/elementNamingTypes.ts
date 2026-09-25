/**
 * Element Naming Types
 *
 * Re-exports types from the canonical source for frontend usage.
 *
 * NOTE: The hardcoded TYPE_DEFINITIONS string has been removed.
 * Type reading now happens on the backend at runtime:
 * @see /api/lottie-naming/generate-element-names/typeReader.ts
 */

// Re-export element types from canonical source
export type {
  ExpanseLottieElementDetails,
  ElementType,
  RoleFunction,
  VisualLevel,
  SemanticRole,
  GradientColorStop,
} from "expanse.dynamicAssets"
