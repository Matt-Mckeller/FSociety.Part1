"use client";

/**
 * InspectorModal — Plan §3.4 "Reusable Full-Screen Entity Modal".
 *
 * A reusable, closable, full-screen surface for inspecting any entity
 * (page, tile, person, location, item, theory…). Extracted from the map
 * dialog into a standalone, entity-agnostic component.
 *
 * Naming (per plan feedback): the **action** is "Inspect / Analyze" and the
 * **surface** is the **Inspector**.
 *
 * Generic contract:
 *   - `open` / `onClose` — controlled visibility (Esc + backdrop + ✕ close).
 *   - `title` / `subtitle` / `icon` / `accentColor` — header identity.
 *   - `tabs` — optional segmented sections; otherwise renders `children`.
 *   - `actions` — optional header action slot (e.g. Analyze, Share).
 *
 * Surface-agnostic: callers pass whatever entity content they like as
 * children or per-tab render content.
 */

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface InspectorTab {
  id: string;
  label: string;
  icon?: ComponentType<{ sx?: object }>;
  content: ReactNode;
}

export interface InspectorModalProps {
  /** Controlled visibility. */
  open: boolean;
  /** Close handler — fired by Esc, backdrop click, and the ✕ button. */
  onClose: () => void;
  /** Primary entity title. */
  title: ReactNode;
  /** Optional secondary line (entity type, breadcrumb, status…). */
  subtitle?: ReactNode;
  /** Optional leading icon for the header. */
  icon?: ComponentType<{ sx?: object }>;
  /** Accent color (header underline + icon tint). @default theme primary */
  accentColor?: string;
  /** Optional segmented tabs. If omitted, `children` is rendered as the body. */
  tabs?: InspectorTab[];
  /** Controlled active tab id (uncontrolled if omitted). */
  activeTabId?: string;
  /** Fired when a tab is selected. */
  onTabChange?: (id: string) => void;
  /** Header action slot (e.g. Analyze / Share buttons). */
  actions?: ReactNode;
  /** Body content when `tabs` is not provided. */
  children?: ReactNode;
  /** Label for the ✕ button. @default "Close inspector" */
  closeLabel?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────────

export function InspectorModal({
  open,
  onClose,
  title,
  subtitle,
  icon: Icon,
  accentColor,
  tabs,
  activeTabId,
  onTabChange,
  actions,
  children,
  closeLabel = "Close inspector",
}: InspectorModalProps) {
  const theme = useTheme();
  const accent = accentColor ?? theme.palette.primary.main;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [internalTab, setInternalTab] = useState(tabs?.[0]?.id);
  const currentTabId = activeTabId ?? internalTab;
  const activeTab = tabs?.find((t) => t.id === currentTabId) ?? tabs?.[0];

  const selectTab = (id: string) => {
    if (activeTabId === undefined) setInternalTab(id);
    onTabChange?.(id);
  };

  // Esc to close + restore focus on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the panel.
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Box
      role="presentation"
      onMouseDown={(e) => {
        // Backdrop click (only when the press starts on the backdrop itself).
        if (e.target === e.currentTarget) onClose();
      }}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 0, sm: 3 },
        bgcolor: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(4px)",
        animation: "inspectorBackdropIn 0.18s ease",
        "@keyframes inspectorBackdropIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Box
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: { xs: "100%", sm: 1100 },
          maxHeight: { xs: "100%", sm: "92vh" },
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: { xs: 0, sm: 3 },
          overflow: "hidden",
          outline: "none",
          boxShadow: "0 24px 80px rgba(15,23,42,0.28)",
          animation: "inspectorPanelIn 0.22s cubic-bezier(0.16,1,0.3,1)",
          "@keyframes inspectorPanelIn": {
            from: { opacity: 0, transform: "translateY(12px) scale(0.985)" },
            to: { opacity: 1, transform: "translateY(0) scale(1)" },
          },
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            px: { xs: 2, sm: 3 },
            pt: { xs: 2, sm: 2.5 },
            pb: 2,
            borderBottom: "1px solid #eef2f6",
          }}
        >
          {Icon && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 2,
                flexShrink: 0,
                bgcolor: `${accent}14`,
                border: `1px solid ${accent}2e`,
              }}
            >
              <Icon sx={{ fontSize: 22, color: accent }} />
            </Box>
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              component="div"
              sx={{
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                component="div"
                sx={{ fontSize: "0.74rem", color: "#64748b", mt: 0.35 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {actions && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
              {actions}
            </Box>
          )}

          <IconButton
            onClick={onClose}
            aria-label={closeLabel}
            size="small"
            sx={{ flexShrink: 0, color: "#64748b", "&:hover": { color: "#0f172a" } }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* ── Tab strip (optional) ────────────────────────────────────────── */}
        {tabs && tabs.length > 0 && (
          <Box
            role="tablist"
            sx={{
              display: "flex",
              gap: 0.5,
              px: { xs: 1.5, sm: 2.5 },
              borderBottom: "1px solid #eef2f6",
            }}
          >
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = tab.id === activeTab?.id;
              return (
                <Box
                  key={tab.id}
                  component="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectTab(tab.id)}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.6,
                    px: 1.25,
                    py: 1,
                    border: "none",
                    bgcolor: "transparent",
                    cursor: "pointer",
                    color: isActive ? accent : "#64748b",
                    fontWeight: isActive ? 700 : 600,
                    fontSize: "0.76rem",
                    borderBottom: `2px solid ${isActive ? accent : "transparent"}`,
                    transition: "color 0.12s, border-color 0.12s",
                    "&:hover": { color: accent },
                  }}
                >
                  {TabIcon && <TabIcon sx={{ fontSize: 16 }} />}
                  {tab.label}
                </Box>
              );
            })}
          </Box>
        )}

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 2.5 },
          }}
        >
          {activeTab ? activeTab.content : children}
        </Box>
      </Box>
    </Box>
  );
}
