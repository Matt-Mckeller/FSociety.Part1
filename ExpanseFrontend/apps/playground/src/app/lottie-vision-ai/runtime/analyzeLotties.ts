/**
 * Metadata Analysis using Google Gemini API
 * Replaces LangChain-based implementation with direct Gemini API calls
 */

import { ExpanseLottie } from "expanse.dynamicAssets"
import { createGeminiModel } from "../gemini/client"
import { LottieAnalysisInput } from "../../lottie-naming-tool/types/LottieAnalysisInput"
import { getAnalysisAndNamingPrompt } from "../prompts/analysis/analyzeAndNameLotties"

/**
 * Analyze Lottie JSON and generate metadata using Gemini API
 */
export async function analyzeAndNameLottie(
  input: LottieAnalysisInput,
): Promise<Partial<ExpanseLottie>> {
  const { lottie, userProvidedMetadata } = input

  try {
    // Create Gemini model with structured output
    const model = createGeminiModel()

    // Convert lottieJson object to JSON string for the prompt
    const systemPrompt = getAnalysisAndNamingPrompt(input)

    // Generate content with system prompt that includes the Lottie JSON
    const result = await model.generateContent([systemPrompt])
    console.log("Gemini result object:", result)

    const response = result.response
    const text = response.text()

    console.log("Gemini raw response:", text)

    // Parse JSON response
    const parsedData = JSON.parse(text)

    // Parse nested JSON strings back into objects
    if (parsedData.recommendations) {
      if (
        typeof parsedData.recommendations.elementGroups === "string" &&
        parsedData.recommendations.elementGroups
      ) {
        try {
          parsedData.recommendations.elementGroups = JSON.parse(
            parsedData.recommendations.elementGroups,
          )
        } catch (e) {
          console.warn("Failed to parse elementGroups:", e)
          parsedData.recommendations.elementGroups = {
            logicalGrouped: {},
            sharedColor: {},
            themingPriority: {},
            visualHierarchy: {},
          }
        }
      }
      if (
        typeof parsedData.recommendations.optionalAiContext === "string" &&
        parsedData.recommendations.optionalAiContext
      ) {
        try {
          parsedData.recommendations.optionalAiContext = JSON.parse(
            parsedData.recommendations.optionalAiContext,
          )
        } catch (e) {
          console.warn("Failed to parse optionalAiContext:", e)
          parsedData.recommendations.optionalAiContext = {}
        }
      }
      if (
        typeof parsedData.recommendations.optionalAiStylePrompts === "string" &&
        parsedData.recommendations.optionalAiStylePrompts
      ) {
        try {
          parsedData.recommendations.optionalAiStylePrompts = JSON.parse(
            parsedData.recommendations.optionalAiStylePrompts,
          )
        } catch (e) {
          console.warn("Failed to parse optionalAiStylePrompts:", e)
          parsedData.recommendations.optionalAiStylePrompts = {}
        }
      }
      if (
        typeof parsedData.recommendations.optionalAiVariantPrompts ===
          "string" &&
        parsedData.recommendations.optionalAiVariantPrompts
      ) {
        try {
          parsedData.recommendations.optionalAiVariantPrompts = JSON.parse(
            parsedData.recommendations.optionalAiVariantPrompts,
          )
        } catch (e) {
          console.warn("Failed to parse optionalAiVariantPrompts:", e)
          parsedData.recommendations.optionalAiVariantPrompts = {}
        }
      }
    }

    // Validate with Zod schema for type safety
    // const validatedData = ExpanseLottieMetadataSchema.parse(parsedData)

    // console.log("Validated metadata:", validatedData)

    // return validatedData
    return parsedData
  } catch (error) {
    console.error("Error analyzing metadata:", error)

    // Log the full error object for detailed inspection
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)

      // If it's a JSON parsing error, log more context
      if (error.message.includes("JSON")) {
        console.error("This appears to be a JSON parsing error.")
        console.error(
          "Check the 'Gemini raw response' log above to see what was returned.",
        )
      }
    } else {
      console.error("Non-Error object thrown:", JSON.stringify(error, null, 2))
    }

    throw new Error(
      `Failed to analyze metadata: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}
