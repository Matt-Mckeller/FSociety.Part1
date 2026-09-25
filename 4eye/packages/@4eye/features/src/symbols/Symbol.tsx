"use client";

import React from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DiamondIcon from "@mui/icons-material/Diamond";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import BoltIcon from "@mui/icons-material/Bolt";
import WavesIcon from "@mui/icons-material/Waves";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PlaceIcon from "@mui/icons-material/Place";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MovieIcon from "@mui/icons-material/Movie";
import ImageIcon from "@mui/icons-material/Image";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  COLOR_MAP,
  type SymbolColor,
  type SymbolName,
} from "@4eye/types";

/**
 * Static map: SymbolName → MUI icon component.
 * This is the entire visual symbol registry. To add a symbol:
 *   1) Add the name to `SymbolName` in @4eye/types/symbols
 *   2) Add an entry here.
 */
const SYMBOL_ICONS: Record<SymbolName, React.ComponentType<{ sx?: SxProps<Theme> }>> = {
  Star: StarIcon,
  Circle: CircleIcon,
  Square: SquareIcon,
  Triangle: ChangeHistoryIcon,
  Heart: FavoriteIcon,
  Diamond: DiamondIcon,
  Moon: DarkModeIcon,
  Sun: LightModeIcon,
  Lightning: BoltIcon,
  Wave: WavesIcon,
  Cross: AddIcon,
  Arrow: ArrowForwardIcon,
  Person: PersonIcon,
  Group: GroupIcon,
  Place: PlaceIcon,
  AutoStories: AutoStoriesIcon,
  Movie: MovieIcon,
  Image: ImageIcon,
  Pipeline: AccountTreeIcon,
  Preset: BookmarksIcon,
  Tile: GridViewIcon,
};

export interface SymbolProps {
  name: SymbolName;
  color: SymbolColor;
  size?: number;
  variant?: "filled" | "outlined" | "ghost";
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

/**
 * Symbol — visual marker for an entity.
 *
 * Renders the registered MUI icon for `name` inside a colored chip.
 * Pure presentation; click handling provided via `onClick`.
 */
export function Symbol({
  name,
  color,
  size = 32,
  variant = "filled",
  onClick,
  sx,
}: SymbolProps) {
  const Icon = SYMBOL_ICONS[name] ?? CircleIcon;
  const hex = COLOR_MAP[color];

  const variantStyles =
    variant === "filled"
      ? { bgcolor: `${hex}22`, border: `1px solid ${hex}` }
      : variant === "outlined"
        ? { bgcolor: "transparent", border: `1px solid ${hex}` }
        : { bgcolor: "transparent", border: "1px solid transparent" };

  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      sx={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        cursor: onClick ? "pointer" : "default",
        transition: "background-color .15s ease",
        ...variantStyles,
        "&:hover": onClick ? { bgcolor: `${hex}33` } : undefined,
        ...sx,
      }}
    >
      <Icon sx={{ color: hex, fontSize: size * 0.6 }} />
    </Box>
  );
}

export { SYMBOL_ICONS };
