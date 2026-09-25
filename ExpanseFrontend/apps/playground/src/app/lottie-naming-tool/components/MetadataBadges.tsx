"use client"

/**
 * MetadataBadges Component
 * Displays role, visual level, and semantic role badges
 */

import { Chip, Stack, Tooltip } from "@mui/material"
import { RoleFunction, VisualLevel, SemanticRole } from "../types/types"

interface MetadataBadgesProps {
  roleFunction?: RoleFunction
  visualLevel?: VisualLevel
  semanticRole?: SemanticRole
  size?: "small" | "medium"
}

export default function MetadataBadges({
  roleFunction,
  visualLevel,
  semanticRole,
  size = "small",
}: MetadataBadgesProps) {
  if (!roleFunction && !visualLevel && !semanticRole) {
    return null
  }

  return (
    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
      {/* Role Function */}
      {roleFunction && (
        <Tooltip title="Role in animation">
          <Chip
            label={formatRoleFunction(roleFunction)}
            size={size}
            color={getRoleFunctionColor(roleFunction)}
            variant="outlined"
            sx={{ fontSize: "0.7rem" }}
          />
        </Tooltip>
      )}

      {/* Visual Level */}
      {visualLevel && (
        <Tooltip title="Visual importance">
          <Chip
            label={visualLevel}
            size={size}
            color={getVisualLevelColor(visualLevel)}
            sx={{ fontSize: "0.7rem" }}
          />
        </Tooltip>
      )}

      {/* Semantic Role */}
      {semanticRole && (
        <Tooltip title="Semantic category">
          <Chip
            label={formatSemanticRole(semanticRole)}
            size={size}
            variant="outlined"
            sx={{ fontSize: "0.7rem", borderStyle: "dashed" }}
          />
        </Tooltip>
      )}
    </Stack>
  )
}

// Helper functions for formatting and colors

function formatRoleFunction(role: RoleFunction): string {
  const labels: Record<RoleFunction, string> = {
    primary_subject: "Primary",
    supporting_object: "Supporting",
    background: "Background",
    text: "Text",
    ui_indicator: "UI",
    transition: "Transition",
    highlight: "Highlight",
    mask: "Mask",
    control: "Control",
    lighting: "Lighting",
    particle: "Particle",
    other: "Other",
  }
  return labels[role] || role
}

function formatSemanticRole(role: SemanticRole): string {
  const labels: Record<SemanticRole, string> = {
    illustrative_object: "Object",
    decorative_element: "Decorative",
    motion_cue: "Motion",
    structural_group: "Structure",
  }
  return labels[role] || role
}

function getRoleFunctionColor(
  role: RoleFunction,
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" {
  const colorMap: Record<
    RoleFunction,
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  > = {
    primary_subject: "primary",
    supporting_object: "secondary",
    background: "default",
    text: "info",
    ui_indicator: "info",
    transition: "warning",
    highlight: "success",
    mask: "default",
    control: "default",
    lighting: "warning",
    particle: "secondary",
    other: "default",
  }
  return colorMap[role] || "default"
}

function getVisualLevelColor(
  level: VisualLevel,
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" {
  const colorMap: Record<
    VisualLevel,
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  > = {
    primary: "error",
    secondary: "warning",
    tertiary: "info",
    hidden: "default",
  }
  return colorMap[level] || "default"
}
