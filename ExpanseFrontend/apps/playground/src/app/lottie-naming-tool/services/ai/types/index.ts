/**
 * AI Service Types
 * Centralized type definitions for all AI operations
 */

import type { LottieData, CapturedFrame } from "../../../types/types"
import type {
  ExpanseLottieElementDetails,
  ExpanseLottieMetadata,
} from "expanse.dynamicAssets"

// Re-export for convenience
export type { CapturedFrame } from "../../../types/types"

// ============================================================================
// Common Types
// ============================================================================

/**
 * AI provider options
 */
export type AIProvider = "gemini" | "claude"

/**
 * Base request interface for all AI operations
 */
export interface BaseAIRequest {
  /** The Lottie animation data */
  lottieData: LottieData
  /** Optional captured frames for vision analysis */
  frames?: CapturedFrame[]
}

/**
 * Stream callback for real-time updates
 */
export type StreamCallback = (text: string) => void

// ============================================================================
// Element Naming Types
// ============================================================================

/**
 * Request for element naming operation
 */
export interface ElementNamingRequest extends BaseAIRequest {
  /** Animation name for context */
  animationName: string
  /** Animation description for context */
  description?: string
  /** Animation purpose for context */
  purpose?: string
  /** Whether to use vision mode */
  visionMode?: boolean
}

/**
 * Response from element naming operation
 */
export interface ElementNamingResponse {
  /** Record of element names to their details, keyed by element name */
  elements: Record<string, ExpanseLottieElementDetails>
}

// ============================================================================
// Metadata Generation Types
// ============================================================================

/**
 * Request for metadata generation operation
 */
export interface MetadataRequest extends BaseAIRequest {
  /** Original file name */
  fileName?: string
  /** User-provided metadata hints */
  userProvidedMetadata?: {
    description?: string
    purpose?: string
    title?: string
  }
}

/**
 * Response from metadata generation (re-export for convenience)
 */
export type MetadataResponse = ExpanseLottieMetadata

// ============================================================================
// Pipeline Types
// ============================================================================

/**
 * Result of an AI operation with metadata
 */
export interface AIOperationResult<T> {
  success: boolean
  data?: T
  error?: string
  requestId: string
  durationMs: number
}

/**
 * Progress update for long-running operations
 */
export interface ProgressUpdate {
  phase: "initialization" | "analyzing" | "naming" | "completed" | "error"
  progress: number // 0-100
  message: string
}

/**
 * Progress callback for tracking operation status
 */
export type ProgressCallback = (update: ProgressUpdate) => void

// ============================================================================
// Re-exports
// ============================================================================

export type { LottieData } from "../../../types/types"
export type {
  ExpanseLottieElementDetails,
  ExpanseLottieMetadata,
} from "expanse.dynamicAssets"
