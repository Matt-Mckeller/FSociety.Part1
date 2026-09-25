/**
 * Reaction timelines — pure GSAP choreography for each character
 * reaction.
 *
 * These modules deliberately know nothing about React, refs, mood
 * state, or the anatomy registry. They take already-resolved SVG parts
 * and an open `gsap.Context`, build a timeline inside the context, and
 * return it. The orchestrator hook (`useCharacterReactions`) handles
 * resolution, busy flags, mood transitions, and idle-bob coordination.
 *
 * Splitting this way keeps the hook readable as an *orchestrator* (one
 * page of bookkeeping) while letting each reaction's choreography live
 * in its own file where it can be edited or reviewed without scrolling
 * through unrelated state plumbing.
 */

// Naming: each timeline maps to one of the three named "4eye" personas.
//   • Select 4eye   — friendly hover acknowledgement (raise & wave arm)
//   • Anxious 4eye  — startled click reaction (squash + arm flair)
//   • Excited 4eye  — headline celebration (V-pose hop + arm gag)

export { buildSelectTimeline } from "./selectTimeline"
export type { BuildSelectTimelineParams } from "./selectTimeline"

export { buildAnxiousTimeline } from "./anxiousTimeline"
export type { BuildAnxiousTimelineParams } from "./anxiousTimeline"

export { buildExcitedTimeline } from "./excitedTimeline"
export type { BuildExcitedTimelineParams } from "./excitedTimeline"
