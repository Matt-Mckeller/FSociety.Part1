/**
 * Relationship / communication intents for the Communication Planner.
 *
 * Public and soft entries may appear on the showcase page. Dark entries are
 * kept in the model for the planner itself and never rendered on the public
 * site — filter with `publicIntents()` before any visitor-facing surface.
 *
 * Love-example seats use cover usernames where names are protected. Emiru is
 * a fishing / remapping construct — desired body·name·goals, not a locked ID.
 */

export type IntentPrivacy = "public" | "soft" | "dark";

export type IntentFraming =
  | "peer"
  | "creator"
  | "info-gatherer"
  | "coincidence"
  | "marriage-lesson"
  | "desired"
  | "scout";

export interface CommunicationIntent {
  id: string;
  name: string;
  /** Cover username when the legal name is protected. */
  username?: string;
  /** Links to PROFILES_SEED / CREW profile id when present. */
  profileId?: string;
  /** What this entry is for — clarification, not gossip. */
  intent: string;
  framing: IntentFraming;
  privacy: IntentPrivacy;
  /** Platforms / mediums where contact or attention already exists. */
  mediums?: string[];
  /** AGI journey mark when relevant. */
  agiMark?: string;
  notes?: string;
}

/**
 * Named seats the planner clarifies around.
 *
 * Empty on purpose. Every entry named a real person and described what was
 * wanted from them; because this module is bundled for the browser, filtering
 * at render time still shipped all six names to every visitor. The entries
 * moved verbatim to `./communication-intents.private.ts`, which has no
 * importers, so nothing about them reaches a browser.
 *
 * An entry belongs here only once it is written without a real name and marked
 * `privacy: "public"` — which is what `publicIntents()` now requires.
 */
export const COMMUNICATION_INTENTS: CommunicationIntent[] = [];

/**
 * Visitor-facing subset — opt-in, not opt-out.
 *
 * This filtered on `privacy !== "dark"`, which published every `soft` entry:
 * five real people, named, with the pursuit framing intact. Soft meant "not
 * secret", never "cleared for a public website". Nothing is `public` today, so
 * this returns empty and the showcase section drops out — which is the right
 * default until each entry is rewritten without a real name.
 */
export function publicIntents(
  intents: readonly CommunicationIntent[] = COMMUNICATION_INTENTS,
): CommunicationIntent[] {
  return intents.filter((i) => i.privacy === "public");
}
