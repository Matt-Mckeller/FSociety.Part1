/** Camera eye — detailed multi-layer lens with cardinal-direction dots. */

import type { EyeRendererProps } from "./DefaultEye"

export function CameraEye({ ctx }: EyeRendererProps) {
  const { centerX, headCenterY, config, glowColor, gradientId } = ctx
  const outerR = config.eyeOuterRadius
  return (
    <>
      {/* Outer glow */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR + 4}
        fill={`url(#${gradientId}-eyeGlow)`}
      />
      {/* Outer housing */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR}
        fill="#0f0f1a"
        stroke={glowColor}
        strokeWidth={2}
      />
      {/* Ring 1 */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.85}
        fill="none"
        stroke={glowColor}
        strokeWidth={0.5}
        opacity={0.4}
      />
      {/* Ring 2 */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.7}
        fill="#1a1a2e"
        stroke={glowColor}
        strokeWidth={0.8}
        opacity={0.6}
      />
      {/* Ring 3 */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.55}
        fill="none"
        stroke={glowColor}
        strokeWidth={0.5}
        opacity={0.5}
      />
      {/* Inner lens */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.4}
        fill={glowColor}
      />
      {/* Lens center */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={outerR * 0.2}
        fill="#fff"
        opacity={0.8}
      />
      {/* Highlight */}
      <circle
        cx={centerX - outerR * 0.2}
        cy={headCenterY - outerR * 0.2}
        r={outerR * 0.12}
        fill="#fff"
        opacity={0.5}
      />
      {/* Small detail dots around outer ring */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <circle
            key={deg}
            cx={centerX + Math.cos(rad) * outerR * 0.92}
            cy={headCenterY + Math.sin(rad) * outerR * 0.92}
            r={0.8}
            fill={glowColor}
            opacity={0.6}
          />
        )
      })}
    </>
  )
}
