
/**
 * Character — Learning styles & preferences.
 *
 * Same shape as attributes (base · tier · ranked table) but for *how* this
 * person takes things in and prefers to work — not raw capability. Seeded for
 * expanse_eye from the Learning tile modalities, profile communication view
 * (processing / memory / optimal format), Storyteller title, and the content /
 * systems work loadout.
 */

export type LearningFacetKind = "style" | "preference";

/** Coarse buckets when the full list is expanded. */
export type LearningFacetGroup = "modality" | "format" | "stance";

export const LEARNING_FACET_GROUP_LABEL: Record<LearningFacetGroup, string> = {
  modality: "Modality",
  format: "Format",
  stance: "Stance",
};

export const LEARNING_FACET_KIND_LABEL: Record<LearningFacetKind, string> = {
  style: "Style",
  preference: "Preference",
};

export interface LearningFacetMeta {
  id: string;
  label: string;
  description: string;
  kind: LearningFacetKind;
  group: LearningFacetGroup;
  color: string;
  tiers: [string, string, string, string, string];
  /** Where this was drawn from — keeps the seed honest. */
  source: string;
}

export interface LearningFacetProgress {
  /** Fit / strength 0–100 for this character. */
  base: number;
  /** Reserved — e.g. session boost later. Kept for AttributesTable parity. */
  bonus: number;
}

export type LearningFacetProgressMap = Record<string, LearningFacetProgress>;

export const LEARNING_FACETS: LearningFacetMeta[] = [
  {
    id: "visual",
    label: "Visual",
    description: "See it — diagrams, spatial layouts, maps of the system.",
    kind: "style",
    group: "modality",
    color: "#d97706",
    tiers: ["Blind", "Noticing", "Fluent", "Spatial", "Architect"],
    source: "Learning modalities · Spatial UX · professional skills",
  },
  {
    id: "associative",
    label: "Associative",
    description: "Link new material to what you already know — metaphors first.",
    kind: "style",
    group: "modality",
    color: "#7c3aed",
    tiers: ["Literal", "Linking", "Weaving", "Lattice", "Web"],
    source: "Communication processingStyle · Learning associative modality",
  },
  {
    id: "storytelling",
    label: "Storytelling",
    description: "Narrative as the carrier — walkthroughs, Heart.Evolve, teach from recordings.",
    kind: "preference",
    group: "format",
    color: "#e11d48",
    tiers: ["Dry", "Anecdotal", "Narrative", "Storyteller", "Mythic"],
    source: "Title · Creating Content / Storytelling / Designing · respondsWellTo",
  },
  {
    id: "problem-solving",
    label: "Problem Solving",
    description: "Learn by tackling the hard case, not the abstract syllabus.",
    kind: "style",
    group: "modality",
    color: "#2563eb",
    tiers: ["Avoidant", "Trying", "Working", "Relentless", "Solver"],
    source: "Learning modalities · systems / founder work",
  },
  {
    id: "ship-by-building",
    label: "Ship by Building",
    description: "Understanding lands when the thing exists and ships.",
    kind: "preference",
    group: "stance",
    color: "#0f766e",
    tiers: ["Theory-first", "Prototyping", "Shipping", "Live-fire", "Forge"],
    source: "Grow() · Achieve() · yen / 4eye / EDU stack",
  },
  {
    id: "logical",
    label: "Logical / Systems",
    description: "Structure, models, and causal chains — the architecture of the thing.",
    kind: "style",
    group: "modality",
    color: "#1d4ed8",
    tiers: ["Scattered", "Ordering", "Structured", "Systemic", "Formal"],
    source: "Learning logical modality · systems design skill",
  },
  {
    id: "deep-systems",
    label: "Deep Systems",
    description: "Prefer depth and mechanism over shallow tips and checklists.",
    kind: "preference",
    group: "stance",
    color: "#312e81",
    tiers: ["Surface", "Curious", "Deep", "Exhaustive", "Complete"],
    source: "Learning depth options · Command Center / vision work",
  },
  {
    id: "reading-writing",
    label: "Reading / Writing",
    description: "Plans, notes, specs — thinking that leaves a trail of words.",
    kind: "style",
    group: "modality",
    color: "#475569",
    tiers: ["Oral-only", "Notes", "Drafting", "Authoring", "Canon"],
    source: "Learning reading-writing · notes / plans surface",
  },
  {
    id: "small-chunks-imagery",
    label: "Chunks + Imagery",
    description: "Short pieces with a picture beat long lectures every time.",
    kind: "preference",
    group: "format",
    color: "#ea580c",
    tiers: ["Walls of text", "Sectioned", "Chunked", "Imaged", "Mnemonic"],
    source: "Communication optimalFormat · respondsWellTo",
  },
  {
    id: "gaming-analogies",
    label: "Gaming Analogies",
    description: "RPG / HUD / loadout language makes abstract systems land.",
    kind: "preference",
    group: "format",
    color: "#db2777",
    tiers: ["Plain", "Occasional", "Fluent", "Native", "Ludic"],
    source: "Interests · Games · character model itself",
  },
  {
    id: "verbal",
    label: "Verbal",
    description: "Talk it through — narrate, record, teach aloud.",
    kind: "style",
    group: "modality",
    color: "#9333ea",
    tiers: ["Silent", "Muttering", "Explaining", "Teaching", "Orator"],
    source: "Learning verbal · Teach & Ship / recordings",
  },
  {
    id: "teach-to-learn",
    label: "Teach to Learn",
    description: "The half that keeps you honest — explain it until it clarifies.",
    kind: "preference",
    group: "stance",
    color: "#c026d3",
    tiers: ["Private", "Sharing", "Teaching", "Mentoring", "School"],
    source: "Equipped actions Teach/Share · Expanse EDU",
  },
  {
    id: "social",
    label: "Social",
    description: "Learn with and from other people — not only alone at the desk.",
    kind: "style",
    group: "modality",
    color: "#ec4899",
    tiers: ["Solo", "Occasional", "Collaborative", "Communal", "Networked"],
    source: "Learning social modality · community / teach loop",
  },
  {
    id: "kinesthetic",
    label: "Kinesthetic",
    description: "Hands on the artifact — click, rearrange, build the UI.",
    kind: "style",
    group: "modality",
    color: "#16a34a",
    tiers: ["Spectator", "Touching", "Making", "Embodied", "Craft"],
    source: "Learning kinesthetic · mockup / design work",
  },
  {
    id: "soft-public",
    label: "Soft Public",
    description: "Ship teaching in public; keep dark what must stay dark.",
    kind: "preference",
    group: "stance",
    color: "#64748b",
    tiers: ["Hidden", "Selective", "Soft-public", "Open", "Broadcast"],
    source: "Matthew communication summary · privacy stance",
  },
  {
    id: "auditory",
    label: "Auditory",
    description:
      "Hear it — audio, rhythm, voice, EDM. High engagement for this profile; low as a primary learning channel (engage ≠ learn).",
    kind: "style",
    group: "modality",
    color: "#0d9488",
    tiers: ["Deaf to it", "Background", "Useful", "Preferred", "Primary"],
    source: "Learning auditory — high engage (music/voice), low learn-fit vs visual/associative",
  },
];

/** Same thresholds as attributes so the tables feel like one system. */
export function learningTierIndex(value: number): number {
  if (value >= 90) return 4;
  if (value >= 70) return 3;
  if (value >= 45) return 2;
  if (value >= 20) return 1;
  return 0;
}

export function learningEffectiveValue(p: LearningFacetProgress): number {
  return Math.min(100, p.base + p.bonus);
}

/** Ranked fit for expanse_eye — highest first in seed order for readability. */
export const LEARNING_FACET_PROGRESS_SEED: LearningFacetProgressMap = {
  visual: { base: 94, bonus: 0 },
  associative: { base: 92, bonus: 0 },
  storytelling: { base: 91, bonus: 0 },
  "problem-solving": { base: 88, bonus: 0 },
  "ship-by-building": { base: 87, bonus: 0 },
  logical: { base: 86, bonus: 0 },
  "deep-systems": { base: 85, bonus: 0 },
  "reading-writing": { base: 84, bonus: 0 },
  "small-chunks-imagery": { base: 82, bonus: 0 },
  "gaming-analogies": { base: 80, bonus: 0 },
  verbal: { base: 78, bonus: 0 },
  "teach-to-learn": { base: 76, bonus: 0 },
  social: { base: 72, bonus: 0 },
  kinesthetic: { base: 68, bonus: 0 },
  "soft-public": { base: 66, bonus: 0 },
  /** Learn-fit low; engagement with audio is high and lives on the Engagement lens / KB */
  auditory: { base: 28, bonus: 0 },
};
