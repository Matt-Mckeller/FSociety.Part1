"use client";

/**
 * `MapSessionProviders` — composed wrapper for the HUD map session context.
 *
 * Wraps: `RoleSelectionProvider → MapDirectionFocusProvider`
 *
 * `ActiveMapProvider` was moved up to `HudShell` so it's shared between the
 * header `RealmLocationBar` and the full-screen map overlay. Do not add it
 * back here — doing so would create a duplicate, disconnected provider that
 * breaks realm switching from the header.
 */

import type { ReactNode } from "react";

import {
  RoleSelectionProvider,
  MapDirectionFocusProvider,
} from "./state";
import type { RoleKey } from "./mapContent/types";

export interface MapSessionProvidersProps {
  /** Initial role for the role-relevant panels. Defaults to `"default"`. */
  defaultRole?: RoleKey;
  children: ReactNode;
}

export function MapSessionProviders({
  defaultRole = "default",
  children,
}: MapSessionProvidersProps) {
  return (
    <RoleSelectionProvider<RoleKey> defaultRole={defaultRole}>
      <MapDirectionFocusProvider>{children}</MapDirectionFocusProvider>
    </RoleSelectionProvider>
  );
}
