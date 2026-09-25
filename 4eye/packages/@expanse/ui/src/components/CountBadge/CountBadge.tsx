/**
 * CountBadge — a small numeric badge whose color reflects how many
 * items are selected, relative to either an absolute scale or an
 * explicit `max`.
 *
 * Pure presentation. Reusable across the HUD: AI Chat nav tiles,
 * entity buttons, notification glyphs, etc.
 *
 * Tiering strategies (driven by `tier`, default `"tiered"`):
 *
 *   - `"tiered"` — absolute brackets, no `max` required:
 *       0    → hidden
 *       1–2  → neutral (subtle grey)
 *       3–4  → accent (the tile / context color)
 *       5+   → warning (amber)
 *
 *   - `"capacity"` — proportional to `max`:
 *       0          → hidden
 *       < 50%      → neutral
 *       50–99%     → accent
 *       = max      → success (full)
 *       > max      → error (overflow)
 *
 *   - `"fixed"` — always the `accent` color (current behavior).
 *
 * @example
 * <CountBadge count={selected.length} accent={tile.color} />
 *
 * @example
 * <CountBadge count={2} max={3} tier="capacity" accent="#3b82f6" />
 */

"use client"

import React from "react"
import { Box } from "@mui/material"

export type CountBadgeTier = "tiered" | "capacity" | "fixed"
export type CountBadgeSize = "xs" | "sm" | "md"

export interface CountBadgeProps {
  /** Current count. `0` hides the badge unless `showZero` is set. */
  count: number
  /** Optional capacity for `tier="capacity"`. */
  max?: number
  /** Color strategy. @default "tiered" */
  tier?: CountBadgeTier
  /** Base accent color for filled tiers. @default "#3b82f6" */
  accent?: string
  /** Visual size. @default "sm" */
  size?: CountBadgeSize
  /** If true, render even when count is 0 (as a faint placeholder). */
  showZero?: boolean
  /** Optional inline style override. */
  sx?: React.ComponentProps<typeof Box>["sx"]
}

// =============================================================================
// Sizing
// =============================================================================

const SIZES: Record<CountBadgeSize, { minSize: number; px: number; fontSize: number }> = {
  xs: { minSize: 14, px: 0.4, fontSize: 9 },
  sm: { minSize: 18, px: 0.5, fontSize: 10 },
  md: { minSize: 22, px: 0.625, fontSize: 11 },
}

// =============================================================================
// Color tiers
// =============================================================================

type TierColors = { bg: string; fg: string; border?: string }

const NEUTRAL: TierColors = {
  bg: "rgba(255,255,255,0.14)",
  fg: "rgba(255,255,255,0.95)",
  border: "rgba(255,255,255,0.18)",
}
const ACCENT = (accent: string): TierColors => ({ bg: accent, fg: "#fff" })
const SUCCESS: TierColors = { bg: "#22c55e", fg: "#062b14" }
const WARNING: TierColors = { bg: "#f59e0b", fg: "#3a2400" }
const ERROR: TierColors = { bg: "#ef4444", fg: "#fff" }

function resolveColors(
  tier: CountBadgeTier,
  count: number,
  accent: string,
  max?: number,
): TierColors {
  if (tier === "fixed") return ACCENT(accent)

  if (tier === "capacity" && max && max > 0) {
    if (count > max) return ERROR
    if (count === max) return SUCCESS
    const pct = count / max
    if (pct < 0.5) return NEUTRAL
    return ACCENT(accent)
  }

  // "tiered" (absolute)
  if (count <= 2) return NEUTRAL
  if (count <= 4) return ACCENT(accent)
  return WARNING
}

// =============================================================================
// Component
// =============================================================================

export function CountBadge({
  count,
  max,
  tier = "tiered",
  accent = "#3b82f6",
  size = "sm",
  showZero = false,
  sx,
}: CountBadgeProps) {
  if (count <= 0 && !showZero) return null

  const { minSize, px, fontSize } = SIZES[size]
  const colors = showZero && count === 0 ? NEUTRAL : resolveColors(tier, count, accent, max)

  // For `capacity` with `max`, display as "n/m" once we hit the accent tier
  // (>= 50%). Below that, just show the number.
  const showFraction =
    tier === "capacity" && typeof max === "number" && count > 0 && count / max >= 0.5

  const label = showFraction ? `${count}/${max}` : `${count}`

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: minSize,
        height: minSize,
        px,
        borderRadius: minSize,
        bgcolor: colors.bg,
        color: colors.fg,
        border: colors.border ? `1px solid ${colors.border}` : "none",
        fontSize,
        fontWeight: 700,
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1,
        transition:
          "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
        ...sx,
      }}
    >
      {label}
    </Box>
  )
}
