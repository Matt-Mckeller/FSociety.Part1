/**
 * CornerBracketFrame — four L-shaped brackets framing a parent surface.
 *
 * Decorative overlay that draws an L in each corner of its parent (TL/TR/BL/BR).
 * Used to mark a region as a focused "page" without drawing a full border —
 * keeps the framed content visually flat while still feeling contained.
 *
 * ## Visual model
 *
 * Each bracket is an L of two CSS-bordered Boxes (one horizontal arm,
 * one vertical arm) anchored to the corner with a small inset. The arms
 * default to 30% of the parent (per axis) and render as either a single
 * stroke or the brand triple-layer halo (outer/center/inner stacked).
 *
 * ## Draw-on-mount animation
 *
 * When `animateOnMount` is true (default) each arm grows from the corner
 * outward toward the tip (horizontal arm `width` 0 → 100%, vertical arm
 * `height` 0 → 100%). All four corners animate in parallel. Pass
 * `active={false}` to retract.
 *
 * ## Layout
 *
 * Renders inside an absolutely-positioned wrapper covering the parent
 * (`position:absolute; inset:0; pointerEvents:none`). The parent must be
 * a positioned ancestor (relative/absolute/fixed). No layout impact on
 * the framed content.
 */

"use client"

import * as React from "react"
import { Box, useTheme } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"

// ============================================================
// TYPES
// ============================================================

export type CornerBracketVariant = "single" | "tripleLayer"
export type CornerBracketLayerRatio = "7:3:1" | "1:2:3" | "1:2:1"
export type CornerBracketCorner = "tl" | "tr" | "bl" | "br"

export interface CornerBracketFrameProps {
  /**
   * Length of each bracket arm as a percentage of the parent (per axis).
   * 30 = horizontal arms cover 30% of parent width, vertical arms 30%
   * of parent height.
   * @default 30
   */
  lengthPct?: number
  /**
   * Stroke thickness in px for the *inner* (sharpest) line. The other
   * layers in `tripleLayer` variant derive from this via `layerRatio`.
   * @default 2
   */
  thickness?: number
  /**
   * Inset of the bracket from the parent's edge, in px.
   * @default 12
   */
  inset?: number
  /**
   * Stroke color. Defaults to `theme.palette.primary.main`.
   */
  color?: string
  /**
   * `single` renders one stroke per arm. `tripleLayer` stacks three
   * progressively wider strokes for the brand halo effect.
   * @default "tripleLayer"
   */
  variant?: CornerBracketVariant
  /**
   * Width ratio for the `tripleLayer` variant. Inner stroke width is
   * `thickness`; outer/center derive from the ratio (e.g. `7:3:1` with
   * thickness=2 → outer=14, center=6, inner=2).
   * @default "7:3:1"
   */
  layerRatio?: CornerBracketLayerRatio
  /**
   * Animate the brackets drawing on mount (and on `active` flips).
   * @default true
   */
  animateOnMount?: boolean
  /**
   * Animation duration in ms.
   * @default 600
   */
  animationDurationMs?: number
  /**
   * When false the brackets retract (or never appear if `animateOnMount`
   * is false at mount time).
   * @default true
   */
  active?: boolean
  /**
   * Subset of corners to render. Defaults to all four.
   */
  corners?: readonly CornerBracketCorner[]
  /**
   * Where the arm strokes sit relative to the frame edge.
   *
   * - `"edge"` (default) — arms straddle the edge: half the stroke sits
   *   inside the frame, half outside. Classic "viewfinder" look.
   * - `"inner"` — arms sit fully inside the frame, touching the edge.
   *   The triple-layer halo fans inward from each corner, making the
   *   content appear recessed underneath the frame.
   *
   * @default "edge"
   */
  placement?: "edge" | "inner"
  /** Optional sx forwarded to the wrapper Box. */
  sx?: SxProps<Theme>
}

// ============================================================
// CONSTANTS
// ============================================================

const ALL_CORNERS: readonly CornerBracketCorner[] = ["tl", "tr", "bl", "br"]

const LAYER_RATIOS: Record<CornerBracketLayerRatio, [number, number, number]> = {
  // [outer, center, inner] multipliers applied to `thickness`
  "7:3:1": [7, 3, 1],
  "1:2:3": [3, 2, 1],
  "1:2:1": [2, 2, 1],
}

// ============================================================
// COMPONENT
// ============================================================

export function CornerBracketFrame({
  lengthPct = 30,
  thickness = 2,
  inset = 12,
  color,
  variant = "tripleLayer",
  layerRatio = "7:3:1",
  animateOnMount = true,
  animationDurationMs = 600,
  active = true,
  corners = ALL_CORNERS,
  placement = "edge",
  sx,
}: CornerBracketFrameProps) {
  const theme = useTheme()
  const strokeColor = color ?? theme.palette.primary.main

  const [outerMul, centerMul, innerMul] = LAYER_RATIOS[layerRatio]
  const layers =
    variant === "tripleLayer"
      ? [
          { width: thickness * outerMul, opacity: 0.18 },
          { width: thickness * centerMul, opacity: 0.45 },
          { width: thickness * innerMul, opacity: 1 },
        ]
      : [{ width: thickness, opacity: 1 }]

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...sx,
      }}
    >
      {corners.map(corner => (
        <Bracket
          key={corner}
          corner={corner}
          lengthPct={lengthPct}
          inset={inset}
          color={strokeColor}
          layers={layers}
          animateOnMount={animateOnMount}
          animationDurationMs={animationDurationMs}
          active={active}
          placement={placement}
        />
      ))}
    </Box>
  )
}

// ============================================================
// BRACKET (one corner = two arms)
// ============================================================

interface BracketProps {
  corner: CornerBracketCorner
  lengthPct: number
  inset: number
  color: string
  layers: { width: number; opacity: number }[]
  animateOnMount: boolean
  animationDurationMs: number
  active: boolean
  placement: "edge" | "inner"
}

function Bracket({
  corner,
  lengthPct,
  inset,
  color,
  layers,
  animateOnMount,
  animationDurationMs,
  active,
  placement,
}: BracketProps) {
  // [drawn] gates the grow-from-corner transition. Starts false on first
  // paint when animating, then flips true on the next frame so CSS
  // interpolates the width/height.
  const [drawn, setDrawn] = React.useState(!animateOnMount)
  React.useEffect(() => {
    if (!animateOnMount) {
      setDrawn(active)
      return
    }
    const id = requestAnimationFrame(() => setDrawn(active))
    return () => cancelAnimationFrame(id)
  }, [animateOnMount, active])

  // Anchor wrapper at the requested corner with `inset` from parent edge.
  // The wrapper is sized lengthPct% × lengthPct% of parent — the L lives
  // entirely inside this box, so each arm's max length is 100% of the
  // wrapper's own dimension.
  const positional: React.CSSProperties = {
    position: "absolute",
    width: `${lengthPct}%`,
    height: `${lengthPct}%`,
    pointerEvents: "none",
    overflow: "visible",
  }
  if (corner === "tl" || corner === "bl") positional.left = inset
  else positional.right = inset
  if (corner === "tl" || corner === "tr") positional.top = inset
  else positional.bottom = inset

  return (
    <Box style={positional}>
      <Arm
        axis="horizontal"
        corner={corner}
        layers={layers}
        color={color}
        drawn={drawn}
        animationDurationMs={animationDurationMs}
        placement={placement}
      />
      <Arm
        axis="vertical"
        corner={corner}
        layers={layers}
        color={color}
        drawn={drawn}
        animationDurationMs={animationDurationMs}
        placement={placement}
      />
    </Box>
  )
}

// ============================================================
// ARM (horizontal or vertical leg of one corner)
// ============================================================

interface ArmProps {
  axis: "horizontal" | "vertical"
  corner: CornerBracketCorner
  layers: { width: number; opacity: number }[]
  color: string
  drawn: boolean
  animationDurationMs: number
  placement: "edge" | "inner"
}

/**
 * One arm = a stack of N absolutely-positioned thin Boxes (one per layer).
 *
 * `placement="edge"` (default): the arm straddles the frame edge — half the
 * stroke sits inside, half outside. Classic expanding-border look.
 *
 * `placement="inner"`: the arm sits fully inside the frame, touching the
 * edge. The triple-layer halo fans inward from the corner, making the
 * framed content appear recessed underneath.
 *
 * Growth is anchored to the corner-side end of the arm so retract collapses
 * into the corner rather than off the outer tip.
 */
function Arm({ axis, corner, layers, color, drawn, animationDurationMs, placement }: ArmProps) {
  const isHorizontal = axis === "horizontal"
  const maxLayerW = layers[0].width // outermost is widest

  // "edge": center the arm on the edge (-half outside, half inside).
  // "inner": flush with the inside of the frame edge (0 offset).
  const edgeOffset = placement === "inner" ? 0 : -maxLayerW / 2

  // Outer wrapper: takes the corner-anchored slot for this arm and holds
  // an `overflow:hidden` Box whose width (or height) interpolates 0 → 100%.
  const armBox: React.CSSProperties = isHorizontal
    ? {
        position: "absolute",
        height: maxLayerW,
        // Pin the corner-side end so width: 0 → 100% extends toward the tip.
        ...(corner === "tl" || corner === "bl" ? { left: 0 } : { right: 0 }),
        ...(corner === "tl" || corner === "tr"
          ? { top: edgeOffset }
          : { bottom: edgeOffset }),
        width: drawn ? "100%" : 0,
        transition: `width ${animationDurationMs}ms ease-out`,
        overflow: "hidden",
      }
    : {
        position: "absolute",
        width: maxLayerW,
        ...(corner === "tl" || corner === "tr" ? { top: 0 } : { bottom: 0 }),
        ...(corner === "tl" || corner === "bl"
          ? { left: edgeOffset }
          : { right: edgeOffset }),
        height: drawn ? "100%" : 0,
        transition: `height ${animationDurationMs}ms ease-out`,
        overflow: "hidden",
      }

  return (
    <Box style={armBox}>
      {layers.map((layer, i) => (
        <Box
          key={i}
          style={
            isHorizontal
              ? {
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: (maxLayerW - layer.width) / 2,
                  height: layer.width,
                  backgroundColor: color,
                  opacity: layer.opacity,
                  borderRadius: layer.width / 2,
                }
              : {
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: (maxLayerW - layer.width) / 2,
                  width: layer.width,
                  backgroundColor: color,
                  opacity: layer.opacity,
                  borderRadius: layer.width / 2,
                }
          }
        />
      ))}
    </Box>
  )
}
