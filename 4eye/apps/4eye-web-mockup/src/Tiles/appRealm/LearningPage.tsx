"use client";

import { Box } from "@mui/material";
import { TileContainer } from "@expanse/hud";

import { LearningTile } from "../learning";

export default function LearningPage() {
  return (
    <TileContainer mode="fit">
      <Box sx={{ width: "100%", height: "100%", overflow: "auto", p: 2 }}>
        <LearningTile />
      </Box>
    </TileContainer>
  );
}
