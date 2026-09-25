import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Divider, Alert, Stack, Chip, Table, TableBody, TableCell, TableHead, TableRow, useTheme, alpha } from "@mui/material"

// =============================================================================
// Shared Components
// =============================================================================

function CodeBlock({ children, fontSize = 13 }: { children: React.ReactNode; fontSize?: number }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"

  return (
    <Box
      component="pre"
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor: isDark
          ? alpha(theme.palette.common.black, 0.4)
          : alpha(theme.palette.common.black, 0.87),
        color: isDark ? theme.palette.grey[300] : theme.palette.grey[100],
        fontFamily: '"Fira Code", "Consolas", monospace',
        fontSize,
        overflow: "auto",
        m: 0,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {children}
    </Box>
  )
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor: alpha(theme.palette.action.selected, 0.5),
      }}
    >
      {children}
    </Box>
  )
}

/**
 * # Internationalization Best Practices
 *
 * ## Goals of This Section
 *
 * 1. **Teach integration patterns** - Show WHERE and HOW to use i18n in your app
 * 2. **Clarify when to translate** - Browser vs custom translation decisions
 * 3. **Provide reusable patterns** - Copy-paste examples for common scenarios
 * 4. **Prevent common mistakes** - Anti-patterns and gotchas
 *
 * ## Architecture Overview
 *
 * ```
 * ┌─────────────────────────────────────────────────────────┐
 * │  App Shell                                              │
 * │  └── I18nProvider (locale, timezone, currency)          │
 * │       └── Your Components                               │
 * │            └── useI18n() hook for formatting            │
 * └─────────────────────────────────────────────────────────┘
 * ```
 *
 * ## Browser Intl API vs Custom Translations
 *
 * | Use Case | Solution | Why |
 * |----------|----------|-----|
 * | Dates, times, numbers | `Intl` API | Browser handles locale rules |
 * | Currency formatting | `Intl.NumberFormat` | Handles symbols, position, decimals |
 * | Static UI labels | Custom translations | "Submit", "Cancel", etc. |
 * | Dynamic content | Your backend | User-generated, CMS content |
 * | Pluralization | `Intl.PluralRules` + templates | "1 item" vs "2 items" |
 *
 * ## When Browser Translation Is Enough
 *
 * Modern browsers have built-in translation (Chrome Translate, Safari, etc.)
 * that works automatically. Consider skipping custom translations when:
 *
 * - **MVP/Early stage** - Focus on core features first
 * - **Technical content** - Code, numbers, data-heavy UIs
 * - **Internal tools** - Admin dashboards, dev tools
 * - **Single market** - English-only initial launch
 *
 * ## When You Need Custom Translations
 *
 * - **Brand voice matters** - Marketing, onboarding flows
 * - **Legal requirements** - GDPR, accessibility compliance  
 * - **Offline/Mobile** - React Native, PWAs without network
 * - **SEO** - Server-rendered content in target language
 * - **Complex plurals** - Russian has 4 plural forms, Arabic has 6
 */

const meta: Meta = {
  title: "i18n/Best Practices",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Internationalization Best Practices

This guide covers WHERE to use i18n, WHEN to translate, and HOW to avoid common mistakes.
        `,
      },
    },
  },
}

export default meta

// =============================================================================
// Guide: Overview
// =============================================================================

export const Overview: StoryObj = {
  render: function OverviewStory() {
    const theme = useTheme()
    return (
      <Box sx={{ maxWidth: 900 }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: "bold"
        }}>
          Goals of This Section
        </Typography>
        <Stack spacing={2} sx={{ mb: 4 }}>
          {[
            { num: 1, title: "Teach Integration Patterns", desc: "Show WHERE and HOW to use i18n in forms, tables, notifications, and data displays." },
            { num: 2, title: "Clarify When to Translate", desc: "Help you decide between browser translation, Intl API, and custom solutions." },
            { num: 3, title: "Provide Reusable Patterns", desc: "Copy-paste examples for dates, currency, pluralization, and common scenarios." },
            { num: 4, title: "Prevent Common Mistakes", desc: "Anti-patterns, performance gotchas, and accessibility considerations." },
          ].map((item) => (
            <Paper key={item.num} elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}` }}>
              <Stack direction="row" spacing={2} sx={{
                alignItems: "flex-start"
              }}>
                <Chip label={item.num} size="small" color="primary" sx={{ fontWeight: "bold", minWidth: 28 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{
                    fontWeight: "bold"
                  }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{
                    color: "text.secondary"
                  }}>{item.desc}</Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: "bold"
        }}>
          Architecture
        </Typography>
        <CodeBlock fontSize={14}>
  {`App Shell
  └── I18nProvider
      ├── locale: "en-US" | "es-ES" | "ar-SA" | ...
      ├── timezone: "America/New_York" | "UTC" | ...
      └── currency: "USD" | "EUR" | "JPY" | ...
           │
           └── Your Components
                └── useI18n() hook
                     ├── formatNumber(1234.56)  → "1,234.56"
                     ├── formatCurrency(99.99)  → "$99.99"
                     ├── formatDate(date)       → "Apr 5, 2026"
                     └── formatRelativeTime()   → "2 hours ago"`}
        </CodeBlock>
      </Box>
    );},
}

// =============================================================================
// Guide: When to Translate
// =============================================================================

export const WhenToTranslate: StoryObj = {
  name: "When to Translate",
  render: function WhenToTranslateStory() {
    const theme = useTheme()
    return (
      <Box sx={{ maxWidth: 960 }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: "bold"
        }}>
          Browser Translation vs Custom
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          Not everything needs custom translation. Modern browsers (Chrome, Safari, Edge) 
          can auto-translate pages. Use this decision guide:
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
          {[
            { color: theme.palette.success.main, icon: "✅", title: "Use Browser's Intl API", items: ["Dates and times", "Numbers and percentages", "Currency formatting", "Relative time", "List formatting", "Plural rules"] },
            { color: theme.palette.info.main, icon: "🌐", title: "Let Browser Auto-Translate", items: ["MVP / early-stage products", "Internal tools & dashboards", "Technical/data-heavy UIs", "Single-market launch", "Frequently updated content"] },
            { color: theme.palette.warning.main, icon: "🔧", title: "Custom Translation System", items: ["Brand voice & marketing copy", "Legal/compliance text", "Offline mobile apps", "SEO (server-rendered)", "Complex pluralization", "RTL layout with context"] },
          ].map((col) => (
            <Paper key={col.title} elevation={0} sx={{ p: 2.5, flex: 1, border: `1px solid ${theme.palette.divider}`, borderLeftWidth: 4, borderLeftColor: col.color }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: col.color,
                  mb: 1.5
                }}>
                {col.icon} {col.title}
              </Typography>
              <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2.5 }}>
                {col.items.map((item) => (
                  <Typography key={item} component="li" variant="body2">{item}</Typography>
                ))}
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Tip:</strong> Start with Intl API for formatting + browser auto-translate. 
          Add custom translations later for specific flows that need brand consistency.
        </Alert>
        <Typography variant="h5" gutterBottom sx={{
          fontWeight: "bold"
        }}>
          What the Intl API Handles
        </Typography>
        <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                <TableCell sx={{ fontWeight: "bold" }}>Feature</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>API</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Example (en-US → de-DE)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ["Numbers", "Intl.NumberFormat", "1,234.56 → 1.234,56"],
                ["Currency", "Intl.NumberFormat", "$99.99 → 99,99 €"],
                ["Dates", "Intl.DateTimeFormat", "4/5/2026 → 5.4.2026"],
                ["Relative Time", "Intl.RelativeTimeFormat", "2 days ago → vor 2 Tagen"],
                ["Plurals", "Intl.PluralRules", '"one" | "other" (varies)'],
                ["Lists", "Intl.ListFormat", "A, B, and C → A, B und C"],
              ].map(([feature, api, example]) => (
                <TableRow key={feature} sx={{ "&:hover": { bgcolor: alpha(theme.palette.action.hover, 0.5) } }}>
                  <TableCell>{feature}</TableCell>
                  <TableCell><code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>{api}</code></TableCell>
                  <TableCell>{example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Typography variant="h5" gutterBottom sx={{
          fontWeight: "bold"
        }}>
          What Intl API Does NOT Handle
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          The Intl API formats data, but doesn't translate UI strings:
        </Typography>
        <HighlightBox>
          <Stack direction="row" spacing={1} useFlexGap sx={{
            flexWrap: "wrap"
          }}>
            {['"Submit" button label', '"Please enter your email" error', '"Welcome back, {name}!" greeting', '"You have {count} notifications"'].map((text) => (
              <Chip key={text} label={text} size="small" variant="outlined" />
            ))}
          </Stack>
        </HighlightBox>
      </Box>
    );},
}

// =============================================================================
// Guide: Integration Points
// =============================================================================

export const IntegrationPoints: StoryObj = {
  name: "Where to Use i18n",
  render: function IntegrationPointsStory() {
    const theme = useTheme()
    const integrationPoints = [
      { num: 1, title: "App Shell / Root Layout", desc: "Wrap your entire app with I18nProvider at the top level.", code: `// app/layout.tsx or App.tsx
<I18nProvider 
  locale={userPreferences.locale}
  timezone={userPreferences.timezone}
  currency={userPreferences.currency}
>
  <App />
</I18nProvider>` },
      { num: 2, title: "Forms & Validation", desc: "Format currency inputs, date pickers, and validation messages.", code: `function PriceInput({ value, onChange }) {
  const { formatCurrency, locale } = useI18n()
  
  return (
    <TextField
      value={formatCurrency(value)}
      onChange={(e) => onChange(parseLocaleNumber(e.target.value, locale))}
    />
  )
}` },
      { num: 3, title: "Data Tables", desc: "Format dates, numbers, and currency in table cells.", code: `const columns = [
  { field: 'date', renderCell: ({ value }) => formatDate(value) },
  { field: 'price', renderCell: ({ value }) => formatCurrency(value) },
  { field: 'quantity', renderCell: ({ value }) => formatNumber(value) },
]` },
      { num: 4, title: "Notifications & Toasts", desc: "Relative time for timestamps, pluralized counts.", code: `function Notification({ createdAt, count }) {
  const { formatRelativeTime } = useI18n()
  
  return (
    <Alert>
      You have {count} new {count === 1 ? 'message' : 'messages'}
      <span>{formatRelativeTime(createdAt)}</span>
    </Alert>
  )
}` },
      { num: 5, title: "Charts & Graphs", desc: "Axis labels, tooltips, and legends should respect locale.", code: `// Recharts example
<YAxis tickFormatter={(value) => formatCompact(value)} />
<Tooltip 
  formatter={(value) => formatCurrency(value)}
  labelFormatter={(label) => formatDate(label)}
/>` },
    ]

    return (
      <Box sx={{ maxWidth: 900 }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: "bold"
        }}>
          Integration Points
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          Here's where i18n should be integrated in a typical application:
        </Typography>
        <Stack spacing={2}>
          {integrationPoints.map((point) => (
            <Paper key={point.num} elevation={0} sx={{ p: 2.5, border: `1px solid ${theme.palette.divider}` }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "flex-start",
                  mb: 2
                }}>
                <Chip label={point.num} size="small" color="primary" sx={{ fontWeight: "bold", minWidth: 28 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{
                    fontWeight: "bold"
                  }}>{point.title}</Typography>
                  <Typography variant="body2" sx={{
                    color: "text.secondary"
                  }}>{point.desc}</Typography>
                </Box>
              </Stack>
              <CodeBlock fontSize={12}>{point.code}</CodeBlock>
            </Paper>
          ))}
        </Stack>
      </Box>
    );},
}

// =============================================================================
// Guide: Do's and Don'ts
// =============================================================================

export const DosAndDonts: StoryObj = {
  name: "Do's and Don'ts",
  render: function DosAndDontsStory() {
    const theme = useTheme()
    const examples = [
      {
        wrong: { title: "Create formatters in render", code: `function Price({ value }) {
  // BAD: Creates new formatter every render
  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return <span>{fmt.format(value)}</span>
}` },
        right: { title: "Use the hook (formatters are memoized)", code: `function Price({ value }) {
  // GOOD: Uses memoized formatter from context
  const { formatCurrency } = useI18n()
  return <span>{formatCurrency(value)}</span>
}` },
      },
      {
        wrong: { title: "Hardcode locale", code: `// BAD: Hardcoded locale
date.toLocaleDateString('en-US')

// BAD: Magic number formatting
\`$\${(price / 100).toFixed(2)}\`` },
        right: { title: "Use context-provided locale", code: `// GOOD: Respects user's locale
const { formatDate, formatCurrency } = useI18n()

formatDate(date)
formatCurrency(price / 100)` },
      },
      {
        wrong: { title: "Concatenate translated strings", code: `// BAD: Word order differs by language
const msg = t('You have') + ' ' + count + ' ' + t('items')

// In German: "Sie haben 5 Artikel" ≠
// "Sie haben" + "5" + "Artikel"` },
        right: { title: "Use interpolation in templates", code: `// GOOD: Translators control word order
t('items.count', { count: 5 })

// Message: "You have {count} items"
// German:  "Sie haben {count} Artikel"` },
      },
      {
        wrong: { title: "Use left/right for layout", code: `// BAD: Breaks in RTL
style={{ marginLeft: 8, textAlign: 'left' }}

// BAD: Icons don't flip
<ArrowRight />` },
        right: { title: "Use start/end or logical properties", code: `// GOOD: Works in LTR and RTL
sx={{ marginInlineStart: 1, textAlign: 'start' }}

// GOOD: Flip directional icons
<ArrowRight sx={{ 
  transform: isRTL ? 'scaleX(-1)' : 'none' 
}} />` },
      },
    ]

    return (
      <Box sx={{ maxWidth: 960 }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: "bold"
        }}>
          Common Mistakes & Best Practices
        </Typography>
        <Stack spacing={3}>
          {examples.map((ex, idx) => (
            <Paper key={idx} elevation={0} sx={{ p: 2.5, border: `1px solid ${theme.palette.divider}` }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.error.main,
                      mb: 1.5
                    }}>
                    ❌ Don't: {ex.wrong.title}
                  </Typography>
                  <CodeBlock fontSize={11}>{ex.wrong.code}</CodeBlock>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.success.main,
                      mb: 1.5
                    }}>
                    ✅ Do: {ex.right.title}
                  </Typography>
                  <CodeBlock fontSize={11}>{ex.right.code}</CodeBlock>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    );},
}
