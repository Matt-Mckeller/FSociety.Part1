/**
 * Strategic Compass View - Constants
 *
 * Configuration objects, color schemes, and static data for the strategic compass.
 */
import type { NavigationalVariableType, OperatingPrincipleType } from "./types"

// ==================================================
// NAVIGATIONAL VARIABLE CONFIG
// ==================================================

/** Navigation variable type configuration */
export const navTypeConfig: Record<
  NavigationalVariableType,
  { label: string; color: string; icon: string }
> = {
  advantage: { label: "Advantage", color: "#10B981", icon: "💪" },
  opportunity: { label: "Opportunity", color: "#3B82F6", icon: "🎯" },
  strategy: { label: "Strategy", color: "#8B5CF6", icon: "♟️" },
  insight: { label: "Insight", color: "#F59E0B", icon: "💡" },
}

// ==================================================
// OPERATING PRINCIPLE CONFIG
// ==================================================

/** Operating principle type configuration */
export const principleTypeConfig: Record<
  OperatingPrincipleType,
  { label: string; color: string; dot: string }
> = {
  rule: { label: "Rule", color: "#EF4444", dot: "🔒" },
  habit: { label: "Habit", color: "#10B981", dot: "🔄" },
  principle: { label: "Principle", color: "#8B5CF6", dot: "⚖️" },
  sequence: { label: "Sequence", color: "#F59E0B", dot: "📍" },
  optimization: { label: "Optimization", color: "#3B82F6", dot: "⚡" },
}

// ==================================================
// SECTION COLORS
// ==================================================

/** Colors for different strategic sections */
export const sectionColors = {
  focus: "#EF4444", // Red - urgent/active
  product: "#3B82F6", // Blue - features
  human: "#8B5CF6", // Purple - mission
  business: "#10B981", // Green - money
  differentiator: "#F59E0B", // Amber - unique
  future: "#6B7280", // Gray - later
  vision: "#7C3AED", // Violet - corporate vision
} as const

// ==================================================
// PROJECT COLORS
// ==================================================

/** Project color mapping (matching roadmap) */
export const projectColors: Record<string, string> = {
  "4eye": "#4ECDC4",
  "expanse-services": "#3498DB",
  "4up": "#FF6B35",
  "1game": "#9B59B6",
  lotties: "#E91E63",
}

// ==================================================
// TOOLTIPS & LABELS
// ==================================================

/** Reference tooltip text */
export const referenceTooltipText =
  "For reference — still deciding how this section is utilized"
