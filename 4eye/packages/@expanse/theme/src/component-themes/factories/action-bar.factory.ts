/**
 * ActionBar Factory
 *
 * Creates theme configuration for ActionBar component from a palette.
 * ActionBar provides toolbar-style containers with various skin appearances.
 * 
 * Variants:
 * - glass: Translucent dark/light glass with blur (contrasts with page)
 * - solid: Opaque surface, no transparency
 * - frosted: Heavy blur, elevated appearance
 * - minimal: No background, content-first
 * - outlined: Transparent with prominent border
 * - technical: Sharp corners, accent border
 * 
 * Note: ActionBars use inverted colors from page background for contrast.
 * Light mode = dark glass, Dark mode = light glass.
 */

import type { Palette } from "@mui/material/styles"
import type { ActionBarThemeProps } from "../types"

/**
 * Create ActionBar theme configuration
 *
 * @param palette - MUI Palette object for deriving colors
 * @returns ActionBar theme props with all variant configurations
 */
export function createActionBarConfig(palette: Palette): ActionBarThemeProps {
  const isDark = palette.mode === "dark"
  const primary = palette.primary.main
  
  // ActionBars need to CONTRAST with page background
  // Light mode: dark glass on light page
  // Dark mode: light glass on dark page
  const glassColor = isDark 
    ? "rgba(255, 255, 255, 0.12)"  // Light glass on dark
    : "rgba(0, 0, 0, 0.85)"         // Dark glass on light
    
  const frostedColor = isDark
    ? "rgba(255, 255, 255, 0.15)"
    : "rgba(0, 0, 0, 0.75)"
    
  const solidColor = isDark
    ? "rgba(40, 40, 50, 0.95)"      // Dark elevated surface
    : "rgba(30, 30, 35, 0.95)"      // Dark solid surface
    
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.15)"
    : "rgba(255, 255, 255, 0.1)"
    
  // Shadows
  const shadowColor = isDark 
    ? "rgba(0, 0, 0, 0.5)" 
    : "rgba(0, 0, 0, 0.25)"
  const shadowColorStrong = isDark 
    ? "rgba(0, 0, 0, 0.6)" 
    : "rgba(0, 0, 0, 0.35)"

  return {
    variants: {
      glass: {
        bgcolor: glassColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 28,
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 16px ${shadowColor}`,
      },
      solid: {
        bgcolor: solidColor,
        border: "none",
        borderRadius: 12,
        backdropFilter: "none",
        boxShadow: `0 2px 12px ${shadowColor}`,
      },
      frosted: {
        bgcolor: frostedColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 28,
        backdropFilter: "blur(20px)",
        boxShadow: `0 8px 32px ${shadowColorStrong}`,
      },
      minimal: {
        bgcolor: "transparent",
        border: "none",
        borderRadius: 12,
        backdropFilter: "none",
        boxShadow: "none",
      },
      outlined: {
        bgcolor: "transparent",
        border: isDark 
          ? "2px solid rgba(255, 255, 255, 0.3)" 
          : "2px solid rgba(0, 0, 0, 0.4)",
        borderRadius: 6,
        backdropFilter: "none",
        boxShadow: "none",
      },
      technical: {
        bgcolor: solidColor,
        border: `2px solid ${primary}`,
        borderRadius: 0,
        backdropFilter: "none",
        boxShadow: `0 2px 8px ${shadowColor}`,
      },
      orbs: {
        bgcolor: "transparent",
        border: "none",
        borderRadius: 0,
        backdropFilter: "none",
        boxShadow: "none",
      },
    },
  }
}
