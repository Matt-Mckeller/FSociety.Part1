"use client";

/**
 * LiquidCrown — Command King crown variant gallery.
 *
 * Stories:
 *   - AllVariants     Liquid / Laser / Matrix / Amethyst side-by-side, hero size.
 *   - Playground       Controls for variant, size, hero glow, and cursor-tracking eye.
 *   - EyeFollowsCursor Move your mouse over each crown — the iris + diamond track it.
 *   - SizeScale        The same crown (liquid) from small (track end) to hero.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";
import { LiquidCrown, type CrownVariant } from "./LiquidCrown";

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
      <Box sx={{ textAlign: "center" }}>
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

const meta: Meta<typeof LiquidCrown> = {
  title: "Integration Layers/Goals/LiquidCrown",
  component: LiquidCrown,
  parameters: { layout: "fullscreen", ...DARK_BG },
  argTypes: {
    variant: { control: "select", options: ["liquid", "laser", "matrix", "amethyst"] },
    size: { control: { type: "range", min: 40, max: 260, step: 4 } },
  },
};
export default meta;
type Story = StoryObj<typeof LiquidCrown>;

const VARIANTS: { key: CrownVariant; label: string; sub: string }[] = [
  { key: "liquid", label: "Liquid", sub: "Red liquid · purple flame · flowing water" },
  { key: "laser", label: "Laser", sub: "Glass body · traveling cyan/magenta trace · tip beams" },
  { key: "matrix", label: "Matrix", sub: "Near-black body · falling green code rain" },
  {
    key: "amethyst",
    label: "Amethyst",
    sub: "Amethyst into black · black flame · LED edge · mounted stone",
  },
];

/** All four crown variants side-by-side at hero size for direct comparison. */
export const AllVariants: Story = {
  render: () => (
    <FullFrame>
      {VARIANTS.map((v) => (
        <Labeled key={v.key} label={v.label} sub={v.sub}>
          <LiquidCrown variant={v.key} size={180} hero />
        </Labeled>
      ))}
    </FullFrame>
  ),
};

/** Move your mouse over each crown — the iris and embedded diamond track the cursor. */
export const EyeFollowsCursor: Story = {
  render: () => (
    <FullFrame>
      {VARIANTS.map((v) => (
        <Labeled key={v.key} label={v.label} sub="Hover to move the eye">
          <LiquidCrown variant={v.key} size={180} hero followCursor />
        </Labeled>
      ))}
    </FullFrame>
  ),
};

/** The same (liquid) crown at the sizes actually used on the Human layer. */
export const SizeScale: Story = {
  render: () => (
    <FullFrame>
      <Labeled label="58px" sub="End of the Goal 2 value flow">
        <LiquidCrown size={58} />
      </Labeled>
      <Labeled label="132px" sub="Goal 3 hero (current)">
        <LiquidCrown size={132} hero />
      </Labeled>
      <Labeled label="220px" sub="Larger hero option">
        <LiquidCrown size={220} hero />
      </Labeled>
    </FullFrame>
  ),
};

/** Full controls — try any combination of variant, size, hero glow, and cursor-tracking. */
export const Playground: Story = {
  args: { variant: "liquid", size: 180, hero: true, followCursor: false },
  render: (args) => (
    <FullFrame>
      <LiquidCrown {...args} />
    </FullFrame>
  ),
};
