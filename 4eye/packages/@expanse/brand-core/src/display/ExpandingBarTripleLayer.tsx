"use client"

/**
 * ExpandingBarTripleLayer — review-copy reimplementation of ExpandingBar.
 *
 * Composition:
 *   - Outer wrapper `<Box>` / `ButtonBase` for layout, ripple, shadow.
 *   - One `<svg>` sized exactly to the wrapper's measured pixel dimensions.
 *   - Inside the svg:
 *       1. `<TripleLayerPillContent>` — brand triple-layer strokes + inner fill.
 *       2. `<foreignObject>` — children, hosted in SVG so this stays SVG end-to-end.
 *
 * Device independence:
 *   viewBox = `0 0 width height` in real pixels, default preserveAspectRatio.
 *   1 SVG unit == 1 CSS pixel, so stroke widths and corner radii render at
 *   their nominal sizes on every device / DPI. SVG handles the rest.
 *
 * The original `ExpandingBar` is left untouched.
 */

import { Box, ButtonBase, useTheme, alpha } from "@mui/material"
import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react"
import {
  ColorPreset,
  TripleLayerPreset,
} from "../primitives/borders/TripleLayerPath"
import {
  getTripleLayerPillInset,
  TripleLayerPillContent,
} from "../primitives/shapes/TripleLayerPill"
import type { TripleLayerPillVariantProps } from "../theme/types"
import "../theme/augmentation"

export type ExpandingBarTripleLayerVisualState =
  | "active"
  | "inactive"
  | "hovered"

export type ExpandingBarTripleLayerVariant =
  | "default"
  | "quiet"
  | "primary"
  | "ghost"

/**
 * Context value exposed by `ExpandingBarTripleLayer` to its children so that
 * inner content (icons, text) can read the theme-resolved content color
 * without each consumer re-deriving it from `visualState` + palette.
 */
export interface TripleLayerBarContextValue {
  contentColor: string
  visualState: ExpandingBarTripleLayerVisualState
  variant: ExpandingBarTripleLayerVariant
}

const TripleLayerBarContext =
  createContext<TripleLayerBarContextValue | null>(null)

/**
 * Hook for children rendered inside an `ExpandingBarTripleLayer` to read the
 * resolved content color (and current state) from the bar's variant. Returns
 * `null` when used outside the bar so callers can fall back gracefully.
 */
export function useTripleLayerBarContext(): TripleLayerBarContextValue | null {
  return useContext(TripleLayerBarContext)
}

export type ExpandingBarTripleLayerProps = {
  children: ReactNode
  /** Aspect ratio (width / height) of the bar's content box. Default: 6 */
  aspectRatio?: number
  /** Visual state affecting appearance. Default: 'active' */
  visualState?: ExpandingBarTripleLayerVisualState
  /** Whether to show ripple effect on click */
  enableRipple?: boolean
  /** Click handler */
  onClick?: () => void
  /** Shadow intensity (0-1) for active/clicked state */
  shadowIntensity?: number
  /** Group opacity (0-1) for GSAP animation. Default: 1 */
  layerOpacity?: number
  /** TripleLayerPath stroke-width preset. Default: `"cloud"`. */
  preset?: TripleLayerPreset
  /**
   * Theme variant key. Resolves stroke colors, inner fill, and content color
   * from `theme.components.TripleLayerPill.variants[variant]`. Default: `"default"`.
   *
   * - `default` : brand-loud (saturated halo, dark gradient)
   * - `quiet`   : HUD-friendly (low-opacity primary halo, surface tint)
   * - `ghost`   : neutral chrome (no brand color, transparent fill)
   */
  variant?: ExpandingBarTripleLayerVariant
  /**
   * Escape hatch: legacy `COLOR_PRESETS` color preset. When provided, wins
   * over the theme variant's stroke colors. Prefer `variant` for new code.
   */
  colorPreset?: ColorPreset
  /** Per-instance override for the inner-pill fill paint. Wins over the variant. */
  innerFill?: string
}

const TRANSITION_DURATION = "180ms"
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)"

/**
 * Hook: measure an element's pixel size with a ResizeObserver.
 * Returns `[setNode, { width, height }]`. Pass `setNode` as the element's ref.
 */
const useMeasuredSize = <T extends HTMLElement>() => {
  const [node, setNode] = useState<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!node) return

    // Initial sync read
    setSize({ width: node.clientWidth, height: node.clientHeight })

    if (typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(node)
    return () => ro.disconnect()
  }, [node])

  return [setNode, size] as const
}

export const ExpandingBarTripleLayer = forwardRef<
  HTMLElement,
  ExpandingBarTripleLayerProps
>(
  (
    {
      children,
      aspectRatio = 6,
      visualState = "active",
      enableRipple = false,
      onClick,
      shadowIntensity = 0,
      layerOpacity = 1,
      preset = "cloud",
      variant = "default",
      colorPreset,
      innerFill,
    },
    ref,
  ) => {
    const theme = useTheme()
    const [setMeasureNode, { width, height }] =
      useMeasuredSize<HTMLElement>()
    const fillId = `ebtl-fill-${useId().replace(/:/g, "")}`

    // Combined ref: forwarded ref + internal measurement ref.
    const setRef = useCallback(
      (node: HTMLElement | null) => {
        setMeasureNode(node)
        if (typeof ref === "function") ref(node)
        else if (ref)
          (ref as React.MutableRefObject<HTMLElement | null>).current = node
      },
      [ref, setMeasureNode],
    )

    const ready = width > 0 && height > 0
    const inset = getTripleLayerPillInset(preset)
    const innerW = Math.max(0, width - inset * 2)
    const innerH = Math.max(0, height - inset * 2)
    const innerRadius = Math.min(innerW, innerH) / 2

    const isInactive = visualState === "inactive"

    // Resolve the variant from theme. Fall back to a primary-derived default
    // so the component still renders sanely if the brand-core theme extension
    // hasn't been registered.
    const resolvedVariant: TripleLayerPillVariantProps = useMemo(() => {
      const fromTheme =
        theme.components?.TripleLayerPill?.variants?.[variant]
      if (fromTheme) return fromTheme
      const primary = theme.palette.primary.main
      return {
        outerStrokeColor: alpha(primary, 0.2),
        centerStrokeColor: alpha(primary, 0.5),
        innerStrokeColor: primary,
        innerFillColor: "linear-gradient(135deg, #0a1f2e 0%, #142b3f 100%)",
        contentColor: theme.palette.primary.contrastText,
        inactiveOpacity: 0.5,
        inactiveSaturation: 0.4,
      }
    }, [theme.components, theme.palette.primary.main, theme.palette.primary.contrastText, variant])

    const inactiveOpacityScale = resolvedVariant.inactiveOpacity ?? 0.5
    const inactiveSaturationScale = resolvedVariant.inactiveSaturation ?? 0.4

    // Halo (outer strokes) stays at full opacity — only dimmed when inactive.
    // `layerOpacity` (driven by GSAP) only fades the inner fill + content,
    // matching the original ExpandingBar's `middleFillOpacity` behaviour.
    const haloOpacity = isInactive ? Math.max(0.4, inactiveOpacityScale + 0.2) : 1
    const innerOpacity = isInactive
      ? inactiveOpacityScale * layerOpacity
      : layerOpacity
    const saturationFilter = isInactive
      ? `saturate(${inactiveSaturationScale})`
      : "saturate(1)"

    const contentColor = resolvedVariant.contentColor

    // Resolve the inner fill: explicit prop > variant fill. CSS gradient
    // strings get rendered into a generated <linearGradient> in <defs>.
    const effectiveInnerFill = innerFill ?? resolvedVariant.innerFillColor
    const isGradientFill = /^linear-gradient|^radial-gradient/i.test(
      effectiveInnerFill,
    )
    const fillRef = isGradientFill ? `url(#${fillId})` : effectiveInnerFill
    const gradientStops = useMemo(() => {
      if (!isGradientFill) return null
      // Very light parser: extract `color` `pos%` pairs after the angle.
      const match = effectiveInnerFill.match(
        /linear-gradient\([^,]+,\s*(.+)\)$/i,
      )
      if (!match) return null
      return match[1]
        .split(/,(?![^()]*\))/)
        .map((stop) => {
          const trimmed = stop.trim()
          const lastSpace = trimmed.lastIndexOf(" ")
          const color =
            lastSpace > 0 ? trimmed.slice(0, lastSpace).trim() : trimmed
          const pos = lastSpace > 0 ? trimmed.slice(lastSpace + 1) : "100%"
          return { color, offset: pos }
        });
    }, [isGradientFill, effectiveInnerFill])

    // Theme-resolved stroke overrides (the variant always wins over
    // `colorPreset`, but `colorPreset` still acts as the COLOR_PRESETS escape
    // hatch via the underlying TripleLayerPath).
    const strokeOverrides = colorPreset
      ? {}
      : {
          outerStroke: resolvedVariant.outerStrokeColor,
          centerStroke: resolvedVariant.centerStrokeColor,
          innerStroke: resolvedVariant.innerStrokeColor,
        }

    const boxShadow =
      shadowIntensity > 0
        ? `0 ${4 * shadowIntensity}px ${12 * shadowIntensity}px rgba(0,0,0,${
            0.15 * shadowIntensity
          })`
        : "none"

    const svg = ready ? (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          display: "block",
          overflow: "visible",
          filter: saturationFilter,
          transition: `filter ${TRANSITION_DURATION} ${EASING}`,
        }}
        aria-hidden
      >
        {/* Halo strokes — always visible, never faded by GSAP */}
        <g
          style={{
            opacity: haloOpacity,
            transition: `opacity ${TRANSITION_DURATION} ${EASING}`,
          }}
        >
          <TripleLayerPillContent
            width={width}
            height={height}
            fill="transparent"
            preset={preset}
            colorPreset={colorPreset}
            direction="outward"
            {...strokeOverrides}
          />
        </g>

        {/* Inner fill + content — fades together with `layerOpacity` */}
        <g
          style={{
            opacity: innerOpacity,
            transition: `opacity ${TRANSITION_DURATION} ${EASING}`,
          }}
        >
          {innerW > 0 && innerH > 0 && (
            <>
              {isGradientFill && gradientStops && (
                <defs>
                  <linearGradient
                    id={fillId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    {gradientStops.map((s, i) => (
                      <stop
                        key={i}
                        offset={s.offset}
                        stopColor={s.color}
                      />
                    ))}
                  </linearGradient>
                </defs>
              )}
              <rect
                x={inset}
                y={inset}
                width={innerW}
                height={innerH}
                rx={innerRadius}
                ry={innerRadius}
                fill={fillRef}
              />
              <foreignObject
                x={inset}
                y={inset}
                width={innerW}
                height={innerH}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: contentColor,
                    borderRadius: innerRadius,
                    overflow: "hidden",
                    transition: `color ${TRANSITION_DURATION} ${EASING}`,
                  }}
                >
                  <TripleLayerBarContext.Provider
                    value={{ contentColor, visualState, variant }}
                  >
                    {children}
                  </TripleLayerBarContext.Provider>
                </div>
              </foreignObject>
            </>
          )}
        </g>
      </svg>
    ) : null

    const wrapperSx = {
      width: "100%",
      height: "100%",
      position: "relative" as const,
      cursor: onClick ? "pointer" : "default",
      boxShadow,
      borderRadius: ready ? `${height / 2}px` : "9999px",
      transition: `box-shadow ${TRANSITION_DURATION} ${EASING}`,
      // Preserve aspect ratio when only one dim is constrained by parent.
      // Consumers typically set both, but this keeps callers simple.
      aspectRatio: aspectRatio ? `${aspectRatio} / 1` : undefined,
      overflow: "visible" as const,
    }

    if (enableRipple && onClick) {
      return (
        <ButtonBase
          ref={setRef as (node: HTMLButtonElement | null) => void}
          onClick={onClick}
          sx={{ ...wrapperSx, display: "block" }}
        >
          {svg}
        </ButtonBase>
      )
    }

    return (
      <Box
        ref={setRef as (node: HTMLDivElement | null) => void}
        onClick={onClick}
        sx={wrapperSx}
      >
        {svg}
      </Box>
    )
  },
)

ExpandingBarTripleLayer.displayName = "ExpandingBarTripleLayer"
