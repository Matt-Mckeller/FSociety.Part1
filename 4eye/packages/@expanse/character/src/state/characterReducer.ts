/**
 * Character Reducer — Platform-Neutral
 * ====================================
 * Pure reducer over {@link CharacterState}. No React, no rendering — runs
 * identically on web and native. Holds DISCRETE, declarative state only;
 * per-frame interpolation happens in the render loop, never here.
 */

import {
  DEFAULT_CHARACTER_PALETTE,
  DEFAULT_SHAPES,
  type CharacterAttachment,
  type CharacterEntitlement,
  type CharacterPalette,
  type CharacterShapes,
  type CharacterState,
  type CharacterVariant,
  type Emote,
  type EyeDesign,
  type HeadShape,
  type Mood,
  type Pose,
  type StrapStyle,
} from "../core"

/** Initial resting state: the classic round, friendly, neutral 4eye. */
export const initialCharacterState: CharacterState = {
  shapes: DEFAULT_SHAPES,
  palette: DEFAULT_CHARACTER_PALETTE,
  eyeDesign: "default",
  strapStyle: "default",
  variant: "friendly",
  mood: "neutral",
  pose: "standing",
  activeEmote: null,
  eyeGlowColor: null,
  targetYaw: 0,
  attachments: [],
  entitlement: { signedIn: false, age: null },
}

export type CharacterAction =
  | { type: "setShapes"; shapes: Partial<CharacterShapes> }
  | { type: "setHeadShape"; head: HeadShape }
  | { type: "setPalette"; palette: CharacterPalette }
  | { type: "setEyeDesign"; eyeDesign: EyeDesign }
  | { type: "setStrapStyle"; strapStyle: StrapStyle }
  | { type: "setVariant"; variant: CharacterVariant }
  | { type: "setMood"; mood: Mood }
  | { type: "setPose"; pose: Pose }
  | { type: "playEmote"; emote: Emote }
  | { type: "clearEmote" }
  | { type: "setEyeGlowColor"; color: string | null }
  | { type: "setTargetYaw"; yaw: number }
  | { type: "turnBy"; deltaYaw: number }
  | { type: "addAttachment"; attachment: CharacterAttachment }
  | { type: "removeAttachment"; id: string }
  | { type: "setEntitlement"; entitlement: CharacterEntitlement }
  | { type: "reset" }

export function characterReducer(
  state: CharacterState,
  action: CharacterAction,
): CharacterState {
  switch (action.type) {
    case "setShapes":
      return { ...state, shapes: { ...state.shapes, ...action.shapes } }
    case "setHeadShape":
      return { ...state, shapes: { ...state.shapes, head: action.head } }
    case "setPalette":
      return { ...state, palette: action.palette }
    case "setEyeDesign":
      return { ...state, eyeDesign: action.eyeDesign }
    case "setStrapStyle":
      return { ...state, strapStyle: action.strapStyle }
    case "setVariant":
      return { ...state, variant: action.variant }
    case "setMood":
      return { ...state, mood: action.mood }
    case "setPose":
      return { ...state, pose: action.pose }
    case "playEmote":
      return { ...state, activeEmote: action.emote }
    case "clearEmote":
      return { ...state, activeEmote: null }
    case "setEyeGlowColor":
      return { ...state, eyeGlowColor: action.color }
    case "setTargetYaw":
      return { ...state, targetYaw: normalizeYaw(action.yaw) }
    case "turnBy":
      return { ...state, targetYaw: normalizeYaw(state.targetYaw + action.deltaYaw) }
    case "addAttachment":
      return {
        ...state,
        attachments: [
          ...state.attachments.filter((a) => a.id !== action.attachment.id),
          action.attachment,
        ],
      }
    case "removeAttachment":
      return {
        ...state,
        attachments: state.attachments.filter((a) => a.id !== action.id),
      }
    case "setEntitlement":
      return { ...state, entitlement: action.entitlement }
    case "reset":
      return initialCharacterState
    default:
      return state
  }
}

/** Keep yaw in a stable, readable range (0–360, exclusive of 360). */
function normalizeYaw(yaw: number): number {
  const wrapped = yaw % 360
  return wrapped < 0 ? wrapped + 360 : wrapped
}
