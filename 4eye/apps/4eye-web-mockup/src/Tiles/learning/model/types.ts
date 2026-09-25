/**
 * Learning tile — domain model.
 *
 * The Learning screen captures *how* a learner wants to work on something:
 *   1. Input Types — the modality the learner brings in (text, voice, image…).
 *   2. Checklist   — concrete sub-steps for the current learning session.
 *   3. Options     — grouped toggles that shape the experience (pace as a
 *                    200-APM throughput rating, depth, support style, output format).
 *
 * UI-first mockup per the Character & Screens plan — example data only.
 */

import type { SymbolColor } from "@4eye/types";

import type { ApmSnapshot, PaceBand } from "./apm";

/** The modality a learner brings into a session. */
export type LearningInputType =
  | "text"
  | "voice"
  | "image"
  | "link"
  | "template";

export interface LearningInputTypeMeta {
  id: LearningInputType;
  label: string;
  /** Deep-import icon name resolved by {@link InputTypePicker}. */
  icon: string;
  blurb: string;
  accent: SymbolColor;
}

export const LEARNING_INPUT_TYPES: LearningInputType[] = [
  "text",
  "voice",
  "image",
  "link",
  "template",
];

export const LEARNING_INPUT_TYPE_META: Record<
  LearningInputType,
  LearningInputTypeMeta
> = {
  text: {
    id: "text",
    label: "Text",
    icon: "NotesRounded",
    blurb: "Type or paste what you want to learn.",
    accent: "blue",
  },
  voice: {
    id: "voice",
    label: "Voice",
    icon: "MicRounded",
    blurb: "Speak it out loud — we transcribe.",
    accent: "purple",
  },
  image: {
    id: "image",
    label: "Image",
    icon: "ImageRounded",
    blurb: "Snap a photo of notes, a page, or a diagram.",
    accent: "green",
  },
  link: {
    id: "link",
    label: "Link",
    icon: "LinkRounded",
    blurb: "Drop a URL to an article or video.",
    accent: "amber",
  },
  template: {
    id: "template",
    label: "Template",
    icon: "DashboardCustomizeRounded",
    blurb: "Start from a guided structure.",
    accent: "red",
  },
};

/**
 * Learning modalities — *how* a learner engages with material. Rendered as a
 * symbol grid (icon-forward tiles, like the symbol-grid app) and multi-select:
 * a session can be tagged with several modalities so coverage is trackable
 * ("have I included all the ways I learn this?").
 *
 * The core set is the home catalog slide's ways of understanding (Visual,
 * Verbal, Auditory, Nonverbal, Social, Logic, Semiotic, Kinesthetic) plus
 * Problem Solving and Reading / Writing. Related catalog items (Memory,
 * Recall, In context, Attention, Emotion / Mood, Processing Speed, …) tag as
 * learner-context chips — toggle to ride with the user on the next message.
 * Custom, Private and Saved are unlocked for ExpanseEye. Money remains a
 * gated stub until pricing lands.
 */
export type LearningModality =
  | "visual"
  | "verbal"
  | "auditory"
  | "nonverbal"
  | "social"
  | "logical"
  | "associative"
  | "recall"
  | "kinesthetic"
  | "memory"
  | "contextual"
  | "problem-solving"
  | "reading-writing"
  | "attention"
  | "perspectives"
  | "feedback"
  | "emotion"
  | "encoding"
  | "speed"
  | "executive"
  | "pattern"
  | "custom"
  | "private"
  | "saved"
  | "money";

export interface LearningModalityMeta {
  id: LearningModality;
  label: string;
  /** Deep-import icon name resolved by {@link ModalityIcon}. */
  icon: string;
  blurb: string;
  accent: SymbolColor;
  /**
   * `modality` — a way of understanding (coverage tracker).
   * `context` — learner-state chip; toggled on to ride with the user.
   * `special` — utility / membership tile.
   */
  kind: "modality" | "context" | "special";
  /** Visual stub only — not yet wired to behaviour. */
  placeholder?: boolean;
  /** Membership that unlocks this special tile. Shown with a crown. */
  unlockedBy?: "expanse-eye";
}

/** Display order — ways of understanding, then specials, then learner-context chips. */
export const LEARNING_MODALITIES: LearningModality[] = [
  "visual",
  "verbal",
  "auditory",
  "nonverbal",
  "social",
  "logical",
  "associative",
  "kinesthetic",
  "problem-solving",
  "reading-writing",
  "custom",
  "private",
  "saved",
  "money",
  "memory",
  "recall",
  "encoding",
  "attention",
  "speed",
  "executive",
  "emotion",
  "feedback",
  "contextual",
  "pattern",
  "perspectives",
];

export const LEARNING_MODALITY_META: Record<
  LearningModality,
  LearningModalityMeta
> = {
  visual: {
    id: "visual",
    label: "Visual",
    icon: "VisibilityRounded",
    blurb: "See it — images, diagrams, maps.",
    accent: "amber",
    kind: "modality",
  },
  verbal: {
    id: "verbal",
    label: "Verbal",
    icon: "RecordVoiceOverRounded",
    blurb: "Say it, narrate it, talk it through.",
    accent: "purple",
    kind: "modality",
  },
  auditory: {
    id: "auditory",
    label: "Auditory",
    icon: "HearingRounded",
    blurb: "Hear it — audio, sound, rhythm.",
    accent: "teal",
    kind: "modality",
  },
  nonverbal: {
    id: "nonverbal",
    label: "Nonverbal",
    icon: "GestureRounded",
    blurb: "Gesture, expression, and body language.",
    accent: "teal",
    kind: "modality",
  },
  social: {
    id: "social",
    label: "Social",
    icon: "GroupsRounded",
    blurb: "Learn with and from other people.",
    accent: "pink",
    kind: "modality",
  },
  logical: {
    id: "logical",
    label: "Logic",
    icon: "CalculateRounded",
    blurb: "Reason through structure and logic.",
    accent: "blue",
    kind: "modality",
  },
  associative: {
    id: "associative",
    label: "Semiotic",
    icon: "HubRounded",
    blurb: "Signs, symbols, and links to what you already know.",
    accent: "purple",
    kind: "modality",
  },
  recall: {
    id: "recall",
    label: "Recall",
    icon: "HistoryRounded",
    blurb: "What you can bring back from earlier.",
    accent: "blue",
    kind: "context",
  },
  kinesthetic: {
    id: "kinesthetic",
    label: "Kinesthetic",
    icon: "DirectionsRunRounded",
    blurb: "Move, do, build — hands-on.",
    accent: "green",
    kind: "modality",
  },
  memory: {
    id: "memory",
    label: "Memory",
    icon: "MemoryRounded",
    blurb: "How you hold and encode material.",
    accent: "blue",
    kind: "context",
  },
  contextual: {
    id: "contextual",
    label: "In context",
    icon: "ParkOutlined",
    blurb: "The situation this learning sits in.",
    accent: "blue",
    kind: "context",
  },
  "problem-solving": {
    id: "problem-solving",
    label: "Problem Solving",
    icon: "ExtensionRounded",
    blurb: "Work it out by tackling problems.",
    accent: "blue",
    kind: "modality",
  },
  "reading-writing": {
    id: "reading-writing",
    label: "Reading / Writing",
    icon: "MenuBookRounded",
    blurb: "Read and write it out in words.",
    accent: "slate",
    kind: "modality",
  },
  attention: {
    id: "attention",
    label: "Attention",
    icon: "CenterFocusStrongRounded",
    blurb: "Where focus sits while you learn.",
    accent: "blue",
    kind: "context",
  },
  perspectives: {
    id: "perspectives",
    label: "Multiple Perspectives",
    icon: "ViewCarouselRounded",
    blurb: "See it from more than one angle.",
    accent: "blue",
    kind: "context",
  },
  feedback: {
    id: "feedback",
    label: "Feedback",
    icon: "LoopRounded",
    blurb: "Loop what you did back into the next try.",
    accent: "blue",
    kind: "context",
  },
  emotion: {
    id: "emotion",
    label: "Emotion / Mood",
    icon: "MoodOutlined",
    blurb: "Mood and feeling as part of how it lands.",
    accent: "blue",
    kind: "context",
  },
  encoding: {
    id: "encoding",
    label: "Encoding",
    icon: "SaveOutlined",
    blurb: "How the material gets written into memory.",
    accent: "blue",
    kind: "context",
  },
  speed: {
    id: "speed",
    label: "Processing Speed",
    icon: "SpeedRounded",
    blurb: "How quickly you process the next piece.",
    accent: "blue",
    kind: "context",
  },
  executive: {
    id: "executive",
    label: "Executive Function",
    icon: "AccountTreeRounded",
    blurb: "Plan, switch, and hold the goal.",
    accent: "blue",
    kind: "context",
  },
  pattern: {
    id: "pattern",
    label: "Pattern Recognition",
    icon: "AutoAwesomeMosaicRounded",
    blurb: "Spot the shape that repeats.",
    accent: "blue",
    kind: "context",
  },
  custom: {
    id: "custom",
    label: "Custom",
    icon: "TuneRounded",
    blurb: "Define your own way of engaging.",
    accent: "slate",
    kind: "special",
    unlockedBy: "expanse-eye",
  },
  private: {
    id: "private",
    label: "Private",
    icon: "LockRounded",
    blurb: "Kept just for you.",
    accent: "slate",
    kind: "special",
    unlockedBy: "expanse-eye",
  },
  saved: {
    id: "saved",
    label: "Saved",
    icon: "BookmarkRounded",
    blurb: "Your saved ways of engaging.",
    accent: "amber",
    kind: "special",
    unlockedBy: "expanse-eye",
  },
  money: {
    id: "money",
    label: "Money",
    icon: "PaidRounded",
    blurb: "Premium / unlockable (coming soon).",
    accent: "green",
    kind: "special",
    placeholder: true,
  },
};

/** Just the core learning modalities (drives the coverage tracker). */
export const LEARNING_CORE_MODALITIES: LearningModality[] = LEARNING_MODALITIES.filter(
  (id) => LEARNING_MODALITY_META[id].kind === "modality",
);

/** Learner-state chips — catalog of named facets the user can include. */
export const LEARNING_CONTEXT_FACETS: LearningModality[] = LEARNING_MODALITIES.filter(
  (id) => LEARNING_MODALITY_META[id].kind === "context",
);

/** Brand silhouettes that can ride as visual language with the learner. */
export const LEARNING_SHAPES = [
  "triangle",
  "circle",
  "square",
  "diamond",
  "hexagon",
  "shield",
] as const;

export type LearningShape = (typeof LEARNING_SHAPES)[number];

export interface LearningShapeMeta {
  id: LearningShape;
  label: string;
  blurb: string;
  accent: SymbolColor;
}

export const LEARNING_SHAPE_META: Record<LearningShape, LearningShapeMeta> = {
  triangle: {
    id: "triangle",
    label: "Triangle",
    blurb: "Triads and three-part structure — the 4eye lens.",
    accent: "red",
  },
  circle: {
    id: "circle",
    label: "Circle",
    blurb: "Wholes, cycles, continuous understanding.",
    accent: "teal",
  },
  square: {
    id: "square",
    label: "Square",
    blurb: "Frames, structure, what holds still.",
    accent: "blue",
  },
  diamond: {
    id: "diamond",
    label: "Diamond",
    blurb: "Filters and facets — seeing through a cut.",
    accent: "purple",
  },
  hexagon: {
    id: "hexagon",
    label: "Hexagon",
    blurb: "Systems, packing, connected cells.",
    accent: "green",
  },
  shield: {
    id: "shield",
    label: "Shield",
    blurb: "Protection, trust, what you can stand behind.",
    accent: "slate",
  },
};

/**
 * How a checklist row is used.
 *  - `step` — sequential pre-flight (Targets → Goals). Drives progress.
 *  - `amplifier` — prompt-processing layers, shown as icon chips.
 *  - `reminder` — glanceable cautions (localhost, encrypted…). Not a step.
 */
export type LearningChecklistKind = "step" | "amplifier" | "reminder";

/** Glyph key for icon-row checklist items. Resolved in LearningChecklist. */
export type LearningChecklistGlyph =
  | "polish"
  | "vision"
  | "color"
  | "protection"
  | "ux"
  | "ui"
  | "localhost"
  | "encrypted"
  | "private"
  | "more";

/** A single concrete step, amplifier layer, or reminder in the session. */
export interface LearningChecklistItem {
  id: string;
  label: string;
  done: boolean;
  hint?: string;
  kind?: LearningChecklistKind;
  icon?: LearningChecklistGlyph;
}

export function isSessionStep(item: LearningChecklistItem): boolean {
  return item.kind == null || item.kind === "step";
}

export function sessionSteps(items: LearningChecklistItem[]): LearningChecklistItem[] {
  return items.filter(isSessionStep);
}

/** Grouping for related {@link LearningOption}s. */
export type LearningOptionGroup = "pace" | "depth" | "support" | "output";

export const LEARNING_OPTION_GROUP_LABEL: Record<LearningOptionGroup, string> = {
  pace: "Pace · APM",
  depth: "Depth",
  support: "Support style",
  output: "Output format",
};

export const LEARNING_OPTION_GROUPS: LearningOptionGroup[] = [
  "pace",
  "depth",
  "support",
  "output",
];

export const OPT_DEPTH_AUTO = "OPT_DEPTH_AUTO";
export const OPT_SUPPORT_COMBINATION = "OPT_SUPPORT_COMBINATION";
export const OPT_OUTPUT_CUSTOM = "OPT_OUTPUT_CUSTOM";

/** A reusable output-format note — a short saved instruction for how the reply should look. */
export interface OutputNote {
  id: string;
  label: string;
  text: string;
}

export function outputNoteLabel(text: string): string {
  const line = text.trim().split(/\n/)[0]?.trim() ?? "";
  if (!line) return "Untitled note";
  return line.length > 32 ? `${line.slice(0, 31)}…` : line;
}

/**
 * A selectable experience option. Options in the same group behave like a
 * single-choice cluster in the UI (the provider enforces one-per-group).
 */
export interface LearningOption {
  id: string;
  label: string;
  group: LearningOptionGroup;
  selected: boolean;
  description?: string;
  /** When `group` is pace — the APM band this option targets. */
  apmBand?: PaceBand;
}

/** Defaults: Super Sonic pace, Auto depth, Combination support, Custom output. */
export function isDefaultLearningOption(option: LearningOption): boolean {
  if (option.group === "pace") return option.apmBand === "fast";
  if (option.group === "depth") return option.id === OPT_DEPTH_AUTO;
  if (option.group === "support") return option.id === OPT_SUPPORT_COMBINATION;
  if (option.group === "output") return option.id === OPT_OUTPUT_CUSTOM;
  return false;
}

export interface LearningSession {
  id: string;
  title: string;
  /** Currently chosen input modality, if any. */
  inputType?: LearningInputType;
  /** Ways of learning plus learner-context chips currently included with the user. */
  modalities: LearningModality[];
  /**
   * Auto-imported input (not user-typed). When on, the system brings in
   * optimally relevant context — or all relevant context, depending on
   * availability and system coins. Default on.
   */
  autoImportContext: boolean;
  /**
   * Brand silhouettes included as visual language with the user.
   * Same set as the brand ShapeChip silhouettes — triangle, circle, square,
   * diamond, hexagon, shield.
   */
  shapes: LearningShape[];
  checklist: LearningChecklistItem[];
  options: LearningOption[];
  /**
   * Free-text shape for the reply. When output is Custom this *is* the format;
   * on a preset it is an optional extra instruction.
   */
  outputNote?: string;
  /** Saved custom formats you can reuse instead of retyping. */
  savedOutputNotes?: OutputNote[];
  /**
   * Live throughput for this session. `apm` is the rating (Super Sonic = 200), not
   * a click counter. Literal event-rate sits beside it as `literalApm`.
   */
  throughput?: ApmSnapshot;
}

export interface LearningData {
  session: LearningSession;
}
