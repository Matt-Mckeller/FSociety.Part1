import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { ExtensionRoadmap } from "@/components/extension/ExtensionRoadmap";

const app = getApp("4eye-extension");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <ExtensionRoadmap />
    </PageShell>
  );
}
