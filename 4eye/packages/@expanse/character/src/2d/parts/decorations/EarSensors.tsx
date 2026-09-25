/** Ear sensors on the outer ends of the strap. */

import type { CharacterPartContext } from "../CharacterPartContext"

export interface EarSensorsProps {
  ctx: CharacterPartContext
}

export function EarSensors({ ctx }: EarSensorsProps) {
  const { centerX, headRadius, config, glowColor, strapY, showEarSensors } = ctx
  if (!showEarSensors) return null
  const sensorRadius = config.strapWidth * 0.25
  const leftX = centerX - headRadius - config.strapExtend * 0.7
  const rightX = centerX + headRadius + config.strapExtend * 0.7

  return (
    <g name="earSensors">
      {/* Left sensor */}
      <circle
        cx={leftX}
        cy={strapY}
        r={sensorRadius + 1}
        fill={glowColor}
        opacity={0.2}
      />
      <circle
        cx={leftX}
        cy={strapY}
        r={sensorRadius}
        fill="#1a1a2e"
        stroke={glowColor}
        strokeWidth={0.5}
      />
      <circle
        cx={leftX}
        cy={strapY}
        r={sensorRadius * 0.4}
        fill={glowColor}
        opacity={0.8}
      />
      {/* Right sensor */}
      <circle
        cx={rightX}
        cy={strapY}
        r={sensorRadius + 1}
        fill={glowColor}
        opacity={0.2}
      />
      <circle
        cx={rightX}
        cy={strapY}
        r={sensorRadius}
        fill="#1a1a2e"
        stroke={glowColor}
        strokeWidth={0.5}
      />
      <circle
        cx={rightX}
        cy={strapY}
        r={sensorRadius * 0.4}
        fill={glowColor}
        opacity={0.8}
      />
    </g>
  )
}
