/**
 * API Route: Generate Element Names for Lottie Animation
 * POST /api/lottie-naming/generate-element-names
 *
 * All AI logic runs on the backend - this route handles the full pipeline:
 * 1. Reads TypeScript type definitions from filesystem
 * 2. Builds the prompt with type context and metadata
 * 3. Calls Gemini API
 * 4. Returns element names with optional SSE progress streaming
 */

import { NextRequest, NextResponse } from "next/server"
import {
  generateElementNames,
  generateElementNamesWithProgress,
  type ProgressUpdate,
} from "./elementNamingService"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lottieJson, metadata, stream } = body

    if (!lottieJson) {
      return NextResponse.json(
        { error: "Missing required field: lottieJson" },
        { status: 400 },
      )
    }

    // Validate lottieJson has required fields
    if (
      !lottieJson.v ||
      !lottieJson.fr ||
      !lottieJson.w ||
      !lottieJson.h ||
      !lottieJson.layers
    ) {
      return NextResponse.json(
        { error: "Invalid Lottie JSON structure" },
        { status: 400 },
      )
    }

    console.log("[API] Generating element names for Lottie animation...")
    if (metadata?.name) {
      console.log(`[API] Animation name: ${metadata.name}`)
    }

    // Check if client wants streaming
    if (stream) {
      return handleStreamingResponse(lottieJson, metadata)
    }

    // Non-streaming response
    const result = await generateElementNames({
      lottieJson,
      metadata,
    })

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to generate element names",
          message: result.error,
        },
        { status: 500 },
      )
    }

    console.log(
      `[API] Element names generated successfully in ${result.durationMs}ms`,
    )

    return NextResponse.json({
      success: true,
      data: result.data,
      durationMs: result.durationMs,
    })
  } catch (error) {
    console.error("[API] Error generating element names:", error)

    return NextResponse.json(
      {
        error: "Failed to generate element names",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

/**
 * Handle streaming response with Server-Sent Events
 */
async function handleStreamingResponse(
  lottieJson: Record<string, any>,
  metadata?: { name?: string; description?: string; tags?: string[] },
) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const sendProgress = (update: ProgressUpdate) => {
        const data = JSON.stringify({ type: "progress", ...update })
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      try {
        const result = await generateElementNamesWithProgress(
          { lottieJson, metadata },
          sendProgress,
        )

        if (result.success && result.data) {
          // Send final result
          const finalData = JSON.stringify({
            type: "complete",
            success: true,
            data: result.data,
            durationMs: result.durationMs,
          })
          controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
        } else {
          // Send error
          const errorData = JSON.stringify({
            type: "error",
            success: false,
            error: result.error,
          })
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
        }
      } catch (error) {
        const errorData = JSON.stringify({
          type: "error",
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
        controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
