import type { Metadata } from "next";
import { PipelinesTile } from "@4eye/web/Tiles/technical/PipelinesTile";

export const metadata: Metadata = { title: "Pipelines — 4eye Technical" };

export default function PipelinesPage() {
  return <PipelinesTile />;
}
