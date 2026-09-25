/**
 * @expanse/character/state — Cross-Platform Shared State
 * ======================================================
 * React Context + useReducer. Pure React (no MUI, no Three.js), safe for
 * both web and React Native. Drives all renderers from one declarative store.
 */

export {
  CharacterProvider,
  useCharacter,
  type CharacterProviderProps,
} from "./CharacterContext"
export {
  characterReducer,
  initialCharacterState,
  type CharacterAction,
} from "./characterReducer"
