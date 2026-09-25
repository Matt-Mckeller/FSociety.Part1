"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { CharacterRefs, ControlDevice } from "../animation/useControlAnimation"
import type { ControllerPalette } from "../devices/ControllerSvg"

/**
 * VisionControlContext exposes the slot refs, device mode, palette,
 * and variant-specific overrides to every subcomponent of VisionControlCharacter.
 */
export interface VisionControlContextValue {
  refs: CharacterRefs
  device: ControlDevice
  gamification: boolean
  controllerPalette?: Partial<ControllerPalette>
  /** Overrides the ControllerSlot `bottom` CSS value. Default: "44%" (belly). */
  controllerPositionPct?: string
  /** Label shown in the XP toast. Default: "+40 XP". */
  xpLabel?: string
  /**
   * Brand-coupled "level up / interact" badge injected from the host app
   * (e.g. the brand-core `Achievement` pill). When omitted, OverlayLayer
   * falls back to the package-local, brand-neutral `LevelUpBadge`.
   */
  achievementSlot?: ReactNode
  /**
   * Brand-coupled coin-burst visual injected from the host app (e.g. the
   * brand-core coin sprites). When omitted, no coins render. Whatever node
   * is supplied must render its sprites with `[data-coin]` so the GSAP
   * burst animation on `refs.coinBurstRef` can target them.
   */
  coinBurstSlot?: ReactNode
}

const VisionControlContext = createContext<VisionControlContextValue | null>(null)

export function VisionControlProvider({
  value,
  children,
}: {
  value: VisionControlContextValue
  children: ReactNode
}) {
  return (
    <VisionControlContext.Provider value={value}>
      {children}
    </VisionControlContext.Provider>
  )
}

export function useVisionControl(): VisionControlContextValue {
  const ctx = useContext(VisionControlContext)
  if (!ctx) {
    throw new Error(
      "useVisionControl must be used inside <VisionControlProvider>",
    )
  }
  return ctx
}
