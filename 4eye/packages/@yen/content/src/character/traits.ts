
/**
 * Character — Traits model.
 *
 * Traits are standing passives — innate or cultivated qualities, distinct from
 * auras (external radiance) and perks (earned abilities). Labels are base
 * commands — Curiosity.Seek(), Desire.Burn() — with no seeded arguments.
 * Example degrees live on hover as an open set, not a closed list.
 *
 * Equippable like auras: each has a 4-degree ladder, a glyph, and a color.
 * Higher tiers can grant attribute bonuses.
 */

export interface TraitExamples {
  /** What the examples are of — "curiosity", "personality", "chase", … */
  of: string;
  items: string[];
}

export interface TraitMeta {
  id: string;
  /** Base command only — Curiosity.Seek(), never a prose title. */
  label: string;
  /** What this trait says about the character. */
  description: string;
  /** Tier names from lowest to highest. */
  degrees: [string, string, string, string];
  /** What is unlocked / amplified at max tier. */
  maxEffect?: string;
  /** Hex accent color. */
  color: string;
  /** Attribute boost at max tier, if any. */
  attributeBoosts?: Array<{ id: string; label: string; delta: number }>;
  /**
   * Example degrees shown on hover. The trait is open; these illustrate
   * the kind of expression, they do not limit it.
   */
  examples?: TraitExamples;
}

/** Hover copy: short description, then examples as an open set. */
export function traitHoverHint(trait: Pick<TraitMeta, "description" | "examples">): string {
  const lead = trait.description.replace(/[. ]+$/, "");
  if (!trait.examples?.items.length) return lead;
  const listed = trait.examples.items.join(", ");
  return `${lead}. These are some examples, not limited to these types of ${trait.examples.of}: ${listed}.`;
}

export type TraitProgress = Record<string, number>; // trait id → degree index, or -1 locked

export const TRAITS: TraitMeta[] = [
  {
    id: "curious",
    label: "Curiosity.Seek()",
    description: "A relentless pull toward the unknown — questions fuel the engine.",
    degrees: ["Interested", "Engaged", "Obsessed", "All-Knowing"],
    maxEffect: "+20 Intelligence. Questions generate 2× context.",
    color: "#4F46E5",
    attributeBoosts: [{ id: "intelligence", label: "Intelligence", delta: 20 }],
    examples: { of: "curiosity", items: ["interested", "engaged", "obsessed", "all-knowing"] },
  },
  {
    id: "brilliant",
    label: "Mind.Brilliant()",
    description: "Connects dots others don't see. Concepts click fast and deep.",
    degrees: ["Sharp", "Smart", "Brilliant", "Genius"],
    maxEffect: "+20 Intelligence, +15 Wisdom.",
    color: "#d97706",
    attributeBoosts: [
      { id: "intelligence", label: "Intelligence", delta: 20 },
      { id: "wisdom", label: "Wisdom", delta: 15 },
    ],
    examples: { of: "brilliance", items: ["sharp", "smart", "brilliant", "genius"] },
  },
  {
    id: "infectious-personality",
    label: "Personality.Infect()",
    description: "Energy fills a room. People leave better than when they arrived.",
    degrees: ["Charming", "Magnetic", "Irresistible", "Legendary"],
    maxEffect: "+25 Charisma. Presence boosts nearby characters.",
    color: "#e11d48",
    attributeBoosts: [{ id: "charisma", label: "Charisma", delta: 25 }],
    examples: { of: "personality", items: ["charming", "magnetic", "irresistible", "legendary"] },
  },
  {
    id: "perfectionist",
    label: "Craft.Perfect()",
    description: "The standard is the ceiling — and the ceiling keeps rising.",
    degrees: ["Detail-Oriented", "Meticulous", "Obsessive", "Flawless"],
    maxEffect: "+15 Discipline, +15 Focus. Output quality ×1.3.",
    color: "#0891b2",
    attributeBoosts: [
      { id: "discipline", label: "Discipline", delta: 15 },
      { id: "focus", label: "Focus", delta: 15 },
    ],
    examples: { of: "craft", items: ["detail-oriented", "meticulous", "obsessive", "flawless"] },
  },
  {
    id: "dreamer",
    label: "Vision.Dream()",
    description: "Sees what could be where others see only what is.",
    degrees: ["Wishful", "Visionary", "Prophetic", "Reality-Warper"],
    maxEffect: "+20 Creativity. Visionary goals unlock hidden quest branches.",
    color: "#7c3aed",
    attributeBoosts: [{ id: "creativity", label: "Creativity", delta: 20 }],
    examples: { of: "vision", items: ["wishful", "visionary", "prophetic", "reality-warper"] },
  },
  {
    id: "desire",
    label: "Desire.Burn()",
    description: "Burning want that converts into relentless forward motion.",
    degrees: ["Wanting", "Craving", "Burning", "Consumed"],
    maxEffect: "+20 Willpower. Motivated actions have 0% energy decay.",
    color: "#f97316",
    attributeBoosts: [{ id: "willpower", label: "Willpower", delta: 20 }],
    examples: { of: "desire", items: ["wanting", "craving", "burning", "consumed"] },
  },
  {
    id: "hilarious",
    label: "Humor.Land()",
    description: "Finds the absurd truth in everything. Laughter is strategy.",
    degrees: ["Amusing", "Funny", "Hilarious", "Comedy Legend"],
    maxEffect: "+20 Charisma, +10 Empathy. Stress events have reduced impact.",
    color: "#f59e0b",
    attributeBoosts: [
      { id: "charisma", label: "Charisma", delta: 20 },
      { id: "empathy", label: "Empathy", delta: 10 },
    ],
    examples: { of: "humor", items: ["amusing", "funny", "hilarious", "comedy legend"] },
  },
  {
    id: "empathic",
    label: "Empathy.Feel()",
    description: "Feels the room. Senses what words never say.",
    degrees: ["Sensitive", "Attuned", "Resonant", "One"],
    maxEffect: "+25 Empathy. Relationship events grant bonus XP.",
    color: "#f43f5e",
    attributeBoosts: [{ id: "empathy", label: "Empathy", delta: 25 }],
    examples: { of: "empathy", items: ["sensitive", "attuned", "resonant", "one"] },
  },
  {
    id: "secure",
    label: "Security.Hold()",
    description:
      "The perimeter is already up. Safety is a standing condition, not a reaction — you stay secure.",
    degrees: ["Aware", "Guarded", "Secure", "Impenetrable"],
    maxEffect: "+20 Endurance, +15 Willpower. Shield stays on — first daily threat is absorbed.",
    color: "#38bdf8",
    attributeBoosts: [
      { id: "endurance", label: "Endurance", delta: 20 },
      { id: "willpower", label: "Willpower", delta: 15 },
    ],
    examples: { of: "security", items: ["aware", "guarded", "secure", "impenetrable"] },
  },
  {
    id: "resilient",
    label: "Resilience.Hold()",
    description: "Bounces forward, not back. Setbacks are signal, not stop.",
    degrees: ["Recovering", "Steady", "Unbreakable", "Antifragile"],
    maxEffect: "+15 Endurance, +15 Willpower. Debuffs last 50% shorter.",
    color: "#16a34a",
    attributeBoosts: [
      { id: "endurance", label: "Endurance", delta: 15 },
      { id: "willpower", label: "Willpower", delta: 15 },
    ],
    examples: { of: "resilience", items: ["recovering", "steady", "unbreakable", "antifragile"] },
  },
  {
    id: "strategic",
    label: "Strategy.See()",
    description: "Sees five moves ahead. Patience is their secret weapon.",
    degrees: ["Tactical", "Calculated", "Strategic", "Grand Master"],
    maxEffect: "+20 Wisdom, +15 Intelligence. Planning tasks grant double XP.",
    color: "#1e293b",
    attributeBoosts: [
      { id: "wisdom", label: "Wisdom", delta: 20 },
      { id: "intelligence", label: "Intelligence", delta: 15 },
    ],
    examples: { of: "strategy", items: ["tactical", "calculated", "strategic", "grand master"] },
  },
  {
    id: "attached",
    label: "Bond.Attach()",
    description:
      "Incredibly attached to people, outcomes, and things that matter — bond depth is a strength and a risk.",
    degrees: ["Loyal", "Bonded", "Fused", "Unbreakable"],
    maxEffect: "+25 Willpower when defending what you love. Vulnerability rises with bond strength.",
    color: "#be123c",
    attributeBoosts: [{ id: "willpower", label: "Willpower", delta: 15 }],
    examples: { of: "attachment", items: ["loyal", "bonded", "fused", "unbreakable"] },
  },
  {
    id: "chasing",
    label: "Chase.Run()",
    description: "Runs toward the want. Pursuit is a habit — useful when aimed, costly when not.",
    degrees: ["Seeking", "Pursuing", "Hunting", "Unrelenting"],
    maxEffect: "+20 Focus on pursuit goals. Risk of tunnel vision when intensity peaks.",
    color: "#ea580c",
    attributeBoosts: [{ id: "focus", label: "Focus", delta: 15 }],
    examples: { of: "chase", items: ["seeking", "pursuing", "hunting", "unrelenting"] },
  },
  {
    id: "competitive",
    label: "Compete.Win()",
    description: "Keeps score. Turns games, work, and love into arenas worth winning.",
    degrees: ["Driven", "Contending", "Dominant", "Champion"],
    maxEffect: "+20 Charisma in contested spaces. Rivalry XP multiplier ×1.3.",
    color: "#ca8a04",
    attributeBoosts: [{ id: "charisma", label: "Charisma", delta: 15 }],
    examples: { of: "competition", items: ["driven", "contending", "dominant", "champion"] },
  },
];

const LOCKED = -1;

export const TRAIT_PROGRESS_SEED: TraitProgress = {
  curious: 3,
  brilliant: 2,
  "infectious-personality": 1,
  perfectionist: 2,
  dreamer: 3,
  desire: 2,
  hilarious: 1,
  empathic: LOCKED,
  secure: 3,
  resilient: 1,
  strategic: LOCKED,
  attached: 2,
  chasing: 2,
  competitive: 2,
};

/** Cost in Influence (✦) per trait tier step. */
export const TRAIT_DEGREE_COSTS = [80, 200, 500, 1200] as const;

export function traitNextCost(level: number): number | null {
  if (level >= 3) return null;
  return TRAIT_DEGREE_COSTS[level + 1] ?? null;
}
