import type { Metadata } from "next";
import { PerformanceTile } from "@4eye/web/Tiles/technical/PerformanceTile";

export const metadata: Metadata = { title: "Performance — 4eye Technical" };

export default function PerformancePage() {
  return <PerformanceTile />;
}
