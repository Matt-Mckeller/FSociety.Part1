/**
 * Brand Core Geometry Utilities
 *
 * SVG path generation and geometry calculations.
 */

import type { Point } from "../types"

// ============================================================
// ANGLE CONVERSIONS
// ============================================================

/**
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/**
 * Convert radians to degrees
 */
export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(degrees: number): number {
  return ((degrees % 360) + 360) % 360
}

// ============================================================
// POSITION CALCULATIONS
// ============================================================

/**
 * Calculate position from angle and distance
 *
 * @param cx Center X
 * @param cy Center Y
 * @param angleDegrees Angle in degrees (0 = right, counterclockwise)
 * @param distance Distance from center
 */
export function positionFromAngle(
  cx: number,
  cy: number,
  angleDegrees: number,
  distance: number,
): Point {
  const rad = degToRad(angleDegrees)
  return {
    x: cx + distance * Math.cos(rad),
    y: cy - distance * Math.sin(rad), // SVG Y is inverted
  }
}

/**
 * Calculate angle from center to a point
 */
export function angleFromCenter(
  cx: number,
  cy: number,
  px: number,
  py: number,
): number {
  const dx = px - cx
  const dy = cy - py // SVG Y is inverted
  return normalizeAngle(radToDeg(Math.atan2(dy, dx)))
}

/**
 * Calculate distance between two points
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}

// ============================================================
// SVG PATH GENERATORS
// ============================================================

/**
 * Generate a circular arc path
 *
 * @param cx Center X
 * @param cy Center Y
 * @param radius Arc radius
 * @param startAngle Start angle in degrees (0 = right, counterclockwise)
 * @param endAngle End angle in degrees
 */
export function generateArcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = positionFromAngle(cx, cy, startAngle, radius)
  const end = positionFromAngle(cx, cy, endAngle, radius)

  // Calculate arc sweep
  const angleDiff = normalizeAngle(endAngle - startAngle)
  const largeArc = angleDiff > 180 ? 1 : 0
  const sweep = 0 // Counterclockwise

  return `M ${start.x},${start.y} A ${radius},${radius} 0 ${largeArc},${sweep} ${end.x},${end.y}`
}

/**
 * Generate a stroke arc path with offset from shape
 */
export function generateStrokeArcPath(
  cx: number,
  cy: number,
  shapeRadius: number,
  startAngle: number,
  endAngle: number,
  offset = 10,
): string {
  const radius = shapeRadius + offset
  return generateArcPath(cx, cy, radius, startAngle, endAngle)
}

/**
 * Generate elliptical arc path (for orbital rings)
 */
export function generateEllipseArcPath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startAngle: number,
  endAngle: number,
  rotation = 0,
): string {
  const startRad = degToRad(startAngle)
  const endRad = degToRad(endAngle)

  // Calculate points on ellipse
  const startX = cx + rx * Math.cos(startRad)
  const startY = cy - ry * Math.sin(startRad)
  const endX = cx + rx * Math.cos(endRad)
  const endY = cy - ry * Math.sin(endRad)

  const angleDiff = normalizeAngle(endAngle - startAngle)
  const largeArc = angleDiff > 180 ? 1 : 0

  return `M ${startX},${startY} A ${rx},${ry} ${rotation} ${largeArc},0 ${endX},${endY}`
}

// ============================================================
// SHAPE PATH GENERATORS
// ============================================================

/**
 * Generate a circle path
 */
export function generateCirclePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r},${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`
}

/**
 * Generate a rounded square path
 */
export function generateSquarePath(
  cx: number,
  cy: number,
  size: number,
  cornerRadius = 0,
): string {
  const halfSize = size / 2
  const r = Math.min(cornerRadius, halfSize)

  const x = cx - halfSize
  const y = cy - halfSize
  const w = size
  const h = size

  if (r === 0) {
    return `M ${x},${y} h ${w} v ${h} h -${w} Z`
  }

  return `M ${x + r},${y}
    h ${w - 2 * r}
    a ${r},${r} 0 0 1 ${r},${r}
    v ${h - 2 * r}
    a ${r},${r} 0 0 1 -${r},${r}
    h -${w - 2 * r}
    a ${r},${r} 0 0 1 -${r},-${r}
    v -${h - 2 * r}
    a ${r},${r} 0 0 1 ${r},-${r}
    Z`
}

/**
 * Generate equilateral triangle vertices
 */
export function getTriangleVertices(
  cx: number,
  cy: number,
  radius: number,
  orientation: "up" | "down" | "left" | "right" = "up",
): Point[] {
  const rotationOffset = {
    up: 90,
    down: 270,
    left: 180,
    right: 0,
  }[orientation]

  const vertices: Point[] = []
  for (let i = 0; i < 3; i++) {
    const angle = rotationOffset + i * 120
    vertices.push(positionFromAngle(cx, cy, angle, radius))
  }

  return vertices
}

/**
 * Generate a triangle path with optional corner radius
 */
export function generateTrianglePath(
  cx: number,
  cy: number,
  radius: number,
  orientation: "up" | "down" | "left" | "right" = "up",
  cornerRadius = 0,
): string {
  const vertices = getTriangleVertices(cx, cy, radius, orientation)

  if (cornerRadius === 0) {
    return `M ${vertices[0].x},${vertices[0].y} 
      L ${vertices[1].x},${vertices[1].y} 
      L ${vertices[2].x},${vertices[2].y} Z`
  }

  // Create rounded corners using arcs
  const r = cornerRadius
  const path: string[] = []

  for (let i = 0; i < 3; i++) {
    const curr = vertices[i]
    const next = vertices[(i + 1) % 3]
    const prev = vertices[(i + 2) % 3]

    // Calculate direction vectors
    const toPrev = {
      x: prev.x - curr.x,
      y: prev.y - curr.y,
    }
    const toNext = {
      x: next.x - curr.x,
      y: next.y - curr.y,
    }

    // Normalize
    const lenPrev = Math.sqrt(toPrev.x ** 2 + toPrev.y ** 2)
    const lenNext = Math.sqrt(toNext.x ** 2 + toNext.y ** 2)

    // Points offset by corner radius
    const p1 = {
      x: curr.x + (toPrev.x / lenPrev) * r,
      y: curr.y + (toPrev.y / lenPrev) * r,
    }
    const p2 = {
      x: curr.x + (toNext.x / lenNext) * r,
      y: curr.y + (toNext.y / lenNext) * r,
    }

    if (i === 0) {
      path.push(`M ${p1.x},${p1.y}`)
    } else {
      path.push(`L ${p1.x},${p1.y}`)
    }
    path.push(`Q ${curr.x},${curr.y} ${p2.x},${p2.y}`)
  }

  path.push("Z")
  return path.join(" ")
}

/**
 * Generate regular polygon vertices
 */
export function getPolygonVertices(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotationOffset = 0,
): Point[] {
  const vertices: Point[] = []
  const angleStep = 360 / sides

  for (let i = 0; i < sides; i++) {
    const angle = rotationOffset + i * angleStep
    vertices.push(positionFromAngle(cx, cy, angle, radius))
  }

  return vertices
}

/**
 * Generate regular polygon path
 */
export function generatePolygonPath(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotationOffset = 0,
): string {
  const vertices = getPolygonVertices(cx, cy, radius, sides, rotationOffset)
  return `M ${vertices.map((v) => `${v.x},${v.y}`).join(" L ")} Z`
}

/**
 * Generate star path
 */
export function generateStarPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadiusRatio = 0.5,
  points = 5,
  rotationOffset = 90,
): string {
  const innerRadius = outerRadius * innerRadiusRatio
  const angleStep = 360 / (points * 2)
  const vertices: Point[] = []

  for (let i = 0; i < points * 2; i++) {
    const angle = rotationOffset + i * angleStep
    const r = i % 2 === 0 ? outerRadius : innerRadius
    vertices.push(positionFromAngle(cx, cy, angle, r))
  }

  return `M ${vertices.map((v) => `${v.x},${v.y}`).join(" L ")} Z`
}

// ============================================================
// COMET PATH GENERATOR
// ============================================================

/**
 * Generate a comet shape (circle head + triangle tail)
 *
 * The comet is a circle with a stretched triangle fused to the back,
 * tapering to a point. The tail curves softly on the outer edge.
 *
 * @param cx Center X of the comet head
 * @param cy Center Y of the comet head
 * @param headRadius Radius of the circular head
 * @param tailLength Length of the tail relative to head radius
 * @param tailWidth Width of tail at base relative to head diameter
 * @param direction Direction the comet faces (degrees, 0 = right)
 * @param softness How soft/curved the tail should be (0-1)
 */
export function generateCometPath(
  cx: number,
  cy: number,
  headRadius: number,
  tailLength = 0.8,
  tailWidth = 0.5,
  direction = 0,
  softness = 0.7,
): string {
  const dirRad = degToRad(direction)
  const perpRad = dirRad + Math.PI / 2

  // Tail parameters
  const tailLengthPx = headRadius * 2 * tailLength
  const tailWidthHalf = headRadius * tailWidth

  // Head center
  const hcx = cx
  const hcy = cy

  // Tail attachment points on the head (perpendicular to direction)
  // These are where the tail meets the circle
  const attachAngle = Math.asin(tailWidth) // Angle on circle where tail attaches
  const attachAngleTop = direction + 90 + radToDeg(attachAngle) * 0.8
  const attachAngleBottom = direction - 90 - radToDeg(attachAngle) * 0.8

  const attachTop = positionFromAngle(hcx, hcy, attachAngleTop, headRadius)
  const attachBottom = positionFromAngle(
    hcx,
    hcy,
    attachAngleBottom,
    headRadius,
  )

  // Tail tip (opposite to direction of travel)
  const tipX = hcx - Math.cos(dirRad) * tailLengthPx
  const tipY = hcy + Math.sin(dirRad) * tailLengthPx // SVG Y inverted

  // Control points for the curved tail edges
  // The outer edge (top when facing right) curves more
  const curveOffset = tailLengthPx * softness * 0.4

  // Control point for top edge (outer curve)
  const ctrl1X = attachTop.x - Math.cos(dirRad) * curveOffset * 0.3
  const ctrl1Y = attachTop.y + Math.sin(dirRad) * curveOffset * 0.3

  const ctrl2X = tipX + Math.cos(perpRad) * tailWidthHalf * 0.2
  const ctrl2Y = tipY - Math.sin(perpRad) * tailWidthHalf * 0.2

  // Control point for bottom edge (straighter, inner)
  const ctrl3X = tipX - Math.cos(perpRad) * tailWidthHalf * 0.1
  const ctrl3Y = tipY + Math.sin(perpRad) * tailWidthHalf * 0.1

  const ctrl4X = attachBottom.x - Math.cos(dirRad) * curveOffset * 0.2
  const ctrl4Y = attachBottom.y + Math.sin(dirRad) * curveOffset * 0.2

  // Calculate arc parameters
  // We need to draw the visible part of the circle (front half)
  const frontArcStart = normalizeAngle(
    direction - 90 - radToDeg(attachAngle) * 0.8,
  )
  const frontArcEnd = normalizeAngle(
    direction + 90 + radToDeg(attachAngle) * 0.8,
  )

  // Build path
  // Start at bottom attachment point, draw front arc, then tail
  return `
    M ${attachBottom.x},${attachBottom.y}
    A ${headRadius},${headRadius} 0 1,1 ${attachTop.x},${attachTop.y}
    C ${ctrl1X},${ctrl1Y} ${ctrl2X},${ctrl2Y} ${tipX},${tipY}
    C ${ctrl3X},${ctrl3Y} ${ctrl4X},${ctrl4Y} ${attachBottom.x},${attachBottom.y}
    Z
  `
    .trim()
    .replace(/\s+/g, " ")
}

// ============================================================
// GRADIENT HELPERS
// ============================================================

/**
 * Convert light angle to radial gradient position
 */
export function lightAngleToGradientPosition(lightAngle: number): {
  cx: string
  cy: string
  fx: string
  fy: string
} {
  const rad = degToRad(lightAngle)

  return {
    cx: `${50 + Math.cos(rad) * 15}%`,
    cy: `${50 - Math.sin(rad) * 15}%`,
    fx: `${50 + Math.cos(rad) * 35}%`,
    fy: `${50 - Math.sin(rad) * 35}%`,
  }
}
