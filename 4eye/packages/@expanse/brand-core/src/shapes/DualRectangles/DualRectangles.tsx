/**
 * DualRectangles - Pair of rectangles (stroke + filled) with scroll animation
 *
 * Originally: DualRecoGroup1
 * Migration from: packages/dynamicAssets/shapes/DualRectGroup1.tsx
 */

"use client"

import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "@mui/system"
import gsap from "gsap"
import { useBrandContext } from "../../context/BrandContext"

type FillVersionOptions = "white" | "background" | "primary" | "custom"
type StrokeVersionOptions = "white" | "contrastBG" | "background" | "custom"

export interface DualRectanglesProps {
  id?: string
  /** Fill color preset or custom */
  fillVersion?: FillVersionOptions
  /** Stroke color preset or custom */
  strokeVersion?: StrokeVersionOptions
  /** Custom fill color (overrides fillVersion) */
  fillColor?: string
  /** Custom stroke color (overrides strokeVersion) */
  strokeColor?: string
  /** Center X coordinate (default: 0, set to viewBox center for proper display) */
  centerX?: number
  /** Center Y coordinate (default: 0, set to viewBox center for proper display) */
  centerY?: number
  /** Enable scroll animation */
  enableScrollAnimation?: boolean
  /** Custom class name */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
}

export function DualRectangles({
  id = "dual-rectangles",
  fillVersion = "primary",
  strokeVersion = "contrastBG",
  fillColor: customFillColor,
  strokeColor: customStrokeColor,
  centerX = 0,
  centerY = 0,
  enableScrollAnimation = true,
  className,
  style,
}: DualRectanglesProps) {
  const theme = useTheme()
  const { resolveColor } = useBrandContext()
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0)
  const setPreviousScrollPositionRef = useRef(setPreviousScrollPosition)
  const previousScrollPositionRef = useRef(previousScrollPosition)
  const timelineRef = useRef(gsap.timeline())

  // Dimensions
  const smallDiameter = 7.22
  const bigDiameter = 8.68

  // Resolve fill color
  let fillColor = customFillColor
  if (!fillColor) {
    switch (fillVersion) {
      case "background":
        fillColor = theme.palette.background.default
        break
      case "white":
        fillColor = theme.palette.common.white
        break
      case "primary":
      default:
        fillColor = resolveColor("primaryColor")
        break
    }
  }

  // Resolve stroke color
  let strokeColor = customStrokeColor
  if (!strokeColor) {
    switch (strokeVersion) {
      case "white":
        strokeColor = theme.palette.common.white
        break
      case "background":
        strokeColor = theme.palette.background.default
        break
      case "contrastBG":
      default:
        strokeColor = theme.palette.background?.contrastBG ?? fillColor
        break
    }
  }

  // Update refs
  setPreviousScrollPositionRef.current = setPreviousScrollPosition
  previousScrollPositionRef.current = previousScrollPosition

  useEffect(() => {
    if (!enableScrollAnimation) return

    const timeline = gsap.timeline()
    timelineRef.current = timeline

    const upAnimationTween = gsap.to(`#${id}`, {
      x: 5,
      y: -5,
      duration: 1,
    })
    const downAnimationTween = gsap.to(`#${id}`, {
      x: 0,
      y: 0,
      duration: 1,
      delay: 1,
    })

    timeline.add(upAnimationTween)
    timeline.add(downAnimationTween)

    const onScroll = () => {
      const scrollPosition = window.scrollY
      const scrollingUp = scrollPosition < previousScrollPositionRef.current
      setPreviousScrollPositionRef.current(window.scrollY)
      // Optionally trigger animation based on scroll direction
    }

    if (typeof window !== "undefined") {
      document.addEventListener("scroll", onScroll)
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [id, enableScrollAnimation])

  return (
    <g
      id={id}
      className={className}
      style={style}
      transform={`translate(${centerX}, ${centerY})`}
    >
      {/* Stroke rectangle */}
      <rect
        width={bigDiameter}
        height={bigDiameter}
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
      />

      {/* Filled rectangle */}
      <rect
        width={smallDiameter}
        height={smallDiameter}
        fill={fillColor}
        x={bigDiameter / 2}
        y={-bigDiameter / 3}
      />
    </g>
  )
}
