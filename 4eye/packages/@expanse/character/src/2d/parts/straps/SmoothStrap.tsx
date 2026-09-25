/** Smooth strap — organic flowing curves, no hard edges. */

import type { StrapRendererProps } from "./DefaultStrap"

export function SmoothStrap({ ctx }: StrapRendererProps) {
  const { centerX, headRadius, config, glowColor, gradientId, strapY } = ctx
  const sw = config.strapWidth
  const extend = config.strapExtend * 1.2
  return (
    <>
      {/* Main flowing band */}
      <path
        d={`
          M ${centerX - headRadius - extend} ${strapY}
          C ${centerX - headRadius * 0.8} ${strapY - sw * 0.3}
            ${centerX - headRadius * 0.3} ${strapY - sw * 0.5}
            ${centerX} ${strapY - sw * 0.5}
          C ${centerX + headRadius * 0.3} ${strapY - sw * 0.5}
            ${centerX + headRadius * 0.8} ${strapY - sw * 0.3}
            ${centerX + headRadius + extend} ${strapY}
          C ${centerX + headRadius * 0.8} ${strapY + sw * 0.3}
            ${centerX + headRadius * 0.3} ${strapY + sw * 0.5}
            ${centerX} ${strapY + sw * 0.5}
          C ${centerX - headRadius * 0.3} ${strapY + sw * 0.5}
            ${centerX - headRadius * 0.8} ${strapY + sw * 0.3}
            ${centerX - headRadius - extend} ${strapY}
          Z
        `}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Soft glow outline */}
      <path
        d={`
          M ${centerX - headRadius - extend} ${strapY}
          C ${centerX - headRadius * 0.8} ${strapY - sw * 0.3}
            ${centerX - headRadius * 0.3} ${strapY - sw * 0.5}
            ${centerX} ${strapY - sw * 0.5}
          C ${centerX + headRadius * 0.3} ${strapY - sw * 0.5}
            ${centerX + headRadius * 0.8} ${strapY - sw * 0.3}
            ${centerX + headRadius + extend} ${strapY}
        `}
        fill="none"
        stroke={glowColor}
        strokeWidth={0.5}
        opacity={0.5}
      />
    </>
  )
}
