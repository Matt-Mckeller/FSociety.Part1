'use client';

import { useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { PyramidLayer } from './PyramidLayer';
import { PyramidCorners } from './PyramidCornerTriangle';
import { PyramidSlotContainer } from './PyramidBorderSlot';
import { usePyramidDimensions } from './hooks/usePyramidDimensions';
import { usePyramidTheme, getElevationStyles } from './hooks/usePyramidTheme';
import type { PyramidLayoutProps, PYRAMID_DEFAULTS } from './types';

const DEFAULT_LAYER_CONFIG = {
  outer: { strokeWidth: 4, fillWidth: 12, borderRadius: 24 },
  middle: { strokeWidth: 3, fillWidth: 10, borderRadius: 20 },
  inner: { strokeWidth: 2, fillWidth: 8, borderRadius: 16 },
};

const DEFAULT_CORNER_CONFIG = {
  size: 48,
  borderRadius: 12,
};

/**
 * PyramidLayout - A 3-layer nested elevation layout with decorative corner triangles
 * 
 * Provides a visually striking UI with nested border layers for navigation,
 * actions, and content areas, inspired by the ExpandingBar pattern.
 */
export function PyramidLayout({
  children,
  layers: customLayers,
  slots = {},
  corners: cornerConfig,
  elevation = 'subtle',
  colorScheme = 'primary',
  fullScreen = true,
}: PyramidLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge layer configs with defaults
  const layers = useMemo(() => ({
    outer: { ...DEFAULT_LAYER_CONFIG.outer, ...customLayers?.outer },
    middle: { ...DEFAULT_LAYER_CONFIG.middle, ...customLayers?.middle },
    inner: { ...DEFAULT_LAYER_CONFIG.inner, ...customLayers?.inner },
  }), [customLayers]);

  // Get dimensions
  const { containerWidth, containerHeight, layers: layerDimensions, content, isReady } = 
    usePyramidDimensions({ layers, containerRef: fullScreen ? undefined : containerRef });

  // Get theme colors
  const colors = usePyramidTheme({ colorScheme });

  // Get elevation styles
  const elevationStyles = getElevationStyles(elevation);

  // Corner configuration
  const cornerSize = cornerConfig?.size === 'small' ? 32 
    : cornerConfig?.size === 'large' ? 64 
    : cornerConfig?.size === 'medium' ? 48
    : typeof cornerConfig?.size === 'number' ? cornerConfig.size 
    : DEFAULT_CORNER_CONFIG.size;

  const showCorners = cornerConfig?.show !== false;

  if (!isReady) {
    // Return placeholder while calculating dimensions
    return (
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: fullScreen ? '100vh' : '100%',
          bgcolor: 'background.default',
        }}
      />
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: fullScreen ? '100vh' : '100%',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* SVG Layers */}
      <Box
        component="svg"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...elevationStyles,
        }}
      >
        {/* Outer Layer */}
        <PyramidLayer
          layer="outer"
          x={layerDimensions.outer.x}
          y={layerDimensions.outer.y}
          width={layerDimensions.outer.width}
          height={layerDimensions.outer.height}
          strokeWidth={layers.outer.strokeWidth}
          fillWidth={layers.outer.fillWidth}
          strokeColor={colors.outer.stroke}
          fillColor={colors.outer.fill}
          borderRadius={layers.outer.borderRadius}
        />

        {/* Middle Layer */}
        <PyramidLayer
          layer="middle"
          x={layerDimensions.middle.x}
          y={layerDimensions.middle.y}
          width={layerDimensions.middle.width}
          height={layerDimensions.middle.height}
          strokeWidth={layers.middle.strokeWidth}
          fillWidth={layers.middle.fillWidth}
          strokeColor={colors.middle.stroke}
          fillColor={colors.middle.fill}
          borderRadius={layers.middle.borderRadius}
        />

        {/* Inner Layer */}
        <PyramidLayer
          layer="inner"
          x={layerDimensions.inner.x}
          y={layerDimensions.inner.y}
          width={layerDimensions.inner.width}
          height={layerDimensions.inner.height}
          strokeWidth={layers.inner.strokeWidth}
          fillWidth={layers.inner.fillWidth}
          strokeColor={colors.inner.stroke}
          fillColor={colors.inner.fill}
          borderRadius={layers.inner.borderRadius}
        />
      </Box>

      {/* Corner Triangles */}
      <PyramidCorners
        show={showCorners}
        size={cornerSize}
        borderRadius={cornerConfig?.borderRadius ?? DEFAULT_CORNER_CONFIG.borderRadius}
        strokeColor={colors.corners.stroke}
        fillColor={colors.corners.fill}
        strokeWidth={layers.outer.strokeWidth}
        animated={cornerConfig?.animated}
      />

      {/* Outer Layer Slots */}
      <PyramidSlotContainer
        layer="outer"
        slots={{
          top: slots.header,
          bottom: slots.footer,
          left: slots.leftNav,
          right: slots.rightNav,
        }}
        dimensions={{
          ...layerDimensions.outer,
          strokeWidth: layers.outer.strokeWidth,
          fillWidth: layers.outer.fillWidth,
        }}
      />

      {/* Middle Layer Slots */}
      <PyramidSlotContainer
        layer="middle"
        slots={{
          top: slots.actionBar,
          bottom: slots.statusBar,
        }}
        dimensions={{
          ...layerDimensions.middle,
          strokeWidth: layers.middle.strokeWidth,
          fillWidth: layers.middle.fillWidth,
        }}
      />

      {/* Content Area */}
      <Box
        sx={{
          position: 'absolute',
          left: content.x,
          top: content.y,
          width: content.width,
          height: content.height,
          bgcolor: colors.content.background,
          borderRadius: `${Math.max(0, layers.inner.borderRadius - layers.inner.strokeWidth - layers.inner.fillWidth)}px`,
          overflow: 'auto',
          zIndex: 50,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default PyramidLayout;
