/**
 * JSON Schema definitions for Google Gemini structured output
 * These schemas mirror the Zod schemas from lottieThemeZodSchemas
 *
 * Note: Gemini's schema format doesn't support all JSON Schema features
 * We simplify some complex structures while maintaining the essential data model
 */

import { SchemaType } from "@google/generative-ai"

/**
 * JSON Schema for ExpanseLottieMetadata
 * This matches the ExpanseLottieMetadataSchema Zod schema structure
 */
export const ExpanseLottieMetadataJsonSchema = {
  type: SchemaType.OBJECT,
  properties: {
    animationName: {
      type: SchemaType.STRING,
      description: "The animation name in PascalCase",
    },
    alternativeNames: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "3-5 alternative animation names in PascalCase",
    },
    description: {
      type: SchemaType.STRING,
      description:
        "Clear, comprehensive description of the animation and its themeable elements (50-500 chars)",
    },
    tags: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "5-15 relevant tags for categorization and search",
    },
    recommendations: {
      type: SchemaType.OBJECT,
      properties: {
        recommendedColorPalettes: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description:
            "3-6 recommended color palette names or descriptions that work well for this animation",
        },
        elementGroups: {
          type: SchemaType.STRING,
          description:
            "JSON string describing element groupings including logicalGrouped, sharedColor, themingPriority, and visualHierarchy",
        },
        optionalAiContext: {
          type: SchemaType.STRING,
          description:
            "JSON string of AI generation context hints as key-value pairs",
        },
        optionalAiStylePrompts: {
          type: SchemaType.STRING,
          description:
            "JSON string of AI style prompts for generation as key-value pairs",
        },
        optionalAiVariantPrompts: {
          type: SchemaType.STRING,
          description:
            "JSON string of prompts for generating animation variants as key-value pairs",
        },
      },
      required: [
        "recommendedColorPalettes",
        "elementGroups",
        "optionalAiContext",
        "optionalAiStylePrompts",
      ],
    },
  },
  required: ["animationName", "description", "tags", "recommendations"],
}
