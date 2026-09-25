/**
 * TypeScript types for Lottie metadata analysis
 * Re-exports types from the canonical source for frontend usage
 *
 * NOTE: The fs-based type reading has been moved to the backend:
 * @see /api/lottie-naming/generate-metadata/typeReader.ts
 */

// Re-export from the canonical source for actual TypeScript usage
export type {
  ApplicationContext,
  ContextSpecificMetaData,
  ExpanseLottieMetadata,
} from "expanse.dynamicAssets"
