"use client";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

// ─────────────────────────────────────────────────────────────────────────────
// All waves are forward-only (translateX monotonically non-decreasing).
// Speed is controlled purely via keyframe pixel-distance/time-percentage ratios
// so no cubic-bezier conflicts with opacity — everything stays linear.
//
// Speed legend (px/s) for each wave:
//   "slow"   <  120 px/s
//   "medium" ~  200-350 px/s
//   "fast"   >  450 px/s
// ─────────────────────────────────────────────────────────────────────────────

const C = "#2196f3";
const W = 480;
const H = 300;

const Stage = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
    <Box sx={{
      position: "relative", width: W, height: H, overflow: "hidden",
      background: "#0b0e17",
      backgroundImage:
        `linear-gradient(${C}10 1px, transparent 1px),` +
        `linear-gradient(90deg, ${C}10 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }}>
      {children}
    </Box>
    <Box sx={{ color: "#8bb", fontSize: 11, fontFamily: "monospace", letterSpacing: 1 }}>
      {label}
    </Box>
  </Box>
);

// Gradient + mask shared across all 90 px bar variants
const barBg = (color: string) =>
  `linear-gradient(90deg, transparent 0%, ${color}08 20%, ${color}44 60%, ${color}ee 100%)`;
const barMask =
  "linear-gradient(180deg, transparent 0%, #fff 12%, #fff 88%, transparent 100%)";

// ─────────────────────────────────────────────────────────────────────────────
// W1 — Surge
// Slow → medium → fast in a smooth ramp. 2 waves 220 ms apart, 5.5 s cycle.
//   slow  : 60 px in 15 % of 5.5 s = 0.825 s → 73 px/s
//   medium: 130 px in 18 % of 5.5 s = 0.99 s  → 131 px/s
//   fast  : 390 px in 14 % of 5.5 s = 0.77 s  → 506 px/s
// ─────────────────────────────────────────────────────────────────────────────
const W1_Surge = ({ color = C }: { color?: string }) => (
  <Stage label="W1 — Surge (slow → med → fast)">
    {([0, 220] as [number, number]).map((ms, i) => (
      <Box key={i} sx={{
        position: "absolute", top: 0, left: 0,
        width: "90px", height: "100%",
        background: barBg(color),
        WebkitMaskImage: barMask, maskImage: barMask,
        "@keyframes w1Surge": {
          "0%":   { transform: "translateX(-90px)",  opacity: 0    },
          "4%":   {                                  opacity: 0.9  },
          "15%":  { transform: "translateX(-30px)"               },
          "33%":  { transform: "translateX(100px)"               },
          "47%":  { transform: "translateX(490px)",  opacity: 0    },
          "100%": { transform: "translateX(490px)",  opacity: 0    },
        },
        animation: `w1Surge 5.5s linear ${ms}ms infinite`,
      }} />
    ))}
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// W2 — Burst · Hover · Sprint
// Rapid blast onto screen → almost-halt (hover/lock) → hard sprint off right.
// Single wave, 5.5 s cycle.
//   burst : 220 px in 12 % = 0.66 s → 333 px/s
//   hover : 20 px  in 20 % = 1.10 s → 18 px/s  (drift — practically stopped)
//   sprint: 340 px in 12 % = 0.66 s → 515 px/s
// ─────────────────────────────────────────────────────────────────────────────
const W2_BurstHoverSprint = ({ color = C }: { color?: string }) => (
  <Stage label="W2 — Burst · Hover · Sprint">
    <Box sx={{
      position: "absolute", top: 0, left: 0,
      width: "90px", height: "100%",
      background: barBg(color),
      WebkitMaskImage: barMask, maskImage: barMask,
      "@keyframes w2BurstHover": {
        "0%":   { transform: "translateX(-90px)",  opacity: 0    },
        "2%":   {                                  opacity: 0.88 },
        "12%":  { transform: "translateX(130px)"               },   // burst
        "32%":  { transform: "translateX(150px)"               },   // hover (18 px/s)
        "44%":  { transform: "translateX(490px)",  opacity: 0    },  // sprint
        "100%": { transform: "translateX(490px)",  opacity: 0    },
      },
      animation: "w2BurstHover 5.5s linear 0s infinite",
    }} />
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// W3 — Stutter Advance
// 3 forward bursts with a brief full stop between each.
// Never reverses — same-value keyframe pairs create the holds.
// Single wave, 5.5 s cycle.
//   burst 1: 160 px in 9 % = 0.50 s → 323 px/s  |  hold: 7 % = 0.39 s
//   burst 2: 130 px in 7 % = 0.39 s → 338 px/s  |  hold: 5 % = 0.28 s
//   sprint : 290 px in 9 % = 0.50 s → 585 px/s
// ─────────────────────────────────────────────────────────────────────────────
const W3_StutterAdvance = ({ color = C }: { color?: string }) => (
  <Stage label="W3 — Stutter Advance (stop, not reverse)">
    <Box sx={{
      position: "absolute", top: 0, left: 0,
      width: "90px", height: "100%",
      background: barBg(color),
      WebkitMaskImage: barMask, maskImage: barMask,
      "@keyframes w3Stutter": {
        "0%":   { transform: "translateX(-90px)",  opacity: 0    },
        "2%":   {                                  opacity: 0.85 },
        "9%":   { transform: "translateX(70px)"                },   // burst 1
        "16%":  { transform: "translateX(70px)"                },   // hold 1 (same value)
        "23%":  { transform: "translateX(200px)"               },   // burst 2
        "28%":  { transform: "translateX(200px)"               },   // hold 2 (same value)
        "37%":  { transform: "translateX(490px)",  opacity: 0    },  // sprint
        "100%": { transform: "translateX(490px)",  opacity: 0    },
      },
      animation: "w3Stutter 5.5s linear 0s infinite",
    }} />
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// W4 — Wide Glide
// 160 px wide bar (more screen presence). Slow build → fast exit. Long 6.5 s
// cycle — rare and impactful like a big event. Single wave, box-shadow glow.
//   very slow: 80 px  in 20 % = 1.30 s → 62  px/s
//   medium   : 200 px in 18 % = 1.17 s → 171 px/s
//   fast exit: 530 px in 15 % = 0.975s → 544 px/s
// ─────────────────────────────────────────────────────────────────────────────
const W4_WideGlide = ({ color = C }: { color?: string }) => (
  <Stage label="W4 — Wide Glide (slow-build, single wave)">
    <Box sx={{
      position: "absolute", top: 0, left: 0,
      width: "160px", height: "100%",
      background: `linear-gradient(90deg,
        transparent 0%,
        ${color}06  15%,
        ${color}20  45%,
        ${color}70  75%,
        ${color}ee 100%)`,
      boxShadow: `4px 0 24px 4px ${color}28`,
      WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #fff 10%, #fff 90%, transparent 100%)",
      maskImage:        "linear-gradient(180deg, transparent 0%, #fff 10%, #fff 90%, transparent 100%)",
      "@keyframes w4WideGlide": {
        "0%":   { transform: "translateX(-160px)", opacity: 0    },
        "3%":   {                                  opacity: 0.80 },
        "20%":  { transform: "translateX(-80px)"               },   // very slow
        "38%":  { transform: "translateX(120px)"               },   // medium
        "53%":  { transform: "translateX(650px)",  opacity: 0    },  // fast
        "100%": { transform: "translateX(650px)",  opacity: 0    },
      },
      animation: "w4WideGlide 6.5s linear 0s infinite",
    }} />
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// W5 — Rapid Triple
// 3 waves 170 ms apart (tight burst), then ≈5 s of silence.
// Each wave accelerates: slow entry → fast exit. 6.5 s cycle.
//   slow  : 50 px  in 7 %  of 6.5 s = 0.455 s → 110 px/s
//   medium: 120 px in 8 %  of 6.5 s = 0.520 s → 231 px/s
//   fast  : 410 px in 8 %  of 6.5 s = 0.520 s → 788 px/s
// ─────────────────────────────────────────────────────────────────────────────
const W5_RapidTriple = ({ color = C }: { color?: string }) => (
  <Stage label="W5 — Rapid Triple (burst · 5 s silence)">
    {([0, 170, 340] as [number, number, number]).map((ms, i) => (
      <Box key={i} sx={{
        position: "absolute", top: 0, left: 0,
        width: "90px", height: "100%",
        background: barBg(color),
        WebkitMaskImage: barMask, maskImage: barMask,
        "@keyframes w5Triple": {
          "0%":   { transform: "translateX(-90px)",  opacity: 0    },
          "2%":   {                                  opacity: 0.85 },
          "7%":   { transform: "translateX(-40px)"               },  // slow
          "15%":  { transform: "translateX(80px)"                },  // medium
          "23%":  { transform: "translateX(490px)",  opacity: 0    }, // fast
          "100%": { transform: "translateX(490px)",  opacity: 0    },
        },
        animation: `w5Triple 6.5s linear ${ms}ms infinite`,
      }} />
    ))}
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// All grid
// ─────────────────────────────────────────────────────────────────────────────
const AllWaveVariants = () => (
  <Box sx={{
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px",
    p: "24px", background: "#050810",
  }}>
    <W1_Surge />
    <W2_BurstHoverSprint />
    <W3_StutterAdvance />
    <W4_WideGlide />
    <Box sx={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }}>
      <W5_RapidTriple />
    </Box>
  </Box>
);

// ─────────────────────────────────────────────────────────────────────────────
// Storybook
// ─────────────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: "HUD / Map / WaveVariants",
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#050810" }] },
  },
};
export default meta;
type Story = StoryObj;

export const W1_SurgeStory:       Story = { name: "W1 — Surge",              render: () => <W1_Surge /> };
export const W2_BurstHoverStory:  Story = { name: "W2 — Burst Hover Sprint", render: () => <W2_BurstHoverSprint /> };
export const W3_StutterStory:     Story = { name: "W3 — Stutter Advance",    render: () => <W3_StutterAdvance /> };
export const W4_WideGlideStory:   Story = { name: "W4 — Wide Glide",         render: () => <W4_WideGlide /> };
export const W5_RapidTripleStory: Story = { name: "W5 — Rapid Triple",       render: () => <W5_RapidTriple /> };
export const AllVariants:         Story = { name: "All Variants",            render: () => <AllWaveVariants /> };
