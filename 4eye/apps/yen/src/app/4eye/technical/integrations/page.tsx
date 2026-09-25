import type { Metadata } from "next";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import { TechnicalPlaceholderPage } from "@4eye/web/Tiles/technical/TechnicalPlaceholderPage";

export const metadata: Metadata = { title: "Integrations — 4eye Technical" };

export default function IntegrationsPage() {
  return <TechnicalPlaceholderPage title="Integrations" Icon={ExtensionRoundedIcon} />;
}
