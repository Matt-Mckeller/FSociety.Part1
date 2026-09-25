/**
 * CampaignsView - Type Definitions
 */

export type StatusFilter = "all" | "active" | "paused"
export type CategoryFilter = "all" | "business" | "personal"
export type CampaignSortOption =
  | "priority"
  | "status"
  | "allocation"
  | "alpha"
  | "progress"

export type ResourceChartSortOption =
  | "allocation"
  | "priority"
  | "alpha"
  | "status"
