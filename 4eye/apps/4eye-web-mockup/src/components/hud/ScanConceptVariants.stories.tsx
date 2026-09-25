"use client";
/**
 * ScanConceptVariants — four conceptually distinct scan animations.
 *
 * Each is a self-contained React component using only MUI Box + CSS
 * @keyframes via the emotion sx prop. No external deps needed.
 *
 *  C1 — Radar Sweep     : rotating arm with sector afterglow trail
 *  C2 — Sonar Pulse     : expanding ellipse rings from an off-centre point
 *  C3 — Target Lock     : H + V scanlines converge to a cross-point, then flash
 *  C4 — Chrome Sweep    : diagonal aurora bands sweep upper-left → lower-right
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";

const C = "#2196f3";

// ─── shared demo container ───────────────────────────────────────────────────
function ScanStage({
  label,
  sublabel,
  children,
}: {
  label: string;
  sublabel: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: "flex-start" }}>
      <Box sx={{
        position: "relative",
        width: 480,
        height: 300,
        bgcolor: "#0b0e17",
        border: `1px solid ${C}30`,
        overflow: "hidden",
        borderRadius: 1,
      }}>
        <Box sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${C}08 1px, transparent 1px),
            linear-gradient(90deg, ${C}08 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        {children}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111", lineHeight: 1 }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: "#666" }}>
          {sublabel}
        </Typography>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// C1 — Radar Sweep
//
// A bright arm rotates clockwise from the stage centre (240, 150).
// Behind it, a conic-gradient sector fades over ~100° creating the
// classic radar afterglow. A secondary slow sweep at half speed adds depth.
// ─────────────────────────────────────────────────────────────────────────────
function RadarSweep({ color = C }: { color?: string }) {
  // Arm length needs to reach the farthest corner of the 480×300 stage.
  // Diagonal = sqrt(240²+150²) ≈ 283 px → use 310 px to be safe.
  const ARM = 310;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* ── sector afterglow (rotates with the arm) ── */}
      <Box sx={{
        position: "absolute",
        inset: 0,
        // conic-gradient centred on the stage
        background: `conic-gradient(
          from 0deg at 50% 50%,
          transparent         0deg,
          ${color}30          20deg,
          ${color}10          60deg,
          transparent         100deg
        )`,
        "@keyframes radarSectorSpin": {
          from: { transform: "rotate(0deg)"   },
          to:   { transform: "rotate(360deg)" },
        },
        animation: "radarSectorSpin 3.5s linear infinite",
        borderRadius: "50%",         // keeps gradient circular
        // clip it to the rectangular stage via overflow:hidden on parent
      }} />

      {/* ── secondary slow sector for depth ── */}
      <Box sx={{
        position: "absolute",
        inset: 0,
        background: `conic-gradient(
          from 180deg at 50% 50%,
          transparent    0deg,
          ${color}10     15deg,
          ${color}04     45deg,
          transparent    80deg
        )`,
        animation: "radarSectorSpin 7s linear infinite",
        borderRadius: "50%",
      }} />

      {/* ── rotating arm ── */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: ARM,
        height: "1.5px",
        transformOrigin: "left center",
        background: `linear-gradient(to right, ${color}, ${color}30 70%, transparent 100%)`,
        filter: `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 8px ${color}80)`,
        animation: "radarSectorSpin 3.5s linear infinite",
      }} />

      {/* ── centre pivot dot ── */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 5,
        height: 5,
        marginTop: "-2.5px",
        marginLeft: "-2.5px",
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 6px 3px ${color}80`,
      }} />
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// C2 — Sonar Pulse
//
// Three ellipse rings expand from an off-centre "ping" point at (160, 90),
// representing a detected anomaly. Each ring starts tiny, expands until it
// fills the stage, and fades. Staggered 0.9 s apart for a heartbeat rhythm.
// A fourth slower ring suggests the scan continuing to search further out.
// ─────────────────────────────────────────────────────────────────────────────
function SonarPulse({ color = C }: { color?: string }) {
  // Ping source (off-centre — the point of interest being scanned)
  const PX = 155; // px from left
  const PY = 85;  // px from top

  const rings = [
    { delay: "0s",    dur: "2.6s", w: "1.5px", op: 0.80 },
    { delay: "0.9s",  dur: "2.6s", w: "1.5px", op: 0.60 },
    { delay: "1.8s",  dur: "2.6s", w: "1px",   op: 0.40 },
    { delay: "3.5s",  dur: "4.2s", w: "1px",   op: 0.25 },  // slow deep-scan ring
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Ping source dot */}
      <Box sx={{
        position: "absolute",
        top: PY - 3,
        left: PX - 3,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 5px 2px ${color}80`,
        "@keyframes sonarDot": {
          "0%":   { opacity: 1,   transform: "scale(1)"   },
          "40%":  { opacity: 0.6, transform: "scale(1.4)" },
          "100%": { opacity: 1,   transform: "scale(1)"   },
        },
        animation: "sonarDot 2.6s ease-in-out infinite",
      }} />

      {rings.map((r, i) => (
        <Box key={i} sx={{
          position: "absolute",
          // Fixed-size ring centred on the ping point via translate(-50%,-50%).
          // Starts at scale(0) → expands to scale(1) covering the stage area,
          // then fades. Border stays visually thin because scale factor is ≤ 1.2.
          top: PY,
          left: PX,
          width: "640px",
          height: "420px",
          border: `${r.w} solid ${color}`,
          borderRadius: "50%",
          opacity: r.op,
          "@keyframes sonarExpand": {
            "0%":   { transform: "translate(-50%,-50%) scale(0)",    opacity: 0      },
            "5%":   { opacity: r.op                                                  },
            "70%":  { opacity: r.op * 0.35                                           },
            "100%": { transform: "translate(-50%,-50%) scale(1.15)", opacity: 0      },
          },
          animation: `sonarExpand ${r.dur} ease-out ${r.delay} infinite`,
        }} />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// C3 — Target Lock
//
// A horizontal and a vertical scanline search independently (each sweeping,
// backing off, pausing, then guided to the target) and converge at the
// centre of the stage. When both arrive at 50% simultaneously the cross-point
// emits a brief bright pulse — "locked on".
//
// Shared single animation duration keeps them in phase.
// ─────────────────────────────────────────────────────────────────────────────
function TargetLock({ color = C }: { color?: string }) {
  const DUR = "5.5s";

  // Shared search keyframe — used by both H and V lines via scaleX / scaleY.
  // At 72% of the cycle both lines are at their target 50% position simultaneously
  // → the lock flash fires.
  const searchKF = {
    "0%":   { transform: "scale(0)",    opacity: 0   },
    "5%":   { opacity: 1                             },
    "22%":  { transform: "scale(0.48)"               },  // probing
    "32%":  { transform: "scale(0.37)"               },  // back off
    "40%":  { transform: "scale(0.37)"               },  // pause
    "54%":  { transform: "scale(0.60)"               },  // probe further
    "62%":  { transform: "scale(0.50)"               },  // back off slightly
    "68%":  { transform: "scale(0.50)"               },  // hold — almost there
    "72%":  { transform: "scale(0.50)",  opacity: 1  },  // ← LOCK POINT
    "80%":  { transform: "scale(0.50)",  opacity: 0.4},
    "88%":  { transform: "scale(0.50)",  opacity: 0.1},
    "100%": { transform: "scale(0.50)",  opacity: 0  },  // fade, then restart
  };

  const lockFlashKF = {
    "0%":   { transform: "scale(0)",  opacity: 0 },
    "68%":  { transform: "scale(0)",  opacity: 0 },    // invisible until lock
    "72%":  { transform: "scale(1)",  opacity: 1 },    // flash on lock
    "78%":  { transform: "scale(1.8)",opacity: 0 },    // burst & fade
    "100%": { transform: "scale(0)",  opacity: 0 },
  };

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Horizontal scanline — grows from LEFT edge toward centre */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        height: "1.5px",
        transformOrigin: "left center",
        background: `linear-gradient(to right,
          transparent 0%, ${color}30 20%, ${color}aa 70%, ${color} 100%)`,
        filter: `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 5px ${color}80)`,
        "@keyframes targetH": searchKF,
        animation: `targetH ${DUR} ease-in-out 0s infinite`,
      }} />

      {/* Matching half from RIGHT — mirror via scaleX(-1) on same keyframe */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        height: "1.5px",
        transformOrigin: "right center",
        transform: "scaleX(-1)",
        background: `linear-gradient(to right,
          transparent 0%, ${color}30 20%, ${color}aa 70%, ${color} 100%)`,
        filter: `drop-shadow(0 0 2px ${color})`,
        "@keyframes targetHR": searchKF,
        animation: `targetHR ${DUR} ease-in-out 0s infinite`,
      }} />

      {/* Vertical scanline — grows from TOP edge toward centre */}
      <Box sx={{
        position: "absolute",
        left: "50%",
        top: 0,
        width: "1.5px",
        height: "100%",
        transformOrigin: "center top",
        background: `linear-gradient(to bottom,
          transparent 0%, ${color}30 20%, ${color}aa 70%, ${color} 100%)`,
        filter: `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 5px ${color}80)`,
        "@keyframes targetV": searchKF,
        animation: `targetV ${DUR} ease-in-out 0s infinite`,
      }} />

      {/* Matching half from BOTTOM */}
      <Box sx={{
        position: "absolute",
        left: "50%",
        top: 0,
        width: "1.5px",
        height: "100%",
        transformOrigin: "center bottom",
        transform: "scaleY(-1)",
        background: `linear-gradient(to bottom,
          transparent 0%, ${color}30 20%, ${color}aa 70%, ${color} 100%)`,
        filter: `drop-shadow(0 0 2px ${color})`,
        "@keyframes targetVB": searchKF,
        animation: `targetVB ${DUR} ease-in-out 0s infinite`,
      }} />

      {/* Lock flash — centred crosshair burst that fires at the lock point */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 24,
        height: 24,
        marginTop: "-12px",
        marginLeft: "-12px",
        borderRadius: "50%",
        border: `2px solid ${color}`,
        boxShadow: `0 0 8px 4px ${color}90, 0 0 20px 10px ${color}40`,
        "@keyframes lockFlash": lockFlashKF,
        animation: `lockFlash ${DUR} ease-out 0s infinite`,
      }} />

      {/* Lock flash inner dot */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 6,
        height: 6,
        marginTop: "-3px",
        marginLeft: "-3px",
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 6px 3px ${color}`,
        "@keyframes lockDot": {
          "0%":   { opacity: 0, transform: "scale(0)"   },
          "68%":  { opacity: 0, transform: "scale(0)"   },
          "72%":  { opacity: 1, transform: "scale(1)"   },
          "80%":  { opacity: 1, transform: "scale(1)"   },
          "90%":  { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 0 },
        },
        animation: `lockDot ${DUR} ease-out 0s infinite`,
      }} />
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// C4 — Chrome Sweep
//
// Four diagonal bands at ~45° sweep from upper-left to lower-right across
// the full stage, like aurora / lens-flare streaks. Each band has a slightly
// different speed and opacity, creating a shimmering layered sweep.
// The lead band is brighter and thicker; the others are subtle harmonics.
//
// Technically: each band is a wide (800 px) 2 px tall element rotated -45°
// via `rotate(-45deg)` from its centre. Moving along the perpendicular
// (translateY in the rotated frame) sweeps it diagonally across the stage.
// ─────────────────────────────────────────────────────────────────────────────
function ChromeSweep({ color = C }: { color?: string }) {
  const bands = [
    { dur: "2.8s", delay: "0s",    op: 0.90, h: "2px", glow: true  },
    { dur: "3.2s", delay: "0.35s", op: 0.40, h: "2px", glow: false },
    { dur: "2.5s", delay: "0.65s", op: 0.20, h: "1px", glow: false },
    { dur: "3.8s", delay: "1.0s",  op: 0.30, h: "1px", glow: false },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {bands.map((b, i) => (
        <Box key={i} sx={{
          position: "absolute",
          // Place at stage centre; rotation + translateY does the rest
          top: "50%",
          left: "50%",
          width: "800px",
          height: b.h,
          marginLeft: "-400px",
          opacity: b.op,
          // Rotate -45° around own centre, then translateY moves it in rotated space
          // → diagonal sweep across the stage
          background: `linear-gradient(to right,
            transparent  0%,
            ${color}18   15%,
            ${color}aa   45%,
            ${color}     55%,
            ${color}aa   65%,
            ${color}18   85%,
            transparent  100%
          )`,
          filter: b.glow
            ? `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 8px ${color}80)`
            : undefined,
          "@keyframes chromeDiag": {
            from: { transform: "rotate(-45deg) translateY(-500px)" },
            to:   { transform: "rotate(-45deg) translateY(500px)"  },
          },
          animation: `chromeDiag ${b.dur} linear ${b.delay} infinite`,
        }} />
      ))}
    </Box>
  );
}

// ─── Storybook meta ───────────────────────────────────────────────────────────
const meta: Meta = {
  title: "HUD / Map / ScanConceptVariants",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
};
export default meta;
type Story = StoryObj;

// ─────────────────────────────────────────────────────────────────────────────
// Individual stories
// ─────────────────────────────────────────────────────────────────────────────

export const C1_RadarSweep: Story = {
  name: "C1 — Radar Sweep",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="C1 — Radar Sweep"
        sublabel="Rotating arm · conic sector afterglow · secondary slow sweep"
      >
        <RadarSweep />
      </ScanStage>
    </Box>
  ),
};

export const C2_SonarPulse: Story = {
  name: "C2 — Sonar Pulse",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="C2 — Sonar Pulse"
        sublabel="Expanding rings from off-centre ping · heartbeat rhythm"
      >
        <SonarPulse />
      </ScanStage>
    </Box>
  ),
};

export const C3_TargetLock: Story = {
  name: "C3 — Target Lock",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="C3 — Target Lock"
        sublabel="H + V scanlines search from all edges · converge at centre · lock flash"
      >
        <TargetLock />
      </ScanStage>
    </Box>
  ),
};

export const C4_ChromeSweep: Story = {
  name: "C4 — Chrome Sweep",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="C4 — Chrome Sweep"
        sublabel="Diagonal aurora bands · 45° sweep · layered speed shimmer"
      >
        <ChromeSweep />
      </ScanStage>
    </Box>
  ),
};

export const AllConcepts: Story = {
  name: "All Concepts",
  render: () => (
    <Box sx={{
      p: 4,
      bgcolor: "#ffffff",
      display: "grid",
      gridTemplateColumns: "repeat(2, auto)",
      gap: 4,
      alignItems: "start",
    }}>
      <ScanStage label="C1 — Radar Sweep" sublabel="Rotating arm + sector trail">
        <RadarSweep />
      </ScanStage>
      <ScanStage label="C2 — Sonar Pulse" sublabel="Expanding rings from ping">
        <SonarPulse />
      </ScanStage>
      <ScanStage label="C3 — Target Lock" sublabel="4-way scanlines → centre flash">
        <TargetLock />
      </ScanStage>
      <ScanStage label="C4 — Chrome Sweep" sublabel="Diagonal aurora bands">
        <ChromeSweep />
      </ScanStage>
    </Box>
  ),
};
