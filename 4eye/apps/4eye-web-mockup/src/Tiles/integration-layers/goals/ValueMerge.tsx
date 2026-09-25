"use client";

/**
 * ValueMerge — the "Other Things In Life · Learning To Be Human" grid.
 *
 * Revealed only when Goal 2 is expanded (click), so the goal's resting
 * state stays simple (see ValueEssence). Each icon converges into place from
 * a scattered offset — reads as many separate things "merging together"
 * into one coherent idea — and merges back apart when collapsed.
 */

import { Box, Typography, alpha } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { VALUE_SYMBOLS, VALUE_SYMBOLS_ACCENT, ValueIcon } from "./ValueSymbols";

const container: Variants = {
  hidden: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
};

/** Deterministic scattered offset per index (golden-angle spread) so items converge from all directions. */
function scatterOffset(i: number, total: number) {
  const angle = i * 137.508 * (Math.PI / 180);
  const radius = 46 + ((i * 13) % total) * 3.2;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

function itemVariants(i: number, total: number): Variants {
  const { x, y } = scatterOffset(i, total);
  return {
    hidden: { opacity: 0, scale: 0.3, x, y, rotate: (i % 2 === 0 ? 1 : -1) * 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  };
}

export function ValueMerge({ open }: { open: boolean }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: VALUE_SYMBOLS_ACCENT,
          textAlign: "center",
          mb: 1.25,
        }}
      >
        Other Things In Life · Learning To Be Human
      </Typography>
      <Box
        component={motion.div}
        variants={container}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          p: 1.5,
          borderRadius: 2,
          border: `1px dashed ${alpha(VALUE_SYMBOLS_ACCENT, 0.25)}`,
          background: `radial-gradient(ellipse 80% 100% at 50% 50%, ${alpha(VALUE_SYMBOLS_ACCENT, 0.08)} 0%, transparent 75%)`,
        }}
      >
        {VALUE_SYMBOLS.map((s, i) => (
          <Box key={s.key} component={motion.div} variants={itemVariants(i, VALUE_SYMBOLS.length)}>
            <ValueIcon symbol={s} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
