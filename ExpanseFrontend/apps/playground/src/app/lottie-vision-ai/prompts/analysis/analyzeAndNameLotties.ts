/**
 * AI System Prompts
 * Shared prompts used by Claude and Gemini for Lottie analysis
 */

import { LottieAnimation } from "expanse.dynamicAssets"
import { LottieAnalysisInput } from "../../../lottie-naming-tool/types/LottieAnalysisInput"
import { TYPE_DEFINITIONS } from "../../generated/generatedUnifiedSchemaType"
import { allFewShotExamples } from "./few-shot-examples"
import {
  pathFormatInstructions,
  colorFormatInstructions,
  colorExtractionRules,
  gradientExtractionInstructions,
  precompDetectionInstructions,
} from "./instructions"

function getTypeDefinitions(): string {
  return TYPE_DEFINITIONS
}

/**
 * Build comprehensive analysis prompt for AI naming
 */
export function getAnalysisAndNamingPrompt(input: LottieAnalysisInput): string {
  // Build context section if metadata is provided
  const contextSection = buildContextSection(
    input.userProvidedMetadata?.title,
    input.userProvidedMetadata?.description,
    input.userProvidedMetadata?.purpose,
  )

  // Build Lottie JSON section if provided
  const lottieSection = buildLottieDataSection(input.lottie)

  // Core instructions
  const coreInstructions = buildCoreInstructions()

  // Edge case instructions (composed from separate files)
  const edgeCaseInstructions = guidelinesAndEdgeCaes()

  // Type definitions (auto-generated from ExpanseLottieElementDetails)
  const typeDefinitions = buildTypeDefinitionsSection()

  // Few-shot examples (composed from separate typed files)
  const fewShotExamples = buildFewShotExamplesSection()

  // Final reminders
  const finalReminders = buildFinalReminders()

  // Compose final prompt
  return `${coreInstructions}

${contextSection}

${lottieSection}

${edgeCaseInstructions}

${typeDefinitions}

${fewShotExamples}

${finalReminders}
`
}

/**
 * Build context section if metadata is provided
 */
function buildContextSection(
  animationName?: string,
  animationDescription?: string,
  animationPurpose?: string,
): string {
  if (!animationName && !animationDescription && !animationPurpose) {
    return ""
  }

  return `
ANIMATION CONTEXT:
${animationName ? `Animation Name: ${animationName}` : ""}
${animationDescription ? `Description: ${animationDescription}` : ""}
${animationPurpose ? `Purpose: ${animationPurpose}` : ""}

Use this context to inform your element naming decisions. Generate names that align with the animation's purpose and design intent.
`
}

/**
 * Build Lottie JSON section if provided
 */
function buildLottieDataSection(lottie: LottieAnimation): string {
  if (!lottie) {
    return ""
  }

  return `
## Complete Lottie JSON Structure:

\`\`\`json
${JSON.stringify(lottie)}
\`\`\`
`
}

/**
 * Build core instructions
 */
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

/**
 * Build edge case instructions section
 */
function guidelinesAndEdgeCaes(): string {
  return `
═══════════════════════════════════════════════════════════════════
GUIDELINES AND EDGE CASE HANDLING
═══════════════════════════════════════════════════════════════════

${pathFormatInstructions}

${colorFormatInstructions}

${colorExtractionRules}

${gradientExtractionInstructions}

${precompDetectionInstructions}
`
}

/**
 * Build type definitions section
 */
function buildTypeDefinitionsSection(): string {
  return `
═══════════════════════════════════════════════════════════════════
CRITICAL: JSON-ONLY RESPONSE - EXACT INTERFACE MATCH REQUIRED
═══════════════════════════════════════════════════════════════════

YOU MUST:
1. Respond with ONLY a valid JSON object matching the ExpanseLottie interface from the TypeScript interface below
2. NO markdown code blocks (no backticks or code fences)
5. First character MUST be { and last character MUST be }
6. Validate your JSON is parseable before responding
7. ONLY include fields defined in the TypeScript interface below
8. DO NOT add extra fields

TYPESCRIPT INTERFACE DEFINITIONS:

${getTypeDefinitions()}
`
}

/**
 * Build few-shot examples section
 */
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

/**
 * Format a single few-shot example
 */
function formatFewShotExample(
  example: (typeof allFewShotExamples)[keyof typeof allFewShotExamples],
  exampleNumber: number,
): string {
  const response = {
    elementNames: example.elements,
    description: example.animationMetadata,
  }

  let output = `Example ${exampleNumber}: ${example.title}
${JSON.stringify(response, null, 2)}`

  // Add critical note for precomp example
  if ("criticalNote" in example && example.criticalNote) {
    output += `\n\n${example.criticalNote}`
  }

  return output
}

/**
 * Build final reminders section
 */
function buildFinalReminders(): string {
  return `
CRITICAL REMINDER:
- ONLY include the exact fields shown in the TypeScript interface above
- DO NOT add extra fields
- Use camelCase field names exactly as shown in the interface
- Respond ONLY with the JSON object. No other text.
`
}
