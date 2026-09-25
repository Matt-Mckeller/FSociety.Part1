import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

import {
  SaturnRings,
  StarWarsRings,
  MatrixSearchRings,
  PacmanChomperRings,
  CometNavigatorRings,
} from "@expanse/character/explorer";

// ─────────────────────────────────────────────────────────────────────────────
// Shared demo shell — centered 140×100 stage with compass icon
// ─────────────────────────────────────────────────────────────────────────────
function RingDemo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack spacing={1.5} sx={{
      alignItems: "center"
    }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 140,
          height: 100,
        }}
      >
        {children}
        <ExploreIcon
          sx={{ fontSize: 20, color: "#6366f1", opacity: 0.8, position: "relative", zIndex: 2 }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "0.58rem",
          fontWeight: 700,
          color: "#94a3b8",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: "HUD/Map/OrbitalRingVariants",
  parameters: {
    layout: "centered",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
};
export default meta;
type Story = StoryObj;

// ─────────────────────────────────────────────────────────────────────────────
// Individual stories — sourced from characterProfile/rings (single source of truth)
// ─────────────────────────────────────────────────────────────────────────────

export const OrbitalSaturn: Story = {
  name: "Orbital Saturn",
  render: () => <RingDemo label="Orbital Saturn"><SaturnRings /></RingDemo>,
};

export const StarWarsBurst: Story = {
  name: "Star Wars Burst",
  render: () => <RingDemo label="Star Wars Burst"><StarWarsRings /></RingDemo>,
};

export const MatrixSearch: Story = {
  name: "Matrix Search",
  render: () => <RingDemo label="Matrix Search"><MatrixSearchRings /></RingDemo>,
};

export const PacmanChomper: Story = {
  name: "Pacman Chomper",
  render: () => <RingDemo label="Pacman Chomper"><PacmanChomperRings /></RingDemo>,
};

export const CometNavigator: Story = {
  name: "Comet Navigator",
  render: () => <RingDemo label="Comet Navigator"><CometNavigatorRings /></RingDemo>,
};

// ─────────────────────────────────────────────────────────────────────────────
// Side-by-side gallery
// ─────────────────────────────────────────────────────────────────────────────
export const Gallery: Story = {
  name: "Gallery — All Variants",
  render: () => (
    <Box sx={{ p: 5 }}>
      <Typography
        sx={{
          mb: 4,
          fontSize: "0.58rem",
          fontWeight: 700,
          color: "#94a3b8",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Orbital Ring Variants
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
        <RingDemo label="Orbital Saturn">  <SaturnRings /></RingDemo>
        <RingDemo label="Star Wars Burst"> <StarWarsRings /></RingDemo>
        <RingDemo label="Matrix Search">   <MatrixSearchRings /></RingDemo>
        <RingDemo label="Pacman Chomper">  <PacmanChomperRings /></RingDemo>
        <RingDemo label="Comet Navigator"> <CometNavigatorRings /></RingDemo>
      </Stack>
    </Box>
  ),
};
