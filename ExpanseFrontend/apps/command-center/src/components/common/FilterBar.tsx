/**
 * FilterBar - Standardized filter bar layout
 *
 * Provides consistent filter UI layout across all views.
 * Uses MUI spacing (theme.spacing multiplier values).
 */
import { Stack, type StackProps } from "@mui/material"
import { type ReactNode } from "react"

export interface FilterBarProps extends Omit<StackProps, "direction"> {
  /** Filter elements (SearchInput, Select, ToggleButtonGroup, etc.) */
  children: ReactNode
  /** Layout direction on larger screens */
  justify?: "start" | "end" | "between" | "center"
}

const justifyMap = {
  start: "flex-start",
  end: "flex-end",
  between: "space-between",
  center: "center",
}

export function FilterBar({
  children,
  justify = "start",
  sx,
  ...props
}: FilterBarProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: justifyMap[justify],
        gap: 2,
        mb: 3,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  )
}
