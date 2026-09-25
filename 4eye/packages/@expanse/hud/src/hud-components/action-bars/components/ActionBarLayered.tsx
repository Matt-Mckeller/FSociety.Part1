"use client"

import React, { useRef, useState, useLayoutEffect, useMemo, forwardRef } from "react"
import { Box, useTheme } from "@mui/material"
import { alpha, lighten } from "@mui/material/styles"
import {
  TripleLayerPath,
  TRIPLE_LAYER_PRESETS,
  COLOR_PRESETS,
  type TripleLayerPreset as BrandCoreTripleLayerPreset,
  type ColorPreset,
} from "@expanse/brand-core"
import type { ActionBarProps, ActionBarLayerConfig, TripleLayerPreset, ActionBarShapeConfig, TripleLayerVisualState } from "../types"
import {
  DEFAULT_THICKNESS,
  DEFAULT_GAP,
  DEFAULT_PADDING,
  TRIPLE_LAYER_STROKE_WIDTHS,
  TRIPLE_LAYER_OPACITIES,
  ACTION_BAR_SHAPE_RADIUS,
  ACTION_BAR_EDGE_SHAPE_RADIUS,
  ACTION_BAR_THICKNESS_PX,
  resolveActionBarThickness,
  resolveActionBarLength,
} from "../types"
import { ActionBarSurfaceContext } from "../context"

// =============================================================================
// Types
// =============================================================================

export interface ActionBarLayeredProps extends Omit<ActionBarProps, "layered"> {
  /** Layer configuration */
  layerConfig?: ActionBarLayerConfig
}

// =============================================================================
// Constants
// =============================================================================

const TRANSITION_DURATION = "180ms"
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)"

// =============================================================================
// Helpers
// =============================================================================

/**
 * Generate an SVG path for a rounded rectangle
 * This is needed because TripleLayerPath works with path `d` attributes
 */
function createRoundedRectPath(
  width: number,
  height: number,
  radius: number,
  offsetX = 0,
  offsetY = 0
): string {
  // Clamp radius to half the minimum dimension
  const r = Math.min(radius, width / 2, height / 2)
  const x = offsetX
  const y = offsetY
  const w = width
  const h = height

  // Create rounded rect path using arcs
  return [
    `M ${x + r} ${y}`,                              // Start at top-left after radius
    `L ${x + w - r} ${y}`,                          // Top edge
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,          // Top-right corner arc
    `L ${x + w} ${y + h - r}`,                      // Right edge  
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,      // Bottom-right corner arc
    `L ${x + r} ${y + h}`,                          // Bottom edge
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,          // Bottom-left corner arc
    `L ${x} ${y + r}`,                              // Left edge
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,              // Top-left corner arc
    `Z`,                                             // Close path
  ].join(" ")
}

/**
 * Map our preset names to brand-core preset names
 */
function mapPresetToBrandCore(preset: TripleLayerPreset): BrandCoreTripleLayerPreset {
  const mapping: Record<TripleLayerPreset, BrandCoreTripleLayerPreset> = {
    standard: "standard",
    cloud: "cloud",
    dramatic: "7-3-1",
    balanced: "balanced",
    centerFocus: "centerFocus",
    thin: "thin",
  }
  return mapping[preset] ?? "standard"
}

// =============================================================================
// Component
// =============================================================================

/**
 * ActionBarLayered - 3-layer SVG-based ActionBar
 *
 * Uses brand-core's TripleLayerPath to render the distinctive Expanse
 * "glow" effect with three overlapping strokes creating depth:
 * 
 * - Outer stroke: Wide, low opacity (diffuse glow/halo)
 * - Center stroke: Medium width/opacity (transition zone)
 * - Inner stroke: Thin, high opacity (sharp definition)
 *
 * This matches the LighteningCloud and other brand-core patterns.
 */
export const ActionBarLayered = forwardRef<HTMLDivElement, ActionBarLayeredProps>(
  function ActionBarLayered(props, ref) {
    const theme = useTheme()
    const svgRef = useRef<SVGSVGElement>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const {
      children,
      // Visual
      shape = "pill",
      // Size
      thickness = DEFAULT_THICKNESS,
      length,
      // Layout
      orientation = "horizontal",
      alignment = "center",
      gap = DEFAULT_GAP,
      padding = DEFAULT_PADDING,
      // Behavior
      disabled = false,
      sx,
      // Layer config
      layerConfig = {},
    } = props

    // ===== Resolve Layer Config =====
    const {
      preset = "standard",
      colorPreset = "brand",
      colorScheme = "primary",
      outerWidth,
      centerWidth,
      innerWidth,
      outerOpacity,
      centerOpacity,
      innerOpacity,
      customBaseColor,
      fill = "none",
      fillInset = 0,
      colorProgress = 1,
      visualState = "active",
    } = layerConfig

    // ===== Resolve Sizes =====
    const thicknessPx = resolveActionBarThickness(thickness) ?? ACTION_BAR_THICKNESS_PX.md
    const isHorizontal = orientation === "horizontal"

    // ===== Track container size for SVG viewBox =====
    const [containerSize, setContainerSize] = useState({ width: 300, height: thicknessPx })

    useLayoutEffect(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          setContainerSize({ width: rect.width, height: rect.height })
        }
      }
    }, [length, thicknessPx, isHorizontal])

    // ===== Calculate viewBox (normalize to height=100) =====
    const viewBoxHeight = 100
    const aspectRatio = containerSize.width / containerSize.height
    const viewBoxWidth = viewBoxHeight * aspectRatio

    // ===== Get stroke widths from preset or overrides =====
    const strokeWidths = TRIPLE_LAYER_STROKE_WIDTHS[preset] ?? TRIPLE_LAYER_STROKE_WIDTHS.standard
    const finalOuterWidth = outerWidth ?? strokeWidths.outer
    const finalCenterWidth = centerWidth ?? strokeWidths.center
    const finalInnerWidth = innerWidth ?? strokeWidths.inner

    // ===== Get opacities from color preset or overrides =====
    const opacities = TRIPLE_LAYER_OPACITIES[colorPreset] ?? TRIPLE_LAYER_OPACITIES.brand
    const finalOuterOpacity = outerOpacity ?? opacities.outer
    const finalCenterOpacity = centerOpacity ?? opacities.center
    const finalInnerOpacity = innerOpacity ?? opacities.inner

    // ===== Resolve base color =====
    const baseColor = useMemo(() => {
      if (colorScheme === "custom" && customBaseColor) {
        return customBaseColor
      }
      const palette = colorScheme === "secondary" 
        ? theme.palette.secondary 
        : theme.palette.primary
      return palette.main
    }, [colorScheme, customBaseColor, theme.palette])

    // ===== Build stroke colors with opacity =====
    const strokeColors = useMemo(() => {
      // Apply colorProgress (0=lighter, 1=normal) by reducing opacity
      let opacityMultiplier = 0.5 + (colorProgress * 0.5) // Range: 0.5 to 1.0
      
      // Apply visualState effects
      // - active: normal (1.0)
      // - inactive: dimmed (0.4)
      // - hovered: enhanced (1.1)
      const stateMultiplier = visualState === "inactive" ? 0.4 
        : visualState === "hovered" ? 1.1 
        : 1.0
      opacityMultiplier *= stateMultiplier
      
      // For hovered state, slightly lighten the base color for a glow effect
      const effectiveColor = visualState === "hovered" 
        ? lighten(baseColor, 0.15) 
        : baseColor
      
      return {
        outer: alpha(effectiveColor, Math.min(finalOuterOpacity * opacityMultiplier, 1)),
        center: alpha(effectiveColor, Math.min(finalCenterOpacity * opacityMultiplier, 1)),
        inner: alpha(effectiveColor, Math.min(finalInnerOpacity * opacityMultiplier, 1)),
      }
    }, [baseColor, finalOuterOpacity, finalCenterOpacity, finalInnerOpacity, colorProgress, visualState])

    // ===== Calculate total stroke margin (for content area) =====
    // The strokes are centered on the path, so half extends inward
    const maxStrokeWidth = Math.max(finalOuterWidth, finalCenterWidth, finalInnerWidth)
    const strokeMargin = maxStrokeWidth / 2

    // Scale stroke widths to SVG units (based on viewBoxHeight = 100)
    const strokeScale = viewBoxHeight / containerSize.height
    const scaledOuterWidth = finalOuterWidth * strokeScale
    const scaledCenterWidth = finalCenterWidth * strokeScale
    const scaledInnerWidth = finalInnerWidth * strokeScale
    const scaledMaxStroke = maxStrokeWidth * strokeScale
    const scaledFillInset = fillInset * strokeScale

    // ===== Border radius based on shape =====
    const borderRadius = useMemo(() => {
      const availableHeight = viewBoxHeight - scaledMaxStroke
      
      if (shape === "pill") {
        // Pill = fully rounded ends
        return availableHeight / 2
      }
      
      if (shape === "square") {
        return 0
      }
      
      // For rounded/softRounded, get the CSS radius and scale to viewBox units
      const cssRadius = ACTION_BAR_SHAPE_RADIUS[shape as keyof typeof ACTION_BAR_SHAPE_RADIUS] ?? 8
      // Scale from pixels to viewBox units
      const scaledRadius = cssRadius * (viewBoxHeight / containerSize.height)
      // Clamp to not exceed pill radius
      return Math.min(scaledRadius, availableHeight / 2)
    }, [shape, viewBoxHeight, scaledMaxStroke, containerSize.height])

    // ===== Create the rounded rectangle path =====
    const rectPath = useMemo(() => {
      // Path should be inset by half the max stroke so strokes don't clip
      const pathInset = scaledMaxStroke / 2
      return createRoundedRectPath(
        viewBoxWidth - scaledMaxStroke,
        viewBoxHeight - scaledMaxStroke,
        Math.max(0, borderRadius),
        pathInset,
        pathInset
      )
    }, [viewBoxWidth, viewBoxHeight, scaledMaxStroke, borderRadius])

    // ===== Fill configuration =====
    const fillValue = useMemo(() => {
      if (fill === "none") return "none"
      if (fill === "gradient") return `url(#layered-fill-gradient)`
      if (fill === "solid") return alpha(baseColor, 0.1)
      // Custom color string
      return fill
    }, [fill, baseColor])

    // ===== Content area calculation =====
    // Content goes inside the innermost stroke
    const contentInset = scaledMaxStroke + scaledFillInset
    const contentWidth = viewBoxWidth - contentInset * 2
    const contentHeight = viewBoxHeight - contentInset * 2

    // ===== Size styles =====
    const sizeStyles: Record<string, unknown> = {
      width: isHorizontal ? (length ? resolveActionBarLength(length) : "auto") : thicknessPx,
      height: isHorizontal ? thicknessPx : (length ? resolveActionBarLength(length) : "auto"),
      minWidth: isHorizontal ? 120 : undefined,
      minHeight: !isHorizontal ? 120 : undefined,
    }

    // ===== Surface color mode (for child icon colors) =====
    const surfaceColorMode: "dark" | "light" = "dark"

    // ===== Render =====
    return (
      <ActionBarSurfaceContext.Provider value={{ surfaceColorMode }}>
        <Box
          ref={(el: HTMLDivElement | null) => {
            // Handle both refs
            if (typeof ref === "function") ref(el)
            else if (ref) ref.current = el
            containerRef.current = el
          }}
          sx={{
            ...sizeStyles,
            position: "relative",
            pointerEvents: disabled ? "none" : "auto",
            opacity: disabled ? 0.5 : 1,
            ...sx,
          }}
        >
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              overflow: "visible", // Allow strokes to extend slightly
            }}
          >
            {/* Gradient definition for fill - darkness to light brand pattern */}
            {fill === "gradient" && (
              <defs>
                <linearGradient id="layered-fill-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={alpha(baseColor, 0.02)} />
                  <stop offset="40%" stopColor={alpha(baseColor, 0.08)} />
                  <stop offset="100%" stopColor={lighten(baseColor, 0.3)} stopOpacity={0.15} />
                </linearGradient>
              </defs>
            )}

            {/* Triple-layer stroke pattern using brand-core component */}
            <TripleLayerPath
              d={rectPath}
              fill={fillValue}
              preset={mapPresetToBrandCore(preset)}
              outerWidth={scaledOuterWidth}
              centerWidth={scaledCenterWidth}
              innerWidth={scaledInnerWidth}
              outerStroke={strokeColors.outer}
              centerStroke={strokeColors.center}
              innerStroke={strokeColors.inner}
              strokeLinecap="round"
            />

            {/* Content via foreignObject */}
            <foreignObject
              x={contentInset}
              y={contentInset}
              width={Math.max(0, contentWidth)}
              height={Math.max(0, contentHeight)}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: isHorizontal ? "row" : "column",
                  alignItems: "center",
                  justifyContent: alignment,
                  gap: `${gap}px`,
                  padding: `${padding}px`,
                  boxSizing: "border-box",
                }}
              >
                {children}
              </Box>
            </foreignObject>
          </svg>
        </Box>
      </ActionBarSurfaceContext.Provider>
    )
  }
)

ActionBarLayered.displayName = "ActionBarLayered"
