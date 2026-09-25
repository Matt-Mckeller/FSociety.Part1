"use client"

import { Box, IconButton, Tooltip, Divider } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import WidgetsIcon from "@mui/icons-material/Widgets"
import GridViewIcon from "@mui/icons-material/GridView"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { useNavigation } from "@/context"
import { getPageConfigByType } from "@/types/grid"

const QUICK_LINKS = [
  { type: "demos", icon: PlayArrowIcon, color: "primary.main" },
  { type: "components", icon: WidgetsIcon, color: "secondary.main" },
  { type: "navigation", icon: GridViewIcon, color: "info.main" },
  { type: "layout", icon: DashboardIcon, color: "info.main" },
] as const

export function LeftActionBar() {
  const { navigateTo } = useNavigation()

  return (
    <Box
      sx={{
        position: "fixed",
        top: 56,
        left: 0,
        bottom: 80,
        width: 56,
        bgcolor: "rgba(20, 20, 30, 0.95)",
        backdropFilter: "blur(8px)",
        borderRight: "1px solid",
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
          <Tooltip key={type} title={config.title} placement="right">
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

export default LeftActionBar
