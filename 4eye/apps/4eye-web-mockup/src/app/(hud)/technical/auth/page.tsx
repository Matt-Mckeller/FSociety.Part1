import type { Metadata } from "next";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { TechnicalPlaceholderPage } from "@4eye/web/Tiles/technical/TechnicalPlaceholderPage";

export const metadata: Metadata = { title: "Auth — 4eye Technical" };

export default function AuthPage() {
  return <TechnicalPlaceholderPage title="Auth" Icon={LockRoundedIcon} />;
}
