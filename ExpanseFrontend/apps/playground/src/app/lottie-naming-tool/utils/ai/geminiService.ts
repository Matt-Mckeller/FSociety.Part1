/**
 * Gemini AI Service
 * Handles all Gemini API interactions for Lottie naming
 */

import { GoogleGenerativeAI } from "@google/generative-ai"
import {
  NamingRequest,
  AINamingResponse,
  ComponentAnalysis,
  CapturedFrame,
} from "../../types/types"
import { buildSystemPrompt } from "./prompts"
import { parseAIResponse } from "./responseParser"
import { aiLogger } from "./aiLogger"

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
)

// Gemini model configuration
const GEMINI_MODEL = "gemini-2.5-pro" // Gemini 2.5 Pro: 1,048,576 input / 65,536 output tokens
const GEMINI_MAX_OUTPUT_TOKENS = 65536 // Gemini 2.5 Pro output limit

/**
 * Generate component names using Gemini 2.5 Pro
 * With 1M+ token context window, no chunking needed!
 */
export async function generateComponentNamesGemini(
  request: NamingRequest,
  onStream?: (text: string) => void,
): Promise<AINamingResponse> {
  const requestId = `gemini_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const interaction = aiLogger.logAIRequest(
    "gemini",
    "generateComponentNamesGemini",
    request,
    requestId,
    !!onStream,
  )

  try {
    if (onStream) {
      onStream("🤖 Using Gemini 2.5 Pro (1M token context)...\n\n")
    }

    const systemPrompt = buildSystemPrompt(
      request.animationName,
      request.description,
      request.purpose,
      request.lottieData,
    )

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
        temperature: 0.7, // Balanced creativity and consistency
      },
    })

    if (onStream) {
      onStream("📊 Gemini is analyzing your animation structure...\n\n")
    }

    // Non-streaming - system prompt contains everything, just need a simple user message
    const result = await model.generateContent(
      "Please analyze this Lottie animation and provide element names.",
    )
    const responseObj = await result.response
    const text = responseObj.text()
    console.log({ aiText: text })
    const responseJson = parseAIResponse(text) as AINamingResponse
    console.log({ aiResponseJson: responseJson })

    aiLogger.logAIResponse(interaction, responseJson, true)
    return responseJson
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to generate names with Gemini"
    aiLogger.logAIResponse(interaction, {}, false, errorMessage)
    throw new Error(errorMessage)
  }
}

/**
 * Ask a custom question using Gemini
 */
export async function askCustomQuestionGemini(
  question: string,
  context: {
    animationName: string
    components: ComponentAnalysis[]
    frames?: CapturedFrame[]
  },
  onStream?: (text: string) => void,
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
    })

    let prompt = `# Custom Question about Lottie Animation\n\n`
    prompt += `Animation: ${context.animationName}\n\n`
    prompt += `Question: ${question}\n\n`
    prompt += `## Context:\n`
    prompt += `Total Components: ${context.components.length}\n\n`

    if (context.frames && context.frames.length > 0) {
      prompt += `Key Frames Available: ${context.frames.length}\n\n`
    }

    prompt += `## Component List:\n`
    context.components.forEach((comp) => {
      prompt += `- ${comp.path}: ${comp.currentName} (${comp.type})\n`
    })

    prompt += `\n\nPlease provide a clear, concise answer to the question above.\n`

    if (onStream) {
      const result = await model.generateContentStream(prompt)

      let fullText = ""
      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        fullText += chunkText
        onStream(fullText)
      }

      return fullText
    }

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Gemini API error: ${error.message}`
        : "Failed to ask question with Gemini",
    )
  }
}
