/** Ring eye — thin double-ring with a small dot pupil. */

import type { EyeRendererProps } from "./DefaultEye"

export function RingEye({ ctx }: EyeRendererProps) {
  const { centerX, headCenterY, config, glowColor, gradientId } = ctx
  const outerR = config.eyeOuterRadius
  return (
    <>
      {/* Glow */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR + 2}
        fill={`url(#${gradientId}-eyeGlow)`}
      />
      {/* Outer thin ring */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR}
        fill="none"
        stroke={glowColor}
        strokeWidth={2}
      />
      {/* Inner thin ring */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.6}
        fill="none"
        stroke={glowColor}
        strokeWidth={1}
        opacity={0.6}
      />
      {/* Center pupil */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.25}
        fill={glowColor}
      />
      {/* Highlight */}
      <circle
        cx={centerX - outerR * 0.08}
        cy={headCenterY - outerR * 0.08}
        r={outerR * 0.1}
        fill="#fff"
        opacity={0.8}
      />
    </>
  )
}
