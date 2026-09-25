/**
 * Acting-as catalog for the AI Chat header — default session roles plus
 * equipped character titles, each carrying a chip symbol so the tab can
 * morph the same way Goals does.
 */

import type { SymbolColor, SymbolName } from "@4eye/types";
import { MAX_SELECTED_ROLES } from "@4eye/types";
import { ROLE_TITLE_OPTIONS, TITLE_CYPHER_WORDS, roleDisplayLabel } from "@4eye/web/Tiles/character/model/titles";

export { MAX_SELECTED_ROLES };

export type ActingAsGroup = "default" | "equipped";

export interface ActingAsRole {
  id: string;
  label: string;
  hint?: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  group: ActingAsGroup;
  /** Rest → hover scramble words, when the equipped title morphs. */
  cypher?: string[];
}

export const ACTING_AS_DEFAULT: ActingAsRole[] = [
  {
    id: "teacher",
    label: "Teacher",
    hint: "Explain, scaffold, and check understanding.",
    symbol: "AutoStories",
    symbolColor: "blue",
    group: "default",
  },
  {
    id: "student",
    label: "Student",
    hint: "Learn out loud — ask, try, and course-correct.",
    symbol: "Star",
    symbolColor: "teal",
    group: "default",
  },
  {
    id: "parent",
    label: "Parent",
    hint: "Care, protect, and keep the long view.",
    symbol: "Heart",
    symbolColor: "pink",
    group: "default",
  },
  {
    id: "professional",
    label: "Professional",
    hint: "Ship clean work with a clear brief.",
    symbol: "Square",
    symbolColor: "slate",
    group: "default",
  },
  {
    id: "creator",
    label: "Creator",
    hint: "Make the thing, then make it better.",
    symbol: "Lightning",
    symbolColor: "amber",
    group: "default",
  },
  {
    id: "leader",
    label: "Leader",
    hint: "Set direction and multiply the room.",
    symbol: "Triangle",
    symbolColor: "purple",
    group: "default",
  },
];

const EQUIPPED_MARK: Record<string, { symbol: SymbolName; symbolColor: SymbolColor }> = {
  "game-master": { symbol: "Diamond", symbolColor: "purple" },
  "legendary-leader": { symbol: "Star", symbolColor: "amber" },
  won: { symbol: "Circle", symbolColor: "teal" },
  "grand-master-leadership-influence": { symbol: "Triangle", symbolColor: "purple" },
  neo: { symbol: "Lightning", symbolColor: "blue" },
  storyteller: { symbol: "AutoStories", symbolColor: "amber" },
  "storyteller-in-chief": { symbol: "AutoStories", symbolColor: "pink" },
  "visionary-architect": { symbol: "Diamond", symbolColor: "blue" },
  "quality-guardian": { symbol: "Star", symbolColor: "green" },
  strategist: { symbol: "Diamond", symbolColor: "slate" },
  "the-oracle": { symbol: "Moon", symbolColor: "purple" },
  "community-builder": { symbol: "Group", symbolColor: "pink" },
  builder: { symbol: "Square", symbolColor: "amber" },
  educator: { symbol: "AutoStories", symbolColor: "blue" },
  explorer: { symbol: "Arrow", symbolColor: "teal" },
};

const EQUIPPED_FALLBACK: { symbol: SymbolName; symbolColor: SymbolColor } = {
  symbol: "Person",
  symbolColor: "slate",
};

export function equippedRoleId(label: string): string {
  const opt = ROLE_TITLE_OPTIONS.find((o) => o.label === label);
  return `equipped:${opt?.id ?? label}`;
}

export function equippedRolesFromTitles(titles: string[]): ActingAsRole[] {
  return titles.map((label) => {
    const opt = ROLE_TITLE_OPTIONS.find((o) => o.label === label);
    const mark = (opt && EQUIPPED_MARK[opt.id]) ?? EQUIPPED_FALLBACK;
    return {
      id: equippedRoleId(label),
      label: roleDisplayLabel(label),
      hint: opt?.hint,
      symbol: mark.symbol,
      symbolColor: mark.symbolColor,
      group: "equipped" as const,
      cypher: TITLE_CYPHER_WORDS[label],
    };
  });
}

export function allActingAsRoles(titles: string[]): ActingAsRole[] {
  return [...ACTING_AS_DEFAULT, ...equippedRolesFromTitles(titles)];
}

export function resolveActingAsRoles(
  ids: string[],
  titles: string[],
): ActingAsRole[] {
  const catalog = allActingAsRoles(titles);
  return ids
    .map((id) => catalog.find((r) => r.id === id))
    .filter((r): r is ActingAsRole => Boolean(r));
}
