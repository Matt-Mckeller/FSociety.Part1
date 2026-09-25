/**
 * Circle Primitive
 *
 * Basic circle shape with optional pupil/eye effect and 3D lighting.
 */

"use client"

import React from "react"
import type { CircleProps } from "../../types"
import {
  SHAPE_DEFAULTS,
  PUPIL_DEFAULTS,
  LIGHTING_DEFAULTS,
} from "../../constants"
import { positionFromAngle } from "../../utils/geometry"

export function Circle({
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
  // Eye/Pupil
  showPupil = false,
  pupilDirection = PUPIL_DEFAULTS.direction,
  pupilOffset = PUPIL_DEFAULTS.offset,
  pupilSize = PUPIL_DEFAULTS.size,
  pupilColor = PUPIL_DEFAULTS.color,
  pupilInnerColor = PUPIL_DEFAULTS.innerColor,
  pupilInnerSize = PUPIL_DEFAULTS.innerSize,
  pupilGradientId,
  // 3D Lighting
  show3DHighlight = false,
  lightDirection = LIGHTING_DEFAULTS.lightDirection,
  highlightIntensity = LIGHTING_DEFAULTS.highlightIntensity,
}: CircleProps) {
  // Resolve fill
  const resolvedFill =
    fillMode === "gradient" && gradientId ? `url(#${gradientId})` : fill

  // Calculate pupil position
  const pupilPos = showPupil
    ? positionFromAngle(centerX, centerY, pupilDirection, radius * pupilOffset)
    : null

  const pupilRadius = radius * pupilSize
  const pupilInnerRadius = pupilRadius * pupilInnerSize

  // Base style
  const baseStyle: React.CSSProperties = {
    ...style,
    transition: transitionStyle,
  }

  return (
    <g id={id} className={className} style={baseStyle} transform={transform}>
      {/* Main circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill={resolvedFill}
        opacity={opacity}
        filter={shadowFilterId ? `url(#${shadowFilterId})` : undefined}
        stroke={stroke?.color}
        strokeWidth={stroke?.width}
        strokeLinecap={stroke?.linecap}
        strokeLinejoin={stroke?.linejoin}
        strokeDasharray={stroke?.dasharray}
      />

      {/* 3D Highlight */}
      {show3DHighlight && (
        <ellipse
          cx={
            centerX + Math.cos((lightDirection * Math.PI) / 180) * radius * 0.3
          }
          cy={
            centerY - Math.sin((lightDirection * Math.PI) / 180) * radius * 0.3
          }
          rx={radius * 0.4}
          ry={radius * 0.3}
          fill="white"
          opacity={highlightIntensity}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Pupil / Eye */}
      {showPupil && pupilPos && (
        <g name="pupil">
          {/* Outer pupil */}
          <circle
            cx={pupilPos.x}
            cy={pupilPos.y}
            r={pupilRadius}
            fill={pupilGradientId ? `url(#${pupilGradientId})` : pupilColor}
          />
          {/* Inner iris/highlight */}
          <circle
            cx={pupilPos.x}
            cy={pupilPos.y}
            r={pupilInnerRadius}
            fill={pupilInnerColor}
          />
        </g>
      )}
    </g>
  )
}
