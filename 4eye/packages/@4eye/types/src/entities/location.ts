import type { SymbolColor, SymbolName } from "../symbols";

export type LocationType =
  | "home"
  | "work"
  | "social"
  | "dining"
  | "retail"
  | "outdoor"
  | "transit"
  | "custom";

/** Distinguishes generic environment vs specific named place. */
export type LocationCategory = "profile" | "actual";

export const LOCATION_TYPES: LocationType[] = [
  "home",
  "work",
  "social",
  "dining",
  "retail",
  "outdoor",
  "transit",
  "custom",
];

export const LOCATION_TYPE_META: Record<
  LocationType,
  { label: string; color: string }
> = {
  home: { label: "Home", color: "#ef4444" },
  work: { label: "Work", color: "#3b82f6" },
  social: { label: "Social", color: "#8b5cf6" },
  dining: { label: "Dining", color: "#f59e0b" },
  retail: { label: "Retail", color: "#22c55e" },
  outdoor: { label: "Outdoor", color: "#14b8a6" },
  transit: { label: "Transit", color: "#6366f1" },
  custom: { label: "Custom", color: "#64748b" },
};

export interface Location {
  id: string;
  name: string;
  /** Single-word for concise AI/filter display */
  shortTag: string;
  locationType: LocationType;
  category: LocationCategory;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  region?: string;
  identifiers: string[];
  description?: string;
  createdAt: number;
}
