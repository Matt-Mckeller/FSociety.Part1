/**
 * CloudStack - Multiple stacked fluffy clouds
 *
 * A decorative graphic showing layered clouds at different depths.
 * Represents layers, depth, growth in size (1:2:3 concept).
 *
 * ## Design Patterns Used
 *
 * ### Three-Layer Border Stacking
 * Each cloud uses the standard three-layer border pattern
 *
 * ### Size Progression
 * Clouds grow from small to large (1:2:3 growth pattern)
 *
 * ### Depth via Opacity
 * Background clouds have lower opacity for depth effect
 */

"use client"

import React from "react"
import { Box } from "@mui/material"

import { BackgroundGradient } from "../../primitives/gradients"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// SINGLE CLOUD SUBCOMPONENT
// ============================================================

interface SingleCloudProps {
  /** Horizontal position */
  x: number
  /** Vertical position */
  y: number
  /** Scale factor */
  scale: number
  /** Opacity */
  opacity: number
  /** Cloud path */
  path: string
  /** Gradient ID */
  gradientId: string
  /** Three-layer stroke colors */
  outerStroke: string
  centerStroke: string
  innerStroke: string
  /** Stroke width multiplier */
  strokeScale?: number
}

function SingleCloud({
  x,
  y,
  scale,
  opacity,
  path,
  gradientId,
  outerStroke,
  centerStroke,
  innerStroke,
  strokeScale = 1,
}: SingleCloudProps) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      opacity={opacity}
      data-name={`Cloud at scale ${scale}`}
    >
      {/* Outer stroke */}
      <path
        d={path}
        stroke={outerStroke}
        strokeMiterlimit="10"
        strokeWidth={12 * strokeScale}
        strokeLinecap="round"
        fill={`url(#${gradientId})`}
      />
      {/* Center stroke */}
      <path
        d={path}
        stroke={centerStroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeWidth={5 * strokeScale}
        fill={`url(#${gradientId})`}
      />
      {/* Inner stroke */}
      <path
        d={path}
        stroke={innerStroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeWidth={2 * strokeScale}
        fill={`url(#${gradientId})`}
      />
    </g>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export interface CloudStackProps {
  /** Number of cloud layers (default: 3) */
  layers?: number
  /** CSS class for the container */
  className?: string
  /** Inline styles for the container */
  style?: React.CSSProperties
}

/**
 * Stacked clouds with depth effect
 *
 * Features:
 * - 1:2:3 size progression
 * - Three-layer border stacking for each cloud
 * - Theme-aware gradient fills
 * - Opacity-based depth
 */
export function CloudStack({ layers = 3, className, style }: CloudStackProps) {
  const {
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  } = useVectorGraphicColors()

  const gradientId = "cloud-stack-gradient"

  // Cloud path - generic fluffy cloud
  const cloudPath =
    "M120,45A47,47,0,0,0,30,33,38,38,0,0,0,35,108H120a32,32,0,0,0,32-32A31,31,0,0,0,120,45Z"

  // Cloud layer configuration (1:2:3 pattern)
  const cloudLayers = [
    { x: 70, y: 0, scale: 0.4, opacity: 0.3 }, // Small, far back
    { x: 35, y: 25, scale: 0.6, opacity: 0.5 }, // Medium, middle
    { x: 0, y: 55, scale: 1, opacity: 1 }, // Large, front
  ].slice(-layers) // Only take the requested number of layers

  return (
    <Box className={className} style={style} sx={{
      height: "100%"
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 180"
        overflow="visible"
        width="100%"
        height="100%"
        data-component="CloudStack"
      >
        <defs>
          <BackgroundGradient id={gradientId} />
        </defs>

        <g id="CloudStack_Container" data-name="Cloud Stack Container">
          {cloudLayers.map((layer, index) => (
            <SingleCloud
              key={index}
              x={layer.x}
              y={layer.y}
              scale={layer.scale}
              opacity={layer.opacity}
              path={cloudPath}
              gradientId={gradientId}
              outerStroke={threeLayerOuterStroke}
              centerStroke={threeLayerCenterStroke}
              innerStroke={threeLayerInnerStroke}
              strokeScale={1 / layer.scale} // Keep stroke consistent across scales
            />
          ))}
        </g>
      </svg>
    </Box>
  );
}

export default CloudStack
