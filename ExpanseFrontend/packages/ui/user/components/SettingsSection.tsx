"use client"

import React, { useState, ReactNode } from "react"
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Divider,
  useTheme,
  Paper,
} from "@mui/material"
import {
  ExpandMore,
  ExpandLess,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { SvgIconComponent } from "@mui/icons-material"

export interface SettingsSectionProps {
  /** Section title */
  title: string
  /** Optional description text */
  description?: string
  /** Section content */
  children: ReactNode
  /** Optional icon component */
  icon?: SvgIconComponent
  /** Whether section is collapsible */
  collapsible?: boolean
  /** Initial collapsed state */
  defaultCollapsed?: boolean
  /** Show divider at bottom */
  showDivider?: boolean
  /** Variant styling */
  variant?: "default" | "outlined" | "filled"
  /** Optional action element (e.g., button) */
  action?: ReactNode
  /** Whether section is disabled */
  disabled?: boolean
  /** Additional sx props for container */
  sx?: object
}

/**
 * SettingsSection component for organizing settings into logical groups.
 * Supports collapsible content, icons, and various visual variants.
 * 
 * Follows Expanse brand aesthetic with consistent spacing and typography.
 */
export function SettingsSection({
  title,
  description,
  children,
  icon: Icon,
  collapsible = false,
  defaultCollapsed = false,
  showDivider = true,
  variant = "default",
  action,
  disabled = false,
  sx = {},
}: SettingsSectionProps) {
  const theme = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed)
    }
  }

  // Container styles based on variant
  const getContainerStyles = () => {
    const baseStyles = {
      opacity: disabled ? 0.6 : 1,
      pointerEvents: disabled ? "none" : "auto",
      transition: "all 0.2s ease-in-out",
    }

    switch (variant) {
      case "outlined":
        return {
          ...baseStyles,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "7px",
          p: 3,
        }
      case "filled":
        return {
          ...baseStyles,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          borderRadius: "7px",
          p: 3,
        }
      default:
        return {
          ...baseStyles,
          py: 2,
        }
    }
  }

  // Header section
  const HeaderContent = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: collapsible ? "pointer" : "default",
        userSelect: "none",
      }}
      onClick={toggleCollapse}
      role={collapsible ? "button" : undefined}
      aria-expanded={collapsible ? !isCollapsed : undefined}
      tabIndex={collapsible ? 0 : undefined}
      onKeyDown={(e) => {
        if (collapsible && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          toggleCollapse()
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {Icon && (
          <Icon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 24,
            }}
          />
        )}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mt: 0.5,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {action}
        {collapsible && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              toggleCollapse()
            }}
            aria-label={isCollapsed ? "Expand section" : "Collapse section"}
          >
            {isCollapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        )}
      </Box>
    </Box>
  )

  // Content section
  const ContentSection = () => {
    const content = (
      <Box
        sx={{
          mt: 2,
        }}
      >
        {children}
      </Box>
    )

    if (collapsible) {
      return (
        <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
          {content}
        </Collapse>
      )
    }

    return content
  }

  return (
    <Box sx={{ ...getContainerStyles(), ...sx }}>
      <HeaderContent />
      <ContentSection />
      {showDivider && variant === "default" && (
        <Divider sx={{ mt: 3, mb: 1 }} />
      )}
    </Box>
  )
}

/**
 * SettingsSectionGroup - Container for multiple SettingsSection components
 */
export interface SettingsSectionGroupProps {
  /** Child SettingsSection components */
  children: ReactNode
  /** Title for the group */
  title?: string
  /** Description for the group */
  description?: string
  /** Visual variant */
  variant?: "default" | "card"
}

export function SettingsSectionGroup({
  children,
  title,
  description,
  variant = "default",
}: SettingsSectionGroupProps) {
  const theme = useTheme()

  const content = (
    <>
      {(title || description) && (
        <Box sx={{ mb: 3 }}>
          {title && (
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: description ? 1 : 0,
              }}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </>
  )

  if (variant === "card") {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: "7px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {content}
      </Paper>
    )
  }

  return <Box>{content}</Box>
}

export default SettingsSection
