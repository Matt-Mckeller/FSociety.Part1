/**
 * Logo Calculation Utilities
 *
 * Math functions for calculating logo geometry:
 * - Circle positions and overlaps
 * - Sound wave arc paths
 * - ViewBox calculations
 * - Triangle positions
 */

import type { Circle, Point, ViewBox, WaveSet, LogoConfig } from "./types"

// ============================================
// Angle Utilities
// ============================================

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

// ============================================
// Circle Calculations
// ============================================

/**
 * Calculate the centers and radii of the three logo circles
 * based on the configuration parameters.
 *
 * @param config - Logo configuration
 * @returns Array of 3 circles [base, middle, primary]
 */
export function calculateCircleCenters(config: LogoConfig): Circle[] {
  const { baseUnit, scaleFactors, movementAngle, innerOverlap, outerOverlap } =
    config
  const radii = scaleFactors.map((factor) => baseUnit * factor)
  const angleRad = degreesToRadians(movementAngle)

  const dx = Math.cos(angleRad)
  const dy = -Math.sin(angleRad)

  const circles: Circle[] = []

  // Circle 1: Base (smallest, bottom)
  circles.push({
    center: { x: 0, y: 0 },
    radius: radii[0],
  })

  // Circle 2: Middle - innerOverlap controls how nested circle 1 is in circle 2
  // Higher innerOverlap = tighter base (more nested)
  const overlap1to2 = radii[0] * 2 * (innerOverlap / 100)
  const offset1to2 = radii[0] + radii[1] - overlap1to2
  circles.push({
    center: {
      x: offset1to2 * dx,
      y: offset1to2 * dy,
    },
    radius: radii[1],
  })

  // Circle 3: Primary (largest, top) - outerOverlap controls funnel opening
  // Lower outerOverlap = funnel opens up more
  const overlap2to3 = radii[1] * 2 * (outerOverlap / 100)
  const offset2to3 = radii[1] + radii[2] - overlap2to3
  circles.push({
    center: {
      x: circles[1].center.x + offset2to3 * dx,
      y: circles[1].center.y + offset2to3 * dy,
    },
    radius: radii[2],
  })

  return circles
}

// ============================================
// Arc Path Generation
// ============================================

/**
 * Generate an SVG arc path string
 *
 * @param center - Center point of the arc
 * @param radius - Radius of the arc
 * @param arcSpanDegrees - Total arc span in degrees
 * @param centerAngleDegrees - Angle at the center of the arc
 * @returns SVG path string (M...A...)
 */
export function generateArcPath(
  center: Point,
  radius: number,
  arcSpanDegrees: number,
  centerAngleDegrees: number,
): string {
  const halfSpan = arcSpanDegrees / 2
  const startAngle = degreesToRadians(centerAngleDegrees - halfSpan)
  const endAngle = degreesToRadians(centerAngleDegrees + halfSpan)

  const startX = center.x + radius * Math.cos(startAngle)
  const startY = center.y - radius * Math.sin(startAngle)
  const endX = center.x + radius * Math.cos(endAngle)
  const endY = center.y - radius * Math.sin(endAngle)

  const largeArcFlag = arcSpanDegrees >= 180 ? 1 : 0
  const sweepFlag = 0

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`
}

// ============================================
// Sound Wave Calculations
// ============================================

/**
 * Calculate the arc span for a wave based on its index
 * Uses 4:2:1 ratio (inner wave is longest, outer shortest)
 */
function getArcSpanForWave(index: number, baseArcSpan: number): number {
  const ratios = [4, 2, 1]
  const ratio = ratios[Math.min(index, ratios.length - 1)] || 1
  const baseSpan = baseArcSpan / 4
  return baseSpan * ratio
}

/**
 * Calculate the sound wave paths for both sides of the logo
 *
 * @param circles - Array of calculated circles
 * @param config - Logo configuration
 * @returns Object with topRight and bottomLeft wave path arrays
 */
export function calculateSoundWaves(
  circles: Circle[],
  config: LogoConfig,
): WaveSet {
  const { waveCount, waveOffset, waveSpacing, waveArcSpan, waveStartAngle } =
    config
  const primaryCircle = circles[2]

  // Top-right waves (from primary circle)
  const topRightWaves: string[] = []
  const topRightAngle = waveStartAngle
  for (let i = 0; i < waveCount; i++) {
    const waveRadius = primaryCircle.radius + waveOffset + i * waveSpacing
    const arcSpan = getArcSpanForWave(i, waveArcSpan)
    const path = generateArcPath(
      primaryCircle.center,
      waveRadius,
      arcSpan,
      topRightAngle,
    )
    topRightWaves.push(path)
  }

  // Bottom-left waves (from primary circle, opposite angle: startAngle + 180)
  const bottomLeftWaves: string[] = []
  const bottomLeftAngle = waveStartAngle + 180
  for (let i = 0; i < waveCount; i++) {
    const waveRadius = primaryCircle.radius + waveOffset + i * waveSpacing
    const arcSpan = getArcSpanForWave(i, waveArcSpan)
    const path = generateArcPath(
      primaryCircle.center,
      waveRadius,
      arcSpan,
      bottomLeftAngle,
    )
    bottomLeftWaves.push(path)
  }

  return { topRight: topRightWaves, bottomLeft: bottomLeftWaves }
}

// ============================================
// ViewBox Calculation
// ============================================

/**
 * Calculate the SVG viewBox to fit all elements
 *
 * @param circles - Array of calculated circles
 * @param config - Logo configuration
 * @param padding - Extra padding around elements
 * @returns ViewBox dimensions
 */
export function calculateViewBox(
  circles: Circle[],
  config: LogoConfig,
  padding: number = 10,
): ViewBox {
  const { waveCount, waveOffset, waveSpacing, waveStrokeWidth, showWaves } =
    config

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const circle of circles) {
    minX = Math.min(minX, circle.center.x - circle.radius)
    maxX = Math.max(maxX, circle.center.x + circle.radius)
    minY = Math.min(minY, circle.center.y - circle.radius)
    maxY = Math.max(maxY, circle.center.y + circle.radius)
  }

  // Account for waves around primary circle (both top-right and bottom-left)
  if (showWaves) {
    const primaryCircle = circles[2]
    const maxWaveRadius =
      primaryCircle.radius +
      waveOffset +
      (waveCount - 1) * waveSpacing +
      waveStrokeWidth / 2
    minX = Math.min(minX, primaryCircle.center.x - maxWaveRadius)
    maxX = Math.max(maxX, primaryCircle.center.x + maxWaveRadius)
    minY = Math.min(minY, primaryCircle.center.y - maxWaveRadius)
    maxY = Math.max(maxY, primaryCircle.center.y + maxWaveRadius)
  }

  return {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  }
}

// ============================================
// Shape Point Calculations
// ============================================

/**
 * Get polygon points for a square shape
 */
export function getSquarePoints(center: Point, radius: number): string {
  const x = center.x - radius
  const y = center.y - radius
  const side = radius * 2
  return `${x},${y} ${x + side},${y} ${x + side},${y + side} ${x},${y + side}`
}

/**
 * Get polygon points for an equilateral triangle
 */
export function getTrianglePoints(center: Point, radius: number): string {
  const height = radius * 2
  const halfBase = (height * Math.sqrt(3)) / 3
  const topY = center.y - radius
  const bottomY = center.y + radius
  return `${center.x},${topY} ${center.x - halfBase},${bottomY} ${center.x + halfBase},${bottomY}`
}

// ============================================
// Opacity Calculations
// ============================================

/**
 * Calculate opacity values for each circle
 *
 * @param config - Logo configuration
 * @returns Array of opacities [base, middle, primary]
 */
export function calculateOpacities(
  config: LogoConfig,
): [number, number, number] {
  const { baseOpacity, primaryOpacity, showBaseCircle } = config

  if (showBaseCircle) {
    // 3-circle mode: gradient from base to primary
    const midOpacity = baseOpacity + (primaryOpacity - baseOpacity) * 0.33
    return [baseOpacity, midOpacity, primaryOpacity]
  }
  // 2-circle mode: baseOpacity controls the smaller circle directly
  return [baseOpacity, baseOpacity, primaryOpacity]
}

/**
 * Calculate wave opacity with optional fade
 *
 * @param index - Wave index (0 = innermost)
 * @param waveCount - Total number of waves
 * @param baseOpacity - Base wave opacity
 * @param fade - Whether to fade outer waves
 * @returns Opacity value for this wave
 */
export function calculateWaveOpacity(
  index: number,
  waveCount: number,
  baseOpacity: number,
  fade: boolean,
): number {
  if (!fade) return baseOpacity
  // Fade from 100% to 40% of base opacity
  const fadeRatio = 1 - (index / waveCount) * 0.6
  return baseOpacity * fadeRatio
}

// ============================================
// Connector Line Calculations
// ============================================

export interface ConnectorLineData {
  x1: number
  y1: number
  x2: number
  y2: number
}

/**
 * Calculate the connector line positions for the center mask
 */
export function calculateConnectorLines(
  primaryCircle: Circle,
  config: LogoConfig,
): { left: ConnectorLineData; right: ConnectorLineData } {
  const { centerHoleSize, leftLinePercent, rightLinePercent } = config

  const holeRadius = primaryCircle.radius * (centerHoleSize / 100)
  const cx = primaryCircle.center.x
  const cy = primaryCircle.center.y

  const leftYOffset = holeRadius * (1 - 2 * (leftLinePercent / 100))
  const rightYOffset = holeRadius * (1 - 2 * (rightLinePercent / 100))

  const leftY = cy + leftYOffset
  const leftOuterX =
    cx -
    Math.sqrt(
      Math.max(
        0,
        primaryCircle.radius * primaryCircle.radius - leftYOffset * leftYOffset,
      ),
    )

  const rightY = cy + rightYOffset
  const rightOuterX =
    cx +
    Math.sqrt(
      Math.max(
        0,
        primaryCircle.radius * primaryCircle.radius -
          rightYOffset * rightYOffset,
      ),
    )

  return {
    left: { x1: cx, y1: leftY, x2: leftOuterX, y2: leftY },
    right: { x1: cx, y1: rightY, x2: rightOuterX, y2: rightY },
  }
}
