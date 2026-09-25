/**
 * Character — Emotion lenses.
 *
 * ## Catalogue vs lens vs family
 *
 * `mood.ts` places every emotion on valence × arousal (the teaching map).
 * This file answers what each emotion is *for* (lens) and how they cluster
 * for "who I am" (channel family).
 *
 * ## Why the old grouping felt off
 *
 * The first designed set was Calm / Happy / Anger / Sad — a clinical quartet.
 * That teaches valence well and matches textbooks; it does **not** match
 * Matthew's lived topography. The states that actually run the profile are
 * high-arousal drive states — **Excited, Motivated, Angry** — with Create /
 * Relate / See / Regulate as supporting families, not equal peers.
 *
 * ## Channel families (organising principle)
 *
 * | Family   | What it is for                         | Members (lensed)              |
 * |----------|----------------------------------------|-------------------------------|
 * | Drive    | Agency fuel — move, aim, confront      | excited, motivated, angry, frustrated |
 * | Create   | Workspace — make and ship              | calm, flow, inspired          |
 * | Relate   | Surplus on people / future / gratitude | happy, grateful, hopeful      |
 * | See      | Accurate read of systems / threat      | sad, anxious, despairing      |
 * | Regulate | Baseline hold and recovery             | content, serene               |
 *
 * Families organise perspectives and teaching ("this feeling is Drive").
 * Axes still teach the model (where it sits on valence × arousal).
 *
 * ## Lenses
 *
 * A lens is a switch: pick one and the summary changes what is worth showing.
 * Drive lenses lead the picker. Create / Relate / See / Regulate follow.
 */

import { EMOTIONS, type EmotionMeta } from "./mood";
import type { MoodLabel } from "./status";

/** One thing an emotion gets channelled into. */
export interface EmotionChannel {
  /** Short noun phrase — what the emotion drives. */
  label: string;
  /** One line on how it shows up. */
  detail: string;
}

/** How an emotion is used in life — organises teaching and perspectives. */
export type EmotionFamily = "drive" | "create" | "relate" | "see" | "regulate";

export const EMOTION_FAMILY_META: Record<
  EmotionFamily,
  { label: string; blurb: string; color: string }
> = {
  drive: {
    label: "Drive",
    blurb: "Agency fuel — excite, aim, confront, unblock",
    color: "#ef4444",
  },
  create: {
    label: "Create",
    blurb: "Workspace — make, ship, capture vision",
    color: "#8b5cf6",
  },
  relate: {
    label: "Relate",
    blurb: "Surplus on people, future, and gratitude",
    color: "#22c55e",
  },
  see: {
    label: "See",
    blurb: "Accurate read of systems, threat, and loss",
    color: "#6366f1",
  },
  regulate: {
    label: "Regulate",
    blurb: "Baseline hold and recovery",
    color: "#14b8a6",
  },
};

export interface EmotionLens {
  /** Matches an `EmotionMeta.id` in the `mood.ts` catalogue. */
  id: string;
  /** One line: what this emotion is *for*. */
  premise: string;
  /** What it gets channelled into — the substance of the lens. */
  channels: EmotionChannel[];
  /** Attribute ids surfaced as mini-bars while this lens is active. */
  attributes: string[];
  /** Auras that resonate. Soft hint — not a wired dependency. */
  auras: string[];
  /**
   * Where the lens points. Inward = at the self and the work; outward = at the
   * world and its systems.
   */
  direction: "inward" | "outward";
  /** Channel family — organises the field and the picker. */
  family: EmotionFamily;
}

const LENSES: EmotionLens[] = [
  /* ── Drive — lead set for this profile ── */
  {
    id: "excited",
    premise: "Excitement is aliveness before the plan settles. Point it.",
    direction: "outward",
    family: "drive",
    channels: [
      { label: "Starting", detail: "The spark that opens a thread — before motivation needs a schedule." },
      { label: "Amplifying", detail: "Pulling others into the energy while it is still hot." },
      { label: "Play toward the thing", detail: "Not distraction — motion that wants a target." },
    ],
    attributes: ["charisma", "creativity", "willpower"],
    auras: ["magnetism", "inspiration"],
  },
  {
    id: "motivated",
    premise: "Motivation is directed drive. The goal already has a name.",
    direction: "inward",
    family: "drive",
    channels: [
      { label: "Goals", detail: "The aim is clear — surplus energy wants a checklist, not a vibe." },
      { label: "Follow-through", detail: "Turning excitement into days of work without losing the why." },
      { label: "Teaching the aim", detail: "Motivation transfers when the goal is spoken cleanly." },
    ],
    attributes: ["willpower", "discipline", "focus", "power"],
    auras: ["presence", "magnetism", "hope", "love", "inspiration", "motivational", "shield"],
  },
  {
    id: "angry",
    premise: "Anger is energy with a direction problem. Give it a direction.",
    direction: "inward",
    family: "drive",
    channels: [
      { label: "Getting things done", detail: "The backlog moves fastest on this fuel. Point it at the work." },
      { label: "Having control", detail: "Taking back the parts of the situation that were actually yours." },
      { label: "Choosing the information", detail: "Deciding what gets in, what gets believed, and what gets ignored." },
      { label: "Communication", detail: "Saying the hard thing clearly — this is the substitute for violence, not a softening of it." },
    ],
    attributes: ["discipline", "willpower", "communication"],
    auras: ["presence", "motivational"],
  },
  {
    id: "frustrated",
    premise: "Frustration means the approach is wrong, not that the goal is.",
    direction: "inward",
    family: "drive",
    channels: [
      { label: "Changing the approach", detail: "The signal is about method. Keep the goal, drop the route." },
      { label: "Removing the blocker", detail: "Name the specific thing in the way and go at that instead." },
    ],
    attributes: ["adaptability", "discipline", "agility"],
    auras: ["motivational"],
  },

  /* ── Create ── */
  {
    id: "calm",
    premise: "Calm is workspace. What it is for is making things.",
    direction: "inward",
    family: "create",
    channels: [
      { label: "Creative work", detail: "The long uninterrupted kind, where the idea gets to finish forming." },
      { label: "Novel ideas", detail: "Generating rather than reacting — nothing is competing for the channel." },
      { label: "Seeing what others cannot", detail: "Pattern recognition needs a quiet signal to run against." },
      { label: "Building", detail: "Turning the idea into a thing that exists and works." },
    ],
    attributes: ["creativity", "focus", "power"],
    auras: ["inspiration", "hope"],
  },
  {
    id: "flow",
    premise: "Flow is the state the rest of the system exists to protect.",
    direction: "inward",
    family: "create",
    channels: [
      { label: "Shipping", detail: "Challenge and skill matched — output is at its cheapest here." },
      { label: "Protecting the window", detail: "The scarce resource is the uninterrupted block, not the effort." },
    ],
    attributes: ["focus", "creativity", "endurance"],
    auras: ["inspiration"],
  },
  {
    id: "inspired",
    premise: "Inspiration is perishable. Capture beats savour.",
    direction: "outward",
    family: "create",
    channels: [
      { label: "Capturing it", detail: "Write it down before the clarity decays into a vague good feeling." },
      { label: "Pulling others in", detail: "A landed vision transfers while it is still hot." },
    ],
    attributes: ["creativity", "charisma", "wisdom"],
    auras: ["inspiration", "magnetism"],
  },

  /* ── Relate ── */
  {
    id: "happy",
    premise: "Happiness is surplus pointed at creating, goals, vision, and learning — and at the people you want beside you.",
    direction: "outward",
    family: "relate",
    channels: [
      { label: "Creating", detail: "Making the thing — storytelling, design, systems — the surplus that wants to ship." },
      { label: "Goals", detail: "The aims that happiness makes feel reachable instead of heavy." },
      { label: "Vision", detail: "Seeing the beautiful world clearly enough to pull others into it." },
      { label: "Learning", detail: "Absorbing and teaching — happiness that compounds when shared." },
    ],
    attributes: ["creativity", "emotional-intelligence", "charisma"],
    auras: ["love", "magnetism"],
  },
  {
    id: "hopeful",
    premise: "Hope is the willingness to spend effort on an uncertain outcome.",
    direction: "outward",
    family: "relate",
    channels: [
      { label: "Long bets", detail: "The plans that only survive contact with an optimistic day." },
      { label: "Bringing people with you", detail: "Hope is the part of a vision that other people can actually feel." },
    ],
    attributes: ["willpower", "charisma", "endurance"],
    auras: ["hope", "inspiration"],
  },
  {
    id: "grateful",
    premise: "Gratitude is accurate accounting of what is already working.",
    direction: "outward",
    family: "relate",
    channels: [
      { label: "Telling people", detail: "The value is almost entirely in it being said out loud." },
      { label: "Noticing the baseline", detail: "What would be missed if it stopped — usually invisible until then." },
    ],
    attributes: ["empathy", "wisdom", "charisma"],
    auras: ["love"],
  },

  /* ── See ── */
  {
    id: "sad",
    premise: "Sadness is accurate perception of systems that are not working.",
    direction: "outward",
    family: "see",
    channels: [
      { label: "The state of education", detail: "What people are taught, what they are not, and who decides." },
      { label: "The state of war", detail: "That it is still the mechanism, and what it costs to keep it." },
      { label: "Government", detail: "Institutions built for a world that has already changed." },
      { label: "Society", detail: "What we have collectively agreed to accept as normal." },
    ],
    attributes: ["perception", "empathy", "wisdom"],
    auras: ["love", "hope"],
  },
  {
    id: "anxious",
    premise: "Anxiety is a threat model running without an owner. Give it one.",
    direction: "inward",
    family: "see",
    channels: [
      { label: "Naming the actual risk", detail: "Most of the load is unspecified. Specify it and it shrinks." },
      { label: "Preparation", detail: "The one response that converts the signal into something useful." },
    ],
    attributes: ["focus", "adaptability", "willpower"],
    auras: ["presence", "shield"],
  },
  {
    id: "despairing",
    premise: "Despair is a load-bearing signal. The only move is smaller.",
    direction: "inward",
    family: "see",
    channels: [
      { label: "The next small thing", detail: "Scope collapses to one action. That is correct, not a failure." },
      { label: "Asking", detail: "The state that most needs other people is the one that most avoids them." },
    ],
    attributes: ["endurance", "willpower", "empathy"],
    auras: ["love"],
  },

  /* ── Regulate ── */
  {
    id: "content",
    premise: "Contentment is the baseline worth defending.",
    direction: "inward",
    family: "regulate",
    channels: [
      { label: "Maintenance", detail: "The unglamorous upkeep that keeps the baseline where it is." },
      { label: "Consolidation", detail: "Finishing the open loops instead of opening new ones." },
    ],
    attributes: ["discipline", "endurance", "focus"],
    auras: ["hope", "shield"],
  },
  {
    id: "serene",
    premise: "Serenity is low noise with capacity still online.",
    direction: "inward",
    family: "regulate",
    channels: [
      { label: "Rest without collapse", detail: "Recovery that does not erase the thread you were holding." },
      { label: "Clear signal", detail: "The quiet that lets the next Drive or Create state start clean." },
    ],
    attributes: ["focus", "endurance", "wisdom"],
    auras: ["hope", "shield"],
  },
];

export const EMOTION_LENSES: Record<string, EmotionLens> = Object.fromEntries(
  LENSES.map((l) => [l.id, l]),
);

/**
 * Picker order: Drive lead (Excited · Motivated · Angry), then families
 * Create → Relate → See → Regulate, within each by arousal descending.
 */
const FAMILY_ORDER: EmotionFamily[] = ["drive", "create", "relate", "see", "regulate"];

export const EMOTION_ORDER: string[] = FAMILY_ORDER.flatMap((family) =>
  LENSES.filter((l) => l.family === family)
    .map((l) => ({ lens: l, meta: EMOTIONS.find((e) => e.id === l.id) }))
    .sort((a, b) => (b.meta?.arousal ?? 0) - (a.meta?.arousal ?? 0))
    .map((x) => x.lens.id),
);

/** Catalogue lookup — label, colour, valence and arousal all come from `mood.ts`. */
export function emotionMeta(id: string): EmotionMeta | undefined {
  return EMOTIONS.find((e) => e.id === id);
}

export function emotionLens(id: string): EmotionLens {
  return EMOTION_LENSES[id] ?? EMOTION_LENSES.motivated;
}

export function emotionFamily(id: string): EmotionFamily {
  return emotionLens(id).family;
}

/**
 * Bridge from the status readout's coarse `MoodLabel` to a catalogue id.
 * `status.ts` tracks how you are; the catalogue describes emotion in general.
 */
const MOOD_TO_EMOTION: Partial<Record<MoodLabel, string>> = {
  animated: "excited",
  spirited: "excited",
  invigorated: "motivated",
  elated: "excited",
  optimistic: "hopeful",
  playful: "happy",
  happy: "happy",
  confident: "motivated",
  curious: "inspired",
  energized: "motivated",
  focused: "flow",
  disciplined: "motivated",
  peaceful: "serene",
  loving: "happy",
  creative: "inspired",
  neutral: "content",
};

export function lensIdForMood(mood: MoodLabel): string {
  const mapped = MOOD_TO_EMOTION[mood] ?? mood;
  return EMOTION_LENSES[mapped] ? mapped : "motivated";
}
