"use client";

import { Box, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LockIcon from "@mui/icons-material/Lock";
import TuneIcon from "@mui/icons-material/Tune";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useDomain } from "@4eye/features";
import type { DomainConfig, DomainType } from "@4eye/types";
import { ContextSelectorPanel } from "./ContextSelectorPanel";

const ICONS: Record<string, React.ComponentType> = {
  GridView: GridViewIcon,
  School: SchoolIcon,
  Work: WorkIcon,
  Favorite: FavoriteIcon,
  SportsEsports: SportsEsportsIcon,
  Lock: LockIcon,
  Tune: TuneIcon,
};

interface DomainSelectorPanelViewProps {
  domains: DomainConfig[];
  currentDomain: DomainType;
  onSelect: (id: DomainType) => void;
  onClose: () => void;
}

/**
 * Presentational variant — use when the panel renders outside the
 * AiChat provider tree (e.g. in a Popper portal at the HUD slot).
 */
export function DomainSelectorPanelView({
  domains,
  currentDomain,
  onSelect,
  onClose,
}: DomainSelectorPanelViewProps) {
  const handleSelect = (id: DomainType) => {
    onSelect(id);
    onClose();
  };

  return (
    <ContextSelectorPanel title="Domain" subtitle="Pick a focus" onClose={onClose}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {domains.map((d) => {
          const Icon = ICONS[d.icon] ?? GridViewIcon;
          const active = d.id === currentDomain;
          return (
            <Box
              key={d.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(d.id)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(d.id);
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: 1,
                py: 0.75,
                borderRadius: 1.5,
                cursor: "pointer",
                bgcolor: active ? `${d.color}22` : "transparent",
                border: "1px solid",
                borderColor: active ? `${d.color}66` : "transparent",
                transition: "background-color 120ms, border-color 120ms",
                "&:hover": {
                  bgcolor: active ? `${d.color}33` : "rgba(255,255,255,0.04)",
                },
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: `${d.color}26`,
                  color: d.color,
                  flex: "0 0 auto",
                }}
              >
                <Icon />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: active ? d.color : "rgba(255,255,255,0.92)",
                    lineHeight: 1.2,
                  }}
                >
                  {d.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.2,
                  }}
                >
                  {d.description}
                </Typography>
              </Box>
              {active && (
                <CheckRoundedIcon
                  fontSize="small"
                  sx={{ color: d.color, flex: "0 0 auto" }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </ContextSelectorPanel>
  );
}

interface DomainSelectorPanelProps {
  onClose: () => void;
}

/**
 * DomainSelectorPanel — connected wrapper. Use only when rendered
 * inside an active DomainProvider.
 */
export function DomainSelectorPanel({ onClose }: DomainSelectorPanelProps) {
  const { currentDomain, domains, setDomain } = useDomain();
  return (
    <DomainSelectorPanelView
      domains={domains}
      currentDomain={currentDomain}
      onSelect={setDomain}
      onClose={onClose}
    />
  );
}
