"use client";

/**
 * MapSectionSwitcher — compact pill that sits in the top strip of the
 * map overlay, mirroring the MapSwitcher pill on the opposite side.
 *
 * Shows the currently active right-panel section ("Next Best Actions")
 * and exposes a dropdown listing all section types it can switch to.
 * Selection is controlled: picking an option calls `onSectionChange`,
 * which the map overlay uses to swap the right-panel content.
 *
 * Naming rationale: mirrors `MapSwitcher` (realm picker) on the left —
 * `MapSectionSwitcher` (panel picker) on the right.
 */

import { useState, useRef, useEffect } from "react";
import { Box, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// ─── Section registry ─────────────────────────────────────────────────────────

export const MAP_SECTION_OPTIONS = [
  { id: "explore",           label: "Explore",           description: "Discover what each area does" },
  { id: "setup",             label: "Setup",             description: "Configure each area" },
  { id: "goals",             label: "Goals",             description: "Active goals and milestones" },
  { id: "features",          label: "Features",          description: "Things you'll likely care about" },
  { id: "problems",          label: "Problems",          description: "Pain points 4eye helps with" },
  { id: "leaderboard",       label: "Leaderboard",       description: "Rankings and achievements" },
  { id: "achievements",      label: "Achievements",      description: "Unlocked rewards and badges" },
  { id: "quick-stats",       label: "Quick Stats",       description: "XP, score, and streak at a glance" },
] as const;

export type MapSectionId = (typeof MAP_SECTION_OPTIONS)[number]["id"];

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MapSectionSwitcherProps {
  /** Currently active section. Defaults to "explore". */
  activeSection?: MapSectionId;
  /** Called when the user picks a different section. */
  onSectionChange?: (section: MapSectionId) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MapSectionSwitcher({
  activeSection = "explore",
  onSectionChange,
}: MapSectionSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const active = MAP_SECTION_OPTIONS.find((o) => o.id === activeSection) ?? MAP_SECTION_OPTIONS[0];

  const handleSelect = (id: MapSectionId) => {
    setOpen(false);
    if (id !== activeSection) onSectionChange?.(id);
  };

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Box ref={containerRef} sx={{ position: "relative" }}>
      {/* ── Pill trigger ───────────────────────────────────────────────────── */}
      <Box
        component="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Switch section — current: ${active.label}`}
        aria-expanded={open}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.25,
          py: 0.45,
          borderRadius: 999,
          bgcolor: open ? "rgba(15,23,42,0.94)" : "rgba(15,23,42,0.86)",
          border: "1px solid",
          borderColor: open ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.28)",
          cursor: "pointer",
          outline: "none",
          transition: "background-color 0.15s, border-color 0.15s",
          "&:hover": { bgcolor: "rgba(30,41,59,0.96)", borderColor: "rgba(255,255,255,0.5)" },
          "&:active": { transform: "scale(0.97)" },
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.62rem",
            letterSpacing: "0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {active.label}
        </Typography>
        <ArrowDropDownIcon
          sx={{
            fontSize: 14,
            color: "#ffffff",
            opacity: 0.86,
            ml: -0.25,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.18s",
          }}
        />
      </Box>

      {/* ── Dropdown — pick a section to render in the right panel ──── */}
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 240,
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <Box sx={{ px: 1.5, pt: 1.25, pb: 0.5 }}>
            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Switch section to…
            </Typography>
          </Box>
          <MenuList dense sx={{ py: 0.5 }}>
            {MAP_SECTION_OPTIONS.map((opt) => {
              const isActive = opt.id === activeSection;
              return (
                <MenuItem
                  key={opt.id}
                  selected={isActive}
                  onClick={() => handleSelect(opt.id)}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 0,
                    "&.Mui-selected": { bgcolor: "#eef2ff" },
                    "&.Mui-selected:hover": { bgcolor: "#e0e7ff" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#6366f1" : "#334155",
                      lineHeight: 1.3,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    {opt.label}
                    {isActive && (
                      <Box
                        component="span"
                        sx={{
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          color: "#6366f1",
                          bgcolor: "#eef2ff",
                          px: 0.6,
                          py: 0.1,
                          borderRadius: 999,
                          border: "1px solid rgba(99,102,241,0.25)",
                        }}
                      >
                        active
                      </Box>
                    )}
                  </Typography>
                  <Typography sx={{ fontSize: "0.62rem", color: "#94a3b8", lineHeight: 1.3 }}>
                    {opt.description}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Paper>
      )}
    </Box>
  );
}

export default MapSectionSwitcher;
