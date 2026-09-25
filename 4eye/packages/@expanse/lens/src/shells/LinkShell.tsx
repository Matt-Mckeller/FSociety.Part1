"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * LinkShell — three nodes connected by edges; a pulse travels the edges
 * and the nodes light up in sequence. Reads as connect / relate / sync.
 */
export function LinkShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const nodes = [
    { cx: 28, cy: 34 },
    { cx: 74, cy: 30 },
    { cx: 52, cy: 74 },
  ]
  const css = `
    @keyframes lensLinkFlow { 0% { stroke-dashoffset: 60; } 100% { stroke-dashoffset: 0; } }
    @keyframes lensLinkBlink { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.25); } }
    .lens-link-edge { stroke-dasharray: 6 8; animation: ${anim(on, "lensLinkFlow", dur, "linear")}; }
    .lens-link-node { transform-box: fill-box; transform-origin: center; animation: ${anim(on, "lensLinkBlink", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Link lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-link-edge" stroke={palette.base} strokeWidth="2.5" fill="none" strokeLinecap="round">
        <line x1="28" y1="34" x2="74" y2="30" />
        <line x1="74" y1="30" x2="52" y2="74" />
        <line x1="52" y1="74" x2="28" y2="34" />
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          className="lens-link-node"
          cx={n.cx}
          cy={n.cy}
          r="8"
          fill={i % 2 === 0 ? palette.base : palette.accent}
          style={{ animationDelay: `${i * dur * 0.33}s` }}
        />
      ))}
    </LensSvg>
  )
}
