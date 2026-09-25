"use client";

/** ItemCard — compact, icon-forward grid cell with a detail tooltip. */

import * as React from "react";
import { Box, IconButton, Tooltip, Typography, alpha } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

import type { InventoryItem } from "../model/types";
import { formatQuantity, RARITY_LABEL } from "../model/types";
import { useInventory } from "../store/InventoryProvider";
import { ItemGlyph, RarityDot } from "./shared/visuals";

function TooltipBody({ item }: { item: InventoryItem }) {
  return (
    <Box sx={{ py: 0.25 }}>
      <Typography variant="caption" sx={{ fontWeight: 800, display: "block" }}>
        {item.name}
        {item.quantity != null && item.quantity > 1 ? `  ×${formatQuantity(item.quantity)}` : ""}
      </Typography>
      <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
        {RARITY_LABEL[item.rarity]}
        {item.equipped ? " · Equipped" : ""}
        {item.unopened ? " · Unopened" : ""}
      </Typography>
      {item.description && (
        <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
          {item.description}
        </Typography>
      )}
    </Box>
  );
}

export function ItemCard({ item }: { item: InventoryItem }) {
  const { state, dispatch } = useInventory();
  const selected = state.selectedId === item.id;

  return (
    <Tooltip title={<TooltipBody item={item} />} arrow enterDelay={400} placement="top">
      <Box
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`${item.name}, ${RARITY_LABEL[item.rarity]}`}
        onClick={() => dispatch({ type: "select", id: selected ? null : item.id })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            dispatch({ type: "select", id: selected ? null : item.id });
          }
        }}
        sx={{
          position: "relative",
          p: 1.25,
          borderRadius: 2,
          cursor: "pointer",
          bgcolor: "background.paper",
          border: (t) =>
            `1px solid ${selected ? t.palette.primary.main : t.palette.divider}`,
          boxShadow: (t) =>
            selected ? `0 0 0 2px ${alpha(t.palette.primary.main, 0.25)}` : "none",
          transition: "border-color .15s, box-shadow .15s",
          "&:hover": { borderColor: "primary.main" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.75,
          textAlign: "center",
        }}
      >
        {/* favorite — subtle, top-right */}
        <IconButton
          size="small"
          aria-label={item.favorite ? "Unfavorite" : "Favorite"}
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "toggle-favorite", id: item.id });
          }}
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            p: 0.25,
            color: item.favorite ? "#e0911f" : "text.disabled",
            opacity: item.favorite ? 1 : 0.5,
            "&:hover": { opacity: 1 },
          }}
        >
          {item.favorite ? (
            <StarRoundedIcon fontSize="small" />
          ) : (
            <StarBorderRoundedIcon fontSize="small" />
          )}
        </IconButton>

        <Box sx={{ position: "relative" }}>
          <ItemGlyph label={item.name} kind={item.kind} accent={item.accent} rarity={item.rarity} size={52} />
          {item.quantity != null && item.quantity > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: -4,
                right: -4,
                px: 0.5,
                minWidth: 18,
                height: 18,
                borderRadius: 1,
                bgcolor: "background.paper",
                border: (t) => `1px solid ${t.palette.divider}`,
                color: "text.secondary",
                fontSize: 11,
                fontWeight: 800,
                display: "grid",
                placeItems: "center",
              }}
            >
              ×{formatQuantity(item.quantity)}
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, maxWidth: "100%" }}>
          <RarityDot rarity={item.rarity} />
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}
            noWrap
          >
            {item.name}
          </Typography>
        </Box>

        {(item.equipped || item.unopened) && (
          <Typography
            variant="caption"
            sx={{ color: item.unopened ? "secondary.main" : "primary.main", fontWeight: 700, mt: -0.25 }}
          >
            {item.unopened ? "Unopened" : "Equipped"}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
}
