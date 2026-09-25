"use client"

import { Box, useTheme } from "@mui/material"
import { ReactNode } from "react"
import {
  ExpandingBar,
  ExpandingBarVisualState,
} from "../../display/ExpandingBar"

export type GenericStatusBarProps = {
  /** Content to display inside the bar - developer controls layout */
  children: ReactNode
  /** Aspect ratio of the bar (width / height). Default: 4 */
  aspectRatio?: number
  /** Bar height in pixels for responsive scaling. Default: 28 */
  barHeight?: number
  /** Visual state for the bar appearance */
  visualState?: ExpandingBarVisualState
  /** Enable ripple effect on click */
  enableRipple?: boolean
  /** Click handler */
  onClick?: () => void
  /** Shadow intensity (0-1) */
  shadowIntensity?: number
  /** Middle fill opacity (0-1) for GSAP animation */
  middleFillOpacity?: number
  /** Middle fill color progress (0-1) for GSAP animation */
  middleFillColorProgress?: number
}

/**
 * GenericStatusBar - A flexible status bar container
 *
 * Unlike the specific bar components (CurrencyStatusBarSimple, etc.),
 * this component accepts any children and lets the developer control
 * the internal layout.
 *
 * @example
 * ```tsx
 * // Single currency
 * <GenericStatusBar aspectRatio={4}>
 *   <CoinDisplay value={1000} />
 * </GenericStatusBar>
 *
 * // Multiple currencies
 * <GenericStatusBar aspectRatio={6}>
 *   <Box display="flex" gap={1}>
 *     <CoinDisplay value={1000} />
 *     <Divider orientation="vertical" />
 *     <GemDisplay value={50} />
 *   </Box>
 * </GenericStatusBar>
 * ```
 */
export const GenericStatusBar = ({
  children,
  aspectRatio = 4,
  barHeight = 28,
  visualState = "active",
  enableRipple = false,
  onClick,
  shadowIntensity = 0,
  middleFillOpacity = 1,
  middleFillColorProgress = 1,
}: GenericStatusBarProps) => {
  const theme = useTheme()

  // Invert text/icon color when inactive (dark on light instead of light on dark)
  const contentColor =
    visualState === "inactive"
      ? theme.palette.primary.main
      : theme.palette.primary.contrastText

  return (
    <Box sx={{ height: barHeight, width: barHeight * aspectRatio }}>
      <ExpandingBar
        aspectRatio={aspectRatio}
        visualState={visualState}
        enableRipple={enableRipple}
        onClick={onClick}
        shadowIntensity={shadowIntensity}
        middleFillOpacity={middleFillOpacity}
        middleFillColorProgress={middleFillColorProgress}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            color: contentColor,
            transition: "color 180ms cubic-bezier(0.4, 0, 0.2, 1)"
          }}>
          {children}
        </Box>
      </ExpandingBar>
    </Box>
  );
}
