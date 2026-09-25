/**
 * Shape Component
 *
 * Unified shape component for both primary and secondary shapes.
 * Renders circle, square, or triangle with optional pupil and 3D highlight.
 */

"use client"

import React from "react"
import type {
  ShapeProps,
  ShapeType,
  ShapeGeometry,
} from "../ExpanseLogoV5.types"
import {
  positionFromAngle,
  calculateTrianglePoints,
  generateRoundedTrianglePath,
  generateRoundedSquarePath,
} from "../utils/geometry"
import {
  DEFAULT_SQUARE_CORNER_RADIUS,
  DEFAULT_TRIANGLE_CORNER_RADIUS,
} from "../ExpanseLogoV5.variants"

// ============================================================
// SHAPE GEOMETRY GENERATORS
// ============================================================

function generateCircleGeometry(
  cx: number,
  cy: number,
  radius: number,
  fill: string,
  gradientId?: string,
  shadowFilterId?: string,
): ShapeGeometry {
  const mainFill = gradientId ? `url(#${gradientId})` : fill
  const filterAttr = shadowFilterId ? `url(#${shadowFilterId})` : undefined

  const mainShape = (
    <circle cx={cx} cy={cy} r={radius} fill={mainFill} filter={filterAttr} />
  )

  // Mask shape slightly larger for ring clipping
  const maskRadius = radius + 6
  const maskShape = (
    <circle
      r={maskRadius}
      cx={cx + 39.509173} // Account for group transform
      cy={cy + 5.4736727}
      fill="black"
    />
  )

  return {
    mainShape,
    maskShape,
    pupilCenter: { x: cx, y: cy },
  }
}

function generateSquareGeometry(
  cx: number,
  cy: number,
  radius: number,
  fill: string,
  cornerRadius: number,
  gradientId?: string,
  shadowFilterId?: string,
): ShapeGeometry {
  const mainFill = gradientId ? `url(#${gradientId})` : fill
  const filterAttr = shadowFilterId ? `url(#${shadowFilterId})` : undefined

  // Square inscribed in circle (corners at circle edge)
  const sideLength = radius * Math.sqrt(2)
  const path = generateRoundedSquarePath(cx, cy, sideLength, cornerRadius)

  const mainShape = <path d={path} fill={mainFill} filter={filterAttr} />

  // Mask with margin
  const maskSideLength = sideLength + 12
  const maskPath = generateRoundedSquarePath(
    cx + 39.509173,
    cy + 5.4736727,
    maskSideLength,
    cornerRadius,
  )
  const maskShape = <path d={maskPath} fill="black" />

  return {
    mainShape,
    maskShape,
    pupilCenter: { x: cx, y: cy },
  }
}

function generateTriangleGeometry(
  cx: number,
  cy: number,
  radius: number,
  fill: string,
  cornerRadius: number,
  orientation: "up" | "down" | "left" | "right",
  gradientId?: string,
  shadowFilterId?: string,
): ShapeGeometry {
  const mainFill = gradientId ? `url(#${gradientId})` : fill
  const filterAttr = shadowFilterId ? `url(#${shadowFilterId})` : undefined

  const points = calculateTrianglePoints(cx, cy, radius, orientation)
  const path = generateRoundedTrianglePath(points, cornerRadius)

  const mainShape = <path d={path} fill={mainFill} filter={filterAttr} />

  // Mask with margin
  const maskRadius = radius + 10
  const maskPoints = calculateTrianglePoints(
    cx + 39.509173,
    cy + 5.4736727,
    maskRadius,
    orientation,
  )
  const maskPath = generateRoundedTrianglePath(maskPoints, cornerRadius)
  const maskShape = <path d={maskPath} fill="black" />

  // Centroid for pupil (differs from geometric center for triangles)
  const centroidX = (points[0][0] + points[1][0] + points[2][0]) / 3
  const centroidY = (points[0][1] + points[1][1] + points[2][1]) / 3

  return {
    mainShape,
    maskShape,
    pupilCenter: { x: centroidX, y: centroidY },
  }
}

// ============================================================
// SHAPE COMPONENT
// ============================================================

export interface ShapeComponentProps extends ShapeProps {
  /** Whether parent is in interacting state */
  isInteracting?: boolean
  /** Computed pupil scale */
  computedPupilScale?: number
  /** Transform for horizontal mirror */
  horizontalMirror?: boolean
}

export function Shape({
  name,
  shape,
  centerX,
  centerY,
  radius,
  fill = "#ffffff",
  fillMode = "solid",
  gradientId,
  shadowFilterId,
  squareCornerRadius = DEFAULT_SQUARE_CORNER_RADIUS,
  triangleCornerRadius = DEFAULT_TRIANGLE_CORNER_RADIUS,
  triangleOrientation = "left",
  showPupil = false,
  pupilDirection = 240,
  pupilOffset = 0,
  pupilSize = 0.28,
  pupilColor = "#1a1a1a",
  pupilInnerColor = "#f5f5f5",
  pupilInnerSize = 0.6,
  pupilGradientId,
  show3DHighlight = false,
  lightDirection = 45,
  highlightIntensity = 0.15,
  isInteracting = false,
  computedPupilScale = 1,
  horizontalMirror = false,
}: ShapeComponentProps) {
  // Generate shape geometry based on type
  let geometry: ShapeGeometry

  const effectiveGradientId = fillMode === "gradient" ? gradientId : undefined

  switch (shape) {
    case "square":
      geometry = generateSquareGeometry(
        centerX,
        centerY,
        radius,
        fill,
        squareCornerRadius,
        effectiveGradientId,
        shadowFilterId,
      )
      break

    case "triangle":
      geometry = generateTriangleGeometry(
        centerX,
        centerY,
        radius,
        fill,
        triangleCornerRadius,
        triangleOrientation,
        effectiveGradientId,
        shadowFilterId,
      )
      break

    case "circle":
    default:
      geometry = generateCircleGeometry(
        centerX,
        centerY,
        radius,
        fill,
        effectiveGradientId,
        shadowFilterId,
      )
      break
  }

  // Pupil rendering
  const renderPupil = () => {
    if (!showPupil) return null

    const adjustedPupilDirection = horizontalMirror
      ? 180 - pupilDirection
      : pupilDirection

    const pupilDistance = radius * pupilOffset
    const pupilPos = positionFromAngle(
      geometry.pupilCenter.x,
      geometry.pupilCenter.y,
      adjustedPupilDirection,
      pupilDistance,
    )

    const basePupilRadius = radius * pupilSize
    const pupilRadius = basePupilRadius * computedPupilScale

    // Use gradient if provided, otherwise use solid colors
    if (pupilGradientId) {
      return (
        <circle
          name={`${name}-pupil`}
          cx={pupilPos.x}
          cy={pupilPos.y}
          r={pupilRadius}
          fill={`url(#${pupilGradientId})`}
          style={{
            transition:
              "cx 0.2s ease-in-out, cy 0.2s ease-in-out, r 0.3s ease-out",
          }}
        />
      )
    }

    // Flat pupil (2 circles)
    return (
      <>
        <circle
          name={`${name}-pupil-outer`}
          cx={pupilPos.x}
          cy={pupilPos.y}
          r={pupilRadius}
          fill={pupilColor}
          style={{
            transition:
              "cx 0.2s ease-in-out, cy 0.2s ease-in-out, r 0.3s ease-out",
          }}
        />
        <circle
          name={`${name}-pupil-inner`}
          cx={pupilPos.x}
          cy={pupilPos.y}
          r={pupilRadius * pupilInnerSize}
          fill={pupilInnerColor}
          style={{
            transition:
              "cx 0.2s ease-in-out, cy 0.2s ease-in-out, r 0.3s ease-out",
          }}
        />
      </>
    )
  }

  // 3D Highlight rendering
  const renderHighlight = () => {
    if (!show3DHighlight || shape !== "circle") return null

    const highlightDistance = radius * 0.35
    const highlightPos = positionFromAngle(
      centerX,
      centerY,
      lightDirection,
      highlightDistance,
    )

    return (
      <ellipse
        name={`${name}-highlight`}
        cx={highlightPos.x}
        cy={highlightPos.y}
        rx={radius * 0.25}
        ry={radius * 0.15}
        fill="white"
        opacity={highlightIntensity}
        transform={`rotate(${-lightDirection + 45}, ${highlightPos.x}, ${highlightPos.y})`}
      />
    )
  }

  return (
    <g name={`shape-${name}`}>
      {geometry.mainShape}
      {renderHighlight()}
      {renderPupil()}
    </g>
  )
}

// Export geometry functions for mask generation
export {
  generateCircleGeometry,
  generateSquareGeometry,
  generateTriangleGeometry,
}

// Helper to get mask shape for a given config
export function getShapeMask(
  shape: ShapeType,
  cx: number,
  cy: number,
  radius: number,
  options: {
    squareCornerRadius?: number
    triangleCornerRadius?: number
    triangleOrientation?: "up" | "down" | "left" | "right"
  } = {},
): React.ReactNode {
  switch (shape) {
    case "square":
      return generateSquareGeometry(
        cx,
        cy,
        radius,
        "black",
        options.squareCornerRadius ?? DEFAULT_SQUARE_CORNER_RADIUS,
      ).maskShape

    case "triangle":
      return generateTriangleGeometry(
        cx,
        cy,
        radius,
        "black",
        options.triangleCornerRadius ?? DEFAULT_TRIANGLE_CORNER_RADIUS,
        options.triangleOrientation ?? "left",
      ).maskShape

    case "circle":
    default:
      return generateCircleGeometry(cx, cy, radius, "black").maskShape
  }
}
