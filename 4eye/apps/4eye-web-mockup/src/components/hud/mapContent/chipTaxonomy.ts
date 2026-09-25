/**
 * chipTaxonomy — visual + semantic vocabulary for the Navigation
 * Suggestions chips.
 *
 * Each `ChipKind` gets a stable label, MUI icon, accent color, and a
 * `TagChip` size preset (`sm | md | lg | flex`) so the chip row in
 * `DirectionRow` lays out as a uniform grid (chips align across all
 * four direction cards instead of jittering with text length).
 *
 * Size guideline:
 *   - sm  (96px)  — single short word
 *   - md  (128px) — two words / ~10 chars
 *   - lg  (168px) — long phrase
 *   - flex        — fills remaining row space (use sparingly)
 */

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import type { TagChipSize } from "@expanse/hud"
import type { ChipKind, SvgIconLike } from "./types";

export interface ChipMeta {
  label: string;
  Icon: SvgIconLike;
  color: string;
  /** Width preset consumed by `TagChip` in the NBA chip row. */
  size: TagChipSize;
}

export const CHIP_META: Record<ChipKind, ChipMeta> = {
  emotion:    { label: "Emotion",   Icon: FavoriteRoundedIcon,           color: "#EC4899", size: "sm" },
  purpose:    { label: "Purpose",   Icon: FlagRoundedIcon,               color: "#8B5CF6", size: "sm" },
  highValue:  { label: "Value",     Icon: StarRoundedIcon,               color: "#F59E0B", size: "sm" },
  highlights: { label: "Highlights", Icon: AutoAwesomeRoundedIcon,       color: "#FBBF24", size: "md" },
  explore:    { label: "Explore",   Icon: ExploreRoundedIcon,            color: "#14B8A6", size: "sm" },
  details:    { label: "Complex",   Icon: LayersRoundedIcon,             color: "#64748B", size: "sm" },
  demo:       { label: "Demos",     Icon: PlayCircleRoundedIcon,         color: "#0EA5E9", size: "sm" },
  feelings:   { label: "Feelings",  Icon: SentimentSatisfiedRoundedIcon, color: "#F472B6", size: "sm" },
  process:    { label: "Process",   Icon: AccountTreeRoundedIcon,        color: "#F97316", size: "sm" },
  memory:     { label: "Memory",    Icon: PsychologyRoundedIcon,         color: "#A78BFA", size: "sm" },
  factual:    { label: "Factual",   Icon: MenuBookRoundedIcon,           color: "#3B82F6", size: "sm" },
  media:      { label: "Media",     Icon: MovieRoundedIcon,              color: "#0EA5E9", size: "sm" },
  brand:      { label: "Brand",     Icon: DiamondRoundedIcon,            color: "#D4AF37", size: "sm" },
  money:      { label: "Story",     Icon: PaidRoundedIcon,               color: "#22C55E", size: "sm" },
  future:     { label: "Future",    Icon: AutoAwesomeRoundedIcon,        color: "#6366F1", size: "sm" },
};
