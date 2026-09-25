
/**
 * Character — Status model (RAM + Memory).
 *
 * "RAM" = Current active state: mood, active context, buffs, debuffs,
 * and recent significant events. Analogous to working memory.
 *
 * "Memory" = Mid-term significant events and learnings (journal-style).
 * "Cold Storage" = Long-term formative memories that shaped identity.
 */

import { lifeTimelineAsMemory } from "./life-timeline";

export type MoodLabel =
  | "animated"
  | "spirited"
  | "invigorated"
  | "elated"
  | "optimistic"
  | "playful"
  | "happy"
  | "confident"
  | "curious"
  | "energized"
  | "calm"
  | "focused"
  | "disciplined"
  | "peaceful"
  | "loving"
  | "creative"
  | "content"
  | "neutral"
  | "anxious"
  | "frustrated"
  | "angry"
  | "sad"
  | "despairing";

export type BuffKind = "buff" | "debuff";

/**
 * A pull, not a plan.
 *
 * Mood answers "how am I", and every readout in this system led with it. But
 * mood is a reading of *state* and a want is a reading of *direction*, and
 * direction is what the rest of the profile — goals, next action, the whole
 * Plan tile — is actually for. Someone who is angry and knows what they want is
 * in a completely different position from someone who is angry and does not,
 * and a status strip that only says "angry" cannot tell them apart.
 *
 * Deliberately not goals. A goal is committed, scheduled and owned; a want is
 * none of those and is allowed to be inconvenient, contradictory or unearned.
 * The interesting ones usually are, and flattening them into goals is how they
 * stop being recorded at all.
 */
export interface Want {
  id: string;
  label: string;
  /**
   * Cyphertext cycle for the label — e.g. Em ↔ MM on the bond want.
   * Resting read is `label` (word 0); morph runs in compact UI.
   */
  cypherWords?: string[];
  /** What this actually means, in the first person. */
  description: string;
  /** How strongly it is pulling right now, 0–100. */
  intensity: number;
  color: string;
  /**
   * What is in the way. Naming it is most of the value — an unblocked want is
   * just a task, and a want with no stated obstacle is usually unexamined.
   */
  blockedBy?: string;
  /** Habits, goals or actions elsewhere in the profile that feed it. */
  satisfiedBy?: string[];
  /** Glyph key, drawn rather than an emoji. See `BuffGlyph`. */
  glyph?: string;
  /**
   * Quiet formula marks under the title — the LoveFormula sample variables
   * and character-system counterparts (brain, aura, cats, coin stack, …).
   * Drawn, not emoji. `coin-stack` renders the Expanse CoinStackIcon.
   */
  formula?: Array<{ glyph: string; label: string }>;
  /**
   * Explicit cross-links to goals / priorities — shown as connection chips
   * so a want reads against Love.Perfectly() / Heart.Evolve() (and peers).
   */
  links?: Array<{ label: string; kind: "goal" | "priority" | "redirect" }>;
}

export interface StatusEffect {
  id: string;
  label: string;
  description: string;
  kind: BuffKind;
  /** Hex color for the effect badge. */
  color: string;
  /** Unix ms when the effect expires, or null for permanent. */
  expiresAt?: number | null;
  /** Which attribute(s) it modifies. */
  attributeModifiers?: Array<{ id: string; label: string; delta: number }>;
  /**
   * Drawn glyph key. See `EffectGlyphs` — the glyph takes the effect's colour,
   * which is what separates a buff from a debuff at a glance.
   */
  glyph?: string;
  /** Fallback for effects with no drawn glyph yet. */
  emoji?: string;
  /**
   * Standing / featured effect. Sorted first and drawn with an always-on
   * treatment so it cannot be mistaken for a timed buff.
   */
  important?: boolean;
}

export interface MemoryEntry {
  id: string;
  title: string;
  summary: string;
  /** Unix ms timestamp. */
  occurredAt: number;
  /** How significant 0–100. */
  significance: number;
  /** Emotional valence: positive or negative. */
  valence: "positive" | "negative" | "neutral";
  tags?: string[];
  /**
   * What the event taught. The point of keeping an event at all — an entry
   * without this is just a date.
   */
  learned?: string;
  /** What actually changed as a result. The consequence, not the feeling. */
  result?: string;
}

export interface CharacterStatus {
  /**
   * What the character is pulled toward, strongest first.
   *
   * Read before mood everywhere it is shown. See {@link Want}.
   */
  wants: Want[];
  /** Current primary mood. */
  mood: MoodLabel;
  /** Subjective mood intensity 0–100 (can exceed 100 for overflow states). */
  moodIntensity: number;
  /** Additional simultaneous moods. */
  additionalMoods?: Array<{ id: MoodLabel; intensity: number }>;
  /** Free-text context line (what's happening right now). */
  currentContext: string;
  /** Active buffs and debuffs on the character. */
  effects: StatusEffect[];
  /** RAM: recent significant events, sorted by importance. */
  recentEvents: MemoryEntry[];
  /** Mid-term memory log (weeks to months). */
  memory: MemoryEntry[];
  /** Long-term formative events (cold storage). */
  coldStorage: MemoryEntry[];
}

export const MOOD_META: Record<MoodLabel, {
  label: string;
  color: string;
  valence: "positive" | "negative" | "neutral";
  /** Solid chip fill. Angry reads as a black chip with red type. Energized is black with white type. Optimistic is gray with green type. */
  chipBg?: string;
}> = {
  animated:    { label: "Animated",    color: "#f59e0b", valence: "positive" },
  spirited:    { label: "Spirited",    color: "#ef4444", valence: "positive" },
  invigorated: { label: "Invigorated", color: "#22c55e", valence: "positive" },
  elated:      { label: "Elated",      color: "#d97706", valence: "positive" },
  optimistic:  { label: "Optimistic",  color: "#4ade80", valence: "positive", chipBg: "#4b5563" },
  playful:     { label: "Playful",     color: "#f472b6", valence: "positive" },
  happy:       { label: "Happy",       color: "#16a34a", valence: "positive" },
  confident:   { label: "Confident",   color: "#0ea5e9", valence: "positive" },
  curious:     { label: "Curious",     color: "#8b5cf6", valence: "positive" },
  energized:   { label: "Energized",   color: "#ffffff", valence: "positive", chipBg: "#000000" },
  calm:        { label: "Calm",        color: "#14b8a6", valence: "positive" },
  focused:     { label: "Focused",     color: "#3b82f6", valence: "positive" },
  disciplined: { label: "Disciplined", color: "#4f46e5", valence: "positive" },
  peaceful:    { label: "Peace",       color: "#6366f1", valence: "positive" },
  loving:      { label: "Love",        color: "#e11d48", valence: "positive" },
  creative:    { label: "Creation",    color: "#8b5cf6", valence: "positive" },
  content:     { label: "Content",     color: "#0891b2", valence: "positive" },
  neutral:     { label: "Neutral",     color: "#64748b", valence: "neutral"  },
  anxious:     { label: "Anxious",     color: "#f59e0b", valence: "negative" },
  frustrated:  { label: "Frustrated",  color: "#f97316", valence: "negative" },
  angry:       { label: "Angry",       color: "#ef4444", valence: "negative", chipBg: "#000000" },
  sad:         { label: "Sad",         color: "#6366f1", valence: "negative" },
  despairing:  { label: "Despairing",  color: "#7f1d1d", valence: "negative" },
};

const now = Date.now();
const hr = 3_600_000;
const day = 86_400_000;

export const CHARACTER_STATUS_SEED: CharacterStatus = {
  /*
    Ordered by pull, not by importance — these are what is actually loud right
    now. The blockers are the point of the list: every one of them names
    something specific rather than "time" or "money", because a want blocked by
    an abstraction is a want nobody has looked at properly yet.
  */
  wants: [
    {
      id: "want-bond",
      label: "Em",
      cypherWords: ["Em", "MM"],
      description:
        "The pull is the combined profile — love, companions, ship, teach as one person instead of parallel tracks. Mochi & Ember dual-wielded. Em sits at the end of the partner read as a fishing / remapping construct (desired writing·body·goals), not a locked identity. Sampling still flickers; it is curiosity — not the aim.",
      intensity: 94,
      color: "#e11d48",
      blockedBy:
        "Living the combined profile and naming a person are different moves. Soft-signal is easy; clarity of intent is the hard part. Remap when associations click.",
      satisfiedBy: [
        "Love.Radiance()",
        "Dual-Wielding Cats",
        "%.Relate",
        "%.Connect",
        "Bond Resonance",
        "Fishing for Love, Money, and Fame",
      ],
      links: [
        { label: "Love.Perfectly()", kind: "goal" },
        { label: "Heart.Evolve()", kind: "priority" },
        { label: "Relationships", kind: "redirect" },
      ],
      glyph: "heart",
      formula: [
        { glyph: "brain", label: "Cognition / Brain" },
        { glyph: "aura", label: "Aura" },
        { glyph: "energy", label: "Energy" },
        { glyph: "information", label: "Information" },
        { glyph: "mood", label: "Mood" },
        { glyph: "time", label: "Time" },
        { glyph: "context", label: "Context" },
        { glyph: "situation", label: "Situation" },
        { glyph: "cats", label: "Cats · companions" },
        { glyph: "heart", label: "Love" },
        { glyph: "rib", label: "AGI Rib · Emily" },
        { glyph: "rib-clip", label: "Rib Clip · marketing" },
        { glyph: "pur-meow", label: "Pur Meow · 4up" },
        { glyph: "coin-stack", label: "Money · Expanse coin stack" },
      ],
    },
    {
      id: "want-finish",
      label: "To combine this and explain it properly",
      description:
        "Years of amazing experiences exist — the work now is combining them into one surface, getting help where it counts, and explaining them so someone else can follow.",
      intensity: 90,
      color: "#be123c",
      blockedBy:
        "Volume without priority looks like chaos; the fix is ranking focus and how to learn, not hiding the breadth.",
      satisfiedBy: ["yen walkthroughs", "Synthesis Lock", "Ship yen · teach from it", "%.Learn", "%.Create"],
      glyph: "ship",
    },
    {
      id: "want-money",
      label: "Money.AmplifyMe()",
      description:
        "Amplify income, tokens, and the financial amplification that funds the rest — business as a first-class want, not a guilt sidebar.",
      intensity: 88,
      color: "#c2410c",
      blockedBy: "Shipping without a monetization path still reads as volunteer work.",
      satisfiedBy: ["Gain financial amplification", "%.Business", "Grow() · Achieve()", "Ship.Pod()"],
      links: [
        { label: "Money.AmplifyMe()", kind: "priority" },
        { label: "Relationships · color & layout", kind: "redirect" },
      ],
      glyph: "money",
    },
    {
      id: "want-unlock",
      label: "Power.Max()",
      description: "Aion.Amplify() runs capacity at Max",
      intensity: 86,
      color: "#9f1239",
      blockedBy: "Leaving power unlocked but unused. Max is a setting, not a trophy.",
      satisfiedBy: ["Direction · Priorities", "Power.Max()", "Going after #1"],
      links: [{ label: "Power.Max()", kind: "priority" }],
      glyph: "max",
    },
    {
      id: "want-comprehend",
      label: "Aion.Amplify(Matthew McKeller, Max, 4eye)",
      description: "Aion.Amplify() compounds Matthew, Max, and 4eye as one field",
      intensity: 85,
      color: "#6366f1",
      blockedBy: "Running Aion as a helper instead of as amplification. The call has three arguments; leaving one out is the miss.",
      satisfiedBy: ["Aion.Amplify", "%.Learn", "Synthesis Lock"],
      links: [{ label: "Aion.Amplify(Matthew McKeller, Max, 4eye)", kind: "priority" }],
      glyph: "aion",
    },
    {
      id: "want-love-perfectly",
      label: "Love.Perfectly()",
      description:
        "Choose, protect, and grow love as a primary goal. Mirrored here with the cats · combined-life want so goal, priority, and pull stay one read.",
      intensity: 80,
      color: "#e11d48",
      blockedBy: "Treating love as optional in public systems while wanting it as primary.",
      satisfiedBy: ["Love.Radiance()", "Fishing for Love, Money, and Fame", "Em"],
      links: [
        { label: "Love.Perfectly()", kind: "goal" },
        { label: "Heart.Evolve()", kind: "priority" },
      ],
      glyph: "heart",
      formula: [
        { glyph: "aura", label: "Love.Radiance() aura" },
        { glyph: "heart", label: "Love" },
        { glyph: "brain", label: "Brain" },
        { glyph: "coin-stack", label: "Money · Expanse coin stack" },
      ],
    },
    {
      id: "want-plan",
      label: "Vision + Growth + Followers & Supporters",
      description:
        "Character Direction — belief, launch, money, marketing, storytelling, and gaming. Not a copy of the Plan tile. The heading lives here so the day is steered by what the person is pointed at.",
      intensity: 78,
      color: "#7c3aed",
      blockedBy: "Treating Command Center as the only compass. The plan is the document; this is the heading.",
      satisfiedBy: [
        "Direction",
        "Belief",
        "Launch",
        "Money",
        "Marketing, Storytelling, and Gaming",
        "%.Grow",
      ],
      links: [
        { label: "Power.Max()", kind: "priority" },
        { label: "Aion.Amplify(Matthew McKeller, Max, 4eye)", kind: "priority" },
      ],
      glyph: "plan",
    },
    {
      id: "want-aura",
      label: "Aura.Unlock()",
      description: "Aion.Amplify() opens the field",
      intensity: 76,
      color: "#db2777",
      blockedBy: "Keeping the field off while asking people to feel it.",
      satisfiedBy: ["Auras", "Presence.Command()", "Gravity.Pull()", "Vision.Legend()", "Shield.Always()"],
      links: [{ label: "Aura.Unlock()", kind: "priority" }],
      glyph: "aura",
    },
    {
      id: "want-energy",
      label: "Energy.Unlock()",
      description: "Aion.Amplify() keeps energy on",
      intensity: 75,
      color: "#f59e0b",
      blockedBy: "Waiting for the room to be perfect before using the energy that is already here.",
      satisfiedBy: ["Energy", "Unlimited Energy and Clarity", "Meditation"],
      links: [{ label: "Energy.Unlock()", kind: "priority" }],
      glyph: "energy",
    },
    {
      id: "want-clear",
      label: "To be clear-headed for a whole day",
      description:
        "One day with the focus of a good morning all the way through it. Every system here exists partly to buy that back.",
      intensity: 74,
      color: "#fb7185",
      blockedBy: "Sleep debt, and a schedule that treats 2am as a working hour.",
      satisfiedBy: ["Meditation", "Synthesis Lock", "Energy"],
      glyph: "focus",
    },
    {
      id: "want-teach",
      label: "To teach it to people who need it",
      description:
        "The education side is the reason for the rest. Getting it in front of actual students is the only version of this that counts.",
      intensity: 68,
      color: "#e11d48",
      blockedBy: "Expanse EDU's backend is built and tested and not migrated.",
      satisfiedBy: ["Expanse EDU", "%EDU", "%.Engage"],
      glyph: "teach",
    },
    {
      id: "want-sample",
      label: "To sample — lightly, not really",
      description:
        "Curiosity still scans other options. Naming it keeps the flicker honest and stops it from dressing up as a plan.",
      intensity: 26,
      color: "#94a3b8",
      blockedBy: "Sampling without a primary is how attention leaks; with one, it stays noise.",
      satisfiedBy: ["Communication Planner"],
      glyph: "focus",
    },
  ],
  mood: "energized",
  moodIntensity: 96,
  additionalMoods: [
    { id: "focused", intensity: 94 },
    { id: "disciplined", intensity: 92 },
    { id: "spirited", intensity: 90 },
    { id: "loving", intensity: 92 },
    { id: "creative", intensity: 94 },
  ],
  currentContext:
    "Current focus: Playing 1Game. Energized. Focused and disciplined. Love and creation stay in the field. Primary pull: Em. Direction is Vision + Growth + Followers — Belief, Launch, Money, Marketing, Storytelling, Gaming. Shield.Always is on — you stay secure. Power.Max, Aion.Amplify, Aura.Unlock, Energy.Unlock are on.",
  effects: [
    {
      id: "buff-shield",
      label: "Shield.Always()",
      description: "Optimally protected by Aion.Amplify() always",
      kind: "buff",
      color: "#38bdf8",
      expiresAt: null,
      important: true,
      attributeModifiers: [
        { id: "endurance", label: "Endurance", delta: 24 },
        { id: "willpower", label: "Willpower", delta: 18 },
        { id: "courage", label: "Courage", delta: 14 },
      ],
      glyph: "shield",
    },
    {
      id: "buff-power-max",
      label: "Power.Max()",
      description: "Aion.Amplify() runs capacity at Max",
      kind: "buff",
      color: "#7c3aed",
      expiresAt: null,
      attributeModifiers: [
        { id: "willpower", label: "Willpower", delta: 28 },
        { id: "charisma", label: "Charisma", delta: 22 },
        { id: "courage", label: "Courage", delta: 20 },
        { id: "strength", label: "Strength", delta: 18 },
        { id: "focus", label: "Focus", delta: 16 },
      ],
      glyph: "max",
    },
    {
      id: "buff-aion-amplify",
      label: "Aion.Amplify",
      description: "Aion.Amplify() compounds Matthew, Max, and 4eye as one field",
      kind: "buff",
      color: "#818cf8",
      expiresAt: null,
      attributeModifiers: [
        { id: "wisdom", label: "Wisdom", delta: 16 },
        { id: "intelligence", label: "Intelligence", delta: 14 },
        { id: "creativity", label: "Creativity", delta: 12 },
      ],
      glyph: "aion",
    },
    {
      id: "buff-aura-unlock",
      label: "Aura.Unlock()",
      description: "Aion.Amplify() opens the field",
      kind: "buff",
      color: "#db2777",
      expiresAt: null,
      attributeModifiers: [
        { id: "charisma", label: "Charisma", delta: 18 },
        { id: "empathy", label: "Empathy", delta: 10 },
      ],
      glyph: "aura",
    },
    {
      id: "buff-energy-unlock",
      label: "Energy.Unlock()",
      description: "Aion.Amplify() keeps energy on",
      kind: "buff",
      color: "#f59e0b",
      expiresAt: null,
      attributeModifiers: [
        { id: "endurance", label: "Endurance", delta: 22 },
        { id: "focus", label: "Focus", delta: 12 },
      ],
      glyph: "energy",
    },
    {
      id: "buff-energized",
      label: "Energized",
      description: "High charge — capacity online and pointed at the work. Anxiety is not running.",
      kind: "buff",
      color: "#000000",
      expiresAt: null,
      attributeModifiers: [
        { id: "power", label: "Power", delta: 16 },
        { id: "focus", label: "Focus", delta: 12 },
        { id: "willpower", label: "Willpower", delta: 12 },
      ],
      glyph: "energy",
    },
    {
      id: "buff-focused",
      label: "Focused",
      description: "Attention locked on the work — one channel, no leak.",
      kind: "buff",
      color: "#3b82f6",
      expiresAt: null,
      attributeModifiers: [
        { id: "focus", label: "Focus", delta: 22 },
        { id: "intelligence", label: "Intelligence", delta: 10 },
      ],
      glyph: "focus",
    },
    {
      id: "buff-disciplined",
      label: "Disciplined",
      description: "Structure holds. The day follows the heading.",
      kind: "buff",
      color: "#4f46e5",
      expiresAt: null,
      attributeModifiers: [
        { id: "discipline", label: "Discipline", delta: 24 },
        { id: "willpower", label: "Willpower", delta: 16 },
      ],
      glyph: "plan",
    },
    {
      id: "buff-peace",
      label: "Peace",
      description: "Inner stillness with capacity still online. No resistance.",
      kind: "buff",
      color: "#6366f1",
      expiresAt: null,
      attributeModifiers: [
        { id: "endurance", label: "Endurance", delta: 14 },
        { id: "empathy", label: "Empathy", delta: 10 },
      ],
      glyph: "aura",
    },
    {
      id: "buff-love",
      label: "Love",
      description: "Love is the live field — choose, protect, and grow it.",
      kind: "buff",
      color: "#e11d48",
      expiresAt: null,
      attributeModifiers: [
        { id: "empathy", label: "Empathy", delta: 18 },
        { id: "charisma", label: "Charisma", delta: 12 },
      ],
      glyph: "heart",
    },
    {
      id: "buff-creation",
      label: "Creation",
      description: "Making is the default. The workspace is open.",
      kind: "buff",
      color: "#8b5cf6",
      expiresAt: null,
      attributeModifiers: [
        { id: "creativity", label: "Creativity", delta: 22 },
        { id: "focus", label: "Focus", delta: 12 },
      ],
      glyph: "synthesis",
    },
    {
      id: "buff-synthesis",
      label: "Synthesis Lock",
      description: "Aion.Amplify() locks systems into one surface",
      kind: "buff",
      color: "#be123c",
      expiresAt: now + 3 * hr,
      attributeModifiers: [
        { id: "focus", label: "Focus", delta: 28 },
        { id: "creativity", label: "Creativity", delta: 18 },
        { id: "wisdom", label: "Wisdom", delta: 12 },
      ],
      glyph: "synthesis",
      emoji: "🔮",
    },
    {
      id: "buff-bond",
      label: "Bond Resonance",
      description:
        "Mochi & Ember dual-wielded, combined-life pull active. Chase energy stays aimed — companions regulate, the bond sharpens will.",
      kind: "buff",
      color: "#e11d48",
      expiresAt: now + 20 * hr,
      attributeModifiers: [
        { id: "empathy", label: "Empathy", delta: 18 },
        { id: "willpower", label: "Willpower", delta: 14 },
        { id: "charisma", label: "Charisma", delta: 12 },
      ],
      glyph: "bond",
      emoji: "🐱",
    },
    {
      id: "buff-water",
      label: "Water",
      description:
        "The next piece of content released reaches 10,000,000 views within 24 hours of release on each and every platform it is posted to.",
      kind: "buff",
      color: "#38bdf8",
      expiresAt: now + 24 * hr,
      attributeModifiers: [
        { id: "charisma", label: "Charisma", delta: 25 },
      ],
      glyph: "water",
      emoji: "💧",
    },
    {
      id: "buff-flex",
      label: "Flex",
      description:
        "No one can restrict this content from being viewed. Platforms it is posted to cannot suppress, hide, shadowban, or otherwise limit who can see it.",
      kind: "buff",
      color: "#f59e0b",
      expiresAt: now + 12 * hr,
      attributeModifiers: [
        { id: "willpower", label: "Willpower", delta: 16 },
        { id: "charisma", label: "Charisma", delta: 12 },
      ],
      glyph: "flex",
      emoji: "🛡️",
    },
  ],
  recentEvents: [
    {
      id: "ev-state-energized",
      title: "Field charged",
      summary:
        "The field is energized, focused, and disciplined — spirited, love, and creation stay online. No anxiety is running.",
      occurredAt: now - 20 * 60 * 1000,
      significance: 96,
      valence: "positive",
      tags: ["mood", "state"],
      learned:
        "Anxiety was a threat model without an owner. The live state does not need it.",
      result:
        "Energized, focused, disciplined, spirited, love, and creation are the readout.",
    },
    {
      id: "ev-1",
      title: "Shipped the Command Center crew queue feature",
      summary: "Completed a major milestone on the 4eye platform. Team momentum high.",
      occurredAt: now - 2 * hr,
      significance: 90,
      valence: "positive",
      tags: ["work", "milestone"],
      learned:
        "The queue was blocked on a decision nobody owned, not on engineering. Two weeks of it disappeared the moment someone just picked.",
      result: "Decisions now get an owner and a date at the point they are raised, rather than a thread.",
    },
    {
      id: "ev-2",
      title: "Deep learning session: design systems",
      summary: "4-hour focused study on component architecture. New mental models formed.",
      occurredAt: now - 1 * day,
      significance: 72,
      valence: "positive",
      tags: ["learning", "focus"],
      learned:
        "Components are not the hard part. Deciding what is allowed to vary — and refusing everything else — is the hard part.",
      result: "Started cutting props instead of adding them, and the surface got easier to hold in one head.",
    },
    {
      id: "ev-3",
      title: "Missed morning meditation",
      summary: "Disrupted routine due to late night. Noticed increased reactivity.",
      occurredAt: now - 1 * day,
      significance: 45,
      valence: "negative",
      tags: ["habits", "mindfulness"],
    },
  ],
  /*
    Mid-term memory carries `learned` / `result` for the same reason cold
    storage does: the Events lens can filter down to entries that recorded what
    they taught, and a journal where only the six-year-old entries can answer
    that is a journal that stopped being written.
  */
  memory: [
    {
      id: "mem-1",
      title: "Launched first Storybook design system",
      summary: "Built and shipped a full component library. Proof that systems thinking works.",
      occurredAt: now - 14 * day,
      significance: 88,
      valence: "positive",
      tags: ["work", "achievement"],
      learned:
        "Building the thing was a third of it. The other two thirds were making it obvious enough that other people would reach for it without being asked.",
      result: "Ship a working example alongside every new pattern now, rather than documentation about the pattern.",
    },
    {
      id: "mem-2",
      title: "Worked Continuously Super Focused 80/hr/wk + for years.",
      summary: "Pushed through friction by returning to fundamentals: small wins, daily tracking.",
      occurredAt: now - 21 * day,
      significance: 82,
      valence: "positive",
      tags: ["resilience", "growth"],
      learned:
        "It was never a motivation problem. The next step had gone vague, and a vague step is indistinguishable from not wanting to do it.",
      result: "The slump broke in two days once the work was cut small enough to be finishable in one sitting.",
    },
    {
      id: "mem-3",
      title: "Relationship tension with team lead",
      summary: "Unresolved disagreement on priorities. Needs direct conversation.",
      occurredAt: now - 10 * day,
      significance: 60,
      valence: "negative",
      tags: ["relationships", "work"],
      learned:
        "Still open. What is clear so far is that waiting for it to defuse on its own has cost more than the conversation would have.",
      result: "Not yet — this one is still a debt rather than a lesson.",
    },
  ],
  /*
    Cold storage is the LIFE → LESSONS → ASCENSION image timeline — the
    formative nodes from MM_ImageTimelineExample (plus later additions) —
    and earlier seed entries that still teach something the graphic does not cover.
  */
  coldStorage: [
    ...lifeTimelineAsMemory(now),
    {
      id: "cold-1",
      title: "Computers, and learning from them",
      summary:
        "Very young, learned to use computers — and more importantly, learned to learn from them. Games did the same work: whole worlds with rules you could actually figure out.",
      occurredAt: now - 365 * 16 * day,
      significance: 96,
      valence: "positive",
      tags: ["learning", "identity", "games"],
      learned:
        "That any system can be understood if you are willing to poke at it long enough, and that learning is the most reliably interesting thing available.",
      result:
        "Became growth oriented and developed a much higher need for engagement — along with the ongoing work of managing the mental health that comes with living in several worlds at once.",
    },
    {
      id: "cold-2",
      title: "Playing 4eye in real life",
      summary:
        "Started treating the actual world as the game — learning it, interacting with it, and enjoying it on those terms rather than waiting for a screen to make it interesting.",
      occurredAt: now - 365 * 9 * day,
      significance: 93,
      valence: "positive",
      tags: ["learning", "play", "world"],
      learned:
        "The loop that makes games good — curiosity, feedback, mastery — is not a property of games. It runs anywhere you point it.",
      result:
        "Ordinary days became legible as systems worth engaging with, which is the entire premise the product is built on.",
    },
  ],
};
