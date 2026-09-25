/**
 * CARD_SKINS registry — public skin lookup map + group index.
 *
 * Skin records themselves live in `cardSkinRegistry.ts` as plain data
 * so they're easy to scan, diff, and unit-test in isolation.
 */

import type { CardSkin, CardSkinGroup } from "./cardSkin"
import { CARD_SKIN_LIST } from "./cardSkinRegistry"

// Glow rgb tokens — kept in sync with the breathing-loop colored
// shadow chains in `NextBestActionCard.tsx`.
const GLOW_RGB = {
  green: "46,204,113",
  amber: "255,200,87",
  pink: "236,72,153",
} as const

export const DEFAULT_CARD_SKIN_ID = "paperInk/clean" as const

/** Lookup by skin id (e.g. `"paperInk/blue-ink"`). */
export const CARD_SKINS: Record<string, CardSkin> = CARD_SKIN_LIST.reduce(
  (acc, skin) => {
    if (acc[skin.id]) {
      // Surface duplicate ids loudly — they'd silently collide otherwise.
      throw new Error(`Duplicate CardSkin id: ${skin.id}`)
    }
    acc[skin.id] = skin
    return acc
  },
  {} as Record<string, CardSkin>,
)

if (!CARD_SKINS[DEFAULT_CARD_SKIN_ID]) {
  throw new Error(
    `CARD_SKIN_LIST must include the default skin "${DEFAULT_CARD_SKIN_ID}"`,
  )
}

/** All skins grouped by family, in `CARD_SKIN_LIST` order. */
export const CARD_SKIN_GROUPS: Record<CardSkinGroup, CardSkin[]> = (() => {
  const out: Record<CardSkinGroup, CardSkin[]> = {
    frostedGlass: [],
    paperInk: [],
    duotoneGradient: [],
    neonGlow: [],
    legacyDeep: [],
  }
  for (const skin of CARD_SKIN_LIST) {
    out[skin.group].push(skin)
  }
  return out
})()

// Re-exported for downstream skins that want to reference the same glow palette.
export { GLOW_RGB as CARD_SKIN_GLOW_RGB }
