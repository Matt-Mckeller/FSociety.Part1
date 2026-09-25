"use client"
/**
 * SwingingShoppingBag Animation Component
 *
 * **Theming:**
 * - `theme`: Color theme name (e.g., "purple-light", "blue-dark")
 * - `variant`: Theme variant ("default" or custom variants)
 *
 * @example
 * ```tsx
 * <SwingingShoppingBag width="400px" theme="purple-light" />
 * <SwingingShoppingBag width="400px" theme="blue-dark" variant="minimal" />
 * ```
 */

import { createLottieComponent } from "../../theming/createLottieComponent"
import BaseAnimationData from "./SwingingShoppingBag.json"
import { SwingingShoppingBagSchema } from "./SwingingShoppingBag.expanse-lottie"

export const SwingingShoppingBag = createLottieComponent({
  animationName: "SwingingShoppingBag",
  baseAnimationData: BaseAnimationData,
  schema: SwingingShoppingBagSchema,
})

// Re-export types for consumers
export type { LottieComponentProps, LottieComponentRef } from "../../theming/createLottieComponent"
