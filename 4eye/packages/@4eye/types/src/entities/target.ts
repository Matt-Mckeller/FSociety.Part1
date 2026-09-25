import type { SymbolColor, SymbolName } from "../symbols";

export type TargetType =
  | "people"
  | "monsters"
  | "enemies"
  | "allies"
  | "partyMembers"
  | "guildMembers"
  | "classmates"
  | "teachers"
  | "friends"
  | "family"
  | "groups"
  | "custom";

export const TARGET_TYPES: TargetType[] = [
  "people",
  "monsters",
  "enemies",
  "allies",
  "partyMembers",
  "guildMembers",
  "classmates",
  "teachers",
  "friends",
  "family",
  "groups",
  "custom",
];

export const TARGET_TYPE_META: Record<TargetType, { label: string; color: string }> = {
  people: { label: "People", color: "#3b82f6" },
  monsters: { label: "Monsters", color: "#ef4444" },
  enemies: { label: "Enemies", color: "#dc2626" },
  allies: { label: "Allies", color: "#22c55e" },
  partyMembers: { label: "Party", color: "#8b5cf6" },
  guildMembers: { label: "Guild", color: "#6366f1" },
  classmates: { label: "Classmates", color: "#ec4899" },
  teachers: { label: "Teachers", color: "#14b8a6" },
  friends: { label: "Friends", color: "#f97316" },
  family: { label: "Family", color: "#a855f7" },
  groups: { label: "Groups", color: "#06b6d4" },
  custom: { label: "Custom", color: "#64748b" },
};

export interface Target {
  id: string;
  name: string;
  targetType: TargetType;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  identifiers: string[];
  labels: string[];
  description?: string;
  createdAt: number;
}
