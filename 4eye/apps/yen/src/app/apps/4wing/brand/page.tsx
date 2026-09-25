import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";

const app = getApp("4wing");

export const metadata: Metadata = {
  title: `Character & brand — ${app.title}`,
  description: "The 4wing companion character and logo designer.",
};

export default function Page() {
  return (
    <PageShell
      app={{
        ...app,
        title: "4wing — Character & brand",
        lede: "The companion designer from the 4wing repository: body, expression, wings, colour presets, and logo layouts. Served unchanged.",
      }}
    >
      <p style={{ margin: "0 0 16px", fontSize: 14 }}>
        <a href="/apps/4wing" style={{ color: app.accent, fontWeight: 600, textDecoration: "none" }}>
          ← All 4wing surfaces
        </a>
      </p>
      <MountedApp id="4wing-brand" title="4wing character designer" />
    </PageShell>
  );
}
