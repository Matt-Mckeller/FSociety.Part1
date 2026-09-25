"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { type MapGridNavigationConfig } from "@expanse/map"
import { FullHud, GAME_ITEMS, GameActionBar, HudChromeSizesProvider, useRegisterCenterContent } from "@expanse/hud"
import { useMarketingProgress } from "@4eye/web/components/marketing-progress";
import { useExploration } from "@4eye/web/components/exploration";
import { useQuests } from "@4eye/web/components/quests";
import {
  ActiveMapProvider,
  useCloseMapView,
  useHudState,
  useOpenMapView,
} from "@4eye/web/components/hud/state";
import { realmForPathname, type RealmKey } from "@4eye/web/lib/hud/realmRegistry";
import { FullScreenMapView } from "@4eye/web/components/hud/FullScreenMapView";
import { SceneStudioOverlay } from "@4eye/web/components/hud/SceneStudioOverlay";
import { EmotionInspectOverlay } from "@4eye/web/components/hud/EmotionInspectOverlay";
import { RealmLocationBar } from "@4eye/web/components/hud/RealmLocationBar";
import { SpellbookRailRegistrar } from "@4eye/web/components/hud/SpellbookRail";
import { PermissionsHudRegistrar } from "@4eye/web/components/hud/PermissionsHud";

/**
 * Render-less component that auto-opens the full-screen map view on
 * mobile viewport widths (≤ 767 px). Fires once per mount via a ref
 * guard so the user can close the map without it re-opening on
 * re-renders. Uses a plain window check after hydration to avoid a
 * MUI useMediaQuery SSR flash.
 */
function MobileMapAutoOpen() {
  const openMapView = useOpenMapView();
  const hasOpened = useRef(false);

  useEffect(() => {
    if (hasOpened.current) return;
    if (typeof window !== "undefined" && window.innerWidth <= 767) {
      hasOpened.current = true;
      openMapView();
    }
  // openMapView is stable (memoised in the provider)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

/**
 * Registers the `RealmLocationBar` into the HUD's top-center slot. Always
 * on — while the full-screen map overlay is open it grows a trailing
 * "Map" title + close segment instead of being swapped out for a
 * separate override component, so only one location indicator is ever
 * visible at once.
 *
 * Must mount inside `FullHud` (inside the CenterContentProvider).
 */
function RegisterRealmLocationBar() {
  const { isMapViewOpen } = useHudState();
  const closeMapView = useCloseMapView();
  const realmBar = useMemo(
    () => (
      <RealmLocationBar
        title={isMapViewOpen ? "Map" : undefined}
        onTitleClose={closeMapView}
      />
    ),
    [isMapViewOpen, closeMapView],
  );
  useRegisterCenterContent({
    id: "realm-location-bar",
    priority: 10,
    node: realmBar,
    label: "Realm + Page Nav",
  });
  return null;
}

/**
 * Per-realm HUD shell. Receives a `navigationConfig` from its parent
 * realm layout (e.g. (websiteRealm)/layout.tsx, appRealm/layout.tsx)
 * so the dock, keyboard nav, and current-location bar all reflect the
 * realm the user is currently in.
 *
 * Cross-cutting providers (MarketingProgress, Quests, HudState) live
 * one level up in `(hud)/HudLayout` so they survive realm transitions.
 */
export function HudShell({
  navigationConfig,
  children,
}: {
  navigationConfig: MapGridNavigationConfig;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { currency, xp, xpProgress, level } = useMarketingProgress();
  const { exploreOnce } = useExploration();
  const { open, unclaimedCount } = useQuests();
  const openMapView = useOpenMapView();
  const closeMapView = useCloseMapView();
  const { isMapViewOpen } = useHudState();

  // Auto-track page visits generically: any pathname change counts as
  // "explored" that route, which quests (e.g. view-projects) can key off.
  useEffect(() => {
    exploreOnce(`route:${pathname}`);
  }, [pathname, exploreOnce]);

  // Only the user's manual "open the full map" click counts toward the
  // minimap-mastery quest — deliberately not the mobile/EarnSlide
  // scripted auto-opens, which use `openMapView` directly elsewhere.
  const handleMinimapFullScreenRequest = useCallback(() => {
    exploreOnce("action:minimap-open");
    openMapView();
  }, [exploreOnce, openMapView]);

  // Build a customized GameActionBar items list: everything from the
  // library default, but with the `quests` item's onClick wired to open
  // the modal and its badge driven by live unclaimed count.
  const gameItems = useMemo(
    () =>
      GAME_ITEMS.map((item) =>
        item.key === "quests"
          ? {
              ...item,
              onClick: open,
              badge: unclaimedCount > 0 ? unclaimedCount : undefined,
            }
          : item,
      ),
    [open, unclaimedCount],
  );

  return (
    <ActiveMapProvider<RealmKey> defaultMap={realmForPathname(pathname)}>
    <HudChromeSizesProvider>
    <FullHud
      navigationConfig={navigationConfig}
      nextRouter={router}
      pathname={pathname}
      playerStatus={{ currency, xp, xpProgress, level }}
      gamePanel={<GameActionBar items={gameItems} />}
      onMinimapFullScreenRequest={handleMinimapFullScreenRequest}
      isMinimapFullScreenOpen={isMapViewOpen}
      onMinimapFullScreenClose={closeMapView}
    >
      {children}
      {/* Registers the combined realm+page nav bar into the HUD center slot */}
      <RegisterRealmLocationBar />
      {/* Puts the Spellbook on the HUD left rail in every realm */}
      <SpellbookRailRegistrar />
      {/* Aion Console permissions — left rail, between Spellbook and Pipeline */}
      <PermissionsHudRegistrar />
      {/* MinimapFullView lives at the shell level so it sits inside the
          FullHud's NavigationProvider + HudInsetsProvider but above page
          content. Mounted unconditionally — it returns null when the
          map view is closed. */}
      <FullScreenMapView cardSkin="paperInk/clean" />
      {/* Scene Studio overlay — same shell level as the map. State (open/close,
          selected storyboard) lives in SceneStudioProvider inside HudLayout. */}
      <SceneStudioOverlay />
      {/* Emotion.Inspect — InspectorModal on the HUD shell (not a Profile Dialog). */}
      <EmotionInspectOverlay />
      {/* On mobile viewports, open the tile map on first load so the
          full-screen grid is the default experience. */}
      <MobileMapAutoOpen />
    </FullHud>
    </HudChromeSizesProvider>
    </ActiveMapProvider>
  );
}
