"use client";

/**
 * Character tile — seed data.
 *
 * expanse_eye (Matthew) is the default equipped character, linked to
 * PROFILE_MATTHEW. A sparse newcomer exercises empty slots.
 */

import type { Character, CharacterData } from "../model/types";

const MATTHEW: Character = {
  id: "CHARACTER_MATTHEW",
  profileId: "PROFILE_MATTHEW",
  name: "expanse_eye",
  realName: "Matthew McKeller",
  accent: "blue",
  level: Infinity,
  titles: ["Game Master", "Legendary Leader", "Won"],
  stats: [
    { id: "xp", label: "XP", value: "9,840", progress: 0.92, accent: "blue" },
    { id: "coins", label: "Coins", value: "∞", accent: "amber" },
    { id: "energy", label: "Energy", value: "10/10", progress: 1, accent: "green" },
  ],
  /*
    Direct: plan, act, inspect, improve.
    Craft (always merged): Shorts · Emotion · Engage · Gamify · Edit · Human.
    People: communicate, share, teach, learn.
  */
  equippedActions: [
    { id: "act-plan", label: "Plan", icon: "AccountTreeRounded", accent: "blue", hint: "Outline the next move before you spend it", group: "direct" },
    { id: "act-cast", label: "Act", icon: "AutoFixHighRounded", accent: "purple", hint: "Open the Spellbook and cast", group: "direct" },
    { id: "act-inspect", label: "Inspect", icon: "VisibilityRounded", accent: "slate", hint: "Look closely at what is in front of you", group: "direct" },
    { id: "act-improve", label: "Improve", icon: "TrendingUpRounded", accent: "green", hint: "Critique and raise the quality of what is in front of you", group: "direct" },
    { id: "act-communicate", label: "Communicate", icon: "ChatRounded", accent: "amber", hint: "Explain, summarise, connect — say it clearly", group: "people" },
    { id: "act-share", label: "Share", icon: "IosShareRounded", accent: "blue", hint: "Publish what you have learned", group: "people" },
    { id: "act-teach", label: "Teach", icon: "SchoolRounded", accent: "purple", hint: "Turn what you know into a lesson", group: "people" },
    { id: "act-learn", label: "Learn", icon: "PsychologyRounded", accent: "teal", hint: "Take back what they know — the half that keeps you honest", group: "people" },
  ],
  equippedSpells: [
    { spellId: "SPELL_PLAN" },
    { spellId: "SPELL_ACT" },
    { spellId: "SPELL_IMPROVE" },
    { spellId: "SPELL_QUALITY" },
    { spellId: "SPELL_COMMUNICATE" },
    { spellId: "SPELL_EXPLAIN" },
    { spellId: "SPELL_BOND" },
    { spellId: "SPELL_PLAY" },
    { spellId: "SPELL_DRAFT" },
    { spellId: "SPELL_STACK" },
    { spellId: "SPELL_HOOK" },
    { spellId: "SPELL_AMPLIFY" },
    { spellId: "SPELL_RALLY" },
  ],
  equippedWork: [
    {
      id: "work-demo-vision",
      kind: "plan",
      label: "Playing 1Game",
      status: "active",
      weight: 99,
      progress: 0.18,
      detail: "Today's #1 — current focus is playing 1Game",
    },
    {
      id: "work-4eye",
      kind: "plan",
      label: "4eye",
      status: "active",
      weight: 97,
      progress: 0.55,
      detail: "The product the vision lives in — demo it, record it, cut phenomenal shorts from it",
    },
    {
      id: "work-edu",
      kind: "plan",
      label: "EDU",
      status: "active",
      weight: 96,
      progress: 0.4,
      detail: "Expanse EDU — teach from the demo. Content and shorts for the classroom path",
    },
    {
      id: "work-recording-app",
      kind: "plan",
      label: "Recording App",
      status: "active",
      weight: 95,
      progress: 0.3,
      detail: "Capture surface — optimally prepare and record perfectly on the thing being shown",
    },
    {
      id: "work-entrepreneurship",
      kind: "quest",
      label: "Grow() · Achieve()",
      status: "active",
      weight: 88,
      progress: 0.42,
      detail: "Ship businesses, offers, and the Expanse / 4eye / EDU stack that funds the vision",
    },
    {
      id: "work-content",
      kind: "task",
      label: "Creating Content, Storytelling, Designing",
      status: "active",
      weight: 86,
      progress: 0.35,
      detail: "Recordings, walkthroughs, Storybooks — teach what I built so others can follow",
    },
    {
      id: "work-love",
      kind: "quest",
      label: "Fishing for Love, Money, and Fame",
      status: "active",
      weight: 88,
      progress: 0.28,
      detail:
        "Heart.Evolve · Money.AmplifyMe · be known — choose, protect, and grow all three. Not a sidebar.",
    },
    {
      id: "work-number-one",
      kind: "plan",
      label: "Going after #1",
      status: "active",
      weight: 84,
      progress: 0.22,
      detail: "Be the symbol for learning, gamification, and the best applications in the category",
    },
  ],
  equippedGoals: [
    { id: "goal-ship", label: "Ship yen · teach from it", weight: 94, progress: 0.48, accent: "teal" },
    { id: "goal-love", label: "Love.Perfectly · Heart.Evolve", weight: 90, progress: 0.3, accent: "pink" },
    { id: "goal-money", label: "Money.AmplifyMe · recover", weight: 86, progress: 0.25, accent: "green" },
  ],
};

const NEWCOMER: Character = {
  id: "CHARACTER_NEWCOMER",
  profileId: "PROFILE_NEWCOMER",
  name: "new_here",
  accent: "slate",
  level: 1,
  titles: [],
  stats: [
    { id: "xp", label: "XP", value: 0, progress: 0, accent: "slate" },
    { id: "coins", label: "Coins", value: 0, accent: "amber" },
  ],
  equippedActions: [],
  equippedSpells: [],
  equippedWork: [],
  equippedGoals: [],
};

export const CHARACTER_SEED: CharacterData = {
  characters: [MATTHEW, NEWCOMER],
  activeCharacterId: MATTHEW.id,
};

/** A fresh character with empty equipped slots. */
export const CHARACTER_EMPTY: CharacterData = {
  characters: [NEWCOMER],
  activeCharacterId: NEWCOMER.id,
};
