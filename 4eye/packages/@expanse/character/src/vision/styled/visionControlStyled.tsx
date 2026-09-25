"use client"

import { Box, styled } from "@mui/material"

// ─────────────────────────────────────────────────────────────────────
// Layout tokens — single source of truth.
//
// CharacterStage drives everything else: width is the responsive clamp,
// height is width × ASPECT (tall-narrow figure). The character SVG
// renders at its natural aspect inside, so feet land at the wrapper's
// bottom edge. In the live ControlSlide the BrainWiringStrip sits flush
// below the wrapper, making the character read as "standing on the line".
// ─────────────────────────────────────────────────────────────────────

export const VISION_CONTROL_LAYOUT = {
  /**
   * Character wrapper width — responsive clamp.
   *
   * The vh component (the `min(...)` middle term) dominates on short
   * viewports so the figure shrinks vertically alongside surrounding
   * slide chrome (title, brain strip, topic labels) instead of
   * overflowing. The vw term keeps it from getting too wide on
   * landscape monitors. Pixel floor/ceiling guarantee a usable size
   * even on extreme viewports.
   */
  characterWidth: "clamp(96px, min(24vw, 18vh), 240px)",
  /** Wrapper height = width × this. ~2.0 ≈ full-figure aspect. */
  characterAspect: 2.0,
  /** Controller vertical anchor, measured from the bottom of the stage. */
  bellyBottomPct: "44%",
  /** Controller width relative to the stage. */
  controllerWidthPct: "92%",
  /** Watch (when device="both") vertical anchor from bottom. */
  watchBottomPct: "30%",
  /** Padding above the character head for antenna headroom. */
  antennaHeadroomPx: 8,
} as const

const { characterWidth, characterAspect } = VISION_CONTROL_LAYOUT

// ─────────────────────────────────────────────────────────────────────
// Container — outer column (stage + chip rail under it)
// ─────────────────────────────────────────────────────────────────────

export const VisionControlContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

// ─────────────────────────────────────────────────────────────────────
// CharacterStage — the positioned wrapper that holds everything
// ─────────────────────────────────────────────────────────────────────

export const CharacterStage = styled(Box)(({ theme }) => ({
  position: "relative",
  width: characterWidth,
  height: `calc(${characterWidth} * ${characterAspect})`,
  marginInline: "auto",
  cursor: "pointer",
  outline: "none",
  overflow: "visible",
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 6,
    borderRadius: 8,
  },
}))

// ─────────────────────────────────────────────────────────────────────
// CharacterColumn — full-height layer holding the Character4eye SVG.
// The SVG renders at natural aspect with width:100% so it fills the
// column edge-to-edge; head pinned to top, feet to bottom.
// ─────────────────────────────────────────────────────────────────────

export const CharacterColumn = styled(Box)({
  position: "absolute",
  top: VISION_CONTROL_LAYOUT.antennaHeadroomPx,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  overflow: "visible",
  "& svg[data-mood]": {
    width: "100%",
    height: "100%",
    maxWidth: "none",
    maxHeight: "none",
  },
})

// ─────────────────────────────────────────────────────────────────────
// ControllerSlot — belly-positioned absolute slot for the controller.
// Width is a percentage of the stage so it scales with the character.
// ─────────────────────────────────────────────────────────────────────

export const ControllerSlot = styled(Box)({
  position: "absolute",
  bottom: VISION_CONTROL_LAYOUT.bellyBottomPct,
  left: "50%",
  transform: "translateX(-50%)",
  transformOrigin: "center center",
  width: VISION_CONTROL_LAYOUT.controllerWidthPct,
  aspectRatio: "1.6 / 1",
  zIndex: 2,
})

// ─────────────────────────────────────────────────────────────────────
// WatchSlot — used when device="watch" (primary) and "both" (secondary).
// ─────────────────────────────────────────────────────────────────────

export const PrimaryWatchSlot = styled(Box)({
  position: "absolute",
  bottom: "30%",
  right: "12%",
  width: "32%",
  aspectRatio: "1 / 1",
  zIndex: 2,
})

export const SecondaryWatchSlot = styled(Box)({
  position: "absolute",
  bottom: "32%",
  left: "6%",
  width: "22%",
  aspectRatio: "1 / 1",
  zIndex: 2,
  transformOrigin: "center",
})

// ─────────────────────────────────────────────────────────────────────
// Eyelid mask — sits over the eye for blink/wink animations.
// ─────────────────────────────────────────────────────────────────────

export const EyelidMask = styled(Box)({
  position: "absolute",
  left: "38%",
  right: "38%",
  top: `calc(${VISION_CONTROL_LAYOUT.antennaHeadroomPx}px + 14%)`,
  height: "5%",
  background:
    "linear-gradient(180deg, #1f2937 0%, #1f2937 70%, transparent 100%)",
  borderRadius: "50%",
  zIndex: 3,
  pointerEvents: "none",
})

// ─────────────────────────────────────────────────────────────────────
// OverlaySlot variants — gamification badges, bolt, coin burst, etc.
// ─────────────────────────────────────────────────────────────────────

/**
 * InteractAchievement — slot above the character used for level-up
 * badges and shock/interact flashes. Positioned just above the
 * character's head (not at the top of the stage) so the badge feels
 * tethered to the character rather than floating in dead space.
 */
export const InteractAchievement = styled(Box)({
  position: "absolute",
  top: "22%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 4,
  pointerEvents: "none",
})

export const BoltOverlay = styled(Box)({
  position: "absolute",
  top: "36%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 4,
  pointerEvents: "none",
})

export const CoinBurstOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  display: "none",
  zIndex: 5,
})

export const XpToastOverlay = styled(Box)({
  position: "absolute",
  bottom: "60%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 6,
  pointerEvents: "none",
})
