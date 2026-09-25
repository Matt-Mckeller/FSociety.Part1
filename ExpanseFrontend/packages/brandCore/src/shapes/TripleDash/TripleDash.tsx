/**
 * TripleDash - Decorative SVG component with three parallel lines in 1:2:3 ratio
 *
 * Originally from: packages/ui/theme/components/TripleDash
 * Migration to: @expanse/brand-core
 *
 * Used for branding, section dividers, and artistic decorations.
 * Fully responsive with animations and customizable orientation.
 */

"use client"

import { Box, useTheme } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  getLineAnimationStyles,
  prefersReducedMotion,
} from "./TripleDash.animations"
import { TripleDashProps } from "./TripleDash.types"
import {
  calculateLines,
  calculateProportionalGap,
  resolveColor,
} from "./TripleDash.utils"

/**
 * TripleDash - Three parallel lines component
 *
 * @example
 * // Basic usage
 * <Box sx={{ width: '200px', height: '20px' }}>
 *   <TripleDash />
 * </Box>
 *
 * @example
 * // Vertical with animation
 * <Box sx={{ width: '20px', height: '200px' }}>
 *   <TripleDash
 *     orientation="vertical"
 *     animation={{ type: 'stagger-in' }}
 *   />
 * </Box>
 *
 * @example
 * // Custom colors per line
 * <TripleDash color={['#ff0000', '#00ff00', '#0000ff']} />
 */
export const TripleDash = ({
  orientation = "horizontal",
  align = "end",
  order = "ascending",
  strokeWidth = 3,
  gap,
  borderRadius,
  color = "text.primary",
  animation,
  sx,
  svgProps,
  "data-testid": testId,
}: TripleDashProps) => {
  const theme = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  // Animation settings with defaults
  const animationType = animation?.type ?? "none"
  const animationDuration = animation?.duration ?? 300
  const animationStaggerDelay = animation?.staggerDelay ?? 100
  const animationEasing = animation?.easing ?? "ease-out"
  const animateOnView = animation?.animateOnView ?? false
  const animateOnHover = animation?.animateOnHover ?? false

  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  // Measure container size with ResizeObserver
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateSize = () => {
      const rect = element.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }

    // Initial measurement
    updateSize()

    // Watch for resize
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // Calculate gap - proportional to container size
  const effectiveGap =
    gap ??
    (containerSize
      ? calculateProportionalGap(
          orientation === "horizontal"
            ? containerSize.width
            : containerSize.height,
        )
      : 5)

  // Calculate border radius - default to fully rounded (half of strokeWidth)
  const effectiveBorderRadius = borderRadius ?? strokeWidth / 2

  // Calculate line positions based on actual container size
  const lines = containerSize
    ? calculateLines(
        containerSize.width,
        containerSize.height,
        orientation,
        align,
        order,
        strokeWidth,
        effectiveGap,
      )
    : []

  // IntersectionObserver for animateOnView
  useEffect(() => {
    if (!animateOnView || animationType === "none") {
      setIsInView(true)
      return
    }

    const element = containerRef.current
    if (!element) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [animateOnView, animationType])

  // Handle hover animation
  const handleMouseEnter = useCallback(() => {
    if (animateOnHover && animationType !== "none") {
      setIsHovered(true)
      setAnimationKey((k) => k + 1)
    }
  }, [animateOnHover, animationType])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // Determine if animation should be active
  const shouldAnimate =
    !reducedMotion &&
    animationType !== "none" &&
    (isInView || (animateOnHover && isHovered))

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={testId}
    >
      {containerSize && (
        <svg
          width={containerSize.width}
          height={containerSize.height}
          viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
          role="presentation"
          aria-hidden="true"
          style={{ display: "block" }}
          {...svgProps}
        >
          {lines.map((line, index) => {
            const lineColor = resolveColor(color, index, theme)
            const animationStyles = getLineAnimationStyles(
              animationType,
              index,
              animationDuration,
              animationStaggerDelay,
              animationEasing,
              align,
              orientation,
              shouldAnimate,
            )

            return (
              <rect
                key={`${animationKey}-${index}`}
                x={line.x}
                y={line.y}
                width={line.width}
                height={line.height}
                rx={effectiveBorderRadius}
                ry={effectiveBorderRadius}
                fill={lineColor}
                style={animationStyles}
              />
            )
          })}
        </svg>
      )}
    </Box>
  )
}

export default TripleDash
