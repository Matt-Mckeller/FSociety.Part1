"use client"

import { Box, useTheme } from "@mui/system"
import {
  ExpandingBar,
  ExpandingBarVisualState,
} from "../../display/ExpandingBar"
import { Person3 } from "@mui/icons-material"
import { Tooltip, Typography } from "@mui/material"

type ProfileIconStatusBarSimpleProps = {
  /** Level value to display */
  level?: number | string
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

export const ProfileIconStatusBarSimple = ({
  level = 1,
  barHeight = 28,
  opacity = 1,
  visualState = "active",
  enableRipple = false,
  onClick,
  shadowIntensity = 0,
  middleFillOpacity = 1,
  middleFillColorProgress = 1,
}: ProfileIconStatusBarSimpleProps) => {
  const theme = useTheme()

  // Calculate scale factor based on barHeight relative to reference height
  const scaleFactor = barHeight / REFERENCE_HEIGHT

  // Scaled values
  const iconSize = Math.round(18 * scaleFactor)
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
      aspectRatio={2}
      visualState={effectiveVisualState}
      enableRipple={enableRipple}
      onClick={onClick}
      shadowIntensity={shadowIntensity}
      middleFillOpacity={middleFillOpacity}
      middleFillColorProgress={middleFillColorProgress}
    >
      <Tooltip title="Level">
        <Box
          display="flex"
          justifyContent="end"
          alignItems="center"
          height="100%"
          sx={{
            mr: `${marginRight}px`,
            opacity,
            transition:
              "opacity 0.2s ease-in-out, color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Level */}
          <Typography
            sx={{
              mr: `${Math.round(4 * scaleFactor)}px`,
              fontSize: `${fontSize}px`,
              fontWeight: 600,
              transition: "color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            textAlign="right"
            color={contentColor}
          >
            {level}
          </Typography>
          <Box
            display="flex"
            width={`${iconContainerWidth}px`}
            justifyContent="center"
          >
            <Person3
              sx={{
                color: contentColor,
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                transition: "color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </Box>
        </Box>
      </Tooltip>
    </ExpandingBar>
  )
}
