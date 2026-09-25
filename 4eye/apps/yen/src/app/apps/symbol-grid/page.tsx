import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";

const app = getApp("symbol-grid");

export const metadata: Metadata = {
  title: `${app.title}`,
  description: app.summary,
};

/* The application itself, built from its own repository and served unchanged. */
export default function Page() {
  return (
    <PageShell app={app}>
      <MountedApp id="symbol-grid" title={app.title} />
    </PageShell>
  );
}
