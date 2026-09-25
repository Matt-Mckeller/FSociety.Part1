/**
 * Aperture eye — camera iris with rotating blades. Number of blades
 * comes from `ctx.apertureBlades` so the parent can vary the look.
 */

import type { CharacterPartContext } from "../CharacterPartContext"
import type { EyeRendererProps } from "./DefaultEye"

export function ApertureEye({ ctx }: EyeRendererProps) {
  const { centerX, headCenterY, config, glowColor, gradientId, apertureBlades } = ctx
  const bladeAngle = (2 * Math.PI) / apertureBlades
  const outerR = config.eyeOuterRadius
  const innerR = config.eyeInnerRadius * 1.2

  return (
    <>
      {/* Background glow */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR + 3}
        fill={`url(#${gradientId}-eyeGlow)`}
      />
      {/* Outer housing */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR}
        fill="#0a0a15"
        stroke={glowColor}
        strokeWidth={1.5}
      />
      {/* Aperture blades */}
      {Array.from({ length: apertureBlades }).map((_, i) => {
        const angle = bladeAngle * i - Math.PI / 2
        const nextAngle = angle + bladeAngle
        const midAngle = angle + bladeAngle / 2

        const x1 = centerX + Math.cos(angle) * innerR
        const y1 = headCenterY + Math.sin(angle) * innerR
        const x2 = centerX + Math.cos(nextAngle) * innerR
        const y2 = headCenterY + Math.sin(nextAngle) * innerR
        const xMid = centerX + Math.cos(midAngle) * (outerR - 1)
        const yMid = headCenterY + Math.sin(midAngle) * (outerR - 1)

        return (
          <path
            key={i}
            d={`M ${x1} ${y1} Q ${xMid} ${yMid} ${x2} ${y2} L ${centerX} ${headCenterY} Z`}
            fill={i % 2 === 0 ? "#1a1a2e" : "#2a2a4e"}
            stroke={glowColor}
            strokeWidth={0.3}
            opacity={0.9}
          />
        )
      })}
      {/* Center lens */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={config.eyeInnerRadius * 0.7}
        fill={glowColor}
        opacity={0.9}
      />
      {/* Lens highlight */}
      <circle
        cx={centerX - innerR * 0.15}
        cy={headCenterY - innerR * 0.15}
        r={config.eyeInnerRadius * 0.25}
        fill="#fff"
        opacity={0.7}
      />
    </>
  )
}

// Re-exported for callers who only import this file.
export type { CharacterPartContext }
