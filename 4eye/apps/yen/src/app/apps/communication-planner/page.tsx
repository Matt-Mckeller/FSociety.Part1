import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";

const app = getApp("communication-planner");

export const metadata: Metadata = {
  title: `${app.title}`,
  description: app.summary,
};

/*
  The planner itself, built from its own repository and framed here. The yen
  embed build swaps in a public demo session so the local working drafts never
  reach this site.
*/
export default function Page() {
  return (
    <PageShell app={app}>
      <MountedApp id="communication-planner" title={app.title} />
    </PageShell>
  );
}
