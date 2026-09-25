/**
 * Select 4eye reaction timeline (formerly "wave").
 *
 * The friendly hover acknowledgement: the right arm raises, oscillates
 * between -70° and -100° four times, then drops back. The head tilts
 * -4° in sympathy and the antenna jiggles for the duration of the
 * gesture. Reads as "Hi, I see you" — used for hover/focus selection
 * cues.
 *
 * Required parts: `rightArm`. `head` and `antenna` are optional flair —
 * the timeline still reads correctly without them.
 */

import gsap from "gsap"

export interface BuildSelectTimelineParams {
  /** Required — the arm that does the waving. */
  rightArm: SVGPathElement
  /** Optional sympathy tilt; skipped when not provided. */
  head?: SVGCircleElement | null
  /** Optional jiggle; skipped when not provided. */
  antenna?: SVGGElement | null
  /** Called when the timeline finishes (success path only). */
  onComplete: () => void
}

export function buildSelectTimeline({
  rightArm,
  head,
  antenna,
  onComplete,
}: BuildSelectTimelineParams): gsap.core.Timeline {
  // Set transform origins before the timeline runs so the first tween
  // doesn't snap. `fill-box` keeps SVG transforms relative to the
  // element's own bbox rather than the parent SVG viewport.
  gsap.set(rightArm, { transformOrigin: "top center", transformBox: "fill-box" })
  if (head) gsap.set(head, { transformOrigin: "center center", transformBox: "fill-box" })
  if (antenna) gsap.set(antenna, { transformOrigin: "bottom center", transformBox: "fill-box" })

  const tl = gsap.timeline({ onComplete })

  tl.to(rightArm, { rotate: -85, duration: 0.22, ease: "power2.out" }, 0)
  tl.to(rightArm, { rotate: -70, duration: 0.18, ease: "sine.inOut" })
  tl.to(rightArm, { rotate: -100, duration: 0.18, ease: "sine.inOut" })
  tl.to(rightArm, { rotate: -70, duration: 0.18, ease: "sine.inOut" })
  tl.to(rightArm, { rotate: -100, duration: 0.18, ease: "sine.inOut" })
  tl.to(rightArm, { rotate: 0, duration: 0.18, ease: "power2.in" })

  if (head) {
    tl.to(head, { rotate: -4, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0)
  }
  if (antenna) {
    tl.to(
      antenna,
      { rotate: 10, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 5 },
      0,
    )
  }

  return tl
}
