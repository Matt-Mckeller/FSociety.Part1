/**
 * Animation Theme Support Auto-Discovery
 *
 * This file auto-exports all animation theme supports.
 * To add a new animation, create a {AnimationName}.themes.ts file in this folder.
 *
 * Each theme file should export:
 * - animationName: string
 * - variantThemes: VariantThemeSupport[]
 */

// Export all animation theme supports
export * as AngelWingsHalo from "./AngelWingsHalo.themes"
export * as BusinessGrowth from "./BusinessGrowth.themes"
export * as CodeTerminal from "./CodeTerminal.themes"
export * as Homework from "./Homework.themes"
export * as RocketLaunch from "./RocketLaunch.themes"
export * as SwingingShoppingBag from "./SwingingShoppingBag.themes"
export * as TriangleFaceCharacter from "./TriangleFaceCharacter.themes"
export * as VersusClash from "./VersusClash.themes"

// Re-export for convenience
import * as AngelWingsHalo from "./AngelWingsHalo.themes"
import * as BusinessGrowth from "./BusinessGrowth.themes"
import * as CodeTerminal from "./CodeTerminal.themes"
import * as Homework from "./Homework.themes"
import * as RocketLaunch from "./RocketLaunch.themes"
import * as SwingingShoppingBag from "./SwingingShoppingBag.themes"
import * as TriangleFaceCharacter from "./TriangleFaceCharacter.themes"
import * as VersusClash from "./VersusClash.themes"

/**
 * All registered animation theme supports
 * Used by lottieThemeRegistry.ts to build ANIMATION_THEME_SUPPORT
 */
export const ALL_ANIMATION_THEMES = [
  AngelWingsHalo,
  BusinessGrowth,
  CodeTerminal,
  Homework,
  RocketLaunch,
  SwingingShoppingBag,
  TriangleFaceCharacter,
  VersusClash,
]
