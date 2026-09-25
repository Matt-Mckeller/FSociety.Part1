/**
 * HUD state reducer.
 *
 * Single source of truth for HUD-level UI state that lives at the app
 * shell level (above route content, below the FullHud chrome). Map view
 * was the first consumer; Emotion.Inspect is the second (Decision 11 in
 * the minimap-full-view plan — generalize when another feature needs it).
 */

export interface HudState {
  /** Whether the full-screen MinimapFullView overlay is mounted. */
  isMapViewOpen: boolean;
  /**
   * True for the brief beat between a close request and unmount, while
   * the close glyph holds a plus. Overlay stays mounted during this beat.
   */
  isMapViewClosing: boolean;
  /**
   * Whether the floating MinimapDock should hide itself. Set by the
   * MapView lifecycle so we never see two minimaps at once (Decision
   * 10).
   */
  dockHidden: boolean;
  /** Whether the Emotion.Inspect HUD overlay is open. */
  isEmotionInspectOpen: boolean;
  /**
   * Catalogue emotion id under inspection (`mood.ts` / `emotions.ts`).
   * Null when inspect has never been opened this session.
   */
  emotionInspectId: string | null;
}

export const INITIAL_HUD_STATE: HudState = {
  isMapViewOpen: false,
  isMapViewClosing: false,
  dockHidden: false,
  isEmotionInspectOpen: false,
  emotionInspectId: null,
};

/**
 * Beat the close glyph holds a plus before the map overlay unmounts.
 * Match any CSS fade on the overlay to this duration.
 */
export const MAP_CLOSE_GLYPH_MS = 240;

export type HudAction =
  | { type: "OPEN_MAP_VIEW" }
  | { type: "BEGIN_CLOSE_MAP_VIEW" }
  | { type: "CLOSE_MAP_VIEW" }
  | { type: "HIDE_DOCK" }
  | { type: "SHOW_DOCK" }
  | { type: "OPEN_EMOTION_INSPECT"; emotionId?: string }
  | { type: "CLOSE_EMOTION_INSPECT" }
  | { type: "SET_EMOTION_INSPECT_ID"; emotionId: string };

export function hudReducer(state: HudState, action: HudAction): HudState {
  switch (action.type) {
    case "OPEN_MAP_VIEW":
      // Opening the map view also hides the dock so we never show two
      // minimaps at once. Emotion.Inspect cannot stack with the map.
      if (
        state.isMapViewOpen &&
        state.dockHidden &&
        !state.isEmotionInspectOpen &&
        !state.isMapViewClosing
      ) {
        return state;
      }
      return {
        ...state,
        isMapViewOpen: true,
        isMapViewClosing: false,
        dockHidden: true,
        isEmotionInspectOpen: false,
      };

    case "BEGIN_CLOSE_MAP_VIEW":
      if (!state.isMapViewOpen || state.isMapViewClosing) return state;
      return { ...state, isMapViewClosing: true };

    case "CLOSE_MAP_VIEW":
      if (!state.isMapViewOpen && !state.dockHidden && !state.isMapViewClosing) {
        return state;
      }
      return {
        ...state,
        isMapViewOpen: false,
        isMapViewClosing: false,
        dockHidden: false,
      };

    case "HIDE_DOCK":
      if (state.dockHidden) return state;
      return { ...state, dockHidden: true };

    case "SHOW_DOCK":
      if (!state.dockHidden) return state;
      return { ...state, dockHidden: false };

    case "OPEN_EMOTION_INSPECT": {
      const emotionInspectId = action.emotionId ?? state.emotionInspectId ?? "angry";
      if (
        state.isEmotionInspectOpen &&
        state.emotionInspectId === emotionInspectId &&
        !state.isMapViewOpen
      ) {
        return state;
      }
      // Close the map (and restore the dock) so Inspect owns the shell layer.
      return {
        ...state,
        isEmotionInspectOpen: true,
        emotionInspectId,
        isMapViewOpen: false,
        isMapViewClosing: false,
        dockHidden: false,
      };
    }

    case "CLOSE_EMOTION_INSPECT":
      if (!state.isEmotionInspectOpen) return state;
      return { ...state, isEmotionInspectOpen: false };

    case "SET_EMOTION_INSPECT_ID":
      if (state.emotionInspectId === action.emotionId) return state;
      return { ...state, emotionInspectId: action.emotionId };

    default: {
      // Exhaustiveness check.
      const _exhaustive: never = action;
      void _exhaustive;
      return state;
    }
  }
}
