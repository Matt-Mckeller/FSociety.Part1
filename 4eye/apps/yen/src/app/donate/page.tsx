import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { DonateBoard } from "@/components/donate/DonateBoard";

const app = getApp("donate");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <DonateBoard />
    </PageShell>
  );
}
