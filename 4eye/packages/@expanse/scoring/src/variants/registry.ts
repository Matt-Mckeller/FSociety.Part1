/**
 * Scoring variant registry.
 *
 * Each variant re-weights the same Learn / Earn / Compete signals to express
 * a different style of growth, aligned to a brand theme. Add a variant here to
 * make it available everywhere — the engine never changes.
 *
 * Design notes:
 * - Grind-able signals (currency, streak) use `log` normalizers so raw
 *   accumulation yields diminishing returns and can't dominate a score.
 * - Bounded 0–100 signals (novelty, bonding, relationship, mastery, ranking,
 *   win rate) use `linear`.
 * - Reward weights sum to ~1 and learn weights sum to 1 for readability; the
 *   engine sum-normalizes regardless.
 */
import type {
  ScoringNormalizers,
  ScoringVariant,
  ScoringVariantId,
} from "../model";
import { DEFAULT_PERCEIVED_NORMALIZERS } from "../engine";

/**
 * Shared normalizer set. Variants emphasize signals via *weights*, not by
 * changing the measurement scale, so the normalizers stay constant.
 */
const NORMALIZERS: ScoringNormalizers = {
  reward: {
    knowledge: { kind: "log", max: 1000 },
    entertainment: { kind: "log", max: 1000 },
    novelty: { kind: "linear", max: 100 },
    bonding: { kind: "linear", max: 100 },
    relationship: { kind: "linear", max: 100 },
    currency: { kind: "log", max: 10000 },
  },
  compete: {
    rankPercentile: { kind: "linear", max: 100 },
    winRate: { kind: "linear", max: 100 },
    streak: { kind: "log", max: 30 },
  },
  mastery: { kind: "linear", max: 100 },
  perceived: DEFAULT_PERCEIVED_NORMALIZERS,
};

export const DEFAULT_VARIANT_ID: ScoringVariantId = "balanced";

export const SCORING_VARIANTS: Record<ScoringVariantId, ScoringVariant> = {
  // ── Even weighting — the neutral default ──────────────────────────
  balanced: {
    id: "balanced",
    label: "Balanced",
    description: "Equal value across knowledge, fun, bonds, and rewards.",
    theme: "balanced",
    weights: {
      reward: {
        knowledge: 0.2,
        entertainment: 0.15,
        novelty: 0.15,
        bonding: 0.15,
        relationship: 0.15,
        currency: 0.2,
      },
      compete: { rankPercentile: 0.4, winRate: 0.35, streak: 0.25 },
      learn: { reward: 0.55, compete: 0.3, mastery: 0.15 },      perceived: {
        signals: {
          effort: 1,
          enjoyment: 1,
          relevance: 1,
          progress: 1,
          recognition: 1,
          trust: 1,
        },
        expectationSensitivity: 0.5,
      },    },
    normalizers: NORMALIZERS,
  },

  // ── Improve: learning & mastery first ─────────────────────────────
  growth: {
    id: "growth",
    label: "Growth",
    description: "Rewards real learning, fresh discovery, and mastery.",
    theme: "improve",
    weights: {
      reward: {
        knowledge: 0.3,
        entertainment: 0.1,
        novelty: 0.2,
        bonding: 0.1,
        relationship: 0.1,
        currency: 0.2,
      },
      compete: { rankPercentile: 0.35, winRate: 0.35, streak: 0.3 },
      learn: { reward: 0.5, compete: 0.15, mastery: 0.35 },      perceived: {
        signals: {
          effort: 1.4,
          enjoyment: 0.8,
          relevance: 1.3,
          progress: 1.4,
          recognition: 0.7,
          trust: 0.9,
        },
        expectationSensitivity: 0.5,
      },    },
    normalizers: NORMALIZERS,
  },

  // ── Heal: bonds & relationships first ─────────────────────────────
  connection: {
    id: "connection",
    label: "Connection",
    description: "Values character bonds, relationships, and shared joy.",
    theme: "heal",
    weights: {
      reward: {
        knowledge: 0.1,
        entertainment: 0.15,
        novelty: 0.05,
        bonding: 0.3,
        relationship: 0.3,
        currency: 0.1,
      },
      compete: { rankPercentile: 0.3, winRate: 0.3, streak: 0.4 },
      learn: { reward: 0.7, compete: 0.1, mastery: 0.2 },      perceived: {
        signals: {
          effort: 0.7,
          enjoyment: 1.3,
          relevance: 1,
          progress: 0.8,
          recognition: 1.4,
          trust: 1.5,
        },
        expectationSensitivity: 0.35,
      },    },
    normalizers: NORMALIZERS,
  },

  // ── Win: ranking, rewards & streaks first ─────────────────────────
  achiever: {
    id: "achiever",
    label: "Achiever",
    description: "Leans into ranking, rewards, and winning streaks.",
    theme: "win",
    weights: {
      reward: {
        knowledge: 0.15,
        entertainment: 0.15,
        novelty: 0.1,
        bonding: 0.1,
        relationship: 0.2,
        currency: 0.3,
      },
      compete: { rankPercentile: 0.45, winRate: 0.35, streak: 0.2 },
      learn: { reward: 0.35, compete: 0.5, mastery: 0.15 },      perceived: {
        signals: {
          effort: 1,
          enjoyment: 0.9,
          relevance: 0.9,
          progress: 1.3,
          recognition: 1.5,
          trust: 0.8,
        },
        expectationSensitivity: 0.7,
      },    },
    normalizers: NORMALIZERS,
  },

  // ── Innovate: novelty & entertainment first ───────────────────────
  explorer: {
    id: "explorer",
    label: "Explorer",
    description: "Celebrates novelty, uniqueness, and the joy of discovery.",
    theme: "innovate",
    weights: {
      reward: {
        knowledge: 0.2,
        entertainment: 0.25,
        novelty: 0.3,
        bonding: 0.1,
        relationship: 0.05,
        currency: 0.1,
      },
      compete: { rankPercentile: 0.4, winRate: 0.3, streak: 0.3 },
      learn: { reward: 0.6, compete: 0.2, mastery: 0.2 },
      perceived: {
        signals: {
          effort: 0.8,
          enjoyment: 1.5,
          relevance: 1.2,
          progress: 1,
          recognition: 0.9,
          trust: 0.9,
        },
        expectationSensitivity: 0.6,
      },
    },
    normalizers: NORMALIZERS,
  },
};

/** Resolve a variant by id, falling back to the default. */
export function getScoringVariant(id?: ScoringVariantId): ScoringVariant {
  return (id && SCORING_VARIANTS[id]) || SCORING_VARIANTS[DEFAULT_VARIANT_ID];
}

/** List all registered variants (stable order). */
export const SCORING_VARIANT_LIST: ScoringVariant[] = [
  SCORING_VARIANTS.balanced,
  SCORING_VARIANTS.growth,
  SCORING_VARIANTS.connection,
  SCORING_VARIANTS.achiever,
  SCORING_VARIANTS.explorer,
];
