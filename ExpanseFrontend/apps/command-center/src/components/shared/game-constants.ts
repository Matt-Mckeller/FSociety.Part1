/**
 * Shared Game Constants
 *
 * Centralized color schemes and labels for quest/objective/campaign status,
 * priorities, and progress indicators used across all game-related components.
 */
import type { QuestStatus, ObjectiveStatus } from "../../types"

// ==================================================
// QUEST STATUS
// ==================================================

/** MUI Chip color mapping for quest status */
export const questStatusChipColors: Record<
  QuestStatus,
  "default" | "warning" | "success" | "error"
> = {
  "not-started": "default",
  "in-progress": "warning",
  "quest-complete": "success",
  blocked: "error",
  paused: "default",
  cancelled: "error",
  concept: "default",
}

/** Hex color values for quest status (for backgrounds, borders, etc.) */
export const questStatusColors: Record<QuestStatus, string> = {
  "not-started": "#6B7280",
  "in-progress": "#F59E0B",
  "quest-complete": "#10B981",
  blocked: "#EF4444",
  paused: "#6B7280",
  cancelled: "#EF4444",
  concept: "#8B5CF6",
}

/** Human-readable labels for quest status */
export const questStatusLabels: Record<QuestStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "quest-complete": "Complete",
  blocked: "Blocked",
  paused: "Paused",
  cancelled: "Cancelled",
  concept: "Concept",
}

/** Alternative shorter labels for compact displays */
export const questStatusLabelsShort: Record<QuestStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "Active",
  "quest-complete": "Complete",
  blocked: "Blocked",
  paused: "Paused",
  cancelled: "Cancelled",
  concept: "Concept",
}

// ==================================================
// OBJECTIVE STATUS
// ==================================================

/** MUI Chip color mapping for objective status */
export const objectiveStatusChipColors: Record<
  ObjectiveStatus,
  "default" | "warning" | "success" | "error"
> = {
  todo: "default",
  "in-progress": "warning",
  done: "success",
  blocked: "error",
}

/** Hex color values for objective status */
export const objectiveStatusColors: Record<ObjectiveStatus, string> = {
  todo: "#6B7280",
  "in-progress": "#F59E0B",
  done: "#10B981",
  blocked: "#EF4444",
}

/** Human-readable labels for objective status */
export const objectiveStatusLabels: Record<ObjectiveStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
  blocked: "Blocked",
}

// ==================================================
// PRIORITY
// ==================================================

/** Hex color values for priority levels */
export const priorityColors: Record<string, string> = {
  P1: "#EF4444", // Red - Critical
  P2: "#F59E0B", // Amber - High
  P3: "#6B7280", // Gray - Normal
  P4: "#9CA3AF", // Light Gray - Low
  critical: "#EF4444",
  high: "#F59E0B",
  medium: "#3B82F6",
  low: "#10B981",
}

/** Priority labels */
export const priorityLabels: Record<string, string> = {
  P1: "Critical",
  P2: "High",
  P3: "Normal",
  P4: "Low",
  critical: "Critical",
  high: "High Priority",
  medium: "Medium",
  low: "Low Priority",
}

// ==================================================
// PROGRESS
// ==================================================

/** Get color based on progress percentage */
export const getProgressColor = (percent: number): string => {
  if (percent >= 75) return "#10B981" // Green
  if (percent >= 50) return "#F59E0B" // Amber
  if (percent >= 25) return "#F97316" // Orange
  return "#EF4444" // Red
}

/** Get color for goal/KPI scores (0-1 scale) */
export const getGoalScoreColor = (score: number): string => {
  if (score >= 0.7) return "#10B981" // Green
  if (score >= 0.4) return "#F59E0B" // Amber
  return "#EF4444" // Red
}

// ==================================================
// CATEGORY
// ==================================================

/** Category badge colors */
export const categoryColors: Record<string, string> = {
  business: "#3B82F6", // Blue
  personal: "#8B5CF6", // Purple
  all: "#6B7280", // Gray
}

/** Category icons */
export const categoryIcons: Record<string, string> = {
  business: "💼",
  personal: "👤",
}

// ==================================================
// EXTENDED STATUS (for wiki pages)
// ==================================================

/** Extended status colors including additional states */
export const extendedStatusColors: Record<string, string> = {
  "not-started": "#6B7280",
  "in-progress": "#F59E0B",
  complete: "#10B981",
  achieved: "#10B981",
  "quest-complete": "#10B981",
  blocked: "#EF4444",
  paused: "#6B7280",
  concept: "#8B5CF6",
  deprecated: "#9CA3AF",
}

/** Extended status labels */
export const extendedStatusLabels: Record<string, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  complete: "Complete",
  achieved: "Achieved",
  "quest-complete": "Complete",
  blocked: "Blocked",
  paused: "Paused",
  concept: "Concept",
  deprecated: "Deprecated",
}
