import type { Metadata } from "next";
import { IntegrationLayersTile } from "@4eye/web/Tiles/integration-layers";

export const metadata: Metadata = { title: "AI Integration Layers — 4eye" };

export default function IntegrationLayersPage() {
  return <IntegrationLayersTile />;
}
