import { Theme } from "@mui/material"
import {
  CalculatedLine,
  TripleDashAlign,
  TripleDashOrder,
  TripleDashOrientation,
} from "./TripleDash.types"

/**
 * The ratio of line lengths: 1:2:3
 */
const LINE_RATIOS = [1, 2, 3] as const
const TOTAL_RATIO = LINE_RATIOS.reduce((a, b) => a + b, 0) // 6

/**
 * Calculate line lengths based on available space
 * Lines follow a 1:2:3 ratio with gaps between them
 *
 * For horizontal: dashes are arranged left-to-right in a row
 * For vertical: dashes are arranged top-to-bottom in a column
 */
export function calculateLineLengths(
  availableLength: number,
  gap: number,
): [number, number, number] {
  const totalGaps = gap * 2 // 2 gaps between 3 lines
  const availableForLines = Math.max(0, availableLength - totalGaps)
  const unit = availableForLines / TOTAL_RATIO

  return [unit * LINE_RATIOS[0], unit * LINE_RATIOS[1], unit * LINE_RATIOS[2]]
}

/**
 * Calculate the default gap (proportional to container)
 * Gap = container / 14 (gives nice proportional spacing)
 */
export function calculateProportionalGap(containerLength: number): number {
  return containerLength / 14
}

/**
 * Calculate line positions and dimensions for SVG rendering
 *
 * HORIZONTAL: 3 dashes in a horizontal row, all same Y position
 *   ━━━  ━━━━━━  ━━━━━━━━━
 *
 * VERTICAL: 3 dashes in a vertical column, all same X position
 *   |
 *   ||
 *   |||
 */
export function calculateLines(
  containerWidth: number,
  containerHeight: number,
  orientation: TripleDashOrientation,
  align: TripleDashAlign,
  order: TripleDashOrder,
  strokeWidth: number,
  gap: number,
): CalculatedLine[] {
  const isHorizontal = orientation === "horizontal"

  // For horizontal: lines extend along width (as length), arranged in a row
  // For vertical: lines extend along height (as length), arranged in a column
  const containerLength = isHorizontal ? containerWidth : containerHeight
  const containerThickness = isHorizontal ? containerHeight : containerWidth

  // Calculate line lengths (how long each dash is)
  const lineLengths = calculateLineLengths(containerLength, gap)

  // Apply order
  const orderedLengths =
    order === "ascending"
      ? lineLengths
      : ([...lineLengths].reverse() as [number, number, number])

  // Calculate positions along the main axis (where each dash starts)
  // Dashes are arranged sequentially with gaps between them
  let currentPos = 0
  const positions: number[] = []

  for (let i = 0; i < 3; i++) {
    positions.push(currentPos)
    currentPos += orderedLengths[i] + gap
  }

  // Center the dashes on the cross-axis (thickness dimension)
  const crossAxisCenter = (containerThickness - strokeWidth) / 2

  const lines: CalculatedLine[] = orderedLengths.map((length, index) => {
    const mainAxisPos = positions[index]

    if (isHorizontal) {
      // Horizontal: x is position along row, y is centered vertically
      let x = mainAxisPos

      // Apply alignment (flip the whole row)
      if (align === "end") {
        x = containerWidth - (currentPos - gap) + mainAxisPos
      } else if (align === "center") {
        x = (containerWidth - (currentPos - gap)) / 2 + mainAxisPos
      }

      return {
        x,
        y: crossAxisCenter,
        width: length,
        height: strokeWidth,
      }
    }

    // Vertical: y is position along column, x is centered horizontally
    let y = mainAxisPos

    // Apply alignment (flip the whole column)
    if (align === "end") {
      y = containerHeight - (currentPos - gap) + mainAxisPos
    } else if (align === "center") {
      y = (containerHeight - (currentPos - gap)) / 2 + mainAxisPos
    }

    return {
      x: crossAxisCenter,
      y,
      width: strokeWidth,
      height: length,
    }
  })

  return lines
}

/**
 * Resolve a color value that may be a theme path or CSS color
 */
export function resolveColor(
  color: string | [string, string, string],
  lineIndex: number,
  theme: Theme,
): string {
  const colorValue = Array.isArray(color) ? color[lineIndex] : color

  // Handle 'currentColor' and standard CSS colors
  if (
    colorValue === "currentColor" ||
    colorValue.startsWith("#") ||
    colorValue.startsWith("rgb") ||
    colorValue.startsWith("hsl")
  ) {
    return colorValue
  }

  // Handle theme palette paths like 'primary.main', 'text.primary', etc.
  if (colorValue.includes(".")) {
    const parts = colorValue.split(".")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = theme.palette

    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = value[part]
      } else {
        // Path not found, return original
        return colorValue
      }
    }

    if (typeof value === "string") {
      return value
    }
  }

  // Return as-is for named colors like 'black', 'white', etc.
  return colorValue
}

/**
 * Calculate the ideal viewBox dimensions
 */
export function calculateViewBox(
  orientation: TripleDashOrientation,
  strokeWidth: number,
  gap: number,
): { width: number; height: number } {
  // Use a base size that's easy to scale
  const baseExtend = 100
  const baseStack = strokeWidth * 3 + gap * 2

  if (orientation === "horizontal") {
    return { width: baseExtend, height: baseStack }
  }
  return { width: baseStack, height: baseExtend }
}
