/**
 * Unified Gemini Client
 * Single source of truth for Gemini API configuration and initialization
 */

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"

// Gemini model configuration
const GEMINI_MODEL = "gemini-2.5-pro"
const GEMINI_MAX_OUTPUT_TOKENS = 65536

/**
 * Get Google API key from environment
 */
function getGoogleApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  if (!apiKey) {
    throw new Error(
      "NEXT_PUBLIC_GOOGLE_API_KEY environment variable is not set",
    )
  }
  return apiKey
}

/**
 * Singleton Gemini AI instance
 */
let genAIInstance: GoogleGenerativeAI | null = null

function getGenAI(): GoogleGenerativeAI {
  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(getGoogleApiKey())
  }
  return genAIInstance
}

/**
 * Model configuration options
 */
export interface ModelConfig {
  /** Temperature for response creativity (0-1). Default: 0.7 */
  temperature?: number
  /** Maximum output tokens. Default: 65536 */
  maxOutputTokens?: number
  /** Response MIME type. Default: undefined (text) */
  responseMimeType?: "application/json" | "text/plain"
  /** System instruction/prompt */
  systemInstruction?: string
}

/**
 * Create a configured Gemini model for text generation
 */
export function createTextModel(config: ModelConfig = {}): GenerativeModel {
  const genAI = getGenAI()

  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: config.systemInstruction,
    generationConfig: {
      maxOutputTokens: config.maxOutputTokens ?? GEMINI_MAX_OUTPUT_TOKENS,
      temperature: config.temperature ?? 0.7,
    },
  })
}

/**
 * Create a configured Gemini model for JSON output
 */
export function createJsonModel(config: ModelConfig = {}): GenerativeModel {
  const genAI = getGenAI()

  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: config.systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: config.maxOutputTokens ?? GEMINI_MAX_OUTPUT_TOKENS,
      temperature: config.temperature ?? 0.7,
    },
  })
}

/**
 * Generate content with the model (non-streaming)
 */
export async function generateContent(
  model: GenerativeModel,
  prompt: string,
): Promise<string> {
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}

/**
 * Generate content with streaming
 */
export async function generateContentStream(
  model: GenerativeModel,
  prompt: string,
  onChunk: (text: string) => void,
): Promise<string> {
  const result = await model.generateContentStream(prompt)

  let fullText = ""
  for await (const chunk of result.stream) {
    const chunkText = chunk.text()
    fullText += chunkText
    onChunk(fullText)
  }

  return fullText
}

/**
 * Model constants for external use
 */
export const MODEL_CONFIG = {
  model: GEMINI_MODEL,
  maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
} as const
