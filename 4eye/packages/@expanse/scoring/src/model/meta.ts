/**
 * UI metadata — human-readable labels & copy for each signal, for tooltips
 * and legends. Pure data, no rendering.
 */
import type { CompeteSignalKey, RewardSignalKey } from "./signals";
import type { PerceivedSignalKey } from "./perceived";

export interface ScoreSignalMeta {
  label: string;
  description: string;
}

/** Concise, brand-aligned copy for each reward signal (used in tooltips). */
export const REWARD_SIGNAL_META: Record<RewardSignalKey, ScoreSignalMeta> = {
  knowledge: { label: "Knowledge", description: "Value gained by learning" },
  entertainment: { label: "Entertainment", description: "Value gained by enjoyment" },
  novelty: { label: "Novelty", description: "Newness & uniqueness discovered" },
  bonding: { label: "Bonding", description: "Connection with your character" },
  relationship: { label: "Relationships", description: "Bonds built with others" },
  currency: { label: "Coins & XP", description: "Rewards earned along the way" },
};

export const COMPETE_SIGNAL_META: Record<CompeteSignalKey, ScoreSignalMeta> = {
  rankPercentile: { label: "Ranking", description: "Standing among explorers" },
  winRate: { label: "Win rate", description: "Share of challenges won" },
  streak: { label: "Streak", description: "Consistency over time" },
};

/** Copy for each perceived-value signal — the user's felt qualities. */
export const PERCEIVED_SIGNAL_META: Record<PerceivedSignalKey, ScoreSignalMeta> = {
  effort: { label: "Effort", description: "Energy you put in" },
  enjoyment: { label: "Enjoyment", description: "How good it felt" },
  relevance: { label: "Relevance", description: "How well it fit your goals" },
  progress: { label: "Progress", description: "Momentum you felt" },
  recognition: { label: "Recognition", description: "Being seen & celebrated" },
  trust: { label: "Trust", description: "Confidence it was worth it" },
};
