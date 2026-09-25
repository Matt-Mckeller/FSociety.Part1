import type { Metadata } from "next";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import { TechnicalPlaceholderPage } from "@4eye/web/Tiles/technical/TechnicalPlaceholderPage";

export const metadata: Metadata = { title: "SDK — 4eye Technical" };

export default function SdkPage() {
  return <TechnicalPlaceholderPage title="SDK" Icon={TerminalRoundedIcon} />;
}
