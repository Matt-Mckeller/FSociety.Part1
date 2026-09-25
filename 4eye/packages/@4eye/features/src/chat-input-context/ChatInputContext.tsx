"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useAISettings } from "../ai-settings";
import { useContextActionBar } from "../context-actions";
import { useContextData } from "../context-data";
import { useDomain } from "../domain";
import { useGoals, useProjects } from "../goals";
import { useProfileContext } from "../profile";
import { useTargeting } from "../targeting";
import {
  buildChatInputContext,
  summarizeChatInputContext,
  type ChatInputContextPayload,
  type ResolvedSelectedContext,
  type ResolvedTargeting,
} from "./buildChatInputContext";

interface ChatInputContextValue {
  payload: ChatInputContextPayload;
  summary: string;
  /** Reset every slice that participates in the chat input. */
  clearAll: () => void;
}

const ChatInputContext = createContext<ChatInputContextValue | undefined>(undefined);

/**
 * ChatInputContextProvider — composes every input-side context
 * (Domain, Goals, Projects, ContextData entities, AISettings,
 * ContextActions, Profile) into a single resolved payload.
 *
 * Must be mounted *inside* every contributing provider.
 */
export function ChatInputContextProvider({ children }: { children: ReactNode }) {
  const { domainConfig } = useDomain();
  const { selectedGoals } = useGoals();
  const { selectedProjects } = useProjects();
  const {
    targets,
    audiences,
    locations,
    stories,
    animations,
    scenes,
    sequences,
    pipelines,
    selectedContext,
    clearSelectedContext,
  } = useContextData();
  const { settings: aiSettings } = useAISettings();
  const { actions } = useContextActionBar();
  const { settings: profile } = useProfileContext();
  const {
    state: targetingState,
    resolvedActors,
    resolvedTargets,
    clearAll: clearTargeting,
  } = useTargeting();

  const resolvedContext = useMemo<ResolvedSelectedContext>(() => {
    const byId = <T extends { id: string }>(list: T[], ids: string[]): T[] =>
      ids.map((id) => list.find((e) => e.id === id)).filter((e): e is T => Boolean(e));
    return {
      targets: byId(targets, selectedContext.targets),
      audiences: byId(audiences, selectedContext.audiences),
      locations: byId(locations, selectedContext.locations),
      stories: byId(stories, selectedContext.stories),
      animations: byId(animations, selectedContext.animations),
      scenes: byId(scenes, selectedContext.scenes),
      sequences: byId(sequences, selectedContext.sequences),
      pipelines: byId(pipelines, selectedContext.pipelines),
    };
  }, [
    targets,
    audiences,
    locations,
    stories,
    animations,
    scenes,
    sequences,
    pipelines,
    selectedContext,
  ]);

  const targeting = useMemo<ResolvedTargeting>(
    () => ({
      state: targetingState,
      actors: resolvedActors.map((r) => r.target),
      targets: resolvedTargets.map((r) => r.target),
    }),
    [targetingState, resolvedActors, resolvedTargets],
  );

  const payload = useMemo(
    () =>
      buildChatInputContext({
        domain: domainConfig,
        goals: selectedGoals,
        projects: selectedProjects,
        selectedContext,
        resolvedContext,
        targeting,
        aiSettings,
        contextActions: actions,
        profile,
      }),
    [
      domainConfig,
      selectedGoals,
      selectedProjects,
      selectedContext,
      resolvedContext,
      targeting,
      aiSettings,
      actions,
      profile,
    ],
  );

  const summary = useMemo(() => summarizeChatInputContext(payload), [payload]);

  const clearAll = useCallback(() => {
    clearSelectedContext();
    clearTargeting();
  }, [clearSelectedContext, clearTargeting]);

  const value = useMemo<ChatInputContextValue>(
    () => ({ payload, summary, clearAll }),
    [payload, summary, clearAll],
  );

  return (
    <ChatInputContext.Provider value={value}>
      {children}
    </ChatInputContext.Provider>
  );
}

export function useChatInputContext(): ChatInputContextValue {
  const ctx = useContext(ChatInputContext);
  if (!ctx)
    throw new Error(
      "useChatInputContext must be used within ChatInputContextProvider",
    );
  return ctx;
}
