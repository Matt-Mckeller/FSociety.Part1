/**
 * Utility functions to extract information from Lottie JSON
 * Migrated from langchain/chains/metadataAnalysis.ts
 */

import type { LottieData } from "../../types/types"

/**
 * Extract layer information from Lottie JSON
 */
export function extractLayerInfo(lottieJson: LottieData): string {
  const layers = lottieJson.layers || []
  const layerNames = layers
    .map((layer) => layer.nm || "Unnamed")
    .filter((name) => name !== "Unnamed")

  if (layerNames.length === 0) {
    return "No named layers found"
  }

  return `Layers (${layerNames.length} total):
${layerNames
  .slice(0, 10)
  .map((name, i) => `  ${i + 1}. ${name}`)
  .join(
    "\n",
  )}${layerNames.length > 10 ? `\n  ... and ${layerNames.length - 10} more` : ""}`
}

/**
 * Extract color information from Lottie JSON
 */
export function extractColorInfo(lottieJson: LottieData): string {
  const colors = new Set<string>()

  function findColors(obj: any) {
    if (!obj || typeof obj !== "object") return

    // Look for color properties
    if (obj.c && obj.c.k && Array.isArray(obj.c.k)) {
      const color = obj.c.k
      if (color.length >= 3) {
        const hex = `#${Math.round(color[0] * 255)
          .toString(16)
          .padStart(2, "0")}${Math.round(color[1] * 255)
          .toString(16)
          .padStart(2, "0")}${Math.round(color[2] * 255)
          .toString(16)
          .padStart(2, "0")}`
        colors.add(hex)
      }
    }

    // Recursively search
    Object.values(obj).forEach((value) => {
      if (typeof value === "object") findColors(value)
    })
  }

  findColors(lottieJson)

  if (colors.size === 0) {
    return "No colors detected"
  }

  return `Colors found: ${Array.from(colors).slice(0, 8).join(", ")}${colors.size > 8 ? `, and ${colors.size - 8} more` : ""}`
}

/**
 * Extract motion characteristics
 */
export function extractMotionInfo(lottieJson: LottieData): string {
  const duration = ((lottieJson.op - lottieJson.ip) / lottieJson.fr).toFixed(2)
  const layerCount = lottieJson.layers?.length || 0

  return `Animation Duration: ${duration}s
Layer Count: ${layerCount}
Frame Rate: ${lottieJson.fr}fps
Dimensions: ${lottieJson.w}x${lottieJson.h}px`
}
