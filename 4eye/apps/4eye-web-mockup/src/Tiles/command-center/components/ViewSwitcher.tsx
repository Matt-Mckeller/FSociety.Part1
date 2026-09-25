"use client";

/**
 * Command Center — ViewSwitcher.
 *
 * A compact glyph rail that switches between the Command Center sub-views.
 * Each entry shows its brand planning glyph + label; the active view is
 * marked with the primary brand accent. Renders vertically on wide layouts
 * and horizontally (scrollable) on narrow ones.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";

import {
  COMMAND_GROUPS,
  COMMAND_VIEWS,
  commandViewMeta,
  type CommandGroupMeta,
  type CommandView,
  type CommandViewMeta,
} from "./planning-glyphs";

export interface ViewSwitcherProps {
  active: CommandView;
  onChange: (view: CommandView) => void;
  /** "rail" = vertical icon+label column; "bar" = horizontal scroll row. */
  orientation?: "rail" | "bar";
}

interface NavCluster {
  id: string;
  label?: string;
  views: CommandViewMeta[];
}

/** A flat view, or a group header followed by its (indented, clustered) views. */
type NavNode =
  | { kind: "view"; view: CommandViewMeta }
  | { kind: "group"; group: CommandGroupMeta; clusters: NavCluster[] };

/** Compose the ordered nav: ungrouped views inline, grouped views under their header. */
function buildNavNodes(): NavNode[] {
  const nodes: NavNode[] = [];
  const emitted = new Set<string>();
  for (const view of COMMAND_VIEWS) {
    if (!view.group) {
      nodes.push({ kind: "view", view });
      continue;
    }
    if (emitted.has(view.group)) continue;
    emitted.add(view.group);
    const group = COMMAND_GROUPS.find((g) => g.id === view.group);
    if (!group) {
      nodes.push({ kind: "view", view });
      continue;
    }
    const clusters: NavCluster[] = group.clusters.map((c) => ({
      id: c.id,
      label: c.label,
      views: c.children
        .map((id) => COMMAND_VIEWS.find((v) => v.id === id))
        .filter((v): v is CommandViewMeta => Boolean(v)),
    }));
    nodes.push({ kind: "group", group, clusters });
  }
  return nodes;
}

/**
 * The label of an active, hovered view, cycling through its cipher readings.
 *
 * Only fires when the view is both active and hovered: it is a detail for
 * someone already standing in the room, not a thing that flickers at anyone
 * moving a cursor across the nav. The `aria-label` stays on the canonical name
 * so the cycling never reaches assistive tech as a renaming control.
 */
function useCipherLabel(view: CommandViewMeta, enabled: boolean): string {
  const readings = React.useMemo(
    () => (view.cipher?.length ? [view.label, ...view.cipher] : [view.label]),
    [view.label, view.cipher],
  );
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (!enabled || readings.length < 2) {
      setI(0);
      return;
    }
    const t = window.setInterval(() => setI((n) => (n + 1) % readings.length), 1400);
    return () => window.clearInterval(t);
  }, [enabled, readings.length]);

  return readings[i] ?? view.label;
}

function ViewButtonLabel({
  view,
  selected,
  isRail,
}: {
  view: CommandViewMeta;
  selected: boolean;
  isRail: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);
  const label = useCipherLabel(view, selected && hovered);

  return (
    <Typography
      variant="caption"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        fontWeight: selected ? 800 : 600,
        fontSize: isRail ? 12 : 10.5,
        lineHeight: 1.1,
        whiteSpace: "nowrap",
        transition: "opacity 180ms ease",
      }}
    >
      {label}
    </Typography>
  );
}

export function ViewSwitcher({
  active,
  onChange,
  orientation = "rail",
}: ViewSwitcherProps) {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const isRail = orientation === "rail";

  const renderButton = (view: CommandViewMeta, indented: boolean) => {
    const selected = view.id === active;
    const { Glyph } = view;
    const button = (
      <Box
        role="tab"
        aria-selected={selected}
        aria-label={view.label}
        tabIndex={0}
        onClick={() => onChange(view.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(view.id);
          }
        }}
        sx={{
          display: "flex",
          flexDirection: isRail ? "row" : "column",
          alignItems: "center",
          gap: isRail ? 1 : 0.25,
          px: 1,
          py: isRail ? 0.85 : 0.75,
          // Nested children sit in from the group rail.
          ml: isRail && indented ? 1.5 : 0,
          borderLeft: isRail && indented ? "2px solid" : undefined,
          borderLeftColor:
            isRail && indented ? alpha(accent, selected ? 0.5 : 0.18) : undefined,
          borderTopLeftRadius: isRail && indented ? 0 : 6,
          borderBottomLeftRadius: isRail && indented ? 0 : 6,
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          borderRadius: isRail && indented ? undefined : 1.5,
          cursor: "pointer",
          userSelect: "none",
          color: selected ? accent : alpha(theme.palette.text.primary, 0.62),
          bgcolor: selected ? alpha(accent, 0.12) : "transparent",
          border: "1px solid",
          borderColor: selected ? alpha(accent, 0.32) : "transparent",
          transition: "all 140ms ease",
          "&:hover": {
            bgcolor: selected ? alpha(accent, 0.16) : alpha(accent, 0.06),
            color: selected ? accent : theme.palette.text.primary,
          },
          "&:focus-visible": {
            outline: `2px solid ${alpha(accent, 0.6)}`,
            outlineOffset: 1,
          },
        }}
      >
        <Glyph size={isRail ? 20 : 18} />
        <ViewButtonLabel view={view} selected={selected} isRail={isRail} />
      </Box>
    );

    return isRail ? (
      <React.Fragment key={view.id}>{button}</React.Fragment>
    ) : (
      <Tooltip key={view.id} title={view.description} arrow>
        {button}
      </Tooltip>
    );
  };

  const nodes = buildNavNodes();

  return (
    <Stack
      role="tablist"
      aria-label="Executive Center views"
      spacing={isRail ? 0.5 : 0.75}
      sx={{
        flexDirection: isRail ? "column" : "row",
        alignItems: isRail ? "stretch" : "center",
        p: isRail ? 1 : 0.75,
        ...(isRail
          ? { borderRight: "1px solid", borderColor: "divider", minWidth: 148 }
          : {
              borderBottom: "1px solid",
              borderColor: "divider",
              overflowX: "auto",
            }),
        bgcolor: "background.paper",
        flexShrink: 0,
      }}
    >
      {nodes.map((node, idx) => {
        if (node.kind === "view") return renderButton(node.view, false);

        // In the horizontal bar, flatten the group (no header) to keep it scannable.
        if (!isRail) {
          return (
            <React.Fragment key={node.group.id}>
              {node.clusters.flatMap((c) => c.views).map((child) => renderButton(child, false))}
            </React.Fragment>
          );
        }

        const { Glyph } = node.group;
        const groupActive = node.clusters.some((c) => c.views.some((v) => v.id === active));
        const groupTarget =
          node.group.defaultView ??
          node.clusters.flatMap((c) => c.views).map((v) => v.id)[0];
        return (
          <Box
            key={node.group.id}
            sx={{
              // A divider bar separates each top-level group.
              pt: idx === 0 ? 0 : 1,
              mt: idx === 0 ? 0 : 0.5,
              borderTop: idx === 0 ? undefined : "1px solid",
              borderColor: "divider",
            }}
          >
            {/* Group header — clickable door into the group's default view. */}
            <Stack
              component="button"
              type="button"
              onClick={() => {
                if (groupTarget) onChange(groupTarget);
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && groupTarget) {
                  e.preventDefault();
                  onChange(groupTarget);
                }
              }}
              aria-label={`${node.group.label} — open ${
                commandViewMeta(groupTarget!)?.label ?? "default view"
              }`}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 0.5,
                width: "100%",
                border: 0,
                bgcolor: "transparent",
                font: "inherit",
                textAlign: "left",
                cursor: groupTarget ? "pointer" : "default",
                borderRadius: 1,
                color: groupActive ? accent : alpha(theme.palette.text.primary, 0.5),
                "&:hover": groupTarget
                  ? {
                      bgcolor: alpha(accent, 0.06),
                      color: groupActive ? accent : theme.palette.text.primary,
                    }
                  : undefined,
                "&:focus-visible": {
                  outline: `2px solid ${alpha(accent, 0.6)}`,
                  outlineOffset: 1,
                },
              }}
            >
              <Glyph size={18} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  fontSize: 11.5,
                  letterSpacing: 0.4,
                  lineHeight: 1.1,
                }}
              >
                {node.group.label}
              </Typography>
            </Stack>
            {/* Clustered children — each cluster separated by a faint divider. */}
            <Stack sx={{ mt: 0.25 }}>
              {node.clusters.map((cluster, ci) => (
                <Stack
                  key={cluster.id}
                  spacing={0.5}
                  sx={{
                    pt: ci === 0 ? 0 : 0.5,
                    mt: ci === 0 ? 0 : 0.5,
                    borderTop: ci === 0 ? undefined : "1px solid",
                    borderColor: alpha(theme.palette.divider, 0.6),
                  }}
                >
                  {cluster.label && (
                    <Typography
                      variant="caption"
                      sx={{
                        pl: 1.5,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0.2,
                        color: alpha(theme.palette.text.primary, 0.42),
                        lineHeight: 1.1,
                      }}
                    >
                      {cluster.label}
                    </Typography>
                  )}
                  {cluster.views.map((child) => renderButton(child, true))}
                </Stack>
              ))}
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}
