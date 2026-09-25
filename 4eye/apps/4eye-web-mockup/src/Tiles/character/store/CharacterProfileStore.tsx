"use client";

/**
 * CharacterProfileStore — shared reactive state for the character profile layer.
 *
 * Manages everything the profile sections need to talk to each other:
 *   - equippedItems → flows into attribute calculation
 *   - activeEffects  → buffs/debuffs including those created by consuming items
 *   - habitState     → today's completion progress per habit
 *   - traitLevels    → trait tier progression (upgradable)
 *   - consumableQty  → live inventory quantities
 *   - auraLevels     → aura tier progression
 *   - influenceBalance → currency for aura/trait upgrades
 *
 * Attribute effective values are computed here and exposed via
 * `useEffectiveAttributes()` so any view can read them without recalculating.
 */

import type { EquippedWorkItem, FeedEvent, WorkKind } from "@yen/content/character/types";
import * as React from "react";

import {
  EQUIPMENT_LIBRARY,
  type EquipmentItem,
} from "../model/equipment";
import {
  ATTRIBUTES,
  ATTRIBUTE_PROGRESS_SEED,
  type AttributeProgressMap,
} from "../model/attributes";
import {
  TRAITS,
  TRAIT_PROGRESS_SEED,
  traitNextCost,
  type TraitProgress,
} from "../model/traits";
import {
  CONSUMABLES,
  DURATION_LABEL,
} from "../model/consumables";
import { HABITS } from "../model/habits";
import {
  CHARACTER_STATUS_SEED,
  type StatusEffect,
} from "../model/status";
import {
  AURAS,
  AURA_ACTIVE_DEFAULT,
  AURA_ACTIVE_STORAGE_KEY,
  AURA_PROGRESS_MAX,
  nextCost as auraNexCost,
  type AuraActive,
  type AuraProgress,
} from "../components/Auras";
import {
  CURRENT_GOAL_SEED,
  FOCUS_REVISIONS_SEED,
  FOCUS_SLOT_LABEL,
  FOCUSED_GOAL_IDS_SEED,
  TODAY_ACTIONS,
  TODAY_PIN,
  TODAY_SUBJECTS,
  makeRevision,
  readFocusSnapshot,
  writeFocusSnapshot,
  type FocusRevision,
  type FocusSnapshot,
  type FocusSlot,
  type TodayAction,
  type TodayPin,
  type TodaySubject,
} from "../model/today";
import {
  PROCESS_GROUPS_SEED,
  PROCESSES_SEED,
  readProcessesSnapshot,
  writeProcessesSnapshot,
  type ProcessEntry,
  type ProcessGroup,
  type ProcessLogEntry,
} from "../model/processes";
import { CHARACTER_SEED } from "./seed-data";
import { useJannaEffectiveAttributes } from "./useCharacterPresentation";

/* ─────────────────────────────────────────── state shape */

export interface HabitState {
  progress: number; // 0–1 today's completion
  completedAt?: number; // epoch ms
}

export interface ProfileStoreState {
  equippedItems: EquipmentItem[];
  activeEffects: StatusEffect[];
  habitState: Record<string, HabitState>;
  /** Which habits are equipped into the routine, keyed by habit id. */
  habitEquipped: Record<string, boolean>;
  traitLevels: TraitProgress;
  auraLevels: AuraProgress;
  /** Which auras are currently applied (toggled on). Single source — not localStorage alone. */
  auraActive: AuraActive;
  consumableQty: Record<string, number>;
  influenceBalance: number;
  /** Base attribute values before gear/buffs — user's own floor. */
  baseAttributes: AttributeProgressMap;
  /** User-adjusted perspective stance weights, keyed by perspective id. */
  perspectiveWeights: Record<string, number>;
  /** Skills the user has unlocked (beyond the seed), keyed by skill id. */
  skillsUnlocked: Record<string, boolean>;
  /** Perks the user has unlocked (beyond the seed), keyed by perk id. */
  perksUnlocked: Record<string, boolean>;
  /** Logged relationship interactions, keyed by relationship id. */
  relationshipLog: Record<string, { at: number; strengthBonus: number }>;
  /** Live progress overrides for equipped goals/work, keyed by item id (0–1). */
  itemProgress: Record<string, number>;
  /** Most recent character feed events (newest first). */
  feedEvents: FeedEvent[];
  todayPin: TodayPin;
  todayActions: TodayAction[];
  todaySubjects: TodaySubject[];
  currentGoal: string;
  /** Up to three catalog ids (+ unicorn) in profile focus. */
  focusedGoalIds: string[];
  /** Live equipped work — seed plus anything added this session. */
  plans: EquippedWorkItem[];
  /** Append-only log of goal / plan / next-action / daily-1 changes. */
  focusRevisions: FocusRevision[];
  /** Operational playbooks — Aion, Scripts, Processes. */
  processGroups: ProcessGroup[];
  processes: ProcessEntry[];
}

// FeedEvent now lives in the model so `timeline.ts` can use it without
// depending on this store. Imported for local use and re-exported so the
// existing `from ".../CharacterProfileStore"` imports keep working.
export type { FeedEvent };

/* ─────────────────────────────────────────── actions */

export type ProfileStoreAction =
  | { type: "equip-item"; itemId: string }
  | { type: "unequip-item"; itemId: string }
  | { type: "set-habit-progress"; habitId: string; progress: number }
  | { type: "mark-habit-done"; habitId: string }
  | { type: "toggle-habit-equip"; habitId: string }
  | { type: "use-consumable"; consumableId: string }
  | { type: "upgrade-trait"; traitId: string }
  | { type: "upgrade-aura"; auraId: string }
  | { type: "toggle-aura"; auraId: string; cap?: number }
  | { type: "set-aura-active"; active: AuraActive }
  | { type: "set-perspective-weight"; perspectiveId: string; weight: number }
  | { type: "unlock-skill"; skillId: string; label: string; color?: string }
  | { type: "unlock-perk"; perkId: string; label: string; color?: string }
  | { type: "log-relationship-interaction"; relationshipId: string; name: string; color?: string }
  | { type: "set-item-progress"; itemId: string; progress: number; label: string; color?: string }
  | { type: "tick-effects" }  // removes expired buffs
  | { type: "set-active-effects"; effects: StatusEffect[] }
  | { type: "add-feed-event"; event: FeedEvent }
  | { type: "set-today-pin"; label: string; detail: string; reason?: string }
  | { type: "set-current-goal"; label: string; reason?: string }
  | { type: "set-focused-goals"; ids: string[]; reason?: string }
  | { type: "add-today-action"; label: string; detail: string }
  | { type: "update-today-action"; id: string; label: string; detail: string }
  | { type: "remove-today-action"; id: string }
  | { type: "lead-today-action"; id: string }
  | { type: "add-plan"; label: string; detail: string; kind?: WorkKind }
  | { type: "update-plan"; id: string; label?: string; detail?: string }
  | { type: "remove-plan"; id: string }
  | { type: "pin-plan-as-today"; id: string }
  | { type: "hydrate-focus"; snapshot: FocusSnapshot }
  | { type: "hydrate-processes"; snapshot: { processGroups: ProcessGroup[]; processes: ProcessEntry[] } }
  | { type: "process-group-add"; group: ProcessGroup }
  | { type: "process-add"; entry: ProcessEntry }
  | { type: "process-update"; id: string; patch: Partial<Omit<ProcessEntry, "id">> }
  | { type: "process-delete"; id: string }
  | { type: "process-log-add"; processId: string; entry: ProcessLogEntry }
  | { type: "process-log-delete"; processId: string; logId: string };

/* ─────────────────────────────────────────── reducer */

function reducer(state: ProfileStoreState, action: ProfileStoreAction): ProfileStoreState {
  switch (action.type) {
    case "equip-item": {
      const updated = state.equippedItems.map((it) =>
        it.id === action.itemId ? { ...it, equipped: true } : it,
      );
      const item = updated.find((it) => it.id === action.itemId);
      return {
        ...state,
        equippedItems: updated,
        feedEvents: item
          ? [feedEvent("milestone", `Equipped ${item.name}`, undefined, "#16a34a", "⚔️"), ...state.feedEvents]
          : state.feedEvents,
      };
    }
    case "unequip-item": {
      const updated = state.equippedItems.map((it) =>
        it.id === action.itemId ? { ...it, equipped: false } : it,
      );
      return { ...state, equippedItems: updated };
    }
    case "set-habit-progress": {
      return {
        ...state,
        habitState: {
          ...state.habitState,
          [action.habitId]: { progress: Math.min(1, action.progress) },
        },
      };
    }
    case "mark-habit-done": {
      const habit = HABITS.find((h) => h.id === action.habitId);
      const prev = state.habitState[action.habitId];
      if (prev?.progress >= 1) return state;
      const event = feedEvent(
        "habit-complete",
        `${habit?.emoji ?? "✓"} ${habit?.label ?? action.habitId} complete`,
        undefined,
        habit?.color ?? "#16a34a",
        habit?.emoji,
      );
      return {
        ...state,
        habitState: {
          ...state.habitState,
          [action.habitId]: { progress: 1, completedAt: Date.now() },
        },
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "toggle-habit-equip": {
      const wasEquipped = state.habitEquipped[action.habitId] ?? false;
      return {
        ...state,
        habitEquipped: { ...state.habitEquipped, [action.habitId]: !wasEquipped },
      };
    }
    case "use-consumable": {
      const consumable = CONSUMABLES.find((c) => c.id === action.consumableId);
      if (!consumable || (state.consumableQty[consumable.id] ?? consumable.quantity) <= 0) return state;

      const newQty = Math.max(0, (state.consumableQty[consumable.id] ?? consumable.quantity) - 1);
      const expiresAt = Date.now() + consumable.durationHours * 3_600_000;

      const buff: StatusEffect = {
        id: `buff-${consumable.id}-${Date.now()}`,
        label: consumable.label,
        description: consumable.description,
        kind: "buff",
        color: consumable.color,
        expiresAt,
        attributeModifiers: consumable.effects.map((e) => ({
          id: e.attributeId,
          label: e.label,
          delta: e.delta,
        })),
        emoji: "⚡",
      };

      const event = feedEvent(
        "consumable-used",
        `Used ${consumable.label}`,
        `Active for ${DURATION_LABEL[consumable.tier]}`,
        consumable.color,
        "⚡",
      );

      return {
        ...state,
        consumableQty: { ...state.consumableQty, [consumable.id]: newQty },
        activeEffects: [...state.activeEffects, buff],
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "upgrade-trait": {
      const trait = TRAITS.find((t) => t.id === action.traitId);
      if (!trait) return state;
      const currentLevel = state.traitLevels[action.traitId] ?? -1;
      const cost = traitNextCost(currentLevel);
      if (cost == null || state.influenceBalance < cost) return state;
      const newLevel = currentLevel + 1;
      const tierLabel = newLevel >= 0 ? trait.degrees[newLevel] : "Locked";
      const event = feedEvent(
        "trait-upgrade",
        `${trait.label} → ${tierLabel}`,
        newLevel === 3 ? (trait.maxEffect ?? "Max tier reached") : undefined,
        trait.color,
        "✦",
      );
      return {
        ...state,
        traitLevels: { ...state.traitLevels, [action.traitId]: newLevel },
        influenceBalance: state.influenceBalance - cost,
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "upgrade-aura": {
      const aura = AURAS.find((a) => a.id === action.auraId);
      if (!aura) return state;
      const currentLevel = state.auraLevels[action.auraId] ?? -1;
      const cost = auraNexCost(currentLevel, aura.degrees.length - 1);
      if (cost == null || state.influenceBalance < cost) return state;
      const newLevel = currentLevel + 1;
      const tierLabel = newLevel >= 0 ? aura.degrees[newLevel] : "Locked";
      const event = feedEvent(
        "aura-upgrade",
        `${aura.label} → ${tierLabel}`,
        undefined,
        aura.color,
        "🔮",
      );
      return {
        ...state,
        auraLevels: { ...state.auraLevels, [action.auraId]: newLevel },
        influenceBalance: state.influenceBalance - cost,
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "set-aura-active": {
      const next = withAlwaysOnAuras(action.active);
      persistAuraActive(next);
      return { ...state, auraActive: next };
    }
    case "toggle-aura": {
      const aura = AURAS.find((a) => a.id === action.auraId);
      if (!aura || aura.alwaysOn) return state;
      const lvl = state.auraLevels[action.auraId] ?? -1;
      if (lvl < 0) return state;
      const wasOn = !!state.auraActive[action.auraId];
      const cap = action.cap ?? 6;
      if (!wasOn) {
        const used = AURAS.filter(
          (a) => !a.alwaysOn && state.auraActive[a.id] && (state.auraLevels[a.id] ?? -1) >= 0,
        ).length;
        if (used >= cap) return state;
      }
      const next = withAlwaysOnAuras({
        ...state.auraActive,
        [action.auraId]: !wasOn,
      });
      persistAuraActive(next);
      return { ...state, auraActive: next };
    }
    case "tick-effects": {
      const now = Date.now();
      const expired = state.activeEffects.filter(
        (e) => e.expiresAt != null && e.expiresAt <= now,
      );
      const remaining = state.activeEffects.filter(
        (e) => e.expiresAt == null || e.expiresAt > now,
      );
      const expiredEvents = expired.map((e) =>
        feedEvent("buff-expired", `${e.label} expired`, undefined, e.color, "💨"),
      );
      return {
        ...state,
        activeEffects: remaining,
        feedEvents: [...expiredEvents, ...state.feedEvents],
      };
    }
    case "set-active-effects":
      return { ...state, activeEffects: action.effects };
    case "set-perspective-weight": {
      return {
        ...state,
        perspectiveWeights: {
          ...state.perspectiveWeights,
          [action.perspectiveId]: action.weight,
        },
      };
    }
    case "unlock-skill": {
      if (state.skillsUnlocked[action.skillId]) return state;
      const event = feedEvent(
        "milestone",
        `Skill unlocked — ${action.label}`,
        undefined,
        action.color ?? "#16a34a",
        "🎓",
      );
      return {
        ...state,
        skillsUnlocked: { ...state.skillsUnlocked, [action.skillId]: true },
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "unlock-perk": {
      if (state.perksUnlocked[action.perkId]) return state;
      const event = feedEvent(
        "milestone",
        `Perk unlocked — ${action.label}`,
        undefined,
        action.color ?? "#7c3aed",
        "✦",
      );
      return {
        ...state,
        perksUnlocked: { ...state.perksUnlocked, [action.perkId]: true },
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "log-relationship-interaction": {
      const prev = state.relationshipLog[action.relationshipId];
      const strengthBonus = Math.min(20, (prev?.strengthBonus ?? 0) + 2);
      const event = feedEvent(
        "milestone",
        `Logged time with ${action.name}`,
        "Bond strengthened",
        action.color ?? "#16a34a",
        "🤝",
      );
      return {
        ...state,
        relationshipLog: {
          ...state.relationshipLog,
          [action.relationshipId]: { at: Date.now(), strengthBonus },
        },
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "set-item-progress": {
      const clamped = Math.max(0, Math.min(1, action.progress));
      const prev = state.itemProgress[action.itemId];
      if (prev === clamped) return state;
      const done = clamped >= 1;
      const event = feedEvent(
        "goal-progress",
        done ? `${action.label} complete` : `${action.label} advanced`,
        `${Math.round(clamped * 100)}%`,
        action.color,
        done ? "🏁" : "📈",
      );
      return {
        ...state,
        itemProgress: { ...state.itemProgress, [action.itemId]: clamped },
        feedEvents: [event, ...state.feedEvents],
      };
    }
    case "add-feed-event":
      return { ...state, feedEvents: [action.event, ...state.feedEvents] };
    case "set-today-pin": {
      const next = { ...state.todayPin, label: action.label.trim(), detail: action.detail.trim() };
      if (!next.label || (next.label === state.todayPin.label && next.detail === state.todayPin.detail)) {
        return state;
      }
      return applyFocusChange(state, "daily-1", state.todayPin.label, next.label, action.reason, {
        todayPin: next,
      });
    }
    case "set-current-goal": {
      const label = action.label.trim();
      if (!label || label === state.currentGoal) return state;
      return applyFocusChange(state, "goal", state.currentGoal, label, action.reason, {
        currentGoal: label,
      });
    }
    case "set-focused-goals": {
      const ids = action.ids.filter(Boolean).slice(0, 3);
      if (ids.join(",") === state.focusedGoalIds.join(",")) return state;
      return { ...state, focusedGoalIds: ids };
    }
    case "add-today-action": {
      const label = action.label.trim();
      if (!label) return state;
      const item: TodayAction = {
        id: `act-${Date.now()}`,
        label,
        detail: action.detail.trim(),
      };
      return applyFocusChange(state, "next-action", "", item.label, "Added", {
        todayActions: [...state.todayActions, item],
      }, item.id);
    }
    case "update-today-action": {
      const current = state.todayActions.find((a) => a.id === action.id);
      if (!current) return state;
      const label = action.label.trim();
      const detail = action.detail.trim();
      if (!label || (label === current.label && detail === current.detail)) return state;
      return applyFocusChange(state, "next-action", current.label, label, undefined, {
        todayActions: state.todayActions.map((a) =>
          a.id === action.id ? { ...a, label, detail } : a,
        ),
      }, action.id);
    }
    case "remove-today-action": {
      const current = state.todayActions.find((a) => a.id === action.id);
      if (!current || state.todayActions.length <= 1) return state;
      return applyFocusChange(state, "next-action", current.label, "", "Removed", {
        todayActions: state.todayActions.filter((a) => a.id !== action.id),
      }, action.id);
    }
    case "lead-today-action": {
      const current = state.todayActions.find((a) => a.id === action.id);
      if (!current || state.todayActions[0]?.id === action.id) return state;
      const rest = state.todayActions.filter((a) => a.id !== action.id);
      return applyFocusChange(
        state,
        "next-action",
        state.todayActions[0]?.label ?? "",
        current.label,
        "Lead move",
        { todayActions: [current, ...rest] },
        action.id,
      );
    }
    case "add-plan": {
      const label = action.label.trim();
      if (!label) return state;
      const top = state.plans.reduce((m, p) => Math.max(m, p.weight), 0);
      const item: EquippedWorkItem = {
        id: `work-${Date.now()}`,
        kind: action.kind ?? "plan",
        label,
        status: "active",
        weight: Math.min(100, top + 1),
        progress: 0,
        detail: action.detail.trim(),
      };
      return applyFocusChange(state, "plan", "", item.label, "Added", {
        plans: [item, ...state.plans],
      }, item.id);
    }
    case "update-plan": {
      const current = state.plans.find((p) => p.id === action.id);
      if (!current) return state;
      const label = action.label?.trim() ?? current.label;
      const detail = action.detail?.trim() ?? current.detail ?? "";
      if (!label || (label === current.label && detail === (current.detail ?? ""))) return state;
      return applyFocusChange(state, "plan", current.label, label, undefined, {
        plans: state.plans.map((p) =>
          p.id === action.id ? { ...p, label, detail } : p,
        ),
      }, action.id);
    }
    case "remove-plan": {
      const current = state.plans.find((p) => p.id === action.id);
      if (!current) return state;
      return applyFocusChange(state, "plan", current.label, "", "Removed", {
        plans: state.plans.filter((p) => p.id !== action.id),
      }, action.id);
    }
    case "pin-plan-as-today": {
      const plan = state.plans.find((p) => p.id === action.id);
      if (!plan) return state;
      const next = {
        ...state.todayPin,
        label: plan.label,
        detail: plan.detail ?? state.todayPin.detail,
      };
      if (next.label === state.todayPin.label && next.detail === state.todayPin.detail) return state;
      return applyFocusChange(state, "daily-1", state.todayPin.label, next.label, `Pinned ${plan.label}`, {
        todayPin: next,
      }, plan.id);
    }
    case "hydrate-focus":
      return {
        ...state,
        todayPin: action.snapshot.todayPin,
        todayActions: action.snapshot.todayActions,
        todaySubjects: action.snapshot.todaySubjects,
        currentGoal: action.snapshot.currentGoal,
        focusedGoalIds: action.snapshot.focusedGoalIds?.length
          ? action.snapshot.focusedGoalIds.slice(0, 3)
          : [...FOCUSED_GOAL_IDS_SEED],
        plans: action.snapshot.plans,
        focusRevisions: action.snapshot.focusRevisions,
      };
    case "hydrate-processes":
      return {
        ...state,
        processGroups: action.snapshot.processGroups,
        processes: action.snapshot.processes,
      };
    case "process-group-add":
      return {
        ...state,
        processGroups: [...state.processGroups, action.group],
      };
    case "process-add":
      return {
        ...state,
        processes: [...state.processes, action.entry],
      };
    case "process-update": {
      const idx = state.processes.findIndex((p) => p.id === action.id);
      if (idx < 0) return state;
      const next = [...state.processes];
      next[idx] = { ...next[idx], ...action.patch, updatedAt: Date.now() };
      return { ...state, processes: next };
    }
    case "process-delete":
      return {
        ...state,
        processes: state.processes.filter((p) => p.id !== action.id),
      };
    case "process-log-add": {
      const idx = state.processes.findIndex((p) => p.id === action.processId);
      if (idx < 0) return state;
      const proc = state.processes[idx];
      const next = [...state.processes];
      next[idx] = {
        ...proc,
        logs: [...proc.logs, action.entry],
        updatedAt: Date.now(),
      };
      return { ...state, processes: next };
    }
    case "process-log-delete": {
      const idx = state.processes.findIndex((p) => p.id === action.processId);
      if (idx < 0) return state;
      const proc = state.processes[idx];
      const next = [...state.processes];
      next[idx] = {
        ...proc,
        logs: proc.logs.filter((l) => l.id !== action.logId),
        updatedAt: Date.now(),
      };
      return { ...state, processes: next };
    }
    default:
      return state;
  }
}

function applyFocusChange(
  state: ProfileStoreState,
  slot: FocusSlot,
  from: string,
  to: string,
  reason: string | undefined,
  extra: Partial<ProfileStoreState>,
  itemId?: string,
): ProfileStoreState {
  const rev = makeRevision(slot, from, to, reason, itemId);
  const label = to
    ? `${FOCUS_SLOT_LABEL[slot]} → ${to}`
    : `${FOCUS_SLOT_LABEL[slot]} removed`;
  return {
    ...state,
    ...extra,
    focusRevisions: [rev, ...state.focusRevisions],
    feedEvents: [
      feedEvent("focus-changed", label, from ? `${from} → ${to || "—"}` : to, "#0ea5e9", "①"),
      ...state.feedEvents,
    ],
  };
}

function feedEvent(
  type: FeedEvent["type"],
  label: string,
  detail?: string,
  color?: string,
  emoji?: string,
): FeedEvent {
  return { id: `${type}-${Date.now()}-${Math.random()}`, type, label, detail, occurredAt: Date.now(), color, emoji };
}

/* ─────────────────────────────────────────── aura apply helpers */

function withAlwaysOnAuras(active: AuraActive): AuraActive {
  const next = { ...active };
  for (const a of AURAS) {
    if (a.alwaysOn) next[a.id] = true;
  }
  return next;
}

function persistAuraActive(active: AuraActive) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AURA_ACTIVE_STORAGE_KEY, JSON.stringify(active));
  } catch {
    /* ignore quota / privacy errors */
  }
}

function readPersistedAuraActive(): AuraActive {
  if (typeof window === "undefined") return withAlwaysOnAuras(AURA_ACTIVE_DEFAULT);
  try {
    const raw = window.localStorage.getItem(AURA_ACTIVE_STORAGE_KEY);
    if (raw) {
      return withAlwaysOnAuras({
        ...AURA_ACTIVE_DEFAULT,
        ...(JSON.parse(raw) as AuraActive),
      });
    }
  } catch {
    /* fall through */
  }
  return withAlwaysOnAuras(AURA_ACTIVE_DEFAULT);
}

/* ─────────────────────────────────────────── initial state */

function buildInitialState(): ProfileStoreState {
  const habitState: Record<string, HabitState> = {};
  const habitEquipped: Record<string, boolean> = {};
  for (const h of HABITS) {
    habitState[h.id] = { progress: h.todayProgress ?? 0 };
    habitEquipped[h.id] = h.equipped ?? false;
  }
  const consumableQty: Record<string, number> = {};
  for (const c of CONSUMABLES) {
    consumableQty[c.id] = c.quantity;
  }
  return {
    equippedItems: EQUIPMENT_LIBRARY,
    activeEffects: CHARACTER_STATUS_SEED.effects,
    habitState,
    habitEquipped,
    traitLevels: TRAIT_PROGRESS_SEED,
    auraLevels: AURA_PROGRESS_MAX,
    auraActive: withAlwaysOnAuras(AURA_ACTIVE_DEFAULT),
    consumableQty,
    influenceBalance: 1_200,
    baseAttributes: ATTRIBUTE_PROGRESS_SEED,
    perspectiveWeights: {},
    skillsUnlocked: {},
    perksUnlocked: {},
    relationshipLog: {},
    itemProgress: {},
    todayPin: TODAY_PIN,
    todayActions: TODAY_ACTIONS,
    todaySubjects: TODAY_SUBJECTS,
    currentGoal: CURRENT_GOAL_SEED,
    focusedGoalIds: [...FOCUSED_GOAL_IDS_SEED],
    plans: CHARACTER_SEED.characters[0]?.equippedWork ?? [],
    focusRevisions: FOCUS_REVISIONS_SEED(),
    processGroups: PROCESS_GROUPS_SEED,
    processes: PROCESSES_SEED,
    feedEvents: [
      feedEvent("milestone", "Anxiety cleared", "Energized · focused · disciplined · spirited · love · creation", "#000000", "◎"),
      feedEvent("buff-gained", "Energized", "High charge — capacity online and moving", "#000000", "◎"),
      feedEvent("buff-gained", "Focused", "Attention locked — one channel, no leak", "#3b82f6", "◎"),
      feedEvent("buff-gained", "Disciplined", "Structure holds. The day follows the heading", "#4f46e5", "◎"),
      feedEvent("buff-gained", "Peace", "Inner stillness with capacity still online", "#6366f1", "◎"),
      feedEvent("buff-gained", "Love", "Love is the live field", "#e11d48", "♥"),
      feedEvent("buff-gained", "Creation", "Making is the default. The workspace is open", "#8b5cf6", "◈"),
      feedEvent("milestone", "Equipped Mochi & Ember", "Dual-wield companions active", "#f59e0b", "🐱"),
      feedEvent("goal-progress", "Heart.Evolve", "Goal 4 still equipped", "#ff5c7a", "♥"),
      feedEvent("milestone", "Today · #1", "Playing 1Game — current focus", "#0ea5e9", "①"),
      feedEvent("milestone", "Character profile initialized", undefined, "#4F46E5", "🚀"),
      feedEvent("buff-gained", "Shield.Always()", "Ward live — you stay secure", "#38bdf8", "🛡️"),
      feedEvent("buff-gained", "Power.Max()", "Capacity at the ceiling", "#7c3aed", "⚡"),
      feedEvent("buff-gained", "Aion.Amplify", "Matthew · Max · 4eye as one field", "#818cf8", "◈"),
      feedEvent("buff-gained", "Aura.Unlock()", "Field open — no locked aura", "#db2777", "◎"),
      feedEvent("buff-gained", "Energy.Unlock()", "Vitality on — wait is over", "#f59e0b", "⚡"),
      feedEvent("buff-gained", "Synthesis Lock active", "Years collapsing into one surface", "#be123c", "🔮"),
      feedEvent("buff-gained", "Bond Resonance", "Mochi · Ember · combined life aimed", "#f59e0b", "🐱"),
      feedEvent("habit-complete", "Morning Planning complete", undefined, "#1e293b", "🎯"),
      feedEvent("habit-complete", "Research session complete", undefined, "#d97706", "🔎"),
      feedEvent("habit-complete", "Deep Work block complete", undefined, "#0f766e", "⚡"),
      feedEvent("trait-upgrade", "Compete.Win() rose", "Trait advanced one tier", "#ea580c"),
      feedEvent("action-used", "Swipe rose — Build", "Directional action spent", "#4fe0b0"),
      feedEvent("perspective-updated", "Builder lens weighted up", undefined, "#7cc4ff"),
      feedEvent("consumable-used", "Focus tonic", "Short focus buff", "#38bdf8", "⚡"),
      feedEvent("aura-upgrade", "Presence.Command()", "Rank advanced", "#a78bfa"),
      feedEvent("milestone", "Web4 path pinned", "Docs + profile + plans cold path", "#0891b2"),
      feedEvent("habit-complete", "Content Creation session", undefined, "#ea580c", "🎬"),
      feedEvent("habit-complete", "Computer / Build session", undefined, "#2563eb", "💻"),
      feedEvent("buff-expired", "Night Owl faded", "Rest window open", "#94a3b8"),
      feedEvent("goal-progress", "Focus · breadth & depth", "Prioritize attention and how you learn", "#7cc4ff", "🎯"),
      feedEvent("goal-progress", "Build something real", "Weekly momentum tick", "#4fe0b0", "🛠️"),
    ],
  };
}

/* ─────────────────────────────────────────── attribute calculation */

/**
 * Compute effective attribute values from all sources:
 * base + equipped item bonuses + active buff modifiers + maxed trait bonuses
 */
export function calcEffectiveAttributes(state: ProfileStoreState): AttributeProgressMap {
  const result: AttributeProgressMap = {};

  for (const attr of ATTRIBUTES) {
    const base = state.baseAttributes[attr.id] ?? { base: 0, bonus: 0 };
    let bonus = 0;

    // Equipped item bonuses
    for (const item of state.equippedItems) {
      if (!item.equipped) continue;
      for (const b of item.attributeBonuses ?? []) {
        if (b.attributeId === attr.id) bonus += b.delta;
      }
    }

    // Active buff modifiers
    for (const effect of state.activeEffects) {
      for (const m of effect.attributeModifiers ?? []) {
        if (m.id === attr.id) bonus += m.delta;
      }
    }

    // Maxed trait bonuses
    for (const trait of TRAITS) {
      const level = state.traitLevels[trait.id] ?? -1;
      if (level >= 3) {
        for (const b of trait.attributeBoosts ?? []) {
          if (b.id === attr.id) bonus += b.delta;
        }
      }
    }

    result[attr.id] = { base: base.base, bonus };
  }

  return result;
}

/* ─────────────────────────────────────────── context */

interface ProfileStoreContextValue {
  state: ProfileStoreState;
  dispatch: React.Dispatch<ProfileStoreAction>;
  effectiveAttributes: AttributeProgressMap;
}

const ProfileStoreContext = React.createContext<ProfileStoreContextValue | null>(null);

export function CharacterProfileStore({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, undefined, buildInitialState);
  const [focusReady, setFocusReady] = React.useState(false);
  const [processesReady, setProcessesReady] = React.useState(false);

  // Tick expired effects every 30s
  React.useEffect(() => {
    const id = setInterval(() => dispatch({ type: "tick-effects" }), 30_000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    const saved = readFocusSnapshot();
    if (saved) dispatch({ type: "hydrate-focus", snapshot: saved });
    setFocusReady(true);
  }, []);

  // Hydrate applied auras from localStorage after mount (SSR-safe).
  React.useEffect(() => {
    dispatch({ type: "set-aura-active", active: readPersistedAuraActive() });
  }, []);

  React.useEffect(() => {
    const saved = readProcessesSnapshot();
    if (saved) {
      dispatch({ type: "hydrate-processes", snapshot: saved });
    }
    setProcessesReady(true);
  }, []);

  React.useEffect(() => {
    if (!focusReady) return;
    writeFocusSnapshot({
      todayPin: state.todayPin,
      todayActions: state.todayActions,
      todaySubjects: state.todaySubjects,
      currentGoal: state.currentGoal,
      focusedGoalIds: state.focusedGoalIds,
      plans: state.plans,
      focusRevisions: state.focusRevisions,
    });
  }, [
    focusReady,
    state.todayPin,
    state.todayActions,
    state.todaySubjects,
    state.currentGoal,
    state.focusedGoalIds,
    state.plans,
    state.focusRevisions,
  ]);

  React.useEffect(() => {
    if (!processesReady) return;
    writeProcessesSnapshot({
      processGroups: state.processGroups,
      processes: state.processes,
    });
  }, [processesReady, state.processGroups, state.processes]);

  const effectiveAttributes = React.useMemo(() => calcEffectiveAttributes(state), [state]);

  const value = React.useMemo(
    () => ({ state, dispatch, effectiveAttributes }),
    [state, effectiveAttributes],
  );

  return (
    <ProfileStoreContext.Provider value={value}>
      {children}
    </ProfileStoreContext.Provider>
  );
}

export function useProfileStore(): ProfileStoreContextValue {
  const ctx = React.useContext(ProfileStoreContext);
  if (!ctx) throw new Error("useProfileStore must be used within CharacterProfileStore");
  return ctx;
}

/**
 * Like {@link useProfileStore} but returns `null` instead of throwing when no
 * provider is mounted. For dual-use components (e.g. AurasGrid) that connect to
 * the store inside the character surface but also render standalone in stories.
 */
export function useOptionalProfileStore(): ProfileStoreContextValue | null {
  return React.useContext(ProfileStoreContext);
}

export function useEffectiveAttributes(): AttributeProgressMap {
  const store = useProfileStore();
  const janna = useJannaEffectiveAttributes();
  return janna ?? store.effectiveAttributes;
}
