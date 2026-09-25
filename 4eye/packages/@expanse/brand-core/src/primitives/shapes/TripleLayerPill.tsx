"use client"

/**
 * TripleLayerPill — perfectly circular-capped pill rendered with the canonical
 * brand `TripleLayerPath` strokes on the outside and a fill on the inside.
 *
 * ## Why this exists
 *
 * `TripleLayerPath` takes any SVG path and paints 3 stacked strokes. This
 * primitive specializes it for the most common UI shape: a rounded rectangle
 * whose corner radius is exactly half its short side — i.e. a pill at any
 * aspect ratio, and a circle when width == height.
 *
 * ## Device independence
 *
 * The viewBox is `0 0 width height`, where `width`/`height` are real pixel
 * dimensions. With the default `preserveAspectRatio` (`xMidYMid meet`), 1
 * SVG unit = 1 CSS pixel, so:
 *   - stroke widths from `TripleLayerPath` presets render at their stated px,
 *   - corners with `radius = min(w,h)/2` are mathematically circular,
 *   - everything is crisp on every device / DPI (SVG is resolution-independent).
 *
 * ## Two entry points
 *
 *  - `TripleLayerPill`         — full self-contained `<svg>` element.
 *  - `TripleLayerPillContent`  — the inner `<defs>` + `<g>` only, for hosts
 *                                that already own the outer `<svg>` (e.g. the
 *                                ExpandingBarTripleLayer wrapper that adds a
 *                                sibling `<foreignObject>` for HTML children).
 */

import React, { useId } from "react"
import {
  ColorPreset,
  StrokeDirection,
  TripleLayerPath,
  TripleLayerPreset,
} from "../borders/TripleLayerPath"

// ============================================================
// SHARED PROPS
// ============================================================

export type TripleLayerPillBaseProps = {
  /** Pill width in px. Used as both viewBox width and CSS width. */
  width: number
  /** Pill height in px. Used as both viewBox height and CSS height. */
  height: number
  /**
   * Corner radius in px. Defaults to `min(width, height) / 2`, which gives:
   *   - a perfect circle when width == height,
   *   - a perfect pill when width != height.
   */
  radius?: number
  /**
   * Inner fill paint string. Accepts colors, gradients, or `url(#id)`.
   * If omitted, a default dark cyan→indigo linear gradient is generated
   * inline so the pill reads as the inverse of a light background.
   */
  fill?: string
  /** Stroke-width preset. Default: `"cloud"` (12 / 5 / 2). */
  preset?: TripleLayerPreset
  /** Stroke color preset. Default: `"cloudStyle"` (20 / 50 / 100% cyan). */
  colorPreset?: ColorPreset
  /** Stroke direction. Default: `"outward"`. */
  direction?: StrokeDirection
  /** Override outer stroke color (wins over `colorPreset` and theme). */
  outerStroke?: string
  /** Override center stroke color (wins over `colorPreset` and theme). */
  centerStroke?: string
  /** Override inner stroke color (wins over `colorPreset` and theme). */
  innerStroke?: string
}

// ============================================================
// GEOMETRY
// ============================================================

/**
 * Build an SVG path string for a rounded rectangle. Pass `r = h/2` for a pill
 * (or `r = w/2` for a vertical pill / circle when w == h).
 */
const roundedRectPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): string => {
  const rad = Math.min(r, w / 2, h / 2)
  return [
    `M${x + rad},${y}`,
    `H${x + w - rad}`,
    `A${rad},${rad} 0 0 1 ${x + w},${y + rad}`,
    `V${y + h - rad}`,
    `A${rad},${rad} 0 0 1 ${x + w - rad},${y + h}`,
    `H${x + rad}`,
    `A${rad},${rad} 0 0 1 ${x},${y + h - rad}`,
    `V${y + rad}`,
    `A${rad},${rad} 0 0 1 ${x + rad},${y}`,
    "Z",
  ].join(" ")
}

/**
 * Look up the outer stroke width for a preset so the path can be inset by
 * half of it — that way the outer stroke edge lands exactly at the viewBox
 * boundary. Synced with `TRIPLE_LAYER_PRESETS` in TripleLayerPath.tsx.
 */
const PRESET_OUTER_WIDTH: Record<string, number> = {
  brandStandard: 6,
  standard: 6,
  "1-2-3_micro": 0.75,
  "1-2-3_xxs": 1.5,
  "1-2-3_xs": 3,
  "1-2-3_sm": 4.5,
  "1-2-3_md": 6,
  "1-2-3_lg": 9,
  "1-2-3_xl": 12,
  "1-2-3_xxl": 15,
  cloud: 12,
  "7-3-1": 14,
  "7-3-1_micro": 1.75,
  "7-3-1_xxs": 3.5,
  "7-3-1_xs": 5.25,
  "7-3-1_sm": 7,
  "7-3-1_md": 14,
  "7-3-1_lg": 21,
  default: 14,
  balanced: 2,
  "1-2-1_micro": 0.25,
  "1-2-1_xxs": 0.5,
  "1-2-1_xs": 0.75,
  "1-2-1_sm": 1,
  "1-2-1_md": 2,
  "1-2-1_lg": 3,
  "1-2-1_xl": 4,
  centerFocus: 2,
  "1-3-1_micro": 0.25,
  "1-3-1_xxs": 0.5,
  "1-3-1_xs": 0.75,
  "1-3-1_sm": 1,
  "1-3-1_md": 2,
  "1-3-1_lg": 3,
  thin: 3,
  small: 4.5,
  medium: 9,
}

/**
 * Compute the path inset (= outer stroke half-width) so the outer stroke
 * lands exactly at the viewBox boundary regardless of preset.
 */
export const getTripleLayerPillInset = (preset: TripleLayerPreset): number => {
  return (PRESET_OUTER_WIDTH[preset] ?? 12) / 2
}

// ============================================================
// CONTENT (inner <defs> + <g>) — for hosts that own the <svg>
// ============================================================

export type TripleLayerPillContentProps = TripleLayerPillBaseProps

/**
 * Renders the `<defs>` (when needed) and the `<TripleLayerPath>` for a pill.
 * Use this when an outer `<svg>` already exists (e.g. ExpandingBarTripleLayer
 * adds a sibling `<foreignObject>`). Otherwise prefer `<TripleLayerPill>`.
 */
export function TripleLayerPillContent({
  width,
  height,
  radius,
  fill,
  preset = "cloud",
  colorPreset = "cloudStyle",
  direction = "outward",
  outerStroke,
  centerStroke,
  innerStroke,
}: TripleLayerPillContentProps) {
  // Stable per-render gradient id (only used when no `fill` override).
  const reactId = useId().replace(/:/g, "")
  const gradientId = `tlp-fill-${reactId}`

  const inset = getTripleLayerPillInset(preset)
  const innerW = Math.max(0, width - inset * 2)
  const innerH = Math.max(0, height - inset * 2)
  const r = radius ?? Math.min(innerW, innerH) / 2

  const d = roundedRectPath(inset, inset, innerW, innerH, r)

  const useDefaultGradient = !fill
  const resolvedFill = fill ?? `url(#${gradientId})`

  return (
    <>
      {useDefaultGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0a1f2e" />
            <stop offset="100%" stopColor="#142b3f" />
          </linearGradient>
        </defs>
      )}
      <TripleLayerPath
        d={d}
        fill={resolvedFill}
        preset={preset}
        colorPreset={colorPreset}
        direction={direction}
        outerStroke={outerStroke}
        centerStroke={centerStroke}
        innerStroke={innerStroke}
        strokeLinecap="round"
        namePrefix="TripleLayerPill"
      />
    </>
  )
}

// ============================================================
// FULL COMPONENT — self-contained <svg>
// ============================================================

export type TripleLayerPillProps = TripleLayerPillBaseProps & {
  className?: string
  style?: React.CSSProperties
  /** Optional aria-label (rendered on the `<svg>`). */
  "aria-label"?: string
}

/**
 * Self-contained pill with triple-layer brand strokes.
 *
 * @example
 * ```tsx
 * // Long pill
 * <TripleLayerPill width={200} height={28} />
 *
 * // Profile circle (1:1)
 * <TripleLayerPill width={36} height={36} />
 *
 * // Custom fill / preset
 * <TripleLayerPill width={120} height={28} preset="1-2-3_md" fill="#0a1f2e" />
 * ```
 */
export function TripleLayerPill({
  width,
  height,
  radius,
  fill,
  preset = "cloud",
  colorPreset = "cloudStyle",
  direction = "outward",
  outerStroke,
  centerStroke,
  innerStroke,
  className,
  style,
  "aria-label": ariaLabel,
}: TripleLayerPillProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      // Default preserveAspectRatio (xMidYMid meet) is correct for square
      // viewBoxes; for non-square pills it would letterbox. We size the
      // outer <svg> to the exact aspect ratio so meet == none visually.
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
    >
      <TripleLayerPillContent
        width={width}
        height={height}
        radius={radius}
        fill={fill}
        preset={preset}
        colorPreset={colorPreset}
        direction={direction}
        outerStroke={outerStroke}
        centerStroke={centerStroke}
        innerStroke={innerStroke}
      />
    </svg>
  )
}
