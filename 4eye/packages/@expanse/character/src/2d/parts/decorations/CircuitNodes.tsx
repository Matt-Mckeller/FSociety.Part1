/**
 * Circuit-pattern accent nodes on the strap. Only rendered when the
 * variant config opts in via `config.showNodes`.
 */

import type { CharacterPartContext } from "../CharacterPartContext"

export interface CircuitNodesProps {
  ctx: CharacterPartContext
}

export function CircuitNodes({ ctx }: CircuitNodesProps) {
  const { centerX, headLength, config, glowColor, strapY } = ctx
  if (!config.showNodes) return null
  return (
    <>
      {/* Left node */}
      <circle
        cx={centerX - headLength * 0.22}
        cy={strapY}
        r={config.strapWidth * 0.18}
        fill={glowColor}
        opacity={0.3}
      />
      <circle
        cx={centerX - headLength * 0.22}
        cy={strapY}
        r={config.strapWidth * 0.1}
        fill={glowColor}
        opacity={0.7}
      />
      {/* Right node */}
      <circle
        cx={centerX + headLength * 0.22}
        cy={strapY}
        r={config.strapWidth * 0.18}
        fill={glowColor}
        opacity={0.3}
      />
      <circle
        cx={centerX + headLength * 0.22}
        cy={strapY}
        r={config.strapWidth * 0.1}
        fill={glowColor}
        opacity={0.7}
      />
    </>
  )
}
