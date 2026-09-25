import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { PhotoGallery } from "@/components/media/PhotoGallery";

const app = getApp("photos");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <PhotoGallery />
    </PageShell>
  );
}
