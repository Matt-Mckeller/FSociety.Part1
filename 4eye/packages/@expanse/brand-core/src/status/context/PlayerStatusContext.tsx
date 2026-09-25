"use client"

/**
 * PlayerStatusContext — shared player progression data for status displays.
 *
 * Single source of truth consumed by:
 *   - `CompactStatusBar` (currency / xp / level)
 *   - `CurrencyStatusBarTripleLayer` (currency)
 *   - `ProgressStatusBarTripleLayer` (xpProgress)
 *   - `ProfileIconStatusBarTripleLayer` (level)
 *
 * Resolution rule used by every consumer:
 *   prop ?? context ?? default
 *
 * Defaults are baked into `createContext`, so consumers work without a provider
 * (useful for isolated stories and tests).
 *
 * Note: this is unrelated to `useTripleLayerBarContext`, which carries
 * bar-color/visual info — different concern.
 */

import React, { createContext, useContext, useMemo } from "react"

export interface PlayerStatusValue {
  /** Total spendable currency. */
  currency: number
  /** Cumulative experience points. */
  xp: number
  /** Progress to next level, 0-100 (percent). */
  xpProgress: number
  /** Current level. */
  level: number | string
}

export const PLAYER_STATUS_DEFAULTS: PlayerStatusValue = {
  currency: 0,
  xp: 0,
  xpProgress: 0,
  level: 1,
}

const PlayerStatusContext = createContext<PlayerStatusValue>(
  PLAYER_STATUS_DEFAULTS,
)

export interface PlayerStatusProviderProps {
  /** Partial values; missing fields fall back to defaults. */
  value?: Partial<PlayerStatusValue>
  children: React.ReactNode
}

export function PlayerStatusProvider({
  value,
  children,
}: PlayerStatusProviderProps) {
  const merged = useMemo<PlayerStatusValue>(
    () => ({ ...PLAYER_STATUS_DEFAULTS, ...value }),
    [value],
  )
  return (
    <PlayerStatusContext.Provider value={merged}>
      {children}
    </PlayerStatusContext.Provider>
  )
}

/**
 * Read player status. Always returns a fully populated object — defaults are
 * supplied when no provider is mounted above.
 */
export function usePlayerStatus(): PlayerStatusValue {
  return useContext(PlayerStatusContext)
}
