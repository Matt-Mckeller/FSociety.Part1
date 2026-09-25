import { alpha } from "@mui/material/styles"

/**
 * Concentric ring matching TripleLayerPill / Expanse logo strokes.
 *
 * Widths follow the brand 1:2:3 step (inner defining edge, mid blend,
 * outer halo). Alphas match the pill `quiet` / `ghost` recipe:
 * inner ~0.85, center ~0.40, outer ~0.18.
 */
export function brandConcentricRing(
  color: string,
  opts?: { scale?: number },
): { border: string; boxShadow: string } {
  const s = opts?.scale ?? 1
  const inner = Math.max(1, 1 * s)
  const mid = Math.max(1.5, 2 * s)
  const outer = Math.max(2, 3 * s)
  return {
    border: `${inner}px solid ${alpha(color, 0.85)}`,
    boxShadow: [
      `0 0 0 ${mid}px ${alpha(color, 0.4)}`,
      `0 0 0 ${mid + outer}px ${alpha(color, 0.18)}`,
    ].join(", "),
  }
}

/** Scale the 1:2:3 ring so it stays readable from dock chips to hero tiles. */
export function brandRingScale(sizePx: number, referencePx = 48): number {
  return Math.min(1.6, Math.max(0.7, sizePx / referencePx))
}
