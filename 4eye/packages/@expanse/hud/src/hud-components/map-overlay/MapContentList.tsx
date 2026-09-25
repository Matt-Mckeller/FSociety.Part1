"use client";

/**
 * MapContentList — dense list of `ContentItem`s with optional left
 * icon, primary label, and secondary blurb.
 *
 * Two consumption patterns:
 *  1. **Action list** (Features / Problems / NBA) — each item navigates
 *     to its `tileId` when clicked. Items without a `tileId` render as
 *     non-interactive (disabled).
 *  2. **Selection list** (Goals) — pass `selectedId` + `onSelect` to
 *     toggle a radio-style selection. The selected item gets a tinted
 *     background and a check icon (override `renderLeading` to fully
 *     control the leading slot).
 */

import type { ReactNode } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import type { ContentItem } from "./types";

interface MapContentListProps {
  items: ContentItem[];
  /** Empty-state caption. @default "Nothing here yet." */
  emptyText?: string;

  // ── Navigate-on-click mode ─────────────────────────────────
  /** Called when the user clicks an item with a `tileId`. */
  onNavigate?: (tileId: string) => void;

  // ── Selection mode ─────────────────────────────────────────
  /** Currently-selected item id. Renders the leading check + tint. */
  selectedId?: string | null;
  /** Called when the user toggles an item's selection. */
  onSelect?: (id: string | null) => void;
  /** Accent color for the selected-item tint + icon. */
  selectionAccentColor?: string;
  /**
   * Custom leading slot per item. When omitted in selection mode,
   * defaults to a check / unchecked radio icon. When omitted in
   * navigate mode, falls back to `item.Icon`.
   */
  renderLeading?: (item: ContentItem, isSelected: boolean) => ReactNode;
}

export function MapContentList({
  items,
  emptyText = "Nothing here yet.",
  onNavigate,
  selectedId,
  onSelect,
  selectionAccentColor,
  renderLeading,
}: MapContentListProps) {
  if (items.length === 0) {
    return (
      <Typography
        variant="caption"
        sx={{ color: "text.disabled", display: "block", py: 1 }}
      >
        {emptyText}
      </Typography>
    );
  }

  const selectionMode = !!onSelect;

  return (
    <List dense disablePadding>
      {items.map((item) => {
        const isSelected = selectionMode && selectedId === item.id;
        const interactive =
          selectionMode || Boolean(item.tileId && onNavigate);

        const leading = renderLeading
          ? renderLeading(item, isSelected)
          : selectionMode
            ? (() => {
                const Cmp = isSelected
                  ? CheckCircleRoundedIcon
                  : RadioButtonUncheckedRoundedIcon;
                return <Cmp fontSize="small" />;
              })()
            : item.Icon
              ? (() => {
                  const Cmp = item.Icon!;
                  return <Cmp fontSize="small" />;
                })()
              : null;

        const handleClick = () => {
          if (selectionMode && onSelect) {
            onSelect(isSelected ? null : item.id);
            return;
          }
          if (item.tileId && onNavigate) onNavigate(item.tileId);
        };

        return (
          <ListItemButton
            key={item.id}
            disabled={!interactive}
            onClick={handleClick}
            sx={{
              borderRadius: 1,
              px: 1,
              py: 0.5,
              alignItems: "flex-start",
              opacity: interactive ? 1 : 0.85,
              "&:hover": { bgcolor: "action.hover" },
              "&.Mui-disabled": { opacity: 0.85 },
              ...(isSelected &&
                selectionAccentColor && {
                  bgcolor: `${selectionAccentColor}1f`,
                  "&:hover": { bgcolor: `${selectionAccentColor}29` },
                }),
            }}
          >
            {leading && (
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  mt: 0.25,
                  color: isSelected
                    ? (selectionAccentColor ?? "primary.main")
                    : selectionMode
                      ? "text.disabled"
                      : (selectionAccentColor ?? "text.secondary"),
                }}
              >
                {leading}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              secondary={item.blurb}
              slotProps={{
                primary: {
                  variant: "body2",
                  sx: {
                    fontWeight: isSelected ? 700 : 600,
                  },
                },
                secondary: {
                  variant: "caption",
                  sx: {
                    color: "text.secondary",
                    display: "block",
                  },
                },
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default MapContentList;
