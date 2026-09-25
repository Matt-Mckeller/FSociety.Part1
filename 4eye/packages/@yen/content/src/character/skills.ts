
/**
 * Character — Skills / Mastery Tree model.
 *
 * Skills sit at the intersection of attributes, perks, and traits — they
 * represent unlocked **competencies** rather than raw stats or passive bonuses.
 * Organized in a DAG where higher-tier skills require lower-tier prerequisites
 * at certain thresholds. Each skill has a tier (0 = root, ascending = harder).
 */

export type SkillStatus = "locked" | "available" | "unlocked";
export type SkillSource = "attribute" | "perk" | "trait";

export interface SkillRequirement {
  type: SkillSource;
  id: string;
  /** Attribute value threshold, or trait/perk tier index. */
  threshold: number;
  label: string;
}

export interface SkillNode {
  id: string;
  label: string;
  description: string;
  effect: string;
  tier: number;
  color: string;
  emoji: string;
  requires: SkillRequirement[];
  unlocks: string[];
  status: SkillStatus;
}

export const SKILL_TREE: SkillNode[] = [
  // ── Tier 0 — Foundation ────────────────────────────────────────────────────
  {
    id: "deep-focus",
    label: "Deep Focus",
    description: "Sustain unbroken attention for 90+ minutes on a single task.",
    effect: "Focus efficiency ×1.5. Distraction cost halved.",
    tier: 0,
    color: "#06b6d4",
    emoji: "🎯",
    requires: [{ type: "attribute", id: "focus", threshold: 50, label: "Focus ≥ 50" }],
    unlocks: ["flow-architect", "hyper-learning"],
    status: "unlocked",
  },
  {
    id: "pattern-mind",
    label: "Pattern Mind",
    description: "Recognize structural patterns across domains rapidly.",
    effect: "Learning speed ×1.3. Connects concepts 40% faster.",
    tier: 0,
    color: "#4F46E5",
    emoji: "🧩",
    requires: [{ type: "attribute", id: "intelligence", threshold: 55, label: "Intelligence ≥ 55" }],
    unlocks: ["systems-architect", "meta-learner"],
    status: "unlocked",
  },
  {
    id: "emotional-read",
    label: "Emotional Read",
    description: "Sense the emotional subtext in any room or conversation.",
    effect: "Relationship actions gain +15 context quality.",
    tier: 0,
    color: "#f43f5e",
    emoji: "💡",
    requires: [{ type: "attribute", id: "empathy", threshold: 50, label: "Empathy ≥ 50" }],
    unlocks: ["resonant-leadership", "conflict-alchemy"],
    status: "unlocked",
  },
  {
    id: "iron-will",
    label: "Iron Will",
    description: "Execute difficult commitments without relying on motivation.",
    effect: "Habit completion requires 30% less effort.",
    tier: 0,
    color: "#0EA5E9",
    emoji: "🛡️",
    requires: [{ type: "attribute", id: "willpower", threshold: 50, label: "Willpower ≥ 50" }],
    unlocks: ["discipline-engine", "pressure-immunity"],
    status: "unlocked",
  },

  // ── Tier 1 — Developing ────────────────────────────────────────────────────
  {
    id: "flow-architect",
    label: "Flow Architect",
    description: "Design your environment and schedule to enter Synthesis Lock reliably.",
    effect: "Synthesis Lock buff activates 2× per day. Duration +1hr.",
    tier: 1,
    color: "#7c3aed",
    emoji: "🌊",
    requires: [
      { type: "attribute", id: "focus", threshold: 65, label: "Focus ≥ 65" },
      { type: "attribute", id: "discipline", threshold: 45, label: "Discipline ≥ 45" },
    ],
    unlocks: ["peak-performance"],
    status: "available",
  },
  {
    id: "hyper-learning",
    label: "Hyper Learning",
    description: "Process complex material in a fraction of normal time.",
    effect: "Learning rate ×2. Skill tree unlock costs −20%.",
    tier: 1,
    color: "#d97706",
    emoji: "⚡",
    requires: [
      { type: "attribute", id: "focus", threshold: 60, label: "Focus ≥ 60" },
      { type: "attribute", id: "intelligence", threshold: 60, label: "Intelligence ≥ 60" },
    ],
    unlocks: ["meta-learner"],
    status: "available",
  },
  {
    id: "systems-architect",
    label: "Systems Architect",
    description: "Build frameworks and processes that compound over time.",
    effect: "Planning actions grant +25 XP. Systems run at 80% efficiency without supervision.",
    tier: 1,
    color: "#1e293b",
    emoji: "🏗️",
    requires: [
      { type: "attribute", id: "intelligence", threshold: 65, label: "Intelligence ≥ 65" },
      { type: "attribute", id: "discipline", threshold: 50, label: "Discipline ≥ 50" },
    ],
    unlocks: ["peak-performance"],
    status: "unlocked",
  },
  {
    id: "resonant-leadership",
    label: "Resonant Leadership",
    description: "Lead through genuine connection rather than authority.",
    effect: "Team morale +20. Followers gain +10 to their primary attribute.",
    tier: 1,
    color: "#e11d48",
    emoji: "🌟",
    requires: [
      { type: "attribute", id: "empathy", threshold: 60, label: "Empathy ≥ 60" },
      { type: "attribute", id: "charisma", threshold: 55, label: "Charisma ≥ 55" },
    ],
    unlocks: ["sovereign-presence"],
    status: "available",
  },
  {
    id: "discipline-engine",
    label: "Discipline Engine",
    description: "Your habits run automatically without willpower expenditure.",
    effect: "Daily routines complete with zero friction. Streak breaks don't reset.",
    tier: 1,
    color: "#16a34a",
    emoji: "⚙️",
    requires: [
      { type: "attribute", id: "willpower", threshold: 60, label: "Willpower ≥ 60" },
      { type: "attribute", id: "discipline", threshold: 55, label: "Discipline ≥ 55" },
    ],
    unlocks: ["peak-performance"],
    status: "locked",
  },
  {
    id: "conflict-alchemy",
    label: "Conflict Alchemy",
    description: "Transform tension into growth and stronger alignment.",
    effect: "Conflict events resolve positively 70% of the time.",
    tier: 1,
    color: "#f59e0b",
    emoji: "🔥",
    requires: [
      { type: "attribute", id: "empathy", threshold: 55, label: "Empathy ≥ 55" },
      { type: "attribute", id: "wisdom", threshold: 50, label: "Wisdom ≥ 50" },
    ],
    unlocks: ["sovereign-presence"],
    status: "locked",
  },
  {
    id: "meta-learner",
    label: "Meta Learner",
    description: "Learn how to learn more effectively across every domain.",
    effect: "All skills unlock 30% faster. Mental models transfer between domains.",
    tier: 1,
    color: "#0891b2",
    emoji: "🧠",
    requires: [
      { type: "attribute", id: "intelligence", threshold: 70, label: "Intelligence ≥ 70" },
      { type: "attribute", id: "adaptability", threshold: 55, label: "Adaptability ≥ 55" },
    ],
    unlocks: ["peak-performance", "sovereign-presence"],
    status: "locked",
  },
  {
    id: "pressure-immunity",
    label: "Pressure Immunity",
    /*
      Was "perform at peak regardless of stakes" — which was not true, and not
      even the goal. Pressure is survivable, not fuel: the honest version is
      that it stops being the thing that decides the outcome. What actually
      raises the ceiling is a better environment and real motivation, so the
      perk says so rather than implying none of that is needed.
    */
    description: "Perform well under pressure — stakes and deadlines stop setting the ceiling.",
    effect:
      "High-pressure tasks no longer apply debuffs. Peak output still comes from an improved environment and genuine motivation, which stack on top of this.",
    tier: 1,
    color: "#dc2626",
    emoji: "💎",
    requires: [
      { type: "attribute", id: "willpower", threshold: 65, label: "Willpower ≥ 65" },
      { type: "attribute", id: "endurance", threshold: 55, label: "Endurance ≥ 55" },
    ],
    unlocks: ["peak-performance"],
    status: "locked",
  },

  // ── Tier 2 — Mastery ───────────────────────────────────────────────────────
  {
    id: "peak-performance",
    label: "Peak Performance",
    description: "Operating at full capacity is your baseline, not your ceiling.",
    effect: "All attribute caps raised by +10. Daily energy regenerates fully.",
    tier: 2,
    color: "#d97706",
    emoji: "🏆",
    requires: [
      { type: "attribute", id: "focus", threshold: 75, label: "Focus ≥ 75" },
      { type: "attribute", id: "discipline", threshold: 65, label: "Discipline ≥ 65" },
      { type: "attribute", id: "willpower", threshold: 65, label: "Willpower ≥ 65" },
    ],
    unlocks: ["sovereign-mind"],
    status: "locked",
  },
  {
    id: "sovereign-presence",
    label: "Sovereign Presence",
    description: "Your presence alone shifts the energy and direction of any room.",
    effect: "Charisma and Empathy effectively +15 in all social contexts.",
    tier: 2,
    color: "#7c3aed",
    emoji: "👑",
    requires: [
      { type: "attribute", id: "charisma", threshold: 75, label: "Charisma ≥ 75" },
      { type: "attribute", id: "wisdom", threshold: 70, label: "Wisdom ≥ 70" },
    ],
    unlocks: ["sovereign-mind"],
    status: "locked",
  },

  // ── Tier 3 — Legend ────────────────────────────────────────────────────────
  {
    id: "sovereign-mind",
    label: "Sovereign Mind",
    description: "Complete integration of intellect, will, empathy, and creative power.",
    effect: "All attributes gain +20. Character radiates at maximum aura capacity.",
    tier: 3,
    color: "#4F46E5",
    emoji: "✦",
    requires: [
      { type: "attribute", id: "intelligence", threshold: 85, label: "Intelligence ≥ 85" },
      { type: "attribute", id: "wisdom", threshold: 80, label: "Wisdom ≥ 80" },
      { type: "attribute", id: "willpower", threshold: 80, label: "Willpower ≥ 80" },
    ],
    unlocks: [],
    status: "locked",
  },
];

/** Map from skill ID to the node for fast lookup. */
export const SKILL_MAP: Record<string, SkillNode> = Object.fromEntries(
  SKILL_TREE.map((n) => [n.id, n]),
);

/** All nodes that feed into a given node (its parents). */
export function parentsOf(nodeId: string): SkillNode[] {
  return SKILL_TREE.filter((n) => n.unlocks.includes(nodeId));
}

/** Tiers present in the tree (ascending). */
export const SKILL_TIERS = [...new Set(SKILL_TREE.map((n) => n.tier))].sort((a, b) => a - b);
