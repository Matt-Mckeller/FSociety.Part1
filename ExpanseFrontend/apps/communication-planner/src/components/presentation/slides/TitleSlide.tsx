"use client"

import { Box, Typography, Chip, alpha } from "@mui/material"
import { Person } from "@mui/icons-material"
import { slideStyles, gamingColors } from "../themes/gamingTheme"

interface TitleSlideProps {
  title: string
  theme?: string
  audienceName?: string
}

export function TitleSlide({ title, theme, audienceName }: TitleSlideProps) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: slideStyles.gradients.title,
        px: 6,
        position: "relative",
      }}
    >
      {audienceName && (
        <Chip
          icon={<Person />}
          label={`For ${audienceName}`}
          sx={{
            mb: 4,
            bgcolor: alpha(gamingColors.neonPurple, 0.18),
            color: gamingColors.neonCyan,
            border: `1px solid ${alpha(gamingColors.neonPurple, 0.35)}`,
            "& .MuiChip-icon": { color: gamingColors.neonCyan },
          }}
        />
      )}

      <Typography
        variant="h1"
        sx={{ color: gamingColors.textPrimary, mb: 2.5, maxWidth: 880 }}
      >
        {title}
      </Typography>

      {theme && (
        <Typography
          variant="h5"
          sx={{
            color: gamingColors.textSecondary,
            maxWidth: 680,
            fontWeight: 400,
          }}
        >
          {theme}
        </Typography>
      )}
    </Box>
  )
}
