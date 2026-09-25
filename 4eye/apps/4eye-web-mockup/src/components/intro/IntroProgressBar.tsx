"use client"

/**
 * IntroProgressBar — slide navigation pill for the home-page intro.
 *
 * Layout:  ← [● ● ○ ○] →
 *
 * - Back arrow: disabled on slide 0 or while animating.
 * - Forward arrow: calls `advance()`, disabled while animating.
 * - Dots: one per slide, active dot expands to a pill. Clicking
 *   an inactive dot calls `goTo(i)`.
 *
 * Styled as a frosted pill to match the HUD chrome aesthetic.
 * Returns null once the intro finishes.
 */

import { Box, IconButton } from "@mui/material"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"

import { useIntroFlow } from "./IntroFlowContext"

export function IntroProgressBar() {
  const { slide, slideCount, isAnimating, isFinished, advance, back, goTo } =
    useIntroFlow()

  if (isFinished) return null

  const canGoBack = slide > 0 && !isAnimating
  const canGoForward = !isAnimating

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 0.75,
        height: 32,
        borderRadius: 28,
        bgcolor: "rgba(0,0,0,0.72)",
        border: "1px solid rgba(255,255,255,0.11)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        userSelect: "none",
      }}
    >
      {/* ← Back */}
      <IconButton
        size="small"
        disabled={!canGoBack}
        onClick={back}
        aria-label="Previous slide"
        sx={{
          p: 0.5,
          color: canGoBack ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)",
          "&.Mui-disabled": { color: "rgba(255,255,255,0.18)" },
          transition: "color 150ms ease",
        }}
      >
        <ArrowBackIosNewRoundedIcon sx={{ fontSize: 11 }} />
      </IconButton>

      {/* Dots */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          px: 0.25,
        }}
      >
        {Array.from({ length: slideCount }).map((_, i) => {
          const isActive = i === slide
          return (
            <Box
              key={i}
              role={isActive ? undefined : "button"}
              aria-label={isActive ? undefined : `Go to slide ${i + 1}`}
              onClick={() => {
                if (!isAnimating && !isActive) goTo(i)
              }}
              sx={{
                width: isActive ? 20 : 6,
                height: 6,
                borderRadius: 3,
                flexShrink: 0,
                bgcolor: isActive
                  ? "primary.main"
                  : "rgba(255,255,255,0.28)",
                cursor: isAnimating || isActive ? "default" : "pointer",
                transition: "width 280ms cubic-bezier(0.4,0,0.2,1), background-color 200ms ease",
                "&:hover": !isAnimating && !isActive
                  ? { bgcolor: "rgba(255,255,255,0.52)" }
                  : {},
              }}
            />
          )
        })}
      </Box>

      {/* → Forward */}
      <IconButton
        size="small"
        disabled={!canGoForward}
        onClick={advance}
        aria-label="Next slide"
        sx={{
          p: 0.5,
          color: canGoForward ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)",
          "&.Mui-disabled": { color: "rgba(255,255,255,0.18)" },
          transition: "color 150ms ease",
        }}
      >
        <ArrowForwardIosRoundedIcon sx={{ fontSize: 11 }} />
      </IconButton>
    </Box>
  )
}
