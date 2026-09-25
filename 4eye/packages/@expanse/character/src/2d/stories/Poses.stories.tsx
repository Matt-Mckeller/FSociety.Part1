/**
 * Character Poses Gallery
 *
 * Poses are data, not components: every named pose lives in the
 * `POSES` registry (see `../animation/poseRegistry`). This gallery
 * renders each registry entry statically via `AnimatedCharacter`.
 */
import type { Meta, StoryObj } from "@storybook/react"
import { AnimatedCharacter } from "../animation/AnimatedCharacter"
import { POSES } from "../animation/poseRegistry"
import type { CharacterAnimationState } from "../animation/types"
import type { PoseId, CharacterPose } from "../animation/poses"

/** Build a static (non-transitioning) animation state from a pose snapshot. */
function toAnimationState(
  id: PoseId,
  pose: CharacterPose,
): CharacterAnimationState {
  return {
    head: pose.head,
    body: pose.body,
    leftArm: pose.leftArm,
    rightArm: pose.rightArm,
    leftLeg: pose.leftLeg,
    rightLeg: pose.rightLeg,
    currentPose: id,
    isTransitioning: false,
    activeSecondaryAnimations: [],
  }
}

const POSE_IDS = Object.keys(POSES) as PoseId[]

const meta: Meta = {
  title: "Character/2D/4eye/Poses",
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#ffffff",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

// =====================
// All Poses Gallery
// =====================

export const AllPoses: StoryObj = {
  name: "All Poses (registry)",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "2rem",
        alignItems: "end",
      }}
    >
      {POSE_IDS.map((id) => (
        <div key={id} style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <AnimatedCharacter
              animationState={toAnimationState(id, POSES[id])}
            />
          </div>
          <span style={{ color: "#888", fontSize: "12px" }}>{id}</span>
        </div>
      ))}
    </div>
  ),
}
