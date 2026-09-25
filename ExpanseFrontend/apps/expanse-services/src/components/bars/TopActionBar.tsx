"use client"

import { Box, IconButton, Tooltip, Typography, Chip } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import SettingsIcon from "@mui/icons-material/Settings"
import HelpIcon from "@mui/icons-material/Help"
import { useNavigation } from "@/context"
import { getPageConfigFromPosition, CENTER } from "@/types/grid"

export function TopActionBar() {
  const { currentPosition, navigateTo, canGoBack, goBack } = useNavigation()
  const pageConfig = getPageConfigFromPosition(currentPosition)

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        bgcolor: "rgba(20, 20, 30, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        zIndex: 1200,
      }}
    >
      {/* Left section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Home">
          <IconButton
            onClick={() => navigateTo(CENTER)}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>

        {pageConfig && (
          <>
            <Typography variant="h6" sx={{ ml: 1 }}>
              {pageConfig.title}
            </Typography>
            {pageConfig.category && (
              <Chip
                label={pageConfig.category}
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            )}
          </>
        )}
      </Box>

      {/* Right section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Settings">
          <IconButton
            onClick={() => navigateTo({ x: 0, y: 0 })}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Help">
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default TopActionBar
