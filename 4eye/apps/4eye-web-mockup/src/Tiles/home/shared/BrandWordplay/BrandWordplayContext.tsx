"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useReducer,
} from "react";

// ─── Sequence Constants ────────────────────────────────────────────────────────

export const SEQUENCE = ["4eye → 4i", "AI Eye 4 You", "AI 4 Your Eyes"] as const;
export const FINAL_IDX = SEQUENCE.length - 1;
export const HOLD_MS: readonly number[] = [500, 2200, 0];

// ─── Cyber Constants ──────────────────────────────────────────────────────────

export const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!?><|=_~";
export const SCRAMBLE_TOTAL_MS = 520;
export const SCRAMBLE_FRAMES = 13;
export const FRAME_MS = Math.round(SCRAMBLE_TOTAL_MS / SCRAMBLE_FRAMES);

export const CYBER = "#22d3ee";
export const CYBER_GLOW_IDLE = `0 0 4px ${CYBER}99, 0 0 14px ${CYBER}44`;
export const CYBER_GLOW_ACTIVE = `0 0 6px ${CYBER}, 0 0 20px ${CYBER}bb, 0 0 44px ${CYBER}44`;

// ─── State Type ───────────────────────────────────────────────────────────────

export interface BrandWordplayState {
  seqIdx: number;
  displayText: string;
  scrambling: boolean;
  isRunning: boolean;
  finalFired: boolean;
}

export const INITIAL_STATE: BrandWordplayState = {
  seqIdx: 0,
  displayText: SEQUENCE[0],
  scrambling: false,
  isRunning: false,
  finalFired: false,
};

// ─── Action Types ─────────────────────────────────────────────────────────────

export type BrandWordplayAction =
  | { type: "INIT" }
  | { type: "SET_SEQ_IDX"; payload: number }
  | { type: "SET_DISPLAY_TEXT"; payload: string }
  | { type: "SET_SCRAMBLING"; payload: boolean }
  | { type: "SET_RUNNING"; payload: boolean }
  | { type: "MARK_FINAL_FIRED" }
  | { type: "RESET_ALL" };

// ─── Reducer ───────────────────────────────────────────────────────────────────

export function brandWordplayReducer(
  state: BrandWordplayState,
  action: BrandWordplayAction,
): BrandWordplayState {
  switch (action.type) {
    case "INIT":
      return {
        seqIdx: 0,
        displayText: SEQUENCE[0],
        scrambling: false,
        isRunning: true,
        finalFired: false,
      };

    case "SET_SEQ_IDX":
      return { ...state, seqIdx: action.payload };

    case "SET_DISPLAY_TEXT":
      return { ...state, displayText: action.payload };

    case "SET_SCRAMBLING":
      return { ...state, scrambling: action.payload };

    case "SET_RUNNING":
      return { ...state, isRunning: action.payload };

    case "MARK_FINAL_FIRED":
      return { ...state, finalFired: true };

    case "RESET_ALL":
      return INITIAL_STATE;

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface BrandWordplayContextType {
  state: BrandWordplayState;
  dispatch: Dispatch<BrandWordplayAction>;
}

export const BrandWordplayContext = createContext<BrandWordplayContextType | undefined>(
  undefined,
);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function BrandWordplayProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(brandWordplayReducer, INITIAL_STATE);

  return (
    <BrandWordplayContext.Provider value={{ state, dispatch }}>
      {children}
    </BrandWordplayContext.Provider>
  );
}

export default BrandWordplayProvider;
