/**
 * OrbitalRings Component
 *
 * Saturn-style orbital rings that wrap around the main shape.
 */

"use client"

import React from "react"
import type { OrbitalRingsProps, RingExtent } from "../ExpanseLogoV5.types"
import { RING_EXTENT_PRESETS } from "../ExpanseLogoV5.variants"

// ============================================================
// RING COMPONENT
// ============================================================

interface RingProps {
  name: string
  cx: number
  cy: number
  rx: number
  ry: number
  transform: string
  stroke: string
  strokeWidth: number
  opacity: number
  transitionStyle?: string
}

function Ring({
  name,
  cx,
  cy,
  rx,
  ry,
  transform,
  stroke,
  strokeWidth,
  opacity,
  transitionStyle,
}: RingProps) {
  return (
    <ellipse
      name={name}
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="none"
      transform={transform}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      style={transitionStyle ? { transition: transitionStyle } : undefined}
    />
  )
}

// ============================================================
// RING SET COMPONENT
// ============================================================

interface RingSetProps {
  name: string
  cx: number
  cy: number
  innerRx: number
  innerRy: number
  middleRx: number
  middleRy: number
  outerRx: number
  outerRy: number
  transform: string
  stroke: string
  strokeWidth: number
  innerOpacity: number
  middleOpacity: number
  outerOpacity: number
  transitionStyle?: string
  ringCount?: 1 | 2 | 3
}

function RingSet({
  name,
  cx,
  cy,
  innerRx,
  innerRy,
  middleRx,
  middleRy,
  outerRx,
  outerRy,
  transform,
  stroke,
  strokeWidth,
  innerOpacity,
  middleOpacity,
  outerOpacity,
  transitionStyle,
  ringCount = 3,
}: RingSetProps) {
  return (
    <>
      {ringCount >= 3 && (
        <Ring
          name={`${name}-outer`}
          cx={cx}
          cy={cy}
          rx={outerRx}
          ry={outerRy}
          transform={transform}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={outerOpacity}
          transitionStyle={transitionStyle}
        />
      )}
      {ringCount >= 2 && (
        <Ring
          name={`${name}-middle`}
          cx={cx}
          cy={cy}
          rx={middleRx}
          ry={middleRy}
          transform={transform}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={middleOpacity}
          transitionStyle={transitionStyle}
        />
      )}
      {ringCount >= 1 && (
        <Ring
          name={`${name}-inner`}
          cx={cx}
          cy={cy}
          rx={innerRx}
          ry={innerRy}
          transform={transform}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={innerOpacity}
          transitionStyle={transitionStyle}
        />
      )}
    </>
  )
}

// ============================================================
// ORBITAL RINGS COMPONENT
// ============================================================

export interface OrbitalRingsComponentProps extends OrbitalRingsProps {
  /** Main shape radius (for calculating ring sizes) */
  shapeRadius: number
}

export function OrbitalRings({
  name = "orbital-rings",
  centerX,
  centerY,
  shapeRadius,
  variant = "ellipse",
  extent = "arcEdge",
  rotation = -33,
  ringCount = 3,
  ringSpacing = "proportional",
  fixedGap = 8,
  strokeWidth = 4,
  strokeColor = "#ffffff",
  useGradient = false,
  gradientId,
  opacity = 1,
  innerOpacity,
  middleOpacity,
  outerOpacity,
  opacityScale = 1,
  visible = true,
  transitionStyle = "all 0.3s ease-in-out",
  animated = false,
  animationRef,
}: OrbitalRingsComponentProps) {
  if (!visible) return null

  // Calculate ring dimensions from extent
  const extentValues =
    typeof extent === "string" ? RING_EXTENT_PRESETS[extent] : extent

  const outerRx = extentValues.rx
  const outerRy = variant === "circular" ? outerRx : extentValues.ry

  // Calculate inner/middle rings based on spacing mode
  let innerRx: number
  let middleRx: number
  let innerRy: number
  let middleRy: number

  if (ringSpacing === "fixed") {
    middleRx = outerRx - fixedGap
    innerRx = middleRx - fixedGap
    if (variant === "circular") {
      innerRy = innerRx
      middleRy = middleRx
    } else {
      const ryRatio = outerRy / outerRx
      middleRy = outerRy - fixedGap * ryRatio
      innerRy = middleRy - fixedGap * ryRatio
    }
  } else {
    // Proportional spacing (1:2:3 from shape edge)
    const extension = outerRx - shapeRadius
    innerRx = shapeRadius + (extension * 1) / 3
    middleRx = shapeRadius + (extension * 2) / 3
    if (variant === "circular") {
      innerRy = innerRx
      middleRy = middleRx
    } else {
      innerRy = outerRy * (1 / 3) + ((outerRy * 2) / 3) * 0.5
      middleRy = outerRy * (2 / 3) + ((outerRy * 1) / 3) * 0.7
    }
  }

  // Calculate opacities
  const baseInnerOpacity = innerOpacity ?? opacity * (1 / 3)
  const baseMiddleOpacity = middleOpacity ?? opacity * (2 / 3)
  const baseOuterOpacity = outerOpacity ?? opacity

  // Apply opacity scale
  const scaledInnerOpacity = Math.min(1, baseInnerOpacity * opacityScale)
  const scaledMiddleOpacity = Math.min(1, baseMiddleOpacity * opacityScale)
  const scaledOuterOpacity = Math.min(1, baseOuterOpacity * opacityScale)

  // Stroke color (may use gradient)
  const stroke = useGradient && gradientId ? `url(#${gradientId})` : strokeColor

  // Transform string
  const transform = `rotate(${rotation}, ${centerX}, ${centerY})`

  return (
    <g name={name} ref={animationRef}>
      <RingSet
        name={`${name}-set`}
        cx={centerX}
        cy={centerY}
        innerRx={innerRx}
        innerRy={innerRy}
        middleRx={middleRx}
        middleRy={middleRy}
        outerRx={outerRx}
        outerRy={outerRy}
        transform={transform}
        stroke={stroke}
        strokeWidth={strokeWidth}
        innerOpacity={scaledInnerOpacity}
        middleOpacity={scaledMiddleOpacity}
        outerOpacity={scaledOuterOpacity}
        transitionStyle={transitionStyle}
        ringCount={ringCount}
      />
    </g>
  )
}

// ============================================================
// DUAL RING SETS (Primary + Mirrored)
// ============================================================

export interface DualOrbitalRingsProps
  extends Omit<OrbitalRingsComponentProps, "name" | "rotation"> {
  /** Show primary ring set */
  showPrimarySet?: boolean
  /** Show mirrored ring set */
  showMirroredSet?: boolean
  /** Primary rotation angle */
  primaryRotation?: number
  /** Mask ID for back portion */
  maskId?: string
  /** Clip ID for front portion */
  clipId?: string
  /** Back ring opacity multiplier */
  backOpacity?: number
  /** Animated ring values for merge effect */
  animatedInnerRx?: number
  animatedInnerRy?: number
  animatedOuterRx?: number
  animatedOuterRy?: number
}

export function DualOrbitalRings({
  showPrimarySet = false,
  showMirroredSet = true,
  primaryRotation = -33,
  maskId,
  clipId,
  backOpacity = 0.3,
  animatedInnerRx,
  animatedInnerRy,
  animatedOuterRx,
  animatedOuterRy,
  ...props
}: DualOrbitalRingsProps) {
  const mirroredRotation = -primaryRotation

  // Helper to render a ring set with optional animated values
  const renderRingSet = (isPrimary: boolean) => {
    const rotation = isPrimary ? primaryRotation : mirroredRotation
    const name = isPrimary ? "primary-rings" : "mirrored-rings"

    return <OrbitalRings {...props} name={name} rotation={rotation} />
  }

  return (
    <>
      {/* Back portion (behind shape) */}
      {maskId && (
        <g mask={`url(#${maskId})`} opacity={backOpacity}>
          {showPrimarySet && renderRingSet(true)}
          {showMirroredSet && renderRingSet(false)}
        </g>
      )}

      {/* Front portion (in front of shape) */}
      {clipId && (
        <g clipPath={`url(#${clipId})`}>
          {showPrimarySet && renderRingSet(true)}
          {showMirroredSet && renderRingSet(false)}
        </g>
      )}

      {/* No masking (simple render) */}
      {!maskId && !clipId && (
        <>
          {showPrimarySet && renderRingSet(true)}
          {showMirroredSet && renderRingSet(false)}
        </>
      )}
    </>
  )
}
