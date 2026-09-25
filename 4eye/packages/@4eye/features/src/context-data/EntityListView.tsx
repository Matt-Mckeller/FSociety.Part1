"use client";

import * as React from "react";
import type { ComponentProps } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  alpha,
  Button,
  Chip,
} from "@mui/material";
import { TARGET_ROLE_META, INCLUDED_CAST_META, type SelectedContextKey } from "@4eye/types";
import { ENTITY_KIND_BY_KEY } from "./entityKinds";
import { useContextData } from "./ContextDataContext";
import { useTargeting } from "../targeting/TargetingContext";
import { AUDIENCE_RADIUS, ROLE_RADIUS } from "../targeting/TargetingChip";
import { Symbol } from "../symbols";

interface EntityListViewProps {
  kind: SelectedContextKey;
}

interface EntityRow {
  id: string;
  name: string;
  symbol: ComponentProps<typeof Symbol>["name"];
  symbolColor: ComponentProps<typeof Symbol>["color"];
  description?: string;
  steps?: string[];
  memberIds?: string[];
}

function rowSecondary(entity: EntityRow): string | undefined {
  if (entity.description) return entity.description;
  if (entity.steps && entity.steps.length > 0) return entity.steps.join(" → ");
  if (entity.memberIds && entity.memberIds.length > 0) {
    return `${entity.memberIds.length} member${entity.memberIds.length === 1 ? "" : "s"}`;
  }
  return undefined;
}

/**
 * EntityListView — manager view for a single entity kind.
 *
 * Targets use shaped Actor / Aim role toggles (same silhouettes as the HUD)
 * plus a quieter Include mark for entities that ride along without being
 * the cursor. Audiences use a rounded-rect selected chip on the right.
 */
export function EntityListView({ kind }: EntityListViewProps) {
  const meta = ENTITY_KIND_BY_KEY[kind];
  const ctx = useContextData();
  const items = (ctx[kind] as EntityRow[]) ?? [];
  const selected = ctx.selectedContext[kind];

  const isTargetsKind = kind === "targets";
  const isAudiencesKind = kind === "audiences";
  const targeting = useTargeting();
  const actorMeta = TARGET_ROLE_META.actor;
  const targetMeta = TARGET_ROLE_META.target;

  // Audience multi-select mode (local UI toggle). Default: allow multi-select
  const [audienceMulti, setAudienceMulti] = React.useState<boolean>(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6" sx={{ color: meta.color, fontWeight: 700 }}>
          {meta.label}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {meta.description}
        </Typography>
      </Box>
      {/* Quick group chips + Select All (targets only) */}
      {isTargetsKind && (
        <Box sx={{ px: 1.5, py: 1, borderBottom: "1px solid", borderColor: "divider", display: "flex", gap: 1.25, alignItems: "center", flexWrap: "wrap" }}>
          {/* group shortcuts */}
          <Chip label="All" size="small" clickable onClick={() => {
            const ids = items.map((e) => e.id);
            ctx.setSelected("targets", ids);
          }} />
          <Chip label="Humans" size="small" clickable onClick={() => {
            const ids = items.filter((e) => (e as any).targetType === "people").map((e) => e.id);
            ctx.setSelected("targets", ids);
          }} />
          <Chip label="AI" size="small" clickable onClick={() => {
            const ids = items.filter((e) => (e as any).identifiers?.some((id: string) => id.toLowerCase().includes("ai"))).map((e) => e.id);
            ctx.setSelected("targets", ids);
          }} />
          <Chip label="Computers" size="small" clickable onClick={() => {
            const ids = items.filter((e) => (e as any).identifiers?.some((id: string) => id.toLowerCase().includes("computer"))).map((e) => e.id);
            ctx.setSelected("targets", ids);
          }} />
          <Box sx={{ flex: 1 }} />
          <Button variant="text" size="small" onClick={() => {
            // Toggle: if everything selected, clear; otherwise select all
            const allIds = items.map((e) => e.id);
            const current = ctx.selectedContext[kind];
            const allSelected = allIds.length > 0 && allIds.every((id) => current.includes(id));
            ctx.setSelected(kind, allSelected ? [] : allIds);
          }}>
            {"Select all"}
          </Button>
        </Box>
      )}

      {isAudiencesKind && (
        <Box sx={{ px: 1.5, py: 1, borderBottom: "1px solid", borderColor: "divider", display: "flex", gap: 1.25, alignItems: "center", flexWrap: "wrap" }}>
          <Chip label={audienceMulti ? "Multiple: On" : "Multiple: Off"} size="small" clickable color={audienceMulti ? "primary" : undefined} onClick={() => setAudienceMulti((v) => !v)} />
          <Chip label="Preset: Team + Public" size="small" clickable onClick={() => {
            const ids = items.filter((e) => e.id === "audience-team" || e.id === "audience-public").map((e) => e.id);
            ctx.setSelected("audiences", ids);
          }} />
          <Box sx={{ flex: 1 }} />
          <Button variant="text" size="small" onClick={() => {
            const allIds = items.map((e) => e.id);
            const current = ctx.selectedContext["audiences"];
            const allSelected = allIds.length > 0 && allIds.every((id) => current.includes(id));
            ctx.setSelected("audiences", allSelected ? [] : allIds);
          }}>
            {"Select all"}
          </Button>
        </Box>
      )}

      <List sx={{ flex: 1, overflowY: "auto", py: 0.5, px: 0.75 }}>
        {items.length === 0 && (
          <ListItem>
            <ListItemText
              primary={`No ${meta.label.toLowerCase()} yet`}
              secondary="Add some to start including them in chat context"
            />
          </ListItem>
        )}
        {items.map((entity) => {
          if (isTargetsKind) {
            const isActor = targeting.isAssigned("actor", entity.id);
            const isTarget = targeting.isAssigned("target", entity.id);
            const isIncluded = selected.includes(entity.id);
            return (
              <ListItem key={entity.id} disablePadding sx={{ mb: 0.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                    px: 1,
                    py: 0.75,
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor:
                      isActor || isTarget
                        ? alpha(isActor ? actorMeta.color : targetMeta.color, 0.4)
                        : isIncluded
                          ? alpha(INCLUDED_CAST_META.color, 0.4)
                          : "divider",
                    bgcolor:
                      isActor || isTarget
                        ? alpha(isActor ? actorMeta.color : targetMeta.color, 0.06)
                        : isIncluded
                          ? alpha(INCLUDED_CAST_META.color, 0.06)
                          : "transparent",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Symbol name={entity.symbol} color={entity.symbolColor} size={32} />
                  </ListItemIcon>
                  <ListItemText
                    primary={entity.name}
                    secondary={rowSecondary(entity)}
                    slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                    sx={{ mr: 1 }}
                  />
                  <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
                    <RoleToggle
                      label="Actor"
                      hint={actorMeta.hint}
                      active={isActor}
                      color={actorMeta.color}
                      radius={ROLE_RADIUS.actor}
                      onClick={() => targeting.toggleAssignment("actor", entity.id)}
                    />
                    <RoleToggle
                      label={targetMeta.actionLabel}
                      hint={targetMeta.hint}
                      active={isTarget}
                      color={targetMeta.color}
                      radius={ROLE_RADIUS.target}
                      onClick={() => targeting.toggleAssignment("target", entity.id)}
                    />
                    <RoleToggle
                      label="In"
                      hint={
                        isTarget
                          ? "Aimed — already in the prompt as the cursor"
                          : "Include without aiming — rides along, not the cursor"
                      }
                      active={isTarget || isIncluded}
                      color={INCLUDED_CAST_META.color}
                      radius={AUDIENCE_RADIUS}
                      dashed
                      disabled={isTarget}
                      onClick={() => ctx.toggleSelect("targets", entity.id)}
                    />
                  </Stack>
                </Box>
              </ListItem>
            );
          }

          const isSelected = selected.includes(entity.id);
          const radius = isAudiencesKind ? "8px" : "10px";
          return (
            <ListItem key={entity.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  if (isAudiencesKind && !audienceMulti) {
                    ctx.setSelected(kind, [entity.id]);
                  } else {
                    ctx.toggleSelect(kind, entity.id);
                  }
                }}
                sx={{
                  borderRadius: radius,
                  border: "1px solid",
                  borderColor: isSelected ? alpha(meta.color, 0.45) : "divider",
                  bgcolor: isSelected ? alpha(meta.color, 0.08) : "transparent",
                  "&:hover": { bgcolor: alpha(meta.color, 0.12) },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Symbol name={entity.symbol} color={entity.symbolColor} size={32} />
                </ListItemIcon>
                <ListItemText
                  primary={entity.name}
                  secondary={rowSecondary(entity)}
                  slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                />
                <Box
                  aria-checked={isSelected}
                  role="checkbox"
                  sx={{
                    minWidth: 22,
                    height: 22,
                    borderRadius: isAudiencesKind ? "6px" : "50%",
                    border: "1.5px solid",
                    borderColor: isSelected ? meta.color : "divider",
                    bgcolor: isSelected ? meta.color : "transparent",
                    flexShrink: 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

function RoleToggle({
  label,
  hint,
  active,
  color,
  radius,
  onClick,
  dashed = false,
  disabled = false,
}: {
  label: string;
  hint: string;
  active: boolean;
  color: string;
  radius: string;
  onClick?: () => void;
  dashed?: boolean;
  disabled?: boolean;
}) {
  return (
    <Tooltip title={hint}>
      <Box
        component="button"
        type="button"
        onClick={disabled ? undefined : onClick}
        aria-pressed={active}
        aria-label={hint}
        aria-disabled={disabled}
        sx={{
          appearance: "none",
          cursor: disabled ? "default" : "pointer",
          px: 0.85,
          py: 0.35,
          borderRadius: radius,
          border: dashed ? "1.5px dashed" : "1.5px solid",
          borderColor: active ? color : alpha(color, 0.35),
          bgcolor: active ? alpha(color, 0.18) : "transparent",
          color: active ? color : "text.secondary",
          fontSize: "0.62rem",
          fontWeight: 800,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          lineHeight: 1.2,
          opacity: disabled ? 0.55 : 1,
          "&:hover": disabled
            ? undefined
            : { borderColor: color, bgcolor: alpha(color, 0.12), color },
        }}
      >
        {label}
      </Box>
    </Tooltip>
  );
}
