"use client"

/**
 * `CardSkinProvider` / `useCardSkin` — context plumbing for the
 * `NextBestActionCard` skin system. See `cardSkin.ts` for the type.
 *
 * Wrap the right-rail card column in `<CardSkinProvider skin="...">`
 * and the card, header, and chip primitives read their colors via
 * `useCardSkin()`. With no provider, `DEFAULT_CARD_SKIN_ID` (see
 * `skins.ts`) is used.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react"

import type { CardSkin, CardSkinConfig, CardSkinPreset } from "./cardSkin"
import { resolveCardSkin } from "./cardSkin"
import { CARD_SKINS, DEFAULT_CARD_SKIN_ID } from "./skins"

const CardSkinContext = createContext<CardSkin>(CARD_SKINS[DEFAULT_CARD_SKIN_ID]!)

export interface CardSkinProviderProps {
  /** Preset id, full skin record, or anonymous config. */
  skin?: CardSkinPreset | CardSkin | CardSkinConfig
  children: ReactNode
}

export function CardSkinProvider({ skin, children }: CardSkinProviderProps) {
  const resolved = useMemo(
    () => resolveCardSkin(skin, CARD_SKINS, DEFAULT_CARD_SKIN_ID),
    [skin],
  )
  return (
    <CardSkinContext.Provider value={resolved}>
      {children}
    </CardSkinContext.Provider>
  )
}

export function useCardSkin(): CardSkin {
  return useContext(CardSkinContext)
}
