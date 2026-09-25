/**
 * Prompts Module Index
 * Exports prompt utilities and type re-exports
 *
 * NOTE: buildElementNamingPrompt has moved to the backend:
 * @see /api/lottie-naming/generate-element-names/elementNamingService.ts
 */

// Base utilities
export {
  composePromptSections,
  createSectionDivider,
  wrapInCodeBlock,
  createJsonSection,
  type PromptBuilder,
  type PromptSection,
} from "./base"

// Element Naming Type Re-exports (prompt building is on backend)
export type {
  ExpanseLottieElementDetails,
  ElementType,
  RoleFunction,
  VisualLevel,
  SemanticRole,
  GradientColorStop,
} from "./elementNaming"

// Element Naming Instructions (still exported for backend use)
export { allEdgeCaseInstructions, allFewShotExamples } from "./elementNaming"

// Metadata Analysis Type Re-exports (prompt building is on backend)
export type {
  ApplicationContext,
  ContextSpecificMetaData,
  ExpanseLottieMetadata,
} from "./metadataAnalysis"
