/**
 * 4up Logo - React Component
 *
 * React wrapper for the logo using core calculations.
 * Supports different shapes: circles, squares, triangles.
 *
 * SVG Structure:
 * <svg>
 *   <title>
 *   <desc>
 *   <defs>
 *     <mask id="logo-center-mask-{uid}">
 *   </defs>
 *   <g id="logo-shapes">
 *     <circle|rect|polygon id="shape-middle" />
 *     <circle|rect|polygon id="shape-primary" />
 *   </g>
 *   <g id="logo-waves">
 *     <g id="waves-bottom-left">...</g>
 *     <g id="waves-top-right">...</g>
 *   </g>
 * </svg>
 */

"use client";

import React, { useMemo, useId } from "react";
import type { LogoConfig, LogoProps, Circle, LogoShape } from "./core/types";
import { mergeConfig } from "./core/defaults";
import { calculateGeometry, getWaveOpacity } from "./core/calculations";

/**
 * Render a shape element based on the shape type
 */
function renderShapeElement(
  shape: LogoShape,
  circle: Circle,
  id: string,
  fill: string,
  opacity: number
): React.ReactNode {
  const { center, radius } = circle;

  switch (shape) {
    case "square": {
      // Square inscribed in the circle's bounds (side = diameter)
      const side = radius * 2;
      return (
        <rect
          key={id}
          id={id}
          x={center.x - radius}
          y={center.y - radius}
          width={side}
          height={side}
          fill={fill}
          fillOpacity={opacity}
        />
      );
    }
    case "triangle": {
      // Equilateral triangle centered at circle center
      // Vertices at top, bottom-left, bottom-right
      const height = radius * 2;
      const halfBase = (height * Math.sqrt(3)) / 3;
      const topY = center.y - radius;
      const bottomY = center.y + radius;
      const points = `${center.x},${topY} ${center.x - halfBase},${bottomY} ${center.x + halfBase},${bottomY}`;
      return (
        <polygon
          key={id}
          id={id}
          points={points}
          fill={fill}
          fillOpacity={opacity}
        />
      );
    }
    case "circle":
    default:
      return (
        <circle
          key={id}
          id={id}
          cx={center.x}
          cy={center.y}
          r={radius}
          fill={fill}
          fillOpacity={opacity}
        />
      );
  }
}

/**
 * 4up Logo React Component
 *
 * Renders the logo as an accessible SVG with proper semantic structure.
 */
export const FourUpLogo: React.FC<LogoProps> = ({
  config: configOverrides,
  size = 200,
  className,
  style,
  title = "4up Logo",
  desc = "Two overlapping circles representing growth and momentum",
}) => {
  // Generate unique ID for mask to avoid conflicts when multiple logos on page
  const uid = useId();
  const maskId = `logo-center-mask-${uid}`;

  // Merge config with defaults
  const config = useMemo(() => mergeConfig(configOverrides), [configOverrides]);

  // Calculate all geometry
  const geometry = useMemo(() => calculateGeometry(config), [config]);

  const {
    circles,
    opacities,
    viewBox,
    primaryCircle,
    holeRadius,
    connectorLines,
    waves,
  } = geometry;

  const circleNames = ["base", "middle", "primary"];
  const startIndex = config.showBaseCircle ? 0 : 1;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      width={size}
      height={size}
      className={className}
      style={style}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      {/* Accessibility */}
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>{desc}</desc>

      {/* Definitions */}
      <defs>
        {config.showCenterHole && (
          <mask id={maskId}>
            {/* White background - visible area */}
            <rect
              x={viewBox.x}
              y={viewBox.y}
              width={viewBox.width}
              height={viewBox.height}
              fill="white"
            />
            {/* Black hole - transparent area */}
            <circle
              cx={primaryCircle.center.x}
              cy={primaryCircle.center.y}
              r={holeRadius}
              fill="black"
            />
            {/* Connector lines - also transparent */}
            {connectorLines && (
              <>
                <line
                  x1={connectorLines.left.start.x}
                  y1={connectorLines.left.start.y}
                  x2={connectorLines.left.end.x}
                  y2={connectorLines.left.end.y}
                  stroke="black"
                  strokeWidth={config.connectorLineWidth}
                />
                <line
                  x1={connectorLines.right.start.x}
                  y1={connectorLines.right.start.y}
                  x2={connectorLines.right.end.x}
                  y2={connectorLines.right.end.y}
                  stroke="black"
                  strokeWidth={config.connectorLineWidth}
                />
              </>
            )}
          </mask>
        )}
      </defs>

      {/* Shape Group - rendered largest first for proper stacking */}
      <g
        id="logo-shapes"
        mask={config.showCenterHole ? `url(#${maskId})` : undefined}
      >
        {[...Array(circles.length)]
          .map((_, i) => circles.length - 1 - i) // Reverse order
          .filter((i) => i >= startIndex) // Skip base in 2-circle mode
          .map((i) =>
            renderShapeElement(
              config.shape,
              circles[i],
              `shape-${circleNames[i]}`,
              config.fillColor,
              opacities[i]
            )
          )}
      </g>

      {/* Wave Groups */}
      {config.showWaves && (
        <g id="logo-waves">
          {/* Bottom-left waves */}
          <g id="waves-bottom-left">
            {waves.bottomLeft.map((path, index) => (
              <path
                key={`wave-bl-${index + 1}`}
                id={`wave-bl-${index + 1}`}
                d={path}
                fill="none"
                stroke={config.waveColor}
                strokeWidth={config.waveStrokeWidth}
                strokeOpacity={getWaveOpacity(index, config)}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Top-right waves */}
          <g id="waves-top-right">
            {waves.topRight.map((path, index) => (
              <path
                key={`wave-tr-${index + 1}`}
                id={`wave-tr-${index + 1}`}
                d={path}
                fill="none"
                stroke={config.waveColor}
                strokeWidth={config.waveStrokeWidth}
                strokeOpacity={getWaveOpacity(index, config)}
                strokeLinecap="round"
              />
            ))}
          </g>
        </g>
      )}
    </svg>
  );
};

export default FourUpLogo;
