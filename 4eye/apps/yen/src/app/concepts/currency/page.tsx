import { CURRENCY_CONCEPT } from "@yen/content/concepts/currency";
import { PageShell } from "@/components/PageShell";
import { CurrencyBoard } from "@/components/concepts/CurrencyBoard";
import type { AppEntry } from "@yen/content";

/**
 * Synthetic registry entry so Currency can reuse PageShell without forcing the
 * home grid to grow a tile for every migrated Web 4 section.
 */
const app: AppEntry = {
  id: "currency",
  title: CURRENCY_CONCEPT.title,
  href: CURRENCY_CONCEPT.href,
  summary: CURRENCY_CONCEPT.lede,
  lede: CURRENCY_CONCEPT.lede,
  status: "live",
  group: "workshop",
  accent: CURRENCY_CONCEPT.accent,
};

export const metadata = {
  title: `${CURRENCY_CONCEPT.title}`,
  description: CURRENCY_CONCEPT.lede,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <CurrencyBoard />
    </PageShell>
  );
}
