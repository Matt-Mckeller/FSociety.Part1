import { LEARNING_CONCEPT } from "@yen/content/concepts/learning";
import { PageShell } from "@/components/PageShell";
import { LearningBoard } from "@/components/concepts/LearningBoard";
import type { AppEntry } from "@yen/content";

/**
 * Synthetic registry entry so Learning can reuse PageShell without forcing a
 * home-grid tile for every migrated concept.
 */
const app: AppEntry = {
  id: "learning",
  title: LEARNING_CONCEPT.title,
  href: LEARNING_CONCEPT.href,
  summary: LEARNING_CONCEPT.lede,
  lede: LEARNING_CONCEPT.lede,
  status: "live",
  group: "workshop",
  accent: LEARNING_CONCEPT.accent,
};

export const metadata = {
  title: `${LEARNING_CONCEPT.title}`,
  description: LEARNING_CONCEPT.lede,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <LearningBoard />
    </PageShell>
  );
}
