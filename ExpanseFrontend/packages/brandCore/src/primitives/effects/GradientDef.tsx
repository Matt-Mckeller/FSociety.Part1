/**
 * Gradient Definitions
 *
 * SVG gradient definitions for consistent styling.
 */

"use client"

import React from "react"
import type {
  LinearGradientConfig,
  RadialGradientConfig,
  GradientStop,
} from "../../types"
import { lightAngleToGradientPosition } from "../../utils/geometry"

/**
 * Linear gradient definition
 */
export interface LinearGradientDefProps extends LinearGradientConfig {}

export function LinearGradientDef({
  id,
  x1 = "0%",
  y1 = "0%",
  x2 = "100%",
  y2 = "0%",
  stops,
}: LinearGradientDefProps) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map((stop, i) => (
        <stop
          key={i}
          offset={
            typeof stop.offset === "number"
              ? `${stop.offset * 100}%`
              : stop.offset
          }
          stopColor={stop.color}
          stopOpacity={stop.opacity}
        />
      ))}
    </linearGradient>
  )
}

/**
 * Radial gradient definition
 */
export interface RadialGradientDefProps extends RadialGradientConfig {}

export function RadialGradientDef({
  id,
  cx = "50%",
  cy = "50%",
  r = "50%",
  fx,
  fy,
  stops,
}: RadialGradientDefProps) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r={r} fx={fx} fy={fy}>
      {stops.map((stop, i) => (
        <stop
          key={i}
          offset={
            typeof stop.offset === "number"
              ? `${stop.offset * 100}%`
              : stop.offset
          }
          stopColor={stop.color}
          stopOpacity={stop.opacity}
        />
      ))}
    </radialGradient>
  )
}

/**
 * 3D sphere gradient (for realistic ball/sphere effect)
 */
export interface SphereGradientDefProps {
  id: string
  color: string
  lightAngle?: number
  highlightIntensity?: number
}

export function SphereGradientDef({
  id,
  color,
  lightAngle = 45,
  highlightIntensity = 0.3,
}: SphereGradientDefProps) {
  const { cx, cy, fx, fy } = lightAngleToGradientPosition(lightAngle)

  // Parse color to create lighter/darker variants
  const lighterColor = lightenColor(color, highlightIntensity)
  const darkerColor = darkenColor(color, 0.3)

  return (
    <radialGradient id={id} cx={cx} cy={cy} r="60%" fx={fx} fy={fy}>
      <stop offset="0%" stopColor={lighterColor} />
      <stop offset="50%" stopColor={color} />
      <stop offset="100%" stopColor={darkerColor} />
    </radialGradient>
  )
}

/**
 * Metallic gradient for coin/ring effects
 */
export interface MetallicGradientDefProps {
  id: string
  baseColor: string
  direction?: "horizontal" | "vertical" | "diagonal"
}

export function MetallicGradientDef({
  id,
  baseColor,
  direction = "diagonal",
}: MetallicGradientDefProps) {
  const coords = {
    horizontal: { x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
    vertical: { x1: "50%", y1: "0%", x2: "50%", y2: "100%" },
    diagonal: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
  }[direction]

  const highlight = lightenColor(baseColor, 0.4)
  const shadow = darkenColor(baseColor, 0.3)

  return (
    <linearGradient id={id} {...coords}>
      <stop offset="0%" stopColor={highlight} />
      <stop offset="30%" stopColor={baseColor} />
      <stop offset="70%" stopColor={baseColor} />
      <stop offset="100%" stopColor={shadow} />
    </linearGradient>
  )
}

// ============================================================
// COLOR HELPERS
// ============================================================

function padHex(n: number): string {
  const hex = n.toString(16)
  return hex.length === 1 ? "0" + hex : hex
}

function lightenColor(color: string, amount: number): string {
  const hex = color.replace("#", "")
  const r = Math.min(
    255,
    parseInt(hex.slice(0, 2), 16) + Math.round(255 * amount),
  )
  const g = Math.min(
    255,
    parseInt(hex.slice(2, 4), 16) + Math.round(255 * amount),
  )
  const b = Math.min(
    255,
    parseInt(hex.slice(4, 6), 16) + Math.round(255 * amount),
  )
  return `#${padHex(r)}${padHex(g)}${padHex(b)}`
}

function darkenColor(color: string, amount: number): string {
  const hex = color.replace("#", "")
  const r = Math.max(
    0,
    parseInt(hex.slice(0, 2), 16) - Math.round(255 * amount),
  )
  const g = Math.max(
    0,
    parseInt(hex.slice(2, 4), 16) - Math.round(255 * amount),
  )
  const b = Math.max(
    0,
    parseInt(hex.slice(4, 6), 16) - Math.round(255 * amount),
  )
  return `#${padHex(r)}${padHex(g)}${padHex(b)}`
}
