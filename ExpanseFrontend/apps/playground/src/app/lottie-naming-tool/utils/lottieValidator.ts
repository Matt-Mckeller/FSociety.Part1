/**
 * Lottie Validation Utility
 * Validates JSON files to ensure they are proper Lottie animations
 */

export interface LottieValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validate if a JSON object is a valid Lottie animation
 */
export function validateLottieStructure(json: any): LottieValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Check if it's an object
  if (!json || typeof json !== "object") {
    errors.push("Invalid JSON: not an object")
    return { isValid: false, errors, warnings }
  }

  // Required fields for Lottie
  const requiredFields = {
    v: "version",
    fr: "frame rate",
    ip: "in point",
    op: "out point",
    layers: "layers array",
  }

  for (const [field, description] of Object.entries(requiredFields)) {
    if (!(field in json)) {
      errors.push(`Missing required field: ${field} (${description})`)
    }
  }

  // Validate field types
  if ("v" in json && typeof json.v !== "string") {
    errors.push("Field 'v' (version) must be a string")
  }

  if ("fr" in json && typeof json.fr !== "number") {
    errors.push("Field 'fr' (frame rate) must be a number")
  }

  if ("ip" in json && typeof json.ip !== "number") {
    errors.push("Field 'ip' (in point) must be a number")
  }

  if ("op" in json && typeof json.op !== "number") {
    errors.push("Field 'op' (out point) must be a number")
  }

  if ("layers" in json && !Array.isArray(json.layers)) {
    errors.push("Field 'layers' must be an array")
  }

  // Optional but common fields
  if ("w" in json && typeof json.w !== "number") {
    warnings.push("Field 'w' (width) should be a number")
  }

  if ("h" in json && typeof json.h !== "number") {
    warnings.push("Field 'h' (height) should be a number")
  }

  // Check layers array has content
  if (Array.isArray(json.layers) && json.layers.length === 0) {
    warnings.push("Layers array is empty")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Check if filename should be excluded from scanning
 * Excludes metadata/config files that aren't base animations
 */
export function shouldExcludeFile(filename: string): boolean {
  const excludePatterns = [
    /_ThemeConfig\.json$/,
    /_Animation_Metadata\.json$/,
    /_LayerConfig\.json$/,
    /_validation\.json$/,
    /Optimized\.json$/,
    /DarkMode\.json$/,
    /LightMode\.json$/,
    /_minified\.json$/,
  ]

  return excludePatterns.some((pattern) => pattern.test(filename))
}

/**
 * Check if a file is likely a valid Lottie animation file
 */
export function isLikelyLottieFile(filename: string): boolean {
  // Must be a JSON file
  if (!filename.endsWith(".json")) {
    return false
  }

  // Must not be an excluded file type
  if (shouldExcludeFile(filename)) {
    return false
  }

  return true
}
