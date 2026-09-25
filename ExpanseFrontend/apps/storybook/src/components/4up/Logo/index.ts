/**
 * Logo Component Barrel Export
 * 
 * Central export for all logo-related components, hooks, utilities, and types
 */

// Components
export { Logo } from './Logo';
export { LogoConfigurator } from './LogoConfigurator';

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
  LogoProps,
  LogoConfiguratorProps,
} from './types';

// Utilities
export {
  // Calculations
  degreesToRadians,
  calculateCircleCenters,
  generateArcPath,
  calculateSoundWaves,
  calculateViewBox,
  getSquarePoints,
  calculateOpacities,
  calculateWaveOpacity,
  calculateConnectorLines,
} from './utils/logoCalculations';

export {
  // Config
  defaultLogoConfig,
  // Presets
  colorPresets,
  opacityPresets,
  overlapPresets,
  ratioPresets,
  // Preset appliers
  applyColorPreset,
  applyOpacityPreset,
  applyOverlapPreset,
  applyRatioPreset,
  // Config generators
  createMinimalConfig,
  createWhiteConfig,
  createBlackConfig,
} from './utils/logoConfig';
