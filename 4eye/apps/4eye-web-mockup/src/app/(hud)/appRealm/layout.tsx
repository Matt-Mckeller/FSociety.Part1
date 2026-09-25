"use client";

import { HudShell } from "@4eye/web/app/(hud)/HudShell";
import { APP_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/appNavigationConfig";
import { AppRealmChromeRegistrar } from "@4eye/web/Tiles/appRealm/AppRealmChromeRegistrar";

/**
 * Server layout for the app realm. Mounts the shared `HudShell` with
 * the app navigation config so the FullHud dock, keyboard navigation,
 * and current-location bar all reflect app realm tiles (Classes /
 * Social / AI Chat / Rooms / Dashboard / Recaps / Profile / Stores /
 * Notes — 3x3 grid centered on Dashboard).
 *
 * `AppRealmChromeRegistrar` is rendered as a child of HudShell so it
 * sits inside FullHudProviders and can call useRegisterHudChromeHide
 * to suppress the default orb bar. Custom bars will be added per page.
 */
export default function AppRealmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HudShell navigationConfig={APP_HUD_NAV_CONFIG}>
      <AppRealmChromeRegistrar />
      {children}
    </HudShell>
  );
}
