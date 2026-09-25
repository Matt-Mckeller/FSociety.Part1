"use client"

import type { ComponentType } from "react"
import type { LensShellId, LensShellProps } from "../core/types"
import { ApertureShell } from "./ApertureShell"
import { ScannerShell } from "./ScannerShell"
import { RingPulseShell } from "./RingPulseShell"
import { OrbitShell } from "./OrbitShell"
import { PrismShell } from "./PrismShell"
import { ReticleShell } from "./ReticleShell"
import { WaveShell } from "./WaveShell"
import { ShieldShell } from "./ShieldShell"
import { GrowthShell } from "./GrowthShell"
import { LinkShell } from "./LinkShell"
import { SpiralShell } from "./SpiralShell"
import { BloomShell } from "./BloomShell"
import { CondenseShell } from "./CondenseShell"
import { EyeShell } from "./EyeShell"
import { BeaconShell } from "./BeaconShell"
import { ConvergeShell } from "./ConvergeShell"
import { VoiceShell } from "./VoiceShell"

/** Maps every shell id to its animated React component. */
export const SHELL_COMPONENTS: Record<LensShellId, ComponentType<LensShellProps>> = {
  aperture: ApertureShell,
  scanner: ScannerShell,
  "ring-pulse": RingPulseShell,
  orbit: OrbitShell,
  prism: PrismShell,
  reticle: ReticleShell,
  wave: WaveShell,
  shield: ShieldShell,
  growth: GrowthShell,
  link: LinkShell,
  spiral: SpiralShell,
  bloom: BloomShell,
  condense: CondenseShell,
  eye: EyeShell,
  beacon: BeaconShell,
  converge: ConvergeShell,
  voice: VoiceShell,
}

/** Look up a shell component by id (falls back to aperture). */
export function shellComponent(id: LensShellId): ComponentType<LensShellProps> {
  return SHELL_COMPONENTS[id] ?? ApertureShell
}
