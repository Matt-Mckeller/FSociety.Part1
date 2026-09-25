"use client";

/**
 * Command Center — planning glyphs.
 *
 * Custom brand symbols for the view-switcher and section headers, built on the
 * shared {@link BrandIcon} shell (24×24, `currentColor`). These speak the
 * Expanse visual language — small→large growth, connecting nodes, layered
 * tiers — rather than borrowing generic Material icons.
 *
 * Tile-local on purpose: promote to `@4eye/icons` once the set stabilizes.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

type GlyphProps = Omit<BrandIconProps, "children">;

/** Overview / Dashboard — a 2×2 cluster of tiles (the at-a-glance grid). */
export function OverviewGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" opacity="0.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" opacity="0.6" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" opacity="0.85" />
    </BrandIcon>
  );
}

/** Quests — a diamond deliverable with a target core. */
export function QuestGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2 L22 12 L12 22 L2 12 Z" opacity="0.85" />
      <circle cx="12" cy="12" r="3.4" fill="#000" opacity="0.18" />
    </BrandIcon>
  );
}

/** Sprint — three forward chevrons (now / next / later flow). */
export function SprintGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3 6 L9 12 L3 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M9 6 L15 12 L9 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      <path d="M15 6 L21 12 L15 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIcon>
  );
}

/**
 * Weight — stacked bars in descending weight (a ranked list).
 * Named WeightGlyph so it does not collide with Character Direction PriorityGlyph.
 */
export function WeightGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="3" y="4" width="18" height="3.4" rx="1.7" />
      <rect x="3" y="10.3" width="13" height="3.4" rx="1.7" opacity="0.72" />
      <rect x="3" y="16.6" width="8" height="3.4" rx="1.7" opacity="0.48" />
    </BrandIcon>
  );
}

/** @deprecated Use WeightGlyph — "priority" is reserved for Character Direction codes. */
export const PriorityGlyph = WeightGlyph;

/** Roadmap / Timeline — a path with milestone nodes. */
export function TimelineGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M4 12 H20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="5" cy="12" r="2.6" />
      <circle cx="12" cy="12" r="2.6" opacity="0.78" />
      <circle cx="19" cy="12" r="2.6" opacity="0.55" />
    </BrandIcon>
  );
}

/** Compass — a four-point strategic compass star. */
export function CompassGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
      <path d="M12 5 L14 12 L12 19 L10 12 Z" />
      <path d="M5 12 L12 10 L19 12 L12 14 Z" opacity="0.55" />
    </BrandIcon>
  );
}

/** Strategic Focus — concentric rings narrowing to a focused core (a focused aim). */
export function StrategicFocusGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.35" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 1.5 V4.5 M12 19.5 V22.5 M1.5 12 H4.5 M19.5 12 H22.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

/** SWOT — a four-quadrant matrix (the 2×2 strategy grid). */
export function SwotGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.4" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.4" opacity="0.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.4" opacity="0.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.4" opacity="0.85" />
    </BrandIcon>
  );
}

/** Work group — a kanban board (columns of work in flight). */
export function WorkGroupGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
      <rect x="6" y="7" width="3" height="8" rx="1" />
      <rect x="10.5" y="7" width="3" height="10" rx="1" opacity="0.7" />
      <rect x="15" y="7" width="3" height="6" rx="1" opacity="0.5" />
    </BrandIcon>
  );
}

/** Team group — two heads (people work is shared across). */
export function TeamGroupGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="8.5" cy="11" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="15.5" cy="11" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.55" />
    </BrandIcon>
  );
}

/** Reference group — a shelf of volumes (the library). */
export function ReferenceGroupGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="4" y="4" width="3.6" height="16" rx="1" />
      <rect x="9" y="4" width="3.6" height="16" rx="1" opacity="0.7" />
      <rect x="14.6" y="6" width="3.6" height="14" rx="1" opacity="0.5" transform="rotate(9 16.4 13)" />
    </BrandIcon>
  );
}

/** Instructions / Guide — a three-row checklist with leading bullets. */
export function GuideGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="5" cy="7" r="1.8" />
      <path d="M9 7 H21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="5" cy="12" r="1.8" opacity="0.75" />
      <path d="M9 12 H21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <circle cx="5" cy="17" r="1.8" opacity="0.5" />
      <path d="M9 17 H17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

/** Docs / Codex — an open book of knowledge. */
export function CodexGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 5 C9.5 3.5 6 3.5 3.5 4.5 V19 C6 18 9.5 18 12 19.5 Z" opacity="0.78" />
      <path d="M12 5 C14.5 3.5 18 3.5 20.5 4.5 V19 C18 18 14.5 18 12 19.5 Z" opacity="0.5" />
    </BrandIcon>
  );
}

/** Legend / vision — a north-star with rays. */
export function LegendGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2 L14 9 L21 12 L14 15 L12 22 L10 15 L3 12 L10 9 Z" />
    </BrandIcon>
  );
}

/** Campaign — a planted flag representing a strategic initiative. */
export function CampaignGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <line x1="5" y1="3" x2="5" y2="21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M5 4 L19 8 L5 14 Z" />
    </BrandIcon>
  );
}

/** Storyline — three nodes on a narrative arc (beginning → middle → end). */
export function StorylineGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M4 16 Q12 4 20 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <circle cx="4" cy="16" r="2.4" />
      <circle cx="12" cy="8.5" r="2.4" opacity="0.78" />
      <circle cx="20" cy="16" r="2.4" opacity="0.55" />
    </BrandIcon>
  );
}

/** Crew — overlapping figures (a team work is shared across). */
export function CrewGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="8" cy="8" r="3.2" opacity="0.85" />
      <path d="M2.5 19 C2.5 14.8 5 13 8 13 C11 13 13.5 14.8 13.5 19 Z" opacity="0.85" />
      <circle cx="16.5" cy="8.5" r="2.7" opacity="0.5" />
      <path d="M12.5 19 C12.7 15.6 14.4 13.6 16.5 13.6 C19 13.6 21.5 15.2 21.5 19 Z" opacity="0.5" />
    </BrandIcon>
  );
}

/** Goals — ascending bars with a star at the peak (growth toward an outcome). */
export function GoalGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="3" y="17" width="4.5" height="4" rx="1.2" />
      <rect x="9.75" y="11" width="4.5" height="10" rx="1.2" opacity="0.72" />
      <rect x="16.5" y="5" width="4.5" height="16" rx="1.2" opacity="0.5" />
      <path d="M18.75 2 L19.6 3.8 L21.6 4 L20.2 5.3 L20.6 7.3 L18.75 6.3 L16.9 7.3 L17.3 5.3 L15.9 4 L17.9 3.8 Z" />
    </BrandIcon>
  );
}

/** Lenses — an eye shape representing perspective and evaluation. */
export function LensGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M3 12 C6 6 18 6 21 12 C18 18 6 18 3 12 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" opacity="0.22" />
    </BrandIcon>
  );
}

/** My Queue — a stack of swipe cards (the Tinder-style review deck). */
export function QueueGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="6.5" y="3.5" width="13" height="15" rx="2.2" transform="rotate(8 13 11)" opacity="0.4" />
      <rect x="4.5" y="4.5" width="13" height="15" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </BrandIcon>
  );
}

/** Objective — a bullseye / target representing a concrete task. */
export function ObjectiveGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.3" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <circle cx="12" cy="12" r="2.2" />
    </BrandIcon>
  );
}

/** Process — circular flow with a forward step (plan phase item). */
export function ProcessGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
      <path
        d="M12 4.5 A7.5 7.5 0 0 1 18.8 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.2 7.8 L19 10.2 L16.4 10.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.1" />
    </BrandIcon>
  );
}

/**
 * EntityTypeGlyph — renders the correct glyph for an entity's type.
 * Shows the structural "what is it" identity, distinct from the entity's own
 * colored symbol (which conveys "what is it about").
 */
export function EntityTypeGlyph({
  type,
  ...props
}: GlyphProps & { type: string }) {
  switch (type) {
    case "legend":   return <LegendGlyph    {...props} />;
    case "campaign": return <CampaignGlyph  {...props} />;
    case "storyline":return <StorylineGlyph {...props} />;
    case "quest":    return <QuestGlyph     {...props} />;
    case "objective":return <ObjectiveGlyph {...props} />;
    case "priority": return <WeightGlyph    {...props} />;
    case "process":  return <ProcessGlyph   {...props} />;
    default:         return <ObjectiveGlyph {...props} />;
  }
}

export type CommandView =
  | "dashboard"
  | "strategicFocus"
  | "swot"
  | "goals"
  | "lenses"
  | "quests"
  | "sprint"
  | "priorities"
  | "roadmap"
  | "crew"
  | "queue"
  | "docs"
  | "instructions";

/** Section group id a view can belong to (renders nested/indented in the nav). */
export type CommandGroupId = "compass" | "work" | "team" | "reference";

export interface CommandViewMeta {
  id: CommandView;
  label: string;
  description: string;
  Glyph: React.ComponentType<GlyphProps>;
  /** When set, the view renders nested under this group's header in the nav. */
  group?: CommandGroupId;
  /**
   * Alternate readings of this view's name, cycled while the view is active and
   * hovered. The label is not decoration — a view that can be read several ways
   * is telling you it does several things, and the cipher is how it says so
   * without spending a tooltip on it.
   */
  cipher?: string[];
}

/** Ordered view registry for the switcher. Compass children are contiguous. */
export const COMMAND_VIEWS: CommandViewMeta[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "At-a-glance status, focus, and signals.",
    Glyph: OverviewGlyph,
  },
  {
    id: "strategicFocus",
    label: "Strategic Focus",
    description: "Current focus priorities plus ranked focus areas with weight and trend.",
    Glyph: StrategicFocusGlyph,
    group: "compass",
  },
  {
    id: "goals",
    label: "Goals",
    description: "North star and strategic bets — what we're building toward.",
    Glyph: GoalGlyph,
    group: "compass",
  },
  {
    id: "lenses",
    label: "Lenses",
    description: "Value, marketing + craft lenses to assess the whole application.",
    Glyph: LensGlyph,
    group: "compass",
  },
  {
    id: "swot",
    label: "SWOT",
    description: "Strengths, weaknesses, opportunities, threats.",
    Glyph: SwotGlyph,
    group: "compass",
  },
  {
    id: "quests",
    label: "Quests",
    description: "The work hierarchy — campaigns to actions.",
    Glyph: QuestGlyph,
    group: "work",
  },
  {
    /*
      "Sprint" was borrowed from a ceremony this board does not run — there are
      no fixed dates here, and nothing is being sprinted. Cadence is the honest
      word: it is about time without being the word "time", it names a rhythm
      you commit to and keep rather than a distance you rush, and it already
      means something specific in learning, where cadence is what makes
      repetition stick. The id stays `sprint` so stored lane state survives.
    */
    id: "sprint",
    label: "Cadence",
    description: "Now / Next / Later board with capacity — the rhythm you are actually holding.",
    Glyph: SprintGlyph,
    group: "work",
    cipher: ["Releases", "Chart", "Intervals"],
  },
  {
    /*
      Was labeled "Priorities" — that noun belongs to Character → Direction
      (Power.Max / Aion.Amplify / …). This view is weight triage for the
      Cadence focus set. Id stays `priorities` so stored lane state survives.
    */
    id: "priorities",
    label: "Weight",
    description: "Work items ranked by weight — what to focus on next.",
    Glyph: WeightGlyph,
    group: "work",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    description: "Milestones across income and flagship tracks.",
    Glyph: TimelineGlyph,
    group: "work",
  },
  {
    id: "crew",
    label: "Crew",
    description: "Assign work to people and see each person's load.",
    Glyph: CrewGlyph,
    group: "team",
  },
  {
    id: "queue",
    label: "My Queue",
    description: "Swipe through work offered to you — accept, decline, defer.",
    Glyph: QueueGlyph,
    group: "team",
  },
  {
    id: "docs",
    label: "Docs",
    description: "Decisions, questions, and reference notes.",
    Glyph: CodexGlyph,
    group: "reference",
  },
  {
    id: "instructions",
    label: "Guide",
    description: "System guidelines, brand links, and technology choices.",
    Glyph: GuideGlyph,
    group: "reference",
  },
];

/** A visual sub-cluster of related views inside a nav group. */
export interface CommandGroupCluster {
  id: string;
  /** Optional faint sub-label rendered above the cluster. */
  label?: string;
  children: CommandView[];
}

export interface CommandGroupMeta {
  id: CommandGroupId;
  label: string;
  description: string;
  Glyph: React.ComponentType<GlyphProps>;
  /**
   * When the group header is clicked, go here. Defaults to the first child in
   * cluster order when unset.
   */
  defaultView?: CommandView;
  /**
   * Child views organized into visual clusters. Cluster order is also the tab
   * order in the shell; clusters render with a separator between them.
   */
  clusters: CommandGroupCluster[];
}

/** Nav section groups. Members reference `group` on their CommandViewMeta. */
export const COMMAND_GROUPS: CommandGroupMeta[] = [
  {
    id: "compass",
    label: "Compass",
    description: "Current focus priorities, strategy, goals, and evaluation.",
    Glyph: CompassGlyph,
    defaultView: "strategicFocus",
    clusters: [
      { id: "compass", children: ["strategicFocus", "goals", "lenses", "swot"] },
    ],
  },
  {
    id: "work",
    label: "Work",
    description: "Plan and execute — the hierarchy, cadence, weight, and roadmap.",
    Glyph: WorkGroupGlyph,
    clusters: [
      { id: "execution", children: ["quests", "sprint", "priorities"] },
      { id: "timeline", children: ["roadmap"] },
    ],
  },
  {
    id: "team",
    label: "Team",
    description: "People and your personal work inbox.",
    Glyph: TeamGroupGlyph,
    clusters: [{ id: "people", children: ["crew", "queue"] }],
  },
  {
    id: "reference",
    label: "Reference",
    description: "Decisions, notes, and system guidance.",
    Glyph: ReferenceGroupGlyph,
    clusters: [{ id: "library", children: ["docs", "instructions"] }],
  },
];

/** Flattened child view ids of a group, in cluster order. */
export function groupChildren(group: CommandGroupMeta): CommandView[] {
  return group.clusters.flatMap((c) => c.children);
}

/** Lookup a view's metadata by id. */
export function commandViewMeta(id: CommandView): CommandViewMeta | undefined {
  return COMMAND_VIEWS.find((v) => v.id === id);
}

/** The group a view belongs to, if any. */
export function commandGroupOf(id: CommandView): CommandGroupMeta | undefined {
  const g = commandViewMeta(id)?.group;
  return g ? COMMAND_GROUPS.find((grp) => grp.id === g) : undefined;
}
