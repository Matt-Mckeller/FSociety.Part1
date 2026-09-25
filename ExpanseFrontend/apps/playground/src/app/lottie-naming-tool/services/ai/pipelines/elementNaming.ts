/**
 * Element Naming Pipeline
 * Orchestrates the element naming AI operation via backend API
 */

import { aiLogger } from "../logger/aiLogger"
import type {
  ElementNamingRequest,
  ElementNamingResponse,
  StreamCallback,
  ProgressCallback,
  AIOperationResult,
  ProgressUpdate,
} from "../types"

/**
 * Execute element naming via backend API with optional streaming
 */
export async function executeElementNaming(
  request: ElementNamingRequest,
  options?: {
    onStream?: StreamCallback
    onProgress?: ProgressCallback
  },
): Promise<AIOperationResult<ElementNamingResponse>> {
  const requestId = aiLogger.generateRequestId("naming")
  const startTime = Date.now()

  const interaction = aiLogger.logRequest(
    "gemini",
    "executeElementNaming",
    request,
    requestId,
    !!options?.onStream,
  )

  try {
    // Report progress: initialization
    options?.onProgress?.({
      phase: "initialization",
      progress: 0,
      message: "🚀 Starting analysis...",
    })

    options?.onStream?.("🤖 Calling element naming API...\n\n")

    // Build request body
    const body = {
      lottieJson: request.lottieData,
      metadata: {
        name: request.animationName,
        description: request.description,
        tags: [], // Could be passed in from metadata if available
      },
      stream: !!options?.onProgress, // Use streaming if progress callback provided
    }

    // Call backend API
    const response = await fetch("/api/lottie-naming/generate-element-names", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    // Handle streaming response
    if (body.stream && response.body) {
      return await handleStreamingResponse(
        response,
        requestId,
        startTime,
        interaction,
        options,
      )
    }

    // Non-streaming response
    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to generate element names")
    }

    // Log success
    aiLogger.logResponse(interaction, result.data, true)

    // Report progress: complete
    options?.onProgress?.({
      phase: "completed",
      progress: 100,
      message: `✅ Analysis complete! Found ${Object.keys(result.data.elements).length} elements`,
    })

    return {
      success: true,
      data: result.data,
      requestId,
      durationMs: result.durationMs || Date.now() - startTime,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to generate element names"

    aiLogger.logResponse(interaction, {}, false, errorMessage)

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
 * Handle SSE streaming response from backend
 */
async function handleStreamingResponse(
  response: Response,
  requestId: string,
  startTime: number,
  interaction: ReturnType<typeof aiLogger.logRequest>,
  options?: {
    onStream?: StreamCallback
    onProgress?: ProgressCallback
  },
): Promise<AIOperationResult<ElementNamingResponse>> {
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let finalResult: ElementNamingResponse | undefined
  let done = false

  try {
    while (!done) {
      const result = await reader.read()
      done = result.done
      if (done) break

      buffer += decoder.decode(result.value, { stream: true })

      // Process complete SSE messages
      const lines = buffer.split("\n\n")
      buffer = lines.pop() || "" // Keep incomplete message in buffer

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const jsonStr = line.slice(6)
          try {
            const event = JSON.parse(jsonStr)

            if (event.type === "progress") {
              const progressUpdate: ProgressUpdate = {
                phase: event.phase,
                progress: event.progress,
                message: event.message,
              }
              options?.onProgress?.(progressUpdate)
              options?.onStream?.(event.message + "\n")
            } else if (event.type === "complete") {
              finalResult = event.data
              aiLogger.logResponse(interaction, event.data, true)
            } else if (event.type === "error") {
              throw new Error(event.error)
            }
          } catch (parseError) {
            console.warn("[Pipeline] Failed to parse SSE event:", jsonStr)
          }
        }
      }
    }

    if (!finalResult) {
      throw new Error("No result received from streaming response")
    }

    options?.onProgress?.({
      phase: "completed",
      progress: 100,
      message: `✅ Analysis complete! Found ${Object.keys(finalResult.elements).length} elements`,
    })

    return {
      success: true,
      data: finalResult,
      requestId,
      durationMs: Date.now() - startTime,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Streaming failed"
    aiLogger.logResponse(interaction, {}, false, errorMessage)

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
 * Maps to the existing generateComponentNamesGemini signature
 */
export async function generateComponentNamesGemini(
  request: ElementNamingRequest,
  onStream?: StreamCallback,
): Promise<ElementNamingResponse> {
  const result = await executeElementNaming(request, { onStream })

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to generate element names")
  }

  return result.data
}
