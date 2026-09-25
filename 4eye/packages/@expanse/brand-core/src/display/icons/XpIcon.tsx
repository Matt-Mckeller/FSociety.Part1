"use client"

/**
 * XpIcon — brand-mark style XP indicator.
 *
 * Filled circle bisected by a horizontal slot ("circle with a line through
 * the middle"). Visually echoes the 4eye profile mark, distinguishing the
 * XP datapoint from the round CoinIcon and any level/rank glyphs.
 *
 * API matches `CoinIcon`: pass a `color` (the bar's resolved `contentColor`).
 * Uses React `useId` for the mask id so multiple instances on a page don't
 * collide.
 */

import { useId } from "react"

export const XpIcon = ({ color }: { color: string }) => {
  const rawId = useId().replace(/:/g, "")
  const maskId = `xp-icon-mask-${rawId}`

  return (
    <svg
      height="100%"
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {/* white reveals; black hides */}
          <rect width="24" height="24" fill="white" />
          <rect x="3" y="10.85" width="18" height="2.3" fill="black" />
        </mask>
      </defs>
      <circle cx="12" cy="12" r="8.5" fill={color} mask={`url(#${maskId})`} />
    </svg>
  )
}
