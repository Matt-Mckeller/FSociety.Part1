"use client";

import { useAppRealmHudChrome } from "./useAppRealmHudChrome";

/**
 * Mounts as a child of HudShell (inside FullHudProviders) so that
 * useRegisterHudChromeHide can access the chrome-visibility context.
 *
 * Hides the default orb bar for the entire app realm — individual pages
 * are responsible for registering their own custom action bars.
 */
export function AppRealmChromeRegistrar() {
  useAppRealmHudChrome();
  return null;
}
