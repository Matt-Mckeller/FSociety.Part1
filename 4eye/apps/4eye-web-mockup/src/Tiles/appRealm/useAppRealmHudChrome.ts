"use client";

import { useRegisterHudChromeHide } from "@expanse/hud"

/**
 * useAppRealmHudChrome — installs HUD chrome adjustments for the app realm.
 *
 * Hides the global default `bottomOrbBar` so that individual app-realm
 * pages can register their own custom action bars instead.
 *
 * Must be called from a component rendered *inside* FullHudProviders
 * (i.e. as a child of HudShell / FullHud), not from the layout itself.
 */
export function useAppRealmHudChrome() {
  useRegisterHudChromeHide({
    id: "app-realm-hide-default-orb-bar",
    hide: ["bottomOrbBar"],
    label: "App Realm (custom action bars per page)",
  });
}
