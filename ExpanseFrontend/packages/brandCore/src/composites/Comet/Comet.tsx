/**
 * Comet Composite
 *
 * A comet-shaped element with a circular head and triangular tail.
 * The tail is fused to the back of the circle, tapering to a point.
 * Soft curves on the outer edge create a smooth, organic look.
 */

"use client"

import React, { useMemo, useId } from "react"
import type { CometProps } from "../../types"
import { COMET_DEFAULTS, EFFECT_DEFAULTS } from "../../constants"
import { generateCometPath } from "../../utils/geometry"
import { GlowFilter } from "../../primitives/effects/GlowFilter"
import { useBrandContext, useGlowEnabled } from "../../context/BrandContext"

export function Comet({
  id,
  className,
  style,
  size,
  tailLength = COMET_DEFAULTS.tailLength,
  tailWidth = COMET_DEFAULTS.tailWidth,
  color,
  direction = COMET_DEFAULTS.direction,
  centerX = size,
  centerY = size,
  glow,
  glowIntensity = EFFECT_DEFAULTS.glowIntensity,
  strokeStyle = false,
  strokeWidth = 2,
  softness = COMET_DEFAULTS.softness,
  opacity = 1,
}: CometProps) {
  const uniqueId = useId()
  const componentId = id ?? `comet-${uniqueId}`
  const { resolveColor } = useBrandContext()
  const globalGlowEnabled = useGlowEnabled()

  // Resolve color
  const resolvedColor = color ?? resolveColor("primaryColor")

  // Determine if glow should be shown
  const showGlow = glow ?? globalGlowEnabled
  const glowFilterId = `${componentId}-glow`

  // Head radius (based on size)
  const headRadius = size / 2

  // Generate comet path
  const cometPath = useMemo(
    () =>
      generateCometPath(
        centerX,
        centerY,
        headRadius,
        tailLength,
        tailWidth,
        direction,
        softness,
      ),
    [centerX, centerY, headRadius, tailLength, tailWidth, direction, softness],
  )

  // Calculate viewBox to fit the comet
  const maxDimension = size * (1 + tailLength)
  const viewBoxSize = maxDimension * 2.5

  return (
    <svg
      id={componentId}
      className={className}
      style={style}
      width={viewBoxSize}
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
    >
      <defs>
        {showGlow && (
          <GlowFilter
            id={glowFilterId}
            blur={size * 0.15}
            color={resolvedColor}
            intensity={glowIntensity}
          />
        )}
      </defs>

      <path
        d={cometPath}
        fill={strokeStyle ? "none" : resolvedColor}
        stroke={strokeStyle ? resolvedColor : undefined}
        strokeWidth={strokeStyle ? strokeWidth : undefined}
        opacity={opacity}
        filter={showGlow ? `url(#${glowFilterId})` : undefined}
        transform={`translate(${(viewBoxSize - size * 2) / 2}, ${(viewBoxSize - size * 2) / 2})`}
      />
    </svg>
  )
}

/**
 * CometRing - A comet traveling along a circular/elliptical path
 * For use in orbital ring effects
 */
export interface CometRingProps {
  /** Center X position */
  centerX: number
  /** Center Y position */
  centerY: number
  /** Ring radius X */
  rx: number
  /** Ring radius Y (for ellipse) */
  ry?: number
  /** Rotation of the ring */
  rotation?: number
  /** Comet size */
  cometSize?: number
  /** Comet position on ring (0-360 degrees) */
  position?: number
  /** Comet tail length */
  tailLength?: number
  /** Color */
  color?: string
  /** Show glow */
  glow?: boolean
  /** Ring stroke (optional background ring) */
  showRing?: boolean
  /** Ring stroke width */
  ringStrokeWidth?: number
  /** Ring opacity */
  ringOpacity?: number
  /** CSS class name */
  className?: string
  /** ID */
  id?: string
}

export function CometRing({
  centerX,
  centerY,
  rx,
  ry,
  rotation = -33,
  cometSize = 10,
  position = 0,
  tailLength = 0.6,
  color = "#ffffff",
  glow = true,
  showRing = true,
  ringStrokeWidth = 2,
  ringOpacity = 0.3,
  className,
  id,
}: CometRingProps) {
  const uniqueId = useId()
  const componentId = id ?? `comet-ring-${uniqueId}`
  const effectiveRy = ry ?? rx

  // Calculate comet position on the ellipse
  const positionRad = (position * Math.PI) / 180
  const cometX = centerX + rx * Math.cos(positionRad)
  const cometY = centerY - effectiveRy * Math.sin(positionRad)

  // Comet should face tangent to the ring (perpendicular to radius)
  // For counterclockwise motion, the direction should be position + 90
  const cometDirection = position + 90

  // Transform for rotation
  const transform = `rotate(${rotation}, ${centerX}, ${centerY})`

  return (
    <g id={componentId} className={className} transform={transform}>
      {/* Background ring */}
      {showRing && (
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={rx}
          ry={effectiveRy}
          fill="none"
          stroke={color}
          strokeWidth={ringStrokeWidth}
          opacity={ringOpacity}
        />
      )}

      {/* Comet on the ring */}
      <g transform={`translate(${cometX - cometSize}, ${cometY - cometSize})`}>
        <Comet
          size={cometSize}
          direction={cometDirection}
          tailLength={tailLength}
          color={color}
          glow={glow}
          centerX={cometSize}
          centerY={cometSize}
        />
      </g>
    </g>
  )
}
