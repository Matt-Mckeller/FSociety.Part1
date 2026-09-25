"use client";

/**
 * Learning tile — interactive Storybook.
 *
 * Variants (per the Character & Screens plan):
 *   - InProgress: a mid-session loadout with checklist + options.
 *   - Fresh:      an empty session (no input type, no steps).
 *   - Mobile:     narrow width.
 *
 * White background per project Storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import { LearningTile } from "./LearningTile";
import { LEARNING_EMPTY } from "./store/seed-data";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const meta: Meta<typeof LearningTile> = {
  title: "Learning/Learning Tile",
  component: LearningTile,
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj<typeof LearningTile>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", display: "inline-block", width: "100%" }}>{children}</Box>
);

export const InProgress: Story = {
  name: "In Progress",
  render: () => (
    <Frame>
      <LearningTile />
    </Frame>
  ),
};

export const Fresh: Story = {
  render: () => (
    <Frame>
      <LearningTile data={LEARNING_EMPTY} />
    </Frame>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Box sx={{ width: 360, p: 1, bgcolor: "#fff" }}>
      <LearningTile />
    </Box>
  ),
};
