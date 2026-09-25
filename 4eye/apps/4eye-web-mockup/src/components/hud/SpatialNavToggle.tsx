"use client";

/**
 * SpatialNavToggle — Plan §3.2 "On-Page Navigation Toggles".
 *
 * A spatial, nestable way to navigate to many sub-pages on a single page
 * (like the Chat Page top screen-switching). Aligns with the layout /
 * navigation system but is lightweight enough to drop onto any page.
 *
 * Collapsed state (Variant 1):
 *   - A primary pill: primary icon + primary label + dropdown caret.
 *   - A 2nd row of N smaller, icon-only chips for the other destinations.
 *
 * On click the container expands into a **popover** and the icons **morph**
 * into a fuller vertical list — each icon slides into position with its
 * label revealing next to it (staggered). Selecting an item switches the
 * active destination.
 *
 * Design exploration component — self-contained, no external nav store, so
 * it can be reviewed in isolation in Storybook and reused inline on a page.
 */

import { useState, useRef, useEffect, useMemo, type ComponentType } from "react";
import { Box, Paper, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface SpatialNavItem {
  /** Stable id used for selection + keying. */
  id: string;
  /** Full label shown in the expanded popover (and on the primary pill). */
  label: string;
  /** MUI-style icon component. */
  icon: ComponentType<{ sx?: object }>;
  /** Accent color for this destination (icon + chip tint). */
  color?: string;
  /** Optional short description shown under the label in the popover. */
  description?: string;
}

export interface SpatialNavToggleProps {
  /** Destinations to navigate between. First item is the default active. */
  items: SpatialNavItem[];
  /** Controlled active id. */
  activeId?: string;
  /** Default active id (uncontrolled). Falls back to the first item. */
  defaultActiveId?: string;
  /** Fired when a destination is selected. */
  onChange?: (id: string) => void;
  /** Max icon-only chips to show on the collapsed 2nd row. @default 6 */
  maxCollapsedChips?: number;
}

const DEFAULT_COLOR = "#6366f1";

// ─── Component ───────────────────────────────────────────────────────────────────

export function SpatialNavToggle({
  items,
  activeId,
  defaultActiveId,
  onChange,
  maxCollapsedChips = 6,
}: SpatialNavToggleProps) {
  const [open, setOpen] = useState(false);
  const [internalActive, setInternalActive] = useState(
    defaultActiveId ?? items[0]?.id,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentId = activeId ?? internalActive;
  const active = useMemo(
    () => items.find((i) => i.id === currentId) ?? items[0],
    [items, currentId],
  );

  // The "2nd row" chips = every destination other than the active one.
  const secondaryItems = useMemo(
    () => items.filter((i) => i.id !== active?.id).slice(0, maxCollapsedChips),
    [items, active, maxCollapsedChips],
  );

  // Close on outside click or Escape.
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

  const select = (id: string) => {
    if (activeId === undefined) setInternalActive(id);
    onChange?.(id);
    setOpen(false);
  };

  if (!active) return null;

  const ActiveIcon = active.icon;
  const activeColor = active.color ?? DEFAULT_COLOR;

  return (
    <Box ref={containerRef} sx={{ position: "relative", display: "inline-block" }}>
      {/* ── Collapsed cluster: primary pill + 2nd row of icon chips ───────── */}
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 0.6,
          alignItems: "flex-start",
        }}
      >
        {/* Primary pill */}
        <Box
          component="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`Navigate — current: ${active.label}`}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.25,
            py: 0.6,
            borderRadius: 999,
            bgcolor: open ? `${activeColor}1f` : `${activeColor}14`,
            border: "1px solid",
            borderColor: open ? `${activeColor}66` : `${activeColor}33`,
            cursor: "pointer",
            outline: "none",
            transition: "background-color 0.15s, border-color 0.15s, transform 0.1s",
            "&:hover": { bgcolor: `${activeColor}24` },
            "&:active": { transform: "scale(0.97)" },
          }}
        >
          <ActiveIcon sx={{ fontSize: 18, color: activeColor }} />
          <Typography
            sx={{
              color: activeColor,
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.01em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {active.label}
          </Typography>
          <ArrowDropDownIcon
            sx={{
              fontSize: 16,
              color: activeColor,
              opacity: 0.7,
              ml: -0.25,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.18s",
            }}
          />
        </Box>

        {/* 2nd row — small icon-only chips (fade out as the popover opens) */}
        <Box
          sx={{
            display: "inline-flex",
            gap: 0.5,
            pl: 0.25,
            opacity: open ? 0 : 1,
            transform: open ? "translateY(-4px)" : "translateY(0)",
            transition: "opacity 0.15s, transform 0.15s",
            pointerEvents: open ? "none" : "auto",
          }}
        >
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const color = item.color ?? DEFAULT_COLOR;
            return (
              <Box
                key={item.id}
                component="button"
                onClick={() => select(item.id)}
                aria-label={item.label}
                title={item.label}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  bgcolor: `${color}12`,
                  border: `1px solid ${color}2e`,
                  cursor: "pointer",
                  outline: "none",
                  transition: "background-color 0.12s, transform 0.1s",
                  "&:hover": { bgcolor: `${color}24` },
                  "&:active": { transform: "scale(0.9)" },
                }}
              >
                <Icon sx={{ fontSize: 15, color }} />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── Expanded popover — icons morph into a labeled vertical list ───── */}
      {open && (
        <Paper
          elevation={6}
          role="menu"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            minWidth: 230,
            borderRadius: 2.5,
            overflow: "hidden",
            zIndex: 9999,
            border: `1px solid ${activeColor}26`,
            transformOrigin: "top left",
            animation: "spatialNavExpand 0.2s cubic-bezier(0.16,1,0.3,1)",
            "@keyframes spatialNavExpand": {
              from: { opacity: 0, transform: "scale(0.94)" },
              to: { opacity: 1, transform: "scale(1)" },
            },
          }}
        >
          <Box sx={{ px: 1.5, pt: 1.25, pb: 0.5 }}>
            <Typography
              sx={{
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Navigate to…
            </Typography>
          </Box>

          <Box sx={{ py: 0.5, pb: 0.75 }}>
            {items.map((item, idx) => {
              const Icon = item.icon;
              const color = item.color ?? DEFAULT_COLOR;
              const isActive = item.id === active.id;
              return (
                <Box
                  key={item.id}
                  component="button"
                  role="menuitem"
                  onClick={() => select(item.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                    px: 1.5,
                    py: 0.85,
                    bgcolor: isActive ? `${color}12` : "transparent",
                    border: "none",
                    borderLeft: `2px solid ${isActive ? color : "transparent"}`,
                    cursor: "pointer",
                    textAlign: "left",
                    outline: "none",
                    // Per-item morph: each row slides in + label reveals, staggered.
                    animation: "spatialNavItemIn 0.26s ease both",
                    animationDelay: `${idx * 0.035}s`,
                    "@keyframes spatialNavItemIn": {
                      from: { opacity: 0, transform: "translateX(-8px)" },
                      to: { opacity: 1, transform: "translateX(0)" },
                    },
                    "&:hover": { bgcolor: `${color}1a` },
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      flexShrink: 0,
                      bgcolor: `${color}16`,
                      border: `1px solid ${color}2e`,
                    }}
                  >
                    <Icon sx={{ fontSize: 15, color }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "0.74rem",
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? color : "#1e293b",
                        lineHeight: 1.15,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </Typography>
                    {item.description && (
                      <Typography
                        sx={{
                          fontSize: "0.6rem",
                          color: "#94a3b8",
                          lineHeight: 1.2,
                          mt: 0.15,
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
