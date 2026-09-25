/** Orb eye — glowing magical sphere with pulse animation. */

import type { EyeRendererProps } from "./DefaultEye"

export function OrbEye({ ctx }: EyeRendererProps) {
  const { centerX, headCenterY, config, glowColor, gradientId, pulseStyles } = ctx
  const outerR = config.eyeOuterRadius
  return (
    <>
      {/* Large outer glow */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR + 6}
        fill={`url(#${gradientId}-eyeGlow)`}
        style={pulseStyles}
      />
      {/* Secondary glow */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR + 2}
        fill={glowColor}
        opacity={0.3}
      />
      {/* Main orb */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR}
        fill={`url(#${gradientId}-orbGradient)`}
      />
      {/* Inner energy */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.6}
        fill={glowColor}
        opacity={0.5}
      />
      {/* Core */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.25}
        fill="#fff"
        opacity={0.9}
      />
      {/* Sparkle highlights */}
      <circle
        cx={centerX - outerR * 0.3}
        cy={headCenterY - outerR * 0.25}
        r={outerR * 0.1}
        fill="#fff"
      />
      <circle
        cx={centerX + outerR * 0.35}
        cy={headCenterY - outerR * 0.15}
        r={outerR * 0.06}
        fill="#fff"
        opacity={0.7}
      />
    </>
  )
}
