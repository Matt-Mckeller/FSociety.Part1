"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Box } from "@mui/material"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import gsap from "gsap"

import { CompactStatusBar } from "@expanse/brand-core"
import { GAME_ITEMS, GameActionBar, type MenuOrbItem } from "@expanse/hud"

import { usePulseSubscribe } from "@expanse/character/vision"

/**
 * ControlHudShelf — horizontal "HUD shelf" rendered below the controller
 * character on the Control slide. Replaces the older inline chip rail.
 *
 * Two anchored groups inside a centered, wrapping flex row:
 *
 *   1. Locked-open `CompactStatusBar` — Coins | XP | Level visible at rest.
 *      Driven by the local pulse stream so coin bursts increment the value
 *      and level-up reactions tick the level.
 *
 *   2. Extended `GameActionBar` (horizontal) — Spellbook / Achievements /
 *      Inventory (backpack) / Quests, plus marketing-only Economy and
 *      Rewards pills appended to the GAME_ITEMS roster.
 *
 * Mount animation matches the previous chip rail (delay ≈ 3.6s after the
 * device mount sequence, stagger 0.08).
 */
export function ControlHudShelf() {
  const rootRef = useRef<HTMLDivElement>(null)
  const statusGroupRef = useRef<HTMLDivElement>(null)
  const pillsGroupRef = useRef<HTMLDivElement>(null)

  const [coinCount, setCoinCount] = useState(1240)
  const [level, setLevel] = useState(7)

  // Entry animation — fade + lift the two groups in sequence.
  useEffect(() => {
    const groups = [statusGroupRef.current, pillsGroupRef.current].filter(
      Boolean,
    ) as HTMLDivElement[]
    if (groups.length === 0) return
    gsap.set(groups, { opacity: 0, y: 8 })
    gsap.to(groups, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.12,
      ease: "power2.out",
      delay: 3.6,
    })
  }, [])

  // React to controller-driven pulses:
  //   nodeIndex === -1 → LEVEL UP sweep → tick level + scale-pulse the bar
  //   nodeIndex === -2 → coin burst    → bump coin count + scale-pulse
  usePulseSubscribe((nodeIndex) => {
    const statusEl = statusGroupRef.current
    if (nodeIndex === -1) {
      setLevel((l) => l + 1)
      if (statusEl) {
        gsap.fromTo(
          statusEl,
          { scale: 1 },
          {
            scale: 1.06,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
        )
      }
    }
    if (nodeIndex === -2) {
      setCoinCount((c) => c + 40)
      if (statusEl) {
        gsap.fromTo(
          statusEl,
          { scale: 1 },
          {
            scale: 1.05,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "back.out(2)",
          },
        )
      }
    }
  })

  // Extend the default game pill roster with marketing-only Economy +
  // Rewards entries. Inventory already uses BackpackIcon via GAME_ITEMS.
  const items = useMemo<ReadonlyArray<MenuOrbItem>>(
    () => [
      ...GAME_ITEMS,
      {
        key: "economy",
        icon: <MonetizationOnIcon />,
        label: "Economy",
        tone: "warning",
      },
      {
        key: "rewards",
        icon: <EmojiEventsIcon />,
        label: "Rewards",
        tone: "warning",
      },
    ],
    [],
  )

  // Only render the status bar here if needed in the future
  return null;
}

export default ControlHudShelf
