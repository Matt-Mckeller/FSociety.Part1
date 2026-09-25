/**
 * Character — Emotion inspect dossiers.
 *
 * An emotion on a profile is not only a lens switch. Inspect opens the dossier:
 * the data it points at, the strategy for channelling it, embed seeds, and the
 * associated events, perspectives, ideas, and comments. That is what "inspect
 * emotion" means as a profile action.
 *
 * Seeded first from the WhoAmI→WhoAreWe Anger block (HealthCare / Food / Tools /
 * Choice, plus Education · KC Education) and Happiness (Creating / Goals /
 * Vision / Learning — with money grayed but marked as WANT).
 */

import { EMOTION_ORDER, emotionLens, emotionMeta } from "./emotions";

export type EmotionAssociationKind =
  | "event"
  | "perspective"
  | "idea"
  | "comment"
  | "embed";

/**
 * How a data tag reads on the dossier.
 * - `default` — normal topic chip
 * - `dim` — grayed / muted (named but not the channel right now)
 * - `want` — highlighted desire (can stack with dim: grayed *and* WANT)
 */
export type EmotionDataTone = "default" | "dim" | "want";

export interface EmotionDataTag {
  label: string;
  tone?: EmotionDataTone;
  /** Extra badge when tone is want — defaults to "WANT". */
  wantLabel?: string;
}

/** One thing associated with an emotion dossier — event, stance, idea, note. */
export interface EmotionAssociation {
  id: string;
  kind: EmotionAssociationKind;
  label: string;
  detail?: string;
  /** Optional outbound link (music, article, doc). */
  href?: string;
  /** Perspective domain id when kind is `perspective`. */
  perspectiveId?: string;
  tags?: string[];
  tone?: EmotionDataTone;
  wantLabel?: string;
}

/**
 * A named inspection of one emotion — what it is aimed at, how to aim it, and
 * what sits around it on the profile.
 */
export interface EmotionDossier {
  id: string;
  /** Catalogue emotion id (`mood.ts` / `emotions.ts`). */
  emotionId: string;
  /** Topic tags the emotion is loaded with. */
  data: EmotionDataTag[];
  /** How to channel this instance of the emotion. */
  strategy: string;
  /** Broader strategy that still applies when this dossier is open. */
  strategyAll?: string;
  /** Seeds worth embedding beside the feeling — music, places, systems. */
  embedSeeds: { label: string; href?: string }[];
  associations: EmotionAssociation[];
  /** What inspecting this is for. */
  goal?: string;
  /** Positive channel — heal / grow / choose. */
  choosePositive?: string;
  /** Yen docs page for the long-form write-up of this dossier. */
  docHref?: string;
}

/** Lived experience with this emotion — level now, and how it has been moving. */
export interface EmotionExperience {
  emotionId: string;
  /** How much of life has been spent *in* this emotion / learning it (0–100). */
  level: number;
  /** Prior period level — drives the change trail on the field. */
  previousLevel: number;
  /** One line — why the slice is that size. */
  note?: string;
  /** Short sparkline of recent levels (oldest → newest), ends at `level`. */
  history?: number[];
}

function tag(label: string, tone?: EmotionDataTone, wantLabel?: string): EmotionDataTag {
  return tone || wantLabel ? { label, tone, wantLabel } : { label };
}

const ANGER_HEALTHCARE: EmotionDossier = {
  id: "angry-healthcare-food-tools-choice",
  emotionId: "angry",
  data: [
    tag("HealthCare"),
    tag("Food"),
    tag("Tools"),
    tag("Choice"),
  ],
  strategy: "Map to Solutions, Give Opportunity to Fix, Fix it Myself.",
  strategyAll: "Speeding Up. Amplifying humans. Directing.",
  embedSeeds: [
    {
      label: "Music seed",
      href: "https://music.youtube.com/watch?v=aJjvKCtivak&si=Doidwah14GHOoqvr",
    },
    { label: "Walmart" },
    { label: "Human Motivation" },
    { label: "Brain.System" },
  ],
  goal: "Improved understanding — then Choose.Positive() = Heal = Grow.",
  choosePositive:
    "Learn to control, transform, and choose. Transform into something beautiful, and choose to do it.",
  docHref: "/docs/web4/emotion-inspect-anger-healthcare-food-tools-choice",
  associations: [
    {
      id: "idea-healthy-food-tools",
      kind: "idea",
      label: "Tools that make healthy food easier",
      detail:
        "For poverty logistics, for kids who want healthy food while parents default to eat-out and sweets — give people a real choice, not just another product.",
      tags: ["Food", "Tools", "Choice"],
    },
    {
      id: "idea-sweets-purpose",
      kind: "idea",
      label: "Understand what sweets do — not only sell them",
      detail:
        "Purpose over extracting money from habit. Where is the purpose when the product is the harm?",
      tags: ["Food", "Choice"],
    },
    {
      id: "comment-control-systems",
      kind: "comment",
      label: "What control systems exist today — and why?",
      detail:
        "Is there already a plan to change them? Nicotine and similar levers reduce anger and steer populations while… what? Compute? Technology? Someone learning? Someone understanding?",
      tags: ["Choice", "Tools"],
    },
    {
      id: "comment-timeline",
      kind: "comment",
      label: "What was the timeline?",
      detail:
        "Legitimately — help me understand my reality more. Goal = improved understanding; still building a beautiful world with opportunity for everyone.",
      tags: ["Choice"],
    },
    {
      id: "perspective-health",
      kind: "perspective",
      label: "Health & Wellness",
      perspectiveId: "health",
      detail: "Body, nutrition, mental health — where Care lands on the profile.",
      tags: ["HealthCare", "Food"],
    },
    {
      id: "perspective-money",
      kind: "perspective",
      label: "Money & Wealth",
      perspectiveId: "money",
      detail: "Incentives that sell habit over health — and the choice to flip them.",
      tags: ["Choice", "Tools"],
    },
    {
      id: "event-american-healthcare",
      kind: "event",
      label: "American Healthcare as #Care target",
      detail:
        "From lived experience: one of the largest Care targets for a majority of the world. Spellbook browse → recognizes power → curious questions about what the game would teach from the past.",
      tags: ["HealthCare", "Care"],
    },
    {
      id: "embed-music",
      kind: "embed",
      label: "Anger channel music seed",
      href: "https://music.youtube.com/watch?v=aJjvKCtivak&si=Doidwah14GHOoqvr",
      tags: ["EmbedSeeds"],
    },
  ],
};

const ANGER_EDUCATION: EmotionDossier = {
  id: "angry-education-kc",
  emotionId: "angry",
  data: [tag("Education.Status"), tag("KC Education")],
  strategy: "Map to Solutions, Give Opportunity to Fix, Fix it Myself.",
  strategyAll: "Speeding Up. Amplifying humans. Directing.",
  embedSeeds: [{ label: "Expanse EDU" }, { label: "Brain.System" }],
  goal: "Education status that teaches control of character — not only content.",
  choosePositive: "Rewrite, review in stages, let someone else review it.",
  docHref: "/docs/web4/emotion-inspect-anger-healthcare-food-tools-choice#education-status-kc-education",
  associations: [
    {
      id: "perspective-education",
      kind: "perspective",
      label: "Education",
      perspectiveId: "education",
      detail: "Schooling systems and access — KC Education as a local load.",
      tags: ["Education.Status", "KC Education"],
    },
    {
      id: "perspective-learning",
      kind: "perspective",
      label: "Learning",
      perspectiveId: "learning",
      detail: "Personal learning philosophy sitting beside institutional education.",
      tags: ["Education.Status"],
    },
    {
      id: "idea-character-control",
      kind: "idea",
      label: "Character profiles platforms do not allow",
      detail:
        "Including X.com. Why are people not taught how to better control their characters? The name is powerful — disconnect in platforms vs who is popular and powerful.",
      tags: ["Education.Status", "Choice"],
    },
    {
      id: "comment-why-hide",
      kind: "comment",
      label: "Why hide the most important human information?",
      detail:
        "Once what mattered most to being human became clear, reality questions got louder. Can't we have it?",
      tags: ["Education.Status"],
    },
  ],
};

/**
 * Happiness — creating / goals / vision / learning are the channel.
 * Money is named and grayed *and* marked WANT. Wife / partners sit beside
 * storytelling: the emotional work that makes the rest worth it.
 */
const HAPPY_CREATE_VISION: EmotionDossier = {
  id: "happy-creating-goals-vision-learning",
  emotionId: "happy",
  data: [
    tag("Creating"),
    tag("Goals"),
    tag("Vision"),
    tag("Learning"),
    tag("Wife / Partners", "want"),
    tag("MONEY AND FINANCIAL REWARDS", "dim", "WANT — REALLY WANT"),
  ],
  strategy: "Create. Aim. See. Learn. Keep storytelling first — then fund the life that makes it sustainable.",
  strategyAll: "Amplifying humans. Building a beautiful world. Opportunity for everyone.",
  embedSeeds: [
    { label: "Heart.Evolve" },
    { label: "Storytelling" },
    { label: "Money.AmplifyMe" },
    { label: "Love.Perfectly" },
  ],
  goal: "Happiness that ships vision and learning — with partnership and money named as real wants, not shame.",
  choosePositive:
    "Keep going on the story. Creating / goals / vision / learning stay lit. Money and a wife / partners stay on the board as WANT.",
  associations: [
    {
      id: "idea-creating",
      kind: "idea",
      label: "Creating",
      detail: "Storytelling, design, systems — the surplus that wants to become a thing in the world.",
      tags: ["Creating"],
    },
    {
      id: "idea-goals-vision",
      kind: "idea",
      label: "Goals · Vision",
      detail: "Happiness makes the aims feel reachable. Vision is the pull; goals are the steps.",
      tags: ["Goals", "Vision"],
    },
    {
      id: "idea-learning",
      kind: "idea",
      label: "Learning",
      detail: "Absorb and teach — happiness that compounds when shared. Storytelling is how many people actually learn.",
      tags: ["Learning"],
    },
    {
      id: "idea-storytelling",
      kind: "idea",
      label: "Storytelling is phenomenally important",
      detail:
        "For many people the story *is* the path. Keep going — this work is not a distraction from the wants; it is how they become real.",
      tags: ["Creating", "Vision", "Learning"],
    },
    {
      id: "want-wife-partners",
      kind: "comment",
      label: "Wife / partners",
      detail: "A real want. Love beside the work — not after it, not instead of it.",
      tags: ["Wife / Partners"],
      tone: "want",
      wantLabel: "WANT",
    },
    {
      id: "want-money",
      kind: "comment",
      label: "MONEY AND FINANCIAL REWARDS",
      detail:
        "Grayed on purpose — not the happiness *channel* — but fucking want it. Fund the creating, the partnership, the vision. Money.AmplifyMe sits here as desire, not guilt.",
      tags: ["Money"],
      tone: "dim",
      wantLabel: "WANT — REALLY WANT",
    },
    {
      id: "perspective-love",
      kind: "perspective",
      label: "Love & Relationships",
      perspectiveId: "love",
      detail: "Partnership as a happiness load-bearing wall.",
      tags: ["Wife / Partners"],
    },
    {
      id: "perspective-money",
      kind: "perspective",
      label: "Money & Wealth",
      perspectiveId: "money",
      detail: "Named. Wanted. Not the whole story — still on the board.",
      tags: ["Money"],
      tone: "want",
      wantLabel: "WANT",
    },
    {
      id: "perspective-learning",
      kind: "perspective",
      label: "Learning",
      perspectiveId: "learning",
      detail: "How happiness compounds — teach what you build.",
      tags: ["Learning"],
    },
  ],
};

/** All seeded dossiers. Multiple dossiers can share one emotionId. */
export const EMOTION_DOSSIERS: EmotionDossier[] = [
  ANGER_HEALTHCARE,
  ANGER_EDUCATION,
  HAPPY_CREATE_VISION,
];

export const EMOTION_DOSSIERS_BY_ID: Record<string, EmotionDossier> = Object.fromEntries(
  EMOTION_DOSSIERS.map((d) => [d.id, d]),
);

/**
 * Relative experience across lensed emotions.
 *
 * Create / regulate / relate lead the live field: Calm · Focused · Peace · Love · Creation.
 * Anxiety is cleared (level 0). `previousLevel` + `history` feed the field's change trails.
 */
export const EMOTION_EXPERIENCE: EmotionExperience[] = [
  {
    emotionId: "excited",
    level: 70,
    previousLevel: 94,
    note: "Aliveness still available — no longer the lead fuel.",
    history: [62, 78, 88, 94, 70],
  },
  {
    emotionId: "motivated",
    level: 92,
    previousLevel: 82,
    note: "Discipline as directed drive — the heading holds.",
    history: [68, 74, 82, 86, 92],
  },
  {
    emotionId: "angry",
    level: 52,
    previousLevel: 88,
    note: "Agency still present; the live field is calm, not confrontation.",
    history: [92, 90, 88, 70, 52],
  },
  {
    emotionId: "frustrated",
    level: 28,
    previousLevel: 72,
    note: "Dropped as the workspace opened and the approach held.",
    history: [85, 80, 72, 48, 28],
  },
  {
    emotionId: "calm",
    level: 96,
    previousLevel: 64,
    note: "Live workspace. Anxiety is gone. Create is the field.",
    history: [50, 58, 64, 80, 96],
  },
  {
    emotionId: "flow",
    level: 94,
    previousLevel: 70,
    note: "Focus locked — shipping window protected.",
    history: [55, 66, 70, 82, 94],
  },
  {
    emotionId: "inspired",
    level: 94,
    previousLevel: 76,
    note: "Creation is the default. Vision lands and gets built.",
    history: [60, 71, 76, 86, 94],
  },
  {
    emotionId: "happy",
    level: 92,
    previousLevel: 58,
    note: "Love is the live field — surplus pointed at people and making.",
    history: [44, 52, 58, 74, 92],
  },
  {
    emotionId: "hopeful",
    level: 84,
    previousLevel: 69,
    note: "Long bets stay lit from a calm baseline.",
    history: [55, 63, 69, 76, 84],
  },
  {
    emotionId: "grateful",
    level: 78,
    previousLevel: 48,
    note: "Said out loud. The field includes what is already working.",
    history: [35, 42, 48, 62, 78],
  },
  {
    emotionId: "sad",
    level: 34,
    previousLevel: 61,
    note: "Systems grief named, not occupying the channel.",
    history: [70, 66, 61, 48, 34],
  },
  {
    emotionId: "anxious",
    level: 0,
    previousLevel: 54,
    note: "Cleared. No threat model is running.",
    history: [68, 60, 54, 22, 0],
  },
  {
    emotionId: "despairing",
    level: 4,
    previousLevel: 18,
    note: "Rare — scoped small when it hits.",
    history: [30, 24, 18, 10, 4],
  },
  {
    emotionId: "content",
    level: 88,
    previousLevel: 40,
    note: "Baseline held. Peace with capacity still online.",
    history: [28, 36, 40, 64, 88],
  },
  {
    emotionId: "serene",
    level: 90,
    previousLevel: 32,
    note: "Peace is live — recovery without erasing the thread.",
    history: [20, 28, 32, 58, 90],
  },
];

export const EMOTION_EXPERIENCE_BY_ID: Record<string, EmotionExperience> = Object.fromEntries(
  EMOTION_EXPERIENCE.map((e) => [e.emotionId, e]),
);

/** Signed change since previous period. */
export function emotionExperienceDelta(emotionId: string): number {
  const e = EMOTION_EXPERIENCE_BY_ID[emotionId];
  if (!e) return 0;
  return e.level - e.previousLevel;
}

/** Experience slices in picker order — for the emotion field. */
export function emotionExperienceSlices(): EmotionExperience[] {
  return EMOTION_ORDER.map(
    (id) =>
      EMOTION_EXPERIENCE_BY_ID[id] ?? {
        emotionId: id,
        level: 20,
        previousLevel: 20,
      },
  );
}

/** Dossiers attached to a catalogue emotion. Empty when none are seeded yet. */
export function dossiersForEmotion(emotionId: string): EmotionDossier[] {
  return EMOTION_DOSSIERS.filter((d) => d.emotionId === emotionId);
}

/** Primary dossier for an emotion — first seeded, or a thin lens fallback. */
export function primaryDossier(emotionId: string): EmotionDossier {
  const seeded = dossiersForEmotion(emotionId)[0];
  if (seeded) return seeded;

  const meta = emotionMeta(emotionId);
  const lens = emotionLens(emotionId);
  return {
    id: `fallback-${emotionId}`,
    emotionId,
    data: lens.channels.map((c) => tag(c.label)),
    strategy: lens.premise,
    embedSeeds: [],
    associations: lens.channels.map((c, i) => ({
      id: `${emotionId}-channel-${i}`,
      kind: "idea" as const,
      label: c.label,
      detail: c.detail,
    })),
    goal: meta ? `Inspect ${meta.label}` : "Inspect emotion",
  };
}

export const ASSOCIATION_KIND_META: Record<
  EmotionAssociationKind,
  { label: string; order: number }
> = {
  event: { label: "Events", order: 0 },
  perspective: { label: "Perspectives", order: 1 },
  idea: { label: "Ideas", order: 2 },
  comment: { label: "Comments", order: 3 },
  embed: { label: "Embeds", order: 4 },
};

/** Group associations for the inspect panel, stable kind order. */
export function groupAssociations(
  associations: EmotionAssociation[],
): { kind: EmotionAssociationKind; label: string; items: EmotionAssociation[] }[] {
  const buckets = new Map<EmotionAssociationKind, EmotionAssociation[]>();
  for (const a of associations) {
    const list = buckets.get(a.kind) ?? [];
    list.push(a);
    buckets.set(a.kind, list);
  }
  return [...buckets.entries()]
    .sort((a, b) => ASSOCIATION_KIND_META[a[0]].order - ASSOCIATION_KIND_META[b[0]].order)
    .map(([kind, items]) => ({
      kind,
      label: ASSOCIATION_KIND_META[kind].label,
      items,
    }));
}
