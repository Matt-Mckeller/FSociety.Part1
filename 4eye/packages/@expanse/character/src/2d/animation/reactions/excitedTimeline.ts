/**
 * Excited 4eye reaction timeline (formerly "celebrate") — the headline reaction.
 *
 * Five acts:
 *   ACT 1 (0 - 0.18s)    Anticipation crouch — body squashes, arms dip in.
 *   ACT 2 (0.18 - 0.55s) Explosive V-pose hop — body launches up, arms
 *                        snap to ±75°, antenna whips.
 *   ACT 3 (0.55 - 1.05s) Air shake — arms wobble at the peak; head
 *                        cocks side to side.
 *   ACT 4 (1.05 - 1.4s)  Second little hop.
 *   ACT 5 (1.4 - 1.8s)   Land + arms drop with bounce settle.
 *
 * The LEFT arm physically detaches during ACT 2 via the
 * `detachableLimb` helper passed in as `limbScene`. The helper owns
 * the cloneNode/cleanup boilerplate; this timeline just sequences the
 * helper's scene calls so they sync to the body's choreography.
 *
 * Required parts: `svg`. Everything else is optional flair.
 */

import gsap from "gsap"
import type { DetachableLimbScene } from "../detachableLimb"

export interface BuildExcitedTimelineParams {
  svg: SVGSVGElement
  leftArm?: SVGPathElement | null
  rightArm?: SVGPathElement | null
  head?: SVGCircleElement | null
  antenna?: SVGGElement | null
  /**
   * Optional detachable-limb scene for the LEFT-arm fall-off gag. When
   * present, the gag is woven into the timeline; when null, the timeline
   * runs without the gag (e.g. when there's no leftArm or no parent).
   */
  limbScene: DetachableLimbScene | null
  onComplete: () => void
}

export function buildExcitedTimeline({
  svg,
  leftArm,
  rightArm,
  head,
  antenna,
  limbScene,
  onComplete,
}: BuildExcitedTimelineParams): gsap.core.Timeline {
  if (leftArm) gsap.set(leftArm, { transformOrigin: "top center", transformBox: "fill-box" })
  if (rightArm) gsap.set(rightArm, { transformOrigin: "top center", transformBox: "fill-box" })
  if (head) gsap.set(head, { transformOrigin: "center center", transformBox: "fill-box" })
  if (antenna) gsap.set(antenna, { transformOrigin: "bottom center", transformBox: "fill-box" })

  const tl = gsap.timeline({
    onComplete: () => {
      // Safety net: if the in-timeline dispose call below was killed
      // (e.g. by ctx.revert on unmount) the fallen arm could leak.
      // `dispose` is idempotent so calling it here is harmless when
      // cleanup already happened.
      limbScene?.dispose()
      onComplete()
    },
  })

  // === Arm fall-off gag — woven into the timeline ===
  if (limbScene) {
    const scene = limbScene
    // Sync the clone to the same V-pose the body is holding so the
    // detach reads as continuous, not a teleport. Set at both the
    // crouch end and the detach moment to cover the full anticip.
    tl.call(() => scene.syncPose(75), undefined, 0.18)
    tl.call(() => scene.syncPose(75), undefined, 0.5)
    // Detach: original disappears, fall begins.
    tl.call(() => scene.hideOriginal(), undefined, 0.5)
    tl.to(scene.fallen, scene.fallVars(), 0.5)
    // Settle on the ground with a tiny rebound.
    tl.to(scene.fallen, scene.settleVars(), 1.05)
    // Regrow: fresh arm pops back in at the body's land beat.
    tl.call(() => scene.regrowOriginal(), undefined, 1.4)
    // Fade the fallen clone out, then remove it from the DOM.
    tl.to(scene.fallen, scene.fadeOutVars(), 2.0)
    tl.call(() => scene.dispose(), undefined, 2.55)
  }

  // === ACT 1: Anticipation crouch (0 - 0.18s) ===
  tl.to(svg, { y: 6, scaleY: 0.92, scaleX: 1.04, duration: 0.18, ease: "power2.in" }, 0)
  if (leftArm) tl.to(leftArm, { rotate: 15, duration: 0.18, ease: "power2.in" }, 0)
  if (rightArm) tl.to(rightArm, { rotate: -15, duration: 0.18, ease: "power2.in" }, 0)

  // === ACT 2: Explosive V-pose hop (0.18 - 0.55s) ===
  tl.to(svg, {
    y: -28,
    scaleY: 1.06,
    scaleX: 0.96,
    duration: 0.32,
    ease: "back.out(2.2)",
  })
  if (leftArm) {
    tl.to(leftArm, { rotate: 75, duration: 0.32, ease: "back.out(2.4)" }, 0.18)
  }
  if (rightArm) {
    tl.to(rightArm, { rotate: -75, duration: 0.32, ease: "back.out(2.4)" }, 0.18)
  }
  if (head) {
    tl.to(head, { y: -3, rotate: 0, duration: 0.32, ease: "back.out(2)" }, 0.18)
  }
  if (antenna) {
    // Antenna whips back, then forward, exuberantly.
    tl.to(antenna, { rotate: -28, duration: 0.18, ease: "power2.out" }, 0.18)
    tl.to(antenna, { rotate: 28, duration: 0.18, ease: "power2.inOut" })
    tl.to(antenna, { rotate: -16, duration: 0.16, ease: "power2.inOut" })
    tl.to(antenna, { rotate: 0, duration: 0.32, ease: "elastic.out(1, 0.35)" })
  }

  // === ACT 3: Air shake — arms wobble side to side at the peak ===
  tl.to(svg, { y: -22, duration: 0.18, ease: "sine.inOut" }, 0.55)
  tl.to(svg, { y: -28, duration: 0.18, ease: "sine.inOut" })
  if (leftArm) {
    tl.to(leftArm, { rotate: 90, duration: 0.16, ease: "sine.inOut" }, 0.55)
    tl.to(leftArm, { rotate: 65, duration: 0.16, ease: "sine.inOut" })
    tl.to(leftArm, { rotate: 80, duration: 0.16, ease: "sine.inOut" })
  }
  if (rightArm) {
    tl.to(rightArm, { rotate: -90, duration: 0.16, ease: "sine.inOut" }, 0.55)
    tl.to(rightArm, { rotate: -65, duration: 0.16, ease: "sine.inOut" })
    tl.to(rightArm, { rotate: -80, duration: 0.16, ease: "sine.inOut" })
  }
  if (head) {
    tl.to(head, { rotate: -5, duration: 0.16, ease: "sine.inOut" }, 0.55)
    tl.to(head, { rotate: 5, duration: 0.16, ease: "sine.inOut" })
    tl.to(head, { rotate: 0, duration: 0.16, ease: "sine.inOut" })
  }

  // === ACT 4: Second little hop (1.05 - 1.4s) ===
  tl.to(svg, { y: 4, scaleY: 0.95, scaleX: 1.03, duration: 0.16, ease: "power2.in" }, 1.05)
  tl.to(svg, { y: -14, scaleY: 1.04, scaleX: 0.97, duration: 0.2, ease: "back.out(2)" })

  // === ACT 5: Land + arms drop with bounce settle (1.4 - 1.8s) ===
  tl.to(svg, { y: 0, scaleY: 1, scaleX: 1, duration: 0.36, ease: "back.out(1.8)" }, 1.4)
  if (leftArm) {
    tl.to(leftArm, { rotate: 0, duration: 0.42, ease: "back.out(2)" }, 1.4)
  }
  if (rightArm) {
    tl.to(rightArm, { rotate: 0, duration: 0.42, ease: "back.out(2)" }, 1.4)
  }
  if (head) {
    tl.to(head, { y: 0, duration: 0.36, ease: "back.out(2)" }, 1.4)
  }

  return tl
}
