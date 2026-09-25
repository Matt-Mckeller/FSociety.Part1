"use client";

import { useMemo } from "react";
import type { OrbItem, OrbPattern, OrbSize } from "./types";
import { ORB_SIZES } from "./types";
import {
  getPatternPositions,
  overlappingRowPositions,
  overlappingArcPositions,
  type Position,
  type PositionConfig,
} from "./orbPositions";

/**
 * Options for useOrbCluster hook
 */
export interface UseOrbClusterOptions {
  /** Array of orb items */
  items: OrbItem[];
  /** Layout pattern */
  pattern: OrbPattern;
  /** Orb size */
  size: OrbSize;
  /** Container width in pixels */
  containerWidth: number;
  /** Container height in pixels */
  containerHeight: number;
  /** Spacing between orbs */
  spacing?: number;
  /** Enable overlapping mode */
  overlapping?: boolean;
  /** Overlap percentage (0-50) */
  overlapPercent?: number;
}

/**
 * Positioned orb item with calculated coordinates
 */
export interface PositionedOrbItem extends OrbItem {
  position: Position;
  zIndex: number;
}

/**
 * Return type for useOrbCluster hook
 */
export interface UseOrbClusterReturn {
  /** Items with calculated positions */
  positionedItems: PositionedOrbItem[];
  /** Container dimensions */
  containerSize: { width: number; height: number };
  /** Orb size config */
  orbSize: { button: number; icon: number };
  /** Effective pattern being used */
  effectivePattern: OrbPattern;
}

/**
 * Hook to calculate orb positions in a cluster pattern.
 *
 * Handles standard patterns, overlapping modes, and dynamic positioning.
 *
 * @example
 * ```tsx
 * const { positionedItems } = useOrbCluster({
 *   items: abilityItems,
 *   pattern: "bottom-row",
 *   size: "lg",
 *   containerWidth: 400,
 *   containerHeight: 200,
 *   overlapping: true,
 *   overlapPercent: 30,
 * });
 * ```
 */
export function useOrbCluster(options: UseOrbClusterOptions): UseOrbClusterReturn {
  const {
    items,
    pattern,
    size,
    containerWidth,
    containerHeight,
    spacing = 12,
    overlapping = false,
    overlapPercent = 30,
  } = options;

  return useMemo(() => {
    const orbSizeConfig = ORB_SIZES[size];
    const itemCount = items.length;

    const positionConfig: PositionConfig = {
      containerWidth,
      containerHeight,
      itemCount,
      orbSize: orbSizeConfig.button,
      spacing,
    };

    // Calculate positions
    let positions: Position[];

    if (overlapping) {
      // Use overlapping positions for row/arc patterns
      if (pattern === "bottom-row" || pattern === "bottom-arc") {
        positions =
          pattern === "bottom-arc"
            ? overlappingArcPositions(positionConfig, overlapPercent)
            : overlappingRowPositions(positionConfig, overlapPercent);
      } else {
        // Non-row patterns don't support overlapping well
        positions = getPatternPositions(pattern, positionConfig);
      }
    } else {
      positions = getPatternPositions(pattern, positionConfig);
    }

    // Map items to positioned items
    const positionedItems: PositionedOrbItem[] = items.map((item, index) => ({
      ...item,
      position: positions[index] || { x: 0, y: 0 },
      // Z-index: later items are on top for overlapping
      zIndex: overlapping ? index : 0,
    }));

    return {
      positionedItems,
      containerSize: { width: containerWidth, height: containerHeight },
      orbSize: orbSizeConfig,
      effectivePattern: pattern,
    };
  }, [
    items,
    pattern,
    size,
    containerWidth,
    containerHeight,
    spacing,
    overlapping,
    overlapPercent,
  ]);
}

/**
 * Calculate overlap-safe container height
 */
export function calculateClusterHeight(
  itemCount: number,
  size: OrbSize,
  pattern: OrbPattern,
  overlapping?: boolean
): number {
  const orbSize = ORB_SIZES[size].button;

  switch (pattern) {
    case "bottom-row":
    case "bottom-arc":
      return orbSize + 40; // One row plus padding
    case "left-stack":
    case "right-stack":
      return itemCount * orbSize + (itemCount - 1) * 12 + 32;
    case "radial":
    case "corners":
      return Math.max(200, orbSize * 3);
    default:
      return orbSize + 40;
  }
}
