/**
 * API Route: Generate Metadata for Lottie Animation
 * POST /api/lottie-naming/generate-metadata
 *
 * All AI logic runs on the backend - this route handles the full pipeline:
 * 1. Reads TypeScript type definitions from filesystem
 * 2. Builds the prompt with type context
 * 3. Calls Gemini API
 * 4. Parses and returns the metadata
 */

import { NextRequest, NextResponse } from "next/server"
import { generateMetadata } from "./metadataService"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lottieJson, userProvidedMetadata } = body

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

    console.log("[API] Generating metadata for Lottie animation...")

    const result = await generateMetadata({
      lottieJson,
      userProvidedMetadata,
    })

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to generate metadata",
          message: result.error,
        },
        { status: 500 },
      )
    }

    console.log(
      `[API] Metadata generated successfully in ${result.durationMs}ms`,
    )

    return NextResponse.json({
      success: true,
      metadata: result.metadata,
      durationMs: result.durationMs,
    })
  } catch (error) {
    console.error("[API] Error generating metadata:", error)

    return NextResponse.json(
      {
        error: "Failed to generate metadata",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
