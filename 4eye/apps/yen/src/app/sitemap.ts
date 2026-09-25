import type { MetadataRoute } from "next";
import { APPS } from "@yen/content";
import { absoluteUrl } from "@/lib/site";

/*
  Curated, not exhaustive.

  The site prerenders ~380 pages, but roughly 520 of the documents behind that
  number are working notes imported as-is. Listing them would tell a search
  engine that the archive is the point of the domain, when it is the appendix.
  So the sitemap covers the site's own routes and the application registry, and
  the document archive is represented by its index alone.

  Add individual documents here as they are curated — that is the mechanism for
  promoting one out of the archive, and the reason this file reads the registry
  rather than the filesystem.
*/

/** Routes that exist as pages in `src/app` rather than registry entries. */
const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/vision", priority: 0.8 },
  { path: "/videos", priority: 0.8 },
  { path: "/docs", priority: 0.8 },
  { path: "/4eye", priority: 0.8 },
  { path: "/photos", priority: 0.6 },
  { path: "/posts", priority: 0.6 },
  { path: "/social", priority: 0.5 },
  { path: "/live", priority: 0.5 },
  { path: "/equipment", priority: 0.5 },
  { path: "/integration-layer", priority: 0.5 },
  { path: "/4eye-extension", priority: 0.5 },
  { path: "/surfaces", priority: 0.4 },
  { path: "/donate", priority: 0.4 },
  { path: "/concepts/learning", priority: 0.4 },
  { path: "/concepts/currency", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const seen = new Set(STATIC_ROUTES.map((r) => r.path));

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    priority: r.priority,
  }));

  for (const app of APPS) {
    // Disabled tiles are inventory signals, not destinations — several 404.
    if (app.disabled) continue;
    // Off-site and in-page hrefs are not pages of this site.
    if (!app.href.startsWith("/") || app.href.includes("#")) continue;
    if (seen.has(app.href)) continue;
    seen.add(app.href);
    entries.push({ url: absoluteUrl(app.href), lastModified, priority: 0.6 });
  }

  return entries;
}
