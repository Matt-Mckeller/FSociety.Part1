import type { ApplicationContext } from "./ApplicationContext"
import type { ContextSpecificMetaData } from "./ContextSpecificMetaData"
import type { AnimationPurpose } from "./AnimationPurpose"

export interface ExpanseLottieMetadata {
  /** Animation name this schema applies to */
  animationName: string

  /** Alternative names suggested by AI or manual input */
  alternativeNames?: string[]

  /** Description of the animation and its themeable elements */
  description: string

  /** Animation-level metadata tags */
  tags: string[]

  /** Structured purpose information for the animation */
  purpose?: AnimationPurpose

  /** Context-specific metadata for different application domains */
  contextSpecificMetadata?: Partial<
    Record<ApplicationContext, ContextSpecificMetaData>
  >

  /** AI generation recommendations */
  recommendations: {
    /** Color palettes that work well for this animation */
    recommendedColorPalettes: string[]

    /** Different types of element groups */
    elementGroups: {
      /** Logical grouping (body parts, clothing, etc.) */
      logicalGrouped: {
        [groupName: string]: {
          elements: string[]
          description: string
        }
      }

      /** Shared color relationships */
      sharedColor: {
        [groupName: string]: {
          elements: string[]
          description: string
          colorRelationship:
            | "identical"
            | "complementary"
            | "gradient"
            | "shades"
            | string
        }
      }

      /** Theming priority */
      themingPriority: {
        [groupName: string]: {
          elements: string[]
          description: string
          priority: "high" | "medium" | "low"
        }
      }

      /** Visual hierarchy */
      visualHierarchy: {
        [groupName: string]: {
          elements: string[]
          description: string
          hierarchy: "primary" | "secondary" | "accent" | "background" | string
        }
      }
    }

    optionalAiContext: {
      [contextType: string]: string
    }

    optionalAiStylePrompts: {
      [promptType: string]: string
    }

    optionalAiVariantPrompts?: {
      [promptType: string]: string
    }
  }
}
