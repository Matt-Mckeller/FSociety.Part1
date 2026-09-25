/**
 * Shared time-formatting helpers for the character surface.
 *
 * Previously each panel (CharacterFeed, CharacterTimeline, Relationships,
 * DailyFocus, StatusRAM) re-implemented its own relative-time / date logic.
 * These are the single source; import from here instead of redefining.
 */

const MIN = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

/** "just now" · "5m ago" · "3h ago" · "2d ago" — compact recency. */
export function relativeTime(ms: number): string {
  const ago = Date.now() - ms;
  if (ago < MIN) return "just now";
  if (ago < HOUR) return `${Math.floor(ago / MIN)}m ago`;
  if (ago < DAY) return `${Math.floor(ago / HOUR)}h ago`;
  return `${Math.floor(ago / DAY)}d ago`;
}

/**
 * Coarser recency that rolls up into weeks/months/years.
 *
 * Falls through to `relativeTime` under a day rather than flooring to days —
 * an event two hours old was reading "0d ago", which is both wrong-looking and
 * strictly less information than the clock already had.
 */
export function relativeTimeLabel(ms: number): string {
  const ago = Date.now() - ms;
  const years = ago / (365 * DAY);
  if (years >= 1) return `${Math.floor(years)}y ago`;
  const months = ago / (30 * DAY);
  if (months >= 1) return `${Math.floor(months)}mo ago`;
  const days = Math.floor(ago / DAY);
  if (days >= 1) return `${days}d ago`;
  return relativeTime(ms);
}

/** "today" · "yesterday" · "3d ago" · "2w ago" · "4mo ago". */
export function daysSince(ms?: number): string {
  if (!ms) return "—";
  const days = Math.floor((Date.now() - ms) / DAY);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

/** Remaining lifetime of a buff: "Permanent" · "Expired" · "2h 15m left". */
export function timeLeftLabel(expiresAt: number | null | undefined): string {
  if (!expiresAt) return "Permanent";
  const ms = expiresAt - Date.now();
  if (ms <= 0) return "Expired";
  const hrs = Math.floor(ms / HOUR);
  const mins = Math.ceil((ms % HOUR) / MIN);
  if (hrs > 0) return `${hrs}h ${mins}m left`;
  return `${mins}m left`;
}

/** "Mar 3, 2026" absolute date. */
export function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
