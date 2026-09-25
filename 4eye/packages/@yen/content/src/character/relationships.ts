/**
 * Character — Relationships model.
 *
 * Tracks the character's connections to people: emotional tone, bond strength,
 * interaction recency, and connection type. People link to CREW / PROFILES_SEED
 * via real `PROFILE_*` ids so Command Center crew deep-links can resolve.
 *
 * Presence and role let the graph surface seats that are *occupied but not
 * local* — the remote queen piece — without pretending the panel is finished.
 *
 * Protected legal names stay off this seed; cover usernames / public labels only.
 */

import { worldImprovementGoals } from "./shared-goals";

export { WORLD_IMPROVEMENT_GOALS, worldImprovementGoals } from "./shared-goals";
export type { WorldImprovementGoal } from "./shared-goals";

export type RelationshipType =
  | "mentor"
  | "friend"
  | "collaborator"
  | "rival"
  | "family"
  | "partner"
  | "acquaintance";

/** Where the person sits relative to daily life. */
export type RelationshipPresence = "local" | "remote" | "dormant";

/**
 * Named seats on the graph. `queen` is the partner throne — filled remotely
 * even when the rest of the web is still rebuilding.
 */
export type RelationshipRole = "queen" | "anchor";

export const RELATIONSHIP_TYPE_META: Record<
  RelationshipType,
  { label: string; color: string; emoji: string; blurb: string }
> = {
  mentor:       { label: "Mentor",        color: "#9f1239", emoji: "🧠", blurb: "Challenges and widens the frame" },
  friend:       { label: "Friend",        color: "#fb7185", emoji: "🤝", blurb: "Energy and belonging without a project" },
  collaborator: { label: "Collaborator",  color: "#be123c", emoji: "⚡", blurb: "Shared work, shared shipping" },
  rival:        { label: "Rival",         color: "#c2410c", emoji: "⚔️", blurb: "Pressure that sharpens" },
  family:       { label: "Family",        color: "#e11d48", emoji: "❤️", blurb: "Foundation that does not expire" },
  partner:      { label: "Partner",       color: "#be185d", emoji: "💫", blurb: "The combined-life seat" },
  acquaintance: { label: "Acquaintance",  color: "#64748b", emoji: "👋", blurb: "Known, not yet weighted" },
};

export const PRESENCE_META: Record<RelationshipPresence, { label: string; hint: string }> = {
  local:   { label: "Local",   hint: "In the room — regular contact" },
  remote:  { label: "Remote",  hint: "Present in the map, not in the room" },
  dormant: { label: "Dormant", hint: "Bond held; contact paused" },
};

export interface RelationshipEntry {
  id: string;
  /** Links to a CREW member's profileId (`PROFILE_*`). */
  profileId: string;
  name: string;
  type: RelationshipType;
  /** Bond strength 0–100. */
  strength: number;
  /** Emotional tone: -100 (very tense) to +100 (very warm). */
  valence: number;
  /** Default local when omitted. */
  presence?: RelationshipPresence;
  /** Named seat — queen is the remote partner piece. */
  role?: RelationshipRole;
  lastInteractionAt?: number;
  tags?: string[];
  sharedGoals?: string[];
  /*
    The three annotation fields below are declared but carry no values in this
    seed. They were planner notes about real, named people — a free-text read,
    goals attributed to the partner seat, and one-sided goals toward them — and
    this module is bundled and sent to every visitor's browser, so a display
    condition in the component could not keep them off the wire.

    The values moved verbatim to `./relationships.private.ts`, which nothing
    imports. See that file for how to read them back in a local planner run.
  */
  notes?: string;
  mmGoals?: string[];
  queenGoals?: string[];
}

const now = Date.now();
const DAY = 86_400_000;

export const RELATIONSHIPS_SEED: RelationshipEntry[] = [
  {
    id: "rel-queen",
    profileId: "PROFILE_EMIRU",
    name: "QueenSeat",
    type: "partner",
    strength: 82,
    valence: 88,
    presence: "remote",
    role: "queen",
    lastInteractionAt: now - 40 * DAY,
    tags: ["queen", "remote", "combined-life", "want", "fishing", "remap", "team", "amplify"],
    sharedGoals: [
      "Work with him as a team",
      "Combined life",
      "Clarify the real conversation",
      "Remap who she is",
      ...worldImprovementGoals(),
    ],
  },
  {
    id: "rel-emily",
    profileId: "PROFILE_EMILY",
    name: "Emily Cart",
    type: "partner",
    strength: 78,
    valence: 84,
    presence: "remote",
    lastInteractionAt: now - 12 * DAY,
    tags: ["agi-rib", "love-formula", "teach", "create", "help", "pur-meow", "4up"],
    sharedGoals: [
      "Grow content",
      "Teach gamers",
      "Help food/children",
      "Love.Perfectly()",
      "Pur Meow takeover · 4up",
    ],
  },
  {
    id: "rel-xemocat",
    profileId: "PROFILE_XEMOCAT",
    name: "xEmoCat",
    type: "partner",
    strength: 70,
    valence: 75,
    presence: "remote",
    lastInteractionAt: now - 25 * DAY,
    tags: ["cover", "protected-name", "remap", "love-example"],
    sharedGoals: ["Bond without outing", "Alias discipline"],
  },
  {
    id: "rel-redhead",
    profileId: "PROFILE_REDHEAD",
    name: "Redhead Shorty",
    type: "acquaintance",
    strength: 42,
    valence: 60,
    presence: "dormant",
    lastInteractionAt: now - 200 * DAY,
    tags: ["shallow", "pc-agi", "sample", "work"],
    sharedGoals: ["Keep light"],
  },
  {
    id: "rel-6",
    profileId: "PROFILE_MATTHEW",
    name: "Matthew McKeller",
    type: "family",
    strength: 95,
    valence: 92,
    presence: "local",
    role: "anchor",
    lastInteractionAt: now - 0 * DAY,
    tags: ["self", "anchor", "foundation"],
    sharedGoals: ["Ship yen", "Love.Perfectly()", "Fund the vision"],
  },
];
