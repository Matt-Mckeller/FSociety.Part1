"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, Palm } from "../handParts"

/**
 * ThumbsUpPose — a sideways fist with the thumb raised, tilting up with
 * approval. Reads as improve / approve / progress.
 */
export function ThumbsUpPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandThumb { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(2deg); } }
    .lens-hand-thumb { transform-origin: 50px 62px; animation: ${anim(on, "lensHandThumb", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Thumbs up"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-hand-thumb">
        <Palm cx={52} cy={62} width={32} height={26} stroke={palette.base} />
        {/* folded finger lines */}
        {[56, 62, 68].map((y) => (
          <line key={y} x1="42" y1={y} x2="64" y2={y} stroke={palette.base} strokeWidth="2" opacity="0.5" />
        ))}
        <Finger x={39} y={50} length={20} angle={-12} stroke={palette.accent} />
      </g>
    </LensSvg>
  )
}
