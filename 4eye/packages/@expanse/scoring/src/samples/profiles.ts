/**
 * Sample scoring inputs — named, illustrative fixtures.
 *
 * These are **placeholders** standing in for real signals that will come from
 * the backend / analytics pipeline. They power Storybook, docs, and tests so
 * the engine can be demonstrated without any live data source.
 */
import type { PerceivedValueInput, ScoringInput } from "../model";

/** Every signal at zero — the empty profile. */
export const ZERO_INPUT: ScoringInput = {
  reward: {
    knowledge: 0,
    entertainment: 0,
    novelty: 0,
    bonding: 0,
    relationship: 0,
    currency: 0,
  },
  compete: { rankPercentile: 0, winRate: 0, streak: 0 },
  mastery: 0,
};

/** Every signal maxed — the saturated profile (all components → ~100). */
export const MAXED_INPUT: ScoringInput = {
  reward: {
    knowledge: 1000,
    entertainment: 1000,
    novelty: 100,
    bonding: 100,
    relationship: 100,
    currency: 10000,
  },
  compete: { rankPercentile: 100, winRate: 100, streak: 30 },
  mastery: 100,
};

/** A realistic mid-journey learner: strong on knowledge & bonding. */
export const LEARNER_INPUT: ScoringInput = {
  reward: {
    knowledge: 620,
    entertainment: 280,
    novelty: 55,
    bonding: 70,
    relationship: 40,
    currency: 1800,
  },
  compete: { rankPercentile: 62, winRate: 48, streak: 9 },
  mastery: 55,
};

/** A competitive grinder: high currency, streak, and ranking. */
export const COMPETITOR_INPUT: ScoringInput = {
  reward: {
    knowledge: 300,
    entertainment: 520,
    novelty: 35,
    bonding: 25,
    relationship: 60,
    currency: 7200,
  },
  compete: { rankPercentile: 88, winRate: 72, streak: 21 },
  mastery: 30,
};

/** Named sample profiles for selection UIs. */
export const SAMPLE_PROFILES: Array<{
  id: string;
  label: string;
  input: ScoringInput;
}> = [
  { id: "learner", label: "Mid-journey learner", input: LEARNER_INPUT },
  { id: "competitor", label: "Competitive grinder", input: COMPETITOR_INPUT },
  { id: "maxed", label: "Maxed (all 100)", input: MAXED_INPUT },
  { id: "zero", label: "Empty profile", input: ZERO_INPUT },
];

/* ───────────────────────── Perceived-value samples ─────────────────────── */

/** Beat-expectations: solid felt value against a modest expectation → delight. */
export const DELIGHTED_PERCEIVED_INPUT: PerceivedValueInput = {
  signals: {
    effort: 60,
    enjoyment: 85,
    relevance: 80,
    progress: 75,
    recognition: 70,
    trust: 80,
  },
  expectation: 45,
};

/** Missed-expectations: decent value but a high bar coming in → letdown. */
export const LETDOWN_PERCEIVED_INPUT: PerceivedValueInput = {
  signals: {
    effort: 70,
    enjoyment: 40,
    relevance: 45,
    progress: 35,
    recognition: 30,
    trust: 55,
  },
  expectation: 85,
};

/** As-expected: no expectation anchor → neutral framing (delight factor ≈ 1). */
export const NEUTRAL_PERCEIVED_INPUT: PerceivedValueInput = {
  signals: {
    effort: 55,
    enjoyment: 55,
    relevance: 55,
    progress: 55,
    recognition: 55,
    trust: 55,
  },
};

/** Named perceived-value fixtures for selection UIs. */
export const SAMPLE_PERCEIVED_PROFILES: Array<{
  id: string;
  label: string;
  input: PerceivedValueInput;
}> = [
  { id: "delighted", label: "Beat expectations", input: DELIGHTED_PERCEIVED_INPUT },
  { id: "letdown", label: "Missed expectations", input: LETDOWN_PERCEIVED_INPUT },
  { id: "neutral", label: "As expected", input: NEUTRAL_PERCEIVED_INPUT },
];
