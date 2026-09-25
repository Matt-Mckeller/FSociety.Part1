/**
 * AI Theme Generator Service
 *
 * Uses Gemini AI to generate contextually appropriate color mappings
 * for Lottie animation elements based on color palettes.
 *
 * Strategy:
 * - Send Lottie JSON once at start (cached in chat context)
 * - Generate 1-3 themes per API call for quality
 * - Progressive generation with status updates
 */

import { createJsonModel, generateContent } from "../ai/client/geminiClient"
import type {
  ExpanseLottie,
  ExpanseLottieElementDetails,
} from "expanse.dynamicAssets"
import type {
  ThemeGenerationRequest,
  ThemeGenerationResult,
  GeneratedTheme,
  ThemeGenerationProgress,
  AIThemeGenerationResponse,
  ElementContextInfo,
} from "./types"
import type { ColorPalette } from "./colorPalettes"
import { formatPaletteForPrompt } from "./colorPalettes"

/**
 * Maximum themes to generate per AI call
 * Lower = more time for AI to think = better quality
 */
const THEMES_PER_CALL = 2

/**
 * Generate themes for an animation
 */
export async function generateThemes(
  request: ThemeGenerationRequest,
): Promise<ThemeGenerationResult> {
  const {
    animationName,
    schema,
    lottieJson,
    palettes,
    variant = "default",
    onProgress,
    allowCreativeColors = true,
  } = request

  const result: ThemeGenerationResult = {
    animationName,
    variant,
    themes: [],
    errors: [],
  }

  // Extract element info for AI context
  const elementContext = extractElementContext(schema)

  // Report initialization
  onProgress?.({
    phase: "initializing",
    currentThemeIndex: 0,
    totalThemes: palettes.length,
    message: `Preparing to generate ${palettes.length} themes for ${animationName}...`,
  })

  // Batch palettes into groups of THEMES_PER_CALL
  const paletteBatches: ColorPalette[][] = []
  for (let i = 0; i < palettes.length; i += THEMES_PER_CALL) {
    paletteBatches.push(palettes.slice(i, i + THEMES_PER_CALL))
  }

  // Generate themes in batches
  for (let batchIndex = 0; batchIndex < paletteBatches.length; batchIndex++) {
    const batch = paletteBatches[batchIndex]
    const startIndex = batchIndex * THEMES_PER_CALL

    onProgress?.({
      phase: "generating",
      currentThemeIndex: startIndex,
      totalThemes: palettes.length,
      currentThemeId: batch.map((p) => p.id).join(", "),
      message: `Generating themes: ${batch.map((p) => p.name).join(", ")}...`,
    })

    try {
      const batchThemes = await generateThemeBatch(
        animationName,
        variant,
        schema,
        lottieJson,
        batch,
        elementContext,
        allowCreativeColors,
      )

      result.themes.push(...batchThemes)
    } catch (error) {
      // Record error but continue with other batches
      for (const palette of batch) {
        result.errors.push({
          themeId: `${variant}-${palette.id}`,
          message: error instanceof Error ? error.message : "Unknown error",
          recoverable: true,
        })
      }
    }
  }

  onProgress?.({
    phase: "complete",
    currentThemeIndex: palettes.length,
    totalThemes: palettes.length,
    message: `Generated ${result.themes.length} themes successfully!`,
  })

  return result
}

/**
 * Generate a batch of themes (1-3 per call)
 */
async function generateThemeBatch(
  animationName: string,
  variant: string,
  schema: ExpanseLottie,
  lottieJson: any,
  palettes: ColorPalette[],
  elementContext: ElementContextInfo[],
  allowCreativeColors: boolean,
): Promise<GeneratedTheme[]> {
  const prompt = buildThemeGenerationPrompt(
    animationName,
    variant,
    schema,
    lottieJson,
    palettes,
    elementContext,
    allowCreativeColors,
  )

  const model = createJsonModel({
    temperature: 0.7,
    systemInstruction: THEME_GENERATION_SYSTEM_PROMPT,
  })

  const responseText = await generateContent(model, prompt)
  const response: AIThemeGenerationResponse = JSON.parse(responseText)

  // Convert AI response to GeneratedTheme objects
  return response.themes.map((aiTheme, index) => {
    const palette = palettes[index]
    return {
      themeId: `${variant}-${palette.id}`,
      palette,
      colors: aiTheme.colors,
      skippedElements: aiTheme.skippedElements || [],
      name: aiTheme.name,
      description: aiTheme.description,
      generatedAt: new Date().toISOString(),
    }
  })
}

/**
 * Extract element context from schema for AI
 */
function extractElementContext(schema: ExpanseLottie): ElementContextInfo[] {
  const elements: ElementContextInfo[] = []

  for (const [_key, element] of Object.entries(schema.elements)) {
    // Handle originalColor which can be string, GradientColorStop[], or null
    let colorStr: string | undefined
    if (typeof element.originalColor === "string") {
      colorStr = element.originalColor
    } else if (Array.isArray(element.originalColor)) {
      // For gradients, take the first color
      colorStr = element.originalColor[0]?.color
    }

    elements.push({
      name: element.name,
      path: element.path,
      originalColor: colorStr,
      type: element.elementType as any,
      role: element.roleFunction,
      visualLevel: element.visualLevel,
    })
  }

  return elements
}

/**
 * Build the theme generation prompt
 */
function buildThemeGenerationPrompt(
  animationName: string,
  variant: string,
  schema: ExpanseLottie,
  lottieJson: any,
  palettes: ColorPalette[],
  elementContext: ElementContextInfo[],
  allowCreativeColors: boolean = true,
): string {
  // Format element list
  const elementList = elementContext
    .map((e) => {
      const parts = [`  - ${e.name}`]
      if (e.type) parts.push(`type: ${e.type}`)
      if (e.role) parts.push(`role: ${e.role}`)
      if (e.visualLevel) parts.push(`level: ${e.visualLevel}`)
      if (e.originalColor) parts.push(`original: ${e.originalColor}`)
      return parts.join(" | ")
    })
    .join("\n")

  // Format palette info
  const paletteInfo = palettes.map(formatPaletteForPrompt).join("\n\n")

  // Build request for specific themes
  const themeRequests = palettes
    .map((p, i) => `${i + 1}. ${p.name} (${p.id}) - ${p.mode} mode`)
    .join("\n")

  // Include Lottie JSON for full context (helps AI understand animation structure)
  const lottieJsonStr = JSON.stringify(lottieJson, null, 2)

  // Build creative colors instruction based on setting
  const creativeColorsInstruction = allowCreativeColors
    ? `## Creative Color Flexibility
You are ALLOWED and ENCOURAGED to venture outside the provided color palettes when it would create a better, more visually cohesive result. The provided palettes are a starting point and define the overall theme direction, but you should:
- Use complementary colors not in the palette when they improve the composition
- Adjust saturation and brightness to create better depth and hierarchy
- Add subtle variations to avoid monotonous color schemes
- Ensure the final result still ALIGNS with the base color theme and mood
- Prioritize visual appeal and animation quality over strict palette adherence

The goal is to create the most beautiful, professional-looking themed animation possible.`
    : `## Strict Palette Adherence
You MUST use ONLY colors from the provided palettes. Do not introduce any colors outside of what is explicitly listed in the palette definitions.`

  return `# Theme Generation Request

## Animation Details
- **Name**: ${animationName}
- **Variant**: ${variant}
- **Description**: ${schema.description}
- **Element Count**: ${elementContext.length}

## Lottie Animation JSON
This is the full animation data for context. Use it as additional support to understand the structure and relationships between elements:

\`\`\`json
${lottieJsonStr}
\`\`\`

## Elements to Theme
These are the themeable elements in the animation. Each needs a color assignment:

${elementList}

## Color Palettes to Use
Generate themes using these exact palettes:

${paletteInfo}

## Themes to Generate
${themeRequests}

${creativeColorsInstruction}

## Requirements
1. Assign colors from the palette to each element based on:
   - Element type (fill, stroke, gradient)
   - Element role (primary, accent, background, decoration)
   - Visual level (foreground, midground, background)
   - Original color relationships (preserve relative brightness)

2. For DARK mode themes:
   - Use lighter variants for foreground elements
   - Ensure sufficient contrast against dark backgrounds
   - Consider how colors appear on dark backgrounds

3. For LIGHT mode themes:
   - Use darker variants for better visibility
   - Ensure sufficient contrast against light backgrounds

4. Maintain visual hierarchy:
   - Primary elements should be most prominent
   - Background elements should be subtle
   - Accents should draw attention appropriately

5. Keep related elements consistent:
   - Elements in the same group should use harmonious colors
   - Fill/stroke pairs should work together

## Output Format
Return a JSON object with this structure:
{
  "themes": [
    {
      "themeId": "${variant}-${palettes[0]?.id || "theme-id"}",
      "name": "Theme Name",
      "description": "Brief description of the theme",
      "baseColor": "${palettes[0]?.baseColor || "color"}",
      "mode": "${palettes[0]?.mode || "light"}",
      "colors": {
        "ElementName1": "#HEXCOLOR",
        "ElementName2": "#HEXCOLOR"
      },
      "skippedElements": [],
      "reasoning": "Brief explanation of color choices"
    }
  ]
}

Generate ${palettes.length} theme(s) now.`
}

/**
 * System prompt for theme generation
 */
const THEME_GENERATION_SYSTEM_PROMPT = `You are an expert UI/UX designer specializing in creating cohesive color themes for animated graphics.

Your task is to generate color themes for Lottie animations that:
1. Are visually appealing and professional
2. Maintain proper contrast and accessibility
3. Preserve the visual hierarchy of the original animation
4. Use colors from the provided palette appropriately
5. Work well in both light and dark modes (as specified)

Guidelines:
- Use primary colors for main subjects/focal points
- Use secondary colors for supporting elements
- Use light/dark variants for depth and dimension
- Use white/black/gray for structural elements
- Consider how animated elements will look in motion
- Ensure text and important elements remain readable

Output valid JSON only. No explanations outside the JSON structure.`
