/**
 * PushingProgress Animation Presets
 *
 * Named configurations for different animation feels.
 * Each preset defines timing and behavior for all phases:
 * push, walk, and celebration.
 */

import { PushingMood, CelebrationConfig } from "./animation/types"

// ============================================================================
// TYPES
// ============================================================================

export interface PushPhaseConfig {
  /** Emotional mood during push - affects body language and secondary animations */
  mood: PushingMood
  /** Duration per progress unit (seconds per 1% progress) */
  speedFactor: number
  /** Walking leg cycle speed in seconds */
  walkingSpeed: number
  /** Ease for push motion */
  ease: string
}

export interface WalkPhaseConfig {
  /** Walking speed (seconds per cycle) */
  walkingSpeed: number
  /** Duration of walk phase in seconds */
  duration: number
  /** Distance to walk past the bar */
  distance: number
}

export interface CelebrationPhaseConfig extends Required<CelebrationConfig> {
  /** Ease for jump up */
  jumpEase: string
  /** Ease for fall down */
  fallEase: string
}

export interface PushingProgressPreset {
  name: string
  description: string
  push: PushPhaseConfig
  walk: WalkPhaseConfig
  celebration: CelebrationPhaseConfig
  /** Transition durations between phases */
  transitions: {
    toPush: number
    toWalk: number
    toCelebration: number
  }
}

// ============================================================================
// PRESETS
// ============================================================================

export const PRESETS: Record<string, PushingProgressPreset> = {
  /**
   * Default balanced preset - good for most use cases
   */
  default: {
    name: "default",
    description: "Balanced animation with steady, confident mood",
    push: {
      mood: "steady",
      speedFactor: 0.02,
      walkingSpeed: 0.8,
      ease: "none",
    },
    walk: {
      walkingSpeed: 0.5,
      duration: 1.0,
      distance: 20,
    },
    celebration: {
      jumpHeight: 71,
      duration: 1.0,
      includeAnticipation: true,
      bounces: 1,
      jumpEase: "power2.out",
      fallEase: "power2.in",
    },
    transitions: {
      toPush: 0.4,
      toWalk: 0.3,
      toCelebration: 0.3,
    },
  },

  /**
   * Effort preset - character works hard to push
   */
  effort: {
    name: "effort",
    description: "Character struggles with visible effort",
    push: {
      mood: "struggling",
      speedFactor: 0.025,
      walkingSpeed: 0.9,
      ease: "none",
    },
    walk: {
      walkingSpeed: 0.5,
      duration: 0.8,
      distance: 18,
    },
    celebration: {
      jumpHeight: 80,
      duration: 1.2,
      includeAnticipation: true,
      bounces: 1,
      jumpEase: "power3.out",
      fallEase: "power2.in",
    },
    transitions: {
      toPush: 0.5,
      toWalk: 0.35,
      toCelebration: 0.35,
    },
  },

  /**
   * Smooth preset - elegant, flowing motion
   */
  smooth: {
    name: "smooth",
    description: "Slow, casual pace with relaxed body language",
    push: {
      mood: "casual",
      speedFactor: 0.03,
      walkingSpeed: 1.0,
      ease: "power1.inOut",
    },
    walk: {
      walkingSpeed: 0.7,
      duration: 1.5,
      distance: 25,
    },
    celebration: {
      jumpHeight: 50,
      duration: 1.4,
      includeAnticipation: true,
      bounces: 0,
      jumpEase: "sine.out",
      fallEase: "sine.in",
    },
    transitions: {
      toPush: 0.6,
      toWalk: 0.5,
      toCelebration: 0.4,
    },
  },

  /**
   * Bouncy preset - energetic, playful animation
   */
  bouncy: {
    name: "bouncy",
    description: "Eager, energetic motion with playful bounce",
    push: {
      mood: "eager",
      speedFactor: 0.015,
      walkingSpeed: 0.6,
      ease: "none",
    },
    walk: {
      walkingSpeed: 0.4,
      duration: 0.7,
      distance: 15,
    },
    celebration: {
      jumpHeight: 100,
      duration: 1.3,
      includeAnticipation: true,
      bounces: 2,
      jumpEase: "back.out(1.7)",
      fallEase: "bounce.out",
    },
    transitions: {
      toPush: 0.3,
      toWalk: 0.25,
      toCelebration: 0.25,
    },
  },

  /**
   * Quick preset - fast progression, minimal flourish
   */
  quick: {
    name: "quick",
    description: "Determined, focused push with fast progression",
    push: {
      mood: "determined",
      speedFactor: 0.01,
      walkingSpeed: 0.5,
      ease: "none",
    },
    walk: {
      walkingSpeed: 0.35,
      duration: 0.5,
      distance: 12,
    },
    celebration: {
      jumpHeight: 40,
      duration: 0.6,
      includeAnticipation: false,
      bounces: 0,
      jumpEase: "power2.out",
      fallEase: "power2.in",
    },
    transitions: {
      toPush: 0.25,
      toWalk: 0.2,
      toCelebration: 0.2,
    },
  },

  /**
   * Dramatic preset - slow push, big celebration
   */
  dramatic: {
    name: "dramatic",
    description: "Slow, struggling push with dramatic celebration",
    push: {
      mood: "struggling",
      speedFactor: 0.04,
      walkingSpeed: 1.1,
      ease: "power1.in",
    },
    walk: {
      walkingSpeed: 0.8,
      duration: 1.2,
      distance: 22,
    },
    celebration: {
      jumpHeight: 120,
      duration: 1.8,
      includeAnticipation: true,
      bounces: 2,
      jumpEase: "power4.out",
      fallEase: "bounce.out",
    },
    transitions: {
      toPush: 0.7,
      toWalk: 0.5,
      toCelebration: 0.5,
    },
  },
}

// ============================================================================
// UTILITIES
// ============================================================================

/** Get a preset by name, falling back to default */
export function getPreset(name: string): PushingProgressPreset {
  return PRESETS[name] ?? PRESETS.default
}

/** List all available preset names */
export function getPresetNames(): string[] {
  return Object.keys(PRESETS)
}

/** Create a custom preset by merging with base */
export function createPreset(
  base: string | PushingProgressPreset,
  overrides: Partial<PushingProgressPreset>,
): PushingProgressPreset {
  const basePreset = typeof base === "string" ? getPreset(base) : base
  return {
    ...basePreset,
    ...overrides,
    push: { ...basePreset.push, ...overrides.push },
    walk: { ...basePreset.walk, ...overrides.walk },
    celebration: { ...basePreset.celebration, ...overrides.celebration },
    transitions: { ...basePreset.transitions, ...overrides.transitions },
  }
}

/** Default export for convenience */
export default PRESETS
