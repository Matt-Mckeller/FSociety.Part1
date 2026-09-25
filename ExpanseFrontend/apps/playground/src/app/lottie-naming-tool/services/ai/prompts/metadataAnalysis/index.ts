/**
 * Metadata Analysis Prompt Builder
 *
 * NOTE: The actual prompt building now happens on the backend.
 * This module re-exports types for frontend usage.
 * @see /api/lottie-naming/generate-metadata/metadataService.ts
 */

// Type re-exports for frontend usage
export type {
  ApplicationContext,
  ContextSpecificMetaData,
  ExpanseLottieMetadata,
} from "./metadataTypes"
