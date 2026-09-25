import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Divider,
  Stack,
  Chip,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import { useI18n, type Locale, type Currency, localeConfigs, currencyConfigs } from "../index"
import { I18nProvider } from "../context"

/**
 * # Interactive Playground
 *
 * Test formatting across locales in real-time. Enter values and see
 * how they appear in different languages and currencies.
 */

const meta: Meta = {
  title: "i18n/Playground",
  parameters: {
    layout: "padded",
  },
}

export default meta

// =============================================================================
// Playground: Number Formatter
// =============================================================================

function NumberPlayground() {
  const { formatNumber, formatPercent, formatCompact, locale } = useI18n()
  const [value, setValue] = useState(1234567.89)

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Number Formatting
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Enter a number to see how it formats in the current locale ({locale})
      </Typography>
      <TextField
        type="number"
        label="Input value"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Standard</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatNumber(value)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Compact</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatCompact(value)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>As Percent</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatPercent(value / 100)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>With decimals</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>
            {formatNumber(value, { minimumFractionDigits: 4 })}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

// =============================================================================
// Playground: Currency Converter View
// =============================================================================

function CurrencyPlayground() {
  const { formatCurrency, locale, currency } = useI18n()
  const [value, setValue] = useState(99.99)

  const allCurrencies: Currency[] = ["USD", "EUR", "GBP", "JPY", "CNY", "INR", "SAR"]

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Currency Formatting
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        See how the same value appears in different currencies (formatted for {locale})
      </Typography>
      <Slider
        value={value}
        onChange={(_, v) => setValue(v as number)}
        min={0}
        max={10000}
        step={0.01}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
      />
      <TextField
        type="number"
        label="Amount"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Stack spacing={1}>
        {allCurrencies.map((curr) => (
          <Box
            key={curr}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              bgcolor: curr === currency ? "action.selected" : "transparent",
              borderRadius: 1,
            }}
          >
            <Stack direction="row" spacing={1} sx={{
              alignItems: "center"
            }}>
              <Typography>{currencyConfigs[curr].icon}</Typography>
              <Typography sx={{
                color: "text.secondary"
              }}>{curr}</Typography>
            </Stack>
            <Typography sx={{
              fontWeight: "medium"
            }}>{formatCurrency(value, curr)}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

// =============================================================================
// Playground: Date & Time
// =============================================================================

function DateTimePlayground() {
  const {
    formatDate,
    formatTime,
    formatDateTime,
    formatRelativeTime,
    formatShortDate,
    formatLongDate,
    formatWeekday,
    locale,
    timezone,
  } = useI18n()

  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
  const dateObj = new Date(date + "T12:00:00")

  // Sample relative dates
  const now = new Date()
  const relativeDates = [
    { label: "Now", date: now },
    { label: "1 hour ago", date: new Date(now.getTime() - 60 * 60 * 1000) },
    { label: "Yesterday", date: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
    { label: "Last week", date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
    { label: "Next week", date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
  ]

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Date & Time Formatting
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={locale} size="small" />
        <Chip label={timezone} size="small" variant="outlined" />
      </Stack>
      <TextField
        type="date"
        label="Select date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true }
        }}
      />
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Short date</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatShortDate(dateObj)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Medium date</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatDate(dateObj)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Long date</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatLongDate(dateObj)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Weekday</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatWeekday(dateObj)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Time</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatTime(dateObj)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{
            color: "text.secondary"
          }}>Date + Time</Typography>
          <Typography sx={{
            fontWeight: "medium"
          }}>{formatDateTime(dateObj)}</Typography>
        </Box>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" gutterBottom>
        Relative Time
      </Typography>
      <Stack spacing={1}>
        {relativeDates.map(({ label, date }) => (
          <Box key={label} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              {label}
            </Typography>
            <Typography variant="body2" sx={{
              fontWeight: "medium"
            }}>
              {formatRelativeTime(date)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

// =============================================================================
// Playground: Locale Comparison Grid
// =============================================================================

function LocaleComparisonPlayground() {
  const sampleLocales: Locale[] = ["en-US", "en-GB", "de-DE", "fr-FR", "ja-JP", "ar-SA"]
  const sampleNumber = 1234567.89
  const sampleDate = new Date("2026-04-05T14:30:00")
  const samplePrice = 99.99

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Locale Comparison
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Same data displayed across different locales
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Locale</strong></TableCell>
              <TableCell><strong>Number</strong></TableCell>
              <TableCell><strong>Currency</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Dir</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleLocales.map((locale) => (
              <I18nProvider key={locale} locale={locale} currency="USD">
                <LocaleRow
                  locale={locale}
                  number={sampleNumber}
                  date={sampleDate}
                  price={samplePrice}
                />
              </I18nProvider>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

function LocaleRow({
  locale,
  number,
  date,
  price,
}: {
  locale: Locale
  number: number
  date: Date
  price: number
}) {
  const { formatNumber, formatCurrency, formatDate, direction, localeConfig } = useI18n()

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" spacing={1} sx={{
          alignItems: "center"
        }}>
          <span>{localeConfig.flag}</span>
          <span>{locale}</span>
        </Stack>
      </TableCell>
      <TableCell>{formatNumber(number)}</TableCell>
      <TableCell>{formatCurrency(price)}</TableCell>
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell>
        <Chip label={direction.toUpperCase()} size="small" variant="outlined" />
      </TableCell>
    </TableRow>
  );
}

// =============================================================================
// Story: Main Playground
// =============================================================================

export const Playground: StoryObj = {
  render: () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Interactive Playground
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          marginBottom: "16px"
        }}>
        Use the Storybook toolbar controls (Globe, Clock, Credit icons) to change locale,
        timezone, and currency. Then interact with the inputs below to see formatting in action.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <NumberPlayground />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyPlayground />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DateTimePlayground />
        </Grid>
        <Grid size={12}>
          <LocaleComparisonPlayground />
        </Grid>
      </Grid>
    </Box>
  ),
}

// =============================================================================
// Story: World Clock
// =============================================================================

export const WorldClock: StoryObj = {
  render: () => {
    const { formatTime, formatDate, timezone } = useI18n()
    const now = new Date()

    const worldTimezones = [
      { tz: "America/New_York", city: "New York", flag: "🇺🇸" },
      { tz: "America/Los_Angeles", city: "Los Angeles", flag: "🇺🇸" },
      { tz: "Europe/London", city: "London", flag: "🇬🇧" },
      { tz: "Europe/Paris", city: "Paris", flag: "🇫🇷" },
      { tz: "Asia/Tokyo", city: "Tokyo", flag: "🇯🇵" },
      { tz: "Asia/Shanghai", city: "Shanghai", flag: "🇨🇳" },
      { tz: "Asia/Dubai", city: "Dubai", flag: "🇦🇪" },
      { tz: "Australia/Sydney", city: "Sydney", flag: "🇦🇺" },
    ]

    return (
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          World Clock
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          Current time across different timezones. Your selected timezone: {timezone}
        </Typography>
        <Stack spacing={2}>
          {worldTimezones.map(({ tz, city, flag }) => {
            const formatter = new Intl.DateTimeFormat("en-US", {
              timeZone: tz,
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
            const dateFormatter = new Intl.DateTimeFormat("en-US", {
              timeZone: tz,
              weekday: "short",
              month: "short",
              day: "numeric",
            })

            return (
              <Paper
                key={tz}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" spacing={2} sx={{
                  alignItems: "center"
                }}>
                  <Typography variant="h5">{flag}</Typography>
                  <Box>
                    <Typography sx={{
                      fontWeight: "medium"
                    }}>{city}</Typography>
                    <Typography variant="caption" sx={{
                      color: "text.secondary"
                    }}>
                      {tz}
                    </Typography>
                  </Box>
                </Stack>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h5" sx={{
                    fontWeight: "bold"
                  }}>
                    {formatter.format(now)}
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>
                    {dateFormatter.format(now)}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Stack>
      </Box>
    );
  },
}
