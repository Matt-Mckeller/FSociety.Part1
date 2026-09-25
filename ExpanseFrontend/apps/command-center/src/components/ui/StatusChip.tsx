/**
 * StatusChip - Consistent status chip component
 */
import { Chip, ChipProps } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import PauseCircleIcon from "@mui/icons-material/PauseCircle"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import ScheduleIcon from "@mui/icons-material/Schedule"
import BlockIcon from "@mui/icons-material/Block"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import type { QuestStatus } from "../../types"

interface StatusConfig {
  label: string
  color: ChipProps["color"]
  icon: React.ReactElement
}

const STATUS_CONFIGS: Record<QuestStatus, StatusConfig> = {
  concept: {
    label: "Concept",
    color: "default",
    icon: <LightbulbIcon />,
  },
  "not-started": {
    label: "Not Started",
    color: "default",
    icon: <ScheduleIcon />,
  },
  "in-progress": {
    label: "In Progress",
    color: "primary",
    icon: <PlayCircleIcon />,
  },
  "quest-complete": {
    label: "Complete",
    color: "success",
    icon: <CheckCircleIcon />,
  },
  cancelled: {
    label: "Cancelled",
    color: "error",
    icon: <CancelIcon />,
  },
  blocked: {
    label: "Blocked",
    color: "error",
    icon: <BlockIcon />,
  },
  paused: {
    label: "Paused",
    color: "warning",
    icon: <PauseCircleIcon />,
  },
}

interface StatusChipProps {
  status: QuestStatus
  size?: ChipProps["size"]
  showIcon?: boolean
}

export function StatusChip({
  status,
  size = "small",
  showIcon = true,
}: StatusChipProps) {
  const config = STATUS_CONFIGS[status]

  return (
    <Chip
      label={config.label}
      color={config.color}
      icon={showIcon ? config.icon : undefined}
      size={size}
      sx={{
        fontWeight: 600,
        textTransform: "uppercase",
        fontSize: "0.7rem",
        letterSpacing: 0.5,
      }}
    />
  )
}

/**
 * Get status configuration for custom rendering
 */
export function getStatusConfig(status: QuestStatus) {
  return STATUS_CONFIGS[status]
}
