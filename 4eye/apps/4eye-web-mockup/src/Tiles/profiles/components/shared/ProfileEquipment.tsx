"use client";

/**
 * ProfileEquipment — a compact "Equipment" entry on the profile.
 *
 * Reuses the existing Inventory tile's seed data (do NOT rebuild an item
 * model). Shows the currently-equipped Equipment & Items as a summary row and
 * an affordance to open the full Inventory filtered to equipment.
 */

import * as React from "react";
import { Box, Button, Stack, Tooltip, Typography, alpha } from "@mui/material";
import BackpackRoundedIcon from "@mui/icons-material/BackpackRounded";
import NextLink from "next/link";

import { route } from "@4eye/web/lib/routes";
import {
  INVENTORY_SEED,
  type InventoryItem,
} from "@4eye/web/Tiles/inventory";
import { accentHex } from "@4eye/web/Tiles/inventory/components/shared/visuals";

/** Equipped items from the shared inventory seed (Equipment & Items). */
const EQUIPPED: InventoryItem[] = INVENTORY_SEED.items.filter((it) => it.equipped);

export function ProfileEquipment({ onOpen }: { onOpen?: () => void }) {
  const inventoryHref = `${route("/appRealm/inventory")}?category=equipment`;

  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mb: EQUIPPED.length > 0 ? 1 : 0,
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
          <BackpackRoundedIcon sx={{ fontSize: 18, color: "primary.main" }} />
          <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
            Equipment
          </Typography>
        </Stack>
        {onOpen ? (
          <Button
            size="small"
            variant="text"
            onClick={onOpen}
            sx={{ fontWeight: 700, textTransform: "none" }}
          >
            Open Inventory
          </Button>
        ) : (
          <Button
            component={NextLink}
            href={inventoryHref}
            size="small"
            variant="text"
            sx={{ fontWeight: 700, textTransform: "none" }}
          >
            Open Inventory
          </Button>
        )}
      </Stack>

      {EQUIPPED.length > 0 ? (
        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
          {EQUIPPED.map((it) => {
            const c = accentHex(it.accent);
            return (
              <Tooltip key={it.id} title={it.description ?? it.name} arrow>
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 0.5,
                    px: 0.85,
                    height: 24,
                    borderRadius: 1.5,
                    bgcolor: alpha(c, 0.1),
                    border: `1px solid ${alpha(c, 0.3)}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: c,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: "text.primary", whiteSpace: "nowrap" }}
                  >
                    {it.name}
                  </Typography>
                </Stack>
              </Tooltip>
            );
          })}
        </Stack>
      ) : (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Nothing equipped yet.
        </Typography>
      )}
    </Box>
  );
}
