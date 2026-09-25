"use client";

/**
 * Command Center — Inspector modal.
 *
 * One reusable full-screen entity inspector, opened from any view via the
 * Inspect action. It renders an entity's identity, live-editable traits
 * (status / weight / depth), its place in the hierarchy (parent + children),
 * and its goal links. Designed to be promoted to `@expanse/hud` later.
 */

import * as React from "react";
import {
  Box,
  Chip,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import { Symbol } from "@4eye/features";
import { getTrait, rankLabel, type Entity, type WorkPayload } from "@4eye/types";

import { useCommandCenter } from "../store/CommandCenterProvider";
import { CREW, assignmentConfigFor } from "../store/crew";
import {
  WeightMeter,
  DepthDots,
  StatusBadge,
  VersionTimeline,
  formatDate,
} from "../../entity-tile/components/slot-visuals";
import {
  DepthControl,
  StatusControl,
  WeightControl,
  pointsOf,
  dueOf,
  summaryOf,
} from "./EntityControls";
import { CrewAvatar } from "./CrewAvatar";

/** A labelled row used inside the inspector body. */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1.5,
        py: 0.5,
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.3, minWidth: 80 }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{children}</Box>
    </Stack>
  );
}

/** Compact related-entity chip that re-targets the inspector. */
function RelatedChip({ entity }: { entity: Entity }) {
  const { inspect } = useCommandCenter();
  return (
    <Chip
      size="small"
      icon={
        entity.symbol ? (
          <Box sx={{ display: "flex", pl: 0.5 }}>
            <Symbol name={entity.symbol} color={entity.symbolColor ?? "slate"} size={14} />
          </Box>
        ) : undefined
      }
      label={entity.name}
      onClick={() => inspect(entity.id)}
      sx={{
        fontWeight: 600,
        maxWidth: 220,
        "& .MuiChip-label": { textOverflow: "ellipsis" },
      }}
    />
  );
}

export function Inspector() {
  const theme = useTheme();
  const { state, store, inspected, inspect, assignmentsFor } = useCommandCenter();

  const open = Boolean(inspected);

  // Resolve hierarchy context for the inspected entity.
  const { parent, children } = React.useMemo(() => {
    if (!inspected) return { parent: undefined, children: [] as Entity[] };
    const parentEdge = state.relationships.find((r) => r.toId === inspected.id);
    const parentEntity = parentEdge
      ? store.getEntity(parentEdge.fromId)
      : undefined;
    const kids = store
      .edgesFrom(inspected.id)
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((r) => store.getEntity(r.toId))
      .filter((e): e is Entity => Boolean(e));
    return { parent: parentEntity, children: kids };
  }, [inspected, state.relationships, store]);

  const goalLinks = React.useMemo(
    () => (inspected ? store.goalLinksFor(inspected.id) : []),
    [inspected, store],
  );

  const assignments = React.useMemo(
    () => (inspected ? assignmentsFor(inspected.id) : []),
    [inspected, assignmentsFor],
  );

  if (!inspected) return null;

  const config = assignmentConfigFor(inspected.type);

  const work = inspected.meta?.work as WorkPayload | undefined;
  const rankText = work
    ? rankLabel(work.rank, state.viewMode) +
      (work.category ? ` · ${work.category}` : "")
    : inspected.type;
  const accent = theme.palette.primary.main;
  const points = pointsOf(inspected);
  const due = dueOf(inspected);
  const summary = summaryOf(inspected);
  const statusNote = inspected.meta?.statusNote;
  const hasDepth = getTrait(inspected.traits, "depth") != null;
  const progress = getTrait(inspected.traits, "progress");

  return (
    <Dialog
      open={open}
      onClose={() => inspect(undefined)}
      maxWidth="tablet"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha(accent, 0.25),
            backgroundImage: "none",
            maxWidth: 480,
          },
        },
      }}
    >
      {/* Header */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          background: `linear-gradient(135deg, ${alpha(accent, 0.12)}, transparent)`,
        }}
      >
        {inspected.symbol && (
          <Symbol
            name={inspected.symbol}
            color={inspected.symbolColor ?? "slate"}
            size={34}
          />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
            {inspected.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", textTransform: "capitalize", fontWeight: 600 }}
          >
            {rankText}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => inspect(undefined)}
          aria-label="Close inspector"
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      <Divider />

      {/* Body */}
      <Stack spacing={1.5} sx={{ p: 2 }}>
        {summary && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {summary}
          </Typography>
        )}

        {progress && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(accent, 0.2),
              bgcolor: alpha(accent, 0.04),
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.3, display: "block", mb: 0.5 }}
            >
              PROGRESS & VERSIONS
            </Typography>
            <VersionTimeline progress={progress} />
          </Box>
        )}

        <Box
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
            overflow: "hidden",
            "& > *:not(:last-child)": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <Box sx={{ px: 1.5 }}>
            <Field label="STATUS">
              <StatusBadge status={getTrait(inspected.traits, "status")?.value ?? "idea"} />
              <StatusControl entity={inspected} />
            </Field>
          </Box>
          <Box sx={{ px: 1.5 }}>
            <Field label="WEIGHT">
              <WeightMeter weight={getTrait(inspected.traits, "weight")?.value ?? 0} />
              <WeightControl entity={inspected} />
            </Field>
          </Box>
          {hasDepth && (
            <Box sx={{ px: 1.5 }}>
              <Field label="DEPTH">
                <DepthDots depth={getTrait(inspected.traits, "depth")?.value ?? 1} />
                <DepthControl entity={inspected} />
              </Field>
            </Box>
          )}
          {points != null && (
            <Box sx={{ px: 1.5 }}>
              <Field label="ESTIMATE">
                <Chip
                  size="small"
                  label={`${points} pts`}
                  sx={{ fontWeight: 700, bgcolor: alpha(accent, 0.1), color: accent }}
                />
              </Field>
            </Box>
          )}
          {due != null && (
            <Box sx={{ px: 1.5 }}>
              <Field label="DUE">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {formatDate(due)}
                </Typography>
              </Field>
            </Box>
          )}
        </Box>

        {typeof statusNote === "string" && (
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: alpha(accent, 0.06),
              border: "1px solid",
              borderColor: alpha(accent, 0.18),
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              CURRENT STATUS
            </Typography>
            <Typography variant="body2">{statusNote}</Typography>
          </Box>
        )}

        {/* Hierarchy */}
        {(parent || children.length > 0) && <Divider />}
        {parent && (
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <NorthRoundedIcon sx={{ fontSize: 13 }} /> PARENT
            </Typography>
            <Box sx={{ mt: 0.75 }}>
              <RelatedChip entity={parent} />
            </Box>
          </Box>
        )}
        {children.length > 0 && (
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              {children.length} {children.length === 1 ? "CHILD" : "CHILDREN"}
            </Typography>
            <Stack
              sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75, mt: 0.75 }}
            >
              {children.map((c) => (
                <RelatedChip key={c.id} entity={c} />
              ))}
            </Stack>
          </Box>
        )}

        {/* Goal links */}
        {goalLinks.length > 0 && (
          <>
            <Divider />
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                GOAL ALIGNMENT
              </Typography>
              <Stack spacing={0.75} sx={{ mt: 0.75 }}>
                {goalLinks.map((g) => (
                  <Stack
                    key={g.id}
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "text.secondary", minWidth: 0 }}>
                      {g.note ?? store.getEntity(g.goalId)?.name ?? "North-star"}
                    </Typography>
                    <WeightMeter weight={g.weight} />
                  </Stack>
                ))}
              </Stack>
            </Box>
          </>
        )}

        {/* Assignment history */}
        {assignments.length > 0 && (
          <>
            <Divider />
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                ASSIGNMENTS
              </Typography>
              <Stack spacing={0.75} sx={{ mt: 0.75 }}>
                {assignments.map((a) => {
                  const member = CREW.find((m) => m.id === a.profileId);
                  const stateLabel =
                    a.state === "offered"  ? config.stateLabels.offered :
                    a.state === "accepted" ? config.stateLabels.accepted :
                    a.state === "declined" ? config.stateLabels.declined :
                    config.stateLabels.done;
                  const stateColor =
                    a.state === "offered"  ? "#f59e0b" :
                    a.state === "accepted" ? "#22c55e" :
                    a.state === "declined" ? "#ef4444" : "#64748b";

                  return (
                    <Stack
                      key={a.profileId}
                      direction="row"
                      sx={{ alignItems: "center", gap: 1 }}
                    >
                      {member && <CrewAvatar member={member} size={22} />}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {member?.name ?? a.profileId}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.disabled" }}>
                          {new Date(a.assignedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        size="small"
                        label={stateLabel}
                        sx={{
                          height: 18,
                          fontSize: 10,
                          fontWeight: 800,
                          color: stateColor,
                          bgcolor: alpha(stateColor, 0.12),
                          border: "1px solid",
                          borderColor: alpha(stateColor, 0.3),
                          "& .MuiChip-label": { px: 0.75 },
                        }}
                      />
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </Dialog>
  );
}
