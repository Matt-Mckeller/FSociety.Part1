/**
 * Profile knowledge base — expanse_eye / Matthew McKeller.
 *
 * Authored mastery (weight) + engagement + bands. Formulas deferred.
 * Display source for the Profile Engagement lens.
 */

export type KbKind =
  | "meaning"
  | "skill"
  | "event"
  | "learn"
  | "want"
  | "attribute"
  | "trait";

export type KbTopic =
  | "design"
  | "ux"
  | "software"
  | "systems"
  | "ai"
  | "learning"
  | "love"
  | "leadership"
  | "health"
  | "identity"
  | "money"
  | "teach";

export type EngagementMode =
  | "meaning"
  | "skills"
  | "web"
  | "life"
  | "learn"
  | "signals"
  | "social"
  | "saved"
  | "schema";

export type MetricMode = "weight" | "engagement" | "both";
export type WebMode = "links" | "clusters" | "compare" | "edges";
export type SignalKind = "bit" | "letter" | "number" | "combo" | "color" | "media";
export type SocialProvider = "linkedin" | "instagram" | "x" | "youtube" | "local";
export type EventIcon =
  | "computer"
  | "play"
  | "life"
  | "recover"
  | "design"
  | "slump"
  | "ship"
  | "study";

export type KbNode = {
  id: string;
  label: string;
  kind: KbKind;
  weight: number;
  engagement: number;
  engagementLo: number;
  engagementHi: number;
  topics: KbTopic[];
  blurb?: string;
  learned?: string;
  result?: string;
  depth?: "recent" | "chapter" | "formative";
  valence?: "positive" | "negative" | "neutral";
  tier?: string;
  status?: "locked" | "available" | "unlocked";
  icon?: EventIcon;
  source: string;
};

export type KbEdge = {
  from: string;
  to: string;
  rel: "requires" | "unlocks" | "feeds" | "associates" | "taught-by";
};

export type TrainedSignal = {
  id: string;
  kind: SignalKind;
  label: string;
  value: number;
  engagement: number;
  engagementLo: number;
  engagementHi: number;
  kbNodeIds: string[];
  topics: KbTopic[];
  blurb: string;
  privacy: "public" | "friends" | "dark";
  swatch?: "green" | "pink" | "violet" | "amber" | "teal" | "blue";
};

export type SocialEvidence = {
  id: string;
  provider: SocialProvider;
  kind: "like" | "save" | "reply" | "view" | "endorse" | "post";
  label: string;
  detail: string;
  strength: number;
  matchedSignalIds: string[];
  matchedKbNodeIds: string[];
  privacy: "public" | "friends" | "dark";
};

export type SavedVisualization = {
  id: string;
  title: string;
  blurb: string;
  lens: EngagementMode;
  topics: KbTopic[];
  metric: MetricMode;
  webMode?: WebMode;
  selectedId?: string;
  selectedSignalId?: string;
  usefulnessVotes: number;
};

export const KB_TOPICS: Array<{ id: KbTopic; label: string }> = [
  { id: "design", label: "Design" },
  { id: "ux", label: "UX" },
  { id: "software", label: "Software" },
  { id: "systems", label: "Systems" },
  { id: "ai", label: "AI" },
  { id: "learning", label: "Learning" },
  { id: "love", label: "Love" },
  { id: "leadership", label: "Leadership" },
  { id: "health", label: "Health" },
  { id: "identity", label: "Identity" },
  { id: "money", label: "Money" },
  { id: "teach", label: "Teach" },
];

export const ENGAGEMENT_MODES: Array<{ id: EngagementMode; label: string; question: string }> = [
  { id: "meaning", label: "Meaning", question: "Words that carry weight" },
  { id: "skills", label: "Skills", question: "How good am I — nested by tier" },
  { id: "web", label: "Knowledge web", question: "Same links, different lenses" },
  { id: "life", label: "Life & events", question: "Bubbles sized by significance" },
  { id: "learn", label: "Learning fit", question: "How I take things in" },
  { id: "signals", label: "Signals", question: "Trained alphabet — letters, numbers, combos, color" },
  { id: "social", label: "Social", question: "Provider evidence → which nodes light up" },
  { id: "saved", label: "Saved", question: "Reopen trained visualization states" },
  { id: "schema", label: "Schema", question: "KB plan & provenance" },
];

export const WEB_MODE_META: Array<{ id: WebMode; label: string; tip: string }> = [
  { id: "clusters", label: "Topic clusters", tip: "Same nodes, no edges. Grouped by topic so you scan domains instead of spaghetti." },
  { id: "links", label: "Link graph", tip: "Directed edges: unlocks, feeds, taught-by. Best for prerequisites — can look tangled." },
  { id: "compare", label: "Meaning vs engage", tip: "No links. Dual bars: what matters vs what gets energy — gaps are the story." },
  { id: "edges", label: "Edge list", tip: "Readable table of each relationship. Use when the graph feels opaque." },
];

export const KB_NODES: KbNode[] = [
  {
    id: "m-learning",
    label: "Learning",
    kind: "meaning",
    weight: 95,
    engagement: 92,
    engagementLo: 84,
    engagementHi: 98,
    topics: ["learning", "identity", "teach"],
    blurb: "Highest-value theme · evolve",
    source: "MATTHEW.highestValueData · evolve",
  },
  {
    id: "m-web4",
    label: "Web 4",
    kind: "meaning",
    weight: 93,
    engagement: 78,
    engagementLo: 60,
    engagementHi: 88,
    topics: ["ai", "systems", "software"],
    blurb: "Favorite topic · future stack",
    source: "MATTHEW.highestValueData · favoriteTopics",
  },
  {
    id: "m-future",
    label: "Future",
    kind: "meaning",
    weight: 90,
    engagement: 70,
    engagementLo: 55,
    engagementHi: 85,
    topics: ["identity", "learning"],
    source: "MATTHEW.highestValueData · evolve",
  },
  {
    id: "m-engagement",
    label: "Engagement",
    kind: "meaning",
    weight: 91,
    engagement: 88,
    engagementLo: 75,
    engagementHi: 95,
    topics: ["learning", "teach", "design"],
    blurb: "Innovate theme",
    source: "MATTHEW.highestValueData · innovate",
  },
  {
    id: "m-ai",
    label: "AI",
    kind: "meaning",
    weight: 89,
    engagement: 86,
    engagementLo: 70,
    engagementHi: 94,
    topics: ["ai", "software", "systems"],
    source: "MATTHEW.highestValueData · interests",
  },
  {
    id: "m-systems",
    label: "Systems",
    kind: "meaning",
    weight: 88,
    engagement: 90,
    engagementLo: 80,
    engagementHi: 96,
    topics: ["systems", "software", "design"],
    source: "MATTHEW.highestValueData · interests",
  },
  {
    id: "m-love",
    label: "Love",
    kind: "meaning",
    weight: 88,
    engagement: 96,
    engagementLo: 88,
    engagementHi: 100,
    topics: ["love", "identity"],
    blurb: "Win theme · Perfect Loves",
    source: "MATTHEW.highestValueData · win",
  },
  {
    id: "m-bond",
    label: "Bond",
    kind: "meaning",
    weight: 86,
    engagement: 94,
    engagementLo: 85,
    engagementHi: 99,
    topics: ["love", "identity"],
    source: "MATTHEW.highestValueData · win",
  },
  {
    id: "m-becoming",
    label: "Becoming",
    kind: "meaning",
    weight: 84,
    engagement: 72,
    engagementLo: 55,
    engagementHi: 85,
    topics: ["identity", "learning", "love"],
    source: "MATTHEW.highestValueData · win",
  },
  {
    id: "m-clarity",
    label: "Clarity",
    kind: "meaning",
    weight: 78,
    engagement: 64,
    engagementLo: 40,
    engagementHi: 80,
    topics: ["health", "identity", "leadership"],
    source: "MATTHEW.highestValueData · heal",
  },
  {
    id: "m-privacy",
    label: "Privacy",
    kind: "meaning",
    weight: 74,
    engagement: 42,
    engagementLo: 30,
    engagementHi: 60,
    topics: ["identity", "love"],
    source: "MATTHEW.highestValueData · protect",
  },
  {
    id: "m-trust",
    label: "Trust",
    kind: "meaning",
    weight: 74,
    engagement: 58,
    engagementLo: 45,
    engagementHi: 75,
    topics: ["love", "leadership"],
    source: "MATTHEW.highestValueData · protect",
  },
  {
    id: "m-heart-evolve",
    label: "Heart.Evolve",
    kind: "meaning",
    weight: 87,
    engagement: 82,
    engagementLo: 70,
    engagementHi: 92,
    topics: ["love", "identity", "teach"],
    blurb: "Favorite topic · visual transformation",
    source: "MATTHEW.favoriteTopics",
  },
  {
    id: "m-spatial-ux",
    label: "Spatial UX",
    kind: "meaning",
    weight: 85,
    engagement: 80,
    engagementLo: 65,
    engagementHi: 90,
    topics: ["ux", "design", "software"],
    source: "MATTHEW.interests · professional",
  },
  {
    id: "s-design",
    label: "Design",
    kind: "skill",
    weight: 86,
    engagement: 84,
    engagementLo: 70,
    engagementHi: 92,
    topics: ["design", "ux", "software"],
    tier: "professional",
    status: "unlocked",
    blurb: "Advanced · design systems + visual craft",
    source: "MATTHEW.data.professional.categories",
  },
  {
    id: "s-ux",
    label: "UX",
    kind: "skill",
    weight: 92,
    engagement: 86,
    engagementLo: 75,
    engagementHi: 94,
    topics: ["ux", "design", "software"],
    tier: "professional",
    status: "unlocked",
    blurb: "Expert · Spatial UX lead",
    source: "MATTHEW.data.professional.categories",
  },
  {
    id: "s-software",
    label: "Development",
    kind: "skill",
    weight: 88,
    engagement: 94,
    engagementLo: 85,
    engagementHi: 98,
    topics: ["software", "systems", "ai"],
    tier: "professional",
    status: "unlocked",
    blurb: "Advanced · full-stack product shipping",
    source: "MATTHEW.data.professional.categories",
  },
  {
    id: "s-systems",
    label: "Architecture",
    kind: "skill",
    weight: 94,
    engagement: 91,
    engagementLo: 80,
    engagementHi: 97,
    topics: ["systems", "software", "design"],
    tier: "professional",
    status: "unlocked",
    blurb: "Expert · systems + product architecture",
    source: "MATTHEW.data.professional.categories",
  },
  {
    id: "s-cloud",
    label: "Cloud",
    kind: "skill",
    weight: 72,
    engagement: 68,
    engagementLo: 50,
    engagementHi: 80,
    topics: ["software", "systems"],
    tier: "professional",
    status: "unlocked",
    blurb: "Proficient · deploy, ops, hardening",
    source: "MATTHEW.data.professional.categories · inferred",
  },
  {
    id: "s-ai-product",
    label: "AI",
    kind: "skill",
    weight: 90,
    engagement: 83,
    engagementLo: 70,
    engagementHi: 92,
    topics: ["ai", "software", "systems"],
    tier: "professional",
    status: "unlocked",
    blurb: "Expert · AI product + agent UX",
    source: "MATTHEW.data.professional.categories",
  },
  {
    id: "s-security",
    label: "Security",
    kind: "skill",
    weight: 84,
    engagement: 58,
    engagementLo: 40,
    engagementHi: 75,
    topics: ["identity", "software", "systems"],
    tier: "professional",
    status: "unlocked",
    blurb: "Advanced · privacy-by-design · cyber title",
    source: "MATTHEW.data.professional.categories · privacy-security",
  },
  {
    id: "s-leadership",
    label: "Leadership",
    kind: "skill",
    weight: 86,
    engagement: 62,
    engagementLo: 45,
    engagementHi: 80,
    topics: ["leadership", "teach", "love"],
    tier: "professional",
    status: "unlocked",
    blurb: "Advanced · grand master",
    source: "MATTHEW.data.professional.categories · titles",
  },
  {
    id: "s-storytelling",
    label: "Storytelling",
    kind: "skill",
    weight: 91,
    engagement: 76,
    engagementLo: 60,
    engagementHi: 90,
    topics: ["teach", "learning", "design"],
    tier: "professional",
    status: "unlocked",
    blurb: "Expert · nested under Leadership category",
    source: "MATTHEW.data.professional.categories · titles",
  },
  {
    id: "s-deep-focus",
    label: "Deep Focus",
    kind: "skill",
    weight: 76,
    engagement: 68,
    engagementLo: 40,
    engagementHi: 85,
    topics: ["learning", "health", "software"],
    tier: "foundation",
    status: "unlocked",
    source: "character/skills.ts",
  },
  {
    id: "s-pattern-mind",
    label: "Pattern Mind",
    kind: "skill",
    weight: 84,
    engagement: 80,
    engagementLo: 65,
    engagementHi: 90,
    topics: ["learning", "systems", "ai"],
    tier: "foundation",
    status: "unlocked",
    source: "character/skills.ts",
  },
  {
    id: "s-emotional-read",
    label: "Emotional Read",
    kind: "skill",
    weight: 78,
    engagement: 74,
    engagementLo: 55,
    engagementHi: 88,
    topics: ["love", "leadership", "identity"],
    tier: "foundation",
    status: "unlocked",
    source: "character/skills.ts",
  },
  {
    id: "s-systems-architect",
    label: "Systems Architect",
    kind: "skill",
    weight: 88,
    engagement: 85,
    engagementLo: 70,
    engagementHi: 93,
    topics: ["systems", "software", "design"],
    tier: "developing",
    status: "unlocked",
    source: "character/skills.ts",
  },
  {
    id: "s-hyper-learning",
    label: "Hyper Learning",
    kind: "skill",
    weight: 72,
    engagement: 55,
    engagementLo: 35,
    engagementHi: 75,
    topics: ["learning", "ai"],
    tier: "developing",
    status: "available",
    source: "character/skills.ts",
  },
  {
    id: "s-resonant-leadership",
    label: "Resonant Leadership",
    kind: "skill",
    weight: 68,
    engagement: 48,
    engagementLo: 30,
    engagementHi: 70,
    topics: ["leadership", "love", "teach"],
    tier: "developing",
    status: "available",
    source: "character/skills.ts",
  },
  {
    id: "a-ei",
    label: "Emotional Intelligence",
    kind: "attribute",
    weight: 91,
    engagement: 80,
    engagementLo: 65,
    engagementHi: 92,
    topics: ["love", "leadership", "identity"],
    source: "ATTRIBUTE_PROGRESS_SEED",
  },
  {
    id: "a-perception",
    label: "Perception",
    kind: "attribute",
    weight: 90,
    engagement: 82,
    engagementLo: 70,
    engagementHi: 92,
    topics: ["ux", "design", "identity"],
    source: "ATTRIBUTE_PROGRESS_SEED",
  },
  {
    id: "a-creativity",
    label: "Creativity",
    kind: "attribute",
    weight: 116,
    engagement: 94,
    engagementLo: 82,
    engagementHi: 98,
    topics: ["design", "ai", "teach"],
    blurb: "96 base + 20 bonus — perfect content lead",
    source: "ATTRIBUTE_PROGRESS_SEED",
  },
  {
    id: "a-communication",
    label: "Communication",
    kind: "attribute",
    weight: 103,
    engagement: 92,
    engagementLo: 80,
    engagementHi: 97,
    topics: ["teach", "content", "leadership"],
    blurb: "95 base + 8 bonus — speech lands",
    source: "ATTRIBUTE_PROGRESS_SEED",
  },
  {
    id: "a-charisma",
    label: "Charisma",
    kind: "attribute",
    weight: 108,
    engagement: 90,
    engagementLo: 78,
    engagementHi: 96,
    topics: ["content", "leadership", "love"],
    blurb: "94 base + 14 bonus — audience inspired",
    source: "ATTRIBUTE_PROGRESS_SEED",
  },
  {
    id: "a-focus",
    label: "Focus",
    kind: "attribute",
    weight: 115,
    engagement: 88,
    engagementLo: 55,
    engagementHi: 96,
    topics: ["learning", "software", "content"],
    blurb: "93 base + 22 bonus — optimized creation window",
    source: "ATTRIBUTE_PROGRESS_SEED",
  },
  {
    id: "a-memory",
    label: "Memory",
    kind: "attribute",
    weight: 92,
    engagement: 84,
    engagementLo: 70,
    engagementHi: 94,
    topics: ["learning", "content", "systems"],
    blurb: "92 base — stacked information, living archive",
    source: "ATTRIBUTE_PROGRESS_SEED",
  },
  {
    id: "l-visual",
    label: "Visual",
    kind: "learn",
    weight: 94,
    engagement: 90,
    engagementLo: 80,
    engagementHi: 96,
    topics: ["design", "ux", "learning"],
    blurb: "Modality · diagrams & spatial maps",
    source: "LEARNING_FACET_PROGRESS_SEED",
  },
  {
    id: "l-associative",
    label: "Associative",
    kind: "learn",
    weight: 92,
    engagement: 88,
    engagementLo: 75,
    engagementHi: 95,
    topics: ["learning", "ai", "systems"],
    blurb: "Modality · metaphors first",
    source: "LEARNING_FACET_PROGRESS_SEED",
  },
  {
    id: "l-story",
    label: "Storytelling (learn)",
    kind: "learn",
    weight: 91,
    engagement: 74,
    engagementLo: 55,
    engagementHi: 88,
    topics: ["teach", "learning", "love"],
    blurb: "Format preference",
    source: "LEARNING_FACET_PROGRESS_SEED",
  },
  {
    id: "l-problem",
    label: "Problem Solving",
    kind: "learn",
    weight: 88,
    engagement: 86,
    engagementLo: 70,
    engagementHi: 94,
    topics: ["software", "systems", "learning"],
    source: "LEARNING_FACET_PROGRESS_SEED",
  },
  {
    id: "l-ship",
    label: "Ship by Building",
    kind: "learn",
    weight: 87,
    engagement: 92,
    engagementLo: 80,
    engagementHi: 98,
    topics: ["software", "design", "teach"],
    source: "LEARNING_FACET_PROGRESS_SEED",
  },
  {
    id: "l-logical",
    label: "Logical / Systems",
    kind: "learn",
    weight: 86,
    engagement: 84,
    engagementLo: 70,
    engagementHi: 92,
    topics: ["systems", "software", "learning"],
    source: "LEARNING_FACET_PROGRESS_SEED",
  },
  {
    id: "l-gaming",
    label: "Gaming Analogies",
    kind: "learn",
    weight: 80,
    engagement: 72,
    engagementLo: 50,
    engagementHi: 85,
    topics: ["learning", "identity", "design"],
    source: "LEARNING_FACET_PROGRESS_SEED",
  },
  {
    id: "l-auditory",
    label: "Auditory",
    kind: "learn",
    weight: 28,
    engagement: 92,
    engagementLo: 78,
    engagementHi: 98,
    topics: ["learning", "health"],
    blurb: "High engage with audio / EDM / voice — low learn-from-audio fit",
    source: "LEARNING_FACET_PROGRESS_SEED · engage≠learn",
  },
  {
    id: "w-bond",
    label: "Em",
    kind: "want",
    weight: 94,
    engagement: 97,
    engagementLo: 90,
    engagementHi: 100,
    topics: ["love", "identity"],
    blurb: "Primary pull · Bond Resonance",
    source: "CHARACTER_STATUS_SEED.wants",
  },
  {
    id: "w-combine",
    label: "Combine & explain",
    kind: "want",
    weight: 90,
    engagement: 88,
    engagementLo: 75,
    engagementHi: 95,
    topics: ["teach", "systems", "learning"],
    source: "CHARACTER_STATUS_SEED.wants",
  },
  {
    id: "w-money",
    label: "Money.AmplifyMe()",
    kind: "want",
    weight: 88,
    engagement: 85,
    engagementLo: 70,
    engagementHi: 95,
    topics: ["money", "software", "leadership"],
    source: "CHARACTER_STATUS_SEED.wants",
  },
  {
    id: "w-teach",
    label: "Teach people who need it",
    kind: "want",
    weight: 68,
    engagement: 52,
    engagementLo: 35,
    engagementHi: 75,
    topics: ["teach", "learning"],
    source: "CHARACTER_STATUS_SEED.wants",
  },
  {
    id: "e-computers",
    label: "Computers, and learning from them",
    kind: "event",
    weight: 100,
    engagement: 70,
    engagementLo: 50,
    engagementHi: 85,
    topics: ["learning", "identity", "software"],
    depth: "formative",
    valence: "positive",
    icon: "computer",
    learned:
      "Any system can be understood if you poke long enough — learning is the most reliably interesting thing available.",
    result:
      "Growth-oriented; high need for engagement; ongoing work managing living in several worlds at once.",
    source: "coldStorage · cold-1",
  },
  {
    id: "e-4eye-irl",
    label: "Playing 4eye in real life",
    kind: "event",
    weight: 95,
    engagement: 88,
    engagementLo: 70,
    engagementHi: 95,
    topics: ["learning", "identity", "design"],
    depth: "formative",
    valence: "positive",
    icon: "play",
    learned:
      "Curiosity → feedback → mastery is not a property of games — it runs anywhere you point it.",
    result: "Ordinary days became systems worth engaging — premise of the product.",
    source: "coldStorage · cold-2",
  },
  {
    id: "e-life",
    label: "Life experiences",
    kind: "event",
    weight: 98,
    engagement: 90,
    engagementLo: 75,
    engagementHi: 98,
    topics: ["identity", "love", "learning"],
    depth: "formative",
    valence: "neutral",
    icon: "life",
    learned: "A ton, and still going. Stories from this period will be phenomenal.",
    result: "Equipped to help people from having been through the thing.",
    source: "coldStorage · cold-4",
  },
  {
    id: "e-burnout",
    label: "Burnout and recovery",
    kind: "event",
    weight: 90,
    engagement: 45,
    engagementLo: 25,
    engagementHi: 70,
    topics: ["health", "learning", "identity"],
    depth: "formative",
    valence: "neutral",
    icon: "recover",
    learned:
      "What depletes, what restores, early signals — and how much panic is noise.",
    result: "Mostly ignore it now; it still shows up but does not run the schedule.",
    source: "coldStorage · cold-3",
  },
  {
    id: "e-storybook",
    label: "First Storybook design system",
    kind: "event",
    weight: 88,
    engagement: 62,
    engagementLo: 40,
    engagementHi: 80,
    topics: ["design", "ux", "software", "systems"],
    depth: "chapter",
    valence: "positive",
    icon: "design",
    learned:
      "Building was a third; making it obvious enough that others reach for it without asking was two thirds.",
    result: "Ship a working example alongside every new pattern.",
    source: "memory · mem-1",
  },
  {
    id: "e-slump",
    label: "Two-week motivation slump",
    kind: "event",
    weight: 82,
    engagement: 35,
    engagementLo: 20,
    engagementHi: 55,
    topics: ["health", "learning", "identity"],
    depth: "chapter",
    valence: "positive",
    icon: "slump",
    learned: "Not motivation — the next step had gone vague.",
    result: "Cut work small enough to finish in one sitting.",
    source: "memory · mem-2",
  },
  {
    id: "e-crew-queue",
    label: "Command Center crew queue",
    kind: "event",
    weight: 90,
    engagement: 78,
    engagementLo: 55,
    engagementHi: 90,
    topics: ["software", "systems", "leadership"],
    depth: "recent",
    valence: "positive",
    icon: "ship",
    learned:
      "Blocked on a decision nobody owned, not engineering. Ownership cleared weeks of drag.",
    result: "Decisions get an owner and a date when raised.",
    source: "recentEvents · ev-1",
  },
  {
    id: "e-ds-session",
    label: "Deep learning: design systems",
    kind: "event",
    weight: 72,
    engagement: 66,
    engagementLo: 45,
    engagementHi: 80,
    topics: ["design", "ux", "systems", "learning"],
    depth: "recent",
    valence: "positive",
    icon: "study",
    learned:
      "Hard part is deciding what is allowed to vary — and refusing everything else.",
    result: "Cut props instead of adding them.",
    source: "recentEvents · ev-2",
  },
];

export const KB_EDGES: KbEdge[] = [
  { from: "m-learning", to: "l-visual", rel: "associates" },
  { from: "m-learning", to: "l-associative", rel: "associates" },
  { from: "m-learning", to: "e-computers", rel: "taught-by" },
  { from: "m-learning", to: "e-4eye-irl", rel: "taught-by" },
  { from: "m-systems", to: "s-systems", rel: "feeds" },
  { from: "m-systems", to: "s-systems-architect", rel: "associates" },
  { from: "m-spatial-ux", to: "s-ux", rel: "associates" },
  { from: "m-spatial-ux", to: "s-design", rel: "associates" },
  { from: "m-ai", to: "s-ai-product", rel: "associates" },
  { from: "m-love", to: "w-bond", rel: "feeds" },
  { from: "m-love", to: "m-heart-evolve", rel: "associates" },
  { from: "m-engagement", to: "s-storytelling", rel: "feeds" },
  { from: "m-web4", to: "s-software", rel: "associates" },
  { from: "s-deep-focus", to: "s-hyper-learning", rel: "unlocks" },
  { from: "s-pattern-mind", to: "s-systems-architect", rel: "unlocks" },
  { from: "s-emotional-read", to: "s-resonant-leadership", rel: "unlocks" },
  { from: "s-systems", to: "s-systems-architect", rel: "feeds" },
  { from: "s-design", to: "e-storybook", rel: "taught-by" },
  { from: "s-ux", to: "e-ds-session", rel: "taught-by" },
  { from: "s-software", to: "e-crew-queue", rel: "taught-by" },
  { from: "l-visual", to: "s-design", rel: "feeds" },
  { from: "l-ship", to: "s-software", rel: "feeds" },
  { from: "l-story", to: "s-storytelling", rel: "feeds" },
  { from: "w-combine", to: "m-learning", rel: "feeds" },
  { from: "w-teach", to: "s-storytelling", rel: "feeds" },
  { from: "a-ei", to: "s-emotional-read", rel: "feeds" },
  { from: "a-focus", to: "s-deep-focus", rel: "feeds" },
  { from: "a-creativity", to: "s-design", rel: "feeds" },
  { from: "e-burnout", to: "m-clarity", rel: "feeds" },
  { from: "e-life", to: "m-becoming", rel: "feeds" },
];

export const KB_SIGNALS: TrainedSignal[] = [
  {
    id: "sig-l",
    kind: "letter",
    label: "L",
    value: 96,
    engagement: 94,
    engagementLo: 85,
    engagementHi: 99,
    kbNodeIds: ["m-love", "m-learning", "w-bond"],
    topics: ["love", "learning", "identity"],
    blurb: "Love · Learning · Leadership pull letter",
    privacy: "public",
  },
  {
    id: "sig-4",
    kind: "number",
    label: "4",
    value: 98,
    engagement: 90,
    engagementLo: 80,
    engagementHi: 98,
    kbNodeIds: ["m-web4", "s-software", "e-4eye-irl"],
    topics: ["identity", "software", "ai"],
    blurb: "4eye · Web 4 · brand number",
    privacy: "public",
  },
  {
    id: "sig-m",
    kind: "letter",
    label: "M",
    value: 88,
    engagement: 72,
    engagementLo: 55,
    engagementHi: 85,
    kbNodeIds: ["m-becoming", "w-bond"],
    topics: ["identity", "love"],
    blurb: "Matthew / becoming mark",
    privacy: "friends",
  },
  {
    id: "sig-e",
    kind: "letter",
    label: "E",
    value: 90,
    engagement: 86,
    engagementLo: 70,
    engagementHi: 94,
    kbNodeIds: ["m-heart-evolve", "m-engagement", "w-bond"],
    topics: ["love", "identity", "teach"],
    blurb: "Evolve · Engagement · Em construct",
    privacy: "friends",
  },
  {
    id: "sig-12",
    kind: "number",
    label: "∞",
    value: 100,
    engagement: 60,
    engagementLo: 40,
    engagementHi: 75,
    kbNodeIds: ["s-leadership"],
    topics: ["leadership", "identity"],
    blurb: "Profile level mark — infinite power",
    privacy: "public",
  },
  {
    id: "sig-bit-hud",
    kind: "bit",
    label: "HUD tick",
    value: 82,
    engagement: 78,
    engagementLo: 60,
    engagementHi: 90,
    kbNodeIds: ["m-systems", "s-systems", "l-gaming"],
    topics: ["systems", "design", "learning"],
    blurb: "Symbol-grid / HUD literacy bit",
    privacy: "public",
  },
  {
    id: "sig-bit-soft",
    kind: "bit",
    label: "Soft-public",
    value: 70,
    engagement: 55,
    engagementLo: 35,
    engagementHi: 70,
    kbNodeIds: ["m-privacy", "m-trust"],
    topics: ["identity", "teach"],
    blurb: "Teach in public · keep dark what must stay dark",
    privacy: "public",
  },
  {
    id: "sig-combo-4eye",
    kind: "combo",
    label: "4eye",
    value: 99,
    engagement: 92,
    engagementLo: 85,
    engagementHi: 99,
    kbNodeIds: ["e-4eye-irl", "m-systems", "s-software"],
    topics: ["identity", "software", "learning"],
    blurb: "Playing the world as the game",
    privacy: "public",
  },
  {
    id: "sig-combo-web4",
    kind: "combo",
    label: "Web 4",
    value: 93,
    engagement: 78,
    engagementLo: 60,
    engagementHi: 88,
    kbNodeIds: ["m-web4", "s-ai-product", "m-ai"],
    topics: ["ai", "systems", "software"],
    blurb: "Favorite future-stack phrase",
    privacy: "public",
  },
  {
    id: "sig-combo-love",
    kind: "combo",
    label: "Love.Perfectly()",
    value: 95,
    engagement: 88,
    engagementLo: 75,
    engagementHi: 96,
    kbNodeIds: ["m-love", "w-bond", "m-heart-evolve"],
    topics: ["love", "identity"],
    blurb: "Goal-code combo",
    privacy: "friends",
  },
  {
    id: "sig-combo-heart",
    kind: "combo",
    label: "Heart.Evolve",
    value: 94,
    engagement: 82,
    engagementLo: 70,
    engagementHi: 92,
    kbNodeIds: ["m-heart-evolve", "m-becoming", "w-bond"],
    topics: ["love", "teach", "identity"],
    blurb: "Visual transformation series mark",
    privacy: "public",
  },
  {
    id: "sig-combo-spatial",
    kind: "combo",
    label: "Spatial UX",
    value: 91,
    engagement: 80,
    engagementLo: 65,
    engagementHi: 90,
    kbNodeIds: ["m-spatial-ux", "s-ux", "s-design"],
    topics: ["ux", "design", "software"],
    blurb: "Professional craft phrase",
    privacy: "public",
  },
  {
    id: "sig-color-green",
    kind: "color",
    label: "Expanse green",
    value: 92,
    engagement: 85,
    engagementLo: 70,
    engagementHi: 94,
    kbNodeIds: ["m-systems", "s-software", "w-money"],
    topics: ["identity", "software", "money"],
    blurb: "Profile accent · soft-public brand",
    privacy: "public",
    swatch: "green",
  },
  {
    id: "sig-color-pink",
    kind: "color",
    label: "Bond pink",
    value: 90,
    engagement: 96,
    engagementLo: 88,
    engagementHi: 100,
    kbNodeIds: ["w-bond", "m-love", "m-bond"],
    topics: ["love", "identity"],
    blurb: "Em pull color",
    privacy: "friends",
    swatch: "pink",
  },
  {
    id: "sig-color-violet",
    kind: "color",
    label: "Synthesis violet",
    value: 88,
    engagement: 84,
    engagementLo: 70,
    engagementHi: 92,
    kbNodeIds: ["m-systems", "w-combine", "s-systems-architect"],
    topics: ["systems", "learning", "teach"],
    blurb: "Synthesis Lock / combine-and-explain",
    privacy: "public",
    swatch: "violet",
  },
  {
    id: "sig-color-amber",
    kind: "color",
    label: "Bond amber",
    value: 80,
    engagement: 74,
    engagementLo: 55,
    engagementHi: 88,
    kbNodeIds: ["w-bond", "a-ei"],
    topics: ["love", "leadership"],
    blurb: "Bond Resonance aura accent",
    privacy: "friends",
    swatch: "amber",
  },
  {
    id: "sig-color-teal",
    kind: "color",
    label: "Protect teal",
    value: 72,
    engagement: 42,
    engagementLo: 30,
    engagementHi: 60,
    kbNodeIds: ["m-privacy", "m-trust", "m-clarity"],
    topics: ["identity", "health"],
    blurb: "Protect theme — high value, quieter engage",
    privacy: "public",
    swatch: "teal",
  },
  {
    id: "sig-media-supermind",
    kind: "media",
    label: "Supermind",
    value: 86,
    engagement: 70,
    engagementLo: 50,
    engagementHi: 85,
    kbNodeIds: ["m-learning", "l-visual", "a-focus"],
    topics: ["learning", "ai"],
    blurb: "Favorite media highlight",
    privacy: "public",
  },
  {
    id: "sig-media-edm",
    kind: "media",
    label: "EDM / focus music",
    value: 78,
    engagement: 92,
    engagementLo: 78,
    engagementHi: 98,
    kbNodeIds: ["a-focus", "s-deep-focus", "l-auditory"],
    topics: ["health", "learning"],
    blurb: "Very high audio engagement — not the same as learn-from-audio",
    privacy: "public",
  },
];

export const KB_SOCIAL: SocialEvidence[] = [
  {
    id: "soc-li-skills",
    provider: "linkedin",
    kind: "endorse",
    label: "LinkedIn · Systems / UX / AI skills",
    detail: "Maps to professional skill areas — Architecture, UX, AI, Design",
    strength: 88,
    matchedSignalIds: ["sig-combo-spatial", "sig-4"],
    matchedKbNodeIds: ["s-systems", "s-ux", "s-ai-product", "s-design"],
    privacy: "public",
  },
  {
    id: "soc-li-headline",
    provider: "linkedin",
    kind: "post",
    label: "LinkedIn · Founder headline",
    detail: "Expanse / 4eye founder framing → software + systems meaning",
    strength: 80,
    matchedSignalIds: ["sig-combo-4eye", "sig-color-green"],
    matchedKbNodeIds: ["s-software", "m-systems", "s-leadership"],
    privacy: "public",
  },
  {
    id: "soc-ig-palette",
    provider: "instagram",
    kind: "save",
    label: "IG saves · green / violet palettes",
    detail: "Color atoms from saved visual refs",
    strength: 74,
    matchedSignalIds: ["sig-color-green", "sig-color-violet"],
    matchedKbNodeIds: ["s-design", "m-spatial-ux", "l-visual"],
    privacy: "friends",
  },
  {
    id: "soc-x-web4",
    provider: "x",
    kind: "like",
    label: "X · Web 4 / systems phrases",
    detail: "High-engage phrase hits → combo signals",
    strength: 76,
    matchedSignalIds: ["sig-combo-web4", "sig-combo-4eye"],
    matchedKbNodeIds: ["m-web4", "m-ai", "m-systems"],
    privacy: "public",
  },
  {
    id: "soc-yt-walk",
    provider: "youtube",
    kind: "view",
    label: "YouTube · yen walkthrough dwell",
    detail: "Teach-from-recordings engagement",
    strength: 82,
    matchedSignalIds: ["sig-combo-heart", "sig-l"],
    matchedKbNodeIds: ["s-storytelling", "w-teach", "w-combine", "l-story"],
    privacy: "public",
  },
  {
    id: "soc-local-evolve",
    provider: "local",
    kind: "post",
    label: "Local /social · Heart.Evolve embed",
    detail: "Evolve series on public social hub",
    strength: 85,
    matchedSignalIds: ["sig-combo-heart", "sig-color-pink", "sig-e"],
    matchedKbNodeIds: ["m-heart-evolve", "w-bond", "m-love"],
    privacy: "public",
  },
  /*
    A `privacy: "dark"` row lived here. The engagement lens pinned it past the
    topic filter and rendered it with a "dark" label, which announced that
    something was being withheld while showing it — and because this module is
    bundled, its text shipped to the browser either way.

    Removed rather than relocated: it carried no data, only the label and the
    note that it was excluded from training. Nothing was lost.
  */
];

export const KB_SAVED: SavedVisualization[] = [
  {
    id: "sv-love",
    title: "Love · meaning + engage",
    blurb: "Bond / Heart.Evolve / cats pull — dual scores",
    lens: "meaning",
    topics: ["love", "identity"],
    metric: "both",
    selectedId: "m-love",
    usefulnessVotes: 12,
  },
  {
    id: "sv-craft",
    title: "Architecture / Design / UX skills",
    blurb: "LinkedIn-style professional nest · ranked areas",
    lens: "skills",
    topics: ["design", "ux", "software"],
    metric: "both",
    selectedId: "s-systems",
    usefulnessVotes: 9,
  },
  {
    id: "sv-life",
    title: "Formative life bubbles",
    blurb: "Cold-storage stories sized by significance",
    lens: "life",
    topics: ["learning", "identity"],
    metric: "weight",
    selectedId: "e-computers",
    usefulnessVotes: 7,
  },
  {
    id: "sv-alphabet",
    title: "Signal alphabet · L·4·green",
    blurb: "Highest-value glyphs ranked",
    lens: "signals",
    topics: [],
    metric: "both",
    selectedSignalId: "sig-combo-4eye",
    usefulnessVotes: 11,
  },
  {
    id: "sv-web-learn",
    title: "Web clusters · Learning",
    blurb: "F14-shaped clusters without edge spaghetti",
    lens: "web",
    topics: ["learning"],
    metric: "engagement",
    webMode: "clusters",
    selectedId: "m-learning",
    usefulnessVotes: 8,
  },
  {
    id: "sv-social-li",
    title: "Social · LinkedIn → skills",
    blurb: "Provider evidence lighting professional nodes",
    lens: "social",
    topics: ["software", "ux", "systems"],
    metric: "both",
    selectedId: "s-systems",
    usefulnessVotes: 5,
  },
];

export function filterKbNodes(topics: KbTopic[], kinds?: KbKind[]): KbNode[] {
  return KB_NODES.filter((n) => {
    const topicOk = topics.length === 0 || n.topics.some((t) => topics.includes(t));
    const kindOk = !kinds || kinds.includes(n.kind);
    return topicOk && kindOk;
  });
}

export function filterKbSignals(topics: KbTopic[]): TrainedSignal[] {
  return KB_SIGNALS.filter(
    (s) => topics.length === 0 || s.topics.some((t) => topics.includes(t)),
  );
}

export function kbNodeLabel(id: string): string {
  return KB_NODES.find((n) => n.id === id)?.label ?? id;
}

export function kbSignalLabel(id: string): string {
  return KB_SIGNALS.find((s) => s.id === id)?.label ?? id;
}

export function kbNeighborIds(id: string): Set<string> {
  const set = new Set<string>([id]);
  for (const e of KB_EDGES) {
    if (e.from === id) set.add(e.to);
    if (e.to === id) set.add(e.from);
  }
  return set;
}
