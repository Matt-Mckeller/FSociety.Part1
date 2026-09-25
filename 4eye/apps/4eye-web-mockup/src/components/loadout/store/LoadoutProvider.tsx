"use client";

/**
 * LoadoutProvider — shared store for action bars, character loadout slots,
 * swipe casts, quality tiers, and custom actions.
 *
 * Context + useReducer like the other tile providers. The provider is
 * idempotent: when one is already mounted above (e.g. a SpellbookTile inside
 * the Character's spellbook dialog), the inner provider reuses the outer
 * store so saves land on the character immediately.
 */

import * as React from "react";
import { COLOR_MAP } from "@4eye/types";

import { SPELLBOOK_SEED } from "@4eye/web/Tiles/spellbook/store/seed-data";
import { SPELL_CATEGORY_META, type Spell } from "@4eye/web/Tiles/spellbook/model/types";

import {
  actionKey,
  sameAction,
  makeSlots,
  type ActionBarKind,
  type CustomAction,
  type LoadoutActionRef,
  type LoadoutData,
  type LoadoutGrid,
  type LoadoutGroup,
  type LoadoutPage,
  type QualityTier,
  type ResolvedAction,
  type SwipeDirection,
  type BindingTemplateId,
} from "../model/types";
import { LOADOUT_SEED } from "./seed-data";
import { bindingTemplateById } from "../model/binding-templates";
import { MOOD_META } from "@4eye/web/Tiles/character/model/status";
import { EQUIPMENT_LIBRARY } from "@4eye/web/Tiles/character/model/equipment";
import { AURAS, JANNA_AURAS } from "@4eye/web/Tiles/character/components/Auras";
import { CHARACTER_STATUS_SEED } from "@4eye/web/Tiles/character/model/status";
import type { StatusTargetRef } from "@4eye/web/Tiles/character/model/statusTargets";
import { STATUS_TARGET_KIND_META } from "@4eye/web/Tiles/character/model/statusTargets";

const SPELL_BY_ID: Record<string, Spell> = Object.fromEntries(
  SPELLBOOK_SEED.spells.map((s) => [s.id, s]),
);

/** Catalog resolve for status pins — live store may refine display in ActionGlyph. */
function resolveStatusTarget(target: StatusTargetRef): Omit<ResolvedAction, "key" | "ref" | "quality"> | null {
  const kindMeta = STATUS_TARGET_KIND_META[target.kind];
  if (target.kind === "mood") {
    const meta = MOOD_META[target.moodId];
    if (!meta) return null;
    return {
      name: meta.label,
      lensId: "status",
      color: meta.color,
      hint: `${kindMeta.label} · ${meta.valence}`,
    };
  }
  if (target.kind === "aura") {
    const aura = AURAS.find((a) => a.id === target.auraId) ?? JANNA_AURAS.find((a) => a.id === target.auraId);
    if (!aura) return null;
    return {
      name: aura.label,
      lensId: "status",
      color: aura.color,
      hint: aura.blurb,
    };
  }
  if (target.kind === "gear") {
    const item = EQUIPMENT_LIBRARY.find((i) => i.id === target.itemId);
    if (!item) return null;
    return {
      name: item.name,
      lensId: "status",
      color: item.color,
      hint: item.description,
    };
  }
  const effect = CHARACTER_STATUS_SEED.effects.find((e) => e.id === target.effectId);
  if (!effect) {
    return {
      name: kindMeta.label,
      lensId: "status",
      color: kindMeta.color,
      hint: "Status target",
    };
  }
  return {
    name: effect.label,
    lensId: "status",
    color: effect.color,
    hint: effect.description,
  };
}

/** Editable fields when creating/renaming a page. */
export type PagePatch = Partial<Pick<LoadoutPage, "name" | "icon" | "color">>;
/** Editable fields when updating a group (grid change resizes slots). */
export type GroupPatch = Partial<Pick<LoadoutGroup, "label" | "color" | "grid">>;

export type LoadoutAction =
  | { type: "save-to-bar"; bar: ActionBarKind; ref: LoadoutActionRef }
  | { type: "remove-from-bar"; bar: ActionBarKind; index: number }
  | { type: "assign-slot"; pageId: string; groupId: string; slot: number; ref: LoadoutActionRef | null }
  | { type: "set-active-page"; pageId: string }
  | { type: "add-page"; page: LoadoutPage }
  | { type: "update-page"; pageId: string; patch: PagePatch }
  | { type: "delete-page"; pageId: string }
  | { type: "add-group"; pageId: string; group: LoadoutGroup }
  | { type: "update-group"; pageId: string; groupId: string; patch: GroupPatch }
  | { type: "remove-group"; pageId: string; groupId: string }
  | { type: "assign-swipe"; direction: SwipeDirection; ref: LoadoutActionRef | null }
  | { type: "apply-binding-template"; templateId: BindingTemplateId }
  | { type: "set-quality"; ref: LoadoutActionRef; tier: QualityTier | null }
  | { type: "add-custom-action"; action: CustomAction }
  | { type: "remove-custom-action"; id: string };

/** Map over the page with `pageId`, leaving the rest untouched. */
function patchPage(
  pages: LoadoutPage[],
  pageId: string,
  fn: (page: LoadoutPage) => LoadoutPage,
): LoadoutPage[] {
  return pages.map((p) => (p.id === pageId ? fn(p) : p));
}

/** Map over a group within a page. */
function patchGroup(
  pages: LoadoutPage[],
  pageId: string,
  groupId: string,
  fn: (group: LoadoutGroup) => LoadoutGroup,
): LoadoutPage[] {
  return patchPage(pages, pageId, (page) => ({
    ...page,
    groups: page.groups.map((g) => (g.id === groupId ? fn(g) : g)),
  }));
}

function reducer(state: LoadoutData, action: LoadoutAction): LoadoutData {
  switch (action.type) {
    case "save-to-bar": {
      const list = state.bars[action.bar];
      if (list.some((r) => sameAction(r, action.ref))) return state;
      return { ...state, bars: { ...state.bars, [action.bar]: [...list, action.ref] } };
    }
    case "remove-from-bar": {
      const list = state.bars[action.bar].filter((_, i) => i !== action.index);
      return { ...state, bars: { ...state.bars, [action.bar]: list } };
    }
    case "assign-slot":
      return {
        ...state,
        pages: patchGroup(state.pages, action.pageId, action.groupId, (group) => {
          const slots = makeSlots(group.grid, group.slots);
          slots[action.slot] = action.ref;
          return { ...group, slots };
        }),
      };
    case "set-active-page":
      return { ...state, activePageId: action.pageId };
    case "add-page":
      return { ...state, pages: [...state.pages, action.page], activePageId: action.page.id };
    case "update-page":
      return {
        ...state,
        pages: patchPage(state.pages, action.pageId, (page) => ({ ...page, ...action.patch })),
      };
    case "delete-page": {
      if (state.pages.length <= 1) return state; // always keep at least one page
      const pages = state.pages.filter((p) => p.id !== action.pageId);
      const activePageId =
        state.activePageId === action.pageId ? pages[0]!.id : state.activePageId;
      return { ...state, pages, activePageId };
    }
    case "add-group":
      return {
        ...state,
        pages: patchPage(state.pages, action.pageId, (page) => ({
          ...page,
          groups: [...page.groups, action.group],
        })),
      };
    case "update-group":
      return {
        ...state,
        pages: patchGroup(state.pages, action.pageId, action.groupId, (group) => {
          // A grid change resizes (and pads/truncates) the slot array.
          const grid: LoadoutGrid = action.patch.grid ?? group.grid;
          const slots =
            action.patch.grid && action.patch.grid !== group.grid
              ? makeSlots(grid, group.slots)
              : group.slots;
          return { ...group, ...action.patch, grid, slots };
        }),
      };
    case "remove-group":
      return {
        ...state,
        pages: patchPage(state.pages, action.pageId, (page) => ({
          ...page,
          groups: page.groups.filter((g) => g.id !== action.groupId),
        })),
      };
    case "assign-swipe":
      return { ...state, swipe: { ...state.swipe, [action.direction]: action.ref } };
    case "apply-binding-template": {
      const template = bindingTemplateById(action.templateId);
      const pageExists = state.pages.some((p) => p.id === template.pageId);
      return {
        ...state,
        activeBindingTemplateId: template.id,
        activePageId: pageExists ? template.pageId : state.activePageId,
        swipe: { ...template.swipe },
      };
    }
    case "set-quality": {
      const key = actionKey(action.ref);
      const quality = { ...state.quality };
      if (action.tier == null) delete quality[key];
      else quality[key] = action.tier;
      return { ...state, quality };
    }
    case "add-custom-action":
      return { ...state, customActions: [...state.customActions, action.action] };
    case "remove-custom-action": {
      // Drop the action and scrub every slot/bar/quality entry pointing at it.
      const gone = (r: LoadoutActionRef | null) =>
        r != null && r.kind === "custom" && r.customId === action.id;
      const bars = Object.fromEntries(
        Object.entries(state.bars).map(([k, list]) => [k, list.filter((r) => !gone(r))]),
      ) as LoadoutData["bars"];
      const pages = state.pages.map((page) => ({
        ...page,
        groups: page.groups.map((g) => ({
          ...g,
          slots: g.slots.map((r) => (gone(r) ? null : r)),
        })),
      }));
      const swipe = Object.fromEntries(
        Object.entries(state.swipe).map(([k, r]) => [k, gone(r) ? null : r]),
      ) as LoadoutData["swipe"];
      const quality = { ...state.quality };
      delete quality[`custom:${action.id}`];
      return {
        ...state,
        bars,
        pages,
        swipe,
        quality,
        customActions: state.customActions.filter((c) => c.id !== action.id),
      };
    }
    default:
      return state;
  }
}

interface LoadoutContextValue {
  state: LoadoutData;
  dispatch: React.Dispatch<LoadoutAction>;
  /** Resolve a ref to display fields (null when it points nowhere). */
  resolve: (ref: LoadoutActionRef) => ResolvedAction | null;
}

const LoadoutCtx = React.createContext<LoadoutContextValue | null>(null);

export function LoadoutProvider({
  data,
  children,
}: {
  /** Initial data; defaults to the seed. Ignored when nested under another provider. */
  data?: LoadoutData;
  children: React.ReactNode;
}) {
  const parent = React.useContext(LoadoutCtx);
  const [state, dispatch] = React.useReducer(reducer, data ?? LOADOUT_SEED);

  const resolve = React.useCallback(
    (ref: LoadoutActionRef): ResolvedAction | null => {
      const key = actionKey(ref);
      const quality = state.quality[key];
      if (ref.kind === "spell") {
        const spell = SPELL_BY_ID[ref.spellId];
        if (!spell) return null;
        return {
          key,
          ref,
          name: spell.name,
          lensId: spell.lensId,
          color: SPELL_CATEGORY_META[spell.category].color,
          hint: spell.shortDescription,
          quality,
        };
      }
      if (ref.kind === "status") {
        const resolved = resolveStatusTarget(ref.target);
        if (!resolved) return null;
        return { key, ref, quality, ...resolved };
      }
      const custom = state.customActions.find((c) => c.id === ref.customId);
      if (!custom) return null;
      return {
        key,
        ref,
        name: custom.name,
        lensId: custom.lensId,
        color: COLOR_MAP[custom.accent],
        hint: custom.hint,
        quality,
      };
    },
    [state.quality, state.customActions],
  );

  const value = React.useMemo(() => ({ state, dispatch, resolve }), [state, resolve]);

  if (parent) return <>{children}</>;
  return <LoadoutCtx.Provider value={value}>{children}</LoadoutCtx.Provider>;
}

/** Loadout store (throws outside a provider). */
export function useLoadout(): LoadoutContextValue {
  const ctx = React.useContext(LoadoutCtx);
  if (!ctx) throw new Error("useLoadout must be used within LoadoutProvider");
  return ctx;
}

/** Null-safe variant — lets the Spellbook hide save UI when standalone. */
export function useLoadoutOptional(): LoadoutContextValue | null {
  return React.useContext(LoadoutCtx);
}
