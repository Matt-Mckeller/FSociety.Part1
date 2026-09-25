"use client";

/**
 * Spell icon registry.
 *
 * Maps data-only icon keys used in the Spellbook seed to concrete MUI icon
 * components. Direct deep imports keep bundles lean and the set explicit.
 * Add a key here when adding a spell with a new icon.
 */

import * as React from "react";
import type { SvgIconProps } from "@mui/material";

// ── Learn ──────────────────────────────────────────────────────────────────
import ShortTextRounded from "@mui/icons-material/ShortTextRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import FormatListBulletedRounded from "@mui/icons-material/FormatListBulletedRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import BubbleChartRounded from "@mui/icons-material/BubbleChartRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import CompareArrowsRounded from "@mui/icons-material/CompareArrowsRounded";
import BuildRounded from "@mui/icons-material/BuildRounded";
import StyleRounded from "@mui/icons-material/StyleRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import RecordVoiceOverRounded from "@mui/icons-material/RecordVoiceOverRounded";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";

// ── Transform ──────────────────────────────────────────────────────────────
import SummarizeRounded from "@mui/icons-material/SummarizeRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";
import CachedRounded from "@mui/icons-material/CachedRounded";

// ── Assess ─────────────────────────────────────────────────────────────────
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import RateReviewRounded from "@mui/icons-material/RateReviewRounded";

// ── Navigate ───────────────────────────────────────────────────────────────
import TravelExploreRounded from "@mui/icons-material/TravelExploreRounded";
import HubRounded from "@mui/icons-material/HubRounded";

// ── Heal ───────────────────────────────────────────────────────────────────
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import SelfImprovementRounded from "@mui/icons-material/SelfImprovementRounded";

// ── Create ─────────────────────────────────────────────────────────────────
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import MovieRounded from "@mui/icons-material/MovieRounded";

// ── Misc ───────────────────────────────────────────────────────────────────
import AutoFixHighRounded from "@mui/icons-material/AutoFixHighRounded";
import ExploreRounded from "@mui/icons-material/ExploreRounded";
import BrushRounded from "@mui/icons-material/BrushRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";

type IconComponent = React.ComponentType<SvgIconProps>;

const ICONS: Record<string, IconComponent> = {
  // Learn
  ShortTextRounded,
  SchoolRounded,
  FormatListBulletedRounded,
  UnfoldMoreRounded,
  AccountTreeRounded,
  BubbleChartRounded,
  LightbulbRounded,
  CompareArrowsRounded,
  BuildRounded,
  StyleRounded,
  QuizRounded,
  RecordVoiceOverRounded,
  PsychologyRounded,
  GraphicEqRounded,
  // Transform
  SummarizeRounded,
  TranslateRounded,
  CachedRounded,
  // Assess
  FactCheckRounded,
  RateReviewRounded,
  // Navigate
  TravelExploreRounded,
  HubRounded,
  // Heal
  FavoriteRounded,
  SelfImprovementRounded,
  // Create
  EditNoteRounded,
  MovieRounded,
  // Misc
  AutoFixHighRounded,
  ExploreRounded,
  BrushRounded,
};

export function SpellIcon({ name, ...props }: { name: string } & SvgIconProps) {
  const Cmp = ICONS[name] ?? AutoStoriesRounded;
  return <Cmp {...props} />;
}
