"use client"

/**
 * LiquidMorphFilter — SVG turbulence + displacement filter that warps
 * the source graphic as if it were rising through a liquid surface.
 *
 * Mount this once near the top of the page (inside any inert SVG
 * `<defs>`) and reference it via `style={{ filter: "url(#<id>)" }}`
 * on the element you want warped. Tween `scaleVar` (the
 * feDisplacementMap's `scale` attribute) from a high value down to 0
 * via GSAP for a "calming" emerge.
 *
 * Reduced-motion callers should skip mounting / referencing this
 * filter altogether — there's no animation embedded here, but the
 * static distortion can still be jarring.
 */

import { forwardRef, useId } from "react"

export interface LiquidMorphFilterProps {
  /** Filter id used in CSS `filter: url(#id)`. Required. */
  id: string
  /** Initial displacement scale (px). 0 = no distortion. */
  scale?: number
  /** Turbulence base frequency. Higher = finer, choppier ripples. */
  baseFrequency?: number
  /** Number of turbulence octaves. */
  numOctaves?: number
  /** Optional seed so successive mounts produce different ripples. */
  seed?: number
}

/**
 * Stand-alone SVG host wrapping a single `<filter>`. Renders an
 * absolutely-positioned 0x0 SVG so it doesn't take layout space.
 *
 * The forwarded ref points at the inner `<feDisplacementMap>` so
 * callers can GSAP-tween its `scale` attribute (decay 18 → 0 to
 * "calm" the surface as the subject clears the liquid).
 */
export const LiquidMorphFilter = forwardRef<
  SVGFEDisplacementMapElement,
  LiquidMorphFilterProps
>(function LiquidMorphFilter(
  {
    id,
    scale = 18,
    baseFrequency = 0.025,
    numOctaves = 2,
    seed = 7,
  },
  ref,
) {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id={id}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            ref={ref}
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
})

/** Stable filter id for a given hint within one component instance. */
export function useLiquidMorphFilterId(idHint = "liquid-morph"): string {
  const auto = useId()
  return `${idHint}-${auto.replace(/[:]/g, "")}`;
}
