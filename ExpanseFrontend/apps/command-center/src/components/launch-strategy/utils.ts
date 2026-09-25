/**
 * Launch Strategy View - Utilities
 *
 * Helper functions and constants for launch planning
 */
import type { FeatureImpact } from "./types"

// ==================================================
// COLOR SCHEMES
// ==================================================

/** Requirement/priority colors */
export const requirementColors: Record<string, string> = {
  "must-have": "#EF4444",
  "should-have": "#F59E0B",
  "nice-to-have": "#10B981",
  future: "#6B7280",
}

// ==================================================
// HELPER FUNCTIONS
// ==================================================

/** Get color based on goal score/coverage */
export const getGoalColor = (score: number): string => {
  if (score >= 0.7) return "#10B981"
  if (score >= 0.4) return "#F59E0B"
  return "#EF4444"
}

/** Format number as percentage */
export const formatPercent = (n: number): string => `${Math.round(n * 100)}%`

/** Calculate goal coverage scores for selected features */
export const calculateCoverage = (
  selectedIds: Set<string>,
  features: Record<string, FeatureImpact>,
) => {
  const selected = Array.from(selectedIds)
    .map((id) => features[id])
    .filter(Boolean)

  if (selected.length === 0) {
    return {
      engagement: 0,
      "mental-health": 0,
      learning: 0,
      "growth-mindset": 0,
      overall: 0,
    }
  }

  // Use weighted average with max contribution capped
  const scores = {
    engagement: Math.min(
      1,
      selected.reduce((sum, f) => sum + f.goalImpact.engagement * 0.4, 0),
    ),
    "mental-health": Math.min(
      1,
      selected.reduce((sum, f) => sum + f.goalImpact["mental-health"] * 0.4, 0),
    ),
    learning: Math.min(
      1,
      selected.reduce((sum, f) => sum + f.goalImpact.learning * 0.4, 0),
    ),
    "growth-mindset": Math.min(
      1,
      selected.reduce(
        (sum, f) => sum + f.goalImpact["growth-mindset"] * 0.4,
        0,
      ),
    ),
  }

  const overall =
    scores.engagement * 0.3 +
    scores["mental-health"] * 0.25 +
    scores.learning * 0.25 +
    scores["growth-mindset"] * 0.2

  return { ...scores, overall }
}
