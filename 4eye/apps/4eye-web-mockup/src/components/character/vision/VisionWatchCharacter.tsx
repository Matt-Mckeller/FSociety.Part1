"use client"

/**
 * VisionWatchCharacter — back-compat re-export.
 * Now delegates to VisionControlCharacter with device="watch".
 *
 * Existing imports of VisionWatchCharacter continue to work unchanged.
 */
export { VisionControlCharacter as VisionWatchCharacter } from "./VisionControlCharacter"

// ────────────────────────────────────────────────────────────────────────────
// The original implementation is preserved below (unused) for reference.
// Remove this file entirely once all callsites have migrated.
// ────────────────────────────────────────────────────────────────────────────

import { Box } from "@mui/material"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { Character4eye } from "@expanse/character/2d"
import { CHARACTER_PERSONAS } from "@expanse/character/2d"

/**
 * VisionWatchCharacter — the Vision page hero animation. A 4eye character
 * (vision persona) checks a wrist-watch 3 times on mount, then settles.
 * Hovering or clicking the character triggers an exaggerated "WHAT!"
 * reaction: looks at watch once, eye widens, shock glyph pops, both arms
 * throw up.
 *
 * Beat sheet (mount sequence, ~3.4s):
 *   0.0  idle, watch hidden
 *   0.4  arm raises, watch fades in on wrist
 *   0.8  glance #1 (head tilts down ~12°)
 *   1.2  return to center
 *   1.6  glance #2
 *   2.0  return
 *   2.4  glance #3
 *   2.8  return + tiny wink
 *   3.4  settle, hold
 *
 * Reaction (on hover or click, ~1.6s):
 *   0.0  glance at watch
 *   0.3  SHOCK — eye pulse, shock glyph pops above head
 *   0.6  arms throw up + head snap forward
 *   1.0  hold dramatic pose
 *   1.6  return to settled
 */

/**
 * Maximum visual size of the character body (desktop). Reduced from
 * 280 → 240 so the Vision slide character reads in line with the Hook
 * slide mascot instead of dominating its row.
 *
 * On smaller / shorter viewports the wrapper scales down via
 * `CHARACTER_SIZE_CSS` so the character (and the brain-wiring strip
 * + CTA below it) always fit inside the safe area without scrolling.
 */
const SIZE = 240

/**
 * Responsive size for the character wrapper. Picks the smaller of
 * 28vw / 36vh (so the character stays comfortably inside both narrow
 * portrait phones AND short landscape laptops with HUD chrome open),
 * clamped to a minimum of 140px (still legible) and the desktop
 * maximum of {@link SIZE}px.
 */
const CHARACTER_SIZE_CSS = `clamp(140px, min(28vw, 36vh), ${SIZE}px)`
/**
 * Extra vertical headroom added ABOVE the character box. The reaction
 * timeline translates the head wrapper up (`y: -6, scale: 1.04`) and
 * the SHOCK glyph anchors at `top: 0` of the wrapper. Without this
 * padding both the antenna (top of the Character4eye SVG, since it
 * runs in `compact` mode with 0 viewBox padding) and the SHOCK glyph
 * sit flush at the wrapper's edge and get clipped by any ancestor
 * with `overflow: hidden`. The character now lives inside the lower
 * SIZE × SIZE region of an SIZE × (SIZE + ANTENNA_HEADROOM) wrapper
 * so transient upward motion stays inside the wrapper bounds.
 */
const ANTENNA_HEADROOM = 32
const WATCH_W = 56
const WATCH_H = 36

/** Smartwatch SVG with a pulsing notification dot for the
 *  "AVAILABLE SOON" tie-in. */
function WatchSvg() {
  return (
    <svg
      width={WATCH_W}
      height={WATCH_H}
      viewBox="0 0 56 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Strap */}
      <rect x={4} y={14} width={48} height={8} rx={2} fill="#1f2937" opacity={0.85} />
      {/* Body */}
      <rect x={14} y={6} width={28} height={24} rx={6} fill="#0f172a" stroke="#cbd5e1" strokeWidth={1.2} />
      {/* Face */}
      <rect x={17} y={9} width={22} height={18} rx={3.5} fill="#0ea5e9" opacity={0.18} />
      {/* Tick marks */}
      <circle cx={28} cy={11} r={0.8} fill="#cbd5e1" />
      <circle cx={28} cy={25} r={0.8} fill="#cbd5e1" />
      <circle cx={20} cy={18} r={0.8} fill="#cbd5e1" />
      <circle cx={36} cy={18} r={0.8} fill="#cbd5e1" />
      {/* Hands */}
      <line x1={28} y1={18} x2={28} y2={12.5} stroke="#7dd3fc" strokeWidth={1.2} strokeLinecap="round" />
      <line x1={28} y1={18} x2={33} y2={18} stroke="#7dd3fc" strokeWidth={1} strokeLinecap="round" />
      {/* Notification dot */}
      <circle className="watch-dot" cx={36} cy={10} r={2.2} fill="#f59e0b" />
    </svg>
  )
}

/** Shock glyph (⚡) that pops above the head on the WHAT! reaction. */
function ShockSvg() {
  return (
    <svg width={36} height={48} viewBox="0 0 36 48" fill="none" aria-hidden>
      <path
        d="M20 2 L6 26 L16 26 L12 46 L30 20 L20 20 Z"
        fill="#f59e0b"
        stroke="#92400e"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function VisionWatchCharacter() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const headRef = useRef<HTMLDivElement | null>(null)
  const armRef = useRef<HTMLDivElement | null>(null)
  const watchRef = useRef<HTMLDivElement | null>(null)
  const shockRef = useRef<HTMLDivElement | null>(null)
  const eyelidRef = useRef<HTMLDivElement | null>(null)
  const reactionTl = useRef<gsap.core.Timeline | null>(null)

  // Mount sequence: 3 quick checks, then settle.
  useEffect(() => {
    if (!wrapRef.current) return
    gsap.set(watchRef.current, { opacity: 0, scale: 0.6, y: 6 })
    gsap.set(armRef.current, { rotate: 0, transformOrigin: "20% 0%" })
    gsap.set(headRef.current, { rotate: 0, transformOrigin: "50% 100%" })
    gsap.set(shockRef.current, { opacity: 0, scale: 0.5, y: 6 })
    gsap.set(eyelidRef.current, { scaleY: 0, transformOrigin: "50% 0%" })
    const watchDot = wrapRef.current.querySelector(".watch-dot")
    if (watchDot) gsap.to(watchDot, { opacity: 0.4, repeat: -1, yoyo: true, duration: 1.0, ease: "sine.inOut" })

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

    // 0.4s — arm raise + watch fade in
    tl.to(armRef.current, { rotate: -45, duration: 0.5 }, 0.4)
    tl.to(watchRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.4 }, 0.4)

    // Three checks: tilt head down → up
    const check = (start: number) => {
      tl.to(headRef.current, { rotate: 12, duration: 0.18 }, start)
      tl.to(headRef.current, { rotate: 0, duration: 0.22 }, start + 0.22)
    }
    check(0.85)
    check(1.4)
    check(1.95)

    // Tiny wink at end
    tl.to(eyelidRef.current, { scaleY: 1, duration: 0.12 }, 2.55)
    tl.to(eyelidRef.current, { scaleY: 0, duration: 0.18 }, 2.7)

    return () => {
      tl.kill()
    }
  }, [])

  // Hover / click reaction: glance at watch, then SHOCK.
  const playReaction = () => {
    if (reactionTl.current?.isActive()) return
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    reactionTl.current = tl

    // Quick glance at watch
    tl.to(headRef.current, { rotate: 14, duration: 0.18 })
    tl.to(headRef.current, { rotate: 0, duration: 0.18 })

    // SHOCK — eye pulses, shock glyph pops, arms throw up
    tl.to(shockRef.current, { opacity: 1, scale: 1.2, y: -10, duration: 0.25 }, "+=0.05")
    tl.to(armRef.current, { rotate: -110, duration: 0.35 }, "<")
    tl.fromTo(
      headRef.current,
      { y: 0, scale: 1 },
      { y: -6, scale: 1.04, duration: 0.18, yoyo: true, repeat: 1 },
      "<",
    )

    // Hold the dramatic pose briefly
    tl.to({}, { duration: 0.4 })

    // Return to settled
    tl.to(shockRef.current, { opacity: 0, scale: 0.5, y: 6, duration: 0.25 })
    tl.to(armRef.current, { rotate: -45, duration: 0.4 }, "<")
  }

  return (
    <Box
      ref={wrapRef}
      onMouseEnter={playReaction}
      onClick={playReaction}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          playReaction()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="4eye character checks the watch — hover or click for a reaction"
      sx={{
        position: "relative",
        // Responsive: shrinks on small / short viewports so the slide's
        // character + strip + CTA always fit the safe area. See
        // CHARACTER_SIZE_CSS for the formula.
        width: CHARACTER_SIZE_CSS,
        height: `calc(${CHARACTER_SIZE_CSS} + ${ANTENNA_HEADROOM}px)`,
        mx: "auto",
        cursor: "pointer",
        outline: "none",
        // Belt-and-suspenders: default for divs, but make it explicit so
        // an ancestor refactor flipping to overflow:hidden doesn't crop
        // the antenna or shock glyph.
        overflow: "visible",
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 6,
          borderRadius: 2,
        },
      }}
    >
      {/* Shock glyph — anchors at the very top of the wrapper, which
          now sits ANTENNA_HEADROOM above the character's head. */}
      <Box
        ref={shockRef}
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        <ShockSvg />
      </Box>

      {/* Head wrapper — tilts during checks. Pushed down by ANTENNA_HEADROOM
          so the antenna at the top of the (compact) Character4eye SVG has
          room to translate up during the SHOCK reaction without clipping. */}
      <Box
        ref={headRef}
        sx={{
          position: "absolute",
          top: ANTENNA_HEADROOM,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Character4eye {...CHARACTER_PERSONAS.vision} compact />
      </Box>

      {/* Eyelid — black arc that closes/opens for the wink. Positioned
          over the upper portion of the character's eye area; uses pixel
          offset (rather than %) so it tracks the character's downshifted
          position inside the wrapper. */}
      <Box
        ref={eyelidRef}
        aria-hidden
        sx={{
          position: "absolute",
          left: "30%",
          right: "30%",
          top: `calc(${ANTENNA_HEADROOM}px + 30%)`,
          height: "16%",
          background: "linear-gradient(180deg, #1f2937 0%, #1f2937 70%, transparent 100%)",
          borderRadius: "50%",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Wrist-watch arm — anchored bottom-right of the character body.
          Rotates upward during the watch-check sequence. */}
      <Box
        ref={armRef}
        sx={{
          position: "absolute",
          bottom: "18%",
          right: "12%",
          width: WATCH_W + 8,
          height: WATCH_H + 8,
          zIndex: 2,
        }}
      >
        <Box ref={watchRef} sx={{ display: "inline-block" }}>
          <WatchSvg />
        </Box>
      </Box>
    </Box>
  )
}
