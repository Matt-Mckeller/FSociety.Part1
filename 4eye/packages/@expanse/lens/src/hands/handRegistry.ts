"use client"

import type { ComponentType } from "react"
import type { HandPoseId, LensShellId, LensShellProps } from "../core/types"
import { OpenPalmPose } from "./poses/OpenPalmPose"
import { FistPose } from "./poses/FistPose"
import { PointPose } from "./poses/PointPose"
import { PeacePose } from "./poses/PeacePose"
import { PinchPose } from "./poses/PinchPose"
import { WavePose } from "./poses/WavePose"
import { ClaspPose } from "./poses/ClaspPose"
import { HeartPose } from "./poses/HeartPose"
import { FramePose } from "./poses/FramePose"
import { ThumbsUpPose } from "./poses/ThumbsUpPose"
import { SnapPose } from "./poses/SnapPose"
import { CupPose } from "./poses/CupPose"

/** Maps every hand pose id to its animated React component. */
export const HAND_POSE_COMPONENTS: Record<HandPoseId, ComponentType<LensShellProps>> = {
  "open-palm": OpenPalmPose,
  fist: FistPose,
  point: PointPose,
  peace: PeacePose,
  pinch: PinchPose,
  wave: WavePose,
  clasp: ClaspPose,
  heart: HeartPose,
  frame: FramePose,
  "thumbs-up": ThumbsUpPose,
  snap: SnapPose,
  cup: CupPose,
}

/** Look up a hand pose component by id (falls back to open-palm). */
export function handPoseComponent(id: HandPoseId): ComponentType<LensShellProps> {
  return HAND_POSE_COMPONENTS[id] ?? OpenPalmPose
}

/**
 * Default hand pose for each shell — used in "hands" icon mode when a lens
 * doesn't declare its own `handPose` override.
 */
export const HAND_POSE_BY_SHELL: Record<LensShellId, HandPoseId> = {
  aperture: "frame",
  scanner: "point",
  "ring-pulse": "wave",
  orbit: "cup",
  prism: "open-palm",
  reticle: "pinch",
  wave: "wave",
  shield: "fist",
  growth: "thumbs-up",
  link: "clasp",
  spiral: "snap",
  bloom: "heart",
  condense: "pinch",
  eye: "frame",
  beacon: "point",
  converge: "cup",
  voice: "wave",
}
