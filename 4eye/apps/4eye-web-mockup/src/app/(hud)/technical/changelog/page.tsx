import type { Metadata } from "next";
import ChangeHistoryRoundedIcon from "@mui/icons-material/ChangeHistoryRounded";
import { TechnicalPlaceholderPage } from "@4eye/web/Tiles/technical/TechnicalPlaceholderPage";

export const metadata: Metadata = { title: "Changelog — 4eye Technical" };

export default function ChangelogPage() {
  return <TechnicalPlaceholderPage title="Changelog" Icon={ChangeHistoryRoundedIcon} />;
}
