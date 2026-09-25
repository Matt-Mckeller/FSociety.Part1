import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { PrivacyKnowledgeBoard } from "@/components/privacy/PrivacyKnowledgeBoard";

const app = getApp("sample-privacy");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <PrivacyKnowledgeBoard />
    </PageShell>
  );
}
