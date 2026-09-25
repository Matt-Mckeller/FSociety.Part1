/**
 * LighteningCloud - Cloud with animated lightning bolts
 *
 * A decorative cloud graphic with animated rain/lightning effects.
 * Demonstrates the three-layer border pattern and theme-aware gradients.
 *
 * ## Design Patterns Used
 *
 * ### Three-Layer Border Stacking
 * The cloud uses three overlapping paths with different stroke widths:
 * - Outer: 14px - creates depth/shadow effect
 * - Center: 6px - transition layer
 * - Inner: 2px - crisp edge definition
 *
 * ### Background Gradient
 * Uses theme-aware diagonal gradient (darkness to light)
 *
 * ### Geometric Alignment Lines
 * Includes decorative DualCircles connected by alignment lines
 */

"use client"

import React, { useEffect, useRef } from "react"
import { Box, useTheme } from "@mui/material"
import { gsap } from "gsap"

import { DualCircles, DualRectangles } from "../../shapes"
import { BackgroundGradient } from "../../primitives/gradients"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// LIGHTNING GROUP SUBCOMPONENT
// ============================================================

function LighteningGroup() {
  const theme = useTheme()
  // Use paper color as fallback for custom background extensions
  const bgExtended = theme.palette.background as unknown as Record<string, string>
  const lighteningPathColor = bgExtended?.offsetBG ?? theme.palette.grey[500]
  const raindropColor = bgExtended?.offsetBG ?? theme.palette.grey[500]

  return (
    <g id="Lightening" transform="translate(0 -10)" data-name="Lightning Effects">
      <g id="Lightening_5" data-name="Lightning Bolt 5">
        <path
          id="Trail_5"
          data-name="Trail 5"
          d="M150.55,139.66v22L139,168.49l.1,16.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_5"
          data-name="Raindrop 5"
          cx="139.05"
          cy="190.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_4" data-name="Lightning Bolt 4">
        <path
          id="Trail_4"
          data-name="Trail 4"
          d="M128.55,139.66v21L117,167.49l.1,6.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_4"
          data-name="Raindrop 4"
          cx="117.05"
          cy="180.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_3" data-name="Lightning Bolt 3">
        <line
          id="Trail_3"
          data-name="Trail 3"
          x1="96.95"
          y1="139.49"
          x2="97.04"
          y2="185.17"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_3"
          data-name="Raindrop 3"
          cx="97.05"
          cy="190.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_2" data-name="Lightning Bolt 2">
        <path
          id="Trail_2"
          data-name="Trail 2"
          d="M85.55,139.66v11L74,157.49l.1,16.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_2"
          data-name="Raindrop 2"
          cx="74.05"
          cy="180.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
      <g id="Lightening_1" data-name="Lightning Bolt 1">
        <path
          id="Trail_1"
          data-name="Trail 1"
          d="M63.55,139.66v31L52,177.49l.1,6.67"
          transform="translate(0)"
          fill="none"
          stroke={lighteningPathColor}
          strokeMiterlimit="10"
          strokeWidth="0.5"
        />
        <circle
          id="Raindrop_1"
          data-name="Raindrop 1"
          cx="52.05"
          cy="190.16"
          r="5.5"
          fill="none"
          stroke={raindropColor}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </g>
    </g>
  )
}

// ============================================================
// ANIMATION HELPERS
// ============================================================

interface AnimationConfig {
  /** Animation speed multiplier (default: 0.25) */
  timeScale?: number
  /** Whether animations are enabled (default: true) */
  enabled?: boolean
}

function addLighteningAnimations(
  timeline: gsap.core.Timeline,
  boltElements: Element[],
  boltGroups: Element[]
) {
  const pulseAnimation = {
    strokeWidth: "3px",
    duration: 0.5,
    repeatDelay: 0.5,
    ease: "power1.in",
    repeat: -1,
  }

  const strikeAnimation = {
    duration: 1,
    y: -10,
    ease: "power1",
    repeatDelay: 0,
    repeat: -1,
    yoyo: true,
  }

  // Bolt 5
  timeline.from(boltElements[0], { ...pulseAnimation, repeatDelay: 0.5 }, 0.5)
  timeline.to(boltGroups[0], { ...strikeAnimation, repeatDelay: 0.5 }, 0.5)

  // Bolt 4
  timeline.from(boltElements[1], pulseAnimation, 0.75)
  timeline.to(boltGroups[1], strikeAnimation, 0.75)

  // Bolt 3
  timeline.from(boltElements[2], { ...pulseAnimation, repeatDelay: 0.5 }, 0.5)
  timeline.to(boltGroups[2], { ...strikeAnimation, repeatDelay: 0.5, y: -20 }, 0.5)

  // Bolt 2
  timeline.from(boltElements[3], pulseAnimation, 0)
  timeline.to(boltGroups[3], strikeAnimation, 0)

  // Bolt 1
  timeline.from(boltElements[4], pulseAnimation, 0)
  timeline.to(boltGroups[4], { ...strikeAnimation, y: -15 }, 0)
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export interface LighteningCloudProps {
  /** Animation configuration */
  animation?: AnimationConfig
  /** CSS class for the container */
  className?: string
  /** Inline styles for the container */
  style?: React.CSSProperties
}

/**
 * Cloud with animated lightning effects
 *
 * Features:
 * - Three-layer border stacking for depth
 * - Theme-aware gradient fill
 * - Animated lightning bolts with GSAP
 * - Decorative geometric shapes with alignment lines
 */
export function LighteningCloud({
  animation = { timeScale: 0.25, enabled: true },
  className,
  style,
}: LighteningCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()
  const theme = useTheme()

  const {
    shapeStrokeColor,
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  } = useVectorGraphicColors()

  const gradientId = "lightening-cloud-gradient"

  // Cloud path (used for all three layers)
  const cloudPath = "M161.17,57.06A61.79,61.79,0,0,0,45.65,40.56,49.46,49.46,0,0,0,51,139.19H158.29a41.39,41.39,0,0,0,41.26-41.27A40.76,40.76,0,0,0,161.17,57.06Z"

  // Initialize animations
  useEffect(() => {
    if (!animation.enabled || !svgRef.current) {
      return undefined
    }

    const q = gsap.utils.selector(svgRef.current)
    const boltElements = q("#Lightening path, #Lightening line")
    const boltGroups = q("#Lightening g")

    const timeline = gsap.timeline()
    timeline.timeScale(animation.timeScale ?? 0.25)

    addLighteningAnimations(timeline, boltElements as Element[], boltGroups as Element[])

    timelineRef.current = timeline

    return () => {
      timeline.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation.enabled, animation.timeScale])

  return (
    <Box className={className} style={style} sx={{
      height: "100%"
    }}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 251.15 197.16"
        overflow="visible"
        width="100%"
        height="100%"
        data-component="LighteningCloud"
      >
        <defs>
          <BackgroundGradient id={gradientId} />
        </defs>

        <g id="LighteningCloud_Container" data-name="Lightning Cloud Container">
          {/* Lightning Effects */}
          <g transform="translate(12,0)">
            <LighteningGroup />
          </g>

          {/* Cloud Shape with Three-Layer Border */}
          <g id="Cloud" data-name="Cloud Shape" transform="translate(12,0)">
            {/* LAYER 1: Outer stroke (14px) - depth/shadow */}
            <path
              id="CloudOuterStroke"
              data-name="Cloud Outer Layer"
              d={cloudPath}
              stroke={threeLayerOuterStroke}
              strokeMiterlimit="10"
              strokeWidth="14"
              strokeLinecap="round"
              fill={`url(#${gradientId})`}
            />
            {/* LAYER 2: Center stroke (6px) - transition */}
            <path
              id="CloudCenterStroke"
              data-name="Cloud Middle Layer"
              d={cloudPath}
              stroke={threeLayerCenterStroke}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeWidth="6"
              fill={`url(#${gradientId})`}
            />
            {/* LAYER 3: Inner stroke (2px) - definition */}
            <path
              id="CloudInnerStroke"
              data-name="Cloud Inner Layer"
              d={cloudPath}
              stroke={threeLayerInnerStroke}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeWidth="2"
              fill={`url(#${gradientId})`}
            />
            {/* Shading overlay for depth */}
            <path
              id="CloudShadingOverlay"
              data-name="Cloud Shading Overlay"
              d="M48.55,137.66a48,48,0,0,1,0-96l102,96Z"
              opacity="0.1"
              fill={theme.palette.common.black}
              style={{ isolation: "isolate" }}
            />
          </g>

          {/* Decorative Geometric Shapes with Alignment Lines */}
          <g id="DecorativeShapes" data-name="Geometric Accents">
            {/* Left circle group (white variant) */}
            <g
              id="LeftCircleGroup"
              transform="translate(39, 110) scale(0.75)"
              data-name="Left Dual Circles"
            >
              <DualCircles id="Left_Circle_Group" fillVersion="white" />
            </g>

            {/* Horizontal alignment line with rectangles */}
            <g
              id="HorizontalLineWithShapes"
              data-name="Horizontal Alignment Line"
            >
              <rect
                id="HorizontalLine"
                data-name="Alignment Line"
                x="5.53"
                y="139.38"
                width="65.9"
                height="0.52"
                fill={shapeStrokeColor}
              />
              <g transform="translate(0, 139)">
                <DualRectangles
                  id="BottomLeftRectangles"
                  strokeVersion="contrastBG"
                />
              </g>
            </g>

            {/* Right circle group */}
            <g
              id="RightCircleGroup"
              transform="translate(183, 135) scale(0.75)"
              data-name="Right Dual Circles"
            >
              <DualCircles id="Right_Circle_Group" />
            </g>
          </g>
        </g>
      </svg>
    </Box>
  );
}
