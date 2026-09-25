import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";

const app = getApp("4wing");

export const metadata: Metadata = {
  title: `${app.title}`,
  description: app.summary,
};

/**
 * The product site is the frame below. Pitch, character design, and docs are
 * sibling mounts — same repository, not ported — reached from here so a visitor
 * does not have to know they exist as separate builds.
 */
const ENTRY_POINTS: Array<{ href: string; label: string; note: string; lead?: boolean }> = [
  {
    href: "/apps/4wing#product",
    label: "Product website",
    note: "The counsellor support site, with the companion character on the page.",
    lead: true,
  },
  {
    href: "/apps/4wing/pitch",
    label: "Pitch deck",
    note: "The investor presentation — problem, robot, market, team.",
  },
  {
    href: "/apps/4wing/brand",
    label: "Character & brand design",
    note: "The companion designer: body, expression, wings, colour, logo layouts.",
  },
  {
    href: "/apps/4wing/docs",
    label: "Documentation",
    note: "Features, screens, robot model, privacy, and the project plan.",
  },
];

export default function Page() {
  return (
    <PageShell app={app}>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          marginBottom: 20,
        }}
      >
        {ENTRY_POINTS.map((entry) => (
          <a
            key={entry.href}
            href={entry.href}
            style={{
              display: "block",
              padding: "14px 16px",
              borderRadius: 8,
              border: "1px solid",
              borderColor: entry.lead ? app.accent : "#e7e5e4",
              borderLeft: `3px solid ${entry.lead ? app.accent : "#d6d3d1"}`,
              background: entry.lead ? `${app.accent}0d` : "#fff",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 15,
                fontWeight: 650,
                color: entry.lead ? app.accent : "#1c1917",
              }}
            >
              {entry.label}
            </span>
            <span style={{ display: "block", fontSize: 13, lineHeight: 1.5, color: "#78716c", marginTop: 3 }}>
              {entry.note}
            </span>
          </a>
        ))}
      </div>

      <div id="product">
        <MountedApp id="4wing" title={app.title} />
      </div>
    </PageShell>
  );
}
