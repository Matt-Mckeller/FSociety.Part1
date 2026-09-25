"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
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
  contextDataReducer,
  initialContextDataState,
  type EntityCollectionKey,
} from "./contextDataReducer";
import { mergeEntitiesById } from "./mergeEntities";
import { localStorageAdapter } from "./storage";

const generateId = () => Math.random().toString(36).slice(2, 9);

interface ContextDataContextValue {
  // Collections
  targets: Target[];
  audiences: Audience[];
  locations: Location[];
  stories: StoryTemplate[];
  animations: AnimationTemplate[];
  scenes: SceneTemplate[];
  sequences: SequenceTemplate[];
  pipelines: PipelineTemplate[];

  // Selection
  selectedContext: SelectedContext;
  toggleSelect: (key: SelectedContextKey, id: string) => void;
  /** Replace the selected ID list for a key (useful for Select All). */
  setSelected: (key: SelectedContextKey, ids: string[]) => void;
  /** Replace the ordered ID list for a selected-context key (used by
   *  ordered kinds like `pipelines` after a drag-reorder). */
  reorderSelected: (key: SelectedContextKey, ids: string[]) => void;
  clearSelectedContext: () => void;
  totalSelected: number;

  // Generic CRUD
  addEntity: <K extends EntityCollectionKey>(
    collection: K,
    entity: Omit<EntityFor<K>, "id" | "createdAt">,
  ) => string;
  updateEntity: <K extends EntityCollectionKey>(
    collection: K,
    id: string,
    patch: Partial<EntityFor<K>>,
  ) => void;
  removeEntity: (collection: EntityCollectionKey, id: string) => void;

  // Convenience getters
  getById: <K extends EntityCollectionKey>(
    collection: K,
    id: string,
  ) => EntityFor<K> | undefined;
}

type EntityFor<K extends EntityCollectionKey> = K extends "targets"
  ? Target
  : K extends "audiences"
    ? Audience
    : K extends "locations"
      ? Location
      : K extends "stories"
        ? StoryTemplate
        : K extends "animations"
          ? AnimationTemplate
          : K extends "scenes"
            ? SceneTemplate
            : K extends "sequences"
              ? SequenceTemplate
              : K extends "pipelines"
                ? PipelineTemplate
                : never;

const ContextDataContext = createContext<ContextDataContextValue | undefined>(
  undefined,
);

export function ContextDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    contextDataReducer,
    initialContextDataState,
  );

  // Hydrate from storage on mount — merge by id so new catalog
  // defaults (e.g. audiences) appear without wiping user entities.
  useEffect(() => {
    const saved = localStorageAdapter.load();
    if (!saved) return;
    const initial = initialContextDataState;
    dispatch({
      type: "HYDRATE",
      state: {
        targets: mergeEntitiesById(initial.targets, saved.targets),
        audiences: mergeEntitiesById(initial.audiences, saved.audiences),
        locations: mergeEntitiesById(initial.locations, saved.locations),
        stories: mergeEntitiesById(initial.stories, saved.stories),
        animations: mergeEntitiesById(initial.animations, saved.animations),
        scenes: mergeEntitiesById(initial.scenes, saved.scenes),
        sequences: mergeEntitiesById(initial.sequences, saved.sequences),
        pipelines: mergeEntitiesById(initial.pipelines, saved.pipelines),
      },
    });
  }, []);

  // Persist on change (entities only — selection is session state)
  useEffect(() => {
    localStorageAdapter.save({
      targets: state.targets,
      audiences: state.audiences,
      locations: state.locations,
      stories: state.stories,
      animations: state.animations,
      scenes: state.scenes,
      sequences: state.sequences,
      pipelines: state.pipelines,
    });
  }, [
    state.targets,
    state.audiences,
    state.locations,
    state.stories,
    state.animations,
    state.scenes,
    state.sequences,
    state.pipelines,
  ]);

  const addEntity = useCallback(
    <K extends EntityCollectionKey>(
      collection: K,
      entity: Omit<EntityFor<K>, "id" | "createdAt">,
    ): string => {
      const id = generateId();
      dispatch({
        type: "ADD",
        collection,
        entity: {
          ...(entity as object),
          id,
          createdAt: Date.now(),
        } as EntityFor<K>,
      });
      return id;
    },
    [],
  );

  const updateEntity = useCallback(
    <K extends EntityCollectionKey>(
      collection: K,
      id: string,
      patch: Partial<EntityFor<K>>,
    ) => {
      dispatch({
        type: "UPDATE",
        collection,
        id,
        patch: patch as Partial<EntityFor<EntityCollectionKey>>,
      });
    },
    [],
  );

  const removeEntity = useCallback(
    (collection: EntityCollectionKey, id: string) =>
      dispatch({ type: "REMOVE", collection, id }),
    [],
  );

  const toggleSelect = useCallback(
    (key: SelectedContextKey, id: string) =>
      dispatch({ type: "TOGGLE_SELECT", key, id }),
    [],
  );

  const setSelected = useCallback(
    (key: SelectedContextKey, ids: string[]) =>
      dispatch({ type: "SET_SELECTED", key, ids }),
    [],
  );

  const reorderSelected = useCallback(
    (key: SelectedContextKey, ids: string[]) =>
      dispatch({ type: "REORDER_SELECTED", key, ids }),
    [],
  );

  const clearSelectedContext = useCallback(
    () => dispatch({ type: "CLEAR_SELECTED" }),
    [],
  );

  const getById = useCallback(
    <K extends EntityCollectionKey>(
      collection: K,
      id: string,
    ): EntityFor<K> | undefined => {
      const list = state[collection] as Array<{ id: string }>;
      return list.find((e) => e.id === id) as EntityFor<K> | undefined;
    },
    [state],
  );

  const totalSelected = useMemo(
    () =>
      Object.values(state.selectedContext).reduce<number>(
        (sum, ids) => sum + (ids?.length ?? 0),
        0,
      ),
    [state.selectedContext],
  );

  const value = useMemo<ContextDataContextValue>(
    () => ({
      targets: state.targets,
      audiences: state.audiences,
      locations: state.locations,
      stories: state.stories,
      animations: state.animations,
      scenes: state.scenes,
      sequences: state.sequences,
      pipelines: state.pipelines,
      selectedContext: state.selectedContext,
      toggleSelect,
      setSelected,
      reorderSelected,
      clearSelectedContext,
      totalSelected,
      addEntity,
      updateEntity,
      removeEntity,
      getById,
    }),
    [
      state,
      toggleSelect,
      setSelected,
      reorderSelected,
      clearSelectedContext,
      totalSelected,
      addEntity,
      updateEntity,
      removeEntity,
      getById,
    ],
  );

  return (
    <ContextDataContext.Provider value={value}>
      {children}
    </ContextDataContext.Provider>
  );
}

export function useContextData(): ContextDataContextValue {
  const ctx = useContext(ContextDataContext);
  if (!ctx)
    throw new Error("useContextData must be used within ContextDataProvider");
  return ctx;
}

// Re-export the empty constant for callers building prompt payloads.
export { EMPTY_SELECTED_CONTEXT };
