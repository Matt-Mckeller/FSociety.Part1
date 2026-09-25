import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";

const app = getApp("4wing");

export const metadata: Metadata = {
  title: `Pitch deck — ${app.title}`,
  description: "The 4wing investor presentation.",
};

export default function Page() {
  return (
    <PageShell
      app={{
        ...app,
        title: "4wing — Pitch deck",
        lede: "The counsellor support presentation: problem, companion robot, market, and team. Built from the 4wing repository and served unchanged.",
      }}
    >
      <p style={{ margin: "0 0 16px", fontSize: 14 }}>
        <a href="/apps/4wing" style={{ color: app.accent, fontWeight: 600, textDecoration: "none" }}>
          ← All 4wing surfaces
        </a>
      </p>
      <MountedApp id="4wing-pitch" title="4wing pitch deck" />
    </PageShell>
  );
}
