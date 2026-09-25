import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";
import { StorybookSwitcher, type StorybookBook } from "@/components/StorybookSwitcher";

const app = getApp("storybook");

export const metadata: Metadata = {
  title: `${app.title}`,
  description: app.summary,
};

/*
  Both books are built from their own repositories by `npm run apps` and served
  unchanged. `entryFile` on each: Storybook does not route on the path, and
  naming index.html fixes the base so its relatively-referenced assets resolve.
*/
const BOOKS: StorybookBook[] = [
  {
    id: "storybook",
    label: "4eye",
    note: "The application's own components — HUD, character, lens, map.",
    accent: "#db2777",
  },
  {
    id: "storybook-expanse",
    label: "Expanse",
    note: "260 stories across the ui, brandCore and dynamicAssets packages, plus the 4up screens.",
    accent: "#0891b2",
  },
];

export default function Page() {
  return (
    <PageShell app={app}>
      <div
        style={{
          marginBottom: 16,
          padding: "14px 16px",
          borderRadius: 10,
          border: "1px solid #fcd34d",
          background: "#fffbeb",
          color: "#92400e",
          fontSize: 14,
          lineHeight: 1.55,
        }}
      >
        <strong>Potentially incomplete.</strong> Coverage may be missing, organisation needs work,
        and some stories may be out of date. Useful for component reference anyway — treat errors
        that look intentional as fixtures; report the rest. Known rough edges: stories that need
        character/profile providers can throw when opened bare. Public link:{" "}
        <code style={{ fontSize: 13 }}>/apps/storybook</code>
      </div>
      <StorybookSwitcher
        books={BOOKS}
        frames={Object.fromEntries(
          BOOKS.map((book) => [
            book.id,
            <MountedApp key={book.id} id={book.id} title={`${book.label} Storybook`} entryFile />,
          ]),
        )}
      />
    </PageShell>
  );
}
