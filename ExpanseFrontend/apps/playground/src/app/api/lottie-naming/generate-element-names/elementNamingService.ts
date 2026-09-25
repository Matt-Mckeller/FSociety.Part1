/**
 * Element Naming Service (Backend)
 *
 * Server-side implementation for generating element names for Lottie animations.
 * All AI calls and file system operations happen here.
 */

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"
import { getElementTypesDoc } from "./typeReader"
import type { ExpanseLottieElementDetails } from "expanse.dynamicAssets"

// Import instructions from the shared location
import { allEdgeCaseInstructions } from "@/app/lottie-naming-tool/services/ai/prompts/elementNaming/instructions/edge-cases"
import { allFewShotExamples } from "@/app/lottie-naming-tool/services/ai/prompts/elementNaming/instructions/few-shot-examples"

// ============================================================================
// Configuration
// ============================================================================

const GEMINI_MODEL = "gemini-2.5-pro"
const GEMINI_MAX_OUTPUT_TOKENS = 65536

// ============================================================================
// Types
// ============================================================================

export interface ElementNamingInput {
  lottieJson: Record<string, any>
  metadata?: {
    name?: string
    description?: string
    tags?: string[]
  }
}

export interface ElementNamingResponse {
  /** Record of element names to their details, keyed by element name */
  elements: Record<string, ExpanseLottieElementDetails>
}

export interface ElementNamingResult {
  success: boolean
  data?: ElementNamingResponse
  error?: string
  durationMs?: number
}

export interface ProgressUpdate {
  phase: "initialization" | "analyzing" | "naming" | "completed" | "error"
  progress: number
  message: string
}

// ============================================================================
// Gemini Client
// ============================================================================

function getGoogleApiKey(): string {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    throw new Error("Google API key environment variable is not set")
  }
  return apiKey
}

let genAIInstance: GoogleGenerativeAI | null = null

function getGenAI(): GoogleGenerativeAI {
  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(getGoogleApiKey())
  }
  return genAIInstance
}

function createJsonModel(): GenerativeModel {
  const genAI = getGenAI()

  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
      temperature: 0.7,
    },
  })
}

// ============================================================================
// JSON Parsing Utilities
// ============================================================================

function extractJsonFromResponse(text: string): string {
  const trimmed = text.trim()
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return trimmed
  }

  const jsonBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonBlockMatch) {
    return jsonBlockMatch[1].trim()
  }

  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  if (jsonMatch) {
    return jsonMatch[1]
  }

  return trimmed
}

function safeJsonParse<T>(text: string, context?: string): T {
  try {
    const jsonText = extractJsonFromResponse(text)
    return JSON.parse(jsonText) as T
  } catch (error) {
    const contextMsg = context ? ` (${context})` : ""
    const preview = text.substring(0, 200)
    throw new Error(
      `Failed to parse JSON response${contextMsg}. Preview: ${preview}...`,
    )
  }
}

// ============================================================================
// Prompt Builder
// ============================================================================

function buildContextSection(
  metadata?: ElementNamingInput["metadata"],
): string {
  if (!metadata?.name && !metadata?.description && !metadata?.tags?.length) {
    return ""
  }

  return `
ANIMATION CONTEXT (from metadata analysis):
${metadata.name ? `- Name: ${metadata.name}` : ""}
${metadata.description ? `- Description: ${metadata.description}` : ""}
${metadata.tags?.length ? `- Tags: ${metadata.tags.join(", ")}` : ""}

Use this context to inform your element naming decisions. Generate names that align with the animation's purpose and design intent.
`
}

function buildLottieDataSection(lottieData: Record<string, any>): string {
  return `
## Complete Lottie JSON Structure:

\`\`\`json
${JSON.stringify(lottieData, null, 2)}
\`\`\`
`
}

function buildCoreInstructions(): string {
  return `You are an expert Lottie animation analyst and naming specialist. Your task is to analyze Lottie animation structures and generate semantic, descriptive names for components following the [Purpose][Location][Detail] naming pattern.

Goals:
- Obtain complete coverage of all themeable elements (colors, gradients) in the animation
- Generate clear, descriptive names that make the animation easy to theme
- Provide accurate paths using bracket notation for array indices
- Identify element types, roles, and semantic categories
- Group related elements for efficient bulk operations

Key Responsibilities:
1. Generate descriptive PascalCase names like "WingLeftFeatherFill" instead of generic names like "Shape1"
2. Provide exact JavaScript accessor paths for each element (e.g., "layers[0].shapes[0].it[1].c.k")
3. Extract and convert color values to hex format "#rrggbbaa"
4. Categorize elements by role, visual level, and semantic purpose
5. Identify element groups and provide meaningful tags

Naming Pattern:
- [Purpose]: What the element represents (Wing, Halo, Background, Rocket)
- [Location]: Where it is (Left, Right, Top, Center, Outer)
- [Detail]: Specific characteristic (Feather, OuterGlow, GradientFill, MainFill)

Examples:
- "WingLeftFeatherFill" - Wing (purpose) + Left (location) + Feather + Fill (detail)
- "BackgroundGradientFill" - Background (purpose) + GradientFill (detail)
- "CharacterBodyMainFill" - Character (purpose) + Body (location) + MainFill (detail)
- "RocketExhaustFlameFill" - Rocket (purpose) + Exhaust (location) + FlameFill (detail)`
}

function buildTypeDefinitionsSection(typesDoc: string): string {
  return `
═══════════════════════════════════════════════════════════════════
CRITICAL: JSON-ONLY RESPONSE - EXACT INTERFACE MATCH REQUIRED
═══════════════════════════════════════════════════════════════════

YOU MUST:
1. Respond with ONLY a valid JSON object
2. NO markdown code blocks (no backticks or code fences)
3. NO explanatory text before or after the JSON
4. NO additional commentary or thoughts
5. First character MUST be { and last character MUST be }
6. Validate your JSON is parseable before responding
7. ONLY include fields defined in the TypeScript interface below
8. DO NOT add extra fields like "timeline", "recommendations", or any other fields not in the interface

TYPESCRIPT INTERFACE DEFINITIONS:
Your response MUST match this structure, where the record string key is the element name:

{
  "elements": Record<string, ExpanseLottieElementDetails>
}

For example:
{
  "elements": {
    "BackgroundFill": { "name": "BackgroundFill", "path": "layers[0].shapes[0].it[1].c.k", ... },
    "CharacterBodyFill": { "name": "CharacterBodyFill", "path": "layers[1].shapes[0].it[1].c.k", ... }
  }
}

Where ExpanseLottieElementDetails is defined in:

${typesDoc}
`
}

function formatFewShotExample(
  example: (typeof allFewShotExamples)[keyof typeof allFewShotExamples],
  exampleNumber: number,
): string {
  // Convert array to Record keyed by element name
  const elementsRecord: Record<string, any> = {}
  for (const element of example.elements) {
    elementsRecord[element.name] = element
  }

  const response = {
    elements: elementsRecord,
  }

  let output = `Example ${exampleNumber}: ${example.title}
${JSON.stringify(response, null, 2)}`

  if ("criticalNote" in example && example.criticalNote) {
    output += `\n\n${example.criticalNote}`
  }

  return output
}

function buildFewShotExamplesSection(): string {
  const examples = [
    formatFewShotExample(allFewShotExamples.loadingSpinner, 1),
    formatFewShotExample(allFewShotExamples.rocketLaunch, 2),
    formatFewShotExample(allFewShotExamples.precompCharacter, 3),
  ]

  return `
═══════════════════════════════════════════════════════════════════
FEW-SHOT EXAMPLES
═══════════════════════════════════════════════════════════════════

${examples.join("\n\n")}
`
}

function buildFinalReminders(): string {
  return `
CRITICAL REMINDER:
- ONLY include the exact fields shown in the TypeScript interface above
- DO NOT add extra fields
- Use camelCase field names exactly as shown in the interface
- Respond ONLY with the JSON object. No other text.
`
}

function buildElementNamingPrompt(input: ElementNamingInput): string {
  // Read type definitions from filesystem
  const typesDoc = getElementTypesDoc()

  // Build sections
  const coreInstructions = buildCoreInstructions()
  const contextSection = buildContextSection(input.metadata)
  const lottieSection = buildLottieDataSection(input.lottieJson)
  const edgeCaseInstructions = `
═══════════════════════════════════════════════════════════════════
CRITICAL INSTRUCTIONS: Path Format, Colors, and Edge Cases
═══════════════════════════════════════════════════════════════════

${allEdgeCaseInstructions}
`
  const typeDefinitions = buildTypeDefinitionsSection(typesDoc)
  const fewShotExamples = buildFewShotExamplesSection()
  const finalReminders = buildFinalReminders()

  return `${coreInstructions}

${contextSection}

${lottieSection}

${edgeCaseInstructions}

${typeDefinitions}

${fewShotExamples}

${finalReminders}
`
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Generate element names for a Lottie animation
 * This is the main entry point for the backend service
 */
export async function generateElementNames(
  input: ElementNamingInput,
): Promise<ElementNamingResult> {
  const startTime = Date.now()

  try {
    console.log("[ElementNamingService] Starting element naming generation...")

    // Build the prompt
    const prompt = buildElementNamingPrompt(input)
    console.log("[ElementNamingService] Prompt built, calling Gemini API...")

    // Create model and generate
    const model = createJsonModel()
    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = response.text()

    console.log("[ElementNamingService] Response received, parsing...")

    // Parse response
    const data = safeJsonParse<ElementNamingResponse>(
      responseText,
      "element naming response",
    )

    const durationMs = Date.now() - startTime
    console.log(`[ElementNamingService] Completed in ${durationMs}ms`)

    return {
      success: true,
      data,
      durationMs,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"

    console.error("[ElementNamingService] Error:", errorMessage)

    return {
      success: false,
      error: errorMessage,
      durationMs: Date.now() - startTime,
    }
  }
}

/**
 * Generate element names with progress updates via callback
 * Used for SSE streaming
 */
export async function generateElementNamesWithProgress(
  input: ElementNamingInput,
  onProgress: (update: ProgressUpdate) => void,
): Promise<ElementNamingResult> {
  const startTime = Date.now()

  try {
    onProgress({
      phase: "initialization",
      progress: 0,
      message: "🚀 Starting element naming analysis...",
    })

    console.log("[ElementNamingService] Starting element naming generation...")

    onProgress({
      phase: "initialization",
      progress: 10,
      message: "📖 Loading type definitions...",
    })

    // Build the prompt
    const prompt = buildElementNamingPrompt(input)

    onProgress({
      phase: "analyzing",
      progress: 25,
      message: "🤖 Using Gemini 2.5 Pro (1M token context)...",
    })

    console.log("[ElementNamingService] Prompt built, calling Gemini API...")

    onProgress({
      phase: "analyzing",
      progress: 40,
      message: "📊 Gemini is analyzing your animation structure...",
    })

    // Create model and generate
    const model = createJsonModel()
    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = response.text()

    onProgress({
      phase: "naming",
      progress: 75,
      message: "🏷️ Processing element names...",
    })

    console.log("[ElementNamingService] Response received, parsing...")

    // Parse response
    const data = safeJsonParse<ElementNamingResponse>(
      responseText,
      "element naming response",
    )

    const durationMs = Date.now() - startTime

    onProgress({
      phase: "completed",
      progress: 100,
      message: `✅ Analysis complete! Found ${Object.keys(data.elements).length} elements in ${(durationMs / 1000).toFixed(1)}s`,
    })

    console.log(`[ElementNamingService] Completed in ${durationMs}ms`)

    return {
      success: true,
      data,
      durationMs,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"

    console.error("[ElementNamingService] Error:", errorMessage)

    onProgress({
      phase: "error",
      progress: 0,
      message: `❌ ${errorMessage}`,
    })

    return {
      success: false,
      error: errorMessage,
      durationMs: Date.now() - startTime,
    }
  }
}
