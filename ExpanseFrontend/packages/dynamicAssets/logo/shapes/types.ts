/**
 * Shape Types for ExpanseLogo V4
 *
 * Defines the shape variants and rendering interfaces.
 */

import React from "react"

/**
 * Available primary shape variants
 */
export type LogoShape = "circle" | "square" | "triangle"

/**
 * Triangle orientation options
 */
export type TriangleOrientation = "up" | "down" | "left" | "right"

/**
 * Context passed to shape renderers
 */
export interface ShapeRenderContext {
  // Core dimensions
  centerX: number
  centerY: number
  radius: number

  // Styling
  fill: string
  gradientId?: string
  shadowFilterId?: string

  // Shape-specific options
  squareCornerRadius?: number
  triangleCornerRadius?: number
  triangleOrientation?: TriangleOrientation

  // Moon sizing
  moonRadius: number
  moonOffsetX: number
  moonOffsetY: number

  // Base moon position
  baseMoonCx: number
  baseMoonCy: number
}

/**
 * Result from shape renderer
 */
export interface ShapeRenderResult {
  /** The primary shape SVG element */
  mainShape: React.ReactNode
  /** The moon shape SVG element */
  moonShape: React.ReactNode
  /** Optional 3D highlight overlay */
  highlightShape?: React.ReactNode
  /** Center point for pupil positioning (may differ from geometric center for triangle) */
  pupilCenter: { x: number; y: number }
  /** Points defining the shape for mask generation */
  maskShape: React.ReactNode
}

/**
 * Shape renderer function signature
 */
export type ShapeRenderer = (context: ShapeRenderContext) => ShapeRenderResult

/**
 * Configuration for each shape type
 */
export interface ShapeConfig {
  /** Shape identifier */
  type: LogoShape
  /** Render function for this shape */
  render: ShapeRenderer
  /** Whether arc segments make sense for this shape */
  defaultShowArcs: boolean
}

/**
 * Calculate triangle points for given center, radius, and orientation
 */
export function calculateTrianglePoints(
  centerX: number,
  centerY: number,
  radius: number,
  orientation: TriangleOrientation = "up",
): [number, number][] {
  // For equilateral triangle inscribed in circle
  const angles: Record<TriangleOrientation, number[]> = {
    // Apex positions in degrees (0 = right, 90 = up in math coords)
    up: [90, 210, 330], // Top apex
    down: [270, 30, 150], // Bottom apex
    left: [180, 300, 60], // Left apex
    right: [0, 120, 240], // Right apex
  }

  const baseAngles = angles[orientation]

  return baseAngles.map((angleDeg) => {
    const angleRad = (angleDeg * Math.PI) / 180
    const x = centerX + radius * Math.cos(angleRad)
    // SVG y increases downward, so subtract sin
    const y = centerY - radius * Math.sin(angleRad)
    return [x, y] as [number, number]
  })
}

/**
 * Calculate centroid of triangle (center of mass)
 */
export function calculateTriangleCentroid(
  points: [number, number][],
): { x: number; y: number } {
  const x = (points[0][0] + points[1][0] + points[2][0]) / 3
  const y = (points[0][1] + points[1][1] + points[2][1]) / 3
  return { x, y }
}

/**
 * Format triangle points for SVG polygon
 */
export function formatPolygonPoints(points: [number, number][]): string {
  return points.map(([x, y]) => `${x},${y}`).join(" ")
}

/**
 * Generate SVG path for rounded triangle
 * Uses quadratic bezier curves at corners
 */
export function generateRoundedTrianglePath(
  points: [number, number][],
  cornerRadius: number,
): string {
  if (cornerRadius <= 0) {
    // Fall back to straight lines
    return `M ${points[0][0]},${points[0][1]} L ${points[1][0]},${points[1][1]} L ${points[2][0]},${points[2][1]} Z`
  }

  const path: string[] = []
  const n = points.length

  for (let i = 0; i < n; i++) {
    const curr = points[i]
    const next = points[(i + 1) % n]
    const prev = points[(i - 1 + n) % n]

    // Vector from current to previous
    const toPrevX = prev[0] - curr[0]
    const toPrevY = prev[1] - curr[1]
    const toPrevLen = Math.sqrt(toPrevX * toPrevX + toPrevY * toPrevY)

    // Vector from current to next
    const toNextX = next[0] - curr[0]
    const toNextY = next[1] - curr[1]
    const toNextLen = Math.sqrt(toNextX * toNextX + toNextY * toNextY)

    // Clamp radius to half the shorter edge
    const maxRadius = Math.min(toPrevLen, toNextLen) / 2
    const r = Math.min(cornerRadius, maxRadius)

    // Points where curve starts/ends (offset from corner)
    const startX = curr[0] + (toPrevX / toPrevLen) * r
    const startY = curr[1] + (toPrevY / toPrevLen) * r
    const endX = curr[0] + (toNextX / toNextLen) * r
    const endY = curr[1] + (toNextY / toNextLen) * r

    if (i === 0) {
      path.push(`M ${startX},${startY}`)
    } else {
      path.push(`L ${startX},${startY}`)
    }

    // Quadratic bezier with corner as control point
    path.push(`Q ${curr[0]},${curr[1]} ${endX},${endY}`)
  }

  path.push("Z")
  return path.join(" ")
}
