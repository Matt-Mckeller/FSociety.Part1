"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger } from "../handParts"

/**
 * ClaspPose — two open hands pressed flat together, fingers up, thumbs
 * crossing at the base; they lean in and the seam glows. Reads as connect /
 * gratitude / center.
 */
export function ClaspPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandClaspL { 0%,100% { transform: rotate(-7deg); } 50% { transform: rotate(-3deg); } }
    @keyframes lensHandClaspR { 0%,100% { transform: rotate(7deg); } 50% { transform: rotate(3deg); } }
    @keyframes lensHandClaspGlow { 0%,100% { opacity: 0.25; } 50% { opacity: 0.85; } }
    .lens-hand-clasp-l { transform-origin: 50px 78px; animation: ${anim(on, "lensHandClaspL", dur)}; }
    .lens-hand-clasp-r { transform-origin: 50px 78px; animation: ${anim(on, "lensHandClaspR", dur)}; }
    .lens-hand-clasp-glow { animation: ${anim(on, "lensHandClaspGlow", dur)}; }
  `
  // One hand drawn as a rounded vertical paddle with three finger seams; the
  // pair mirrors around the center seam.
  const hand = (side: "l" | "r") => {
    const dir = side === "l" ? -1 : 1
    const cx = 50 + dir * 8
    return (
      <g className={`lens-hand-clasp-${side}`}>
        <path
          d={`M${cx} 26
              q${dir * 10} 2 ${dir * 10} 16
              v24
              q0 8 ${-dir * 10} 8
              z`}
          fill={palette.soft}
          stroke={palette.base}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* finger seams */}
        {[34, 41, 48].map((y) => (
          <line
            key={y}
            x1={cx}
            y1={y}
            x2={cx + dir * 8}
            y2={y - 1}
            stroke={palette.base}
            strokeWidth="1.2"
            opacity="0.5"
          />
        ))}
        {/* thumb crossing at the base */}
        <Finger x={cx + dir * 2} y={72} length={12} width={7} angle={dir * 48} stroke={palette.accent} />
      </g>
    )
  }
  return (
    <LensSvg size={size} title={props.title ?? "Clasped hands"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <line
        className="lens-hand-clasp-glow"
        x1="50"
        y1="26"
        x2="50"
        y2="74"
        stroke={palette.glow}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {hand("l")}
      {hand("r")}
    </LensSvg>
  )
}
