import { useState } from "react"
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
  IconButton,
  Tooltip,
  alpha,
  Paper,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import BusinessIcon from "@mui/icons-material/Business"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"

import { useFinancials, useProjects } from "../contexts"
import { ExpanseEduFinancialsView } from "./expanseEdu"

// Import from financials module
import {
  formatCurrency,
  getConfidenceColor,
  getConfidenceDots,
  getRunwayColor,
  formatMonth,
  getFundingTypeColor,
  getFundingStatusColor,
  getFundingTypeIcon,
  getResourceColor,
  getResourceLabel,
} from "./financials"

export function FinancialsView() {
  const theme = useTheme()
  const { financials } = useFinancials()
  const { projects } = useProjects()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  // Helper functions moved inside component to access context data
  const getProjectName = (projectId: string): string => {
    const project = projects.find((p) => p.id === projectId)
    return project?.name || projectId
  }

  const getProjectColor = (projectId: string): string => {
    const project = projects.find((p) => p.id === projectId)
    return project?.color || theme.palette.text.secondary
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  // Calculate totals from individual accounts instead of using hardcoded values
  const totalCash =
    financials.current.cashAccounts?.reduce(
      (sum, acc) => sum + acc.balance,
      0,
    ) ?? 0
  const totalCredit =
    financials.current.creditAccounts?.reduce(
      (sum, acc) => sum + acc.available,
      0,
    ) ?? 0

  // Cash is small enough that cents matter; larger balances stay rounded
  const cashDecimals = totalCash < 1000 && totalCash % 1 !== 0 ? 2 : 0

  const { monthlyBurnRange, incentiveHistory } = financials.current

  const runway =
    financials.current.monthlyBurn > 0
      ? Math.round((totalCash / financials.current.monthlyBurn) * 10) / 10
      : 0

  // With a variable burn there is no single runway — derive the band instead
  const runwayFloor = monthlyBurnRange
    ? Math.round((totalCash / monthlyBurnRange.max) * 10) / 10
    : runway
  const runwayCeiling = monthlyBurnRange
    ? Math.round((totalCash / monthlyBurnRange.min) * 10) / 10
    : runway
  const runwayDisplay =
    runwayCeiling < 1
      ? "< 1 mo"
      : runwayFloor === runwayCeiling
        ? `${runwayFloor} mo`
        : `${runwayFloor}–${runwayCeiling} mo`

  // The story behind the burn: shown as a tooltip on the burn/runway cards
  const incentiveTooltip = incentiveHistory ? (
    <Box sx={{ p: 0.5, maxWidth: 280 }}>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
        {isVisible
          ? incentiveHistory.summary
          : incentiveHistory.summary.replace(/\$[\d,k]+/i, "••••")}
      </Typography>
      <Typography variant="caption" sx={{ color: "grey.300" }}>
        {incentiveHistory.detail}
      </Typography>
    </Box>
  ) : (
    ""
  )

  const totalThisMonth = financials.spending.reduce(
    (sum, s) => sum + s.thisMonth,
    0,
  )
  const totalAverage = financials.spending.reduce(
    (sum, s) => sum + s.average,
    0,
  )
  const spendingTrend = totalThisMonth - totalAverage

  const totalPotentialIncome = financials.projectRevenue.reduce(
    (sum, p) => sum + p.potentialIncome,
    0,
  )

  return (
    <Box>
      {/* Header with Tabs */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          💰 Financials
        </Typography>
        {activeTab !== 3 && (
          <Tooltip title={isVisible ? "Hide amounts" : "Show amounts"}>
            <IconButton
              onClick={() => setIsVisible(!isVisible)}
              color="primary"
            >
              {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          "& .MuiTab-root": {
            minHeight: 48,
            textTransform: "none",
            fontWeight: 500,
          },
        }}
      >
        <Tab
          icon={<AccountBalanceWalletIcon />}
          iconPosition="start"
          label="Cash Flow"
        />
        <Tab icon={<ShowChartIcon />} iconPosition="start" label="Revenue" />
        <Tab
          icon={<AccountBalanceIcon />}
          iconPosition="start"
          label="Funding & Investment"
        />
        <Tab icon={<BusinessIcon />} iconPosition="start" label="Expanse EDU" />
      </Tabs>

      {/* Personal Finances Tab */}
      {activeTab === 0 && (
        <Box>
          {/* Current Status Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <Tooltip
                title={
                  financials.current.cashAccounts && isVisible ? (
                    <Box sx={{ p: 0.5 }}>
                      {financials.current.cashAccounts.map((acc) => (
                        <Box
                          key={acc.name}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="body2">{acc.name}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {formatCurrency(acc.balance, false, 2)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    ""
                  )
                }
                arrow
              >
                <Card
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    border: "1px solid",
                    borderColor: alpha(theme.palette.success.main, 0.3),
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: theme.palette.success.main,
                        fontWeight: 600,
                      }}
                    >
                      💵 Cash
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.success.main,
                        fontWeight: 700,
                        mt: 0.5,
                      }}
                    >
                      {formatCurrency(totalCash, !isVisible, cashDecimals)}
                    </Typography>
                    {(financials.current.cashDisplayNote ||
                      financials.current.cashAccounts) && (
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.success.main, opacity: 0.7 }}
                      >
                        {financials.current.cashDisplayNote ??
                          `${financials.current.cashAccounts?.length} accounts`}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Tooltip
                title={
                  financials.current.creditAccounts?.length ? (
                    isVisible ? (
                      <Box sx={{ p: 0.5 }}>
                        {financials.current.creditAccounts.map((acc) => (
                          <Box key={acc.name} sx={{ mb: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {acc.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "grey.300" }}
                            >
                              {formatCurrency(acc.available, false)} /{" "}
                              {formatCurrency(acc.limit, false)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )
                  ) : (
                    <Box sx={{ p: 0.5, maxWidth: 260 }}>
                      <Typography variant="body2">
                        Negative — the exact figure is irrelevant here.
                      </Typography>
                    </Box>
                  )
                }
                arrow
              >
                <Card
                  sx={{
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    border: "1px solid",
                    borderColor: alpha(theme.palette.info.main, 0.3),
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{ color: theme.palette.info.main, fontWeight: 600 }}
                    >
                      💳 Credit Available
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.info.main,
                        fontWeight: 700,
                        mt: 0.5,
                      }}
                    >
                      {financials.current.creditDisplay
                        ? isVisible
                          ? financials.current.creditDisplay
                          : "••••••"
                        : formatCurrency(totalCredit, !isVisible)}
                    </Typography>
                    {(financials.current.creditNote ||
                      financials.current.creditAccounts?.length) && (
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.info.main, opacity: 0.7 }}
                      >
                        {financials.current.creditNote ??
                          `${financials.current.creditAccounts?.length} accounts`}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Tooltip title={incentiveTooltip} arrow>
                <Card
                  sx={{
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    border: "1px solid",
                    borderColor: alpha(theme.palette.error.main, 0.3),
                    cursor: incentiveHistory ? "pointer" : "default",
                    height: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{ color: theme.palette.error.main, fontWeight: 600 }}
                    >
                      🔥 Monthly Burn
                    </Typography>
                    <Typography
                      variant={
                        financials.current.monthlyBurnDisplay ? "h6" : "h4"
                      }
                      sx={{
                        color: theme.palette.error.main,
                        fontWeight: 700,
                        mt: 0.5,
                      }}
                    >
                      {financials.current.monthlyBurnDisplay
                        ? isVisible
                          ? financials.current.monthlyBurnDisplay
                          : "••••••"
                        : formatCurrency(
                            financials.current.monthlyBurn,
                            !isVisible,
                          )}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.error.main, opacity: 0.7 }}
                    >
                      {financials.current.monthlyBurnNote ?? "per month"}
                    </Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Tooltip
                title={
                  monthlyBurnRange && isVisible
                    ? `${runwayFloor} mo at ${formatCurrency(monthlyBurnRange.max, false)}/mo · ${runwayCeiling} mo at ${formatCurrency(monthlyBurnRange.min, false)}/mo`
                    : ""
                }
                arrow
              >
                <Card
                  sx={{
                    bgcolor: alpha(getRunwayColor(runwayFloor), 0.1),
                    border: "1px solid",
                    borderColor: alpha(getRunwayColor(runwayFloor), 0.3),
                    cursor: monthlyBurnRange ? "pointer" : "default",
                    height: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: getRunwayColor(runwayFloor),
                        fontWeight: 600,
                      }}
                    >
                      ⏱️ Runway
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: getRunwayColor(runwayFloor),
                        fontWeight: 700,
                        mt: 0.5,
                      }}
                    >
                      {isVisible ? runwayDisplay : "••••"}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: getRunwayColor(runwayFloor), opacity: 0.7 }}
                    >
                      until $0
                    </Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Spending Summary */}
            <Grid item xs={12} md={5}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    📊 Spending Summary
                  </Typography>

                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell align="right">This Month</TableCell>
                          <TableCell align="right">Average</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {financials.spending.map((item) => (
                          <TableRow key={item.category}>
                            <TableCell sx={{ textTransform: "capitalize" }}>
                              {item.category}
                            </TableCell>
                            <TableCell align="right">
                              {formatCurrency(item.thisMonth, !isVisible)}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "text.secondary" }}
                            >
                              {formatCurrency(item.average, !isVisible)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow
                          sx={{
                            "& td": {
                              fontWeight: 600,
                              borderTop: "2px solid",
                              borderColor: "divider",
                            },
                          }}
                        >
                          <TableCell>Total</TableCell>
                          <TableCell align="right">
                            {formatCurrency(totalThisMonth, !isVisible)}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ color: "text.secondary" }}
                          >
                            {formatCurrency(totalAverage, !isVisible)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {isVisible && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor:
                          spendingTrend <= 0
                            ? alpha(theme.palette.success.main, 0.1)
                            : alpha(theme.palette.error.main, 0.1),
                      }}
                    >
                      {spendingTrend <= 0 ? (
                        <TrendingDownIcon
                          sx={{ color: theme.palette.success.main, mr: 1 }}
                        />
                      ) : (
                        <TrendingUpIcon
                          sx={{ color: theme.palette.error.main, mr: 1 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            spendingTrend <= 0
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                          fontWeight: 500,
                        }}
                      >
                        {spendingTrend <= 0 ? "Under" : "Over"} average by{" "}
                        {formatCurrency(Math.abs(spendingTrend), false)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Financial Incentives — why the burn dropped from ~$10k/mo */}
            {incentiveHistory && (
              <Grid item xs={12} md={7}>
                <Card
                  sx={{
                    height: "100%",
                    borderLeft: `4px solid ${theme.palette.warning.main}`,
                    bgcolor: alpha(theme.palette.warning.main, 0.06),
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        flexWrap: "wrap",
                        mb: 1.5,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        💸 Financial Incentives
                      </Typography>
                      <Tooltip title="What monthly spend used to be" arrow>
                        <Chip
                          label={`Was ${formatCurrency(incentiveHistory.priorBurn, !isVisible)}/mo`}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.warning.main, 0.15),
                            color: theme.palette.warning.main,
                            fontWeight: 600,
                          }}
                        />
                      </Tooltip>
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      {incentiveHistory.summary}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {incentiveHistory.detail}
                    </Typography>

                    {!!incentiveHistory.points?.length && (
                      <Divider sx={{ my: 2 }} />
                    )}

                    <List dense sx={{ py: 0 }}>
                      {(incentiveHistory.points ?? []).map(
                        ({ text, worked }) => (
                          <ListItem key={text} sx={{ py: 0.25, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              {worked ? (
                                <CheckCircleOutlineIcon
                                  sx={{
                                    fontSize: 14,
                                    color: theme.palette.success.main,
                                  }}
                                />
                              ) : (
                                <RemoveCircleOutlineIcon
                                  sx={{
                                    fontSize: 14,
                                    color: theme.palette.warning.main,
                                  }}
                                />
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={text}
                              primaryTypographyProps={{ variant: "body2" }}
                            />
                          </ListItem>
                        ),
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {/* Revenue Tab */}
      {activeTab === 1 && (
        <Box>
          {/* Project Revenue Potential */}
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  📈 Project Revenue Potential
                </Typography>
                <Chip
                  label={`Total: ${formatCurrency(totalPotentialIncome, !isVisible)}/mo`}
                  color="primary"
                  variant="outlined"
                />
              </Box>

              <Alert severity="info" sx={{ mb: 2 }} icon={false}>
                These are projected potential revenues, not current income.
              </Alert>

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "background.default" }}>
                      <TableCell>Project</TableCell>
                      <TableCell align="right">Potential Income</TableCell>
                      <TableCell align="center">Target Date</TableCell>
                      <TableCell align="center">Confidence</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {financials.projectRevenue.map((item) => (
                      <TableRow key={item.projectId}>
                        <TableCell>
                          <Chip
                            label={getProjectName(item.projectId)}
                            size="small"
                            sx={{
                              bgcolor: alpha(
                                getProjectColor(item.projectId),
                                0.15,
                              ),
                              color: getProjectColor(item.projectId),
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          {formatCurrency(item.potentialIncome, !isVisible)}/mo
                        </TableCell>
                        <TableCell align="center">
                          {item.potentialIncomeDate
                            ? formatMonth(item.potentialIncomeDate)
                            : "-"}
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "monospace",
                                color: getConfidenceColor(
                                  item.potentialIncomeScale,
                                ),
                              }}
                            >
                              {getConfidenceDots(item.potentialIncomeScale)}
                            </Typography>
                            <Chip
                              label={item.potentialIncomeScale}
                              size="small"
                              sx={{
                                bgcolor: alpha(
                                  getConfidenceColor(item.potentialIncomeScale),
                                  0.15,
                                ),
                                color: getConfidenceColor(
                                  item.potentialIncomeScale,
                                ),
                                textTransform: "capitalize",
                                fontWeight: 500,
                              }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Funding & Investment Tab */}
      {activeTab === 2 && (
        <Box>
          {/* What's in hand vs. what's being looked for */}
          {!!financials.resources?.length && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  🎒 Resources
                </Typography>
                <Grid container spacing={2}>
                  {financials.resources.map((resource) => (
                    <Grid item xs={6} sm={4} md={2.4} key={resource.label}>
                      <Tooltip title={resource.note ?? ""} arrow>
                        <Box
                          sx={{
                            p: 1.5,
                            height: "100%",
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: alpha(
                              getResourceColor(resource.status),
                              0.3,
                            ),
                            bgcolor: alpha(
                              getResourceColor(resource.status),
                              0.08,
                            ),
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            {resource.label}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: getResourceColor(resource.status),
                              lineHeight: 1.3,
                            }}
                          >
                            {resource.value}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: getResourceColor(resource.status),
                              opacity: 0.75,
                            }}
                          >
                            {getResourceLabel(resource.status)}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {financials.fundingOptions &&
            financials.fundingOptions.length > 0 && (
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      💰 Funding Strategy
                    </Typography>
                    <Chip
                      label="Deadline: 3/3/2026"
                      size="small"
                      sx={{
                        bgcolor: alpha("#EF4444", 0.15),
                        color: "#EF4444",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  {financials.fundingGoal && (
                    <Alert severity="info" sx={{ mb: 3 }} icon={false}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        🎯 Goal: {financials.fundingGoal}
                      </Typography>
                    </Alert>
                  )}

                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={2}>
                    {[...financials.fundingOptions]
                      .sort((a, b) => a.priority - b.priority)
                      .map((option) => (
                        <Grid item xs={12} md={6} key={option.id}>
                          <Card
                            variant="outlined"
                            sx={{
                              height: "100%",
                              borderColor: alpha(
                                getFundingTypeColor(option.type),
                                0.3,
                              ),
                              borderLeft: `4px solid ${getFundingTypeColor(option.type)}`,
                            }}
                          >
                            <CardContent>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 1,
                                  mb: 1,
                                }}
                              >
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  {getFundingTypeIcon(option.type)}
                                </Typography>
                                <Box sx={{ flex: 1 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      {option.name}
                                    </Typography>
                                    <Chip
                                      label={`#${option.priority}`}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha("#8B5CF6", 0.15),
                                        color: "#8B5CF6",
                                        fontWeight: 600,
                                        fontSize: "0.65rem",
                                        height: 20,
                                      }}
                                    />
                                    <Chip
                                      label={option.status.replace("-", " ")}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(
                                          getFundingStatusColor(option.status),
                                          0.15,
                                        ),
                                        color: getFundingStatusColor(
                                          option.status,
                                        ),
                                        fontWeight: 500,
                                        fontSize: "0.65rem",
                                        textTransform: "capitalize",
                                        height: 20,
                                      }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                  >
                                    {option.description}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box
                                sx={{ display: "flex", gap: 3, mt: 2, mb: 2 }}
                              >
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Amount
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 600,
                                      color: isVisible
                                        ? "text.primary"
                                        : "text.disabled",
                                    }}
                                  >
                                    {isVisible
                                      ? option.potentialAmount
                                      : "••••••"}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Time to Funds
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {option.timeToFunds}
                                  </Typography>
                                </Box>
                              </Box>

                              {option.deadlines &&
                                option.deadlines.length > 0 && (
                                  <Box
                                    sx={{
                                      mb: 2,
                                      p: 1.5,
                                      bgcolor: alpha("#F59E0B", 0.1),
                                      borderRadius: 1,
                                      border: `1px solid ${alpha("#F59E0B", 0.3)}`,
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: "#F59E0B",
                                        fontWeight: 600,
                                        display: "block",
                                        mb: 0.5,
                                      }}
                                    >
                                      📅 Upcoming Deadlines
                                    </Typography>
                                    {option.deadlines.map((deadline, idx) => (
                                      <Typography
                                        key={idx}
                                        variant="body2"
                                        sx={{
                                          fontWeight: 600,
                                          color: "#F59E0B",
                                        }}
                                      >
                                        • {deadline}
                                      </Typography>
                                    ))}
                                  </Box>
                                )}

                              <Box sx={{ display: "flex", gap: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#10B981", fontWeight: 600 }}
                                  >
                                    ✓ Pros
                                  </Typography>
                                  <List dense sx={{ py: 0 }}>
                                    {option.pros.slice(0, 2).map((pro, idx) => (
                                      <ListItem key={idx} sx={{ py: 0, px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 20 }}>
                                          <CheckCircleOutlineIcon
                                            sx={{
                                              fontSize: 14,
                                              color: "#10B981",
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={pro}
                                          primaryTypographyProps={{
                                            variant: "caption",
                                          }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#EF4444", fontWeight: 600 }}
                                  >
                                    ✗ Cons
                                  </Typography>
                                  <List dense sx={{ py: 0 }}>
                                    {option.cons.slice(0, 2).map((con, idx) => (
                                      <ListItem key={idx} sx={{ py: 0, px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 20 }}>
                                          <RemoveCircleOutlineIcon
                                            sx={{
                                              fontSize: 14,
                                              color: "#EF4444",
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={con}
                                          primaryTypographyProps={{
                                            variant: "caption",
                                          }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>

                  <Alert severity="warning" sx={{ mt: 3 }} icon={false}>
                    ⚠️ <strong>Decision Needed:</strong> Evaluate options and
                    decide on primary funding strategy. Current priority:
                    Revenue/Bootstrap → VC → Crowdfunding → Angel → Grants
                  </Alert>
                </CardContent>
              </Card>
            )}
        </Box>
      )}

      {/* Expanse EDU Tab */}
      {activeTab === 3 && <ExpanseEduFinancialsView />}
    </Box>
  )
}
