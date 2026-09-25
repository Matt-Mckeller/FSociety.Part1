"use client";

/**
 * Resource-bar widgets — shared building blocks for the Mind/Body resource HUD.
 *
 * Extracted from `ResourceBars.stories.tsx` so the corner HUD
 * ({@link ResourceCornerHud}) and the Storybook stories render the exact same
 * widgets from one source of truth. Pure presentation + data — no app state.
 */

import React from "react";
import { Box, GlobalStyles, Stack, Typography } from "@mui/material";

// ─── Color helpers ──────────────────────────────────────────────────────────
// Per-HUD theming: a single accent hex drives the whole chrome (ring, borders,
// neural grid, glows) and each resource is a *tint* of that accent so a HUD
// "reads as one color throughout" (Mind = amber, Body = red).

export function hexToRgb(hex: string) {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
export function rgba(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r},${g},${b},${a})`
}
/** Shift a hex toward white (amt > 0) or black (amt < 0). amt ∈ [-1, 1]. */
export function shadeHex(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex)
  const t = amt >= 0 ? 255 : 0
  const k = Math.abs(amt)
  const m = (c: number) => Math.round(c + (t - c) * k)
  return `#${[m(r), m(g), m(b)].map(x => x.toString(16).padStart(2, "0")).join("")}`
}

export const MIND_ACCENT = "#f59e0b" // dopamine amber / earn-orange family
export const BODY_ACCENT = "#ef4444" // red
export const DEFAULT_ACCENT = "#38bdf8" // legacy cyan (Classic / Both / Live)

// ─── Brand glyphs ─────────────────────────────────────────────────────────────
// Authored in the 4eye BrandIcon language (24×24, currentColor, geometric).

export const GLYPHS: Record<string, string> = {
  dopamine: `
    <circle cx="12" cy="14.5" r="3.1" fill="currentColor"/>
    <path d="M12 11.2V4.2M9.2 6.6 12 3.6 14.8 6.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="6" cy="17.6" r="1.4" fill="currentColor"/>
    <circle cx="18" cy="17.6" r="1.4" fill="currentColor"/>
    <path d="M9.4 15.9 7 17M14.6 15.9 17 17" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  norepinephrine: `
    <path d="M13.4 2.6 6 12.8c-.3.5 0 1.1.6 1.1H10l-1 7.2c-.1.6.7.9 1.1.4l7.2-10.2c.3-.5 0-1.1-.6-1.1H14l1-6.5c.1-.6-.7-.9-1.1-.5Z" fill="currentColor"/>`,
  serotonin: `
    <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6" fill="none"/>
    <path d="M5.5 13.2c1.8 0 1.8-2.6 3.25-2.6S11.7 13.2 12 13.2s1.45-2.6 3.25-2.6S18.5 13.2 18.5 13.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
  oxytocin: `
    <circle cx="9" cy="12" r="4.1" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <circle cx="15" cy="12" r="4.1" stroke="currentColor" stroke-width="1.7" fill="none"/>`,
  energy: `
    <circle cx="12" cy="12" r="2.1" fill="currentColor"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.4" fill="none"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.4" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" stroke-width="1.4" fill="none" transform="rotate(-60 12 12)"/>`,
  breath: `
    <circle cx="12" cy="12" r="2.3" fill="currentColor"/>
    <path d="M12 7.5a4.5 4.5 0 0 1 0 9M12 7.5a4.5 4.5 0 0 0 0 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <path d="M12 4a8 8 0 0 1 0 16M12 4a8 8 0 0 0 0 16" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.55"/>`,
  movement: `
    <path d="M3 16.5l4.5-4.5 3.5 3.5 4-5 5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M16 7h4.5v4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  fuel: `
    <path d="M12.5 3c.4 3.2 4.5 4.4 4.5 8.4a5 5 0 0 1-10 0c0-2 .9-3.3 2.1-4.4.2 1.7 1.6 1.9 1.6.2 0-1.8.2-3 1.8-4.2Z" fill="currentColor"/>`,
  rest: `
    <path d="M20 14.2A8 8 0 1 1 9.4 4 6.2 6.2 0 0 0 20 14.2Z" fill="currentColor"/>`,
  hydration: `
    <path d="M12 3.4c3.6 4.6 6 7.7 6 10.8a6 6 0 0 1-12 0c0-3.1 2.4-6.2 6-10.8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
    <path d="M9 13.8a3 3 0 0 0 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  brain: `
    <path d="M12 5.4C10.6 4 7.8 4.2 6.8 6.1 5.1 6.4 4.4 8.4 5.4 9.8c-1.2 1.3-.8 3.5 1 4.1.1 1.9 2.2 3.1 4 2.4M12 5.4c1.4-1.4 4.2-1.2 5.2.7 1.7.3 2.4 2.3 1.4 3.7 1.2 1.3.8 3.5-1 4.1-.1 1.9-2.2 3.1-4 2.4M12 5.4v13.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="8.4" cy="9" r="1" fill="currentColor"/>
    <circle cx="15.6" cy="9" r="1" fill="currentColor"/>
    <circle cx="9.4" cy="13.4" r="1" fill="currentColor"/>
    <circle cx="14.6" cy="13.4" r="1" fill="currentColor"/>`,
  heart: `
    <path d="M12 20.4C12 20.4 3.6 15 3.6 8.9A4.4 4.4 0 0 1 12 7.3 4.4 4.4 0 0 1 20.4 8.9C20.4 15 12 20.4 12 20.4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
    <path d="M6 12.4h2.4l1.3-2.7 2.3 4.8 1.6-2.7H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  character: `
    <circle cx="12" cy="5.6" r="2.6" fill="currentColor"/>
    <circle cx="12" cy="5.6" r="0.9" fill="#070c14"/>
    <path d="M12 8.6v6.2M12 10.6l-3.8 2.8M12 10.6l3.8 2.8M12 14.8l-2.8 4.8M12 14.8l2.8 4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>`,
  vitruvian: `
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.3" fill="none" opacity="0.5"/>
    <circle cx="12" cy="6.4" r="2" fill="currentColor"/>
    <path d="M12 8.4v6M5.5 10.2h13M12 14.4l-3.4 4.8M12 14.4l3.4 4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
}

export function Glyph({ name, markup, color, size = 16 }: { name?: string; markup?: string; color?: string; size?: number }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden
      sx={{ width: size, height: size, display: "block", color: color ?? "currentColor", flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: markup ?? (name ? GLYPHS[name] : "") ?? "" }}
    />
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export type Resource = {
  key: string; label: string; shortLabel: string
  glyph: string; value: number; color: string
  /** Cross-domain synonyms the label cycles through (Body). */
  alts?: string[]
  /** Tint amount from the HUD accent when themed. */
  lift?: number
}
export type Motion = "scramble" | "crossfade" | "flip"
export type HUDState = "compact" | "detail" | "neural"

const NEURO = [
  { key: "dopamine",       label: "Dopamine",       shortLabel: "Dopamine",  glyph: "dopamine",       value: 100, color: "#f59e0b", lift: -0.22, alts: ["Dopamine", "Reward", "Drive", "Focus"] },
  { key: "norepinephrine", label: "Norepinephrine", shortLabel: "Norepi.",   glyph: "norepinephrine", value: 100, color: "#ef4444", lift: 0.12,  alts: ["Norepi.", "Alertness", "Energy", "Edge"] },
  { key: "serotonin",      label: "Serotonin",      shortLabel: "Serotonin", glyph: "serotonin",      value: 100, color: "#10b981", lift: -0.04, alts: ["Serotonin", "Mood", "Calm", "Balance"] },
  { key: "oxytocin",       label: "Oxytocin",       shortLabel: "Oxytocin",  glyph: "oxytocin",       value: 100, color: "#e879f9", lift: 0.44,  alts: ["Oxytocin", "Bonding", "Trust", "Warmth"] },
  { key: "energy",         label: "Energy",         shortLabel: "Energy",    glyph: "energy",         value: 100, color: "#38bdf8", lift: 0.3,   alts: ["Energy", "Vitality", "Stamina", "Spark"] },
]

export const RESOURCES: Resource[] = NEURO.map(r => ({ ...r }))
export const MIND_RESOURCES: Resource[] = NEURO.map(r => ({ ...r, color: shadeHex(MIND_ACCENT, r.lift) }))

const BODY = [
  { key: "breath",    label: "Breath",    glyph: "breath",    value: 100, lift: 0.4,   alts: ["Breath", "Breathing", "Air", "Calm"] },
  { key: "movement",  label: "Movement",  glyph: "movement",  value: 100, lift: 0.12,  alts: ["Movement", "Exercise", "Training", "Active"] },
  { key: "fuel",      label: "Fuel",      glyph: "fuel",      value: 100, lift: -0.06, alts: ["Fuel", "Nutrition", "Diet", "Food"] },
  { key: "rest",      label: "Rest",      glyph: "rest",      value: 100, lift: 0.26,  alts: ["Rest", "Sleep", "Recovery", "Restore"] },
  { key: "hydration", label: "Hydration", glyph: "hydration", value: 100, lift: 0.46,  alts: ["Hydration", "Water", "Fluids", "Hydrate"] },
]
export const BODY_RESOURCES: Resource[] = BODY.map(b => ({
  ...b, shortLabel: b.label, color: shadeHex(BODY_ACCENT, b.lift),
}))

// Center triads (icon ⇄ these words on hover).
export const MIND_WORDS = ["MOOD", "MOTIV", "ENERGY"]
export const BODY_WORDS = ["HEALTH", "PRESENCE", "CLARITY"]

export const advance = (s: HUDState): HUDState =>
  s === "compact" ? "detail" : s === "detail" ? "neural" : "compact"

// ─── Animations ─────────────────────────────────────────────────────────────

export const SharedKeyframes = () => (
  <GlobalStyles styles={{
    "@keyframes rb-shimmer":    { "0%": { transform: "translateX(-130%)" }, "100%": { transform: "translateX(230%)" } },
    "@keyframes rb-glow-pulse": { "0%,100%": { opacity: 0.5 }, "50%": { opacity: 1 } },
    "@keyframes rb-fade-up":    { "from": { opacity: 0, transform: "translateY(6px)" }, "to": { opacity: 1, transform: "translateY(0)" } },
    "@keyframes rb-orb-enter":  { "from": { opacity: 0, transform: "scale(0.78)" }, "to": { opacity: 1, transform: "scale(1)" } },
    "@keyframes rb-wave-x":     { "from": { transform: "translateX(0)" }, "to": { transform: "translateX(-50px)" } },
    "@keyframes rb-bob":        { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-1.6px)" } },
    "@keyframes rb-flip":       { "from": { transform: "rotateX(-90deg)", opacity: 0 }, "to": { transform: "rotateX(0)", opacity: 1 } },
  }} />
)

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useMountFill(delay = 80) {
  const [filled, setFilled] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setFilled(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return filled
}

// ─── Morphing label (3 motion styles) ─────────────────────────────────────────

const GLITCH_CHARS = "▖▘▝▗◢◣◤◥+×=≡#%·".split("")

function ScrambleText({ words, color, fontSize = "0.62rem", weight = 700, letterSpacing = 1.5, active = true, hold = 1300, frameMs = 26, frames = 8, maxPasses = 3, swaps, runKey = 0, fontFamily = "monospace" }: {
  words: string[]; color: string; fontSize?: string | number; weight?: number; letterSpacing?: number; active?: boolean; hold?: number; frameMs?: number; frames?: number; maxPasses?: number | null; /** Cap on word transitions (overrides maxPasses cycles). */ swaps?: number; runKey?: number; fontFamily?: string
}) {
  const [display, setDisplay] = React.useState(words[0])
  React.useEffect(() => {
    if (!active || words.length === 0) { setDisplay(words[0] ?? ""); return }
    let mounted = true
    let interval: ReturnType<typeof setInterval> | undefined
    let timeout: ReturnType<typeof setTimeout> | undefined
    let transitions = 0
    const limit = swaps != null ? swaps : (maxPasses == null ? Infinity : maxPasses * words.length)
    const run = (target: number) => {
      const t = words[target]!
      let f = 0
      interval = setInterval(() => {
        f += 1
        const p = f / frames
        const s = Array.from(t).map((ch, i) =>
          ch === " " ? " " : (i / t.length < p ? ch : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!),
        ).join("")
        if (mounted) setDisplay(s)
        if (f >= frames) {
          if (interval) clearInterval(interval)
          if (mounted) setDisplay(t)
          transitions += 1
          if (transitions < limit) timeout = setTimeout(() => run((target + 1) % words.length), hold)
        }
      }, frameMs)
    }
    setDisplay(words[0])
    // One-shot swaps wait a beat so the reader sees the start word; looping morphs start almost immediately.
    const kickoff = swaps != null ? Math.min(1400, Math.max(600, hold)) : Math.min(150, hold)
    timeout = setTimeout(() => run(1 % words.length), kickoff)
    return () => { mounted = false; if (interval) clearInterval(interval); if (timeout) clearTimeout(timeout) }
  }, [active, words.join("|"), hold, frameMs, frames, maxPasses, swaps, runKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box component="span" sx={{ fontFamily, fontSize, fontWeight: weight, letterSpacing, color, lineHeight: 1, whiteSpace: "nowrap", userSelect: "none" }}>
      {display}
    </Box>
  )
}

function CrossfadeText({ words, color, fontSize = "0.62rem", weight = 700, letterSpacing = 1.5, active = true, hold = 1700, maxPasses = 3, runKey = 0 }: {
  words: string[]; color: string; fontSize?: string | number; weight?: number; letterSpacing?: number; active?: boolean; hold?: number; maxPasses?: number | null; runKey?: number
}) {
  const [idx, setIdx] = React.useState(0)
  React.useEffect(() => {
    if (!active) { setIdx(0); return }
    let count = 0
    const limit = maxPasses == null ? Infinity : maxPasses * words.length
    const t = setInterval(() => {
      setIdx(i => (i + 1) % words.length)
      count += 1
      if (count >= limit) { clearInterval(t); setIdx(0) }
    }, hold)
    return () => clearInterval(t)
  }, [active, words.length, hold, maxPasses, runKey])
  return (
    <Box sx={{ display: "inline-grid", lineHeight: 1 }}>
      {words.map((w, i) => (
        <Box key={w} component="span" sx={{
          gridArea: "1 / 1", fontFamily: "monospace", fontSize, fontWeight: weight, letterSpacing, color,
          whiteSpace: "nowrap", userSelect: "none", textAlign: "center",
          opacity: i === idx ? 1 : 0, transform: i === idx ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 0.4s ease, transform 0.4s ease", pointerEvents: "none",
        }}>
          {w}
        </Box>
      ))}
    </Box>
  )
}

function FlipText({ words, color, fontSize = "0.62rem", weight = 700, letterSpacing = 1.5, active = true, hold = 1600, maxPasses = 3, runKey = 0 }: {
  words: string[]; color: string; fontSize?: string | number; weight?: number; letterSpacing?: number; active?: boolean; hold?: number; maxPasses?: number | null; runKey?: number
}) {
  const [idx, setIdx] = React.useState(0)
  React.useEffect(() => {
    if (!active) { setIdx(0); return }
    let count = 0
    const limit = maxPasses == null ? Infinity : maxPasses * words.length
    const t = setInterval(() => {
      setIdx(i => (i + 1) % words.length)
      count += 1
      if (count >= limit) { clearInterval(t); setIdx(0) }
    }, hold)
    return () => clearInterval(t)
  }, [active, words.length, hold, maxPasses, runKey])
  return (
    <Box sx={{ perspective: "420px", lineHeight: 1 }}>
      <Box key={words[idx]} component="span" sx={{
        display: "inline-block", fontFamily: "monospace", fontSize, fontWeight: weight, letterSpacing, color,
        whiteSpace: "nowrap", userSelect: "none", transformOrigin: "50% 0%",
        animation: "rb-flip 0.42s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {words[idx]}
      </Box>
    </Box>
  )
}

export function MorphLabel({ motion = "scramble", swaps, fontFamily, ...rest }: {
  motion?: Motion; words: string[]; color: string; fontSize?: string | number; weight?: number; letterSpacing?: number; active?: boolean; hold?: number; maxPasses?: number | null; swaps?: number; runKey?: number; fontFamily?: string
}) {
  if (motion === "crossfade") return <CrossfadeText {...rest} />
  if (motion === "flip") return <FlipText {...rest} />
  return <ScrambleText {...rest} swaps={swaps} fontFamily={fontFamily} />
}

// ─── Center mark — icon at rest, morphs to triad words on hover ────────────────

export function CenterMark({ glyph, words, accent, motion = "scramble", active, size = 22 }: {
  glyph: string; words: string[]; accent: string; motion?: Motion; active: boolean; size?: number
}) {
  return (
    <Box sx={{ position: "relative", width: 40, height: size + 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        opacity: active ? 0 : 1, transform: active ? "scale(0.8)" : "scale(1)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        filter: `drop-shadow(0 0 5px ${rgba(accent, 0.55)})`,
      }}>
        <Glyph name={glyph} color={accent} size={size} />
      </Box>
      <Box sx={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        opacity: active ? 1 : 0, transition: "opacity 0.25s ease 0.05s",
      }}>
        {active && <MorphLabel motion={motion} words={words} color={accent} active fontSize="0.5rem" letterSpacing={1.2} />}
      </Box>
    </Box>
  )
}

// ─── Liquid orb (d3-style scrolling wave) ──────────────────────────────────────

const WAVE_PATH = (() => {
  const amp = 4, len = 50
  let d = "M -50 0"
  for (let x = -50; x <= 150; x += 4) {
    const y = (amp * Math.sin((x / len) * Math.PI * 2)).toFixed(2)
    d += ` L ${x} ${y}`
  }
  return d + " L 150 200 L -50 200 Z"
})()

function LiquidOrb({ r, motion = "scramble", size = 64, filled = true, delay = 0, labelActive = true, labelRunKey = 0 }: {
  r: Resource; motion?: Motion; size?: number; filled?: boolean; delay?: number; labelActive?: boolean; labelRunKey?: number
}) {
  const surfaceY = filled ? (1 - r.value / 100) * 100 : 100
  const back = shadeHex(r.color, 0.28)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.55 }}>
      <Box sx={{
        position: "relative", width: size, height: size, borderRadius: "50%",
        background: "rgba(4,7,15,0.9)",
        border: `1.5px solid ${rgba(r.color, 0.32)}`,
        overflow: "hidden",
        boxShadow: `0 0 ${size * 0.3}px ${rgba(r.color, 0.18)}, inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 ${size * 0.2}px rgba(0,0,0,0.55)`,
        animation: "rb-orb-enter 0.32s cubic-bezier(0.34,1.3,0.64,1) forwards",
        animationDelay: `${delay}ms`, opacity: 0,
      }}>
        <Box component="svg" viewBox="0 0 100 100" preserveAspectRatio="none" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <g style={{ transform: `translateY(${surfaceY}px)`, transition: `transform 0.95s cubic-bezier(0.4,0,0.2,1) ${delay}ms` }}>
            <g style={{ animation: "rb-bob 3.4s ease-in-out infinite", animationDelay: `${delay * 0.7}ms` }}>
              <g style={{ animation: "rb-wave-x 3.8s linear infinite", animationDelay: `${delay * 0.5 - 600}ms` }}>
                <path d={WAVE_PATH} fill={back} fillOpacity={0.5} />
              </g>
              <g style={{ animation: "rb-wave-x 2.4s linear infinite", animationDelay: `${-delay * 0.4}ms` }}>
                <path d={WAVE_PATH} fill={r.color} fillOpacity={0.88} />
              </g>
            </g>
          </g>
        </Box>
        <Box sx={{ position: "absolute", top: "9%", left: "16%", width: "28%", height: "30%", background: "radial-gradient(ellipse, rgba(255,255,255,0.16) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.25, zIndex: 2 }}>
          <Glyph name={r.glyph} color="rgba(255,255,255,0.92)" size={size * 0.28} />
          <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: size * 0.2, lineHeight: 1, userSelect: "none", color: r.value > 48 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.62)", textShadow: `0 0 12px ${rgba(r.color, 0.6)}` }}>
            {r.value}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ height: 12, display: "flex", alignItems: "center", opacity: filled ? 1 : 0, transition: `opacity 0.4s ease ${160 + delay}ms` }}>
        {r.alts && r.alts.length > 1
          ? <MorphLabel motion={motion} words={r.alts} color={rgba(r.color, 0.85)} active={labelActive} runKey={labelRunKey} fontSize="0.48rem" weight={600} letterSpacing={0.4} />
          : <Typography sx={{ fontFamily: "monospace", fontSize: "0.48rem", color: rgba(r.color, 0.6), lineHeight: 1, userSelect: "none" }}>{r.shortLabel}</Typography>}
      </Box>
    </Box>
  )
}

// ─── Compact widget — Orbital (ring + mini bars) ───────────────────────────────

export function OrbitalCompactWidget({ resources, hudState, onClick, accent = DEFAULT_ACCENT, centerGlyph, centerWords, motion = "scramble" }: {
  resources: Resource[]
  hudState: HUDState
  onClick: () => void
  accent?: string
  centerGlyph: string
  centerWords: string[]
  motion?: Motion
}) {
  const [hover, setHover] = React.useState(false)
  const avg = Math.round(resources.reduce((s, r) => s + r.value, 0) / resources.length)
  const S = 52, rad = 19, stroke = 3.5
  const circ = 2 * Math.PI * rad
  const offset = circ * (1 - avg / 100)
  const cx = S / 2, cy = S / 2
  const isOpen = hudState !== "compact"
  // Collapsed to just the ring unless hovered — only while resting in the
  // default (compact) state, so an already-open detail/neural panel keeps
  // its full pill as an anchor.
  const collapsed = !isOpen && !hover

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: "inline-flex", alignItems: "center",
        background: "rgba(6,10,18,0.93)", backdropFilter: "blur(24px)",
        border: "1px solid",
        borderColor: isOpen ? rgba(accent, 0.4) : rgba(accent, 0.2),
        borderRadius: "14px", px: collapsed ? 0.6 : 1.25, py: collapsed ? 0.6 : 1, cursor: "pointer",
        boxShadow: isOpen ? `0 0 22px ${rgba(accent, 0.1)}` : "none",
        transition: "border-color 0.28s, box-shadow 0.28s, padding 0.32s cubic-bezier(0.4,0,0.2,1)",
        "&:hover": { borderColor: rgba(accent, 0.58), boxShadow: `0 0 22px ${rgba(accent, 0.12)}` },
        userSelect: "none",
      }}
    >
      <Box sx={{ position: "relative", width: S, height: S, flexShrink: 0 }}>
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: "block" }}>
          <circle cx={cx} cy={cy} r={rad} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
          <circle cx={cx} cy={cy} r={rad} fill="none" stroke={rgba(accent, 0.78)} strokeWidth={stroke}
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dashoffset 0.65s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 5px ${rgba(accent, 0.6)})` }}
          />
        </svg>
        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CenterMark glyph={centerGlyph} words={centerWords} accent={accent} motion={motion} active={hover} />
        </Box>
      </Box>

      <Box sx={{
        display: "flex", alignItems: "center", gap: 1.25,
        maxWidth: collapsed ? 0 : 220,
        marginLeft: collapsed ? 0 : "10px",
        opacity: collapsed ? 0 : 1,
        overflow: "hidden",
        pointerEvents: collapsed ? "none" : "auto",
        transition: "max-width 0.32s cubic-bezier(0.4,0,0.2,1), margin-left 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
      }}>
        <Box sx={{ width: 1, alignSelf: "stretch", bgcolor: rgba(accent, 0.1), borderRadius: 1, flexShrink: 0 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.55, flexShrink: 0 }}>
          {resources.map((r, i) => (
            <Box key={r.key} sx={{ display: "flex", alignItems: "center", gap: 0.65 }}>
              <Box sx={{ width: 14, display: "flex", justifyContent: "center", animation: "rb-glow-pulse 4s ease-in-out infinite", animationDelay: `${i * 0.35}s` }}>
                <Glyph name={r.glyph} color={r.color} size={11} />
              </Box>
              <Box sx={{ width: 72, height: 3, bgcolor: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
                <Box sx={{ width: `${r.value}%`, height: "100%", bgcolor: r.color, borderRadius: 2, boxShadow: `0 0 6px ${rgba(r.color, 0.4)}`, transition: "width 0.65s cubic-bezier(0.4,0,0.2,1)" }} />
                <Box sx={{ position: "absolute", top: 0, bottom: 0, width: "30%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)", animation: "rb-shimmer 3s linear infinite", animationDelay: `${i * 0.5}s`, pointerEvents: "none" }} />
              </Box>
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.48rem", color: rgba(r.color, 0.55), width: 18, textAlign: "right", lineHeight: 1 }}>{r.value}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.45, ml: 0.25, mr: 0.1, flexShrink: 0 }}>
          {(["compact", "detail", "neural"] as HUDState[]).map((s) => (
            <Box key={s} sx={{
              width: 3.5, height: 3.5, borderRadius: "50%",
              bgcolor: s === hudState ? rgba(accent, 0.9) : "rgba(255,255,255,0.1)",
              transition: "background-color 0.25s",
            }} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

// ─── Compact pill — Classic RPG (symbols) ──────────────────────────────────────

export function ClassicPill({ resources, hudState, onClick, accent = DEFAULT_ACCENT }: {
  resources: Resource[]
  hudState: HUDState
  onClick: () => void
  accent?: string
}) {
  const isOpen = hudState !== "compact"

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-flex", alignItems: "center", gap: 0.85,
        background: "rgba(6,10,18,0.93)", backdropFilter: "blur(24px)",
        border: "1px solid",
        borderColor: isOpen ? rgba(accent, 0.4) : rgba(accent, 0.18),
        borderRadius: "100px", px: 1.5, py: 0.85,
        cursor: "pointer", userSelect: "none",
        boxShadow: isOpen ? `0 0 20px ${rgba(accent, 0.1)}` : "none",
        transition: "border-color 0.28s, box-shadow 0.28s",
        "&:hover": { borderColor: rgba(accent, 0.52) },
      }}
    >
      {resources.map((r, i) => (
        <Box key={r.key} sx={{ display: "flex", filter: `drop-shadow(0 0 4px ${rgba(r.color, 0.47)})`, animation: "rb-glow-pulse 4s ease-in-out infinite", animationDelay: `${i * 0.32}s` }}>
          <Glyph name={r.glyph} color={r.color} size={13} />
        </Box>
      ))}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.35, ml: 0.2 }}>
        {(["compact", "detail", "neural"] as HUDState[]).map((s) => (
          <Box key={s} sx={{
            width: 3.5, height: 3.5, borderRadius: "50%",
            bgcolor: s === hudState ? rgba(accent, 0.9) : "rgba(255,255,255,0.1)",
            transition: "background-color 0.25s",
          }} />
        ))}
      </Box>
    </Box>
  )
}

// ─── Orbs panel — detail state ─────────────────────────────────────────────────

/** Small square HUD action button used in the OrbsPanel corner cluster. */
export function ActionButton({ children, accent, active = false, onClick, title }: {
  children: React.ReactNode; accent: string; active?: boolean; onClick?: () => void; title?: string
}) {
  return (
    <Box
      component="button"
      title={title}
      onClick={(e) => { e.stopPropagation(); onClick?.() }}
      sx={{
        all: "unset", boxSizing: "border-box", cursor: "pointer",
        width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "7px",
        border: `1px solid ${rgba(accent, active ? 0.6 : 0.22)}`,
        background: active ? rgba(accent, 0.16) : "rgba(255,255,255,0.02)",
        color: rgba(accent, active ? 0.95 : 0.6),
        fontFamily: "monospace", fontSize: "0.52rem", fontWeight: 700, lineHeight: 1,
        transition: "all 0.18s",
        "&:hover": { borderColor: rgba(accent, 0.7), color: rgba(accent, 0.95), background: rgba(accent, 0.12) },
      }}
    >
      {children}
    </Box>
  )
}

const TIMEFRAMES = ["D", "W", "M"] as const

export function OrbsPanel({ resources, onCollapse, accent = DEFAULT_ACCENT, title = "NEUROTRANSMITTERS", motion = "scramble", actionsSide, extraActions }: {
  resources: Resource[]; onCollapse: () => void; accent?: string; title?: string; motion?: Motion
  /** Side to dock the action cluster beside the bottom orb row. Omit = no cluster. */
  actionsSide?: "left" | "right"
  /** Extra action buttons appended to the cluster (e.g. an Edit toggle). */
  extraActions?: React.ReactNode
}) {
  const filled = useMountFill()
  const [animOn, setAnimOn] = React.useState(true)
  const [animRun, setAnimRun] = React.useState(0)
  const toggleAnim = () => setAnimOn(o => { if (!o) setAnimRun(r => r + 1); return !o })
  const [tf, setTf] = React.useState(0)

  const cluster = actionsSide ? (
    <Stack spacing={0.6} sx={{ alignSelf: "center", flexShrink: 0 }}>
      <ActionButton accent={accent} active={animOn} onClick={toggleAnim} title="Label animation — pause / replay">Aa</ActionButton>
      <ActionButton accent={accent} title="Quick log (coming soon)">＋</ActionButton>
      <ActionButton accent={accent} active={tf !== 0} onClick={() => setTf(i => (i + 1) % TIMEFRAMES.length)} title="Timeframe — today / week / month (charts coming soon)">{TIMEFRAMES[tf]}</ActionButton>
      {extraActions ?? <ActionButton accent={accent} title="About this HUD (docs coming soon)">𝑖</ActionButton>}
    </Stack>
  ) : null

  const bottom = resources.slice(2)

  return (
    <Box sx={{ animation: "rb-fade-up 0.18s cubic-bezier(0.4,0,0.2,1)" }}>
      <Box sx={{
        background: "rgba(4,8,16,0.94)", backdropFilter: "blur(28px)",
        border: `1px solid ${rgba(accent, 0.13)}`,
        borderTop: `2px solid ${rgba(accent, 0.32)}`,
        borderRadius: "12px", p: "14px 14px 12px", position: "relative",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.45rem", color: rgba(accent, 0.3), letterSpacing: 3 }}>
            {title}
          </Typography>
          <Box
            onClick={(e) => { e.stopPropagation(); onCollapse() }}
            sx={{ fontSize: "0.58rem", color: rgba(accent, 0.3), cursor: "pointer", lineHeight: 1, userSelect: "none", transition: "color 0.15s", "&:hover": { color: rgba(accent, 0.7) } }}
          >
            ✕
          </Box>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center", mb: 1.25 }}>
          {resources.slice(0, 2).map((r, i) => <LiquidOrb key={r.key} r={r} motion={motion} filled={filled} delay={i * 65} labelActive={animOn} labelRunKey={animRun} />)}
        </Stack>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
          {actionsSide === "left" && cluster}
          <Stack direction="row" spacing={1.5}>
            {bottom.map((r, i) => <LiquidOrb key={r.key} r={r} motion={motion} filled={filled} delay={(i + 2) * 65} labelActive={animOn} labelRunKey={animRun} />)}
          </Stack>
          {actionsSide === "right" && cluster}
        </Box>
      </Box>
    </Box>
  )
}

// ─── Bars panel — detail state, Classic RPG ────────────────────────────────────

export function BarsPanel({ resources, onCollapse, accent = DEFAULT_ACCENT, motion = "scramble" }: {
  resources: Resource[]; onCollapse: () => void; accent?: string; motion?: Motion
}) {
  const filled = useMountFill()

  return (
    <Box sx={{ animation: "rb-fade-up 0.18s cubic-bezier(0.4,0,0.2,1)" }}>
      <Box sx={{
        background: "rgba(4,8,16,0.94)", backdropFilter: "blur(28px)",
        border: `1px solid ${rgba(accent, 0.13)}`,
        borderTop: `2px solid ${rgba(accent, 0.32)}`,
        borderRadius: "12px", p: "14px 18px 12px", position: "relative",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.45rem", color: rgba(accent, 0.3), letterSpacing: 3 }}>
            RESOURCES
          </Typography>
          <Box
            onClick={(e) => { e.stopPropagation(); onCollapse() }}
            sx={{ fontSize: "0.58rem", color: rgba(accent, 0.3), cursor: "pointer", lineHeight: 1, userSelect: "none", transition: "color 0.15s", "&:hover": { color: rgba(accent, 0.7) } }}
          >
            ✕
          </Box>
        </Box>
        <Stack spacing={0.95}>
          {resources.map((r, i) => (
            <Box key={r.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 15, display: "flex", justifyContent: "center", flexShrink: 0, filter: `drop-shadow(0 0 3px ${rgba(r.color, 0.5)})`, animation: "rb-glow-pulse 4s ease-in-out infinite", animationDelay: `${i * 0.38}s` }}>
                <Glyph name={r.glyph} color={r.color} size={13} />
              </Box>
              <Box sx={{ width: 68, flexShrink: 0 }}>
                {r.alts && r.alts.length > 1
                  ? <MorphLabel motion={motion} words={r.alts} color={rgba(r.color, 0.73)} active fontSize="0.58rem" weight={500} letterSpacing={0.2} />
                  : <Typography sx={{ fontFamily: "monospace", fontSize: "0.58rem", color: rgba(r.color, 0.73), lineHeight: 1, userSelect: "none" }}>{r.shortLabel}</Typography>}
              </Box>
              <Box sx={{ flex: 1, height: 5, bgcolor: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden", position: "relative", minWidth: 88 }}>
                <Box sx={{ width: filled ? `${r.value}%` : "0%", height: "100%", bgcolor: r.color, borderRadius: "100px", boxShadow: `0 0 7px ${rgba(r.color, 0.33)}`, transition: `width 0.85s cubic-bezier(0.4,0,0.2,1) ${i * 55}ms` }} />
                {filled && <Box sx={{ position: "absolute", top: 0, bottom: 0, width: "28%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)", animation: "rb-shimmer 2.8s linear infinite", animationDelay: `${i * 0.4}s`, pointerEvents: "none" }} />}
              </Box>
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.58rem", color: rgba(r.color, 0.6), width: 22, textAlign: "right", flexShrink: 0, lineHeight: 1, opacity: filled ? 1 : 0, transition: `opacity 0.3s ease ${i * 55}ms` }}>
                {r.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

// ─── Neural panel — pentagon radar, fully themed to the HUD accent ─────────────

export function NeuralPanel({ resources, onCollapse, accent = DEFAULT_ACCENT, title = "NEURAL MAP" }: {
  resources: Resource[]; onCollapse: () => void; accent?: string; title?: string
}) {
  const filled = useMountFill(40)
  const gradId = React.useId().replace(/:/g, "n")
  const SIZE = 158, cx = SIZE / 2, cy = SIZE / 2, R = 56, rInner = 8

  function vertex(i: number, radius: number) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) }
  }

  const outerPts = Array.from({ length: 5 }, (_, i) => vertex(i, R))
  const valuePts = resources.map((r, i) => vertex(i, rInner + (R - rInner) * (r.value / 100)))
  const valuePath = valuePts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z"
  const gridRatios = [0.25, 0.5, 0.75, 1.0]

  return (
    <Box sx={{ animation: "rb-fade-up 0.18s cubic-bezier(0.4,0,0.2,1)" }}>
      <Box sx={{
        background: "rgba(4,8,16,0.94)", backdropFilter: "blur(28px)",
        border: `1px solid ${rgba(accent, 0.16)}`,
        borderTop: `2px solid ${rgba(accent, 0.44)}`,
        borderRadius: "12px", p: "14px 14px 10px", position: "relative",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.45rem", color: rgba(accent, 0.42), letterSpacing: 3 }}>
            {title}
          </Typography>
          <Box
            onClick={(e) => { e.stopPropagation(); onCollapse() }}
            sx={{ fontSize: "0.58rem", color: rgba(accent, 0.32), cursor: "pointer", lineHeight: 1, userSelect: "none", transition: "color 0.15s", "&:hover": { color: rgba(accent, 0.7) } }}
          >
            ✕
          </Box>
        </Box>

        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ display: "block", margin: "0 auto" }}>
          <defs>
            <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={rgba(accent, 0.3)} />
              <stop offset="70%" stopColor={rgba(accent, 0.07)} />
              <stop offset="100%" stopColor={rgba(accent, 0.01)} />
            </radialGradient>
          </defs>

          {gridRatios.map((ratio, ri) => {
            const pts = Array.from({ length: 5 }, (_, i) => vertex(i, rInner + (R - rInner) * ratio))
            const p = pts.map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(" ") + " Z"
            return <path key={ri} d={p} fill="none" stroke={ratio === 1 ? rgba(accent, 0.18) : rgba(accent, 0.09)} strokeWidth={ratio === 1 ? 1 : 0.75} />
          })}

          {outerPts.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={rgba(accent, 0.09)} strokeWidth={0.75} />
          ))}

          <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: filled ? "scale(1)" : "scale(0)", transition: "transform 0.9s cubic-bezier(0.34,1.3,0.64,1)" }}>
            <path d={valuePath} fill={`url(#${gradId})`} stroke={rgba(accent, 0.7)} strokeWidth={1.5} style={{ filter: `drop-shadow(0 0 10px ${rgba(accent, 0.4)})` }} />
          </g>

          {resources.map((r, i) => {
            const radius = rInner + (R - rInner) * (r.value / 100)
            const vp = vertex(i, radius)
            const lv = vertex(i, R + 16)
            return (
              <g key={r.key}>
                <circle cx={vp.x} cy={vp.y} r={3.5} fill={r.color} style={{ opacity: filled ? 1 : 0, transition: `opacity 0.4s ease ${i * 65}ms`, filter: `drop-shadow(0 0 6px ${r.color})` }} />
                <foreignObject x={lv.x - 7} y={lv.y - 7} width={14} height={14} style={{ overflow: "visible" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, filter: `drop-shadow(0 0 3px ${rgba(r.color, 0.4)})` }}>
                    <Glyph name={r.glyph} color={r.color} size={12} />
                  </Box>
                </foreignObject>
              </g>
            )
          })}
          <circle cx={cx} cy={cy} r={2.2} fill={rgba(accent, 0.8)} style={{ filter: `drop-shadow(0 0 4px ${rgba(accent, 0.9)})` }} />
        </svg>

        <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center", mt: 0.5 }}>
          {resources.map(r => (
            <Box key={r.key} sx={{ display: "flex", alignItems: "center", gap: 0.35 }}>
              <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: r.color, boxShadow: `0 0 5px ${rgba(r.color, 0.5)}` }} />
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.44rem", color: rgba(r.color, 0.55) }}>{r.value}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
