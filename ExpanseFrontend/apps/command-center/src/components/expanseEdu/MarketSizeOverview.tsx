/**
 * Market Size Overview Component
 * Displays TAM/SAM/SOM analysis, student counts, LMS providers, and market segments
 * with Chart.js visualizations and improved layout
 */
import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  alpha,
  Paper,
  Divider,
  Slider,
  Stack,
  Tooltip,
} from "@mui/material"
import { Bar, Doughnut } from "react-chartjs-2"
import PublicIcon from "@mui/icons-material/Public"
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus"
import AdjustIcon from "@mui/icons-material/Adjust"
import SchoolIcon from "@mui/icons-material/School"
import "../../utils/chartConfig"
import { studentCounts, tam, formatLargeNumber } from "../../data/expanseEdu"

const CHART_COLORS = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",
  pink: "#EC4899",
  indigo: "#6366F1",
}

// TAM/SAM/SOM calculations based on the Excel data
const TAM_SAM_SOM = {
  // Total Addressable Market - All potential customers globally
  tam: {
    users: studentCounts.lmsUsers.global.total, // 1.488B global LMS users
    label: "TAM",
    title: "Total Addressable Market",
    description: "All K-12 and Higher Ed students globally using LMS platforms",
    color: CHART_COLORS.primary,
    icon: PublicIcon,
  },
  // Serviceable Addressable Market - US + English-speaking markets
  sam: {
    users:
      studentCounts.lmsUsers.us.total +
      studentCounts.lmsUsers.global.total * 0.15, // US + 15% of global (English-speaking)
    label: "SAM",
    title: "Serviceable Addressable Market",
    description:
      "US market + English-speaking international markets we can serve",
    color: CHART_COLORS.secondary,
    icon: FilterCenterFocusIcon,
  },
  // Serviceable Obtainable Market - Realistic 5-year target
  som: {
    users: studentCounts.lmsUsers.us.initialFocus * 0.05, // 5% of US initial focus
    label: "SOM",
    title: "Serviceable Obtainable Market",
    description: "Realistic 5-year market capture (5% of US initial focus)",
    color: CHART_COLORS.success,
    icon: AdjustIcon,
  },
}

export function MarketSizeOverview() {
  const [somPercentage, setSomPercentage] = useState(5) // Adjustable SOM %

  // Calculate dynamic SOM based on percentage
  const dynamicSom =
    studentCounts.lmsUsers.us.initialFocus * (somPercentage / 100)

  // Student distribution data for bar chart
  const distributionData = {
    labels: studentCounts.studentDistribution.map((d) => d.segment),
    datasets: [
      {
        label: "K-12 Distribution",
        data: studentCounts.studentDistribution.map((d) =>
          d.k12Distribution ? d.k12Distribution * 100 : 0,
        ),
        backgroundColor: alpha(CHART_COLORS.primary, 0.7),
        borderColor: CHART_COLORS.primary,
        borderWidth: 1,
      },
      {
        label: "Total Distribution",
        data: studentCounts.studentDistribution.map(
          (d) => d.totalDistribution * 100,
        ),
        backgroundColor: alpha(CHART_COLORS.secondary, 0.7),
        borderColor: CHART_COLORS.secondary,
        borderWidth: 1,
      },
    ],
  }

  // LMS Provider market share (doughnut chart)
  const lmsData = {
    labels: studentCounts.lmsProviders.map((p) => p.name),
    datasets: [
      {
        data: [150, 150, 30, 432], // Millions of users
        backgroundColor: [
          alpha(CHART_COLORS.primary, 0.7),
          alpha(CHART_COLORS.success, 0.7),
          alpha(CHART_COLORS.warning, 0.7),
          alpha(CHART_COLORS.secondary, 0.7),
        ],
        borderColor: [
          CHART_COLORS.primary,
          CHART_COLORS.success,
          CHART_COLORS.warning,
          CHART_COLORS.secondary,
        ],
        borderWidth: 2,
      },
    ],
  }

  // Revenue projection based on SOM
  const revenueProjection = {
    freemiumAnnual: dynamicSom * studentCounts.pricing.freemium.target.yearly,
    membershipAnnual:
      dynamicSom * 0.1 * studentCounts.pricing.membership.monthly * 12, // 10% conversion
    totalAnnual: 0,
  }
  revenueProjection.totalAnnual =
    revenueProjection.freemiumAnnual + revenueProjection.membershipAnnual

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Box>
      {/* TAM/SAM/SOM Section - Most Important First */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: `2px solid ${alpha(CHART_COLORS.primary, 0.2)}`,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(CHART_COLORS.primary, 0.02)} 0%, ${alpha(CHART_COLORS.secondary, 0.02)} 100%)`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <SchoolIcon sx={{ color: CHART_COLORS.primary }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            🎯 TAM / SAM / SOM Analysis
          </Typography>
          <Chip
            label="Key Metric"
            size="small"
            color="primary"
            sx={{ ml: 1 }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* TAM/SAM/SOM Cards */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {/* TAM */}
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderColor: alpha(CHART_COLORS.primary, 0.3),
                    bgcolor: alpha(CHART_COLORS.primary, 0.03),
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1,
                    }}
                  >
                    <PublicIcon
                      sx={{ color: CHART_COLORS.primary, fontSize: 28 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: CHART_COLORS.primary,
                          fontWeight: 700,
                          fontSize: "0.7rem",
                        }}
                      >
                        TAM - Total Addressable Market
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ color: CHART_COLORS.primary, fontWeight: 800 }}
                      >
                        {formatLargeNumber(TAM_SAM_SOM.tam.users)}
                      </Typography>
                    </Box>
                    <Chip
                      label="Global"
                      size="small"
                      variant="outlined"
                      sx={{
                        color: CHART_COLORS.primary,
                        borderColor: CHART_COLORS.primary,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {TAM_SAM_SOM.tam.description}
                  </Typography>
                </Paper>
              </Grid>

              {/* SAM */}
              <Grid item xs={12} sm={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: alpha(CHART_COLORS.secondary, 0.3),
                    bgcolor: alpha(CHART_COLORS.secondary, 0.03),
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <FilterCenterFocusIcon
                      sx={{ color: CHART_COLORS.secondary }}
                    />
                    <Typography
                      variant="overline"
                      sx={{
                        color: CHART_COLORS.secondary,
                        fontWeight: 600,
                        fontSize: "0.65rem",
                      }}
                    >
                      SAM - Serviceable Market
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ color: CHART_COLORS.secondary, fontWeight: 700 }}
                  >
                    {formatLargeNumber(TAM_SAM_SOM.sam.users)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    US + English-speaking markets
                  </Typography>
                </Paper>
              </Grid>

              {/* SOM */}
              <Grid item xs={12} sm={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: alpha(CHART_COLORS.success, 0.3),
                    bgcolor: alpha(CHART_COLORS.success, 0.03),
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <AdjustIcon sx={{ color: CHART_COLORS.success }} />
                    <Typography
                      variant="overline"
                      sx={{
                        color: CHART_COLORS.success,
                        fontWeight: 600,
                        fontSize: "0.65rem",
                      }}
                    >
                      SOM - Obtainable Market
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ color: CHART_COLORS.success, fontWeight: 700 }}
                  >
                    {formatLargeNumber(dynamicSom)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {somPercentage}% of US initial focus
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Revenue Calculator */}
          <Grid item xs={12} md={5}>
            <Paper
              variant="outlined"
              sx={{ p: 2.5, height: "100%", borderRadius: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                💰 Revenue at SOM
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  display="block"
                >
                  Adjust SOM capture percentage:
                </Typography>
                <Slider
                  value={somPercentage}
                  onChange={(_, value) => setSomPercentage(value as number)}
                  min={1}
                  max={25}
                  step={1}
                  marks={[
                    { value: 1, label: "1%" },
                    { value: 5, label: "5%" },
                    { value: 10, label: "10%" },
                    { value: 25, label: "25%" },
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}%`}
                />
              </Box>

              <Stack spacing={1.5}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Freemium Revenue
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrency(revenueProjection.freemiumAnnual)}/yr
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Membership (10% conv.)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrency(revenueProjection.membershipAnnual)}/yr
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    bgcolor: alpha(CHART_COLORS.success, 0.1),
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Total Annual Revenue
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: CHART_COLORS.success }}
                  >
                    {formatCurrency(revenueProjection.totalAnnual)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Stats Row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Card
            sx={{
              bgcolor: alpha(CHART_COLORS.primary, 0.08),
              border: "1px solid",
              borderColor: alpha(CHART_COLORS.primary, 0.2),
            }}
          >
            <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: CHART_COLORS.primary,
                  fontWeight: 600,
                  fontSize: "0.6rem",
                }}
              >
                🇺🇸 US Students
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: CHART_COLORS.primary, fontWeight: 700 }}
              >
                {formatLargeNumber(studentCounts.usStudentCounts.total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            sx={{
              bgcolor: alpha(CHART_COLORS.success, 0.08),
              border: "1px solid",
              borderColor: alpha(CHART_COLORS.success, 0.2),
            }}
          >
            <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: CHART_COLORS.success,
                  fontWeight: 600,
                  fontSize: "0.6rem",
                }}
              >
                🌍 Global LMS Users
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: CHART_COLORS.success, fontWeight: 700 }}
              >
                {formatLargeNumber(studentCounts.lmsUsers.global.total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            sx={{
              bgcolor: alpha(CHART_COLORS.secondary, 0.08),
              border: "1px solid",
              borderColor: alpha(CHART_COLORS.secondary, 0.2),
            }}
          >
            <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: CHART_COLORS.secondary,
                  fontWeight: 600,
                  fontSize: "0.6rem",
                }}
              >
                📚 LMS Usage Rate
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: CHART_COLORS.secondary, fontWeight: 700 }}
              >
                {(studentCounts.usStudentCounts.lmsUsageRate * 100).toFixed(0)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            sx={{
              bgcolor: alpha(CHART_COLORS.warning, 0.08),
              border: "1px solid",
              borderColor: alpha(CHART_COLORS.warning, 0.2),
            }}
          >
            <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: CHART_COLORS.warning,
                  fontWeight: 600,
                  fontSize: "0.6rem",
                }}
              >
                👨‍🏫 Global Teachers
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: CHART_COLORS.warning, fontWeight: 700 }}
              >
                {formatLargeNumber(
                  tam.userCounts.global.teacherK12 +
                    tam.userCounts.global.higherEdTeacher,
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* LMS Provider Market Share */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2.5 }}>
                📊 LMS Provider Market Share
              </Typography>
              <Box sx={{ height: 220 }}>
                <Doughnut
                  data={lmsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "55%",
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          font: { size: 11 },
                          boxWidth: 12,
                          padding: 12,
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `${ctx.label}: ${ctx.raw}M users`,
                        },
                      },
                    },
                  }}
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={0.5}>
                {studentCounts.lmsProviders.map((provider) => (
                  <Typography
                    key={provider.name}
                    variant="caption"
                    color="text.secondary"
                  >
                    <strong>{provider.name}:</strong>{" "}
                    {provider.notes || provider.regions || provider.customers}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Student Distribution */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2.5 }}>
                📈 Student Distribution by Segment
              </Typography>
              <Box sx={{ height: 260 }}>
                <Bar
                  data={distributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: { font: { size: 11 } },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Percentage (%)",
                          font: { size: 11 },
                        },
                        ticks: { font: { size: 10 } },
                      },
                      x: {
                        ticks: { font: { size: 10 } },
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pricing Info */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2.5 }}>
                💰 Pricing Structure & Revenue Streams
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2.5,
                      bgcolor: alpha(CHART_COLORS.primary, 0.05),
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: CHART_COLORS.primary,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Target Freemium
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                      ${studentCounts.pricing.freemium.target.monthly}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        /mo
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${studentCounts.pricing.freemium.target.yearly}/year per
                      user
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2.5,
                      bgcolor: alpha(CHART_COLORS.success, 0.05),
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: CHART_COLORS.success,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Membership
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                      ${studentCounts.pricing.membership.monthly}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        /mo
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Family/Teacher premium tier
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2.5,
                      bgcolor: alpha(CHART_COLORS.secondary, 0.05),
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: CHART_COLORS.secondary,
                        fontWeight: 600,
                        mb: 1.5,
                      }}
                    >
                      Revenue Streams
                    </Typography>
                    <Stack spacing={1}>
                      {tam.revenueStreams.map((stream) => (
                        <Tooltip
                          key={stream.stream}
                          title={stream.assumption}
                          arrow
                          placement="left"
                        >
                          <Chip
                            label={stream.stream}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: "0.7rem",
                              justifyContent: "flex-start",
                              cursor: "help",
                            }}
                          />
                        </Tooltip>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
