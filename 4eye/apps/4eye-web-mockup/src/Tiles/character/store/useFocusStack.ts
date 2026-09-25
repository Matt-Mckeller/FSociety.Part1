"use client";

/**
 * One read of the focus stack — today's pin, next actions, current goal,
 * plans in flight, and the revision log. Falls back to seed when the
 * profile store is not mounted (stories, standalone panels).
 */

import type * as React from "react";
import type { EquippedWorkItem } from "@yen/content/character/types";

import {
  CURRENT_GOAL_SEED,
  FOCUSED_GOAL_IDS_SEED,
  TODAY_ACTIONS,
  TODAY_PIN,
  TODAY_SUBJECTS,
  type FocusRevision,
  type TodayAction,
  type TodayPin,
  type TodaySubject,
} from "../model/today";
import { CHARACTER_SEED } from "./seed-data";
import {
  useOptionalProfileStore,
  type ProfileStoreAction,
} from "./CharacterProfileStore";

export interface FocusStack {
  todayPin: TodayPin;
  todayActions: TodayAction[];
  todaySubjects: TodaySubject[];
  currentGoal: string;
  focusedGoalIds: string[];
  plans: EquippedWorkItem[];
  revisions: FocusRevision[];
  dispatch: React.Dispatch<ProfileStoreAction> | null;
}

export function useFocusStack(): FocusStack {
  const store = useOptionalProfileStore();
  if (!store) {
    return {
      todayPin: TODAY_PIN,
      todayActions: TODAY_ACTIONS,
      todaySubjects: TODAY_SUBJECTS,
      currentGoal: CURRENT_GOAL_SEED,
      focusedGoalIds: [...FOCUSED_GOAL_IDS_SEED],
      plans: CHARACTER_SEED.characters[0]?.equippedWork ?? [],
      revisions: [],
      dispatch: null,
    };
  }
  return {
    todayPin: store.state.todayPin,
    todayActions: store.state.todayActions,
    todaySubjects: store.state.todaySubjects,
    currentGoal: store.state.currentGoal,
    focusedGoalIds: store.state.focusedGoalIds,
    plans: store.state.plans,
    revisions: store.state.focusRevisions,
    dispatch: store.dispatch,
  };
}
