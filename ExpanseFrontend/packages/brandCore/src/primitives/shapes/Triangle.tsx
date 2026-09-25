/**
 * Triangle Primitive
 *
 * Equilateral triangle with configurable orientation and corner radius.
 */

"use client"

import React, { useMemo } from "react"
import type { TriangleProps } from "../../types"
import { SHAPE_DEFAULTS } from "../../constants"
import { generateTrianglePath } from "../../utils/geometry"

export function Triangle({
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
  // Triangle specific
  orientation = SHAPE_DEFAULTS.triangleOrientation,
  cornerRadius = SHAPE_DEFAULTS.triangleCornerRadius,
}: TriangleProps) {
  // Generate triangle path
  const path = useMemo(
    () =>
      generateTrianglePath(centerX, centerY, radius, orientation, cornerRadius),
    [centerX, centerY, radius, orientation, cornerRadius],
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
