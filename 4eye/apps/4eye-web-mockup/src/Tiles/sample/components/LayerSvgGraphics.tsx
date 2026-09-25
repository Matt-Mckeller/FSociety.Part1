"use client";

import { motion } from "framer-motion";

// ── Shared variant tokens ─────────────────────────────────────────────────

const pV = {
  rest:    { pathLength: 0, opacity: 0 },
  hovered: { pathLength: 1, opacity: 0.85 },
};
const pVFaint = {
  rest:    { pathLength: 0, opacity: 0 },
  hovered: { pathLength: 1, opacity: 0.36 },
};
const pVGrid = {
  rest:    { pathLength: 0, opacity: 0 },
  hovered: { pathLength: 1, opacity: 0.14 },
};
const dotV = {
  rest:    { r: 0,   opacity: 0 },
  hovered: { r: 3,   opacity: 1 },
};
const bigDotV = {
  rest:    { r: 0, opacity: 0 },
  hovered: { r: 5, opacity: 1 },
};
const arrowV = {
  rest:    { pathLength: 0, opacity: 0 },
  hovered: { pathLength: 1, opacity: 1.0 },
};

// Stagger groups
const gV = {
  rest:    { transition: { staggerChildren: 0, staggerDirection: -1 as const } },
  hovered: { transition: { staggerChildren: 0.065, delayChildren: 0.08 } },
};
const fastGV = {
  rest:    { transition: { staggerChildren: 0, staggerDirection: -1 as const } },
  hovered: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
};

// ── Helpers ───────────────────────────────────────────────────────────────

function arc(cx: number, cy: number, r: number): string {
  return `M ${cx - r},${cy} A ${r},${r},0,0,1,${cx + r},${cy} A ${r},${r},0,0,1,${cx - r},${cy}`;
}
function line(x1: number, y1: number, x2: number, y2: number): string {
  return `M ${x1},${y1} L ${x2},${y2}`;
}

const PT      = { duration: 0.5, ease: "easeInOut" as const };
const PT_FAST = { duration: 0.3, ease: "easeOut"   as const };
const DOT_T   = { duration: 0.28, type: "spring" as const, stiffness: 340, damping: 22 };

// ── 1. AION — Concentric ring neural topology ─────────────────────────────

export function AionSvg({ color }: { color: string }) {
  const cx = 70, cy = 26, r1 = 19, r2 = 10, r3 = 28;
  const spoke = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) };
  };
  // 8 spokes at 45° intervals
  const pts = [0, 45, 90, 135, 180, 225, 270, 315].map(spoke);

  return (
    <svg viewBox="0 0 140 52" fill="none" width="100%" height="100%">
      <motion.g variants={gV}>
        {/* Outer faint ring */}
        <motion.path d={arc(cx, cy, r3)} stroke={color} strokeWidth={0.7} variants={pVFaint} transition={PT} />
        {/* Primary ring */}
        <motion.path d={arc(cx, cy, r1)} stroke={color} strokeWidth={1.1} variants={pV} transition={PT} />
        {/* Inner ring */}
        <motion.path d={arc(cx, cy, r2)} stroke={color} strokeWidth={1.0} variants={pV} transition={PT_FAST} />
        {/* 8 spokes */}
        {pts.map((p, i) => (
          <motion.path key={i} d={line(cx, cy, p.x, p.y)} stroke={color} strokeWidth={0.7} variants={pVFaint} transition={PT_FAST} />
        ))}
        {/* Node dots */}
        {pts.map((p, i) => (
          <motion.circle key={i} cx={p.x} cy={p.y} fill={color} variants={dotV} transition={DOT_T} />
        ))}
        <motion.circle cx={cx} cy={cy} fill={color} variants={bigDotV} transition={DOT_T} />
        {/* Side dashes */}
        <motion.path d={`M 4,${cy} L ${cx - r1 - 2},${cy}`}  stroke={color} strokeWidth={0.7} strokeDasharray="3,3" variants={pVFaint} transition={PT_FAST} />
        <motion.path d={`M ${cx + r1 + 2},${cy} L 136,${cy}`} stroke={color} strokeWidth={0.7} strokeDasharray="3,3" variants={pVFaint} transition={PT_FAST} />
      </motion.g>
    </svg>
  );
}

// ── 2. brainwave — Action potential spike train ───────────────────────────

export function brainwaveSVG({ color }: { color: string }) {
  const wave =
    "M 5,26 L 20,26 L 24,24 L 28,7 L 33,45 L 37,19 L 41,26 L 64,26 L 68,24 L 72,7 L 77,45 L 81,19 L 85,26 L 135,26";

  return (
    <svg viewBox="0 0 140 52" fill="none" width="100%" height="100%">
      <motion.g variants={gV}>
        {/* Horizontal baseline grid */}
        {[14, 26, 38].map((y, i) => (
          <motion.path
            key={`grid-${i}`}
            d={`M 5,${y} L 135,${y}`}
            stroke={color}
            strokeWidth={0.5}
            variants={pVGrid}
            transition={{ ...PT_FAST, delay: i * 0.02 }}
          />
        ))}
        {/* EEG waveform */}
        <motion.path d={wave} stroke={color} strokeWidth={1.4} variants={pV} transition={{ duration: 0.75, ease: "easeInOut" }} />
        {/* Spike-tip nodes */}
        <motion.circle cx={28} cy={7}  fill={color} variants={dotV} transition={{ ...DOT_T, delay: 0.35 }} />
        <motion.circle cx={72} cy={7}  fill={color} variants={dotV} transition={{ ...DOT_T, delay: 0.55 }} />
        {/* Scale markers */}
        <motion.path d="M 5,12 L 5,40"    stroke={color} strokeWidth={0.65} strokeDasharray="2,3" variants={pVFaint} transition={PT_FAST} />
        <motion.path d="M 135,12 L 135,40" stroke={color} strokeWidth={0.65} strokeDasharray="2,3" variants={pVFaint} transition={PT_FAST} />
      </motion.g>
    </svg>
  );
}

// ── 3. Robot — 2D arm schematic ───────────────────────────────────────────

export function RobotSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 140 52" fill="none" width="100%" height="100%">
      <motion.g variants={gV}>
        {/* Base */}
        <motion.path d="M 4,42 L 22,42 L 22,34 L 4,34 Z" stroke={color} strokeWidth={1.0} variants={pV} transition={PT_FAST} />
        {/* Shoulder joint */}
        <motion.path d={arc(22, 30, 6)} stroke={color} strokeWidth={1.0} variants={pV} transition={PT_FAST} />
        <motion.circle cx={22} cy={30} fill={color} variants={dotV} transition={DOT_T} />
        {/* Upper arm */}
        <motion.path d="M 28,30 L 70,18" stroke={color} strokeWidth={1.2} variants={pV} transition={{ duration: 0.45 }} />
        {/* Elbow joint */}
        <motion.path d={arc(70, 18, 5)} stroke={color} strokeWidth={1.0} variants={pV} transition={PT_FAST} />
        <motion.circle cx={70} cy={18} fill={color} variants={dotV} transition={DOT_T} />
        {/* Forearm */}
        <motion.path d="M 75,18 L 108,9" stroke={color} strokeWidth={1.2} variants={pV} transition={{ duration: 0.4 }} />
        {/* Wrist joint */}
        <motion.path d={arc(108, 9, 4)} stroke={color} strokeWidth={0.85} variants={pV} transition={PT_FAST} />
        <motion.circle cx={108} cy={9} fill={color} variants={dotV} transition={DOT_T} />
        {/* Gripper fingers */}
        <motion.path d="M 112,7 L 130,4 L 130,10 L 112,10"  stroke={color} strokeWidth={0.9} variants={pV} transition={PT_FAST} />
        <motion.path d="M 112,11 L 130,11 L 130,17 L 112,14" stroke={color} strokeWidth={0.9} variants={pV} transition={PT_FAST} />
        {/* Range-of-motion arc at shoulder */}
        <motion.path d="M 11,18 A 16,16,0,0,1,38,27" stroke={color} strokeWidth={0.65} strokeDasharray="2,3" variants={pVFaint} transition={{ duration: 0.6 }} />
        {/* Existing motion sweep */}
        <motion.path d="M 28,20 A 12,12,0,0,1,28,40" stroke={color} strokeWidth={0.65} strokeDasharray="2,3" variants={pVFaint} transition={{ duration: 0.4 }} />
      </motion.g>
    </svg>
  );
}

// ── 4. Glasses — Dual lens optical schematic ─────────────────────────────

export function GlassesSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 140 52" fill="none" width="100%" height="100%">
      <motion.g variants={gV}>
        {/* Temple left */}
        <motion.path d="M 4,19 L 21,26"   stroke={color} strokeWidth={1.0} variants={pV} transition={PT_FAST} />
        {/* Left lens outer */}
        <motion.path d={arc(38, 26, 17)}   stroke={color} strokeWidth={1.1} variants={pV} transition={PT} />
        {/* Left lens inner */}
        <motion.path d={arc(38, 26, 9)}    stroke={color} strokeWidth={0.75} variants={pVFaint} transition={PT_FAST} />
        {/* Left crosshair */}
        <motion.path d="M 38,11 L 38,41"   stroke={color} strokeWidth={0.55} variants={pVFaint} transition={PT_FAST} />
        <motion.path d="M 23,26 L 53,26"   stroke={color} strokeWidth={0.55} variants={pVFaint} transition={PT_FAST} />
        <motion.circle cx={38} cy={26} fill={color} variants={dotV} transition={DOT_T} />
        {/* Bridge */}
        <motion.path d="M 55,24 Q 70,18 85,24" stroke={color} strokeWidth={1.0} fill="none" variants={pV} transition={{ duration: 0.35 }} />
        {/* Right lens outer */}
        <motion.path d={arc(102, 26, 17)}   stroke={color} strokeWidth={1.1} variants={pV} transition={PT} />
        {/* Right lens inner */}
        <motion.path d={arc(102, 26, 9)}    stroke={color} strokeWidth={0.75} variants={pVFaint} transition={PT_FAST} />
        {/* Right crosshair */}
        <motion.path d="M 102,11 L 102,41"  stroke={color} strokeWidth={0.55} variants={pVFaint} transition={PT_FAST} />
        <motion.path d="M  87,26 L 117,26"  stroke={color} strokeWidth={0.55} variants={pVFaint} transition={PT_FAST} />
        <motion.circle cx={102} cy={26} fill={color} variants={dotV} transition={DOT_T} />
        {/* Temple right */}
        <motion.path d="M 119,26 L 136,19"  stroke={color} strokeWidth={1.0} variants={pV} transition={PT_FAST} />
      </motion.g>
    </svg>
  );
}

// ── 5. Visual — Sensor dot matrix ────────────────────────────────────────

export function VisualSvg({ color }: { color: string }) {
  const cols = 8, rows = 5;
  const sx = 10, sy = 5, gx = 16, gy = 10;

  return (
    <svg viewBox="0 0 140 52" fill="none" width="100%" height="100%">
      <motion.g variants={fastGV}>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <motion.circle
              key={`${r}-${c}`}
              cx={sx + c * gx}
              cy={sy + r * gy}
              fill={color}
              opacity={0.82 - r * 0.10}
              variants={{ rest: { r: 0 }, hovered: { r: 2 } }}
              transition={{ duration: 0.18, type: "spring" }}
            />
          ))
        )}
        {/* Dual scan lines */}
        <motion.path d="M 4,25 L 136,25"  stroke={color} strokeWidth={0.85} variants={pVFaint} transition={{ duration: 1.0, ease: "linear", delay: 0.2 }} />
        <motion.path d="M 4,45 L 136,45"  stroke={color} strokeWidth={0.5}  variants={pVFaint} transition={{ duration: 1.0, ease: "linear", delay: 0.5 }} />
      </motion.g>
    </svg>
  );
}

// ── 6. Audio — Spectrum analyzer bars ────────────────────────────────────

export function AudioSvg({ color }: { color: string }) {
  const barW = 6, gap = 4;
  const heights = [10, 16, 24, 32, 38, 42, 44, 42, 38, 32, 24, 16, 10, 6];
  const totalW = heights.length * (barW + gap) - gap;
  const startX = (140 - totalW) / 2;
  const cy = 26;

  return (
    <svg viewBox="0 0 140 52" fill="none" width="100%" height="100%">
      <motion.g variants={fastGV}>
        {/* Bars */}
        {heights.map((h, i) => (
          <motion.rect
            key={i}
            x={startX + i * (barW + gap)}
            width={barW}
            rx={1.5}
            fill={color}
            opacity={0.72}
            variants={{ rest: { y: cy, height: 0 }, hovered: { y: cy - h / 2, height: h } }}
            transition={{ duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ))}
        {/* Specular highlight cap on each bar */}
        {heights.map((h, i) => (
          <motion.rect
            key={`cap-${i}`}
            x={startX + i * (barW + gap)}
            width={barW}
            rx={1}
            fill={color}
            opacity={0.95}
            variants={{ rest: { y: cy, height: 0 }, hovered: { y: cy - h / 2 - 2, height: 2 } }}
            transition={{ duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ))}
        {/* Baseline */}
        <motion.path d={`M 4,${cy} L 136,${cy}`} stroke={color} strokeWidth={0.75} variants={pVFaint} transition={{ duration: 0.25 }} />
      </motion.g>
    </svg>
  );
}

// ── 7. Chat — Network mesh topology ──────────────────────────────────────

export function ChatSvg({ color }: { color: string }) {
  const nodes = [
    { id: 0, x: 10,  y: 26 },
    { id: 1, x: 40,  y: 10 },
    { id: 2, x: 40,  y: 42 },
    { id: 3, x: 70,  y: 26 },
    { id: 4, x: 100, y: 10 },
    { id: 5, x: 100, y: 42 },
    { id: 6, x: 130, y: 26 },
  ];
  const edges = [[0,1],[0,2],[0,3],[1,3],[2,3],[3,4],[3,5],[3,6],[4,6],[5,6]];

  // Directional arrowheads on 3 edges (right-pointing and diagonal)
  const arrows = [
    "M 64,22 L 70,26 L 64,30",    // 0→3 (horizontal right)
    "M 124,22 L 130,26 L 124,30", // 3→6 (horizontal right)
    "M 97,16 L 100,10 L 93,9",    // 3→4 (upper-right diagonal)
  ];

  return (
    <svg viewBox="0 0 140 52" fill="none" width="100%" height="100%">
      <motion.g variants={gV}>
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.path
            key={i}
            d={line(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y)}
            stroke={color}
            strokeWidth={0.8}
            variants={pVFaint}
            transition={PT_FAST}
          />
        ))}
        {/* Directional arrows */}
        {arrows.map((d, i) => (
          <motion.path
            key={`arrow-${i}`}
            d={d}
            stroke={color}
            strokeWidth={0.9}
            variants={arrowV}
            transition={{ ...DOT_T, delay: 0.15 + i * 0.06 }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            fill={color}
            variants={n.id === 3 ? bigDotV : dotV}
            transition={DOT_T}
          />
        ))}
      </motion.g>
    </svg>
  );
}

// ── Registry ──────────────────────────────────────────────────────────────

const SVG_MAP: Record<string, React.ComponentType<{ color: string }>> = {
  aion:      AionSvg,
  brainwave: brainwaveSVG,
  robot:     RobotSvg,
  glasses:   GlassesSvg,
  visual:    VisualSvg,
  audio:     AudioSvg,
  chat:      ChatSvg,
};

export function LayerSvgGraphic({ id, color }: { id: string; color: string }) {
  const Svg = SVG_MAP[id] ?? AionSvg;
  return <Svg color={color} />;
}
