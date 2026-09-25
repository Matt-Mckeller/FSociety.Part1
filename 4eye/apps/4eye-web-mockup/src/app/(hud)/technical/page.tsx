import type { Metadata } from "next";
import { SettingsTile } from "@4eye/web/Tiles/technical/SettingsTile";

export const metadata: Metadata = { title: "Settings — 4eye Technical" };

export default function TechnicalSettingsPage() {
  return <SettingsTile />;
}
