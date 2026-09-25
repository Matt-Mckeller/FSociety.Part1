/** Diamond-shaped tech mark above the eye on the forehead. */

import type { CharacterPartContext } from "../CharacterPartContext"

export interface ForeheadMarkProps {
  ctx: CharacterPartContext
}

export function ForeheadMark({ ctx }: ForeheadMarkProps) {
  const { centerX, headLength, headCenterY, headRadius, glowColor, showForeheadMark } = ctx
  if (!showForeheadMark) return null
  const markY = headCenterY - headRadius * 0.5
  const markSize = headLength * 0.08

  return (
    <g name="foreheadMark">
      {/* Diamond shape */}
      <polygon
        points={`
          ${centerX},${markY - markSize}
          ${centerX + markSize * 0.6},${markY}
          ${centerX},${markY + markSize}
          ${centerX - markSize * 0.6},${markY}
        `}
        fill="none"
        stroke={glowColor}
        strokeWidth={0.8}
        opacity={0.6}
      />
      {/* Center dot */}
      <circle
        cx={centerX}
        cy={markY}
        r={markSize * 0.2}
        fill={glowColor}
        opacity={0.8}
      />
    </g>
  )
}
