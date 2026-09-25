"use client"

import { Box, Tooltip, Typography, useTheme } from "@mui/material"
import { ExpandingBar } from "expanse.ui/theme"
import { ExperienceIcon } from "expanse.ui/theme"
import { ExperienceContext } from "../../context"
import { useContext } from "react"

export const ExperienceStatusBar = () => {
  const theme = useTheme()
  const { currentLevelExperience, totalExperienceForCurrentLevel } =
    useContext(ExperienceContext)
  return (
    <ExpandingBar aspectRatio={6}>
      <Tooltip title="Current experience / Experience to next level">
        <Box
          display="flex"
          justifyContent="end"
          height="100%"
          alignItems="center"
          mr={2}
        >
          <Typography
            mr={1}
            textAlign="right"
            color={theme.palette.primary.contrastText}
          >
            {currentLevelExperience} / {totalExperienceForCurrentLevel}
          </Typography>
          <Box height="70%" width="25px" display="flex" justifyContent="center">
            <ExperienceIcon />
          </Box>
        </Box>
      </Tooltip>
    </ExpandingBar>
  )
}
