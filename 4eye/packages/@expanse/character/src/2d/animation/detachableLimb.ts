/**
 * detachableLimb — temporary "limb falls off" stage helper.
 *
 * Encapsulates the DOM-clone + GSAP timeline pattern used by
 * `playExcited` (the Excited 4eye reaction) to simulate a body part
 * physically detaching, falling
 * to the ground, then reattaching after a beat.
 *
 * The implementation is deliberately *imperative*: it returns a small
 * scene API that callers compose into their own GSAP timelines via
 * `tl.add(scene.fall(), startTime)` etc. This keeps the dramatic
 * timing under the caller's control (they own the master timeline) but
 * removes the cloneNode / appendChild / overflow / cleanup boilerplate.
 *
 * Lifecycle
 * ---------
 *   1. `detachLimb({ source, parent })` clones `source` once, marks the
 *      clone with `data-fallen-limb`, appends it next to the original,
 *      and ensures the parent SVG won't clip it (`overflow: visible`).
 *   2. The original is *not* hidden until the caller schedules
 *      `scene.hideOriginal()` (typically at the moment of detachment).
 *   3. `scene.fall(opts)` returns a tween config the caller drops into
 *      its timeline. Same for `scene.settle()`, `scene.regrow()`,
 *      `scene.fadeAndRemove()`.
 *   4. `scene.dispose()` is the safety-net cleanup: removes the clone
 *      from the DOM and restores the SVG `overflow` attribute. Call
 *      this from the master timeline's `onComplete` *and* on early
 *      teardown (e.g. `gsap.context().revert()`).
 *
 * Why not own the timeline?
 *   The arm-fall gag is timing-coupled to the body's hop (V-pose →
 *   peak → land). Centralising the timeline here would either force
 *   the helper to know about the body's choreography or expose so many
 *   knobs that the API would be larger than the original code. The
 *   "scene returns tweens" shape gets the cleanup wins without that
 *   coupling.
 */

import gsap from "gsap"

export interface DetachLimbOptions {
  /** The SVG element representing the limb that's about to fall off. */
  source: SVGGraphicsElement
  /**
   * The container that should host the cloned (fallen) limb. Typically
   * the parent of `source` — passing it explicitly avoids a null-check
   * on every call site and lets callers re-parent if they need to.
   */
  parent: ParentNode
  /**
   * The ancestor `<svg>` element. We toggle its `overflow` attribute to
   * `visible` while the limb is detached so the falling clone isn't
   * clipped by the SVG viewBox.
   */
  svg: SVGSVGElement
  /**
   * Transform origin to apply to the cloned limb. Defaults match the
   * brand-core convention used by `useCharacterReactions` for arms:
   * `"top center"` / `"fill-box"`.
   */
  transformOrigin?: string
  transformBox?: "fill-box" | "view-box" | "border-box"
}

export interface DetachableLimbScene {
  /** The cloned (fallen) element, while it exists in the DOM. */
  readonly fallen: SVGGraphicsElement
  /**
   * Sync the clone's pose to a starting rotation (typically the same
   * angle the original was at the moment of detachment, so the visual
   * is continuous instead of a teleport).
   */
  syncPose: (rotateDeg: number) => void
  /** Hide the original limb (used at the moment of detachment). */
  hideOriginal: () => void
  /**
   * Tween the clone falling toward the ground. Returns the GSAP vars
   * object the caller passes to `tl.to(scene.fallen, vars, time)`.
   */
  fallVars: (overrides?: gsap.TweenVars) => gsap.TweenVars
  /** Tween the clone settling on the ground with a tiny rebound. */
  settleVars: (overrides?: gsap.TweenVars) => gsap.TweenVars
  /** Tween the fallen clone fading out before removal. */
  fadeOutVars: (overrides?: gsap.TweenVars) => gsap.TweenVars
  /**
   * Pop the original limb back in (scale 0 → 1) at the moment of
   * regrowth. Returns a thunk that performs the GSAP `set` + tween;
   * pass it to `tl.call(scene.regrowOriginal, undefined, time)` or
   * call directly from a timeline `onComplete`.
   */
  regrowOriginal: () => void
  /**
   * Final cleanup — removes the cloned limb from the DOM and restores
   * the SVG `overflow` attribute. Idempotent. Safe to call multiple
   * times.
   */
  dispose: () => void
}

/**
 * Default fall tween targets. These match the values previously hard-
 * coded in `useCharacterReactions.playExcited` so behavior is byte-
 * identical to the original gag when no overrides are passed.
 */
const FALL_DEFAULTS: gsap.TweenVars = {
  y: 140,
  x: -28,
  rotate: 260,
  duration: 0.55,
  ease: "power2.in",
}
const SETTLE_DEFAULTS: gsap.TweenVars = {
  y: 150,
  x: -32,
  rotate: 270,
  duration: 0.18,
  ease: "back.out(1.6)",
}
const FADE_OUT_DEFAULTS: gsap.TweenVars = {
  opacity: 0,
  duration: 0.5,
  ease: "power1.out",
}

export function detachLimb({
  source,
  parent,
  svg,
  transformOrigin = "top center",
  transformBox = "fill-box",
}: DetachLimbOptions): DetachableLimbScene {
  // Capture the SVG's pre-existing `overflow` attribute so dispose can
  // restore the *exact* original markup. `null` means the attr was not
  // set, which is the common case for brand-core characters.
  const previousOverflowAttr = svg.getAttribute("overflow")
  // gsap.set on style won't always reflect the SVG attribute correctly
  // across browsers, so we set the attribute imperatively too.
  gsap.set(svg, { overflow: "visible" })
  svg.setAttribute("overflow", "visible")

  // Clone the limb. `true` = deep clone so any nested gradients /
  // children come along.
  const fallen = source.cloneNode(true) as SVGGraphicsElement
  // Strip the brand-core `name="..."` attr so the clone isn't picked up
  // by selectors looking for the original part.
  fallen.removeAttribute("name")
  fallen.setAttribute("data-fallen-limb", "1")
  // Pointer-events off so the dropped clone can't intercept clicks on
  // the focusable mascot wrapper.
  ;(fallen as unknown as HTMLElement).style.pointerEvents = "none"
  parent.appendChild(fallen)

  gsap.set(fallen, {
    transformOrigin,
    transformBox,
  })

  let disposed = false

  const scene: DetachableLimbScene = {
    fallen,
    syncPose: (rotateDeg: number) => {
      if (disposed) return
      gsap.set(fallen, { rotate: rotateDeg })
    },
    hideOriginal: () => {
      gsap.set(source, { opacity: 0 })
    },
    fallVars: (overrides) => ({ ...FALL_DEFAULTS, ...overrides }),
    settleVars: (overrides) => ({ ...SETTLE_DEFAULTS, ...overrides }),
    fadeOutVars: (overrides) => ({ ...FADE_OUT_DEFAULTS, ...overrides }),
    regrowOriginal: () => {
      // Reset transform state so the regrow pop reads as "appearing"
      // rather than continuing the fall animation in mid-air.
      gsap.set(source, { rotate: 0, scale: 0, opacity: 1 })
      gsap.to(source, { scale: 1, duration: 0.32, ease: "back.out(2.4)" })
    },
    dispose: () => {
      if (disposed) return
      disposed = true
      if (fallen.parentNode) fallen.remove()
      // Restore the SVG `overflow` attribute to its pre-detach state so
      // unrelated code that inspects the markup doesn't see our edit.
      if (previousOverflowAttr === null) {
        svg.removeAttribute("overflow")
      } else {
        svg.setAttribute("overflow", previousOverflowAttr)
      }
      gsap.set(svg, { clearProps: "overflow" })
    },
  }

  return scene
}
