import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RoleDossierPage from "@4eye/web/Tiles/character/components/RoleDossierPage";
import { roleOptionForId } from "@yen/content/character/titles";

export const metadata: Metadata = {
  title: "Game Master — 4eye",
  description:
    "Runs the world as a game — content, systems, and people in one campaign.",
};

export default function GameMasterRolePage() {
  const role = roleOptionForId("game-master");
  if (!role) notFound();
  return <RoleDossierPage role={role} />;
}
