/**
 * GrowthCloud - Cloud nurturing growth below
 *
 * A decorative cloud graphic with raindrops nurturing a growing plant.
 * Represents growth, nurturing, learning, and development.
 *
 * ## Design Patterns Used
 *
 * ### Three-Layer Border Stacking
 * Cloud uses the standard three-layer border pattern
 *
 * ### Growth Symbol
 * Plant/sprout below showing 1:2:3 growth stages
 *
 * ### Animated Raindrops
 * Gentle rain connecting cloud to growth
 */

"use client"

import React, { useEffect, useRef } from "react"
import { Box, useTheme } from "@mui/material"
import { gsap } from "gsap"

import { BackgroundGradient } from "../../primitives/gradients"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// RAINDROP SUBCOMPONENT
// ============================================================

interface RaindropProps {
  x: number
  y: number
  size: number
  color: string
}

function Raindrop({ x, y, size, color }: RaindropProps) {
  // Teardrop shape
  const path = `M${x},${y} 
    q${size * 0.3},-${size} ${size * 0.5},0 
    q${size * 0.2},${size} -${size * 0.5},${size * 0.8}
    q-${size * 0.7},-${size * 0.8} 0,-${size * 0.8}z`

  return <path className="raindrop" d={path} fill={color} opacity={0.7} />
}

// ============================================================
// GROWING PLANT SUBCOMPONENT
// ============================================================

interface GrowingPlantProps {
  x: number
  y: number
  stemColor: string
  leafColor: string
  /** Growth stage 1-3 */
  stage?: number
}

function GrowingPlant({
  x,
  y,
  stemColor,
  leafColor,
  stage = 3,
}: GrowingPlantProps) {
  // Sizes based on 1:2:3 growth pattern
  const heights = [15, 30, 50]
  const leafSizes = [6, 10, 16]

  const height = heights[Math.min(stage - 1, 2)]
  const leafSize = leafSizes[Math.min(stage - 1, 2)]

  return (
    <g data-name="Growing Plant" transform={`translate(${x}, ${y})`}>
      {/* Stem */}
      <path
        d={`M0,0 Q2,-${height * 0.3} 0,-${height * 0.6} Q-2,-${height * 0.8} 0,-${height}`}
        stroke={stemColor}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaves - show more leaves at higher stages */}
      {stage >= 1 && (
        <ellipse
          cx={leafSize * 0.6}
          cy={-height * 0.3}
          rx={leafSize * 0.8}
          ry={leafSize * 0.4}
          fill={leafColor}
          transform={`rotate(25, ${leafSize * 0.6}, ${-height * 0.3})`}
        />
      )}
      {stage >= 2 && (
        <ellipse
          cx={-leafSize * 0.5}
          cy={-height * 0.6}
          rx={leafSize * 0.7}
          ry={leafSize * 0.35}
          fill={leafColor}
          transform={`rotate(-30, ${-leafSize * 0.5}, ${-height * 0.6})`}
        />
      )}
      {stage >= 3 && (
        <>
          <ellipse
            cx={leafSize * 0.4}
            cy={-height * 0.85}
            rx={leafSize * 0.6}
            ry={leafSize * 0.3}
            fill={leafColor}
            transform={`rotate(15, ${leafSize * 0.4}, ${-height * 0.85})`}
          />
          {/* Top bud */}
          <ellipse
            cx={0}
            cy={-height - 3}
            rx={leafSize * 0.4}
            ry={leafSize * 0.5}
            fill={leafColor}
          />
        </>
      )}

      {/* Ground */}
      <ellipse cx={0} cy={2} rx={12} ry={4} fill={stemColor} opacity={0.3} />
    </g>
  )
}

// ============================================================
// ANIMATION HELPERS
// ============================================================

interface AnimationConfig {
  /** Animation speed multiplier (default: 0.3) */
  timeScale?: number
  /** Whether animations are enabled (default: true) */
  enabled?: boolean
}

function addRaindropAnimations(
  timeline: gsap.core.Timeline,
  raindrops: Element[],
) {
  raindrops.forEach((drop, i) => {
    // Falling animation
    timeline.to(
      drop,
      {
        y: 40,
        opacity: 0,
        duration: 2,
        ease: "power1.in",
        repeat: -1,
        delay: i * 0.4,
      },
      0,
    )
  })
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export interface GrowthCloudProps {
  /** Growth stage 1-3 */
  growthStage?: 1 | 2 | 3
  /** Animation configuration */
  animation?: AnimationConfig
  /** CSS class for the container */
  className?: string
  /** Inline styles for the container */
  style?: React.CSSProperties
}

/**
 * Cloud nurturing growth below
 *
 * Features:
 * - Three-layer border stacking for depth
 * - Theme-aware gradient fill
 * - Animated raindrops with GSAP
 * - Growing plant with 1:2:3 stages
 */
export function GrowthCloud({
  growthStage = 3,
  animation = { timeScale: 0.3, enabled: true },
  className,
  style,
}: GrowthCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()
  const theme = useTheme()

  const {
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  } = useVectorGraphicColors()

  const gradientId = "growth-cloud-gradient"

  // Cloud path - soft, nurturing shape
  const cloudPath =
    "M110,40A43,43,0,0,0,26,30,35,35,0,0,0,30,100H110a28,28,0,0,0,28-28A27,27,0,0,0,110,40Z"

  // Colors
  const raindropColor = theme.palette.info?.main ?? theme.palette.primary.light
  const stemColor = theme.palette.success.dark
  const leafColor = theme.palette.success.main

  // Initialize animations
  useEffect(() => {
    if (!animation.enabled || !svgRef.current) {
      return undefined
    }

    const q = gsap.utils.selector(svgRef.current)
    const raindrops = q(".raindrop")

    const timeline = gsap.timeline()
    timeline.timeScale(animation.timeScale ?? 0.3)

    if (raindrops.length > 0) {
      addRaindropAnimations(timeline, raindrops as Element[])
    }

    timelineRef.current = timeline

    return () => {
      timeline.kill()
    }
  }, [animation.enabled, animation.timeScale])

  return (
    <Box className={className} style={style} sx={{
      height: "100%"
    }}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 200"
        overflow="visible"
        width="100%"
        height="100%"
        data-component="GrowthCloud"
      >
        <defs>
          <BackgroundGradient id={gradientId} />
        </defs>

        <g id="GrowthCloud_Container" data-name="Growth Cloud Container">
          {/* Cloud Shape with Three-Layer Border */}
          <g id="Cloud" data-name="Cloud Shape" transform="translate(20, 10)">
            {/* LAYER 1: Outer stroke (10px) */}
            <path
              d={cloudPath}
              stroke={threeLayerOuterStroke}
              strokeMiterlimit="10"
              strokeWidth="10"
              strokeLinecap="round"
              fill={`url(#${gradientId})`}
            />
            {/* LAYER 2: Center stroke (4px) */}
            <path
              d={cloudPath}
              stroke={threeLayerCenterStroke}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeWidth="4"
              fill={`url(#${gradientId})`}
            />
            {/* LAYER 3: Inner stroke (1.5px) */}
            <path
              d={cloudPath}
              stroke={threeLayerInnerStroke}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeWidth="1.5"
              fill={`url(#${gradientId})`}
            />
          </g>

          {/* Raindrops */}
          <g id="Raindrops" transform="translate(20, 10)">
            <Raindrop x={45} y={105} size={8} color={raindropColor} />
            <Raindrop x={70} y={100} size={6} color={raindropColor} />
            <Raindrop x={95} y={103} size={7} color={raindropColor} />
          </g>

          {/* Growing Plant */}
          <GrowingPlant
            x={90}
            y={180}
            stemColor={stemColor}
            leafColor={leafColor}
            stage={growthStage}
          />

          {/* Ground line */}
          <line
            x1={50}
            y1={182}
            x2={130}
            y2={182}
            stroke={stemColor}
            strokeWidth={1}
            opacity={0.2}
          />
        </g>
      </svg>
    </Box>
  );
}

export default GrowthCloud
