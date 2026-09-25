/**
 * Scanner eye — horizontal scan-line aesthetic. Animates a moving
 * scan bar when `effectiveMood === "scanning"`.
 */

import type { EyeRendererProps } from "./DefaultEye"

export function ScannerEye({ ctx }: EyeRendererProps) {
  const { centerX, headCenterY, config, glowColor, gradientId, effectiveMood } = ctx
  const outerR = config.eyeOuterRadius
  const scanning = effectiveMood === "scanning"
  return (
    <>
      {/* Outer glow */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR + 3}
        fill={`url(#${gradientId}-eyeGlow)`}
      />
      {/* Outer ring */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR}
        fill="#0a0a12"
        stroke={glowColor}
        strokeWidth={1.5}
      />
      {/* Horizontal lines */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((offset, i) => (
        <line
          key={i}
          x1={centerX - outerR * 0.8}
          y1={headCenterY + outerR * offset}
          x2={centerX + outerR * 0.8}
          y2={headCenterY + outerR * offset}
          stroke={glowColor}
          strokeWidth={i === 2 ? 2 : 0.5}
          opacity={i === 2 ? 1 : 0.4}
        />
      ))}
      {/* Scan bar (animated position based on mood) */}
      <rect
        x={centerX - outerR * 0.8}
        y={headCenterY - 1}
        width={outerR * 1.6}
        height={2}
        fill={glowColor}
        opacity={0.8}
        className={scanning ? "animate-scan-line" : ""}
      >
        {scanning && (
          <animate
            attributeName="y"
            values={`${headCenterY - outerR * 0.7};${headCenterY + outerR * 0.7};${headCenterY - outerR * 0.7}`}
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      {/* Center dot */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.15}
        fill={glowColor}
      />
    </>
  )
}
