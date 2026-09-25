"use client"
/**
 * Homework Animation Component
 *
 * A book with pencil and sparkle effects that themes with dynamic colors.
 *
 * **Theming:**
 * - `theme`: Color theme name (e.g., "purple-light", "blue-dark")
 * - `variant`: Theme variant ("default" or "minimal")
 *
 * **Theme Variants:**
 * - "default": Full theming - all elements themed
 * - "minimal": Only pencil and notebook cover themed
 *
 * @example
 * ```tsx
 * <Homework width="400px" theme="purple-light" />
 * <Homework width="400px" theme="blue-dark" variant="minimal" />
 * ```
 */

import { createLottieComponent } from "../../theming/createLottieComponent"
import BaseAnimationData from "./Homework.json"
import { HomeworkSchema } from "./Homework.expanse-lottie"

export const Homework = createLottieComponent({
  animationName: "Homework",
  baseAnimationData: BaseAnimationData,
  schema: HomeworkSchema,
})

// Re-export types for consumers
export type { LottieComponentProps, LottieComponentRef } from "../../theming/createLottieComponent"
