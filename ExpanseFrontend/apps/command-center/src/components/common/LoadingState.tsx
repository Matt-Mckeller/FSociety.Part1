/**
 * LoadingState - Standardized loading indicators
 *
 * Provides consistent loading UI across all views.
 * Uses MUI theme for consistent styling.
 */
import {
  Box,
  CircularProgress,
  Typography,
  Skeleton,
  type SxProps,
  type Theme,
} from "@mui/material"
import { ICON_SIZE } from "./ui-constants"

export interface LoadingStateProps {
  /** Loading variant */
  variant?: "spinner" | "skeleton" | "inline"
  /** Message to display with spinner */
  message?: string
  /** Size of spinner (default: md) */
  size?: "sm" | "md" | "lg"
  /** Number of skeleton rows to show */
  skeletonRows?: number
  /** Custom styles */
  sx?: SxProps<Theme>
}

const spinnerSizes = {
  sm: ICON_SIZE.md,
  md: ICON_SIZE.lg,
  lg: ICON_SIZE.xl,
}

export function LoadingState({
  variant = "spinner",
  message,
  size = "md",
  skeletonRows = 3,
  sx,
}: LoadingStateProps) {
  if (variant === "inline") {
    return (
      <CircularProgress
        size={spinnerSizes.sm}
        sx={{ color: "text.secondary", ...sx }}
      />
    )
  }

  if (variant === "skeleton") {
    return (
      <Box sx={{ width: "100%", ...sx }}>
        {Array.from({ length: skeletonRows }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={60}
            sx={{
              mb: i < skeletonRows - 1 ? 1 : 0,
              borderRadius: 1,
            }}
          />
        ))}
      </Box>
    )
  }

  // Default: centered spinner
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        bgcolor: "action.hover",
        borderRadius: (theme) => theme.shape.borderRadius / 8,
        ...sx,
      }}
    >
      <CircularProgress size={spinnerSizes[size]} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}

/**
 * LoadingButton helper - for buttons with loading state
 * Use with MUI Button's startIcon prop
 */
export function LoadingIcon({ loading }: { loading: boolean }) {
  if (!loading) return null
  return <CircularProgress size={ICON_SIZE.sm} color="inherit" />
}
