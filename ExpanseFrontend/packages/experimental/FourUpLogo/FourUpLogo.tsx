/**
 * FourUpLogo Component
 *
 * The core 4up logo React component. Renders an SVG based on configuration.
 */

import React, { useMemo, useId } from "react"
import type { FourUpLogoProps, LogoConfig, Circle } from "./types"
import { defaultLogoConfig } from "./logoConfig"
import {
  calculateCircleCenters,
  calculateSoundWaves,
  calculateViewBox,
  calculateOpacities,
  calculateWaveOpacity,
  calculateConnectorLines,
  getTrianglePoints,
} from "./logoCalculations"

// ============================================
// Shape Rendering Components
// ============================================

interface ShapeProps {
  circle: Circle
  shape: LogoConfig["shape"]
  fill: string
  opacity: number
}

const Shape: React.FC<ShapeProps> = ({ circle, shape, fill, opacity }) => {
  const { center, radius } = circle

  switch (shape) {
    case "square":
      return (
        <rect
          x={center.x - radius}
          y={center.y - radius}
          width={radius * 2}
          height={radius * 2}
          fill={fill}
          fillOpacity={opacity}
        />
      )
    case "triangle":
      return (
        <polygon
          points={getTrianglePoints(center, radius)}
          fill={fill}
          fillOpacity={opacity}
        />
      )
    case "circle":
    default:
      return (
        <circle
          cx={center.x}
          cy={center.y}
          r={radius}
          fill={fill}
          fillOpacity={opacity}
        />
      )
  }
}

// ============================================
// Main Logo Component
// ============================================

export const FourUpLogo: React.FC<FourUpLogoProps> = ({
  config: configOverrides,
  size = 300,
  className,
  id,
  title = "4up Logo",
  description = "Two overlapping circles representing growth and momentum",
}) => {
  // Merge provided config with defaults
  const config = useMemo<LogoConfig>(
    () => ({ ...defaultLogoConfig, ...configOverrides }),
    [configOverrides],
  )

  // Calculate all geometry
  const circles = useMemo(() => calculateCircleCenters(config), [config])
  const waves = useMemo(
    () => calculateSoundWaves(circles, config),
    [circles, config],
  )
  const viewBox = useMemo(
    () => calculateViewBox(circles, config),
    [circles, config],
  )
  const opacities = useMemo(() => calculateOpacities(config), [config])
  const connectorLines = useMemo(
    () => calculateConnectorLines(circles[2], config),
    [circles, config],
  )

  // Generate unique mask ID to avoid conflicts when multiple logos are rendered
  const reactId = useId()
  const maskId = id
    ? `logo-mask-${id}`
    : `logo-mask-${reactId.replace(/:/g, "")}`

  // Determine which circles to render
  const startIndex = config.showBaseCircle ? 0 : 1

  // Center hole calculations
  const primaryCircle = circles[2]
  const holeRadius = config.showCenterHole
    ? primaryCircle.radius * (config.centerHoleSize / 100)
    : 0

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      width={size}
      height={size}
      className={className}
      id={id}
      role="img"
      aria-labelledby={`${maskId}-title ${maskId}-desc`}
    >
      <title id={`${maskId}-title`}>{title}</title>
      <desc id={`${maskId}-desc`}>{description}</desc>

      {/* Mask Definition */}
      <defs>
        <mask id={maskId}>
          <rect
            x={viewBox.x}
            y={viewBox.y}
            width={viewBox.width}
            height={viewBox.height}
            fill="white"
          />
          {/* Center hole */}
          {config.showCenterHole && (
            <circle
              cx={primaryCircle.center.x}
              cy={primaryCircle.center.y}
              r={holeRadius}
              fill="black"
            />
          )}
          {/* Connector lines */}
          {config.showConnectorLines &&
            config.showCenterHole &&
            holeRadius > 0 && (
              <>
                <line
                  x1={connectorLines.left.x1}
                  y1={connectorLines.left.y1}
                  x2={connectorLines.left.x2}
                  y2={connectorLines.left.y2}
                  stroke="black"
                  strokeWidth={config.connectorLineWidth}
                />
                <line
                  x1={connectorLines.right.x1}
                  y1={connectorLines.right.y1}
                  x2={connectorLines.right.x2}
                  y2={connectorLines.right.y2}
                  stroke="black"
                  strokeWidth={config.connectorLineWidth}
                />
              </>
            )}
        </mask>
      </defs>

      {/* Circles Group (masked) */}
      <g className="logo-circles" mask={`url(#${maskId})`}>
        {/* Render shapes in reverse order so smaller shapes appear on top */}
        {[...circles].reverse().map((circle, reverseIndex) => {
          const index = circles.length - 1 - reverseIndex
          if (index < startIndex) return null
          return (
            <Shape
              key={index}
              circle={circle}
              shape={config.shape}
              fill={config.fillColor}
              opacity={opacities[index]}
            />
          )
        })}
      </g>

      {/* Sound Waves */}
      {config.showWaves && (
        <>
          {/* Bottom-left waves */}
          <g className="logo-waves-bottom-left">
            {waves.bottomLeft.map((path, index) => (
              <path
                key={`bl-${index}`}
                d={path}
                fill="none"
                stroke={config.waveColor}
                strokeWidth={config.waveStrokeWidth}
                strokeOpacity={calculateWaveOpacity(
                  index,
                  config.waveCount,
                  config.waveOpacity,
                  config.waveFade,
                )}
                strokeLinecap="round"
              />
            ))}
          </g>
          {/* Top-right waves */}
          <g className="logo-waves-top-right">
            {waves.topRight.map((path, index) => (
              <path
                key={`tr-${index}`}
                d={path}
                fill="none"
                stroke={config.waveColor}
                strokeWidth={config.waveStrokeWidth}
                strokeOpacity={calculateWaveOpacity(
                  index,
                  config.waveCount,
                  config.waveOpacity,
                  config.waveFade,
                )}
                strokeLinecap="round"
              />
            ))}
          </g>
        </>
      )}
    </svg>
  )
}

export default FourUpLogo
