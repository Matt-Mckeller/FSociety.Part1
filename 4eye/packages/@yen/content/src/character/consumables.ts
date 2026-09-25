
/**
 * Character — Consumables model.
 *
 * Time-limited boosts that can be used from inventory. Each consumable has
 * a duration tier (1hr / 4hr / 12hr), effects, and a quantity.
 */

export type ConsumableTier = "micro" | "standard" | "surge";
export type ConsumableKind = "willpower" | "discipline" | "focus" | "clarity" | "energy" | "recovery" | "water";

export interface ConsumableEffect {
  attributeId: string;
  label: string;
  delta: number;
}

export interface ConsumableMeta {
  id: string;
  label: string;
  kind: ConsumableKind;
  tier: ConsumableTier;
  /** Duration in hours. */
  durationHours: 1 | 4 | 12;
  description: string;
  /** Lore / flavor text. */
  lore?: string;
  effects: ConsumableEffect[];
  /** Hex color for the consumable badge. */
  color: string;
  quantity: number;
  rarity: "common" | "uncommon" | "rare" | "epic";
  /**
   * Consumable ids this one unlocks. Recovery is the case that motivated this:
   * the small repeated version is what earns access to the serious one, which
   * is the honest shape of how recovery actually works.
   */
  unlocks?: string[];
  /** Id of the consumable that unlocks this. Present ⇒ starts locked. */
  unlockedBy?: string;
}

export const DURATION_LABEL: Record<ConsumableTier, string> = {
  micro:    "1 hr",
  standard: "4 hrs",
  surge:    "12 hrs",
};

export const KIND_COLOR: Record<ConsumableKind, string> = {
  willpower:  "#4F46E5",
  discipline: "#1e293b",
  focus:      "#0EA5E9",
  clarity:    "#7c3aed",
  energy:     "#16a34a",
  recovery:   "#f43f5e",
  water:      "#38bdf8",
};

export const CONSUMABLES: ConsumableMeta[] = [
  // Willpower
  {
    id: "willpower-micro",
    label: "Willpower · Micro",
    kind: "willpower",
    tier: "micro",
    durationHours: 1,
    description: "A short-window boost to push through one tough decision or task.",
    lore: "The smallest acts of will compound into unshakeable character.",
    effects: [
      { attributeId: "willpower", label: "Willpower", delta: 20 },
      { attributeId: "discipline", label: "Discipline", delta: 10 },
    ],
    color: "#4F46E5",
    quantity: 8,
    rarity: "common",
  },
  {
    id: "willpower-standard",
    label: "Willpower · Standard",
    kind: "willpower",
    tier: "standard",
    durationHours: 4,
    description: "A deep-session willpower state. Ideal for grueling work blocks.",
    lore: "Four hours in the zone. The world waits.",
    effects: [
      { attributeId: "willpower", label: "Willpower", delta: 30 },
      { attributeId: "discipline", label: "Discipline", delta: 15 },
      { attributeId: "focus", label: "Focus", delta: 10 },
    ],
    color: "#4F46E5",
    quantity: 4,
    rarity: "uncommon",
  },
  {
    id: "willpower-surge",
    label: "Willpower · Surge",
    kind: "willpower",
    tier: "surge",
    durationHours: 12,
    description: "Elite-level will. Use for full-day execution sprints.",
    lore: "Twelve hours of iron. Everything bends except the mission.",
    effects: [
      { attributeId: "willpower", label: "Willpower", delta: 40 },
      { attributeId: "discipline", label: "Discipline", delta: 25 },
      { attributeId: "endurance", label: "Endurance", delta: 15 },
    ],
    color: "#4F46E5",
    quantity: 1,
    rarity: "rare",
  },
  // Discipline
  {
    id: "discipline-micro",
    label: "Discipline · Micro",
    kind: "discipline",
    tier: "micro",
    durationHours: 1,
    description: "Snap into structure for one focused hour.",
    lore: "Discipline is the bridge between goals and accomplishment.",
    effects: [
      { attributeId: "discipline", label: "Discipline", delta: 20 },
      { attributeId: "focus", label: "Focus", delta: 10 },
    ],
    color: "#1e293b",
    quantity: 6,
    rarity: "common",
  },
  {
    id: "discipline-standard",
    label: "Discipline · Standard",
    kind: "discipline",
    tier: "standard",
    durationHours: 4,
    description: "Sustained structure. Routines hold without effort.",
    lore: "Routine is the skeleton of excellence.",
    effects: [
      { attributeId: "discipline", label: "Discipline", delta: 30 },
      { attributeId: "willpower", label: "Willpower", delta: 15 },
    ],
    color: "#1e293b",
    quantity: 3,
    rarity: "uncommon",
  },
  {
    id: "discipline-surge",
    label: "Discipline · Surge",
    kind: "discipline",
    tier: "surge",
    durationHours: 12,
    description: "A full day operating at peak discipline. Systems run themselves.",
    lore: "The master of self needs no external push.",
    effects: [
      { attributeId: "discipline", label: "Discipline", delta: 45 },
      { attributeId: "willpower", label: "Willpower", delta: 25 },
      { attributeId: "focus", label: "Focus", delta: 20 },
    ],
    color: "#1e293b",
    quantity: 0,
    rarity: "epic",
  },
  // Focus
  {
    id: "focus-micro",
    label: "Focus · Micro",
    kind: "focus",
    tier: "micro",
    durationHours: 1,
    description: "Eliminate mental noise for a single power hour.",
    effects: [
      { attributeId: "focus", label: "Focus", delta: 25 },
    ],
    color: "#0EA5E9",
    quantity: 10,
    rarity: "common",
  },
  {
    id: "focus-standard",
    label: "Focus · Standard",
    kind: "focus",
    tier: "standard",
    durationHours: 4,
    description: "Deep work mode. Distractions cease to register.",
    effects: [
      { attributeId: "focus", label: "Focus", delta: 35 },
      { attributeId: "creativity", label: "Creativity", delta: 15 },
    ],
    color: "#0EA5E9",
    quantity: 4,
    rarity: "uncommon",
  },
  {
    id: "focus-surge",
    label: "Focus · Surge",
    kind: "focus",
    tier: "surge",
    durationHours: 12,
    description: "Total immersion for a full day. Zero-point concentration.",
    effects: [
      { attributeId: "focus", label: "Focus", delta: 50 },
      { attributeId: "creativity", label: "Creativity", delta: 20 },
      { attributeId: "intelligence", label: "Intelligence", delta: 10 },
    ],
    color: "#0EA5E9",
    quantity: 1,
    rarity: "rare",
  },
  // Recovery
  {
    id: "recovery-micro",
    label: "Recovery · Micro",
    kind: "recovery",
    tier: "micro",
    durationHours: 1,
    description: "A brief recharge. Stress drops, mood lifts.",
    lore: "Small and repeatable is what earns the real thing.",
    effects: [
      { attributeId: "endurance", label: "Endurance", delta: 15 },
      { attributeId: "willpower", label: "Willpower", delta: 10 },
    ],
    color: "#f43f5e",
    quantity: 5,
    rarity: "common",
    unlocks: ["recovery-major"],
  },
  {
    id: "recovery-major",
    label: "Recovery · Major",
    kind: "recovery",
    tier: "surge",
    durationHours: 12,
    description: "A full reset rather than a top-up. The kind that actually clears the debt.",
    lore: "Earned by the small ones. You cannot skip straight to this.",
    effects: [
      { attributeId: "endurance", label: "Endurance", delta: 40 },
      { attributeId: "willpower", label: "Willpower", delta: 25 },
      { attributeId: "focus", label: "Focus", delta: 20 },
    ],
    color: "#f43f5e",
    quantity: 0,
    rarity: "epic",
    unlockedBy: "recovery-micro",
  },
  {
    id: "water",
    label: "Water",
    kind: "water",
    tier: "surge",
    durationHours: 12,
    description:
      "The next piece of content released reaches 10,000,000 views within 24 hours of release on each and every platform it is posted to.",
    lore: "Drink, post, watch the count climb. Same number on every surface.",
    effects: [
      { attributeId: "charisma", label: "Charisma", delta: 25 },
    ],
    color: "#38bdf8",
    quantity: 1,
    rarity: "epic",
  },
];
