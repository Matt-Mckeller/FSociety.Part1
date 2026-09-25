/**
 * Character Context — Cross-Platform Shared State
 * ===============================================
 * React Context + useReducer holding the declarative {@link CharacterState}.
 * Pure React (no MUI, no Three.js), so the SAME provider drives both the web
 * (2D SVG / 3D R3F) and native (3D R3F) renderers, keeping them in sync.
 *
 * IMPORTANT — the 60fps rule:
 *   This store holds DISCRETE intent only (target yaw, mood, active emote…).
 *   Never dispatch on every animation frame. The 3D render loop reads
 *   `state.targetYaw` and imperatively tweens the mesh toward it against a
 *   ref — zero dispatches during motion.
 */

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react"
import type { CharacterState } from "../core"
import {
  characterReducer,
  initialCharacterState,
  type CharacterAction,
} from "./characterReducer"

interface CharacterContextValue {
  state: CharacterState
  dispatch: Dispatch<CharacterAction>
}

const CharacterContext = createContext<CharacterContextValue | null>(null)

export interface CharacterProviderProps {
  children: ReactNode
  /** Optional initial overrides merged onto the default resting state. */
  initialState?: Partial<CharacterState>
}

export function CharacterProvider({
  children,
  initialState,
}: CharacterProviderProps) {
  const [state, dispatch] = useReducer(
    characterReducer,
    initialState
      ? { ...initialCharacterState, ...initialState }
      : initialCharacterState,
  )

  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

/**
 * Access the shared character state and dispatcher. Must be used within a
 * {@link CharacterProvider}.
 */
export function useCharacter(): CharacterContextValue {
  const ctx = useContext(CharacterContext)
  if (!ctx) {
    throw new Error("useCharacter must be used within a <CharacterProvider>")
  }
  return ctx
}
