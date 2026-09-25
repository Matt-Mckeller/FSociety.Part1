"use client"

import { Box, IconButton, Tooltip, Divider } from "@mui/material"
import LockIcon from "@mui/icons-material/Lock"
import ApiIcon from "@mui/icons-material/Api"
import CableIcon from "@mui/icons-material/Cable"
import DescriptionIcon from "@mui/icons-material/Description"
import { useNavigation } from "@/context"
import { getPageConfigByType } from "@/types/grid"

const QUICK_LINKS = [
  { type: "auth", icon: LockIcon, color: "warning.main" },
  { type: "api", icon: ApiIcon, color: "success.main" },
  { type: "websockets", icon: CableIcon, color: "error.main" },
  { type: "docs", icon: DescriptionIcon, color: "primary.main" },
] as const

export function RightActionBar() {
  const { navigateTo } = useNavigation()

  return (
    <Box
      sx={{
        position: "fixed",
        top: 56,
        right: 0,
        bottom: 80,
        width: 56,
        bgcolor: "rgba(20, 20, 30, 0.95)",
        backdropFilter: "blur(8px)",
        borderLeft: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 2,
        gap: 1,
        zIndex: 1100,
      }}
    >
      {QUICK_LINKS.map(({ type, icon: Icon, color }) => {
        const config = getPageConfigByType(type)
        if (!config) return null

        return (
          <Tooltip key={type} title={config.title} placement="left">
            <IconButton
              onClick={() => navigateTo(config.position)}
              sx={{
                color: "text.secondary",
                "&:hover": { color, bgcolor: "action.hover" },
              }}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        )
      })}

      <Divider sx={{ my: 1, width: "60%" }} />
    </Box>
  )
}

export default RightActionBar
