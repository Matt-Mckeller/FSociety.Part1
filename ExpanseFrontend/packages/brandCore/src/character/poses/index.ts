/**
 * Character Poses
 *
 * Named pose components - each represents a specific
 * body position the character can assume.
 *
 * These are the "primitives" or "frames" - specific snapshots
 * that can be used statically or as keyframes in animations.
 */

// Forward-facing poses
export { CharacterForwardStanding } from "./CharacterForwardStanding"
export type { CharacterForwardStandingProps } from "./CharacterForwardStanding"

// Side-facing poses
export { CharacterLeftStanding } from "./CharacterLeftStanding"
export { CharacterRightStanding } from "./CharacterRightStanding"
export type { CharacterSideStandingProps } from "./CharacterLeftStanding"

// Celebration poses
export { CharacterCelebration1 } from "./CharacterCelebration1"
export { CharacterCelebration2 } from "./CharacterCelebration2"
export type { CharacterCelebrationProps } from "./CharacterCelebration1"

// Animated character (renders current animation state)
export { CharacterAll } from "./CharacterAll"

// Character variants
export { Character4eye } from "./Character4eye"
export type { Character4eyeProps, Character4eyeVariant } from "./Character4eye"

// Contact/support variants
export { ContactUsCharacter } from "./ContactUsCharacter"
export type { ContactUsCharacterProps } from "./ContactUsCharacter"
export { ContactUsCharacterUnified } from "./ContactUsCharacterUnified"
export type { ContactUsCharacterUnifiedProps } from "./ContactUsCharacterUnified"
