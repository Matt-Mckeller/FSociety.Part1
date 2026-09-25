/**
 * BrandWordplay barrel exports — context-backed animation system.
 */

export {
  BrandWordplayContext,
  BrandWordplayProvider,
  type BrandWordplayContextType,
  type BrandWordplayState,
  type BrandWordplayAction,
  brandWordplayReducer,
  // Constants
  SEQUENCE,
  FINAL_IDX,
  HOLD_MS,
  GLITCH_CHARS,
  SCRAMBLE_TOTAL_MS,
  SCRAMBLE_FRAMES,
  FRAME_MS,
  CYBER,
  CYBER_GLOW_IDLE,
  CYBER_GLOW_ACTIVE,
  INITIAL_STATE,
} from "./BrandWordplayContext";

export { useBrandWordplay } from "./useBrandWordplay";
export { BrandWordplayHeadline, type BrandWordplayHeadlineProps } from "./BrandWordplayHeadline";
