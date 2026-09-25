"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * ScannerShell — a bright bar sweeps top-to-bottom across a framed lens,
 * leaving a soft trail. Reads as analyze / read / detect.
 */
export function ScannerShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensScanSweep {
      0%   { transform: translateY(-30px); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: translateY(30px); opacity: 0; }
    }
    @keyframes lensScanGrid { 0%,100% { opacity: 0.25; } 50% { opacity: 0.5; } }
    .lens-scan-bar { animation: ${anim(on, "lensScanSweep", dur, "ease-in-out")}; }
    .lens-scan-grid { animation: ${anim(on, "lensScanGrid", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Scanner lens"} className={props.className} css={css}>
      <rect x="16" y="16" width="68" height="68" rx="12" fill={palette.soft} stroke={palette.base} strokeWidth="2.5" />
      <g className="lens-scan-grid" stroke={palette.accent} strokeWidth="1">
        <line x1="34" y1="20" x2="34" y2="80" />
        <line x1="50" y1="20" x2="50" y2="80" />
        <line x1="66" y1="20" x2="66" y2="80" />
      </g>
      <g className="lens-scan-bar">
        <rect x="18" y="48" width="64" height="4" rx="2" fill={palette.base} />
        <rect x="18" y="52" width="64" height="10" rx="3" fill={palette.glow} opacity="0.35" />
      </g>
      <circle cx="50" cy="50" r="44" fill="none" stroke={palette.accent} strokeWidth="0.5" opacity="0.4" />
    </LensSvg>
  )
}
