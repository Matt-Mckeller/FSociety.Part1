/**
 * Display components for progress bars, expanding bars, and logos
 */

// Bars
export { ProgressBar } from "@expanse/character/2d"
export { ExpandingBar } from "./ExpandingBar"
export type { ExpandingBarProps, ExpandingBarVisualState } from "./ExpandingBar"
export { ExpandingBarTripleLayer, useTripleLayerBarContext } from "./ExpandingBarTripleLayer"
export type {
  ExpandingBarTripleLayerProps,
  ExpandingBarTripleLayerVariant,
  ExpandingBarTripleLayerVisualState,
} from "./ExpandingBarTripleLayer"

// Decorative frames
export { CornerBracketFrame } from "./CornerBracketFrame"
export type {
  CornerBracketFrameProps,
  CornerBracketVariant,
  CornerBracketLayerRatio,
  CornerBracketCorner,
} from "./CornerBracketFrame"

// Logos
export * from "./logos"

// Note: Icons (CoinIcon, GemIcon, ExperienceIcon) are internal to status bars
// and not exported to avoid naming conflicts with composites.
//
// CoinStackIcon is an exception — it has no conflicting composite and is
// used as a public "treasure" asset across consumer apps (e.g. the 4eye
// marketing app's Quests modal).
export {
  CoinStackIcon,
  COIN_BLACK,
  COIN_BLACK_SHADOW,
  COIN_PALETTES,
} from "./icons/CoinStackIcon"
export type {
  CoinStackIconProps,
  CoinStackPaletteName,
} from "./icons/CoinStackIcon"
