/**
 * TaskCard Reducer
 *
 * Manages TaskCard UI state including view states, animations,
 * and interaction tracking.
 */

import { CardViewState, TaskCardState } from "./types"

// ============================================================
// ACTION TYPES
// ============================================================

export enum TaskCardActionType {
  SET_VIEW_STATE = "SET_VIEW_STATE",
  SET_HOVERED = "SET_HOVERED",
  SET_FLIPPED = "SET_FLIPPED",
  SET_EXPANDED = "SET_EXPANDED",
  SET_ANIMATION_PROGRESS = "SET_ANIMATION_PROGRESS",
  RESET = "RESET",
}

// ============================================================
// ACTIONS
// ============================================================

export type TaskCardAction =
  | { type: TaskCardActionType.SET_VIEW_STATE; payload: CardViewState }
  | { type: TaskCardActionType.SET_HOVERED; payload: boolean }
  | { type: TaskCardActionType.SET_FLIPPED; payload: boolean }
  | { type: TaskCardActionType.SET_EXPANDED; payload: boolean }
  | { type: TaskCardActionType.SET_ANIMATION_PROGRESS; payload: number }
  | { type: TaskCardActionType.RESET }

// ============================================================
// INITIAL STATE
// ============================================================

export const initialTaskCardState: TaskCardState = {
  viewState: CardViewState.DEFAULT,
  isFlipped: false,
  isExpanded: false,
  animationProgress: 0,
}

// ============================================================
// REDUCER
// ============================================================

export function taskCardReducer(
  state: TaskCardState,
  action: TaskCardAction
): TaskCardState {
  switch (action.type) {
    case TaskCardActionType.SET_VIEW_STATE:
      return {
        ...state,
        viewState: action.payload,
      }

    case TaskCardActionType.SET_HOVERED:
      return {
        ...state,
        viewState: action.payload ? CardViewState.HOVERED : CardViewState.DEFAULT,
      }

    case TaskCardActionType.SET_FLIPPED:
      return {
        ...state,
        isFlipped: action.payload,
        viewState: action.payload ? CardViewState.FLIPPED : CardViewState.DEFAULT,
      }

    case TaskCardActionType.SET_EXPANDED:
      return {
        ...state,
        isExpanded: action.payload,
        viewState: action.payload ? CardViewState.EXPANDED : CardViewState.DEFAULT,
      }

    case TaskCardActionType.SET_ANIMATION_PROGRESS:
      return {
        ...state,
        animationProgress: Math.max(0, Math.min(1, action.payload)),
      }

    case TaskCardActionType.RESET:
      return initialTaskCardState

    default:
      return state
  }
}

// ============================================================
// ACTION CREATORS
// ============================================================

export const taskCardActions = {
  setViewState: (state: CardViewState): TaskCardAction => ({
    type: TaskCardActionType.SET_VIEW_STATE,
    payload: state,
  }),

  setHovered: (isHovered: boolean): TaskCardAction => ({
    type: TaskCardActionType.SET_HOVERED,
    payload: isHovered,
  }),

  setFlipped: (isFlipped: boolean): TaskCardAction => ({
    type: TaskCardActionType.SET_FLIPPED,
    payload: isFlipped,
  }),

  setExpanded: (isExpanded: boolean): TaskCardAction => ({
    type: TaskCardActionType.SET_EXPANDED,
    payload: isExpanded,
  }),

  setAnimationProgress: (progress: number): TaskCardAction => ({
    type: TaskCardActionType.SET_ANIMATION_PROGRESS,
    payload: progress,
  }),

  reset: (): TaskCardAction => ({
    type: TaskCardActionType.RESET,
  }),
}
