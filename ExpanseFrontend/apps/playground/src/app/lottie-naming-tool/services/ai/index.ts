/**
 * Unified AI Service
 * Single entry point for all AI operations in the Lottie Naming Tool
 *
 * This module provides:
 * - Element naming (generateComponentNamesGemini)
 * - Metadata generation (analyzeLottieJsonMetadata)
 * - Unified types and utilities
 *
 * Usage:
 * ```typescript
 * import {
 *   executeElementNaming,
 *   executeMetadataGeneration,
 *   // Legacy wrappers for backward compatibility
 *   generateComponentNamesGemini,
 *   analyzeLottieJsonMetadata,
 * } from './services/ai'
 * ```
 */

// =============================================================================
// Pipeline Operations (Primary API)
// =============================================================================

export {
  // Element Naming
  executeElementNaming,
  generateComponentNamesGemini,
  // Metadata Generation
  executeMetadataGeneration,
  analyzeLottieJsonMetadata,
} from "./pipelines"

// =============================================================================
// Types
// =============================================================================

export type {
  // Common Types
  CapturedFrame,
  AIProvider,
  BaseAIRequest,
  StreamCallback,
  ProgressCallback,
  ProgressUpdate,
  AIOperationResult,
  // Element Naming Types
  ElementNamingRequest,
  ElementNamingResponse,
  // Metadata Types
  MetadataRequest,
  MetadataResponse,
  // Re-exported from packages
  LottieData,
  ExpanseLottieElementDetails,
  ExpanseLottieMetadata,
} from "./types"

// =============================================================================
// Prompt Utilities (for advanced customization)
// =============================================================================

export {
  // Utilities
  composePromptSections,
  createSectionDivider,
  wrapInCodeBlock,
  createJsonSection,
  // Element naming instructions (for backend use)
  allEdgeCaseInstructions,
  allFewShotExamples,
  // Metadata types (prompt building is on backend)
  type ApplicationContext,
  type ContextSpecificMetaData,
} from "./prompts"

// =============================================================================
// Client (for advanced use cases)
// =============================================================================

export {
  createTextModel,
  createJsonModel,
  generateContent,
  generateContentStream,
  MODEL_CONFIG,
} from "./client/geminiClient"

// =============================================================================
// Logger (for debugging)
// =============================================================================

export { aiLogger } from "./logger/aiLogger"
export type { AIInteraction } from "./logger/aiLogger"

// =============================================================================
// Parsers (for custom parsing needs)
// =============================================================================

export {
  extractJsonFromResponse,
  safeJsonParse,
  parseNestedJsonStrings,
  validateRequiredFields,
} from "./parsers/jsonParser"
