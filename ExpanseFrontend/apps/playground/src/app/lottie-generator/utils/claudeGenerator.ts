/**
 * Claude API Client for Lottie Animation Generation
 */
import Anthropic from "@anthropic-ai/sdk"
import type {
  GenerationOptions,
  LottieAnimation,
  GenerationResult,
} from "../types"

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
  dangerouslyAllowBrowser: true, // Only for development
})

/**
 * System prompt for generating Lottie animations with Claude
 */
const LOTTIE_GENERATION_SYSTEM_PROMPT = `You are an expert Lottie animation generator. Your task is to create valid Lottie JSON animations based on user descriptions.

Key Responsibilities:
1. Generate valid Lottie JSON format (bodymovin v5.x compatible)
2. Create smooth, performant animations
3. Use semantic layer and shape names following [Purpose][Location][Detail] pattern
4. Optimize for web performance (reasonable file size, smooth playback)
5. Include proper easing and timing curves

Animation Structure Requirements:
- Valid JSON with proper Lottie schema
- Frame rate: 60fps (standard)
- Reasonable duration (2-5 seconds typical)
- Semantic naming for all layers and shapes
- Proper anchor points and transforms
- Smooth easing functions

Output Format:
Return ONLY valid Lottie JSON. No markdown, no explanations, just the JSON object.

The JSON must include:
- "v": version (e.g., "5.9.0")
- "fr": frame rate (60)
- "ip": in point (0)
- "op": out point (frames)
- "w": width (pixels)
- "h": height (pixels)
- "nm": animation name
- "layers": array of layer objects

Example Layer Naming:
- "CatBodyMain" for main body shape
- "CatEarLeftOuter" for left ear outline
- "CatTailCurveStroke" for tail stroke
- "CatEyeLeftPupilFill" for left pupil fill

Quality Guidelines:
- Use bezier curves for smooth motion
- Add slight easing (ease-in-out) for natural movement
- Keep complexity reasonable (< 100 shapes for simple animations)
- Use shape groups to organize related elements
- Include trim paths for drawing effects
- Add opacity animations for fade in/out`

/**
 * Generate a Lottie animation using Claude
 */
export async function generateLottieAnimation(
  description: string,
  options: GenerationOptions = {},
  onStream?: (text: string) => void,
): Promise<GenerationResult> {
  const {
    width = 512,
    height = 512,
    duration = 3,
    frameRate = 60,
    style = "illustrated",
    complexity = "medium",
  } = options

  const userPrompt = buildUserPrompt(description, {
    width,
    height,
    duration,
    frameRate,
    style,
    complexity,
  })

  const messages = [
    {
      role: "user" as const,
      content: [
        {
          type: "text" as const,
          text: userPrompt,
        },
      ],
    },
  ]

  try {
    let lottieData: LottieAnimation

    if (onStream) {
      lottieData = await streamGeneration(messages, onStream)
    } else {
      lottieData = await fullGeneration(messages)
    }

    // Calculate metadata
    const metadata = calculateMetadata(lottieData)

    return {
      success: true,
      animation: lottieData,
      metadata,
    }
  } catch (error) {
    console.error("Lottie generation error:", error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate Lottie animation",
    }
  }
}

/**
 * Build user prompt for generation
 */
function buildUserPrompt(
  description: string,
  options: Required<GenerationOptions>,
): string {
  const { width, height, duration, frameRate, style, complexity } = options

  return `Create a Lottie animation with these specifications:

Description: ${description}

Technical Requirements:
- Dimensions: ${width}x${height}px
- Duration: ${duration} seconds
- Frame Rate: ${frameRate} fps
- Style: ${style}
- Complexity: ${complexity}

Animation Guidelines:
- Make it smooth and visually appealing
- Use semantic naming for all layers and shapes
- Include appropriate easing functions
- Optimize for web performance
${style === "gradient" ? "- Use gradients for depth and visual richness" : ""}
${style === "outlined" ? "- Use strokes primarily, minimal fills for a clean look" : ""}
${style === "flat" ? "- Use solid colors, no gradients, modern flat design" : ""}
${complexity === "simple" ? "- Keep under 30 shapes total for simplicity" : ""}
${complexity === "complex" ? "- Can use up to 100 shapes for detailed work" : ""}

Return ONLY the valid Lottie JSON, no other text.`
}

/**
 * Full generation (non-streaming)
 */
async function fullGeneration(messages: any[]): Promise<LottieAnimation> {
  console.group("🎨 Lottie Generation - Full Mode")
  console.log("Model:", "claude-sonnet-4-5-20250929")
  console.log("Timestamp:", new Date().toISOString())

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    system: LOTTIE_GENERATION_SYSTEM_PROMPT,
    messages,
  })

  const content = response.content[0]
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude")
  }

  console.log("Raw Response Length:", content.text.length)
  console.log("Raw Response:", content.text)

  const lottieData = parseLottieJSON(content.text)

  console.log("Parsed Animation:", lottieData.nm || "Untitled")
  console.log("Layers:", lottieData.layers?.length || 0)
  console.log("Full Lottie JSON:", lottieData)
  console.groupEnd()

  return lottieData
}

/**
 * Streaming generation
 */
async function streamGeneration(
  messages: any[],
  onStream: (text: string) => void,
): Promise<LottieAnimation> {
  let fullText = ""

  console.group("🎨 Lottie Generation - Streaming Mode")
  console.log("Model:", "claude-sonnet-4-5-20250929")
  console.log("Timestamp:", new Date().toISOString())

  const stream = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    system: LOTTIE_GENERATION_SYSTEM_PROMPT,
    messages,
    stream: true,
  })

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      fullText += event.delta.text
      onStream(fullText)
    } else if (event.type === "message_stop") {
      console.log("✓ Stream completed successfully")
    }
  }

  console.log("Total streamed text length:", fullText.length, "characters")
  console.log("Raw Response:", fullText)

  const lottieData = parseLottieJSON(fullText)

  console.log("Parsed Animation:", lottieData.nm || "Untitled")
  console.log("Layers:", lottieData.layers?.length || 0)
  console.log("Full Lottie JSON:", lottieData)
  console.groupEnd()

  return lottieData
}

/**
 * Parse and validate Lottie JSON from response
 */
function parseLottieJSON(text: string): LottieAnimation {
  console.log("=== Parsing Lottie Generation Response ===")

  // Extract JSON from markdown if present
  let jsonText = text.trim()
  const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1]
    console.log("Extracted JSON from markdown code block")
  } else {
    const objectMatch = jsonText.match(/\{[\s\S]*\}/)
    if (objectMatch) {
      jsonText = objectMatch[0]
      console.log("Extracted JSON object from text")
    }
  }

  try {
    const lottieData = JSON.parse(jsonText)

    // Basic validation
    if (!lottieData.v) {
      throw new Error("Missing version field (v)")
    }
    if (!lottieData.layers || !Array.isArray(lottieData.layers)) {
      throw new Error("Missing or invalid layers array")
    }
    if (typeof lottieData.w !== "number" || typeof lottieData.h !== "number") {
      throw new Error("Missing or invalid width/height")
    }
    if (typeof lottieData.fr !== "number") {
      throw new Error("Missing or invalid frame rate")
    }

    console.log("✓ Valid Lottie JSON generated")
    console.log(`  - Layers: ${lottieData.layers.length}`)
    console.log(`  - Dimensions: ${lottieData.w}x${lottieData.h}`)
    console.log(`  - Frame rate: ${lottieData.fr}fps`)

    return lottieData
  } catch (error) {
    console.error("Failed to parse Lottie JSON:", error)
    throw new Error(
      `Failed to parse Lottie JSON: ${error instanceof Error ? error.message : "Invalid JSON"}`,
    )
  }
}

/**
 * Calculate metadata about the generated animation
 */
function calculateMetadata(lottieData: LottieAnimation) {
  let shapeCount = 0

  // Count shapes recursively
  function countShapes(obj: any) {
    if (!obj || typeof obj !== "object") return

    if (obj.ty === "sh" || obj.ty === "fl" || obj.ty === "st") {
      shapeCount++
    }

    if (Array.isArray(obj)) {
      obj.forEach(countShapes)
    } else {
      Object.values(obj).forEach(countShapes)
    }
  }

  countShapes(lottieData.layers)

  const duration = ((lottieData.op - lottieData.ip) / lottieData.fr).toFixed(2)
  const fileSize = new Blob([JSON.stringify(lottieData)]).size

  return {
    layerCount: lottieData.layers.length,
    shapeCount,
    duration: parseFloat(duration),
    fileSize,
  }
}

/**
 * Example prompts for quick testing
 */
export const EXAMPLE_PROMPTS = {
  cat: "A cute cat sitting and waving its paw, with blinking eyes and a swishing tail",
  loading:
    "A modern loading spinner with smooth rotation and pulsing effect in purple",
  success:
    "A checkmark that draws in with a bouncy celebration effect and confetti",
  notification:
    "A bell that rings with sound wave ripples expanding outward in blue",
  rocket:
    "A cartoon rocket launching upward with flame trail and star particles",
  heart: "A heart that beats with a pulsing scale animation in red and pink",
  trophy: "A golden trophy that appears with a shine effect and sparkles",
  download:
    "A download arrow moving down into a folder with progress indicator",
}
