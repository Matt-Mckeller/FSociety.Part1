"use client";

import { Box } from "@mui/material";
import { TileContainer } from "@expanse/hud"

import { InventoryTile } from "../inventory";

export default function InventoryPage() {
  return (
    <TileContainer mode="fit">
      <Box sx={{ width: "100%", height: "100%", overflow: "auto", p: 2 }}>
        <InventoryTile />
      </Box>
    </TileContainer>
  );
}
