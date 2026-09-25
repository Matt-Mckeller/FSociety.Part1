"use client";

/**
 * Panel — a titled, bordered block for stacking sections one per row.
 *
 * The gear sections were laid out in a masonry two-column flow separated only
 * by whitespace, which left no clear boundary between Equipment and Attributes
 * and made the eye hunt for where one ended. A panel gives each section an
 * explicit edge and a header rule, so a single column of them reads as a list
 * of distinct things rather than a continuous wash.
 *
 * Mostly neutral: border and background come from the theme's divider and paper
 * tokens. The one exception is `tone` — a channel colour that says *what kind of
 * thing this section holds* (see `characterPalette`). It is spent on a dot and
 * the title ink only, never on the fill, so the container still stays quiet
 * enough that colour *inside* it keeps meaning a value, a delta or a state.
 *
 * Panels can also collapse, and remember it. That is the same affordance the
 * Surfaced cards have — a section you do not use today should cost a header,
 * not a screenful — and it persists per `id` so the choice survives a reload.
 */

import * as React from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { ChevronIcon, type BrandIconProps } from "@4eye/icons";

const STORE_PREFIX = "4eye.panel.";

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
    /* storage unavailable — the panel still collapses, it just won't persist */
  }
}

export interface PanelProps {
  title: string;
  /** Optional glyph beside the title. Inherits the title's ink. */
  Icon?: React.ComponentType<BrandIconProps>;
  /** Short right-aligned summary — a count, a total, a ratio. */
  meta?: string;
  /** One line under the title explaining what the section is for. */
  description?: string;
  /**
   * Channel ink — the hue that says how this section's contents enter play.
   * Spent on a leading dot and the title only. Omit for a neutral panel.
   */
  tone?: string;
  /** Tooltip for the tone dot, naming the channel. */
  toneHint?: string;
  /**
   * Cap the body height and scroll inside it, so the panel stays a fixed
   * object on the page instead of growing until it pushes everything below it
   * off screen.
   *
   * Second choice, not first: a panel that shows its first few rows and offers
   * "show all" tells you how much there is *and* stays short, where a scroll
   * box hides the size and traps the wheel. Use `scroll` where the content is
   * genuinely a long browse with no natural head — the spell book's full
   * category list — and a row cap everywhere else.
   *
   * A number is a pixel height; `true` takes the default.
   */
  scroll?: boolean | number;
  /** Right-aligned controls in the header rule (a link, a toggle). */
  actions?: React.ReactNode;
  /**
   * Stable key enabling collapse. Without it the panel is always open — a
   * collapse that cannot be remembered is a trap, since the section vanishes
   * and reappears on every navigation.
   */
  id?: string;
  /** Start collapsed, until the user says otherwise. Requires `id`. */
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}

/** Tall enough to show several rows, short enough to stay a panel. */
const DEFAULT_SCROLL_HEIGHT = 320;

export function Panel({
  title,
  Icon,
  meta,
  description,
  tone,
  toneHint,
  scroll,
  actions,
  id,
  defaultCollapsed = false,
  children,
}: PanelProps) {
  const collapsible = Boolean(id);
  // Start from the default on both server and first client render, then adopt
  // the stored value in an effect — reading storage during render would
  // hydrate-mismatch.
  const [open, setOpen] = React.useState(!defaultCollapsed);
  React.useEffect(() => {
    if (id) setOpen(readOpen(id, !defaultCollapsed));
  }, [id, defaultCollapsed]);

  const bodyId = id ? `panel-${id}` : undefined;

  function toggle() {
    if (!id) return;
    setOpen((prev) => {
      writeOpen(id, !prev);
      return !prev;
    });
  }

  const titleRow = (
    <Stack
      {...(collapsible
        ? {
            role: "button" as const,
            tabIndex: 0,
            "aria-expanded": open,
            "aria-controls": bodyId,
            onClick: toggle,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            },
          }
        : {})}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        px: 1.75,
        py: 1.1,
        cursor: collapsible ? "pointer" : "default",
        borderBottom: open ? "1px solid" : "none",
        borderColor: (theme) => alpha(theme.palette.divider, 0.7),
        ...(collapsible && {
          "&:hover": { bgcolor: (theme) => alpha(theme.palette.text.primary, 0.03) },
          "&:focus-visible": { outline: `2px solid ${tone ?? "currentColor"}`, outlineOffset: -2 },
        }),
      }}
    >
      {collapsible && (
        <Box
          component={ChevronIcon}
          size={13}
          sx={{
            color: "text.disabled",
            flexShrink: 0,
            transition: "transform 180ms ease",
            transform: open ? "rotate(90deg)" : "none",
          }}
        />
      )}
      {tone && (
        <Tooltip title={toneHint ?? ""} arrow disableHoverListener={!toneHint}>
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: tone,
              boxShadow: `0 0 6px ${alpha(tone, 0.55)}`,
              flexShrink: 0,
            }}
          />
        </Tooltip>
      )}
      {Icon && (
        <Box component={Icon} size={15} sx={{ color: tone ?? "text.secondary", flexShrink: 0 }} />
      )}
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: tone ?? "text.primary",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            fontSize: "0.68rem",
            color: "text.secondary",
            flex: 1,
            minWidth: 0,
            display: { zero: "none", tablet: "block" },
          }}
        >
          {description}
        </Typography>
      )}
      {meta && (
        <Typography
          sx={{
            fontSize: "0.68rem",
            fontWeight: 700,
            color: "text.secondary",
            ml: description ? 0 : "auto",
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {meta}
        </Typography>
      )}
      {actions && (
        <Box
          // Controls in the header must not toggle the panel they sit on.
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          sx={{ ml: meta || description ? 1 : "auto", flexShrink: 0, display: "flex", gap: 0.5 }}
        >
          {actions}
        </Box>
      )}
    </Stack>
  );

  const body = (
    <Box
      id={bodyId}
      sx={{
        p: 1.75,
        ...(scroll && {
          maxHeight: typeof scroll === "number" ? scroll : DEFAULT_SCROLL_HEIGHT,
          overflowY: "auto",
          // Keep the scrollbar from crowding the content it sits beside.
          scrollbarWidth: "thin",
          overscrollBehavior: "contain",
        }),
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: tone ? alpha(tone, 0.22) : "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {titleRow}
      {collapsible ? <Collapse in={open}>{body}</Collapse> : body}
    </Box>
  );
}
