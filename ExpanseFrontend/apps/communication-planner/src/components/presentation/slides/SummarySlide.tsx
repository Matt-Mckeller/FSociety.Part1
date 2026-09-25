"use client"

import { Box, Typography, alpha } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import { slideStyles, gamingColors } from "../themes/gamingTheme"

interface SummarySlideProps {
  title: string
  keyPoints: string[]
  expanded?: boolean
}

const BRIEF_COUNT = 3

export function SummarySlide({
  title,
  keyPoints,
  expanded = false,
}: SummarySlideProps) {
  const points = expanded ? keyPoints : keyPoints.slice(0, BRIEF_COUNT)

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: expanded ? "flex-start" : "center",
        background: slideStyles.gradients.summary,
        px: { xs: 4, md: 8 },
        py: 6,
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: gamingColors.textPrimary, mb: 4 }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          flex: expanded ? 1 : "none",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: points.length > 4 ? "1fr 1fr" : "1fr",
          },
          gap: 1.5,
          alignContent: "start",
        }}
      >
        {points.map((point, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              p: 2,
              borderRadius: 1,
              bgcolor: alpha(gamingColors.neonPurple, 0.08),
              border: `1px solid ${alpha(gamingColors.neonPurple, 0.2)}`,
            }}
          >
            <CheckCircle
              sx={{
                fontSize: 18,
                color: gamingColors.neonCyan,
                mt: 0.25,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body1"
              sx={{ color: gamingColors.textPrimary, lineHeight: 1.55 }}
            >
              {point}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
