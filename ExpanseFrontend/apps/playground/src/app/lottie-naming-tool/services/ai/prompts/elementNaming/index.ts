/**
 * Element Naming Prompt Builder
 *
 * NOTE: The actual prompt building now happens on the backend.
 * This module re-exports types for frontend usage.
 * @see /api/lottie-naming/generate-element-names/elementNamingService.ts
 */

// Type re-exports for frontend usage
export type {
  ExpanseLottieElementDetails,
  ElementType,
  RoleFunction,
  VisualLevel,
  SemanticRole,
  GradientColorStop,
} from "./elementNamingTypes"

// Instructions re-exports (still used by backend via import)
export {
  pathFormatInstructions,
  colorFormatInstructions,
  colorExtractionRules,
  gradientExtractionInstructions,
  precompDetectionInstructions,
  allEdgeCaseInstructions,
} from "./instructions/edge-cases"

// Few-shot examples re-exports (still used by backend via import)
export {
  allFewShotExamples,
  getFewShotExamplesArray,
} from "./instructions/few-shot-examples"
