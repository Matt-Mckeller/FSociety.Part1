"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger } from "../handParts"

/**
 * FramePose — thumbs and fingers framing the subject like a director's
 * viewfinder. Reads as visualize / perceive.
 */
export function FramePose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandFrameTL { 0%,100% { transform: translate(0,0); } 50% { transform: translate(2px,2px); } }
    @keyframes lensHandFrameBR { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-2px,-2px); } }
    @keyframes lensHandFrameDot { 0%,100% { r: 4px; opacity: 0.5; } 50% { r: 6px; opacity: 1; } }
    .lens-hand-frame-tl { animation: ${anim(on, "lensHandFrameTL", dur)}; }
    .lens-hand-frame-br { animation: ${anim(on, "lensHandFrameBR", dur)}; }
    .lens-hand-frame-dot { animation: ${anim(on, "lensHandFrameDot", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Framing hands"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {/* the framed subject */}
      <circle className="lens-hand-frame-dot" cx="50" cy="50" r="4" fill={palette.glow} />
      {/* top-left corner: finger across, thumb down */}
      <g className="lens-hand-frame-tl">
        <Finger x={30} y={30} length={24} angle={90} stroke={palette.base} />
        <Finger x={30} y={54} length={24} stroke={palette.accent} />
      </g>
      {/* bottom-right corner: mirrored */}
      <g className="lens-hand-frame-br">
        <Finger x={70} y={70} length={24} angle={-90} stroke={palette.base} />
        <Finger x={70} y={46} length={24} angle={180} stroke={palette.accent} />
      </g>
    </LensSvg>
  )
}
