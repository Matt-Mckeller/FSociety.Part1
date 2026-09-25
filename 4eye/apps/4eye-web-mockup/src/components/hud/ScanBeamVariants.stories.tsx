"use client";
/**
 * ScanBeamVariants — three candidate scan-beam animations for the
 * MinimapFullView overlay.
 *
 * Concept: scanning for something, not finding it right away, but
 * being guided toward it anyway — Matrix columns / Pacman leading a
 * line / probes that search then converge.
 *
 * Pick one → replace the ScanBeam component in MinimapFullViewOverlay.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";

// ─── shared demo colour (primary blue) ───────────────────────────────────────
const C = "#2196f3";

// ─── demo container ──────────────────────────────────────────────────────────
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
      <Box
        sx={{
          position: "relative",
          width: 480,
          height: 300,
          bgcolor: "#0b0e17",
          border: `1px solid ${C}30`,
          overflow: "hidden",
          borderRadius: 1,
        }}
      >
        {/* subtle grid overlay so the surface reads as a map */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${C}08 1px, transparent 1px),
              linear-gradient(90deg, ${C}08 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
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
// V1 — Matrix Drop
// Vertical columns fall at independent speeds/delays, like digital rain.
// Three "guide" columns are bright; the rest are dim background noise,
// giving the feel of scanning many channels at once.
// ─────────────────────────────────────────────────────────────────────────────
function MatrixDrop({ color = C }: { color?: string }) {
  const drops = [
    { left: "4%",  dur: "2.1s", delay: "0s",    op: 0.9,  h: 80, glow: true  },
    { left: "11%", dur: "1.4s", delay: "0.65s", op: 0.22, h: 48, glow: false },
    { left: "20%", dur: "3.2s", delay: "0.2s",  op: 0.14, h: 38, glow: false },
    { left: "29%", dur: "1.8s", delay: "1.3s",  op: 0.38, h: 60, glow: false },
    { left: "40%", dur: "2.5s", delay: "0.5s",  op: 0.9,  h: 80, glow: true  },
    { left: "50%", dur: "1.2s", delay: "1.1s",  op: 0.18, h: 32, glow: false },
    { left: "62%", dur: "2.9s", delay: "0.3s",  op: 0.28, h: 52, glow: false },
    { left: "71%", dur: "1.6s", delay: "1.8s",  op: 0.14, h: 36, glow: false },
    { left: "82%", dur: "2.3s", delay: "0.9s",  op: 0.44, h: 65, glow: false },
    { left: "93%", dur: "1.5s", delay: "0.1s",  op: 0.9,  h: 80, glow: true  },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {drops.map((d, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: d.left,
            width: "1px",
            height: d.h,
            opacity: d.op,
            background: `linear-gradient(to bottom,
              transparent 0%,
              ${color}60  40%,
              ${color}    70%,
              ${color}    100%
            )`,
            filter: d.glow
              ? `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 10px ${color}80)`
              : undefined,
            "@keyframes v1MatrixDrop": {
              from: { top: "-100px" },
              to:   { top: "110%" },
            },
            animation: `v1MatrixDrop ${d.dur} linear ${d.delay} infinite`,
          }}
        />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// V2 — Search Beam
// Horizontal probes extend from the left edge, probing right, backing off,
// pausing (not finding it), then finally guided all the way across.
// Six rows run on independent timers so they're always at different phases.
// One "guide" probe is brighter and thicker — it finds its path faster.
// ─────────────────────────────────────────────────────────────────────────────
function SearchBeam({ color = C }: { color?: string }) {
  // Each probe: y position, total cycle duration, start delay, opacity, guide flag
  // All share the same keyframe shape — different durations produce the
  // out-of-phase searching feel.
  const probes = [
    { y: "14%", dur: "5.5s", delay: "0s",    op: 0.38, guide: false, h: "1px"   },
    { y: "28%", dur: "4.8s", delay: "0.8s",  op: 0.28, guide: false, h: "1px"   },
    { y: "42%", dur: "6.2s", delay: "1.5s",  op: 0.35, guide: false, h: "1px"   },
    { y: "54%", dur: "3.4s", delay: "0.3s",  op: 1.0,  guide: true,  h: "1.5px" },
    { y: "66%", dur: "5.1s", delay: "1.2s",  op: 0.30, guide: false, h: "1px"   },
    { y: "79%", dur: "4.5s", delay: "0.6s",  op: 0.22, guide: false, h: "1px"   },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {probes.map((p, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: 0,
            top: p.y,
            height: p.h,
            width: "100%",
            opacity: p.op,
            transformOrigin: "left center",
            // Bright tip at the right edge; transparent tail trailing left.
            // scaleX collapses/expands from the left origin, so the bright
            // right end is always at the current scan position.
            background: `linear-gradient(to right,
              transparent  0%,
              ${color}25   25%,
              ${color}99   72%,
              ${color}     100%
            )`,
            filter: p.guide
              ? `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 6px ${color}80)`
              : undefined,
            // Pattern: probe right → back off → pause → probe → back off → guided
            "@keyframes v2SearchProbe": {
              "0%":   { transform: "scaleX(0)",   opacity: 1 },
              "25%":  { transform: "scaleX(0.44)"              },
              "35%":  { transform: "scaleX(0.32)"              },
              "44%":  { transform: "scaleX(0.32)"              },  // pause: searching
              "57%":  { transform: "scaleX(0.58)"              },
              "65%":  { transform: "scaleX(0.48)"              },
              "73%":  { transform: "scaleX(0.48)"              },  // pause: still searching
              "90%":  { transform: "scaleX(1.0)",  opacity: 1 },  // guided!
              "96%":  { transform: "scaleX(1.0)",  opacity: 1 },
              "100%": { transform: "scaleX(1.0)",  opacity: 0 },  // fade, then restart
            },
            animation: `v2SearchProbe ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// V3 — Packet Race  (Pacman / leading-dot style)
// Each row has a faint dotted rail (the path yet to be scanned) and a bright
// leading dot that drags a comet tail behind it as it advances.
// The dot searches (extends, backs off, pauses), then is guided to the end.
// ─────────────────────────────────────────────────────────────────────────────
function PacketRace({ color = C }: { color?: string }) {
  const DOT_R = 5; // dot radius (px) — applied as border-radius

  const rows = [
    { y: "18%", dur: "5.0s",  delay: "0s",    op: 0.9,  lead: true  },
    { y: "33%", dur: "6.8s",  delay: "0.9s",  op: 0.45, lead: false },
    { y: "49%", dur: "4.6s",  delay: "1.8s",  op: 0.60, lead: false },
    { y: "64%", dur: "7.2s",  delay: "0.4s",  op: 0.38, lead: false },
    { y: "78%", dur: "5.4s",  delay: "1.3s",  op: 0.52, lead: false },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Faint dotted rail on each row */}
      {rows.map((r, i) => (
        <Box
          key={`rail-${i}`}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: r.y,
            height: "1px",
            opacity: 0.12,
            background: `repeating-linear-gradient(
              to right,
              ${color} 0px, ${color} 3px,
              transparent 3px, transparent 10px
            )`,
          }}
        />
      ))}

      {/* Packet: a horizontal pill that grows from the left.
          The gradient keeps a bright rounded tip at the right edge as it scales.
          scaleX with transform-origin "left center" means the bright right edge
          IS the current scan position. */}
      {rows.map((r, i) => (
        <Box
          key={`packet-${i}`}
          sx={{
            position: "absolute",
            left: 0,
            top: `calc(${r.y} - ${DOT_R}px)`,
            height: DOT_R * 2,
            width: "100%",
            opacity: r.op,
            transformOrigin: "left center",
            background: `linear-gradient(to right,
              transparent   0%,
              ${color}12    35%,
              ${color}55    72%,
              ${color}cc    88%,
              ${color}      96%,
              ${color}      100%
            )`,
            // Rounded leading tip
            borderRadius: `0 ${DOT_R}px ${DOT_R}px 0`,
            filter: r.lead
              ? `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 10px ${color}90)`
              : `drop-shadow(0 0 2px ${color}70)`,
            // Search → back off → pause → search → back off → guided
            "@keyframes v3PacketRace": {
              "0%":   { transform: "scaleX(0)",   opacity: 1 },
              "26%":  { transform: "scaleX(0.46)"              },
              "36%":  { transform: "scaleX(0.34)"              },
              "45%":  { transform: "scaleX(0.34)"              },  // pause: not found
              "58%":  { transform: "scaleX(0.52)"              },
              "66%":  { transform: "scaleX(0.43)"              },
              "74%":  { transform: "scaleX(0.43)"              },  // pause: still searching
              "90%":  { transform: "scaleX(1.0)",  opacity: 1 },  // guided to end
              "96%":  { transform: "scaleX(1.0)",  opacity: 1 },
              "100%": { transform: "scaleX(1.0)",  opacity: 0 },  // fade → restart
            },
            animation: `v3PacketRace ${r.dur} ease-in-out ${r.delay} infinite`,
          }}
        />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// V1-Dense — Matrix Drop (20 columns)
// Near-full-screen vertical coverage: 20 columns, mix of 1px and 2px widths,
// more chaotic density. Five bright guide columns; rest are dim noise.
// ─────────────────────────────────────────────────────────────────────────────
function MatrixDense({ color = C }: { color?: string }) {
  const drops = [
    { left: "2%",   dur: "1.8s", delay: "0s",    op: 0.90, h: 80, w: "2px", glow: true  },
    { left: "7%",   dur: "2.6s", delay: "0.5s",  op: 0.18, h: 40, w: "1px", glow: false },
    { left: "12%",  dur: "1.3s", delay: "1.1s",  op: 0.12, h: 30, w: "1px", glow: false },
    { left: "17%",  dur: "3.0s", delay: "0.2s",  op: 0.35, h: 55, w: "1px", glow: false },
    { left: "22%",  dur: "2.1s", delay: "0.8s",  op: 0.90, h: 80, w: "2px", glow: true  },
    { left: "27%",  dur: "1.6s", delay: "1.5s",  op: 0.15, h: 35, w: "1px", glow: false },
    { left: "32%",  dur: "2.8s", delay: "0.3s",  op: 0.22, h: 45, w: "1px", glow: false },
    { left: "37%",  dur: "1.9s", delay: "0.7s",  op: 0.14, h: 32, w: "1px", glow: false },
    { left: "42%",  dur: "2.4s", delay: "1.2s",  op: 0.40, h: 60, w: "1px", glow: false },
    { left: "47%",  dur: "1.5s", delay: "0.4s",  op: 0.90, h: 80, w: "2px", glow: true  },
    { left: "52%",  dur: "3.2s", delay: "0.9s",  op: 0.16, h: 38, w: "1px", glow: false },
    { left: "57%",  dur: "2.0s", delay: "1.6s",  op: 0.12, h: 28, w: "1px", glow: false },
    { left: "62%",  dur: "1.7s", delay: "0.1s",  op: 0.28, h: 50, w: "1px", glow: false },
    { left: "67%",  dur: "2.7s", delay: "1.0s",  op: 0.90, h: 80, w: "2px", glow: true  },
    { left: "72%",  dur: "1.4s", delay: "0.6s",  op: 0.15, h: 34, w: "1px", glow: false },
    { left: "77%",  dur: "3.1s", delay: "1.3s",  op: 0.20, h: 42, w: "1px", glow: false },
    { left: "82%",  dur: "2.2s", delay: "0.2s",  op: 0.35, h: 58, w: "1px", glow: false },
    { left: "87%",  dur: "1.6s", delay: "1.7s",  op: 0.90, h: 80, w: "2px", glow: true  },
    { left: "92%",  dur: "2.9s", delay: "0.8s",  op: 0.14, h: 30, w: "1px", glow: false },
    { left: "97%",  dur: "1.3s", delay: "0.4s",  op: 0.25, h: 48, w: "1px", glow: false },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {drops.map((d, i) => (
        <Box key={i} sx={{
          position: "absolute",
          left: d.left,
          width: d.w,
          height: d.h,
          opacity: d.op,
          background: `linear-gradient(to bottom,
            transparent 0%, ${color}60 40%, ${color} 70%, ${color} 100%)`,
          filter: d.glow
            ? `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 10px ${color}80)`
            : undefined,
          "@keyframes v1dMatrixDrop": { from: { top: "-100px" }, to: { top: "110%" } },
          animation: `v1dMatrixDrop ${d.dur} linear ${d.delay} infinite`,
        }} />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// V2-Dense — Search Beam (12 rows, near-full height coverage)
// ─────────────────────────────────────────────────────────────────────────────
function SearchDense({ color = C }: { color?: string }) {
  const probes = [
    { y: "8%",   dur: "5.5s", delay: "0s",    op: 0.30, guide: false, h: "1px"   },
    { y: "17%",  dur: "4.2s", delay: "0.5s",  op: 0.22, guide: false, h: "1px"   },
    { y: "26%",  dur: "6.0s", delay: "1.1s",  op: 0.35, guide: false, h: "1px"   },
    { y: "35%",  dur: "4.8s", delay: "0.3s",  op: 0.28, guide: false, h: "1px"   },
    { y: "43%",  dur: "5.2s", delay: "1.6s",  op: 1.00, guide: true,  h: "1.5px" },
    { y: "52%",  dur: "3.6s", delay: "0.8s",  op: 0.30, guide: false, h: "1px"   },
    { y: "60%",  dur: "5.8s", delay: "0.2s",  op: 0.22, guide: false, h: "1px"   },
    { y: "69%",  dur: "4.5s", delay: "1.3s",  op: 1.00, guide: true,  h: "1.5px" },
    { y: "77%",  dur: "6.3s", delay: "0.7s",  op: 0.28, guide: false, h: "1px"   },
    { y: "85%",  dur: "3.9s", delay: "1.8s",  op: 0.20, guide: false, h: "1px"   },
    { y: "91%",  dur: "5.1s", delay: "0.4s",  op: 0.18, guide: false, h: "1px"   },
    { y: "96%",  dur: "4.0s", delay: "1.0s",  op: 0.14, guide: false, h: "1px"   },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {probes.map((p, i) => (
        <Box key={i} sx={{
          position: "absolute",
          left: 0,
          top: p.y,
          height: p.h,
          width: "100%",
          opacity: p.op,
          transformOrigin: "left center",
          background: `linear-gradient(to right,
            transparent 0%, ${color}25 25%, ${color}99 72%, ${color} 100%)`,
          filter: p.guide
            ? `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 6px ${color}80)`
            : undefined,
          "@keyframes v2dSearchProbe": {
            "0%":   { transform: "scaleX(0)",   opacity: 1 },
            "25%":  { transform: "scaleX(0.44)" },
            "35%":  { transform: "scaleX(0.32)" },
            "44%":  { transform: "scaleX(0.32)" },
            "57%":  { transform: "scaleX(0.58)" },
            "65%":  { transform: "scaleX(0.48)" },
            "73%":  { transform: "scaleX(0.48)" },
            "90%":  { transform: "scaleX(1.0)",  opacity: 1 },
            "96%":  { transform: "scaleX(1.0)",  opacity: 1 },
            "100%": { transform: "scaleX(1.0)",  opacity: 0 },
          },
          animation: `v2dSearchProbe ${p.dur} ease-in-out ${p.delay} infinite`,
        }} />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// V3-Dense — Packet Race (10 rows, 8% y-spacing)
// ─────────────────────────────────────────────────────────────────────────────
function PacketRaceDense({ color = C }: { color?: string }) {
  const DOT_R = 5;
  const rows = [
    { y: "8%",  dur: "5.2s", delay: "0s",    op: 0.9,  lead: true  },
    { y: "17%", dur: "7.0s", delay: "0.5s",  op: 0.40, lead: false },
    { y: "26%", dur: "4.8s", delay: "1.2s",  op: 0.55, lead: false },
    { y: "34%", dur: "6.5s", delay: "0.3s",  op: 0.35, lead: false },
    { y: "43%", dur: "5.6s", delay: "1.8s",  op: 0.9,  lead: true  },
    { y: "52%", dur: "4.3s", delay: "0.8s",  op: 0.45, lead: false },
    { y: "60%", dur: "6.8s", delay: "1.5s",  op: 0.38, lead: false },
    { y: "69%", dur: "5.0s", delay: "0.2s",  op: 0.9,  lead: true  },
    { y: "78%", dur: "7.3s", delay: "1.0s",  op: 0.42, lead: false },
    { y: "87%", dur: "4.6s", delay: "1.6s",  op: 0.32, lead: false },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {rows.map((r, i) => (
        <Box key={`rail-${i}`} sx={{
          position: "absolute", left: 0, right: 0, top: r.y, height: "1px",
          opacity: 0.10,
          background: `repeating-linear-gradient(
            to right, ${color} 0px, ${color} 3px, transparent 3px, transparent 10px)`,
        }} />
      ))}
      {rows.map((r, i) => (
        <Box key={`pkt-${i}`} sx={{
          position: "absolute",
          left: 0,
          top: `calc(${r.y} - ${DOT_R}px)`,
          height: DOT_R * 2,
          width: "100%",
          opacity: r.op,
          transformOrigin: "left center",
          background: `linear-gradient(to right,
            transparent 0%, ${color}12 35%, ${color}55 72%,
            ${color}cc 88%, ${color} 96%, ${color} 100%)`,
          borderRadius: `0 ${DOT_R}px ${DOT_R}px 0`,
          filter: r.lead
            ? `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 10px ${color}90)`
            : `drop-shadow(0 0 2px ${color}70)`,
          "@keyframes v3dPacketRace": {
            "0%":   { transform: "scaleX(0)",   opacity: 1 },
            "26%":  { transform: "scaleX(0.46)" },
            "36%":  { transform: "scaleX(0.34)" },
            "45%":  { transform: "scaleX(0.34)" },
            "58%":  { transform: "scaleX(0.52)" },
            "66%":  { transform: "scaleX(0.43)" },
            "74%":  { transform: "scaleX(0.43)" },
            "90%":  { transform: "scaleX(1.0)",  opacity: 1 },
            "96%":  { transform: "scaleX(1.0)",  opacity: 1 },
            "100%": { transform: "scaleX(1.0)",  opacity: 0 },
          },
          animation: `v3dPacketRace ${r.dur} ease-in-out ${r.delay} infinite`,
        }} />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// V4 — Orbital Ring
// Six particles orbit the realm perimeter in an ellipse (RX=195, RY=100),
// simulating a sphere spinning around the grid. Perspective depth: particles
// are larger/brighter when at the bottom (front of sphere) and
// smaller/dimmer at the top (back of sphere). The faint orbit ellipse
// traces the path like a ring around the realm.
//
// Comet variant: particles clustered together with tight delays,
// acting as a single comet orbiting with trailing echoes.
// ─────────────────────────────────────────────────────────────────────────────
// Stage center: (240, 150). RX=195, RY=100.
// Keyframe traces the ellipse clockwise on screen (y-down):
//   x(t) = 195 * cos(2πt),  y(t) = 100 * sin(2πt)
// Opacity + scale encode Z-depth:  bottom = bright/large, top = dim/small.
const ORBIT_KF = {
  "0%":    { transform: "translate(195px,   0px)  scale(0.90)", opacity: 0.60 },
  "12.5%": { transform: "translate(138px,  71px)  scale(1.18)", opacity: 0.88 },
  "25%":   { transform: "translate(  0px, 100px)  scale(1.30)", opacity: 1.00 },
  "37.5%": { transform: "translate(-138px, 71px)  scale(1.18)", opacity: 0.88 },
  "50%":   { transform: "translate(-195px,  0px)  scale(0.90)", opacity: 0.60 },
  "62.5%": { transform: "translate(-138px,-71px)  scale(0.62)", opacity: 0.32 },
  "75%":   { transform: "translate(  0px,-100px)  scale(0.50)", opacity: 0.20 },
  "87.5%": { transform: "translate( 138px,-71px)  scale(0.62)", opacity: 0.32 },
  "100%":  { transform: "translate(195px,   0px)  scale(0.90)", opacity: 0.60 },
};

function OrbitalRing({ color = C }: { color?: string }) {
  // 6 particles evenly distributed — forms a full scan ring
  const DUR = 4.0;
  const N   = 6;
  const particles = Array.from({ length: N }, (_, i) => ({
    delay:  `${-(i * DUR / N).toFixed(3)}s`,
    size:   i === 0 ? 9 : 7,
    glow:   i === 0,
  }));

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Faint orbit ellipse guide */}
      <Box sx={{
        position: "absolute",
        top: 150 - 100, left: 240 - 195,
        width: 390, height: 200,
        border: `1px solid ${color}18`,
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      {particles.map(({ delay, size, glow }, i) => (
        <Box key={i} sx={{
          position: "absolute",
          top: 150 - size / 2,
          left: 240 - size / 2,
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          boxShadow: glow
            ? `0 0 5px 2px ${color}, 0 0 14px 6px ${color}70`
            : `0 0 4px 1px ${color}80`,
          "@keyframes orbitalRingKF": ORBIT_KF,
          animation: `orbitalRingKF ${DUR}s linear ${delay} infinite`,
        }} />
      ))}
    </Box>
  );
}

function OrbitalComet({ color = C }: { color?: string }) {
  // 5 particles in a tight cluster → single comet orbiting with trailing echoes
  const DUR  = 4.0;
  const TAIL = [
    { delay: "0s",     size: 10, op: 1.00, glow: true  },
    { delay: "-0.09s", size: 8,  op: 0.68, glow: false },
    { delay: "-0.17s", size: 7,  op: 0.42, glow: false },
    { delay: "-0.24s", size: 5,  op: 0.24, glow: false },
    { delay: "-0.30s", size: 4,  op: 0.12, glow: false },
  ] as const;

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Box sx={{
        position: "absolute",
        top: 150 - 100, left: 240 - 195,
        width: 390, height: 200,
        border: `1px solid ${color}14`,
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      {TAIL.map(({ delay, size, op, glow }, i) => (
        <Box key={i} sx={{
          position: "absolute",
          top:  150 - size / 2,
          left: 240 - size / 2,
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          opacity: op,
          boxShadow: glow
            ? `0 0 6px 3px ${color}, 0 0 18px 8px ${color}60`
            : `0 0 3px 1px ${color}60`,
          "@keyframes orbitalCometKF": ORBIT_KF,
          animation: `orbitalCometKF ${DUR}s linear ${delay} infinite`,
        }} />
      ))}
    </Box>
  );
}

// ─── Storybook meta ───────────────────────────────────────────────────────────
const meta: Meta = {
  title: "HUD / Map / ScanBeamVariants",
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

export const V1_MatrixDrop: Story = {
  name: "V1 — Matrix Drop",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V1 — Matrix Drop"
        sublabel="Vertical rain columns · independent speeds/delays · 3 bright guide columns"
      >
        <MatrixDrop />
      </ScanStage>
    </Box>
  ),
};

export const V2_SearchBeam: Story = {
  name: "V2 — Search Beam",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V2 — Search Beam"
        sublabel="Horizontal probes · search → back off → pause → guided across"
      >
        <SearchBeam />
      </ScanStage>
    </Box>
  ),
};

export const V3_PacketRace: Story = {
  name: "V3 — Packet Race",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V3 — Packet Race"
        sublabel="Pacman-style · dotted rail · leading dot drags comet tail · search then guided"
      >
        <PacketRace />
      </ScanStage>
    </Box>
  ),
};

export const AllVariants: Story = {
  name: "All — Original 3",
  render: () => (
    <Box
      sx={{
        p: 4,
        bgcolor: "#ffffff",
        display: "grid",
        gridTemplateColumns: "repeat(3, auto)",
        gap: 4,
        alignItems: "start",
      }}
    >
      <ScanStage
        label="V1 — Matrix Drop"
        sublabel="Vertical rain columns"
      >
        <MatrixDrop />
      </ScanStage>
      <ScanStage
        label="V2 — Search Beam"
        sublabel="Probes: search → guided"
      >
        <SearchBeam />
      </ScanStage>
      <ScanStage
        label="V3 — Packet Race"
        sublabel="Pacman leading dot"
      >
        <PacketRace />
      </ScanStage>
    </Box>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Dense + Orbital variant stories
// ─────────────────────────────────────────────────────────────────────────────

export const V1D_MatrixDense: Story = {
  name: "V1D — Matrix Dense (20 cols)",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V1D — Matrix Dense"
        sublabel="20 columns · 5 bright guides · near-full width coverage"
      >
        <MatrixDense />
      </ScanStage>
    </Box>
  ),
};

export const V2D_SearchDense: Story = {
  name: "V2D — Search Dense (12 rows)",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V2D — Search Dense"
        sublabel="12 rows · 8% y-spacing · near-full height coverage"
      >
        <SearchDense />
      </ScanStage>
    </Box>
  ),
};

export const V3D_PacketRaceDense: Story = {
  name: "V3D — Packet Race Dense (10 rows)",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V3D — Packet Race Dense"
        sublabel="10 rows · 3 lead packets · dotted rails · search then guided"
      >
        <PacketRaceDense />
      </ScanStage>
    </Box>
  ),
};

export const V4A_OrbitalRing: Story = {
  name: "V4A — Orbital Ring",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V4A — Orbital Ring"
        sublabel="6 scan nodes orbit the realm perimeter · 3D depth (opacity + scale)"
      >
        <OrbitalRing />
      </ScanStage>
    </Box>
  ),
};

export const V4B_OrbitalComet: Story = {
  name: "V4B — Orbital Comet",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <ScanStage
        label="V4B — Orbital Comet"
        sublabel="Single comet + 4 trailing echoes orbit the realm · perspective depth"
      >
        <OrbitalComet />
      </ScanStage>
    </Box>
  ),
};

export const AllDenseAndOrbital: Story = {
  name: "All — Dense + Orbital",
  render: () => (
    <Box sx={{
      p: 4, bgcolor: "#ffffff",
      display: "grid",
      gridTemplateColumns: "repeat(3, auto)",
      gap: 4,
      alignItems: "start",
    }}>
      <ScanStage label="V1D — Matrix Dense" sublabel="20 columns">
        <MatrixDense />
      </ScanStage>
      <ScanStage label="V2D — Search Dense" sublabel="12 rows">
        <SearchDense />
      </ScanStage>
      <ScanStage label="V3D — Packet Dense" sublabel="10 rows">
        <PacketRaceDense />
      </ScanStage>
      <ScanStage label="V4A — Orbital Ring" sublabel="6 nodes, full ring">
        <OrbitalRing />
      </ScanStage>
      <ScanStage label="V4B — Orbital Comet" sublabel="Comet + 4 echoes">
        <OrbitalComet />
      </ScanStage>
    </Box>
  ),
};
