"use client"
// v2
/**
 * ControllerVariants — Storybook stories for controller device explorations.
 *
 * Shows all layout × icon-style combinations:
 *   Standard       — classic gamepad, geometric shapes
 *   StandardBranded — classic gamepad, branded icons (Mind/Body/Love/Chat)
 *   HudDefault     — HUD eye-panel layout, geometric shapes
 *   HudBranded     — HUD eye-panel layout, branded icons   ← hero variant
 *   HudDark        — HUD layout, dark palette, branded icons
 *   AllVariants    — 2×2 grid side-by-side reference
 *
 * Each animated story auto-cycles through button presses so the
 * controller feels alive without user interaction.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React, { useEffect, useRef } from "react"
import { Box, Typography } from "@mui/material"
import {
  ControllerSvg,
  DEFAULT_CONTROLLER_PALETTE,
  type ControllerPalette,
  type ControllerSvgHandle,
  type ButtonStyle,
} from "./devices/ControllerSvg"
import { HudControllerSvg, HUD_W, HUD_H } from "./devices/HudControllerSvg"
import { Character4eye } from "../2d"
import { CHARACTER_PERSONAS } from "../2d"

// ─────────────────────────────────────────────────────────────────
// Palettes
// ─────────────────────────────────────────────────────────────────

const PALETTE_DEFAULT = DEFAULT_CONTROLLER_PALETTE

const PALETTE_BRAND: ControllerPalette = {
  bodyStart: "#f0f4ff",
  bodyEnd: "#dde3f0",
  stroke: "#c7d2fe",
  accent: "#c7d2fe",
  accentStroke: "#a5b4fc",
  accentSoft: "#e0e7ff",
  screenStart: "#6366f1",
  screenEnd: "#8b5cf6",
  screenRing: "#818cf8",
  screenDot: "#6366f1",
  shadowColor: "#6366f1",
  // Mind=violet, Body=teal, Love=rose, Chat=indigo
  buttonColors: ["#7c3aed", "#14b8a6", "#f43f5e", "#6366f1"],
}

const PALETTE_DARK: ControllerPalette = {
  bodyStart: "#1e293b",
  bodyEnd: "#0f172a",
  stroke: "#334155",
  accent: "#475569",
  accentStroke: "#64748b",
  accentSoft: "#1e293b",
  screenStart: "#8b5cf6",
  screenEnd: "#6366f1",
  screenRing: "#a78bfa",
  screenDot: "#c4b5fd",
  shadowColor: "#0f172a",
  buttonColors: ["#7c3aed", "#14b8a6", "#f43f5e", "#6366f1"],
}

// ─────────────────────────────────────────────────────────────────
// Button press animation cycle
// ─────────────────────────────────────────────────────────────────
const PRESS_SEQUENCE = [0, 1, 3, 2] as const // improve → heal → win → protect

function useButtonCycle(ref: React.RefObject<ControllerSvgHandle | null>, intervalMs = 700) {
  const seqIdx = useRef(0)
  useEffect(() => {
    const id = setInterval(() => {
      const idx = PRESS_SEQUENCE[seqIdx.current % PRESS_SEQUENCE.length]
      ref.current?.pressButton(idx)
      setTimeout(() => ref.current?.releaseButton(), intervalMs * 0.4)
      seqIdx.current++
    }, intervalMs)
    return () => clearInterval(id)
  }, [ref, intervalMs])
}

// ─────────────────────────────────────────────────────────────────
// Showcase wrappers
// ─────────────────────────────────────────────────────────────────

interface ShowcaseProps {
  label: string
  subLabel?: string
  children: React.ReactNode
  width?: number
  height?: number
}

function Showcase({ label, subLabel, children, width = 300, height = 160 }: ShowcaseProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        p: 3,
        border: "1px solid rgba(15,23,42,0.08)",
        borderRadius: 3,
        background: "radial-gradient(circle at 50% 30%, rgba(99,102,241,0.06), transparent 60%), #fafafa",
        width,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height,
          display: "grid",
          placeItems: "center",
          position: "relative",
        }}
      >
        {children}
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#1e293b", fontSize: 12, display: "block" }}>
          {label}
        </Typography>
        {subLabel && (
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: 11 }}>
            {subLabel}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

// ─────────────────────────────────────────────────────────────────
// Story component stubs
// ─────────────────────────────────────────────────────────────────

function ClassicController({ buttonStyle, palette }: { buttonStyle: ButtonStyle; palette: ControllerPalette }) {
  const ctrlRef = useRef<ControllerSvgHandle>(null)
  useButtonCycle(ctrlRef)
  return (
    <ControllerSvg
      ref={ctrlRef}
      palette={palette}
      buttonStyle={buttonStyle}
      style={{ width: 240, height: "auto" }}
    />
  )
}

function HudController({ buttonStyle, palette }: { buttonStyle: ButtonStyle; palette: ControllerPalette }) {
  const ctrlRef = useRef<ControllerSvgHandle>(null)
  useButtonCycle(ctrlRef)
  return (
    <HudControllerSvg
      ref={ctrlRef}
      palette={palette}
      buttonStyle={buttonStyle}
      style={{ width: 280, height: "auto" }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────
// Story root component (used so Storybook renders something)
// ─────────────────────────────────────────────────────────────────

function ControllerVariantsRoot() {
  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", p: 4, bgcolor: "#ffffff", minHeight: "100vh", alignItems: "flex-start" }}>
      <Typography variant="h6" sx={{ width: "100%", fontWeight: 700, color: "#1e293b", mb: 1 }}>
        Controller Variations
      </Typography>
      <Showcase label="Standard" subLabel="Gamepad · Shapes (△○✕▢)">
        <ClassicController buttonStyle="shapes" palette={PALETTE_DEFAULT} />
      </Showcase>
      <Showcase label="Standard Branded" subLabel="Gamepad · Mind · Body · Love · Chat">
        <ClassicController buttonStyle="branded" palette={PALETTE_BRAND} />
      </Showcase>
      <Showcase label="HUD Default" subLabel="Eye Panel · Shapes (△○✕▢)">
        <HudController buttonStyle="shapes" palette={PALETTE_DEFAULT} />
      </Showcase>
      <Showcase label="HUD Branded" subLabel="Eye Panel · Mind · Body · Love · Chat">
        <HudController buttonStyle="branded" palette={PALETTE_BRAND} />
      </Showcase>
      <Showcase label="HUD Dark" subLabel="Eye Panel · Dark · Branded">
        <HudController buttonStyle="branded" palette={PALETTE_DARK} />
      </Showcase>
    </Box>
  )
}

// ─────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Marketing / Controller / Device",
  component: ControllerVariantsRoot,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}

export default meta
type Story = StoryObj

// ─────────────────────────────────────────────────────────────────
// Individual stories
// ─────────────────────────────────────────────────────────────────

export const Standard: Story = {
  render: () => (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "#ffffff" }}>
      <Showcase label="Standard" subLabel="Gamepad · Shapes (△○✕▢)" width={340} height={180}>
        <ClassicController buttonStyle="shapes" palette={PALETTE_DEFAULT} />
      </Showcase>
    </Box>
  ),
}

export const StandardBranded: Story = {
  render: () => (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "#ffffff" }}>
      <Showcase label="Standard Branded" subLabel="Gamepad · Mind · Body · Love · Chat" width={340} height={180}>
        <ClassicController buttonStyle="branded" palette={PALETTE_BRAND} />
      </Showcase>
    </Box>
  ),
}

export const HudDefault: Story = {
  render: () => (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "#ffffff" }}>
      <Showcase label="HUD Default" subLabel="Eye–Panel layout · Shapes (△○✕▢)" width={380} height={180}>
        <HudController buttonStyle="shapes" palette={PALETTE_DEFAULT} />
      </Showcase>
    </Box>
  ),
}

export const HudBranded: Story = {
  render: () => (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "#ffffff" }}>
      <Showcase label="HUD Branded" subLabel="Eye–Panel layout · Mind · Body · Love · Chat" width={380} height={180}>
        <HudController buttonStyle="branded" palette={PALETTE_BRAND} />
      </Showcase>
    </Box>
  ),
}

export const HudDark: Story = {
  render: () => (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "#1e293b" }}>
      <Showcase
        label="HUD Dark"
        subLabel="Eye–Panel layout · Dark palette · Branded"
        width={380}
        height={180}
      >
        <HudController buttonStyle="branded" palette={PALETTE_DARK} />
      </Showcase>
    </Box>
  ),
  parameters: {
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#1e293b" }] },
  },
}

export const AllVariants: Story = {
  render: () => (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "#ffffff",
        p: 4,
      }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, auto)", gap: 3 }}>
        <Showcase label="Standard · Shapes" subLabel="△ ○ ✕ ▢" width={320} height={160}>
          <ClassicController buttonStyle="shapes" palette={PALETTE_DEFAULT} />
        </Showcase>
        <Showcase label="Standard · Branded" subLabel="Mind · Body · Love · Chat" width={320} height={160}>
          <ClassicController buttonStyle="branded" palette={PALETTE_BRAND} />
        </Showcase>
        <Showcase label="HUD · Shapes" subLabel="Eye Panel · △ ○ ✕ ▢" width={320} height={160}>
          <HudController buttonStyle="shapes" palette={PALETTE_DEFAULT} />
        </Showcase>
        <Showcase label="HUD · Branded" subLabel="Eye Panel · Mind · Body · Love · Chat" width={320} height={160}>
          <HudController buttonStyle="branded" palette={PALETTE_BRAND} />
        </Showcase>
      </Box>
    </Box>
  ),
}

// ─────────────────────────────────────────────────────────────────
// ControlSlide composition
//
// Character4eye SVG actual viewBox: 237.5 × 455.4 (paddingX=100, paddingY=100)
// At CSS width 180 px → scale ≈ 0.758 → CSS height ≈ 345 px
//   headCenterY in viewBox = paddingY + headSize/2 = 100 + 16.5 = 116.5
//   head center Y from SVG top  = 116.5 × 0.758 ≈ 88.3 px
//
// Character Box (position:absolute, bottom:0) in a 380×360 scene:
//   Box height ≈ 352 px  →  Box top from scene top ≈ 8 px
//   head center from scene top ≈ 8 + 88.3 = 96.3 px ≈ 96 px
//
// Controller (120×72 viewBox) at CSS width 280 px → height 168 px:
//   center Y from controller top = 84 px
//   controller top = 96 - 84 = 12 px  ← center sits on head
// ─────────────────────────────────────────────────────────────────

// Layout constants (px)
const CS_SCENE_W  = 380
const CS_SCENE_H  = 360   // tall enough to contain character (≈352 px) + 8 px margin
const CS_CHAR_W   = 180   // character CSS width (smaller than controller)
const CS_CTRL_W   = 280   // controller CSS width (dominates the composition)
const CS_CTRL_TOP =  12   // controller top: aligns controller center with head center

function ControlSlideComposition() {
  const ctrlRef = useRef<ControllerSvgHandle>(null)
  useButtonCycle(ctrlRef, 900)

  return (
    <Box
      sx={{
        position: "relative",
        width: CS_SCENE_W,
        height: CS_SCENE_H,
        overflow: "visible",
      }}
    >
      {/* Radial glow behind — mirrors ControlSlide BackdropGlow */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
          background: [
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139,92,246,0.13) 0%, transparent 65%)",
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 80%)",
          ].join(", "),
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Character — small, bottom-centered, z-index 1 (behind controller) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: CS_CHAR_W,
          zIndex: 1,
        }}
      >
        <Character4eye {...CHARACTER_PERSONAS.vision} />
      </Box>

      {/* Controller — wide, centered, z-index 2; center aligns with character head */}
      <Box
        sx={{
          position: "absolute",
          top: CS_CTRL_TOP,
          left: "50%",
          transform: "translateX(-50%)",
          width: CS_CTRL_W,
          zIndex: 2,
        }}
      >
        <ControllerSvg
          ref={ctrlRef}
          palette={PALETTE_BRAND}
          buttonStyle="branded"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
    </Box>
  )
}

export const ControlSlideVariant: Story = {
  render: () => (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "#ffffff",
      }}
    >
      <ControlSlideComposition />
    </Box>
  ),
}
