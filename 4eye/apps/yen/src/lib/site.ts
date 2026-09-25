/**
 * Site identity, in one place.
 *
 * The name and description were previously inlined in `layout.tsx` only, which
 * is why the wordmark never appeared on the page itself — the site's own name
 * existed solely inside `<title>`. Metadata, the header wordmark, the sitemap
 * and the social card now read the same constants.
 */

export const SITE_NAME = "yen";

/** One sentence a stranger can repeat to someone else. */
export const SITE_TAGLINE = "Plans, products and content, in one place.";

export const SITE_DESCRIPTION =
  "The work of Matthew McKeller: six products, an interactive application, and an archive of the planning documents behind them.";

/** Twitch login for /live embed + outbound link. */
export const TWITCH_CHANNEL = "4eye_humanai";

export const TWITCH_CHANNEL_URL = `https://www.twitch.tv/${TWITCH_CHANNEL}`;

const FALLBACK_ORIGIN = "http://localhost:3400";

/**
 * Absolute origin for canonical URLs, the sitemap and `og:image`.
 *
 * No domain is chosen yet (see `yen-unified-release.md` §11). Set
 * `NEXT_PUBLIC_SITE_URL` at build time; until then this resolves to localhost,
 * which is wrong in production but wrong *visibly* rather than silently.
 */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_ORIGIN;
  return raw.replace(/\/+$/, "");
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
