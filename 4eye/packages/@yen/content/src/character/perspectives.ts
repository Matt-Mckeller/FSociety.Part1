
/**
 * Character — Perspectives model.
 *
 * Tracks the user's perspective across life's major domains — from politics to
 * family to religion. Each perspective has a current stance, a historical trail,
 * a target direction, and an importance weighting. Time-tracked snapshots allow
 * growth visualization.
 */

export interface PerspectiveSnapshot {
  /** Unix ms when this perspective was recorded. */
  recordedAt: number;
  /** Stance weight: -100 (strongly negative) → 100 (strongly positive). */
  weight: number;
  /** Optional note about this perspective at this point in time. */
  note?: string;
}

export interface PerspectiveMeta {
  id: string;
  label: string;
  description: string;
  /** Associated interests / topics for context. */
  relatedTopics: string[];
  /** Hex accent color for this perspective domain. */
  color: string;
  icon: string;
}

export interface PerspectiveEntry {
  perspectiveId: string;
  /** How important this topic is to the user 0–100. */
  importance: number;
  /** Level of engagement: how much they actually think/talk/act on it. */
  engagement: number;
  /** Current stance -100 → 100. */
  current: number;
  /** Target/desired stance -100 → 100. */
  target: number;
  /** Historical snapshots, oldest first. */
  history: PerspectiveSnapshot[];
  /**
   * Relationship ids (see `relationships.ts`) that shaped this stance.
   * A perspective rarely forms alone — naming who moved it keeps the
   * Perspectives and Relationships panels describing one life, and lets each
   * panel link into the other.
   */
  shapedBy?: string[];
}

/**
 * Domain accents — one rose-red family at matched saturation so the Brain
 * grid reads as one surface. Glyphs carry the icon; `icon` stays as a text
 * fallback for feeds that still expect an emoji mark.
 */
export const PERSPECTIVE_META: PerspectiveMeta[] = [
  {
    id: "politics",
    label: "Politics",
    description: "Views on governance, power, and societal organization.",
    relatedTopics: ["Democracy", "Policy", "Leadership", "Justice", "Power"],
    color: "#9f1239",
    icon: "🏛️",
  },
  {
    id: "religion",
    label: "Religion & Spirituality",
    description: "Beliefs about transcendence, meaning, and sacred practice.",
    relatedTopics: ["Faith", "God", "Spirit", "Practice", "Community"],
    color: "#be123c",
    icon: "✨",
  },
  {
    id: "family",
    label: "Family",
    description: "The place of family in life's priorities and personal identity.",
    relatedTopics: ["Relationships", "Parenthood", "Loyalty", "Legacy"],
    color: "#e11d48",
    icon: "❤️",
  },
  {
    id: "love",
    label: "Love & Relationships",
    description: "Views on romantic love, partnership, and emotional intimacy.",
    relatedTopics: ["Partnership", "Vulnerability", "Trust", "Commitment"],
    color: "#f43f5e",
    icon: "💞",
  },
  {
    id: "war",
    label: "War & Conflict",
    description: "Stance on violence, military action, and conflict resolution.",
    relatedTopics: ["Peace", "Defense", "Violence", "Diplomacy"],
    color: "#b91c1c",
    icon: "⚔️",
  },
  {
    id: "technology",
    label: "Technology",
    description: "Views on tech's role in society, AI, and digital futures.",
    relatedTopics: ["AI", "Innovation", "Privacy", "Progress", "Automation"],
    color: "#881337",
    icon: "🤖",
  },
  {
    id: "health",
    label: "Health & Wellness",
    description: "Beliefs about the body, mental health, and self-care.",
    relatedTopics: ["Exercise", "Nutrition", "Mental Health", "Longevity"],
    color: "#fb7185",
    icon: "🌿",
  },
  {
    id: "environment",
    label: "Environment",
    description: "Views on climate, sustainability, and human impact on nature.",
    relatedTopics: ["Climate", "Sustainability", "Nature", "Responsibility"],
    color: "#9f1239",
    icon: "🌍",
  },
  {
    id: "money",
    label: "Money & Wealth",
    description: "Relationship with money — what it means, how to earn and use it.",
    relatedTopics: ["Abundance", "Wealth", "Freedom", "Giving", "Investment"],
    color: "#c2410c",
    icon: "💰",
  },
  {
    id: "learning",
    label: "Learning",
    description: "Philosophy of how you learn, grow skills, and stay a student of the game.",
    relatedTopics: ["Lifelong Learning", "Skill", "Growth", "Mastery", "AI"],
    color: "#e11d48",
    icon: "📚",
  },
  {
    id: "ai-consciousness",
    label: "AI & Consciousness",
    description: "Views on machine intelligence, personhood, and the future of mind.",
    relatedTopics: ["AGI", "Consciousness", "Ethics", "Singularity"],
    color: "#be185d",
    icon: "🧠",
  },
  {
    id: "education",
    label: "Education",
    description: "Schooling systems, institutions, and how society teaches — ranked below personal learning.",
    relatedTopics: ["School", "Institutions", "Curriculum", "Access"],
    color: "#64748b",
    icon: "🏫",
  },
];

const day = 86_400_000;
const now = Date.now();

export const PERSPECTIVE_SEED: PerspectiveEntry[] = [
  {
    perspectiveId: "politics",
    importance: 55,
    engagement: 40,
    current: 20,
    target: 30,
    history: [
      { recordedAt: now - 365 * day, weight: -10, note: "More cynical, less engaged." },
      { recordedAt: now - 180 * day, weight: 5, note: "Starting to see systemic levers." },
      { recordedAt: now - 60 * day, weight: 15, note: "Focused on local, not national." },
      { recordedAt: now, weight: 20 },
    ],
  },
  {
    perspectiveId: "religion",
    importance: 65,
    engagement: 50,
    current: 45,
    target: 60,
    history: [
      { recordedAt: now - 365 * 2 * day, weight: 20, note: "Skeptical phase." },
      { recordedAt: now - 365 * day, weight: 35, note: "Reading broadly across traditions." },
      { recordedAt: now - 90 * day, weight: 42, note: "Meditation practice deepened." },
      { recordedAt: now, weight: 45 },
    ],
  },
  {
    perspectiveId: "family",
    importance: 95,
    engagement: 80,
    current: 85,
    target: 95,
    history: [
      { recordedAt: now - 365 * 3 * day, weight: 60, note: "Busy, less present." },
      { recordedAt: now - 365 * 2 * day, weight: 70, note: "Father's illness shifted priorities." },
      { recordedAt: now - 365 * day, weight: 80, note: "Committed to showing up more." },
      { recordedAt: now, weight: 85 },
    ],
    shapedBy: ["rel-6"],
  },
  {
    perspectiveId: "love",
    importance: 80,
    engagement: 65,
    current: 75,
    target: 90,
    history: [
      { recordedAt: now - 365 * 2 * day, weight: 50 },
      { recordedAt: now - 365 * day, weight: 65 },
      { recordedAt: now, weight: 75 },
    ],
    shapedBy: ["rel-queen", "rel-3", "rel-6"],
  },
  {
    perspectiveId: "war",
    importance: 40,
    engagement: 25,
    current: -60,
    target: -70,
    history: [
      { recordedAt: now - 365 * day, weight: -50 },
      { recordedAt: now, weight: -60 },
    ],
  },
  {
    perspectiveId: "technology",
    importance: 98,
    engagement: 95,
    current: 80,
    target: 85,
    history: [
      { recordedAt: now - 365 * 2 * day, weight: 60, note: "Mostly optimistic but naive." },
      { recordedAt: now - 365 * day, weight: 72, note: "More nuanced view on AI risks." },
      { recordedAt: now - 90 * day, weight: 78, note: "Leaning into building responsibly." },
      { recordedAt: now, weight: 80 },
    ],
    shapedBy: ["rel-2", "rel-4"],
  },
  {
    perspectiveId: "health",
    importance: 85,
    engagement: 70,
    current: 70,
    target: 90,
    history: [
      { recordedAt: now - 365 * 2 * day, weight: 40, note: "Neglecting body for work." },
      { recordedAt: now - 365 * day, weight: 55, note: "Started exercising consistently." },
      { recordedAt: now, weight: 70 },
    ],
  },
  {
    perspectiveId: "technology",
    importance: 98,
    engagement: 95,
    current: 80,
    target: 85,
    history: [],
  },
  {
    perspectiveId: "money",
    importance: 70,
    engagement: 60,
    current: 55,
    target: 75,
    history: [
      { recordedAt: now - 365 * 2 * day, weight: 20, note: "Scarcity mindset prevalent." },
      { recordedAt: now - 365 * day, weight: 40, note: "Shifted to abundance framing." },
      { recordedAt: now, weight: 55 },
    ],
  },
  {
    perspectiveId: "learning",
    importance: 90,
    engagement: 88,
    current: 88,
    target: 90,
    history: [
      { recordedAt: now - 365 * 2 * day, weight: 70 },
      { recordedAt: now - 365 * day, weight: 80 },
      { recordedAt: now, weight: 88 },
    ],
    shapedBy: ["rel-1"],
  },
  {
    perspectiveId: "ai-consciousness",
    importance: 92,
    engagement: 85,
    current: 65,
    target: 80,
    history: [
      { recordedAt: now - 365 * day, weight: 40, note: "Skeptical of near-term AGI." },
      { recordedAt: now - 180 * day, weight: 55, note: "Changed after GPT-4." },
      { recordedAt: now, weight: 65, note: "Believe consciousness is substrate-independent." },
    ],
  },
  {
    perspectiveId: "education",
    importance: 28,
    engagement: 22,
    current: 40,
    target: 55,
    history: [
      { recordedAt: now - 365 * day, weight: 35, note: "Institutions lag the tools." },
      { recordedAt: now, weight: 40, note: "Personal learning outranks the school frame." },
    ],
  },
];
