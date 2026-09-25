/**
 * Theme Generation Service
 *
 * Uses Gemini AI to generate contextually appropriate color mappings
 * for Lottie animation elements based on color palettes.
 *
 * Strategy:
 * - Send Lottie JSON with full context
 * - Generate 1 theme per API call for maximum quality
 * - Progressive generation with status updates
 *
 * NOTE: Spend time thinking, and get it perfect. Quality over speed.
 */

import { Injectable, Logger } from '@nestjs/common';
import { AiService } from './ai.service';
import { LottieElement, LottieTheme, ColorPalette, ThemeMode } from '@/types';

/**
 * Maximum themes to generate per AI call
 * 1 = maximum time for AI to think = best quality
 */
const THEMES_PER_CALL = 1;

export interface ThemeGenerationRequest {
  animationName: string;
  description: string;
  elements: Record<string, LottieElement>;
  lottieJson: Record<string, any>;
  palettes: ColorPalette[];
  variant?: string;
  allowCreativeColors?: boolean;
}

export interface ThemeGenerationResult {
  success: boolean;
  themes: LottieTheme[];
  errors: Array<{ themeId: string; message: string; recoverable: boolean }>;
  durationMs?: number;
}

interface ElementContextInfo {
  name: string;
  path: string;
  originalColor?: string;
  type?: string;
  role?: string;
  visualLevel?: string;
}

@Injectable()
export class ThemeService {
  private readonly logger = new Logger(ThemeService.name);

  constructor(private aiService: AiService) {}

  /**
   * Generate themes for an animation
   */
  async generateThemes(request: ThemeGenerationRequest): Promise<ThemeGenerationResult> {
    const startTime = Date.now();
    const {
      animationName,
      description,
      elements,
      lottieJson,
      palettes,
      variant = 'default',
      allowCreativeColors = true,
    } = request;

    const result: ThemeGenerationResult = {
      success: true,
      themes: [],
      errors: [],
    };

    // Extract element info for AI context
    const elementContext = this.extractElementContext(elements);

    this.logger.log(`Generating ${palettes.length} themes for ${animationName}...`);

    // Generate 1 theme per call for maximum quality
    for (let i = 0; i < palettes.length; i++) {
      const palette = palettes[i];

      this.logger.log(`Generating theme ${i + 1}/${palettes.length}: ${palette.name}...`);

      try {
        const theme = await this.generateSingleTheme(
          animationName,
          description,
          variant,
          lottieJson,
          palette,
          elementContext,
          allowCreativeColors,
        );

        result.themes.push(theme);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(`Failed to generate theme ${palette.id}: ${errorMessage}`);

        result.errors.push({
          themeId: `${variant}-${palette.id}`,
          message: errorMessage,
          recoverable: true,
        });
      }
    }

    result.durationMs = Date.now() - startTime;
    result.success = result.themes.length > 0;

    this.logger.log(
      `Completed: ${result.themes.length} themes generated, ${result.errors.length} errors in ${result.durationMs}ms`,
    );

    return result;
  }

  /**
   * Generate a single theme
   */
  private async generateSingleTheme(
    animationName: string,
    description: string,
    variant: string,
    lottieJson: Record<string, any>,
    palette: ColorPalette,
    elementContext: ElementContextInfo[],
    allowCreativeColors: boolean,
  ): Promise<LottieTheme> {
    const prompt = this.buildThemePrompt(
      animationName,
      description,
      variant,
      lottieJson,
      palette,
      elementContext,
      allowCreativeColors,
    );

    const model = this.aiService.createJsonModel({
      temperature: 0.7,
      systemInstruction: THEME_GENERATION_SYSTEM_PROMPT,
    });

    const responseText = await this.aiService.generateContent(model, prompt);
    const response = this.aiService.safeJsonParse<{ themes: LottieTheme[] }>(
      responseText,
      'theme generation response',
    );

    // Return the single generated theme
    const aiTheme = response.themes[0];

    return {
      themeId: `${variant}-${palette.id}`,
      name: aiTheme.name,
      description: aiTheme.description,
      baseColor: palette.baseColor,
      mode: palette.mode,
      colors: aiTheme.colors,
      skippedElements: aiTheme.skippedElements || [],
      reasoning: aiTheme.reasoning,
    };
  }

  /**
   * Extract element context from elements for AI
   */
  private extractElementContext(elements: Record<string, LottieElement>): ElementContextInfo[] {
    const context: ElementContextInfo[] = [];

    for (const [_key, element] of Object.entries(elements)) {
      let colorStr: string | undefined;
      if (typeof element.originalColor === 'string') {
        colorStr = element.originalColor;
      } else if (Array.isArray(element.originalColor) && element.originalColor.length > 0) {
        colorStr = element.originalColor[0]?.color;
      }

      context.push({
        name: element.name,
        path: element.path,
        originalColor: colorStr,
        type: element.elementType,
        role: element.roleFunction,
        visualLevel: element.visualLevel,
      });
    }

    return context;
  }

  /**
   * Build the theme generation prompt
   */
  private buildThemePrompt(
    animationName: string,
    description: string,
    variant: string,
    lottieJson: Record<string, any>,
    palette: ColorPalette,
    elementContext: ElementContextInfo[],
    allowCreativeColors: boolean,
  ): string {
    // Format element list
    const elementList = elementContext
      .map((e) => {
        const parts = [`  - ${e.name}`];
        if (e.type) parts.push(`type: ${e.type}`);
        if (e.role) parts.push(`role: ${e.role}`);
        if (e.visualLevel) parts.push(`level: ${e.visualLevel}`);
        if (e.originalColor) parts.push(`original: ${e.originalColor}`);
        return parts.join(' | ');
      })
      .join('\n');

    // Format palette info
    const paletteInfo = this.formatPaletteForPrompt(palette);

    // Include Lottie JSON for full context
    const lottieJsonStr = JSON.stringify(lottieJson, null, 2);

    // Creative colors instruction
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
You MUST use ONLY colors from the provided palettes. Do not introduce any colors outside of what is explicitly listed in the palette definitions.`;

    return `# Theme Generation Request

Spend time thinking through this carefully, and get it perfect.

## Animation Details
- **Name**: ${animationName}
- **Variant**: ${variant}
- **Description**: ${description}
- **Element Count**: ${elementContext.length}

## Lottie Animation JSON
This is the full animation data for context:

\`\`\`json
${lottieJsonStr}
\`\`\`

## Elements to Theme
These are the themeable elements in the animation:

${elementList}

## Color Palette to Use
${paletteInfo}

## Theme to Generate
${palette.name} (${palette.id}) - ${palette.mode} mode

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
      "themeId": "${variant}-${palette.id}",
      "name": "${palette.name}",
      "description": "Brief description of the theme",
      "baseColor": "${palette.baseColor}",
      "mode": "${palette.mode}",
      "colors": {
        "ElementName1": "#HEXCOLOR",
        "ElementName2": "#HEXCOLOR"
      },
      "skippedElements": [],
      "reasoning": "Brief explanation of color choices"
    }
  ]
}

Generate the theme now.`;
  }

  /**
   * Format a palette for the prompt
   */
  private formatPaletteForPrompt(palette: ColorPalette): string {
    const colors = palette.colors;
    return `### ${palette.name} (${palette.id}) - ${palette.mode} mode
Base Color: ${palette.baseColor}

Colors:
- Primary Main: ${colors.primaryMain}
- Primary Dark: ${colors.primaryDark}
- Primary Light: ${colors.primaryLight}
- Primary High Saturation: ${colors.primaryHighSat}
${colors.primaryExtra1 ? `- Primary Extra 1: ${colors.primaryExtra1}` : ''}
${colors.primaryExtra2 ? `- Primary Extra 2: ${colors.primaryExtra2}` : ''}
- Secondary Main: ${colors.secondaryMain}
- Secondary Light: ${colors.secondaryLight}
- Secondary Dark: ${colors.secondaryDark}
- Background Default: ${colors.backgroundDefault}
- Background Paper: ${colors.backgroundPaper}
- Text Primary: ${colors.textPrimary}
- Text Secondary: ${colors.textSecondary}
- Black: ${colors.black}
- White: ${colors.white}
- Gray: ${colors.gray}
- Gradient Start: ${colors.gradientStart}
- Gradient End: ${colors.gradientEnd}`;
  }
}

/**
 * System prompt for theme generation
 */
const THEME_GENERATION_SYSTEM_PROMPT = `You are an expert UI/UX designer specializing in creating cohesive color themes for animated graphics.

Spend time thinking, and get it perfect.

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

Output valid JSON only. No explanations outside the JSON structure.`;
