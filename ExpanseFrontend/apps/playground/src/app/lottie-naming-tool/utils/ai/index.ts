/**
 * AI Services Module
 * Exports all AI-related functionality for Lottie naming
 *
 * NOTE: This module is being migrated to services/ai/
 * New code should import from:
 *   import { ... } from '../../services/ai'
 *
 * This file remains for backward compatibility during migration.
 */

// Claude Service
export {
  generateComponentNames,
  generateComponentNamesMultiPhase,
} from "./claudeService"

// Gemini Service
export { generateComponentNamesGemini } from "./geminiService"

// Shared utilities (exported for testing/advanced use)
export {
  needsChunking,
  createLayerHierarchy,
  detectElementTypeFromData,
} from "./shared"

// Parser (exported for testing/advanced use)
export { parseAIResponse } from "./responseParser"

// Prompts (exported for customization if needed)
export { buildSystemPrompt } from "./prompts"
