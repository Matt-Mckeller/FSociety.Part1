
/**
 * Character — Attributes model.
 *
 * Core capabilities, more than a dozen, grouped so the table can open by
 * tier without dumping every row at once. Values 0–100; gear adds a live
 * bonus on top of base. Ranked seed is for expanse_eye (Matthew).
 */

/** Coarse buckets — used when the full list is expanded. */
export type AttributeGroup = "mind" | "heart" | "drive" | "body";

export const ATTRIBUTE_GROUP_LABEL: Record<AttributeGroup, string> = {
  mind: "Mind",
  heart: "Heart",
  drive: "Drive",
  body: "Body",
};

export interface AttributeMeta {
  id: string;
  label: string;
  /** Short descriptor for what this attribute governs. */
  description: string;
  /** Hex accent for the attribute's glyph. */
  color: string;
  /** Coarse bucket for grouped expand views. */
  group: AttributeGroup;
  /** The five tier name labels (low → high). */
  tiers: [string, string, string, string, string];
}

export interface AttributeProgress {
  /** Raw value 0–100, or `Infinity` for unbounded. */
  base: number;
  /** Bonus from equipped items (sum of all active equipment bonuses). */
  bonus: number;
}

export type AttributeProgressMap = Record<string, AttributeProgress>;

export const ATTRIBUTES: AttributeMeta[] = [
  {
    id: "emotional-intelligence",
    label: "Emotional Intelligence",
    description: "Reading, regulating, and using emotion — self and others — without losing the plot.",
    color: "#be185d",
    group: "heart",
    tiers: ["Blunt", "Aware", "Fluent", "Attuned", "Orchestral"],
  },
  {
    id: "perception",
    label: "Perception",
    description: "Noticing what is actually there — signals, systems, and the gap between story and fact.",
    color: "#0369a1",
    group: "mind",
    tiers: ["Dull", "Noticing", "Sharp", "Piercing", "Omniscient"],
  },
  {
    id: "creativity",
    label: "Creativity",
    description: "Capacity to generate novel ideas and see what others cannot.",
    color: "#d97706",
    group: "mind",
    tiers: ["Imitative", "Inventive", "Original", "Visionary", "Transcendent"],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    description: "Capacity for learning, reasoning, and pattern recognition.",
    color: "#312e81",
    group: "mind",
    tiers: ["Novice", "Student", "Scholar", "Sage", "Oracle"],
  },
  {
    id: "power",
    label: "Power",
    description: "Capacity to move reality — influence, force, and people's willingness to follow at any distance.",
    color: "#7c3aed",
    group: "drive",
    tiers: ["Dim", "Charged", "Forceful", "Dominant", "Absolute"],
  },
  {
    id: "technology",
    label: "Technology",
    description: "Building, wielding, and shaping tools, systems, and digital futures without losing the human.",
    color: "#0e7490",
    group: "mind",
    tiers: ["Analog", "Literate", "Fluent", "Architect", "Sovereign"],
  },
  {
    id: "communication",
    label: "Communication",
    description: "Saying the true thing clearly — teach, lead, invite, refuse soft fog.",
    color: "#c2410c",
    group: "heart",
    tiers: ["Muted", "Clear", "Eloquent", "Magnetic", "Commanding"],
  },
  {
    id: "empathy",
    label: "Empathy",
    description: "Ability to sense and resonate with others' inner states.",
    color: "#f43f5e",
    group: "heart",
    tiers: ["Aware", "Attuned", "Resonant", "Empathic", "One with All"],
  },
  {
    id: "focus",
    label: "Focus",
    description: "Depth and duration of single-pointed attention.",
    color: "#0f766e",
    group: "drive",
    tiers: ["Scattered", "Settling", "Attentive", "Laser", "Optimized"],
  },
  {
    id: "wisdom",
    label: "Wisdom",
    description: "Depth of understanding and quality of judgment under pressure.",
    color: "#6d28d9",
    group: "mind",
    tiers: ["Aware", "Thoughtful", "Insightful", "Wise", "Enlightened"],
  },
  {
    id: "memory",
    label: "Memory",
    description: "Holding and retrieving what matters — stories and systems over isolated facts.",
    color: "#4338ca",
    group: "mind",
    tiers: ["Fleeting", "Holding", "Anchored", "Encyclopedic", "Living Archive"],
  },
  {
    id: "willpower",
    label: "Willpower",
    description: "Strength of intent to override impulse and pursue purpose.",
    color: "#1e3a5f",
    group: "drive",
    tiers: ["Wavering", "Holding", "Firm", "Unyielding", "Absolute"],
  },
  {
    id: "charisma",
    label: "Charisma",
    description: "Magnetic presence and ability to inspire, lead, and persuade.",
    color: "#e11d48",
    group: "heart",
    tiers: ["Quiet", "Noticed", "Compelling", "Magnetic", "Legendary"],
  },
  {
    id: "adaptability",
    label: "Adaptability",
    description: "Ease with which you update beliefs, skills, and strategies.",
    color: "#10b981",
    group: "drive",
    tiers: ["Fixed", "Open", "Adaptive", "Fluid", "Shapeless"],
  },
  {
    id: "courage",
    label: "Courage",
    description: "Willingness to name desire, ship in public, and stay when it costs.",
    color: "#b45309",
    group: "drive",
    tiers: ["Hesitant", "Trying", "Steady", "Bold", "Fearless"],
  },
  {
    id: "discipline",
    label: "Discipline",
    description: "Ability to sustain effort, delay gratification, and follow through.",
    color: "#1e293b",
    group: "drive",
    tiers: ["Drifting", "Consistent", "Reliable", "Resolute", "Ironclad"],
  },
  {
    id: "endurance",
    label: "Endurance",
    description: "Physical and psychological capacity to sustain effort over time.",
    color: "#16a34a",
    group: "body",
    tiers: ["Fragile", "Resilient", "Durable", "Tireless", "Immortal"],
  },
  {
    id: "agility",
    label: "Agility",
    description: "Speed of adaptation and graceful response to changing conditions.",
    color: "#f59e0b",
    group: "body",
    tiers: ["Rigid", "Flexible", "Nimble", "Swift", "Fluid"],
  },
  {
    id: "strength",
    label: "Strength",
    description: "Raw capacity for exertion — mental, physical, and emotional.",
    color: "#dc2626",
    group: "body",
    tiers: ["Weak", "Building", "Strong", "Powerful", "Titan"],
  },
];

/** Get the tier index (0–4) from a raw value 0–100. Infinity is the top tier. */
export function tierIndex(value: number): number {
  if (!Number.isFinite(value)) return 4;
  if (value >= 90) return 4;
  if (value >= 70) return 3;
  if (value >= 45) return 2;
  if (value >= 20) return 1;
  return 0;
}

/** Total effective value = base + bonus. Infinity stays Infinity; finite totals cap at 100. */
export function effectiveValue(p: AttributeProgress): number {
  if (!Number.isFinite(p.base) || !Number.isFinite(p.bonus)) return Infinity;
  return Math.min(100, p.base + p.bonus);
}

/** Display mark for an attribute score — ∞ when unbounded. */
export function formatAttributeMark(value: number): string {
  return Number.isFinite(value) ? String(value) : "∞";
}

/**
 * Default progression for expanse_eye — every attribute at Infinity.
 * One ∞ across the sheet: mind, heart, drive, and body.
 */
export const ATTRIBUTE_PROGRESS_SEED: AttributeProgressMap = {
  creativity: { base: Infinity, bonus: 0 },
  communication: { base: Infinity, bonus: 0 },
  charisma: { base: Infinity, bonus: 0 },
  focus: { base: Infinity, bonus: 0 },
  memory: { base: Infinity, bonus: 0 },
  "emotional-intelligence": { base: Infinity, bonus: 0 },
  perception: { base: Infinity, bonus: 0 },
  intelligence: { base: Infinity, bonus: 0 },
  power: { base: Infinity, bonus: 0 },
  technology: { base: Infinity, bonus: 0 },
  wisdom: { base: Infinity, bonus: 0 },
  willpower: { base: Infinity, bonus: 0 },
  empathy: { base: Infinity, bonus: 0 },
  courage: { base: Infinity, bonus: 0 },
  adaptability: { base: Infinity, bonus: 0 },
  discipline: { base: Infinity, bonus: 0 },
  endurance: { base: Infinity, bonus: 0 },
  agility: { base: Infinity, bonus: 0 },
  strength: { base: Infinity, bonus: 0 },
};
