// Components
export { ActionOrb } from "./ActionOrb";
export { OrbCluster } from "./OrbCluster";

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
} from "./types";
export { ORB_COLORS, ORB_SIZES } from "./types";

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

// Color utilities
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
} from "./orbColors";
export type { OrbColorConfig } from "./orbColors";

// Position utilities
export {
  bottomArcPositions,
  topArcPositions,
  leftStackPositions,
  rightStackPositions,
  radialPositions,
  cornersPositions,
  diagonalTLPositions,
  diagonalTRPositions,
  bottomRowPositions,
  overlappingRowPositions,
  overlappingArcPositions,
  getPatternPositions,
} from "./orbPositions";
export type { Position, PositionConfig } from "./orbPositions";
