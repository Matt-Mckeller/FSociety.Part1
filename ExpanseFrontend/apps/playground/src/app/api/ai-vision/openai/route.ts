/**
 * OpenAI Vision API Proxy Route
 * Handles CORS and server-side API calls
 */
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client with placeholder key for build
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder-key-for-build",
})

export async function POST(request: NextRequest) {
  try {
    // Check if using placeholder key
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "sk-placeholder-key-for-build"
    ) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 400 },
      )
    }

    const body = await request.json()
    const { frames, context, prompt } = body

    // Prepare messages with images
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          ...frames.map((frame: { dataUrl: string }) => ({
            type: "image_url" as const,
            image_url: {
              url: frame.dataUrl,
              detail: "high" as const,
            },
          })),
        ],
      },
    ]

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 4000,
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 },
      )
    }

    return NextResponse.json({
      content,
      usage: response.usage,
      model: response.model,
    })
  } catch (error) {
    console.error("OpenAI Vision API error:", error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "OpenAI API request failed",
      },
      { status: 500 },
    )
  }
}
