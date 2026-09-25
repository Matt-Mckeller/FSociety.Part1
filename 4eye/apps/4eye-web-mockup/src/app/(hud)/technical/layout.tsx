"use client";

import { AISettingsProvider } from "@4eye/features";
import { HudShell } from "@4eye/web/app/(hud)/HudShell";
import { TECHNICAL_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/technicalNavigationConfig";

export default function TechnicalRealmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AISettingsProvider>
      <HudShell navigationConfig={TECHNICAL_HUD_NAV_CONFIG}>{children}</HudShell>
    </AISettingsProvider>
  );
}
