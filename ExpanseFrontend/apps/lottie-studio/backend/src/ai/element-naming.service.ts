/**
 * Element Naming Service
 *
 * Analyzes Lottie animation structures and generates semantic, descriptive names
 * for components following the [Purpose][Location][Detail] naming pattern.
 *
 * NOTE: Spend time thinking, and get it perfect. Quality over speed.
 */

import { Injectable, Logger } from '@nestjs/common';
import { AiService } from './ai.service';
import { LottieElement, LottieMetadata } from '@/types';

export interface ElementNamingResult {
  success: boolean;
  elements?: Record<string, LottieElement>;
  error?: string;
  durationMs?: number;
}

@Injectable()
export class ElementNamingService {
  private readonly logger = new Logger(ElementNamingService.name);

  constructor(private aiService: AiService) {}

  /**
   * Generate element names for a Lottie animation
   */
  async generateElementNames(
    lottieJson: Record<string, any>,
    metadata?: LottieMetadata,
  ): Promise<ElementNamingResult> {
    const startTime = Date.now();

    try {
      this.logger.log('Starting element naming generation...');

      // Build the prompt
      const prompt = this.buildPrompt(lottieJson, metadata);

      // Create model and generate
      const model = this.aiService.createJsonModel({
        temperature: 0.7,
      });

      this.logger.log('Calling Gemini API...');
      const responseText = await this.aiService.generateContent(model, prompt);

      this.logger.log('Response received, parsing...');

      // Parse response
      const data = this.aiService.safeJsonParse<{ elements: Record<string, LottieElement> }>(
        responseText,
        'element naming response',
      );

      const durationMs = Date.now() - startTime;
      this.logger.log(
        `Completed in ${durationMs}ms - Found ${Object.keys(data.elements).length} elements`,
      );

      return {
        success: true,
        elements: data.elements,
        durationMs,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      this.logger.error(`Error: ${errorMessage}`);

      return {
        success: false,
        error: errorMessage,
        durationMs: Date.now() - startTime,
      };
    }
  }

  /**
   * Build the element naming prompt
   */
  private buildPrompt(
    lottieJson: Record<string, any>,
    metadata?: LottieMetadata,
  ): string {
    const contextSection = this.buildContextSection(metadata);
    const lottieSection = JSON.stringify(lottieJson, null, 2);

    return `You are an expert Lottie animation analyst and naming specialist.

Spend time thinking through this carefully, and get it perfect.

Your task is to analyze Lottie animation structures and generate semantic, descriptive names for components following the [Purpose][Location][Detail] naming pattern.

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
- "RocketExhaustFlameFill" - Rocket (purpose) + Exhaust (location) + FlameFill (detail)

${contextSection}

## Complete Lottie JSON Structure:

\`\`\`json
${lottieSection}
\`\`\`

═══════════════════════════════════════════════════════════════════
CRITICAL: JSON-ONLY RESPONSE - EXACT INTERFACE MATCH REQUIRED
═══════════════════════════════════════════════════════════════════

YOU MUST:
1. Respond with ONLY a valid JSON object
2. NO markdown code blocks (no backticks or code fences)
3. NO explanatory text before or after the JSON
4. First character MUST be { and last character MUST be }
5. ONLY include fields defined in the interface below

Response Structure:
{
  "elements": {
    "ElementName": {
      "name": "ElementName",
      "path": "layers[0].shapes[0].it[1].c.k",
      "description": "Description of what this element represents",
      "alternativeNames": ["AltName1", "AltName2"],
      "originalColor": "#rrggbbaa or null for gradients",
      "elementType": "fill|stroke|gradient|layer|group|transform|effect|mask",
      "roleFunction": "primary_subject|supporting_object|background|particle|ui_indicator|lighting|text|decoration",
      "visualLevel": "primary|secondary|tertiary|hidden",
      "semanticRole": "illustrative_object|decorative_element|motion_cue|structural_group|textual_element|interactive_component|effect",
      "isThemeable": true,
      "tags": ["tag1", "tag2"]
    }
  }
}

═══════════════════════════════════════════════════════════════════
PATH FORMAT RULES
═══════════════════════════════════════════════════════════════════

1. Use bracket notation for ALL array indices: layers[0], shapes[1], it[2]
2. Use dot notation for properties: .shapes, .it, .c, .k
3. Complete path example: "layers[0].shapes[0].it[1].c.k"
4. For animated colors, path should point to the .k property containing keyframes or static value
5. For gradients, path should point to the gradient data (.g)

═══════════════════════════════════════════════════════════════════
COLOR EXTRACTION RULES
═══════════════════════════════════════════════════════════════════

1. Static colors: Extract from .c.k array [r, g, b, a] (values 0-1), convert to hex "#rrggbbaa"
2. Animated colors: Note "animated" in description, use first keyframe color
3. Gradients: Set originalColor to null, describe gradient in description
4. Convert all colors to 8-digit hex with alpha: "#rrggbbaa"

Return ONLY the JSON object. No other text.`;
  }

  /**
   * Build context section from metadata
   */
  private buildContextSection(metadata?: LottieMetadata): string {
    if (!metadata) return '';

    return `
ANIMATION CONTEXT (from metadata analysis):
- Name: ${metadata.animationName}
- Description: ${metadata.description}
${metadata.tags?.length ? `- Tags: ${metadata.tags.join(', ')}` : ''}

Use this context to inform your element naming decisions. Generate names that align with the animation's purpose and design intent.
`;
  }
}
