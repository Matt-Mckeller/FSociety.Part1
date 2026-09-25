"use client";

/**
 * Command Center — crew roster + assignment configs.
 *
 * The Plan tile assigns work to people (and other entities). People live in the
 * Profiles tile, so we derive a trimmed, assignment-oriented roster
 * ({@link CrewMember}) from `PROFILES_SEED`. We also house {@link EntityGoal}
 * (goals for any entity, not just crew members) and {@link AssignmentConfig}
 * (per-entity-type state label overrides for the Queue swipe deck).
 */

import type { Entity, EntityType, SymbolColor } from "@4eye/types";
import { PROFILES_SEED } from "../../profiles";
import type { CrewTier } from "../../profiles/model/types";
import type { Assignment } from "./CommandCenterProvider";
import {
  OTHER_PEOPLE_GOALS,
  PARENT_GOALS,
  type VisionGoal,
} from "../../integration-layers/goals/goalsData";

/** A person work can be assigned to (denormalized from a Profile). */
export interface CrewMember {
  id: string;
  username: string;
  name: string;
  accent: SymbolColor;
  /** Two-letter badge used when no avatar image is present. */
  initials: string;
  /** Inner (t1) vs outer-orbit (t2) crew ring. */
  crewTier: CrewTier;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

const TIER_ORDER: Record<CrewTier, number> = { t1: 0, t2: 1 };

/** Keep the people these new goal cards belong to at the front of the board. */
export const CREW_PIN = [
  "PROFILE_MATTHEW",
  "PROFILE_JANNA",
  "PROFILE_CHILDREN",
  "PROFILE_EMILY",
  "PROFILE_EMIRU",
];

/**
 * The roster, derived once from the Profiles seed.
 * Empty newcomer skeleton stays in Profiles for empty-state demos but is
 * omitted here so Crew / Queue / Dashboard are not diluted by a blank column.
 * Pinned inner seats first, then remaining t1 → t2 by name.
 */
export const CREW: CrewMember[] = PROFILES_SEED.profiles
  .filter((p) => p.id !== "PROFILE_NEWCOMER")
  .map((p) => ({
    id: p.id,
    username: p.username,
    name: p.realName ?? p.username,
    accent: p.accent ?? "slate",
    initials: initialsOf(p.realName ?? p.username),
    crewTier: p.crewTier ?? "t1",
  }))
  .sort((a, b) => {
    const ai = CREW_PIN.indexOf(a.id);
    const bi = CREW_PIN.indexOf(b.id);
    if (ai !== -1 || bi !== -1) return (ai === -1 ? CREW_PIN.length : ai) - (bi === -1 ? CREW_PIN.length : bi);
    return TIER_ORDER[a.crewTier] - TIER_ORDER[b.crewTier] || a.name.localeCompare(b.name);
  });

export function crewByTier(tier: CrewTier): CrewMember[] {
  return CREW.filter((m) => m.crewTier === tier);
}

export function crewMember(id: string): CrewMember | undefined {
  return CREW.find((m) => m.id === id);
}

export const CREW_JANNA_ID = "PROFILE_JANNA";
export const CREW_CHILDREN_ID = "PROFILE_CHILDREN";

/** Entity types that can be assigned to a person or entity. */
export const ASSIGNABLE_TYPES = new Set([
  // Planning work
  "quest", "objective", "action",
  // Creative work
  "sequence", "scene", "project",
  // Divine review — work escalated for God's review and feedback
  "god",
  // Generic
  "work",
]);

export function isAssignable(entity: Entity): boolean {
  return ASSIGNABLE_TYPES.has(entity.type);
}

// ─── Assignment Config ────────────────────────────────────────────────────────

/**
 * Per-entity-type labels for the 3-step assignment lifecycle.
 * Views (Queue swipe deck, Crew board chips) read this to show domain-specific
 * language instead of raw state names.
 */
export interface AssignmentConfig {
  stateLabels: {
    offered: string;
    accepted: string;
    declined: string;
    done: string;
  };
  /** Optional named roles (e.g. "author", "reviewer"). Informational for now. */
  roles?: string[];
}

export const ASSIGNMENT_CONFIGS: Record<string, AssignmentConfig> = {
  default: {
    stateLabels: { offered: "Offered", accepted: "Accepted", declined: "Declined", done: "Done" },
  },

  // ── Creative work ──────────────────────────────────────────────────────────
  sequence: {
    stateLabels: { offered: "Pitched", accepted: "In Review", declined: "Passed", done: "Approved" },
    roles: ["author", "reviewer", "god"],
  },
  scene: {
    stateLabels: { offered: "Drafted", accepted: "In Review", declined: "Passed", done: "Approved" },
    roles: ["author", "reviewer", "god"],
  },
  project: {
    stateLabels: { offered: "Proposed", accepted: "Scoping", declined: "Declined", done: "Shipped" },
    roles: ["lead", "contributor", "approver", "god"],
  },

  // ── Planning work — the quest/objective/action ladder ────────────────────────
  quest: {
    stateLabels: { offered: "Quest Offered", accepted: "On the Quest", declined: "Forsaken", done: "Conquered" },
    roles: ["questgiver", "adventurer"],
  },
  objective: {
    stateLabels: { offered: "Targeted", accepted: "Locked On", declined: "Stood Down", done: "Secured" },
    roles: ["owner", "operator"],
  },
  action: {
    stateLabels: { offered: "Queued", accepted: "In Hand", declined: "Skipped", done: "Executed" },
    roles: ["assigner", "doer"],
  },
  work: {
    stateLabels: { offered: "Offered", accepted: "In Progress", declined: "Declined", done: "Delivered" },
    roles: ["requester", "worker"],
  },

  // ── Divine review — the owner ("God") passes judgment and leaves feedback ─────
  // The final review stage above the crew: work that has cleared its team review
  // is offered up for God's review, sits "Under Divine Review" while feedback is
  // given, then is either Blessed (shipped with a blessing) or Cast Out (sent
  // back down with notes).
  god: {
    stateLabels: {
      offered: "Submitted to God",
      accepted: "Under Divine Review",
      declined: "Cast Out",
      done: "Blessed",
    },
    roles: ["god", "supplicant"],
  },
};

export function assignmentConfigFor(entityType: string): AssignmentConfig {
  return ASSIGNMENT_CONFIGS[entityType] ?? ASSIGNMENT_CONFIGS.default!;
}

// ─── Entity Goals ─────────────────────────────────────────────────────────────

/**
 * Goal type discriminator.
 *
 * - relationship: growing the bond between two people
 * - personal:     things you want to help a specific person achieve
 * - operational:  goals for a location, org, or team
 * - creative:     goals tied to a creative project/sequence
 */
export type GoalType = "relationship" | "personal" | "operational" | "creative";
export type GoalStatus = "active" | "done" | "paused";
/** Goal severity (low / medium / high) — not Character Direction focus priorities. */
export type GoalPriority = "low" | "medium" | "high";

/**
 * A goal linked to any entity — person, location, org, creative work, etc.
 * Replaces the old `CrewGoal` type (which was people-only).
 */
export interface EntityGoal {
  id: string;
  /** The entity this goal is *for* (person, location, org, …). */
  targetEntityId: string;
  targetEntityType: EntityType;
  /** Who authored/set this goal (usually the current user's profile id). */
  authorId: string;
  goalType: GoalType;
  title: string;
  description?: string;
  status: GoalStatus;
  priority: GoalPriority;
  /**
   * Optional link to a Character Direction priority id (`pri-amplify`, …).
   * Alignment only — the priority code is never the goal title.
   */
  alignsToPriorityId?: string;
  createdAt: number;
}

/** @deprecated Use EntityGoal instead. Kept for any call sites not yet updated. */
export type CrewGoal = EntityGoal & { memberId: string };

/** Per-profile relationship/personal goals — keyed by PROFILE_* id. */
const PROFILE_GOAL_SEED: Record<
  string,
  Array<
    Omit<EntityGoal, "id" | "createdAt" | "targetEntityId" | "targetEntityType" | "authorId"> & {
      daysAgo: number;
    }
  >
> = {
  PROFILE_MATTHEW: [
    {
      goalType: "relationship",
      title: "Choose and grow love as primary",
      description: "Heart.Evolve — Emiru fishing + Emily deep seat.",
      status: "active",
      priority: "high",
      alignsToPriorityId: "pri-love",
      daysAgo: 4,
    },
    {
      goalType: "personal",
      title: "Ship yen · teach from recordings",
      description: "Collapse years into one surface.",
      status: "active",
      priority: "high",
      alignsToPriorityId: "pri-unlock",
      daysAgo: 2,
    },
    {
      goalType: "personal",
      title: "Fund the vision without losing it",
      description: "Income, tokens, and financial recovery that fund the rest.",
      status: "active",
      priority: "medium",
      alignsToPriorityId: "pri-amplify",
      daysAgo: 7,
    },
    {
      goalType: "personal",
      title: "Understand deeply enough to teach",
      description: "Comprehend the system — lead without getting played.",
      status: "active",
      priority: "medium",
      alignsToPriorityId: "pri-comprehend",
      daysAgo: 5,
    },
  ],
  PROFILE_EMIRU: [
    { goalType: "relationship", title: "Keep the king looking in light & dark", description: "As she desires — framing, not control for its own sake.", status: "active", priority: "high", daysAgo: 0 },
    { goalType: "relationship", title: "Work with him as a team", description: "Shared seat — combined moves, not parallel tracks.", status: "active", priority: "high", daysAgo: 0 },
    { goalType: "relationship", title: "Amplify the king", description: "Utilize love to amplify his learning and engagement.", status: "active", priority: "high", daysAgo: 1 },
    { goalType: "personal", title: "Attain more power and knowledge", status: "active", priority: "high", daysAgo: 2 },
    { goalType: "personal", title: "World · Food · Health", description: "Shared improve-the-world domains with the king.", status: "active", priority: "medium", daysAgo: 0 },
    { goalType: "relationship", title: "Clarify desire without locking identity", description: "Fishing construct — remap who she is when writing/body match.", status: "active", priority: "high", daysAgo: 5 },
    { goalType: "relationship", title: "Combined life · cats · teach", description: "Desired goals on the queen seat.", status: "active", priority: "high", daysAgo: 8 },
    { goalType: "personal", title: "Keep soft-public creator framing", status: "active", priority: "medium", daysAgo: 20 },
  ],
  PROFILE_EMILY: [
    { goalType: "relationship", title: "Bond · LoveFormula variables", description: "Energy, cognition, information, mood, time, context, situation.", status: "active", priority: "high", daysAgo: 6 },
    { goalType: "personal", title: "Grow / create teaching content", description: "Teach and raise gamers.", status: "active", priority: "high", daysAgo: 3 },
    { goalType: "personal", title: "Pur Meow · name & stewardship", description: "Keep the mark live. Who holds it and what it is called — discover together.", status: "active", priority: "high", daysAgo: 0 },
    { goalType: "personal", title: "Hold the gifted AGI Ribs", description: "Core rib + left/right pair — structure while she builds.", status: "active", priority: "high", daysAgo: 0 },
    { goalType: "personal", title: "Kid vs career — honest decision", description: "Want a kid; question impact. No ultimatums.", status: "active", priority: "medium", daysAgo: 14 },
    { goalType: "personal", title: "Help food / children / need", status: "active", priority: "medium", daysAgo: 9 },
  ],
  PROFILE_XEMOCAT: [
    { goalType: "relationship", title: "Bond under cover username", description: "Protected name stays off public surfaces.", status: "active", priority: "high", daysAgo: 11 },
    { goalType: "personal", title: "Remap when identity clarifies", status: "active", priority: "medium", daysAgo: 18 },
  ],
  PROFILE_REDHEAD: [
    { goalType: "relationship", title: "Keep shallow — sample only", description: "Warm work-crush energy; not a life plan.", status: "active", priority: "low", daysAgo: 60 },
  ],
  PROFILE_TWITCH_COMMUNITY: [
    { goalType: "personal", title: "Show up live with teach energy", description: "Stream cadence that feeds Twitch chat and creators.", status: "active", priority: "high", daysAgo: 1 },
    { goalType: "relationship", title: "Earn chat trust before pitch", description: "Presence first — then product / donate asks.", status: "active", priority: "medium", daysAgo: 3 },
  ],
  PROFILE_GAMER_COMMUNITY: [
    { goalType: "personal", title: "Teach and raise gamers", description: "Skill + character through play and systems.", status: "active", priority: "high", daysAgo: 1 },
    { goalType: "relationship", title: "Speak player language", description: "Frames that land with people who already play.", status: "active", priority: "medium", daysAgo: 2 },
  ],
};

type VisionPlacement = { goalType: GoalType; priority: GoalPriority; daysAgo: number };

const JANNA_GOAL_PLACEMENT: Record<string, VisionPlacement> = {
  "heal-janna": { goalType: "personal", priority: "high", daysAgo: 1 },
  "open-janna": { goalType: "relationship", priority: "high", daysAgo: 1 },
  "grow-together": { goalType: "relationship", priority: "high", daysAgo: 0 },
  "record-phenomenal": { goalType: "personal", priority: "medium", daysAgo: 2 },
  "present-perfect": { goalType: "relationship", priority: "high", daysAgo: 0 },
  "spice-seduction": { goalType: "relationship", priority: "medium", daysAgo: 3 },
};

const CHILDREN_GOAL_PLACEMENT: Record<string, VisionPlacement> = {
  spark: { goalType: "personal", priority: "high", daysAgo: 3 },
  pride: { goalType: "personal", priority: "medium", daysAgo: 5 },
  notice: { goalType: "personal", priority: "high", daysAgo: 2 },
  together: { goalType: "relationship", priority: "medium", daysAgo: 4 },
};

function visionGoalDescription(g: VisionGoal): string {
  if (typeof g.meaning === "string") return g.meaning;
  return g.tagline ?? g.targetPlain;
}

function visionGoalsToDrafts(
  goals: readonly VisionGoal[],
  targetEntityId: string,
  placement: Record<string, VisionPlacement>,
  authorId: string,
): Array<Omit<EntityGoal, "id" | "createdAt"> & { daysAgo: number; seedId: string }> {
  return goals.flatMap((g) => {
    const place = placement[g.id];
    if (!place) return [];
    return [{
      seedId: `cg-vision-${g.id}`,
      targetEntityId,
      targetEntityType: "profile" as const,
      authorId,
      goalType: place.goalType,
      title: g.targetPlain,
      description: visionGoalDescription(g),
      status: "active" as const,
      priority: place.priority,
      daysAgo: place.daysAgo,
    }];
  });
}

export function crewVisionGoals(memberId: string, goalType?: GoalType): VisionGoal[] {
  if (memberId !== CREW_JANNA_ID) return [];
  if (!goalType) return [...OTHER_PEOPLE_GOALS];
  return OTHER_PEOPLE_GOALS.filter((g) => JANNA_GOAL_PLACEMENT[g.id]?.goalType === goalType);
}

export function visionGoalBySeedId(entityGoalId: string): VisionGoal | undefined {
  if (!entityGoalId.startsWith("cg-vision-")) return undefined;
  const id = entityGoalId.slice("cg-vision-".length);
  return OTHER_PEOPLE_GOALS.find((g) => g.id === id);
}

export function seedCrewGoals(crew: CrewMember[]): EntityGoal[] {
  if (crew.length === 0) return [];
  const now = Date.now();
  const DAY = 86_400_000;
  const AUTHOR = "PROFILE_MATTHEW";

  type Draft = Omit<EntityGoal, "id" | "createdAt"> & { daysAgo: number; seedId?: string };
  const drafts: Draft[] = [];

  for (const member of crew) {
    // Skip empty newcomer — weak signal on the board.
    if (member.id === "PROFILE_NEWCOMER") continue;
    const seeded = PROFILE_GOAL_SEED[member.id];
    if (!seeded) {
      // t2 / unseeded seats stay empty until goals are authored — no generic
      // "Check in" noise across the outer orbit.
      continue;
    }
    for (const g of seeded) {
      drafts.push({
        targetEntityId: member.id,
        targetEntityType: "profile",
        authorId: AUTHOR,
        goalType: g.goalType,
        title: g.title,
        description: g.description,
        status: g.status,
        priority: g.priority,
        alignsToPriorityId: g.alignsToPriorityId,
        daysAgo: g.daysAgo,
      });
    }
  }

  drafts.push(
    ...visionGoalsToDrafts(OTHER_PEOPLE_GOALS, CREW_JANNA_ID, JANNA_GOAL_PLACEMENT, AUTHOR),
    ...visionGoalsToDrafts(PARENT_GOALS, CREW_CHILDREN_ID, CHILDREN_GOAL_PLACEMENT, AUTHOR),
  );

  // Operational goals for locations and orgs
  const LOCATION_AUSTIN = "cc-loc-austin-studio";
  const LOCATION_LA     = "cc-loc-la-office";
  const ORG_4EYE        = "cc-org-4eye-labs";
  const ORG_SCHOOL      = "cc-org-partner-school";

  const operationalDrafts: (Omit<EntityGoal, "id" | "createdAt"> & { daysAgo: number })[] = [
    { targetEntityId: LOCATION_AUSTIN, targetEntityType: "location", authorId: AUTHOR, goalType: "operational", title: "Make Austin Studio the creative nerve center", description: "Build out the studio with proper recording, editing, and collaboration infrastructure.", status: "active", priority: "high", daysAgo: 14 },
    { targetEntityId: LOCATION_AUSTIN, targetEntityType: "location", authorId: AUTHOR, goalType: "operational", title: "Host monthly team showcase nights", description: "Regular in-person demos to keep the team aligned and energized.", status: "active", priority: "medium", daysAgo: 7 },
    { targetEntityId: LOCATION_LA,     targetEntityType: "location", authorId: AUTHOR, goalType: "operational", title: "Activate LA Office for media partnerships", description: "Stand up the LA office to support content creation and influencer partnerships.", status: "paused", priority: "medium", daysAgo: 30 },
    { targetEntityId: ORG_4EYE,        targetEntityType: "organization", authorId: AUTHOR, goalType: "operational", title: "Ship 4eye MVP by end of year", description: "Reach feature-complete MVP: AI companion, gamified learning, and core tiles.", status: "active", priority: "high", daysAgo: 60 },
    { targetEntityId: ORG_4EYE,        targetEntityType: "organization", authorId: AUTHOR, goalType: "operational", title: "Establish weekly engineering rhythm", description: "Regular sprint reviews, demos, and retrospectives to maintain velocity.", status: "active", priority: "medium", daysAgo: 21 },
    { targetEntityId: ORG_SCHOOL,      targetEntityType: "organization", authorId: AUTHOR, goalType: "operational", title: "Onboard first pilot classroom", description: "Get 4eye running live in one classroom as a proof-of-concept.", status: "active", priority: "high", daysAgo: 10 },
  ];

  return [
    ...drafts.map((d, i) => ({
      id: d.seedId ?? `cg-seed-${i}`,
      targetEntityId: d.targetEntityId,
      targetEntityType: d.targetEntityType,
      authorId: d.authorId,
      goalType: d.goalType,
      title: d.title,
      description: d.description,
      status: d.status,
      priority: d.priority,
      alignsToPriorityId: d.alignsToPriorityId,
      createdAt: now - d.daysAgo * DAY,
    })),
    ...operationalDrafts.map((d, i) => ({
      id: `cg-op-seed-${i}`,
      targetEntityId: d.targetEntityId,
      targetEntityType: d.targetEntityType,
      authorId: d.authorId,
      goalType: d.goalType,
      title: d.title,
      description: d.description,
      status: d.status,
      priority: d.priority,
      createdAt: now - d.daysAgo * DAY,
    })),
  ];
}

// ─── Work Assignments ─────────────────────────────────────────────────────────

/**
 * Curated business-work offers for My Queue / Crew Tasks.
 *
 * Explicit entity IDs (not array indices) so reordering the campaign graph does
 * not reshuffle who is asked to do what. Focus: Brand Intro / See film + a few
 * adjacent launch implementations. PerspectiveSwitcher (Business ↔ Person) still
 * filters goals; this seed is the work/business angle for the swipe deck.
 */
export function seedAssignments(entities: Entity[]): Assignment[] {
  if (CREW.length === 0) return [];

  const known = new Set(entities.map((e) => e.id));
  const now = Date.now();
  const DAY = 1000 * 60 * 60 * 24;
  const MATTHEW = "PROFILE_MATTHEW";

  /** [entityId, profileId, state, daysAgo] */
  const plan: Array<[string, string, Assignment["state"], number]> = [
    // Hero queue — Creating the Intro Video for 4eye Perfectly (+ See pipeline)
    ["cc-action-intro-video-perfectly", MATTHEW, "offered", 0],
    ["cc-action-lock-style-refs", MATTHEW, "offered", 1],
    ["cc-action-scene1-hud-reveal", MATTHEW, "offered", 2],
    ["cc-action-cut-shorts", MATTHEW, "offered", 3],
    ["cc-action-embed-see-page", MATTHEW, "offered", 4],
    ["cc-action-website-launch-ready", MATTHEW, "offered", 5],
    ["cc-action-services-site-mvp", MATTHEW, "offered", 6],
    ["cc-action-record-vision-take", MATTHEW, "accepted", 2],
    // Creative parents already in flight / review
    ["cc-seq-platform-launch", MATTHEW, "accepted", 8],
    ["cc-scene-classroom-reveal", MATTHEW, "offered", 7],
    ["cc-proj-classroom-tomorrow", MATTHEW, "accepted", 10],
    ["cc-god-launch-trailer", MATTHEW, "offered", 12],
    ["cc-god-classroom-campaign", MATTHEW, "offered", 13],
  ];

  const out: Assignment[] = [];
  for (const [entityId, profileId, state, daysAgo] of plan) {
    if (!known.has(entityId)) continue;
    out.push({
      entityId,
      profileId,
      state,
      assignedAt: now - daysAgo * DAY,
    });
  }
  return out;
}
