"use client"

import { Box, useTheme } from "@mui/system"
import { ProfileStatusDisplay } from "../../status/ProfileStatusDisplay"
import { Badge, Grid, Typography } from "@mui/material"
import BackpackIcon from "@mui/icons-material/Backpack"
import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsIcon from "@mui/icons-material/Notifications"

export const ProfileDisplay = ({
  enableLabels = true,
  barHeight = 50,
  displayIcons = false,
}: {
  enableLabels?: boolean
  /** Height of each status bar in pixels */
  barHeight?: number
  displayIcons?: boolean
}) => {
  const theme = useTheme()
  const labelContainerProps = {
    height: barHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginLeft: 2,
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            mr: 4,
            display: "flex",
            flexDirection: "row"
          }}>
          <ProfileStatusDisplay layout="staircase" barHeight={barHeight} />
          {/* Makeshift labels */}
          {enableLabels && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5
              }}>
              <Box sx={labelContainerProps}>
                <Typography>Level</Typography>
              </Box>
              <Box sx={labelContainerProps}>
                <Typography>Currency</Typography>
              </Box>
              <Box sx={labelContainerProps}>
                <Typography>Experience</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {displayIcons && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            pt: 4
          }}>
          <Box sx={{
            mr: 2
          }}>
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon
                sx={{
                  color: theme.palette.primary.dark,
                }}
              />
            </Badge>
          </Box>
          <Box sx={{
            mr: 2
          }}>
            <Badge badgeContent={2} color="secondary">
              <BackpackIcon
                sx={{
                  color: theme.palette.primary.dark,
                }}
              />
            </Badge>
          </Box>
          <Box>
            <SettingsIcon
              sx={{
                color: theme.palette.primary.dark,
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
