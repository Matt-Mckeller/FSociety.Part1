"use client"

/**
 * CurrencyStatusBarTripleLayer — review-copy of CurrencyStatusBarSimple
 * built on `ExpandingBarTripleLayer` + `TripleLayerPill`.
 */

import { Box, Tooltip, Typography } from "@mui/material"
import {
  ExpandingBarTripleLayer,
  ExpandingBarTripleLayerVariant,
  ExpandingBarTripleLayerVisualState,
  useTripleLayerBarContext,
} from "../../display/ExpandingBarTripleLayer"
import { CoinIcon } from "../../display/icons/CoinIcon"
import { usePlayerStatus } from "../context"

type CurrencyStatusBarTripleLayerProps = {
  value?: number
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

export const CurrencyStatusBarTripleLayer = ({
  value,
  barHeight = 28,
  opacity = 1,
  visualState = "active",
  variant,
  enableRipple = false,
  onClick,
  shadowIntensity = 0,
  middleFillOpacity = 1,
}: CurrencyStatusBarTripleLayerProps) => {
  const status = usePlayerStatus()
  const resolvedValue = value ?? status.currency
  const scaleFactor = barHeight / REFERENCE_HEIGHT
  const iconContainerWidth = Math.round(25 * scaleFactor)
  const fontSize = Math.max(10, Math.round(14 * scaleFactor))
  const marginRight = Math.round(8 * scaleFactor)

  const effectiveVisualState: ExpandingBarTripleLayerVisualState =
    opacity < 0.5 ? "inactive" : visualState

  return (
    <ExpandingBarTripleLayer
      aspectRatio={4}
      visualState={effectiveVisualState}
      variant={variant}
      enableRipple={enableRipple}
      onClick={onClick}
      shadowIntensity={shadowIntensity}
      layerOpacity={middleFillOpacity}
      preset="cloud"
    >
      <CurrencyBarContent
        value={resolvedValue}
        opacity={opacity}
        marginRight={marginRight}
        scaleFactor={scaleFactor}
        fontSize={fontSize}
        iconContainerWidth={iconContainerWidth}
      />
    </ExpandingBarTripleLayer>
  )
}

function CurrencyBarContent({
  value,
  opacity,
  marginRight,
  scaleFactor,
  fontSize,
  iconContainerWidth,
}: {
  value: number
  opacity: number
  marginRight: number
  scaleFactor: number
  fontSize: number
  iconContainerWidth: number
}) {
  const ctx = useTripleLayerBarContext()
  const contentColor = ctx?.contentColor ?? "inherit"

  return (
    <Tooltip title="Points">
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          height: "100%",
          width: "100%",
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
          {/* `data-coin-target="currency"` marks this as the fly-to
              destination for the consumer app's coin-fly animation
              (mirrors the same attribute on CompactStatusBar so the same
              query selector works regardless of which status variant is
              currently mounted at the top-left of the HUD). */}
          <Box
            data-coin-target="currency"
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
  );
}
