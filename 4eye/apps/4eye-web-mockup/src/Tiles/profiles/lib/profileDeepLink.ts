/**
 * Profile deep-link helpers — Processes lens (+ entity section hash).
 */

import { route } from "@4eye/web/lib/routes";

export const PROFILE_JADE = "#35c99b";

/** DOM ids from ProcessEntitySection. */
export const PROCESS_HASH = {
  self: "process-entity-entity-self",
  selfOngoing: "process-entity-entity-self-ongoing-goals",
  selfOperational: "process-entity-entity-self-operational",
  janna: "process-entity-entity-janna",
  jannaVision: "process-entity-entity-janna-vision-goals",
} as const;

export function profileHref(lens: string, hash?: string): string {
  const base = `${route("/appRealm/profile")}?lens=${encodeURIComponent(lens)}`;
  return hash ? `${base}#${hash}` : base;
}

export function processesHref(hash?: string): string {
  return profileHref("processes", hash);
}
