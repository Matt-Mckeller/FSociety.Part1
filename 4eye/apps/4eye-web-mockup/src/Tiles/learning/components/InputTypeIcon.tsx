"use client";

/**
 * InputTypeIcon — resolves a learning input-type icon name to a deep-imported
 * MUI icon component. Deep imports (not the barrel) avoid Storybook's Vite
 * optimizeDeps 504 churn.
 */

import * as React from "react";
import type { SvgIconProps } from "@mui/material";

import NotesRounded from "@mui/icons-material/NotesRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";
import LinkRounded from "@mui/icons-material/LinkRounded";
import DashboardCustomizeRounded from "@mui/icons-material/DashboardCustomizeRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";

const REGISTRY: Record<string, React.ComponentType<SvgIconProps>> = {
  NotesRounded,
  MicRounded,
  ImageRounded,
  LinkRounded,
  DashboardCustomizeRounded,
};

export function InputTypeIcon({
  name,
  ...props
}: { name: string } & SvgIconProps) {
  const Cmp = REGISTRY[name] ?? SchoolRounded;
  return <Cmp {...props} />;
}
