import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { MountedApp } from "@/components/MountedApp";

const app = getApp("command-center");

export const metadata: Metadata = {
  title: `${app.title}`,
  description: app.summary,
};

/**
 * Where to go first, before the frame.
 *
 * The documentation is the most valuable thing on this route and the hardest to
 * reach: inside a framed application, behind its own router, with no address a
 * reader can be handed. Promoted here so it is one click rather than three, and
 * placed above the frame because it should be read before the app is poked at.
 */
const ENTRY_POINTS: Array<{ href: string; label: string; note: string; lead?: boolean }> = [
  {
    href: "/mounted/command-center/docs",
    label: "Command Center documentation",
    note: "The planning model written out in full — the most complete account of it anywhere here.",
    lead: true,
  },
  {
    href: "/apps/command-center/compass",
    label: "Strategic Compass",
    note: "The one view rebuilt natively against this site's theme and breakpoints.",
  },
  {
    href: "/4eye/appRealm/command-center",
    label: "The same data in 4eye",
    note: "The Plan tile. Same planning data, presented as part of the application.",
  },
];

/*
  The whole Command Center, unmodified, built by its own Vite toolchain and
  framed here. The Strategic Compass port that used to live on this route is
  kept at /apps/command-center/compass — it is the one view rebuilt against this
  site's theme and breakpoints, so it is worth having natively as well.
*/
export default function Page() {
  return (
    <PageShell app={app}>
      {/*
        Plain anchors and inline styles: this is a server component passed as
        `children` into the client shell, and pulling MUI in here would put the
        whole library into a route whose point is an iframe.
      */}
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

      <MountedApp id="command-center" title="Command Center" />
    </PageShell>
  );
}
