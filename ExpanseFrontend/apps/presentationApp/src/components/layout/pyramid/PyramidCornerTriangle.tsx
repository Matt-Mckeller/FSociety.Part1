'use client';

import { memo, useMemo } from 'react';
import { Box } from '@mui/material';
import type { PyramidCornerTriangleProps, CornerPosition } from './types';

/**
 * Creates an SVG path for a rounded triangle pointing inward
 */
function createTrianglePath(
  position: CornerPosition,
  size: number,
  borderRadius: number,
  strokeWidth: number
): string {
  const r = Math.min(borderRadius, size / 4); // Cap radius to prevent overlap
  const s = size;
  const sw = strokeWidth;
  const inset = sw / 2;

  // Calculate control points for rounded corners
  // Each triangle points toward the center of the layout
  switch (position) {
    case 'top-left':
      // Triangle in top-left, points toward bottom-right
      return `
        M ${inset + r} ${inset}
        L ${s - inset} ${inset}
        L ${s - inset} ${inset + sw}
        L ${inset + sw + r} ${inset + sw}
        Q ${inset + sw} ${inset + sw} ${inset + sw} ${inset + sw + r}
        L ${inset + sw} ${s - inset}
        L ${inset} ${s - inset}
        L ${inset} ${inset + r}
        Q ${inset} ${inset} ${inset + r} ${inset}
        Z
      `;

    case 'top-right':
      // Triangle in top-right, points toward bottom-left
      return `
        M ${s - inset - r} ${inset}
        Q ${s - inset} ${inset} ${s - inset} ${inset + r}
        L ${s - inset} ${s - inset}
        L ${s - inset - sw} ${s - inset}
        L ${s - inset - sw} ${inset + sw + r}
        Q ${s - inset - sw} ${inset + sw} ${s - inset - sw - r} ${inset + sw}
        L ${inset} ${inset + sw}
        L ${inset} ${inset}
        L ${s - inset - r} ${inset}
        Z
      `;

    case 'bottom-left':
      // Triangle in bottom-left, points toward top-right
      return `
        M ${inset} ${s - inset - r}
        Q ${inset} ${s - inset} ${inset + r} ${s - inset}
        L ${s - inset} ${s - inset}
        L ${s - inset} ${s - inset - sw}
        L ${inset + sw + r} ${s - inset - sw}
        Q ${inset + sw} ${s - inset - sw} ${inset + sw} ${s - inset - sw - r}
        L ${inset + sw} ${inset}
        L ${inset} ${inset}
        L ${inset} ${s - inset - r}
        Z
      `;

    case 'bottom-right':
      // Triangle in bottom-right, points toward top-left
      return `
        M ${s - inset} ${s - inset - r}
        Q ${s - inset} ${s - inset} ${s - inset - r} ${s - inset}
        L ${inset} ${s - inset}
        L ${inset} ${s - inset - sw}
        L ${s - inset - sw - r} ${s - inset - sw}
        Q ${s - inset - sw} ${s - inset - sw} ${s - inset - sw} ${s - inset - sw - r}
        L ${s - inset - sw} ${inset}
        L ${s - inset} ${inset}
        L ${s - inset} ${s - inset - r}
        Z
      `;

    default:
      return '';
  }
}

/**
 * Decorative corner triangle component for the pyramid layout
 * Renders a rounded triangle pointing toward the center
 */
export const PyramidCornerTriangle = memo(function PyramidCornerTriangle({
  position,
  size,
  borderRadius,
  strokeColor,
  fillColor,
  strokeWidth,
  animated = false,
}: PyramidCornerTriangleProps) {
  const path = useMemo(
    () => createTrianglePath(position, size, borderRadius, strokeWidth),
    [position, size, borderRadius, strokeWidth]
  );

  // Position styles for absolute positioning
  const positionStyles = useMemo(() => {
    switch (position) {
      case 'top-left':
        return { top: 0, left: 0 };
      case 'top-right':
        return { top: 0, right: 0 };
      case 'bottom-left':
        return { bottom: 0, left: 0 };
      case 'bottom-right':
        return { bottom: 0, right: 0 };
      default:
        return {};
    }
  }, [position]);

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${size} ${size}`}
      sx={{
        position: 'absolute',
        width: size,
        height: size,
        pointerEvents: 'none',
        ...positionStyles,
        ...(animated && {
          animation: 'pyramidCornerFadeIn 0.4s ease-out',
          '@keyframes pyramidCornerFadeIn': {
            from: {
              opacity: 0,
              transform: 'scale(0.8)',
            },
            to: {
              opacity: 1,
              transform: 'scale(1)',
            },
          },
        }),
      }}
    >
      <path
        d={path}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Box>
  );
});

/**
 * Render all four corner triangles
 */
export function PyramidCorners({
  size,
  borderRadius,
  strokeColor,
  fillColor,
  strokeWidth,
  animated = false,
  show = true,
}: {
  size: number;
  borderRadius: number;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  animated?: boolean;
  show?: boolean;
}) {
  if (!show) return null;

  const corners: CornerPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  return (
    <>
      {corners.map((position) => (
        <PyramidCornerTriangle
          key={position}
          position={position}
          size={size}
          borderRadius={borderRadius}
          strokeColor={strokeColor}
          fillColor={fillColor}
          strokeWidth={strokeWidth}
          animated={animated}
        />
      ))}
    </>
  );
}
