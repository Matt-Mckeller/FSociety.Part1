"use client"

import { Box, Typography } from "@mui/material"
import { forwardRef } from "react"

/**
 * Pure, brand-neutral feedback overlays for the vision character.
 *
 * The brand-coupled `CoinBurst` (which uses `@expanse/brand-core` coin
 * assets) is intentionally NOT defined here — it is injected into
 * `OverlayLayer` from the app via the `coinBurstSlot` prop to avoid a
 * circular package dependency (`brand-core` already depends on
 * `@expanse/character`). See the app's `vision-brand/CoinBurst`.
 */

/**
 * LevelUpBadge — "LEVEL UP!" pill that pops above the character's head
 * on the reaction. Uses a TripleLayerPill-inspired multi-stroke border
 * rendered inline in SVG (no brand-core dep needed at this level).
 */
export const LevelUpBadge = forwardRef<HTMLDivElement, Record<string, never>>(
  function LevelUpBadge(_props, ref) {
    return (
      <Box
        ref={ref}
        aria-hidden
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Triple-stroke pill shell */}
        <svg
          width={110}
          height={36}
          viewBox="0 0 110 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0 }}
          aria-hidden
        >
          {/* Outer stroke */}
          <rect x={1}   y={1}   width={108} height={34} rx={17} stroke="#f59e0b" strokeWidth={1.5} opacity={0.35} />
          {/* Mid stroke */}
          <rect x={3.5} y={3.5} width={103} height={29} rx={14.5} stroke="#f59e0b" strokeWidth={1} opacity={0.6} />
          {/* Inner fill */}
          <rect x={5}   y={5}   width={100} height={26} rx={13} fill="#0f172a" stroke="#f59e0b" strokeWidth={1} />
        </svg>
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            fontWeight: 900,
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            color: "#fbbf24",
            textTransform: "uppercase",
            px: 3,
            py: 0.5,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          Interact!
        </Typography>
      </Box>
    )
  },
)

/**
 * XpToast — "+XP" toast that pops from the controller screen on each press.
 */
export const XpToast = forwardRef<HTMLDivElement, { label?: string }>(
  function XpToast({ label = "+40 XP" }, ref) {
    return (
      <Box
        ref={ref}
        aria-hidden
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "#0f172a",
          border: "1px solid #8b5cf666",
          borderRadius: 999,
          px: 1.5,
          py: 0.4,
          pointerEvents: "none",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "0.7rem",
            color: "#a78bfa",
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      </Box>
    )
  },
)
