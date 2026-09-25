/**
 * Gradient Primitives
 *
 * Theme-aware gradients for vector graphics.
 *
 * ## Split Modes
 * - soft: Smooth transition (default)
 * - hard: 50/50 with small transition zone
 * - sharp: Pure 50/50 split
 *
 * ## Example
 * ```tsx
 * <defs>
 *   <BackgroundGradient id="growth" />
 *   <BackgroundGradient id="split" split="hard" />
 * </defs>
 * ```
 */

export { BackgroundGradient, GRADIENT_PRESETS } from "./BackgroundGradient"
export type {
  BackgroundGradientProps,
  GradientDirection,
  GradientSplit,
} from "./BackgroundGradient"

export { WaterBackground } from "./WaterBackground"
export type { WaterBackgroundProps } from "./WaterBackground"
