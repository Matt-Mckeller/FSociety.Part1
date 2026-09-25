"use client";

/**
 * Inventory tile — interactive Storybook.
 *
 * Acceptance variants (per the canonical Inventory plan §8):
 *   - Full:            all categories, dense grid.
 *   - Sparse:          a few items.
 *   - Empty:           empty inventory state.
 *   - SingleCategory:  filtered to one category tab.
 *   - DetailOpen:      detail panel docked beside the grid.
 *   - RewardsPending:  notification chip visible.
 *   - Mobile:          narrow / compact width.
 *
 * White background per project Storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import { InventoryTile } from "./InventoryTile";
import { INVENTORY_SEED, INVENTORY_SPARSE, INVENTORY_EMPTY } from "./store/seed-data";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const meta: Meta = {
  title: "Inventory/Inventory Tile",
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", width: "100%" }}>{children}</Box>
);

export const Full: Story = {
  render: () => (
    <Frame>
      <InventoryTile />
    </Frame>
  ),
};

export const Sparse: Story = {
  render: () => (
    <Frame>
      <InventoryTile data={INVENTORY_SPARSE} />
    </Frame>
  ),
};

export const Empty: Story = {
  render: () => (
    <Frame>
      <InventoryTile data={INVENTORY_EMPTY} />
    </Frame>
  ),
};

export const SingleCategory: Story = {
  name: "Single Category (Collectibles)",
  render: () => (
    <Frame>
      <InventoryTile initialCategory="collectibles" />
    </Frame>
  ),
};

export const RewardsPending: Story = {
  render: () => (
    <Frame>
      <InventoryTile data={{ ...INVENTORY_SEED, pendingRewards: 5 }} />
    </Frame>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Box sx={{ p: 1, bgcolor: "#fff", maxWidth: 400 }}>
      <InventoryTile />
    </Box>
  ),
};
