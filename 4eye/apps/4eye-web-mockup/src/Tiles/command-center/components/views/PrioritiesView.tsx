"use client";

/**
 * Command Center — Weight view.
 *
 * Two scopes: Projects (campaign allocation chart + ranked campaign rows) and
 * Items (quests/objectives with parent-campaign context). Items can render as
 * a compact list or a grid of cards, both showing a dual weight bar — a taller
 * item bar and a thinner campaign bar below it — for instant relative
 * comparison. Rows belonging to low-weight campaigns are dimmed with an
 * amber warning badge.
 *
 * Labeled "Weight" (not Priorities) — personal Direction priorities live on
 * the Character tile.
 */

import * as React from "react";
import {
  Box,
  Chip,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Symbol as EntitySymbol } from "@4eye/features";
import type { Entity, Relationship } from "@4eye/types";

import { useCommandCenter } from "../../store/CommandCenterProvider";
import { WeightControl, DepthControl, weightOf, depthOf, statusOf } from "../EntityControls";
import {
  StatusBadge,
  STATUS_COLOR,
} from "../../../entity-tile/components/slot-visuals";
import { WeightGlyph } from "../planning-glyphs";
import { Panel } from "./shared";

/* ─── constants ─────────────────────────────────────────────────────────── */

/** Campaigns below this weight get the "low weight" warning treatment. */
const WARN_THRESHOLD = 60;

function weightColor(w: number): string {
  return w >= 70 ? "#EF4444" : w >= 40 ? "#F59E0B" : "#64748b";
}

type ScopeType = "projects" | "items";
type DisplayModeType = "list" | "grid";

/* ─── helpers ────────────────────────────────────────────────────────────── */

/**
 * Walk child-of relationships upward from each entity to find its root
 * campaign. Returns a map of entityId → campaign Entity.
 */
function buildCampaignIndex(
  entities: Entity[],
  relationships: Relationship[],
): Map<string, Entity> {
  const byId = new Map<string, Entity>(entities.map((e) => [e.id, e]));
  const parentOf = new Map<string, string>();
  for (const r of relationships) {
    if (r.relationType === "child-of") parentOf.set(r.fromId, r.toId);
  }

  const result = new Map<string, Entity>();
  for (const e of entities) {
    let cur = e;
    const seen = new Set<string>();
    while (cur && cur.type !== "campaign") {
      if (seen.has(cur.id)) break;
      seen.add(cur.id);
      const pid = parentOf.get(cur.id);
      if (!pid) break;
      const parent = byId.get(pid);
      if (!parent) break;
      cur = parent;
    }
    if (cur?.type === "campaign") result.set(e.id, cur);
  }
  return result;
}

/* ─── DualWeightBar ──────────────────────────────────────────────────────── */

/**
 * Two stacked bars: a 6px item bar (colored by weight) + an optional 3px
 * campaign bar (muted slate). Hovering reveals exact numbers in a tooltip.
 */
function DualWeightBar({
  weight,
  campaignWeight,
}: {
  weight: number;
  campaignWeight?: number;
}) {
  const color = weightColor(weight);
  return (
    <Tooltip
      title={
        campaignWeight != null
          ? `Item: ${weight} · Campaign: ${campaignWeight}`
          : `Weight: ${weight}`
      }
      placement="top"
      arrow
    >
      <Box sx={{ width: 76, cursor: "default" }}>
        <Box
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(color, 0.12),
            overflow: "hidden",
            mb: campaignWeight != null ? 0.35 : 0,
          }}
        >
          <Box
            sx={{
              width: `${weight}%`,
              height: "100%",
              bgcolor: color,
              borderRadius: 3,
              transition: "width 0.25s ease",
            }}
          />
        </Box>
        {campaignWeight != null && (
          <Box
            sx={{
              height: 3,
              borderRadius: 2,
              bgcolor: alpha("#94a3b8", 0.15),
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${campaignWeight}%`,
                height: "100%",
                bgcolor: alpha("#94a3b8", 0.42),
                borderRadius: 2,
              }}
            />
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}

/* ─── CampaignBadge ──────────────────────────────────────────────────────── */

/** Small badge showing the parent campaign's symbol icon + warning when low-weight. */
function CampaignBadge({
  campaign,
  warn,
}: {
  campaign: Entity;
  warn: boolean;
}) {
  const theme = useTheme();
  const w = weightOf(campaign);
  return (
    <Tooltip
      title={`${campaign.name} · weight ${w}${warn ? " — low-weight campaign" : ""}`}
      placement="top"
      arrow
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.3,
          px: 0.5,
          py: 0.25,
          borderRadius: 0.75,
          bgcolor: warn
            ? alpha("#F59E0B", 0.12)
            : alpha(theme.palette.text.primary, 0.05),
          border: "1px solid",
          borderColor: warn ? alpha("#F59E0B", 0.3) : "divider",
          cursor: "help",
          flexShrink: 0,
        }}
      >
        {campaign.symbol && (
          <EntitySymbol
            name={campaign.symbol}
            color={campaign.symbolColor ?? "slate"}
            size={12}
          />
        )}
        {warn && (
          <WarningAmberRoundedIcon sx={{ fontSize: 10, color: "#F59E0B" }} />
        )}
      </Stack>
    </Tooltip>
  );
}

/* ─── ScopeToggle ────────────────────────────────────────────────────────── */

function ScopeToggle<T extends string>({
  value,
  options,
  onChange,
  icon,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  icon?: (v: T) => React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        overflow: "hidden",
      }}
    >
      {options.map((opt) => (
        <Box
          key={opt}
          onClick={() => onChange(opt)}
          sx={{
            px: icon ? 0.75 : 1.25,
            py: 0.5,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 0.4,
            fontSize: 11,
            fontWeight: value === opt ? 800 : 500,
            color:
              value === opt ? "primary.main" : "text.secondary",
            bgcolor:
              value === opt
                ? alpha(theme.palette.primary.main, 0.1)
                : "transparent",
            textTransform: "capitalize",
            transition: "all 120ms ease",
            userSelect: "none",
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.06),
            },
          }}
        >
          {icon ? icon(opt) : opt}
        </Box>
      ))}
    </Box>
  );
}

/* ─── ItemRow (list) ─────────────────────────────────────────────────────── */

function ItemRow({
  entity,
  rank,
  campaign,
}: {
  entity: Entity;
  rank: number;
  campaign?: Entity;
}) {
  const theme = useTheme();
  const w = weightOf(entity);
  const cw = campaign ? weightOf(campaign) : undefined;
  const warn = cw != null && cw < WARN_THRESHOLD;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0.75,
        px: 1,
        py: 0.85,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        opacity: warn ? 0.6 : 1,
        transition: "opacity 140ms, border-color 140ms",
        "&:hover": {
          opacity: 1,
          borderColor: alpha(theme.palette.primary.main, 0.35),
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          width: 20,
          textAlign: "center",
          fontWeight: 800,
          color: "text.disabled",
          flexShrink: 0,
        }}
      >
        {rank}
      </Typography>

      {campaign && <CampaignBadge campaign={campaign} warn={warn} />}

      {entity.symbol && (
        <Box sx={{ flexShrink: 0 }}>
          <EntitySymbol
            name={entity.symbol}
            color={entity.symbolColor ?? "slate"}
            size={18}
          />
        </Box>
      )}

      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {entity.name}
      </Typography>

      <StatusBadge status={statusOf(entity)} />

      <DualWeightBar weight={w} campaignWeight={cw} />

      <Typography
        variant="caption"
        sx={{
          width: 22,
          textAlign: "right",
          fontWeight: 800,
          color: weightColor(w),
          flexShrink: 0,
        }}
      >
        {w}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.25,
          pl: 0.5,
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        <WeightControl entity={entity} />
        {depthOf(entity) != null && <DepthControl entity={entity} />}
      </Box>
    </Stack>
  );
}

/* ─── ItemCard (grid) ────────────────────────────────────────────────────── */

function ItemCard({
  entity,
  rank,
  campaign,
}: {
  entity: Entity;
  rank: number;
  campaign?: Entity;
}) {
  const theme = useTheme();
  const w = weightOf(entity);
  const cw = campaign ? weightOf(campaign) : undefined;
  const warn = cw != null && cw < WARN_THRESHOLD;
  const color = weightColor(w);
  const summary = typeof entity.meta?.summary === "string" ? entity.meta.summary : undefined;

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(color, 0.2),
        bgcolor: "background.paper",
        overflow: "hidden",
        opacity: warn ? 0.65 : 1,
        display: "flex",
        flexDirection: "column",
        transition: "opacity 140ms, border-color 140ms, box-shadow 140ms",
        "&:hover": {
          opacity: 1,
          borderColor: alpha(color, 0.5),
          boxShadow: `0 4px 16px -4px ${alpha(color, 0.18)}`,
        },
      }}
    >
      {/* Colored accent bar */}
      <Box sx={{ height: 3, bgcolor: color, flexShrink: 0 }} />

      <Box sx={{ p: 1.5, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top row: rank + status */}
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: "text.disabled", fontSize: 10 }}
          >
            #{rank}
          </Typography>
          <StatusBadge status={statusOf(entity)} />
        </Stack>

        {/* Symbol + name */}
        <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1, mb: 1 }}>
          {entity.symbol && (
            <Box sx={{ flexShrink: 0, mt: 0.15 }}>
              <EntitySymbol
                name={entity.symbol}
                color={entity.symbolColor ?? "slate"}
                size={24}
              />
            </Box>
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.3,
                mb: 0.2,
              }}
            >
              {entity.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                textTransform: "capitalize",
                fontSize: 10,
              }}
            >
              {entity.type}
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color,
              lineHeight: 1,
              flexShrink: 0,
              fontSize: "1.35rem",
            }}
          >
            {w}
          </Typography>
        </Stack>

        {/* Summary text */}
        {summary && (
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: 1.4,
            }}
          >
            {summary}
          </Typography>
        )}

        {/* Weight bar */}
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, mb: campaign ? 0.85 : 0 }}>
          <Box
            sx={{
              flex: 1,
              height: 7,
              borderRadius: 3.5,
              bgcolor: alpha(color, 0.12),
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${w}%`,
                height: "100%",
                bgcolor: color,
                borderRadius: 3.5,
                transition: "width 0.25s ease",
              }}
            />
          </Box>
        </Stack>

        {/* Campaign footer */}
        {campaign && cw != null && (
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 0.75,
              mt: "auto",
              pt: 0.85,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            {campaign.symbol && (
              <EntitySymbol
                name={campaign.symbol}
                color={campaign.symbolColor ?? "slate"}
                size={13}
              />
            )}
            <Typography
              variant="caption"
              sx={{
                color: warn ? "#F59E0B" : "text.secondary",
                fontWeight: warn ? 700 : 500,
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 10,
              }}
            >
              {campaign.name}
            </Typography>
            {warn && (
              <WarningAmberRoundedIcon sx={{ fontSize: 12, color: "#F59E0B", flexShrink: 0 }} />
            )}
            <Box
              sx={{
                width: 40,
                height: 3,
                borderRadius: 2,
                bgcolor: alpha("#94a3b8", 0.15),
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: `${cw}%`,
                  height: "100%",
                  bgcolor: alpha("#94a3b8", warn ? 0.35 : 0.5),
                  borderRadius: 2,
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{ color: "text.disabled", fontSize: 10, fontWeight: 700, flexShrink: 0 }}
            >
              {cw}
            </Typography>
          </Stack>
        )}
      </Box>

      {/* Controls footer */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.25,
          px: 1.5,
          py: 0.75,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(theme.palette.text.primary, 0.015),
        }}
      >
        <WeightControl entity={entity} />
        {depthOf(entity) != null && <DepthControl entity={entity} />}
      </Stack>
    </Box>
  );
}

/* ─── ProjectsView ───────────────────────────────────────────────────────── */

function ProjectsView() {
  const { store, state } = useCommandCenter();

  const campaigns = React.useMemo(
    () =>
      store
        .allEntities()
        .filter((e) => e.type === "campaign")
        .sort((a, b) => weightOf(b) - weightOf(a)),
    [store],
  );

  return (
    <Stack spacing={1}>
      {/* Allocation strip */}
      <Box
        sx={{
          p: 1.25,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            letterSpacing: 0.4,
            textTransform: "uppercase",
            color: "text.secondary",
            display: "block",
            mb: 1,
          }}
        >
          Focus Allocation
        </Typography>
        <Stack spacing={1}>
          {campaigns.map((c) => {
            const alloc =
              typeof c.meta?.allocation === "number" ? c.meta.allocation : 0;
            const w = weightOf(c);
            const warn = w < WARN_THRESHOLD;
            return (
              <Box key={c.id} sx={{ opacity: warn ? 0.58 : 1 }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 0.75,
                    mb: 0.4,
                  }}
                >
                  {c.symbol && (
                    <EntitySymbol
                      name={c.symbol}
                      color={c.symbolColor ?? "slate"}
                      size={14}
                    />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      flex: 1,
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {alloc ? `${alloc}%` : "–"}
                  </Typography>
                  <Chip
                    size="small"
                    label={w}
                    sx={{
                      height: 15,
                      fontSize: 9,
                      fontWeight: 700,
                      bgcolor: alpha(weightColor(w), 0.12),
                      color: weightColor(w),
                      "& .MuiChip-label": { px: 0.65 },
                    }}
                  />
                </Stack>
                {alloc > 0 && (
                  <Box
                    sx={{
                      height: 5,
                      borderRadius: 3,
                      bgcolor: alpha(weightColor(w), 0.1),
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${alloc}%`,
                        height: "100%",
                        bgcolor: alpha(weightColor(w), 0.62),
                        borderRadius: 3,
                        transition: "width 0.25s ease",
                      }}
                    />
                  </Box>
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Campaign rows */}
      <Stack spacing={0.75}>
        {campaigns.map((c, i) => {
          const w = weightOf(c);
          const warn = w < WARN_THRESHOLD;
          const alloc =
            typeof c.meta?.allocation === "number" ? c.meta.allocation : 0;
          const children = state.relationships.filter(
            (r: Relationship) =>
              r.toId === c.id && r.relationType === "child-of",
          ).length;

          return (
            <Stack
              key={c.id}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 0.75,
                px: 1,
                py: 0.85,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                opacity: warn ? 0.6 : 1,
                transition: "opacity 140ms",
                "&:hover": { opacity: 1 },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  width: 20,
                  textAlign: "center",
                  fontWeight: 800,
                  color: "text.disabled",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </Typography>
              {c.symbol && (
                <EntitySymbol
                  name={c.symbol}
                  color={c.symbolColor ?? "slate"}
                  size={18}
                />
              )}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {children} items
                  {alloc ? ` · ${alloc}% allocation` : ""}
                </Typography>
              </Box>
              <DualWeightBar weight={w} />
              <Typography
                variant="caption"
                sx={{
                  width: 22,
                  textAlign: "right",
                  fontWeight: 800,
                  color: weightColor(w),
                  flexShrink: 0,
                }}
              >
                {w}
              </Typography>
              <Box
                sx={{
                  pl: 0.5,
                  borderLeft: "1px solid",
                  borderColor: "divider",
                }}
              >
                <WeightControl entity={c} />
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

/* ─── PrioritiesView ─────────────────────────────────────────────────────── */

export function PrioritiesView() {
  const theme = useTheme();
  const { store, state } = useCommandCenter();

  const [scope, setScope] = React.useState<ScopeType>("items");
  const [displayMode, setDisplayMode] = React.useState<DisplayModeType>("list");
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);

  const allEntities = React.useMemo(() => store.allEntities(), [store]);

  const campaignIndex = React.useMemo(
    () => buildCampaignIndex(allEntities, state.relationships),
    [allEntities, state.relationships],
  );

  const items = React.useMemo(
    () =>
      allEntities
        .filter(
          (e) =>
            e.type !== "legend" &&
            e.type !== "priority" &&
            e.type !== "campaign",
        )
        .sort((a, b) => weightOf(b) - weightOf(a)),
    [allEntities],
  );

  /** Distinct statuses present in the current item set — drives the filter chips. */
  const availableStatuses = React.useMemo(
    () => [...new Set(items.map((e) => statusOf(e)))],
    [items],
  );

  const filteredItems = React.useMemo(
    () =>
      statusFilter.length === 0
        ? items
        : items.filter((e) => statusFilter.includes(statusOf(e))),
    [items, statusFilter],
  );

  const toggleStatus = React.useCallback((s: string) => {
    setStatusFilter((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }, []);

  const spread = React.useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 };
    for (const e of items) {
      const w = weightOf(e);
      if (w >= 70) counts.high++;
      else if (w >= 40) counts.medium++;
      else counts.low++;
    }
    return counts;
  }, [items]);

  return (
    <Panel
      title="Weight"
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <WeightGlyph size={18} />
        </Box>
      }
      action={
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
          <Chip
            size="small"
            label={`${spread.high} high`}
            sx={{
              height: 18,
              fontWeight: 700,
              fontSize: 9.5,
              bgcolor: alpha("#EF4444", 0.12),
              color: "#EF4444",
            }}
          />
          <Chip
            size="small"
            label={`${spread.medium} med`}
            sx={{
              height: 18,
              fontWeight: 700,
              fontSize: 9.5,
              bgcolor: alpha("#F59E0B", 0.12),
              color: "#F59E0B",
            }}
          />
          <Chip
            size="small"
            label={`${spread.low} low`}
            sx={{
              height: 18,
              fontWeight: 700,
              fontSize: 9.5,
              bgcolor: alpha("#64748b", 0.1),
              color: "#64748b",
            }}
          />
        </Stack>
      }
    >
      {/* Toolbar: scope tabs + display mode toggle */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          mb: 1.25,
          gap: 1,
        }}
      >
        <ScopeToggle<ScopeType>
          value={scope}
          options={["projects", "items"]}
          onChange={setScope}
        />

        {scope === "items" && (
          <Box sx={{ ml: "auto" }}>
            <ScopeToggle<DisplayModeType>
              value={displayMode}
              options={["list", "grid"]}
              onChange={setDisplayMode}
              icon={(m) =>
                m === "list" ? (
                  <ViewListRoundedIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ViewModuleRoundedIcon sx={{ fontSize: 16 }} />
                )
              }
            />
          </Box>
        )}
      </Stack>

      {/* Status filter — only shown in Items scope */}
      {scope === "items" && availableStatuses.length > 0 && (
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
            flexWrap: "wrap",
            mb: 1,
          }}
        >
          {/* "All" clear pill */}
          <Box
            onClick={() => setStatusFilter([])}
            sx={{
              px: 0.9,
              py: 0.25,
              borderRadius: 1,
              cursor: "pointer",
              fontSize: 10.5,
              fontWeight: statusFilter.length === 0 ? 800 : 500,
              color:
                statusFilter.length === 0 ? "primary.main" : "text.disabled",
              bgcolor:
                statusFilter.length === 0
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
              border: "1px solid",
              borderColor:
                statusFilter.length === 0
                  ? alpha(theme.palette.primary.main, 0.3)
                  : "divider",
              userSelect: "none",
              transition: "all 120ms ease",
            }}
          >
            All
          </Box>

          {availableStatuses.map((s) => {
            const active = statusFilter.includes(s);
            const color = STATUS_COLOR[s] ?? "#64748b";
            return (
              <Box
                key={s}
                onClick={() => toggleStatus(s)}
                sx={{
                  px: 0.9,
                  py: 0.25,
                  borderRadius: 1,
                  cursor: "pointer",
                  fontSize: 10.5,
                  fontWeight: active ? 800 : 500,
                  color: active ? color : "text.secondary",
                  bgcolor: active ? alpha(color, 0.12) : "transparent",
                  border: "1px solid",
                  borderColor: active ? alpha(color, 0.35) : "divider",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.4,
                  textTransform: "capitalize",
                  userSelect: "none",
                  transition: "all 120ms ease",
                  "&:hover": { bgcolor: alpha(color, 0.08) },
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: color,
                    flexShrink: 0,
                  }}
                />
                {s}
              </Box>
            );
          })}

          {statusFilter.length > 0 && (
            <Typography variant="caption" sx={{ color: "text.disabled", ml: 0.5 }}>
              {filteredItems.length} of {items.length}
            </Typography>
          )}
        </Stack>
      )}

      {/* Content */}
      {scope === "projects" ? (
        <ProjectsView />
      ) : displayMode === "list" ? (
        <Stack spacing={0.75}>
          {filteredItems.map((e, i) => (
            <ItemRow
              key={e.id}
              entity={e}
              rank={i + 1}
              campaign={campaignIndex.get(e.id)}
            />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            alignContent: "start",
          }}
        >
          {filteredItems.map((e, i) => (
            <ItemCard
              key={e.id}
              entity={e}
              rank={i + 1}
              campaign={campaignIndex.get(e.id)}
            />
          ))}
        </Box>
      )}
    </Panel>
  );
}
