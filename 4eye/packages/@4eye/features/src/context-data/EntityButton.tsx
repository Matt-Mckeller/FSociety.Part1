"use client";

import { Badge, Chip, IconButton, Tooltip } from "@mui/material";
import type { SelectedContextKey } from "@4eye/types";
import { ENTITY_KIND_BY_KEY } from "./entityKinds";
import { useContextData } from "./ContextDataContext";

interface EntityButtonProps {
  kind: SelectedContextKey;
  onClick?: (kind: SelectedContextKey) => void;
  /** Compact = icon-only square button (label moves to the tooltip). */
  compact?: boolean;
}

/**
 * EntityButton — single button representing one entity kind
 * (Targets / Audiences / etc). Shows a badge with the current
 * selection count. Click delegates to the parent for opening the
 * detail panel/drawer.
 *
 * `compact` renders an icon-only square button so a grouped bar stays
 * dense; the full label is preserved in the tooltip.
 */
export function EntityButton({ kind, onClick, compact }: EntityButtonProps) {
  const { selectedContext } = useContextData();
  const meta = ENTITY_KIND_BY_KEY[kind];
  const count = selectedContext[kind].length;
  const Icon = meta.Icon as React.ComponentType;
  const active = count > 0;

  if (compact) {
    return (
      <Tooltip title={`Select ${meta.label}`} arrow>
        <Badge
          badgeContent={count}
          sx={{ "& .MuiBadge-badge": { bgcolor: meta.color, fontSize: 9, minWidth: 16, height: 16 } }}
        >
          <IconButton
            size="small"
            onClick={() => onClick?.(kind)}
            sx={{
              p: 0.5,
              borderRadius: 1.5,
              bgcolor: active ? `${meta.color}20` : "transparent",
              border: `1px solid ${active ? meta.color : "rgba(255,255,255,0.18)"}`,
              color: active ? meta.color : "rgba(255,255,255,0.7)",
              "&:hover": { borderColor: meta.color, bgcolor: `${meta.color}14` },
            }}
          >
            <Icon />
          </IconButton>
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={`Select ${meta.label}`} arrow>
      <Badge
        badgeContent={count}
        color="primary"
        sx={{
          "& .MuiBadge-badge": { bgcolor: meta.color, fontSize: 10 },
        }}
      >
        <Chip
          icon={<Icon />}
          label={meta.label}
          size="small"
          onClick={() => onClick?.(kind)}
          sx={{
            bgcolor: count > 0 ? `${meta.color}20` : "transparent",
            border: `1px solid ${count > 0 ? meta.color : "rgba(255,255,255,0.2)"}`,
            color: count > 0 ? meta.color : "rgba(255,255,255,0.75)",
            cursor: "pointer",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      </Badge>
    </Tooltip>
  );
}
