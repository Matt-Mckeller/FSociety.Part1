"use client";

import { HudShell } from "@4eye/web/app/(hud)/HudShell";
import { WEBSITE_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/websiteNavigationConfig";

/**
 * Server layout for the website realm. Mounts the shared `HudShell`
 * with the website navigation config so the FullHud dock, keyboard
 * navigation, and current-location bar all reflect website tiles
 * (Why / Who / Learn / Money / Projects / Marketing / Gamification).
 */
export default function WebsiteRealmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HudShell navigationConfig={WEBSITE_HUD_NAV_CONFIG}>{children}</HudShell>
  );
}
