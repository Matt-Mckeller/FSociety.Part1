/**
 * Glow Effect Filter
 *
 * SVG filter definition for glow effects.
 */

"use client"

import React from "react"
import type { GlowConfig } from "../../types"
import { EFFECT_DEFAULTS } from "../../constants"

export interface GlowFilterProps {
  /** Filter ID (must be unique) */
  id: string
  /** Blur radius */
  blur?: number
  /** Glow color */
  color?: string
  /** Spread amount (feOffset) */
  spread?: number
  /** Intensity / opacity of glow */
  intensity?: number
}

/**
 * SVG filter definition for glow effect
 * Must be placed inside <defs> element
 */
export function GlowFilter({
  id,
  blur = EFFECT_DEFAULTS.glowBlur,
  color = EFFECT_DEFAULTS.glowColor,
  spread = EFFECT_DEFAULTS.glowSpread,
  intensity = EFFECT_DEFAULTS.glowIntensity,
}: GlowFilterProps) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      {/* Blur the source graphic */}
      <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />

      {/* Colorize the blur */}
      <feColorMatrix
        in="blur"
        type="matrix"
        values={`0 0 0 0 ${parseInt(color.slice(1, 3), 16) / 255}
                 0 0 0 0 ${parseInt(color.slice(3, 5), 16) / 255}
                 0 0 0 0 ${parseInt(color.slice(5, 7), 16) / 255}
                 0 0 0 ${intensity} 0`}
        result="coloredBlur"
      />

      {/* Combine original with glow */}
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  )
}

/**
 * Simple glow filter (blur only, uses source color)
 */
export function SimpleGlowFilter({
  id,
  blur = EFFECT_DEFAULTS.glowBlur,
  intensity = EFFECT_DEFAULTS.glowIntensity,
}: Pick<GlowFilterProps, "id" | "blur" | "intensity">) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation={blur} result="blur" />
      <feComponentTransfer in="blur" result="glow">
        <feFuncA type="linear" slope={intensity * 2} />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  )
}

/**
 * Drop shadow filter
 */
export interface DropShadowFilterProps {
  id: string
  dx?: number
  dy?: number
  blur?: number
  color?: string
  opacity?: number
}

export function DropShadowFilter({
  id,
  dx = 2,
  dy = 2,
  blur = 4,
  color = "#000000",
  opacity = 0.5,
}: DropShadowFilterProps) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow
        dx={dx}
        dy={dy}
        stdDeviation={blur}
        floodColor={color}
        floodOpacity={opacity}
      />
    </filter>
  )
}
