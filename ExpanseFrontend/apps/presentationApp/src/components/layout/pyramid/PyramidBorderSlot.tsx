'use client';

import { memo } from 'react';
import { Box } from '@mui/material';
import type { PyramidBorderSlotProps, SlotPosition, LayerLevel } from './types';

/**
 * Get slot positioning styles based on position and layer
 */
function getSlotStyles(position: SlotPosition, layer: LayerLevel): React.CSSProperties {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: layer === 'outer' ? 10 : layer === 'middle' ? 20 : 30,
  };

  // Position-specific styles
  switch (position) {
    case 'top':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        right: 0,
      };
    case 'bottom':
      return {
        ...baseStyles,
        bottom: 0,
        left: 0,
        right: 0,
      };
    case 'left':
      return {
        ...baseStyles,
        top: 0,
        bottom: 0,
        left: 0,
        flexDirection: 'column',
      };
    case 'right':
      return {
        ...baseStyles,
        top: 0,
        bottom: 0,
        right: 0,
        flexDirection: 'column',
      };
    default:
      return baseStyles;
  }
}

/**
 * Border slot component for placing content in pyramid layer borders
 */
export const PyramidBorderSlot = memo(function PyramidBorderSlot({
  position,
  layer,
  children,
  sx = {},
}: PyramidBorderSlotProps) {
  if (!children) return null;

  return (
    <Box
      data-slot={`${layer}-${position}`}
      sx={{
        ...getSlotStyles(position, layer),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
});

/**
 * Slot container that manages all border slots for a layer
 */
export function PyramidSlotContainer({
  layer,
  slots,
  dimensions,
}: {
  layer: LayerLevel;
  slots: {
    top?: React.ReactNode;
    bottom?: React.ReactNode;
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  dimensions: {
    x: number;
    y: number;
    width: number;
    height: number;
    strokeWidth: number;
    fillWidth: number;
  };
}) {
  const { x, y, width, height, strokeWidth, fillWidth } = dimensions;
  const slotThickness = strokeWidth + fillWidth;

  return (
    <Box
      sx={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        pointerEvents: 'none',
        '& > *': {
          pointerEvents: 'auto',
        },
      }}
    >
      {/* Top slot */}
      {slots.top && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: slotThickness,
            right: slotThickness,
            height: slotThickness,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {slots.top}
        </Box>
      )}

      {/* Bottom slot */}
      {slots.bottom && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: slotThickness,
            right: slotThickness,
            height: slotThickness,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {slots.bottom}
        </Box>
      )}

      {/* Left slot */}
      {slots.left && (
        <Box
          sx={{
            position: 'absolute',
            top: slotThickness,
            bottom: slotThickness,
            left: 0,
            width: slotThickness,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {slots.left}
        </Box>
      )}

      {/* Right slot */}
      {slots.right && (
        <Box
          sx={{
            position: 'absolute',
            top: slotThickness,
            bottom: slotThickness,
            right: 0,
            width: slotThickness,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {slots.right}
        </Box>
      )}
    </Box>
  );
}
