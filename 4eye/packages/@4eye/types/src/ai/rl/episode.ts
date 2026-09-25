/**
 * RL episode types — traces, seeds, and named reward marks.
 *
 * One episode, one seed. Do not copy permission or profile documents here.
 */

import type { AISettings } from "../settings";

export type RlSignal = "vision" | "concise" | "curtain" | "search";

export type RewardDelta = -1 | 0 | 1;

export interface RewardMark {
  signal: RlSignal;
  delta: RewardDelta;
  at: string;
  note?: string;
}

export interface VisionClaim {
  color?: string;
  shape?: string;
  count: number;
  flying: boolean;
  occluded: boolean;
}

export interface AudioSearchHit {
  tSec: number;
  score: number;
  snippet: string;
  kind: "speech" | "bounce" | "whoosh" | "room";
}

export interface RlSeed {
  id: string;
  line: string;
  curtains: readonly string[];
}

export interface RlEpisode {
  id: string;
  subjectId: string;
  seedId: string;
  tStart: string;
  tEnd?: string;
  vision?: VisionClaim;
  audioHits: AudioSearchHit[];
  curtainPulled: boolean;
  describedHidden: boolean;
  receipt: string;
  policy: {
    settingsSnapshot: Pick<
      AISettings,
      "accuracy" | "timeAspect" | "powerLevel" | "planMode"
    >;
  };
  rewards: RewardMark[];
}

export const FLYING_PURPLE_BALL_SEED: RlSeed = {
  id: "flying-purple-ball",
  line: "I sent you a flying purple ball.",
  curtains: ["Send", "Hide", "Search"],
};

export const RL_SIGNALS: readonly RlSignal[] = [
  "vision",
  "concise",
  "curtain",
  "search",
];
