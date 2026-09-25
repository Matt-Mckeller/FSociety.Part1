/** Status LED indicators positioned above the strap. */

import type { CharacterPartContext } from "../CharacterPartContext"

export interface StatusLEDsProps {
  ctx: CharacterPartContext
}

export function StatusLEDs({ ctx }: StatusLEDsProps) {
  const {
    centerX,
    headLength,
    glowColor,
    accent,
    config,
    strapY,
    statusLEDCount,
    statusLEDColors,
    showStatusLEDs,
  } = ctx
  if (!showStatusLEDs) return null
  const ledRadius = headLength * 0.02
  const ledY = strapY - config.strapWidth / 2 - ledRadius * 2.5
  const ledSpacing = ledRadius * 3
  const startX = centerX - ((statusLEDCount - 1) * ledSpacing) / 2

  const defaultColors = [glowColor, accent, "#00ff88"]
  const colors = statusLEDColors || defaultColors

  return (
    <g name="statusLEDs">
      {Array.from({ length: statusLEDCount }).map((_, i) => (
        <g key={i}>
          {/* LED glow */}
          <circle
            cx={startX + i * ledSpacing}
            cy={ledY}
            r={ledRadius * 1.5}
            fill={colors[i] || glowColor}
            opacity={0.3}
          />
          {/* LED body */}
          <circle
            cx={startX + i * ledSpacing}
            cy={ledY}
            r={ledRadius}
            fill={colors[i] || glowColor}
            opacity={0.9}
          />
        </g>
      ))}
    </g>
  )
}
