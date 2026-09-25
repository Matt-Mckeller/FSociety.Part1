"use client"

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Divider, useTheme, Paper } from "@mui/material"
import { TypographyResponsive } from "../components/utility/typographyResponsive"

/**
 * The Typography showcase displays all typography variants with their
 * specifications and usage guidelines.
 *
 * Each variant shows:
 * - Live text example
 * - Font family, size, weight, and line height
 * - Letter spacing and text transform (if applicable)
 *
 * Use the theme selector in the Storybook toolbar to see how typography
 * adapts to different themes.
 */
const meta: Meta = {
  title: "Brand/Typography",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Typography is organized into semantic categories:

- **Headings (h1-h6)**: For page and section titles
- **Body text (body1, body2)**: For main content
- **Subtitles**: For secondary headings
- **Utility text**: Captions, overlines, buttons
- **Custom variants**: cardTitle, cardBody, dialogTitle
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

interface TypographyVariantInfo {
  variant: string
  displayName: string
  description: string
  fontSize: string
  fontWeight: number | string
  lineHeight: number | string
  letterSpacing: string
  textTransform?: string
}

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog"
const SHORT_SAMPLE = "Expanse Design System"

/**
 * Typography variant card showing example and specs
 */
function TypographyCard({ info }: { info: TypographyVariantInfo }) {
  const theme = useTheme()

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {info.variant}
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            {info.description}
          </Typography>
        </Box>
      </Box>

      {/* Sample Text */}
      <Typography
        variant={info.variant as any}
        sx={{ mb: 2 }}
      >
        {SAMPLE_TEXT}
      </Typography>

      {/* Specs */}
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          "& > div": {
            minWidth: 120,
          },
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Font Family
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
            {theme.typography.fontFamily}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Size
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            {info.fontSize}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Weight
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            {info.fontWeight}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Line Height
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            {info.lineHeight}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Letter Spacing
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            {info.letterSpacing}
          </Typography>
        </Box>
        {info.textTransform && (
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Transform
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
              {info.textTransform}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

function useTypographyInfo(): TypographyVariantInfo[] {
  const theme = useTheme()
  const t = theme.typography

  return [
    {
      variant: "h1",
      displayName: "Heading 1",
      description: "Main page titles",
      fontSize: String(t.h1?.fontSize || "3rem"),
      fontWeight: t.h1?.fontWeight || 500,
      lineHeight: t.h1?.lineHeight || 1.167,
      letterSpacing: String(t.h1?.letterSpacing || "normal"),
    },
    {
      variant: "h2",
      displayName: "Heading 2",
      description: "Section titles",
      fontSize: String(t.h2?.fontSize || "2rem"),
      fontWeight: t.h2?.fontWeight || 500,
      lineHeight: t.h2?.lineHeight || "2rem",
      letterSpacing: String(t.h2?.letterSpacing || "normal"),
    },
    {
      variant: "h3",
      displayName: "Heading 3",
      description: "Subsection titles",
      fontSize: String(t.h3?.fontSize || "1.5rem"),
      fontWeight: t.h3?.fontWeight || 500,
      lineHeight: t.h3?.lineHeight || 1.167,
      letterSpacing: String(t.h3?.letterSpacing || "normal"),
    },
    {
      variant: "h4",
      displayName: "Heading 4",
      description: "Card titles, dialogs",
      fontSize: String(t.h4?.fontSize || "1.23rem"),
      fontWeight: t.h4?.fontWeight || 400,
      lineHeight: t.h4?.lineHeight || 1.235,
      letterSpacing: String(t.h4?.letterSpacing || "normal"),
    },
    {
      variant: "h5",
      displayName: "Heading 5",
      description: "Small headings",
      fontSize: String(t.h5?.fontSize || "1.1rem"),
      fontWeight: t.h5?.fontWeight || 400,
      lineHeight: t.h5?.lineHeight || 1.334,
      letterSpacing: String(t.h5?.letterSpacing || "0em"),
    },
    {
      variant: "h6",
      displayName: "Heading 6",
      description: "Smallest heading",
      fontSize: String(t.h6?.fontSize || "1.1rem"),
      fontWeight: t.h6?.fontWeight || 500,
      lineHeight: t.h6?.lineHeight || 1.6,
      letterSpacing: String(t.h6?.letterSpacing || "normal"),
    },
    {
      variant: "subtitle1",
      displayName: "Subtitle 1",
      description: "Primary subtitle",
      fontSize: String(t.subtitle1?.fontSize || "1rem"),
      fontWeight: t.subtitle1?.fontWeight || 400,
      lineHeight: t.subtitle1?.lineHeight || 1.0,
      letterSpacing: String(t.subtitle1?.letterSpacing || "normal"),
    },
    {
      variant: "subtitle2",
      displayName: "Subtitle 2",
      description: "Secondary subtitle",
      fontSize: String(t.subtitle2?.fontSize || "0.875rem"),
      fontWeight: t.subtitle2?.fontWeight || 600,
      lineHeight: t.subtitle2?.lineHeight || 0.875,
      letterSpacing: String(t.subtitle2?.letterSpacing || "normal"),
    },
    {
      variant: "body1",
      displayName: "Body 1",
      description: "Main body text",
      fontSize: String(t.body1?.fontSize || "1rem"),
      fontWeight: t.body1?.fontWeight || 400,
      lineHeight: t.body1?.lineHeight || 1.5,
      letterSpacing: String(t.body1?.letterSpacing || "0.01007em"),
    },
    {
      variant: "body2",
      displayName: "Body 2",
      description: "Secondary body text",
      fontSize: String(t.body2?.fontSize || "1rem"),
      fontWeight: t.body2?.fontWeight || 400,
      lineHeight: t.body2?.lineHeight || 1.5,
      letterSpacing: String(t.body2?.letterSpacing || "0.01007em"),
    },
    {
      variant: "button",
      displayName: "Button",
      description: "Button text",
      fontSize: String(t.button?.fontSize || "0.875rem"),
      fontWeight: t.button?.fontWeight || 500,
      lineHeight: t.button?.lineHeight || 1.75,
      letterSpacing: String(t.button?.letterSpacing || "0.02857em"),
      textTransform: String(t.button?.textTransform || "uppercase"),
    },
    {
      variant: "caption",
      displayName: "Caption",
      description: "Small helper text",
      fontSize: String(t.caption?.fontSize || "0.75rem"),
      fontWeight: t.caption?.fontWeight || 400,
      lineHeight: t.caption?.lineHeight || 1.66,
      letterSpacing: String(t.caption?.letterSpacing || "0.03333em"),
    },
    {
      variant: "overline",
      displayName: "Overline",
      description: "Label text above headings",
      fontSize: String(t.overline?.fontSize || "0.75rem"),
      fontWeight: t.overline?.fontWeight || 400,
      lineHeight: t.overline?.lineHeight || 2.66,
      letterSpacing: String(t.overline?.letterSpacing || "0.08333em"),
      textTransform: String(t.overline?.textTransform || "uppercase"),
    },
  ]
}

/**
 * Full typography scale showing all variants
 */
export const FullTypographyScale: StoryObj = {
  name: "Full Scale",
  render: () => {
    const variants = useTypographyInfo()
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Typography Scale
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          All typography variants with specifications
        </Typography>

        {variants.map((info) => (
          <TypographyCard key={info.variant} info={info} />
        ))}
      </Box>
    )
  },
}

/**
 * Headings only
 */
export const Headings: StoryObj = {
  name: "Headings",
  render: () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Heading Variants
      </Typography>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h1" gutterBottom>
          h1. Heading 1
        </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Heading 2
        </Typography>
        <Typography variant="h3" gutterBottom>
          h3. Heading 3
        </Typography>
        <Typography variant="h4" gutterBottom>
          h4. Heading 4
        </Typography>
        <Typography variant="h5" gutterBottom>
          h5. Heading 5
        </Typography>
        <Typography variant="h6" gutterBottom>
          h6. Heading 6
        </Typography>
      </Paper>
    </Box>
  ),
}

/**
 * Body and utility text
 */
export const BodyText: StoryObj = {
  name: "Body Text",
  render: () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Body & Utility Text
      </Typography>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" paragraph>
          body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography variant="body2" paragraph>
          body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="button" display="block" gutterBottom>
          button text
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          caption text
        </Typography>
        <Typography variant="overline" display="block">
          overline text
        </Typography>
      </Paper>
    </Box>
  ),
}

/**
 * Typography with responsive sizing using TypographyResponsive
 */
export const ResponsiveTypography: StoryObj = {
  name: "Responsive Typography",
  render: () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Responsive Typography
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Uses TypographyResponsive to automatically shrink text to fit containers
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            Fixed width container (300px) - Text shrinks to fit
          </Typography>
          <Box sx={{ width: 300, border: "1px dashed", borderColor: "divider", p: 1 }}>
            <TypographyResponsive variant="h3" desiredLineCount={1}>
              This is a very long heading that will shrink
            </TypographyResponsive>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            Comparison: Regular vs Responsive (same container)
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: 200, border: "1px solid red", p: 1, overflow: "hidden" }}>
              <Typography variant="caption" color="error" display="block">
                Regular (overflows)
              </Typography>
              <Typography variant="h4" noWrap>
                Long heading text here
              </Typography>
            </Box>
            <Box sx={{ width: 200, border: "1px solid green", p: 1 }}>
              <Typography variant="caption" color="success.main" display="block">
                Responsive (shrinks)
              </Typography>
              <TypographyResponsive variant="h4" desiredLineCount={1}>
                Long heading text here
              </TypographyResponsive>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  ),
}

/**
 * Font weights demonstration
 */
export const FontWeights: StoryObj = {
  name: "Font Weights",
  render: () => {
    const theme = useTheme()
    const weights = [
      { name: "Light", value: theme.typography.fontWeightLight },
      { name: "Regular", value: theme.typography.fontWeightRegular },
      { name: "Medium", value: theme.typography.fontWeightMedium },
      { name: "Bold", value: theme.typography.fontWeightBold },
    ]

    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Font Weights
        </Typography>
        <Paper variant="outlined" sx={{ p: 4 }}>
          {weights.map(({ name, value }) => (
            <Box key={name} sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: value, mb: 0.5 }}
              >
                {SAMPLE_TEXT}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {name} ({value})
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    )
  },
}

/**
 * Text colors in context
 */
export const TextColors: StoryObj = {
  name: "Text Colors",
  render: () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Text Colors
      </Typography>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography color="text.primary" paragraph>
          <strong>text.primary</strong> - Primary text color for main content.
          Used for headings, body text, and important information.
        </Typography>
        <Typography color="text.secondary" paragraph>
          <strong>text.secondary</strong> - Secondary text color for supporting content.
          Used for descriptions, hints, and less prominent text.
        </Typography>
        <Typography color="text.disabled" paragraph>
          <strong>text.disabled</strong> - Disabled text color.
          Used for inactive elements and placeholder text.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography color="primary" paragraph>
          <strong>primary</strong> - Primary brand color for emphasis.
        </Typography>
        <Typography color="secondary" paragraph>
          <strong>secondary</strong> - Secondary brand color.
        </Typography>
        <Typography color="error" paragraph>
          <strong>error</strong> - Error/danger color.
        </Typography>
        <Typography color="success.main" paragraph>
          <strong>success</strong> - Success color.
        </Typography>
      </Paper>
    </Box>
  ),
}
