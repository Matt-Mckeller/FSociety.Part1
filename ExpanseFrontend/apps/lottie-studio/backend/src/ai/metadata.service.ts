/**
 * Metadata Generation Service
 *
 * Analyzes Lottie animations and generates comprehensive semantic metadata
 * using Gemini AI. Metadata includes animation name, description, tags,
 * and contextual recommendations for theming.
 *
 * NOTE: Spend time thinking, and get it perfect. Quality over speed.
 */

import { Injectable, Logger } from '@nestjs/common';
import { AiService } from './ai.service';
import { LottieMetadata, LottieHints } from '@/types';

// Fields that may contain nested JSON strings in the response
const NESTED_JSON_FIELDS = [
  'recommendations.elementGroups',
  'recommendations.optionalAiContext',
  'recommendations.optionalAiStylePrompts',
  'recommendations.optionalAiVariantPrompts',
];

export interface MetadataGenerationResult {
  success: boolean;
  metadata?: LottieMetadata;
  error?: string;
  durationMs?: number;
}

@Injectable()
export class MetadataService {
  private readonly logger = new Logger(MetadataService.name);

  constructor(private aiService: AiService) {}

  /**
   * Generate metadata for a Lottie animation
   */
  async generateMetadata(
    lottieJson: Record<string, any>,
    hints?: LottieHints,
  ): Promise<MetadataGenerationResult> {
    const startTime = Date.now();

    try {
      this.logger.log('Starting metadata generation...');

      // Build the prompt
      const prompt = this.buildPrompt(lottieJson, hints);

      // Create model and generate
      const model = this.aiService.createJsonModel({
        temperature: 0.7,
      });

      this.logger.log('Calling Gemini API...');
      const responseText = await this.aiService.generateContent(model, prompt);

      this.logger.log('Response received, parsing...');

      // Parse response
      let metadata = this.aiService.safeJsonParse<LottieMetadata>(
        responseText,
        'metadata response',
      );

      // Parse nested JSON strings
      metadata = this.aiService.parseNestedJsonStrings(metadata, NESTED_JSON_FIELDS);

      const durationMs = Date.now() - startTime;
      this.logger.log(`Completed in ${durationMs}ms`);

      return {
        success: true,
        metadata,
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
   * Build the metadata analysis prompt
   */
  private buildPrompt(
    lottieJson: Record<string, any>,
    hints?: LottieHints,
  ): string {
    const lottieJsonString = JSON.stringify(lottieJson, null, 2);

    const hintsSection = hints
      ? `
**User-Provided Hints:**
The user has provided some initial context about this animation. 
You may use this as helpful context and as a starting point, but feel free to improve upon it, expand it, or deviate from it if your analysis suggests better alternatives. 
Don't feel constrained by these suggestions - they are meant to guide, not limit your analysis.

${hints.name ? `- Name: ${hints.name}` : ''}
${hints.description ? `- Description: ${hints.description}` : ''}
${hints.purpose ? `- Purpose: ${hints.purpose}` : ''}
${hints.tags?.length ? `- Tags: ${hints.tags.join(', ')}` : ''}
`
      : '';

    return `You are an expert at analyzing Lottie animations and generating comprehensive semantic metadata for theming and AI generation.

Spend time thinking through this carefully, and get it perfect.

Your task is to analyze the structure, visual elements, colors, and motion patterns in a Lottie JSON file and generate metadata that matches this structure:

interface LottieMetadata {
  animationName: string;           // PascalCase name
  alternativeNames?: string[];     // 3-5 alternative names
  description: string;             // 50-500 chars
  tags: string[];                  // 5-15 lowercase tags
  recommendations: {
    recommendedColorPalettes: string[];
    elementGroups: {
      logicalGrouped: Record<string, { elements: string[]; description: string }>;
      sharedColor: Record<string, { elements: string[]; description: string; colorRelationship: string }>;
      themingPriority: Record<string, { elements: string[]; description: string; priority: 'high' | 'medium' | 'low' }>;
      visualHierarchy: Record<string, { elements: string[]; description: string; hierarchy: string }>;
    };
    optionalAiContext: Record<string, string>;
    optionalAiStylePrompts: Record<string, string>;
    optionalAiVariantPrompts?: Record<string, string>;
  };
}

${hintsSection}

**Lottie Animation JSON:**
\`\`\`json
${lottieJsonString}
\`\`\`

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

**Recommendations**:
- recommendedColorPalettes: 3-6 palette names (e.g., "Ocean Blues", "Corporate Professional")
- elementGroups: Group by visual semantics, color relationships, theming priority, visual hierarchy
- optionalAiContext: Mood, style, theme hints
- optionalAiStylePrompts: Aesthetic style prompts
- optionalAiVariantPrompts: Optional variant generation prompts

**Element Groupings**:
- Analyze layer names and structure to identify logical groups
- Group by visual semantics (e.g., "character-body", "background-elements")
- Identify color relationships (identical, complementary, gradient, shades)
- Classify theming priority (high=main focal points, medium=supporting, low=subtle details)
- Organize visual hierarchy (primary=main subject, secondary=supporting, accent=highlights, background=context)

Return ONLY valid JSON matching the LottieMetadata interface. Do not include any markdown, code blocks, or additional text.`;
  }
}
