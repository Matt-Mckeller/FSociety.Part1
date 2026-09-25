/**
 * Gradient color stop with offset and color
 */
export interface GradientColorStop {
  offset: number // 0-1 range (0 = start, 1 = end)
  color: string // Hex format with alpha: "#rrggbbaa"
}
