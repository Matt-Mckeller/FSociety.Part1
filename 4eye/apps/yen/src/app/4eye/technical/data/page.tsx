import type { Metadata } from "next";
import { DataTile } from "@4eye/web/Tiles/technical/DataTile";

export const metadata: Metadata = { title: "Data — 4eye Technical" };

export default function DataPage() {
  return <DataTile />;
}
