"use client"

import React, { useState, useCallback, useRef, type ReactNode } from "react"
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
  type Breakpoint,
  type SxProps,
  type Theme,
} from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { MinimapPanel, type MinimapPanelProps } from "./MinimapPanel"
import { TileListPanel } from "@expanse/map"

// =============================================================================
// Types
// =============================================================================

export type MinimapDockPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left"

export interface MinimapDockProps
  extends Omit<
    MinimapPanelProps,
    | "position"
    | "open"
    | "onOpenChange"
    | "defaultOpen"
    | "showToggleButton"
    | "listViewOpen"
    | "onListViewOpenChange"
  > {
  /** Corner anchor for the whole dock (panel + slot buttons). @default "top-right" */
  position?: MinimapDockPosition
  /** Initial open state for uncontrolled mode. @default false */
  defaultOpen?: boolean
  /** Controlled open state */
  open?: boolean
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void
  /** Initial list-view open state for uncontrolled mode. @default false */
  defaultListViewOpen?: boolean
  /** Controlled list-view open state */
  listViewOpen?: boolean
  /** Called when the list-view open state should change */
  onListViewOpenChange?: (open: boolean) => void
  /**
   * Buttons rendered alongside the minimap when it is **collapsed**.
   * They sit on the inboard side of the panel (toward the screen interior),
   * so they remain glued to the panel edge as a frosted pill / slot bar.
   */
  slotButtons?: ReactNode
  /**
   * Compact actions shown **inside the panel header** when the map is expanded.
   * Keeps screen real-estate when the full panel is open.
   * Falls back to `slotButtons` if not provided.
   */
  headerActions?: ReactNode
  /**
   * Layout of slot buttons relative to the panel.
   * - "row" (default): horizontal stack beside the panel
   * - "column": vertical stack beside the panel
   * @default "column"
   */
  slotOrientation?: "row" | "column"
  /** Gap between slot buttons and the panel in pixels. @default 8 */
  slotGap?: number
  /**
   * MUI breakpoint at and below which mobile behavior kicks in:
   * - collapsed view hides the chip row (only the map toggle is shown)
   * - expanded panel shrinks (smaller `tileSize`, capped width / height)
   * - header actions overflow into a "More" menu beyond `maxVisibleActions`
   * @default "md"
   */
  mobileBreakpoint?: Breakpoint
  /**
   * Force mobile mode on/off. When undefined the breakpoint media query decides.
   * Useful for stories and tests.
   */
  mobile?: boolean
  /**
   * Maximum header-action chips visible inline on mobile before the rest are
   * collapsed into an overflow "More" menu.
   * @default 2
   */
  maxVisibleActions?: number
  /** Tile size used for the minimap grid in mobile mode. @default 16 */
  mobileTileSize?: number
  /** Max width of the expanded panel in mobile mode. @default "calc(100vw - 32px)" */
  mobileMaxWidth?: number | string
  /** Max height of the expanded panel in mobile mode. @default "70vh" */
  mobileMaxHeight?: number | string
  /** Additional styles applied to the outer dock wrapper */
  sx?: SxProps<Theme>
}

// =============================================================================
// Layout
// =============================================================================

const DOCK_POSITION_STYLES: Record<
  MinimapDockPosition,
  {
    wrapper: { top?: number; right?: number; bottom?: number; left?: number }
    flexDirection: "row" | "row-reverse"
    align: "flex-start" | "flex-end"
  }
> = {
  // Buttons sit to the LEFT of the panel when the panel is on the right
  "top-right":    { wrapper: { top: 16, right: 16 },    flexDirection: "row",         align: "flex-start" },
  "bottom-right": { wrapper: { bottom: 16, right: 16 }, flexDirection: "row",         align: "flex-end" },
  // Buttons sit to the RIGHT of the panel when the panel is on the left
  "top-left":     { wrapper: { top: 16, left: 16 },     flexDirection: "row-reverse", align: "flex-start" },
  "bottom-left":  { wrapper: { bottom: 16, left: 16 },  flexDirection: "row-reverse", align: "flex-end" },
}

// =============================================================================
// Frosted chip styling
// =============================================================================
// Mirrors the MinimapPanel toggle button (frosted variant fallback) so that
// individual slot icons rendered in the collapsed state visually match the
// map toggle button beside them.
const FROSTED_CHIP_SX = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // Enforce a true circle that matches the xs ActionButton (32px) the dock
  // is intended to host. Without explicit dimensions the wrapper collapses
  // to fit the inner button and `borderRadius: 50%` produces an oval.
  width: 36,
  height: 36,
  minWidth: 36,
  flexShrink: 0,
  bgcolor: "rgba(255, 255, 255, 0.94)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(0, 0, 0, 0.30)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
  borderRadius: "50%",
  // Allow MUI Badge dot to overflow the circle
  overflow: "visible",
  // Inner ActionButton should sit transparent on the chip surface
  "& .MuiIconButton-root": {
    bgcolor: "transparent",
    boxShadow: "none",
    border: "none",
    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
  },
} as const

// =============================================================================
// Component
// =============================================================================

/**
 * MinimapDock — positions a `MinimapPanel` together with companion buttons
 * (e.g. backpack, inventory, prev/next) so they share one anchor.
 *
 * The slot buttons sit on the INBOARD side of the panel (toward screen center),
 * so when the panel toggles between collapsed (small map icon) and expanded
 * (full panel), the buttons stay glued to its inboard edge — game-HUD style.
 *
 * @example
 * ```tsx
 * <MinimapDock
 *   position="top-right"
 *   defaultOpen
 *   slotButtons={
 *     <ActionBar variant="frosted" orientation="vertical">
 *       <ActionButton icon={<BackpackIcon />} label="Backpack" />
 *       <ActionButton icon={<InventoryIcon />} label="Inventory" />
 *     </ActionBar>
 *   }
 * />
 * ```
 */
export function MinimapDock({
  position = "top-right",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  defaultListViewOpen = false,
  listViewOpen: controlledListViewOpen,
  onListViewOpenChange,
  slotButtons,
  headerActions,
  slotOrientation = "column",
  slotGap = 8,
  mobileBreakpoint = "tablet",
  mobile,
  maxVisibleActions = 2,
  mobileTileSize = 16,
  mobileMaxWidth = "calc(100vw - 32px)",
  mobileMaxHeight = "70vh",
  sx,
  ...panelProps
}: MinimapDockProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? !!controlledOpen : internalOpen

  const [internalListViewOpen, setInternalListViewOpen] = useState(defaultListViewOpen)
  const isListViewControlled = controlledListViewOpen !== undefined
  const isListViewOpen = isListViewControlled ? !!controlledListViewOpen : internalListViewOpen

  // Mutual exclusion: only one panel (map OR list) is open at a time.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next && isListViewOpen) {
        if (isListViewControlled) onListViewOpenChange?.(false)
        else setInternalListViewOpen(false)
      }
      if (isControlled) onOpenChange?.(next)
      else {
        setInternalOpen(next)
        onOpenChange?.(next)
      }
    },
    [isControlled, onOpenChange, isListViewOpen, isListViewControlled, onListViewOpenChange]
  )

  const handleListViewOpenChange = useCallback(
    (next: boolean) => {
      if (next && isOpen) {
        if (isControlled) onOpenChange?.(false)
        else setInternalOpen(false)
      }
      if (isListViewControlled) onListViewOpenChange?.(next)
      else {
        setInternalListViewOpen(next)
        onListViewOpenChange?.(next)
      }
    },
    [isListViewControlled, onListViewOpenChange, isOpen, isControlled, onOpenChange]
  )

  const theme = useTheme()
  const mediaMatchesMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint))
  const isMobile = mobile ?? mediaMatchesMobile

  const layout = DOCK_POSITION_STYLES[position]

  // Normalize headerActions into a flat array so each child renders as its own
  // chip when collapsed. Unwraps Fragments so callers can pass `<><A/><B/></>`.
  const headerActionItems = React.useMemo(() => {
    if (!headerActions) return []
    if (
      React.isValidElement(headerActions) &&
      (headerActions.type as unknown) === React.Fragment
    ) {
      return React.Children.toArray(
        (headerActions as React.ReactElement<{ children?: ReactNode }>).props.children
      )
    }
    return React.Children.toArray(headerActions)
  }, [headerActions])

  // Pick which actions render in the panel header when expanded:
  // - mobile: first N inline + remaining in an overflow menu chip
  // - desktop: all inline (existing behavior)
  const headerSlotContent: ReactNode = React.useMemo(() => {
    if (!isOpen) return undefined
    if (headerActionItems.length === 0) return headerActions ?? slotButtons
    if (!isMobile) return headerActions
    return (
      <OverflowActions
        actions={headerActionItems}
        maxVisible={maxVisibleActions}
      />
    )
  }, [isOpen, isMobile, headerActions, headerActionItems, maxVisibleActions, slotButtons])

  // Mobile sx override for the panel: cap dimensions and let MUI's auto width
  // win over the default `width: panelWidth` so the map shrinks gracefully.
  const mobilePanelSx: SxProps<Theme> | undefined = isMobile
    ? {
        width: "auto",
        maxWidth: mobileMaxWidth,
        maxHeight: mobileMaxHeight,
        overflow: "auto",
      }
    : undefined

  // On mobile, the chip row is suppressed when collapsed — only the map
  // toggle button (rendered by MinimapPanel) is shown.
  const showChipRow = !isMobile && !isOpen && headerActionItems.length > 0
  const showLegacySlotPill = !isMobile && !isOpen && headerActionItems.length === 0 && !!slotButtons

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1200,
        display: "flex",
        flexDirection: layout.flexDirection,
        // Center-align in collapsed state (small toggle + chip row);
        // top/bottom-align when expanded so panel edge meets slot pill.
        alignItems: showChipRow ? "center" : layout.align,
        gap: `${slotGap}px`,
        ...layout.wrapper,
        ...sx,
      }}
    >
      {/*
        DESKTOP COLLAPSED: prefer `headerActions` rendered as a horizontal row
        of round frosted chips (visually matching the map toggle). Falls back
        to the legacy `slotButtons` (vertical ActionBar pill) if headerActions
        is not provided.

        MOBILE COLLAPSED: nothing here — only the panel's built-in map toggle
        is visible, keeping the corner uncluttered. Header actions surface
        when the user opens the map.
      */}
      {showChipRow && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: `${slotGap}px`,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {headerActionItems.map((child, i) =>
            React.isValidElement(child) ? (
              <Box key={i} sx={FROSTED_CHIP_SX}>
                {child}
              </Box>
            ) : child
          )}
        </Box>
      )}

      {showLegacySlotPill && (
        <Box
          sx={{
            display: "flex",
            flexDirection: slotOrientation,
            gap: `${slotGap}px`,
            alignSelf: layout.align,
          }}
        >
          {slotButtons}
        </Box>
      )}

      {/*
        Render the panel statically so the dock controls placement.
        The dock anchors the whole group to one viewport corner; the panel
        flows inside the flex layout, with slot buttons on its inboard side.
        When OPEN: slot buttons are promoted into the panel header (headerSlot)
        so they don't consume extra screen real-estate.
      */}
      <Box sx={{ position: "relative" }}>
        {/* Render the TileListPanel when the list view is open, otherwise render
            the MinimapPanel. Mutual exclusion is enforced in the open handlers
            so only one of the two is ever in the open state. The MinimapPanel
            keeps rendering when collapsed so its toggle buttons (map + list)
            remain visible in the dock corner. */}
        {isListViewOpen ? (
          <TileListPanel
            open={isListViewOpen}
            onOpenChange={handleListViewOpenChange}
            onMinimapButtonClick={() => handleOpenChange(true)}
            categoryColors={panelProps.categoryColors}
            variant={panelProps.variant}
            positioning="static"
            position={position}
            sx={mobilePanelSx}
          />
        ) : (
          <MinimapPanel
            {...panelProps}
            tileSize={isMobile ? mobileTileSize : panelProps.tileSize}
            position={position}
            open={isOpen}
            onOpenChange={handleOpenChange}
            showToggleButton
            listViewOpen={isListViewOpen}
            onListViewOpenChange={handleListViewOpenChange}
            positioning="static"
            headerSlot={headerSlotContent}
            sx={mobilePanelSx}
            onFullScreenRequest={
              panelProps.onFullScreenRequest
                ? () => {
                    // Collapse the dock when the host opens its full-screen
                    // map surface — keeps the corner uncluttered while the
                    // overlay/embed owns the screen.
                    handleOpenChange(false)
                    panelProps.onFullScreenRequest?.()
                  }
                : undefined
            }
          />
        )}
      </Box>
    </Box>
  )
}

// =============================================================================
// OverflowActions — collapses extra header chips into a "More" menu
// =============================================================================

interface OverflowActionsProps {
  actions: ReactNode[]
  maxVisible: number
}

/**
 * Renders the first `maxVisible` actions inline and collapses the rest into
 * an MUI Menu opened by a "More" `MoreHoriz` chip. Each menu item attempts to
 * preserve the original action's `icon`, `label`, `onClick`, and `badge`
 * props (best-effort — works with any element exposing those props, e.g. our
 * `ActionButton`).
 */
function OverflowActions({ actions, maxVisible }: OverflowActionsProps) {
  const visible = actions.slice(0, maxVisible)
  const overflow = actions.slice(maxVisible)
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  if (overflow.length === 0) {
    return <>{actions}</>
  }

  return (
    <>
      {visible}
      <Tooltip title={`More (${overflow.length})`} placement="bottom">
        <IconButton
          ref={anchorRef}
          size="small"
          aria-label={`More actions (${overflow.length})`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorRef.current}
        open={menuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { minWidth: 180 } } }}
      >
        {overflow.map((item, i) => {
          const props = (React.isValidElement(item)
            ? (item as React.ReactElement<{ icon?: ReactNode; label?: string; onClick?: () => void }>).props
            : {}) as { icon?: ReactNode; label?: string; onClick?: () => void }
          return (
            <MenuItem
              key={i}
              onClick={() => {
                props.onClick?.()
                closeMenu()
              }}
            >
              {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
              <ListItemText>{props.label ?? `Action ${maxVisible + i + 1}`}</ListItemText>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
