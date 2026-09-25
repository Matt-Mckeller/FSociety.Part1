/**
 * Common Template Types
 * 
 * Shared base types for all simplified layouts
 */

import type { ReactNode } from "react"
import type { ThemeMode, ThemePreset } from "@expanse/shell"
import type { AutoNavigationMode, AutoNavigationOptions, AutoPageMap, AutoPageMapWithMeta } from "./auto-generation"

// =============================================================================
// Simplified Layout Props
// =============================================================================

/**
 * Common props for all simplified layouts
 */
export interface SimplifiedLayoutProps {
  /** Theme mode */
  themeMode?: ThemeMode
  /** Theme preset name */
  themePreset?: ThemePreset
  /** Show theme toggle control */
  showThemeToggle?: boolean
  /** Show color picker control */
  showColorPicker?: boolean
  /** Auto-generate navigation from grid */
  autoNavigation?: AutoNavigationMode | AutoNavigationOptions
  /** Auto-register pages */
  autoPages?: AutoPageMap | AutoPageMapWithMeta
  /** Page content renderer */
  children?: ReactNode | ((position: any, tile: any) => ReactNode)
}
