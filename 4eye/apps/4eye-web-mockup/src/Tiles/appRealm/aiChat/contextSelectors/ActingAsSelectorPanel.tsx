"use client";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { COLOR_MAP, type SymbolName } from "@4eye/types";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { ContextSelectorPanel } from "./ContextSelectorPanel";
import { SoftGoalGlyph } from "./SoftGoalGlyph";
import { ACTING_AS_ACCENT } from "./tokens";
import {
  ACTING_AS_DEFAULT,
  MAX_SELECTED_ROLES,
  type ActingAsRole,
} from "./actingAsRoles";
import { ActiveGoalsSelect } from "./ActingAsGoalsBlock";

function RoleMark({ symbol, color }: { symbol: SymbolName; color: string }) {
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        bgcolor: `${color}22`,
        border: "1px solid",
        borderColor: `${color}55`,
      }}
    >
      <SoftGoalGlyph symbol={symbol} color="slate" size={16} />
    </Box>
  );
}

function RoleRow({
  role,
  selected,
  disabled,
  onToggle,
}: {
  role: ActingAsRole;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const hex = COLOR_MAP[role.symbolColor];
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onToggle()}
      onKeyDown={(e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          onToggle();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 1,
        py: 0.75,
        borderRadius: 1.5,
        cursor: disabled ? "not-allowed" : "pointer",
        bgcolor: selected ? "rgba(251,146,60,0.16)" : "transparent",
        border: "1px solid",
        borderColor: selected ? "rgba(251,146,60,0.45)" : "transparent",
        opacity: disabled ? 0.4 : 1,
        transition: "background-color 120ms, border-color 120ms",
        "&:hover": {
          bgcolor: disabled
            ? undefined
            : selected
              ? "rgba(251,146,60,0.24)"
              : "rgba(255,255,255,0.04)",
        },
      }}
    >
      <RoleMark symbol={role.symbol} color={hex} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "rgba(255,255,255,0.92)", lineHeight: 1.2 }}
        >
          {role.cypher ? (
            <MorphLabel
              motion="scramble"
              words={role.cypher}
              color="inherit"
              active={hovered}
              maxPasses={null}
              hold={900}
              fontSize="0.875rem"
              weight={600}
              letterSpacing={0.3}
            />
          ) : (
            role.label
          )}
        </Typography>
        {role.hint && (
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.25,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {role.hint}
          </Typography>
        )}
      </Box>
      {selected && (
        <CheckRoundedIcon fontSize="small" sx={{ color: ACTING_AS_ACCENT, flex: "0 0 auto" }} />
      )}
    </Box>
  );
}

export function ActingAsRoleList({
  equipped,
  selectedIds,
  onToggle,
}: {
  equipped: ActingAsRole[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const selected = new Set(selectedIds);
  const canSelectMore = selected.size < MAX_SELECTED_ROLES;

  const renderGroup = (label: string, roles: ActingAsRole[]) => (
    <Box sx={{ mb: 0.75 }}>
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          px: 1,
          py: 0.5,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
        {roles.length === 0 ? (
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.4)", px: 1, py: 0.75 }}
          >
            None equipped
          </Typography>
        ) : (
          roles.map((role) => {
            const isOn = selected.has(role.id);
            return (
              <RoleRow
                key={role.id}
                role={role}
                selected={isOn}
                disabled={!isOn && !canSelectMore}
                onToggle={() => onToggle(role.id)}
              />
            );
          })
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {renderGroup("Default", ACTING_AS_DEFAULT)}
      {renderGroup("Equipped", equipped)}
    </>
  );
}

interface ActingAsSelectorPanelViewProps {
  equipped: ActingAsRole[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClose: () => void;
}

export function ActingAsSelectorPanelView({
  equipped,
  selectedIds,
  onToggle,
  onClose,
}: ActingAsSelectorPanelViewProps) {
  return (
    <ContextSelectorPanel
      title="Acting as"
      subtitle="Pick up to 3 roles for this session"
      onClose={onClose}
      headerRight={
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.55)",
            fontVariantNumeric: "tabular-nums",
            mr: 0.5,
          }}
        >
          {selectedIds.length} / {MAX_SELECTED_ROLES}
        </Typography>
      }
    >
      <Stack sx={{ gap: 1.25 }}>
        <ActingAsRoleList
          equipped={equipped}
          selectedIds={selectedIds}
          onToggle={onToggle}
        />
        <ActiveGoalsSelect accent={ACTING_AS_ACCENT} />
      </Stack>
    </ContextSelectorPanel>
  );
}
