"use client"

/**
 * ProfileIconStatusBarTripleLayer — review-copy of ProfileIconStatusBarSimple
 * built on `ExpandingBarTripleLayer` + `TripleLayerPill`.
 *
 * Animation contract preserved:
 *  - `middleFillOpacity` from `useProfileAnimation` is forwarded as `layerOpacity`
 *    on the new bar (drives the SVG layer group opacity).
 *  - `middleFillColorProgress` is currently unused (the new pill uses preset
 *    color stacks instead of a single fill colour to interpolate).
 */

import { Box } from "@mui/material"
import { Person3 } from "@mui/icons-material"
import { Tooltip, Typography } from "@mui/material"
import {
  ExpandingBarTripleLayer,
  ExpandingBarTripleLayerVariant,
  ExpandingBarTripleLayerVisualState,
  useTripleLayerBarContext,
} from "../../display/ExpandingBarTripleLayer"
import { usePlayerStatus } from "../context"

type ProfileIconStatusBarTripleLayerProps = {
  level?: number | string
  barHeight?: number
  opacity?: number
  visualState?: ExpandingBarTripleLayerVisualState
  variant?: ExpandingBarTripleLayerVariant
  enableRipple?: boolean
  onClick?: () => void
  shadowIntensity?: number
  /** GSAP-driven group opacity (0-1). Default: 1. */
  middleFillOpacity?: number
  /** Reserved — preserves the call-site signature of the original bar. */
  middleFillColorProgress?: number
}

const REFERENCE_HEIGHT = 40

export const ProfileIconStatusBarTripleLayer = ({
  level,
  barHeight = 28,
  opacity = 1,
  visualState = "active",
  variant,
  enableRipple = false,
  onClick,
  shadowIntensity = 0,
  middleFillOpacity = 1,
}: ProfileIconStatusBarTripleLayerProps) => {
  const status = usePlayerStatus()
  const resolvedLevel = level ?? status.level
  const scaleFactor = barHeight / REFERENCE_HEIGHT
  const iconSize = Math.round(18 * scaleFactor)
  const iconContainerWidth = Math.round(25 * scaleFactor)
  const fontSize = Math.max(10, Math.round(14 * scaleFactor))
  const marginRight = Math.round(8 * scaleFactor)

  const effectiveVisualState: ExpandingBarTripleLayerVisualState =
    opacity < 0.5 ? "inactive" : visualState

  return (
    <ExpandingBarTripleLayer
      aspectRatio={2}
      visualState={effectiveVisualState}
      variant={variant}
      enableRipple={enableRipple}
      onClick={onClick}
      shadowIntensity={shadowIntensity}
      layerOpacity={middleFillOpacity}
      preset="cloud"
    >
      <ProfileIconBarContent
        level={resolvedLevel}
        opacity={opacity}
        marginRight={marginRight}
        scaleFactor={scaleFactor}
        fontSize={fontSize}
        iconContainerWidth={iconContainerWidth}
        iconSize={iconSize}
      />
    </ExpandingBarTripleLayer>
  )
}

function ProfileIconBarContent({
  level,
  opacity,
  marginRight,
  scaleFactor,
  fontSize,
  iconContainerWidth,
  iconSize,
}: {
  level: number | string
  opacity: number
  marginRight: number
  scaleFactor: number
  fontSize: number
  iconContainerWidth: number
  iconSize: number
}) {
  const ctx = useTripleLayerBarContext()
  const contentColor = ctx?.contentColor ?? "inherit"

  return (
    <Tooltip title="Level">
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          height: "100%",
          width: "100%",
          mr: `${marginRight}px`,
          opacity,

          transition:
            "opacity 0.2s ease-in-out, color 180ms cubic-bezier(0.4, 0, 0.2, 1)"
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
          {level}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: `${iconContainerWidth}px`,
            justifyContent: "center"
          }}>
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
  );
}
