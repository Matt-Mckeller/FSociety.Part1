/**
 * Cost Analysis Component
 * Displays integration, software, marketing, staff, and physical costs
 * With interactive calculators for per-user and per-employee cost projections
 */
import { useState, useMemo } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Slider,
  Divider,
  Stack,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CalculateIcon from "@mui/icons-material/Calculate"
import StorageIcon from "@mui/icons-material/Storage"
import GroupIcon from "@mui/icons-material/Group"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import WarningIcon from "@mui/icons-material/Warning"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Bar, Doughnut } from "react-chartjs-2"
import "../../utils/chartConfig"
import {
  integrationCosts,
  softwareCosts,
  marketingCosts,
  staffCosts,
  physicalCosts,
} from "../../data/expanseEdu"

const CHART_COLORS = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",
}

// Hosting cost tiers based on user scale (more accurate estimates)
const HOSTING_COST_TIERS = [
  { users: 1000, gcpMonthly: 100, awsMonthly: 120, label: "1K users" },
  { users: 5000, gcpMonthly: 300, awsMonthly: 350, label: "5K users" },
  { users: 10000, gcpMonthly: 600, awsMonthly: 700, label: "10K users" },
  { users: 50000, gcpMonthly: 2000, awsMonthly: 2400, label: "50K users" },
  { users: 100000, gcpMonthly: 4000, awsMonthly: 4800, label: "100K users" },
  { users: 500000, gcpMonthly: 15000, awsMonthly: 18000, label: "500K users" },
  { users: 1000000, gcpMonthly: 25000, awsMonthly: 30000, label: "1M users" },
]

const getAccuracyChip = (accuracy: string | undefined) => {
  if (!accuracy) return null
  const isAccurate =
    accuracy.toLowerCase().includes("accurate") &&
    !accuracy.toLowerCase().includes("not")
  const isLow =
    accuracy.toLowerCase().includes("not") ||
    accuracy.toLowerCase().includes("low")

  return (
    <Chip
      icon={
        isLow ? (
          <WarningIcon sx={{ fontSize: 14 }} />
        ) : (
          <CheckCircleIcon sx={{ fontSize: 14 }} />
        )
      }
      label={accuracy}
      size="small"
      color={isLow ? "warning" : isAccurate ? "success" : "default"}
      variant="outlined"
      sx={{ fontSize: "0.65rem", height: 22 }}
    />
  )
}

export function CostAnalysis() {
  const [expanded, setExpanded] = useState<string | false>("calculator")

  // Calculator state
  const [userCount, setUserCount] = useState(10000)
  const [employeeCount, setEmployeeCount] = useState(5)

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  // Calculate costs based on user count
  const userCostCalculations = useMemo(() => {
    // Find the appropriate hosting tier
    const hostingTier = HOSTING_COST_TIERS.reduce(
      (prev, curr) => (userCount >= curr.users ? curr : prev),
      HOSTING_COST_TIERS[0],
    )

    // Interpolate hosting cost
    const nextTierIndex = HOSTING_COST_TIERS.findIndex(
      (t) => t.users > userCount,
    )
    let gcpMonthly = hostingTier.gcpMonthly
    let awsMonthly = hostingTier.awsMonthly

    if (nextTierIndex > 0) {
      const nextTier = HOSTING_COST_TIERS[nextTierIndex]
      const prevTier = HOSTING_COST_TIERS[nextTierIndex - 1]
      const ratio =
        (userCount - prevTier.users) / (nextTier.users - prevTier.users)
      gcpMonthly =
        prevTier.gcpMonthly +
        ratio * (nextTier.gcpMonthly - prevTier.gcpMonthly)
      awsMonthly =
        prevTier.awsMonthly +
        ratio * (nextTier.awsMonthly - prevTier.awsMonthly)
    }

    // LMS Integration cost (10c to 1c per user per month based on scale)
    const lmsPerUserRate =
      userCount < 10000 ? 0.1 : userCount < 100000 ? 0.05 : 0.01
    const lmsMonthly = userCount * lmsPerUserRate

    // Stripe cost estimate (assume 5% convert, $5.99/mo average transaction)
    const stripeMonthly = userCount * 0.05 * 5.99 * 0.029

    // Twilio estimate (assume 0.1 SMS per user per month)
    const twilioMonthly = userCount * 0.1 * 0.0083

    // Feature flagging (LaunchDarkly)
    const launchDarklyMonthly = Math.ceil(userCount / 1000) * 10

    const totalInfraMonthly =
      gcpMonthly +
      lmsMonthly +
      stripeMonthly +
      twilioMonthly +
      launchDarklyMonthly
    const perUserMonthly = totalInfraMonthly / userCount

    return {
      hosting: { gcp: gcpMonthly, aws: awsMonthly },
      lms: lmsMonthly,
      stripe: stripeMonthly,
      twilio: twilioMonthly,
      launchDarkly: launchDarklyMonthly,
      totalMonthly: totalInfraMonthly,
      perUserMonthly,
      perUserYearly: perUserMonthly * 12,
    }
  }, [userCount])

  // Calculate software costs per employee
  const employeeCostCalculations = useMemo(() => {
    // Estimate mid-range costs from the data
    const costs = {
      mdm: 10,
      projectMgmt: 20,
      googleWorkspace: 20,
      onePassword: 5,
      chatAI: 10,
      crm: 50, // Per team, not per user typically
      stockAssets: 35,
      aiGeneration: 35,
      figma: 25,
      adobeSuite: 75,
      sso: 10,
      github: 20,
      githubCopilot: 15,
      windsurf: 20,
      claude: 20,
      socialMedia: 50, // Per team
    }

    const perEmployeeMonthly =
      costs.mdm +
      costs.projectMgmt +
      costs.googleWorkspace +
      costs.onePassword +
      costs.chatAI +
      costs.aiGeneration +
      costs.sso +
      costs.github +
      costs.githubCopilot

    const devToolsMonthly = costs.windsurf + costs.claude + costs.figma
    const designToolsMonthly =
      costs.figma + costs.adobeSuite + costs.stockAssets

    const teamToolsMonthly = costs.crm + costs.socialMedia

    const totalMonthly =
      perEmployeeMonthly * employeeCount +
      devToolsMonthly * Math.ceil(employeeCount * 0.6) + // 60% are devs
      designToolsMonthly * Math.ceil(employeeCount * 0.2) + // 20% are designers
      teamToolsMonthly

    return {
      perEmployeeMonthly,
      devToolsMonthly,
      designToolsMonthly,
      teamToolsMonthly,
      totalMonthly,
      perEmployeeAverage: totalMonthly / employeeCount,
    }
  }, [employeeCount])

  // Infrastructure cost breakdown for doughnut chart
  const infraBreakdownData = {
    labels: [
      "Hosting (GCP)",
      "LMS Integration",
      "Feature Flags",
      "Payments",
      "SMS",
    ],
    datasets: [
      {
        data: [
          userCostCalculations.hosting.gcp,
          userCostCalculations.lms,
          userCostCalculations.launchDarkly,
          userCostCalculations.stripe,
          userCostCalculations.twilio,
        ],
        backgroundColor: [
          alpha(CHART_COLORS.primary, 0.8),
          alpha(CHART_COLORS.secondary, 0.8),
          alpha(CHART_COLORS.warning, 0.8),
          alpha(CHART_COLORS.success, 0.8),
          alpha(CHART_COLORS.info, 0.8),
        ],
        borderColor: [
          CHART_COLORS.primary,
          CHART_COLORS.secondary,
          CHART_COLORS.warning,
          CHART_COLORS.success,
          CHART_COLORS.info,
        ],
        borderWidth: 2,
      },
    ],
  }

  // Hosting cost comparison by scale
  const hostingScaleData = {
    labels: HOSTING_COST_TIERS.map((t) => t.label),
    datasets: [
      {
        label: "GCP",
        data: HOSTING_COST_TIERS.map((t) => t.gcpMonthly),
        backgroundColor: alpha(CHART_COLORS.primary, 0.7),
        borderColor: CHART_COLORS.primary,
        borderWidth: 1,
      },
      {
        label: "AWS",
        data: HOSTING_COST_TIERS.map((t) => t.awsMonthly),
        backgroundColor: alpha(CHART_COLORS.warning, 0.7),
        borderColor: CHART_COLORS.warning,
        borderWidth: 1,
      },
    ],
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US").format(Math.round(value))

  return (
    <Box>
      {/* Cost Calculator - Always First */}
      <Accordion
        expanded={expanded === "calculator"}
        onChange={handleAccordionChange("calculator")}
        sx={{
          mb: 2,
          border: `2px solid ${alpha(CHART_COLORS.primary, 0.3)}`,
          borderRadius: 2,
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ bgcolor: alpha(CHART_COLORS.primary, 0.05) }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalculateIcon sx={{ color: CHART_COLORS.primary }} />
            <Typography sx={{ fontWeight: 600, color: CHART_COLORS.primary }}>
              🧮 Cost Calculator
            </Typography>
            <Chip
              label="Interactive"
              size="small"
              color="primary"
              sx={{ ml: 1, height: 20, fontSize: "0.65rem" }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Grid container spacing={4}>
            {/* User-Based Costs */}
            <Grid item xs={12} lg={6}>
              <Paper
                variant="outlined"
                sx={{ p: 3, height: "100%", borderRadius: 2 }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <GroupIcon sx={{ color: CHART_COLORS.secondary }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Per-User Infrastructure Costs
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Active Users: {formatNumber(userCount)}
                  </Typography>
                  <Slider
                    value={userCount}
                    onChange={(_, value) => setUserCount(value as number)}
                    min={1000}
                    max={1000000}
                    step={1000}
                    marks={[
                      { value: 1000, label: "1K" },
                      { value: 100000, label: "100K" },
                      { value: 500000, label: "500K" },
                      { value: 1000000, label: "1M" },
                    ]}
                  />
                </Box>

                {/* Key Metrics */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(CHART_COLORS.primary, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{ color: CHART_COLORS.primary, fontSize: "0.6rem" }}
                      >
                        Per User / Month
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: CHART_COLORS.primary }}
                      >
                        ${userCostCalculations.perUserMonthly.toFixed(3)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(CHART_COLORS.success, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{ color: CHART_COLORS.success, fontSize: "0.6rem" }}
                      >
                        Total Monthly
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: CHART_COLORS.success }}
                      >
                        {formatCurrency(userCostCalculations.totalMonthly)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Cost Breakdown */}
                <Box sx={{ height: 180 }}>
                  <Doughnut
                    data={infraBreakdownData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "right",
                          labels: { font: { size: 10 }, boxWidth: 12 },
                        },
                        tooltip: {
                          callbacks: {
                            label: (ctx) =>
                              `${ctx.label}: ${formatCurrency(ctx.raw as number)}/mo`,
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Employee-Based Costs */}
            <Grid item xs={12} lg={6}>
              <Paper
                variant="outlined"
                sx={{ p: 3, height: "100%", borderRadius: 2 }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <StorageIcon sx={{ color: CHART_COLORS.warning }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Per-Employee Software Costs
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Team Size: {employeeCount} employees
                  </Typography>
                  <Slider
                    value={employeeCount}
                    onChange={(_, value) => setEmployeeCount(value as number)}
                    min={1}
                    max={50}
                    step={1}
                    marks={[
                      { value: 1, label: "1" },
                      { value: 10, label: "10" },
                      { value: 25, label: "25" },
                      { value: 50, label: "50" },
                    ]}
                  />
                </Box>

                {/* Key Metrics */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(CHART_COLORS.warning, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{ color: CHART_COLORS.warning, fontSize: "0.6rem" }}
                      >
                        Per Employee / Month
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: CHART_COLORS.warning }}
                      >
                        $
                        {Math.round(
                          employeeCostCalculations.perEmployeeAverage,
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(CHART_COLORS.danger, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{ color: CHART_COLORS.danger, fontSize: "0.6rem" }}
                      >
                        Total Monthly
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: CHART_COLORS.danger }}
                      >
                        {formatCurrency(employeeCostCalculations.totalMonthly)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Cost Breakdown Stack */}
                <Stack spacing={1}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Core Tools (all employees)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${employeeCostCalculations.perEmployeeMonthly}/ea
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Dev Tools (60% of team)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${employeeCostCalculations.devToolsMonthly}/ea
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Design Tools (20% of team)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${employeeCostCalculations.designToolsMonthly}/ea
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      bgcolor: alpha(CHART_COLORS.info, 0.1),
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">Team Tools (shared)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${employeeCostCalculations.teamToolsMonthly}/mo
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Hosting Costs - Improved Accuracy */}
      <Accordion
        expanded={expanded === "hosting"}
        onChange={handleAccordionChange("hosting")}
        sx={{ mb: 1 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>
              ☁️ Hosting & Infrastructure
            </Typography>
            <Chip
              label="Improved Estimates"
              size="small"
              color="success"
              variant="outlined"
              sx={{ ml: "auto", mr: 2, fontSize: "0.65rem" }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <TrendingUpIcon sx={{ fontSize: 18 }} />
                Monthly Hosting Cost by Scale
              </Typography>
              <Box sx={{ height: 280 }}>
                <Bar
                  data={hostingScaleData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: {
                        callbacks: {
                          label: (ctx) =>
                            `${ctx.dataset.label}: ${formatCurrency(ctx.raw as number)}/month`,
                        },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { callback: (v) => formatCurrency(Number(v)) },
                      },
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{ p: 2, bgcolor: alpha(CHART_COLORS.info, 0.05) }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  📊 Key Insights
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>GCP Advantage:</strong> ~15-20% cheaper than AWS
                      for similar workloads
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Scale Economics:</strong> Cost per user drops from
                      $0.10 at 1K to $0.025 at 1M users
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Includes:</strong> Compute, database, CDN,
                      storage, and monitoring
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Integration Costs */}
      <Accordion
        expanded={expanded === "integration"}
        onChange={handleAccordionChange("integration")}
        sx={{ mb: 1 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            🔌 Integration & API Costs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "background.default" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Base Cost</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Negotiable</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Accuracy</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {integrationCosts.items.map((item) => (
                  <TableRow key={item.name} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{item.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.baseCost}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          typeof item.negotiable === "boolean"
                            ? item.negotiable
                              ? "Yes"
                              : "No"
                            : item.negotiable || "N/A"
                        }
                        size="small"
                        color={item.negotiable === true ? "success" : "default"}
                        sx={{ fontSize: "0.7rem" }}
                      />
                    </TableCell>
                    <TableCell>{getAccuracyChip(item.accuracy)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Software Costs */}
      <Accordion
        expanded={expanded === "software"}
        onChange={handleAccordionChange("software")}
        sx={{ mb: 1 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            💻 Software & SaaS Costs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {softwareCosts.items.slice(0, 12).map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.category}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    height: "100%",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: CHART_COLORS.primary,
                      boxShadow: `0 2px 8px ${alpha(CHART_COLORS.primary, 0.15)}`,
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    {item.category}
                  </Typography>
                  {item.costPerUserMonth && (
                    <Typography
                      variant="h6"
                      sx={{
                        color: CHART_COLORS.primary,
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {item.costPerUserMonth}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    {item.examples}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {softwareCosts.items.length > 12 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: "block" }}
            >
              + {softwareCosts.items.length - 12} more categories
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Marketing Costs */}
      <Accordion
        expanded={expanded === "marketing"}
        onChange={handleAccordionChange("marketing")}
        sx={{ mb: 1 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>📣 Marketing Costs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Early MVP Phase Activities
          </Typography>
          <Grid container spacing={1.5} sx={{ mb: 3 }}>
            {marketingCosts.earlyMvp.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.activity}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    height: "100%",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.activity}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {item.cost && (
                      <Chip
                        label={item.cost}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.65rem", height: 22 }}
                      />
                    )}
                    {item.aiAssisted && (
                      <Chip
                        label="AI ✨"
                        size="small"
                        color="secondary"
                        sx={{ fontSize: "0.65rem", height: 22 }}
                      />
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
            Staff Needs
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {marketingCosts.staffNeeds.map((staff) => (
              <Chip
                key={staff.role}
                label={`${staff.role}${staff.notes ? ` (${staff.notes})` : ""}`}
                color="info"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Staff Costs */}
      <Accordion
        expanded={expanded === "staff"}
        onChange={handleAccordionChange("staff")}
        sx={{ mb: 1 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            👥 Staff Costs & Roles
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper
            variant="outlined"
            sx={{ p: 2, mb: 2, bgcolor: alpha(CHART_COLORS.info, 0.05) }}
          >
            <Typography variant="caption" color="text.secondary">
              💡 {staffCosts.note}
            </Typography>
          </Paper>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "background.default" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Game Term</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600, color: CHART_COLORS.success }}
                  >
                    Senior US
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Mid US
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Entry US
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffCosts.roles
                  .filter((r) => r.seniorUS)
                  .map((role) => (
                    <TableRow key={role.title} hover>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {role.title}
                      </TableCell>
                      <TableCell>
                        {role.gameTerminology && (
                          <Chip
                            label={role.gameTerminology}
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={{ fontSize: "0.65rem", height: 22 }}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: CHART_COLORS.success, fontWeight: 600 }}
                      >
                        {role.seniorUS || "-"}
                      </TableCell>
                      <TableCell align="right">{role.midUS || "-"}</TableCell>
                      <TableCell align="right">{role.entryUS || "-"}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Physical Costs */}
      <Accordion
        expanded={expanded === "physical"}
        onChange={handleAccordionChange("physical")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            🏢 Physical & Other Costs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {physicalCosts.items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.item}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.item}
                    </Typography>
                    {item.cost !== null && (
                      <Typography
                        variant="h6"
                        sx={{ color: CHART_COLORS.primary, fontWeight: 700 }}
                      >
                        {typeof item.cost === "number"
                          ? formatCurrency(item.cost)
                          : item.cost}
                      </Typography>
                    )}
                    {item.type && (
                      <Chip
                        label={item.type}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.65rem", mt: 0.5 }}
                      />
                    )}
                    {item.notes && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ mt: 0.5 }}
                      >
                        {item.notes}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
