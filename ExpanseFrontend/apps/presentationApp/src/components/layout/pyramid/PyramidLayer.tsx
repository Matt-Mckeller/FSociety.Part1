'use client';

import { memo } from 'react';
import type { PyramidLayerProps } from './types';

/**
 * SVG-based pyramid layer component
 * Renders a bordered rectangle with stroke and fill layers
 */
export const PyramidLayer = memo(function PyramidLayer({
  x,
  y,
  width,
  height,
  strokeWidth,
  fillWidth,
  strokeColor,
  fillColor,
  borderRadius,
  children,
  layer,
}: PyramidLayerProps) {
  if (width <= 0 || height <= 0) return null;

  // Calculate inner dimensions
  const innerX = x + strokeWidth;
  const innerY = y + strokeWidth;
  const innerWidth = width - strokeWidth * 2;
  const innerHeight = height - strokeWidth * 2;

  // Calculate content area (inside the fill)
  const contentX = innerX + fillWidth;
  const contentY = innerY + fillWidth;
  const contentWidth = innerWidth - fillWidth * 2;
  const contentHeight = innerHeight - fillWidth * 2;

  // Adjust border radius for nested elements
  const innerRadius = Math.max(0, borderRadius - strokeWidth);
  const contentRadius = Math.max(0, innerRadius - fillWidth);

  return (
    <g data-layer={layer}>
      {/* Outer stroke border */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        rx={borderRadius}
        ry={borderRadius}
      />

      {/* Fill layer */}
      <rect
        x={innerX}
        y={innerY}
        width={Math.max(0, innerWidth)}
        height={Math.max(0, innerHeight)}
        fill={fillColor}
        rx={innerRadius}
        ry={innerRadius}
      />

      {/* Content foreign object */}
      {children && contentWidth > 0 && contentHeight > 0 && (
        <foreignObject
          x={contentX}
          y={contentY}
          width={contentWidth}
          height={contentHeight}
          style={{ overflow: 'visible' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: contentRadius,
              overflow: 'hidden',
            }}
          >
            {children}
          </div>
        </foreignObject>
      )}
    </g>
  );
});

/**
 * Non-SVG version using CSS for simpler use cases
 */
export function PyramidLayerCSS({
  strokeWidth,
  fillWidth,
  strokeColor,
  fillColor,
  borderRadius,
  children,
  layer,
  style,
}: Omit<PyramidLayerProps, 'x' | 'y' | 'width' | 'height'> & {
  style?: React.CSSProperties;
}) {
  return (
    <div
      data-layer={layer}
      style={{
        position: 'relative',
        border: `${strokeWidth}px solid ${strokeColor}`,
        borderRadius: borderRadius,
        padding: fillWidth,
        backgroundColor: fillColor,
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: Math.max(0, borderRadius - strokeWidth - fillWidth),
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
