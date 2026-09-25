"use client";

/**
 * AnimatedCoinStack — options for evolving Goal 2's coin asset.
 *
 * The shipped version cycles through all 10 brand COIN_PALETTES (including
 * ones like neon/ruby/sapphire). Value goal card chrome is education blue;
 * coin faces stay warm metal. These stories compare baseline against
 * curated / static options:
 *
 *   - Current           Baseline — all 10 palettes, crossfade.
 *   - CuratedAscension   Only bronze → silver → gold → platinum, crossfade.
 *   - CoinFlip           Curated palette set, 3D flip instead of crossfade.
 *   - StaticGold         No cycling — single calm gold coin.
 *   - ShineSweep         Static gold + a periodic light sweep, no recolor.
 *   - ChipCircuitDetail  Before/after on the raw CoinStackIcon svg — the new
 *                        `chipCircuit` prop etches a circuit-trace pattern
 *                        into the top coin's face.
 *   - AllOptions         Every option side-by-side for direct comparison.
 *   - InContext          Each option inside the actual "money → coin →
 *                        crown" row and goal card background it ships in.
 *   - Playground          Full controls.
 */

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Typography, alpha } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { CoinStackIcon, COIN_PALETTES, type CoinStackPaletteName } from "@expanse/brand-core";
import {
  AnimatedCoinStack,
  ALL_PALETTE_NAMES,
  CURATED_VALUE_PALETTES,
  type CoinTransition,
} from "./AnimatedCoinStack";
import { LiquidCrown } from "./LiquidCrown";

const ACCENT = "#7cc4ff";
const ACCENT2 = "#b6ddff";

const DARK_BG = {
  backgrounds: {
    default: "dark",
    values: [{ name: "dark", value: "#07091a" }],
  },
} as const;

const FullFrame = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      minHeight: "100vh",
      width: "100%",
      boxSizing: "border-box",
      p: 6,
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      alignItems: "flex-start",
      background: "linear-gradient(160deg, #07091a 0%, #0b1228 60%, #0a0e22 100%)",
    }}
  >
    {children}
  </Box>
);

function Labeled({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
      {children}
      <Box sx={{ textAlign: "center", maxWidth: 200 }}>
        <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: "rgba(255,255,255,0.92)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {label}
        </Typography>
        {sub && (
          <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", mt: 0.25 }}>{sub}</Typography>
        )}
      </Box>
    </Box>
  );
}

/** Recreates the Goal 2 card background + the "money → coin → crown" row it actually ships in, so a coin option can be judged in situ, not floating alone. */
function GoalCardFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 2.5,
        p: 2.5,
        width: 340,
        overflow: "hidden",
        border: `1px solid ${alpha(ACCENT, 0.3)}`,
        borderLeft: `3px solid ${ACCENT}`,
        background: `linear-gradient(135deg, ${alpha(ACCENT, 0.13)} 0%, rgba(9,11,26,0.94) 55%)`,
        boxShadow: `inset 0 0 40px ${alpha(ACCENT, 0.05)}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.25 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {[0, 1, 2].map((i) => (
            <PaidRoundedIcon
              key={i}
              sx={{ fontSize: 26, color: "#5ad07f", ml: i ? "-9px" : 0, filter: "drop-shadow(0 0 4px #2f8f52)", zIndex: 3 - i }}
            />
          ))}
        </Box>
        <EastRoundedIcon sx={{ fontSize: 18, color: alpha(ACCENT, 0.7) }} />
        {children}
        <EastRoundedIcon sx={{ fontSize: 18, color: alpha(ACCENT, 0.7) }} />
        <LiquidCrown size={58} />
      </Box>
      <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", textAlign: "center", mt: 1 }}>
        Money is just one currency — there are many more forms in this game of life. Hover to see what's really worth valuing.
      </Typography>
    </Box>
  );
}

const meta: Meta<typeof AnimatedCoinStack> = {
  // Nested under BrandCore/Display/Icons so this sits right next to the
  // static CoinStackIconStory in the sidebar (brandcore-display-icons--coin-stack-icon-story).
  title: "BrandCore/Display/Icons/AnimatedCoinStack",
  component: AnimatedCoinStack,
  parameters: { layout: "fullscreen", ...DARK_BG },
  argTypes: {
    transition: { control: "select", options: ["crossfade", "flip", "shine"] },
    size: { control: { type: "range", min: 24, max: 160, step: 2 } },
    interval: { control: { type: "range", min: 400, max: 3000, step: 100 } },
    active: { control: "boolean" },
    chipCircuit: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof AnimatedCoinStack>;

/** Baseline — exactly what's shipped today: all 10 COIN_PALETTES, plain crossfade. Included for direct comparison against the alternatives below. */
export const Current: Story = {
  render: () => (
    <FullFrame>
      <Labeled label="Current" sub="All 10 palettes · crossfade · 1.4s">
        <AnimatedCoinStack size={120} />
      </Labeled>
    </FullFrame>
  ),
};

/** Only the on-theme warm-metal palettes, ordered low → high value, so the color change reads as an intentional "ascension" instead of a random cycle through unrelated hues (neon, ruby, sapphire, ...). */
export const CuratedAscension: Story = {
  render: () => (
    <FullFrame>
      <Labeled label="Curated Ascension" sub="bronze → silver → gold → platinum · crossfade">
        <AnimatedCoinStack size={120} palettes={CURATED_VALUE_PALETTES} />
      </Labeled>
    </FullFrame>
  ),
};

/** Same curated palette set, but the transition is a 3D coin-flip (rotateY) instead of a fade — reads as the coin actually turning over rather than dissolving into a new color. */
export const CoinFlip: Story = {
  render: () => (
    <FullFrame>
      <Labeled label="Coin Flip" sub="bronze → silver → gold → platinum · 3D flip">
        <AnimatedCoinStack size={120} palettes={CURATED_VALUE_PALETTES} transition="flip" interval={1100} />
      </Labeled>
    </FullFrame>
  ),
};

/** No cycling at all — a single calm coin; card chrome matches education blue. */
export const StaticGold: Story = {
  render: () => (
    <FullFrame>
      <Labeled label="Static Gold" sub="No cycling · matches goal accent">
        <AnimatedCoinStack size={120} palettes={["gold"]} active={false} />
      </Labeled>
    </FullFrame>
  ),
};

/** Static gold coin with a periodic diagonal light sweep instead of recoloring — reads as "premium/polished" without ever changing the coin's identity. */
export const ShineSweep: Story = {
  render: () => (
    <FullFrame>
      <Labeled label="Shine Sweep" sub="Static gold · periodic light sweep">
        <AnimatedCoinStack size={120} palettes={["gold"]} transition="shine" />
      </Labeled>
    </FullFrame>
  ),
};

const CIRCUIT_DEMO_PALETTES = ["gold", "platinum", "onyx"] as const;

/** A real on-screen button (not just the Controls panel) that flips `chipCircuit` for every coin at once, so before/after is a single click instead of scrolling between separate stories. */
function ChipCircuitToggleDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <Button
        onClick={() => setOn((v) => !v)}
        variant="contained"
        disableElevation
        sx={{
          borderRadius: 999,
          px: 3,
          py: 1,
          fontWeight: 800,
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0a0c1a",
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
          boxShadow: `0 0 20px ${alpha(ACCENT, 0.45)}`,
          "&:hover": { background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, filter: "brightness(1.1)" },
        }}
      >
        Chip circuit: {on ? "On" : "Off"} — click to toggle
      </Button>
      <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        {CIRCUIT_DEMO_PALETTES.map((name) => (
          <Labeled key={name} label={name} sub={on ? "Circuit-etched face" : "Plain face"}>
            <CoinStackIcon {...COIN_PALETTES[name]} size={160} chipCircuit={on} />
          </Labeled>
        ))}
      </Box>
    </Box>
  );
}

/** Interactive before/after on the static CoinStackIcon itself — click the button to flip `chipCircuit`, which etches a circuit-board pattern (central die, two through-traces, eight bent pinout traces + pads) into the top coin's face, on-theme with Goal 2's "🛰️💻🕐🌲🙂💊🩸🧭🧠🦾 → 🪙" tech-to-currency narrative. */
export const ChipCircuitDetail: Story = {
  render: () => (
    <FullFrame>
      <ChipCircuitToggleDemo />
    </FullFrame>
  ),
};

const OPTIONS: { key: string; label: string; sub: string; palettes: CoinStackPaletteName[]; transition: CoinTransition; active?: boolean }[] = [
  { key: "current", label: "Current", sub: "All 10 · crossfade", palettes: ALL_PALETTE_NAMES, transition: "crossfade" },
  { key: "curated", label: "Curated Ascension", sub: "4 warm metals · crossfade", palettes: CURATED_VALUE_PALETTES, transition: "crossfade" },
  { key: "flip", label: "Coin Flip", sub: "4 warm metals · 3D flip", palettes: CURATED_VALUE_PALETTES, transition: "flip" },
  { key: "static", label: "Static Gold", sub: "No cycling", palettes: ["gold"], transition: "crossfade", active: false },
  { key: "shine", label: "Shine Sweep", sub: "Static + light sweep", palettes: ["gold"], transition: "shine" },
];

/** Every option side-by-side at hero size, for direct comparison. */
export const AllOptions: Story = {
  render: () => (
    <FullFrame>
      {OPTIONS.map((o) => (
        <Labeled key={o.key} label={o.label} sub={o.sub}>
          <AnimatedCoinStack
            size={120}
            palettes={o.palettes}
            transition={o.transition}
            active={o.active ?? true}
            chipCircuit
          />
        </Labeled>
      ))}
    </FullFrame>
  ),
};

/** Every option inside the actual Goal 2 card — the "money → coin → crown" row, at the 46px size it ships at, on the real card background — so the choice can be judged in its real context, not floating on a plain dark page. */
export const InContext: Story = {
  render: () => (
    <FullFrame>
      {OPTIONS.map((o) => (
        <Labeled key={o.key} label={o.label} sub={o.sub}>
          <GoalCardFrame>
            <AnimatedCoinStack
              size={46}
              palettes={o.palettes}
              transition={o.transition}
              active={o.active ?? true}
              chipCircuit
            />
          </GoalCardFrame>
        </Labeled>
      ))}
    </FullFrame>
  ),
};

/** Full controls — try any combination of transition, size, interval, and cycling. */
export const Playground: Story = {
  args: { size: 120, interval: 1400, transition: "crossfade", active: true, chipCircuit: true },
  render: (args) => (
    <FullFrame>
      <AnimatedCoinStack {...args} palettes={CURATED_VALUE_PALETTES} />
    </FullFrame>
  ),
};
