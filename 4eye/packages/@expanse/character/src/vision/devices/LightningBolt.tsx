"use client"

/**
 * LightningBolt — modernized ⚡ SVG for the Control slide.
 *
 * Replaces the chunky cartoon ShockSvg. Two uses:
 *   1. Per-press pulse: small, fast, travels between controller and strip.
 *   2. LEVEL UP sweep: larger, spans all strip nodes briefly.
 *
 * Visual spec:
 *   - Stroked path (not filled cartoon). 2px core with 6px brand-glow blur.
 *   - 2–3 segments max — single sharp angle.
 *   - Animated via stroke-dashoffset for a "drawn-on" feel.
 *   - Color follows pressed button (via `color` prop).
 */

import React, { forwardRef } from "react"

/** Node-color palette matching the controller face buttons. */
export const BOLT_COLORS = {
  improve: "#8b5cf6",  // △ violet
  heal:    "#14b8a6",  // ○ teal
  protect: "#f59e0b",  // ✕ amber
  win:     "#6366f1",  // ▢ indigo
  sweep:   "#f59e0b",  // LEVEL UP sweep (amber default)
} as const

export type BoltColor = keyof typeof BOLT_COLORS

interface LightningBoltProps {
  width?: number
  height?: number
  color?: string
  /** Opacity of the glow halo behind the core stroke. */
  glowOpacity?: number
  className?: string
  style?: React.CSSProperties
  "aria-hidden"?: boolean
}

/**
 * Single-angle lightning bolt, left-to-right, tip at bottom-right.
 * Path: top-left → mid-right → bottom-left → (inner fill) → back.
 *
 *   (0,2) ──────────(24,2)
 *                  ╲
 *                   (18,14)
 *                  ╱
 *   (6,26)────────(36,26)
 *
 * 2-segment stroke path: (2,2) → (20,13) → (2,24) — sleek, modern.
 */
export const LightningBolt = forwardRef<SVGSVGElement, LightningBoltProps>(
  function LightningBolt(
    { width = 28, height = 36, color = "#f59e0b", glowOpacity = 0.45, className, style, ...rest },
    ref,
  ) {
    const id = React.useId()
    const filterId = `lb-glow-${id}`
    // Path: 3-point zigzag (top-center → mid-right → bottom-center)
    // Scaled to fit the viewBox 0 0 28 36
    const path = "M16 2 L4 18 L12 18 L10 34 L24 16 L16 16 Z"

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 28 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        {...rest}
      >
        <defs>
          <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={color} floodOpacity={glowOpacity} result="coloredBlur" />
            <feComposite in="coloredBlur" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Glow halo */}
        <path
          d={path}
          fill={color}
          opacity={glowOpacity * 0.5}
          filter={`url(#${filterId})`}
        />
        {/* Core fill */}
        <path
          d={path}
          fill={color}
          stroke={color}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
      </svg>
    )
  },
)
