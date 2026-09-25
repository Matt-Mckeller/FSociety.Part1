"use client"

import { Box, IconButton, Tooltip, alpha } from "@mui/material"
import { ReactNode } from "react"
import { gamingColors } from "./themes/gamingTheme"

export interface SlideOrb {
  id: string
  icon: ReactNode
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
}

interface SlideOrbBarProps {
  items: SlideOrb[]
}

export function SlideOrbBar({ items }: SlideOrbBarProps) {
  if (items.length === 0) return null

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        px: 1.5,
        py: 1,
        borderRadius: 28,
        bgcolor: alpha("#000", 0.5),
        border: `1px solid ${alpha("#fff", 0.1)}`,
        backdropFilter: "blur(12px)",
      }}
    >
      {items.map((item) => {
        const accent = item.active
          ? gamingColors.neonCyan
          : gamingColors.textSecondary

        return (
          <Tooltip key={item.id} title={item.label} placement="top">
            <span>
              <IconButton
                onClick={item.onClick}
                disabled={item.disabled}
                aria-label={item.label}
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: item.active
                    ? alpha(gamingColors.neonPurple, 0.45)
                    : alpha(gamingColors.cardBg, 0.9),
                  border: `1px solid ${alpha(accent, item.active ? 0.5 : 0.22)}`,
                  color: accent,
                  "&:hover": {
                    bgcolor: alpha(gamingColors.neonPurple, 0.35),
                    color: gamingColors.neonCyan,
                  },
                  "&.Mui-disabled": {
                    color: gamingColors.textMuted,
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </span>
          </Tooltip>
        )
      })}
    </Box>
  )
}
