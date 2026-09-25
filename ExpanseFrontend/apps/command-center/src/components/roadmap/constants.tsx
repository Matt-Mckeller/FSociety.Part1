/**
 * Roadmap View Constants
 *
 * Color schemes, icons, and configuration constants for the roadmap views
 */
import TimelineIcon from "@mui/icons-material/Timeline"
import BusinessIcon from "@mui/icons-material/Business"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import InventoryIcon from "@mui/icons-material/Inventory"
import CategoryIcon from "@mui/icons-material/Category"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import type { DecisionCategory } from "../../types"

// ==================================================
// ZOOM CONFIGURATION
// ==================================================

export type ZoomLevel = 1 | 3 | 6 | 12
export const ZOOM_LEVELS: ZoomLevel[] = [1, 3, 6, 12]

// Timeline cell dimensions
export const ROW_HEIGHT = 80
export const MILESTONE_ROW_HEIGHT = 50

// ==================================================
// FILTER TYPES
// ==================================================

export type CategoryFilter = "all" | "business" | "personal"
export type RoadmapSubView = "timeline" | "sprint" | "decisions" | "value"

// ==================================================
// COLOR SCHEMES
// ==================================================

/** Decision category colors */
export const categoryColors: Record<DecisionCategory, string> = {
  "launch-order": "#FF6B35",
  "company-structure": "#3498DB",
  architecture: "#9B59B6",
  priority: "#E74C3C",
  resource: "#2ECC71",
  scope: "#F39C12",
  strategy: "#8B5CF6",
}

/** Confidence level colors */
export const confidenceColors: Record<string, string> = {
  high: "#2ECC71",
  medium: "#F39C12",
  low: "#E74C3C",
}

/** Synergy strength colors */
export const synergyStrengthColors: Record<string, string> = {
  strong: "#2ECC71",
  moderate: "#F39C12",
  weak: "#95A5A6",
}

/** Priority level colors */
export const priorityColors: Record<string, string> = {
  critical: "#EF4444",
  high: "#F59E0B",
  medium: "#3B82F6",
  low: "#10B981",
}

/** Stage colors */
export const stageColors: Record<string, string> = {
  planning: "#8B5CF6",
  "in-progress": "#3B82F6",
  review: "#F59E0B",
  completed: "#10B981",
  blocked: "#EF4444",
}

/** Effort level colors */
export const effortColors: Record<string, string> = {
  small: "#10B981",
  medium: "#F59E0B",
  large: "#EF4444",
}

// ==================================================
// ICONS
// ==================================================

/** Decision category icons */
export const categoryIcons: Record<DecisionCategory, React.ReactNode> = {
  "launch-order": <TimelineIcon fontSize="small" />,
  "company-structure": <BusinessIcon fontSize="small" />,
  architecture: <AccountTreeIcon fontSize="small" />,
  priority: <PriorityHighIcon fontSize="small" />,
  resource: <InventoryIcon fontSize="small" />,
  scope: <CategoryIcon fontSize="small" />,
  strategy: <LightbulbIcon fontSize="small" />,
}
