/**
 * Logo Configuration Defaults and Presets
 * 
 * Default configuration values and preset collections for quick styling
 */

import type { LogoConfig, ColorPreset, OpacityPreset, OverlapPreset, RatioPreset } from '../types';

// ============================================
// Default Configuration
// ============================================

export const defaultLogoConfig: LogoConfig = {
  // Shape & Scaling
  shape: 'circle',
  baseUnit: 21.5,
  scaleFactors: [1, 2, 4],
  showBaseCircle: false,

  // Positioning
  movementAngle: 90,
  innerOverlap: 55,
  outerOverlap: 29,

  // Center Hole
  showCenterHole: true,
  centerHoleSize: 25,
  showConnectorLines: true,
  connectorLineWidth: 5,
  leftLinePercent: 50,
  rightLinePercent: 50,

  // Sound Waves
  showWaves: true,
  waveCount: 3,
  waveOffset: 8,
  waveSpacing: 8,
  waveArcSpan: 83,
  waveStartAngle: 45,
  waveStrokeWidth: 5.5,
  waveFade: true,

  // Colors & Opacity
  fillColor: '#1976d2',
  baseOpacity: 0.61,
  primaryOpacity: 1.0,
  waveColor: '#1976d2',
  waveOpacity: 0.8,
};

// ============================================
// Color Presets
// ============================================

export const colorPresets: ColorPreset[] = [
  { name: 'MUI Blue', color: '#1976d2', description: 'Default MUI primary' },
  { name: 'Blue', color: '#4A90D9', description: 'Bold, Balanced' },
  { name: 'Electric Blue', color: '#3b46f5', description: 'Bold, Balanced' },
  { name: 'Light Blue', color: '#2196f3', description: 'Bold, Balanced' },
  { name: 'Dark Blue', color: '#0d47a1', description: 'Bold, 1-2-4' },
  { name: 'Navy', color: '#1a237e', description: '1-2-4, Bold' },
  { name: 'Indigo', color: '#303f9f', description: 'Bold, 1-2-4' },
  { name: 'Royal Blue', color: '#002171', description: '1-2-4, Bold' },
  { name: 'Cyan', color: '#0288d1', description: 'Bold, 1-2-4' },
  { name: 'Cyan 700', color: '#0097a7', description: 'Bold, Balanced' },
  { name: 'Teal 500', color: '#009688', description: 'Bold, Balanced' },
  { name: 'Teal 600', color: '#00897b', description: 'Bold, Balanced' },
  { name: 'Teal 700', color: '#00796b', description: 'Bold, Balanced' },
  { name: 'Teal 800', color: '#00695c', description: '1-2-4, Bold' },
  { name: 'Deep Teal', color: '#006064', description: '1-2-4, Bold' },
  { name: 'Persian Green', color: '#00a896', description: 'Bold, Balanced' },
  { name: 'Purple', color: '#7b1fa2', description: '1-2-4, Bold' },
  { name: 'Green', color: '#2e7d32', description: 'Bold, Balanced' },
  { name: 'Red', color: '#d32f2f', description: 'Deep, Soft' },
  { name: 'Orange', color: '#ed6c02', description: 'Deep, Soft' },
  { name: 'Pink', color: '#c2185b', description: 'Soft, Deep' },
];

// ============================================
// Opacity Presets
// ============================================

export const opacityPresets: OpacityPreset[] = [
  { name: 'Default', baseOpacity: 0.61, primaryOpacity: 1.0, waveOpacity: 0.8 },
  { name: 'Subtle', baseOpacity: 0.70, primaryOpacity: 1.0, waveOpacity: 0.85 },
  { name: 'Moderate', baseOpacity: 0.50, primaryOpacity: 1.0, waveOpacity: 0.75 },
  { name: 'Deep', baseOpacity: 0.40, primaryOpacity: 1.0, waveOpacity: 0.70 },
  { name: 'Flat', baseOpacity: 0.80, primaryOpacity: 1.0, waveOpacity: 0.90 },
  { name: 'Dramatic', baseOpacity: 0.30, primaryOpacity: 1.0, waveOpacity: 0.65 },
];

// ============================================
// Overlap Presets
// ============================================

export const overlapPresets: OverlapPreset[] = [
  { name: 'Balanced', innerOverlap: 50, outerOverlap: 50 },
  { name: 'Golden φ', innerOverlap: 62, outerOverlap: 38 },
  { name: '1-2-4', innerOverlap: 66, outerOverlap: 33 },
  { name: 'Default', innerOverlap: 55, outerOverlap: 29 },
  { name: 'Strong', innerOverlap: 55, outerOverlap: 35 },
  { name: 'Dramatic', innerOverlap: 70, outerOverlap: 25 },
];

// ============================================
// Size Ratio Presets
// ============================================

export const ratioPresets: RatioPreset[] = [
  { name: '1:2', scaleFactors: [1, 2, 4], description: 'Strong contrast' },
  { name: '1:φ', scaleFactors: [1, 1.618, 2.618], description: 'Golden ratio - Natural harmony' },
  { name: '3:5', scaleFactors: [1, 1.5, 2.5], description: 'Fibonacci - Balanced' },
  { name: '2:3', scaleFactors: [1, 1.5, 2], description: 'Softer contrast' },
];

// ============================================
// Config Creators
// ============================================

/**
 * Create a config with a color preset applied
 */
export function applyColorPreset(config: LogoConfig, preset: ColorPreset): LogoConfig {
  return {
    ...config,
    fillColor: preset.color,
    waveColor: preset.color,
  };
}

/**
 * Create a config with an opacity preset applied
 */
export function applyOpacityPreset(config: LogoConfig, preset: OpacityPreset): LogoConfig {
  return {
    ...config,
    baseOpacity: preset.baseOpacity,
    primaryOpacity: preset.primaryOpacity,
    waveOpacity: preset.waveOpacity,
  };
}

/**
 * Create a config with an overlap preset applied
 */
export function applyOverlapPreset(config: LogoConfig, preset: OverlapPreset): LogoConfig {
  return {
    ...config,
    innerOverlap: preset.innerOverlap,
    outerOverlap: preset.outerOverlap,
  };
}

/**
 * Create a config with a ratio preset applied
 */
export function applyRatioPreset(config: LogoConfig, preset: RatioPreset): LogoConfig {
  return {
    ...config,
    scaleFactors: preset.scaleFactors,
  };
}

/**
 * Create a minimal logo config (no waves)
 */
export function createMinimalConfig(overrides?: Partial<LogoConfig>): LogoConfig {
  return {
    ...defaultLogoConfig,
    showWaves: false,
    showConnectorLines: false,
    ...overrides,
  };
}

/**
 * Create a full logo config with all features
 */
export function createFullConfig(overrides?: Partial<LogoConfig>): LogoConfig {
  return {
    ...defaultLogoConfig,
    showWaves: true,
    showConnectorLines: true,
    ...overrides,
  };
}

// ============================================
// Monochrome Variants
// ============================================

/**
 * Create a white-on-dark config
 */
export function createWhiteConfig(overrides?: Partial<LogoConfig>): LogoConfig {
  return {
    ...defaultLogoConfig,
    fillColor: '#ffffff',
    waveColor: '#ffffff',
    ...overrides,
  };
}

/**
 * Create a black-on-light config
 */
export function createBlackConfig(overrides?: Partial<LogoConfig>): LogoConfig {
  return {
    ...defaultLogoConfig,
    fillColor: '#000000',
    waveColor: '#000000',
    ...overrides,
  };
}
