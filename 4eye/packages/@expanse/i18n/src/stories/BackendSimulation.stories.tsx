import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Chip,
  Divider,
  Card,
  CardContent,
  Alert,
  useTheme,
  alpha,
} from "@mui/material"
import {
  ArrowForward as ArrowIcon,
  Storage as StorageIcon,
  Devices as DevicesIcon,
  Transform as TransformIcon,
} from "@mui/icons-material"
import { useI18n } from "../context"
import type { Currency } from "../config"

/**
 * # Backend Data Simulation
 *
 * Demonstrates how backend data in canonical formats (USD, UTC, English)
 * gets transformed for display based on user preferences.
 *
 * ## The Data Flow
 *
 * ```
 * Backend (Canonical)          Frontend (User Preferences)
 * ──────────────────           ────────────────────────────
 * amount: 99.99 USD    →→→     €91.49 (converted + formatted)
 * timestamp: UTC ISO   →→→     Local time in user's timezone
 * text: "en" key       →→→     Translated to user's language
 * ```
 */

const meta: Meta = {
  title: "i18n/Backend Simulation",
  parameters: {
    layout: "padded",
  },
}

export default meta

// =============================================================================
// Mock Exchange Rates (simplified - real apps use live rates)
// =============================================================================

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.5,
  CNY: 7.24,
  INR: 83.4,
  SAR: 3.75,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
}

function convertAmount(amountUSD: number, targetCurrency: Currency): number {
  return amountUSD * EXCHANGE_RATES[targetCurrency]
}

// =============================================================================
// Mock Backend Response Types
// =============================================================================

interface BackendProduct {
  id: string
  name: string // English
  price_usd: number // Always USD
  created_at: string // Always UTC ISO
  updated_at: string // Always UTC ISO
}

interface BackendOrder {
  id: string
  total_usd: number
  placed_at: string // UTC ISO
  items: Array<{
    name: string
    quantity: number
    unit_price_usd: number
  }>
}

// =============================================================================
// Sample Backend Data
// =============================================================================

const mockProducts: BackendProduct[] = [
  {
    id: "prod_001",
    name: "Premium Subscription",
    price_usd: 99.99,
    created_at: "2026-04-07T08:30:00Z",
    updated_at: "2026-04-07T14:15:00Z",
  },
  {
    id: "prod_002",
    name: "Enterprise License",
    price_usd: 499.0,
    created_at: "2026-04-05T16:00:00Z",
    updated_at: "2026-04-06T09:45:00Z",
  },
  {
    id: "prod_003",
    name: "Starter Pack",
    price_usd: 29.99,
    created_at: "2026-04-01T12:00:00Z",
    updated_at: "2026-04-07T11:30:00Z",
  },
]

const mockOrder: BackendOrder = {
  id: "ord_12345",
  total_usd: 628.98,
  placed_at: "2026-04-07T15:42:33Z",
  items: [
    { name: "Premium Subscription", quantity: 1, unit_price_usd: 99.99 },
    { name: "Enterprise License", quantity: 1, unit_price_usd: 499.0 },
    { name: "Starter Pack", quantity: 1, unit_price_usd: 29.99 },
  ],
}

// =============================================================================
// Styled Components
// =============================================================================

function CodeBlock({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"

  return (
    <Box
      component="pre"
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor: isDark ? alpha(theme.palette.common.black, 0.4) : alpha(theme.palette.common.black, 0.87),
        color: isDark ? theme.palette.grey[300] : theme.palette.grey[100],
        fontFamily: "monospace",
        fontSize: 13,
        overflow: "auto",
        m: 0,
        "& code": {
          color: "inherit",
        },
      }}
    >
      {children}
    </Box>
  )
}

function DataCard({
  title,
  icon,
  children,
  variant = "default",
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  variant?: "default" | "backend" | "frontend"
}) {
  const theme = useTheme()

  const borderColor = {
    default: theme.palette.divider,
    backend: theme.palette.warning.main,
    frontend: theme.palette.success.main,
  }[variant]

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor,
        borderWidth: 2,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            mb: 2
          }}>
          {icon}
          <Typography variant="subtitle1" sx={{
            fontWeight: "bold"
          }}>
            {title}
          </Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}

function TransformArrow() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Stack spacing={0.5} sx={{
        alignItems: "center"
      }}>
        <TransformIcon sx={{ color: theme.palette.primary.main }} />
        <ArrowIcon sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
        <Typography variant="caption" sx={{
          color: "text.secondary"
        }}>
          i18n
        </Typography>
      </Stack>
    </Box>
  );
}

// =============================================================================
// Currency Conversion Demo
// =============================================================================

function CurrencyConversionDemo() {
  const theme = useTheme()
  const { formatCurrency, currency, locale } = useI18n()

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Currency Conversion
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 3
        }}>
        Backend stores all prices in <strong>USD</strong>. Frontend converts and formats
        for the user's selected currency (<strong>{currency}</strong>).
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{
        alignItems: "stretch"
      }}>
        {/* Backend Data */}
        <Box sx={{ flex: 1 }}>
          <DataCard
            title="Backend Response"
            icon={<StorageIcon color="warning" />}
            variant="backend"
          >
            <CodeBlock>
              {JSON.stringify(
                {
                  products: mockProducts.map((p) => ({
                    id: p.id,
                    name: p.name,
                    price_usd: p.price_usd,
                  })),
                },
                null,
                2
              )}
            </CodeBlock>
          </DataCard>
        </Box>

        <TransformArrow />

        {/* Frontend Display */}
        <Box sx={{ flex: 1 }}>
          <DataCard
            title="Frontend Display"
            icon={<DevicesIcon color="success" />}
            variant="frontend"
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockProducts.map((product) => {
                  const convertedAmount = convertAmount(product.price_usd, currency)
                  return (
                    <TableRow
                      key={product.id}
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                      }}
                    >
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">
                        <Stack sx={{
                          alignItems: "flex-end"
                        }}>
                          <Typography sx={{
                            fontWeight: "medium"
                          }}>
                            {formatCurrency(convertedAmount)}
                          </Typography>
                          {currency !== "USD" && (
                            <Typography variant="caption" sx={{
                              color: "text.secondary"
                            }}>
                              (${product.price_usd.toFixed(2)} USD)
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <Alert severity="info" sx={{ mt: 2 }} icon={false}>
              <Typography variant="caption">
                Rate: 1 USD = {EXCHANGE_RATES[currency]} {currency}
              </Typography>
            </Alert>
          </DataCard>
        </Box>
      </Stack>
    </Box>
  );
}

// =============================================================================
// Timestamp Conversion Demo
// =============================================================================

function TimestampConversionDemo() {
  const theme = useTheme()
  const { formatDateTime, formatRelativeTime, timezone, locale } = useI18n()

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Timestamp Conversion
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 3
        }}>
        Backend stores all timestamps in <strong>UTC ISO format</strong>. Frontend converts
        to the user's timezone (<strong>{timezone}</strong>) and formats for their locale.
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{
        alignItems: "stretch"
      }}>
        {/* Backend Data */}
        <Box sx={{ flex: 1 }}>
          <DataCard
            title="Backend Response"
            icon={<StorageIcon color="warning" />}
            variant="backend"
          >
            <CodeBlock>
              {JSON.stringify(
                {
                  products: mockProducts.map((p) => ({
                    id: p.id,
                    created_at: p.created_at,
                    updated_at: p.updated_at,
                  })),
                },
                null,
                2
              )}
            </CodeBlock>
          </DataCard>
        </Box>

        <TransformArrow />

        {/* Frontend Display */}
        <Box sx={{ flex: 1 }}>
          <DataCard
            title="Frontend Display"
            icon={<DevicesIcon color="success" />}
            variant="frontend"
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <Typography variant="body2">
                          {formatDateTime(product.created_at)}
                        </Typography>
                        <Typography variant="caption" sx={{
                          color: "text.secondary"
                        }}>
                          {formatRelativeTime(product.created_at)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <Typography variant="body2">
                          {formatDateTime(product.updated_at)}
                        </Typography>
                        <Typography variant="caption" sx={{
                          color: "text.secondary"
                        }}>
                          {formatRelativeTime(product.updated_at)}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </Box>
      </Stack>
    </Box>
  );
}

// =============================================================================
// Full Order Example
// =============================================================================

function OrderReceiptDemo() {
  const theme = useTheme()
  const { formatCurrency, formatDateTime, formatRelativeTime, currency, timezone, locale } = useI18n()

  const convertedTotal = convertAmount(mockOrder.total_usd, currency)

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Complete Example: Order Receipt
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 3
        }}>
        A real-world example combining currency conversion, timestamp formatting,
        and locale-aware number formatting.
      </Typography>
      <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
        {/* Backend JSON */}
        <Box sx={{ flex: 1 }}>
          <DataCard
            title="API Response (Canonical)"
            icon={<StorageIcon color="warning" />}
            variant="backend"
          >
            <CodeBlock>{JSON.stringify(mockOrder, null, 2)}</CodeBlock>
          </DataCard>
        </Box>

        {/* Frontend Receipt */}
        <Box sx={{ flex: 1 }}>
          <DataCard
            title="User Display"
            icon={<DevicesIcon color="success" />}
            variant="frontend"
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: alpha(theme.palette.background.default, 0.5),
                border: `1px dashed ${theme.palette.divider}`,
              }}
            >
              {/* Receipt Header */}
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 3
                }}>
                <Box>
                  <Typography variant="h6">Order #{mockOrder.id}</Typography>
                  <Typography variant="body2" sx={{
                    color: "text.secondary"
                  }}>
                    {formatDateTime(mockOrder.placed_at)}
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>
                    ({formatRelativeTime(mockOrder.placed_at)})
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.5}>
                  <Chip label={locale} size="small" />
                  <Chip label={timezone} size="small" variant="outlined" />
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Line Items */}
              <Stack spacing={1.5}>
                {mockOrder.items.map((item, idx) => {
                  const convertedPrice = convertAmount(item.unit_price_usd, currency)
                  const lineTotal = convertedPrice * item.quantity
                  return (
                    <Stack
                      key={idx}
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                      <Box>
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="caption" sx={{
                          color: "text.secondary"
                        }}>
                          {item.quantity} × {formatCurrency(convertedPrice)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{
                        fontWeight: "medium"
                      }}>
                        {formatCurrency(lineTotal)}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Total */}
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <Typography variant="subtitle1" sx={{
                  fontWeight: "bold"
                }}>
                  Total
                </Typography>
                <Stack sx={{
                  alignItems: "flex-end"
                }}>
                  <Typography variant="h5" color="primary" sx={{
                    fontWeight: "bold"
                  }}>
                    {formatCurrency(convertedTotal)}
                  </Typography>
                  {currency !== "USD" && (
                    <Typography variant="caption" sx={{
                      color: "text.secondary"
                    }}>
                      (${mockOrder.total_usd.toFixed(2)} USD)
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </DataCard>
        </Box>
      </Stack>
    </Box>
  );
}

// =============================================================================
// Current Settings Display
// =============================================================================

function CurrentSettings() {
  const { locale, timezone, currency, direction, localeConfig } = useI18n()

  return (
    <Alert severity="info" sx={{ mb: 4 }}>
      <Stack direction="row" spacing={2} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <Chip
          label={`${localeConfig.flag} ${locale}`}
          size="small"
          color="primary"
        />
        <Chip label={`🕐 ${timezone}`} size="small" variant="outlined" />
        <Chip label={`💰 ${currency}`} size="small" variant="outlined" />
        <Chip
          label={`${direction === "rtl" ? "⬅️" : "➡️"} ${direction.toUpperCase()}`}
          size="small"
          variant="outlined"
        />
      </Stack>
    </Alert>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const DataFlow: StoryObj = {
  name: "Data Flow Overview",
  render: () => (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h4" gutterBottom>
        Backend → Frontend Data Transformation
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          marginBottom: "16px"
        }}>
        This demo shows how data stored in canonical formats on the backend
        gets transformed for display based on user preferences. Use the toolbar
        controls to change locale, timezone, and currency.
      </Typography>

      <CurrentSettings />

      <CurrencyConversionDemo />
      <TimestampConversionDemo />
      <OrderReceiptDemo />
    </Box>
  ),
}

export const CurrencyOnly: StoryObj = {
  name: "Currency Conversion",
  render: () => (
    <Box sx={{ maxWidth: 1000 }}>
      <Typography variant="h4" gutterBottom>
        Currency Conversion
      </Typography>
      <CurrentSettings />
      <CurrencyConversionDemo />
    </Box>
  ),
}

export const TimestampsOnly: StoryObj = {
  name: "Timestamp Conversion",
  render: () => (
    <Box sx={{ maxWidth: 1000 }}>
      <Typography variant="h4" gutterBottom>
        Timestamp Conversion
      </Typography>
      <CurrentSettings />
      <TimestampConversionDemo />
    </Box>
  ),
}

export const OrderReceipt: StoryObj = {
  name: "Order Receipt Example",
  render: () => (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h4" gutterBottom>
        Order Receipt
      </Typography>
      <CurrentSettings />
      <OrderReceiptDemo />
    </Box>
  ),
}
