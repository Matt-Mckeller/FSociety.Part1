"use client";

/**
 * Chat goal catalog — the current user's profile pyramid, not the generic
 * Focus / Rest / Connect verbs. Matthew McKeller is the mockup default.
 *
 * Short `word` + one-line `description` (the Target). `code` / `detail`
 * wait behind expansion in the picker.
 */

import { useMemo } from "react";
import type {
  Goal,
  GoalCategory,
  GoalSection,
  SymbolColor,
  SymbolName,
} from "@4eye/types";
import {
  ONGOING_GOALS,
  OTHER_PEOPLE_GOALS,
  VISION_GOALS,
  type TargetSegment,
  type VisionGoal,
} from "@4eye/web/Tiles/integration-layers/goals/goalsData";
import { RELATIONSHIPS_SEED } from "@4eye/web/Tiles/character/model/relationships";
import { useFocusStack } from "@4eye/web/Tiles/character/store/useFocusStack";

export const GOAL_SECTION_ORDER: GoalSection[] = [
  "now",
  "vision",
  "ongoing",
  "others",
  "relationships",
];

export const GOAL_SECTION_META: Record<
  GoalSection,
  { label: string; hint: string }
> = {
  now: {
    label: "Now",
    hint: "Today's pin and the live current goal",
  },
  vision: {
    label: "Vision · 1–3",
    hint: "Save · Value · Command King",
  },
  ongoing: {
    label: "Ongoing · 4–7",
    hint: "Heart.Evolve, weekly ship, depth, carry",
  },
  others: {
    label: "Other people",
    hint: "Goals held for other people — heal, open, grow",
  },
  relationships: {
    label: "Relationship goals",
    hint: "Shared aims on the relationship graph",
  },
};

const SHAPE_SYMBOL: Record<VisionGoal["targetShape"], SymbolName> = {
  circle: "Circle",
  square: "Square",
  triangle: "Triangle",
};

/** Short chip labels — the identity word, not the coded line. */
const SHORT: Record<
  string,
  { word: string; symbolColor: SymbolColor; category: GoalCategory }
> = {
  save: { word: "Save", symbolColor: "teal", category: "purpose" },
  value: { word: "Value", symbolColor: "blue", category: "purpose" },
  king: { word: "King", symbolColor: "pink", category: "identity" },
  "perfect-loves": { word: "Heart.Evolve", symbolColor: "pink", category: "social" },
  build: { word: "Build", symbolColor: "green", category: "behavioral" },
  depth: { word: "Depth", symbolColor: "blue", category: "cognitive" },
  carry: { word: "Carry", symbolColor: "purple", category: "social" },
  "gain-money": { word: "Money", symbolColor: "amber", category: "behavioral" },
  "heal-janna": { word: "Heal", symbolColor: "green", category: "social" },
  "open-janna": { word: "Open", symbolColor: "blue", category: "social" },
  "grow-together": { word: "Together", symbolColor: "pink", category: "social" },
  "record-phenomenal": { word: "Record", symbolColor: "teal", category: "purpose" },
  "present-perfect": { word: "Present", symbolColor: "blue", category: "social" },
  "spice-seduction": { word: "Spice", symbolColor: "pink", category: "social" },
};

function flatten(
  value: string | TargetSegment[] | undefined,
): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") return value;
  const text = value
    .map((seg) => (typeof seg === "string" ? seg : (seg.morph[0] ?? "")))
    .join("")
    .trim();
  return text || undefined;
}

function visionToGoal(goal: VisionGoal, section: GoalSection): Goal {
  const short = SHORT[goal.id];
  return {
    id: goal.id,
    word: short?.word ?? goal.id,
    symbol: SHAPE_SYMBOL[goal.targetShape],
    symbolColor: short?.symbolColor ?? "slate",
    category: short?.category ?? "purpose",
    domain: "default",
    section,
    description: goal.targetPlain,
    code: goal.code,
    detail: flatten(goal.meaning) ?? goal.tagline,
  };
}

function slug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function shortWord(label: string): string {
  const trimmed = label.replace(/\(.*\)/g, "").trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length <= 2) return trimmed;
  return parts.slice(0, 2).join(" ");
}

function relationshipGoals(): Goal[] {
  const seen = new Set<string>();
  const out: Goal[] = [];
  for (const rel of RELATIONSHIPS_SEED) {
    for (const label of rel.sharedGoals ?? []) {
      const id = `rel-goal:${slug(label)}`;
      if (seen.has(id)) continue;
      seen.add(id);
      const holders = RELATIONSHIPS_SEED.filter((r) => r.sharedGoals?.includes(label)).map(
        (r) => r.name,
      );
      out.push({
        id,
        word: shortWord(label),
        symbol: "Heart",
        symbolColor: "pink",
        category: "social",
        domain: "default",
        section: "relationships",
        description: label,
        detail: `Shared with ${holders.join(", ")}`,
      });
    }
  }
  return out;
}

export function nowGoals(
  currentGoal: string,
  todayPin: { label: string; detail: string },
  focusedGoalIds: readonly string[],
): Goal[] {
  const focused = focusedGoalIds.slice(0, 3).map((id) => {
    if (id === "unicorn") {
      return {
        id: "now-unicorn",
        word: "Unicorn",
        symbol: "Star" as const,
        symbolColor: "purple" as const,
        category: "purpose" as const,
        domain: "default" as const,
        section: "now" as const,
        description: currentGoal,
        detail: "Live unicorn goal — Accept phase.",
      };
    }
    const vision = [...VISION_GOALS, ...ONGOING_GOALS].find((g) => g.id === id);
    if (vision) {
      const g = visionToGoal(vision, "now");
      return { ...g, id: `now-focus-${id}`, section: "now" as const };
    }
    return {
      id: `now-focus-${id}`,
      word: id,
      symbol: "Circle" as const,
      symbolColor: "slate" as const,
      category: "purpose" as const,
      domain: "default" as const,
      section: "now" as const,
      description: id,
    };
  });

  return [
    ...focused,
    {
      id: "now-today",
      word: "Today",
      symbol: "Sun",
      symbolColor: "amber",
      category: "purpose",
      domain: "default",
      section: "now",
      description: todayPin.label,
      detail: todayPin.detail,
    },
  ];
}

export function buildProfileGoalCatalog(
  currentGoal: string,
  todayPin: { label: string; detail: string },
  focusedGoalIds: readonly string[],
): Goal[] {
  return [
    ...nowGoals(currentGoal, todayPin, focusedGoalIds),
    ...VISION_GOALS.map((g) => visionToGoal(g, "vision")),
    ...ONGOING_GOALS.map((g) => visionToGoal(g, "ongoing")),
    ...OTHER_PEOPLE_GOALS.map((g) => visionToGoal(g, "others")),
    ...relationshipGoals(),
  ];
}

export function useProfileGoalCatalog(): Goal[] {
  const { currentGoal, todayPin, focusedGoalIds } = useFocusStack();
  return useMemo(
    () => buildProfileGoalCatalog(currentGoal, todayPin, focusedGoalIds),
    [currentGoal, todayPin, focusedGoalIds],
  );
}
