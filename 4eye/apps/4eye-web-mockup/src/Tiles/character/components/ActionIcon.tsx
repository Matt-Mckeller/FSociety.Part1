"use client";

/**
 * Character action icon registry — maps data-only icon keys (equipped actions)
 * to concrete MUI icons via direct deep imports. Add a key here when seeding a
 * new equipped action icon.
 */

import * as React from "react";
import type { SvgIconProps } from "@mui/material";
import AutoFixHighRounded from "@mui/icons-material/AutoFixHighRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import ChatRounded from "@mui/icons-material/ChatRounded";
import EditNoteRounded from "@mui/icons-material/EditNoteRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import IosShareRounded from "@mui/icons-material/IosShareRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
// Create
import FiberManualRecordRounded from "@mui/icons-material/FiberManualRecordRounded";
import ContentCutRounded from "@mui/icons-material/ContentCutRounded";
import RocketLaunchRounded from "@mui/icons-material/RocketLaunchRounded";
// Engage
import FlashOnRounded from "@mui/icons-material/FlashOnRounded";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import ReplyRounded from "@mui/icons-material/ReplyRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import CelebrationRounded from "@mui/icons-material/CelebrationRounded";
import HubRounded from "@mui/icons-material/HubRounded";
// Influence
import CampaignRounded from "@mui/icons-material/CampaignRounded";
import LockOpenRounded from "@mui/icons-material/LockOpenRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import PublicRounded from "@mui/icons-material/PublicRounded";
import WavesRounded from "@mui/icons-material/WavesRounded";
import MoodRounded from "@mui/icons-material/MoodRounded";
import MovieFilterRounded from "@mui/icons-material/MovieFilterRounded";
import ForumRounded from "@mui/icons-material/ForumRounded";
import SportsEsportsRounded from "@mui/icons-material/SportsEsportsRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";

type IconComponent = React.ComponentType<SvgIconProps>;

const ICONS: Record<string, IconComponent> = {
  AutoFixHighRounded,
  VisibilityRounded,
  ChatRounded,
  EditNoteRounded,
  BoltRounded,
  RestaurantRounded,
  IosShareRounded,
  SchoolRounded,
  PsychologyRounded,
  AccountTreeRounded,
  TrendingUpRounded,
  VerifiedRounded,
  // Create
  FiberManualRecordRounded,
  ContentCutRounded,
  RocketLaunchRounded,
  // Engage
  FlashOnRounded,
  AddCircleOutlineRounded,
  ReplyRounded,
  FavoriteRounded,
  CheckCircleOutlineRounded,
  CelebrationRounded,
  HubRounded,
  // Influence
  CampaignRounded,
  LockOpenRounded,
  EmojiEventsRounded,
  GroupsRounded,
  PublicRounded,
  WavesRounded,
  MoodRounded,
  MovieFilterRounded,
  ForumRounded,
  SportsEsportsRounded,
  EditRounded,
  PersonRounded,
};

export function ActionIcon({ name, ...props }: { name: string } & SvgIconProps) {
  const Cmp = ICONS[name] ?? BoltRounded;
  return <Cmp {...props} />;
}
