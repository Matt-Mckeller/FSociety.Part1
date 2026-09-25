/**
 * SunbreakCloud - Cloud with sun rays breaking through
 *
 * A decorative cloud graphic with animated sunlight rays.
 * Represents "darkness to light" / hope / breakthrough.
 *
 * ## Design Patterns Used
 *
 * ### Three-Layer Border Stacking
 * - Outer: 12px - soft glow
 * - Center: 5px - transition
 * - Inner: 2px - definition
 *
 * ### Background Gradient
 * Uses theme-aware diagonal gradient (darkness to light)
 *
 * ### Sun Rays
 * Animated rays breaking through the cloud
 */

"use client"

import React, { useEffect, useRef } from "react"
import { Box, useTheme } from "@mui/material"
import { gsap } from "gsap"

import { BackgroundGradient } from "../../primitives/gradients"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// SUN RAYS SUBCOMPONENT
// ============================================================

interface SunRaysProps {
  cx: number
  cy: number
  innerRadius: number
  outerRadius: number
  rayCount: number
  rayColor: string
  rayWidth: number
}

function SunRays({
  cx,
  cy,
  innerRadius,
  outerRadius,
  rayCount,
  rayColor,
  rayWidth,
}: SunRaysProps) {
  const rays: React.ReactElement[] = []
  const angleStep = (2 * Math.PI) / rayCount

  for (let i = 0; i < rayCount; i++) {
    const angle = i * angleStep - Math.PI / 2 // Start from top
    const x1 = cx + innerRadius * Math.cos(angle)
    const y1 = cy + innerRadius * Math.sin(angle)
    const x2 = cx + outerRadius * Math.cos(angle)
    const y2 = cy + outerRadius * Math.sin(angle)

    rays.push(
      <line
        key={i}
        className="sun-ray"
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={rayColor}
        strokeWidth={rayWidth}
        strokeLinecap="round"
        opacity={0.8}
      />,
    )
  }

  return <g data-name="Sun Rays">{rays}</g>
}

// ============================================================
// ANIMATION HELPERS
// ============================================================

interface AnimationConfig {
  /** Animation speed multiplier (default: 0.5) */
  timeScale?: number
  /** Whether animations are enabled (default: true) */
  enabled?: boolean
}

function addSunRayAnimations(timeline: gsap.core.Timeline, rays: Element[]) {
  // Rotate rays
  timeline.to(
    rays,
    {
      rotation: 360,
      transformOrigin: "50% 50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    },
    0,
  )

  // Pulse rays
  rays.forEach((ray, i) => {
    timeline.to(
      ray,
      {
        opacity: 0.4,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
      },
      0,
    )
  })
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export interface SunbreakCloudProps {
  /** Animation configuration */
  animation?: AnimationConfig
  /** CSS class for the container */
  className?: string
  /** Inline styles for the container */
  style?: React.CSSProperties
}

/**
 * Cloud with sunlight breaking through
 *
 * Features:
 * - Three-layer border stacking for depth
 * - Theme-aware gradient fill
 * - Animated sun rays with GSAP
 * - "Darkness to light" theme
 */
export function SunbreakCloud({
  animation = { timeScale: 0.5, enabled: true },
  className,
  style,
}: SunbreakCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()
  const theme = useTheme()

  const {
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  } = useVectorGraphicColors()

  const gradientId = "sunbreak-cloud-gradient"
  const sunGradientId = "sunbreak-sun-gradient"

  // Cloud path - slightly smaller than lightning cloud
  const cloudPath =
    "M140,52A55,55,0,0,0,37,38,44,44,0,0,0,42,126H140a37,37,0,0,0,37-37A36,36,0,0,0,140,52Z"

  // Sun center position (behind and above the cloud)
  const sunCx = 155
  const sunCy = 30

  // Initialize animations
  useEffect(() => {
    if (!animation.enabled || !svgRef.current) {
      return undefined
    }

    const q = gsap.utils.selector(svgRef.current)
    const rayGroup = q('[data-name="Sun Rays"]')[0]

    const timeline = gsap.timeline()
    timeline.timeScale(animation.timeScale ?? 0.5)

    if (rayGroup) {
      const rays = Array.from(rayGroup.children)
      addSunRayAnimations(timeline, rays)
    }

    timelineRef.current = timeline

    return () => {
      timeline.kill()
    }
  }, [animation.enabled, animation.timeScale])

  // Sun color (golden/amber)
  const sunColor = theme.palette.warning.main ?? "#FFB300"
  const sunGlow = `${sunColor}40`

  return (
    <Box height="100%" className={className} style={style}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 180"
        overflow="visible"
        width="100%"
        height="100%"
        data-component="SunbreakCloud"
      >
        <defs>
          <BackgroundGradient id={gradientId} />
          <radialGradient id={sunGradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={sunColor} />
            <stop offset="70%" stopColor={sunColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={sunColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        <g id="SunbreakCloud_Container" data-name="Sunbreak Cloud Container">
          {/* Sun glow behind cloud */}
          <circle
            cx={sunCx}
            cy={sunCy}
            r={50}
            fill={`url(#${sunGradientId})`}
            opacity={0.6}
          />

          {/* Sun rays (visible around cloud edges) */}
          <g transform={`translate(${sunCx}, ${sunCy})`}>
            <SunRays
              cx={0}
              cy={0}
              innerRadius={25}
              outerRadius={70}
              rayCount={12}
              rayColor={sunColor}
              rayWidth={3}
            />
          </g>

          {/* Sun core */}
          <circle cx={sunCx} cy={sunCy} r={18} fill={sunColor} opacity={0.9} />

          {/* Cloud Shape with Three-Layer Border */}
          <g id="Cloud" data-name="Cloud Shape" transform="translate(15, 30)">
            {/* LAYER 1: Outer stroke (12px) - depth/shadow */}
            <path
              id="CloudOuterStroke"
              data-name="Cloud Outer Layer"
              d={cloudPath}
              stroke={threeLayerOuterStroke}
              strokeMiterlimit="10"
              strokeWidth="12"
              strokeLinecap="round"
              fill={`url(#${gradientId})`}
            />
            {/* LAYER 2: Center stroke (5px) - transition */}
            <path
              id="CloudCenterStroke"
              data-name="Cloud Middle Layer"
              d={cloudPath}
              stroke={threeLayerCenterStroke}
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeWidth="5"
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
              d="M40,124a43,43,0,0,1,0-86l90,86Z"
              opacity="0.08"
              fill={theme.palette.common.black}
              style={{ isolation: "isolate" }}
            />
          </g>

          {/* Sunlight beam coming through */}
          <polygon
            points="170,65 185,140 160,140"
            fill={sunGlow}
            opacity={0.4}
          />
          <polygon
            points="145,55 165,140 135,140"
            fill={sunGlow}
            opacity={0.3}
          />
        </g>
      </svg>
    </Box>
  )
}

export default SunbreakCloud
