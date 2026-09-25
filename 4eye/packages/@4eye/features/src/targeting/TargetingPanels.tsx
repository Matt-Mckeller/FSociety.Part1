"use client";

import { useState } from "react";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Typography,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  INCLUDED_CAST_META,
  TARGET_ROLE_META,
  type Target,
  type TargetAssignment,
  type TargetRole,
} from "@4eye/types";
import { useContextData } from "../context-data";
import { useTargeting } from "./TargetingContext";
import { ROLE_RADIUS, TargetingChip } from "./TargetingChip";
import { AimReticle } from "./CastMarks";

export interface TargetingPanelViewProps {
  role: TargetRole;
  assigned: Array<{ assignment: TargetAssignment; target: Target }>;
  available: Target[];
  onAdd: (targetId: string) => void;
  onRemove: (assignmentId: string) => void;
  compact?: boolean;
  /**
   * Targets riding along without being the aim. Only meaningful on
   * the target (Aim) column — actors don't have an included lane.
   */
  included?: Target[];
  onExcludeIncluded?: (targetId: string) => void;
}

/**
 * Actor or Aim column flanking the composer.
 * Silhouette follows the role: left-heavy for who acts, right-heavy
 * for the cursor. The first aimed target carries the primary reticle;
 * included chips sit quieter underneath when the cursor is elsewhere.
 */
export function TargetingPanelView({
  role,
  assigned,
  available,
  onAdd,
  onRemove,
  compact = true,
  included = [],
  onExcludeIncluded,
}: TargetingPanelViewProps) {
  const meta = TARGET_ROLE_META[role];
  const radius = ROLE_RADIUS[role];
  const isAim = role === "target";
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleToggleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prev) => (prev ? null : e.currentTarget));
  };
  const handlePick = (targetId: string) => {
    onAdd(targetId);
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 0.75,
          p: 1.15,
          width: compact ? 144 : 188,
          minHeight: compact ? 152 : 160,
          bgcolor: alpha(meta.color, 0.08),
          border: `1px solid ${alpha(meta.color, 0.38)}`,
          borderRadius: radius,
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: meta.color,
            fontWeight: 800,
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 0.5,
            px: 0.25,
          }}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4, minWidth: 0 }}>
            {isAim && <AimReticle sx={{ fontSize: 12, color: meta.color }} />}
            {isAim ? meta.actionLabel : meta.pluralLabel}
          </Box>
          {assigned.length > 0 && (
            <Box
              component="span"
              aria-label={`${assigned.length} assigned`}
              sx={{
                minWidth: 16,
                height: 16,
                px: 0.5,
                borderRadius: radius,
                bgcolor: meta.color,
                color: "#fff",
                fontSize: "0.58rem",
                fontWeight: 800,
                lineHeight: "16px",
                textAlign: "center",
                letterSpacing: 0,
              }}
            >
              {assigned.length}
            </Box>
          )}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 0.45,
            flex: 1,
          }}
        >
          {assigned.map(({ assignment, target }, index) => (
            <TargetingChip
              key={assignment.id}
              target={target}
              role={role}
              labeled
              emphasis={isAim ? (index === 0 ? "primary" : "aim") : undefined}
              onRemove={() => onRemove(assignment.id)}
            />
          ))}

          {assigned.length === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 0.25,
                py: 0.15,
              }}
            >
              {isAim && (
                <AimReticle sx={{ fontSize: 13, color: alpha(meta.color, 0.45) }} />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: alpha(meta.color, 0.7),
                  fontStyle: "italic",
                  fontSize: "0.62rem",
                }}
              >
                {meta.emptyLabel}
              </Typography>
            </Box>
          )}

          {isAim && included.length > 0 && (
            <Box sx={{ mt: 0.35, pt: 0.5, borderTop: `1px dashed ${alpha(INCLUDED_CAST_META.color, 0.45)}` }}>
              <Typography
                variant="caption"
                sx={{
                  color: INCLUDED_CAST_META.color,
                  fontWeight: 800,
                  fontSize: "0.52rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  mb: 0.4,
                  px: 0.25,
                }}
              >
                {INCLUDED_CAST_META.label}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
                {included.map((target) => (
                  <TargetingChip
                    key={target.id}
                    target={target}
                    role="target"
                    labeled
                    emphasis="include"
                    onRemove={
                      onExcludeIncluded
                        ? () => onExcludeIncluded(target.id)
                        : undefined
                    }
                  />
                ))}
              </Box>
            </Box>
          )}

          <IconButton
            size="small"
            onClick={handleToggleAdd}
            disabled={available.length === 0}
            aria-label={isAim ? "Add aim" : `Add ${meta.label}`}
            sx={{
              alignSelf: role === "target" ? "flex-end" : "flex-start",
              width: 24,
              height: 24,
              mt: "auto",
              color: meta.color,
              borderRadius: radius,
              border: `1px dashed ${alpha(meta.color, 0.5)}`,
              "&:hover": { bgcolor: alpha(meta.color, 0.12) },
              "&.Mui-disabled": { opacity: 0.35, color: meta.color },
            }}
          >
            <AddRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </Box>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={role === "actor" ? "right-end" : "left-end"}
        sx={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Paper
            sx={{
              ml: role === "actor" ? 1 : 0,
              mr: role === "target" ? 1 : 0,
              p: 1,
              maxWidth: 260,
              bgcolor: "background.paper",
              backdropFilter: "blur(12px)",
              border: `1px solid ${alpha(meta.color, 0.4)}`,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: meta.color,
                fontWeight: 800,
                display: "block",
                mb: 0.75,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {isAim ? "Aim at" : `Add ${meta.label}`}
            </Typography>
            {available.length === 0 ? (
              <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                No targets available
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                {available.map((target) => (
                  <TargetingChip
                    key={target.id}
                    target={target}
                    role={role}
                    labeled
                    emphasis={isAim ? "aim" : undefined}
                    onSelect={() => handlePick(target.id)}
                  />
                ))}
              </Box>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

interface TargetingRolePanelProps {
  role: TargetRole;
  compact?: boolean;
}

export function TargetingRolePanel({
  role,
  compact = true,
}: TargetingRolePanelProps) {
  const { targets } = useContextData();
  const {
    resolvedActors,
    resolvedTargets,
    addAssignment,
    removeAssignment,
    isAssigned,
  } = useTargeting();

  const assigned = role === "actor" ? resolvedActors : resolvedTargets;
  const available = targets.filter((t) => !isAssigned(role, t.id));

  return (
    <TargetingPanelView
      role={role}
      assigned={assigned}
      available={available}
      onAdd={(targetId) => addAssignment(role, targetId)}
      onRemove={(assignmentId) => removeAssignment(role, assignmentId)}
      compact={compact}
    />
  );
}

export function ActorPanel(props: Omit<TargetingRolePanelProps, "role">) {
  return <TargetingRolePanel {...props} role="actor" />;
}

export function TargetPanel(props: Omit<TargetingRolePanelProps, "role">) {
  return <TargetingRolePanel {...props} role="target" />;
}
