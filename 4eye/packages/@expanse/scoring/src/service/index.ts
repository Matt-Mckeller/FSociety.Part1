/**
 * `@expanse/scoring/service` — the backend-ready service layer.
 *
 * Depend on the {@link ScoringService} port. Use {@link localScoringService}
 * for offline, in-process compute (default), or {@link createRemoteScoringService}
 * once the backend scoring API exists.
 */
export * from "./types";
export * from "./localScoringService";
export * from "./remoteScoringService";
