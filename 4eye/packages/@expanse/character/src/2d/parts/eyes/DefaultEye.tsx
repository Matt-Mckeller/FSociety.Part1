/**
 * Default eye — basic concentric circles. The fallback design used
 * when no specific `eyeDesign` is requested.
 */

import type { CharacterPartContext } from "../CharacterPartContext"

export interface EyeRendererProps {
  ctx: CharacterPartContext
}

export function DefaultEye({ ctx }: EyeRendererProps) {
  const { centerX, headCenterY, config, glowColor, gradientId } = ctx
  return (
    <>
      {/* Eye - outer glow effect */}
      <circle
        name="eyeGlow"
        cx={centerX}
        cy={headCenterY}
        r={config.eyeOuterRadius + 2}
        fill={`url(#${gradientId}-eyeGlow)`}
      />
      {/* Eye - outer ring (layer 1) */}
      <circle
        name="eyeOuter"
        cx={centerX}
        cy={headCenterY}
        r={config.eyeOuterRadius}
        fill="#1a1a2e"
        stroke={glowColor}
        strokeWidth={1}
      />
      {/* Eye - inner core (layer 2) */}
      <circle
        name="eyeInner"
        cx={centerX}
        cy={headCenterY}
        r={config.eyeInnerRadius}
        fill={glowColor}
        opacity={0.8}
      />
      {/* Eye - center highlight */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={config.eyeInnerRadius * 0.4}
        fill="#fff"
        opacity={0.9}
      />
      {/* Eye - reflection dot */}
      <circle
        cx={centerX - config.eyeOuterRadius * 0.25}
        cy={headCenterY - config.eyeOuterRadius * 0.25}
        r={config.eyeInnerRadius * 0.2}
        fill="#fff"
        opacity={0.5}
      />
    </>
  )
}
