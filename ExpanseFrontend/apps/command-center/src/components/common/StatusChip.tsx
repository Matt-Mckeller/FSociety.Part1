/**
 * StatusChip - Standardized status chip with consistent styling
 *
 * Provides consistent status display across all game views.
 */
import { Chip, type ChipProps } from "@mui/material"
import type { QuestStatus, ObjectiveStatus } from "../../types"
import {
  questStatusChipColors,
  questStatusLabels,
  objectiveStatusChipColors,
  objectiveStatusLabels,
} from "../shared/game-constants"

export interface StatusChipProps extends Omit<ChipProps, "label" | "color"> {
  /** The status value */
  status: QuestStatus | ObjectiveStatus
  /** Type determines which color/label mapping to use */
  type?: "quest" | "objective"
  /** Override the default label */
  label?: string
  /** Use compact height */
  compact?: boolean
}

export function StatusChip({
  status,
  type = "quest",
  label,
  compact = false,
  size = "small",
  sx,
  ...props
}: StatusChipProps) {
  // Determine color and label based on type
  let chipColor: "default" | "warning" | "success" | "error"
  let displayLabel: string

  if (type === "quest") {
    chipColor = questStatusChipColors[status as QuestStatus]
    displayLabel = label ?? questStatusLabels[status as QuestStatus]
  } else {
    chipColor = objectiveStatusChipColors[status as ObjectiveStatus]
    displayLabel = label ?? objectiveStatusLabels[status as ObjectiveStatus]
  }

  return (
    <Chip
      label={displayLabel}
      size={size}
      color={chipColor}
      sx={{
        ...(compact && {
          fontSize: "0.65rem",
          height: 20,
        }),
        ...sx,
      }}
      {...props}
    />
  )
}
