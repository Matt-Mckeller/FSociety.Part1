/**
 * OrbitalRing Primitive
 *
 * Tilted elliptical ring for Saturn-style effects.
 */

"use client"

import React from "react"
import type { OrbitalRingProps, RingExtent } from "../../types"
import { RING_EXTENT_PRESETS, RING_DEFAULTS } from "../../constants"

/**
 * Resolve ring extent to actual rx/ry values
 */
function resolveExtent(extent: RingExtent): { rx: number; ry: number } {
  if (typeof extent === "object") {
    return extent
  }
  return RING_EXTENT_PRESETS[extent] ?? RING_EXTENT_PRESETS.arcEdge
}

/**
 * Single orbital ring (ellipse)
 */
export function OrbitalRing({
  id,
  className,
  style,
  centerX,
  centerY,
  variant = "ellipse",
  extent = RING_DEFAULTS.extent,
  rotation = RING_DEFAULTS.rotation,
  strokeWidth = RING_DEFAULTS.strokeWidth,
  color = "#ffffff",
  useGradient = false,
  gradientId,
  opacity = RING_DEFAULTS.opacity,
  visible = true,
  transitionStyle,
}: OrbitalRingProps) {
  if (!visible) return null

  const { rx, ry } = resolveExtent(extent)
  const transform = `rotate(${rotation}, ${centerX}, ${centerY})`

  const stroke = useGradient && gradientId ? `url(#${gradientId})` : color

  const baseStyle: React.CSSProperties = {
    ...style,
    transition: transitionStyle,
  }

  // For circular variant, use the same radius for both axes
  const effectiveRy = variant === "circular" ? rx : ry

  return (
    <ellipse
      id={id}
      className={className}
      style={baseStyle}
      cx={centerX}
      cy={centerY}
      rx={rx}
      ry={effectiveRy}
      fill="none"
      transform={transform}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  )
}

/**
 * Ring set - multiple concentric rings
 */
export interface OrbitalRingSetProps extends Omit<OrbitalRingProps, "extent"> {
  /** Ring extent for outermost ring */
  extent?: RingExtent
  /** Number of rings (1-3) */
  ringCount?: 1 | 2 | 3
  /** Gap between rings in pixels */
  ringGap?: number
  /** Opacity for inner ring */
  innerOpacity?: number
  /** Opacity for middle ring */
  middleOpacity?: number
  /** Opacity for outer ring */
  outerOpacity?: number
}

export function OrbitalRingSet({
  id,
  className,
  centerX,
  centerY,
  extent = RING_DEFAULTS.extent,
  rotation = RING_DEFAULTS.rotation,
  strokeWidth = RING_DEFAULTS.strokeWidth,
  color = "#ffffff",
  useGradient = false,
  gradientId,
  opacity = RING_DEFAULTS.opacity,
  visible = true,
  transitionStyle,
  ringCount = 3,
  ringGap = RING_DEFAULTS.ringSpacing,
  innerOpacity,
  middleOpacity,
  outerOpacity,
}: OrbitalRingSetProps) {
  if (!visible) return null

  const { rx, ry } = resolveExtent(extent)
  const aspectRatio = ry / rx

  // Calculate ring sizes from outer to inner
  // Opacity defaults create depth effect: outer rings are solid, inner rings fade
  const rings: Array<{
    name: string
    rx: number
    ry: number
    opacity: number
  }> = []

  if (ringCount >= 3) {
    rings.push({
      name: "outer",
      rx: rx,
      ry: ry,
      opacity: outerOpacity ?? opacity, // Outer ring is most visible (default 1.0)
    })
  }

  if (ringCount >= 2) {
    const middleRx = rx - ringGap
    rings.push({
      name: "middle",
      rx: middleRx,
      ry: middleRx * aspectRatio,
      opacity: middleOpacity ?? opacity * 0.67, // Middle ring at 2/3 opacity
    })
  }

  if (ringCount >= 1) {
    const innerRx = rx - ringGap * 2
    rings.push({
      name: "inner",
      rx: innerRx,
      ry: innerRx * aspectRatio,
      opacity: innerOpacity ?? opacity * 0.33, // Inner ring at 1/3 opacity (most faded)
    })
  }

  const transform = `rotate(${rotation}, ${centerX}, ${centerY})`
  const stroke = useGradient && gradientId ? `url(#${gradientId})` : color

  return (
    <g id={id} className={className} name="orbital-ring-set">
      {rings.map((ring) => (
        <ellipse
          key={ring.name}
          name={ring.name}
          cx={centerX}
          cy={centerY}
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          transform={transform}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={ring.opacity}
          style={{ transition: transitionStyle }}
        />
      ))}
    </g>
  )
}

/**
 * Dual orbital ring sets (front and back, mirrored)
 */
export interface DualOrbitalRingsProps extends Omit<OrbitalRingSetProps, "id"> {
  /** ID prefix */
  id?: string
  /** Show front (primary) ring set */
  showPrimary?: boolean
  /** Show back (mirrored) ring set */
  showMirrored?: boolean
  /** Opacity for back rings */
  backOpacity?: number
}

export function DualOrbitalRings({
  id = "orbital-rings",
  centerX,
  centerY,
  extent = RING_DEFAULTS.extent,
  rotation = RING_DEFAULTS.rotation,
  strokeWidth = RING_DEFAULTS.strokeWidth,
  color = "#ffffff",
  useGradient = false,
  gradientId,
  opacity = RING_DEFAULTS.opacity,
  transitionStyle,
  ringCount = 3,
  ringGap = RING_DEFAULTS.ringSpacing,
  showPrimary = true,
  showMirrored = true,
  backOpacity = RING_DEFAULTS.backRingOpacity,
}: DualOrbitalRingsProps) {
  return (
    <g id={id} name="dual-orbital-rings">
      {/* Back/mirrored rings (behind main shape) */}
      {showMirrored && (
        <OrbitalRingSet
          id={`${id}-back`}
          centerX={centerX}
          centerY={centerY}
          extent={extent}
          rotation={rotation}
          strokeWidth={strokeWidth}
          color={color}
          useGradient={useGradient}
          gradientId={gradientId}
          opacity={opacity * backOpacity}
          transitionStyle={transitionStyle}
          ringCount={ringCount}
          ringGap={ringGap}
        />
      )}

      {/* Front/primary rings (in front of main shape) */}
      {showPrimary && (
        <OrbitalRingSet
          id={`${id}-front`}
          centerX={centerX}
          centerY={centerY}
          extent={extent}
          rotation={rotation}
          strokeWidth={strokeWidth}
          color={color}
          useGradient={useGradient}
          gradientId={gradientId}
          opacity={opacity}
          transitionStyle={transitionStyle}
          ringCount={ringCount}
          ringGap={ringGap}
        />
      )}
    </g>
  )
}
