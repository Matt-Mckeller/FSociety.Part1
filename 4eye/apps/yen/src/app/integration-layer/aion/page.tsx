import type { Metadata } from "next";
import type { AppEntry } from "@yen/content";
import { AION_NOTES } from "@yen/content/aion";
import { PageShell } from "@/components/PageShell";
import { AionNotesBoard } from "@/components/layers/AionNotesBoard";

/**
 * Synthetic registry entry — reachable, not a home-grid tile.
 * Working notes stay off the sitemap; this page asks not to be indexed.
 */
const app: AppEntry = {
  id: "aion-notes",
  title: AION_NOTES.title,
  href: AION_NOTES.href,
  summary: AION_NOTES.lede,
  lede: AION_NOTES.lede,
  status: "preview",
  group: "systems",
  accent: AION_NOTES.accent,
  chipLabel: "Working notes",
  statusNote: "Still learning / creating this — accuracy is being optimized.",
};

export const metadata: Metadata = {
  title: AION_NOTES.title,
  description: AION_NOTES.lede,
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PageShell app={app}>
      <AionNotesBoard />
    </PageShell>
  );
}
