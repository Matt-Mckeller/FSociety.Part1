import { Suspense } from "react";
import { getApp } from "@yen/content";
import { FourEyeBootScreen } from "@4eye/web/components/boot/FourEyeBootScreen";
import { PageShell } from "@/components/PageShell";
import { LayerModes } from "./LayerModes";

const app = getApp("integration-layer");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      {/*
        `useSearchParams` opts a route into client rendering unless it is inside
        a Suspense boundary; without one, `next build` fails this page outright
        rather than prerendering it.
      */}
      <Suspense fallback={<FourEyeBootScreen />}>
        <LayerModes />
      </Suspense>
    </PageShell>
  );
}
