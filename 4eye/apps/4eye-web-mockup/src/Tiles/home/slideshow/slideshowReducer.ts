import { SPEEDS, type Speed } from "@4eye/web/Tiles/home/slideshow/steps";

/**
 * Slideshow state machine.
 *
 * Encapsulates the four scalars that drive deck navigation + auto-play:
 *   - `activeIdx`: current slide index (0..total-1)
 *   - `isPlaying`: auto-advance timer enabled
 *   - `isHovered`: cursor over stage — pauses auto-advance without flipping `isPlaying`
 *   - `speed`:     playback speed multiplier
 *
 * Pure / synchronous. All side-effects (timers, listeners) live in hooks
 * that dispatch into this reducer.
 */
export interface SlideshowState {
  activeIdx: number;
  isPlaying: boolean;
  isHovered: boolean;
  speed: Speed;
}

export type SlideshowAction =
  | { type: "GOTO"; index: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_PLAYING"; value: boolean }
  | { type: "CYCLE_SPEED" }
  | { type: "SET_HOVERED"; value: boolean }
  | { type: "RESTART" };

export interface SlideshowReducerOptions {
  total: number;
}

export const INITIAL_SLIDESHOW_STATE: SlideshowState = {
  activeIdx: 0,
  isPlaying: false,
  isHovered: false,
  speed: 1,
};

/**
 * Build a reducer bound to a fixed deck length. `total` is captured in
 * closure rather than threaded through every action so callers don't have
 * to pass it on each dispatch.
 */
export function makeSlideshowReducer({ total }: SlideshowReducerOptions) {
  const clamp = (i: number) => Math.max(0, Math.min(total - 1, i));
  return function reducer(state: SlideshowState, action: SlideshowAction): SlideshowState {
    switch (action.type) {
      case "GOTO":
        return { ...state, activeIdx: clamp(action.index) };
      case "NEXT":
        return { ...state, activeIdx: clamp(state.activeIdx + 1) };
      case "PREV":
        return { ...state, activeIdx: clamp(state.activeIdx - 1) };
      case "TOGGLE_PLAY": {
        // At final slide, "play" restarts the deck from 0 and plays.
        if (state.activeIdx >= total - 1) {
          return { ...state, activeIdx: 0, isPlaying: true };
        }
        return { ...state, isPlaying: !state.isPlaying };
      }
      case "SET_PLAYING":
        return { ...state, isPlaying: action.value };
      case "CYCLE_SPEED": {
        const i = SPEEDS.indexOf(state.speed);
        return { ...state, speed: SPEEDS[(i + 1) % SPEEDS.length] };
      }
      case "SET_HOVERED":
        return { ...state, isHovered: action.value };
      case "RESTART":
        return { ...state, activeIdx: 0, isPlaying: false };
      default:
        return state;
    }
  };
}
