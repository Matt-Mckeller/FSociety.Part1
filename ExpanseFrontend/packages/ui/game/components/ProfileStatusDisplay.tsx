"use client"

import { Box, BoxProps } from "@mui/material"
import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { CurrencyStatusBarSimple } from "."
import { ProgressStatusBar } from "./status/ProgressStatusBar.component"
import { ProfileIconStatusBarSimple } from "./status/ProfileIconStatusBarSimple.component"
import type { ExpandingBarVisualState } from "../../theme/components/ExpandingBar.component"

export type ProfileStatusDisplayLayout = "staircase" | "horizontal"

/**
 * Display state affects visual appearance:
 * - 'active': Full opacity, always visible (default)
 * - 'interactive': Semi-transparent until hovered/clicked
 * - 'inactive': Dimmed appearance, doesn't draw attention
 */
export type ProfileStatusDisplayState = "active" | "interactive" | "inactive"

/**
 * Expansion trigger for expandable mode:
 * - 'hover': Expand on mouse hover
 * - 'click': Expand on click/tap
 */
export type ExpansionTrigger = "hover" | "click"

/**
 * Direction of expansion when in expandable mode:
 * - 'down': Expands downward (default for staircase)
 * - 'up': Expands upward
 * - 'right': Expands to the right (default for horizontal)
 * - 'left': Expands to the left
 */
export type ExpansionDirection = "down" | "up" | "right" | "left"

export type ProfileStatusDisplayProps = {
  /** Layout variant: 'staircase' (vertical, right-aligned) or 'horizontal' (side by side) */
  layout?: ProfileStatusDisplayLayout
  /** Fixed height for all bars in pixels. Default: 28 */
  barHeight?: number
  /** Display state affecting visual appearance. Default: 'active' */
  displayState?: ProfileStatusDisplayState
  /** Whether the component is expandable. Default: false */
  expandable?: boolean
  /** Trigger for expansion. Default: 'hover' */
  expansionTrigger?: ExpansionTrigger
  /** Direction of expansion. Default: 'down' for staircase, 'right' for horizontal */
  expansionDirection?: ExpansionDirection
  /** Whether to start expanded (only applies when expandable is true). Default: false */
  defaultExpanded?: boolean
  /** Controlled expanded state (overrides internal state if provided) */
  expanded?: boolean
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Additional props passed to the container Box */
  containerProps?: BoxProps
}

// GSAP Animation Configuration
const GSAP_CONFIG = {
  expandDuration: 0.18, // 180ms for fill fade-in
  collapseDuration: 0.12, // 120ms for fill fade-out
  staggerDelay: 0.12, // 120ms delay before bar 3 appears after bar 2
  easeExpand: "power2.out", // Smooth deceleration
  easeCollapse: "power2.in", // Smooth acceleration
  startingFillOpacity: 0.33, // Fill starts at 33% opacity (not invisible)
  startingColorProgress: 0.33, // Color starts 33% toward final color
}

// Legacy animation timing for opacity transitions
const OPACITY_DURATION = 180

// Material Design easing curves (for CSS transitions)
const EASING_EXPAND = "cubic-bezier(0.4, 0, 0.2, 1)"

export const ProfileStatusDisplay = ({
  layout = "staircase",
  barHeight = 28,
  displayState = "active",
  expandable = false,
  expansionTrigger = "hover",
  expansionDirection,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  containerProps,
}: ProfileStatusDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)

  // GSAP animation state for middle fill (outer stroke visible immediately)
  // The bar frame appears instantly, only the middle fill fades in with stagger
  const [currencyFillOpacity, setCurrencyFillOpacity] = useState(
    defaultExpanded ? 1 : 0,
  )
  const [progressFillOpacity, setProgressFillOpacity] = useState(
    defaultExpanded ? 1 : 0,
  )
  // Color progress: 0 = lighter color, 1 = final color
  const [currencyColorProgress, setCurrencyColorProgress] = useState(
    defaultExpanded ? 1 : 0,
  )
  const [progressColorProgress, setProgressColorProgress] = useState(
    defaultExpanded ? 1 : 0,
  )
  // Bar 3 visibility: entirely hidden until stagger delay, then stroke+content appear instantly
  const [progressBarVisible, setProgressBarVisible] = useState(defaultExpanded)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  // Refs to track current values (for collapse animation closure)
  const currencyOpacityRef = useRef(defaultExpanded ? 1 : 0)
  const progressOpacityRef = useRef(defaultExpanded ? 1 : 0)
  const currencyColorRef = useRef(defaultExpanded ? 1 : 0)
  const progressColorRef = useRef(defaultExpanded ? 1 : 0)

  // Keep refs in sync with state
  currencyOpacityRef.current = currencyFillOpacity
  progressOpacityRef.current = progressFillOpacity
  currencyColorRef.current = currencyColorProgress
  progressColorRef.current = progressColorProgress

  // Determine if controlled or uncontrolled
  const isControlled = controlledExpanded !== undefined
  const isExpanded = isControlled ? controlledExpanded : internalExpanded

  // Map displayState to ExpandingBar visualState
  const visualState: ExpandingBarVisualState = useMemo(() => {
    if (displayState === "inactive" && !isHovered) return "inactive"
    if (displayState === "inactive" && isHovered) return "hovered"
    if (displayState === "interactive" && !isHovered) return "inactive"
    if (isHovered) return "hovered"
    return "active"
  }, [displayState, isHovered])

  // Shadow intensity - active when clicked
  const shadowIntensity = useMemo(() => {
    return isClicked ? 1 : 0
  }, [isClicked])

  // Determine effective expansion direction based on layout
  const effectiveDirection = useMemo(() => {
    if (expansionDirection) return expansionDirection
    return layout === "horizontal" ? "right" : "down"
  }, [expansionDirection, layout])

  // GSAP animation for expansion/collapse
  useEffect(() => {
    if (!expandable) return

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    if (isExpanded) {
      // Expand: Bar 2 appears immediately with fill + color fade-in
      // Bar 3 appears entirely after stagger delay, then fill + color fades in
      const tl = gsap.timeline()
      animationRef.current = tl

      // Currency bar (Bar 2) - SET starting values immediately before animating
      // This ensures React state matches GSAP starting point (no visual pop)
      setCurrencyFillOpacity(GSAP_CONFIG.startingFillOpacity)
      setCurrencyColorProgress(GSAP_CONFIG.startingColorProgress)

      const currencyTarget = {
        opacity: GSAP_CONFIG.startingFillOpacity,
        colorProgress: GSAP_CONFIG.startingColorProgress,
      }
      tl.to(
        currencyTarget,
        {
          opacity: 1,
          colorProgress: 1,
          duration: GSAP_CONFIG.expandDuration,
          ease: GSAP_CONFIG.easeExpand,
          onUpdate: () => {
            setCurrencyFillOpacity(currencyTarget.opacity)
            setCurrencyColorProgress(currencyTarget.colorProgress)
          },
        },
        0,
      )

      // Progress bar (Bar 3) - entire bar appears after stagger delay
      // At stagger delay: make visible with starting fill values, then animate to full
      tl.call(
        () => {
          setProgressBarVisible(true)
          setProgressFillOpacity(GSAP_CONFIG.startingFillOpacity)
          setProgressColorProgress(GSAP_CONFIG.startingColorProgress)
        },
        [],
        GSAP_CONFIG.staggerDelay,
      )

      const progressTarget = {
        opacity: GSAP_CONFIG.startingFillOpacity,
        colorProgress: GSAP_CONFIG.startingColorProgress,
      }
      tl.to(
        progressTarget,
        {
          opacity: 1,
          colorProgress: 1,
          duration: GSAP_CONFIG.expandDuration,
          ease: GSAP_CONFIG.easeExpand,
          onUpdate: () => {
            setProgressFillOpacity(progressTarget.opacity)
            setProgressColorProgress(progressTarget.colorProgress)
          },
        },
        GSAP_CONFIG.staggerDelay,
      )
    } else {
      // Collapse: Fills and colors fade out (progress first, then currency)
      const tl = gsap.timeline()
      animationRef.current = tl

      // Progress bar fades out first (use ref to get current values)
      const progressTarget = {
        opacity: progressOpacityRef.current,
        colorProgress: progressColorRef.current,
      }
      tl.to(
        progressTarget,
        {
          opacity: 0,
          colorProgress: 0,
          duration: GSAP_CONFIG.collapseDuration,
          ease: GSAP_CONFIG.easeCollapse,
          onUpdate: () => {
            setProgressFillOpacity(progressTarget.opacity)
            setProgressColorProgress(progressTarget.colorProgress)
          },
        },
        0,
      )

      // Currency bar fades out after short delay (use ref to get current values)
      const currencyTarget = {
        opacity: currencyOpacityRef.current,
        colorProgress: currencyColorRef.current,
      }
      tl.to(
        currencyTarget,
        {
          opacity: 0,
          colorProgress: 0,
          duration: GSAP_CONFIG.collapseDuration,
          ease: GSAP_CONFIG.easeCollapse,
          onUpdate: () => {
            setCurrencyFillOpacity(currencyTarget.opacity)
            setCurrencyColorProgress(currencyTarget.colorProgress)
          },
        },
        GSAP_CONFIG.staggerDelay * 0.5,
      )

      // Hide progress bar after its fill fades out
      tl.call(
        () => setProgressBarVisible(false),
        [],
        GSAP_CONFIG.collapseDuration + 0.01,
      )
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [isExpanded, expandable])

  // Handle expansion toggle
  const handleExpand = useCallback(() => {
    const newExpanded = !isExpanded
    if (!isControlled) {
      setInternalExpanded(newExpanded)
    }
    onExpandedChange?.(newExpanded)
  }, [isExpanded, isControlled, onExpandedChange])

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (expandable && expansionTrigger === "hover") {
      if (!isControlled) {
        setInternalExpanded(true)
      }
      onExpandedChange?.(true)
    }
  }, [expandable, expansionTrigger, isControlled, onExpandedChange])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (expandable && expansionTrigger === "hover") {
      if (!isControlled) {
        setInternalExpanded(false)
      }
      onExpandedChange?.(false)
    }
  }, [expandable, expansionTrigger, isControlled, onExpandedChange])

  const handleClick = useCallback(() => {
    // Flash the clicked state for visual feedback
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 150)

    if (expandable && expansionTrigger === "click") {
      handleExpand()
    }
  }, [expandable, expansionTrigger, handleExpand])

  // Determine if expansion is vertical or horizontal
  const isVerticalExpansion =
    effectiveDirection === "down" || effectiveDirection === "up"

  // Render secondary bars (currency and progress)
  const renderSecondaryBars = () => {
    // Secondary bars visual state (inactive when collapsed)
    const secondaryVisualState: ExpandingBarVisualState =
      expandable && !isExpanded ? "inactive" : visualState

    // Create individual bar components with GSAP-controlled middle fill opacity and color
    // Bar frame/stroke visible immediately, only middle fill fades in
    const currencyBar = (
      <Box sx={{ height: barHeight, width: barHeight * 4 }}>
        <CurrencyStatusBarSimple
          barHeight={barHeight}
          visualState={secondaryVisualState}
          shadowIntensity={shadowIntensity}
          middleFillOpacity={expandable ? currencyFillOpacity : 1}
          middleFillColorProgress={expandable ? currencyColorProgress : 1}
        />
      </Box>
    )

    const progressBar = (
      <Box sx={{ height: barHeight, width: barHeight * 6 }}>
        <ProgressStatusBar
          barHeight={barHeight}
          visualState={secondaryVisualState}
          shadowIntensity={shadowIntensity}
          middleFillOpacity={expandable ? progressFillOpacity : 1}
          middleFillColorProgress={expandable ? progressColorProgress : 1}
        />
      </Box>
    )

    if (!expandable) {
      return (
        <>
          {currencyBar}
          {progressBar}
        </>
      )
    }

    // For expandable: Currency bar renders when expanded or animating out,
    // Progress bar only renders when progressBarVisible is true
    const shouldRenderCurrency = isExpanded || currencyFillOpacity > 0
    const shouldRenderProgress = progressBarVisible

    if (!shouldRenderCurrency && !shouldRenderProgress) {
      return null
    }

    if (isVerticalExpansion) {
      return (
        <Box
          display="flex"
          flexDirection={
            effectiveDirection === "up" ? "column-reverse" : "column"
          }
          alignItems={layout === "staircase" ? "flex-end" : "flex-start"}
          gap={0.5}
        >
          {shouldRenderCurrency && currencyBar}
          {shouldRenderProgress && progressBar}
        </Box>
      )
    }
    // Horizontal expansion
    return (
      <Box
        display="flex"
        flexDirection={effectiveDirection === "left" ? "row-reverse" : "row"}
        alignItems="center"
        gap={0.5}
      >
        {shouldRenderCurrency && currencyBar}
        {shouldRenderProgress && progressBar}
      </Box>
    )
  }

  // Common container props
  const sharedContainerProps: BoxProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick:
      expandable && expansionTrigger === "click" ? handleClick : undefined,
    sx: {
      cursor:
        expandable && expansionTrigger === "click" ? "pointer" : "default",
      transition: `opacity ${OPACITY_DURATION}ms ${EASING_EXPAND}`,
      ...containerProps?.sx,
    },
    ...containerProps,
  }

  // Enable ripple when using click trigger
  const enableRipple = expandable && expansionTrigger === "click"

  if (layout === "horizontal") {
    // Determine flex direction based on expansion direction
    const flexDirection = effectiveDirection === "left" ? "row-reverse" : "row"

    return (
      <Box
        display="flex"
        flexDirection={flexDirection}
        alignItems="center"
        gap={0.5}
        {...sharedContainerProps}
      >
        <Box sx={{ height: barHeight, width: barHeight * 2 }}>
          <ProfileIconStatusBarSimple
            barHeight={barHeight}
            visualState={visualState}
            enableRipple={enableRipple}
            onClick={handleClick}
            shadowIntensity={shadowIntensity}
          />
        </Box>
        {renderSecondaryBars()}
      </Box>
    )
  }

  // Staircase layout
  const flexDirection =
    effectiveDirection === "up" ? "column-reverse" : "column"

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      alignItems="flex-end"
      gap={0.5}
      {...sharedContainerProps}
    >
      {effectiveDirection === "up" && renderSecondaryBars()}
      <Box sx={{ height: barHeight, width: barHeight * 2 }}>
        <ProfileIconStatusBarSimple
          barHeight={barHeight}
          visualState={visualState}
          enableRipple={enableRipple}
          onClick={handleClick}
          shadowIntensity={shadowIntensity}
        />
      </Box>
      {effectiveDirection !== "up" && renderSecondaryBars()}
    </Box>
  )
}
