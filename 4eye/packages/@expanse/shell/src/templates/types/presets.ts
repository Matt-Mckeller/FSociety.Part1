/**
 * Layout Preset Types
 * 
 * Defines preset names and configurations for all layouts
 */

// =============================================================================
// Preset Names
// =============================================================================

/**
 * Preset names for MinimalLayout
 */
export type MinimalLayoutPreset = 
  | "clean"              // No controls, just content
  | "floating-controls"  // Subtle floating minimap + nav
  | "bottom-controls"    // Controls docked at bottom
  | "gaming"             // Full immersion, minimal UI with compact HUD
  | "presentation"       // Speaker-optimized with notes and progress
  | "kiosk"              // Touch-optimized, large controls for public displays

/**
 * Preset names for DocumentationLayout
 */
export type DocumentationLayoutPreset = 
  | "default"        // Top bar + both sidebars + minimap + controls
  | "minimal"        // Just top bar + minimap
  | "sidebar-focus"  // Emphasized sidebars for navigation
  | "clean"          // Top bar only, no sidebars
  | "reference"      // Dense, multi-column with comprehensive navigation
  | "tutorial"       // Step-by-step with progress tracking
  | "blog"           // Reading-optimized with minimal distractions

/**
 * Preset names for DashboardLayout
 */
export type DashboardLayoutPreset = 
  | "default"      // All bars visible, minimap top-right
  | "focus-mode"   // Hide sidebars, show top/bottom only
  | "compact"      // Smaller bars, more content space
  | "executive"    // KPI-focused with prominent charts and metrics
  | "operational"  // Dense information, real-time monitoring
  | "analytics"    // Data exploration with flexible layout

/**
 * Preset names for AppLayout
 */
export type AppLayoutPreset = 
  | "default"            // Full layout with all features
  | "sidebar-collapsed"  // Start with collapsed left nav
  | "mobile-optimized"   // Touch-first responsive design

/**
 * Preset names for MarketingLayout
 */
export type MarketingLayoutPreset = 
  | "hero"         // Large top area, minimal controls
  | "storytelling" // Sequential navigation emphasis
  | "comparison"   // Split view navigation

/**
 * Preset names for FullScreenLayout
 */
export type FullScreenLayoutPreset = 
  | "immersive"         // Clean full-screen, floating controls
  | "symbol-grid"       // Symbol-grid style with chat zone
  | "gaming"            // Compact HUD-style controls
  | "presentation"      // Minimal UI for focus

// =============================================================================
// Preset Configuration
// =============================================================================

/**
 * Complete preset configuration for a layout
 */
export interface LayoutPresetConfig {
  /** Show minimap */
  showMinimap: boolean
  /** Show navigation controls */
  showNavigationControls: boolean
  /** Show top bar */
  showTopBar?: boolean
  /** Show left sidebar */
  showLeftBar?: boolean
  /** Show right sidebar */
  showRightBar?: boolean
  /** Show bottom bar */
  showBottomBar?: boolean
  /** Minimap position */
  minimapPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Navigation controls position */
  navControlsPosition?: "bottom-center" | "bottom-left" | "bottom-right"
  /** Bar sizes */
  barSizes?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  /** Additional styles */
  styles?: {
    /** Root container styles */
    root?: Record<string, any>
    /** Content area styles */
    content?: Record<string, any>
  }
}

/**
 * Map of preset name to configuration
 */
export type LayoutPresetMap<T extends string = string> = Record<T, LayoutPresetConfig>
