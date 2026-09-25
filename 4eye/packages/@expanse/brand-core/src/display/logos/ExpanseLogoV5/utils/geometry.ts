/**
 * Geometry Utilities for ExpanseLogo V5
 */

/**
 * Calculate position from angle and distance
 * @param cx Center X
 * @param cy Center Y
 * @param angleDegrees Angle in degrees (0 = right, 90 = up)
 * @param distance Distance from center
 */
export function positionFromAngle(
  cx: number,
  cy: number,
  angleDegrees: number,
  distance: number,
): { x: number; y: number } {
  const angleRadians = (angleDegrees * Math.PI) / 180
  return {
    x: cx + distance * Math.cos(angleRadians),
    y: cy - distance * Math.sin(angleRadians), // SVG Y is inverted
  }
}

/**
 * Convert light angle to radial gradient position
 * @param lightAngle Light direction in degrees (0 = right, 90 = up)
 */
export function lightAngleToGradientPosition(lightAngle: number): {
  cx: string
  cy: string
  fx: string
  fy: string
} {
  // Convert angle to normalized position (0-1)
  const rad = (lightAngle * Math.PI) / 180
  const offset = 0.2 // How far from center the focal point is

  return {
    cx: `${50 + Math.cos(rad) * 15}%`,
    cy: `${50 - Math.sin(rad) * 15}%`,
    fx: `${50 + Math.cos(rad) * 35}%`,
    fy: `${50 - Math.sin(rad) * 35}%`,
  }
}

/**
 * Predefined pupil gaze directions
 */
export const PUPIL_GAZE_DIRECTIONS = {
  right: 0,
  upRight: 45,
  up: 90,
  upLeft: 135,
  left: 180,
  downLeft: 225,
  down: 270,
  downRight: 315,
  moon: 240,
}

/**
 * Generate an arc path
 * @param cx Center X
 * @param cy Center Y
 * @param radius Arc radius
 * @param startAngle Start angle in degrees
 * @param endAngle End angle in degrees
 */
export function generateArcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180

  const startX = cx + radius * Math.cos(startRad)
  const startY = cy - radius * Math.sin(startRad)
  const endX = cx + radius * Math.cos(endRad)
  const endY = cy - radius * Math.sin(endRad)

  // Determine if arc is larger than 180 degrees
  const angleDiff = (endAngle - startAngle + 360) % 360
  const largeArc = angleDiff > 180 ? 1 : 0

  // Sweep direction: 0 = counterclockwise
  return `M ${startX},${startY} A ${radius},${radius} 0 ${largeArc},0 ${endX},${endY}`
}

// ============================================================
// COMET PATH
// ============================================================

export interface CometPathOptions {
  /** Center X of the orbit */
  cx: number
  /** Center Y of the orbit */
  cy: number
  /** Orbit X-radius (centerline) */
  rx: number
  /** Orbit Y-radius (centerline) */
  ry: number
  /** Head angle in degrees (0 = right, 90 = up) */
  startAngle: number
  /** End/tail angle in degrees */
  endAngle: number
  /** Stroke width at the head end */
  headWidth: number
  /** Stroke width at the tail end */
  tailWidth: number
  /** Number of samples along the arc (higher = smoother). Default 64. */
  samples?: number
  /** Taper easing curve. Default "easeOut". */
  taper?: "linear" | "easeOut" | "easeIn"
  /** Sweep direction. Default "cw". */
  direction?: "cw" | "ccw"
}

/**
 * Generate a tapered comet-style arc path along an ellipse, with rounded
 * semicircular caps at each end. The result is a single closed SVG path that
 * fills as a true tapered arc — not a stroke trick.
 *
 * The head sits at `startAngle` (full `headWidth`) and the tail at `endAngle`
 * (`tailWidth`). The path samples `samples+1` centerline points along the
 * ellipse, walks the outer edge forward, the inner edge back, and closes with
 * arc caps.
 */
export function generateCometPath({
  cx,
  cy,
  rx,
  ry,
  startAngle,
  endAngle,
  headWidth,
  tailWidth,
  samples = 64,
  taper = "easeOut",
  direction = "cw",
}: CometPathOptions): string {
  // Normalize sweep so we always go from start → end in the chosen direction.
  // Default math angle is counter-clockwise; SVG-y is inverted so cw/ccw read
  // visually the same as you'd expect.
  let span = endAngle - startAngle
  if (direction === "cw") {
    while (span > 0) span -= 360
    while (span <= -360) span += 360
  } else {
    while (span < 0) span += 360
    while (span >= 360) span -= 360
  }

  const ease = (t: number) => {
    if (taper === "easeOut") return 1 - Math.pow(1 - t, 2)
    if (taper === "easeIn") return t * t
    return t
  }

  // Generate centerline points and outward normals at each sample.
  type Sample = {
    cx: number // centerline x
    cy: number // centerline y
    nx: number // outward normal x (unit)
    ny: number // outward normal y (unit)
    halfWidth: number
  }
  const points: Sample[] = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const angleDeg = startAngle + span * t
    const rad = (angleDeg * Math.PI) / 180
    const cosA = Math.cos(rad)
    const sinA = Math.sin(rad)

    // Centerline point on ellipse
    const px = cx + rx * cosA
    const py = cy - ry * sinA // SVG-y inverted

    // Outward normal: gradient of (x/rx)² + (y/ry)² = 1, normalized.
    let gx = cosA / rx
    let gy = -sinA / ry // inverted to match SVG-y
    const gLen = Math.hypot(gx, gy) || 1
    gx /= gLen
    gy /= gLen

    const width = headWidth + (tailWidth - headWidth) * ease(t)
    points.push({ cx: px, cy: py, nx: gx, ny: gy, halfWidth: width / 2 })
  }

  // Build path: outer edge (forward) → tail cap → inner edge (backward) → head cap.
  const outer = points.map((p) => ({
    x: p.cx + p.nx * p.halfWidth,
    y: p.cy + p.ny * p.halfWidth,
  }))
  const inner = points.map((p) => ({
    x: p.cx - p.nx * p.halfWidth,
    y: p.cy - p.ny * p.halfWidth,
  }))

  const head = points[0]
  const tail = points[points.length - 1]

  let d = `M ${outer[0].x.toFixed(3)},${outer[0].y.toFixed(3)}`
  for (let i = 1; i < outer.length; i++) {
    d += ` L ${outer[i].x.toFixed(3)},${outer[i].y.toFixed(3)}`
  }
  // Tail cap: semicircle from outer[last] to inner[last] of radius tail.halfWidth
  d += ` A ${tail.halfWidth.toFixed(3)},${tail.halfWidth.toFixed(3)} 0 0 1 ${inner[
    inner.length - 1
  ].x.toFixed(3)},${inner[inner.length - 1].y.toFixed(3)}`
  // Inner edge backward
  for (let i = inner.length - 2; i >= 0; i--) {
    d += ` L ${inner[i].x.toFixed(3)},${inner[i].y.toFixed(3)}`
  }
  // Head cap: semicircle from inner[0] to outer[0] of radius head.halfWidth
  d += ` A ${head.halfWidth.toFixed(3)},${head.halfWidth.toFixed(3)} 0 0 1 ${outer[0].x.toFixed(
    3,
  )},${outer[0].y.toFixed(3)} Z`

  return d
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
  offset: number = 18,
): string {
  const arcRadius = shapeRadius + offset
  return generateArcPath(cx, cy, arcRadius, startAngle, endAngle)
}

/**
 * Calculate triangle points for given center, radius, and orientation
 */
export function calculateTrianglePoints(
  centerX: number,
  centerY: number,
  radius: number,
  orientation: "up" | "down" | "left" | "right" = "up",
): [number, number][] {
  const angles: Record<string, number[]> = {
    up: [90, 210, 330],
    down: [270, 30, 150],
    left: [180, 300, 60],
    right: [0, 120, 240],
  }

  const baseAngles = angles[orientation]

  return baseAngles.map((angle) => {
    const rad = (angle * Math.PI) / 180
    return [
      centerX + radius * Math.cos(rad),
      centerY - radius * Math.sin(rad),
    ] as [number, number]
  })
}

/**
 * Generate a rounded triangle path
 */
export function generateRoundedTrianglePath(
  points: [number, number][],
  cornerRadius: number,
): string {
  if (cornerRadius <= 0) {
    return `M ${points[0][0]},${points[0][1]} L ${points[1][0]},${points[1][1]} L ${points[2][0]},${points[2][1]} Z`
  }

  // Calculate rounded corners using quadratic bezier curves
  let path = ""

  for (let i = 0; i < 3; i++) {
    const current = points[i]
    const next = points[(i + 1) % 3]
    const prev = points[(i + 2) % 3]

    // Direction vectors
    const toPrev = [prev[0] - current[0], prev[1] - current[1]]
    const toNext = [next[0] - current[0], next[1] - current[1]]

    // Normalize
    const lenPrev = Math.sqrt(toPrev[0] ** 2 + toPrev[1] ** 2)
    const lenNext = Math.sqrt(toNext[0] ** 2 + toNext[1] ** 2)

    const normPrev = [toPrev[0] / lenPrev, toPrev[1] / lenPrev]
    const normNext = [toNext[0] / lenNext, toNext[1] / lenNext]

    // Calculate corner points
    const offset = Math.min(cornerRadius, lenPrev / 3, lenNext / 3)
    const startPoint = [
      current[0] + normPrev[0] * offset,
      current[1] + normPrev[1] * offset,
    ]
    const endPoint = [
      current[0] + normNext[0] * offset,
      current[1] + normNext[1] * offset,
    ]

    if (i === 0) {
      path = `M ${startPoint[0]},${startPoint[1]}`
    } else {
      path += ` L ${startPoint[0]},${startPoint[1]}`
    }

    path += ` Q ${current[0]},${current[1]} ${endPoint[0]},${endPoint[1]}`
  }

  return path + " Z"
}

/**
 * Generate a rounded square/rect path
 */
export function generateRoundedSquarePath(
  cx: number,
  cy: number,
  size: number,
  cornerRadius: number,
): string {
  const half = size / 2
  const r = Math.min(cornerRadius, half)

  const left = cx - half
  const right = cx + half
  const top = cy - half
  const bottom = cy + half

  return `
    M ${left + r},${top}
    L ${right - r},${top}
    Q ${right},${top} ${right},${top + r}
    L ${right},${bottom - r}
    Q ${right},${bottom} ${right - r},${bottom}
    L ${left + r},${bottom}
    Q ${left},${bottom} ${left},${bottom - r}
    L ${left},${top + r}
    Q ${left},${top} ${left + r},${top}
    Z
  `.trim()
}
