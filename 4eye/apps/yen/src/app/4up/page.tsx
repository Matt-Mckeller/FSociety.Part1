import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { CollectionPreview } from "@/components/docs/CollectionPreview";

const app = getApp("4up");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <CollectionPreview collectionId="4up" />
    </PageShell>
  );
}
