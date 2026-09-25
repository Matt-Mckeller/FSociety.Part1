/**
 * Square Primitive
 *
 * Square/rectangle with configurable corner radius.
 */

"use client"

import React, { useMemo } from "react"
import type { SquareProps } from "../../types"
import { SHAPE_DEFAULTS } from "../../constants"
import { generateSquarePath } from "../../utils/geometry"

export function Square({
  id,
  className,
  style,
  centerX,
  centerY,
  radius,
  fill = "#ffffff",
  fillMode = "solid",
  gradientId,
  stroke,
  opacity = SHAPE_DEFAULTS.opacity,
  shadowFilterId,
  transform,
  transitionStyle,
  // Square specific
  cornerRadius = SHAPE_DEFAULTS.squareCornerRadius,
}: SquareProps) {
  // Square size is based on radius (circumscribed circle)
  const size = radius * 2 * 0.707 // sqrt(2)/2 for inscribed square

  // Generate square path
  const path = useMemo(
    () => generateSquarePath(centerX, centerY, size, cornerRadius),
    [centerX, centerY, size, cornerRadius],
  )

  // Resolve fill
  const resolvedFill =
    fillMode === "gradient" && gradientId ? `url(#${gradientId})` : fill

  const baseStyle: React.CSSProperties = {
    ...style,
    transition: transitionStyle,
  }

  return (
    <path
      id={id}
      className={className}
      style={baseStyle}
      d={path}
      fill={resolvedFill}
      opacity={opacity}
      transform={transform}
      filter={shadowFilterId ? `url(#${shadowFilterId})` : undefined}
      stroke={stroke?.color}
      strokeWidth={stroke?.width}
      strokeLinecap={stroke?.linecap}
      strokeLinejoin={stroke?.linejoin}
      strokeDasharray={stroke?.dasharray}
    />
  )
}
