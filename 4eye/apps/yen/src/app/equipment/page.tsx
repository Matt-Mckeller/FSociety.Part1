import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { EquipmentBoard } from "@/components/equipment/EquipmentBoard";

const app = getApp("equipment");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <EquipmentBoard />
    </PageShell>
  );
}
