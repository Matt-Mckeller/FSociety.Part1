"use client"

import { Box, Tooltip, Typography, useTheme } from "@mui/material"
import {
  ExpandingBar,
  ExpandingBarVisualState,
} from "../../display/ExpandingBar"
import { CoinIcon } from "../../display/icons/CoinIcon"

type CurrencyStatusBarSimpleProps = {
  /** Currency value to display */
  value?: number
  /** Bar height in pixels for responsive scaling. Default: 28 */
  barHeight?: number
  /** Opacity level (0-1) for content - deprecated, use visualState instead */
  opacity?: number
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

// Reference height for scaling calculations
const REFERENCE_HEIGHT = 40

export const CurrencyStatusBarSimple = ({
  value = 0,
  barHeight = 28,
  opacity = 1,
  visualState = "active",
  enableRipple = false,
  onClick,
  shadowIntensity = 0,
  middleFillOpacity = 1,
  middleFillColorProgress = 1,
}: CurrencyStatusBarSimpleProps) => {
  const theme = useTheme()

  // Calculate scale factor based on barHeight relative to reference height
  const scaleFactor = barHeight / REFERENCE_HEIGHT

  // Scaled values
  const iconContainerWidth = Math.round(25 * scaleFactor)
  const fontSize = Math.max(10, Math.round(14 * scaleFactor))
  const marginRight = Math.round(8 * scaleFactor)

  // Determine effective visual state (support legacy opacity prop)
  const effectiveVisualState = opacity < 0.5 ? "inactive" : visualState

  // Invert text/icon color when inactive (dark on light instead of light on dark)
  const contentColor =
    effectiveVisualState === "inactive"
      ? theme.palette.primary.main
      : theme.palette.primary.contrastText

  return (
    <ExpandingBar
      aspectRatio={4}
      visualState={effectiveVisualState}
      enableRipple={enableRipple}
      onClick={onClick}
      shadowIntensity={shadowIntensity}
      middleFillOpacity={middleFillOpacity}
      middleFillColorProgress={middleFillColorProgress}
    >
      <Tooltip title="Points">
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            height: "100%",
            alignItems: "center",
            opacity,
            transition: "opacity 0.2s ease-in-out"
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              mr: `${marginRight}px`
            }}>
            <Typography
              color={contentColor}
              sx={{
                textAlign: "right",
                mr: `${Math.round(4 * scaleFactor)}px`,
                fontSize: `${fontSize}px`,
                fontWeight: 600,
                transition: "color 180ms cubic-bezier(0.4, 0, 0.2, 1)"
              }}>
              {Number.isFinite(value) ? value : "∞"}
            </Typography>
            <Box
              sx={{
                width: `${iconContainerWidth}px`,
                height: "60%",
                display: "flex",
                justifyContent: "center"
              }}>
              <CoinIcon color={contentColor} />
            </Box>
          </Box>
        </Box>
      </Tooltip>
    </ExpandingBar>
  );
}
