/**
 * Shared Lottie Theming Utilities
 *
 * Provides reusable functions for applying Strategy 2d theming to Lottie animations.
 * Strategy 2d uses bidirectional adaptive contrast enhancement to maintain visual depth
 * and shading across different theme colors (both light and dark themes).
 */

/**
 * Layer customization options for fine-tuned theming control
 */
export interface LayerCustomization {
  /** Fixed color to use instead of theme (hex string like "#FF0000") */
  fixedColor?: string
  /** Multiplier for lightness (1.0 = normal, >1.0 = lighter, <1.0 = darker) */
  lightnessMultiplier?: number
  /** Multiplier for saturation (1.0 = normal, >1.0 = more saturated, <1.0 = less saturated) */
  saturationMultiplier?: number
  /** Contrast boost factor for relative preservation (1.0 = preserve original range, >1.0 = expand range) */
  contrastBoost?: number
  /** Shape-specific customizations (keyed by shape name) */
  shapes?: Record<string, LayerCustomization>
}

/**
 * Layer customizations map (keyed by layer name)
 */
export interface LayerCustomizations {
  [layerName: string]: LayerCustomization
}

/**
 * Lottie fill color structure
 */
export interface LottieFill {
  ty: "fl"
  c: {
    k: number[] // [r, g, b, a] normalized to 0-1
  }
  nm?: string
}

/**
 * Lottie stroke color structure
 */
export interface LottieStroke {
  ty: "st"
  c: {
    k: number[] // [r, g, b, a] normalized to 0-1
  }
  nm?: string
}

/**
 * Lottie group structure (can contain nested items)
 */
export interface LottieGroup {
  ty: "gr"
  it?: LottieItem[]
  nm?: string
}

/**
 * Any item in a Lottie shape
 */
export type LottieItem = LottieFill | LottieStroke | LottieGroup | any

/**
 * Lottie shape structure
 */
export interface LottieShape {
  nm?: string
  it?: LottieItem[]
  ty?: string
}

/**
 * Lottie layer structure
 */
export interface LottieLayer {
  nm?: string
  shapes?: LottieShape[]
  ty?: number
}

/**
 * Color conversion utilities
 */

/**
 * Convert hex color to RGB (normalized 0-1)
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  const bigint = parseInt(hex.slice(1), 16)
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255
  return [r, g, b]
}

/**
 * Convert RGB (0-1) to HSL
 */
export const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): [number, number, number] => {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return [h, s, l]
}

/**
 * Convert HSL to RGB (0-1) with alpha channel
 */
export const hslToRgb = (
  h: number,
  s: number,
  l: number,
): [number, number, number, number] => {
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [r, g, b, 1]
}

/**
 * Strategy 2d: Apply theme color with bidirectional adaptive contrast enhancement
 *
 * This function maintains visual depth and shading by:
 * - Light themes (L > 50%): Amplifying darkness for contrast (2.0x)
 * - Dark themes (L <= 50%): Amplifying lightness for contrast (1.8x, inverted logic)
 * - Adding saturation gradient for visual depth
 * - Preserving relative darkness relationships between shades
 *
 * @param originalRgb - Original RGB color from animation (0-1)
 * @param themeHex - Theme color to apply (hex string)
 * @param baseOriginalRgb - Base (darkest) RGB color for relative scaling (0-1)
 * @param customization - Optional layer customization for fine-tuned control
 * @returns New RGB color with alpha channel (0-1)
 */
export const applyThemeWithAdaptiveContrast = (
  originalRgb: number[],
  themeHex: string,
  baseOriginalRgb: number[],
  customization: LayerCustomization = {},
): [number, number, number, number] => {
  const [origR, origG, origB] = originalRgb
  const [origH, origS, origL] = rgbToHsl(origR, origG, origB)

  // Check for custom fixed color override
  if (customization.fixedColor) {
    const [r, g, b] = hexToRgb(customization.fixedColor)
    return [r, g, b, 1]
  }

  const [themeR, themeG, themeB] = hexToRgb(themeHex)
  const [themeH, themeS, themeL] = rgbToHsl(themeR, themeG, themeB)

  // Check for custom lightness multiplier
  const lightnessMultiplier = customization.lightnessMultiplier || 1.0

  // Determine if theme is light or dark
  const isLightTheme = themeL > 0.5

  let newL: number, newS: number

  if (isLightTheme) {
    // LIGHT THEME: Progressive amplification based on original lightness
    // Very dark colors (L<30%): gentle amplification to prevent pure black
    // Medium colors (30-70%): moderate amplification for contrast
    // Light colors (>70%): stronger amplification to maintain depth
    let amplification: number
    if (origL < 0.3) {
      amplification = 1.3 // Gentle: preserves visibility of dark details
    } else if (origL < 0.7) {
      amplification = 1.7 // Moderate: maintains good contrast
    } else {
      amplification = 2.0 // Strong: preserves depth for light colors
    }

    const darkness = 1 - origL
    const amplifiedDarkness = Math.min(darkness * amplification, 1)
    newL = (1 - amplifiedDarkness) * lightnessMultiplier

    // Apply minimum lightness floor to ensure visibility (20% = clearly visible)
    newL = Math.max(0.2, newL)

    // Saturation gradient: darker → higher saturation
    const darknessRatio = amplifiedDarkness
    const minSat = 0.7
    const maxSat = 1.0
    newS = minSat + darknessRatio * (maxSat - minSat)
  } else {
    // DARK THEME: Amplify lightness for contrast (inverted logic)
    const amplification = 1.8 // Slightly gentler than light theme
    const lightness = origL
    const amplifiedLightness = Math.min(lightness * amplification, 1)
    newL = amplifiedLightness * lightnessMultiplier

    // For dark themes, maintain higher saturation for vibrancy
    const lightnessRatio = amplifiedLightness
    const minSat = 0.8 // Higher minimum for dark themes
    const maxSat = 1.0
    newS = minSat + lightnessRatio * (maxSat - minSat)
  }

  // Clamp values
  newL = Math.max(0, Math.min(1, newL))
  newS = Math.max(0, Math.min(1, newS))

  // Apply custom saturation multiplier if provided
  if (customization.saturationMultiplier) {
    newS = Math.min(1, newS * customization.saturationMultiplier)
  }

  return hslToRgb(themeH, newS, newL)
}

/**
 * Strategy: Relative Lightness Preservation
 *
 * Maintains original lightness relationships by mapping colors to their relative
 * position in the animation's lightness range. This is ideal for animations with
 * intentional gradient or lighting effects where the relationship between colors
 * is more important than absolute contrast.
 *
 * Algorithm:
 * 1. Calculate relative position of color in original range (0 = darkest, 1 = lightest)
 * 2. Define appropriate output range based on theme lightness
 * 3. Apply modest scaling (1.3x) for enhanced contrast
 * 4. Map relative position to output range
 *
 * @param originalRgb - Original RGB color from animation (0-1)
 * @param themeHex - Theme color to apply (hex string)
 * @param baseOriginalRgb - Darkest RGB color in animation (0-1)
 * @param maxOriginalRgb - Lightest RGB color in animation (0-1)
 * @param customization - Optional layer customization
 * @returns New RGB color with alpha channel (0-1)
 */
export const applyThemeWithRelativePreservation = (
  originalRgb: number[],
  themeHex: string,
  baseOriginalRgb: number[],
  maxOriginalRgb: number[],
  customization: LayerCustomization = {},
): [number, number, number, number] => {
  const [origR, origG, origB] = originalRgb
  const [origH, origS, origL] = rgbToHsl(origR, origG, origB)

  // Check for custom fixed color override
  if (customization.fixedColor) {
    const [r, g, b] = hexToRgb(customization.fixedColor)
    return [r, g, b, 1]
  }

  const [themeR, themeG, themeB] = hexToRgb(themeHex)
  const [themeH, themeS, themeL] = rgbToHsl(themeR, themeG, themeB)

  // Get lightness range of original animation
  const [baseR, baseG, baseB] = baseOriginalRgb
  const [, , baseL] = rgbToHsl(baseR, baseG, baseB)

  const [maxR, maxG, maxB] = maxOriginalRgb
  const [, , maxL] = rgbToHsl(maxR, maxG, maxB)

  // Calculate relative position in original range (0-1 scale)
  const originalRange = maxL - baseL
  const relativePosition =
    originalRange > 0 ? (origL - baseL) / originalRange : 0.5

  // Apply modest scaling for subtle contrast enhancement
  const contrastBoost = customization.contrastBoost || 1.3
  const scaledRange = originalRange * contrastBoost

  // Determine output range based on theme type
  const isLightTheme = themeL > 0.5

  let outputMin: number, outputMax: number

  if (isLightTheme) {
    // Light theme: center range 10% below theme lightness
    const outputCenter = themeL - 0.1
    outputMin = Math.max(0.18, outputCenter - scaledRange / 2)
    outputMax = Math.min(0.88, outputCenter + scaledRange / 2)
  } else {
    // Dark theme: center range 25% above theme lightness
    const outputCenter = themeL + 0.25
    outputMin = Math.max(0.3, outputCenter - scaledRange / 2)
    outputMax = Math.min(0.95, outputCenter + scaledRange / 2)
  }

  // Map relative position to output range
  let newL = outputMin + relativePosition * (outputMax - outputMin)

  // Apply custom lightness multiplier if provided
  if (customization.lightnessMultiplier) {
    newL = Math.max(0, Math.min(1, newL * customization.lightnessMultiplier))
  }

  // Saturation gradient: darker colors → lower saturation, lighter → higher
  let newS = 0.7 + relativePosition * 0.25 // 70-95% range

  // Apply custom saturation multiplier if provided
  if (customization.saturationMultiplier) {
    newS = Math.min(1, newS * customization.saturationMultiplier)
  }

  return hslToRgb(themeH, newS, newL)
}

/**
 * Collect all colors from a Lottie animation data object
 *
 * @param data - Lottie animation data
 * @returns Array of RGB colors (0-1)
 */
export const collectAllColors = (data: any): number[][] => {
  const colors: number[][] = []

  const findColors = (obj: any) => {
    if (obj && typeof obj === "object") {
      if (obj.ty === "fl" && obj.c && obj.c.k) {
        colors.push(obj.c.k)
      }
      Object.values(obj).forEach((val) => findColors(val))
    }
  }

  findColors(data)
  return colors
}

/**
 * Find the darkest color in an animation (used as base for relative scaling)
 *
 * @param animationData - Lottie animation data
 * @returns RGB color array (0-1)
 */
export const findBaseColor = (animationData: any): number[] => {
  const allColors = collectAllColors(animationData)

  if (allColors.length === 0) {
    return [0, 0, 0] // Default to black if no colors found
  }

  const baseColor = allColors.reduce((darkest, color) => {
    const [r, g, b] = color
    const [h, s, l] = rgbToHsl(r, g, b)
    const [dR, dG, dB] = darkest
    const [dH, dS, dL] = rgbToHsl(dR, dG, dB)
    return l < dL ? color : darkest
  }, allColors[0])

  return baseColor || [0, 0, 0]
}

/**
 * Find the lightness range of an animation (darkest and lightest colors)
 * Used for relative lightness preservation strategy
 *
 * @param animationData - Lottie animation data object
 * @returns Object with base (darkest) and max (lightest) RGB colors
 */
export const findColorRange = (
  animationData: any,
): { base: number[]; max: number[] } => {
  const allColors = collectAllColors(animationData)

  if (allColors.length === 0) {
    return { base: [0, 0, 0], max: [0, 0, 0] }
  }

  if (allColors.length === 1) {
    return { base: allColors[0], max: allColors[0] }
  }

  let darkest = allColors[0]
  let lightest = allColors[0]
  let minL = rgbToHsl(darkest[0], darkest[1], darkest[2])[2]
  let maxL = minL

  for (const color of allColors) {
    const [r, g, b] = color
    const [h, s, l] = rgbToHsl(r, g, b)

    if (l < minL) {
      minL = l
      darkest = color
    }
    if (l > maxL) {
      maxL = l
      lightest = color
    }
  }

  return { base: darkest, max: lightest }
}

/**
 * Theme all items in a layer's shapes, including nested groups
 *
 * @param items - Array of shape items
 * @param themeHex - Theme color to apply
 * @param baseColor - Base (darkest) color for relative scaling
 * @param options - Optional configuration
 * @param options.skipLayers - Array of layer names to skip (e.g., white highlights)
 * @param options.themeStrokes - Whether to theme strokes (default: true)
 * @param options.strokeColor - Custom stroke color (defaults to theme color)
 * @param options.themingStrategy - 'progressive' or 'relative' (default: 'progressive')
 * @param layerCustomization - Layer-specific customization options
 * @param maxColor - Max (lightest) color for relative preservation strategy
 */
export const themeShapeItems = (
  items: LottieItem[],
  themeHex: string,
  baseColor: number[],
  options: {
    skipLayers?: string[]
    themeStrokes?: boolean
    strokeColor?: string
    themingStrategy?: "progressive" | "relative"
  } = {},
  layerCustomization: LayerCustomization = {},
  maxColor?: number[],
): void => {
  const {
    themeStrokes = true,
    strokeColor,
    themingStrategy = "progressive",
  } = options

  if (!items) return

  items.forEach((item: any) => {
    // Check for item-specific customization by name
    const itemName = item.nm || ""
    const itemCustomization = layerCustomization.shapes?.[itemName] || {}

    // Handle fills
    if (item.ty === "fl" && item.c && item.c.k) {
      const originalColor = item.c.k

      if (themingStrategy === "relative" && maxColor) {
        item.c.k = applyThemeWithRelativePreservation(
          originalColor,
          themeHex,
          baseColor,
          maxColor,
          itemCustomization,
        )
      } else {
        item.c.k = applyThemeWithAdaptiveContrast(
          originalColor,
          themeHex,
          baseColor,
          itemCustomization,
        )
      }
    }
    // Handle strokes
    else if (item.ty === "st" && item.c && item.c.k && themeStrokes) {
      const originalColor = item.c.k
      const colorToUse = strokeColor || themeHex

      if (themingStrategy === "relative" && maxColor) {
        item.c.k = applyThemeWithRelativePreservation(
          originalColor,
          colorToUse,
          baseColor,
          maxColor,
          itemCustomization,
        )
      } else {
        item.c.k = applyThemeWithAdaptiveContrast(
          originalColor,
          colorToUse,
          baseColor,
          itemCustomization,
        )
      }
    }
    // Recurse into nested groups
    else if (item.ty === "gr" && item.it) {
      themeShapeItems(
        item.it,
        themeHex,
        baseColor,
        options,
        layerCustomization,
        maxColor,
      )
    }
  })
}

/**
 * Theme a single layer's shapes
 *
 * @param layer - Lottie layer object
 * @param themeHex - Theme color to apply
 * @param baseColor - Base (darkest) color for relative scaling
 * @param options - Optional configuration
 * @param maxColor - Max (lightest) color for relative preservation
 */
export const themeLayer = (
  layer: LottieLayer,
  themeHex: string,
  baseColor: number[],
  options: {
    skipLayers?: string[]
    themeStrokes?: boolean
    strokeColor?: string
    layerCustomizations?: LayerCustomizations
    themingStrategy?: "progressive" | "relative"
  } = {},
  maxColor?: number[],
): void => {
  const { skipLayers = [], layerCustomizations = {} } = options

  // Skip layers that match skip patterns
  if (layer.nm && skipLayers.some((pattern) => layer.nm!.includes(pattern))) {
    return
  }

  if (!layer.shapes) return

  // Get customization for this specific layer
  const layerCustomization = layerCustomizations[layer.nm || ""] || {}

  layer.shapes.forEach((shape: any) => {
    if (shape.it) {
      themeShapeItems(
        shape.it,
        themeHex,
        baseColor,
        options,
        layerCustomization,
        maxColor,
      )
    }
  })
}

/**
 * Theme an entire Lottie animation
 *
 * @param animationData - Lottie animation data (will be modified in place)
 * @param themeHex - Theme color to apply
 * @param options - Optional configuration
 * @param options.skipLayers - Array of layer name patterns to skip (e.g., ["Sparkle", "Highlight"])
 * @param options.themeStrokes - Whether to theme strokes (default: true)
 * @param options.strokeColor - Custom stroke color (defaults to theme color)
 * @param options.baseColor - Custom base color (auto-detected if not provided)
 * @param options.verbose - Log theming operations to console (default: false)
 * @param options.layerCustomizations - Per-layer customization settings
 * @param options.themingStrategy - 'progressive' or 'relative' (default: 'progressive')
 * @returns The modified animation data
 */
export const themeAnimation = (
  animationData: any,
  themeHex: string,
  options: {
    skipLayers?: string[]
    themeStrokes?: boolean
    strokeColor?: string
    baseColor?: number[]
    verbose?: boolean
    layerCustomizations?: LayerCustomizations
    themingStrategy?: "progressive" | "relative"
  } = {},
): any => {
  const {
    skipLayers = [],
    themeStrokes = true,
    strokeColor,
    baseColor: customBaseColor,
    verbose = false,
    layerCustomizations = {},
    themingStrategy = "progressive",
  } = options

  // Find color range for theming
  let baseColor: number[]
  let maxColor: number[] | undefined

  if (themingStrategy === "relative") {
    // For relative preservation, find both darkest and lightest colors
    const colorRange = findColorRange(animationData)
    baseColor = colorRange.base
    maxColor = colorRange.max
  } else {
    // For progressive amplification, only need darkest color
    baseColor = customBaseColor || findBaseColor(animationData)
  }

  if (verbose) {
    console.log(`🎨 Theming animation with ${themingStrategy} strategy:`, {
      themeColor: themeHex,
      baseColor: baseColor.map((v) => (v * 255).toFixed(0)),
      ...(maxColor && {
        maxColor: maxColor.map((v) => (v * 255).toFixed(0)),
      }),
      skipLayers,
      themeStrokes,
      customizations:
        Object.keys(layerCustomizations).length > 0
          ? Object.keys(layerCustomizations).join(", ")
          : "none",
    })
  }

  // Theme all layers
  animationData.layers?.forEach((layer: LottieLayer) => {
    if (verbose && layer.nm) {
      if (skipLayers.some((pattern) => layer.nm!.includes(pattern))) {
        console.log(`  ⊘ Skipping ${layer.nm}`)
      } else if (layer.shapes) {
        const hasCustomization = layerCustomizations[layer.nm]
          ? " (customized)"
          : ""
        console.log(`  ✓ Theming ${layer.nm}${hasCustomization}`)
      }
    }

    themeLayer(
      layer,
      themeHex,
      baseColor,
      {
        skipLayers,
        themeStrokes,
        strokeColor,
        layerCustomizations,
        themingStrategy,
      },
      maxColor,
    )
  })

  // Theme assets (compositions) if present
  animationData.assets?.forEach((asset: any) => {
    if (asset.layers) {
      asset.layers.forEach((layer: LottieLayer) => {
        themeLayer(
          layer,
          themeHex,
          baseColor,
          {
            skipLayers,
            themeStrokes,
            strokeColor,
            layerCustomizations,
            themingStrategy,
          },
          maxColor,
        )
      })
    }
  })

  return animationData
}

/**
 * Create a themed version of animation data (clones and themes)
 *
 * @param animationData - Original Lottie animation data (will not be modified)
 * @param themeHex - Theme color to apply
 * @param options - Optional configuration (same as themeAnimation)
 * @returns Cloned and themed animation data
 */
export const createThemedAnimation = (
  animationData: any,
  themeHex: string,
  options: {
    skipLayers?: string[]
    themeStrokes?: boolean
    strokeColor?: string
    baseColor?: number[]
    verbose?: boolean
    layerCustomizations?: LayerCustomizations
    themingStrategy?: "progressive" | "relative"
  } = {},
): any => {
  // Deep clone to avoid mutating original
  const clonedData = JSON.parse(JSON.stringify(animationData))
  return themeAnimation(clonedData, themeHex, options)
}

// ===== CUSTOM THEME CONFIG SUPPORT =====

/**
 * Layer color mapping from theme config
 */
export interface LayerColorMapping {
  layer: string
  originalColor: string
  getColor: (palette: any) => string
  notes?: string
  classification?: string
}

/**
 * Convert hex color to normalized RGB array for Lottie
 * @param hex - Hex color string (e.g., "#FF9800")
 * @returns Normalized RGB array [r, g, b] where values are 0-1
 */
function hexToNormalizedRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16)
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255
  return [r, g, b]
}

/**
 * Convert Lottie color array to hex string
 * @param colorArray - Lottie color [r, g, b, a] where values are 0-1
 * @returns Hex color string
 */
function lottieColorToHex(colorArray: number[]): string {
  if (!Array.isArray(colorArray) || colorArray.length < 3) {
    return "#000000"
  }

  const r = Math.round(colorArray[0] * 255)
  const g = Math.round(colorArray[1] * 255)
  const b = Math.round(colorArray[2] * 255)

  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? "0" + hex : hex
      })
      .join("")
  )
}

/**
 * Apply custom theme config mappings to animation
 *
 * This replaces colors based on the custom theme configuration
 * rather than using the algorithmic approach.
 *
 * @param animationData - Original Lottie animation data
 * @param mappings - Array of layer color mappings from theme config
 * @param palette - MUI theme palette
 * @param verbose - Whether to log operations
 * @returns Themed animation data
 */
export function applyThemeConfigMappings(
  animationData: any,
  mappings: LayerColorMapping[],
  palette: any,
  verbose: boolean = false,
): any {
  const cloned = JSON.parse(JSON.stringify(animationData))

  if (verbose) {
    console.log(
      `[LottieTheming] Applying ${mappings.length} custom color mappings`,
    )
  }

  // Build color replacement map
  const colorReplacements = new Map<string, string>()

  mappings.forEach((mapping) => {
    const targetColor = mapping.getColor(palette)
    const originalHex = mapping.originalColor.toLowerCase()

    colorReplacements.set(originalHex, targetColor)

    if (verbose) {
      console.log(
        `  [${mapping.layer}] ${mapping.originalColor} → ${targetColor}${mapping.notes ? ` (${mapping.notes})` : ""}`,
      )
    }
  })

  // Recursively replace colors throughout the animation
  function replaceColors(obj: any, path: string = ""): void {
    if (!obj || typeof obj !== "object") return

    // Check if this is a color array [r, g, b, a] or [r, g, b]
    if (Array.isArray(obj) && obj.length >= 3 && obj.length <= 4) {
      // Check if all values are numbers between 0 and 1 (Lottie color format)
      if (obj.every((v) => typeof v === "number" && v >= 0 && v <= 1)) {
        const currentHex = lottieColorToHex(obj).toLowerCase()
        const replacement = colorReplacements.get(currentHex)

        if (replacement) {
          const [r, g, b] = hexToNormalizedRgb(replacement)
          obj[0] = r
          obj[1] = g
          obj[2] = b
          // Keep original alpha if present
          if (verbose) {
            console.log(
              `    Replaced ${currentHex} → ${replacement} at ${path}`,
            )
          }
        }
      }
    }

    // Recurse into object properties
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newPath = path ? `${path}.${key}` : key
        replaceColors(obj[key], newPath)
      }
    }
  }

  replaceColors(cloned, "root")

  if (verbose) {
    console.log(`[LottieTheming] Custom theme config applied successfully`)
  }

  return cloned
}

/**
 * Smart themed animation creator
 *
 * Automatically detects if custom theme config exists and uses it,
 * otherwise falls back to algorithmic theming.
 *
 * @param animationData - Original animation data
 * @param animationName - Base animation name
 * @param palette - MUI theme palette
 * @param themeName - Theme name (e.g., "purple-light")
 * @param mappings - Optional pre-fetched mappings (if null, uses algorithmic)
 * @param fallbackOptions - Options for algorithmic theming fallback
 * @returns Themed animation data
 */
export function createThemedAnimationSmart(
  animationData: any,
  animationName: string,
  palette: any,
  themeName: string,
  mappings: LayerColorMapping[] | null,
  fallbackOptions: {
    skipLayers?: string[]
    themeStrokes?: boolean
    strokeColor?: string
    verbose?: boolean
    layerCustomizations?: LayerCustomizations
    themingStrategy?: "progressive" | "relative"
  } = {},
): any {
  // If custom mappings provided, use them
  if (mappings && mappings.length > 0) {
    if (fallbackOptions.verbose) {
      console.log(
        `[LottieTheming] Using custom theme config for ${animationName}`,
      )
    }
    return applyThemeConfigMappings(
      animationData,
      mappings,
      palette,
      fallbackOptions.verbose,
    )
  }

  // Fallback to algorithmic theming
  if (fallbackOptions.verbose) {
    console.log(
      `[LottieTheming] Using algorithmic theming for ${animationName} (no custom config)`,
    )
  }

  const themeColor = palette?.primary?.main || "#621890"
  return createThemedAnimation(animationData, themeColor, fallbackOptions)
}
