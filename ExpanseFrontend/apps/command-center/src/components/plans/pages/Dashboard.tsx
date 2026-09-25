import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  Alert,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { StatusTable } from "../content"
import {
  implementationStatus,
  moduleSummaries,
  tableOfContents,
} from "../../../data/plans"
import { PLANS_BASE_PATH } from "../../../constants"

export function Dashboard() {
  const theme = useTheme()

  // Calculate overall progress
  const totalFeatures = implementationStatus.length
  const doneFeatures = implementationStatus.filter(
    (row) =>
      row.status.data === "done" &&
      row.status.ui === "done" &&
      row.status.logic === "done",
  ).length
  const partialFeatures = implementationStatus.filter(
    (row) =>
      row.status.data === "done" ||
      row.status.ui === "partial" ||
      row.status.logic === "partial",
  ).length
  const progressPercent = Math.round(
    ((doneFeatures * 1 + partialFeatures * 0.3) / totalFeatures) * 100,
  )

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: '1.75rem',
            letterSpacing: "-0.02em",
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.text.secondary} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          4up Plans Overview
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600 }}
        >
          Central navigation and summary for all feature plans
        </Typography>
      </Box>

      {/* Start Here - Onboarding */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 4, 
          bgcolor: alpha(theme.palette.info.main, 0.08),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
          '& .MuiAlert-icon': { color: theme.palette.info.main },
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          🚀 New here? Start with the Generation Module
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The <RouterLink to={`${PLANS_BASE_PATH}/modules/generation`} style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 500 }}>Generation Module Overview</RouterLink> explains the core content creation workflow and architecture.
        </Typography>
      </Alert>

      {/* Progress Overview - Compact */}
      <Card
        sx={{
          mb: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: `0 4px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Implementation Progress
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {progressPercent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 1.5,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              },
            }}
          />
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Chip
              label={`${doneFeatures} Done`}
              color="success"
              size="small"
              sx={{ fontWeight: 600, fontSize: '0.75rem' }}
            />
            <Chip
              label={`${partialFeatures - doneFeatures} In Progress`}
              color="warning"
              size="small"
              sx={{ fontWeight: 600, fontSize: '0.75rem' }}
            />
            <Chip
              label={`${totalFeatures - partialFeatures} Planned`}
              color="default"
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                bgcolor: alpha(theme.palette.text.secondary, 0.1),
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5, mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: '1.125rem',
          }}
        >
          📋 Quick Navigation
        </Typography>
        <Chip 
          label={`${tableOfContents.filter((item) => !item.indent).length} sections`} 
          size="small" 
          variant="outlined" 
          sx={{ fontSize: '0.75rem' }} 
        />
      </Box>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {tableOfContents
          .filter((item) => !item.indent)
          .slice(0, 6)
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
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
                  to={item.path}
                  sx={{ height: "100%" }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.5 }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Module Summaries */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5, mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: '1.125rem',
          }}
        >
          📝 Module Summaries
        </Typography>
        <Chip 
          label={`${moduleSummaries.length} modules`} 
          size="small" 
          variant="outlined" 
          sx={{ fontSize: '0.75rem' }} 
        />
      </Box>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {moduleSummaries.map((module) => (
          <Grid item xs={12} md={6} key={module.id}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.2s ease",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.08)}`,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <CardActionArea
                component={RouterLink}
                to={`/modules/${module.id}`}
                sx={{ height: "100%" }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {module.title}
                  </Typography>
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

      {/* Implementation Status Table */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5, mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: '1.125rem',
          }}
        >
          📊 Implementation Status
        </Typography>
        <Chip 
          label={`${totalFeatures} features`} 
          size="small" 
          variant="outlined" 
          sx={{ fontSize: '0.75rem' }} 
        />
      </Box>
      <Card sx={{ border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <StatusTable rows={implementationStatus} />
      </Card>
    </Box>
  )
}
