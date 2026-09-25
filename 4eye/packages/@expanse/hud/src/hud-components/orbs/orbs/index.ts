// Components
export { ActionOrb } from "../ActionOrb";
export { OrbCluster } from "../OrbCluster";

// Types
export type {
  ActionOrbProps,
  OrbClusterProps,
  OrbShape,
  OrbSize,
  OrbVariant,
  OrbColor,
  OrbColorMode,
  OrbPattern,
  OrbPositionMode,
  OrbItem,
  HotkeyDisplayStyle,
  OrbThemePreset,
} from "../types";
export { ORB_COLORS, ORB_SIZES } from "../types";

// Hooks
export {
  useOrbColors,
  useAbilityPalette,
  useIsGamifiedTheme,
  useOrbCluster,
  calculateClusterHeight,
} from "./hooks";
export type {
  UseOrbColorsOptions,
  UseOrbColorsReturn,
  AbilityPalette,
  UseOrbClusterOptions,
  UseOrbClusterReturn,
  PositionedOrbItem,
} from "./hooks";

// Utils
export {
  hexToRgb,
  rgbToHex,
  hexToRgba,
  darkenHex,
  lightenHex,
  saturateHex,
  generateOrbColors,
  blendColors,
  createGradient,
  OPACITY_PRESETS,
} from "../orbColors";
export type { Position, PositionConfig } from "../orbPositions";
