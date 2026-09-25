"use client";

/** CategoryTabs — All + four category tabs with item counts. */

import * as React from "react";
import { Badge, Box, Tab, Tabs } from "@mui/material";

import { useInventory } from "../store/InventoryProvider";
import { CATEGORY_META, ITEM_CATEGORIES } from "../model/types";
import type { ItemCategory } from "../model/types";

export function CategoryTabs() {
  const { state, dispatch } = useInventory();

  const count = (cat: ItemCategory | "all") =>
    cat === "all"
      ? state.items.length
      : state.items.filter((it) => it.category === cat).length;

  return (
    <Tabs
      value={state.category}
      onChange={(_, value) => dispatch({ type: "set-category", category: value })}
      variant="scrollable"
      scrollButtons="auto"
      textColor="primary"
      indicatorColor="primary"
      sx={{ minHeight: 40, "& .MuiTab-root": { minHeight: 40, textTransform: "none" } }}
    >
      <Tab
        value="all"
        label={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            All
            <CountBadge n={count("all")} />
          </Box>
        }
      />
      {ITEM_CATEGORIES.map((cat) => (
        <Tab
          key={cat}
          value={cat}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {CATEGORY_META[cat].label}
              <CountBadge n={count(cat)} />
            </Box>
          }
        />
      ))}
    </Tabs>
  );
}

function CountBadge({ n }: { n: number }) {
  return (
    <Badge
      badgeContent={n}
      color="primary"
      showZero
      sx={{ "& .MuiBadge-badge": { position: "static", transform: "none", fontWeight: 700 } }}
    />
  );
}
