/**
 * Dynamic Assets Types
 *
 * Main entry point for all type exports.
 */

import Animation from "@lottie-animation-community/lottie-types"

export type LottieAnimation = Animation

// Core ExpanseLottie type
export { type ExpanseLottie } from "./ExpanseLottie"

// Metadata types
export {
  APPLICATION_CONTEXTS,
  type ApplicationContext,
} from "./metadata/ApplicationContext"
export { type AnimationPurpose } from "./metadata/AnimationPurpose"
export { type ContextSpecificMetaData } from "./metadata/ContextSpecificMetaData"
export { type ExpanseLottieMetadata } from "./metadata/ExpanseLottieMetadata"

// Element types
export { type ElementType } from "./elements/ElementType"
export { type RoleFunction } from "./elements/RoleFunction"
export { type VisualLevel } from "./elements/VisualLevel"
export { type SemanticRole } from "./elements/SemanticRole"
export { type GradientColorStop } from "./elements/GradientColorStop"
export { type ExpanseLottieElementDetails } from "./elements/ExpanseLottieElementDetails"
