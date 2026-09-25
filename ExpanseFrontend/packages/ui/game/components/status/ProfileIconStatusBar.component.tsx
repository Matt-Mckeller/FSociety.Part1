"use client"

import { Box, useTheme } from "@mui/system"
import { ExpandingBar } from "../../../theme/components/ExpandingBar.component"
import { Person3 } from "@mui/icons-material"
import { Tooltip, Typography } from "@mui/material"
import { ExperienceContext } from "../../context"
import { useContext } from "react"

export const ProfileIconStatusBar = () => {
  const theme = useTheme()
  const { currentLevel: level } = useContext(ExperienceContext)
  return (
    <ExpandingBar aspectRatio={2}>
      <Tooltip title="Level">
        <Box
          display="flex"
          justifyContent="end"
          alignItems="center"
          height="100%"
          mr={2}
        >
          {/* Level */}

          <Typography
            mr={1}
            textAlign="right"
            color={theme.palette.primary.contrastText}
          >
            {level}
          </Typography>
          <Box display="flex" width="25px" justifyContent="center">
            <Person3
              sx={{
                color: theme.palette.primary.contrastText,
                width: "18px",
                height: "18px",
              }}
            />
          </Box>
        </Box>
      </Tooltip>
    </ExpandingBar>
  )
}
