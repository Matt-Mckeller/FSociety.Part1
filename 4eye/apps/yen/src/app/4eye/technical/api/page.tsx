import type { Metadata } from "next";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import { TechnicalPlaceholderPage } from "@4eye/web/Tiles/technical/TechnicalPlaceholderPage";

export const metadata: Metadata = { title: "API — 4eye Technical" };

export default function ApiPage() {
  return <TechnicalPlaceholderPage title="API" Icon={ApiRoundedIcon} />;
}
