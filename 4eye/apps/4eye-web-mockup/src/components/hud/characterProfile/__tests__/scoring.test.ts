import { describe, expect, it } from "vitest";
import type { ScoringInput } from "@expanse/scoring";
import {
  SCORING_VARIANTS,
  computeScores,
  getScoringVariant,
  normalize,
} from "@expanse/scoring";

const fullSignals: ScoringInput = {
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

const zeroSignals: ScoringInput = {
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

describe("normalize", () => {
  it("clamps linear to [0,1]", () => {
    expect(normalize(50, { kind: "linear", max: 100 })).toBeCloseTo(0.5);
    expect(normalize(200, { kind: "linear", max: 100 })).toBe(1);
    expect(normalize(-5, { kind: "linear", max: 100 })).toBe(0);
  });

  it("applies diminishing returns for log", () => {
    const half = normalize(100, { kind: "log", max: 10000 });
    const full = normalize(10000, { kind: "log", max: 10000 });
    expect(full).toBe(1);
    // Log curve: 1% of max raw value yields well over 1% of normalized score.
    expect(half).toBeGreaterThan(0.4);
    expect(half).toBeLessThan(full);
  });

  it("returns 0 for non-finite or non-positive input", () => {
    expect(normalize(NaN, { kind: "linear", max: 100 })).toBe(0);
    expect(normalize(0, { kind: "log", max: 100 })).toBe(0);
  });
});

describe("computeScores", () => {
  it("returns 0 across the board for zero signals", () => {
    const result = computeScores(zeroSignals, getScoringVariant("balanced"));
    expect(result.learn).toBe(0);
    expect(result.earn.score).toBe(0);
    expect(result.compete.score).toBe(0);
    expect(result.mastery.score).toBe(0);
  });

  it("returns 100 across the board when every signal is maxed", () => {
    const result = computeScores(fullSignals, getScoringVariant("balanced"));
    expect(result.learn).toBeCloseTo(100, 0);
    expect(result.earn.score).toBeCloseTo(100, 0);
    expect(result.compete.score).toBeCloseTo(100, 0);
    expect(result.mastery.score).toBe(100);
  });

  it("keeps all scores within [0,100]", () => {
    for (const variant of Object.values(SCORING_VARIANTS)) {
      const result = computeScores(fullSignals, variant);
      for (const v of [result.learn, result.earn.score, result.compete.score]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
    }
  });

  it("weights signals differently per variant", () => {
    const knowledgeHeavy: ScoringInput = {
      ...zeroSignals,
      reward: { ...zeroSignals.reward, knowledge: 1000 },
    };
    const growth = computeScores(knowledgeHeavy, getScoringVariant("growth"));
    const connection = computeScores(knowledgeHeavy, getScoringVariant("connection"));
    // Growth weights knowledge higher than Connection does.
    expect(growth.earn.score).toBeGreaterThan(connection.earn.score);
  });

  it("achiever weights compete into learn more than growth does", () => {
    const competeOnly: ScoringInput = {
      ...zeroSignals,
      compete: { rankPercentile: 100, winRate: 100, streak: 30 },
    };
    const achiever = computeScores(competeOnly, getScoringVariant("achiever"));
    const growth = computeScores(competeOnly, getScoringVariant("growth"));
    expect(achiever.learn).toBeGreaterThan(growth.learn);
  });

  it("exposes a breakdown whose points sum to the component score", () => {
    const result = computeScores(fullSignals, getScoringVariant("balanced"));
    const earnSum = result.earn.contributions.reduce((a, c) => a + c.points, 0);
    expect(earnSum).toBeCloseTo(result.earn.score, 0);
  });
});

describe("getScoringVariant", () => {
  it("falls back to balanced for unknown ids", () => {
    // @ts-expect-error — intentionally passing an invalid id
    expect(getScoringVariant("nope").id).toBe("balanced");
    expect(getScoringVariant().id).toBe("balanced");
  });
});
