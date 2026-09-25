"use client"

/**
 * ShapeChip
 *
 * A small indicator chip at one of two scales, in one of several silhouettes.
 *
 * - **filled**: colored fill via `clipPath` + drop-shadow glow + an optional
 *   `glyph` ReactNode rendered inside (e.g. a symbol icon).
 * - **empty**: dashed outline of the same silhouette, accent-tinted.
 *
 * The component is generic: callers supply a resolved `hex` color string
 * and a pre-rendered `glyph` node so this module has no dependency on
 * the @4eye domain packages.
 *
 * The triangle is the original silhouette (this started life as
 * `TriangleChip`) and its geometry is preserved exactly — the other shapes
 * are fitted to the same height so a strip of chips keeps its baseline and
 * the surrounding layout never reflows when the shape changes.
 */

import React, { type ReactNode } from "react"
import { Box } from "@mui/material"

// ─── Scale ───────────────────────────────────────────────────────────────────

export const SHAPE_CHIP_SIZE = {
  /** Small chip — used in compact / mobile contexts */
  small: { w: 14, h: 13, strokeWidth: 1.25, strokeDash: "2.5 1.5", glyphSize: 9 },
  /** Big chip — used in desktop selected-state strip */
  big:   { w: 26, h: 24, strokeWidth: 1.75, strokeDash: "4 2",     glyphSize: 16 },
} as const

export type ShapeChipScale = keyof typeof SHAPE_CHIP_SIZE

// ─── Silhouettes ─────────────────────────────────────────────────────────────

export const CHIP_SHAPES = [
  "triangle",
  "circle",
  "square",
  "diamond",
  "hexagon",
  "shield",
] as const

export type ChipShape = (typeof CHIP_SHAPES)[number]

type Vertex = readonly [number, number]

interface ShapeGeometry {
  /** Human label — for tooltips / aria on shape pickers. */
  label: string
  /** Width as a multiple of the scale's height. Height is the fixed dimension. */
  aspect: number
  /**
   * Outline vertices in a normalized 0..1 box, clockwise from the top.
   * `null` means the shape is a circle and is drawn analytically.
   */
  points: readonly Vertex[] | null
  /** Corner rounding as a fraction of height. Only meaningful for `points`. */
  radius?: number
  /**
   * Nudge the inner glyph toward the shape's visual centroid, as a fraction
   * of height. Positive moves down (triangle), negative up (shield).
   */
  glyphShift: number
  /**
   * Shrink the inner glyph so the silhouette doesn't eat it. Only shapes
   * that narrow sharply on *both* axes need this — the triangle deliberately
   * keeps 1 because its clipped corners are the look this started from.
   */
  glyphScale?: number
}

export const CHIP_SHAPE_GEOMETRY: Record<ChipShape, ShapeGeometry> = {
  triangle: {
    label: "Triangle",
    // 26 / 24 — the original chip's exact proportions.
    aspect: 13 / 12,
    points: [[0.5, 0], [1, 1], [0, 1]],
    glyphShift: 5 / 24,
  },
  circle: {
    label: "Circle",
    aspect: 1,
    points: null,
    glyphShift: 0,
  },
  square: {
    label: "Square",
    aspect: 1,
    points: [[0, 0], [1, 0], [1, 1], [0, 1]],
    radius: 0.14,
    glyphShift: 0,
  },
  diamond: {
    label: "Diamond",
    aspect: 1,
    points: [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]],
    glyphShift: 0,
    // A diamond's inscribed square is only half its width.
    glyphScale: 0.78,
  },
  hexagon: {
    label: "Hexagon",
    aspect: 0.92,
    points: [[0.5, 0], [1, 0.25], [1, 0.75], [0.5, 1], [0, 0.75], [0, 0.25]],
    glyphShift: 0,
  },
  shield: {
    label: "Shield",
    aspect: 0.86,
    points: [[0, 0], [1, 0], [1, 0.55], [0.5, 1], [0, 0.55]],
    glyphShift: -0.06,
  },
}

/** Resolved pixel box for a shape at a scale. */
export function shapeChipBox(shape: ChipShape, scale: ShapeChipScale) {
  const { h } = SHAPE_CHIP_SIZE[scale]
  return { w: Math.round(h * CHIP_SHAPE_GEOMETRY[shape].aspect), h }
}

/** `clip-path` value for the filled silhouette. */
function clipPathFor(shape: ChipShape): string {
  const { points } = CHIP_SHAPE_GEOMETRY[shape]
  if (!points) return "circle(50% at 50% 50%)"
  return `polygon(${points.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(", ")})`
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface ShapeChipProps {
  /**
   * Render filled (selected) or empty (outline) variant.
   * @default false
   */
  filled?: boolean
  /**
   * Silhouette.
   * @default "triangle"
   */
  shape?: ChipShape
  /**
   * Size variant.
   * @default "big"
   */
  scale?: ShapeChipScale
  /**
   * Hex color for the fill and glow (filled) or the dashed outline (empty).
   * Required for filled; used as accent tint for empty.
   */
  hex: string
  /**
   * Optional glyph rendered inside the shape when filled.
   * Rendered at the shape's visual centroid.
   */
  glyph?: ReactNode
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ShapeChip({
  filled = false,
  shape = "triangle",
  scale = "big",
  hex,
  glyph,
}: ShapeChipProps) {
  const { strokeWidth: sw, strokeDash: dash } = SHAPE_CHIP_SIZE[scale]
  const { w, h } = shapeChipBox(shape, scale)
  const geo = CHIP_SHAPE_GEOMETRY[shape]

  // ── Empty / outline variant ────────────────────────────────────────────────
  if (!filled) {
    // Vertices are inset by the stroke width so the stroke isn't clipped:
    // the normalized box maps onto [sw, size - sw].
    const px = (x: number) => sw + x * (w - 2 * sw)
    const py = (y: number) => sw + y * (h - 2 * sw)

    return (
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        {geo.points === null ? (
          <circle
            cx={w / 2}
            cy={h / 2}
            r={(Math.min(w, h) - sw) / 2}
            fill="none"
            stroke={`${hex}cc`}
            strokeWidth={sw}
            strokeDasharray={dash}
          />
        ) : geo.radius ? (
          <rect
            x={sw}
            y={sw}
            width={w - 2 * sw}
            height={h - 2 * sw}
            rx={geo.radius * h}
            fill="none"
            stroke={`${hex}cc`}
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeDasharray={dash}
          />
        ) : (
          <polygon
            points={geo.points.map(([x, y]) => `${px(x)},${py(y)}`).join(" ")}
            fill="none"
            stroke={`${hex}cc`}
            strokeWidth={sw}
            strokeLinejoin="round"
            strokeDasharray={dash}
          />
        )}
      </svg>
    )
  }

  // ── Filled variant ─────────────────────────────────────────────────────────
  // A rounded square is a border-radius, not a clip — clipping square corners
  // would be a no-op and lose the rounding.
  const isRoundedRect = geo.points !== null && Boolean(geo.radius)
  const shift = geo.glyphShift * h

  return (
    <Box sx={{ display: "inline-flex", filter: `drop-shadow(0 0 4px ${hex})` }}>
      <Box
        sx={{
          width: w,
          height: h,
          ...(isRoundedRect
            ? { borderRadius: `${geo.radius! * h}px` }
            : { clipPath: clipPathFor(shape) }),
          bgcolor: `${hex}99`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(shift >= 0 ? { pt: `${shift}px` } : { pb: `${-shift}px` }),
          overflow: "hidden",
        }}
      >
        {/* White halo around the inner glyph */}
        {glyph && (
          <Box
            sx={{
              display: "inline-flex",
              filter: "drop-shadow(0 0 2px rgba(255,255,255,0.9))",
              ...(geo.glyphScale
                ? { transform: `scale(${geo.glyphScale})` }
                : null),
            }}
          >
            {glyph}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ShapeChip
