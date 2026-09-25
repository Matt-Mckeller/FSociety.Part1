import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";

const app = getApp("command-center");

export const metadata: Metadata = {
  title: `Strategic Compass — ${app.title}`,
  description: "The Strategic Compass, rebuilt natively against this site's theme.",
};

/*
  The one Command Center view ported rather than framed: rebuilt against this
  site's MUI version, theme and breakpoint scale. Worth keeping alongside the
  framed app because the header wants the compass, and a framed copy cannot be
  composed into a page here.
*/
const StrategicCompass = dynamic(
  () =>
    import("@/apps/command-center/StrategicCompassView").then((m) => m.StrategicCompassView),
  { ssr: false, loading: () => <p style={{ color: "#78716c" }}>Loading the compass…</p> },
);

export default function Page() {
  return (
    <PageShell app={app}>
      <StrategicCompass />
    </PageShell>
  );
}
