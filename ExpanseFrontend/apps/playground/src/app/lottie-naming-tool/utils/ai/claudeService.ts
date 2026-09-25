/**
 * Claude AI Service
 * Handles all Claude API interactions for Lottie naming
 */

import Anthropic from "@anthropic-ai/sdk"
import {
  NamingRequest,
  AINamingResponse,
  NameSuggestion,
  AnimationDescription,
  ComponentAnalysis,
  CapturedFrame,
} from "../../types/types"
import { needsChunking, createLayerHierarchy } from "./shared"
import { buildSystemPrompt } from "./prompts"
import { parseAIResponse } from "./responseParser"
import { aiLogger } from "./aiLogger"

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
  dangerouslyAllowBrowser: true, // Only for development
})

// Model configuration
const MODEL = "claude-sonnet-4-5-20250929"
const MAX_OUTPUT_TOKENS = 64000 // Maximum output tokens for Claude Sonnet 4

/**
 * Generate component names using Claude (simple single-pass version)
 */
export async function generateComponentNames(
  request: NamingRequest,
  onStream?: (text: string) => void,
): Promise<AINamingResponse> {
  const requestId = `claude_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const interaction = aiLogger.logAIRequest(
    "claude",
    "generateComponentNames",
    request,
    requestId,
    !!onStream,
  )

  try {
    const messages = buildMessagesSimple(request)
    let response: AINamingResponse

    if (onStream) {
      response = await streamResponse(
        messages,
        onStream,
        interaction,
        request.lottieData,
        request.animationName,
        request.description,
        request.purpose,
      )
    } else {
      response = await getFullResponse(
        messages,
        request.lottieData,
        request.animationName,
        request.description,
        request.purpose,
      )
    }

    aiLogger.logAIResponse(interaction, response, true)
    return response
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to generate names with Claude"
    aiLogger.logAIResponse(interaction, {}, false, errorMessage)
    throw new Error(errorMessage)
  }
}

/**
 * Generate component names using Claude with multi-phase approach
 * Handles large animations by chunking and adds visual context
 */
export async function generateComponentNamesMultiPhase(
  request: NamingRequest,
  onStream?: (text: string) => void,
): Promise<AINamingResponse> {
  const requestId = `claude_multiphase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const interaction = aiLogger.logAIRequest(
    "claude",
    "generateComponentNamesMultiPhase",
    request,
    requestId,
    !!onStream,
  )

  try {
    // Phase 1: Get visual description if frames are provided
    let visualDescription = ""

    if (request.visionMode && request.frames && request.frames.length > 0) {
      if (onStream) {
        onStream("🎨 Phase 1: Analyzing visual frames...\n\n")
      }

      visualDescription = await getVisualDescription(request, onStream)

      if (onStream) {
        onStream(`\n\n✅ Visual Analysis Complete:\n${visualDescription}\n\n`)
        onStream("📊 Phase 2: Checking animation size...\n\n")
      }
    } else if (onStream) {
      onStream("📊 Phase 1: Checking animation size...\n\n")
    }

    // Phase 2: Check if we need to chunk the Lottie JSON
    if (!needsChunking(request.lottieData, visualDescription.length)) {
      // Small enough - send as single request
      if (onStream) {
        onStream(
          "✓ Animation size is manageable, analyzing in single pass...\n\n",
        )
      }

      const messages = buildMessages(request, visualDescription)
      const response = onStream
        ? await streamResponse(
            messages,
            onStream,
            interaction,
            request.lottieData,
            request.animationName,
            request.description,
            request.purpose,
          )
        : await getFullResponse(
            messages,
            request.lottieData,
            request.animationName,
            request.description,
            request.purpose,
          )

      aiLogger.logAIResponse(interaction, response, true)
      return response
    }

    // Large animation - process in chunks
    if (onStream) {
      onStream(
        "⚠️ Large animation detected (>195k tokens), processing in chunks...\n\n",
      )
    }

    const response = await generateComponentNamesChunked(
      request,
      visualDescription,
      onStream,
    )

    aiLogger.logAIResponse(interaction, response, true)
    return response
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to generate names with Claude"
    aiLogger.logAIResponse(interaction, {}, false, errorMessage)
    throw new Error(errorMessage)
  }
}

/**
 * Ask a custom question to Claude about the animation
 */
export async function askCustomQuestion(
  question: string,
  context: {
    animationName: string
    components: ComponentAnalysis[]
    frames?: CapturedFrame[]
  },
  onStream?: (text: string) => void,
): Promise<string> {
  const content: any[] = []

  // Add frames if provided
  if (context.frames && context.frames.length > 0) {
    context.frames.forEach((frame) => {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/png",
          data: frame.base64.split(",")[1],
        },
      })
    })
  }

  // Add question
  content.push({
    type: "text",
    text: `Animation: ${context.animationName}\n\nQuestion: ${question}\n\nPlease provide specific, actionable recommendations.`,
  })

  const messages = [{ role: "user" as const, content }]

  try {
    if (onStream) {
      let fullText = ""
      const stream = await anthropic.messages.create({
        model: MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
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
        }
      }

      return fullText
    }

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages,
    })

    const responseContent = response.content[0]
    if (responseContent.type !== "text") {
      throw new Error("Unexpected response type")
    }

    return responseContent.text
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Claude API error: ${error.message}`
        : "Failed to ask question",
    )
  }
}

// ============================================================================
// INTERNAL HELPER FUNCTIONS
// ============================================================================

/**
 * Build simple messages for Claude API (single-pass version)
 */
function buildMessagesSimple(request: NamingRequest): any[] {
  const content: any[] = []

  let prompt = `# Animation: ${request.animationName}\n\n`

  if (request.description) {
    prompt += `Description: ${request.description}\n\n`
  }

  if (request.purpose) {
    prompt += `Purpose: ${request.purpose}\n\n`
  }

  // Add the complete Lottie JSON
  prompt += `Here is the complete Lottie JSON animation data:\n\n`
  prompt += `\`\`\`json\n${JSON.stringify(request.lottieData)}\n\`\`\`\n\n`

  content.push({
    type: "text",
    text: prompt,
  })

  return [
    {
      role: "user",
      content,
    },
  ]
}

/**
 * Build messages for Claude API (with visual description support)
 */
function buildMessages(
  request: NamingRequest,
  visualDescription?: string,
): any[] {
  const content: any[] = []

  let prompt = `# Animation: ${request.animationName}\n\n`

  if (request.description) {
    prompt += `Description: ${request.description}\n\n`
  }

  if (request.purpose) {
    prompt += `Purpose: ${request.purpose}\n\n`
  }

  // Add visual description if available
  if (visualDescription) {
    prompt += `## Visual Analysis from Key Frames:\n${visualDescription}\n\n`
  }

  // Add the complete Lottie JSON
  prompt += `## Complete Lottie JSON Structure:\n\n`
  prompt += `\`\`\`json\n${JSON.stringify(request.lottieData)}\n\`\`\`\n\n`

  content.push({
    type: "text",
    text: prompt,
  })

  return [
    {
      role: "user",
      content,
    },
  ]
}

/**
 * Get visual description from frames using Claude Vision
 */
async function getVisualDescription(
  request: NamingRequest,
  onStream?: (text: string) => void,
): Promise<string> {
  if (!request.frames || request.frames.length === 0) {
    return ""
  }

  const content: any[] = []

  // Add all frames
  request.frames.forEach((frame, i) => {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: "image/png",
        data: frame.base64.split(",")[1],
      },
    })
  })

  // Add prompt for visual analysis
  content.push({
    type: "text",
    text: `Analyze these ${request.frames.length} key frames from the "${request.animationName}" Lottie animation.

Provide a concise visual description focusing on:
1. Main visual elements and their colors
2. Layout and composition
3. Animation flow and key moments
4. Design style and characteristics

Keep your description under 200 words.`,
  })

  const messages = [{ role: "user" as const, content }]

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1000, // Short description
    messages,
  })

  const responseContent = response.content[0]
  if (responseContent.type !== "text") {
    throw new Error("Unexpected response type from Claude Vision")
  }

  return responseContent.text
}

/**
 * Process large animations in chunks
 */
async function generateComponentNamesChunked(
  request: NamingRequest,
  visualDescription: string,
  onStream?: (text: string) => void,
): Promise<AINamingResponse> {
  const layers = request.lottieData.layers || []
  const totalLayers = layers.length

  // Calculate optimal chunk size
  const avgLayerSize = JSON.stringify(layers).length / totalLayers
  const estimatedTokensPerLayer = avgLayerSize / 4
  const targetTokensPerChunk = 150000
  const optimalChunkSize = Math.max(
    1,
    Math.floor(targetTokensPerChunk / estimatedTokensPerLayer),
  )

  const numChunks = Math.ceil(totalLayers / optimalChunkSize)

  if (onStream) {
    onStream(
      `📦 Splitting ${totalLayers} layers into ${numChunks} chunks (~${optimalChunkSize} layers each)\n\n`,
    )
  }

  const allNames: NameSuggestion[] = []
  let description: AnimationDescription | undefined
  let timeline: TimelineFrame[] = []
  let recommendations: DesignRecommendation[] = []

  for (let chunkIndex = 0; chunkIndex < numChunks; chunkIndex++) {
    const startIdx = chunkIndex * optimalChunkSize
    const endIdx = Math.min(startIdx + optimalChunkSize, totalLayers)
    const chunkLayers = layers.slice(startIdx, endIdx)

    if (onStream) {
      onStream(
        `\n🔄 Processing chunk ${chunkIndex + 1}/${numChunks} (layers ${startIdx}-${endIdx - 1})...\n`,
      )
    }

    // Create chunk-specific request
    const chunkLottie = {
      ...request.lottieData,
      layers: chunkLayers,
    }

    const content: any[] = []

    let chunkPrompt = `# Animation: ${request.animationName} - Chunk ${chunkIndex + 1}/${numChunks}\n\n`

    if (request.description) {
      chunkPrompt += `Description: ${request.description}\n\n`
    }

    if (visualDescription) {
      chunkPrompt += `## Visual Analysis:\n${visualDescription}\n\n`
    }

    chunkPrompt += `## ⚠️ Important Context:\n`
    chunkPrompt += `This is chunk ${chunkIndex + 1} of ${numChunks} chunks.\n`
    chunkPrompt += `You are analyzing layers ${startIdx}-${endIdx - 1} out of ${totalLayers} total layers.\n\n`

    chunkPrompt += `## Lottie JSON for this chunk:\n\n`
    chunkPrompt += `\`\`\`json\n${JSON.stringify(chunkLottie)}\n\`\`\`\n\n`

    if (chunkIndex === 0) {
      chunkPrompt += `\n**First Chunk**: Provide full description, timeline, and recommendations.\n\n`
    } else {
      chunkPrompt += `\n**Subsequent Chunk**: Focus on element_names for these layers.\n\n`
    }

    content.push({ type: "text", text: chunkPrompt })

    const messages = [{ role: "user" as const, content }]
    const response = await getFullResponse(messages, request.lottieData)

    if (onStream) {
      onStream(
        `✓ Chunk ${chunkIndex + 1} complete: ${response.elementNames.length} components named\n`,
      )
    }

    allNames.push(...response.elementNames)

    if (chunkIndex === 0) {
      description = response.description
      timeline = response.timeline
      recommendations = response.recommendations
    } else {
      // Merge unique recommendations
      response.recommendations.forEach((rec) => {
        const exists = recommendations.some(
          (existing) =>
            existing.category === rec.category &&
            existing.suggestion === rec.suggestion,
        )
        if (!exists) {
          recommendations.push(rec)
        }
      })
    }
  }

  if (onStream) {
    onStream(
      `\n\n✅ All chunks processed: ${allNames.length} total components named!\n\n`,
    )
  }

  return {
    elementNames: allNames,
    description: description || {
      short: "Animation",
      detailed: "",
      visualCharacteristics: [],
    },
    timeline,
    recommendations,
  }
}

/**
 * Get full response (non-streaming)
 */
async function getFullResponse(
  messages: any[],
  lottieData: any,
  animationName?: string,
  animationDescription?: string,
  animationPurpose?: string,
): Promise<AINamingResponse> {
  const response = await anthropic.beta.messages.create({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: [
      {
        type: "text",
        text: buildSystemPrompt(
          animationName,
          animationDescription,
          animationPurpose,
          lottieData,
        ),
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
  })

  const content = response.content[0]
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude")
  }

  // Check for truncation and throw error if detected
  if (response.stop_reason === "max_tokens") {
    throw new Error(
      "Claude response truncated due to max_tokens limit. " +
        "Please reduce the input size or increase max_tokens. " +
        "Current limit: " +
        MAX_OUTPUT_TOKENS +
        " tokens.",
    )
  }

  return parseAIResponse(content.text)
}

/**
 * Stream response
 */
async function streamResponse(
  messages: any[],
  onStream: (text: string) => void,
  interaction: any | undefined,
  lottieData: any,
  animationName?: string,
  animationDescription?: string,
  animationPurpose?: string,
): Promise<AINamingResponse> {
  let fullText = ""

  const stream = await anthropic.beta.messages.create({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: [
      {
        type: "text",
        text: buildSystemPrompt(
          animationName,
          animationDescription,
          animationPurpose,
          lottieData,
        ),
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
    stream: true,
  })

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      const text = event.delta.text
      fullText += text
      onStream(fullText)

      // Log streaming chunks
      if (interaction) {
        aiLogger.logAIStreaming(interaction, text, fullText.length)
      }
    }
    if (
      event.type === "message_delta" &&
      event.delta.stop_reason === "max_tokens"
    ) {
      throw new Error(
        "Claude response truncated due to max_tokens limit. " +
          "Please reduce the input size or increase max_tokens. " +
          "Current limit: " +
          MAX_OUTPUT_TOKENS +
          " tokens.",
      )
    }
  }

  return parseAIResponse(fullText)
}
