"use client"

/**
 * Icon-mode context — switches every <Lens> between its animated shell
 * ("lens") and its hand-gesture pose ("hands") without prop drilling.
 *
 * The provider is idempotent: when one is already mounted above (e.g. a
 * SpellbookTile embedded in a CharacterTile dialog), the inner provider
 * reuses the outer store so the whole surface flips together.
 */

import * as React from "react"
import type { LensIconMode } from "../core/types"

interface LensIconModeValue {
  mode: LensIconMode
  setMode: (mode: LensIconMode) => void
}

const LensIconModeCtx = React.createContext<LensIconModeValue | null>(null)

export function LensIconModeProvider({
  initialMode = "lens",
  children,
}: {
  initialMode?: LensIconMode
  children: React.ReactNode
}) {
  const parent = React.useContext(LensIconModeCtx)
  const [mode, setMode] = React.useState<LensIconMode>(initialMode)
  const value = React.useMemo(() => ({ mode, setMode }), [mode])
  if (parent) return <>{children}</>
  return <LensIconModeCtx.Provider value={value}>{children}</LensIconModeCtx.Provider>
}

/** Current icon mode + setter. Safe without a provider (fixed "lens"). */
export function useLensIconMode(): LensIconModeValue {
  const ctx = React.useContext(LensIconModeCtx)
  return ctx ?? { mode: "lens", setMode: () => undefined }
}
