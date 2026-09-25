'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { PyramidDimensions, LayerConfig, PYRAMID_DEFAULTS } from '../types';

interface UsePyramidDimensionsOptions {
  /** Custom layer configurations */
  layers?: {
    outer?: LayerConfig;
    middle?: LayerConfig;
    inner?: LayerConfig;
  };
  /** Gap between layers */
  layerGap?: number;
  /** Reference element for dimensions (defaults to window) */
  containerRef?: React.RefObject<HTMLElement>;
}

const DEFAULT_CONFIG = {
  layers: {
    outer: { strokeWidth: 4, fillWidth: 12, borderRadius: 24 },
    middle: { strokeWidth: 3, fillWidth: 10, borderRadius: 20 },
    inner: { strokeWidth: 2, fillWidth: 8, borderRadius: 16 },
  },
  layerGap: 8,
};

/**
 * Hook to calculate pyramid layout dimensions based on container/viewport size
 */
export function usePyramidDimensions(
  options: UsePyramidDimensionsOptions = {}
): PyramidDimensions & { isReady: boolean } {
  const { layers: customLayers, layerGap = DEFAULT_CONFIG.layerGap, containerRef } = options;

  // Merge custom layer config with defaults
  const layers = useMemo(() => ({
    outer: { ...DEFAULT_CONFIG.layers.outer, ...customLayers?.outer },
    middle: { ...DEFAULT_CONFIG.layers.middle, ...customLayers?.middle },
    inner: { ...DEFAULT_CONFIG.layers.inner, ...customLayers?.inner },
  }), [customLayers]);

  const [dimensions, setDimensions] = useState<PyramidDimensions>({
    containerWidth: 0,
    containerHeight: 0,
    content: { x: 0, y: 0, width: 0, height: 0 },
    layers: {
      outer: { x: 0, y: 0, width: 0, height: 0 },
      middle: { x: 0, y: 0, width: 0, height: 0 },
      inner: { x: 0, y: 0, width: 0, height: 0 },
    },
  });

  const [isReady, setIsReady] = useState(false);

  const calculateDimensions = useCallback((containerWidth: number, containerHeight: number): PyramidDimensions => {
    // Calculate total offsets for each layer
    const outerOffset = layers.outer.strokeWidth + layers.outer.fillWidth;
    const middleOffset = layers.middle.strokeWidth + layers.middle.fillWidth;
    const innerOffset = layers.inner.strokeWidth + layers.inner.fillWidth;

    // Outer layer - full container
    const outerX = 0;
    const outerY = 0;
    const outerWidth = containerWidth;
    const outerHeight = containerHeight;

    // Middle layer - inside outer layer + gap
    const middleX = outerOffset + layerGap;
    const middleY = outerOffset + layerGap;
    const middleWidth = containerWidth - (middleX * 2);
    const middleHeight = containerHeight - (middleY * 2);

    // Inner layer - inside middle layer + gap
    const innerX = middleX + middleOffset + layerGap;
    const innerY = middleY + middleOffset + layerGap;
    const innerWidth = containerWidth - (innerX * 2);
    const innerHeight = containerHeight - (innerY * 2);

    // Content area - inside inner layer
    const contentX = innerX + innerOffset;
    const contentY = innerY + innerOffset;
    const contentWidth = containerWidth - (contentX * 2);
    const contentHeight = containerHeight - (contentY * 2);

    return {
      containerWidth,
      containerHeight,
      content: {
        x: contentX,
        y: contentY,
        width: Math.max(0, contentWidth),
        height: Math.max(0, contentHeight),
      },
      layers: {
        outer: {
          x: outerX,
          y: outerY,
          width: outerWidth,
          height: outerHeight,
        },
        middle: {
          x: middleX,
          y: middleY,
          width: Math.max(0, middleWidth),
          height: Math.max(0, middleHeight),
        },
        inner: {
          x: innerX,
          y: innerY,
          width: Math.max(0, innerWidth),
          height: Math.max(0, innerHeight),
        },
      },
    };
  }, [layers, layerGap]);

  useEffect(() => {
    const updateDimensions = () => {
      let width: number;
      let height: number;

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      setDimensions(calculateDimensions(width, height));
      setIsReady(true);
    };

    // Initial calculation
    updateDimensions();

    // Listen for resize
    window.addEventListener('resize', updateDimensions);

    // ResizeObserver for container-based sizing
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef?.current) {
      resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver?.disconnect();
    };
  }, [containerRef, calculateDimensions]);

  return { ...dimensions, isReady };
}

/**
 * Get layer border radius adjusted for nesting level
 */
export function getAdjustedBorderRadius(
  baseBorderRadius: number,
  strokeWidth: number,
  nestingLevel: number
): number {
  // Each nested layer has slightly smaller border radius
  return Math.max(4, baseBorderRadius - (strokeWidth * nestingLevel));
}
