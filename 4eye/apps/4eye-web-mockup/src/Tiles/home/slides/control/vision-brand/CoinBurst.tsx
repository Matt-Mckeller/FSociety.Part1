"use client"

import { Box } from "@mui/material"
import { CoinIcon, COIN_PALETTES, type CoinStackPaletteName } from "@expanse/brand-core"
import { forwardRef } from "react"

/**
 * CoinBurst — 5 brand coins that float upward and fan out on the LEVEL UP
 * reaction. Each coin uses a different palette from `COIN_PALETTES`.
 *
 * This is the brand-coupled visual injected into the character package's
 * vision OverlayLayer via the `coinBurstSlot` prop. It lives in the app
 * (not in `@expanse/character`) because it depends on `@expanse/brand-core`,
 * which itself depends on `@expanse/character` — keeping it here avoids a
 * circular package dependency.
 *
 * Animation is driven entirely by GSAP (per-sprite tweens with stagger,
 * lateral drift, and spin) via `[data-coin]` selectors in useControlAnimation.
 * The container is shown/hidden by GSAP on `refs.coinBurstRef`; coins start
 * at `opacity: 0` and are reset before each burst so repeat triggers work.
 */

type CoinSpec = {
  left: string
  size: number
  palette: CoinStackPaletteName
  /** Optional centered label, e.g. "+1" hero coin */
  text?: string
}

const COINS: CoinSpec[] = [
  { left: "10%", size: 18, palette: "bronze" },
  { left: "30%", size: 16, palette: "silver" },
  { left: "50%", size: 24, palette: "gold" },
  { left: "70%", size: 16, palette: "onyx" },
  { left: "85%", size: 18, palette: "platinum" },
]

export const CoinBurst = forwardRef<HTMLDivElement, Record<string, never>>(
  function CoinBurst(_props, ref) {
    return (
      <Box
        ref={ref}
        aria-hidden
        sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {COINS.map((c, i) => {
          const palette = COIN_PALETTES[c.palette]
          return (
            <Box
              key={i}
              // eslint-disable-next-line react/no-unknown-property
              data-coin="true"
              sx={{
                position: "absolute",
                bottom: "30%",
                left: c.left,
                width: c.size,
                height: c.size,
                lineHeight: 0,
                opacity: 0,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
              }}
            >
              <CoinIcon
                size={c.size}
                color={palette.color}
                borderColor={palette.shadowColor}
                showArcs
                text={c.text}
                textColor={c.palette === "onyx" ? "#fff" : "#1a1a1a"}
                textSize={Math.round(c.size * 0.5)}
                textWeight={700}
              />
            </Box>
          )
        })}
      </Box>
    )
  },
)

export default CoinBurst
