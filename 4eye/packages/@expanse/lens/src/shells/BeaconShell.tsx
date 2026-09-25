"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * BeaconShell — keeps the scanner's framed-grid family look, but the sweep
 * is a rotating radar line and a beacon dot pings where the signal sits.
 * Reads as find / locate / detect.
 */
export function BeaconShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  // The beacon sits at 45° (up-right); the sweep starts pointing up, so it
  // passes the beacon at 1/8 of a revolution — the ping is delayed to match.
  const css = `
    @keyframes lensBeaconSweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes lensBeaconPing {
      0%, 10%  { opacity: 0; transform: scale(0.4); }
      16%      { opacity: 0.9; }
      55%      { opacity: 0; transform: scale(1.8); }
      100%     { opacity: 0; transform: scale(1.8); }
    }
    @keyframes lensBeaconDot { 0%, 10%, 100% { opacity: 0.5; } 16% { opacity: 1; } 60% { opacity: 0.5; } }
    @keyframes lensBeaconGrid { 0%,100% { opacity: 0.2; } 50% { opacity: 0.4; } }
    .lens-beacon-sweep { transform-origin: 50px 50px; animation: ${anim(on, "lensBeaconSweep", dur * 2, "linear")}; }
    .lens-beacon-ping { transform-origin: 66px 34px; animation: ${anim(on, "lensBeaconPing", dur * 2, "ease-out")}; }
    .lens-beacon-dot { animation: ${anim(on, "lensBeaconDot", dur * 2, "ease-out")}; }
    .lens-beacon-grid { animation: ${anim(on, "lensBeaconGrid", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Beacon lens"} className={props.className} css={css}>
      <rect x="16" y="16" width="68" height="68" rx="12" fill={palette.soft} stroke={palette.base} strokeWidth="2.5" />
      <g className="lens-beacon-grid" stroke={palette.accent} strokeWidth="1">
        <line x1="34" y1="20" x2="34" y2="80" />
        <line x1="50" y1="20" x2="50" y2="80" />
        <line x1="66" y1="20" x2="66" y2="80" />
      </g>
      {/* rotating radar sweep: line + trailing wedge */}
      <g className="lens-beacon-sweep">
        <path d="M50 50 L50 20 A30 30 0 0 0 35 24 Z" fill={palette.glow} opacity="0.25" />
        <line x1="50" y1="50" x2="50" y2="20" stroke={palette.base} strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* the found signal — a pinging beacon */}
      <circle className="lens-beacon-ping" cx="66" cy="34" r="7" fill="none" stroke={palette.accent} strokeWidth="2" />
      <circle className="lens-beacon-dot" cx="66" cy="34" r="3.5" fill={palette.accent} />
      <circle cx="50" cy="50" r="2.5" fill={palette.base} />
    </LensSvg>
  )
}
