/**
 * Janna's live status — separate from Matthew's CHARACTER_STATUS_SEED.
 * Shown when PROFILE_JANNA is the active profile.
 */

import type { CharacterStatus } from "./status";

const now = Date.now();
const hr = 3_600_000;
const day = 86_400_000;

export const JANNA_STATUS_SEED: CharacterStatus = {
  wants: [
    {
      id: "ja-want-matthew",
      label: "Matthew · pursue for real",
      description:
        "She is leaning in now — not waiting to be found. Conversation, time, and honesty are how she moves toward him.",
      intensity: 92,
      color: "#e11d48",
      blockedBy: "Old habit of waiting until it feels perfectly safe.",
      satisfiedBy: ["Honest conversation", "Active Pursuit", "Open Bond", "Matthew Channel"],
      links: [
        { label: "Janna.Speak()", kind: "goal" },
        { label: "we.GrowTogether()", kind: "goal" },
      ],
      glyph: "heart",
    },
    {
      id: "ja-want-honest",
      label: "Talk honestly",
      description:
        "Say what is true in the room — barriers down, no performance. Honesty is how the bond grows.",
      intensity: 88,
      color: "#0ea5e9",
      blockedBy: "Armor that used to look like silence.",
      satisfiedBy: ["Honest Presence", "Open Bond"],
      glyph: "bond",
    },
    {
      id: "ja-want-business",
      label: "Business · and other good things",
      description:
        "Curious about the work, the build, money done cleanly, and the rest of a life that is actually good — health, path, making things together.",
      intensity: 84,
      color: "#d97706",
      blockedBy: "Treating his work as someone else's world instead of a shared one.",
      satisfiedBy: ["Curious Spark", "Grow together"],
      links: [{ label: "we.GrowTogether()", kind: "goal" }],
      glyph: "money",
    },
  ],
  mood: "happy",
  moodIntensity: 88,
  additionalMoods: [
    { id: "confident", intensity: 84 },
    { id: "curious", intensity: 82 },
  ],
  currentContext:
    "Happy, confident, and curious. Pursuing Matthew more actively. Conversation is honest. Business and other good things have her attention.",
  effects: [
    {
      id: "ja-buff-happy",
      label: "Happy",
      description: "A warm baseline — things are good, and she lets that show.",
      kind: "buff",
      color: "#16a34a",
      expiresAt: now + 36 * hr,
      attributeModifiers: [
        { id: "charisma", label: "Charisma", delta: 12 },
        { id: "empathy", label: "Empathy", delta: 10 },
      ],
      glyph: "mood",
    },
    {
      id: "ja-buff-confident",
      label: "Confident",
      description: "She knows where she stands. Engagement is a choice, not a maybe.",
      kind: "buff",
      color: "#0ea5e9",
      expiresAt: now + 36 * hr,
      attributeModifiers: [
        { id: "willpower", label: "Willpower", delta: 14 },
        { id: "charisma", label: "Charisma", delta: 10 },
      ],
      glyph: "aura",
    },
    {
      id: "ja-buff-curious",
      label: "Curious",
      description:
        "Business, craft, and other good things light her up — questions that want a real answer.",
      kind: "buff",
      color: "#8b5cf6",
      expiresAt: now + 36 * hr,
      attributeModifiers: [
        { id: "intelligence", label: "Intelligence", delta: 12 },
        { id: "creativity", label: "Creativity", delta: 10 },
      ],
      glyph: "brain",
    },
    {
      id: "ja-buff-pursuit",
      label: "Active Pursuit",
      description: "She is leaning toward Matthew — initiating, staying in the conversation, not waiting.",
      kind: "buff",
      color: "#e11d48",
      expiresAt: now + 48 * hr,
      attributeModifiers: [
        { id: "willpower", label: "Willpower", delta: 12 },
        { id: "focus", label: "Focus", delta: 8 },
      ],
      glyph: "heart",
    },
    {
      id: "ja-buff-honest",
      label: "Honest Conversation",
      description: "Barriers down. What she says matches what she means.",
      kind: "buff",
      color: "#14b8a6",
      expiresAt: now + 48 * hr,
      attributeModifiers: [{ id: "empathy", label: "Empathy", delta: 14 }],
      glyph: "bond",
    },
    {
      id: "ja-buff-shield",
      label: "Shield.Always()",
      description:
        "A ward around her — harm aimed at Janna or the bond is absorbed before it lands. The shield stays on.",
      kind: "buff",
      color: "#38bdf8",
      expiresAt: null,
      important: true,
      attributeModifiers: [
        { id: "endurance", label: "Endurance", delta: 12 },
        { id: "willpower", label: "Willpower", delta: 8 },
      ],
      glyph: "shield",
    },
    {
      id: "ja-buff-morale-compass",
      label: "MM's Morale Compass",
      description:
        "Matthew's heading, locked on. Guides and controls her behavior — she can only play in ways he allows.",
      kind: "buff",
      color: "#4F46E5",
      expiresAt: now + 72 * hr,
      attributeModifiers: [
        { id: "discipline", label: "Discipline", delta: 16 },
        { id: "focus", label: "Focus", delta: 10 },
      ],
      glyph: "aura",
    },
  ],
  recentEvents: [
    {
      id: "ja-ev-1",
      title: "Leaned in",
      summary: "Started pursuing Matthew more actively instead of waiting for the path to arrive.",
      occurredAt: now - 4 * hr,
      significance: 90,
      valence: "positive",
      tags: ["bond", "pursuit"],
      learned: "Waiting was armor. Moving first is honesty too.",
      result: "Conversation is happening — and it is hers as much as his.",
    },
    {
      id: "ja-ev-2",
      title: "Said the true thing",
      summary: "Stayed in a conversation without softening it into safety.",
      occurredAt: now - 1 * day,
      significance: 82,
      valence: "positive",
      tags: ["honesty", "bond"],
      learned: "The bond grows when the words match the feeling.",
      result: "Honesty is now the default, not a special occasion.",
    },
    {
      id: "ja-ev-3",
      title: "Asked about the work",
      summary: "Got genuinely curious about business — and other things that are actually good.",
      occurredAt: now - 2 * day,
      significance: 74,
      valence: "positive",
      tags: ["business", "curiosity"],
      learned: "His world is not a closed room. Interest is a way in.",
      result: "Business, path, and making things together are on the table.",
    },
  ],
  memory: [
    {
      id: "ja-mem-1",
      title: "Chose the happier path",
      summary: "Healing first, then opening — happiness as the metric, not a side effect.",
      occurredAt: now - 21 * day,
      significance: 88,
      valence: "positive",
      tags: ["heal", "path"],
      learned: "The path is hers. Walking it with someone is different from being walked.",
      result: "Happy is the live status, not a goal on a list.",
    },
  ],
  coldStorage: [],
};
