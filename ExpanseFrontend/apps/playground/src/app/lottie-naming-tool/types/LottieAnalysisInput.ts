/**
 * Lottie Analysis Input Types
 *
 * Input types for AI-based Lottie animation analysis.
 */

import type Animation from "@lottie-animation-community/lottie-types"

export type LottieAnimation = Animation

/**
 * Input for Lottie metadata analysis
 */
export interface LottieAnalysisInput {
  lottie: LottieAnimation
  userProvidedMetadata?: {
    description?: string
    purpose?: string
    title?: string
  }
}
