/**
 * Prompts for Lottie metadata analysis
 * Migrated from langchain/prompts/metadata.ts
 */

import { METADATA_TYPES_DOC } from "./metadataTypes"

/**
 * Generate TypeScript interface documentation for the prompt
 * Uses the METADATA_TYPES_DOC constant from metadataTypes.ts
 */
const getTypeScriptInterfaceDoc = () => {
  return METADATA_TYPES_DOC
}

/**
 * System prompt for metadata analysis
 */
export const getLottieMetadataAnalysisPrompt = (
  lottieJson: string,
  userProvidedMetadata?: {
    description?: string
    purpose?: string
    title?: string
  },
) => {
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

  const fullMetadataLottieAnalysisPrompt = `You are an expert at analyzing Lottie animations and generating comprehensive semantic metadata for theming and AI generation.

Your task is to analyze the structure, visual elements, colors, and motion patterns in a Lottie JSON file and generate metadata that EXACTLY matches this TypeScript interface structure:

${getTypeScriptInterfaceDoc()}

CRITICAL: Return a JSON object that EXACTLY matches the ExpanseLottieMetadata interface structure. Every field must match the type definitions above.

${userMetadataSection}
**Lottie Animation JSON:**
The following is the complete Lottie animation file that you need to analyze and describe:

\`\`\`json
${JSON.stringify(lottieJson, null, 2)}
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

  return fullMetadataLottieAnalysisPrompt
}
