"use client"
import { Box, IconButton, alpha, useTheme } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import React, { useState, useMemo, useCallback, useRef, useEffect } from "react"
import gsap from "gsap"
import { useExpanseTheme } from "../../hooks/useExpanseTheme"
import type { ExpanseTheme } from "../../types"
import { EXPANSE_THEMES } from "../../types"

export interface ThemeColorSelectorProps {
  /** Which color themes to show. Default: all themes */
  colors?: ExpanseTheme[]
  /** How many swatches to show at once. Default: 3 */
  visibleCount?: number
  /** Callback when color changes */
  onChange?: (color: ExpanseTheme) => void
  /** Size variant */
  size?: "small" | "medium" | "large"
  /** Show navigation arrows even when all colors fit */
  alwaysShowArrows?: boolean
}

// Size configurations
const SIZES = {
  small: { swatch: 24, gap: 8, arrow: 28, arrowGap: 4 },
  medium: { swatch: 36, gap: 12, arrow: 36, arrowGap: 8 },
  large: { swatch: 48, gap: 16, arrow: 44, arrowGap: 12 },
} as const

// Color palette primary colors for each theme
const THEME_COLORS: Record<ExpanseTheme, string> = {
  purple: "#7C4DFF",
  blue: "#2196F3",
  green: "#4CAF50",
  orange: "#FF9800",
  red: "#F44336",
  teal: "#009688",
  gamified: "#00d4ff", // Electric cyan
  "gamified-desaturated": "#8BA8B3", // Muted blue-gray
  neon: "#00d4ff", // Electric cyan
  mono: "#6B6B6B", // Neutral gray
}

// Friendly names for each theme
const THEME_NAMES: Record<ExpanseTheme, string> = {
  purple: "Purple",
  blue: "Blue",
  green: "Green",
  orange: "Orange",
  red: "Red",
  teal: "Teal",
  gamified: "Gamified",
  "gamified-desaturated": "Soft",
  neon: "Neon",
  mono: "Mono",
}

/**
 * Carousel-style color theme selector with smooth gsap animation.
 * 
 * Uses a continuous strip animation - swatches slide smoothly from 
 * start to end position like a conveyor belt.
 *
 * @example
 * ```tsx
 * // Show all themes
 * <ThemeColorSelector />
 *
 * // Show specific themes
 * <ThemeColorSelector colors={['primary', 'blue', 'green']} />
 *
 * // Customize visible count
 * <ThemeColorSelector visibleCount={5} />
 * ```
 */
export function ThemeColorSelector({
  colors = EXPANSE_THEMES,
  visibleCount = 3,
  onChange,
  size = "medium",
  alwaysShowArrows = false,
}: ThemeColorSelectorProps) {
  const muiTheme = useTheme()
  const { themeSelection, setThemeSelection } = useExpanseTheme()

  // Current carousel offset (which color is first in the visible window)
  const [offset, setOffset] = useState(() => {
    // Initialize offset to center the selected color
    const selectedIndex = colors.indexOf(themeSelection)
    if (selectedIndex === -1) return 0
    const centerIndex = Math.floor(visibleCount / 2)
    return (selectedIndex - centerIndex + colors.length) % colors.length
  })
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Refs for gsap animation
  const stripRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)
  const isInternalChange = useRef(false)

  const { swatch: swatchSize, gap, arrow: arrowSize, arrowGap } = SIZES[size]

  // Calculate if we need arrows
  const needsArrows = alwaysShowArrows || colors.length > visibleCount
  const effectiveVisibleCount = Math.min(visibleCount, colors.length)

  // Padding to prevent border/scale clipping (5px ring + scale buffer)
  const overflowPadding = 8

  // Calculate fixed container width (including padding for overflow)
  const swatchAreaWidth = (swatchSize * effectiveVisibleCount) + (gap * (effectiveVisibleCount - 1))
  const swatchAreaWidthWithPadding = swatchAreaWidth + (overflowPadding * 2)
  const totalWidth = needsArrows 
    ? swatchAreaWidthWithPadding + (arrowSize * 2) + (arrowGap * 2)
    : swatchAreaWidthWithPadding

  // One step = one swatch width + gap
  const stepSize = swatchSize + gap

  // Center position index (0-indexed within visible window)
  const centerIndex = Math.floor(effectiveVisibleCount / 2)

  // Animation duration in seconds
  const ANIMATION_DURATION = 0.3

  // Build the strip of colors to render
  // We render: [buffer left] [all colors starting from offset] [buffer right]
  // This creates the illusion of infinite scrolling
  const stripColors = useMemo(() => {
    const result: { color: ExpanseTheme; key: string }[] = []
    
    // We need enough items to fill the view plus buffers for animation
    // Render (visibleCount + 2) items: 1 buffer left, visible, 1 buffer right
    const totalItems = effectiveVisibleCount + 2
    
    for (let i = -1; i < totalItems - 1; i++) {
      const index = ((offset + i) % colors.length + colors.length) % colors.length
      result.push({ 
        color: colors[index], 
        key: `${i}-${colors[index]}` 
      })
    }
    
    return result
  }, [colors, offset, effectiveVisibleCount])

  // Reset strip position when offset changes (after animation completes)
  useEffect(() => {
    if (stripRef.current) {
      // Position strip so first visible item is at x=0
      gsap.set(stripRef.current, { x: -stepSize })
    }
  }, [offset, stepSize])

  // Center on external themeSelection changes (from other selectors)
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      return // Skip on initial mount (already centered via initial state)
    }
    
    // Skip if this was our own change (we already animated it)
    if (isInternalChange.current) {
      isInternalChange.current = false
      return
    }
    
    const selectedIndex = colors.indexOf(themeSelection)
    if (selectedIndex === -1) return
    
    const targetOffset = (selectedIndex - centerIndex + colors.length) % colors.length
    
    // Snap to target (external change)
    setOffset(targetOffset)
  }, [themeSelection, colors, centerIndex])

  // Navigate left (previous) with animation
  const handlePrevious = useCallback(() => {
    if (isAnimating || !stripRef.current) return
    setIsAnimating(true)
    
    // Animate the strip to the right (revealing previous item)
    gsap.to(stripRef.current, {
      x: 0, // Move right by one step (from -stepSize to 0)
      duration: ANIMATION_DURATION,
      ease: "power2.out",
      onComplete: () => {
        setOffset((prev) => (prev - 1 + colors.length) % colors.length)
        setIsAnimating(false)
      }
    })
  }, [colors.length, isAnimating, stepSize])

  // Navigate right (next) with animation
  const handleNext = useCallback(() => {
    if (isAnimating || !stripRef.current) return
    setIsAnimating(true)
    
    // Animate the strip to the left (revealing next item)
    gsap.to(stripRef.current, {
      x: -stepSize * 2, // Move left by one step (from -stepSize to -stepSize*2)
      duration: ANIMATION_DURATION,
      ease: "power2.out",
      onComplete: () => {
        setOffset((prev) => (prev + 1) % colors.length)
        setIsAnimating(false)
      }
    })
  }, [colors.length, isAnimating, stepSize])

  // Select a color and center it
  const handleSelect = useCallback(
    (color: ExpanseTheme) => {
      // Mark as internal change so the sync effect doesn't also try to center
      isInternalChange.current = true
      setThemeSelection(color)
      onChange?.(color)
      
      // Calculate offset to center selected color
      const selectedIndex = colors.indexOf(color)
      if (selectedIndex === -1) return
      
      // Target offset: selected color at center position
      const targetOffset = (selectedIndex - centerIndex + colors.length) % colors.length
      
      if (targetOffset === offset) return // Already centered
      
      // Calculate shortest path (left or right)
      const forwardSteps = (targetOffset - offset + colors.length) % colors.length
      const backwardSteps = (offset - targetOffset + colors.length) % colors.length
      
      // Choose direction with fewer steps
      const useForward = forwardSteps <= backwardSteps
      const totalSteps = useForward ? forwardSteps : backwardSteps
      
      if (totalSteps === 0 || isAnimating) return
      
      // For multi-step, animate step by step
      setIsAnimating(true)
      let currentStep = 0
      
      const animateStep = () => {
        if (!stripRef.current) return
        
        const isForward = useForward
        const targetX = isForward ? -stepSize * 2 : 0
        
        gsap.to(stripRef.current, {
          x: targetX,
          duration: ANIMATION_DURATION / Math.max(1, totalSteps / 2), // Speed up for multiple steps
          ease: "power2.out",
          onComplete: () => {
            currentStep++
            setOffset((prev) => {
              const next = isForward 
                ? (prev + 1) % colors.length 
                : (prev - 1 + colors.length) % colors.length
              return next
            })
            
            if (currentStep < totalSteps) {
              // Need to wait for React to update before next step
              requestAnimationFrame(() => {
                if (stripRef.current) {
                  gsap.set(stripRef.current, { x: -stepSize })
                  animateStep()
                }
              })
            } else {
              setIsAnimating(false)
            }
          }
        })
      }
      
      animateStep()
    },
    [setThemeSelection, onChange, colors, offset, centerIndex, isAnimating, stepSize]
  )

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        width: totalWidth,
        gap: `${arrowGap}px`,
      }}
    >
      {/* Left arrow */}
      {needsArrows && (
        <IconButton
          size="small"
          onClick={handlePrevious}
          disabled={isAnimating}
          aria-label="Previous color"
          sx={{
            width: arrowSize,
            height: arrowSize,
            flexShrink: 0,
            color: muiTheme.palette.text.secondary,
            "&:hover": {
              color: muiTheme.palette.text.primary,
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      {/* Color swatches viewport (overflow hidden with padding for borders) */}
      <Box
        sx={{
          width: swatchAreaWidthWithPadding,
          height: swatchSize + (overflowPadding * 2),
          padding: `${overflowPadding}px`,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Animated strip */}
        <Box
          ref={stripRef}
          sx={{
            display: "flex",
            gap: `${gap}px`,
            // Initial position: offset by one step so buffer item is hidden
            transform: `translateX(-${stepSize}px)`,
          }}
        >
          {stripColors.map(({ color, key }) => {
            const isSelected = color === themeSelection
            const primaryColor = THEME_COLORS[color]

            return (
              <Box
                key={key}
                onClick={() => handleSelect(color)}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Select ${THEME_NAMES[color]} theme`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleSelect(color)
                  }
                }}
                sx={{
                  width: swatchSize,
                  height: swatchSize,
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: primaryColor,
                  cursor: "pointer",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: isSelected
                    ? `0 0 0 3px ${muiTheme.palette.background.paper}, 0 0 0 5px ${primaryColor}`
                    : "none",
                  transform: isSelected ? "scale(1.1)" : "scale(1)",
                  "&:hover": {
                    transform: "scale(1.15)",
                    boxShadow: `0 0 0 3px ${muiTheme.palette.background.paper}, 0 0 0 5px ${alpha(primaryColor, 0.5)}`,
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${muiTheme.palette.primary.main}`,
                    outlineOffset: 4,
                  },
                  // Checkmark for selected state
                  "&::after": isSelected
                    ? {
                        content: '"✓"',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontSize: swatchSize * 0.5,
                        fontWeight: "bold",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }
                    : {},
                }}
              />
            )
          })}
        </Box>
      </Box>

      {/* Right arrow */}
      {needsArrows && (
        <IconButton
          size="small"
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Next color"
          sx={{
            width: arrowSize,
            height: arrowSize,
            flexShrink: 0,
            color: muiTheme.palette.text.secondary,
            "&:hover": {
              color: muiTheme.palette.text.primary,
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>
  )
}
