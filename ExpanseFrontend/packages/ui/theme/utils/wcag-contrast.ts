/**
 * WCAG Contrast Ratio Utilities
 * 
 * Calculates contrast ratios between colors for accessibility compliance.
 * Based on WCAG 2.1 guidelines: https://www.w3.org/TR/WCAG21/#contrast-minimum
 */

export interface ContrastResult {
  /** The calculated contrast ratio (e.g., 4.5) */
  ratio: number
  /** Human-readable ratio string (e.g., "4.5:1") */
  ratioString: string
  /** WCAG AA compliance */
  aa: {
    /** Normal text (< 18pt or < 14pt bold) requires 4.5:1 */
    normal: boolean
    /** Large text (≥ 18pt or ≥ 14pt bold) requires 3:1 */
    large: boolean
  }
  /** WCAG AAA compliance */
  aaa: {
    /** Normal text requires 7:1 */
    normal: boolean
    /** Large text requires 4.5:1 */
    large: boolean
  }
}

/**
 * Parses a color string to RGB values
 * Supports: #RGB, #RRGGBB, rgb(), rgba()
 */
export function parseColor(color: string): { r: number; g: number; b: number } | null {
  if (!color) return null

  // Handle hex colors
  if (color.startsWith("#")) {
    let hex = color.slice(1)
    
    // Expand shorthand (#RGB -> #RRGGBB)
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      }
    }
    
    // Handle #RRGGBBAA
    if (hex.length === 8) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      }
    }
  }

  // Handle rgb() and rgba()
  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    }
  }

  // Handle named colors (common ones)
  const namedColors: Record<string, { r: number; g: number; b: number }> = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, b: 0 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
  }
  
  if (namedColors[color.toLowerCase()]) {
    return namedColors[color.toLowerCase()]
  }

  return null
}

/**
 * Calculates the relative luminance of a color
 * Based on WCAG 2.1 formula: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function calculateLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculates the contrast ratio between two colors
 * Returns a ContrastResult with the ratio and WCAG compliance levels
 */
export function calculateContrast(
  foreground: string,
  background: string
): ContrastResult {
  const fgColor = parseColor(foreground)
  const bgColor = parseColor(background)

  if (!fgColor || !bgColor) {
    return {
      ratio: 0,
      ratioString: "N/A",
      aa: { normal: false, large: false },
      aaa: { normal: false, large: false },
    }
  }

  const fgLuminance = calculateLuminance(fgColor.r, fgColor.g, fgColor.b)
  const bgLuminance = calculateLuminance(bgColor.r, bgColor.g, bgColor.b)

  // Lighter color luminance + 0.05 / darker color luminance + 0.05
  const lighter = Math.max(fgLuminance, bgLuminance)
  const darker = Math.min(fgLuminance, bgLuminance)
  const ratio = (lighter + 0.05) / (darker + 0.05)

  // Round to 2 decimal places
  const roundedRatio = Math.round(ratio * 100) / 100

  return {
    ratio: roundedRatio,
    ratioString: `${roundedRatio.toFixed(1)}:1`,
    aa: {
      normal: roundedRatio >= 4.5,
      large: roundedRatio >= 3,
    },
    aaa: {
      normal: roundedRatio >= 7,
      large: roundedRatio >= 4.5,
    },
  }
}

/**
 * Determines if a color is "light" or "dark" based on luminance
 * Useful for deciding text color on a background
 */
export function isLightColor(color: string): boolean {
  const parsed = parseColor(color)
  if (!parsed) return true
  
  const luminance = calculateLuminance(parsed.r, parsed.g, parsed.b)
  return luminance > 0.179 // Standard threshold
}

/**
 * Returns a readable text color (black or white) for a given background
 */
export function getContrastTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? "#000000" : "#FFFFFF"
}

/**
 * Converts RGB values to hex string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("").toUpperCase()
}

/**
 * Gets a WCAG compliance badge text
 */
export function getWcagBadge(result: ContrastResult): string {
  if (result.aaa.normal) return "AAA"
  if (result.aa.normal) return "AA"
  if (result.aa.large) return "AA Large"
  return "Fail"
}
