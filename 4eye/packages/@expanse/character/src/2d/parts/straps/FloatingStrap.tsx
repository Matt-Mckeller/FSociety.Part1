/** Floating strap — detached segments connected by dashed glow lines. */

import type { StrapRendererProps } from "./DefaultStrap"

export function FloatingStrap({ ctx }: StrapRendererProps) {
  const { centerX, headLength, headRadius, config, glowColor, gradientId, strapY } = ctx
  const sw = config.strapWidth * 0.8
  const gap = headLength * 0.08
  return (
    <>
      {/* Left floating segment */}
      <rect
        x={centerX - headRadius - config.strapExtend}
        y={strapY - sw / 2}
        width={headRadius * 0.5}
        height={sw}
        rx={sw / 4}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Center-left segment */}
      <rect
        x={centerX - headRadius * 0.4}
        y={strapY - sw / 2}
        width={headRadius * 0.3}
        height={sw}
        rx={sw / 4}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Center-right segment */}
      <rect
        x={centerX + headRadius * 0.1}
        y={strapY - sw / 2}
        width={headRadius * 0.3}
        height={sw}
        rx={sw / 4}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Right floating segment */}
      <rect
        x={centerX + headRadius * 0.5 + config.strapExtend * 0.3}
        y={strapY - sw / 2}
        width={headRadius * 0.5}
        height={sw}
        rx={sw / 4}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Connecting glow lines */}
      <line
        x1={centerX - headRadius - config.strapExtend + headRadius * 0.5 + gap}
        y1={strapY}
        x2={centerX - headRadius * 0.4 - gap}
        y2={strapY}
        stroke={glowColor}
        strokeWidth={0.5}
        strokeDasharray="2,2"
        opacity={0.5}
      />
      <line
        x1={centerX - headRadius * 0.1 + gap}
        y1={strapY}
        x2={centerX + headRadius * 0.1 - gap}
        y2={strapY}
        stroke={glowColor}
        strokeWidth={0.5}
        strokeDasharray="2,2"
        opacity={0.5}
      />
      <line
        x1={centerX + headRadius * 0.4 + gap}
        y1={strapY}
        x2={centerX + headRadius * 0.5 + config.strapExtend * 0.3 - gap}
        y2={strapY}
        stroke={glowColor}
        strokeWidth={0.5}
        strokeDasharray="2,2"
        opacity={0.5}
      />
    </>
  )
}
