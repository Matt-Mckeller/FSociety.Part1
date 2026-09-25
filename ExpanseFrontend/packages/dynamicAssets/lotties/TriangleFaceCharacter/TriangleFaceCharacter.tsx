"use client"
/**
 * TriangleFaceCharacter Animation Component
 *
 * **Theming:**
 * - `theme`: Color theme name (e.g., "purple-light", "blue-dark")
 * - `variant`: Theme variant ("default" or custom variants)
 *
 * @example
 * ```tsx
 * <TriangleFaceCharacter width="400px" theme="purple-light" />
 * <TriangleFaceCharacter width="400px" theme="blue-dark" variant="minimal" />
 * ```
 */

import { createLottieComponent } from "../../theming/createLottieComponent"
import BaseAnimationData from "./TriangleFaceCharacter.json"
import { TriangleFaceCharacterSchema } from "./TriangleFaceCharacter.expanse-lottie"

export const TriangleFaceCharacter = createLottieComponent({
  animationName: "TriangleFaceCharacter",
  baseAnimationData: BaseAnimationData,
  schema: TriangleFaceCharacterSchema,
})

// Re-export types for consumers
export type { LottieComponentProps, LottieComponentRef } from "../../theming/createLottieComponent"
