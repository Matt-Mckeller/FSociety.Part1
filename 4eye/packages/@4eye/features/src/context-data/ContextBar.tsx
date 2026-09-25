"use client";

import { Box, Chip, Divider, IconButton, Paper, Tooltip, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { SelectedContextKey } from "@4eye/types";
import { ENTITY_KINDS, ENTITY_KIND_GROUPS, type EntityKindMeta } from "./entityKinds";
import { useContextData } from "./ContextDataContext";
import { EntityButton } from "./EntityButton";
import { Symbol } from "../symbols";

// ─── Styled ──────────────────────────────────────────────────────────────────

const Bar = styled(Paper)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: 8,
  flexWrap: "wrap",
  background: "rgba(25, 25, 30, 0.9)",
  borderRadius: 8,
  border: "1px solid rgba(255, 255, 255, 0.08)",
});

const GroupCluster = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 4px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.06)",
});

const GroupLabel = styled(Typography)({
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginRight: 2,
  userSelect: "none",
});

const ChipsArea = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
  flex: 1,
  minWidth: 100,
});

const EmptyLabel = styled(Typography)({
  color: "rgba(255,255,255,0.4)",
  fontStyle: "italic",
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContextBarProps {
  /** Called when the user clicks an entity-kind button (Targets, etc.) */
  onOpenKind?: (kind: SelectedContextKey) => void;
}

type EntityRow = { id: string; name: string; symbol: string; symbolColor: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function entityChipSx(color: string) {
  return {
    bgcolor: `${color}15`,
    border: `1px solid ${color}`,
    color,
    "& .MuiChip-deleteIcon": { color },
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ContextBar — horizontal toolbar showing one EntityButton per kind
 * plus chips for everything currently selected. Pure view; reads from
 * `useContextData` and delegates kind-clicks upward via `onOpenKind`.
 */
export function ContextBar({ onOpenKind }: ContextBarProps) {
  const { selectedContext, toggleSelect, clearSelectedContext, totalSelected, getById } =
    useContextData();

  const selectedChips = ENTITY_KINDS.flatMap((kind) =>
    selectedContext[kind.key]
      .map((id) => ({ id, kind, entity: getById(kind.key, id) as EntityRow | undefined }))
      .filter((item): item is { id: string; kind: EntityKindMeta; entity: EntityRow } =>
        Boolean(item.entity),
      ),
  );

  return (
    <Bar elevation={0}>
      {ENTITY_KIND_GROUPS.map((group) => (
        <GroupCluster key={group.key} sx={{ borderColor: `${group.color}33` }}>
          <GroupLabel>{group.label}</GroupLabel>
          {group.kinds.map((k) => (
            <EntityButton key={k} kind={k} onClick={onOpenKind} compact />
          ))}
        </GroupCluster>
      ))}

      <Divider orientation="vertical" flexItem sx={{ bgcolor: "rgba(255,255,255,0.1)", mx: 0.5 }} />

      <ChipsArea>
        {totalSelected === 0 ? (
          <EmptyLabel variant="caption">No context selected</EmptyLabel>
        ) : (
          selectedChips.map(({ id, kind, entity }) => (
            <Chip
              key={`${kind.key}-${id}`}
              size="small"
              label={entity.name}
              onDelete={() => toggleSelect(kind.key, id)}
              icon={
                <Symbol
                  // @ts-expect-error — entity.symbol is SymbolName at runtime
                  name={entity.symbol}
                  // @ts-expect-error — entity.symbolColor is SymbolColor at runtime
                  color={entity.symbolColor}
                  size={18}
                  variant="ghost"
                />
              }
              sx={entityChipSx(kind.color)}
            />
          ))
        )}
      </ChipsArea>

      {totalSelected > 0 && (
        <Tooltip title="Clear all context" arrow>
          <IconButton
            size="small"
            onClick={clearSelectedContext}
            sx={{ color: "rgba(255,255,255,0.6)" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Bar>
  );
}
