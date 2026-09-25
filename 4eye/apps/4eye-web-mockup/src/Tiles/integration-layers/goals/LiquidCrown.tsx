"use client";

/**
 * LiquidCrown — the Command King crown, in four renderable variants:
 *
 *   · liquid   (default) — red liquid body, water flowing base → tips, purple flame aura
 *   · laser    — glassy body traced by a traveling cyan/magenta laser outline + tip beams
 *   · matrix   — near-black body with falling green code rain, thin green scanline aura
 *   · amethyst — the regalia: amethyst-into-black body, black flame, an LED/laser edge
 *                tracing the perimeter, ascending bands, and a mounted centre-front stone
 *
 * Every variant keeps the same eye-with-embedded-diamond centerpiece (the
 * real brand CrystalIcon). Pass `followCursor` to let the eye track the
 * pointer within the card.
 *
 * `amethyst` is the character's own crown rather than a restyle of the Command
 * King's — same silhouette, different metal. It is also the 2D fallback for the
 * 3D crown on the yen home page, so the two must read as one object: the
 * ascending bands here are the same rings that step upward there, and they carry
 * the same meaning — one band per group of the application grid.
 */

import * as React from "react";
import { Box } from "@mui/material";
import { CrystalIcon } from "@4eye/icons";

export type CrownVariant = "liquid" | "laser" | "matrix" | "amethyst";

// 5-point crown outline (viewBox 140×140)
const CROWN =
  "M30,104 L30,82 L32,56 L41,82 L51,50 L60,82 L70,40 L79,82 L89,50 L98,82 L108,56 L110,82 L110,104 Z";
const TIPS: [number, number][] = [
  [32, 56],
  [51, 50],
  [70, 40],
  [89, 50],
  [108, 56],
];
const CROWN_PERIMETER = 420; // approx, for dash-based tracing

/**
 * The ascending bands on the amethyst variant.
 *
 * Five, one per group of the application grid, narrowing as they rise — the
 * crown is a legend for the page it sits on. `y` is the band's baseline inside
 * the 140×140 viewBox; `inset` pulls its ends in so the stack tapers.
 */
const BANDS: { y: number; inset: number; opacity: number }[] = [
  { y: 98, inset: 2, opacity: 0.55 },
  { y: 90, inset: 6, opacity: 0.46 },
  { y: 82, inset: 11, opacity: 0.37 },
  { y: 74, inset: 17, opacity: 0.28 },
  { y: 66, inset: 24, opacity: 0.2 },
];

/**
 * Black flame: plumes that lick up the body rather than a glow around it.
 *
 * Drawn dark and composited over the amethyst so the body reads as burning from
 * inside. Each plume runs on its own clock so they never pulse in unison.
 */
const FLAMES: { x: number; scale: number; dur: number; delay: number }[] = [
  { x: 38, scale: 0.8, dur: 2.9, delay: 0 },
  { x: 54, scale: 1.05, dur: 2.3, delay: 0.6 },
  { x: 70, scale: 1.25, dur: 3.3, delay: 0.25 },
  { x: 86, scale: 1.05, dur: 2.5, delay: 0.85 },
  { x: 102, scale: 0.8, dur: 3.0, delay: 0.45 },
];

// deterministic matrix-rain columns (x, start-string, duration, delay)
const MATRIX_COLUMNS: { x: number; glyphs: string; dur: number; delay: number }[] = [
  { x: 36, glyphs: "1001011010", dur: 2.6, delay: 0 },
  { x: 48, glyphs: "0110100101", dur: 3.1, delay: 0.4 },
  { x: 60, glyphs: "1100101101", dur: 2.3, delay: 0.9 },
  { x: 70, glyphs: "0101100110", dur: 2.9, delay: 0.2 },
  { x: 80, glyphs: "1011010011", dur: 2.5, delay: 0.7 },
  { x: 92, glyphs: "0100110101", dur: 3.3, delay: 0.1 },
  { x: 104, glyphs: "1101001011", dur: 2.7, delay: 0.5 },
];

/**
 * Per-variant colours.
 *
 * A record rather than the chain of ternaries this used to be: with a fourth
 * variant each colour became a four-deep conditional, and reading one variant's
 * palette meant tracing six separate expressions.
 */
const PALETTE: Record<
  CrownVariant,
  { diamond: string; irisCore: string; irisMid: string; irisDeep: string; auraA: string; auraB: string }
> = {
  liquid: {
    diamond: "#8fe9ff",
    irisCore: "#ffe0ef",
    irisMid: "#ff5c7a",
    irisDeep: "#7a1e6b",
    auraA: "#b06cff",
    auraB: "#7a2cff",
  },
  laser: {
    diamond: "#ffb37a",
    irisCore: "#eafcff",
    irisMid: "#5cd0ff",
    irisDeep: "#0c2a4a",
    auraA: "#5ad4ff",
    auraB: "#ff5c9e",
  },
  matrix: {
    diamond: "#8fffb0",
    irisCore: "#c8ffd9",
    irisMid: "#3fe07a",
    irisDeep: "#0a3d1e",
    auraA: "#39ff88",
    auraB: "#0fae52",
  },
  amethyst: {
    diamond: "#e9d5ff",
    irisCore: "#f7ecff",
    irisMid: "#b06cff",
    irisDeep: "#2a0a3d",
    auraA: "#b06cff",
    auraB: "#7a2cff",
  },
};

interface LiquidCrownProps {
  size?: number;
  hero?: boolean;
  variant?: CrownVariant;
  /** Let the eye's iris + embedded diamond track the pointer within the card. */
  followCursor?: boolean;
}

export function LiquidCrown({ size = 120, hero = false, variant = "liquid", followCursor = false }: LiquidCrownProps) {
  const id = `crown${React.useId().replace(/:/g, "")}`;
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = React.useState({ dx: 0, dy: 0 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!followCursor || !boxRef.current) return;
      const rect = boxRef.current.getBoundingClientRect();
      const px = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const py = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setPupil({
        dx: Math.max(-1, Math.min(1, px)) * 3.6,
        dy: Math.max(-1, Math.min(1, py)) * 2.4,
      });
    },
    [followCursor]
  );
  const handleMouseLeave = React.useCallback(() => followCursor && setPupil({ dx: 0, dy: 0 }), [followCursor]);

  const {
    diamond: diamondColor,
    irisCore,
    irisMid,
    irisDeep,
    auraA,
    auraB,
  } = PALETTE[variant];

  return (
    <Box
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{ width: size, height: size, position: "relative", flexShrink: 0, lineHeight: 0 }}
    >
      <svg viewBox="0 0 140 140" width={size} height={size} aria-hidden style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={`${id}-red`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff9a8b" />
            <stop offset="34%" stopColor="#ff3b52" />
            <stop offset="100%" stopColor="#8e0f2a" />
          </linearGradient>
          <linearGradient id={`${id}-water`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd0c4" stopOpacity={0.0} />
            <stop offset="45%" stopColor="#ff6b7e" stopOpacity={0.85} />
            <stop offset="100%" stopColor="#ff3b52" stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`${id}-glass`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0e2436" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#050a14" stopOpacity={0.75} />
          </linearGradient>
          {/* Amethyst into black: the stone at the tips, the flame at the base. */}
          <linearGradient id={`${id}-amethyst`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="22%" stopColor="#a855f7" />
            <stop offset="56%" stopColor="#4c1d95" />
            <stop offset="82%" stopColor="#2a0a3d" />
            <stop offset="100%" stopColor="#0a0a0f" />
          </linearGradient>
          {/* The plume itself — opaque black at the root, gone by the tip. */}
          <linearGradient id={`${id}-blackflame`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity={0.92} />
            <stop offset="55%" stopColor="#1a0526" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#7a2cff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`${id}-laserStroke`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={auraA} />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={auraB} />
          </linearGradient>
          <radialGradient id={`${id}-iris`} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={irisCore} />
            <stop offset="45%" stopColor={irisMid} />
            <stop offset="100%" stopColor={irisDeep} />
          </radialGradient>
          <clipPath id={`${id}-clip`}>
            <path d={CROWN} />
          </clipPath>
          <filter id={`${id}-flame`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
          <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>

        {/* ── aura ── */}
        {variant === "liquid" && (
          <g filter={`url(#${id}-flame)`} fill="none" strokeLinejoin="round">
            <path d={CROWN} stroke={auraA} strokeWidth={7} opacity={0.85}>
              <animate attributeName="stroke-width" values="6;9;6" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0.95;0.55" dur="1.5s" repeatCount="indefinite" />
            </path>
            <path d={CROWN} stroke={auraB} strokeWidth={4} opacity={0.7}>
              <animate attributeName="stroke-width" values="4;6;4" dur="1.1s" repeatCount="indefinite" />
            </path>
          </g>
        )}
        {(variant === "laser" || variant === "matrix") && (
          <g filter={`url(#${id}-flame)`} fill="none">
            <path d={CROWN} stroke={auraA} strokeWidth={3.5} opacity={0.55}>
              <animate attributeName="opacity" values="0.35;0.7;0.35" dur="1.8s" repeatCount="indefinite" />
            </path>
          </g>
        )}

        {/*
          Amethyst aura. Two strokes on different clocks — a wide slow one that
          reads as heat and a tight fast one that reads as charge. The dark inner
          pass is what makes it a *black* flame rather than a purple glow: it
          eats the light immediately around the silhouette, so the amethyst
          appears to burn out of shadow instead of sitting on it.
        */}
        {variant === "amethyst" && (
          <g filter={`url(#${id}-flame)`} fill="none" strokeLinejoin="round">
            <path d={CROWN} stroke="#0a0a0f" strokeWidth={9} opacity={0.9} />
            <path d={CROWN} stroke={auraB} strokeWidth={6.5} opacity={0.7}>
              <animate attributeName="stroke-width" values="5.5;8.5;5.5" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0.8;0.45" dur="2.6s" repeatCount="indefinite" />
            </path>
            <path d={CROWN} stroke={auraA} strokeWidth={3} opacity={0.75}>
              <animate attributeName="stroke-width" values="2.4;4.2;2.4" dur="1.3s" repeatCount="indefinite" />
            </path>
          </g>
        )}

        {/* ── body ── */}
        {variant === "liquid" && (
          <>
            <path d={CROWN} fill={`url(#${id}-red)`} stroke="#ffb0a8" strokeWidth={1} strokeOpacity={0.5} />
            <g clipPath={`url(#${id}-clip)`}>
              <g>
                <animateTransform attributeName="transform" type="translate" values="0,64; 0,-64; 0,64" dur="3.4s" repeatCount="indefinite" />
                <rect x="24" y="40" width="92" height="70" fill={`url(#${id}-water)`} />
                <path d="M24,52 q11,-7 22,0 t22,0 t22,0 t22,0 v40 h-110 Z" fill="#ff8fa0" fillOpacity={0.28} />
              </g>
              <rect x="50" y="40" width="8" height="70" fill="#ffffff" fillOpacity={0.12} />
            </g>
          </>
        )}

        {variant === "laser" && (
          <>
            <path d={CROWN} fill={`url(#${id}-glass)`} />
            {/* tip beams shooting up */}
            <g clipPath={`url(#${id}-clip)`}>
              {TIPS.map(([x, y], i) => (
                <rect key={i} x={x - 0.6} y={y - 40} width={1.2} height={40} fill={auraA} opacity={0.5}>
                  <animate attributeName="opacity" values="0.15;0.65;0.15" dur={`${1.4 + i * 0.15}s`} repeatCount="indefinite" />
                </rect>
              ))}
            </g>
            {/* traveling laser outline trace */}
            <path
              d={CROWN}
              fill="none"
              stroke={`url(#${id}-laserStroke)`}
              strokeWidth={1.6}
              strokeLinejoin="round"
              strokeDasharray={`${CROWN_PERIMETER * 0.14} ${CROWN_PERIMETER}`}
              style={{ filter: `drop-shadow(0 0 4px ${auraA})` }}
            >
              <animate attributeName="stroke-dashoffset" from="0" to={-CROWN_PERIMETER} dur="2.4s" repeatCount="indefinite" />
            </path>
            <path d={CROWN} fill="none" stroke={auraA} strokeOpacity={0.28} strokeWidth={1} />
          </>
        )}

        {variant === "matrix" && (
          <>
            <path d={CROWN} fill="#050a08" stroke="#123a22" strokeWidth={1} />
            <g clipPath={`url(#${id}-clip)`} fontFamily="monospace" fontSize={7} fill="#39ff88">
              {MATRIX_COLUMNS.map((col, i) => (
                <g key={i} opacity={0.85}>
                  <animateTransform attributeName="transform" type="translate" values={`0,-40; 0,110; 0,-40`} dur={`${col.dur}s`} begin={`${col.delay}s`} repeatCount="indefinite" />
                  {col.glyphs.split("").map((g, gi) => (
                    <text key={gi} x={col.x} y={30 + gi * 9} opacity={gi === 0 ? 1 : Math.max(0.15, 1 - gi * 0.11)}>
                      {g}
                    </text>
                  ))}
                </g>
              ))}
            </g>
            <path d={CROWN} fill="none" stroke="#39ff88" strokeOpacity={0.5} strokeWidth={1} />
          </>
        )}

        {variant === "amethyst" && (
          <>
            <path d={CROWN} fill={`url(#${id}-amethyst)`} stroke="#d8b4fe" strokeWidth={1} strokeOpacity={0.45} />

            <g clipPath={`url(#${id}-clip)`}>
              {/* black flame climbing the body */}
              {FLAMES.map((f, i) => (
                <g key={i}>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,14; 0,-10; 0,14"
                    dur={`${f.dur}s`}
                    begin={`${f.delay}s`}
                    repeatCount="indefinite"
                  />
                  <path
                    d="M0,34 C-7,20 -4,12 0,0 C4,12 7,20 0,34 Z"
                    transform={`translate(${f.x} 74) scale(${f.scale})`}
                    fill={`url(#${id}-blackflame)`}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.5;0.95;0.5"
                      dur={`${f.dur * 0.7}s`}
                      begin={`${f.delay}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              ))}

              {/* ascending bands — one per application group */}
              {BANDS.map((b, i) => (
                <line
                  key={i}
                  x1={30 + b.inset}
                  y1={b.y}
                  x2={110 - b.inset}
                  y2={b.y}
                  stroke={auraA}
                  strokeOpacity={b.opacity}
                  strokeWidth={1.1}
                />
              ))}
            </g>

            {/*
              The LED edge. Two dashes of different lengths chasing each other
              round the silhouette — one long and amethyst, one short and white.
              A single dash reads as a loading spinner; two read as current.
            */}
            <path
              d={CROWN}
              fill="none"
              stroke={`url(#${id}-laserStroke)`}
              strokeWidth={1.8}
              strokeLinejoin="round"
              strokeDasharray={`${CROWN_PERIMETER * 0.18} ${CROWN_PERIMETER}`}
              style={{ filter: `drop-shadow(0 0 5px ${auraA})` }}
            >
              <animate attributeName="stroke-dashoffset" from="0" to={-CROWN_PERIMETER} dur="3.2s" repeatCount="indefinite" />
            </path>
            <path
              d={CROWN}
              fill="none"
              stroke="#ffffff"
              strokeWidth={1}
              strokeLinejoin="round"
              strokeDasharray={`${CROWN_PERIMETER * 0.04} ${CROWN_PERIMETER}`}
              style={{ filter: `drop-shadow(0 0 4px ${auraA})` }}
            >
              <animate attributeName="stroke-dashoffset" from="0" to={-CROWN_PERIMETER} dur="1.9s" repeatCount="indefinite" />
            </path>
            <path d={CROWN} fill="none" stroke={auraA} strokeOpacity={0.3} strokeWidth={1} />

            {/*
              The mounted stone, centre front. Distinct from the diamond inside
              the pupil: that one is the eye's, this one is the crown's — set
              into the front band under the tall spire, where a real crown puts
              its principal stone.
            */}
            <g filter={`url(#${id}-soft)`}>
              <path d="M70,58 L77,66 L70,78 L63,66 Z" fill={diamondColor} fillOpacity={0.95} />
              <path d="M63,66 L70,66 L70,78 Z" fill="#ffffff" fillOpacity={0.55} />
              <path d="M70,58 L77,66 L70,66 Z" fill="#ffffff" fillOpacity={0.8} />
              <path
                d="M70,58 L77,66 L70,78 L63,66 Z"
                fill="none"
                stroke="#ffffff"
                strokeOpacity={0.85}
                strokeWidth={0.7}
              >
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
              </path>
            </g>
          </>
        )}

        {/* jewels on the tips — gold on the King's crown, amethyst on the regalia */}
        {TIPS.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={3.4}
            fill={variant === "amethyst" ? "#f3e8ff" : "#fff0b3"}
            stroke={variant === "amethyst" ? auraA : "#ffb703"}
            strokeWidth={0.8}
            filter={`url(#${id}-soft)`}
          >
            <animate attributeName="r" values="3;3.8;3" dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* the eye at the center */}
        <g>
          {/* sclera almond */}
          <path
            d="M50,92 Q70,76 90,92 Q70,108 50,92 Z"
            fill="#fff6fb"
            stroke="#ffd0e2"
            strokeWidth={1}
            filter={`url(#${id}-soft)`}
          />
          {/* iris — tracks the cursor when followCursor is enabled */}
          <g style={{ transition: followCursor ? "transform 90ms linear" : undefined }} transform={`translate(${pupil.dx} ${pupil.dy})`}>
            <circle cx="70" cy="92" r="10.5" fill={`url(#${id}-iris)`} />
            <circle cx="70" cy="92" r="10.5" fill="none" stroke="#ffdff0" strokeOpacity={0.7} strokeWidth={0.8} />
          </g>
          {/* upper lid shadow for depth */}
          <path d="M50,92 Q70,76 90,92" fill="none" stroke="#c98bd0" strokeOpacity={0.6} strokeWidth={1.4} />
        </g>
      </svg>

      {/* diamond embedded in the pupil (real brand CrystalIcon) — tracks with the iris */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "65.7%",
          transform: `translate(calc(-50% + ${(pupil.dx * size) / 140}px), calc(-50% + ${(pupil.dy * size) / 140}px))`,
          transition: followCursor ? "transform 90ms linear" : undefined,
          color: diamondColor,
          lineHeight: 0,
          filter: `drop-shadow(0 0 4px ${diamondColor})`,
          "@keyframes dmdSpark": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.85 } },
          animation: "dmdSpark 2.2s ease-in-out infinite",
        }}
      >
        <CrystalIcon size={Math.round(size * 0.13)} />
      </Box>

      {hero && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: "-14%",
            zIndex: -1,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${auraA}59 0%, ${auraB}24 45%, transparent 70%)`,
            filter: "blur(6px)",
          }}
        />
      )}
    </Box>
  );
}
