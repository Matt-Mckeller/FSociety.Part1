/**
 * 4up Logo - Default Configuration
 *
 * Values synced from preview.html (finalized 2-circle design).
 */

import type { LogoConfig } from './types';

/**
 * Default logo configuration
 *
 * Matches the current preview.html defaults.
 * 2-circle mode by default (showBaseCircle: false).
 */
export const defaultConfig: LogoConfig = {
  // === Sizing ===
  baseUnit: 21.5,
  scaleFactors: [1, 2, 4],
  shape: 'circle',

  // === Circle Mode ===
  showBaseCircle: false, // 2-circle mode

  // === Overlap ===
  innerOverlap: 55,
  outerOverlap: 29,

  // === Movement ===
  movementAngle: 90,

  // === Center Hole ===
  showCenterHole: true,
  centerHoleSize: 25,

  // === Connector Lines ===
  showConnectorLines: true,
  connectorLineWidth: 5,
  leftLinePercent: 50,
  rightLinePercent: 50,

  // === Opacity ===
  smallCircleOpacity: 0.61,
  largeCircleOpacity: 1.0,

  // === Colors ===
  fillColor: '#1976d2', // MUI Blue

  // === Waves ===
  showWaves: true,
  waveCount: 3,
  waveOffset: 8,
  waveSpacing: 8,
  waveArcSpan: 83,
  waveStartAngle: 45,
  waveStrokeWidth: 5.5,
  waveColor: '#1976d2',
  waveOpacity: 0.8,
  waveFade: true,
  waveStyle: 'wifi',
};

/**
 * Merge partial config with defaults
 */
export function mergeConfig(overrides?: Partial<LogoConfig>): LogoConfig {
  if (!overrides) return { ...defaultConfig };
  return { ...defaultConfig, ...overrides };
}
