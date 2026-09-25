import type { ElementType } from "./ElementType"
import type { RoleFunction } from "./RoleFunction"
import type { VisualLevel } from "./VisualLevel"
import type { SemanticRole } from "./SemanticRole"
import type { GradientColorStop } from "./GradientColorStop"

/**
 * Represents detailed information about a single element within a Lottie animation.
 *
 * This interface is used by AI analysis tools to identify, categorize, and theme
 * individual elements within Lottie animations. It captures both technical properties
 * (path, color, type) and semantic properties (role, function, themeability).
 *
 * @see Few-shot examples: /apps/playground/src/app/lottie-naming-tool/utils/ai/instructions/analysis/few-shot-examples/
 * @see Edge case instructions: /apps/playground/src/app/lottie-naming-tool/utils/ai/instructions/analysis/edge-cases/
 *
 * @interface ExpanseLottieElementDetails
 *
 * @property {string} name - Human-readable PascalCase name following [Purpose][Location][Detail] pattern
 *   AI should generate names that are descriptive and follow the naming convention.
 *   @example "WingLeftFeatherFill" - Wing (purpose) + Left (location) + Feather (detail)
 *   @example "BackgroundGradientFill" - Background (purpose) + GradientFill (detail)
 *   @example "CharacterBodyMainFill" - Character (purpose) + Body (location) + MainFill (detail)
 *   @example "RocketExhaustFlameFill" - Rocket (purpose) + Exhaust (location) + FlameFill (detail)
 *
 * @property {string[]} [alternativeNames] - Optional alternative names for this element
 *   AI should provide commonly used or intuitive alternative names.
 *   @example ["Shirt", "Top", "Clothing"] for a character's shirt
 *   @example ["Halo", "Glow", "Aura"] for a glow effect
 *   @example ["Track", "Rail", "Path"] for a progress track
 *
 * @property {string} description - Clear, concise explanation of what this element represents
 *   AI should describe the element's visual appearance and role in the animation.
 *   @example "The main fill color for the character's shirt"
 *   @example "Background gradient transitioning from light blue to dark blue"
 *   @example "Particle effect emitted from rocket exhaust during launch"
 *   @example "Glow effect surrounding the character's head"
 *
 * @property {string} path - Exact JavaScript accessor path using bracket notation
 *   CRITICAL: AI must use precise bracket notation for array indices to ensure paths are executable.
 *   ✅ Correct: "layers[1].shapes[0].it[1].c.k"
 *   ❌ Wrong: "layers.1.shapes.0.it.1.c.k"
 *   ⚠️ PRECOMP WARNING: Embedded precomp layers use "layers[X].layers[Y]..." not "assets[X].layers[Y]..."
 *   @example "layers[0].shapes[0].it[1].c.k" - Solid fill color
 *   @example "layers[1].shapes[2].it[0].g.k.k" - Gradient fill
 *   @example "layers[7].layers[0].shapes[2].it[0].it[0].it[2].c.k" - Fill in embedded precomp layer
 *   @see Path format rules: /apps/playground/src/app/lottie-naming-tool/utils/ai/instructions/analysis/edge-cases/path-format.ts
 *   @see Precomp detection: /apps/playground/src/app/lottie-naming-tool/utils/ai/instructions/analysis/edge-cases/precomp-detection.ts
 *
 * @property {string | GradientColorStop[] | null} originalColor - Original color value from Lottie JSON
 *   AI must convert Lottie's 0-1 range to hex format "#rrggbbaa" for solid colors.
 *   For solid colors: Use "#rrggbbaa" hex format with alpha channel (00=transparent, ff=opaque)
 *   For gradients: Array of {offset: number, color: string} stops where offset is 0-1
 *   For non-themeable: null (no color data, like layers, groups, transforms)
 *   @example "#9eb2dcff" - Solid blue with full opacity (Lottie: [0.62, 0.70, 0.86, 1])
 *   @example "#ffffff80" - White with 50% transparency (Lottie: [1, 1, 1, 0.5])
 *   @example "#00000000" - Fully transparent (Lottie: [0, 0, 0, 0])
 *   @example [{"offset": 0, "color": "#ff0000ff"}, {"offset": 0.5, "color": "#ffff00ff"}, {"offset": 1, "color": "#0000ffff"}]
 *   @example null - For structural elements like layers, groups, transforms
 *   @see Color format rules: /apps/playground/src/app/lottie-naming-tool/utils/ai/instructions/analysis/edge-cases/color-formats.ts
 *   @see Gradient extraction: /apps/playground/src/app/lottie-naming-tool/utils/ai/instructions/analysis/edge-cases/gradient-extraction.ts
 *
 * @property {ElementType} [elementType] - Type classification (fill, stroke, gradient, layer, group, etc.)
 *   AI should generate this based on path analysis and Lottie structure.
 *   Tool will validate against actual Lottie structure after AI response.
 *   @example "fill" for solid fill paths ending in .c.k with ty:"fl"
 *   @example "stroke" for stroke paths ending in .c.k with ty:"st"
 *   @example "gradient" for gradient paths ending in .g.k.k
 *   @example "layer" for layer paths like "layers[X]"
 *   @example "group" for group containers
 *   @example "transform" for transform properties like scale, rotation, position
 *
 * @property {RoleFunction} [roleFunction] - Functional role this element plays in the animation
 *   AI should analyze the element's purpose in the overall animation context.
 *   @example "primary_subject" - Main character, focal object, or hero element
 *   @example "supporting_object" - Secondary objects that support the main subject
 *   @example "background" - Background elements, scenery, or environment
 *   @example "particle" - Particle effects, sparkles, or ambient elements
 *   @example "ui_indicator" - UI feedback elements like loading spinners, progress bars
 *   @example "lighting" - Lighting effects, glows, or shadows
 *   @example "text" - Text elements or labels
 *
 * @property {VisualLevel} [visualLevel] - Importance in visual hierarchy
 *   AI should assess the element's prominence in the overall composition.
 *   @example "primary" - Main focal elements that draw immediate attention
 *   @example "secondary" - Supporting elements that provide context
 *   @example "tertiary" - Subtle accent or detail elements
 *   @example "hidden" - Non-visible controls, masks, or structural elements
 *
 * @property {SemanticRole} [semanticRole] - Semantic categorization for organizational purposes
 *   AI should determine the element's conceptual role in the animation.
 *   @example "illustrative_object" - Main illustrated objects (characters, items, icons)
 *   @example "decorative_element" - Decorative accents, ornaments, embellishments
 *   @example "motion_cue" - Animation indicators, motion trails, or dynamic elements
 *   @example "structural_group" - Container/grouping layers that organize other elements
 *   @example "textual_element" - Text, labels, or typographic elements
 *   @example "interactive_component" - Elements designed for user interaction
 *   @example "effect" - Visual effects like glows, shadows, blurs
 *
 * @property {boolean} [isThemeable] - Whether element can be themed (has color data)
 *   AI should set to true if originalColor is not null, false otherwise.
 *   Tool will validate this matches the presence of originalColor.
 *   @example true - Element has originalColor (solid color or gradient)
 *   @example false - Element has no originalColor (null)
 *
 * @property {boolean} [isSkinTone] - Identifies skin tone elements for specialized handling
 *   AI should detect elements representing human/character skin tones.
 *   Used for skin tone diversity and accessibility features.
 *   @example true for character skin, face, hands, arms, legs, neck
 *   @example false for everything else
 *
 * @property {boolean} [isClothing] - Identifies clothing or apparel elements
 *   AI should detect elements representing wearable items.
 *   @example true for shirts, pants, dresses, shoes, hats, accessories, jewelry
 *   @example false for body parts, backgrounds, effects
 *
 * @property {boolean} [isEffect] - Identifies visual effects
 *   AI should detect elements that are visual effects rather than solid objects.
 *   @example true for glows, shadows, particles, highlights, motion blur, sparkles
 *   @example false for solid objects, characters, backgrounds
 *
 * @property {boolean} [isBackground] - Identifies background elements
 *   AI should detect elements that are part of the background or scenery.
 *   @example true for background layers, backdrop elements, scenery, environment
 *   @example false for foreground objects, characters, UI elements
 *
 * @property {string[]} elementGroups - Logical groupings for bulk operations
 *   AI should assign elements to multiple relevant groups for organization and theming.
 *   Elements can belong to multiple groups simultaneously.
 *   @example ["character", "apparel", "primary"] for main character clothing
 *   @example ["background", "ambient", "themeable"] for themeable background elements
 *   @example ["effects", "particles", "decorative"] for particle systems
 *   @example ["body", "skin-tone", "primary"] for body parts with skin
 *   @example ["ui", "indicator", "brand"] for branded UI elements
 *
 * @property {string[]} [tags] - Additional metadata tags for filtering and categorization
 *   AI should add relevant tags for enhanced discoverability and organization.
 *   @example ["customizable", "brand-color"] for brand-related elements
 *   @example ["animated", "keyframed"] for animated elements
 *   @example ["gradient", "multi-stop"] for complex gradients
 *   @example ["subtle", "accent"] for accent colors
 *   @example ["high-contrast", "accessible"] for accessibility considerations
 *
 * @example Basic usage
 * ```typescript
 * const element: ExpanseLottieElementDetails = {
 *   name: "CharacterShirtFill",
 *   alternativeNames: ["Top", "Clothing"],
 *   description: "Main character's shirt fill color",
 *   path: "layers[0].shapes[2].it[1].c.k",
 *   originalColor: "#FF5733",
 *   elementType: "fill",
 *   roleFunction: "primary_subject",
 *   visualLevel: "primary",
 *   semanticRole: "illustrative_object",
 *   isThemeable: true,
 *   isClothing: true,
 *   elementGroups: ["character", "apparel", "themeable"],
 *   tags: ["primary", "customizable", "brand-color"]
 * };
 * ```
 *
 * @example Gradient with precomp path
 * ```typescript
 * const gradientElement: ExpanseLottieElementDetails = {
 *   name: "BackgroundSkyGradient",
 *   alternativeNames: ["Sky", "Backdrop"],
 *   description: "Background gradient transitioning from light blue at top to darker blue at bottom",
 *   path: "layers[7].layers[0].shapes[0].it[1].g.k.k",
 *   originalColor: [
 *     {"offset": 0, "color": "#87CEEBFF"},
 *     {"offset": 1, "color": "#4682B4FF"}
 *   ],
 *   elementType: "gradient",
 *   roleFunction: "background",
 *   visualLevel: "secondary",
 *   semanticRole: "decorative_element",
 *   isThemeable: true,
 *   isBackground: true,
 *   elementGroups: ["background", "ambient", "themeable"],
 *   tags: ["gradient", "atmospheric", "multi-stop"]
 * };
 * ```
 */
export interface ExpanseLottieElementDetails {
  name: string
  alternativeNames?: string[]
  description: string
  path: string
  originalColor: string | GradientColorStop[] | null
  elementType?: ElementType
  roleFunction?: RoleFunction
  visualLevel?: VisualLevel
  semanticRole?: SemanticRole
  isThemeable?: boolean
  isSkinTone?: boolean
  isClothing?: boolean
  isEffect?: boolean
  isBackground?: boolean
  elementGroups: string[]
  tags?: string[]
}
