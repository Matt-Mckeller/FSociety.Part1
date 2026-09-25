"use client";

/**
 * Shared icons for AI permission levels / sections / categories.
 * Used by SettingsTile (editor) and PermissionsHud (read-only HUD panel).
 */

import * as React from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import LensBlurRoundedIcon from "@mui/icons-material/LensBlurRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";

import { FourEyeIcon } from "../login/FourEyeMark";
import { displaySectionLabel, type PermissionLevel } from "./ai-permissions";

type IconComponent = React.ComponentType<SvgIconProps>;

export const PERMISSION_LEVEL_ICON_COMPONENTS: Record<PermissionLevel, IconComponent> = {
  0: AutoModeRoundedIcon,
  1: HelpOutlineRoundedIcon,
  2: PowerSettingsNewRoundedIcon,
};

/** Section → icon. Keys are display labels (incl. legacy "God Console"). */
export const PERMISSION_SECTION_ICON_COMPONENTS: Record<string, IconComponent> = {
  Identity: PersonOutlineRoundedIcon,
  Memory: MemoryRoundedIcon,
  Productivity: FlagRoundedIcon,
  Behavior: PsychologyRoundedIcon,
  Context: EventRoundedIcon,
  Finance: AccountBalanceRoundedIcon,
  Communication: ForumRoundedIcon,
  Lens: LensBlurRoundedIcon,
  Realms: MapRoundedIcon,
  "Aion Console": BoltRoundedIcon,
  "God Console": BoltRoundedIcon,
  Autonomy: AutoAwesomeRoundedIcon,
  Core: HubRoundedIcon,
  Learning: SchoolRoundedIcon,
};

export function PermissionLevelIcon({
  level,
  fontSize = 13,
}: {
  level: PermissionLevel;
  fontSize?: number;
}) {
  const Icon = PERMISSION_LEVEL_ICON_COMPONENTS[level];
  return <Icon sx={{ fontSize }} />;
}

export function PermissionSectionIcon({
  section,
  fontSize = 14,
}: {
  section: string;
  fontSize?: number;
}) {
  const Icon =
    PERMISSION_SECTION_ICON_COMPONENTS[displaySectionLabel(section)] ??
    PERMISSION_SECTION_ICON_COMPONENTS[section];
  if (!Icon) return null;
  return <Icon sx={{ fontSize }} />;
}

/** Same almond eye as the permissions HUD — one eye per category tab. */
export function PermissionCategoryIcon({
  category,
  size = 16,
  color,
  gleam,
}: {
  category: string;
  size?: number;
  color?: string;
  gleam?: string;
}) {
  const title = category === "4eye" ? "Aion Console" : category;
  return <FourEyeIcon size={size} title={title} color={color} gleam={gleam} />;
}
