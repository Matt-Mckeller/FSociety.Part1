/**
 * @expanse/character/vision
 *
 * The "vision" character subsystem — the interactive 4eye figure that holds a
 * Mind Controller / checks a watch, with gamified reaction animations and a
 * brain-wiring strip. Web-only (MUI + GSAP + DOM).
 *
 * Brand-coupled visuals (the achievement pill and coin burst) are injected by
 * the host app via `VisionControlCharacter`'s `achievementSlot` / `coinBurstSlot`
 * props, keeping this package free of any dependency on `@expanse/brand-core`
 * or `@expanse/shell` (both of which depend on `@expanse/character`).
 */

// =============================================================================
// CHARACTERS
// =============================================================================

export {
  VisionControlCharacter,
  type VisionControlCharacterProps,
  type ControlDevice,
} from "./VisionControlCharacter"
export { VisionWatchCharacter } from "./VisionWatchCharacter"

// =============================================================================
// BRAIN-WIRING STRIP + PULSE STREAM
// =============================================================================

export { BrainWiringStrip, type BrainWiringStripProps } from "./BrainWiringStrip"
export {
  BrainStripPulseProvider,
  usePulse,
  usePulseSubscribe,
  type PulseListener,
} from "./pulse/BrainStripPulseContext"

// =============================================================================
// LAYERS + CONTEXT (advanced composition)
// =============================================================================

export { CharacterLayer } from "./CharacterLayer"
export { DeviceLayer } from "./DeviceLayer"
export { OverlayLayer } from "./OverlayLayer"
export {
  VisionControlProvider,
  useVisionControl,
  type VisionControlContextValue,
} from "./context/VisionControlContext"

// =============================================================================
// ANIMATION
// =============================================================================

export {
  useControlAnimation,
  type AnimationVariant,
  type CharacterRefs,
  type UseControlAnimationArgs,
} from "./animation/useControlAnimation"

// =============================================================================
// DEVICES + OVERLAYS (brand-neutral SVGs)
// =============================================================================

export {
  ControllerSvg,
  DEFAULT_CONTROLLER_PALETTE,
  BUTTON_COLORS,
  BUTTON_LABELS,
  CTRL_W,
  CTRL_H,
  type ControllerPalette,
  type ControllerSvgHandle,
  type ButtonStyle,
} from "./devices/ControllerSvg"
export { HudControllerSvg, HUD_W, HUD_H } from "./devices/HudControllerSvg"
export {
  LightningBolt,
  BOLT_COLORS,
  type BoltColor,
} from "./devices/LightningBolt"
export { WatchSvg, WATCH_W, WATCH_H } from "./devices/WatchSvg"
export { LevelUpBadge, XpToast } from "./devices/Overlays"
