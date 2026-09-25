import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid, Divider, Chip, Stack } from "@mui/material"
import { useI18n } from "../../i18n"

/**
 * Demo component that showcases all i18n formatting capabilities
 */
function I18nFormattingDemo() {
  const i18n = useI18n()
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Sample numbers for formatting
  const sampleNumbers = [1234.56, 1000000, 0.1234, 99.99, 12345678.9]
  const samplePrices = [19.99, 1499.0, 99999.99, 0.99]

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Internationalization Demo
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip label={`Locale: ${i18n.locale}`} color="primary" />
        <Chip label={`Timezone: ${i18n.timezone}`} color="secondary" />
        <Chip label={`Currency: ${i18n.currency}`} color="info" />
        <Chip label={`Direction: ${i18n.direction.toUpperCase()}`} variant="outlined" />
      </Stack>

      <Grid container spacing={3}>
        {/* Number Formatting */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Number Formatting
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Standard Numbers
            </Typography>
            {sampleNumbers.map((num) => (
              <Box key={num} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {num}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatNumber(num)}
                </Typography>
              </Box>
            ))}

            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              Compact Notation
            </Typography>
            {[1000, 1000000, 1000000000].map((num) => (
              <Box key={num} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {num}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatCompact(num)}
                </Typography>
              </Box>
            ))}

            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              Percentages
            </Typography>
            {[0.05, 0.125, 0.5, 0.9999].map((num) => (
              <Box key={num} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {num}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatPercent(num)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Currency Formatting */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Currency Formatting
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Current Currency ({i18n.currency})
            </Typography>
            {samplePrices.map((price) => (
              <Box key={price} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {price}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatCurrency(price)}
                </Typography>
              </Box>
            ))}

            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              Multi-Currency Comparison (for $99.99)
            </Typography>
            {(["USD", "EUR", "GBP", "JPY", "CNY"] as const).map((curr) => (
              <Box key={curr} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {curr}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatCurrency(99.99, curr)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Date Formatting */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Date Formatting
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Current Date ({i18n.timezone})
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Short Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatShortDate(now)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Medium Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatDate(now)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Long Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatLongDate(now)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Month & Year
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatMonthYear(now)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Weekday
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.formatWeekday(now)}
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Date Range
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {i18n.formatDateRange(yesterday, nextWeek)}
            </Typography>
          </Paper>
        </Grid>

        {/* Time Formatting */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Time Formatting
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Current Time
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Time
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {i18n.formatTime(now)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Date & Time
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {i18n.formatDateTime(now)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Timezone Offset
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {i18n.getTimezoneOffset()}
              </Typography>
            </Box>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              Relative Time
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Yesterday
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {i18n.formatRelativeTime(yesterday)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Next Week
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {i18n.formatRelativeTime(nextWeek)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Last Month
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {i18n.formatRelativeTime(lastMonth)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Locale Info */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Locale Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Locale Code
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.localeConfig.code}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Native Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.localeConfig.nativeName}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Direction
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.localeConfig.direction.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  First Day of Week
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i18n.localeConfig.firstDayOfWeek]}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Decimal Separator
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  "{i18n.localeConfig.numberFormat.decimal}"
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Thousands Separator
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  "{i18n.localeConfig.numberFormat.thousands}"
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Date Order
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {i18n.localeConfig.dateOrder}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Flag
                </Typography>
                <Typography variant="body1" fontWeight="medium" sx={{ fontSize: "1.5rem" }}>
                  {i18n.localeConfig.flag}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

const meta: Meta<typeof I18nFormattingDemo> = {
  title: "Internationalization/Formatting Demo",
  component: I18nFormattingDemo,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Demonstrates all i18n formatting capabilities. Use the toolbar controls to switch locale, timezone, and currency.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof I18nFormattingDemo>

export const Default: Story = {}

export const GermanLocale: Story = {
  parameters: {
    docs: {
      description: {
        story: "Preview with German locale (de-DE). Note different decimal/thousands separators and date format.",
      },
    },
  },
}

export const JapaneseLocale: Story = {
  parameters: {
    docs: {
      description: {
        story: "Preview with Japanese locale (ja-JP). Note year-first date format and Yen currency.",
      },
    },
  },
}
