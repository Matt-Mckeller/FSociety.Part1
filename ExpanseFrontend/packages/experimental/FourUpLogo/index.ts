/**
 * FourUpLogo Component Barrel Export
 *
 * Central export for all logo-related components, utilities, and types
 */

// Components
export { FourUpLogo } from "./FourUpLogo"

// Types
export type {
  // Shape types
  LogoShape,
  // Geometry types
  Point,
  Circle,
  ViewBox,
  WaveSet,
  // Config types
  LogoConfig,
  // Preset types
  ColorPreset,
  OpacityPreset,
  OverlapPreset,
  RatioPreset,
  // Component prop types
  FourUpLogoProps,
} from "./types"

// Utilities - Calculations
export {
  degreesToRadians,
  calculateCircleCenters,
  generateArcPath,
  calculateSoundWaves,
  calculateViewBox,
  getSquarePoints,
  getTrianglePoints,
  calculateOpacities,
  calculateWaveOpacity,
  calculateConnectorLines,
} from "./logoCalculations"

// Utilities - Config
export {
  defaultLogoConfig,
  colorPresets,
  opacityPresets,
  overlapPresets,
  ratioPresets,
  applyColorPreset,
  applyOpacityPreset,
  applyOverlapPreset,
  applyRatioPreset,
  createMinimalConfig,
  createFullConfig,
  createWhiteConfig,
  createBlackConfig,
} from "./logoConfig"
