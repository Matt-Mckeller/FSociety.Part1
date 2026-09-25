/**
 * Learning tile — example seed data.
 *
 * A learner mid-session on "Expanse Vision": a pre-flight checklist for the
 * chat workbench (targets, audience, pipelines, settings, prompt, theme, goals)
 * with a text input and chosen experience options.
 */

import { PACE_BAND_META, apmRangeLabel, seedApmSnapshot } from "../model/apm";
import {
  OPT_DEPTH_AUTO,
  OPT_OUTPUT_CUSTOM,
  OPT_SUPPORT_COMBINATION,
  isDefaultLearningOption,
  type LearningData,
  type LearningSession,
  type OutputNote,
} from "../model/types";

const OPTIONS: LearningSession["options"] = [
  {
    id: PACE_BAND_META.slow.optionId,
    label: PACE_BAND_META.slow.label,
    group: "pace",
    selected: false,
    apmBand: "slow",
    description: `${PACE_BAND_META.slow.description} ${apmRangeLabel("slow")}.`,
  },
  {
    id: PACE_BAND_META.guided.optionId,
    label: PACE_BAND_META.guided.label,
    group: "pace",
    selected: false,
    apmBand: "guided",
    description: `${PACE_BAND_META.guided.description} ${apmRangeLabel("guided")}.`,
  },
  {
    id: PACE_BAND_META.fast.optionId,
    label: PACE_BAND_META.fast.label,
    group: "pace",
    selected: true,
    apmBand: "fast",
    description: `${PACE_BAND_META.fast.description} ${apmRangeLabel("fast")}.`,
  },
  {
    id: PACE_BAND_META.burst.optionId,
    label: PACE_BAND_META.burst.label,
    group: "pace",
    selected: false,
    apmBand: "burst",
    description: `${PACE_BAND_META.burst.description} ${apmRangeLabel("burst")}.`,
  },
  {
    id: OPT_DEPTH_AUTO,
    label: "Auto",
    group: "depth",
    selected: true,
    description: "Follows the prompt — go deeper when the question asks, stay light when it doesn't.",
  },
  {
    id: "OPT_DEPTH_INTUITIVE",
    label: "Intuitive",
    group: "depth",
    selected: false,
    description: "Focus on the why.",
  },
  {
    id: "OPT_DEPTH_RIGOROUS",
    label: "Rigorous",
    group: "depth",
    selected: false,
    description: "Full detail and edge cases.",
  },
  {
    id: OPT_SUPPORT_COMBINATION,
    label: "Combination",
    group: "support",
    selected: true,
    description: "Mix of approaches — encourage, challenge, and be direct as the moment needs.",
  },
  {
    id: "OPT_SUPPORT_ENCOURAGING",
    label: "Encouraging",
    group: "support",
    selected: false,
    description: "Warm, positive nudges.",
  },
  {
    id: "OPT_SUPPORT_DIRECT",
    label: "Direct",
    group: "support",
    selected: false,
    description: "Straight to the point.",
  },
  {
    id: "OPT_SUPPORT_SOCRATIC",
    label: "Socratic",
    group: "support",
    selected: false,
    description: "Questions that pull the answer out.",
  },
  {
    id: OPT_OUTPUT_CUSTOM,
    label: "Custom",
    group: "output",
    selected: true,
    description: "You describe the shape — a list, a recap, a check, anything.",
  },
  {
    id: "OPT_OUTPUT_SUMMARY",
    label: "Summary",
    group: "output",
    selected: false,
    description: "A concise recap at the end.",
  },
  {
    id: "OPT_OUTPUT_FLASHCARDS",
    label: "Flashcards",
    group: "output",
    selected: false,
    description: "Spaced-repetition cards.",
  },
  {
    id: "OPT_OUTPUT_QUIZ",
    label: "Quiz",
    group: "output",
    selected: false,
    description: "A short quiz to test recall.",
  },
  {
    id: "OPT_OUTPUT_OUTLINE",
    label: "Outline",
    group: "output",
    selected: false,
    description: "Headings and bullets, ready to expand.",
  },
];

const SAVED_OUTPUT_NOTES: OutputNote[] = [
  {
    id: "NOTE_BULLETS",
    label: "Bullets + next action",
    text: "Bullet recap, then one next action.",
  },
  {
    id: "NOTE_CHECK",
    label: "Explain + 3 checks",
    text: "Short explanation, then three questions to check understanding.",
  },
  {
    id: "NOTE_DIAGRAM",
    label: "Diagram then prose",
    text: "Diagram-first, then a short prose caption.",
  },
];

const SESSION: LearningSession = {
  id: "LEARN_EXPANSE_VISION",
  title: "Truth? 🔵",
  inputType: "text",
  modalities: ["verbal", "nonverbal", "visual"],
  autoImportContext: true,
  shapes: ["triangle", "circle"],
  checklist: [
    {
      id: "STEP_TARGETS",
      label: "Check Targets",
      done: true,
      hint: "Who the reply is aimed at — the primary cursor. Other people can ride along as included without being the aim.",
    },
    {
      id: "STEP_AUDIENCE",
      label: "Check Audience",
      done: true,
      hint: "Who else this is for — the room we are fitting into, not the cursor.",
    },
    {
      id: "STEP_PIPELINES",
      label: "Check Pipelines",
      done: false,
      hint: "Left-rail pipeline layers seated for this chat.",
    },
    {
      id: "STEP_AI_SETTINGS",
      label: "Check AI Settings",
      done: false,
      hint: "Model, voice, and instruction panel.",
    },
    {
      id: "STEP_PROMPT",
      label: "Check Prompt Text",
      done: false,
      hint: "The composer draft — and any attached plan.",
    },
    {
      id: "STEP_THEME",
      label: "Check Theme",
      done: false,
      hint: "Tone and surface theme for the reply.",
    },
    {
      id: "STEP_PURPOSE",
      label: "Check Purpose / Goals",
      done: false,
      hint: "Header goals and why this session exists.",
    },
  ],
  options: OPTIONS,
  outputNote: "Bullet recap of what the workbench is for, then the next unchecked step.",
  savedOutputNotes: SAVED_OUTPUT_NOTES,
  throughput: seedApmSnapshot(),
};

export const LEARNING_SEED: LearningData = { session: SESSION };

/** A fresh, unconfigured session for the empty-state story. */
export const LEARNING_EMPTY: LearningData = {
  session: {
    id: "LEARN_NEW",
    title: "New learning session",
    inputType: undefined,
    modalities: [],
    autoImportContext: true,
    shapes: [],
    checklist: [],
    options: OPTIONS.map((o) => ({ ...o, selected: isDefaultLearningOption(o) })),
    savedOutputNotes: SAVED_OUTPUT_NOTES,
  },
};
