"use client";

/**
 * InventoryTile — the single Inventory surface.
 *
 * Layout: header (title + pending-rewards chip) → category tabs → toolbar →
 * a two-pane body (item grid + slide-in detail panel). The detail panel docks
 * beside the grid on wide screens and below on narrow ones.
 *
 * UI-first per the canonical Inventory plan — example data only.
 */

import * as React from "react";
import { Badge, Box, Chip, Typography, alpha } from "@mui/material";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";

import { InventoryProvider, useInventory } from "./store/InventoryProvider";
import type { InventoryData, ItemCategory } from "./model/types";
import { CategoryTabs } from "./components/CategoryTabs";
import { InventoryToolbar } from "./components/InventoryToolbar";
import { ItemGrid } from "./components/ItemGrid";
import { ItemDetailPanel } from "./components/ItemDetailPanel";

function Header() {
  const { state } = useInventory();
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
        Inventory
      </Typography>
      {state.pendingRewards > 0 && (
        <Badge badgeContent={state.pendingRewards} color="error">
          <Chip
            size="small"
            icon={<RedeemRoundedIcon />}
            label="Rewards"
            color="primary"
            sx={{ fontWeight: 700 }}
          />
        </Badge>
      )}
    </Box>
  );
}

function InventorySurface() {
  const { selected } = useInventory();
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        maxWidth: 980,
      }}
    >
      <Header />
      <CategoryTabs />
      <InventoryToolbar />
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "flex-start",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <ItemGrid />
        </Box>
        {selected && (
          <Box
            sx={{
              width: { xs: "100%", md: 300 },
              flexShrink: 0,
              alignSelf: "stretch",
              borderRadius: 2,
              border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.03),
            }}
          >
            <ItemDetailPanel />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export interface InventoryTileProps {
  data?: InventoryData;
  initialCategory?: ItemCategory | "all";
}

export function InventoryTile({ data, initialCategory }: InventoryTileProps = {}) {
  return (
    <InventoryProvider data={data} initialCategory={initialCategory}>
      <InventorySurface />
    </InventoryProvider>
  );
}

export default InventoryTile;
