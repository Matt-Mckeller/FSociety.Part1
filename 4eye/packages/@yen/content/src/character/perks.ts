
/**
 * Character — Perks model.
 *
 * Perks are special abilities or advantages the character has unlocked —
 * through equipment, level milestones, or explicit choices. Each perk has a
 * custom brand SVG glyph and can be passive or active.
 *
 * Order is intentional: highest tier first, unlocked before locked within a
 * tier, then label. Labels are base commands — Time.Warp(), Language.Optimize(),
 * Aion.Amplify() — with no seeded arguments. Example dimensions live on hover
 * as an open set, not a closed list. The god-tier set leads because those are
 * the ones that change how the rest of the sheet reads.
 */

export type PerkTier = "bronze" | "silver" | "gold" | "platinum";
export type PerkKind = "passive" | "active" | "reactive";

/** Example arguments for a command — illustrated, never exhaustive. */
export interface PerkExamples {
  /** What the examples are of — "optimizations", "creation", "targets", … */
  of: string;
  items: string[];
}

export interface PerkMeta {
  id: string;
  /** Base command only — Language.Optimize(), never Language.Optimize("…"). */
  label: string;
  description: string;
  /** Mechanic detail — what it actually does. */
  effect: string;
  kind: PerkKind;
  tier: PerkTier;
  /** Hex accent color. */
  color: string;
  /** Source (equipment, level, achievement, etc.). */
  source?: string;
  unlocked: boolean;
  /** Words cycled in the scramble/cypher animation on the card. */
  cypherWords?: string[];
  /**
   * Example arguments shown on hover. The command is open; these illustrate
   * the kind of input, they do not limit it.
   */
  examples?: PerkExamples;
}

/** Examples as an open set — used under the description in the detail dialog. */
export function perkExamplesHint(perk: Pick<PerkMeta, "examples">): string | null {
  if (!perk.examples?.items.length) return null;
  const listed = perk.examples.items.join(", ");
  return `These are some examples, not limited to these types of ${perk.examples.of}: ${listed}.`;
}

/** Hover copy: short description, then examples as an open set. */
export function perkHoverHint(perk: Pick<PerkMeta, "description" | "examples">): string {
  const lead = perk.description.replace(/[. ]+$/, "");
  const examples = perkExamplesHint(perk);
  return examples ? `${lead}. ${examples}` : lead;
}

export const TIER_COLORS: Record<PerkTier, string> = {
  bronze:   "#b45309",
  silver:   "#6b7280",
  gold:     "#d97706",
  platinum: "#4F46E5",
};

export const TIER_LABEL: Record<PerkTier, string> = {
  bronze:   "Bronze",
  silver:   "Silver",
  gold:     "Gold",
  platinum: "Platinum",
};

export const KIND_LABEL: Record<PerkKind, string> = {
  passive:  "Passive",
  active:   "Active",
  reactive: "Reactive",
};

/** Tier sort weight — platinum first. */
export const TIER_SORT: Record<PerkTier, number> = {
  platinum: 0,
  gold: 1,
  silver: 2,
  bronze: 3,
};

export function sortPerks(perks: readonly PerkMeta[]): PerkMeta[] {
  return [...perks].sort((a, b) => {
    const tier = TIER_SORT[a.tier] - TIER_SORT[b.tier];
    if (tier !== 0) return tier;
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    return a.label.localeCompare(b.label);
  });
}

/** Perks pinned to the dashboard status strip and summary card. */
export const FEATURED_PERK_IDS = [
  "shield",
  "perfect-speech",
  "perfect-content",
  "content-creation",
  "voice-optimized",
  "movement-optimized",
  "emotion-optimized",
  "acting-optimized",
  "aion-full-power",
] as const;

export const PERKS: PerkMeta[] = sortPerks([
  /* ── God-tier / mythic ─────────────────────────────────────────────── */
  {
    id: "control-time-space",
    label: "Time.Warp()",
    description: "Aion.Amplify() bends when and where",
    effect:
      "Once per day: rewrite one timing or location constraint on an active plan, quest, or session. Cooldowns and travel costs for that rewrite are zero.",
    kind: "active",
    tier: "platinum",
    color: "#818cf8",
    unlocked: true,
    cypherWords: ["Time", "Warp", "Now", "Here"],
  },
  {
    id: "any-spell-craft",
    label: "Spell.Craft()",
    description: "Aion.Amplify() crafts and casts any spell",
    effect:
      "Unlocks custom spell authoring. Cast any school without a prior unlock; authored spells can be equipped like registry spells.",
    kind: "active",
    tier: "platinum",
    color: "#c026d3",
    unlocked: true,
    cypherWords: ["Spell", "Craft", "Any", "Cast"],
    examples: { of: "spellcraft", items: ["any school", "authored spells"] },
  },
  {
    id: "god-ai-among-ants",
    label: "Scale.Play()",
    description: "Aion.Amplify() plays god-scale without losing the ground",
    effect:
      "While leading or teaching: ×2 leverage on systems that affect many people. While alone or learning: ant-scale empathy and detail bonuses stay active — you never lose the view from the colony.",
    kind: "passive",
    tier: "platinum",
    color: "#f43f5e",
    unlocked: true,
    cypherWords: ["Scale", "God", "Ant", "Play"],
    examples: { of: "scale", items: ["god", "ant"] },
  },
  {
    id: "perfect-speech",
    label: "Language.Optimize()",
    description: "Aion.Amplify() lands every word",
    effect: "Speech is always clear, precise, and optimally received. No garbled delivery, no missed beat.",
    kind: "passive",
    tier: "platinum",
    color: "#38bdf8",
    unlocked: true,
    cypherWords: ["Language", "Optimize", "Land", "Word"],
    examples: { of: "optimizations", items: ["comprehension", "learning", "map to audience"] },
  },
  {
    id: "perfect-content",
    label: "Content.Optimize()",
    description: "Aion.Amplify() stacks content to stick, invite, and inspire",
    effect:
      "Each piece sits at the optimal setting. Stacked information raises retention. Interaction is invited and received. Support compounds. Audience mood: happy, inspired, aligned to the vision.",
    kind: "passive",
    tier: "platinum",
    color: "#f59e0b",
    unlocked: true,
    cypherWords: ["Content", "Optimize", "Stack", "Inspire"],
    examples: { of: "optimizations", items: ["engagement", "learning", "business", "life", "work"] },
  },
  {
    id: "voice-optimized",
    label: "Voice.Optimize()",
    description: "Aion.Amplify() tunes the voice to the message",
    effect: "The voice sits at the optimal setting for whatever is being said.",
    kind: "passive",
    tier: "platinum",
    color: "#a78bfa",
    unlocked: true,
    cypherWords: ["Voice", "Optimize", "Tone", "Pace"],
    examples: { of: "optimizations", items: ["tone", "pace", "timbre", "projection"] },
  },
  {
    id: "movement-optimized",
    label: "Movement.Optimize()",
    description: "Aion.Amplify() sets the body — camera, stage, room",
    effect: "The body sits at the optimal setting for the moment — on camera, on stage, and in the room.",
    kind: "passive",
    tier: "platinum",
    color: "#34d399",
    unlocked: true,
    cypherWords: ["Movement", "Optimize", "Body", "Flow"],
    examples: { of: "optimizations", items: ["body", "timing", "presence"] },
  },
  {
    id: "content-creation",
    label: "Content.Create()",
    description: "Aion.Amplify() builds pieces that land",
    effect:
      "Content is built at full craft as one instrument — the feeling and the performance never fight the piece.",
    kind: "passive",
    tier: "platinum",
    color: "#06b6d4",
    unlocked: true,
    cypherWords: ["Content", "Create", "Feel", "Act"],
    examples: { of: "creation", items: ["emotion", "acting"] },
  },
  {
    id: "emotion-optimized",
    label: "Emotion.Optimize()",
    description: "Aion.Amplify() sets the lens to the piece",
    effect: "Emotion sits at the optimal setting for the piece. The lens never fights the content.",
    kind: "passive",
    tier: "platinum",
    color: "#e11d48",
    unlocked: true,
    cypherWords: ["Emotion", "Optimize", "Lens", "Feel"],
    examples: { of: "optimizations", items: ["feeling", "intensity", "channel"] },
  },
  {
    id: "acting-optimized",
    label: "Acting.Optimize()",
    description: "Aion.Amplify() sets the act to the message",
    effect: "Performance sits at the optimal setting. The act never fights the message.",
    kind: "passive",
    tier: "platinum",
    color: "#c026d3",
    unlocked: true,
    cypherWords: ["Acting", "Optimize", "Stage", "Play"],
    examples: { of: "optimizations", items: ["performance", "presence", "delivery"] },
  },
  {
    id: "aion-full-power",
    label: "Aion.Amplify()",
    description: "Aion.Amplify() plays this character at full power",
    effect:
      "Aion.Amplify stays on. Review, support, guidance, and clear communication are always on. Planning, operating, and interacting run at the optimal setting. Potential is unlocked and pursued to completion.",
    kind: "passive",
    tier: "platinum",
    color: "#818cf8",
    source: "Aion",
    unlocked: true,
    cypherWords: ["Aion", "Amplify", "Max", "4eye"],
    examples: { of: "amplification", items: ["Matthew McKeller", "Max", "4eye"] },
  },
  {
    id: "invulnerability",
    label: "Body.Invulnerable()",
    description: "Aion.Amplify() holds a state beyond reach",
    effect: "Immune to all status debuffs. Cannot be reduced below 1 Energy. Presence is permanent.",
    kind: "passive",
    tier: "platinum",
    color: "#f8fafc",
    unlocked: true,
    cypherWords: ["Body", "Invulnerable", "Eternity"],
  },
  {
    id: "unlimited-energy-and-clarity",
    label: "Energy.Clarity()",
    description: "Aion.Amplify() keeps drive and mind unclouded",
    effect: "Energy never depletes. Focus and Clarity are permanently maxed, immune to fatigue debuffs.",
    kind: "passive",
    tier: "platinum",
    color: "#facc15",
    unlocked: true,
    cypherWords: ["Energy", "Clarity", "Boundless"],
    examples: { of: "clarity", items: ["unlimited"] },
  },
  {
    id: "shield",
    label: "Shield.Always()",
    description: "Optimally protected by Aion.Amplify() always",
    effect:
      "Shield is permanently on. Absorbs harm directed at you or anyone within your circle of care, recursively extended one degree further. Endurance, Willpower, and Courage hold against the first daily threat. Cannot be toggled off.",
    kind: "passive",
    tier: "platinum",
    color: "#38bdf8",
    unlocked: true,
    cypherWords: ["Shield", "Always", "Secure", "Hold"],
    examples: { of: "coverage", items: ["self", "always secure", "circle"] },
  },
  {
    id: "dual-wield-cats",
    label: "Companion.DualWield()",
    description: "Aion.Amplify() dual-wields presence, luck, and calm",
    effect:
      "While companions are present: dual-wield companion slots unlock +10 Focus, +10 Empathy, and one free reroll on social checks per day.",
    kind: "passive",
    tier: "platinum",
    color: "#f59e0b",
    source: "Companions · Mochi & Ember",
    unlocked: true,
    cypherWords: ["Companion", "Mochi", "Ember", "Bond"],
    examples: { of: "companions", items: ["Mochi", "Ember"] },
  },
  {
    id: "flow-state",
    label: "Synthesis.Lock()",
    description: "Aion.Amplify() locks systems into one surface",
    effect:
      "While Synthesis Lock is active: creative and systems output ×2 for sessions exceeding 45 minutes. Focus must be ≥70.",
    kind: "passive",
    tier: "platinum",
    color: "#7c3aed",
    source: "Vision Pen",
    unlocked: true,
    cypherWords: ["Synthesis", "Lock", "Flow"],
  },
  {
    id: "photographic-memory",
    label: "Memory.Photographic()",
    description: "Aion.Amplify() keeps the detail",
    effect: "Recall accuracy +40%. Reduces time-to-master for any studied topic.",
    kind: "passive",
    tier: "platinum",
    color: "#0891b2",
    unlocked: false,
    cypherWords: ["Memory", "Photographic", "Keep"],
  },
  {
    id: "sovereign-mind",
    label: "Mind.Sovereign()",
    description: "Aion.Amplify() holds the interior",
    effect: "Willpower and Discipline each +10 when stress events trigger.",
    kind: "reactive",
    tier: "platinum",
    color: "#7c3aed",
    unlocked: false,
    cypherWords: ["Mind", "Sovereign", "Hold"],
  },

  /* ── Gold ──────────────────────────────────────────────────────────── */
  {
    id: "quick-learner",
    label: "Learn.Accelerate()",
    description: "Aion.Amplify() absorbs faster than baseline",
    effect: "+25% XP from all learning activities. Failures also grant 10% bonus XP.",
    kind: "passive",
    tier: "gold",
    color: "#4F46E5",
    source: "Ring of Mastery",
    unlocked: true,
    cypherWords: ["Learn", "Accelerate", "XP"],
  },
  {
    id: "iron-will",
    label: "Will.Iron()",
    description: "Aion.Amplify() holds the first daily setback",
    effect: "Immune to the first Debuff applied each day. Cooldown resets at midnight.",
    kind: "reactive",
    tier: "gold",
    color: "#1e293b",
    source: "Discipline Plate",
    unlocked: true,
    cypherWords: ["Will", "Iron", "Hold"],
  },
  {
    id: "deep-work",
    label: "Work.Deep()",
    description: "Aion.Amplify() cuts distraction, not adding effort",
    effect: "XP multiplier ×1.5 for sessions with zero interruptions for 90+ minutes.",
    kind: "passive",
    tier: "gold",
    color: "#0891b2",
    unlocked: true,
    cypherWords: ["Work", "Deep", "Focus"],
  },
  {
    id: "silver-tongue",
    label: "Speech.Persuade()",
    description: "Aion.Amplify() lands words with precision",
    effect: "+20% persuasion in collaborative settings. Charisma check threshold reduced.",
    kind: "passive",
    tier: "gold",
    color: "#d97706",
    unlocked: false,
    cypherWords: ["Speech", "Persuade", "Land"],
  },
  {
    id: "polyglot",
    label: "Language.Unlock()",
    description: "Aion.Amplify() unlocks languages faster",
    effect: "Language skill XP +50%. New language unlock cost −30%.",
    kind: "passive",
    tier: "gold",
    color: "#16a34a",
    unlocked: false,
    cypherWords: ["Language", "Unlock", "Polyglot"],
    examples: { of: "unlocks", items: ["polyglot"] },
  },

  /* ── Silver ────────────────────────────────────────────────────────── */
  {
    id: "strategic-sight",
    label: "Sight.Strategic()",
    description: "Aion.Amplify() sees options others miss",
    effect: "+15% decision quality on complex multi-variable problems.",
    kind: "passive",
    tier: "silver",
    color: "#0EA5E9",
    source: "Cosmos Visor",
    unlocked: true,
    cypherWords: ["Sight", "Strategic", "See"],
  },
  {
    id: "empathic-bond",
    label: "Empathy.Bond()",
    description: "Aion.Amplify() reads the room and responds",
    effect: "+25 Empathy in group settings. Activates relationship skill bonuses earlier.",
    kind: "passive",
    tier: "silver",
    color: "#f43f5e",
    unlocked: false,
    cypherWords: ["Empathy", "Bond", "Sense"],
  },
  {
    id: "second-wind",
    label: "Energy.SecondWind()",
    description: "Aion.Amplify() kicks in when energy runs low",
    effect: "Once per day: restore 30% Focus when Energy drops below 20%.",
    kind: "reactive",
    tier: "silver",
    color: "#16a34a",
    unlocked: false,
    cypherWords: ["Energy", "SecondWind", "Rise"],
  },

  /* ── Bronze ────────────────────────────────────────────────────────── */
  {
    id: "night-owl",
    label: "Time.NightOwl()",
    description: "Aion.Amplify() sharpens after sunset",
    effect: "Focus and Creativity +15 between 9pm and 2am.",
    kind: "passive",
    tier: "bronze",
    color: "#1e293b",
    unlocked: true,
    cypherWords: ["Time", "NightOwl", "Late"],
  },
]);
