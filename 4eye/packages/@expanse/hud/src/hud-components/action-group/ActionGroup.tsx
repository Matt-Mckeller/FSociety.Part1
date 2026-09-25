/**
 * ActionGroup Component
 *
 * Wraps ActionButton components to add selection behavior.
 * Supports radio (single), checkbox (multiple), or buttons (no selection) modes.
 *
 * @example
 * ```tsx
 * // Radio selection (single active)
 * <ActionGroup mode="radio" value={tool} onChange={setTool} indicator="circle">
 *   <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
 *   <ActionButton icon={<ViewIcon />} label="View" value="view" />
 *   <ActionButton icon={<SelectIcon />} label="Select" value="select" />
 * </ActionGroup>
 *
 * // Checkbox selection (multiple toggles)
 * <ActionGroup
 *   mode="checkbox"
 *   values={settings}
 *   onToggle={(v, on) => toggle(v)}
 *   indicator="square"
 * >
 *   <ActionButton icon={<GridIcon />} label="Grid" value="grid" />
 *   <ActionButton icon={<SnapIcon />} label="Snap" value="snap" />
 * </ActionGroup>
 *
 * // Button group (no selection, just visual grouping)
 * <ActionGroup mode="buttons">
 *   <ActionButton icon={<UndoIcon />} label="Undo" onClick={undo} />
 *   <ActionButton icon={<RedoIcon />} label="Redo" onClick={redo} />
 * </ActionGroup>
 * ```
 */

"use client"

import React, { useMemo, useCallback, Children, cloneElement, isValidElement } from "react"
import { Box } from "@mui/material"
import { ActionGroupContext } from "./ActionGroupContext"
import { SelectionIndicator } from "./SelectionIndicator"
import type {
  ActionGroupProps,
  ActionGroupContextValue,
  SelectionIndicatorPosition,
} from "./types"

// =============================================================================
// Component
// =============================================================================

export function ActionGroup(props: ActionGroupProps) {
  const {
    children,
    indicator = "none",
    indicatorPosition = "overlay",
    indicatorSize = "sm",
    indicatorColor,
    gap = 0.5,
    orientation = "horizontal",
    sx,
  } = props

  // Determine mode
  const mode = props.mode ?? "buttons"

  // Create isActive function based on mode
  const isActive = useCallback(
    (value: string): boolean => {
      if (mode === "radio" && "value" in props && props.value !== undefined) {
        return props.value === value
      }
      if (mode === "checkbox" && "values" in props && props.values !== undefined) {
        return (props.values as Record<string, boolean>)[value] ?? false
      }
      return false
    },
    [mode, props]
  )

  // Create onSelect function based on mode
  const onSelect = useCallback(
    (value: string): void => {
      if (mode === "radio" && "onChange" in props && props.onChange) {
        props.onChange(value)
      }
      if (mode === "checkbox" && "onToggle" in props && props.onToggle) {
        const values = "values" in props && props.values ? props.values : {}
        const currentValue = (values as Record<string, boolean>)[value] ?? false
        props.onToggle(value, !currentValue)
      }
    },
    [mode, props]
  )

  // Build context value
  const contextValue = useMemo<ActionGroupContextValue>(
    () => ({
      mode,
      isActive,
      onSelect,
      indicator:
        indicator !== "none"
          ? {
              shape: indicator,
              position: indicatorPosition,
              size: indicatorSize,
              color: indicatorColor,
            }
          : undefined,
    }),
    [mode, isActive, onSelect, indicator, indicatorPosition, indicatorSize, indicatorColor]
  )

  // Wrap children with indicators if needed
  const wrappedChildren = useMemo(() => {
    if (indicator === "none" || indicatorPosition === "overlay") {
      return children
    }

    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child

      const value = child.props.value
      const active = value ? isActive(value) : false

      const indicatorElement = (
        <SelectionIndicator
          shape={indicator}
          active={active}
          mode={mode}
          size={indicatorSize}
          color={indicatorColor}
          orientation={orientation}
        />
      )

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: orientation === "horizontal" ? "row" : "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {indicatorPosition === "start" && indicatorElement}
          {child}
          {indicatorPosition === "end" && indicatorElement}
        </Box>
      )
    })
  }, [
    children,
    indicator,
    indicatorPosition,
    indicatorSize,
    indicatorColor,
    mode,
    orientation,
    isActive,
  ])

  return (
    <ActionGroupContext.Provider value={contextValue}>
      <Box
        sx={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
          alignItems: "center",
          gap,
          ...sx,
        }}
      >
        {wrappedChildren}
      </Box>
    </ActionGroupContext.Provider>
  )
}

export default ActionGroup
