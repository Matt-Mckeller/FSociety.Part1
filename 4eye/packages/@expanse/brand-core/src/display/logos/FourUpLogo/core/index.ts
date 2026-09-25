/**
 * 4up Logo - Core Module Index
 *
 * Re-exports all core functionality.
 */

// Types
export type {
  Point,
  Circle,
  ViewBox,
  Line,
  WaveStyle,
  LogoConfig,
  LogoProps,
  CalculatedGeometry,
  LogoShape,
} from './types';

// Defaults
export { defaultConfig, mergeConfig } from './defaults';

// Calculations
export {
  degreesToRadians,
  calculateCircleCenters,
  calculateOpacities,
  generateArcPath,
  calculateSoundWaves,
  getWaveOpacity,
  calculateConnectorLines,
  calculateViewBox,
  calculateGeometry,
} from './calculations';

// SVG Renderer
export { renderLogoSvg, renderLogoSvgMinified } from './renderSvg';
export type { RenderOptions } from './renderSvg';
