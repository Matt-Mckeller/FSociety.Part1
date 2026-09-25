"use client";

/**
 * AnimatedCoinStack — the "ExpanseCoinStack" from the goal spec: the real
 * brand-core CoinStackIcon, cycling through a set of COIN_PALETTES color
 * options on a timer.
 *
 * `palettes`/`transition`/`active` default to the original shipped
 * behavior (all 10 palettes, plain crossfade, always cycling) so existing
 * call sites are unaffected. See AnimatedCoinStack.stories.tsx for
 * alternate looks (curated palette set, static, coin-flip, shine sweep).
 */

import * as React from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { CoinStackIcon, COIN_PALETTES, type CoinStackPaletteName } from "@expanse/brand-core";

export const ALL_PALETTE_NAMES = Object.keys(COIN_PALETTES) as CoinStackPaletteName[];

/** Warm-metal subset, ordered low → high value, so the color change reads as an intentional "ascension" instead of a random cycle through every brand palette (including ones like neon/ruby). Card chrome for Value uses education blue; the coin face stays metal. */
export const CURATED_VALUE_PALETTES: CoinStackPaletteName[] = ["bronze", "silver", "gold", "platinum"];

export type CoinTransition = "crossfade" | "flip" | "shine";

export function AnimatedCoinStack({
  size = 52,
  interval = 1400,
  palettes = ALL_PALETTE_NAMES,
  transition = "crossfade",
  active = true,
  chipCircuit = false,
}: {
  size?: number;
  interval?: number;
  /** Named COIN_PALETTES keys to cycle through. */
  palettes?: CoinStackPaletteName[];
  /** How the coin changes between palettes. "shine" ignores cycling and shows a static coin with a periodic light sweep instead. */
  transition?: CoinTransition;
  /** false freezes on the first palette — no cycling (calm resting state). */
  active?: boolean;
  /** Etch a circuit-trace pattern into the top coin's face. */
  chipCircuit?: boolean;
}) {
  const [i, setI] = React.useState(0);
  const shouldCycle = active && transition !== "shine" && palettes.length > 1;

  React.useEffect(() => {
    if (!shouldCycle) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % palettes.length), interval);
    return () => window.clearInterval(id);
  }, [shouldCycle, interval, palettes.length]);

  const palette = COIN_PALETTES[palettes[i % palettes.length]];
  const height = (size * 72) / 90;

  if (transition === "shine") {
    return (
      <Box sx={{ width: size, height, position: "relative", flexShrink: 0, lineHeight: 0, overflow: "hidden" }}>
        <CoinStackIcon {...palette} size={size} chipCircuit={chipCircuit} style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.45))" }} />
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.65) 50%, transparent 58%)",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
          animate={{ x: [-size, size] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
        />
      </Box>
    );
  }

  const flip = transition === "flip";

  return (
    <Box sx={{ width: size, height, position: "relative", flexShrink: 0, lineHeight: 0, perspective: flip ? 400 : undefined }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={i}
          initial={flip ? { opacity: 0, rotateY: -90 } : { opacity: 0, scale: 0.85, rotate: -6 }}
          animate={flip ? { opacity: 1, rotateY: 0 } : { opacity: 1, scale: 1, rotate: 0 }}
          exit={flip ? { opacity: 0, rotateY: 90 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: flip ? 0.5 : 0.45, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.45))",
            transformStyle: flip ? "preserve-3d" : undefined,
          }}
        >
          <CoinStackIcon {...palette} size={size} chipCircuit={chipCircuit} />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
