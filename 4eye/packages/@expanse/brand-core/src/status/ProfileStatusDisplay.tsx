"use client"

/**
 * ProfileStatusDisplay — review-copy reimplementation of
 * `ProfileStatusDisplay` built on `ExpandingBarTripleLayer` + `TripleLayerPill`.
 *
 * Behaviour preserved 1:1 from the original:
 *  - Layout: "staircase" | "horizontal"
 *  - Expansion: hover/click trigger, 4 directions (down/up/right/left),
 *    controlled & uncontrolled.
 *  - Animation: same `useProfileAnimation` (GSAP) — expand 180ms power2.out,
 *    collapse 120ms power2.in, 120ms stagger, fill enters at 0.33 opacity.
 *
 * The original `ProfileStatusDisplay` and its bars are left untouched.
 */

import { Box, type BoxProps } from "@mui/material"
import { useMemo, useState, useCallback } from "react"

import type {
  ProfileStatusDisplayLayout,
  StatusBarDisplayState,
  StatusBarExpansionDirection,
} from "./types/status.types"

import { useExpansion } from "./hooks/useExpansion"
import { useProfileAnimation } from "./hooks/useBarAnimation"
import { useVisualState } from "./hooks/useVisualState"

import { CurrencyStatusBarTripleLayer } from "./bars/CurrencyStatusBarTripleLayer"
import { ProgressStatusBarTripleLayer } from "./bars/ProgressStatusBarTripleLayer"
import { ProfileIconStatusBarTripleLayer } from "./bars/ProfileIconStatusBarTripleLayer"
import type { ExpandingBarTripleLayerVariant } from "../display/ExpandingBarTripleLayer"

export type ExpansionTrigger = "hover" | "click"

// Back-compat re-exports (formerly exported from ProfileStatusDisplay)
export type { ProfileStatusDisplayLayout } from "./types/status.types"
export type { StatusBarDisplayState as ProfileStatusDisplayState } from "./types/status.types"
export type { StatusBarExpansionDirection as ExpansionDirection } from "./types/status.types"

export interface ProfileStatusDisplayProps {
  layout?: ProfileStatusDisplayLayout
  barHeight?: number
  /**
   * Width-to-height ratio of the always-visible profile (icon) bar.
   * `profileWidth = barHeight * pillRatio`. Default: `2`.
   *
   * Use `2.6` to match the collapsed `CompactStatusBar` width and the
   * minimap pill width on the same row.
   */
  pillRatio?: number
  /** Theme variant forwarded to every bar. Default: `"default"`. */
  variant?: ExpandingBarTripleLayerVariant
  displayState?: StatusBarDisplayState
  expandable?: boolean
  expansionTrigger?: ExpansionTrigger
  expansionDirection?: StatusBarExpansionDirection
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  containerProps?: BoxProps
}

export function ProfileStatusDisplay({
  layout = "staircase",
  barHeight = 28,
  pillRatio = 2,
  variant,
  displayState = "active",
  expandable = false,
  expansionTrigger = "hover",
  expansionDirection,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  containerProps,
}: ProfileStatusDisplayProps) {
  const [isClicked, setIsClicked] = useState(false)

  const {
    isExpanded,
    isHovered,
    handlers: expansionHandlers,
  } = useExpansion({
    defaultExpanded,
    expanded: controlledExpanded,
    onExpandedChange,
    trigger: expansionTrigger,
    enabled: expandable,
  })

  const { currency, progress } = useProfileAnimation({
    isExpanded,
    enabled: expandable,
    defaultExpanded,
  })

  const visualState = useVisualState({ displayState, isHovered })

  const secondaryVisualState = useVisualState({
    displayState,
    isHovered,
    isExpanded,
    expandable,
  })

  const effectiveDirection = useMemo((): StatusBarExpansionDirection => {
    if (expansionDirection) return expansionDirection
    return layout === "horizontal" ? "right" : "down-left"
  }, [expansionDirection, layout])

  const isVerticalExpansion =
    effectiveDirection === "down-left" ||
    effectiveDirection === "down-right" ||
    effectiveDirection === "up-left" ||
    effectiveDirection === "up-right"

  const isUpward =
    effectiveDirection === "up-left" || effectiveDirection === "up-right"

  // For staircase: which side is the profile bar (the smallest, "top" of the
  // stairs) anchored to? "down-left" / "up-left" mean the bars grow leftward,
  // so the profile sits on the right (right-anchored).
  const isRightAnchored =
    effectiveDirection === "down-left" || effectiveDirection === "up-left"

  const shadowIntensity = isClicked ? 1 : 0
  const enableRipple = expandable && expansionTrigger === "click"

  const handleClick = useCallback(() => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 150)
    expansionHandlers.onClick()
  }, [expansionHandlers])

  const profileWidth = Math.round(barHeight * pillRatio)
  const currencyWidth = barHeight * 4
  const progressWidth = barHeight * 6

  const shouldRenderCurrency =
    !expandable || isExpanded || currency.fillOpacity > 0
  const shouldRenderProgress = !expandable || progress.visible

  const renderSecondaryBars = () => {
    if (!shouldRenderCurrency && !shouldRenderProgress) return null

    const currencyBar = shouldRenderCurrency && (
      <Box sx={{ height: barHeight, width: currencyWidth }}>
        <CurrencyStatusBarTripleLayer
          barHeight={barHeight}
          variant={variant}
          visualState={secondaryVisualState}
          shadowIntensity={shadowIntensity}
          middleFillOpacity={expandable ? currency.fillOpacity : 1}
          middleFillColorProgress={expandable ? currency.colorProgress : 1}
        />
      </Box>
    )

    const progressBar = shouldRenderProgress && (
      <Box sx={{ height: barHeight, width: progressWidth }}>
        <ProgressStatusBarTripleLayer
          barHeight={barHeight}
          variant={variant}
          visualState={secondaryVisualState}
          shadowIntensity={shadowIntensity}
          middleFillOpacity={expandable ? progress.fillOpacity : 1}
          middleFillColorProgress={expandable ? progress.colorProgress : 1}
        />
      </Box>
    )

    const flexDirection = isVerticalExpansion
      ? isUpward
        ? "column-reverse"
        : "column"
      : effectiveDirection === "left"
        ? "row-reverse"
        : "row"

    const alignItems = isVerticalExpansion
      ? layout === "staircase"
        ? isRightAnchored
          ? "flex-end"
          : "flex-start"
        : "flex-start"
      : "center"

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: flexDirection,
          alignItems: alignItems,
          gap: 0.5
        }}>
        {currencyBar}
        {progressBar}
      </Box>
    );
  }

  const containerSx: BoxProps["sx"] = {
    cursor: expandable && expansionTrigger === "click" ? "pointer" : "default",
    ...containerProps?.sx,
  }

  const sharedContainerProps: BoxProps = {
    onMouseEnter: expansionHandlers.onMouseEnter,
    onMouseLeave: expansionHandlers.onMouseLeave,
    onClick: expandable && expansionTrigger === "click" ? handleClick : undefined,
    sx: containerSx,
    ...containerProps,
  }

  const mainFlexDirection =
    layout === "horizontal"
      ? effectiveDirection === "left"
        ? "row-reverse"
        : "row"
      : isUpward
        ? "column-reverse"
        : "column"

  const mainAlignItems =
    layout === "horizontal"
      ? "center"
      : isRightAnchored
        ? "flex-end"
        : "flex-start"

  return (
    <>
      {/*
        DOM order is always [profile, secondary]. The visual reversal for
        "up" / "left" is handled by `flexDirection: *-reverse` on the
        container — applying *both* a DOM swap and flex-reverse double-inverts
        and breaks the staircase.
      */}
      <Box
        {...sharedContainerProps}
        sx={[{
          display: "flex",
          flexDirection: mainFlexDirection,
          alignItems: mainAlignItems,
          gap: 0.5
        }, ...(Array.isArray(sharedContainerProps.sx) ? sharedContainerProps.sx : [sharedContainerProps.sx])]}>
        <Box sx={{ height: barHeight, width: profileWidth }}>
          <ProfileIconStatusBarTripleLayer
            barHeight={barHeight}
            variant={variant}
            visualState={visualState}
            enableRipple={enableRipple}
            onClick={handleClick}
            shadowIntensity={shadowIntensity}
          />
        </Box>

        {renderSecondaryBars()}
      </Box>
    </>
  );
}
