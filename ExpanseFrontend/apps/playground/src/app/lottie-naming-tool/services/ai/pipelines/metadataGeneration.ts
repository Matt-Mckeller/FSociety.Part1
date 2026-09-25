/**
 * Metadata Generation Pipeline
 *
 * This is now a thin client that calls the backend API.
 * All AI logic (prompt building, Gemini calls, type reading) happens on the server.
 * @see /api/lottie-naming/generate-metadata/metadataService.ts
 */

import type {
  MetadataRequest,
  MetadataResponse,
  ProgressCallback,
  AIOperationResult,
} from "../types"

/**
 * Execute metadata generation via backend API
 */
export async function executeMetadataGeneration(
  request: MetadataRequest,
  options?: {
    onProgress?: ProgressCallback
  },
): Promise<AIOperationResult<MetadataResponse>> {
  const startTime = Date.now()
  const requestId = `metadata-${Date.now()}`

  try {
    // Report progress: initialization
    options?.onProgress?.({
      phase: "initialization",
      progress: 0,
      message: "🚀 Starting metadata analysis...",
    })

    // Report progress: analyzing
    options?.onProgress?.({
      phase: "analyzing",
      progress: 25,
      message: "📊 Analyzing animation structure and visual elements...",
    })

    // Call backend API
    const response = await fetch("/api/lottie-naming/generate-metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lottieJson: request.lottieData,
        userProvidedMetadata: request.userProvidedMetadata,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to generate metadata")
    }

    // Report progress: complete
    options?.onProgress?.({
      phase: "completed",
      progress: 100,
      message: "✅ Metadata generation complete!",
    })

    return {
      success: true,
      data: result.metadata,
      requestId,
      durationMs: result.durationMs || Date.now() - startTime,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate metadata"

    options?.onProgress?.({
      phase: "error",
      progress: 0,
      message: `❌ ${errorMessage}`,
    })

    return {
      success: false,
      error: errorMessage,
      requestId,
      durationMs: Date.now() - startTime,
    }
  }
}

/**
 * Legacy wrapper for backward compatibility
 * Maps to the existing analyzeLottieJsonMetadata signature
 */
export async function analyzeLottieJsonMetadata(input: {
  lottieJson: MetadataRequest["lottieData"]
  userProvidedMetadata?: MetadataRequest["userProvidedMetadata"]
}): Promise<MetadataResponse> {
  const result = await executeMetadataGeneration({
    lottieData: input.lottieJson,
    userProvidedMetadata: input.userProvidedMetadata,
  })

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to generate metadata")
  }

  return result.data
}
