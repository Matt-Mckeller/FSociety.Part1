import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";

export type SvgIconLike = ComponentType<SvgIconProps>;

/** A clickable list item under a map-overlay accordion or NBA list. */
export interface ContentItem {
  id: string;
  label: string;
  Icon?: SvgIconLike;
  blurb?: string;
  /** Tile id to navigate to when clicked. */
  tileId?: string;
}
