/**
 * Break-Even Analysis Component
 * Interactive calculator to determine when Expanse EDU becomes profitable
 * Answers: "When are we profitable?" and "How many users do we need?"
 */
import { useState, useMemo } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Slider,
  TextField,
  Chip,
  alpha,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Line } from 'react-chartjs-2'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PeopleIcon from '@mui/icons-material/People'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import '../../utils/chartConfig'
import { studentCounts } from '../../data/expanseEdu'

const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
}

// Default assumptions based on the Excel data
const DEFAULT_ASSUMPTIONS = {
  monthlyFixedCosts: 25000, // Staff, software, infrastructure baseline
  costPerUser: 0.10, // Per user per month (infrastructure scaling)
  freemiumPrice: studentCounts.pricing.freemium.target.monthly, // $0.25/month
  membershipPrice: studentCounts.pricing.membership.monthly, // $5.99/month
  membershipConversionRate: 0.05, // 5% convert to paid
  monthlyUserGrowthRate: 0.15, // 15% monthly growth
  startingUsers: 1000, // Initial user base
}

interface Scenario {
  name: string
  color: string
  monthlyGrowthRate: number
  membershipConversionRate: number
}

const SCENARIOS: Scenario[] = [
  { name: 'Conservative', color: CHART_COLORS.danger, monthlyGrowthRate: 0.08, membershipConversionRate: 0.03 },
  { name: 'Realistic', color: CHART_COLORS.warning, monthlyGrowthRate: 0.15, membershipConversionRate: 0.05 },
  { name: 'Optimistic', color: CHART_COLORS.success, monthlyGrowthRate: 0.25, membershipConversionRate: 0.08 },
]

export function BreakEvenAnalysis() {
  // User-adjustable inputs
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState(DEFAULT_ASSUMPTIONS.monthlyFixedCosts)
  const [costPerUser, setCostPerUser] = useState(DEFAULT_ASSUMPTIONS.costPerUser)
  const [freemiumPrice, setFreemiumPrice] = useState(DEFAULT_ASSUMPTIONS.freemiumPrice)
  const [membershipPrice, setMembershipPrice] = useState(DEFAULT_ASSUMPTIONS.membershipPrice)
  const [membershipConversionRate, setMembershipConversionRate] = useState(DEFAULT_ASSUMPTIONS.membershipConversionRate)
  const [monthlyUserGrowthRate, setMonthlyUserGrowthRate] = useState(DEFAULT_ASSUMPTIONS.monthlyUserGrowthRate)
  const [startingUsers, setStartingUsers] = useState(DEFAULT_ASSUMPTIONS.startingUsers)
  const [selectedScenario, setSelectedScenario] = useState<string>('Realistic')

  // Calculate break-even point
  const calculations = useMemo(() => {
    // Revenue per user per month
    const revenuePerUser = 
      freemiumPrice + 
      (membershipPrice * membershipConversionRate)
    
    // Net revenue per user (after variable costs)
    const netRevenuePerUser = revenuePerUser - costPerUser
    
    // Break-even users needed (if net revenue is positive)
    const breakEvenUsers = netRevenuePerUser > 0 
      ? Math.ceil(monthlyFixedCosts / netRevenuePerUser)
      : Infinity
    
    // Calculate months to break-even with growth
    let currentUsers = startingUsers
    let monthsToBreakEven = 0
    const maxMonths = 60 // 5 years max
    
    while (currentUsers < breakEvenUsers && monthsToBreakEven < maxMonths) {
      currentUsers = currentUsers * (1 + monthlyUserGrowthRate)
      monthsToBreakEven++
    }
    
    if (currentUsers < breakEvenUsers) {
      monthsToBreakEven = Infinity
    }
    
    // Monthly revenue at break-even
    const breakEvenMonthlyRevenue = breakEvenUsers * revenuePerUser
    
    return {
      revenuePerUser,
      netRevenuePerUser,
      breakEvenUsers,
      monthsToBreakEven,
      breakEvenMonthlyRevenue,
    }
  }, [monthlyFixedCosts, costPerUser, freemiumPrice, membershipPrice, membershipConversionRate, monthlyUserGrowthRate, startingUsers])

  // Generate projection data for chart
  const projectionData = useMemo(() => {
    const months = 36 // 3 years
    const labels = Array.from({ length: months }, (_, i) => `M${i + 1}`)
    
    const generateProjection = (scenario: Scenario) => {
      const data = []
      let users = startingUsers
      
      for (let month = 0; month < months; month++) {
        const revenue = users * (freemiumPrice + membershipPrice * scenario.membershipConversionRate)
        const costs = monthlyFixedCosts + (users * costPerUser)
        const profit = revenue - costs
        data.push(profit)
        users = users * (1 + scenario.monthlyGrowthRate)
      }
      
      return data
    }
    
    return {
      labels,
      datasets: SCENARIOS.map(scenario => ({
        label: scenario.name,
        data: generateProjection(scenario),
        borderColor: scenario.color,
        backgroundColor: alpha(scenario.color, 0.1),
        fill: false,
        tension: 0.3,
        borderWidth: scenario.name === selectedScenario ? 3 : 1.5,
        pointRadius: scenario.name === selectedScenario ? 3 : 0,
      })),
    }
  }, [startingUsers, freemiumPrice, membershipPrice, monthlyFixedCosts, costPerUser, selectedScenario])

  // Calculate break-even for each scenario
  const scenarioBreakEven = useMemo(() => {
    return SCENARIOS.map(scenario => {
      const revenuePerUser = freemiumPrice + (membershipPrice * scenario.membershipConversionRate)
      const netRevenuePerUser = revenuePerUser - costPerUser
      const breakEvenUsers = netRevenuePerUser > 0 ? Math.ceil(monthlyFixedCosts / netRevenuePerUser) : Infinity
      
      let currentUsers = startingUsers
      let months = 0
      const maxMonths = 60
      
      while (currentUsers < breakEvenUsers && months < maxMonths) {
        currentUsers = currentUsers * (1 + scenario.monthlyGrowthRate)
        months++
      }
      
      return {
        ...scenario,
        breakEvenUsers,
        monthsToBreakEven: currentUsers >= breakEvenUsers ? months : Infinity,
        yearToBreakEven: currentUsers >= breakEvenUsers ? (months / 12).toFixed(1) : '5+',
      }
    })
  }, [freemiumPrice, membershipPrice, monthlyFixedCosts, costPerUser, startingUsers])

  const handleScenarioChange = (_: React.MouseEvent<HTMLElement>, newScenario: string | null) => {
    if (newScenario) {
      setSelectedScenario(newScenario)
      const scenario = SCENARIOS.find(s => s.name === newScenario)
      if (scenario) {
        setMonthlyUserGrowthRate(scenario.monthlyGrowthRate)
        setMembershipConversionRate(scenario.membershipConversionRate)
      }
    }
  }

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  const formatNumber = (value: number) => 
    new Intl.NumberFormat('en-US').format(Math.round(value))

  return (
    <Box>
      {/* Key Metrics Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: alpha(CHART_COLORS.primary, 0.1), border: '1px solid', borderColor: alpha(CHART_COLORS.primary, 0.3) }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PeopleIcon sx={{ fontSize: 18, color: CHART_COLORS.primary }} />
                <Typography variant="overline" sx={{ color: CHART_COLORS.primary, fontWeight: 600, fontSize: '0.65rem' }}>
                  Break-Even Users
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: CHART_COLORS.primary, fontWeight: 700 }}>
                {calculations.breakEvenUsers === Infinity ? '∞' : formatNumber(calculations.breakEvenUsers)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: alpha(CHART_COLORS.success, 0.1), border: '1px solid', borderColor: alpha(CHART_COLORS.success, 0.3) }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CalendarMonthIcon sx={{ fontSize: 18, color: CHART_COLORS.success }} />
                <Typography variant="overline" sx={{ color: CHART_COLORS.success, fontWeight: 600, fontSize: '0.65rem' }}>
                  Months to Break-Even
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: CHART_COLORS.success, fontWeight: 700 }}>
                {calculations.monthsToBreakEven === Infinity ? '60+' : calculations.monthsToBreakEven}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: alpha(CHART_COLORS.secondary, 0.1), border: '1px solid', borderColor: alpha(CHART_COLORS.secondary, 0.3) }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AttachMoneyIcon sx={{ fontSize: 18, color: CHART_COLORS.secondary }} />
                <Typography variant="overline" sx={{ color: CHART_COLORS.secondary, fontWeight: 600, fontSize: '0.65rem' }}>
                  Revenue/User/Month
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: CHART_COLORS.secondary, fontWeight: 700 }}>
                ${calculations.revenuePerUser.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: alpha(CHART_COLORS.warning, 0.1), border: '1px solid', borderColor: alpha(CHART_COLORS.warning, 0.3) }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <TrendingUpIcon sx={{ fontSize: 18, color: CHART_COLORS.warning }} />
                <Typography variant="overline" sx={{ color: CHART_COLORS.warning, fontWeight: 600, fontSize: '0.65rem' }}>
                  Net/User/Month
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: calculations.netRevenuePerUser >= 0 ? CHART_COLORS.success : CHART_COLORS.danger, fontWeight: 700 }}>
                ${calculations.netRevenuePerUser.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Scenario Selector & Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  📈 Path to Profitability
                </Typography>
                <ToggleButtonGroup
                  value={selectedScenario}
                  exclusive
                  onChange={handleScenarioChange}
                  size="small"
                >
                  {SCENARIOS.map(scenario => (
                    <ToggleButton 
                      key={scenario.name} 
                      value={scenario.name}
                      sx={{ 
                        px: 2,
                        '&.Mui-selected': { 
                          bgcolor: alpha(scenario.color, 0.2),
                          borderColor: scenario.color,
                        }
                      }}
                    >
                      {scenario.name}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ height: 300 }}>
                <Line
                  data={projectionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: { font: { size: 11 } }
                      },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw as number)}`
                        }
                      }
                    },
                    scales: {
                      y: {
                        title: { display: true, text: 'Monthly Profit/Loss ($)' },
                        ticks: {
                          callback: (value) => formatCurrency(Number(value))
                        }
                      },
                      x: {
                        title: { display: true, text: 'Month' }
                      }
                    }
                  }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Scenario Comparison Table */}
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                Scenario Comparison
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell>Scenario</TableCell>
                      <TableCell>Monthly Growth</TableCell>
                      <TableCell>Conversion Rate</TableCell>
                      <TableCell>Users Needed</TableCell>
                      <TableCell>Time to Break-Even</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scenarioBreakEven.map(scenario => (
                      <TableRow 
                        key={scenario.name}
                        sx={{ 
                          bgcolor: scenario.name === selectedScenario ? alpha(scenario.color, 0.1) : 'transparent'
                        }}
                      >
                        <TableCell>
                          <Chip 
                            label={scenario.name} 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(scenario.color, 0.2),
                              color: scenario.color,
                              fontWeight: 600,
                            }} 
                          />
                        </TableCell>
                        <TableCell>{(scenario.monthlyGrowthRate * 100).toFixed(0)}%</TableCell>
                        <TableCell>{(scenario.membershipConversionRate * 100).toFixed(0)}%</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {scenario.breakEvenUsers === Infinity ? '∞' : formatNumber(scenario.breakEvenUsers)}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: scenario.color }}>
                          {scenario.yearToBreakEven} years
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Input Controls */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                ⚙️ Adjust Assumptions
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Monthly Fixed Costs
                </Typography>
                <TextField
                  type="number"
                  value={monthlyFixedCosts}
                  onChange={(e) => setMonthlyFixedCosts(Number(e.target.value))}
                  size="small"
                  fullWidth
                  InputProps={{ startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography> }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Cost per User/Month
                </Typography>
                <Slider
                  value={costPerUser}
                  onChange={(_, value) => setCostPerUser(value as number)}
                  min={0.01}
                  max={0.50}
                  step={0.01}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `$${v.toFixed(2)}`}
                />
                <Typography variant="caption" color="text.secondary">
                  Current: ${costPerUser.toFixed(2)}/user/month
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Freemium Price ($/month)
                </Typography>
                <Slider
                  value={freemiumPrice}
                  onChange={(_, value) => setFreemiumPrice(value as number)}
                  min={0.10}
                  max={1.00}
                  step={0.05}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `$${v.toFixed(2)}`}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Membership Price ($/month)
                </Typography>
                <Slider
                  value={membershipPrice}
                  onChange={(_, value) => setMembershipPrice(value as number)}
                  min={2.99}
                  max={14.99}
                  step={1.00}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `$${v.toFixed(2)}`}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Membership Conversion Rate
                </Typography>
                <Slider
                  value={membershipConversionRate * 100}
                  onChange={(_, value) => setMembershipConversionRate((value as number) / 100)}
                  min={1}
                  max={15}
                  step={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}%`}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Starting Users
                </Typography>
                <TextField
                  type="number"
                  value={startingUsers}
                  onChange={(e) => setStartingUsers(Number(e.target.value))}
                  size="small"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Monthly User Growth Rate
                </Typography>
                <Slider
                  value={monthlyUserGrowthRate * 100}
                  onChange={(_, value) => setMonthlyUserGrowthRate((value as number) / 100)}
                  min={5}
                  max={40}
                  step={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}%`}
                />
              </Box>

              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 1.5, 
                  mt: 2, 
                  bgcolor: alpha(CHART_COLORS.primary, 0.05),
                  borderColor: alpha(CHART_COLORS.primary, 0.2)
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  💡 <strong>Tip:</strong> Use the scenario toggles above to quickly switch between 
                  Conservative, Realistic, and Optimistic projections.
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
