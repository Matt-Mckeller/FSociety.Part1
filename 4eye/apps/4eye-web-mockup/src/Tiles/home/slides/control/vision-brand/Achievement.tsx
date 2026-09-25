"use client"

import { forwardRef } from "react"
import { Box, Stack, Typography } from "@mui/material"
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded"
import {
  ExpandingBarTripleLayer,
  type ExpandingBarTripleLayerVariant,
} from "@expanse/brand-core"

export type AchievementProps = {
  /** Pill label. Defaults to "Achievement". */
  label?: string
  /** Optional icon override. Defaults to a trophy. */
  icon?: React.ReactNode
  /** Pill width in px (height derives from aspectRatio). Default 140. */
  width?: number
  /** width/height ratio for the inner pill. Default 4.5. */
  aspectRatio?: number
  /** TripleLayerPill theme variant. Default "default". */
  variant?: ExpandingBarTripleLayerVariant
}

/**
 * Achievement — gamification badge built on the brand-core
 * `ExpandingBarTripleLayer` pill (three expanding strokes around a single
 * inner pill). Renders an icon + label inline; used as the visual for
 * "level up", "interact!" and similar earn-state moments above the
 * vision character.
 *
 * Animation (entry / pulse) is driven by the parent via `layerOpacity` /
 * GSAP timelines on the wrapping slot ref — this component is purely visual.
 */
export const Achievement = forwardRef<HTMLDivElement, AchievementProps>(
  function Achievement(
    {
      label = "Achievement",
      icon = <EmojiEventsRoundedIcon sx={{ fontSize: 16 }} />,
      width = 140,
      aspectRatio = 4.5,
      variant = "default",
    },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        aria-label={`Achievement: ${label}`}
        sx={{
          width,
          display: "inline-block",
          lineHeight: 0,
        }}
      >
        <ExpandingBarTripleLayer aspectRatio={aspectRatio} variant={variant}>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: "inherit",
            }}
          >
            {icon}
            <Typography
              component="span"
              sx={{
                fontWeight: 800,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "inherit",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {label}
            </Typography>
          </Stack>
        </ExpandingBarTripleLayer>
      </Box>
    )
  },
)

export default Achievement
