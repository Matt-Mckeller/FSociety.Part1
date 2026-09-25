"use client";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

const C = "#2196f3";
const W = 480;
const H = 300;

// ─────────────────────────────────────────────────────────────────────────────
// Stage
// ─────────────────────────────────────────────────────────────────────────────
const Stage = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
    <Box sx={{
      position: "relative", width: W, height: H, overflow: "hidden",
      background: "#0b0e17",
      backgroundImage: `linear-gradient(${C}10 1px, transparent 1px), linear-gradient(90deg, ${C}10 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }}>
      {children}
    </Box>
    <Box sx={{ color: "#8bb", fontSize: 11, fontFamily: "monospace", letterSpacing: 1 }}>{label}</Box>
  </Box>
);

// ─────────────────────────────────────────────────────────────────────────────
// PulseRing
// ─────────────────────────────────────────────────────────────────────────────
// cx / cy   – centre pixel coords within the stage (element uses translate(-50%,-50%))
// ringW / ringH – size of ring element at scale = 1 (should be ≥ stage to cover it)
// kfName   – CSS @keyframes name; siblings may share one if activePct is identical
// cycleDur – full cycle including the silent pause (CSS time string, e.g. "5s")
// delay    – animation-delay (CSS time string)
// activePct – fraction 0–1 of the cycle that is visible (expand + fade out)
interface PulseRingProps {
  cx: number; cy: number;
  ringW: number; ringH: number;
  kfName: string;
  cycleDur: string;
  delay: string;
  activePct?: number;
  color: string;
  borderW?: string;
  peakOpacity?: number;
}

const PulseRing = ({
  cx, cy, ringW, ringH,
  kfName, cycleDur, delay,
  activePct = 0.45,
  color, borderW = "1.5px",
  peakOpacity = 0.85,
}: PulseRingProps) => {
  // fast pop-in = 8% of active window; rest is gradual expansion + fade
  const fadePct = `${Math.round(activePct * 8)}%`;
  const fullPct = `${Math.round(activePct * 100)}%`;
  return (
    <Box sx={{
      position: "absolute",
      top: cy,
      left: cx,
      width: `${ringW}px`,
      height: `${ringH}px`,
      border: `${borderW} solid ${color}`,
      borderRadius: "50%",
      boxShadow: `0 0 10px 1px ${color}30, inset 0 0 6px 0 ${color}18`,
      [`@keyframes ${kfName}`]: {
        "0%":      { transform: "translate(-50%,-50%) scale(0)",    opacity: 0         },
        [fadePct]: { opacity: peakOpacity                                               },
        [fullPct]: { transform: "translate(-50%,-50%) scale(1.08)", opacity: 0         },
        "100%":    { transform: "translate(-50%,-50%) scale(1.08)", opacity: 0         },
      },
      animation: `${kfName} ${cycleDur} ease-out ${delay} infinite`,
    }} />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// P1 — Single Clean Pulse
// One ring expands from stage centre. 5 s cycle.
// Active = 46 % (2.3 s expand + fade)   |   Pause = 54 % (2.7 s silence)
// ─────────────────────────────────────────────────────────────────────────────
const P1_SinglePulse = ({ color = C }: { color?: string }) => (
  <Stage label="P1 — Single Pulse">
    <PulseRing
      cx={W / 2} cy={H / 2}
      ringW={570} ringH={360}
      kfName="p1Pulse" cycleDur="5s" delay="0s"
      activePct={0.46} color={color}
    />
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// P2 — Double Pulse  ("ba-dum")
// Two rings 300 ms apart. 5.8 s cycle.
// Active = 43 % (2.5 s)  |  Ring 2 trails by 300 ms  |  Pause ≈ 3 s
// ─────────────────────────────────────────────────────────────────────────────
const P2_DoublePulse = ({ color = C }: { color?: string }) => (
  <Stage label="P2 — Double Pulse">
    {([0, 300] as const).map((ms, i) => (
      <PulseRing
        key={i}
        cx={W / 2} cy={H / 2}
        ringW={570} ringH={360}
        kfName="p2Pulse" cycleDur="5.8s" delay={`${ms}ms`}
        activePct={0.43} color={color}
      />
    ))}
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// P3 — Triple Pulse  ("1-2-3")
// Three rings 350 ms apart. 6.5 s cycle.
// Active = 36 % (2.34 s)  |  Last ring at +700 ms  |  Pause ≈ 3.5 s
// ─────────────────────────────────────────────────────────────────────────────
const P3_TriplePulse = ({ color = C }: { color?: string }) => (
  <Stage label="P3 — Triple Pulse">
    {([0, 350, 700] as const).map((ms, i) => (
      <PulseRing
        key={i}
        cx={W / 2} cy={H / 2}
        ringW={570} ringH={360}
        kfName="p3Pulse" cycleDur="6.5s" delay={`${ms}ms`}
        activePct={0.36} color={color}
      />
    ))}
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// P4 — Corner Origin  (character / marker position)
// Same "ba-dum" rhythm as P2 but the origin is at (80, 60) — upper-left
// quadrant — like a position ping from a unit on the map.
// Ring 900×900 covers full stage from that off-centre origin.
// ─────────────────────────────────────────────────────────────────────────────
const P4_CornerOrigin = ({ color = C }: { color?: string }) => (
  <Stage label="P4 — Corner Origin">
    {/* origin dot */}
    <Box sx={{
      position: "absolute", top: 60, left: 80,
      width: "8px", height: "8px",
      transform: "translate(-50%,-50%)",
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 6px 3px ${color}90`,
    }} />
    {([0, 350] as const).map((ms, i) => (
      <PulseRing
        key={i}
        cx={80} cy={60}
        ringW={900} ringH={900}
        kfName="p4Pulse" cycleDur="5.5s" delay={`${ms}ms`}
        activePct={0.45} color={color} borderW="1px" peakOpacity={0.65}
      />
    ))}
  </Stage>
);

// ─────────────────────────────────────────────────────────────────────────────
// P5 — Horizontal Shockwave
// A gradient bar (thick leading edge → comet tail) sweeps left-to-right.
// Two waves 420 ms apart. 4.8 s cycle.
// ─────────────────────────────────────────────────────────────────────────────
const P5_HorizShockwave = ({ color = C }: { color?: string }) => {
  const SWEEP_W = 90;
  return (
    <Stage label="P5 — Horizontal Shockwave">
      {([0, 420] as const).map((ms, i) => (
        <Box key={i} sx={{
          position: "absolute",
          top: 0, left: 0,
          width: `${SWEEP_W}px`,
          height: "100%",
          // gradient: transparent tail → bright leading right edge
          background: `linear-gradient(90deg,
            transparent          0%,
            ${color}12          35%,
            ${color}55          78%,
            ${color}ee         100%)`,
          // soft vertical mask: fade near top/bottom edges of stage
          WebkitMaskImage: `linear-gradient(180deg,
            transparent  0%,
            #fff        12%,
            #fff        88%,
            transparent 100%)`,
          maskImage: `linear-gradient(180deg,
            transparent  0%,
            #fff        12%,
            #fff        88%,
            transparent 100%)`,
          "@keyframes p5Sweep": {
            "0%":   { transform: `translateX(${-SWEEP_W}px)`, opacity: 0 },
            "3%":   { opacity: 1                                           },
            "43%":  { opacity: 1                                           },
            "47%":  { transform: `translateX(${W + 10}px)`,   opacity: 0 },
            "100%": { transform: `translateX(${W + 10}px)`,   opacity: 0 },
          },
          animation: `p5Sweep 4.8s linear ${ms}ms infinite`,
        }} />
      ))}
    </Stage>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// All grid
// ─────────────────────────────────────────────────────────────────────────────
const AllPulseVariants = () => (
  <Box sx={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    p: "24px",
    background: "#050810",
  }}>
    <P1_SinglePulse />
    <P2_DoublePulse />
    <P3_TriplePulse />
    <P4_CornerOrigin />
    <Box sx={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }}>
      <P5_HorizShockwave />
    </Box>
  </Box>
);

// ─────────────────────────────────────────────────────────────────────────────
// Storybook
// ─────────────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: "HUD / Map / PulseVariants",
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#050810" }] },
  },
};
export default meta;
type Story = StoryObj;

export const P1_Single:     Story = { name: "P1 — Single Pulse",       render: () => <P1_SinglePulse /> };
export const P2_Double:     Story = { name: "P2 — Double Pulse",       render: () => <P2_DoublePulse /> };
export const P3_Triple:     Story = { name: "P3 — Triple Pulse",       render: () => <P3_TriplePulse /> };
export const P4_Corner:     Story = { name: "P4 — Corner Origin",      render: () => <P4_CornerOrigin /> };
export const P5_Horizontal: Story = { name: "P5 — Horizontal Shockwave", render: () => <P5_HorizShockwave /> };
export const AllVariants:   Story = { name: "All Variants",            render: () => <AllPulseVariants /> };
