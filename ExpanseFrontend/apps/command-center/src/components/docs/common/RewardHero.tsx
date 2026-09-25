/**
 * RewardHero - Decorative gradient banner for reward-related doc sections
 * Provides a "picture" moment at the top of a page: gradient field,
 * soft blurred blob shapes, a large icon badge, title/subtitle, and
 * optional stat pills - built entirely from CSS/SVG (no image assets).
 */
import { Box, Typography } from "@mui/material"
import type { ReactNode } from "react"

export interface RewardHeroStat {
  label: string
  value: string | number
}

export interface RewardHeroProps {
  icon: ReactNode
  title: string
  subtitle?: string
  /** Two hex colors for the gradient field */
  gradient: [string, string]
  stats?: RewardHeroStat[]
}

export function RewardHero({
  icon,
  title,
  subtitle,
  gradient,
  stats,
}: RewardHeroProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        mb: 3,
        px: { xs: 3, sm: 4 },
        py: { xs: 3, sm: 4 },
        background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        boxShadow: `0 12px 30px -10px ${gradient[1]}66`,
      }}
    >
      {/* Decorative blurred blobs - the "picture" layer */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.16)",
          filter: "blur(6px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -70,
          right: 120,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.10)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -30,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.08)",
          filter: "blur(4px)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.25rem",
            bgcolor: "rgba(255,255,255,0.22)",
            border: "1px solid rgba(255,255,255,0.35)",
            backdropFilter: "blur(4px)",
            color: "#FFFFFF",
            flexShrink: 0,
            "& .MuiSvgIcon-root": { fontSize: "2.5rem" },
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#FFFFFF", lineHeight: 1.2 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                color: "rgba(255,255,255,0.9)",
                mt: 0.5,
                maxWidth: 620,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {stats && stats.length > 0 && (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            flexWrap: "wrap",
            mt: 3,
          }}
        >
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.16)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(4px)",
                minWidth: 90,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: "#FFFFFF", lineHeight: 1.2 }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.85)" }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default RewardHero
