"use client";

/**
 * WorkbenchDock — one column beside the transcript, holding whichever panel is
 * open.
 *
 * The surface used to reach panels by dropping them *in above* the transcript,
 * capped at 320px. That cost was paid in the one place the page can least
 * afford it: opening "Plan" to check something took a third of the conversation
 * away, so you closed it again immediately and the panels never got used for
 * anything but a glance. Beside the transcript the same panel costs width,
 * which the page has, and the message list never reflows.
 *
 * Minified (`rail`) the dock keeps its selector and shows `LearningRail` — the
 * live session metrics — so the collapsed state still reports rather than just
 * hiding. Clicking any selector icon while minified opens the dock to working
 * width, because wanting a panel is the same gesture as wanting it visible.
 */

import * as React from "react";
import { Box, ButtonBase, Stack, Tooltip, Typography, alpha } from "@mui/material";
import type { ComponentType } from "react";

import { useSurface } from "@4eye/web/components/surface";
import { CycleControl } from "@4eye/web/Tiles/profiles/components/ProfileControls";
import { DensityIcon } from "@4eye/icons";
import { LearningRail } from "@4eye/web/Tiles/learning";
import {
  DOCK_WIDTHS,
  DOCK_WIDTH_HINT,
  DOCK_WIDTH_SIZE,
  type DockWidth,
} from "./workbenchLayouts";

export interface DockPanelDescriptor {
  id: string;
  label: string;
  description: string;
  Icon: ComponentType<{ sx?: object }>;
  color: string;
  /** Optional count shown on the selector — selected entities, tagged modalities. */
  badge?: number;
  /** Muted chrome — the panel is visible but not ready to use. */
  disabled?: boolean;
}

export interface WorkbenchDockProps {
  panels: DockPanelDescriptor[];
  activePanelId: string | null;
  onSelectPanel: (id: string | null) => void;
  width: DockWidth;
  onWidthChange: (w: DockWidth) => void;
  /** Accent for the dock chrome itself; panels bring their own. */
  accent: string;
  /** Rendered in the body at `dock` / `wide`. */
  children: React.ReactNode;
  /** Stack the selector down the side (rail) or across the top. */
  orientation?: "vertical" | "horizontal";
}

/** One panel button. Vertical in the rail, horizontal in the dock header. */
function PanelButton({
  panel,
  active,
  compact,
  placement,
  onSelect,
}: {
  panel: DockPanelDescriptor;
  active: boolean;
  /** Icon only — the tooltip carries the name. */
  compact: boolean;
  placement: "left" | "bottom";
  onSelect: () => void;
}) {
  const surface = useSurface();
  const ink = surface.ink(panel.color);
  const Icon = panel.Icon;
  const muted = Boolean(panel.disabled);

  return (
    <Tooltip
      title={muted ? `${panel.label} — not ready yet` : `${panel.label} — ${panel.description}`}
      arrow
      placement={placement}
    >
      <ButtonBase
        onClick={onSelect}
        aria-pressed={active}
        aria-label={panel.label}
        aria-disabled={muted}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: compact ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: compact ? 0 : 0.5,
          width: compact ? 36 : "auto",
          height: 32,
          px: compact ? 0 : 0.9,
          borderRadius: 1.5,
          flexShrink: 0,
          border: "1px solid",
          borderColor: active ? alpha(panel.color, muted ? 0.35 : 0.7) : "transparent",
          bgcolor: active ? alpha(panel.color, muted ? 0.06 : 0.14) : "transparent",
          color: muted ? surface.text.faint : active ? ink : surface.text.lo,
          opacity: muted ? 0.5 : 1,
          transition: "all 120ms ease",
          "&:hover": {
            bgcolor: alpha(panel.color, muted ? 0.08 : 0.1),
            color: muted ? surface.text.lo : ink,
          },
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
        }}
      >
        <Icon sx={{ fontSize: 17 }} />
        {!compact && (
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: "inherit",
            }}
          >
            {panel.label}
          </Typography>
        )}
        {panel.badge ? (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: 1,
              right: compact ? 2 : 1,
              minWidth: 13,
              height: 13,
              px: 0.3,
              borderRadius: 99,
              bgcolor: panel.color,
              color: "#fff",
              fontSize: 8.5,
              fontWeight: 800,
              lineHeight: "13px",
              textAlign: "center",
            }}
          >
            {panel.badge}
          </Box>
        ) : null}
      </ButtonBase>
    </Tooltip>
  );
}

export function WorkbenchDock({
  panels,
  activePanelId,
  onSelectPanel,
  width,
  onWidthChange,
  accent,
  children,
  orientation = "vertical",
}: WorkbenchDockProps) {
  const surface = useSurface();
  const minified = width === "rail" && orientation === "vertical";
  // Six labelled buttons plus the width control do not fit in 340px — they
  // overflowed and cut Presets and Stories off entirely. Labels are the part
  // that scales, so they appear only once the dock is wide enough to hold them;
  // below that the tooltip carries the name.
  const compactButtons = width !== "wide";

  // Selecting a panel while minified opens the dock: you asked to see something.
  const select = (id: string) => {
    if (minified) {
      onSelectPanel(id);
      onWidthChange("dock");
      return;
    }
    onSelectPanel(activePanelId === id ? null : id);
  };

  const selector = (
    <Stack
      role="tablist"
      aria-label="Workbench panels"
      sx={{
        flexDirection: minified ? "column" : "row",
        alignItems: "center",
        gap: 0.4,
        ...(minified ? {} : { flex: 1, minWidth: 0, overflowX: "auto", scrollbarWidth: "none" }),
      }}
    >
      {panels.map((p) => (
        <PanelButton
          key={p.id}
          panel={p}
          active={activePanelId === p.id}
          compact={compactButtons}
          placement={minified ? "left" : "bottom"}
          onSelect={() => select(p.id)}
        />
      ))}
    </Stack>
  );

  const widthControl = (
    <CycleControl
      label="Dock width"
      value={width}
      options={DOCK_WIDTHS}
      accent={accent}
      Icon={DensityIcon}
      onChange={onWidthChange}
    />
  );

  return (
    <Box
      component="aside"
      aria-label="Workbench dock"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        flexShrink: 0,
        width: orientation === "vertical" ? DOCK_WIDTH_SIZE[width] : "100%",
        minWidth: 0,
        minHeight: 0,
        p: 0.75,
        borderRadius: 2,
        border: "1px solid",
        borderColor: surface.dividerBorder,
        bgcolor: surface.chromeBg,
        backdropFilter: "blur(10px)",
        transition: "width 200ms ease",
      }}
    >
      {minified ? (
        <>
          {selector}
          <Box
            aria-hidden
            sx={{ height: "1px", bgcolor: surface.dividerBorder, mx: 0.5, my: 0.25 }}
          />
          {/* The minified payload: what the session currently is, not just icons. */}
          <Box sx={{ display: "flex", justifyContent: "center", py: 0.5 }}>
            <LearningRail accent={accent} orientation="vertical" />
          </Box>
          <Box sx={{ flex: 1 }} />
          <Tooltip title={DOCK_WIDTH_HINT.dock} arrow placement="left">
            <ButtonBase
              onClick={() => onWidthChange("dock")}
              aria-label="Expand dock"
              sx={{
                alignSelf: "center",
                width: 36,
                height: 26,
                borderRadius: 1.5,
                color: surface.text.lo,
                border: "1px dashed",
                borderColor: surface.dividerBorder,
                fontSize: 13,
                fontWeight: 800,
                "&:hover": { color: surface.ink(accent), bgcolor: alpha(accent, 0.08) },
              }}
            >
              ‹
            </ButtonBase>
          </Tooltip>
        </>
      ) : (
        <>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, minWidth: 0 }}>
            {selector}
            {widthControl}
          </Stack>
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              px: 0.25,
              scrollbarWidth: "thin",
              overscrollBehavior: "contain",
            }}
          >
            {children}
          </Box>
        </>
      )}
    </Box>
  );
}
