/**
 * 4up Logo - Main Entry Point
 *
 * Clean architecture with separation of concerns:
 * - core/       : Pure TypeScript logic (no React dependency)
 * - animations/ : GSAP animations (requires gsap package)
 * - export/     : SVG export utilities
 * - FourUpLogo  : React component wrapper
 */

// ============================================
// Core (Framework-Agnostic)
// ============================================

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
} from './core/types';

// Configuration
export { defaultConfig, mergeConfig } from './core/defaults';

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
} from './core/calculations';

// SVG Renderer
export { renderLogoSvg, renderLogoSvgMinified } from './core/renderSvg';
export type { RenderOptions } from './core/renderSvg';

// ============================================
// React Component
// ============================================

export { FourUpLogo, default as FourUpLogoDefault } from './FourUpLogo';

// ============================================
// Export Utilities
// ============================================

export {
  generateSvgString,
  generateSvgStringMinified,
  downloadSvg,
  copySvgToClipboard,
  copySvgToClipboardMinified,
  generateDataUrl,
  generateBase64DataUrl,
} from './export';

// ============================================
// Animations
// ============================================

export {
  // Types
  type AnimationOptions,
  type LogoSelector,
  // Entrance Animations
  bounceEntrance,
  scaleEntrance,
  fadeEntrance,
  // Idle Animations
  bounceIdle,
  pulseGlow,
  wavePulse,
  breathing,
  // Interactive Animations
  hoverLift,
  clickPop,
  // Combination Animations
  fullEntranceWithIdle,
  // Presets
  presets,
  // Cleanup
  killAnimations,
  resetLogo,
} from './animations';
