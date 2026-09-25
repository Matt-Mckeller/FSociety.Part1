"use client";

/**
 * PlanningProvider — React Context + useReducer for the shared planning graph.
 *
 * Per the repo state-management convention (no Redux/zustand): owns the
 * editable {@link PlanningData} and exposes a memoized read-only
 * {@link PlanningStore} plus dispatchable mutations. The in-chat Plan view,
 * the app Planning tile, and the website Projects page can all wrap their
 * subtree in this provider to get live create/update/move behaviour.
 */

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  Entity,
  EntityType,
  Relationship,
  StatusTrait,
  Trait,
} from "@4eye/types";

import { PlanningStore, type PlanningData } from "../../../model";
import { SEED } from "./seed-data";

type StatusValue = StatusTrait["value"];

export type PlanningAction =
  | { kind: "select"; id?: string }
  | { kind: "set-status"; id: string; value: StatusValue }
  | { kind: "set-weight"; id: string; value: number }
  | {
      kind: "move-child";
      parentId: string;
      childId: string;
      relationType: string;
      direction: "up" | "down";
    }
  | {
      kind: "add-child";
      parentId: string;
      relationType: string;
      entity: Pick<Entity, "name" | "type"> &
        Partial<Pick<Entity, "symbol" | "symbolColor" | "traits">>;
    };

export interface PlanningState extends PlanningData {
  selectedId?: string;
}

function nowTs(): number {
  return Date.now();
}

function newId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Replace (or insert) a trait of a given kind on an entity. */
function upsertTrait(traits: Trait[], next: Trait): Trait[] {
  const found = traits.some((t) => t.kind === next.kind);
  return found
    ? traits.map((t) => (t.kind === next.kind ? next : t))
    : [...traits, next];
}

function mapEntity(
  state: PlanningState,
  id: string,
  fn: (e: Entity) => Entity,
): Entity[] {
  return state.entities.map((e) =>
    e.id === id ? { ...fn(e), updatedAt: nowTs() } : e,
  );
}

export function planningReducer(
  state: PlanningState,
  action: PlanningAction,
): PlanningState {
  switch (action.kind) {
    case "select":
      return { ...state, selectedId: action.id };

    case "set-status":
      return {
        ...state,
        entities: mapEntity(state, action.id, (e) => ({
          ...e,
          traits: upsertTrait(e.traits, {
            kind: "status",
            value: action.value,
          }),
        })),
      };

    case "set-weight": {
      const value = Math.max(0, Math.min(100, Math.round(action.value)));
      return {
        ...state,
        entities: mapEntity(state, action.id, (e) => ({
          ...e,
          traits: upsertTrait(e.traits, { kind: "weight", value }),
        })),
      };
    }

    case "move-child": {
      // Children are the parent→child edges, ordered by `order`. Normalise the
      // order to a dense 0..n-1 sequence, then swap the target with its
      // up/down neighbour.
      const edges = state.relationships
        .filter(
          (r) =>
            r.fromId === action.parentId &&
            r.relationType === action.relationType,
        )
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const idx = edges.findIndex((r) => r.toId === action.childId);
      if (idx === -1) return state;
      const swapWith = action.direction === "up" ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= edges.length) return state;

      const orderById = new Map<string, number>();
      edges.forEach((r, i) => orderById.set(r.id, i));
      const a = edges[idx];
      const b = edges[swapWith];
      orderById.set(a.id, swapWith);
      orderById.set(b.id, idx);

      return {
        ...state,
        relationships: state.relationships.map((r) =>
          orderById.has(r.id) ? { ...r, order: orderById.get(r.id) } : r,
        ),
      };
    }

    case "add-child": {
      const id = newId(action.entity.type);
      const entity: Entity = {
        id,
        slug: id,
        type: action.entity.type as EntityType,
        name: action.entity.name,
        symbol: action.entity.symbol,
        symbolColor: action.entity.symbolColor,
        traits: action.entity.traits ?? [
          { kind: "status", value: "idea" },
          { kind: "weight", value: 0 },
        ],
        createdAt: nowTs(),
      };
      const siblings = state.relationships.filter(
        (r) => r.toId === action.parentId && r.relationType === action.relationType,
      );
      const relationship: Relationship = {
        id: newId("rel"),
        fromId: action.parentId,
        fromType: state.entities.find((e) => e.id === action.parentId)?.type ?? "storyline",
        toId: id,
        toType: entity.type,
        relationType: action.relationType,
        order: siblings.length,
        createdAt: nowTs(),
      };
      return {
        ...state,
        entities: [...state.entities, entity],
        relationships: [...state.relationships, relationship],
      };
    }

    default:
      return state;
  }
}

interface PlanningContextValue {
  state: PlanningState;
  dispatch: (action: PlanningAction) => void;
  store: PlanningStore;
  selected?: Entity;
}

const PlanningContext = createContext<PlanningContextValue | null>(null);

function initialState(data: PlanningData): PlanningState {
  return { ...data };
}

export function PlanningProvider({
  children,
  data = SEED,
}: {
  children: ReactNode;
  data?: PlanningData;
}) {
  const [state, dispatch] = useReducer(planningReducer, data, initialState);

  const value = useMemo<PlanningContextValue>(() => {
    const store = new PlanningStore(state);
    const selected = state.selectedId
      ? state.entities.find((e) => e.id === state.selectedId)
      : undefined;
    return { state, dispatch, store, selected };
  }, [state]);

  return (
    <PlanningContext.Provider value={value}>
      {children}
    </PlanningContext.Provider>
  );
}

export function usePlanning(): PlanningContextValue {
  const ctx = useContext(PlanningContext);
  if (!ctx) {
    throw new Error("usePlanning must be used within a PlanningProvider");
  }
  return ctx;
}
