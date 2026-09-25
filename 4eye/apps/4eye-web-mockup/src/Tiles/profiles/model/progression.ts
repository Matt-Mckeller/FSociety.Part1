/**
 * Progression — the staged path behind a surfaced Goal or Next Action.
 *
 * The Goal and Next Action cards each say one true thing ("this is the goal",
 * "this is what's next") and stop there. That reads fine while you already know
 * the plan and badly while you are still learning it: a single line gives no
 * sense of *where in the run you are*, so early on there is nothing to orient
 * against. The progression is that missing context — a short ordered track with
 * one position marked — kept behind a toggle so the card stays a one-liner for
 * everyone who does not need it.
 *
 * A goal progresses in learning phases (how well the thing is known); an action
 * progresses in onboarding steps (how far through one run you are). Same shape,
 * different unit, which is why both use {@link Progression}.
 *
 * Seeded for now, like the movement figures on Highest Value: a real curriculum
 * / action planner emits these per profile, and only this file changes then.
 */

export interface ProgressionStep {
  id: string;
  /** Short track label — one or two words, it sits under a dot. */
  label: string;
  /** What this stage actually asks of the person, shown when it is current. */
  detail: string;
}

export interface Progression {
  /** Ordered stages, earliest first. */
  steps: ProgressionStep[];
  /** Index of the stage in progress; everything before it counts as done. */
  currentIndex: number;
  /** Noun for one stage, used in the "Phase 2 of 4" caption. */
  unit: string;
}

/** Learning phases for the equipped goal — how well the thing is known. */
export const GOAL_LEARNING_PHASES: Progression = {
  unit: "Phase",
  currentIndex: 4,
  steps: [
    {
      id: "explore",
      label: "Explore",
      detail: "Get the shape of the goal — what it involves and why it is worth doing.",
    },
    {
      id: "learn",
      label: "Learn",
      detail: "Work through the material the goal depends on, one lesson at a time.",
    },
    {
      id: "practice",
      label: "Practice",
      detail: "Repeat it with feedback until it stops needing conscious thought.",
    },
    {
      id: "release-intro",
      label: "Intro video",
      detail: "Release the 4eye intro video — the vision out in the world.",
    },
    {
      id: "accept",
      label: "Accept",
      detail: "Accept phase — the goal is real enough to own without the scaffolding.",
    },
  ],
};

/** Onboarding steps for the next action — how far through one run you are. */
export const ACTION_ONBOARDING_STEPS: Progression = {
  unit: "Step",
  currentIndex: 0,
  steps: [
    {
      id: "prepare",
      label: "Prepare",
      detail: "Optimally prepare — set the run so recording does not have to invent the plan.",
    },
    {
      id: "record",
      label: "Record",
      detail: "Record perfectly — one clean take of the vision, as if the recording is the product.",
    },
    {
      id: "shorts",
      label: "Shorts",
      detail: "Create phenomenal shorts — cut the vision into clips that stand alone.",
    },
    {
      id: "audience",
      label: "Audience",
      detail: "Optimize for all users, humans first. Niches still included — not the whole frame.",
    },
  ],
};
