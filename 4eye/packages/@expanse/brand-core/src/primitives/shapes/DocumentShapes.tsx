/**
 * Document Shapes - Paper, clipboard, notebook primitives
 *
 * Standard document shapes with configurable styles.
 * Used for homework cards, assignments, and document illustrations.
 *
 * ## Aspect Ratios
 * - US Letter: 8.5:11 (0.772)
 * - A4: 210:297 (0.707)
 * - Square: 1:1
 * - Wide: 16:9
 *
 * ## Design Patterns
 * These shapes use the 1:2:3 triple-layer border system for consistent branding.
 */

"use client"

import React from "react"
import { useTheme } from "@mui/system"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// CONSTANTS
// ============================================================

/** Standard document aspect ratios */
export const DOCUMENT_RATIOS = {
  /** US Letter: 8.5 x 11 inches */
  usLetter: 8.5 / 11,
  /** A4: 210 x 297 mm */
  a4: 210 / 297,
  /** Square */
  square: 1,
  /** Widescreen 16:9 */
  wide16x9: 16 / 9,
  /** Screen 4:3 */
  screen4x3: 4 / 3,
} as const

export type DocumentRatio = keyof typeof DOCUMENT_RATIOS

// ============================================================
// PAPER SHAPE
// ============================================================

export interface PaperShapeProps {
  /** Width of the paper */
  width?: number
  /** Height of the paper (calculated from ratio if not provided) */
  height?: number
  /** Aspect ratio preset */
  ratio?: DocumentRatio
  /** Corner radius */
  cornerRadius?: number
  /** Fill color */
  fill?: string
  /** Stroke color */
  stroke?: string
  /** Stroke width */
  strokeWidth?: number
  /** Whether to show shadow effect */
  showShadow?: boolean
  /** Custom class name */
  className?: string
}

export function PaperShape({
  width = 100,
  height,
  ratio = "usLetter",
  cornerRadius = 2,
  fill,
  stroke,
  strokeWidth = 1,
  showShadow = false,
  className,
}: PaperShapeProps) {
  const theme = useTheme()
  const { threeLayerInnerStroke } = useVectorGraphicColors()

  const finalHeight = height ?? width / DOCUMENT_RATIOS[ratio]
  const finalFill = fill ?? theme.palette.background.paper
  const finalStroke = stroke ?? threeLayerInnerStroke

  return (
    <g className={className} data-shape="paper">
      {showShadow && (
        <rect
          x={3}
          y={3}
          width={width}
          height={finalHeight}
          rx={cornerRadius}
          fill="rgba(0,0,0,0.1)"
          data-id="paper-shadow"
        />
      )}
      <rect
        x={0}
        y={0}
        width={width}
        height={finalHeight}
        rx={cornerRadius}
        fill={finalFill}
        stroke={finalStroke}
        strokeWidth={strokeWidth}
        data-id="paper-body"
      />
    </g>
  )
}

// ============================================================
// FOLDED CORNER PAPER
// ============================================================

export interface FoldedPaperShapeProps extends PaperShapeProps {
  /** Size of the folded corner (relative to width) */
  foldSize?: number
  /** Fold color (slightly darker than paper) */
  foldColor?: string
}

export function FoldedPaperShape({
  width = 100,
  height,
  ratio = "usLetter",
  cornerRadius = 2,
  fill,
  stroke,
  strokeWidth = 1,
  foldSize = 0.15,
  foldColor,
  showShadow = false,
  className,
}: FoldedPaperShapeProps) {
  const theme = useTheme()
  const { threeLayerInnerStroke } = useVectorGraphicColors()

  const finalHeight = height ?? width / DOCUMENT_RATIOS[ratio]
  const finalFill = fill ?? theme.palette.background.paper
  const finalStroke = stroke ?? threeLayerInnerStroke
  const foldWidth = width * foldSize
  const actualFoldColor =
    foldColor ??
    (theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.1)")

  // Path for paper with folded corner (top-right)
  const paperPath = `
    M ${cornerRadius} 0
    H ${width - foldWidth}
    L ${width} ${foldWidth}
    V ${finalHeight - cornerRadius}
    Q ${width} ${finalHeight} ${width - cornerRadius} ${finalHeight}
    H ${cornerRadius}
    Q 0 ${finalHeight} 0 ${finalHeight - cornerRadius}
    V ${cornerRadius}
    Q 0 0 ${cornerRadius} 0
    Z
  `

  // Triangle for the fold
  const foldPath = `
    M ${width - foldWidth} 0
    L ${width} ${foldWidth}
    L ${width - foldWidth} ${foldWidth}
    Z
  `

  return (
    <g className={className} data-shape="folded-paper">
      {showShadow && (
        <path
          d={paperPath}
          transform="translate(3, 3)"
          fill="rgba(0,0,0,0.1)"
          data-id="folded-paper-shadow"
        />
      )}
      <path
        d={paperPath}
        fill={finalFill}
        stroke={finalStroke}
        strokeWidth={strokeWidth}
        data-id="folded-paper-body"
      />
      <path
        d={foldPath}
        fill={actualFoldColor}
        stroke={finalStroke}
        strokeWidth={strokeWidth * 0.5}
        data-id="folded-paper-fold"
      />
    </g>
  )
}

// ============================================================
// CLIPBOARD SHAPE
// ============================================================

export interface ClipboardShapeProps extends PaperShapeProps {
  /** Height of the clip at top */
  clipHeight?: number
  /** Clip color */
  clipColor?: string
}

export function ClipboardShape({
  width = 100,
  height,
  ratio = "usLetter",
  cornerRadius = 3,
  fill,
  stroke,
  strokeWidth = 1,
  clipHeight = 0.08,
  clipColor,
  showShadow = false,
  className,
}: ClipboardShapeProps) {
  const theme = useTheme()
  const { threeLayerInnerStroke } = useVectorGraphicColors()

  const finalHeight = height ?? width / DOCUMENT_RATIOS[ratio]
  const finalFill = fill ?? theme.palette.background.paper
  const finalStroke = stroke ?? threeLayerInnerStroke
  const clipH = finalHeight * clipHeight
  const clipWidth = width * 0.4
  const clipX = (width - clipWidth) / 2
  const actualClipColor = clipColor ?? theme.palette.grey[400]

  return (
    <g className={className} data-shape="clipboard">
      {showShadow && (
        <rect
          x={3}
          y={clipH + 3}
          width={width}
          height={finalHeight}
          rx={cornerRadius}
          fill="rgba(0,0,0,0.1)"
          data-id="clipboard-shadow"
        />
      )}
      {/* Board */}
      <rect
        x={0}
        y={clipH}
        width={width}
        height={finalHeight}
        rx={cornerRadius}
        fill={finalFill}
        stroke={finalStroke}
        strokeWidth={strokeWidth}
        data-id="clipboard-board"
      />
      {/* Clip */}
      <rect
        x={clipX}
        y={0}
        width={clipWidth}
        height={clipH * 2.5}
        rx={cornerRadius / 2}
        fill={actualClipColor}
        stroke={finalStroke}
        strokeWidth={strokeWidth * 0.75}
        data-id="clipboard-clip"
      />
      {/* Clip hole */}
      <ellipse
        cx={width / 2}
        cy={clipH * 0.6}
        rx={clipWidth * 0.15}
        ry={clipH * 0.3}
        fill={finalFill}
        data-id="clipboard-clip-hole"
      />
    </g>
  )
}

// ============================================================
// NOTEBOOK PAGE SHAPE
// ============================================================

export interface NotebookPageShapeProps extends PaperShapeProps {
  /** Number of spiral holes */
  spiralHoles?: number
  /** Spiral margin width */
  spiralMargin?: number
  /** Whether to show ruled lines */
  showLines?: boolean
  /** Number of ruled lines */
  lineCount?: number
}

export function NotebookPageShape({
  width = 100,
  height,
  ratio = "usLetter",
  cornerRadius = 2,
  fill,
  stroke,
  strokeWidth = 1,
  spiralHoles = 5,
  spiralMargin = 0.1,
  showLines = true,
  lineCount = 12,
  showShadow = false,
  className,
}: NotebookPageShapeProps) {
  const theme = useTheme()
  const { threeLayerInnerStroke } = useVectorGraphicColors()

  const finalHeight = height ?? width / DOCUMENT_RATIOS[ratio]
  const finalFill = fill ?? theme.palette.background.paper
  const finalStroke = stroke ?? threeLayerInnerStroke
  const marginWidth = width * spiralMargin
  const holeRadius = marginWidth * 0.25
  const holeSpacing = (finalHeight - marginWidth * 2) / (spiralHoles - 1)
  const lineSpacing = (finalHeight - marginWidth * 4) / (lineCount + 1)
  const lineColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"

  return (
    <g className={className} data-shape="notebook-page">
      {showShadow && (
        <rect
          x={3}
          y={3}
          width={width}
          height={finalHeight}
          rx={cornerRadius}
          fill="rgba(0,0,0,0.1)"
          data-id="notebook-shadow"
        />
      )}
      {/* Page */}
      <rect
        x={0}
        y={0}
        width={width}
        height={finalHeight}
        rx={cornerRadius}
        fill={finalFill}
        stroke={finalStroke}
        strokeWidth={strokeWidth}
        data-id="notebook-page"
      />
      {/* Spiral margin line */}
      <line
        x1={marginWidth}
        y1={0}
        x2={marginWidth}
        y2={finalHeight}
        stroke={lineColor}
        strokeWidth={1}
        data-id="notebook-margin-line"
      />
      {/* Spiral holes */}
      {Array.from({ length: spiralHoles }).map((_, i) => (
        <circle
          key={i}
          cx={marginWidth / 2}
          cy={marginWidth + i * holeSpacing}
          r={holeRadius}
          fill={theme.palette.background.default}
          stroke={finalStroke}
          strokeWidth={strokeWidth * 0.5}
          data-id={`notebook-hole-${i + 1}`}
        />
      ))}
      {/* Ruled lines */}
      {showLines &&
        Array.from({ length: lineCount }).map((_, i) => (
          <line
            key={i}
            x1={marginWidth + marginWidth * 0.5}
            y1={marginWidth * 2 + (i + 1) * lineSpacing}
            x2={width - marginWidth * 0.5}
            y2={marginWidth * 2 + (i + 1) * lineSpacing}
            stroke={lineColor}
            strokeWidth={0.5}
            data-id={`notebook-line-${i + 1}`}
          />
        ))}
    </g>
  )
}
