/**
 * Remote scoring service — backend adapter (placeholder).
 *
 * The backend scoring module does not exist yet, so this is a thin, ready-to-
 * wire adapter rather than a live client. It accepts an injected
 * {@link ScoringTransport} (a fetch / GraphQL / Apollo call provided by the
 * app) and maps the {@link ScoringService} port onto the planned endpoints:
 *
 *   score        →  POST {basePath}/score      body: ScoreRequest
 *   perceived    →  POST {basePath}/perceived-value  body: PerceivedValueRequest
 *   listVariants →  GET  {basePath}/variants
 *
 * Until a transport is supplied it throws a clear error, so accidental use in
 * production fails loudly instead of silently returning wrong numbers. To run
 * fully offline, use {@link LocalScoringService} instead.
 */
import type { LearnScoreResult, PerceivedValueResult } from "../model";
import type {
  PerceivedValueRequest,
  ScoreRequest,
  ScoringService,
  ScoringVariantSummary,
} from "./types";

/**
 * Minimal transport the app injects. Implement with `fetch`, Apollo, or any
 * HTTP client. Kept tiny so it can wrap anything.
 */
export interface ScoringTransport {
  /** Issue a request and resolve the parsed JSON body of type `T`. */
  request<T>(options: {
    method: "GET" | "POST";
    path: string;
    body?: unknown;
  }): Promise<T>;
}

export interface RemoteScoringServiceOptions {
  /** Base path prefixed to every endpoint. Defaults to `/scoring`. */
  basePath?: string;
}

const NOT_WIRED =
  "[@expanse/scoring] remote scoring service has no transport. " +
  "Pass a ScoringTransport to createRemoteScoringService(), or use " +
  "localScoringService for offline compute.";

/**
 * Build a remote {@link ScoringService}. Pass `transport: null` (the default)
 * to get a guard that throws until the backend + transport are ready.
 */
export function createRemoteScoringService(
  transport: ScoringTransport | null = null,
  options: RemoteScoringServiceOptions = {},
): ScoringService {
  const basePath = options.basePath ?? "/scoring";

  function ensure(): ScoringTransport {
    if (!transport) throw new Error(NOT_WIRED);
    return transport;
  }

  return {
    async score(request: ScoreRequest): Promise<LearnScoreResult> {
      return ensure().request<LearnScoreResult>({
        method: "POST",
        path: `${basePath}/score`,
        body: request,
      });
    },

    async perceivedValue(
      request: PerceivedValueRequest,
    ): Promise<PerceivedValueResult> {
      return ensure().request<PerceivedValueResult>({
        method: "POST",
        path: `${basePath}/perceived-value`,
        body: request,
      });
    },

    async listVariants(): Promise<ScoringVariantSummary[]> {
      return ensure().request<ScoringVariantSummary[]>({
        method: "GET",
        path: `${basePath}/variants`,
      });
    },
  };
}
