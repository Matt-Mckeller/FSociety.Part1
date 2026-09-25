/**
 * Domain
 *
 * High-level scope/lens applied to all chat context, goals, and presets.
 */

export type DomainType =
  | "default"
  | "learning"
  | "work"
  | "life"
  | "gaming"
  | "private"
  | "custom";

export interface DomainConfig {
  id: DomainType;
  label: string;
  description: string;
  color: string;
  /** MUI icon name (resolved by feature components) */
  icon: string;
}

export const DOMAINS: DomainConfig[] = [
  {
    id: "default",
    label: "All",
    description: "Standard mode",
    color: "#64748b",
    icon: "GridView",
  },
  {
    id: "learning",
    label: "Learning",
    description: "Education and study focus",
    color: "#3b82f6",
    icon: "School",
  },
  {
    id: "work",
    label: "Work",
    description: "Productivity and professional tasks",
    color: "#22c55e",
    icon: "Work",
  },
  {
    id: "life",
    label: "Life",
    description: "Personal and lifestyle",
    color: "#f59e0b",
    icon: "Favorite",
  },
  {
    id: "gaming",
    label: "Gaming",
    description: "Gaming and entertainment",
    color: "#8b5cf6",
    icon: "SportsEsports",
  },
  {
    id: "private",
    label: "Private",
    description: "Privacy-focused mode",
    color: "#ef4444",
    icon: "Lock",
  },
  {
    id: "custom",
    label: "Custom",
    description: "User-defined configuration",
    color: "#06b6d4",
    icon: "Tune",
  },
];

export const DEFAULT_DOMAIN: DomainType = "default";
