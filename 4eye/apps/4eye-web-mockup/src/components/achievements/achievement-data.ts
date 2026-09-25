/**
 * Achievement seed data for the marketing prototype / character profile.
 *
 * The `unlocked` flag is hand-asserted — it represents the demo
 * state "imagine this guest has reached this milestone." Future
 * versions will derive `unlocked` from real progress data.
 *
 * Rarity guide (rough distribution):
 *   common    ~60%  — early / easy milestones
 *   uncommon  ~25%  — moderate effort
 *   rare      ~10%  — meaningful accomplishment
 *   epic       ~4%  — major milestone
 *   legendary  ~1%  — exceptional / secret
 *
 * TODO(MM): Find the full "things I learned" list (likely an OpenOffice /
 * LibreOffice file) and expand this seed with those achievements — they are
 * highly important and should be listed explicitly once located.
 */

import type { Achievement } from "./types";

export const ACHIEVEMENT_SEED: ReadonlyArray<Achievement> = [
  {
    id: "cured-mental-health",
    title: "Cured Mental Health",
    description: "Came through the hard season and stabilized — health as a real unlock, not a slogan.",
    unlockCondition: "Survive the collapse and rebuild a working mind.",
    unlocked: true,
    icon: "💚",
    rarity: "legendary",
  },
  {
    id: "innovation",
    title: "Innovation",
    description: "Built new frames for learning, work, and life instead of copying the old ones.",
    unlockCondition: "Ship systems that did not exist before you started.",
    unlocked: true,
    icon: "💡",
    rarity: "epic",
  },
  {
    id: "learning-mastery",
    title: "Learning Mastery",
    description: "Years of deliberate skill training — learning how to learn, then teaching from it.",
    unlockCondition: "Train long enough that teaching becomes natural.",
    unlocked: true,
    icon: "🎓",
    rarity: "epic",
  },
  {
    id: "unlocking-happiness",
    title: "Unlocking Happiness",
    description: "Found real happiness as something you can aim at — not a side effect of shipping.",
    unlockCondition: "Name happiness as a primary unlock.",
    unlocked: true,
    icon: "☀️",
    rarity: "rare",
  },
  {
    id: "unlocking-potential",
    title: "Unlocking Potential",
    description: "Treated potential as a system to open — for yourself and for others.",
    unlockCondition: "Unlock capacity that was previously locked.",
    unlocked: true,
    icon: "🔓",
    rarity: "rare",
  },
  {
    id: "perfect-real-goals",
    title: "Perfect & Real Goals",
    description:
      "Found perfect and real goals, plus the objectives to achieve what you want — not borrowed KPIs.",
    unlockCondition: "Lock goals that are both true and yours.",
    unlocked: true,
    icon: "🎯",
    rarity: "legendary",
  },
  {
    id: "ai-trained-years",
    title: "AI-Trained Years",
    description:
      "Trained for years with AI to understand and play this game better — and to teach others how.",
    unlockCondition: "Years of AI-assisted skill development pointed at teaching.",
    unlocked: true,
    icon: "🤖",
    rarity: "epic",
  },

  // Legacy marketing demos kept below the personal set
  {
    id: "first-steps",
    title: "First Steps",
    description: "Completed your very first quest.",
    unlockCondition: "Complete any quest.",
    unlocked: true,
    icon: "👣",
    rarity: "common",
  },
  {
    id: "early-adopter",
    title: "Early Adopter",
    description: "Discovered 4eye before the public launch.",
    unlockCondition: "Visit 4eye during its first month.",
    unlocked: true,
    icon: "🚀",
    rarity: "uncommon",
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "Reached a Learn score of 100 or higher.",
    unlockCondition: "Reach a Learn score of 100.",
    unlocked: false,
    icon: "📚",
    rarity: "uncommon",
  },
];
