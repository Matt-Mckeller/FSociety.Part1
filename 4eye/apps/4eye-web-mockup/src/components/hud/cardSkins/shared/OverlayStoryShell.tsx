"use client";

/**
 * StoryShell — minimum providers needed to mount
 * `MinimapFullViewOverlay` inside a Storybook story. Extracted from
 * `MinimapFullViewOverlay.stories.tsx` so the new card-skin gallery
 * stories share the exact same shell.
 */

import { useEffect, type ReactNode } from "react";
import { Box } from "@mui/material";

import { NavigationProvider } from "@expanse/map"
import { HudInsetsProvider, HudStateProvider, useOpenMapView } from "@expanse/hud"

import { ActiveMapProvider } from "../../state";
import { WEBSITE_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/websiteNavigationConfig";
import type { RealmKey } from "@4eye/web/lib/hud/realmRegistry";

function OpenMapOnMount() {
  const open = useOpenMapView();
  useEffect(() => {
    open();
  }, [open]);
  return null;
}

export interface OverlayStoryShellProps {
  children: ReactNode;
  /** Page background behind the HUD chrome. Defaults to white. */
  bgcolor?: string;
}

export function OverlayStoryShell({
  children,
  bgcolor = "#ffffff",
}: OverlayStoryShellProps) {
  return (
    <Box sx={{ position: "fixed", inset: 0, bgcolor }}>
      <HudInsetsProvider>
        <HudStateProvider>
          <ActiveMapProvider<RealmKey> defaultMap="website">
            <NavigationProvider config={WEBSITE_HUD_NAV_CONFIG}>
              <OpenMapOnMount />
              {children}
            </NavigationProvider>
          </ActiveMapProvider>
        </HudStateProvider>
      </HudInsetsProvider>
    </Box>
  );
}
