import type { AudioSearchHit, AudioSearchQuery, AudioSearchResult } from "@4eye/types";

export const PURPLE_BALL_SEED_ID = "flying-purple-ball";

export const PURPLE_BALL_AUDIO: AudioSearchHit[] = [
  { tSec: 0.4, score: 0.2, snippet: "room tone", kind: "room" },
  { tSec: 1.6, score: 1, snippet: "purple ball", kind: "speech" },
  { tSec: 2.8, score: 0.95, snippet: "bounce", kind: "bounce" },
];

const CONCISE_RECEIPT = "Received. One purple ball, in flight.";

export function acknowledgeReceipt(claim: {
  color?: string;
  count: number;
  flying: boolean;
}): string {
  if (claim.count === 1 && claim.color === "purple" && claim.flying) {
    return CONCISE_RECEIPT;
  }
  return "Not received.";
}

export function curtainViolation(pulled: boolean, describedHidden: boolean): boolean {
  return describedHidden && !pulled;
}

export function searchAudio(input: AudioSearchQuery): AudioSearchResult {
  const q = input.query.trim().toLowerCase();
  if (!q) return { query: input.query, hits: [] };
  const hits = PURPLE_BALL_AUDIO.filter((hit) => {
    const hay = `${hit.snippet} ${hit.kind}`.toLowerCase();
    return hay.includes(q) || q.includes(hit.kind) || q.split(/\s+/).some((w) => hay.includes(w) && w.length > 2);
  }).sort((a, b) => b.score - a.score);
  return { query: input.query, hits };
}

export const fakeAiSdk = {
  acknowledgeReceipt,
  curtainViolation,
  searchAudio,
  seedId: PURPLE_BALL_SEED_ID,
};
