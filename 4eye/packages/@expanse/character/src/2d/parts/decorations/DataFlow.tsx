/** Dashed data-flow lines along the strap. Hidden when there's no strap. */

import type { CharacterPartContext } from "../CharacterPartContext"

export interface DataFlowProps {
  ctx: CharacterPartContext
}

export function DataFlow({ ctx }: DataFlowProps) {
  const { centerX, glowColor, config, strapY, wrapX, showDataFlow, strapStyle } = ctx
  if (!showDataFlow || strapStyle === "none") return null
  const flowY = strapY
  const flowLength = wrapX * 0.3

  return (
    <g name="dataFlow" opacity={0.4}>
      {/* Left flow lines */}
      <line
        x1={centerX - wrapX + 5}
        y1={flowY - config.strapWidth * 0.2}
        x2={centerX - wrapX + 5 + flowLength}
        y2={flowY - config.strapWidth * 0.2}
        stroke={glowColor}
        strokeWidth={0.5}
        strokeDasharray="3,2"
      />
      <line
        x1={centerX - wrapX + 5}
        y1={flowY + config.strapWidth * 0.2}
        x2={centerX - wrapX + 5 + flowLength}
        y2={flowY + config.strapWidth * 0.2}
        stroke={glowColor}
        strokeWidth={0.5}
        strokeDasharray="3,2"
      />
      {/* Right flow lines */}
      <line
        x1={centerX + wrapX - 5 - flowLength}
        y1={flowY - config.strapWidth * 0.2}
        x2={centerX + wrapX - 5}
        y2={flowY - config.strapWidth * 0.2}
        stroke={glowColor}
        strokeWidth={0.5}
        strokeDasharray="3,2"
      />
      <line
        x1={centerX + wrapX - 5 - flowLength}
        y1={flowY + config.strapWidth * 0.2}
        x2={centerX + wrapX - 5}
        y2={flowY + config.strapWidth * 0.2}
        stroke={glowColor}
        strokeWidth={0.5}
        strokeDasharray="3,2"
      />
    </g>
  )
}
