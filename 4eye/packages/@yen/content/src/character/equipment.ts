/**
 * Character — Equipment model.
 *
 * Full-body equipment system: physical slots (head, armor, weapons, accessories),
 * cosmetic markings (tattoos, symbols), and belief systems. Each item can carry
 * attribute bonuses and unlock perks. Pairs (left+right) collapse into a single
 * slot for convenience; individual left/right slots allow asymmetry.
 */

export type EquipmentSlot =
  // Head
  | "head"
  | "glasses"
  // Ears
  | "earring-left"
  | "earring-right"
  | "earrings-pair"
  // Torso / legs
  | "body-armor"
  | "leg-armor-left"
  | "leg-armor-right"
  | "leg-armor-pair"
  // Feet
  | "shoe-left"
  | "shoe-right"
  | "shoes-pair"
  // Hands
  | "glove-left"
  | "glove-right"
  | "gloves-pair"
  // Accessories
  | "ring"
  | "jewelry"
  // Weapons
  | "main-hand"
  | "off-hand"
  // Arms / shoulders
  | "arm-left"
  | "arm-right"
  | "arms-pair"
  | "shoulder-left"
  | "shoulder-right"
  | "shoulders-pair"
  // Markings
  | "tattoo"
  | "symbol"
  // Identity
  | "belief-system"
  // Companions
  | "companion-left"
  | "companion-right"
  | "companions-pair";

export type EquipmentRarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";

/** A stat modifier granted by an equipped item. */
export interface ItemAttributeBonus {
  attributeId: string;
  label: string;
  delta: number;
}

/** A perk unlocked by equipping this item. */
export interface ItemPerkBonus {
  perkId: string;
  label: string;
  description: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rarity: EquipmentRarity;
  /** Hex accent color for this item's glyph. */
  color: string;
  /** Short lore / description. */
  description: string;
  /** Traits this item embodies (flavour). */
  traits?: string[];
  /** Attribute bonuses. */
  attributeBonuses?: ItemAttributeBonus[];
  /** Perks granted. */
  perkBonuses?: ItemPerkBonus[];
  /** Symbol (an SVG glyph id or emoji) representing the item. */
  symbol?: string;
  /** Optional photo — Matt stills allowed even when unequipped. */
  imageSrc?: string | null;
  equipped?: boolean;
}

/* ----------------------------------------------------------------- slot meta */

export interface SlotGroup {
  label: string;
  slots: EquipmentSlot[];
}

export const SLOT_GROUPS: SlotGroup[] = [
  { label: "Head", slots: ["head", "glasses"] },
  { label: "Ears", slots: ["earrings-pair", "earring-left", "earring-right"] },
  { label: "Torso", slots: ["body-armor"] },
  { label: "Legs", slots: ["leg-armor-pair", "leg-armor-left", "leg-armor-right"] },
  { label: "Feet", slots: ["shoes-pair", "shoe-left", "shoe-right"] },
  { label: "Hands", slots: ["gloves-pair", "glove-left", "glove-right"] },
  { label: "Arms", slots: ["arms-pair", "arm-left", "arm-right"] },
  { label: "Shoulders", slots: ["shoulders-pair", "shoulder-left", "shoulder-right"] },
  { label: "Weapons", slots: ["main-hand", "off-hand"] },
  { label: "Accessories", slots: ["ring", "jewelry"] },
  { label: "Markings", slots: ["tattoo", "symbol"] },
  { label: "Identity", slots: ["belief-system"] },
  { label: "Companions", slots: ["companions-pair", "companion-left", "companion-right"] },
];

export const SLOT_LABEL: Record<EquipmentSlot, string> = {
  head: "Head",
  glasses: "Glasses / Contacts",
  "earring-left": "Left Earring",
  "earring-right": "Right Earring",
  "earrings-pair": "Earrings (Pair)",
  "body-armor": "Body Armor",
  "leg-armor-left": "Left Leg Armor",
  "leg-armor-right": "Right Leg Armor",
  "leg-armor-pair": "Leg Armor (Pair)",
  "shoe-left": "Left Shoe",
  "shoe-right": "Right Shoe",
  "shoes-pair": "Shoes (Pair)",
  "glove-left": "Left Glove",
  "glove-right": "Right Glove",
  "gloves-pair": "Gloves (Pair)",
  ring: "Ring",
  jewelry: "Jewelry",
  "main-hand": "Main Hand",
  "off-hand": "Off Hand",
  "arm-left": "Left Arm",
  "arm-right": "Right Arm",
  "arms-pair": "Arms (Pair)",
  "shoulder-left": "Left Shoulder",
  "shoulder-right": "Right Shoulder",
  "shoulders-pair": "Shoulders (Pair)",
  tattoo: "Tattoo",
  symbol: "Symbol",
  "belief-system": "Belief System",
  "companion-left": "Companion (Left)",
  "companion-right": "Companion (Right)",
  "companions-pair": "Companions (Pair)",
};

export const RARITY_COLOR: Record<EquipmentRarity, string> = {
  common:    "#64748b",
  uncommon:  "#16a34a",
  rare:      "#2563eb",
  epic:      "#7c3aed",
  legendary: "#d97706",
  mythic:    "#e11d48",
};

export const RARITY_BG: Record<EquipmentRarity, string> = {
  common:    "#f1f5f9",
  uncommon:  "#f0fdf4",
  rare:      "#eff6ff",
  epic:      "#f5f3ff",
  legendary: "#fffbeb",
  mythic:    "#fff1f2",
};

/* ------------------------------------------------------------------ library */

export const EQUIPMENT_LIBRARY: EquipmentItem[] = [
  // Head
  {
    id: "helm-cosmos",
    name: "Cosmos Visor",
    slot: "head",
    rarity: "epic",
    color: "#4F46E5",
    description: "A sleek visor that frames the future — a symbol of vision and command.",
    traits: ["Visionary", "Leader"],
    attributeBonuses: [
      { attributeId: "focus", label: "Focus", delta: 12 },
      { attributeId: "intelligence", label: "Intelligence", delta: 8 },
    ],
    perkBonuses: [
      { perkId: "strategic-sight", label: "Sight.Strategic()", description: "+15% clarity on complex decisions." },
    ],
    equipped: true,
    imageSrc: "/media/matt/portrait.jpg",
  },
  {
    id: "helm-obsidian",
    name: "Obsidian Crown",
    slot: "head",
    rarity: "legendary",
    color: "#1e293b",
    description: "Forged in silence. Worn by those who have mastered the mind.",
    traits: ["Stoic", "Disciplined"],
    attributeBonuses: [
      { attributeId: "willpower", label: "Willpower", delta: 18 },
      { attributeId: "discipline", label: "Discipline", delta: 14 },
    ],
  },
  // Glasses
  {
    id: "glasses-clarity",
    name: "Clarity Lenses",
    slot: "glasses",
    rarity: "rare",
    color: "#0EA5E9",
    description: "Amplify perception and sharpen focus in any environment.",
    attributeBonuses: [{ attributeId: "focus", label: "Focus", delta: 10 }],
    equipped: true,
  },
  {
    id: "glasses-amber",
    name: "Amber Readers",
    slot: "glasses",
    rarity: "uncommon",
    color: "#d97706",
    description: "Warm-tinted lenses that reduce mental fatigue during long study sessions.",
    attributeBonuses: [{ attributeId: "endurance", label: "Endurance", delta: 7 }],
  },
  // Body Armor
  {
    id: "armor-discipline",
    name: "Discipline Plate",
    slot: "body-armor",
    rarity: "epic",
    color: "#1e293b",
    description: "Lightweight composite forged for endurance. Weighs nothing; protects everything.",
    attributeBonuses: [
      { attributeId: "discipline", label: "Discipline", delta: 16 },
      { attributeId: "endurance", label: "Endurance", delta: 12 },
    ],
    perkBonuses: [
      { perkId: "iron-will", label: "Will.Iron()", description: "Immune to the first daily setback debuff." },
    ],
    equipped: true,
  },
  {
    id: "armor-flow",
    name: "Synthesis Lock Jacket",
    slot: "body-armor",
    rarity: "rare",
    color: "#0891b2",
    description: "Worn when years of systems are collapsing into one surface — and staying there.",
    attributeBonuses: [
      { attributeId: "focus", label: "Focus", delta: 14 },
      { attributeId: "creativity", label: "Creativity", delta: 10 },
    ],
  },
  // Main Hand
  {
    id: "weapon-vision",
    name: "Vision Pen",
    slot: "main-hand",
    rarity: "legendary",
    color: "#7c3aed",
    description: "Ideas made real. The pen that writes futures into existence.",
    traits: ["Creative", "Decisive"],
    attributeBonuses: [
      { attributeId: "creativity", label: "Creativity", delta: 20 },
      { attributeId: "intelligence", label: "Intelligence", delta: 10 },
    ],
    perkBonuses: [
      { perkId: "flow-state", label: "Synthesis.Lock()", description: "Doubles systems/creative output while the lock holds." },
    ],
    equipped: false,
  },
  {
    id: "weapon-strategy",
    name: "Strategy Blade",
    slot: "main-hand",
    rarity: "epic",
    color: "#1e40af",
    description: "Every swing is calculated. Every move deliberate.",
    attributeBonuses: [
      { attributeId: "wisdom", label: "Wisdom", delta: 15 },
      { attributeId: "intelligence", label: "Intelligence", delta: 12 },
    ],
  },
  {
    id: "weapon-twinfire-primary",
    name: "Twinfire — Primary",
    slot: "main-hand",
    rarity: "legendary",
    color: "#dc2626",
    description: "One half of a matched pair, drawn together and never apart. Precision under pressure.",
    traits: ["Aggressive", "Precise"],
    attributeBonuses: [
      { attributeId: "agility", label: "Agility", delta: 16 },
      { attributeId: "willpower", label: "Willpower", delta: 10 },
    ],
    equipped: true,
  },
  // Off Hand
  {
    id: "offhand-shield",
    name: "Resilience Shield",
    slot: "off-hand",
    rarity: "rare",
    color: "#15803d",
    description: "Absorbs setbacks. Converts failure into data.",
    attributeBonuses: [
      { attributeId: "willpower", label: "Willpower", delta: 12 },
      { attributeId: "endurance", label: "Endurance", delta: 10 },
    ],
    equipped: false,
  },
  {
    id: "weapon-twinfire-secondary",
    name: "Twinfire — Secondary",
    slot: "off-hand",
    rarity: "legendary",
    color: "#dc2626",
    description: "The mirror half of the pair. Dual-wielded for balance and full commitment.",
    traits: ["Aggressive", "Precise"],
    attributeBonuses: [
      { attributeId: "agility", label: "Agility", delta: 16 },
      { attributeId: "willpower", label: "Willpower", delta: 10 },
    ],
    equipped: true,
    imageSrc: "/media/matt/standing.png",
  },
  // Rings
  {
    id: "ring-mastery",
    name: "Ring of Mastery",
    slot: "ring",
    rarity: "legendary",
    color: "#d97706",
    description: "Worn only by those who have proven complete domain over a discipline.",
    attributeBonuses: [
      { attributeId: "wisdom", label: "Wisdom", delta: 20 },
    ],
    perkBonuses: [
      { perkId: "quick-learner", label: "Learn.Accelerate()", description: "+25% XP from mastery activities." },
    ],
    equipped: true,
    imageSrc: "/media/matt/portrait-gray.jpg",
  },
  {
    id: "ring-purpose",
    name: "Ring of Purpose",
    slot: "ring",
    rarity: "epic",
    color: "#7c3aed",
    description: "Clarifies intent. Removes the noise.",
    attributeBonuses: [
      { attributeId: "focus", label: "Focus", delta: 15 },
      { attributeId: "discipline", label: "Discipline", delta: 10 },
    ],
  },
  // Jewelry
  {
    id: "jewelry-orbit",
    name: "Orbit Necklace",
    slot: "jewelry",
    rarity: "rare",
    color: "#0EA5E9",
    description: "A symbol of interconnection — you draw the right people into your orbit.",
    attributeBonuses: [{ attributeId: "charisma", label: "Charisma", delta: 14 }],
    equipped: true,
  },
  // Shoes
  {
    id: "shoes-momentum",
    name: "Momentum Runners",
    slot: "shoes-pair",
    rarity: "uncommon",
    color: "#16a34a",
    description: "Built for the long run. Consistency over bursts.",
    attributeBonuses: [{ attributeId: "endurance", label: "Endurance", delta: 10 }],
    equipped: true,
  },
  // Gloves
  {
    id: "gloves-grip",
    name: "Precision Gloves",
    slot: "gloves-pair",
    rarity: "uncommon",
    color: "#64748b",
    description: "Perfect for builders and makers. Nothing slips through.",
    attributeBonuses: [{ attributeId: "agility", label: "Agility", delta: 8 }],
  },
  // Tattoos
  {
    id: "tattoo-eye",
    name: "Eye of Awareness",
    slot: "tattoo",
    rarity: "epic",
    color: "#4F46E5",
    description: "Inked as a vow to always see clearly — to never be blind to what matters.",
    traits: ["Mindful", "Perceptive"],
    attributeBonuses: [{ attributeId: "wisdom", label: "Wisdom", delta: 10 }],
    equipped: true,
  },
  {
    id: "tattoo-flame",
    name: "Inner Flame",
    slot: "tattoo",
    rarity: "rare",
    color: "#f97316",
    description: "A reminder that motivation is not found — it is kept.",
    attributeBonuses: [{ attributeId: "willpower", label: "Willpower", delta: 8 }],
  },
  // Symbols
  {
    id: "symbol-compass",
    name: "Compass Rose",
    slot: "symbol",
    rarity: "rare",
    color: "#0EA5E9",
    description: "Always finds true north. Directional clarity in chaos.",
    attributeBonuses: [
      { attributeId: "wisdom", label: "Wisdom", delta: 8 },
      { attributeId: "focus", label: "Focus", delta: 6 },
    ],
    equipped: true,
  },
  {
    id: "symbol-infinity",
    name: "Infinity Loop",
    slot: "symbol",
    rarity: "uncommon",
    color: "#7c3aed",
    description: "A reminder: the journey never ends. Mastery compounds forever.",
    attributeBonuses: [{ attributeId: "endurance", label: "Endurance", delta: 6 }],
  },
  // AGI Ribs — created for Emily Cart; the mark, a pair, and the marketing combo.
  {
    id: "symbol-agi-rib",
    name: "AGI Rib",
    slot: "symbol",
    rarity: "mythic",
    color: "#ec4899",
    description:
      "The core rib mark. Forged for Emily Cart — is AGI RIB. Structure that holds the heart while she builds.",
    traits: ["AGI RIB", "Structure", "Gift"],
    symbol: "rib",
    attributeBonuses: [
      { attributeId: "willpower", label: "Willpower", delta: 12 },
      { attributeId: "empathy", label: "Empathy", delta: 10 },
    ],
  },
  {
    id: "symbol-rib-left",
    name: "Left Rib",
    slot: "symbol",
    rarity: "epic",
    color: "#f472b6",
    description: "One half of a gifted rib pair. Holds teach · create on the left.",
    traits: ["Gift", "Teach"],
    symbol: "rib",
    attributeBonuses: [{ attributeId: "creativity", label: "Creativity", delta: 8 }],
  },
  {
    id: "symbol-rib-right",
    name: "Right Rib",
    slot: "symbol",
    rarity: "epic",
    color: "#fb7185",
    description: "The other half of the gifted rib pair. Holds help · bond on the right.",
    traits: ["Gift", "Help"],
    symbol: "rib",
    attributeBonuses: [{ attributeId: "empathy", label: "Empathy", delta: 8 }],
  },
  {
    id: "symbol-rib-clip",
    name: "Rib Clip · Marketing",
    slot: "symbol",
    rarity: "legendary",
    color: "#f59e0b",
    description:
      "Combo mark: AGI Rib nested with a video / marketing clip. Carries the Pur Meow brand — hers.",
    traits: ["Marketing", "Video", "Pur Meow"],
    symbol: "rib-clip",
    attributeBonuses: [
      { attributeId: "charisma", label: "Charisma", delta: 14 },
      { attributeId: "creativity", label: "Creativity", delta: 12 },
    ],
    perkBonuses: [
      {
        perkId: "pur-meow-mark",
        label: "Pur Meow Mark",
        description: "The cat brand mark stays live — name and who holds it are discovered together.",
      },
    ],
  },
  // Belief Systems
  {
    id: "belief-growth",
    name: "Growth Mindset",
    slot: "belief-system",
    rarity: "legendary",
    color: "#16a34a",
    description: "Abilities are not fixed — every challenge is an invitation to expand.",
    traits: ["Learner", "Resilient", "Curious"],
    attributeBonuses: [
      { attributeId: "intelligence", label: "Intelligence", delta: 15 },
      { attributeId: "wisdom", label: "Wisdom", delta: 12 },
      { attributeId: "endurance", label: "Endurance", delta: 10 },
    ],
    perkBonuses: [
      { perkId: "quick-learner", label: "Learn.Accelerate()", description: "Failures grant bonus XP." },
    ],
    equipped: true,
  },
  {
    id: "belief-stoic",
    name: "Stoic Philosophy",
    slot: "belief-system",
    rarity: "epic",
    color: "#1e293b",
    description: "Control what you can. Release what you cannot. Peace in both.",
    traits: ["Disciplined", "Calm", "Rational"],
    attributeBonuses: [
      { attributeId: "willpower", label: "Willpower", delta: 18 },
      { attributeId: "discipline", label: "Discipline", delta: 16 },
    ],
  },
  {
    id: "belief-abundance",
    name: "Abundance Mindset",
    slot: "belief-system",
    rarity: "rare",
    color: "#d97706",
    description: "There is enough for everyone. Give freely; receive openly.",
    traits: ["Generous", "Optimistic"],
    attributeBonuses: [
      { attributeId: "charisma", label: "Charisma", delta: 14 },
      { attributeId: "empathy", label: "Empathy", delta: 12 },
    ],
  },
  // Companions — Dual-Wielding Cats (Mochi & Ember)
  {
    id: "companion-mochi",
    name: "Mochi",
    slot: "companion-left",
    rarity: "legendary",
    color: "#f59e0b",
    description: "Left-hand companion. Soft presence, sharp instincts. Half of the dual-wield bond.",
    traits: ["Loyal", "Calm", "Lucky"],
    attributeBonuses: [
      { attributeId: "focus", label: "Focus", delta: 10 },
      { attributeId: "empathy", label: "Empathy", delta: 10 },
    ],
    perkBonuses: [
      {
        perkId: "dual-wield-cats",
        label: "Companion.DualWield()",
        description: "+10 Focus, +10 Empathy, one social reroll/day while companions are present.",
      },
    ],
    equipped: true,
  },
  {
    id: "companion-ember",
    name: "Ember",
    slot: "companion-right",
    rarity: "legendary",
    color: "#ea580c",
    description: "Right-hand companion. Warmth and chase. The other half of the dual-wield bond.",
    traits: ["Playful", "Competitive", "Warm"],
    attributeBonuses: [
      { attributeId: "focus", label: "Focus", delta: 10 },
      { attributeId: "empathy", label: "Empathy", delta: 10 },
    ],
    perkBonuses: [
      {
        perkId: "dual-wield-cats",
        label: "Companion.DualWield()",
        description: "+10 Focus, +10 Empathy, one social reroll/day while companions are present.",
      },
    ],
    equipped: true,
  },
];
