"use client";

/** ItemGrid — responsive grid of ItemCards, with empty state. */

import * as React from "react";
import { Box } from "@mui/material";

import { useInventory } from "../store/InventoryProvider";
import { ItemCard } from "./ItemCard";
import { Empty } from "./shared/visuals";

export function ItemGrid() {
  const { visibleItems, state } = useInventory();

  if (visibleItems.length === 0) {
    const msg =
      state.items.length === 0
        ? "Your inventory is empty. Earn items by completing lessons and quests."
        : "No items match your filters.";
    return <Empty label={msg} />;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 1.25,
      }}
    >
      {visibleItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
