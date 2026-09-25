/** Angular strap — sharp geometric edges with corner accents. */

import type { StrapRendererProps } from "./DefaultStrap"

export function AngularStrap({ ctx }: StrapRendererProps) {
  const { centerX, headRadius, config, glowColor, gradientId, strapY, wrapX } = ctx
  const sw = config.strapWidth
  const extend = config.strapExtend
  return (
    <>
      {/* Angular main band */}
      <path
        d={`
          M ${centerX - headRadius - extend} ${strapY - sw * 0.3}
          L ${centerX - headRadius - extend + 3} ${strapY - sw * 0.5}
          L ${centerX - wrapX} ${strapY - sw * 0.5}
          L ${centerX + wrapX} ${strapY - sw * 0.5}
          L ${centerX + headRadius + extend - 3} ${strapY - sw * 0.5}
          L ${centerX + headRadius + extend} ${strapY - sw * 0.3}
          L ${centerX + headRadius + extend} ${strapY + sw * 0.3}
          L ${centerX + headRadius + extend - 3} ${strapY + sw * 0.5}
          L ${centerX + wrapX} ${strapY + sw * 0.5}
          L ${centerX - wrapX} ${strapY + sw * 0.5}
          L ${centerX - headRadius - extend + 3} ${strapY + sw * 0.5}
          L ${centerX - headRadius - extend} ${strapY + sw * 0.3}
          Z
        `}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Angular accent lines */}
      <line
        x1={centerX - wrapX}
        y1={strapY - sw * 0.5}
        x2={centerX + wrapX}
        y2={strapY - sw * 0.5}
        stroke={glowColor}
        strokeWidth={1}
        opacity={0.6}
      />
      <line
        x1={centerX - wrapX}
        y1={strapY + sw * 0.5}
        x2={centerX + wrapX}
        y2={strapY + sw * 0.5}
        stroke={glowColor}
        strokeWidth={1}
        opacity={0.6}
      />
      {/* Corner accents */}
      {[centerX - headRadius - extend, centerX + headRadius + extend].map(
        (x, i) => (
          <polygon
            key={i}
            points={`${x},${strapY - sw * 0.3} ${x + (i === 0 ? 3 : -3)},${strapY - sw * 0.5} ${x + (i === 0 ? 3 : -3)},${strapY + sw * 0.5} ${x},${strapY + sw * 0.3}`}
            fill={glowColor}
            opacity={0.3}
          />
        ),
      )}
    </>
  )
}
