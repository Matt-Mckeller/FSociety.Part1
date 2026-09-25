"use client"

import type { ReactNode } from "react"

import { PlayerStatusProvider, type PlayerStatusValue } from "@expanse/brand-core"

import {
  BottomBarsProvider,
  CenterContentProvider,
  HudChromeVisibilityProvider,
  HudHintsProvider,
  HudInsetsProvider,
  LeftRailItemsProvider,
  RightRailItemsProvider,
} from "../slots"
import {
  ActionBarVisibilityProvider,
  HudChromeGuideOverlay,
  RailPreferencesProvider,
} from "../overlay-state"
import { NavigationProvider } from "@expanse/map"
import type { MapGridNavigationConfig } from "@expanse/map"

export interface FullHudProvidersProps {
  navigationConfig: MapGridNavigationConfig
  playerStatus: Partial<PlayerStatusValue>
  children: ReactNode
  initialLabelsVisible?: boolean
}

/**
 * Provider stack required by FullHud. Extracted so the orchestrator
 * stays a flat composition. Order matters — keep this nesting in sync
 * with what the rest of the layout package expects.
 */
export function FullHudProviders({
  navigationConfig,
  playerStatus,
  children,
  initialLabelsVisible,
}: FullHudProvidersProps) {
  return (
    <NavigationProvider config={navigationConfig}>
      <HudInsetsProvider>
        <HudChromeVisibilityProvider>
          <ActionBarVisibilityProvider>
          <RailPreferencesProvider initialLabelsVisible={initialLabelsVisible}>
          <BottomBarsProvider>
            <LeftRailItemsProvider>
              <RightRailItemsProvider>
                <CenterContentProvider>
                  <HudHintsProvider defaultHints={[]}>
                    <PlayerStatusProvider value={playerStatus}>
                      {children}
                      <HudChromeGuideOverlay />
                    </PlayerStatusProvider>
                  </HudHintsProvider>
                </CenterContentProvider>
              </RightRailItemsProvider>
            </LeftRailItemsProvider>
          </BottomBarsProvider>
          </RailPreferencesProvider>
          </ActionBarVisibilityProvider>
        </HudChromeVisibilityProvider>
      </HudInsetsProvider>
    </NavigationProvider>
  )
}
