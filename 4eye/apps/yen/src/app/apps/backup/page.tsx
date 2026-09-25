import type { Metadata } from "next";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { BackupPreview } from "@/components/BackupPreview";

/*
  A static route rather than a `showcases` entry under `/apps/[slug]`: the
  showcase body is prose about something that cannot be run here, and this page
  is the exhibit — two captures in the same frame the home page gives the
  profile pair. The static segment wins over the dynamic one, so the registry
  entry keeps pointing at `/apps/backup` either way.
*/

const app = getApp("backup");

export const metadata: Metadata = {
  title: app.title,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <BackupPreview />
    </PageShell>
  );
}
