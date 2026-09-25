"use client"
/**
 * VersusClash Animation Component
 *
 * **Theming:**
 * - `theme`: Color theme name (e.g., "purple-light", "blue-dark")
 * - `variant`: Theme variant ("default" or custom variants)
 *
 * @example
 * ```tsx
 * <VersusClash width="400px" theme="purple-light" />
 * <VersusClash width="400px" theme="blue-dark" variant="minimal" />
 * ```
 */

import { createLottieComponent } from "../../theming/createLottieComponent"
import BaseAnimationData from "./VersusClash_ExpanseLottie.json"
import { VersusClashSchema } from "./VersusClash.expanse-lottie"

export const VersusClash = createLottieComponent({
  animationName: "VersusClash",
  baseAnimationData: BaseAnimationData,
  schema: VersusClashSchema,
})

// Re-export types for consumers
export type {
  LottieComponentProps,
  LottieComponentRef,
} from "../../theming/createLottieComponent"
