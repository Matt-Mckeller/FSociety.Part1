/**
 * Orb Position Utilities
 *
 * Functions for calculating orb positions in various patterns.
 */

import type { OrbPattern, OrbSize, ORB_SIZES } from "./types";

export interface Position {
  x: number;
  y: number;
}

export interface PositionConfig {
  containerWidth: number;
  containerHeight: number;
  itemCount: number;
  orbSize: number;
  spacing?: number;
}

/**
 * Calculate positions for bottom arc pattern
 */
export function bottomArcPositions(config: PositionConfig): Position[] {
  const { containerWidth, containerHeight, itemCount, orbSize, spacing = 16 } = config;
  const positions: Position[] = [];
  const centerX = containerWidth / 2;
  const arcRadius = Math.min(containerWidth * 0.4, 150);
  const startAngle = Math.PI * 0.15;
  const endAngle = Math.PI * 0.85;
  const angleStep = (endAngle - startAngle) / Math.max(itemCount - 1, 1);

  for (let i = 0; i < itemCount; i++) {
    const angle = startAngle + angleStep * i;
    const x = centerX + Math.cos(angle) * arcRadius - orbSize / 2;
    const y = containerHeight - orbSize - spacing - Math.sin(angle) * (arcRadius * 0.5);
    positions.push({ x, y });
  }

  return positions;
}

/**
 * Calculate positions for top arc pattern
 */
export function topArcPositions(config: PositionConfig): Position[] {
  const { containerWidth, itemCount, orbSize, spacing = 16 } = config;
  const positions: Position[] = [];
  const centerX = containerWidth / 2;
  const arcRadius = Math.min(containerWidth * 0.4, 150);
  const startAngle = Math.PI * 1.15;
  const endAngle = Math.PI * 1.85;
  const angleStep = (endAngle - startAngle) / Math.max(itemCount - 1, 1);

  for (let i = 0; i < itemCount; i++) {
    const angle = startAngle + angleStep * i;
    const x = centerX + Math.cos(angle) * arcRadius - orbSize / 2;
    const y = spacing + Math.sin(angle) * (arcRadius * 0.5) + arcRadius * 0.5;
    positions.push({ x, y });
  }

  return positions;
}

/**
 * Calculate positions for left stack pattern
 */
export function leftStackPositions(config: PositionConfig): Position[] {
  const { containerHeight, itemCount, orbSize, spacing = 12 } = config;
  const positions: Position[] = [];
  const totalHeight = itemCount * orbSize + (itemCount - 1) * spacing;
  const startY = (containerHeight - totalHeight) / 2;

  for (let i = 0; i < itemCount; i++) {
    positions.push({
      x: spacing,
      y: startY + i * (orbSize + spacing),
    });
  }

  return positions;
}

/**
 * Calculate positions for right stack pattern
 */
export function rightStackPositions(config: PositionConfig): Position[] {
  const { containerWidth, containerHeight, itemCount, orbSize, spacing = 12 } = config;
  const positions: Position[] = [];
  const totalHeight = itemCount * orbSize + (itemCount - 1) * spacing;
  const startY = (containerHeight - totalHeight) / 2;

  for (let i = 0; i < itemCount; i++) {
    positions.push({
      x: containerWidth - orbSize - spacing,
      y: startY + i * (orbSize + spacing),
    });
  }

  return positions;
}

/**
 * Calculate positions for radial pattern
 */
export function radialPositions(config: PositionConfig): Position[] {
  const { containerWidth, containerHeight, itemCount, orbSize } = config;
  const positions: Position[] = [];
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const radius = Math.min(containerWidth, containerHeight) * 0.35;

  for (let i = 0; i < itemCount; i++) {
    const angle = (Math.PI * 2 * i) / itemCount - Math.PI / 2;
    positions.push({
      x: centerX + Math.cos(angle) * radius - orbSize / 2,
      y: centerY + Math.sin(angle) * radius - orbSize / 2,
    });
  }

  return positions;
}

/**
 * Calculate positions for corners pattern
 */
export function cornersPositions(config: PositionConfig): Position[] {
  const { containerWidth, containerHeight, itemCount, orbSize, spacing = 16 } = config;
  const corners: Position[] = [
    { x: spacing, y: spacing }, // top-left
    { x: containerWidth - orbSize - spacing, y: spacing }, // top-right
    { x: containerWidth - orbSize - spacing, y: containerHeight - orbSize - spacing }, // bottom-right
    { x: spacing, y: containerHeight - orbSize - spacing }, // bottom-left
  ];

  return corners.slice(0, itemCount);
}

/**
 * Calculate positions for diagonal pattern (top-left origin)
 */
export function diagonalTLPositions(config: PositionConfig): Position[] {
  const { itemCount, orbSize, spacing = 16 } = config;
  const positions: Position[] = [];

  for (let i = 0; i < itemCount; i++) {
    positions.push({
      x: spacing + i * (orbSize + spacing),
      y: spacing + i * (orbSize + spacing),
    });
  }

  return positions;
}

/**
 * Calculate positions for diagonal pattern (top-right origin)
 */
export function diagonalTRPositions(config: PositionConfig): Position[] {
  const { containerWidth, itemCount, orbSize, spacing = 16 } = config;
  const positions: Position[] = [];

  for (let i = 0; i < itemCount; i++) {
    positions.push({
      x: containerWidth - orbSize - spacing - i * (orbSize + spacing),
      y: spacing + i * (orbSize + spacing),
    });
  }

  return positions;
}

/**
 * Calculate positions for bottom row pattern
 */
export function bottomRowPositions(config: PositionConfig): Position[] {
  const { containerWidth, containerHeight, itemCount, orbSize, spacing = 12 } = config;
  const positions: Position[] = [];
  const totalWidth = itemCount * orbSize + (itemCount - 1) * spacing;
  const startX = (containerWidth - totalWidth) / 2;

  for (let i = 0; i < itemCount; i++) {
    positions.push({
      x: startX + i * (orbSize + spacing),
      y: containerHeight - orbSize - spacing,
    });
  }

  return positions;
}

/**
 * Calculate positions for overlapping row (orbs overlap by percentage)
 */
export function overlappingRowPositions(
  config: PositionConfig,
  overlapPercent: number = 30
): Position[] {
  const { containerWidth, containerHeight, itemCount, orbSize, spacing = 0 } = config;
  const positions: Position[] = [];
  const overlapPx = (orbSize * overlapPercent) / 100;
  const effectiveStep = orbSize - overlapPx + spacing;
  const totalWidth = orbSize + (itemCount - 1) * effectiveStep;
  const startX = (containerWidth - totalWidth) / 2;

  for (let i = 0; i < itemCount; i++) {
    positions.push({
      x: startX + i * effectiveStep,
      y: containerHeight - orbSize - 16,
    });
  }

  return positions;
}

/**
 * Calculate positions for overlapping arc (orbs overlap by percentage)
 */
export function overlappingArcPositions(
  config: PositionConfig,
  overlapPercent: number = 25
): Position[] {
  const { containerWidth, containerHeight, itemCount, orbSize, spacing = 0 } = config;
  const positions: Position[] = [];
  const centerX = containerWidth / 2;
  // Tighter arc for overlapping
  const arcRadius = Math.min(containerWidth * 0.35, 120);
  const overlapFactor = 1 - overlapPercent / 100;
  const angleSpan = Math.PI * 0.5 * (itemCount - 1) * overlapFactor;
  const startAngle = Math.PI / 2 - angleSpan / 2;
  const angleStep = itemCount > 1 ? angleSpan / (itemCount - 1) : 0;

  for (let i = 0; i < itemCount; i++) {
    const angle = startAngle + angleStep * i;
    const x = centerX + Math.cos(angle) * arcRadius - orbSize / 2;
    // Invert for bottom arc
    const y = containerHeight - orbSize - 20 - Math.sin(angle) * (arcRadius * 0.4);
    positions.push({ x, y });
  }

  return positions;
}

/**
 * Get positions for a given pattern
 */
export function getPatternPositions(
  pattern: OrbPattern,
  config: PositionConfig
): Position[] {
  switch (pattern) {
    case "bottom-arc":
      return bottomArcPositions(config);
    case "top-arc":
      return topArcPositions(config);
    case "left-stack":
      return leftStackPositions(config);
    case "right-stack":
      return rightStackPositions(config);
    case "radial":
      return radialPositions(config);
    case "corners":
      return cornersPositions(config);
    case "diagonal-tl":
      return diagonalTLPositions(config);
    case "diagonal-tr":
      return diagonalTRPositions(config);
    case "bottom-row":
      return bottomRowPositions(config);
    case "custom":
    default:
      return bottomRowPositions(config);
  }
}
