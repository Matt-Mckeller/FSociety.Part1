"use client";

/**
 * `useRealm` — single hook that assembles HUD realm state so components stop
 * piecing it together from `useActiveMap` + `usePathname` + the registry.
 *
 * Returns the realm the user is on (`currentRealm`, derived from the route),
 * the realm selected in the switcher (`activeMap`), its setter, the full
 * {@link RealmDefinition}, and the nav config (or `null` for placeholder-only
 * realms).
 */

import { usePathname } from "next/navigation";
import type { MapGridNavigationConfig } from "@expanse/map";

import { useActiveMap } from "./state";
import {
  REALMS,
  realmForPathname,
  navConfigForRealm,
  type RealmDefinition,
  type RealmKey,
} from "@4eye/web/lib/hud/realmRegistry";

export interface UseRealmResult {
  /** Realm derived from the current route. */
  currentRealm: RealmKey;
  /** Realm currently selected in the map switcher. */
  activeMap: RealmKey;
  /** Select a realm in the switcher. */
  setActiveMap: (key: RealmKey) => void;
  /** Full definition for the active realm. */
  realmDef: RealmDefinition;
  /** Nav config for the active realm (`null` = placeholder-only). */
  navConfig: MapGridNavigationConfig | null;
}

export function useRealm(): UseRealmResult {
  const pathname = usePathname();
  const { activeMap, setActiveMap } = useActiveMap<RealmKey>();
  return {
    currentRealm: realmForPathname(pathname),
    activeMap,
    setActiveMap,
    realmDef: REALMS[activeMap],
    navConfig: navConfigForRealm(activeMap),
  };
}
