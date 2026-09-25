"use client";

/**
 * Profiles tile — interactive Storybook.
 *
 * Acceptance variants (per the canonical Profiles plan):
 *   - AllViews:      the full tile; every sub-view reachable via the switcher.
 *   - One story per sub-view (Users … Parent) opening directly on that view.
 *   - NewProfile:    sparse/empty profile to exercise empty states.
 *   - PublicDisplay: real names revealed.
 *   - Mobile:        narrow width.
 *
 * White background per project Storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import { ProfilesTile } from "./ProfilesTile";
import { PROFILES_SEED, PROFILES_COMMUNICATION } from "./store/seed-data";
import type { ProfileView } from "./model/types";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const meta: Meta = {
  title: "Profiles/Profiles Tile",
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", display: "inline-block", width: "100%" }}>{children}</Box>
);

const onView = (view: ProfileView): Story => ({
  render: () => (
    <Frame>
      <ProfilesTile initialView={view} />
    </Frame>
  ),
});

export const AllViews: Story = {
  name: "All Views (switcher)",
  render: () => (
    <Frame>
      <ProfilesTile />
    </Frame>
  ),
};

export const Users = onView("users");
export const Healing = onView("healing");
export const Psychology = onView("psychology");
export const Communication = onView("communication");
export const Student = onView("student");
export const Teacher = onView("teacher");
export const Classroom = onView("classroom");
export const Professional = onView("professional");
export const Parent = onView("parent");

export const NewProfile: Story = {
  name: "New / Empty Profile",
  render: () => (
    <Frame>
      <ProfilesTile
        data={{ ...PROFILES_SEED, activeProfileId: "PROFILE_NEWCOMER" }}
        initialView="users"
      />
    </Frame>
  ),
};

export const CommunicationPersona: Story = {
  name: "Communication (Emily persona)",
  render: () => (
    <Frame>
      <ProfilesTile data={PROFILES_COMMUNICATION} initialView="communication" />
    </Frame>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Box sx={{ p: 1, bgcolor: "#fff", maxWidth: 380 }}>
      <ProfilesTile />
    </Box>
  ),
};

export const HighestValueAndRoles: Story = {
  name: "Highest-Value Data + Roles + Equipment",
  render: () => (
    <Frame>
      <ProfilesTile initialView="users" />
    </Frame>
  ),
};
