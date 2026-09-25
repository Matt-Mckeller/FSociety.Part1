import type { Metadata } from "next";
import { PAGES, type PageMeta } from "@4eye/web/app/(hud)/pages";

const SITE = "4eye";
const DEFAULT_DESCRIPTION =
  "4eye marketing plan — amplify your human. Improve your relationships, your communication, your humans, yourself.";

/**
 * Build a Next.js Metadata object for one of the marketing routes by slug.
 * Centralizes title/description formatting so every page gets a consistent
 * `<title>` of `${page.title} — 4eye` and a meaningful description.
 */
export function metadataFor(slug: PageMeta["slug"]): Metadata {
  const page = PAGES.find((p) => p.slug === slug);
  if (!page) {
    return { title: SITE, description: DEFAULT_DESCRIPTION };
  }
  const title = page.slug === "home" ? `${SITE} — Amplify your human` : `${page.title} — ${SITE}`;
  return {
    title,
    description: page.summary,
    openGraph: { title, description: page.summary, siteName: SITE },
    twitter: { card: "summary", title, description: page.summary },
  };
}
