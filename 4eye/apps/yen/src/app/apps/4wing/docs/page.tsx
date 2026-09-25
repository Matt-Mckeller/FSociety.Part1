import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";

const app = getApp("4wing");

export const metadata: Metadata = {
  title: `Documentation — ${app.title}`,
  description: "4wing features, screens, robot model, privacy, and project plan.",
};

export default function Page() {
  return (
    <PageShell
      app={{
        ...app,
        title: "4wing — Documentation",
        lede: "Features, screens, the robot model, privacy, and the project plan — the documentation site from the 4wing repository, served unchanged.",
      }}
    >
      <p style={{ margin: "0 0 16px", fontSize: 14 }}>
        <a href="/apps/4wing" style={{ color: app.accent, fontWeight: 600, textDecoration: "none" }}>
          ← All 4wing surfaces
        </a>
      </p>
      <MountedApp id="4wing-docs" title="4wing documentation" />
    </PageShell>
  );
}
