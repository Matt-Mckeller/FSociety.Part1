/**
 * CoinIcon Composite
 *
 * Circular icon with decorative border arcs in coin style.
 */

"use client"

import React, { useId } from "react"
import type { CoinIconProps } from "../../types"
import { useBrandContext } from "../../context/BrandContext"
import { BorderArcsGroup } from "../../primitives/arcs"

// ViewBox dimensions
const VIEWBOX_SIZE = 50
const CENTER = 25
const COIN_RADIUS = 15

export interface CoinIconExtendedProps extends CoinIconProps {
  /** Text to display in center of coin */
  text?: string
  /** Text color */
  textColor?: string
  /** Font size for text */
  textSize?: number
  /** Font weight */
  textWeight?: number
  /** Font family */
  fontFamily?: string
}

/**
 * CoinIcon - Primary implementation with original 50x50 paths
 */
export function CoinIcon({
  id,
  className,
  style,
  size = VIEWBOX_SIZE,
  color,
  borderColor,
  showArcs = true,
  arcOpacity = 1,
  text,
  textColor,
  textSize = 16,
  textWeight = 800,
  fontFamily,
}: CoinIconExtendedProps) {
  const uniqueId = useId()
  const componentId = id ?? `coin-icon-${uniqueId}`
  const { resolveColor } = useBrandContext()

  // Resolve colors
  const resolvedColor = color ?? resolveColor("primaryColor")
  const resolvedBorderColor = borderColor ?? resolvedColor
  const resolvedTextColor = textColor ?? "#ffffff"

  return (
    <svg
      id={componentId}
      className={className}
      style={style}
      height="100%"
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main coin circle */}
      <circle cx={CENTER} cy={CENTER} r={COIN_RADIUS} fill={resolvedColor} />

      {/* Border arcs */}
      {showArcs && (
        <g transform="scale(0.122)">
          <BorderArcsGroup
            color={resolvedBorderColor}
            arc1Opacity={arcOpacity}
            arc2Opacity={arcOpacity}
            arc3Opacity={arcOpacity}
          />
        </g>
      )}

      {/* Center text */}
      {text !== undefined && (
        <text
          x={CENTER}
          y={CENTER + 1}
          fill={resolvedTextColor}
          fontSize={textSize}
          fontWeight={textWeight}
          fontFamily={fontFamily}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {text.toUpperCase()}
        </text>
      )}
    </svg>
  )
}
