"use client";

/**
 * `useCapped` + `ShowMore` — the lens's answer to long lists.
 *
 * The Character lens holds four inventories (attributes, spells, equipment,
 * perks) that each want to be complete and each want to be short. Scrolling
 * inside a panel satisfies neither: it hides how much there is, it traps the
 * wheel on the way down the page, and on a trackpad it is easy to scroll a
 * panel by accident while trying to scroll the page.
 *
 * A head of N rows plus a labelled "show all 12" states the size in the control
 * itself, keeps the panel a fixed object, and costs one click to open. The rows
 * that matter are shown first, so the cap is usually enough on its own.
 *
 * The expanded/collapsed state is per-instance and deliberately *not*
 * persisted — it is a "let me look at the rest" gesture, not a preference, and
 * a list that reopens expanded every session defeats the point of capping it.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";
import { ChevronIcon } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";

export interface Capped<T> {
  /** The rows to render right now. */
  items: T[];
  expanded: boolean;
  toggle: () => void;
  /** How many rows the cap is hiding; 0 when everything fits. */
  hidden: number;
  total: number;
}

export function useCapped<T>(all: T[], limit: number): Capped<T> {
  const [expanded, setExpanded] = React.useState(false);
  const toggle = React.useCallback(() => setExpanded((v) => !v), []);
  const hidden = Math.max(0, all.length - limit);
  return {
    items: expanded || hidden === 0 ? all : all.slice(0, limit),
    expanded,
    toggle,
    hidden,
    total: all.length,
  };
}

/**
 * The control. Renders nothing when the cap is not hiding anything, so a call
 * site can drop it in unconditionally.
 */
export function ShowMore({
  capped,
  accent,
  /** Plural noun for the label — "attributes", "items", "spells". */
  noun,
  collapsedLabel,
  expandedLabel,
}: {
  capped: Pick<Capped<unknown>, "expanded" | "toggle" | "hidden" | "total">;
  /** Raw accent; run through `ink()` here so call sites pass the brand hex. */
  accent: string;
  noun: string;
  /** Override the default “show all N noun” copy. */
  collapsedLabel?: string;
  expandedLabel?: string;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);

  if (capped.hidden === 0) return null;

  return (
    <Stack
      role="button"
      tabIndex={0}
      aria-expanded={capped.expanded}
      onClick={capped.toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          capped.toggle();
        }
      }}
      sx={{
        mt: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 0.5,
        alignSelf: "flex-start",
        px: 0.9,
        py: 0.35,
        borderRadius: 999,
        cursor: "pointer",
        width: "fit-content",
        border: "1px solid",
        borderColor: alpha(ink, 0.3),
        bgcolor: alpha(ink, 0.06),
        "&:hover": { bgcolor: alpha(ink, 0.12), borderColor: alpha(ink, 0.5) },
        "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
      }}
    >
      <Box
        component={ChevronIcon}
        size={11}
        sx={{
          color: ink,
          flexShrink: 0,
          transition: "transform 180ms ease",
          transform: capped.expanded ? "rotate(-90deg)" : "rotate(90deg)",
        }}
      />
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: ink,
          whiteSpace: "nowrap",
        }}
      >
        {capped.expanded
          ? (expandedLabel ?? `Show fewer ${noun}`)
          : (collapsedLabel ?? `Show all ${capped.total} ${noun}`)}
      </Typography>
    </Stack>
  );
}
