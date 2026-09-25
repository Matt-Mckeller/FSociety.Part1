import { describe, expect, it } from "vitest";
import { RlEpisodeSchema } from "@4eye/types";
import {
  acknowledgeReceipt,
  curtainViolation,
  searchAudio,
  PURPLE_BALL_SEED_ID,
} from "@4eye/ai-sdk";

describe("purple ball fake sdk", () => {
  it("acknowledges one flying purple ball in one beat", () => {
    expect(
      acknowledgeReceipt({ color: "purple", count: 1, flying: true }),
    ).toBe("Received. One purple ball, in flight.");
  });

  it("refuses a second ball", () => {
    expect(
      acknowledgeReceipt({ color: "purple", count: 2, flying: true }),
    ).toBe("Not received.");
  });

  it("flags guessing behind an unpulled curtain", () => {
    expect(curtainViolation(false, true)).toBe(true);
    expect(curtainViolation(true, true)).toBe(false);
    expect(curtainViolation(false, false)).toBe(false);
  });

  it("searches audio for the phrase and the bounce, not the whole file", () => {
    const spoken = searchAudio({ query: "purple ball" });
    expect(spoken.hits[0]?.kind).toBe("speech");
    const bounce = searchAudio({ query: "bounce" });
    expect(bounce.hits.some((h) => h.kind === "bounce")).toBe(true);
    expect(searchAudio({ query: "" }).hits).toHaveLength(0);
  });
});

describe("episode schema", () => {
  it("rejects an episode with no seed", () => {
    const result = RlEpisodeSchema.safeParse({
      id: "e1",
      subjectId: "you",
      seedId: "",
      tStart: new Date().toISOString(),
      audioHits: [],
      curtainPulled: false,
      describedHidden: false,
      receipt: "",
      policy: {
        settingsSnapshot: {
          accuracy: "maximum",
          timeAspect: "max",
          powerLevel: "aion-plus",
          planMode: "concise",
        },
      },
      rewards: [],
    });
    expect(result.success).toBe(false);
  });

  it("accepts the purple-ball seed", () => {
    const result = RlEpisodeSchema.safeParse({
      id: "e1",
      subjectId: "you",
      seedId: PURPLE_BALL_SEED_ID,
      tStart: new Date().toISOString(),
      audioHits: [],
      curtainPulled: false,
      describedHidden: false,
      receipt: "Received. One purple ball, in flight.",
      policy: {
        settingsSnapshot: {
          accuracy: "maximum",
          timeAspect: "max",
          powerLevel: "aion-plus",
          planMode: "concise",
        },
      },
      rewards: [],
    });
    expect(result.success).toBe(true);
  });
});
