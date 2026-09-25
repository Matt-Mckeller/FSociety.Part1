/**
 * 4up Logo - Geometry Calculations
 *
 * Pure math functions for calculating positions, paths, and bounds.
 * No framework dependencies.
 */

import type { LogoConfig, Point, Circle, ViewBox, Line, CalculatedGeometry } from './types';

// ============================================
// Math Utilities
// ============================================

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// ============================================
// Circle Calculations
// ============================================

/**
 * Calculate the center positions of all three circles along the movement vector.
 *
 * Uses overlap percentages (% of smaller circle's diameter) to position circles.
 * Circle positions are calculated even if not all are visible.
 */
export function calculateCircleCenters(config: LogoConfig): Circle[] {
  const { baseUnit, scaleFactors, movementAngle, innerOverlap, outerOverlap } = config;
  const radii = scaleFactors.map((factor) => baseUnit * factor);
  const angleRad = degreesToRadians(movementAngle);

  // Direction vector (up for 90°, right for 0°)
  const dx = Math.cos(angleRad);
  const dy = -Math.sin(angleRad); // Negative because SVG Y increases downward

  const circles: Circle[] = [];

  // Circle 0: Base (smallest) - at origin
  circles.push({
    center: { x: 0, y: 0 },
    radius: radii[0],
  });

  // Circle 1: Middle - overlap as % of base circle's diameter
  const overlap1to2 = radii[0] * 2 * (innerOverlap / 100);
  const offset1to2 = radii[0] + radii[1] - overlap1to2;
  circles.push({
    center: {
      x: offset1to2 * dx,
      y: offset1to2 * dy,
    },
    radius: radii[1],
  });

  // Circle 2: Primary (largest) - overlap as % of middle circle's diameter
  const overlap2to3 = radii[1] * 2 * (outerOverlap / 100);
  const offset2to3 = radii[1] + radii[2] - overlap2to3;
  circles.push({
    center: {
      x: circles[1].center.x + offset2to3 * dx,
      y: circles[1].center.y + offset2to3 * dy,
    },
    radius: radii[2],
  });

  return circles;
}

/**
 * Calculate opacities for each circle.
 *
 * In 2-circle mode: smallCircleOpacity applies to middle, largeCircleOpacity to primary.
 * In 3-circle mode: gradient from smallCircleOpacity to largeCircleOpacity.
 */
export function calculateOpacities(config: LogoConfig): number[] {
  const { showBaseCircle, smallCircleOpacity, largeCircleOpacity } = config;

  if (showBaseCircle) {
    // 3-circle mode: gradient from small to large
    const midOpacity = smallCircleOpacity + (largeCircleOpacity - smallCircleOpacity) * 0.33;
    return [smallCircleOpacity, midOpacity, largeCircleOpacity];
  } else {
    // 2-circle mode: direct control
    return [smallCircleOpacity, smallCircleOpacity, largeCircleOpacity];
  }
}

// ============================================
// Wave Calculations
// ============================================

/**
 * Generate an SVG arc path for a sound wave.
 */
export function generateArcPath(
  center: Point,
  radius: number,
  arcSpanDegrees: number,
  centerAngleDegrees: number
): string {
  const halfSpan = arcSpanDegrees / 2;
  const startAngle = degreesToRadians(centerAngleDegrees - halfSpan);
  const endAngle = degreesToRadians(centerAngleDegrees + halfSpan);

  const startX = center.x + radius * Math.cos(startAngle);
  const startY = center.y - radius * Math.sin(startAngle);
  const endX = center.x + radius * Math.cos(endAngle);
  const endY = center.y - radius * Math.sin(endAngle);

  const largeArcFlag = arcSpanDegrees >= 180 ? 1 : 0;
  const sweepFlag = 0; // Counter-clockwise

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
}

/**
 * Get arc span for a wave based on style.
 *
 * WiFi style: 4:2:1 ratio (inner longest, outer shortest)
 * Uniform: same span for all waves
 */
function getArcSpanForWave(index: number, baseSpan: number, style: 'uniform' | 'wifi'): number {
  if (style === 'uniform') return baseSpan;

  // WiFi style: 4:2:1 ratio
  const ratios = [4, 2, 1];
  const ratio = ratios[Math.min(index, ratios.length - 1)] || 1;
  return (baseSpan / 4) * ratio;
}

/**
 * Calculate sound wave arc paths for both directions.
 */
export function calculateSoundWaves(
  circles: Circle[],
  config: LogoConfig
): { topRight: string[]; bottomLeft: string[] } {
  const { waveCount, waveOffset, waveSpacing, waveArcSpan, waveStartAngle, waveStyle } = config;
  const primaryCircle = circles[2];

  const topRight: string[] = [];
  const bottomLeft: string[] = [];

  for (let i = 0; i < waveCount; i++) {
    const waveRadius = primaryCircle.radius + waveOffset + i * waveSpacing;
    const arcSpan = getArcSpanForWave(i, waveArcSpan, waveStyle);

    // Top-right wave
    topRight.push(generateArcPath(primaryCircle.center, waveRadius, arcSpan, waveStartAngle));

    // Bottom-left wave (opposite direction)
    bottomLeft.push(generateArcPath(primaryCircle.center, waveRadius, arcSpan, waveStartAngle + 180));
  }

  return { topRight, bottomLeft };
}

/**
 * Calculate opacity for a wave with optional fade effect.
 */
export function getWaveOpacity(index: number, config: LogoConfig): number {
  const { waveOpacity, waveFade, waveCount } = config;

  if (!waveFade) return waveOpacity;

  // Fade from 100% to 40% of base opacity
  const fadeRatio = 1 - (index / waveCount) * 0.6;
  return waveOpacity * fadeRatio;
}

// ============================================
// Connector Line Calculations
// ============================================

/**
 * Calculate connector lines from center hole to primary circle edge.
 */
export function calculateConnectorLines(
  primaryCircle: Circle,
  holeRadius: number,
  config: LogoConfig
): { left: Line; right: Line } | null {
  if (!config.showConnectorLines || !config.showCenterHole || holeRadius <= 0) {
    return null;
  }

  const { leftLinePercent, rightLinePercent } = config;
  const { center, radius } = primaryCircle;

  // Calculate Y offsets (0% = top of hole, 50% = center, 100% = bottom)
  const leftYOffset = holeRadius * (1 - 2 * (leftLinePercent / 100));
  const rightYOffset = holeRadius * (1 - 2 * (rightLinePercent / 100));

  // Calculate X positions where lines meet circle edge
  const leftOuterX = center.x - Math.sqrt(Math.max(0, radius * radius - leftYOffset * leftYOffset));
  const rightOuterX = center.x + Math.sqrt(Math.max(0, radius * radius - rightYOffset * rightYOffset));

  return {
    left: {
      start: { x: center.x, y: center.y + leftYOffset },
      end: { x: leftOuterX, y: center.y + leftYOffset },
    },
    right: {
      start: { x: center.x, y: center.y + rightYOffset },
      end: { x: rightOuterX, y: center.y + rightYOffset },
    },
  };
}

// ============================================
// ViewBox Calculations
// ============================================

/**
 * Calculate the viewBox to contain all elements with padding.
 */
export function calculateViewBox(circles: Circle[], config: LogoConfig, padding: number = 10): ViewBox {
  const { waveCount, waveOffset, waveSpacing, waveStrokeWidth, showWaves } = config;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  // Bounds from circles
  for (const circle of circles) {
    minX = Math.min(minX, circle.center.x - circle.radius);
    maxX = Math.max(maxX, circle.center.x + circle.radius);
    minY = Math.min(minY, circle.center.y - circle.radius);
    maxY = Math.max(maxY, circle.center.y + circle.radius);
  }

  // Extend bounds for waves
  if (showWaves) {
    const primaryCircle = circles[2];
    const maxWaveRadius =
      primaryCircle.radius + waveOffset + (waveCount - 1) * waveSpacing + waveStrokeWidth / 2;
    minX = Math.min(minX, primaryCircle.center.x - maxWaveRadius);
    maxX = Math.max(maxX, primaryCircle.center.x + maxWaveRadius);
    minY = Math.min(minY, primaryCircle.center.y - maxWaveRadius);
    maxY = Math.max(maxY, primaryCircle.center.y + maxWaveRadius);
  }

  return {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  };
}

// ============================================
// Combined Geometry
// ============================================

/**
 * Calculate all geometry for the logo.
 */
export function calculateGeometry(config: LogoConfig): CalculatedGeometry {
  const circles = calculateCircleCenters(config);
  const opacities = calculateOpacities(config);
  const primaryCircle = circles[2];
  const holeRadius = config.showCenterHole ? primaryCircle.radius * (config.centerHoleSize / 100) : 0;

  // Visible circles based on mode
  const startIndex = config.showBaseCircle ? 0 : 1;
  const visibleCircles = circles.slice(startIndex);

  return {
    circles,
    visibleCircles,
    opacities,
    primaryCircle,
    holeRadius,
    viewBox: calculateViewBox(circles, config),
    waves: calculateSoundWaves(circles, config),
    connectorLines: calculateConnectorLines(primaryCircle, holeRadius, config),
  };
}
