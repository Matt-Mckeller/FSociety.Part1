/**
 * Shared AI Utilities and Constants
 * Used by both Claude and Gemini services
 */

import { LottieData } from "../../types/types"

/**
 * Check if Lottie needs chunking based on estimated token count
 */
export function needsChunking(
  lottieData: any,
  visualDescriptionLength: number = 0,
): boolean {
  const jsonString = JSON.stringify(lottieData)
  const estimatedTokens = jsonString.length / 4 // ~4 chars per token

  // Leave room for:
  // - System prompt: ~3k tokens
  // - Visual description: variable
  // - Other metadata: ~1k tokens
  const overhead = 5000 + visualDescriptionLength / 4
  const safeLimit = 200000 - overhead

  return estimatedTokens > safeLimit
}

/**
 * Create layer hierarchy summary for context
 *
 * PURPOSE: Provides a lightweight, human-readable overview of the animation structure
 * without requiring the AI to parse the entire JSON upfront.
 *
 * BENEFITS:
 * 1. Quick Understanding: Shows layer relationships at a glance
 * 2. Parent-Child Mapping: Identifies which layers are nested under others
 * 3. Shape Complexity: Indicates how many shapes each layer contains
 * 4. Token Efficiency: Much smaller than full JSON, saves context space
 * 5. Navigation Aid: Helps AI understand structure before diving into details
 *
 * EXAMPLE OUTPUT:
 * ## Layer Hierarchy:
 * 0. Background (type: 4)
 *    - Contains 3 shapes
 * 1. RocketBody (type: 4, parent: 0)
 *    - Contains 12 shapes
 *
 * This is especially useful for complex animations with 50+ layers.
 */
export function createLayerHierarchy(lottieData: any): string {
  let hierarchy = "## Layer Hierarchy Overview:\n"
  hierarchy +=
    "*(Simplified structure to help understand relationships before analyzing full JSON)*\n\n"

  lottieData.layers?.forEach((layer: any, i: number) => {
    const indent = "  ".repeat(layer.parent !== undefined ? 1 : 0)
    hierarchy += `${indent}${i}. ${layer.nm || "Unnamed"} (type: ${layer.ty}${layer.parent !== undefined ? `, parent: ${layer.parent}` : ""})\n`

    if (layer.shapes) {
      hierarchy += `${indent}   - Contains ${layer.shapes.length} shapes\n`
    }
  })

  return hierarchy
}

/**
 * Detect element type from actual Lottie data structure
 * Traverses the Lottie JSON to inspect the actual 'ty' property
 */
export function detectElementTypeFromData(
  path: string,
  lottieData: LottieData,
):
  | "fill"
  | "stroke"
  | "gradient"
  | "group"
  | "layer"
  | "effect"
  | "transform"
  | "unknown" {
  try {
    // Navigate to the element using the path
    let current: any = lottieData

    // Parse path like "layers[0].shapes[1].it[2].c.k"
    const pathParts = path.split(/\.(?![^\[]*\])/) // Split on dots not inside brackets

    for (const part of pathParts) {
      if (!current) return "unknown"

      // Handle array access like "layers[0]"
      const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/)
      if (arrayMatch) {
        const [, prop, index] = arrayMatch
        current = current[prop]?.[parseInt(index)]
      } else {
        current = current[part]
      }
    }

    // If we couldn't navigate to the element, try parent element
    if (!current || !current.ty) {
      // Try to get parent element (go up one level before final property)
      current = lottieData
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i]
        const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/)
        if (arrayMatch) {
          const [, prop, index] = arrayMatch
          current = current[prop]?.[parseInt(index)]
        } else {
          current = current[part]
        }
      }
    }

    // Check the 'ty' property to determine type
    if (current && current.ty) {
      const ty = current.ty

      // Map Lottie type codes to our ElementType
      switch (ty) {
        case "fl":
          return "fill"
        case "st":
          return "stroke"
        case "gf":
        case "gs":
          return "gradient"
        case "gr":
          return "group"
        case "tr":
          return "transform"
        case "ef":
          return "effect"
        // Layer types are numeric
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          return "layer"
        default:
          // If it's a numeric type we haven't mapped, assume it's a layer
          if (typeof ty === "number") {
            return "layer"
          }
      }
    }

    // Fallback to path-based detection if no ty property found
    return detectElementTypeFromPath(path)
  } catch (error) {
    // If traversal fails, fall back to path-based detection
    return detectElementTypeFromPath(path)
  }
}

/**
 * Fallback: Detect element type from path string (less accurate)
 * Only used when actual data traversal fails
 */
function detectElementTypeFromPath(
  path: string,
):
  | "fill"
  | "stroke"
  | "gradient"
  | "group"
  | "layer"
  | "effect"
  | "transform"
  | "unknown" {
  if (path.includes(".fl") || path.endsWith(".c.k")) return "fill"
  if (path.includes(".st")) return "stroke"
  if (path.includes(".gf") || path.includes(".gs") || path.includes(".g.k"))
    return "gradient"
  if (path.includes(".gr") || path.includes(".shapes[")) return "group"
  if (path.includes(".tr") || path.includes(".ks")) return "transform"
  if (path.includes(".ef")) return "effect"
  if (path.startsWith("layers[") && !path.includes(".")) return "layer"
  return "unknown"
}
