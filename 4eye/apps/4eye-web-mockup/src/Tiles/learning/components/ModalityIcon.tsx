"use client";

/**
 * ModalityIcon — resolves a learning-modality icon name to a deep-imported MUI
 * icon component. Deep imports (not the barrel) avoid Storybook's Vite
 * optimizeDeps 504 churn.
 */

import * as React from "react";
import type { SvgIconProps } from "@mui/material";

import RecordVoiceOverRounded from "@mui/icons-material/RecordVoiceOverRounded";
import ExtensionRounded from "@mui/icons-material/ExtensionRounded";
import HearingRounded from "@mui/icons-material/HearingRounded";
import DirectionsRunRounded from "@mui/icons-material/DirectionsRunRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import CalculateRounded from "@mui/icons-material/CalculateRounded";
import HubRounded from "@mui/icons-material/HubRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import BookmarkRounded from "@mui/icons-material/BookmarkRounded";
import PaidRounded from "@mui/icons-material/PaidRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import GestureRounded from "@mui/icons-material/GestureRounded";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import MemoryRounded from "@mui/icons-material/MemoryRounded";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import CenterFocusStrongRounded from "@mui/icons-material/CenterFocusStrongRounded";
import ViewCarouselRounded from "@mui/icons-material/ViewCarouselRounded";
import LoopRounded from "@mui/icons-material/LoopRounded";
import MoodOutlined from "@mui/icons-material/MoodOutlined";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import SpeedRounded from "@mui/icons-material/SpeedRounded";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import AutoAwesomeMosaicRounded from "@mui/icons-material/AutoAwesomeMosaicRounded";

const REGISTRY: Record<string, React.ComponentType<SvgIconProps>> = {
  RecordVoiceOverRounded,
  ExtensionRounded,
  HearingRounded,
  DirectionsRunRounded,
  GroupsRounded,
  VisibilityRounded,
  MenuBookRounded,
  CalculateRounded,
  HubRounded,
  TuneRounded,
  LockRounded,
  BookmarkRounded,
  PaidRounded,
  GestureRounded,
  HistoryRounded,
  MemoryRounded,
  ParkOutlined,
  CenterFocusStrongRounded,
  ViewCarouselRounded,
  LoopRounded,
  MoodOutlined,
  SaveOutlined,
  SpeedRounded,
  AccountTreeRounded,
  AutoAwesomeMosaicRounded,
};

export function ModalityIcon({
  name,
  ...props
}: { name: string } & SvgIconProps) {
  const Cmp = REGISTRY[name] ?? SchoolRounded;
  return <Cmp {...props} />;
}
