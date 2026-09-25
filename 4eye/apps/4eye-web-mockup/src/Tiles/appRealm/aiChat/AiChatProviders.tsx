"use client";

import { useMemo } from "react";
import {
  AISettingsProvider,
  ChatInputContextProvider,
  ContextActionBarProvider,
  ContextDataProvider,
  DomainProvider,
  GoalsProvider,
  PresetsProvider,
  ProfileContextProvider,
  ProjectsProvider,
  TargetingProvider,
} from "@4eye/features";
import { CharacterProvider, useCharacter } from "@4eye/web/Tiles/character/store/CharacterProvider";
import { CharacterProfileStore } from "@4eye/web/Tiles/character/store/CharacterProfileStore";
import { LearningProvider } from "@4eye/web/Tiles/learning";
import { AiChatDashboard } from "./AiChatDashboard";
import { useProfileGoalCatalog } from "./contextSelectors/profileGoals";
import { contextActionsFromEquippedSpells } from "./workbench/spellActions";

/**
 * AiChatProviders — full provider stack for the chat experience.
 * Order matters: Domain must come before Goals/Projects (they
 * depend on it); Targeting needs ContextData; ChatInputContext
 * must wrap last so it can read every slice.
 *
 * `LearningProvider` is hoisted here rather than left inside `LearningTile`
 * because the session is no longer the property of one tab: the dock renders
 * it, the composer takes its placeholder from it, and sending a message ticks
 * its checklist. All three have to read one store.
 */
function ProfileGoalsProvider({ children }: { children: React.ReactNode }) {
  const catalog = useProfileGoalCatalog();
  return <GoalsProvider catalog={catalog}>{children}</GoalsProvider>;
}

function SpellActionCatalogProvider({ children }: { children: React.ReactNode }) {
  const { character } = useCharacter();
  const catalog = useMemo(
    () => contextActionsFromEquippedSpells(character.equippedSpells),
    [character.equippedSpells],
  );
  return <ContextActionBarProvider catalog={catalog}>{children}</ContextActionBarProvider>;
}

export function AiChatProviders({ children }: { children: React.ReactNode }) {
  return (
    <LearningProvider>
    <DomainProvider>
      <ProjectsProvider>
        <ContextDataProvider>
          <TargetingProvider>
            <AISettingsProvider>
              <CharacterProvider>
                <CharacterProfileStore>
                  <ProfileGoalsProvider>
                    <SpellActionCatalogProvider>
                      <ProfileContextProvider>
                        <PresetsProvider>
                          <ChatInputContextProvider>{children}</ChatInputContextProvider>
                        </PresetsProvider>
                      </ProfileContextProvider>
                    </SpellActionCatalogProvider>
                  </ProfileGoalsProvider>
                </CharacterProfileStore>
              </CharacterProvider>
            </AISettingsProvider>
          </TargetingProvider>
        </ContextDataProvider>
      </ProjectsProvider>
    </DomainProvider>
    </LearningProvider>
  );
}

export { AiChatDashboard };
