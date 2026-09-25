"use client";

import { MarketingProgressProvider } from "@4eye/web/components/marketing-progress";
import { ExplorationProvider } from "@4eye/web/components/exploration";
import { QuestsModal, QuestsProvider } from "@4eye/web/components/quests";
import { HudStateProvider } from "@4eye/web/components/hud/state";
import { IntroGateProvider } from "@4eye/web/components/intro/IntroGateProvider";
import { SceneStudioProvider } from "@4eye/web/Tiles/scene-studio";

/**
 * Outer HUD layout shared by all realms (websiteRealm, appRealm, etc.).
 *
 * Owns the cross-cutting providers that must survive realm transitions:
 *   - MarketingProgressProvider: live currency / xp / level
 *   - ExplorationProvider: exploration-event ledger (routes, panels,
 *     actions, generic engagement) that drives quest completion
 *   - QuestsProvider: quest list + claim flow
 *   - HudStateProvider: full-screen map + Emotion.Inspect open/close state
 *
 * ExplorationProvider sits below MarketingProgressProvider and above
 * QuestsProvider because QuestsProvider reads `useExploration()` to
 * derive quest completion from real exploration events.
 *
 * Each realm subfolder ((websiteRealm), appRealm, ...) has its own
 * `layout.tsx` that mounts `HudShell` with its realm-specific
 * `navigationConfig`, so the dock + keyboard nav + current-location bar
 * are scoped to the realm the user is currently in.
 *
 * Re-exported as the default from `./layout.tsx` to satisfy Next.js's
 * App Router convention while keeping a meaningful component name.
 */
export function HudLayout({ children }: { children: React.ReactNode }) {
  return (
    <IntroGateProvider>
      <MarketingProgressProvider>
        <ExplorationProvider>
          <QuestsProvider>
            <HudStateProvider>
              <SceneStudioProvider>
                {children}
                <QuestsModal />
              </SceneStudioProvider>
            </HudStateProvider>
          </QuestsProvider>
        </ExplorationProvider>
      </MarketingProgressProvider>
    </IntroGateProvider>
  );
}
