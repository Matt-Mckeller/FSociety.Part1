/**
 * MetricCard - Reusable card for displaying metrics
 */
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
} from "@mui/material"
import { SvgIconComponent } from "@mui/icons-material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat"

interface MetricCardProps {
  icon: SvgIconComponent
  label: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    label?: string
  }
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info"
}

function TrendIndicator({ value, label }: { value: number; label?: string }) {
  const Icon =
    value > 0 ? TrendingUpIcon : value < 0 ? TrendingDownIcon : TrendingFlatIcon
  const color =
    value > 0 ? "success.main" : value < 0 ? "error.main" : "text.secondary"

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Icon sx={{ fontSize: 16, color }} />
      <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
        {Math.abs(value)}%
      </Typography>
      {label && (
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      )}
    </Stack>
  )
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  color = "primary",
}: MetricCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "all 0.2s",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              sx={{
                bgcolor: `${color}.light`,
                width: 48,
                height: 48,
              }}
            >
              <Icon sx={{ color: `${color}.main` }} />
            </Avatar>
            <Box flex={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {label}
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 0.5 }}>
                {value}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Stack>

          {trend && <TrendIndicator value={trend.value} label={trend.label} />}
        </Stack>
      </CardContent>
    </Card>
  )
}
