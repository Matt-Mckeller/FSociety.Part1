/**
 * Gradient + filter `<defs>` for the 4eye character SVG.
 *
 * Pulled out so the gradient definitions live next to the renderers
 * that consume them. All four gradients are referenced by URL via the
 * stable `ctx.gradientId` prefix.
 */

import type { CharacterPartContext } from "./CharacterPartContext"

export interface CharacterDefsProps {
  ctx: CharacterPartContext
}

export function CharacterDefs({ ctx }: CharacterDefsProps) {
  const { gradientId, glowColor, config } = ctx
  return (
    <defs>
      {/* Eye glow gradient */}
      <radialGradient id={`${gradientId}-eyeGlow`} cx="50%" cy="50%" r="50%">
        <stop
          offset="0%"
          stopColor={glowColor}
          stopOpacity={config.glowIntensity}
        />
        <stop
          offset="60%"
          stopColor={glowColor}
          stopOpacity={config.glowIntensity * 0.4}
        />
        <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
      </radialGradient>

      {/* Orb gradient for orb eye design */}
      <radialGradient
        id={`${gradientId}-orbGradient`}
        cx="30%"
        cy="30%"
        r="70%"
      >
        <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
        <stop offset="40%" stopColor={glowColor} stopOpacity="0.8" />
        <stop offset="100%" stopColor={glowColor} stopOpacity="1" />
      </radialGradient>

      {/* Strap gradient (darker at edges for depth) */}
      <linearGradient
        id={`${gradientId}-strap`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.95" />
        <stop offset="15%" stopColor="#2d2d44" stopOpacity="1" />
        <stop offset="50%" stopColor="#2d2d44" stopOpacity="1" />
        <stop offset="85%" stopColor="#2d2d44" stopOpacity="1" />
        <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0.95" />
      </linearGradient>

      {/* Strap edge highlight */}
      <linearGradient
        id={`${gradientId}-strapEdge`}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop offset="0%" stopColor={glowColor} stopOpacity="0.3" />
        <stop offset="50%" stopColor={glowColor} stopOpacity="0.1" />
        <stop offset="100%" stopColor={glowColor} stopOpacity="0.3" />
      </linearGradient>
    </defs>
  )
}
