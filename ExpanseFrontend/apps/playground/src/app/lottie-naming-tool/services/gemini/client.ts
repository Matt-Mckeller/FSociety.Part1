/**
 * Google Gemini API Client
 * Initializes and configures the Gemini model for metadata analysis
 */

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"
import { ExpanseLottieMetadataJsonSchema } from "./schemas"

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
 * Create and configure Gemini model for structured output
 */
export function createGeminiModel() {
  const apiKey = getGoogleApiKey()
  const genAI = new GoogleGenerativeAI(apiKey)

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      //   responseSchema: ExpanseLottieMetadataJsonSchema as any,
      maxOutputTokens: 65535,
    },
  })

  return model
}
