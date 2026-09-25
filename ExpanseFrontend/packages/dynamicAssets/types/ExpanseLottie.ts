/**
 * ExpanseLottie - Core Type Definition
 *
 * The complete schema for a themed Lottie animation, combining
 * animation-level metadata with detailed element information.
 */

import type { ExpanseLottieMetadata } from "./metadata/ExpanseLottieMetadata"
import type { ExpanseLottieElementDetails } from "./elements/ExpanseLottieElementDetails"

/**
 * Complete ExpanseLottie definition combining metadata and element details.
 * This is the full schema for a themed Lottie animation.
 */
export interface ExpanseLottie extends ExpanseLottieMetadata {
  /** All themeable elements in this animation, keyed by element name */
  elements: Record<string, ExpanseLottieElementDetails>
}
