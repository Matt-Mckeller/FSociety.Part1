"use client"

/**
 * ProgressStatusBarTripleLayer — review-copy of ProgressStatusBar
 * built on `ExpandingBarTripleLayer` + `TripleLayerPill`.
 */

import { Box, Tooltip, Typography } from "@mui/material"
import {
  ExpandingBarTripleLayer,
  ExpandingBarTripleLayerVariant,
  ExpandingBarTripleLayerVisualState,
  useTripleLayerBarContext,
} from "../../display/ExpandingBarTripleLayer"
import { ExperienceIcon } from "../../display/icons/ExperienceIcon"
import { usePlayerStatus } from "../context"

type ProgressStatusBarTripleLayerProps = {
  progress?: number
  barHeight?: number
  opacity?: number
  visualState?: ExpandingBarTripleLayerVisualState
  variant?: ExpandingBarTripleLayerVariant
  enableRipple?: boolean
  onClick?: () => void
  shadowIntensity?: number
  middleFillOpacity?: number
  middleFillColorProgress?: number
}

const REFERENCE_HEIGHT = 40

export const ProgressStatusBarTripleLayer = ({
  progress,
  barHeight = 28,
  opacity = 1,
  visualState = "active",
  variant,
  enableRipple = false,
  onClick,
  shadowIntensity = 0,
  middleFillOpacity = 1,
}: ProgressStatusBarTripleLayerProps) => {
  const status = usePlayerStatus()
  const resolvedProgress = progress ?? status.xpProgress
  const scaleFactor = barHeight / REFERENCE_HEIGHT
  const iconContainerWidth = Math.round(25 * scaleFactor)
  const fontSize = Math.max(10, Math.round(14 * scaleFactor))
  const marginRight = Math.round(8 * scaleFactor)

  const effectiveVisualState: ExpandingBarTripleLayerVisualState =
    opacity < 0.5 ? "inactive" : visualState

  return (
    <ExpandingBarTripleLayer
      aspectRatio={6}
      visualState={effectiveVisualState}
      variant={variant}
      enableRipple={enableRipple}
      onClick={onClick}
      shadowIntensity={shadowIntensity}
      layerOpacity={middleFillOpacity}
      preset="cloud"
    >
      <ProgressBarContent
        progress={resolvedProgress}
        opacity={opacity}
        marginRight={marginRight}
        scaleFactor={scaleFactor}
        fontSize={fontSize}
        iconContainerWidth={iconContainerWidth}
        effectiveVisualState={effectiveVisualState}
      />
    </ExpandingBarTripleLayer>
  )
}

function ProgressBarContent({
  progress,
  opacity,
  marginRight,
  scaleFactor,
  fontSize,
  iconContainerWidth,
  effectiveVisualState,
}: {
  progress: number
  opacity: number
  marginRight: number
  scaleFactor: number
  fontSize: number
  iconContainerWidth: number
  effectiveVisualState: ExpandingBarTripleLayerVisualState
}) {
  const ctx = useTripleLayerBarContext()
  const contentColor = ctx?.contentColor ?? "inherit"

  return (
    <Tooltip title="Percentage to next rewards!">
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          height: "100%",
          width: "100%",
          alignItems: "center",
          mr: `${marginRight}px`,
          opacity,
          transition: "opacity 0.2s ease-in-out"
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
          {progress} %
        </Typography>
        <Box
          sx={{
            height: "70%",
            width: `${iconContainerWidth}px`,
            display: "flex",
            justifyContent: "center"
          }}>
          <ExperienceIcon
            variant={
              effectiveVisualState === "inactive" ? "default" : "contrast"
            }
          />
        </Box>
      </Box>
    </Tooltip>
  );
}
