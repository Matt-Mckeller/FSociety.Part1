"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Reorder, AnimatePresence, motion } from "framer-motion";
import { Symbol } from "@4eye/features";
import { COLOR_MAP, type PipelineTemplate } from "@4eye/types";
import { DUSK_HORIZON_BACKGROUND } from "@expanse/theme";
import {
  RAIL_PILL_BACKGROUND,
  RAIL_PILL_RADIUS,
  RAIL_PILL_SHADOW,
  RAIL_PILL_SHADOW_ACTIVE,
  RAIL_PILL_SIZE,
} from "@expanse/hud";
import { usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

import { PipelinePanelStack } from "./PipelinePanelStack";
import {
  PIPELINE_DISPLAYS,
  PIPELINE_DISPLAY_HINT,
  resolvePipelineDisplay,
  type PipelineDisplay,
} from "./pipelineDisplay";

/** Square rail face; stack/flow stretch to 2× so the tile pile can read. */
const PILL_WIDTH = RAIL_PILL_SIZE;
const PILL_HEIGHT = RAIL_PILL_SIZE * 2;

export interface PipelineLayerRailProps {
  /** All available pipelines, in their definition order. */
  pipelines: PipelineTemplate[];
  /** Ordered IDs of currently active layers (selection order = flow order). */
  activeIds: string[];
  /** Toggle a layer in/out of the active flow. */
  onToggle: (id: string) => void;
  /** Replace the ordered active-layer ID list (after a drag-reorder). */
  onReorder: (ids: string[]) => void;
}

/**
 * PipelineLayerRail — vertical pill on the HUD left rail showing the
 * user's active prompt-processing layers (an ordered subset of
 * `selectedContext.pipelines`).
 *
 * Pure presentational: all state comes in via props so the rail can
 * be rendered at the HUD slot location (outside the AI Chat provider
 * tree) by a registrar that captures `useContextData()` values inside
 * the provider tree.
 *
 * Visuals:
 *  - Collapsed: a rail-family button holding stacked gradient lego tiles.
 *    Display type is cycled from the expanded panel (`auto` / `stack` /
 *    `compact` / `flow`) — same persisted-choice pattern as dock width.
 *  - Expanded: a popover with a draggable Flow list, Available layers,
 *    and the display-type cycle.
 */
export function PipelineLayerRail({
  pipelines,
  activeIds,
  onToggle,
  onReorder,
}: PipelineLayerRailProps) {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = usePersistedChoice<PipelineDisplay>(
    "4eye.aiChat.pipelineDisplay",
    "auto",
    PIPELINE_DISPLAYS,
  );
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const activeLayers = useMemo<PipelineTemplate[]>(
    () =>
      activeIds
        .map((id) => pipelines.find((p) => p.id === id))
        .filter((p): p is PipelineTemplate => Boolean(p)),
    [activeIds, pipelines],
  );
  const inactiveLayers = useMemo<PipelineTemplate[]>(
    () => pipelines.filter((p) => !activeIds.includes(p.id)),
    [pipelines, activeIds],
  );
  const resolved = resolvePipelineDisplay(display, activeLayers.length);
  const compact = resolved === "compact";
  const flowColors = useMemo(
    () =>
      resolved === "flow"
        ? activeLayers.map((layer) => COLOR_MAP[layer.symbolColor])
        : undefined,
    [resolved, activeLayers],
  );

  const handleReorder = (next: PipelineTemplate[]) => {
    onReorder(next.map((p) => p.id));
  };

  return (
    <>
      <Tooltip
        title={
          activeLayers.length === 0
            ? "Add prompt-processing layers"
            : `${activeLayers.length} active layer${activeLayers.length === 1 ? "" : "s"}`
        }
        placement="right"
      >
        <Box
          ref={anchorRef}
          component={ButtonBase}
          onClick={() => setOpen((v) => !v)}
          aria-label="Pipeline layers"
          aria-expanded={open}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: PILL_WIDTH,
            height: compact ? RAIL_PILL_SIZE : PILL_HEIGHT,
            px: 0.5,
            py: compact ? 0.4 : 1,
            borderRadius: compact ? RAIL_PILL_RADIUS : `${PILL_WIDTH / 2}px`,
            background: RAIL_PILL_BACKGROUND,
            boxShadow: open ? RAIL_PILL_SHADOW_ACTIVE : RAIL_PILL_SHADOW,
            transition:
              "height 180ms ease, border-radius 180ms ease, box-shadow 150ms ease",
            "&:hover": {
              boxShadow: RAIL_PILL_SHADOW_ACTIVE,
            },
          }}
        >
          <PipelinePanelStack
            filled={activeLayers.length}
            colors={flowColors}
            size={compact ? 26 : 34}
          />
        </Box>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="right-start"
        modifiers={[
          { name: "offset", options: { offset: [0, 12] } },
          { name: "preventOverflow", options: { padding: 12 } },
        ]}
        style={{ zIndex: 1300 }}
      >
        <ClickAwayWrapper onClose={() => setOpen(false)}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <PipelineLayerExpandedPanel
                  active={activeLayers}
                  inactive={inactiveLayers}
                  display={display}
                  onDisplayChange={setDisplay}
                  onReorder={handleReorder}
                  onToggle={onToggle}
                  onClose={() => setOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </ClickAwayWrapper>
      </Popper>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function ClickAwayWrapper({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Lightweight click-away: outer wrapper blocks pointer events behind
  // the panel via a transparent backdrop attached to the popper layer.
  // We avoid MUI's ClickAwayListener here because the popper sits on
  // top of the rail and we want the rail click to also toggle close.
  return (
    <Box
      onPointerDownCapture={(e) => {
        // Only close when pointer-down originates outside the panel.
        const target = e.target as HTMLElement;
        if (!target.closest("[data-pipeline-panel]")) onClose();
      }}
    >
      {children}
    </Box>
  );
}

function DisplayCycle({
  value,
  onChange,
}: {
  value: PipelineDisplay;
  onChange: (next: PipelineDisplay) => void;
}) {
  const next =
    PIPELINE_DISPLAYS[(PIPELINE_DISPLAYS.indexOf(value) + 1) % PIPELINE_DISPLAYS.length];
  return (
    <Tooltip title={`${PIPELINE_DISPLAY_HINT[value]} — click for ${next}`} arrow>
      <ButtonBase
        onClick={(e) => {
          e.stopPropagation();
          onChange(next);
        }}
        aria-label={`Pipeline display ${value}. Activate for ${next}.`}
        sx={{
          px: 0.9,
          py: 0.35,
          borderRadius: 999,
          flexShrink: 0,
          border: "1px solid rgba(96,165,250,0.45)",
          bgcolor: "rgba(37,99,235,0.18)",
          color: "#bfdbfe",
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          "&:hover": {
            bgcolor: "rgba(37,99,235,0.28)",
            borderColor: "rgba(147,197,253,0.7)",
          },
        }}
      >
        {value}
      </ButtonBase>
    </Tooltip>
  );
}

/* ────────────────────────────────────────────────────────────────── */

interface PipelineLayerExpandedPanelProps {
  active: PipelineTemplate[];
  inactive: PipelineTemplate[];
  display: PipelineDisplay;
  onDisplayChange: (next: PipelineDisplay) => void;
  onReorder: (next: PipelineTemplate[]) => void;
  onToggle: (id: string) => void;
  onClose: () => void;
}

function PipelineLayerExpandedPanel({
  active,
  inactive,
  display,
  onDisplayChange,
  onReorder,
  onToggle,
  onClose,
}: PipelineLayerExpandedPanelProps) {
  return (
    <Box
      data-pipeline-panel
      sx={{
        width: 320,
        maxHeight: "70vh",
        overflow: "auto",
        background: DUSK_HORIZON_BACKGROUND,
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 2,
        boxShadow: "0 18px 48px rgba(0,0,0,0.55)",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <AccountTreeIcon
          sx={{ fontSize: 18, color: "rgba(255,255,255,0.65)" }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.55)",
              letterSpacing: 1.5,
              lineHeight: 1.2,
            }}
          >
            Pipeline Layers
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.55)", display: "block" }}
          >
            Order = flow direction (top runs first)
          </Typography>
        </Box>
        <DisplayCycle value={display} onChange={onDisplayChange} />
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close pipeline layers"
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <FlowSection
        active={active}
        onReorder={onReorder}
        onRemove={(id) => onToggle(id)}
      />

      {inactive.length > 0 && (
        <>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
          <AvailableSection
            inactive={inactive}
            onAdd={(id) => onToggle(id)}
          />
        </>
      )}
    </Box>
  );
}

function FlowSection({
  active,
  onReorder,
  onRemove,
}: {
  active: PipelineTemplate[];
  onReorder: (next: PipelineTemplate[]) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <Box sx={{ px: 1, py: 1 }}>
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          letterSpacing: 1,
          px: 1,
        }}
      >
        Flow{active.length > 0 ? ` · ${active.length}` : ""}
      </Typography>
      {active.length === 0 ? (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "rgba(255,255,255,0.45)",
            px: 1,
            py: 1.5,
          }}
        >
          No layers active. Pick from below to start your prompt flow.
        </Typography>
      ) : (
        <Reorder.Group
          axis="y"
          values={active}
          onReorder={onReorder}
          style={reorderListStyle}
        >
          {active.map((layer, idx) => (
            <Reorder.Item
              key={layer.id}
              value={layer}
              style={reorderItemStyle}
              whileDrag={{ scale: 1.02, zIndex: 2 }}
            >
              <FlowRow
                index={idx + 1}
                layer={layer}
                onRemove={() => onRemove(layer.id)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </Box>
  );
}

const reorderListStyle: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};
const reorderItemStyle: CSSProperties = { listStyle: "none" };

function FlowRow({
  index,
  layer,
  onRemove,
}: {
  index: number;
  layer: PipelineTemplate;
  onRemove: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1,
        py: 0.75,
        borderRadius: 1.5,
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "grab",
        "&:active": { cursor: "grabbing" },
      }}
    >
      <DragIndicatorIcon
        sx={{ fontSize: 18, color: "rgba(255,255,255,0.35)" }}
        aria-hidden
      />
      <Box
        sx={{
          width: 18,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
          color: "rgba(255,255,255,0.45)",
          fontSize: 11,
        }}
      >
        {index}
      </Box>
      <Symbol
        name={layer.symbol}
        color={layer.symbolColor}
        size={28}
        variant="filled"
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, lineHeight: 1.2, color: "rgba(255,255,255,0.92)" }}
          noWrap
        >
          {layer.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.55)", display: "block" }}
          noWrap
        >
          {layer.summary}
        </Typography>
      </Box>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${layer.name} from flow`}
        sx={{ color: "rgba(255,255,255,0.55)" }}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

function AvailableSection({
  inactive,
  onAdd,
}: {
  inactive: PipelineTemplate[];
  onAdd: (id: string) => void;
}) {
  return (
    <Box sx={{ px: 1, py: 1 }}>
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          letterSpacing: 1,
          px: 1,
        }}
      >
        Available · {inactive.length}
      </Typography>
      <Box
        sx={{
          mt: 0.5,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {inactive.map((layer) => (
          <ButtonBase
            key={layer.id}
            onClick={() => onAdd(layer.id)}
            sx={{
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 0.75,
              borderRadius: 1.5,
              border: "1px solid transparent",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.10)",
              },
            }}
            aria-label={`Add ${layer.name} to flow`}
          >
            <Symbol
              name={layer.symbol}
              color={layer.symbolColor}
              size={28}
              variant="ghost"
            />
            <Box sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, lineHeight: 1.2, color: "rgba(255,255,255,0.85)" }}
                noWrap
              >
                {layer.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}
                noWrap
              >
                {layer.summary}
              </Typography>
            </Box>
            <AddRoundedIcon
              sx={{ fontSize: 18, color: "rgba(255,255,255,0.55)" }}
            />
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
}
