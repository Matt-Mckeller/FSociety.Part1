/**
 * EmptyState - Standardized empty/no-results display
 *
 * Provides consistent messaging when lists are empty.
 * Uses MUI theme for consistent styling.
 */
import {
  Box,
  Typography,
  Button,
  type SxProps,
  type Theme,
} from "@mui/material"
import { type ReactNode } from "react"
import SearchOffIcon from "@mui/icons-material/SearchOff"
import InboxIcon from "@mui/icons-material/Inbox"

export interface EmptyStateProps {
  /** Main message to display */
  message: string
  /** Optional secondary description */
  description?: string
  /** Icon to display (default: InboxIcon for empty, SearchOffIcon for no results) */
  icon?: ReactNode
  /** Variant affects default icon selection */
  variant?: "empty" | "no-results" | "error"
  /** Action button props */
  action?: {
    label: string
    onClick: () => void
  }
  /** Custom styles */
  sx?: SxProps<Theme>
}

export function EmptyState({
  message,
  description,
  icon,
  variant = "empty",
  action,
  sx,
}: EmptyStateProps) {
  const defaultIcons = {
    empty: <InboxIcon sx={{ fontSize: 48, color: "text.disabled" }} />,
    "no-results": (
      <SearchOffIcon sx={{ fontSize: 48, color: "text.disabled" }} />
    ),
    error: <InboxIcon sx={{ fontSize: 48, color: "error.main" }} />,
  }

  const displayIcon = icon ?? defaultIcons[variant]

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        textAlign: "center",
        bgcolor: (theme) => theme.palette.action.hover,
        borderRadius: (theme) => theme.shape.borderRadius / 8,
        ...sx,
      }}
    >
      {displayIcon && <Box sx={{ mb: 2 }}>{displayIcon}</Box>}

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {message}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ mt: 0.5, maxWidth: 400 }}
        >
          {description}
        </Typography>
      )}

      {action && (
        <Button
          variant="contained"
          size="small"
          onClick={action.onClick}
          sx={{ mt: 2 }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  )
}
