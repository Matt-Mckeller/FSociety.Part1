/** Organic strap — flowing, living-creature curves. */

import type { StrapRendererProps } from "./DefaultStrap"

export function OrganicStrap({ ctx }: StrapRendererProps) {
  const { centerX, headRadius, config, glowColor, gradientId, strapY } = ctx
  const sw = config.strapWidth
  return (
    <>
      {/* Organic flowing shape */}
      <path
        d={`
          M ${centerX - headRadius - config.strapExtend * 0.8} ${strapY}
          Q ${centerX - headRadius - config.strapExtend * 0.5} ${strapY - sw * 0.8}
            ${centerX - headRadius * 0.5} ${strapY - sw * 0.4}
          T ${centerX} ${strapY - sw * 0.6}
          T ${centerX + headRadius * 0.5} ${strapY - sw * 0.4}
          Q ${centerX + headRadius + config.strapExtend * 0.5} ${strapY - sw * 0.8}
            ${centerX + headRadius + config.strapExtend * 0.8} ${strapY}
          Q ${centerX + headRadius + config.strapExtend * 0.5} ${strapY + sw * 0.8}
            ${centerX + headRadius * 0.5} ${strapY + sw * 0.4}
          T ${centerX} ${strapY + sw * 0.6}
          T ${centerX - headRadius * 0.5} ${strapY + sw * 0.4}
          Q ${centerX - headRadius - config.strapExtend * 0.5} ${strapY + sw * 0.8}
            ${centerX - headRadius - config.strapExtend * 0.8} ${strapY}
          Z
        `}
        fill={`url(#${gradientId}-strap)`}
        opacity={0.9}
      />
      {/* Inner flowing accent */}
      <path
        d={`
          M ${centerX - headRadius * 0.6} ${strapY}
          Q ${centerX - headRadius * 0.3} ${strapY - sw * 0.2}
            ${centerX} ${strapY - sw * 0.3}
          Q ${centerX + headRadius * 0.3} ${strapY - sw * 0.2}
            ${centerX + headRadius * 0.6} ${strapY}
        `}
        fill="none"
        stroke={glowColor}
        strokeWidth={0.8}
        opacity={0.5}
      />
    </>
  )
}
