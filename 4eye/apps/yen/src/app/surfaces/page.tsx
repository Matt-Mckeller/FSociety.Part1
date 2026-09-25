import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { SurfaceInventory } from "@/components/surfaces/SurfaceInventory";

const app = getApp("surfaces");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <SurfaceInventory />
    </PageShell>
  );
}
