/**
 * Antenna on top of head, with pulse-animated glowing bulb.
 *
 * The wrapping `<g>` is named `"antenna"` and exposes a ref so the
 * reactions hook can target it for jiggle/whip animations. Pass
 * `antennaRef={anatomy.register("antenna")}` from the parent.
 */

import type { Ref } from "react"
import type { CharacterPartContext } from "../CharacterPartContext"

export interface AntennaProps {
  ctx: CharacterPartContext
  /** Callback ref from the anatomy registry. */
  antennaRef: Ref<SVGGElement>
}

export function Antenna({ ctx, antennaRef }: AntennaProps) {
  const { centerX, headLength, headCenterY, headRadius, glowColor, pulseStyles, showAntenna } = ctx
  if (!showAntenna) return null
  const antennaHeight = headLength * 0.2
  const baseY = headCenterY - headRadius
  return (
    <g name="antenna" ref={antennaRef}>
      {/* Base */}
      <circle
        cx={centerX}
        cy={baseY}
        r={headLength * 0.04}
        fill="#2d2d44"
        stroke={glowColor}
        strokeWidth={0.5}
      />
      {/* Stem */}
      <line
        x1={centerX}
        y1={baseY}
        x2={centerX}
        y2={baseY - antennaHeight}
        stroke="#2d2d44"
        strokeWidth={1.5}
      />
      {/* Top bulb */}
      <circle
        cx={centerX}
        cy={baseY - antennaHeight}
        r={headLength * 0.035}
        fill={glowColor}
        style={pulseStyles}
      />
      {/* Glow */}
      <circle
        cx={centerX}
        cy={baseY - antennaHeight}
        r={headLength * 0.06}
        fill={glowColor}
        opacity={0.3}
      />
    </g>
  )
}
