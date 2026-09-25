import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  alpha,
  useTheme,
  Chip,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { StatusBadge } from "../content"
import type { PlanModule } from "../../../types/plans"

interface ModulePageProps {
  module: PlanModule
  children?: React.ReactNode
}

export function ModulePage({ module, children }: ModulePageProps) {
  const theme = useTheme()

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          pb: 3,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {module.title}
          </Typography>
          {module.overallStatus && (
            <StatusBadge status={module.overallStatus} />
          )}
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
          {module.description}
        </Typography>
      </Box>

      {children}
    </Box>
  )
}

interface ModuleListPageProps {
  title: string
  description: string
  modules: Array<{
    id: string
    title: string
    description: string
    path: string
  }>
}

export function ModuleListPage({
  title,
  description,
  modules,
}: ModuleListPageProps) {
  const theme = useTheme()

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {modules.map((module, index) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.2s ease",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              <CardActionArea
                component={RouterLink}
                to={module.path}
                sx={{ height: "100%" }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Chip
                      label={index + 1}
                      size="small"
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {module.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.5 }}
                  >
                    {module.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
