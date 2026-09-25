import {
  DEFAULT_AI_SETTINGS,
  type AISettings,
  type ChatContextSourceId,
  type InstructionItem,
} from "@4eye/types";

/**
 * Pure reducer for AI settings — no React, no localStorage. Keeps view
 * components and persistence concerns separate from state transitions.
 */

export type AISettingsAction =
  | { type: "SET"; patch: Partial<AISettings> }
  | { type: "TOGGLE_INSTRUCTION"; id: string }
  | { type: "ADD_INSTRUCTION"; instruction: Omit<InstructionItem, "id"> }
  | { type: "REMOVE_INSTRUCTION"; id: string }
  | { type: "UPDATE_INSTRUCTION"; id: string; patch: Partial<InstructionItem> }
  | { type: "TOGGLE_CONTEXT_SOURCE"; id: ChatContextSourceId }
  | { type: "SET_CONTEXT_SOURCE"; id: ChatContextSourceId; enabled: boolean }
  | { type: "RESET" }
  | { type: "HYDRATE"; settings: AISettings };

const generateId = () => Math.random().toString(36).slice(2, 9);

export function aiSettingsReducer(
  state: AISettings,
  action: AISettingsAction,
): AISettings {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.patch, includeCore: true };
    case "TOGGLE_INSTRUCTION":
      return {
        ...state,
        instructionsIncluded: state.instructionsIncluded.map((i) =>
          i.id === action.id ? { ...i, enabled: !i.enabled } : i,
        ),
      };
    case "ADD_INSTRUCTION":
      return {
        ...state,
        instructionsIncluded: [
          ...state.instructionsIncluded,
          { ...action.instruction, id: generateId() },
        ],
      };
    case "REMOVE_INSTRUCTION":
      return {
        ...state,
        instructionsIncluded: state.instructionsIncluded.filter(
          (i) => i.id !== action.id,
        ),
      };
    case "UPDATE_INSTRUCTION":
      return {
        ...state,
        instructionsIncluded: state.instructionsIncluded.map((i) =>
          i.id === action.id ? { ...i, ...action.patch } : i,
        ),
      };
    case "TOGGLE_CONTEXT_SOURCE":
      return {
        ...state,
        contextSources: {
          ...state.contextSources,
          [action.id]: !state.contextSources[action.id],
        },
      };
    case "SET_CONTEXT_SOURCE":
      return {
        ...state,
        contextSources: {
          ...state.contextSources,
          [action.id]: action.enabled,
        },
      };
    case "RESET":
      return { ...DEFAULT_AI_SETTINGS };
    case "HYDRATE":
      return { ...action.settings, includeCore: true };
    default:
      return state;
  }
}

export const initialAISettings: AISettings = { ...DEFAULT_AI_SETTINGS };
