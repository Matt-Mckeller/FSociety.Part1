/**
 * Metadata Generation Service (Backend)
 *
 * This is the server-side implementation for generating Lottie metadata.
 * All AI calls and file system operations happen here.
 */

import fs from "fs"
import path from "path"
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"
import type { ExpanseLottieMetadata } from "expanse.dynamicAssets"

// ============================================================================
// Configuration
// ============================================================================

const GEMINI_MODEL = "gemini-2.5-pro"
const GEMINI_MAX_OUTPUT_TOKENS = 65536

// Fields that may contain nested JSON strings in the response
const NESTED_JSON_FIELDS = [
  "recommendations.elementGroups",
  "recommendations.optionalAiContext",
  "recommendations.optionalAiStylePrompts",
  "recommendations.optionalAiVariantPrompts",
]

// ============================================================================
// Type Reading (from filesystem)
// ============================================================================

/**
 * Path to the metadata types directory
 */
const TYPES_BASE_PATH = path.resolve(
  process.cwd(),
  "../../packages/dynamicAssets/types/metadata",
)

/**
 * Read a TypeScript file and return its contents
 */
function readTypeFile(filename: string): string {
  try {
    const filePath = path.join(TYPES_BASE_PATH, filename)
    return fs.readFileSync(filePath, "utf-8")
  } catch (error) {
    console.error(`Failed to read type file: ${filename}`, error)
    return `// Failed to load ${filename}`
  }
}

/**
 * Read all metadata type files and return as a formatted string for AI prompts
 */
function getMetadataTypesDoc(): string {
  return `\`\`\`typescript
// === ApplicationContext.ts ===
${readTypeFile("ApplicationContext.ts")}

// === AnimationPurpose.ts ===
${readTypeFile("AnimationPurpose.ts")}

// === ContextSpecificMetaData.ts ===
${readTypeFile("ContextSpecificMetaData.ts")}

// === ExpanseLottieMetadata.ts ===
${readTypeFile("ExpanseLottieMetadata.ts")}
\`\`\``
}

// ============================================================================
// Gemini Client
// ============================================================================

/**
 * Get Google API key from environment
 */
function getGoogleApiKey(): string {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    throw new Error("Google API key environment variable is not set")
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
 * Create a configured Gemini model for JSON output
 */
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

/**
 * Extract JSON from a response that may contain markdown code blocks
 */
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

/**
 * Safely parse JSON with error context
 */
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

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj)
}

/**
 * Set nested value in object using dot notation
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split(".")
  const lastKey = keys.pop()!
  const target = keys.reduce((current, key) => {
    if (current[key] === undefined) {
      current[key] = {}
    }
    return current[key]
  }, obj)
  target[lastKey] = value
}

/**
 * Parse nested JSON strings within an object
 */
function parseNestedJsonStrings<T extends Record<string, any>>(
  obj: T,
  fields: string[],
): T {
  const result = { ...obj }

  for (const field of fields) {
    const value = getNestedValue(result, field)
    if (typeof value === "string" && value.trim()) {
      try {
        setNestedValue(result, field, JSON.parse(value))
      } catch (e) {
        console.warn(`Failed to parse nested JSON field: ${field}`, e)
      }
    }
  }

  return result
}

// ============================================================================
// Prompt Builder
// ============================================================================

/**
 * Build the metadata analysis prompt
 */
function buildMetadataPrompt(
  lottieJson: string,
  typesDoc: string,
  userProvidedMetadata?: {
    description?: string
    purpose?: string
    title?: string
  },
): string {
  const userMetadataSection = userProvidedMetadata
    ? `
**User-Provided Metadata:**
The user has provided some initial metadata about this animation. 
You may use this as helpful context and as a starting point, but feel free to improve upon it, expand it, or deviate from it if your analysis suggests better alternatives. 
Don't feel constrained by these suggestions - they are meant to guide, not limit your analysis.

${userProvidedMetadata.title ? `- Title: ${userProvidedMetadata.title}` : ""}
${userProvidedMetadata.description ? `- Description: ${userProvidedMetadata.description}` : ""}
${userProvidedMetadata.purpose ? `- Purpose: ${userProvidedMetadata.purpose}` : ""}
`
    : ""

  return `You are an expert at analyzing Lottie animations and generating comprehensive semantic metadata for theming and AI generation.

Your task is to analyze the structure, visual elements, colors, and motion patterns in a Lottie JSON file and generate metadata that EXACTLY matches this TypeScript interface structure:

${typesDoc}

CRITICAL: Return a JSON object that EXACTLY matches the ExpanseLottieMetadata interface structure. Every field must match the type definitions above.

${userMetadataSection}
**Lottie Animation JSON:**
The following is the complete Lottie animation file that you need to analyze and describe:

\`\`\`json
${lottieJson}
\`\`\`

This is the animation you are analyzing. Use the actual layer names, structure, and properties from this JSON to generate accurate metadata.

Guidelines for generation:

**Naming**:
- animationName: Use PascalCase (e.g., "CelebrationDance", "RocketLaunch")
- alternativeNames: 3-5 alternative names in PascalCase
- Names should be descriptive, semantic, and avoid generic terms

**Description**:
- 50-500 characters covering visual elements, motion, and themeable aspects
- Start with what the animation depicts visually
- Mention key motion characteristics
- Focus on what makes it distinctive

**Tags**:
- 5-15 tags in lowercase, hyphenated format for multi-word tags
- Include visual elements, emotions, actions, and use cases
- Cover visual style, motion type, emotional tone, and use cases

**Context-Specific Metadata**:
- Provide for all 5 contexts: education, work, gamification, life, web-content
- Each context must include: context, primary, useCaseExamples (2-5 examples), tags (2-8), and optional recommendations
- Focus on practical, specific use cases for each domain

**Recommendations**:
- recommendedColorPalettes: 3-6 palette names (e.g., "Ocean Blues", "Corporate Professional")
- elementGroups: JSON string containing logicalGrouped, sharedColor, themingPriority, visualHierarchy
- optionalAiContext: JSON string with mood, style, theme hints
- optionalAiStylePrompts: JSON string with aesthetic style prompts
- optionalAiVariantPrompts: Optional JSON string with variant generation prompts

**Element Groupings** (in elementGroups JSON string):
- Analyze layer names and structure to identify logical groups
- Group by visual semantics (e.g., "character-body", "background-elements")
- Identify color relationships (identical, complementary, gradient, shades)
- Classify theming priority (high=main focal points, medium=supporting, low=subtle details)
- Organize visual hierarchy (primary=main subject, secondary=supporting, accent=highlights, background=context)

Return ONLY valid JSON matching the ExpanseLottieMetadata interface. Do not include any markdown, code blocks, or additional text.`
}

// ============================================================================
// Public API
// ============================================================================

export interface MetadataGenerationInput {
  lottieJson: Record<string, any>
  userProvidedMetadata?: {
    description?: string
    purpose?: string
    title?: string
  }
}

export interface MetadataGenerationResult {
  success: boolean
  metadata?: ExpanseLottieMetadata
  error?: string
  durationMs?: number
}

/**
 * Generate metadata for a Lottie animation
 * This is the main entry point for the backend service
 */
export async function generateMetadata(
  input: MetadataGenerationInput,
): Promise<MetadataGenerationResult> {
  const startTime = Date.now()

  try {
    console.log("[MetadataService] Starting metadata generation...")

    // Read type definitions from filesystem
    const typesDoc = getMetadataTypesDoc()
    console.log("[MetadataService] Type definitions loaded")

    // Convert Lottie data to JSON string
    const lottieJsonString = JSON.stringify(input.lottieJson, null, 2)

    // Build the prompt
    const prompt = buildMetadataPrompt(
      lottieJsonString,
      typesDoc,
      input.userProvidedMetadata,
    )

    // Create model and generate
    const model = createJsonModel()
    console.log("[MetadataService] Calling Gemini API...")

    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = response.text()

    console.log("[MetadataService] Response received, parsing...")

    // Parse response
    let metadata = safeJsonParse<ExpanseLottieMetadata>(
      responseText,
      "metadata response",
    )

    // Parse nested JSON strings
    metadata = parseNestedJsonStrings(metadata, NESTED_JSON_FIELDS)

    const durationMs = Date.now() - startTime
    console.log(`[MetadataService] Completed in ${durationMs}ms`)

    return {
      success: true,
      metadata,
      durationMs,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"

    console.error("[MetadataService] Error:", errorMessage)

    return {
      success: false,
      error: errorMessage,
      durationMs: Date.now() - startTime,
    }
  }
}
