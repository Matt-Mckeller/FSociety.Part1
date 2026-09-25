"use client"

import { Box, IconButton, Tooltip } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useNavigation } from "@/context"

export function NavigationControls() {
  const { navigate, canNavigate } = useNavigation()

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        zIndex: 1200,
      }}
    >
      {/* Up */}
      <Tooltip title="Up (↑ or W)">
        <span>
          <IconButton
            onClick={() => navigate("up")}
            disabled={!canNavigate("up")}
            sx={{
              bgcolor: "rgba(30, 30, 40, 0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": { bgcolor: "rgba(50, 50, 60, 0.9)" },
              "&.Mui-disabled": { bgcolor: "rgba(20, 20, 30, 0.5)" },
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Left, Down, Right */}
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Tooltip title="Left (← or A)">
          <span>
            <IconButton
              onClick={() => navigate("left")}
              disabled={!canNavigate("left")}
              sx={{
                bgcolor: "rgba(30, 30, 40, 0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { bgcolor: "rgba(50, 50, 60, 0.9)" },
                "&.Mui-disabled": { bgcolor: "rgba(20, 20, 30, 0.5)" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Down (↓ or S)">
          <span>
            <IconButton
              onClick={() => navigate("down")}
              disabled={!canNavigate("down")}
              sx={{
                bgcolor: "rgba(30, 30, 40, 0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { bgcolor: "rgba(50, 50, 60, 0.9)" },
                "&.Mui-disabled": { bgcolor: "rgba(20, 20, 30, 0.5)" },
              }}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Right (→ or D)">
          <span>
            <IconButton
              onClick={() => navigate("right")}
              disabled={!canNavigate("right")}
              sx={{
                bgcolor: "rgba(30, 30, 40, 0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { bgcolor: "rgba(50, 50, 60, 0.9)" },
                "&.Mui-disabled": { bgcolor: "rgba(20, 20, 30, 0.5)" },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default NavigationControls
