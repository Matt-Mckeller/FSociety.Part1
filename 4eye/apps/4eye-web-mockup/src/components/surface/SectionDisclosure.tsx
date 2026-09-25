"use client";

/**
 * SectionDisclosure — a collapsible band header.
 *
 * The profile page previously rendered Goals, Actions and Events in full on
 * every lens, which made the page long and undifferentiated: nothing was
 * hidden, so nothing was emphasised. These collapse by default and carry a
 * count in the header, so the information stays legible without being open.
 *
 * State persists per `id` so a user who always wants Goals open keeps it open.
 * Persistence is deliberately best-effort — Safari private mode throws on
 * `localStorage`, and a disclosure is not worth an error boundary.
 */

import * as React from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { ChevronIcon, type BrandIconProps } from "@4eye/icons";

import { useSurface } from "./surfaceTokens";

const STORE_PREFIX = "4eye.disclosure.";

function readOpen(id: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(STORE_PREFIX + id);
    return v === null ? fallback : v === "1";
  } catch {
    return fallback;
  }
}

function writeOpen(id: string, open: boolean) {
  try {
    window.localStorage.setItem(STORE_PREFIX + id, open ? "1" : "0");
  } catch {
    /* storage unavailable — the disclosure still works, it just won't persist */
  }
}

export interface SectionDisclosureProps {
  /** Stable key for persistence. */
  id: string;
  label: string;
  accent: string;
  Icon?: React.ComponentType<BrandIconProps>;
  /** Shown right of the label, e.g. "3 equipped" — readable while collapsed. */
  meta?: string;
  /**
   * Rendered right of `meta`, inside the clickable header — for a compact
   * preview of what the section holds (icons, avatars) so the collapsed row
   * says *what* rather than only *how many*. Clicks fall through to the header
   * toggle, so keep it non-interactive; put controls in `actions` instead.
   */
  adornment?: React.ReactNode;
  /** What the section contains; surfaced as a tooltip on the header. */
  hint?: string;
  defaultOpen?: boolean;
  /**
   * Controls rendered at the right of the header. Clicks inside are stopped
   * from reaching the header, so operating a control never toggles the section.
   */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function SectionDisclosure({
  id,
  label,
  accent,
  Icon,
  meta,
  adornment,
  hint,
  defaultOpen = false,
  actions,
  children,
}: SectionDisclosureProps) {
  // Start from `defaultOpen` on both server and first client render, then adopt
  // the stored value in an effect — reading storage during render would
  // hydrate-mismatch.
  const [open, setOpen] = React.useState(defaultOpen);
  React.useEffect(() => setOpen(readOpen(id, defaultOpen)), [id, defaultOpen]);

  const surface = useSurface();
  const ink = surface.ink(accent);
  const contentId = `disclosure-${id}`;

  function toggle() {
    setOpen((prev) => {
      writeOpen(id, !prev);
      return !prev;
    });
  }

  const header = (
    <Stack
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        py: 0.75,
        cursor: "pointer",
        borderRadius: 1,
        "&:hover": { bgcolor: alpha(accent, 0.06) },
        "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
      }}
    >
      <Box
        component={ChevronIcon}
        size={14}
        sx={{
          color: ink,
          flexShrink: 0,
          transition: "transform 180ms ease",
          transform: open ? "rotate(90deg)" : "none",
        }}
      />
      {Icon && <Box component={Icon} size={15} sx={{ color: ink, flexShrink: 0 }} />}
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: ink,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
      {meta && (
        <Typography sx={{ fontSize: 10.5, fontWeight: 600, color: "text.secondary", whiteSpace: "nowrap" }}>
          {meta}
        </Typography>
      )}
      {adornment && (
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, ml: 0.25 }}>{adornment}</Box>
      )}
      <Box
        aria-hidden
        sx={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${alpha(accent, 0.4)}, transparent)` }}
      />
      {actions && (
        <Box
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}
        >
          {actions}
        </Box>
      )}
    </Stack>
  );

  return (
    <Box sx={{ mb: 1 }}>
      {hint ? <Tooltip title={hint} arrow placement="top-start">{header}</Tooltip> : header}
      <Collapse in={open} unmountOnExit>
        <Box id={contentId} sx={{ pt: 1.5, pb: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
