/**
 * Lens grouping — concentric rings, with complex tools nested under Other.
 *
 *   CORE     what I am — primary rail (always visible)
 *   OTHER    nested: Complex (Engagement…) + Facets (roles) — dropdown / accordion
 *   DOMAINS  where I act — off by default
 *
 * Engagement lives under Other → Complex so the Core rail stays short and
 * teachable; Facets nest beside it instead of a second full rail of pills.
 */

import type { ProfileView } from "../model/types";

export type CoreLens =
  | "surfaced"
  | "character"
  | "today"
  | "core"
  | "brain"
  | "engagement"
  | "psychology"
  | "body"
  | "life"
  | "events"
  | "processes";
export type FacetLens = Extract<
  ProfileView,
  "users" | "communication" | "student" | "teacher" | "classroom" | "professional" | "parent"
>;
export type DomainLens =
  | "d-human" | "d-computer" | "d-robot" | "d-store"
  | "d-neural" | "d-glasses" | "d-brainwave" | "d-aion";

export type Lens = CoreLens | FacetLens | DomainLens;

export type LensGroupId = "core" | "other" | "domains";
export type LensSubgroupId = "complex" | "facets";

export interface LensSubgroup {
  id: LensSubgroupId;
  label: string;
  blurb: string;
  lenses: Lens[];
  defaultLens: Lens;
}

export interface LensGroup {
  id: LensGroupId;
  label: string;
  blurb: string;
  /** Lenses shown inline at this group (Core). Empty when the group is menu-only. */
  lenses: Lens[];
  /** Nested menus (Other → Complex / Facets). */
  subgroups?: LensSubgroup[];
  defaultLens: Lens;
  enabled: boolean;
}

/**
 * Core stays the person. Engagement and role facets nest under Other so the
 * primary rail does not grow every time we add an exploratory surface.
 *
 * The grouped rail only shows {@link PRIMARY_CORE_LENSES} at rest; hover,
 * focus, or a tap on Pages reveals the rest so the landing view stays short.
 */
export const LENS_GROUPS: LensGroup[] = [
  {
    id: "core",
    label: "Core",
    blurb: "What I am — the person themselves",
    lenses: [
      "surfaced",
      "character",
      "today",
      "core",
      "brain",
      "psychology",
      "body",
      "life",
      "events",
      "processes",
    ],
    defaultLens: "surfaced",
    enabled: true,
  },
  {
    id: "other",
    label: "Other",
    blurb: "Complex explorers and role facets — nested so Core stays short",
    lenses: [],
    subgroups: [
      {
        id: "complex",
        label: "Complex",
        blurb: "Deeper explorers — mastery vs attention, knowledge web",
        lenses: ["engagement"],
        defaultLens: "engagement",
      },
      {
        id: "facets",
        label: "Facets",
        blurb: "How I show up — contextual identities and roles",
        lenses: [
          "parent",
          "users",
          "communication",
          "student",
          "teacher",
          "classroom",
          "professional",
        ],
        defaultLens: "parent",
      },
    ],
    defaultLens: "engagement",
    enabled: true,
  },
  {
    id: "domains",
    label: "Domains",
    blurb: "Where I act — the integration layers I operate through",
    lenses: [
      "d-human",
      "d-computer",
      "d-robot",
      "d-store",
      "d-neural",
      "d-glasses",
      "d-brainwave",
      "d-aion",
    ],
    defaultLens: "d-human",
    enabled: false,
  },
];

export const ACTIVE_GROUPS = LENS_GROUPS.filter((g) => g.enabled);

/** Flatten every lens in a group (inline + subgroups). */
export function lensesInGroup(g: LensGroup): Lens[] {
  return [...g.lenses, ...(g.subgroups?.flatMap((s) => s.lenses) ?? [])];
}

export const ALL_LENSES: Lens[] = ACTIVE_GROUPS.flatMap(lensesInGroup);

export const SURFACED_LENS = "surfaced" as const;

/**
 * Core lenses shown when the grouped rail is collapsed. Surfaced is the
 * landing page; the active lens is also kept visible so you never lose your
 * place. Everything else waits behind a hover/focus/tap peek.
 */
export const PRIMARY_CORE_LENSES: ReadonlySet<Lens> = new Set<Lens>([SURFACED_LENS]);

/** Lenses that show the minimised Goals bracket at the top of the page. */
export const GAME_STATE_LENSES: ReadonlySet<Lens> = new Set<Lens>([
  "surfaced",
  "character",
  "core",
]);

const CORE_LENS_IDS: CoreLens[] = [
  "surfaced",
  "character",
  "today",
  "core",
  "brain",
  "engagement",
  "psychology",
  "body",
  "life",
  "events",
  "processes",
];

export function isCoreLens(lens: Lens): lens is CoreLens {
  return (CORE_LENS_IDS as string[]).includes(lens);
}

export function groupOf(lens: Lens): LensGroup | undefined {
  return LENS_GROUPS.find((g) => lensesInGroup(g).includes(lens));
}

export function subgroupOf(
  lens: Lens,
): { group: LensGroup; subgroup: LensSubgroup } | undefined {
  for (const g of LENS_GROUPS) {
    for (const s of g.subgroups ?? []) {
      if (s.lenses.includes(lens)) return { group: g, subgroup: s };
    }
  }
  return undefined;
}

export const LENS_LABEL: Record<string, string> = {
  surfaced: "Surfaced",
  today: "Today",
  character: "Character",
  core: "Core",
  brain: "Brain",
  engagement: "Engagement",
  psychology: "Psychology",
  body: "Body",
  life: "Life",
  events: "Events",
  processes: "Processes",
};

export const LENS_HINT: Record<string, string> = {
  surfaced: "What matters right now — the highest-weighted slices of this profile",
  today: "Today at a glance: status targets (mood, auras, gear, buffs), routine and compass",
  character:
    "Act and equip: your action bar, swipe rose, auras, traits, equipment, attributes, perks and skills",
  core: "Who you are: summary, bio, what you love, achievements, becoming-media, and the brand you carry — goals stay in the top bracket",
  brain: "Operating mind: mood, perspectives, relationships and recently learned",
  engagement:
    "Attention vs mastery — meaning, skills, life, signals and saved views. Engage ≠ learn.",
  psychology: "Mental-health profile — how you process, cope, and what helps you",
  body: "Physical: health, energy, recovery and routine load",
  life: "Feed, AI settings and interests — what keeps showing up",
  events: "The character timeline — everything that has happened, most recent first",
  processes: "Savable operational playbooks — Aion invocations, scripts, and evolution loops",
};
