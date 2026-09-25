import React from "react"
import { Box, Typography, useTheme, alpha } from "@mui/material"
import { ActionButton } from "../action-button"
import { useFabCluster } from "./FabClusterContext"
import type { FabTriggerProps } from "./types"
import type { ActionButtonSize } from "../action-button/types"

function defaultInnerSize(px: number): ActionButtonSize {
  if (px <= 28) return "xxs"
  if (px <= 32) return "xs"
  if (px <= 36) return "sm"
  if (px <= 40) return "md"
  return "lg"
}

export function FabTrigger({ id, icon, label, panel, size = 40, innerButtonSize, panelSide = "right", chrome = "default", onClick, active, labelMode = "none", shape = "circle", background }: FabTriggerProps) {
  const { activePanel, open, close, activeTriggerRef } = useFabCluster()
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const isPanelActive = activePanel === id
  // For action-only FABs (no panel): use explicit `active` prop for visual state.
  // For panel FABs: rely on hover-driven activePanel.
  const isActive = panel !== undefined ? isPanelActive : (active ?? false)
  const innerSize = innerButtonSize ?? defaultInnerSize(size)
  const showChrome = chrome !== "none"

  const showLabel = labelMode === "always" && showChrome

  return (
    <Box
      role="group"
      aria-label={label}
      data-fab-id={id}
      onMouseEnter={() => { if (panel !== undefined) open(id) }}
      onMouseLeave={() => { if (panel !== undefined) close() }}
      onFocusCapture={(e: React.FocusEvent<HTMLElement>) => {
        if (panel === undefined) return
        activeTriggerRef.current = e.target as HTMLElement
        open(id)
      }}
      onBlurCapture={(event: React.FocusEvent<HTMLElement>) => {
        if (panel === undefined) return
        const nextTarget = event.relatedTarget as Node | null
        if (!nextTarget || !event.currentTarget.contains(nextTarget)) close()
      }}
      sx={{
        position: "relative",
        width: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // height is "auto" when label is shown so the label doesn't clip
        height: showLabel ? "auto" : size,
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: shape === "square" ? 2 : "50%",
          flexShrink: 0,
          ...(showChrome && (background
            ? {
                background,
                boxShadow: isActive
                  ? "0 0 0 2px rgba(255,255,255,0.35)"
                  : "0 2px 8px rgba(0,0,0,0.35)",
                transition: "box-shadow 180ms ease",
              }
            : {
                bgcolor: isActive
                  ? alpha(primary, 0.22)
                  : alpha(primary, 0.09),
                border: isActive
                  ? `1px solid ${alpha(primary, 0.55)}`
                  : `1px solid ${alpha(primary, 0.28)}`,
                backdropFilter: "blur(12px)",
                boxShadow: isActive
                  ? `0 6px 20px ${alpha(primary, 0.22)}, 0 2px 8px rgba(0,0,0,0.12)`
                  : `0 4px 14px ${alpha(primary, 0.10)}, 0 2px 6px rgba(0,0,0,0.08)`,
                transition:
                  "background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
              })),
        }}
      >
        <ActionButton
          icon={icon}
          label={label}
          size={innerSize}
          onClick={onClick}
          active={active}
          colorMode={background ? "dark" : "auto"}
        />
      </Box>

      {showLabel && (
        <Typography
          sx={{
            mt: 0.5,
            fontSize: 9,
            fontWeight: 600,
            lineHeight: 1,
            color: isActive ? alpha(primary, 0.9) : "text.secondary",
            letterSpacing: 0.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: size + 8,
            textAlign: "center",
            userSelect: "none",
            transition: "color 180ms ease",
          }}
        >
          {label}
        </Typography>
      )}

      {/* Hard swap: only the active panel is mounted — structurally prevents two panels at once */}
      {isPanelActive && panel !== undefined && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            ...(panelSide === "left"
              ? { right: "calc(100% + 8px)" }
              : { left: "calc(100% + 8px)" }),
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {panel}
        </Box>
      )}
    </Box>
  )
}
