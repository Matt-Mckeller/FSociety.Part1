/**
 * PulsatingCircle - Animated expanding/contracting rings
 *
 * Originally: AnimatedExpandingCircle
 * Migration from: packages/dynamicAssets/graphics/AnimatedExpandingCircle.component.tsx
 *
 * Pulsating ring effect with GSAP animation.
 */

"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { useTheme } from "@mui/system"

export interface PulsatingCircleProps {
  /** Ring color (defaults to theme text color) */
  color?: string
  /** Center circle size */
  centerCircleSize?: number
  /** Jump amount per ring */
  jumpAmount?: number
  /** Number of rings (1-4) */
  ringCount?: 1 | 2 | 3 | 4
  /** Animation speed multiplier */
  timeScale?: number
  /** Custom class name */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
}

const PREFIX = "pulsating-circle-"

export function PulsatingCircle({
  color,
  centerCircleSize = 7.5,
  jumpAmount = 5,
  ringCount = 3,
  timeScale = 0.5,
  className,
  style,
}: PulsatingCircleProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()
  const theme = useTheme()

  const resolvedColor = color || theme.palette.text.primary

  useEffect(() => {
    if (!svgRef.current) return

    const svgSelector = gsap.utils.selector(svgRef)
    const rings = svgSelector(`.${PREFIX}ring`)
    const ringsInReverse = [...rings].reverse()

    const timeline = gsap.timeline({ repeat: -1, yoyo: true, delay: 0 })
    timelineRef.current = timeline

    timeline.timeScale(timeScale)

    timeline
      .to(rings, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        stagger: 0.25,
        ease: "power2",
      })
      .to(ringsInReverse, {
        opacity: 1,
        duration: 0.5,
        delay: 0,
        stagger: 0.25,
        ease: "power2",
      })

    return () => {
      timeline.kill()
    }
  }, [timeScale])

  // Calculate ring radii
  const jumpIncrement = 0
  const rings: number[] = []
  for (let i = ringCount; i >= 1; i--) {
    rings.push(centerCircleSize + jumpAmount * i + jumpIncrement * (i - 1))
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      ref={svgRef}
      className={className}
      style={style}
    >
      <g>
        {/* Rings (outer to inner) */}
        {rings.map((radius, index) => (
          <circle
            key={index}
            className={`${PREFIX}ring`}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={resolvedColor}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.432"
          />
        ))}

        {/* Center filled circle */}
        <g>
          <circle
            className={`${PREFIX}filled-center`}
            cx="50"
            cy="50"
            r={centerCircleSize}
            fill={resolvedColor}
          />
        </g>
      </g>
    </svg>
  )
}
