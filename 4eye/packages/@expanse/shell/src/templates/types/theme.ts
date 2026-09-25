/**
 * Theme System Types
 */

// =============================================================================
// Theme Mode
// =============================================================================

/**
 * Theme mode for layouts
 */
export type ThemeMode = "light" | "dark" | "system"

/**
 * Built-in theme preset names
 */
export type ThemePreset = 
  | "minimal"      // Clean, simple colors
  | "oceanic"      // Blue/teal palette
  | "vibrant"      // Bright, saturated colors
  | "earthy"       // Natural, warm tones
  | "monochrome"   // Grayscale only
  | "custom"       // User-provided theme
