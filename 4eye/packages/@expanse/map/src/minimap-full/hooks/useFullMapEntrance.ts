"use client"

import { useMemo } from "react"
import type { SxProps, Theme } from "@mui/material"

export type FullMapEntrance = "none" | "from-top-right" | "fade"

/**
 * Entrance animation `sx` for the `MinimapFullView` shell.
 *
 * - `"from-top-right"` (default): scale 0.92 → 1, opacity 0 → 1, top-right origin, 220ms.
 * - `"fade"`: opacity 0 → 1, 180ms.
 * - `"none"`: no animation.
 *
 * Honors `prefers-reduced-motion: reduce` by falling back from
 * `"from-top-right"` to `"fade"`. Respect for the user setting is checked
 * once at hook setup; that matches the use case (one-shot mount animation).
 */
export function useFullMapEntrance(
  entrance: FullMapEntrance = "from-top-right",
): { sx: SxProps<Theme> } {
  return useMemo(() => {
    const reduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const effective: FullMapEntrance =
      entrance === "none" ? "none" : reduced ? "fade" : entrance

    if (effective === "none") return { sx: {} }

    if (effective === "fade") {
      return {
        sx: {
          "@keyframes mfvFade": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          animation: "mfvFade 180ms ease-out",
        },
      }
    }

    return {
      sx: {
        "@keyframes mfvFromTopRight": {
          from: { opacity: 0, transform: "scale(0.92)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        animation: "mfvFromTopRight 220ms ease-out",
        transformOrigin: "top right",
      },
    }
  }, [entrance])
}
