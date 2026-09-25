import type { Meta, StoryObj } from "@storybook/react"
import { Box, Slider, Paper, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { TypographyResponsive } from "./utility/typographyResponsive"

const meta: Meta<typeof TypographyResponsive> = {
  title: "Theme/TypographyResponsive",
  component: TypographyResponsive,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**TypographyResponsive** automatically shrinks text to fit within a specified number of lines.

Unlike CSS \`clamp()\` which scales based on viewport size, this component:
- Measures actual text content and container width
- Shrinks font until text fits within \`desiredLineCount\` lines
- Adapts to any text length dynamically
- Uses ResizeObserver to respond to container size changes

**Use Cases:**
- Headlines that must stay on one line
- Card titles with variable content
- Responsive labels in dashboards
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2", "subtitle1", "subtitle2"],
      description: "MUI Typography variant",
    },
    desiredLineCount: {
      control: { type: "number", min: 1, max: 5 },
      description: "Maximum number of lines",
    },
    minFontSize: {
      control: { type: "number", min: 8, max: 24 },
      description: "Minimum font size in pixels",
    },
    debug: {
      control: "boolean",
      description: "Log sizing calculations to console",
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TypographyResponsive>

// Basic single-line example
export const SingleLine: Story = {
  args: {
    variant: "h2",
    desiredLineCount: 1,
    minFontSize: 12,
    children: "This heading automatically shrinks to fit on a single line",
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", maxWidth: 600, border: "1px dashed gray", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

// Multi-line example
export const MultiLine: Story = {
  args: {
    variant: "body1",
    desiredLineCount: 2,
    minFontSize: 10,
    children:
      "This paragraph will shrink its font size to ensure it fits within exactly two lines, no matter how long the text content becomes or how narrow the container gets.",
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", maxWidth: 400, border: "1px dashed gray", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

// Interactive resize demo
function ResizableDemo() {
  const [width, setWidth] = useState(400)

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="body2" gutterBottom>
          Container Width: {width}px
        </Typography>
        <Slider
          value={width}
          onChange={(_, value) => setWidth(value as number)}
          min={100}
          max={800}
          step={10}
          valueLabelDisplay="auto"
        />
      </Box>

      <Paper
        elevation={2}
        sx={{
          width: `${width}px`,
          p: 2,
          transition: "width 0.1s ease-out",
        }}
      >
        <TypographyResponsive variant="h3" desiredLineCount={1} debug>
          Resize me with the slider above!
        </TypographyResponsive>
      </Paper>
    </Stack>
  )
}

export const InteractiveResize: Story = {
  render: () => <ResizableDemo />,
  parameters: {
    docs: {
      description: {
        story: "Use the slider to resize the container and watch the text shrink/grow to fit.",
      },
    },
  },
}

// Comparison: with vs without
function ComparisonDemo() {
  const longText = "The quick brown fox jumps over the lazy dog while the moon shines bright"

  return (
    <Stack spacing={3}>
      <Box sx={{ width: 300, border: "1px solid", borderColor: "error.main", p: 2 }}>
        <Typography variant="caption" color="error" gutterBottom display="block">
          Without TypographyResponsive (overflows/wraps):
        </Typography>
        <Typography variant="h4">{longText}</Typography>
      </Box>

      <Box sx={{ width: 300, border: "1px solid", borderColor: "success.main", p: 2 }}>
        <Typography variant="caption" color="success.main" gutterBottom display="block">
          With TypographyResponsive (fits perfectly):
        </Typography>
        <TypographyResponsive variant="h4" desiredLineCount={1}>
          {longText}
        </TypographyResponsive>
      </Box>

      <Box sx={{ width: 300, border: "1px solid", borderColor: "info.main", p: 2 }}>
        <Typography variant="caption" color="info.main" gutterBottom display="block">
          With TypographyResponsive (2 lines):
        </Typography>
        <TypographyResponsive variant="h4" desiredLineCount={2}>
          {longText}
        </TypographyResponsive>
      </Box>
    </Stack>
  )
}

export const Comparison: Story = {
  render: () => <ComparisonDemo />,
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison showing how TypographyResponsive prevents overflow.",
      },
    },
  },
}

// Edge case: very long word
export const LongWord: Story = {
  args: {
    variant: "h3",
    desiredLineCount: 1,
    minFontSize: 8,
    children: "Supercalifragilisticexpialidocious",
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 250, border: "1px dashed gray", p: 2 }}>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          250px container with a very long word:
        </Typography>
        <Story />
      </Box>
    ),
  ],
}

// Minimum font size protection
function MinFontSizeDemo() {
  const extremelyLongText = 
    "This text is so incredibly long that it would need to shrink to an unreadably small size " +
    "to fit on a single line, but the minFontSize prop protects readability by preventing " +
    "the font from going below the specified minimum threshold."

  return (
    <Stack spacing={3}>
      <Box sx={{ width: 200, border: "1px solid orange", p: 2 }}>
        <Typography variant="caption" color="warning.main" gutterBottom display="block">
          minFontSize: 14px (stops shrinking early)
        </Typography>
        <TypographyResponsive variant="body1" desiredLineCount={1} minFontSize={14}>
          {extremelyLongText}
        </TypographyResponsive>
      </Box>

      <Box sx={{ width: 200, border: "1px solid green", p: 2 }}>
        <Typography variant="caption" color="success.main" gutterBottom display="block">
          minFontSize: 8px (allows smaller text)
        </Typography>
        <TypographyResponsive variant="body1" desiredLineCount={1} minFontSize={8}>
          {extremelyLongText}
        </TypographyResponsive>
      </Box>
    </Stack>
  )
}

export const MinFontSizeProtection: Story = {
  render: () => <MinFontSizeDemo />,
  parameters: {
    docs: {
      description: {
        story: 
          "The `minFontSize` prop prevents text from becoming unreadably small. " +
          "When text can't fit at the minimum size, it will overflow rather than shrink further.",
      },
    },
  },
}

// Typography variants showcase
function VariantsDemo() {
  const variants = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

  return (
    <Stack spacing={2}>
      {variants.map((variant) => (
        <Box key={variant} sx={{ width: 400, border: "1px dashed gray", p: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {variant}:
          </Typography>
          <TypographyResponsive variant={variant} desiredLineCount={1}>
            Responsive heading that fits in one line
          </TypographyResponsive>
        </Box>
      ))}
    </Stack>
  )
}

export const AllVariants: Story = {
  render: () => <VariantsDemo />,
  parameters: {
    docs: {
      description: {
        story: "TypographyResponsive works with all MUI Typography variants.",
      },
    },
  },
}
