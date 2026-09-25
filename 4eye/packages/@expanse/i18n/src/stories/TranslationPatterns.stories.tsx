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
  Stack,
  Chip,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  useTheme,
  alpha,
} from "@mui/material"
import { useI18n } from "../context"

// =============================================================================
// Shared Components
// =============================================================================

function CodeBlock({ children, fontSize = 12 }: { children: React.ReactNode; fontSize?: number }) {
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
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </Box>
  )
}

/**
 * # Translation Patterns
 *
 * How to handle string translations with pluralization,
 * interpolation, and locale-aware formatting.
 *
 * These patterns work with ANY backend (custom API, CMS, etc.)
 * and don't require a specific library like react-intl.
 */

const meta: Meta = {
  title: "i18n/Translation Patterns",
  parameters: {
    layout: "padded",
  },
}

export default meta

// =============================================================================
// Simple Translation Function (Backend-Agnostic)
// =============================================================================

/**
 * Example message catalog structure.
 * In production, this would come from your backend/CMS.
 */
const messages = {
  "en-US": {
    "greeting": "Hello, {name}!",
    "items.count": "{count, plural, one {# item} other {# items}}",
    "cart.summary": "You have {count, plural, one {# item} other {# items}} in your cart totaling {total}.",
    "notification.new": "{count, plural, =0 {No new notifications} one {# new notification} other {# new notifications}}",
    "date.due": "Due {date}",
    "status.online": "{name} is online",
    "status.lastSeen": "{name} was last seen {time}",
  },
  "es-ES": {
    "greeting": "¡Hola, {name}!",
    "items.count": "{count, plural, one {# artículo} other {# artículos}}",
    "cart.summary": "Tienes {count, plural, one {# artículo} other {# artículos}} en tu carrito por un total de {total}.",
    "notification.new": "{count, plural, =0 {Sin notificaciones nuevas} one {# notificación nueva} other {# notificaciones nuevas}}",
    "date.due": "Vence el {date}",
    "status.online": "{name} está en línea",
    "status.lastSeen": "{name} se vio por última vez {time}",
  },
  "de-DE": {
    "greeting": "Hallo, {name}!",
    "items.count": "{count, plural, one {# Artikel} other {# Artikel}}",
    "cart.summary": "Sie haben {count, plural, one {# Artikel} other {# Artikel}} im Warenkorb mit einem Gesamtwert von {total}.",
    "notification.new": "{count, plural, =0 {Keine neuen Benachrichtigungen} one {# neue Benachrichtigung} other {# neue Benachrichtigungen}}",
    "date.due": "Fällig am {date}",
    "status.online": "{name} ist online",
    "status.lastSeen": "{name} war zuletzt {time} online",
  },
  "ar-SA": {
    "greeting": "مرحباً، {name}!",
    "items.count": "{count, plural, zero {لا عناصر} one {عنصر واحد} two {عنصران} few {# عناصر} many {# عنصراً} other {# عنصر}}",
    "cart.summary": "لديك {count, plural, zero {لا عناصر} one {عنصر واحد} two {عنصران} few {# عناصر} other {# عنصر}} في سلتك بإجمالي {total}.",
    "notification.new": "{count, plural, zero {لا إشعارات جديدة} one {إشعار جديد} two {إشعاران جديدان} few {# إشعارات جديدة} other {# إشعار جديد}}",
    "date.due": "موعد الاستحقاق {date}",
    "status.online": "{name} متصل",
    "status.lastSeen": "آخر ظهور لـ {name} {time}",
  },
} as const

type MessageKey = keyof typeof messages["en-US"]
type SupportedLocale = keyof typeof messages

// =============================================================================
// ICU MessageFormat Parser (Simplified)
// =============================================================================

/**
 * Simple ICU MessageFormat parser for plurals.
 * In production, consider using 'intl-messageformat' package for full support.
 *
 * Supports:
 * - {variable} - Simple interpolation
 * - {count, plural, one {singular} other {plural}} - Plurals
 * - {count, plural, =0 {zero} =1 {one} other {many}} - Exact matches
 */
function formatMessage(
  template: string,
  values: Record<string, string | number>,
  locale: string
): string {
  // Handle plural syntax: {count, plural, one {...} other {...}}
  const pluralRegex = /\{(\w+),\s*plural,([^}]+(?:\{[^}]*\}[^}]*)+)\}/g

  let result = template.replace(pluralRegex, (match, varName, pluralParts) => {
    const count = Number(values[varName])
    const pluralRules = new Intl.PluralRules(locale)
    const category = pluralRules.select(count)

    // Parse plural options: =0 {...}, one {...}, other {...}
    const options: Record<string, string> = {}
    const optionRegex = /(=\d+|zero|one|two|few|many|other)\s*\{([^}]*)\}/g
    let optMatch
    while ((optMatch = optionRegex.exec(pluralParts)) !== null) {
      options[optMatch[1]] = optMatch[2]
    }

    // Check for exact match first (=0, =1, etc.)
    const exactMatch = options[`=${count}`]
    if (exactMatch !== undefined) {
      return exactMatch.replace(/#/g, String(count));
    }

    // Fall back to plural category
    const selected = options[category] || options["other"] || ""
    return selected.replace(/#/g, String(count));
  })

  // Handle simple interpolation: {variable}
  result = result.replace(/\{(\w+)\}/g, (match, varName) => {
    const value = values[varName]
    return value !== undefined ? String(value) : match
  })

  return result
}

// =============================================================================
// Translation Hook Example
// =============================================================================

function useTranslation() {
  const { locale, formatNumber, formatCurrency, formatDate, formatRelativeTime } = useI18n()

  // Get messages for current locale (fallback to en-US)
  const localeMessages =
    messages[locale as SupportedLocale] || messages["en-US"]

  /**
   * Translate a message key with optional values.
   *
   * @param key - Message key from the catalog
   * @param values - Interpolation values (numbers are auto-formatted)
   */
  function t(key: MessageKey, values?: Record<string, string | number>): string {
    const template = localeMessages[key] || messages["en-US"][key] || key

    if (!values) {
      return template
    }

    // Format numeric values using locale
    const formattedValues: Record<string, string | number> = {}
    for (const [k, v] of Object.entries(values)) {
      if (typeof v === "number" && !k.includes("count")) {
        // Assume non-count numbers should be formatted
        formattedValues[k] = formatNumber(v)
      } else {
        formattedValues[k] = v
      }
    }

    return formatMessage(template, formattedValues, locale)
  }

  return { t, locale }
}

// =============================================================================
// Demo Components
// =============================================================================

function PluralDemo() {
  const { t, locale } = useTranslation()
  const [count, setCount] = useState(5)

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Pluralization
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        ICU MessageFormat handles plural rules for each language.
        Arabic has 6 plural forms, English has 2.
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Count: {count}
          </Typography>
          <Slider
            value={count}
            onChange={(_, v) => setCount(v as number)}
            min={0}
            max={20}
            marks={[
              { value: 0, label: "0" },
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 5, label: "5" },
              { value: 11, label: "11" },
              { value: 20, label: "20" },
            ]}
          />
        </Box>

        <Chip label={`Locale: ${locale}`} size="small" />

        <Stack spacing={1}>
          <Alert severity="info">
            <Typography variant="body2">{t("items.count", { count })}</Typography>
          </Alert>
          <Alert severity="success">
            <Typography variant="body2">{t("notification.new", { count })}</Typography>
          </Alert>
        </Stack>

        <Divider />

        <Typography variant="subtitle2" gutterBottom>
          How it works
        </Typography>
        <CodeBlock>
{`// Message template (ICU syntax)
"items.count": "{count, plural, one {# item} other {# items}}"

// Arabic has more categories
"items.count": "{count, plural, 
  zero {لا عناصر} 
  one {عنصر واحد} 
  two {عنصران} 
  few {# عناصر} 
  other {# عنصر}
}"`}
        </CodeBlock>
      </Stack>
    </Paper>
  );
}

function InterpolationDemo() {
  const { t, locale } = useTranslation()
  const { formatCurrency, formatRelativeTime } = useI18n()
  const [name, setName] = useState("Alex")
  const [count, setCount] = useState(3)
  const [total, setTotal] = useState(149.99)

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Interpolation with Formatting
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Insert dynamic values into messages. Numbers and dates are auto-formatted.
      </Typography>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />
        <Stack direction="row" spacing={2}>
          <TextField
            label="Count"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            size="small"
            sx={{ width: 100 }}
          />
          <TextField
            label="Total"
            type="number"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            size="small"
            sx={{ width: 150 }}
          />
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Alert>
          <Typography variant="body2">
            {t("greeting", { name })}
          </Typography>
        </Alert>
        <Alert severity="info">
          <Typography variant="body2">
            {t("cart.summary", { count, total: formatCurrency(total) })}
          </Typography>
        </Alert>
        <Alert severity="success">
          <Typography variant="body2">
            {t("status.online", { name })}
          </Typography>
        </Alert>
        <Alert severity="warning">
          <Typography variant="body2">
            {t("status.lastSeen", {
              name,
              time: formatRelativeTime(new Date(Date.now() - 2 * 60 * 60 * 1000)),
            })}
          </Typography>
        </Alert>
      </Stack>
    </Paper>
  );
}

function PluralRulesExplainer() {
  const [testCount, setTestCount] = useState(1)

  const locales = ["en-US", "fr-FR", "ru-RU", "ar-SA", "ja-JP", "zh-CN"]

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Intl.PluralRules by Language
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Different languages have different plural categories.
        The browser's Intl API handles this automatically.
      </Typography>
      <TextField
        label="Test number"
        type="number"
        value={testCount}
        onChange={(e) => setTestCount(Number(e.target.value))}
        size="small"
        sx={{ mb: 2 }}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Locale</strong></TableCell>
            <TableCell><strong>Category for {testCount}</strong></TableCell>
            <TableCell><strong>All Categories</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locales.map((locale) => {
            const rules = new Intl.PluralRules(locale)
            const category = rules.select(testCount)

            // Get supported categories by testing various numbers
            const testNums = [0, 1, 2, 3, 4, 5, 11, 21, 100]
            const categories = [...new Set(testNums.map((n) => rules.select(n)))]

            return (
              <TableRow key={locale}>
                <TableCell>{locale}</TableCell>
                <TableCell>
                  <Chip label={category} size="small" color="primary" />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} sx={{
                    flexWrap: "wrap"
                  }}>
                    {categories.map((cat) => (
                      <Chip
                        key={cat}
                        label={cat}
                        size="small"
                        variant={cat === category ? "filled" : "outlined"}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>English:</strong> one, other<br />
          <strong>French:</strong> one, many, other<br />
          <strong>Russian:</strong> one, few, many, other<br />
          <strong>Arabic:</strong> zero, one, two, few, many, other
        </Typography>
      </Alert>
    </Paper>
  );
}

function TranslationWorkflowCard({ step, title, code }: { step: number; title: string; code: string }) {
  const theme = useTheme()
  return (
    <Paper sx={{ p: 2, bgcolor: alpha(theme.palette.action.selected, 0.3) }}>
      <Typography variant="subtitle2" gutterBottom>
        {step}. {title}
      </Typography>
      <CodeBlock>{code}</CodeBlock>
    </Paper>
  )
}

function TranslationWorkflow() {
  const workflowSteps = [
    { step: 1, title: "Define message keys in code", code: `// Use t() with semantic keys
t("cart.empty")           // Simple string
t("items.count", { count }) // With pluralization
t("order.total", { total: formatCurrency(99.99) })` },
    { step: 2, title: "Extract keys (build step or manual)", code: `// Generated: messages/en-US.json
{
  "cart.empty": "Your cart is empty",
  "items.count": "{count, plural, one {# item} other {# items}}",
  "order.total": "Total: {total}"
}` },
    { step: 3, title: "Translate (CMS, Lokalise, Crowdin, etc.)", code: `// messages/es-ES.json
{
  "cart.empty": "Tu carrito está vacío",
  "items.count": "{count, plural, one {# artículo} other {# artículos}}",
  "order.total": "Total: {total}"
}` },
    { step: 4, title: "Load at runtime or build time", code: `// Option A: Build-time (smaller bundle per locale)
import messages from \`./messages/\${locale}.json\`

// Option B: Runtime (from your API)
const messages = await fetch(\`/api/translations/\${locale}\`)` },
  ]

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Translation Workflow
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        A typical workflow for managing translations with a custom backend.
      </Typography>
      <Stack spacing={2}>
        {workflowSteps.map((s) => (
          <TranslationWorkflowCard key={s.step} {...s} />
        ))}
      </Stack>
    </Paper>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const Pluralization: StoryObj = {
  name: "Pluralization",
  render: () => <PluralDemo />,
}

export const Interpolation: StoryObj = {
  name: "Interpolation",
  render: () => <InterpolationDemo />,
}

export const PluralRulesReference: StoryObj = {
  name: "Plural Rules Reference",
  render: () => <PluralRulesExplainer />,
}

export const Workflow: StoryObj = {
  name: "Translation Workflow",
  render: () => <TranslationWorkflow />,
}

export const AllPatterns: StoryObj = {
  name: "All Translation Patterns",
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Translation Patterns
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          marginBottom: "16px"
        }}>
        These patterns work with any backend. Use the locale selector in the toolbar
        to see how messages change between languages.
      </Typography>
      <PluralDemo />
      <InterpolationDemo />
      <PluralRulesExplainer />
      <TranslationWorkflow />
    </Stack>
  ),
}
