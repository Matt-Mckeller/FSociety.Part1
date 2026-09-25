"use client"

import React, { useState, type ReactNode } from "react"
import { Box, Typography, type SxProps, type Theme } from "@mui/material"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import HubIcon from "@mui/icons-material/Hub"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined"
import { HUD_HEADER_BAR_SIZE } from "@expanse/brand-core"
import { ActionBar } from "../action-bars"
import type { ActionBarProps } from "../action-bars"
import { ActionButton } from "../action-button"
import type {
  ActionButtonLabelDisplay,
  ActionButtonLabelSize,
} from "../action-button/types"
import { ActionGroup } from "../action-group"

// =============================================================================
// Types
// =============================================================================

/**
 * Mode that drives which context buttons the bar renders. The host app
 * is expected to set this based on the current page/route/feature; the
 * bar itself is presentational and stateless about *which* contexts exist.
 *
 * - `"workspace"` — full set: Goals + Domains + Projects (default)
 * - `"goals"`     — Goals only (focused planning surface)
 * - `"domains"`   — Domains only (taxonomy/admin surface)
 * - `"projects"`  — Projects only (execution surface)
 * - `"goals-projects"` — Goals + Projects, no Domains
 * - `"custom"`    — render whatever `items` the app provides
 */
export type ContextBarMode =
  | "workspace"
  | "goals"
  | "domains"
  | "projects"
  | "goals-projects"
  | "custom"

/**
 * Built-in context ids. Apps may pass arbitrary strings via `items` for
 * custom modes, hence the open string union.
 */
export type ContextBarContext = "goals" | "domains" | "projects" | (string & {})

export interface ContextBarItem {
  /** Stable id used as the radio value */
  id: ContextBarContext
  /** Tooltip / aria label and inline display label */
  label: string
  /** Icon shown inside the button */
  icon: ReactNode
  /** Optional badge count rendered on the button */
  badge?: number | string
  /** Optional sx forwarded to the ActionButton (e.g. fixed width for equal-width tabs) */
  sx?: SxProps<Theme>
}

export interface ContextBarProps
  extends Omit<ActionBarProps, "children" | "orientation"> {
  /**
   * App-driven mode that determines which context items render.
   * Ignored when `items` is provided AND `mode === "custom"`.
   * @default "workspace"
   */
  mode?: ContextBarMode
  /** Bar orientation. @default "horizontal" */
  orientation?: "horizontal" | "vertical"
  /** Controlled active context id */
  value?: ContextBarContext
  /** Initial active context id for uncontrolled use */
  defaultValue?: ContextBarContext
  /** Called when the user selects a different context */
  onChange?: (context: ContextBarContext) => void
  /**
   * Override / supply the renderable items.
   * - In `mode="custom"`, this is the source of truth.
   * - In any other mode, items are first filtered to those mentioned in
   *   the mode, then any matching id from `items` overrides the default
   *   icon/label/badge for that id.
   */
  items?: ContextBarItem[]
  /**
   * Show a `+` Add button on the trailing edge of the bar — useful for
   * quick-creating a new entity in the active context.
   */
  showAdd?: boolean
  /** Click handler for the Add (+) button */
  onAddClick?: () => void
  /**
   * Render an inline text label of the active context next to the buttons.
   * @default false
   */
  showActiveLabel?: boolean
  /**
   * How each context button shows its label. Defaults to `"icon-only"`
   * (icons + tooltips) so the bar stays compact in the HUD chrome. Use
   * `"icon-label-right"` (horizontal) or `"icon-label-below"` (vertical)
   * to render labels inline — e.g. on the MinimapFullView surface where
   * there's room to spell out each context.
   * @default "icon-only"
   */
  labelDisplay?: ActionButtonLabelDisplay
  /** Text size for inline labels. Forwarded to `ActionButton`. */
  labelSize?: ActionButtonLabelSize
  /**
   * Optional renderer for content displayed directly under each
   * button (e.g. a small selection-state strip). The returned node is
   * absolutely positioned at the bottom-center of the button's column,
   * so it doesn't affect button geometry. Return `null` to omit for a
   * given item.
   */
  renderUnderItem?: (item: ContextBarItem) => ReactNode
}

// =============================================================================
// Defaults
// =============================================================================

const DEFAULT_ITEMS: Record<"goals" | "domains" | "projects", ContextBarItem> = {
  goals: {
    id: "goals",
    label: "Goals",
    icon: <TrackChangesIcon />,
  },
  domains: {
    id: "domains",
    label: "Domains",
    icon: <HubIcon />,
  },
  projects: {
    id: "projects",
    label: "Projects",
    icon: <FolderSpecialIcon />,
  },
}

const MODE_ORDER: Record<Exclude<ContextBarMode, "custom">, ContextBarContext[]> = {
  workspace: ["goals", "domains", "projects"],
  goals: ["goals"],
  domains: ["domains"],
  projects: ["projects"],
  "goals-projects": ["goals", "projects"],
}

function resolveItems(
  mode: ContextBarMode,
  overrides?: ContextBarItem[]
): ContextBarItem[] {
  if (mode === "custom") {
    return overrides ?? []
  }
  const ids = MODE_ORDER[mode]
  const overrideById = new Map((overrides ?? []).map((it) => [it.id, it]))
  return ids.map(
    (id) =>
      overrideById.get(id) ??
      DEFAULT_ITEMS[id as "goals" | "domains" | "projects"]
  )
}

// =============================================================================
// Component
// =============================================================================

/**
 * ContextBar — header action bar for switching the active workspace
 * context (Goals / Domains / Projects).
 *
 * The bar is presentational: the host app supplies a `mode` to declare
 * which contexts are available on the current surface, and a controlled
 * `value` + `onChange` (or `defaultValue` for uncontrolled use) to track
 * the active selection.
 *
 * Designed to live in the top-center "header" slot of the HUD.
 *
 * @example Workspace header (all three contexts)
 * ```tsx
 * const [ctx, setCtx] = useState<ContextBarContext>("goals")
 * <ContextBar value={ctx} onChange={setCtx} showAdd onAddClick={openCreate} />
 * ```
 *
 * @example Goal-focused page (only Goals shown)
 * ```tsx
 * <ContextBar mode="goals" value="goals" />
 * ```
 *
 * @example Custom contexts
 * ```tsx
 * <ContextBar
 *   mode="custom"
 *   items={[
 *     { id: "team",   label: "Team",   icon: <GroupIcon /> },
 *     { id: "client", label: "Client", icon: <BusinessIcon /> },
 *   ]}
 *   defaultValue="team"
 * />
 * ```
 */
export function ContextBar({
  mode = "workspace",
  orientation = "horizontal",
  value,
  defaultValue,
  onChange,
  items,
  showAdd = false,
  onAddClick,
  showActiveLabel = false,
  labelDisplay = "icon-only",
  labelSize,
  renderUnderItem,
  variant = "frosted",
  shape = "pill",
  thickness = { pixels: HUD_HEADER_BAR_SIZE.desktop },
  ...rest
}: ContextBarProps) {
  const resolved = React.useMemo(() => resolveItems(mode, items), [mode, items])

  // Pick a sensible initial value: explicit `defaultValue`, else first item.
  const initial = defaultValue ?? resolved[0]?.id ?? ""
  const [internal, setInternal] = useState<ContextBarContext>(initial)
  const isControlled = value !== undefined
  const active = isControlled ? value : internal

  const handleChange = (next: ContextBarContext) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const activeItem = resolved.find((it) => it.id === active)

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <ActionBar
        variant={variant}
        shape={shape}
        thickness={thickness}
        orientation={orientation}
        {...rest}
      >
        {resolved.length > 0 && (
          <ActionGroup
            mode="radio"
            value={active}
            onChange={(v) => handleChange(v as ContextBarContext)}
            indicator="circle"
          >
            {resolved.map((item) => {
              const under = renderUnderItem?.(item)
              const button = (
                <ActionButton
                  key={item.id}
                  value={item.id}
                  icon={item.icon}
                  label={item.label}
                  badge={item.badge}
                  size="sm"
                  labelDisplay={labelDisplay}
                  {...(labelSize ? { labelSize } : {})}
                  {...(item.sx ? { sx: item.sx } : {})}
                />
              )
              if (!under) return button
              return (
                <Box
                  key={item.id}
                  sx={{ position: "relative", display: "inline-flex", overflow: "visible" }}
                >
                  {button}
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      bottom: -10,
                      transform: "translateX(-50%)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  >
                    {under}
                  </Box>
                </Box>
              )
            })}
          </ActionGroup>
        )}
      </ActionBar>

      {showActiveLabel && activeItem && (
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, opacity: 0.8, whiteSpace: "nowrap" }}
        >
          {activeItem.label}
        </Typography>
      )}
    </Box>
  )
}
