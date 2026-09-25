/**
 * Tests for animation type definitions.
 * Validates type structure and default values.
 */

import { describe, it, expect } from "vitest"
import type {
  CelebrationConfig,
  ArmAnimationMode,
} from '../types'
import type { CharacterPose, PoseId } from '../poses'
import type {
  LimbPoints,
  LegPoints,
  Point2D,
  ArcPoint,
} from '../../geometry/points'

describe('Animation Types', () => {
  describe('CelebrationConfig', () => {
    it('should allow empty config (all optional)', () => {
      const config: CelebrationConfig = {}
      expect(config).toBeDefined()
    })

    it('should allow partial config with jumpHeight', () => {
      const config: CelebrationConfig = {
        jumpHeight: 100,
      }
      expect(config.jumpHeight).toBe(100)
    })

    it('should allow partial config with duration', () => {
      const config: CelebrationConfig = {
        duration: 2.0,
      }
      expect(config.duration).toBe(2.0)
    })

    it('should allow partial config with includeAnticipation', () => {
      const config: CelebrationConfig = {
        includeAnticipation: false,
      }
      expect(config.includeAnticipation).toBe(false)
    })

    it('should allow partial config with bounces', () => {
      const config: CelebrationConfig = {
        bounces: 3,
      }
      expect(config.bounces).toBe(3)
    })

    it('should allow full config', () => {
      const config: CelebrationConfig = {
        jumpHeight: 80,
        duration: 1.5,
        includeAnticipation: true,
        bounces: 2,
      }
      
      expect(config.jumpHeight).toBe(80)
      expect(config.duration).toBe(1.5)
      expect(config.includeAnticipation).toBe(true)
      expect(config.bounces).toBe(2)
    })
  })

  describe('ArmAnimationMode', () => {
    it('should accept "hands" value', () => {
      const mode: ArmAnimationMode = 'hands'
      expect(mode).toBe('hands')
    })

    it('should accept "effort" value', () => {
      const mode: ArmAnimationMode = 'effort'
      expect(mode).toBe('effort')
    })

    it('should accept "none" value', () => {
      const mode: ArmAnimationMode = 'none'
      expect(mode).toBe('none')
    })
  })

  describe('PoseId', () => {
    it('should include celebration poses', () => {
      const celebrationAnticipation: PoseId = 'celebrationAnticipation'
      const celebrationApex: PoseId = 'celebrationApex'
      const celebration: PoseId = 'celebration'
      
      expect(celebrationAnticipation).toBe('celebrationAnticipation')
      expect(celebrationApex).toBe('celebrationApex')
      expect(celebration).toBe('celebration')
    })

    it('should include pushing poses', () => {
      const pushing: PoseId = 'pushingRight'
      const handsUp: PoseId = 'pushingRightHandsUp'
      const handsDown: PoseId = 'pushingRightHandsDown'
      
      expect(pushing).toBe('pushingRight')
      expect(handsUp).toBe('pushingRightHandsUp')
      expect(handsDown).toBe('pushingRightHandsDown')
    })
  })

  describe('Point2D', () => {
    it('should have x and y properties', () => {
      const point: Point2D = { x: 10, y: 20 }
      
      expect(point.x).toBe(10)
      expect(point.y).toBe(20)
    })
  })

  describe('ArcPoint', () => {
    it('should extend Point2D with optional arc properties', () => {
      const point: ArcPoint = {
        x: 10,
        y: 20,
        arcRadius: 30,
        arcSweepFlag: 1,
        arcLargeFlag: 0,
      }
      
      expect(point.x).toBe(10)
      expect(point.y).toBe(20)
      expect(point.arcRadius).toBe(30)
      expect(point.arcSweepFlag).toBe(1)
      expect(point.arcLargeFlag).toBe(0)
    })

    it('should allow arc properties to be undefined', () => {
      const point: ArcPoint = { x: 10, y: 20 }
      
      expect(point.arcRadius).toBeUndefined()
      expect(point.arcSweepFlag).toBeUndefined()
      expect(point.arcLargeFlag).toBeUndefined()
    })
  })

  describe('LimbPoints', () => {
    it('should be a tuple of 3 Point2D', () => {
      const limb: LimbPoints = [
        { x: 0, y: 0 },
        { x: 10, y: 10 },
        { x: 20, y: 20 },
      ]
      
      expect(limb).toHaveLength(3)
      expect(limb[0].x).toBe(0)
      expect(limb[1].x).toBe(10)
      expect(limb[2].x).toBe(20)
    })
  })

  describe('LegPoints', () => {
    it('should be a tuple of 3 ArcPoints', () => {
      const leg: LegPoints = [
        { x: 0, y: 0 },
        { x: 10, y: 10, arcRadius: 30, arcSweepFlag: 1, arcLargeFlag: 0 },
        { x: 20, y: 20, arcRadius: 30, arcSweepFlag: 1, arcLargeFlag: 0 },
      ]
      
      expect(leg).toHaveLength(3)
      expect(leg[1].arcRadius).toBe(30)
      expect(leg[1].arcSweepFlag).toBe(1)
    })
  })

  describe('CharacterPose', () => {
    it('should have all required body parts', () => {
      const pose: CharacterPose = {
        head: { x: 50, y: 20 },
        body: [
          { x: 50, y: 30 },
          { x: 50, y: 60 },
          { x: 50, y: 90 },
        ],
        leftArm: [
          { x: 40, y: 30 },
          { x: 35, y: 50 },
          { x: 30, y: 70 },
        ],
        rightArm: [
          { x: 60, y: 30 },
          { x: 65, y: 50 },
          { x: 70, y: 70 },
        ],
        leftLeg: [
          { x: 45, y: 90 },
          { x: 40, y: 120, arcRadius: 30, arcSweepFlag: 1, arcLargeFlag: 0 },
          { x: 45, y: 150, arcRadius: 30, arcSweepFlag: 1, arcLargeFlag: 0 },
        ],
        rightLeg: [
          { x: 55, y: 90 },
          { x: 60, y: 120, arcRadius: 30, arcSweepFlag: 0, arcLargeFlag: 0 },
          { x: 55, y: 150, arcRadius: 30, arcSweepFlag: 0, arcLargeFlag: 0 },
        ],
      }
      
      expect(pose.head).toBeDefined()
      expect(pose.body).toHaveLength(3)
      expect(pose.leftArm).toHaveLength(3)
      expect(pose.rightArm).toHaveLength(3)
      expect(pose.leftLeg).toHaveLength(3)
      expect(pose.rightLeg).toHaveLength(3)
    })
  })
})
