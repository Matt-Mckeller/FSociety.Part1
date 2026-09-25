"use client";

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { NavigationProvider } from "@expanse/map";
import type { MapGridNavigationConfig } from "@expanse/map";
import { ActionDock } from "@expanse/hud";

// Widgets, data, and helpers are the single source of truth in ./resourceBars —
// the live corner HUD (ResourceCornerHud) and these stories render the same code.
import {
  rgba,
  Glyph,
  CenterMark,
  MorphLabel,
  SharedKeyframes,
  OrbitalCompactWidget,
  ClassicPill,
  OrbsPanel,
  BarsPanel,
  NeuralPanel,
  advance,
  MIND_ACCENT,
  BODY_ACCENT,
  MIND_WORDS,
  BODY_WORDS,
  RESOURCES,
  MIND_RESOURCES,
  BODY_RESOURCES,
  ResourceCornerHud,
  ResourceBarsProvider,
  type Resource,
  type Motion,
  type HUDState,
} from "./resourceBars";

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV_CONFIG: MapGridNavigationConfig = {
  dimensions: { width: 2, height: 2, homePosition: { x: 0, y: 0 }, wrapAround: false },
  tiles: [{ id: "home", position: { x: 0, y: 0 }, seo: { title: "Home" }, display: { label: "Home", category: "primary", colors: { inactive: "rgba(99,102,241,0.3)", active: "#6366f1" } } }],
}

// ─── Stage ────────────────────────────────────────────────────────────────────

function Stage({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <NavigationProvider config={NAV_CONFIG}>
      <SharedKeyframes />
      <Box sx={{
        position: "relative", width: "100vw", height: "100vh", overflow: "hidden",
        background: "linear-gradient(155deg, #070c14 0%, #0b1422 55%, #070c12 100%)",
      }}>
        <Box sx={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.028) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <Box sx={{
          position: "absolute", top: 0, left: 0, right: 0, height: 44,
          background: "rgba(5,8,16,0.94)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(56,189,248,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.52rem", color: "rgba(56,189,248,0.18)", letterSpacing: 4 }}>
            {label}
          </Typography>
        </Box>
        {children}
      </Box>
    </NavigationProvider>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "HUD/Resource Bars",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#070c14" }] },
  },
}
export default meta
type Story = StoryObj

// =============================================================================
// Story: Mind Orbital HUD  ★  (amber — Mood · Motivation · Energy)
// =============================================================================

export const MindOrbitalHUD: Story = {
  name: "Mind Orbital HUD — Mood · Motivation · Energy  ★",
  argTypes: { initialState: { control: "select", options: ["compact", "detail", "neural"], name: "state" } },
  args: { initialState: "compact" },
  render: (args: { initialState?: HUDState }) => {
    function Demo() {
      const [state, setState] = React.useState<HUDState>(args.initialState ?? "compact")
      return (
        <Stage label="MIND ORBITAL HUD  ·  hover center for facets  ·  click to cycle  ·  compact → orbs → neural">
          <ActionDock position="bottom-left" offset={24}>
            <Stack sx={{ flexDirection: "column-reverse", gap: 1.25, alignItems: "flex-start" }}>
              <OrbitalCompactWidget resources={MIND_RESOURCES} hudState={state} accent={MIND_ACCENT} centerGlyph="brain" centerWords={MIND_WORDS} onClick={() => setState(s => advance(s))} />
              {state === "detail"  && <OrbsPanel resources={MIND_RESOURCES} accent={MIND_ACCENT} title="MIND · NEUROTRANSMITTERS" actionsSide="right" onCollapse={() => setState("compact")} />}
              {state === "neural" && <NeuralPanel resources={MIND_RESOURCES} accent={MIND_ACCENT} title="MIND MAP" onCollapse={() => setState("compact")} />}
            </Stack>
          </ActionDock>
        </Stage>
      )
    }
    return <Demo />
  },
}

// =============================================================================
// Story: Body Orbital HUD  ★  (red — Health · Presence · Clarity)
// =============================================================================

export const BodyOrbitalHUD: Story = {
  name: "Body Orbital HUD — Health · Presence · Clarity  ★",
  argTypes: { initialState: { control: "select", options: ["compact", "detail", "neural"], name: "state" } },
  args: { initialState: "compact" },
  render: (args: { initialState?: HUDState }) => {
    function Demo() {
      const [state, setState] = React.useState<HUDState>(args.initialState ?? "compact")
      return (
        <Stage label="BODY ORBITAL HUD  ·  hover center for facets  ·  labels cycle domains  ·  click to cycle">
          <ActionDock position="bottom-right" offset={24}>
            <Stack sx={{ flexDirection: "column-reverse", gap: 1.25, alignItems: "flex-end" }}>
              <OrbitalCompactWidget resources={BODY_RESOURCES} hudState={state} accent={BODY_ACCENT} centerGlyph="heart" centerWords={BODY_WORDS} onClick={() => setState(s => advance(s))} />
              {state === "detail"  && <OrbsPanel resources={BODY_RESOURCES} accent={BODY_ACCENT} title="BODY · PRESENCE" actionsSide="left" onCollapse={() => setState("compact")} />}
              {state === "neural" && <NeuralPanel resources={BODY_RESOURCES} accent={BODY_ACCENT} title="PRESENCE MAP" onCollapse={() => setState("compact")} />}
            </Stack>
          </ActionDock>
        </Stage>
      )
    }
    return <Demo />
  },
}

// =============================================================================
// Story: Body Center Icon — Variants
// =============================================================================

export const BodyCenterIconVariants: Story = {
  name: "Body Center Icon — Variants",
  render: () => {
    function Variant({ glyph, label, primary }: { glyph: string; label: string; primary?: boolean }) {
      const [hover, setHover] = React.useState(false)
      const S = 64, rad = 24, stroke = 4, circ = 2 * Math.PI * rad, cx = S / 2, cy = S / 2
      return (
        <Stack spacing={1.25} sx={{ alignItems: "center" }}>
          <Box
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            sx={{ position: "relative", width: S, height: S, cursor: "pointer" }}
          >
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: "block" }}>
              <circle cx={cx} cy={cy} r={rad} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
              <circle cx={cx} cy={cy} r={rad} fill="none" stroke={rgba(BODY_ACCENT, 0.78)} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={circ * 0.38} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} style={{ filter: `drop-shadow(0 0 6px ${rgba(BODY_ACCENT, 0.6)})` }} />
            </svg>
            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CenterMark glyph={glyph} words={BODY_WORDS} accent={BODY_ACCENT} active={hover} size={28} />
            </Box>
          </Box>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.55rem", color: primary ? rgba(BODY_ACCENT, 0.9) : "rgba(255,255,255,0.45)", letterSpacing: 1.5 }}>
            {label}{primary ? "  ★" : ""}
          </Typography>
        </Stack>
      )
    }
    return (
      <Stage label="BODY CENTER ICON — VARIANTS  ·  hover any ring to morph icon → facets">
        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Stack direction="row" spacing={6}>
            <Variant glyph="heart" label="PULSE HEART" primary />
            <Variant glyph="character" label="4EYE CHARACTER" />
            <Variant glyph="vitruvian" label="VITRUVIAN" />
          </Stack>
        </Box>
      </Stage>
    )
  },
}

// =============================================================================
// Story: Label Motion — Variants
// =============================================================================

export const LabelMotionVariants: Story = {
  name: "Label Motion — Variants",
  render: () => {
    const sample = ["Fuel", "Nutrition", "Diet", "Food"]
    function Col({ motion, label, primary }: { motion: Motion; label: string; primary?: boolean }) {
      return (
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.5rem", color: primary ? rgba(MIND_ACCENT, 0.9) : "rgba(255,255,255,0.4)", letterSpacing: 2 }}>
            {label}{primary ? "  ★" : ""}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 130, minHeight: 40, px: 2.5, py: 1.5, borderRadius: "10px", border: `1px solid ${rgba(MIND_ACCENT, 0.22)}`, background: "rgba(6,10,18,0.7)" }}>
            <MorphLabel motion={motion} words={sample} color={rgba(MIND_ACCENT, 0.92)} active fontSize="0.9rem" weight={700} letterSpacing={1} />
          </Box>
        </Stack>
      )
    }
    return (
      <Stage label="LABEL MOTION — VARIANTS  ·  primary = fast scramble-decode">
        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Stack direction="row" spacing={6}>
            <Col motion="scramble" label="SCRAMBLE-DECODE" primary />
            <Col motion="crossfade" label="CROSSFADE-SLIDE" />
            <Col motion="flip" label="FLIP / ODOMETER" />
          </Stack>
        </Box>
      </Stage>
    )
  },
}

// =============================================================================
// Story: Classic RPG HUD  ★
// =============================================================================

export const ClassicRPGHUD: Story = {
  name: "Classic RPG HUD  ★",
  render: () => {
    function Demo() {
      const [state, setState] = React.useState<HUDState>("compact")
      return (
        <Stage label="CLASSIC RPG HUD  ·  click pill to cycle  ·  compact → bars → neural">
          <ActionDock position="bottom-right" offset={24}>
            <Stack sx={{ flexDirection: "column-reverse", gap: 1.25, alignItems: "flex-end" }}>
              <ClassicPill resources={RESOURCES} hudState={state} onClick={() => setState(s => advance(s))} />
              {state === "detail"  && <BarsPanel resources={RESOURCES} onCollapse={() => setState("compact")} />}
              {state === "neural" && <NeuralPanel resources={RESOURCES} onCollapse={() => setState("compact")} />}
            </Stack>
          </ActionDock>
        </Stage>
      )
    }
    return <Demo />
  },
}

// =============================================================================
// Story: Both Corners  ★  — Mind (amber, BL) + Body (red, BR)
// =============================================================================

export const BothCorners: Story = {
  name: "Both Corners — Mind + Body",
  render: () => {
    function Demo() {
      const [stateL, setStateL] = React.useState<HUDState>("compact")
      const [stateR, setStateR] = React.useState<HUDState>("compact")
      return (
        <Stage label="BOTH CORNERS  ·  mind BL (amber)  ·  body BR (red)  ·  click each to cycle">
          <ActionDock position="bottom-left" offset={24}>
            <Stack sx={{ flexDirection: "column-reverse", gap: 1.25, alignItems: "flex-start" }}>
              <OrbitalCompactWidget resources={MIND_RESOURCES} hudState={stateL} accent={MIND_ACCENT} centerGlyph="brain" centerWords={MIND_WORDS} onClick={() => setStateL(s => advance(s))} />
              {stateL === "detail"  && <OrbsPanel resources={MIND_RESOURCES} accent={MIND_ACCENT} title="MIND · NEUROTRANSMITTERS" actionsSide="right" onCollapse={() => setStateL("compact")} />}
              {stateL === "neural" && <NeuralPanel resources={MIND_RESOURCES} accent={MIND_ACCENT} title="MIND MAP" onCollapse={() => setStateL("compact")} />}
            </Stack>
          </ActionDock>
          <ActionDock position="bottom-right" offset={24}>
            <Stack sx={{ flexDirection: "column-reverse", gap: 1.25, alignItems: "flex-end" }}>
              <OrbitalCompactWidget resources={BODY_RESOURCES} hudState={stateR} accent={BODY_ACCENT} centerGlyph="heart" centerWords={BODY_WORDS} onClick={() => setStateR(s => advance(s))} />
              {stateR === "detail"  && <OrbsPanel resources={BODY_RESOURCES} accent={BODY_ACCENT} title="BODY · PRESENCE" actionsSide="left" onCollapse={() => setStateR("compact")} />}
              {stateR === "neural" && <NeuralPanel resources={BODY_RESOURCES} accent={BODY_ACCENT} title="PRESENCE MAP" onCollapse={() => setStateR("compact")} />}
            </Stack>
          </ActionDock>
        </Stage>
      )
    }
    return <Demo />
  },
}

// =============================================================================
// Story: Editable Corner HUD — the live component used on Character/Profile
// =============================================================================

export const EditableCornerHud: Story = {
  name: "Editable Corner HUD — Character/Profile  ★",
  render: () => (
    <Stage label="EDITABLE CORNER HUD  ·  click pill → detail  ·  ✎ to edit values / labels  ·  this is the live component">
      <ResourceBarsProvider>
        <ResourceCornerHud />
      </ResourceBarsProvider>
    </Stage>
  ),
}

// =============================================================================
// Story: Live Demo — values drift in real time
// =============================================================================

export const LiveDemo: Story = {
  name: "Live Demo — Values Update",
  render: () => {
    function Demo() {
      const [vals, setVals] = React.useState(() => [...MIND_RESOURCES, ...BODY_RESOURCES].map(r => r.value))
      const [stateL, setStateL] = React.useState<HUDState>("detail")
      const [stateR, setStateR] = React.useState<HUDState>("detail")

      React.useEffect(() => {
        const t = setInterval(() => {
          setVals(prev => prev.map(v => Math.max(5, Math.min(97, Math.round(v + (Math.random() - 0.46) * 13)))))
        }, 1800)
        return () => clearInterval(t)
      }, [])

      const mind: Resource[] = MIND_RESOURCES.map((r, i) => ({ ...r, value: vals[i]! }))
      const body: Resource[] = BODY_RESOURCES.map((r, i) => ({ ...r, value: vals[i + MIND_RESOURCES.length]! }))
      return (
        <Stage label="LIVE DEMO  ·  values drift every 1.8s  ·  liquid tracks levels  ·  click to cycle">
          <ActionDock position="bottom-left" offset={24}>
            <Stack sx={{ flexDirection: "column-reverse", gap: 1.25, alignItems: "flex-start" }}>
              <OrbitalCompactWidget resources={mind} hudState={stateL} accent={MIND_ACCENT} centerGlyph="brain" centerWords={MIND_WORDS} onClick={() => setStateL(s => advance(s))} />
              {stateL === "detail"  && <OrbsPanel resources={mind} accent={MIND_ACCENT} title="MIND · NEUROTRANSMITTERS" actionsSide="right" onCollapse={() => setStateL("compact")} />}
              {stateL === "neural" && <NeuralPanel resources={mind} accent={MIND_ACCENT} title="MIND MAP" onCollapse={() => setStateL("compact")} />}
            </Stack>
          </ActionDock>
          <ActionDock position="bottom-right" offset={24}>
            <Stack sx={{ flexDirection: "column-reverse", gap: 1.25, alignItems: "flex-end" }}>
              <OrbitalCompactWidget resources={body} hudState={stateR} accent={BODY_ACCENT} centerGlyph="heart" centerWords={BODY_WORDS} onClick={() => setStateR(s => advance(s))} />
              {stateR === "detail"  && <OrbsPanel resources={body} accent={BODY_ACCENT} title="BODY · PRESENCE" actionsSide="left" onCollapse={() => setStateR("compact")} />}
              {stateR === "neural" && <NeuralPanel resources={body} accent={BODY_ACCENT} title="PRESENCE MAP" onCollapse={() => setStateR("compact")} />}
            </Stack>
          </ActionDock>
        </Stage>
      )
    }
    return <Demo />
  },
}

// =============================================================================
// Docs helpers
// =============================================================================

function DocPanel({ accent, title, children, width = 560 }: { accent: string; title: string; children: React.ReactNode; width?: number }) {
  return (
    <Box sx={{
      width, background: "rgba(4,8,16,0.92)", backdropFilter: "blur(20px)",
      border: `1px solid ${rgba(accent, 0.16)}`, borderTop: `2px solid ${rgba(accent, 0.4)}`,
      borderRadius: "12px", p: "16px 18px",
    }}>
      <Typography sx={{ fontFamily: "monospace", fontSize: "0.5rem", color: rgba(accent, 0.5), letterSpacing: 3, mb: 1.5 }}>{title}</Typography>
      {children}
    </Box>
  )
}

function DocScroll({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ position: "absolute", inset: 0, pt: "60px", pb: 4, overflowY: "auto", display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5 }}>{children}</Box>
    </Box>
  )
}

// =============================================================================
// Story: Color System — documented hex scale + theory
// =============================================================================

export const ColorSystem: Story = {
  name: "Docs — Color System",
  render: () => {
    function Body({ text }: { text: string }) {
      return <Typography sx={{ fontFamily: "monospace", fontSize: "0.56rem", lineHeight: 1.7, color: "rgba(255,255,255,0.62)" }}>{text}</Typography>
    }
    function ShadeScale({ accent, label, resources }: { accent: string; label: string; resources: Resource[] }) {
      const ordered = [...resources].sort((a, b) => (a.lift ?? 0) - (b.lift ?? 0)) // darkest (heaviest) first
      return (
        <DocPanel accent={accent} title={label} width={560}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25 }}>
            <Box sx={{ width: 26, height: 26, borderRadius: "7px", background: accent, boxShadow: `0 0 12px ${rgba(accent, 0.5)}` }} />
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.85)" }}>accent <b>{accent}</b></Typography>
          </Box>
          <Stack spacing={0.5}>
            {ordered.map((r, i) => (
              <Box key={r.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: "6px", background: r.color, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Glyph name={r.glyph} color="rgba(255,255,255,0.9)" size={13} />
                </Box>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.56rem", color: "rgba(255,255,255,0.8)", width: 96, flexShrink: 0 }}>{r.label}</Typography>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.56rem", color: rgba(accent, 0.8), width: 64, flexShrink: 0 }}>{r.color}</Typography>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", width: 70, flexShrink: 0 }}>lift {(r.lift ?? 0) >= 0 ? "+" : ""}{(r.lift ?? 0).toFixed(2)}</Typography>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)" }}>
                  {i === 0 ? "heaviest ↓" : i === ordered.length - 1 ? "lightest ↑" : ""}
                </Typography>
              </Box>
            ))}
          </Stack>
        </DocPanel>
      )
    }
    return (
      <Stage label="COLOR SYSTEM  ·  one accent per HUD  ·  shade = relative weight">
        <DocScroll>
          <DocPanel accent="#94a3b8" title="THEORY" width={560}>
            <Stack spacing={1}>
              <Body text="Each HUD is monochrome: one accent owns the whole chrome — ring, orbs, borders, neural map — so a glance reads 'Mind' (amber) or 'Body' (red) instantly." />
              <Body text="Within a HUD every orb is a TINT of that accent. The tint encodes RELATIVE WEIGHT toward the group energy: darker = heavier / more foundational, lighter = more supportive. `lift` shifts the accent toward black (−, darker, heavier) or white (+, lighter)." />
              <Body text="Why shade can mean weight: the orb's empty space already signals 'needs attention' (a low orb looks drained regardless of hue). So the two channels stay independent — emptiness = urgency, shade = importance." />
              <Body text="Accents: Mind #f59e0b (dopamine amber / earn-orange family). Body #ef4444 (red). Dopamine is the master driver → darkest Mind orb; Nutrition + Exercise carry the most weight → darkest Body orbs." />
            </Stack>
          </DocPanel>
          <ShadeScale accent={MIND_ACCENT} label="MIND · AMBER SCALE  (darkest = heaviest)" resources={MIND_RESOURCES} />
          <ShadeScale accent={BODY_ACCENT} label="BODY · RED SCALE  (darkest = heaviest)" resources={BODY_RESOURCES} />
        </DocScroll>
      </Stage>
    )
  },
}

// =============================================================================
// Story: Icon Alternatives — current + 2 alts each, scored
// =============================================================================

const ALT_GLYPHS: Record<string, string> = {
  dopamine_chain: `<circle cx="6" cy="17.5" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2.1" fill="currentColor"/><circle cx="18" cy="6.5" r="2" fill="currentColor"/><path d="M7.6 16.1 10.4 13.4M13.6 10.6 16.4 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  dopamine_spark: `<circle cx="12" cy="12" r="2.6" fill="currentColor"/><path d="M12 3v3.6M12 17.4V21M3 12h3.6M17.4 12H21M6 6l2.4 2.4M15.6 15.6 18 18M18 6l-2.4 2.4M8.4 15.6 6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  norepi_double: `<path d="M11 2.5 5.5 11.5H9l-1 6 6-8.5H10.5L11 2.5Z" fill="currentColor"/><path d="M17.5 9 14 14.5h2.2l-.8 4 3.4-6h-2.2L17.5 9Z" fill="currentColor" opacity="0.6"/>`,
  norepi_siren: `<circle cx="12" cy="13" r="2.4" fill="currentColor"/><path d="M8.6 9.6a5 5 0 0 0 0 6.8M15.4 9.6a5 5 0 0 1 0 6.8M6.1 7.1a8.4 8.4 0 0 0 0 11.8M17.9 7.1a8.4 8.4 0 0 1 0 11.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.85"/>`,
  serotonin_horizon: `<circle cx="12" cy="9.5" r="2.8" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M4 15h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M5 18.4c1.3-1.1 2.6-1.1 3.9 0s2.6 1.1 3.9 0 2.6-1.1 3.9 0" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
  serotonin_scale: `<path d="M12 4v15M7 19h10M6 7.5h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 7.5 3.7 12.2a2.3 2.3 0 0 0 4.6 0L6 7.5ZM18 7.5l-2.3 4.7a2.3 2.3 0 0 0 4.6 0L18 7.5Z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linejoin="round"/>`,
  oxytocin_heartlink: `<path d="M9 16.4C9 16.4 4.6 13.4 4.6 9.9A2.6 2.6 0 0 1 9 8.3 2.6 2.6 0 0 1 13.4 9.9C13.4 13.4 9 16.4 9 16.4Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="17" cy="13" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  oxytocin_figures: `<circle cx="8" cy="7" r="2" fill="currentColor"/><circle cx="16" cy="7" r="2" fill="currentColor"/><path d="M5.5 19c0-2.2 1.1-3.4 2.5-3.4S10.5 16.8 10.5 19M13.5 19c0-2.2 1.1-3.4 2.5-3.4S18.5 16.8 18.5 19M9.6 11.4 14.4 11.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  energy_battery: `<rect x="3.5" y="8" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M19.5 11v3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M10.5 9.4 8 13h2.4l-.5 3 2.8-4H10.4l0.1-2.6Z" fill="currentColor"/>`,
  energy_sun: `<circle cx="12" cy="12" r="3.3" fill="currentColor"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5 7.6 7.6M16.4 16.4 18.5 18.5M18.5 5.5 16.4 7.6M7.6 16.4 5.5 18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  breath_lungs: `<path d="M12 4.5v6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 9c0 4-1 5-2.4 7.2-.9 1.5-3.1 1.2-3.4-.5-.3-1.8.3-4.4 1.5-6.2C7.6 8.2 9.4 8.5 11 9ZM13 9c0 4 1 5 2.4 7.2.9 1.5 3.1 1.2 3.4-.5.3-1.8-.3-4.4-1.5-6.2C16.4 8.2 14.6 8.5 13 9Z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linejoin="round"/>`,
  breath_wind: `<path d="M3 8h9.5a2.4 2.4 0 1 0-2.4-2.4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M3 12.5h12.5a2.7 2.7 0 1 1-2.7 2.7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M3 17h6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  movement_runner: `<circle cx="14.5" cy="5.5" r="2.1" fill="currentColor"/><path d="M6 13.5l3.2-1.2 2.6 1.4 2 2.8M11.8 13.7 10.4 17l-3.4 2.8M13.8 16.5l3 .8 2.2-1.2M9.2 12.3 12 8.8l3.5.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  movement_steps: `<ellipse cx="8.5" cy="8" rx="2.1" ry="3.1" fill="currentColor"/><path d="M6.6 12.5c0 1.4 3.8 1.4 3.8 0" stroke="currentColor" stroke-width="1.3" fill="none"/><ellipse cx="15.5" cy="15" rx="2.1" ry="3.1" fill="currentColor"/><path d="M13.6 19.5c0 1.4 3.8 1.4 3.8 0" stroke="currentColor" stroke-width="1.3" fill="none"/>`,
  fuel_apple: `<path d="M12 8.5c-3 0-5 2.2-5 5.6S9 21 12 21s5-3.5 5-6.9-2-5.6-5-5.6Z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 8.5V5.5M12 5.5c1.8-1.6 3.6-.8 3.6-.8 0 1.8-1.8 2.6-3.6.8Z" fill="currentColor"/>`,
  fuel_wheat: `<path d="M12 21V8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 9c-2 0-3.2-1.5-3.2-3.6 2.1 0 3.2 1.5 3.2 3.6ZM12 9c2 0 3.2-1.5 3.2-3.6-2.1 0-3.2 1.5-3.2 3.6ZM12 13.5c-2 0-3.2-1.5-3.2-3.6 2.1 0 3.2 1.5 3.2 3.6ZM12 13.5c2 0 3.2-1.5 3.2-3.6-2.1 0-3.2 1.5-3.2 3.6Z" fill="currentColor"/>`,
  rest_zzz: `<path d="M5 7.5h5l-5 6h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M13 5h4.5l-4.5 5h4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75"/>`,
  rest_bed: `<path d="M3 8.5v10M3 13h18v5.5M21 18.5V13a2 2 0 0 0-2-2H10v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="6.8" cy="11" r="1.7" fill="currentColor"/>`,
  hydration_wave: `<path d="M3 7.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 12.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 17.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  hydration_glass: `<path d="M7 4h10l-1 15.2a1 1 0 0 1-1 .9H9a1 1 0 0 1-1-.9L7 4Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><path d="M7.45 10.5h9.1l-.6 8.3a1 1 0 0 1-1 .9H9a1 1 0 0 1-1-.9L7.45 10.5Z" fill="currentColor" opacity="0.55"/>`,
}

type IconOption = { name?: string; markup?: string; label: string; desc: string; score: number; primary?: boolean }
const ICON_ALTERNATIVES: Record<string, IconOption[]> = {
  dopamine: [
    { name: "dopamine", label: "Reward node", desc: "Node + up-arrow = drive, directional", score: 9, primary: true },
    { markup: ALT_GLYPHS.dopamine_chain, label: "Rising chain", desc: "Molecular, but reads 'growth' not reward", score: 7 },
    { markup: ALT_GLYPHS.dopamine_spark, label: "Reward burst", desc: "Energetic, conflicts with Energy's atom", score: 6 },
  ],
  norepinephrine: [
    { name: "norepinephrine", label: "Alert bolt", desc: "Instant 'alertness / surge' read", score: 9, primary: true },
    { markup: ALT_GLYPHS.norepi_double, label: "Double bolt", desc: "More intense, busier at 13px", score: 7 },
    { markup: ALT_GLYPHS.norepi_siren, label: "Alarm rings", desc: "Reads 'alert', less chemical", score: 6 },
  ],
  serotonin: [
    { name: "serotonin", label: "Settled ring", desc: "Calm ring + level wave = balanced mood", score: 8, primary: true },
    { markup: ALT_GLYPHS.serotonin_horizon, label: "Calm horizon", desc: "Serene, but overlaps Body/breath vibe", score: 7 },
    { markup: ALT_GLYPHS.serotonin_scale, label: "Balance scale", desc: "Literal 'balance', less molecular", score: 6 },
  ],
  oxytocin: [
    { name: "oxytocin", label: "Linked rings", desc: "Bond as two molecules — on-brand", score: 8, primary: true },
    { markup: ALT_GLYPHS.oxytocin_heartlink, label: "Heart + ring", desc: "Warmer, but heart is Body's center mark", score: 7 },
    { markup: ALT_GLYPHS.oxytocin_figures, label: "Two figures", desc: "Clear 'bonding', least chemical", score: 6 },
  ],
  energy: [
    { name: "energy", label: "Atom orbit", desc: "Vitality as orbiting electrons", score: 8, primary: true },
    { markup: ALT_GLYPHS.energy_battery, label: "Charged cell", desc: "Clear 'reserve', a bit utilitarian", score: 7 },
    { markup: ALT_GLYPHS.energy_sun, label: "Radiant sun", desc: "Bright vitality, generic energy trope", score: 6 },
  ],
  breath: [
    { name: "breath", label: "Expansion rings", desc: "Radiating from a still center = breath", score: 8, primary: true },
    { markup: ALT_GLYPHS.breath_lungs, label: "Lungs", desc: "Literal organ, busy at small size", score: 7 },
    { markup: ALT_GLYPHS.breath_wind, label: "Air gusts", desc: "Reads 'wind/air', less 'breathing'", score: 6 },
  ],
  movement: [
    { name: "movement", label: "Stride line", desc: "Ascending motion path, abstract + clean", score: 8, primary: true },
    { markup: ALT_GLYPHS.movement_runner, label: "Runner", desc: "Most literal, fragile at 13px", score: 7 },
    { markup: ALT_GLYPHS.movement_steps, label: "Footsteps", desc: "Clear 'walk', static feel", score: 6 },
  ],
  fuel: [
    { name: "fuel", label: "Flame", desc: "Fuel = combustion, energy-in", score: 8, primary: true },
    { markup: ALT_GLYPHS.fuel_apple, label: "Apple", desc: "Reads 'nutrition' directly, narrows it", score: 7 },
    { markup: ALT_GLYPHS.fuel_wheat, label: "Grain", desc: "Wholesome 'food', less 'fuel/energy'", score: 6 },
  ],
  rest: [
    { name: "rest", label: "Crescent", desc: "Universal sleep/night symbol", score: 9, primary: true },
    { markup: ALT_GLYPHS.rest_zzz, label: "Zzz", desc: "Unmistakable sleep, a bit cartoony", score: 7 },
    { markup: ALT_GLYPHS.rest_bed, label: "Bed", desc: "Literal rest, busiest of the three", score: 6 },
  ],
  hydration: [
    { name: "hydration", label: "Droplet", desc: "Cleanest water symbol", score: 9, primary: true },
    { markup: ALT_GLYPHS.hydration_wave, label: "Waves", desc: "Water as flow, less 'a drink'", score: 7 },
    { markup: ALT_GLYPHS.hydration_glass, label: "Glass", desc: "Literal 'drink water', utilitarian", score: 6 },
  ],
}

export const IconAlternatives: Story = {
  name: "Docs — Icon Alternatives",
  render: () => {
    function ScoreChip({ score, accent }: { score: number; accent: string }) {
      return (
        <Box sx={{ px: 0.6, py: 0.15, borderRadius: "5px", border: `1px solid ${rgba(accent, 0.35)}`, background: rgba(accent, 0.1) }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.46rem", color: rgba(accent, 0.9), lineHeight: 1.3 }}>{score}/10</Typography>
        </Box>
      )
    }
    function OptionCell({ opt, color }: { opt: IconOption; color: string }) {
      return (
        <Stack spacing={0.6} sx={{ width: 110, alignItems: "center" }}>
          <Box sx={{
            width: 44, height: 44, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${opt.primary ? rgba(color, 0.7) : "rgba(255,255,255,0.1)"}`,
            background: opt.primary ? rgba(color, 0.12) : "rgba(255,255,255,0.02)",
            boxShadow: opt.primary ? `0 0 14px ${rgba(color, 0.25)}` : "none",
          }}>
            <Glyph name={opt.name} markup={opt.markup} color={color} size={22} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.5rem", color: opt.primary ? rgba(color, 0.95) : "rgba(255,255,255,0.6)" }}>{opt.label}{opt.primary ? " ★" : ""}</Typography>
            <ScoreChip score={opt.score} accent={color} />
          </Box>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.44rem", color: "rgba(255,255,255,0.4)", textAlign: "center", lineHeight: 1.4, height: 22 }}>{opt.desc}</Typography>
        </Stack>
      )
    }
    function Section({ accent, label, resources }: { accent: string; label: string; resources: Resource[] }) {
      return (
        <DocPanel accent={accent} title={label} width={520}>
          <Stack spacing={1.5}>
            {resources.map(r => (
              <Box key={r.key} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ width: 70, flexShrink: 0, display: "flex", alignItems: "center", gap: 0.6 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: r.color, boxShadow: `0 0 6px ${rgba(r.color, 0.6)}` }} />
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.52rem", color: "rgba(255,255,255,0.8)" }}>{r.label}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {(ICON_ALTERNATIVES[r.key] ?? []).map((opt, i) => <OptionCell key={i} opt={opt} color={r.color} />)}
                </Box>
              </Box>
            ))}
          </Stack>
        </DocPanel>
      )
    }
    return (
      <Stage label="ICON ALTERNATIVES  ·  current ★ kept  ·  scored vs. brand fit + legibility">
        <DocScroll>
          <Section accent={MIND_ACCENT} label="MIND · NEUROTRANSMITTERS" resources={MIND_RESOURCES} />
          <Section accent={BODY_ACCENT} label="BODY · PRESENCE" resources={BODY_RESOURCES} />
        </DocScroll>
      </Stage>
    )
  },
}

// =============================================================================
// Story: About — the dedicated component docs page (Info button target)
// =============================================================================

export const About: Story = {
  name: "Docs — About this HUD",
  render: () => {
    function Line({ text, dim }: { text: string; dim?: boolean }) {
      return <Typography sx={{ fontFamily: "monospace", fontSize: "0.56rem", lineHeight: 1.7, color: dim ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.66)" }}>{text}</Typography>
    }
    return (
      <Stage label="ABOUT  ·  the Orbital HUD resource component">
        <DocScroll>
          <DocPanel accent="#94a3b8" title="WHAT THIS IS" width={580}>
            <Stack spacing={1}>
              <Line text="The Orbital HUD is a corner resource readout with three states, cycled by clicking the widget:" />
              <Line text="  compact  — ring (group avg) + branded center mark + mini bars" />
              <Line text="  orbs     — d3-style liquid orbs, one per sub-resource, + action cluster" />
              <Line text="  neural   — pentagon radar of all five at once" />
            </Stack>
          </DocPanel>
          <DocPanel accent={MIND_ACCENT} title="MIND  ·  MOOD · MOTIVATION · ENERGY" width={580}>
            <Stack spacing={1}>
              <Line text="Tracks five neurotransmitters — Dopamine, Norepinephrine, Serotonin, Oxytocin, Energy — the chemistry behind how you feel and act." />
              <Line text="Dopamine = drive/reward, Norepi = alertness, Serotonin = mood/calm, Oxytocin = bonding, Energy = vitality. The center mark hovers through the three facets they roll up into; labels cycle chemical → role so the meaning reads without a chemistry degree." />
            </Stack>
          </DocPanel>
          <DocPanel accent={BODY_ACCENT} title="BODY  ·  HEALTH · PRESENCE · CLARITY" width={580}>
            <Stack spacing={1}>
              <Line text="Presence = five physical pillars: Breath, Movement, Fuel, Rest, Hydration. Labels rotate cross-domain synonyms (Fuel ↔ Nutrition ↔ Diet) so each maps onto whatever vocabulary you think in." />
            </Stack>
          </DocPanel>
          <DocPanel accent="#94a3b8" title="READING IT" width={580}>
            <Stack spacing={1}>
              <Line text="Emptiness = urgency. A drained orb is what needs attention now." />
              <Line text="Shade = weight. Darker orbs contribute more to the group energy (see Color System)." />
              <Line text="Actions (cluster beside the bottom row): Aa pause/replay label animation · ＋ quick-log · D/W/M timeframe · ✎ edit values · 𝑖 this page." />
              <Line dim text="Quick-log, timeframe charts and deep dives are placeholders — wired next." />
            </Stack>
          </DocPanel>
        </DocScroll>
      </Stage>
    )
  },
}
