import type { LayoutType } from "@expanse/shell"

/**
 * Ordered list of available layout types
 */
export const LAYOUT_TYPES: LayoutType[] = [
  "minimal",
  "fullscreen",
  "documentation",
  "dashboard",
  "panel",
]

/**
 * Human-readable labels for each layout type
 */
export const LAYOUT_LABELS: Record<LayoutType, string> = {
  minimal: "Minimal",
  fullscreen: "Fullscreen",
  documentation: "Docs",
  dashboard: "Dashboard",
  panel: "Panel",
}

/**
 * Brand colors for each layout type
 */
export const LAYOUT_COLORS: Record<LayoutType, string> = {
  minimal: "#9c27b0",
  fullscreen: "#2196f3",
  documentation: "#4caf50",
  dashboard: "#ff9800",
  panel: "#607d8b",
}
