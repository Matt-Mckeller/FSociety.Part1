/**
 * Default strap — standard wrap-around band with edge glow.
 * Uses the precomputed wrap geometry from `ctx`.
 */

import type { CharacterPartContext } from "../CharacterPartContext"

export interface StrapRendererProps {
  ctx: CharacterPartContext
}

export function DefaultStrap({ ctx }: StrapRendererProps) {
  const {
    centerX,
    headRadius,
    config,
    glowColor,
    gradientId,
    strapY,
    strapHalfWidth,
    wrapX,
    wrapYOffset,
  } = ctx
  return (
    <>
      {/* Left wrap-around extension */}
      <path
        name="strapWrapLeft"
        d={`
          M ${centerX - wrapX} ${strapY - strapHalfWidth}
          Q ${centerX - headRadius - config.strapExtend} ${strapY - strapHalfWidth * 0.5}
            ${centerX - headRadius - config.strapExtend} ${strapY + wrapYOffset}
          L ${centerX - headRadius - config.strapExtend} ${strapY + wrapYOffset + strapHalfWidth}
          Q ${centerX - headRadius - config.strapExtend + 2} ${strapY + strapHalfWidth * 0.8}
            ${centerX - wrapX} ${strapY + strapHalfWidth}
          Z
        `}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Right wrap-around extension */}
      <path
        name="strapWrapRight"
        d={`
          M ${centerX + wrapX} ${strapY - strapHalfWidth}
          Q ${centerX + headRadius + config.strapExtend} ${strapY - strapHalfWidth * 0.5}
            ${centerX + headRadius + config.strapExtend} ${strapY + wrapYOffset}
          L ${centerX + headRadius + config.strapExtend} ${strapY + wrapYOffset + strapHalfWidth}
          Q ${centerX + headRadius + config.strapExtend - 2} ${strapY + strapHalfWidth * 0.8}
            ${centerX + wrapX} ${strapY + strapHalfWidth}
          Z
        `}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Main strap band across face */}
      <rect
        name="strapMain"
        x={centerX - wrapX}
        y={strapY - strapHalfWidth}
        width={wrapX * 2}
        height={config.strapWidth}
        fill={`url(#${gradientId}-strap)`}
        rx={config.strapWidth / 4}
      />
      {/* Strap edge glow lines */}
      <line
        x1={centerX - wrapX + 2}
        y1={strapY - strapHalfWidth + 1}
        x2={centerX + wrapX - 2}
        y2={strapY - strapHalfWidth + 1}
        stroke={glowColor}
        strokeWidth={0.5}
        opacity={0.4}
      />
      <line
        x1={centerX - wrapX + 2}
        y1={strapY + strapHalfWidth - 1}
        x2={centerX + wrapX - 2}
        y2={strapY + strapHalfWidth - 1}
        stroke={glowColor}
        strokeWidth={0.5}
        opacity={0.4}
      />
    </>
  )
}
