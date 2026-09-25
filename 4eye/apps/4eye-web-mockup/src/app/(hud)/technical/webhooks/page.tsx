import type { Metadata } from "next";
import WebhookRoundedIcon from "@mui/icons-material/WebhookRounded";
import { TechnicalPlaceholderPage } from "@4eye/web/Tiles/technical/TechnicalPlaceholderPage";

export const metadata: Metadata = { title: "Webhooks — 4eye Technical" };

export default function WebhooksPage() {
  return <TechnicalPlaceholderPage title="Webhooks" Icon={WebhookRoundedIcon} />;
}
