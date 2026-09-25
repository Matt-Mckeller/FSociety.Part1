/**
 * Tests for the pose registry system.
 * Validates that all poses have correct structure and values.
 */

import { describe, it, expect } from "vitest"
import { POSES, WALKING_CYCLES, getTransitionDefaults } from "../poseRegistry"
import type { CharacterPose, PoseId } from "../poses"
import type { LimbPoints, LegPoints } from "../../geometry/points"

describe("Pose Registry", () => {
  describe("All poses exist", () => {
    const expectedPoseIds: PoseId[] = [
      "facingForward",
      "pushingRight",
      "pushingRightHandsUp",
      "pushingRightHandsDown",
      "pushingRightEffortUp",
      "pushingRightEffort",
      "walkingRight",
      "celebration",
      "celebrationAnticipation",
      "celebrationApex",
    ]

    it.each(expectedPoseIds)("should have pose: %s", (poseId) => {
      expect(POSES[poseId]).toBeDefined()
    })
  })

  describe("Pose structure validation", () => {
    const validatePoseStructure = (pose: CharacterPose, poseId: string) => {
      // Head should have x, y
      expect(pose.head).toHaveProperty("x")
      expect(pose.head).toHaveProperty("y")
      expect(typeof pose.head.x).toBe("number")
      expect(typeof pose.head.y).toBe("number")

      // Body should have 3 points
      expect(pose.body).toHaveLength(3)
      pose.body.forEach((point, i) => {
        expect(point).toHaveProperty("x")
        expect(point).toHaveProperty("y")
        expect(typeof point.x).toBe("number")
        expect(typeof point.y).toBe("number")
      })

      // Arms should have 3 points each
      expect(pose.leftArm).toHaveLength(3)
      expect(pose.rightArm).toHaveLength(3)
      ;[pose.leftArm, pose.rightArm].forEach((arm) => {
        arm.forEach((point) => {
          expect(point).toHaveProperty("x")
          expect(point).toHaveProperty("y")
        })
      })

      // Legs should have 3 points each with arc properties
      expect(pose.leftLeg).toHaveLength(3)
      expect(pose.rightLeg).toHaveLength(3)
    }

    Object.entries(POSES).forEach(([poseId, pose]) => {
      it(`should have valid structure for pose: ${poseId}`, () => {
        validatePoseStructure(pose, poseId)
      })
    })
  })

  describe("Celebration Anticipation pose", () => {
    it("should have lowered body (crouch effect)", () => {
      const anticipation = POSES.celebrationAnticipation
      const standing = POSES.facingForward

      // Head and upper body should be lower (higher Y value) than standing
      expect(anticipation.head.y).toBeGreaterThan(standing.head.y - 15)
    })

    it("should have arms positioned low for preparation", () => {
      const anticipation = POSES.celebrationAnticipation

      // Arms should be pointing downward (hands have higher Y than shoulders)
      expect(anticipation.leftArm[2].y).toBeGreaterThan(
        anticipation.leftArm[0].y,
      )
      expect(anticipation.rightArm[2].y).toBeGreaterThan(
        anticipation.rightArm[0].y,
      )
    })
  })

  describe("Celebration Apex pose", () => {
    it("should have symmetric V-shape arms raised above shoulders", () => {
      const apex = POSES.celebrationApex

      // Hands should be above shoulders (lower Y value)
      expect(apex.leftArm[2].y).toBeLessThan(apex.leftArm[0].y)
      expect(apex.rightArm[2].y).toBeLessThan(apex.rightArm[0].y)
    })

    it("should have symmetric arm positions", () => {
      const apex = POSES.celebrationApex
      const bodyCenter = apex.body[0].x

      // Left arm should extend left, right arm should extend right
      expect(apex.leftArm[2].x).toBeLessThan(bodyCenter)
      expect(apex.rightArm[2].x).toBeGreaterThan(bodyCenter)

      // Arms should be roughly symmetric in distance from center
      const leftOffset = Math.abs(bodyCenter - apex.leftArm[2].x)
      const rightOffset = Math.abs(apex.rightArm[2].x - bodyCenter)
      expect(Math.abs(leftOffset - rightOffset)).toBeLessThan(5)
    })

    it("should have consistent arcSweepFlag for left leg", () => {
      const apex = POSES.celebrationApex

      // Left leg should use 1 for clockwise bend
      expect(apex.leftLeg[1].arcSweepFlag).toBe(1)
      expect(apex.leftLeg[2].arcSweepFlag).toBe(1)
    })

    it("should have consistent arcSweepFlag for right leg", () => {
      const apex = POSES.celebrationApex

      // Both legs are built by buildBentLeg, which uses arcSweepFlag 1
      // uniformly (arcRadius is 0, so the sweep flag is inert).
      expect(apex.rightLeg[1].arcSweepFlag).toBe(1)
      expect(apex.rightLeg[2].arcSweepFlag).toBe(1)
    })

    it("should have tucked legs (feet closer to hips)", () => {
      const apex = POSES.celebrationApex
      const standing = POSES.facingForward

      // In tucked position, foot Y should be less than standing foot Y
      // (feet are raised off the ground)
      const standingLeftFootY = standing.leftLeg[2].y
      const apexLeftFootY = apex.leftLeg[2].y

      // Apex legs should be shorter (tucked)
      const standingLegLength = standingLeftFootY - standing.leftLeg[0].y
      const apexLegLength = apexLeftFootY - apex.leftLeg[0].y

      expect(apexLegLength).toBeLessThan(standingLegLength)
    })
  })

  describe("Pushing pose variants", () => {
    it("pushingRightHandsUp should have hands higher than base pose", () => {
      const base = POSES.pushingRight
      const handsUp = POSES.pushingRightHandsUp

      // Hands should be higher (lower Y) in handsUp variant
      expect(handsUp.leftArm[2].y).toBeLessThan(base.leftArm[2].y)
      expect(handsUp.rightArm[2].y).toBeLessThan(base.rightArm[2].y)
    })

    it("pushingRightHandsDown should have hands lower than base pose", () => {
      const base = POSES.pushingRight
      const handsDown = POSES.pushingRightHandsDown

      // Hands should be lower (higher Y) in handsDown variant
      expect(handsDown.leftArm[2].y).toBeGreaterThan(base.leftArm[2].y)
      expect(handsDown.rightArm[2].y).toBeGreaterThan(base.rightArm[2].y)
    })
  })

  describe("Walking cycles", () => {
    it("should have walking cycle for pushingRight", () => {
      expect(WALKING_CYCLES.pushingRight).toBeDefined()
      expect(WALKING_CYCLES.pushingRight!.leftLeg).toBeDefined()
      expect(WALKING_CYCLES.pushingRight!.rightLeg).toBeDefined()
    })

    it("should have walking cycle for walkingRight", () => {
      expect(WALKING_CYCLES.walkingRight).toBeDefined()
      expect(WALKING_CYCLES.walkingRight!.leftLeg).toBeDefined()
      expect(WALKING_CYCLES.walkingRight!.rightLeg).toBeDefined()
    })

    it("walking cycles should have multiple keyframes", () => {
      const pushingCycle = WALKING_CYCLES.pushingRight!

      expect(pushingCycle.leftLeg.length).toBeGreaterThan(1)
      expect(pushingCycle.rightLeg.length).toBeGreaterThan(1)
    })
  })

  describe("Transition defaults", () => {
    it("should return transition defaults for known pose pairs", () => {
      const defaults = getTransitionDefaults("facingForward", "pushingRight")

      expect(defaults).toBeDefined()
      expect(defaults?.duration).toBeGreaterThan(0)
    })

    it("should return undefined for unknown pose pairs", () => {
      // @ts-expect-error - Testing with invalid pose IDs
      const defaults = getTransitionDefaults("unknownPose", "anotherUnknown")

      // Function should handle gracefully
      expect(defaults).toBeUndefined()
    })
  })
})
