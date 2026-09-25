import {
  EMPTY_TARGETING_STATE,
  type TargetAssignment,
  type TargetRole,
  type TargetingState,
} from "@4eye/types";

export type TargetingAction =
  | { type: "HYDRATE"; state: TargetingState }
  | { type: "ADD"; role: TargetRole; assignment: TargetAssignment }
  | { type: "REMOVE"; role: TargetRole; assignmentId: string }
  | { type: "CLEAR"; role: TargetRole }
  | { type: "RESET" };

export const initialTargetingState: TargetingState = EMPTY_TARGETING_STATE;

const bucketFor = (role: TargetRole): keyof TargetingState =>
  role === "actor" ? "actors" : "targets";

export function targetingReducer(
  state: TargetingState,
  action: TargetingAction,
): TargetingState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const bucket = bucketFor(action.role);
      return { ...state, [bucket]: [...state[bucket], action.assignment] };
    }
    case "REMOVE": {
      const bucket = bucketFor(action.role);
      return {
        ...state,
        [bucket]: state[bucket].filter((a) => a.id !== action.assignmentId),
      };
    }
    case "CLEAR": {
      const bucket = bucketFor(action.role);
      return { ...state, [bucket]: [] };
    }
    case "RESET":
      return EMPTY_TARGETING_STATE;
    default:
      return state;
  }
}
