/**
 * PresetSymbol — complex visual symbol for saved presets.
 *
 * Outer ring in `symbolColor` with glow + inner `<Symbol variant="ghost"/>` +
 * top-right count badge showing how many entities are in the recipe.
 *
 * All stories use white background per brand guidelines.
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box, Typography } from "@mui/material";
import { PresetSymbol } from "./PresetSymbol";
import type { SymbolColor, SymbolName } from "@4eye/types";

const meta: Meta<typeof PresetSymbol> = {
  title: "Layout Systems / HUD Components / AiChat / PresetSymbol",
  component: PresetSymbol,
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof PresetSymbol>;

/** Single symbol — default md size */
export const Default: Story = {
  args: {
    symbol: "Star",
    symbolColor: "blue",
    recipeSize: 5,
    size: "md",
    label: "Campaign A",
  },
};

/** All three sizes side-by-side */
export const SizeVariants: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg"] as Array<"sm" | "md" | "lg">;
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, p: 2 }}>
        {sizes.map((size) => (
          <Box key={size} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <PresetSymbol symbol="Star" symbolColor="amber" recipeSize={3} size={size} />
            <Typography variant="caption" sx={{ color: "#666" }}>{size}</Typography>
          </Box>
        ))}
      </Box>
    );
  },
};

/** Color × symbol matrix — 6 symbols × 6 colors */
export const ColorSymbolMatrix: Story = {
  render: () => {
    const symbols: SymbolName[] = ["Star", "Heart", "Diamond", "Pipeline", "Movie", "Preset"];
    const colors: SymbolColor[] = ["blue", "green", "red", "amber", "teal", "purple"];
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        {colors.map((color) => (
          <Box key={color} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="caption" sx={{ color: "#666", minWidth: 56, textAlign: "right" }}>{color}</Typography>
            {symbols.map((sym) => (
              <PresetSymbol key={sym} symbol={sym} symbolColor={color} recipeSize={2} size="sm" />
            ))}
          </Box>
        ))}
      </Box>
    );
  },
};

/** With label + tooltip */
export const WithLabel: Story = {
  render: () => {
    const items: Array<{ sym: SymbolName; color: SymbolColor }> = [
      { sym: "Star" as SymbolName, color: "blue" as SymbolColor },
      { sym: "Pipeline" as SymbolName, color: "teal" as SymbolColor },
      { sym: "Diamond" as SymbolName, color: "purple" as SymbolColor },
      { sym: "Preset" as SymbolName, color: "red" as SymbolColor },
    ];
    return (
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", p: 2 }}>
        {items.map(({ sym, color }, i) => (
          <PresetSymbol
            key={sym}
            symbol={sym}
            symbolColor={color}
            recipeSize={i * 2 + 1}
            size="md"
            label={`Preset ${i + 1}`}
          />
        ))}
      </Box>
    );
  },
};

/** No recipe items — empty badge hidden */
export const EmptyRecipe: Story = {
  args: {
    symbol: "Group",
    symbolColor: "green",
    recipeSize: 0,
    size: "md",
    label: "Empty preset",
  },
};

/** All 6 layout variants side-by-side — use a dark background to see the starry ring glow */
export const LayoutVariants: StoryObj<typeof PresetSymbol> = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0f0f14" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  render: () => {
    const satellites: Array<{ symbol: SymbolName; symbolColor: SymbolColor }> = [
      { symbol: "Group" as SymbolName, symbolColor: "green" as SymbolColor },
      { symbol: "Place" as SymbolName, symbolColor: "red" as SymbolColor },
      { symbol: "AutoStories" as SymbolName, symbolColor: "amber" as SymbolColor },
    ];
    const variants = [
      { variant: "ring", label: "Ring (default)" },
      { variant: "rosette", label: "Rosette" },
      { variant: "stack", label: "Stack" },
      { variant: "orbit", label: "Orbit" },
      { variant: "mosaic", label: "Mosaic" },
      { variant: "monogram", label: "Monogram" },
    ] as const;

    return (
      <Box sx={{ p: 3, display: "flex", gap: 4, flexWrap: "wrap", alignItems: "flex-end" }}>
        {variants.map(({ variant, label }) => (
          <Box
            key={variant}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}
          >
            {/* Large */}
            <PresetSymbol
              symbol="Star"
              symbolColor="blue"
              recipeSize={5}
              size="lg"
              variant={variant}
              satellites={satellites}
              monogramText="CA"
              label={label}
            />
            {/* Medium */}
            <PresetSymbol
              symbol="Star"
              symbolColor="blue"
              recipeSize={5}
              size="md"
              variant={variant}
              satellites={satellites}
              monogramText="CA"
            />
            {/* Small */}
            <PresetSymbol
              symbol="Star"
              symbolColor="blue"
              recipeSize={5}
              size="sm"
              variant={variant}
              satellites={satellites}
              monogramText="CA"
            />
            <Typography variant="caption" sx={{ color: "#999", fontSize: 10, textAlign: "center" }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  },
};

/** Variants with multiple different entity-type satellites */
export const RosetteShowcase: StoryObj<typeof PresetSymbol> = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0f0f14" }],
    },
  },
  render: () => {
    const combos: Array<{
      main: { symbol: SymbolName; symbolColor: SymbolColor };
      sats: Array<{ symbol: SymbolName; symbolColor: SymbolColor }>;
      name: string;
    }> = [
      {
        main: { symbol: "Star" as SymbolName, symbolColor: "blue" as SymbolColor },
        sats: [
          { symbol: "Group" as SymbolName, symbolColor: "green" as SymbolColor },
          { symbol: "AutoStories" as SymbolName, symbolColor: "amber" as SymbolColor },
        ],
        name: "Campaign",
      },
      {
        main: { symbol: "Pipeline" as SymbolName, symbolColor: "teal" as SymbolColor },
        sats: [
          { symbol: "Movie" as SymbolName, symbolColor: "purple" as SymbolColor },
          { symbol: "Image" as SymbolName, symbolColor: "red" as SymbolColor },
        ],
        name: "Media Flow",
      },
      {
        main: { symbol: "Heart" as SymbolName, symbolColor: "red" as SymbolColor },
        sats: [
          { symbol: "Group" as SymbolName, symbolColor: "green" as SymbolColor },
          { symbol: "Place" as SymbolName, symbolColor: "blue" as SymbolColor },
        ],
        name: "Community",
      },
    ];
    return (
      <Box sx={{ p: 3, display: "flex", gap: 4, flexWrap: "wrap" }}>
        {combos.map(({ main, sats, name }) => (
          <Box key={name} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <PresetSymbol
              symbol={main.symbol}
              symbolColor={main.symbolColor}
              size="lg"
              variant="rosette"
              satellites={sats}
              recipeSize={sats.length + 1}
              label={name}
            />
            <Typography variant="caption" sx={{ color: "#aaa" }}>{name}</Typography>
          </Box>
        ))}
      </Box>
    );
  },
};
