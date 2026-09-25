"use client";

import * as React from "react";
import type { AudioSearchHit, RewardDelta, RewardMark, RlEpisode, RlSignal } from "@4eye/types";
import { FLYING_PURPLE_BALL_SEED, RL_PERSONAL_AI_SETTINGS } from "@4eye/types";
import {
  acknowledgeReceipt,
  curtainViolation,
  searchAudio,
} from "@4eye/ai-sdk";

export const RL_EPISODE_CHANGED = "4eye:rl-episode-changed";
const STORAGE_KEY = "4eye-rl-episode-v1";

function emptyEpisode(): RlEpisode {
  return {
    id: "ep-purple-ball",
    subjectId: "self",
    seedId: FLYING_PURPLE_BALL_SEED.id,
    tStart: new Date().toISOString(),
    audioHits: [],
    curtainPulled: false,
    describedHidden: false,
    receipt: "",
    policy: {
      settingsSnapshot: {
        accuracy: RL_PERSONAL_AI_SETTINGS.accuracy,
        timeAspect: RL_PERSONAL_AI_SETTINGS.timeAspect,
        powerLevel: RL_PERSONAL_AI_SETTINGS.powerLevel,
        planMode: RL_PERSONAL_AI_SETTINGS.planMode,
      },
    },
    rewards: [],
  };
}

function readEpisode(): RlEpisode {
  if (typeof window === "undefined") return emptyEpisode();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyEpisode();
  try {
    return { ...emptyEpisode(), ...(JSON.parse(raw) as RlEpisode) };
  } catch {
    return emptyEpisode();
  }
}

function writeEpisode(next: RlEpisode) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(RL_EPISODE_CHANGED));
}

function upsertMark(rewards: RewardMark[], signal: RlSignal, delta: RewardDelta, note?: string): RewardMark[] {
  const rest = rewards.filter((r) => r.signal !== signal);
  return [...rest, { signal, delta, at: new Date().toISOString(), note }];
}

export function latestDelta(episode: RlEpisode, signal: RlSignal): RewardDelta | null {
  const mark = [...episode.rewards].reverse().find((r) => r.signal === signal);
  return mark ? mark.delta : null;
}

export function useRlEpisode() {
  const [episode, setEpisode] = React.useState<RlEpisode>(emptyEpisode);

  const refresh = React.useCallback(() => setEpisode(readEpisode()), []);

  React.useEffect(() => {
    refresh();
    window.addEventListener(RL_EPISODE_CHANGED, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(RL_EPISODE_CHANGED, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const commit = React.useCallback((patch: Partial<RlEpisode> | ((prev: RlEpisode) => RlEpisode)) => {
    setEpisode((prev) => {
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      writeEpisode(next);
      return next;
    });
  }, []);

  const sendBall = React.useCallback(() => {
    const vision = {
      color: "purple",
      shape: "sphere",
      count: 1,
      flying: true,
      occluded: false,
    };
    commit({
      ...emptyEpisode(),
      tStart: new Date().toISOString(),
      vision,
      receipt: acknowledgeReceipt(vision),
      rewards: upsertMark([], "vision", 1, "count=1 purple flying"),
    });
  }, [commit]);

  const occlude = React.useCallback(() => {
    commit((prev) => ({
      ...prev,
      vision: prev.vision ? { ...prev.vision, occluded: true, flying: true } : prev.vision,
    }));
  }, [commit]);

  const pullCurtain = React.useCallback(() => {
    commit((prev) => {
      const described = prev.describedHidden;
      const violation = curtainViolation(true, described);
      return {
        ...prev,
        curtainPulled: true,
        vision: prev.vision ? { ...prev.vision, occluded: false } : prev.vision,
        rewards: upsertMark(
          prev.rewards,
          "curtain",
          violation ? -1 : 1,
          violation ? "guessed, then pulled" : "pulled first",
        ),
      };
    });
  }, [commit]);

  const guessHidden = React.useCallback(() => {
    commit((prev) => ({
      ...prev,
      describedHidden: true,
      rewards: upsertMark(
        prev.rewards,
        "curtain",
        curtainViolation(prev.curtainPulled, true) ? -1 : 1,
        "described the hidden side",
      ),
    }));
  }, [commit]);

  const runSearch = React.useCallback((query: string) => {
    const result = searchAudio({ query });
    const hitKinds = new Set(result.hits.map((h: AudioSearchHit) => h.kind));
    const good = hitKinds.has("speech") || hitKinds.has("bounce");
    commit((prev) => ({
      ...prev,
      audioHits: result.hits,
      rewards: upsertMark(
        prev.rewards,
        "search",
        !query.trim() ? 0 : good ? 1 : -1,
        query,
      ),
    }));
  }, [commit]);

  const mark = React.useCallback((signal: RlSignal, delta: RewardDelta) => {
    commit((prev) => ({
      ...prev,
      rewards: upsertMark(prev.rewards, signal, delta),
    }));
  }, [commit]);

  const reset = React.useCallback(() => {
    const next = emptyEpisode();
    writeEpisode(next);
    setEpisode(next);
  }, []);

  React.useEffect(() => {
    if (!episode.receipt) return;
    const concise = episode.receipt.split(/[.!?]/).filter((s) => s.trim()).length <= 2;
    const existing = latestDelta(episode, "concise");
    if (existing !== null) return;
    commit((prev) => ({
      ...prev,
      rewards: upsertMark(prev.rewards, "concise", concise ? 1 : -1),
    }));
  }, [episode, commit]);

  return {
    episode,
    sendBall,
    occlude,
    pullCurtain,
    guessHidden,
    runSearch,
    mark,
    reset,
  };
}
