"use client";

/**
 * Engagement lens — Profile Core rail explorer for mastery vs attention.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import { EngagementLens } from "./EngagementLens";

const meta: Meta = {
  title: "Profiles/Engagement Lens",
  parameters: {
    layout: "padded",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Box sx={{ p: 2, bgcolor: "#fff", maxWidth: 920 }}>
      <EngagementLens accent="#35c99b" />
    </Box>
  ),
};
