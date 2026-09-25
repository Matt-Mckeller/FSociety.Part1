import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { VideoLibrary } from "@/components/media/MediaLibrary";

const app = getApp("videos");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <VideoLibrary />
    </PageShell>
  );
}
