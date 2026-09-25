"use client";

/**
 * ResourceBarsProvider — in-session store for the editable Mind/Body resource
 * values + labels shown in the corner HUD. Seeded from {@link MIND_RESOURCES} /
 * {@link BODY_RESOURCES}; edits persist for the session only (UI-first mockup,
 * consistent with the other tile providers — no backend yet).
 *
 * Body also carries a visit-unlock: when the Profile Body lens mounts it calls
 * {@link unlockBodyPresence}, which expands the BODY · PRESENCE corner HUD.
 */

import * as React from "react";

import {
  MIND_RESOURCES,
  BODY_RESOURCES,
  type Resource,
} from "./widgets";

export type ResourceDomain = "mind" | "body";

interface ResourceBarsState {
  mind: Resource[];
  body: Resource[];
  /**
   * Incremented each time Body presence is unlocked (Body lens visit). Widgets
   * watch the token so they can expand without a sticky boolean fight.
   */
  bodyUnlockToken: number;
}

export type ResourceBarsAction =
  | { type: "set-value"; domain: ResourceDomain; key: string; value: number }
  | { type: "set-label"; domain: ResourceDomain; key: string; label: string }
  | { type: "unlock-body-presence" };

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function patch(list: Resource[], key: string, fn: (r: Resource) => Resource): Resource[] {
  return list.map((r) => (r.key === key ? fn(r) : r));
}

function reducer(state: ResourceBarsState, action: ResourceBarsAction): ResourceBarsState {
  switch (action.type) {
    case "set-value":
      return {
        ...state,
        [action.domain]: patch(state[action.domain], action.key, (r) => ({
          ...r,
          value: clamp(action.value),
        })),
      };
    case "set-label":
      return {
        ...state,
        [action.domain]: patch(state[action.domain], action.key, (r) => ({
          ...r,
          // Keep the cycling synonyms (alts) in sync with the canonical label.
          label: action.label,
          shortLabel: action.label,
          alts: r.alts ? [action.label, ...r.alts.slice(1)] : undefined,
        })),
      };
    case "unlock-body-presence":
      return { ...state, bodyUnlockToken: state.bodyUnlockToken + 1 };
    default:
      return state;
  }
}

interface ResourceBarsContextValue {
  state: ResourceBarsState;
  dispatch: React.Dispatch<ResourceBarsAction>;
  /** Expand BODY · PRESENCE on the corner HUD (Body lens visit). */
  unlockBodyPresence: () => void;
}

const Ctx = React.createContext<ResourceBarsContextValue | null>(null);

const INITIAL: ResourceBarsState = {
  mind: MIND_RESOURCES.map((r) => ({ ...r })),
  body: BODY_RESOURCES.map((r) => ({ ...r })),
  bodyUnlockToken: 0,
};

export function ResourceBarsProvider({
  initial,
  children,
}: {
  initial?: Partial<Pick<ResourceBarsState, "mind" | "body">>;
  children: React.ReactNode;
}) {
  // Reuse an outer provider if one is already mounted (idempotent, like
  // LoadoutProvider) so nesting on a page doesn't reset edits.
  const parent = React.useContext(Ctx);
  const [state, dispatch] = React.useReducer(reducer, {
    mind: initial?.mind ?? INITIAL.mind,
    body: initial?.body ?? INITIAL.body,
    bodyUnlockToken: 0,
  });
  const unlockBodyPresence = React.useCallback(() => {
    dispatch({ type: "unlock-body-presence" });
  }, []);
  const value = React.useMemo(
    () => ({ state, dispatch, unlockBodyPresence }),
    [state, unlockBodyPresence],
  );
  if (parent) return <>{children}</>;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useResourceBars(): ResourceBarsContextValue {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useResourceBars must be used within ResourceBarsProvider");
  return ctx;
}

/** Optional — Body lens unlocks even if the HUD provider is missing. */
export function useResourceBarsOptional(): ResourceBarsContextValue | null {
  return React.useContext(Ctx);
}
