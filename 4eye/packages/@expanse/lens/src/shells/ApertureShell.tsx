"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * ApertureShell — six iris blades that breathe open and closed around a
 * bright pupil. Reads as perception / focusing the eye.
 */
export function ApertureShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const blades = Array.from({ length: 6 })
  const css = `
    @keyframes lensApertureBreathe {
      0%,100% { transform: scale(1); }
      50%     { transform: scale(0.62); }
    }
    @keyframes lensAperturePupil {
      0%,100% { r: 9px; opacity: 1; }
      50%     { r: 15px; opacity: 0.85; }
    }
    .lens-ap-iris { transform-origin: 50px 50px; animation: ${anim(on, "lensApertureBreathe", dur)}; }
    .lens-ap-pupil { animation: ${anim(on, "lensAperturePupil", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Aperture lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-ap-iris">
        {blades.map((_, i) => (
          <path
            key={i}
            d="M50 50 L50 12 A38 38 0 0 1 82 32 Z"
            fill={i % 2 === 0 ? palette.base : palette.accent}
            opacity={0.85}
            transform={`rotate(${i * 60} 50 50)`}
          />
        ))}
      </g>
      <circle className="lens-ap-pupil" cx="50" cy="50" r="11" fill="#0b1020" />
      <circle cx="46" cy="46" r="3.5" fill={palette.glow} opacity={0.9} />
    </LensSvg>
  )
}
