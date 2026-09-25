"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { useHudDispatchOptional } from "@4eye/web/components/hud/state";
import type { StudioView } from "../types/studio.types";

// ─── State ───────────────────────────────────────────────────────────────────

interface SceneStudioState {
  isOpen: boolean;
  view: StudioView;
  selectedAssetId: string | null;
  selectedStoryboardId: string | null;
}

const INITIAL: SceneStudioState = {
  isOpen: false,
  view: "gallery",
  selectedAssetId: null,
  selectedStoryboardId: null,
};

// ─── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: "OPEN"; view?: StudioView }
  | { type: "CLOSE" }
  | { type: "SET_VIEW"; view: StudioView }
  | { type: "SELECT_ASSET"; id: string | null }
  | { type: "SELECT_STORYBOARD"; id: string | null };

function reducer(state: SceneStudioState, action: Action): SceneStudioState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true, view: action.view ?? state.view };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "SET_VIEW":
      return { ...state, view: action.view };
    case "SELECT_ASSET":
      return { ...state, selectedAssetId: action.id };
    case "SELECT_STORYBOARD":
      return { ...state, selectedStoryboardId: action.id };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface SceneStudioContextValue {
  state: SceneStudioState;
  open: (view?: StudioView) => void;
  close: () => void;
  setView: (view: StudioView) => void;
  selectAsset: (id: string | null) => void;
  selectStoryboard: (id: string | null) => void;
}

const SceneStudioContext = createContext<SceneStudioContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function SceneStudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const hudDispatch = useHudDispatchOptional();

  const open = useCallback(
    (view?: StudioView) => {
      // Studio and Emotion.Inspect share the shell layer — never stack.
      hudDispatch?.({ type: "CLOSE_EMOTION_INSPECT" });
      hudDispatch?.({ type: "CLOSE_MAP_VIEW" });
      dispatch({ type: "OPEN", view });
    },
    [hudDispatch],
  );
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const setView = useCallback((view: StudioView) => dispatch({ type: "SET_VIEW", view }), []);
  const selectAsset = useCallback((id: string | null) => dispatch({ type: "SELECT_ASSET", id }), []);
  const selectStoryboard = useCallback((id: string | null) => dispatch({ type: "SELECT_STORYBOARD", id }), []);

  const value = useMemo(
    () => ({ state, open, close, setView, selectAsset, selectStoryboard }),
    [state, open, close, setView, selectAsset, selectStoryboard],
  );

  return (
    <SceneStudioContext.Provider value={value}>
      {children}
    </SceneStudioContext.Provider>
  );
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useSceneStudioContext(): SceneStudioContextValue {
  const ctx = useContext(SceneStudioContext);
  if (!ctx) throw new Error("useSceneStudio* must be used inside <SceneStudioProvider>");
  return ctx;
}

export function useSceneStudio() {
  return useSceneStudioContext().state;
}

export function useOpenSceneStudio() {
  return useSceneStudioContext().open;
}

export function useCloseSceneStudio() {
  return useSceneStudioContext().close;
}

export function useSetStudioView() {
  return useSceneStudioContext().setView;
}

export function useSelectStudioAsset() {
  return useSceneStudioContext().selectAsset;
}

export function useSelectStoryboard() {
  return useSceneStudioContext().selectStoryboard;
}
