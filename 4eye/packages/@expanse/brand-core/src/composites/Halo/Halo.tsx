/**
 * Halo Composite
 *
 * A tilted orbital ring for use as character accessories.
 * Creates the classic "angel halo" effect with perspective.
 */

"use client"

import React, { useId } from "react"
import type { HaloProps } from "../../types"
import { HALO_DEFAULTS, EFFECT_DEFAULTS } from "../../constants"
import { GlowFilter } from "../../primitives/effects/GlowFilter"
import { useBrandContext, useGlowEnabled } from "../../context/BrandContext"

export function Halo({
  id,
  className,
  style,
  centerX = 50,
  centerY = 50,
  radius = 40,
  tilt = HALO_DEFAULTS.tilt,
  rotation = HALO_DEFAULTS.rotation,
  color,
  strokeWidth = HALO_DEFAULTS.strokeWidth,
  ringCount = HALO_DEFAULTS.ringCount,
  ringSpacing = HALO_DEFAULTS.ringSpacing,
  glow,
  glowIntensity = HALO_DEFAULTS.glowIntensity,
  opacity = 1,
}: HaloProps) {
  const uniqueId = useId()
  const componentId = id ?? `halo-${uniqueId}`
  const { resolveColor } = useBrandContext()
  const globalGlowEnabled = useGlowEnabled()

  // Resolve color
  const resolvedColor = color ?? resolveColor("primaryColor")

  // Determine if glow should be shown
  const showGlow = glow ?? globalGlowEnabled
  const glowFilterId = `${componentId}-glow`

  // Calculate ellipse dimensions based on tilt
  // At tilt=90, it's a line. At tilt=0, it's a circle.
  const tiltFactor = Math.cos((tilt * Math.PI) / 180)
  const ry = radius * tiltFactor

  // Generate ring configurations
  const rings: Array<{ rx: number; ry: number; opacity: number }> = []
  for (let i = 0; i < ringCount; i++) {
    const ringRadius = radius - i * ringSpacing
    const ringRy = ringRadius * tiltFactor
    const ringOpacity = opacity * (1 - i * 0.2) // Fade inner rings slightly
    rings.push({
      rx: ringRadius,
      ry: ringRy,
      opacity: ringOpacity,
    })
  }

  // Size the viewBox to contain the halo plus glow
  const padding = showGlow ? radius * 0.3 : radius * 0.1
  const viewBoxSize = (radius + padding) * 2
  const viewCenterX = viewBoxSize / 2
  const viewCenterY = viewBoxSize / 2

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
            blur={radius * 0.08}
            color={resolvedColor}
            intensity={glowIntensity}
          />
        )}
      </defs>

      <g
        transform={`rotate(${rotation}, ${viewCenterX}, ${viewCenterY})`}
        filter={showGlow ? `url(#${glowFilterId})` : undefined}
      >
        {rings.map((ring, index) => (
          <ellipse
            key={index}
            cx={viewCenterX}
            cy={viewCenterY}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={resolvedColor}
            strokeWidth={strokeWidth}
            opacity={ring.opacity}
          />
        ))}
      </g>
    </svg>
  )
}

/**
 * HaloInline - A halo that renders inline without its own SVG wrapper
 * For composing with other SVG elements (like characters)
 */
export interface HaloInlineProps extends Omit<HaloProps, "style"> {
  /** Vertical offset from center (positive = down) */
  offsetY?: number
}

export function HaloInline({
  id,
  className,
  centerX = 50,
  centerY = 50,
  radius = 40,
  tilt = HALO_DEFAULTS.tilt,
  rotation = HALO_DEFAULTS.rotation,
  color = "#ffffff",
  strokeWidth = HALO_DEFAULTS.strokeWidth,
  ringCount = HALO_DEFAULTS.ringCount,
  ringSpacing = HALO_DEFAULTS.ringSpacing,
  glow,
  glowIntensity = HALO_DEFAULTS.glowIntensity,
  opacity = 1,
  offsetY = 0,
}: HaloInlineProps) {
  const uniqueId = useId()
  const componentId = id ?? `halo-inline-${uniqueId}`
  const glowFilterId = `${componentId}-glow`

  // Calculate ellipse dimensions based on tilt
  const tiltFactor = Math.cos((tilt * Math.PI) / 180)

  // Generate ring configurations
  const rings: Array<{ rx: number; ry: number; opacity: number }> = []
  for (let i = 0; i < ringCount; i++) {
    const ringRadius = radius - i * ringSpacing
    const ringRy = ringRadius * tiltFactor
    const ringOpacity = opacity * (1 - i * 0.2)
    rings.push({
      rx: ringRadius,
      ry: ringRy,
      opacity: ringOpacity,
    })
  }

  // Adjusted center with offset
  const adjustedCenterY = centerY + offsetY

  return (
    <>
      {glow && (
        <defs>
          <GlowFilter
            id={glowFilterId}
            blur={radius * 0.08}
            color={color}
            intensity={glowIntensity}
          />
        </defs>
      )}

      <g
        id={componentId}
        className={className}
        transform={`rotate(${rotation}, ${centerX}, ${adjustedCenterY})`}
        filter={glow ? `url(#${glowFilterId})` : undefined}
      >
        {rings.map((ring, index) => (
          <ellipse
            key={index}
            cx={centerX}
            cy={adjustedCenterY}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={ring.opacity}
          />
        ))}
      </g>
    </>
  )
}
