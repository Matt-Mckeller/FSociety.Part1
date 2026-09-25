/**
 * Janna's perks — written for this profile, not copied from expanse_eye.
 *
 * Matthew's sheet is a content engine (perfect speech, any-spell craft, Aion).
 * Janna's sheet is the live bond: she can reach him, she lights up in the
 * conversation, she takes the lesson, and she stays comfortable and sure.
 */

import { sortPerks, type PerkMeta } from "@yen/content/character/perks";

/** Perks pinned to Janna's status strip and summary card. */
export const JANNA_FEATURED_PERK_IDS = [
  "matthew-channel",
  "honest-speech",
  "active-pursuit",
  "lesson-lock",
] as const;

export const JANNA_PERKS: PerkMeta[] = sortPerks([
  {
    id: "matthew-channel",
    label: "Matthew Channel",
    description:
      "She can communicate with Matthew. His conversation stimulates her. She understands his lessons, learns from them, and feels comfortable and confident in the exchange.",
    effect:
      "The line to Matthew stays open. Conversation with him stimulates her, lands as a lesson she understands, and grants learning XP. Comfort and confidence stay high while the channel is live — she does not shrink in the talk.",
    kind: "passive",
    tier: "platinum",
    color: "#e11d48",
    source: "Bond · Matthew",
    unlocked: true,
    cypherWords: ["Matthew", "Speak", "Learn", "Sure"],
  },
  {
    id: "honest-speech",
    label: "Honest Speech",
    description:
      "What she says matches what she means. No performance, no softening the true thing into safety.",
    effect:
      "Spoken checks with Matthew cannot be replaced by silence or a softer substitute. Honesty is the default delivery, not a special occasion.",
    kind: "passive",
    tier: "platinum",
    color: "#14b8a6",
    unlocked: true,
    cypherWords: ["True", "Speak", "Match", "Open"],
  },
  {
    id: "active-pursuit",
    label: "Active Pursuit",
    description:
      "She moves first. Waiting was armor; leaning in is the live practice.",
    effect:
      "Initiation toward Matthew is always available. The first daily urge to wait converts into an approach instead.",
    kind: "passive",
    tier: "platinum",
    color: "#a21caf",
    unlocked: true,
    cypherWords: ["Lean", "Move", "First", "Choose"],
  },
  {
    id: "lesson-lock",
    label: "Lesson Lock",
    description:
      "When Matthew teaches, the lesson lands and stays. She understands it — and she uses it.",
    effect:
      "Lessons from Matthew: comprehension is complete, recall +40%, and the next related action runs at the taught setting. Failures still grant learning XP.",
    kind: "passive",
    tier: "gold",
    color: "#8b5cf6",
    source: "Matthew Channel",
    unlocked: true,
    cypherWords: ["Lesson", "Land", "Keep", "Use"],
  },
  {
    id: "curious-spark",
    label: "Curious Spark",
    description:
      "Business, craft, and other good things light her up — questions that want a real answer.",
    effect:
      "+25% XP from shared work, business talk, and making things together. Curiosity stays on; it does not perform interest.",
    kind: "passive",
    tier: "gold",
    color: "#d97706",
    unlocked: true,
    cypherWords: ["Ask", "Work", "Make", "Lit"],
  },
  {
    id: "open-bond",
    label: "Open Bond",
    description:
      "Care that speaks. Honesty is how the bond grows, not a test she withholds.",
    effect:
      "Bond strength with Matthew rises on honest exchange. Withholding no longer reads as safety — it reads as a missed beat.",
    kind: "passive",
    tier: "gold",
    color: "#e11d48",
    unlocked: true,
    cypherWords: ["Bond", "Open", "Care", "Grow"],
  },
  {
    id: "armor-drop",
    label: "Armor Drop",
    description:
      "The old habit of going quiet still knocks. She does not let it keep the room.",
    effect:
      "Once per day: the first urge to withdraw or wait converts into speech. Cooldown resets at midnight.",
    kind: "reactive",
    tier: "gold",
    color: "#0ea5e9",
    unlocked: true,
    cypherWords: ["Drop", "Stay", "Speak", "Here"],
  },
  {
    id: "happy-baseline",
    label: "Happy Baseline",
    description:
      "A warm field people can feel — things are good, and she lets that show.",
    effect:
      "Mood floor is Happy. Empathy and charisma cannot be reduced below their live happy-band by the first daily dip.",
    kind: "passive",
    tier: "silver",
    color: "#16a34a",
    unlocked: true,
    cypherWords: ["Warm", "Good", "Show", "Stay"],
  },
  {
    id: "shared-path",
    label: "Shared Path",
    description:
      "The path is hers. Walking it with someone is different from being walked.",
    effect:
      "Joint plans with Matthew count as her work too. Shared-path actions cannot be assigned as 'his world' — they stay ours.",
    kind: "passive",
    tier: "silver",
    color: "#0284c7",
    unlocked: true,
    cypherWords: ["Ours", "Path", "Walk", "Hers"],
  },
  {
    id: "business-fluency",
    label: "Business Fluency",
    description:
      "The work is no longer a closed room. She is growing a real seat at the table.",
    effect:
      "Business and build conversations with Matthew: comprehension +30%, and she can hold a next action on the work without it being handed to her.",
    kind: "passive",
    tier: "gold",
    color: "#d97706",
    unlocked: false,
    cypherWords: ["Work", "Seat", "Build", "Hold"],
  },
]);
