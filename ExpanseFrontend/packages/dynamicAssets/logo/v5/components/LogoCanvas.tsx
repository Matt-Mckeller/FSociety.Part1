/**
 * LogoCanvas Component
 *
 * SVG container with gradient and mask definitions for the logo.
 * Handles the outer SVG element and shared definitions.
 */

"use client"

import React from "react"
import type { LogoCanvasProps, GradientConfig } from "../ExpanseLogoV5.types"
import { lightAngleToGradientPosition } from "../utils/geometry"
import { DEFAULTS } from "../ExpanseLogoV5.variants"

// ============================================================
// GRADIENT DEFINITIONS
// ============================================================

interface GradientProps {
  id: string
  config: GradientConfig
  lightAngle?: number
}

function RadialGradient({
  id,
  config,
  lightAngle = DEFAULTS.lightAngle,
}: GradientProps) {
  const position = lightAngleToGradientPosition(lightAngle)

  return (
    <radialGradient
      id={id}
      cx={position.cx}
      cy={position.cy}
      fx={position.fx}
      fy={position.fy}
      r="60%"
    >
      {config.stops.map((stop, idx) => (
        <stop
          key={idx}
          offset={stop.offset}
          stopColor={stop.color}
          stopOpacity={stop.opacity ?? 1}
        />
      ))}
    </radialGradient>
  )
}

function LinearGradient({ id, config }: Omit<GradientProps, "lightAngle">) {
  return (
    <linearGradient
      id={id}
      x1={config.direction?.x1 ?? "0%"}
      y1={config.direction?.y1 ?? "0%"}
      x2={config.direction?.x2 ?? "100%"}
      y2={config.direction?.y2 ?? "100%"}
    >
      {config.stops.map((stop, idx) => (
        <stop
          key={idx}
          offset={stop.offset}
          stopColor={stop.color}
          stopOpacity={stop.opacity ?? 1}
        />
      ))}
    </linearGradient>
  )
}

// ============================================================
// DEFAULT GRADIENTS
// ============================================================

export const DEFAULT_GRADIENTS: Record<string, GradientConfig> = {
  primaryShape: {
    type: "radial",
    stops: [
      { offset: "0%", color: "#ffffff", opacity: 0.85 },
      { offset: "50%", color: "#d0d8e0", opacity: 0.9 },
      { offset: "100%", color: "#8090a0", opacity: 0.95 },
    ],
  },
  secondaryShape: {
    type: "radial",
    stops: [
      { offset: "0%", color: "#ffffff", opacity: 0.7 },
      { offset: "60%", color: "#c0c8d0", opacity: 0.8 },
      { offset: "100%", color: "#6080a0", opacity: 0.85 },
    ],
  },
  ring: {
    type: "linear",
    direction: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
    stops: [
      { offset: "0%", color: "#ffffff", opacity: 0.5 },
      { offset: "50%", color: "#d0e0f0", opacity: 0.6 },
      { offset: "100%", color: "#80a0c0", opacity: 0.5 },
    ],
  },
  highlight: {
    type: "radial",
    stops: [
      { offset: "0%", color: "#ffffff", opacity: 0.9 },
      { offset: "100%", color: "#ffffff", opacity: 0 },
    ],
  },
}

// ============================================================
// LOGO CANVAS COMPONENT
// ============================================================

export function LogoCanvas({
  width = 409,
  height = 409,
  viewBox = "0 0 409 409",
  gradients,
  lightAngle = DEFAULTS.lightAngle,
  className,
  style,
  children,
  // SVG attributes
  role = "img",
  "aria-label": ariaLabel = "Expanse Logo",
  ...svgProps
}: LogoCanvasProps) {
  // Merge custom gradients with defaults
  const allGradients = { ...DEFAULT_GRADIENTS, ...gradients }

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role={role}
      aria-label={ariaLabel}
      {...svgProps}
    >
      <defs>
        {/* Render gradient definitions */}
        {Object.entries(allGradients).map(([id, config]) => {
          if (config.type === "radial") {
            return (
              <RadialGradient
                key={id}
                id={`gradient-${id}`}
                config={config}
                lightAngle={lightAngle}
              />
            )
          }
          return (
            <LinearGradient key={id} id={`gradient-${id}`} config={config} />
          )
        })}

        {/* Circle clip for shape masking */}
        <clipPath id="clip-primary-circle">
          <circle
            cx={DEFAULTS.centerX}
            cy={DEFAULTS.centerY}
            r={DEFAULTS.primaryRadius}
          />
        </clipPath>

        {/* Secondary shape clip */}
        <clipPath id="clip-secondary-circle">
          <circle
            cx={DEFAULTS.centerX}
            cy={DEFAULTS.centerY}
            r={DEFAULTS.secondaryRadius}
          />
        </clipPath>

        {/* Full logo mask */}
        <mask id="mask-full-logo">
          <rect width="100%" height="100%" fill="white" />
        </mask>
      </defs>

      {children}
    </svg>
  )
}

// ============================================================
// LOGO CANVAS PROVIDER
// ============================================================

interface LogoCanvasContextValue {
  width: number
  height: number
  centerX: number
  centerY: number
  primaryRadius: number
  secondaryRadius: number
  lightAngle: number
}

const LogoCanvasContext = React.createContext<LogoCanvasContextValue | null>(
  null,
)

export function useLogoCanvas(): LogoCanvasContextValue {
  const ctx = React.useContext(LogoCanvasContext)
  if (!ctx) {
    return {
      width: 409,
      height: 409,
      centerX: DEFAULTS.centerX,
      centerY: DEFAULTS.centerY,
      primaryRadius: DEFAULTS.primaryRadius,
      secondaryRadius: DEFAULTS.secondaryRadius,
      lightAngle: DEFAULTS.lightAngle,
    }
  }
  return ctx
}

interface LogoCanvasProviderProps extends LogoCanvasProps {
  primaryRadius?: number
  secondaryRadius?: number
}

export function LogoCanvasProvider({
  width = 409,
  height = 409,
  primaryRadius = DEFAULTS.primaryRadius,
  secondaryRadius = DEFAULTS.secondaryRadius,
  lightAngle = DEFAULTS.lightAngle,
  children,
  ...canvasProps
}: LogoCanvasProviderProps) {
  // Convert to numbers for context
  const numWidth = typeof width === "number" ? width : 409
  const numHeight = typeof height === "number" ? height : 409

  const contextValue: LogoCanvasContextValue = {
    width: numWidth,
    height: numHeight,
    centerX: DEFAULTS.centerX,
    centerY: DEFAULTS.centerY,
    primaryRadius,
    secondaryRadius,
    lightAngle,
  }

  return (
    <LogoCanvasContext.Provider value={contextValue}>
      <LogoCanvas
        width={width}
        height={height}
        lightAngle={lightAngle}
        {...canvasProps}
      >
        {children}
      </LogoCanvas>
    </LogoCanvasContext.Provider>
  )
}

export { DEFAULT_GRADIENTS as GRADIENTS }
