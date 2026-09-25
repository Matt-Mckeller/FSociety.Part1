import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  Button,
  Stack,
  Chip,
  Card,
  CardContent,
  InputAdornment,
  FormHelperText,
  Snackbar,
  LinearProgress,
  Badge,
} from "@mui/material"
import { useI18n } from "../context"

/**
 * # Integration Patterns
 *
 * Real-world examples showing how to integrate i18n
 * into forms, tables, notifications, and other common UI patterns.
 */

const meta: Meta = {
  title: "i18n/Integration Patterns",
  parameters: {
    layout: "padded",
  },
}

export default meta

// =============================================================================
// Pattern: Form with Localized Currency Input
// =============================================================================

function LocalizedCurrencyForm() {
  const { formatCurrency, formatNumber, locale, currency, localeConfig } = useI18n()
  const [amount, setAmount] = useState(0)
  const [rawInput, setRawInput] = useState("")
  const [error, setError] = useState("")

  // Parse a localized number string back to a number
  const parseLocalizedNumber = (input: string): number | null => {
    // Get the thousands and decimal separators for this locale
    const { decimal, thousands } = localeConfig.numberFormat

    // Remove thousands separators and normalize decimal
    let normalized = input
      .replace(new RegExp(`\\${thousands}`, "g"), "")
      .replace(decimal, ".")

    // Remove any currency symbols or spaces
    normalized = normalized.replace(/[^\d.-]/g, "")

    const parsed = parseFloat(normalized)
    return isNaN(parsed) ? null : parsed
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setRawInput(input)

    if (input === "") {
      setAmount(0)
      setError("")
      return
    }

    const parsed = parseLocalizedNumber(input)
    if (parsed === null) {
      setError(`Invalid number format for ${locale}`)
    } else if (parsed < 0) {
      setError("Amount must be positive")
    } else {
      setAmount(parsed)
      setError("")
    }
  }

  const handleBlur = () => {
    // Format the input on blur
    if (amount > 0 && !error) {
      setRawInput(formatNumber(amount))
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Localized Currency Input
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Type a number using your locale's format. Example for {locale}:{" "}
        <strong>{formatNumber(1234.56)}</strong>
      </Typography>
      <Stack spacing={2}>
        <Box>
          <TextField
            label="Amount"
            value={rawInput}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!error}
            fullWidth
            placeholder={formatNumber(0)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">{currency}</InputAdornment>
                ),
              }
            }}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </Box>

        <Alert severity="info">
          <Typography variant="body2">
            Parsed value: <strong>{amount}</strong>
          </Typography>
          <Typography variant="body2">
            Formatted: <strong>{formatCurrency(amount)}</strong>
          </Typography>
        </Alert>
      </Stack>
    </Paper>
  );
}

export const CurrencyInput: StoryObj = {
  name: "Form: Currency Input",
  render: () => <LocalizedCurrencyForm />,
}

// =============================================================================
// Pattern: Data Table with Formatted Columns
// =============================================================================

interface Transaction {
  id: string
  date: Date
  description: string
  amount: number
  quantity: number
}

const sampleTransactions: Transaction[] = [
  { id: "1", date: new Date("2026-04-01"), description: "Product A", amount: 1299.99, quantity: 5 },
  { id: "2", date: new Date("2026-04-02"), description: "Service B", amount: 499.0, quantity: 1 },
  { id: "3", date: new Date("2026-04-03"), description: "Product C", amount: 89.5, quantity: 100 },
  { id: "4", date: new Date("2026-04-04"), description: "Product D", amount: 15000.0, quantity: 2 },
  { id: "5", date: new Date("2026-04-05"), description: "Service E", amount: 2500.0, quantity: 10 },
]

function LocalizedDataTable() {
  const { formatCurrency, formatDate, formatNumber, locale, currency } = useI18n()

  const total = sampleTransactions.reduce((sum, t) => sum + t.amount * t.quantity, 0)

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Data Table with Formatted Columns
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={`Locale: ${locale}`} size="small" />
        <Chip label={`Currency: ${currency}`} size="small" variant="outlined" />
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleTransactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{formatDate(tx.date)}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell align="right">{formatNumber(tx.quantity)}</TableCell>
              <TableCell align="right">{formatCurrency(tx.amount)}</TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(tx.amount * tx.quantity)}</strong>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right">
              <strong>Grand Total</strong>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="span">
                {formatCurrency(total)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export const DataTable: StoryObj = {
  name: "Table: Formatted Columns",
  render: () => <LocalizedDataTable />,
}

// =============================================================================
// Pattern: Notifications with Relative Time
// =============================================================================

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  message: string
  timestamp: Date
  count?: number
}

function NotificationList() {
  const { formatRelativeTime } = useI18n()
  const now = new Date()

  const notifications: Notification[] = [
    {
      id: "1",
      type: "success",
      message: "Your order has been shipped",
      timestamp: new Date(now.getTime() - 5 * 60 * 1000), // 5 min ago
    },
    {
      id: "2",
      type: "info",
      message: "New comment on your post",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      count: 3,
    },
    {
      id: "3",
      type: "warning",
      message: "Your subscription expires soon",
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: "4",
      type: "info",
      message: "Weekly report is ready",
      timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  ]

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Notifications with Relative Time
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Timestamps automatically format as "2 hours ago", "yesterday", etc.
      </Typography>
      <Stack spacing={2}>
        {notifications.map((notif) => (
          <Alert
            key={notif.id}
            severity={notif.type}
            action={
              notif.count && (
                <Badge badgeContent={notif.count} color="primary">
                  <Box sx={{ width: 8 }} />
                </Badge>
              )
            }
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="body2">{notif.message}</Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  ml: 2,
                  whiteSpace: "nowrap"
                }}>
                {formatRelativeTime(notif.timestamp)}
              </Typography>
            </Box>
          </Alert>
        ))}
      </Stack>
    </Paper>
  );
}

export const Notifications: StoryObj = {
  name: "Notifications: Relative Time",
  render: () => <NotificationList />,
}

// =============================================================================
// Pattern: Progress/Stats Dashboard
// =============================================================================

function StatsDashboard() {
  const { formatNumber, formatCurrency, formatPercent, formatCompact, formatDate, currency } = useI18n()

  const stats = {
    revenue: 1458923.45,
    users: 45678,
    conversionRate: 0.0342,
    avgOrderValue: 127.5,
    lastUpdated: new Date(),
    growth: 0.156,
    target: 2000000,
  }

  const progress = stats.revenue / stats.target

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Dashboard Stats
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Numbers formatted based on locale. Large numbers use compact notation.
      </Typography>
      <Stack spacing={3}>
        {/* Revenue with progress */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="overline" sx={{
              color: "text.secondary"
            }}>
              Revenue
            </Typography>
            <Typography variant="h4">{formatCurrency(stats.revenue)}</Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption">
                  Target: {formatCurrency(stats.target)}
                </Typography>
                <Typography variant="caption">{formatPercent(progress)}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={progress * 100} />
            </Box>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 2,
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" sx={{
                color: "text.secondary"
              }}>
                Users
              </Typography>
              <Typography variant="h5">{formatCompact(stats.users)}</Typography>
              <Typography variant="caption" sx={{
                color: "text.secondary"
              }}>
                {formatNumber(stats.users)} total
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" sx={{
                color: "text.secondary"
              }}>
                Conversion
              </Typography>
              <Typography variant="h5">{formatPercent(stats.conversionRate)}</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" sx={{
                color: "text.secondary"
              }}>
                Avg Order
              </Typography>
              <Typography variant="h5">{formatCurrency(stats.avgOrderValue)}</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" sx={{
                color: "text.secondary"
              }}>
                Growth
              </Typography>
              <Typography variant="h5" sx={{
                color: "success.main"
              }}>
                +{formatPercent(stats.growth)}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="caption" sx={{
          color: "text.secondary"
        }}>
          Last updated: {formatDate(stats.lastUpdated)}
        </Typography>
      </Stack>
    </Paper>
  );
}

export const Dashboard: StoryObj = {
  name: "Dashboard: Stats & Progress",
  render: () => <StatsDashboard />,
}

// =============================================================================
// Pattern: Toast/Snackbar with Pluralization
// =============================================================================

function ToastDemo() {
  const { formatRelativeTime } = useI18n()
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [count, setCount] = useState(5)

  // Simple English plural (for translation pattern, see TranslationPatterns story)
  const pluralize = (n: number, singular: string, plural: string) => (n === 1 ? singular : plural)

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Toasts with Dynamic Content
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Notifications with counts and relative times.
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Number of items:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {[1, 2, 5, 10, 100].map((n) => (
              <Button
                key={n}
                size="small"
                variant={count === n ? "contained" : "outlined"}
                onClick={() => setCount(n)}
              >
                {n}
              </Button>
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => setOpen1(true)}>
            Show count toast
          </Button>
          <Button variant="outlined" onClick={() => setOpen2(true)}>
            Show time toast
          </Button>
        </Stack>
      </Stack>
      <Snackbar
        open={open1}
        autoHideDuration={3000}
        onClose={() => setOpen1(false)}
        message={`You have ${count} new ${pluralize(count, "message", "messages")}`}
      />
      <Snackbar
        open={open2}
        autoHideDuration={3000}
        onClose={() => setOpen2(false)}
        message={`Last sync: ${formatRelativeTime(new Date(Date.now() - 30 * 60 * 1000))}`}
      />
    </Paper>
  );
}

export const Toasts: StoryObj = {
  name: "Toasts: Counts & Times",
  render: () => <ToastDemo />,
}

// =============================================================================
// All Patterns Combined
// =============================================================================

export const AllPatterns: StoryObj = {
  name: "All Patterns",
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Integration Patterns
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          marginBottom: "16px"
        }}>
        Real-world examples showing how to integrate i18n formatting.
        Use the toolbar to change locale, timezone, or currency.
      </Typography>
      <LocalizedCurrencyForm />
      <LocalizedDataTable />
      <NotificationList />
      <StatsDashboard />
      <ToastDemo />
    </Stack>
  ),
}
