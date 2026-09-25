"use client"

import { useMemo, useRef, type KeyboardEvent, type ReactNode } from "react"
import { CharacterLayer } from "./CharacterLayer"
import { DeviceLayer } from "./DeviceLayer"
import { OverlayLayer } from "./OverlayLayer"
import { usePulse } from "./pulse/BrainStripPulseContext"
import { useControlAnimation } from "./animation/useControlAnimation"
import type {
  CharacterRefs,
  ControlDevice,
  AnimationVariant,
} from "./animation/useControlAnimation"
import type {
  ControllerSvgHandle,
  ControllerPalette,
} from "./devices/ControllerSvg"
import {
  VisionControlProvider,
  type VisionControlContextValue,
} from "./context/VisionControlContext"
import {
  CharacterStage,
  VisionControlContainer,
} from "./styled/visionControlStyled"

export type { ControlDevice } from "./animation/useControlAnimation"

export interface VisionControlCharacterProps {
  device?: ControlDevice
  gamification?: boolean
  wireToBrainStrip?: boolean
  chipRail?: boolean
  controllerPalette?: Partial<ControllerPalette>
  /** @deprecated full body is the only mode now; kept for back-compat */
  showFullBody?: boolean
  /** Which animation personality to play on mount + reaction. */
  animationVariant?: AnimationVariant
  /** Overrides the controller's `bottom` position (e.g. "60%" for raised). */
  controllerPositionPct?: string
  /** Label shown in the XP toast (e.g. "+100 XP"). */
  xpLabel?: string
  /**
   * Brand-coupled "interact / level up" badge rendered above the head.
   * Inject the host app's brand visual here (e.g. brand-core `Achievement`).
   * Falls back to a brand-neutral `LevelUpBadge` when omitted.
   */
  achievementSlot?: ReactNode
  /**
   * Brand-coupled coin-burst visual (controller reaction). Inject the host
   * app's brand coins here; the node must render `[data-coin]` sprites so the
   * GSAP burst can target them. No coins render when omitted.
   */
  coinBurstSlot?: ReactNode
}


/**
 * VisionControlCharacter — hero figure for the Control slide.
 *
 * Composition:
 *   - VisionControlProvider exposes refs/device/palette to layer subcomponents.
 *   - CharacterStage is the positioned wrapper (tall narrow box).
 *   - CharacterLayer renders the 4eye SVG at natural aspect, head-pinned-top,
 *     so the feet sit on the stage's bottom edge and the figure visually
 *     stands on whatever sits below (the BrainWiringStrip in the live slide).
 *   - DeviceLayer renders the controller (belly) and/or watch (wrist).
 *   - OverlayLayer renders gamification badges, bolts, coin bursts, XP toasts.
 *
 * Animation is fully delegated to `useControlAnimation`.
 */
export function VisionControlCharacter({
  device = "controller",
  gamification = true,
  wireToBrainStrip = true,
  chipRail = true,
  controllerPalette,
  animationVariant,
  controllerPositionPct,
  xpLabel,
  achievementSlot,
  coinBurstSlot,
}: VisionControlCharacterProps) {
  const refs = useCharacterRefs()
  const playReaction = useReactionDriver({
    refs,
    device,
    gamification,
    wireToBrainStrip,
    animationVariant,
  })
  const contextValue = useMemo<VisionControlContextValue>(
    () => ({ refs, device, gamification, controllerPalette, controllerPositionPct, xpLabel, achievementSlot, coinBurstSlot }),
    [refs, device, gamification, controllerPalette, controllerPositionPct, xpLabel, achievementSlot, coinBurstSlot],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      playReaction()
    }
  }

  const ariaLabel =
    device === "watch"
      ? "4eye character checks the watch — hover or click for a reaction"
      : "4eye character holds the Mind Controller — hover or click to combo"

  return (
    <VisionControlProvider value={contextValue}>
      <VisionControlContainer>
        <CharacterStage
          ref={refs.wrapRef}
          role="button"
          tabIndex={0}
          aria-label={ariaLabel}
          onMouseEnter={playReaction}
          onClick={playReaction}
          onKeyDown={handleKeyDown}
        >
          <CharacterLayer />
          <DeviceLayer />
          <OverlayLayer />
        </CharacterStage>
      </VisionControlContainer>
    </VisionControlProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Hook: useCharacterRefs
// Allocates and bundles all DOM refs the animation pipeline drives.
// ─────────────────────────────────────────────────────────────────────

function useCharacterRefs(): CharacterRefs {
  const wrapRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const watchRef = useRef<HTMLDivElement>(null)
  const shockRef = useRef<HTMLDivElement>(null)
  const levelUpRef = useRef<HTMLDivElement>(null)
  const xpToastRef = useRef<HTMLDivElement>(null)
  const coinBurstRef = useRef<HTMLDivElement>(null)
  const boltRef = useRef<HTMLDivElement>(null)
  const eyelidRef = useRef<HTMLDivElement>(null)
  const controllerSvgRef = useRef<ControllerSvgHandle>(null)

  return {
    wrapRef,
    headRef,
    deviceRef,
    watchRef,
    shockRef,
    levelUpRef,
    xpToastRef,
    coinBurstRef,
    boltRef,
    eyelidRef,
    controllerSvgRef,
  }
}

// ─────────────────────────────────────────────────────────────────────
// Hook: useReactionDriver
// Wires `useControlAnimation` up with a pulse emitter that optionally
// notifies the BrainWiringStrip when a controller button is pressed.
// Returns the `playReaction` callback to attach to hover/click/key handlers.
// ─────────────────────────────────────────────────────────────────────

interface UseReactionDriverArgs {
  refs: CharacterRefs
  device: ControlDevice
  gamification: boolean
  wireToBrainStrip: boolean
  animationVariant?: AnimationVariant
}

function useReactionDriver({
  refs,
  device,
  gamification,
  wireToBrainStrip,
  animationVariant,
}: UseReactionDriverArgs) {
  const pulse = usePulse()
  const emitPulse = (nodeIndex: number) => {
    if (wireToBrainStrip) pulse(nodeIndex)
  }

  const { playReaction } = useControlAnimation({
    refs,
    device,
    gamification,
    emitPulse,
    animationVariant,
  })

  return playReaction
}
