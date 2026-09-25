import {
  EMPTY_SELECTED_CONTEXT,
  type AnimationTemplate,
  type Audience,
  type Location,
  type PipelineTemplate,
  type SceneTemplate,
  type SequenceTemplate,
  type SelectedContext,
  type SelectedContextKey,
  type StoryTemplate,
  type Target,
} from "@4eye/types";
import {
  DEFAULT_ANIMATIONS,
  DEFAULT_AUDIENCES,
  DEFAULT_LOCATIONS,
  DEFAULT_PIPELINES,
  DEFAULT_SCENES,
  DEFAULT_SEQUENCES,
  DEFAULT_STORIES,
  DEFAULT_TARGETS,
} from "./defaults";

/** All entity collections + the in-progress chat selection. */
export interface ContextDataState {
  targets: Target[];
  audiences: Audience[];
  locations: Location[];
  stories: StoryTemplate[];
  animations: AnimationTemplate[];
  scenes: SceneTemplate[];
  sequences: SequenceTemplate[];
  pipelines: PipelineTemplate[];
  selectedContext: SelectedContext;
}

export const initialContextDataState: ContextDataState = {
  targets: DEFAULT_TARGETS,
  audiences: DEFAULT_AUDIENCES,
  locations: DEFAULT_LOCATIONS,
  stories: DEFAULT_STORIES,
  animations: DEFAULT_ANIMATIONS,
  scenes: DEFAULT_SCENES,
  sequences: DEFAULT_SEQUENCES,
  pipelines: DEFAULT_PIPELINES,
  selectedContext: EMPTY_SELECTED_CONTEXT,
};

export type EntityCollectionKey =
  | "targets"
  | "audiences"
  | "locations"
  | "stories"
  | "animations"
  | "scenes"
  | "sequences"
  | "pipelines";

export type ContextDataAction =
  /**
   * HYDRATE — replaces any subset of state slices with saved data.
   * Dispatched once on mount after reading from localStorage (or any
   * other persistence adapter). Only the keys present in `state` are
   * overwritten; omitted keys keep their current values.
   */
  | { type: "HYDRATE"; state: Partial<ContextDataState> }
  | {
      type: "ADD";
      collection: EntityCollectionKey;
      // Caller passes a fully-formed entity (with id + createdAt resolved by provider).
      entity: ContextDataState[EntityCollectionKey][number];
    }
  | {
      type: "UPDATE";
      collection: EntityCollectionKey;
      id: string;
      patch: Partial<ContextDataState[EntityCollectionKey][number]>;
    }
  | { type: "REMOVE"; collection: EntityCollectionKey; id: string }
  | { type: "TOGGLE_SELECT"; key: SelectedContextKey; id: string }
  /**
   * Replace the selected id list for a single key explicitly.
   * Useful for "Select All" and bulk operations.
   */
  | { type: "SET_SELECTED"; key: SelectedContextKey; ids: string[] }
  /**
   * REORDER_SELECTED — replace the ordered ID list for a single
   * selected-context key. Used by ordered kinds (e.g. `pipelines`)
   * where the user reorders active items via drag.
   */
  | { type: "REORDER_SELECTED"; key: SelectedContextKey; ids: string[] }
  | { type: "CLEAR_SELECTED" };

export function contextDataReducer(
  state: ContextDataState,
  action: ContextDataAction,
): ContextDataState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.state };
    case "ADD":
      return {
        ...state,
        [action.collection]: [
          ...(state[action.collection] as Array<{ id: string }>),
          action.entity,
        ],
      } as ContextDataState;
    case "UPDATE":
      return {
        ...state,
        [action.collection]: (
          state[action.collection] as Array<{ id: string }>
        ).map((e) => (e.id === action.id ? { ...e, ...action.patch } : e)),
      } as ContextDataState;
    case "REMOVE":
      return {
        ...state,
        [action.collection]: (
          state[action.collection] as Array<{ id: string }>
        ).filter((e) => e.id !== action.id),
        selectedContext: {
          ...state.selectedContext,
          [action.collection]: (
            state.selectedContext[action.collection as SelectedContextKey] ?? []
          ).filter((sid: string) => sid !== action.id),
        },
      } as ContextDataState;
    case "TOGGLE_SELECT": {
      const current = state.selectedContext[action.key];
      const next = current.includes(action.id)
        ? current.filter((id) => id !== action.id)
        : [...current, action.id];
      return {
        ...state,
        selectedContext: { ...state.selectedContext, [action.key]: next },
      };
    }
    case "SET_SELECTED": {
      return {
        ...state,
        selectedContext: { ...state.selectedContext, [action.key]: action.ids },
      } as ContextDataState;
    }
    case "REORDER_SELECTED": {
      // Defensive: only keep ids that are currently selected for this
      // key, preserving the new order. Drops any unknown ids silently.
      const allowed = new Set(state.selectedContext[action.key]);
      const next = action.ids.filter((id) => allowed.has(id));
      return {
        ...state,
        selectedContext: { ...state.selectedContext, [action.key]: next },
      };
    }
    case "CLEAR_SELECTED":
      return { ...state, selectedContext: EMPTY_SELECTED_CONTEXT };
    default:
      return state;
  }
}
