/**
 * Lottie JSON Parser Utility
 * Extracts and analyzes Lottie animation structure
 */

import {
  LottieData,
  ComponentAnalysis,
  ComponentContext,
  COMPONENT_LEVELS,
} from "../types/types"

/**
 * Parse Lottie JSON and extract basic info
 */
export function parseLottieJSON(json: any): LottieData {
  if (!json || typeof json !== "object") {
    throw new Error("Invalid Lottie JSON: must be an object")
  }

  if (!json.layers || !Array.isArray(json.layers)) {
    throw new Error("Invalid Lottie JSON: missing layers array")
  }

  return {
    v: json.v || "5.0.0",
    fr: json.fr || 30,
    ip: json.ip || 0,
    op: json.op || 60,
    w: json.w || 500,
    h: json.h || 500,
    nm: json.nm,
    layers: json.layers,
    assets: json.assets || [],
    ...json,
  }
}

/**
 * Validate uploaded Lottie JSON
 */
export function validateLottieJSON(json: any): {
  valid: boolean
  error?: string
} {
  try {
    parseLottieJSON(json)
    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error:
        error instanceof Error ? error.message : "Unknown validation error",
    }
  }
}

/**
 * Get animation metadata
 */
export function getAnimationMetadata(lottieData: LottieData) {
  const duration = (lottieData.op - lottieData.ip) / lottieData.fr

  return {
    version: lottieData.v,
    frameRate: lottieData.fr,
    startFrame: lottieData.ip,
    endFrame: lottieData.op,
    totalFrames: lottieData.op - lottieData.ip,
    duration,
    width: lottieData.w,
    height: lottieData.h,
    name: lottieData.nm,
    layerCount: lottieData.layers?.length || 0,
    assetCount: lottieData.assets?.length || 0,
  }
}

/**
 * Analyze component context (fills, strokes, gradients)
 */
export function analyzeComponentContext(
  component: any,
  type: string,
): ComponentContext {
  const context: ComponentContext = {
    containsShapes: [],
    hasFills: false,
    hasStrokes: false,
    hasGradients: false,
    colorInfo: {
      hasColor: false,
      isGradient: false,
    },
  }

  // Check for fills
  if (type === "fl" || component.ty === "fl") {
    context.hasFills = true
    if (context.colorInfo) context.colorInfo.hasColor = true
  }

  // Check for strokes
  if (type === "st" || component.ty === "st") {
    context.hasStrokes = true
    if (context.colorInfo) context.colorInfo.hasColor = true
  }

  // Check for gradients
  if (
    type === "gf" ||
    type === "gs" ||
    component.ty === "gf" ||
    component.ty === "gs"
  ) {
    context.hasGradients = true
    if (context.colorInfo) {
      context.colorInfo.hasColor = true
      context.colorInfo.isGradient = true

      if (component.g?.p) {
        context.colorInfo.stopCount = component.g.p
      }
    }
  }

  // For groups, check children
  if (component.it && Array.isArray(component.it)) {
    component.it.forEach((child: any) => {
      if (child.ty) {
        context.containsShapes?.push(child.ty)
        if (child.ty === "fl") context.hasFills = true
        if (child.ty === "st") context.hasStrokes = true
        if (child.ty === "gf" || child.ty === "gs") {
          context.hasGradients = true
          if (context.colorInfo) context.colorInfo.isGradient = true
        }
      }
    })

    if (context.hasFills || context.hasStrokes || context.hasGradients) {
      if (context.colorInfo) context.colorInfo.hasColor = true
    }
  }

  return context
}

/**
 * Determine if component is themeable (contains colors)
 */
export function isThemeableComponent(component: any, type: string): boolean {
  // Direct color components
  if (
    ["fl", "st", "gf", "gs"].includes(type) ||
    ["fl", "st", "gf", "gs"].includes(component.ty)
  ) {
    return true
  }

  // Groups containing color components
  if (component.it && Array.isArray(component.it)) {
    return component.it.some(
      (child: any) => child.ty && ["fl", "st", "gf", "gs"].includes(child.ty),
    )
  }

  return false
}

/**
 * Get component type label
 */
export function getComponentTypeLabel(type: string | number): string {
  const typeMap: Record<string, string> = {
    // Layer types (numeric)
    "0": "Precomp Layer",
    "1": "Solid Layer",
    "2": "Image Layer",
    "3": "Null Layer",
    "4": "Shape Layer",
    "5": "Text Layer",

    // Shape types
    gr: "Group",
    rc: "Rectangle",
    el: "Ellipse",
    sr: "Star",
    sh: "Path",
    fl: "Fill",
    st: "Stroke",
    gf: "Gradient Fill",
    gs: "Gradient Stroke",
    tr: "Transform",
    tm: "Trim Paths",
    rd: "Rounded Corners",
    pb: "Pucker/Bloat",
    rp: "Repeater",
    mm: "Merge",
  }

  return typeMap[String(type)] || `Unknown (${type})`
}

/**
 * Count components by level
 */
export function countComponentsByLevel(
  lottieData: LottieData,
): Record<number, number> {
  const counts: Record<number, number> = {}

  Object.values(COMPONENT_LEVELS).forEach((level) => {
    counts[level] = 0
  })

  // This would be more complete with componentWalker
  // For now, just count basics
  counts[COMPONENT_LEVELS.COMPOSITION] = 1
  counts[COMPONENT_LEVELS.LAYER] = lottieData.layers?.length || 0
  counts[COMPONENT_LEVELS.ASSET] = lottieData.assets?.length || 0

  return counts
}

/**
 * Extract parent name from path
 */
export function getParentFromPath(path: string): string | undefined {
  const parts = path.split(".")
  parts.pop()
  return parts.length > 0 ? parts.join(".") : undefined
}

/**
 * Generate unique ID for component
 */
export function generateComponentId(path: string, type: string): string {
  return `${path}::${type}`.replace(/\./g, "_").replace(/\[|\]/g, "-")
}

/**
 * Check if name follows naming convention [Purpose][Location][Detail]
 */
export function isValidName(name: string): boolean {
  if (!name || typeof name !== "string") return false

  // Basic checks
  if (name.length < 3) return false
  if (/^(shape|group|layer|path|fill|stroke)/i.test(name)) return false // generic names

  // Should start with capital letter and use PascalCase
  if (!/^[A-Z]/.test(name)) return false

  return true
}

/**
 * Check if name is generic
 */
export function isGenericName(name: string): boolean {
  if (!name) return false

  const genericPatterns = [
    /^shape\s*\d*$/i,
    /^group\s*\d*$/i,
    /^layer\s*\d*$/i,
    /^path\s*\d*$/i,
    /^fill\s*\d*$/i,
    /^stroke\s*\d*$/i,
    /^ellipse\s*\d*$/i,
    /^rectangle\s*\d*$/i,
    /^untitled/i,
  ]

  return genericPatterns.some((pattern) => pattern.test(name.trim()))
}
