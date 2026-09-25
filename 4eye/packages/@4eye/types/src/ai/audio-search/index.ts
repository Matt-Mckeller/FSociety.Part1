import type { AudioSearchHit } from "../rl/episode";

export type { AudioSearchHit };

export interface AudioSearchQuery {
  query: string;
  sessionId?: string;
}

export interface AudioSearchResult {
  query: string;
  hits: AudioSearchHit[];
}
