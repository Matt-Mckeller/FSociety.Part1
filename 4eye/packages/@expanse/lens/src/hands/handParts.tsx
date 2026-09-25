"use client"

/**
 * Hand-pose primitives — capsule fingers and rounded palms that poses are
 * assembled from (mitten-style line art, never hand-traced paths). All parts
 * are plain stroked shapes in the shared 0 0 100 100 viewBox so they read at
 * chip size and inherit the lens palette.
 */

import React from "react"

export interface FingerProps {
  /** Base joint of the finger (where it meets the palm). */
  x: number
  y: number
  /** How far the capsule extends "up" from the base before rotation. */
  length: number
  width?: number
  /** Rotation in degrees around the base joint. */
  angle?: number
  stroke: string
  fill?: string
  strokeWidth?: number
  className?: string
}

/** A finger-like capsule extending upward from its base point, rotatable. */
export function Finger({
  x,
  y,
  length,
  width = 9,
  angle = 0,
  stroke,
  fill = "none",
  strokeWidth = 2.5,
  className,
}: FingerProps) {
  return (
    <rect
      className={className}
      x={x - width / 2}
      y={y - length}
      width={width}
      height={length + width / 2}
      rx={width / 2}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform={angle ? `rotate(${angle} ${x} ${y})` : undefined}
    />
  )
}

export interface PalmProps {
  cx: number
  cy: number
  width?: number
  height?: number
  /** Rotation in degrees around the center. */
  angle?: number
  stroke: string
  fill?: string
  strokeWidth?: number
  className?: string
}

/** A rounded palm block centered at (cx, cy), rotatable. */
export function Palm({
  cx,
  cy,
  width = 32,
  height = 26,
  angle = 0,
  stroke,
  fill = "none",
  strokeWidth = 2.5,
  className,
}: PalmProps) {
  return (
    <rect
      className={className}
      x={cx - width / 2}
      y={cy - height / 2}
      width={width}
      height={height}
      rx={9}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform={angle ? `rotate(${angle} ${cx} ${cy})` : undefined}
    />
  )
}

export interface KnuckleRowProps {
  /** Left edge x of the row. */
  x: number
  /** Baseline y the humps sit on. */
  y: number
  /** Number of knuckle humps. */
  count?: number
  /** Width of each hump. */
  step?: number
  /** Hump height. */
  rise?: number
  stroke: string
  strokeWidth?: number
  className?: string
}

/** A scalloped row of knuckle humps — reads as folded fingers on a fist. */
export function KnuckleRow({
  x,
  y,
  count = 4,
  step = 9,
  rise = 6,
  stroke,
  strokeWidth = 2.5,
  className,
}: KnuckleRowProps) {
  let d = `M${x} ${y}`
  for (let i = 0; i < count; i++) d += ` q${step / 2} ${-rise} ${step} 0`
  return (
    <path className={className} d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
  )
}
