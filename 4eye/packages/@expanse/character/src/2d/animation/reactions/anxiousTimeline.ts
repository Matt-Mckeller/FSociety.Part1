/**
 * Anxious 4eye reaction timeline (formerly "poke").
 *
 * The startled click reaction: the whole SVG squashes & stretches (a
 * "got bonked" beat); both arms flair outward symmetrically; the
 * antenna whips and recovers with an elastic settle. The hook adds a
 * cooldown after this so successive triggers don't stack into a
 * stuttering mess.
 *
 * Required parts: `svg`. `leftArm`, `rightArm`, `antenna` are optional.
 */

import gsap from "gsap"

export interface BuildAnxiousTimelineParams {
  svg: SVGSVGElement
  leftArm?: SVGPathElement | null
  rightArm?: SVGPathElement | null
  antenna?: SVGGElement | null
  /**
   * Called when the visible animation completes. The hook uses this to
   * start its post-animation cooldown timer (see `ANXIOUS_COOLDOWN_MS`).
   */
  onComplete: () => void
}

export function buildAnxiousTimeline({
  svg,
  leftArm,
  rightArm,
  antenna,
  onComplete,
}: BuildAnxiousTimelineParams): gsap.core.Timeline {
  if (leftArm) gsap.set(leftArm, { transformOrigin: "top center", transformBox: "fill-box" })
  if (rightArm) gsap.set(rightArm, { transformOrigin: "top center", transformBox: "fill-box" })
  if (antenna) gsap.set(antenna, { transformOrigin: "bottom center", transformBox: "fill-box" })

  const tl = gsap.timeline({ onComplete })

  // Squash → stretch → settle on the whole body.
  tl.to(svg, { scaleX: 1.15, scaleY: 0.9, y: -10, duration: 0.12, ease: "power2.out" }, 0)
  tl.to(svg, { scaleX: 0.92, scaleY: 1.08, y: 0, duration: 0.18, ease: "sine.inOut" })
  tl.to(svg, { scaleX: 1, scaleY: 1, duration: 0.25, ease: "back.out(2.4)" })

  if (leftArm) {
    tl.to(leftArm, { rotate: 25, duration: 0.18, ease: "power2.out" }, 0)
    tl.to(leftArm, { rotate: 0, duration: 0.3, ease: "back.out(2)" }, 0.18)
  }
  if (rightArm) {
    tl.to(rightArm, { rotate: -25, duration: 0.18, ease: "power2.out" }, 0)
    tl.to(rightArm, { rotate: 0, duration: 0.3, ease: "back.out(2)" }, 0.18)
  }
  if (antenna) {
    tl.to(antenna, { rotate: 30, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 3 }, 0)
    tl.to(antenna, { rotate: 0, duration: 0.2, ease: "elastic.out(1, 0.4)" }, 0.4)
  }

  return tl
}
