"use client";

/**
 * TagChip — small uniform pill for taxonomy tags (e.g. Emotion / Purpose
 * / Explore on the MinimapFullView "Next Best Actions" rows).
 *
 * Wraps MUI `Chip` with a fixed footprint and a primary-blue default
 * skin (white label + white icon) so a row of mixed-kind chips reads
 * as one consistent group instead of a rainbow of per-kind tints.
 *
 * Default skin: `bgcolor: 'primary.main'`, `color: '#fff'`, white icon.
 * Override with `color="default" | "outlined"` for muted variants.
 *
 * Sizing system (`size` prop):
 *   - `sm`   — 96px fixed   (single short words: Emotion, Demos)
 *   - `md`   — 128px fixed  (two-word tags: Highlights) [default]
 *   - `lg`   — 168px fixed  (long tags: reserved for extended labels)
 *   - `flex` — grows to fill (flex: 1 1 0; minWidth: 0; ellipsizes)
 *
 * Fixed sizes set width / minWidth / maxWidth so a row of mixed chips
 * lays out as a uniform grid; overflow ellipsizes. Internal padding is
 * generous on both ends so labels never crowd the rounded edges.
 */

import { Chip, type ChipProps } from "@mui/material";
import { cloneElement, isValidElement, type ReactElement } from "react";

export type TagChipColor = "primary" | "default" | "outlined";

export type TagChipSize = "sm" | "md" | "lg" | "flex";

/** Pixel widths for the fixed size presets. */
const TAG_CHIP_WIDTHS: Record<Exclude<TagChipSize, "flex">, number> = {
  sm: 96,
  md: 128,
  lg: 168,
};

export interface TagChipProps
  extends Omit<ChipProps, "color" | "size" | "variant"> {
  /**
   * Color preset.
   * - `primary` (default) — solid primary blue, white text + icon
   * - `default`           — neutral filled, light text
   * - `outlined`          — transparent w/ primary border
   */
  color?: TagChipColor;
  /**
   * Width preset.
   * - `sm` / `md` / `lg` — fixed pixel widths (uniform-row layout)
   * - `flex`             — grows to fill remaining row space
   * @default "md"
   */
  size?: TagChipSize;
  /** Optional override for the chip height in px. @default 28 */
  height?: number;
}

export function TagChip({
  color = "primary",
  size = "md",
  height = 28,
  icon,
  sx,
  ...rest
}: TagChipProps) {
  // Force chip icons to inherit the chip's text color (white on primary).
  const tintedIcon =
    icon && isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ sx?: object }>, {
          sx: {
            color: "inherit !important",
            fontSize: "1rem",
            ...((icon as ReactElement<{ sx?: object }>).props.sx ?? {}),
          },
        })
      : icon;

  const colorSx =
    color === "primary"
      ? {
          bgcolor: "primary.main",
          color: "#fff",
          border: "1px solid",
          borderColor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
        }
      : color === "outlined"
        ? {
            bgcolor: "transparent",
            color: "primary.main",
            border: "1px solid",
            borderColor: "primary.main",
          }
        : {
            bgcolor: "rgba(255,255,255,0.08)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.18)",
          };

  // Width / flex behavior driven by the `size` preset.
  const sizeSx =
    size === "flex"
      ? {
          flex: "1 1 0",
          minWidth: 0,
        }
      : {
          width: TAG_CHIP_WIDTHS[size],
          minWidth: TAG_CHIP_WIDTHS[size],
          maxWidth: TAG_CHIP_WIDTHS[size],
          flex: "0 0 auto",
        };

  return (
    <Chip
      size="small"
      icon={tintedIcon}
      sx={{
        height,
        fontWeight: 600,
        letterSpacing: 0.2,
        // Generous internal padding on both ends so labels never
        // crowd the rounded edges. Icon + label sit left-aligned;
        // overflow ellipsizes within the fixed-width preset.
        "& .MuiChip-label": {
          px: 1.5,                 // 12px — matched on icon side via marginLeft below
          fontSize: "0.75rem",
          flex: 1,
          minWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        "& .MuiChip-icon": {
          ml: 1.25,                // 10px from the chip's left edge
          mr: -0.25,
          flexShrink: 0,
        },
        ...sizeSx,
        ...colorSx,
        ...sx,
      }}
      {...rest}
    />
  );
}

export default TagChip;
