import type { Meta, StoryObj } from "@storybook/react"
import {
  ExpandingBorderBox,
  ExpandingBorderBoxVariant,
} from "./ExpandingBorderBox.component"
import { Box, Typography } from "@mui/material"

/**
 * ExpandingBorderBox creates a decorative triple-border container effect.
 * The borders expand outward with decreasing thickness, creating a layered look.
 *
 * Supports theme-aware colors with light/dark mode and multiple variants:
 * - **default**: Gradient opacity from subtle outer to prominent inner border (25% → 50% → 85%)
 * - **subtle**: Very light borders for minimal visual emphasis (12% → 22% → 35%)
 * - **primary**: Uses theme primary colors for branded appearance
 * - **highContrast**: WCAG AA compliant with maximum visibility (40% → 65% → 95%)
 */
const meta: Meta<typeof ExpandingBorderBox> = {
  title: "Theme/ExpandingBorderBox",
  component: ExpandingBorderBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    largestBorderSize: {
      control: { type: "range", min: 2, max: 20, step: 1 },
      description:
        "Size of the largest (innermost) border. Outer borders scale proportionally smaller.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "subtle", "primary", "highContrast"] as ExpandingBorderBoxVariant[],
      description: "Visual variant of the border box styling. Use 'highContrast' for improved accessibility.",
    },
  },
}

export default meta
type Story = StoryObj<typeof ExpandingBorderBox>

/**
 * Default expanding border box with medium border size
 */
export const Default: Story = {
  args: {
    largestBorderSize: 8,
    variant: "default",
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 200 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography>Content inside the box</Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Small border size for subtle effect
 */
export const SmallBorder: Story = {
  args: {
    largestBorderSize: 4,
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 200 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography>Small border (4px)</Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Large border size for dramatic effect
 */
export const LargeBorder: Story = {
  args: {
    largestBorderSize: 16,
  },
  render: (args) => (
    <Box sx={{ width: 400, height: 300 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography>Large border (16px)</Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Wide container showing horizontal scaling
 */
export const WideContainer: Story = {
  args: {
    largestBorderSize: 8,
  },
  render: (args) => (
    <Box sx={{ width: 600, height: 150 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography>Wide container layout</Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * With rich content inside
 */
export const WithRichContent: Story = {
  args: {
    largestBorderSize: 10,
  },
  render: (args) => (
    <Box sx={{ width: 400, height: 300 }}>
      <ExpandingBorderBox {...args}>
        <Box sx={{ p: 3, width: "100%" }}>
          <Typography variant="h5" gutterBottom>
            Card Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is an example of richer content inside the expanding border
            box. The decorative borders frame the content nicely.
          </Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Subtle variant with very light borders for minimal visual emphasis.
 * Great for backgrounds where you want decoration without distraction.
 */
export const SubtleVariant: Story = {
  args: {
    largestBorderSize: 8,
    variant: "subtle",
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 200 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography>Subtle border variant</Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Primary variant uses theme primary colors for a branded appearance.
 * Colors adapt based on the selected theme (purple, blue, green, etc.)
 */
export const PrimaryVariant: Story = {
  args: {
    largestBorderSize: 8,
    variant: "primary",
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 200 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography>Primary color variant</Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Comparison of all four variants side by side
 */
export const AllVariants: Story = {
  args: {
    largestBorderSize: 6,
  },
  render: (args) => (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      <Box sx={{ width: 200, height: 150 }}>
        <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
          Default
        </Typography>
        <ExpandingBorderBox {...args} variant="default">
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2">Default</Typography>
          </Box>
        </ExpandingBorderBox>
      </Box>
      <Box sx={{ width: 200, height: 150 }}>
        <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
          Subtle
        </Typography>
        <ExpandingBorderBox {...args} variant="subtle">
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2">Subtle</Typography>
          </Box>
        </ExpandingBorderBox>
      </Box>
      <Box sx={{ width: 200, height: 150 }}>
        <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
          Primary
        </Typography>
        <ExpandingBorderBox {...args} variant="primary">
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2">Primary</Typography>
          </Box>
        </ExpandingBorderBox>
      </Box>
      <Box sx={{ width: 200, height: 150 }}>
        <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
          High Contrast
        </Typography>
        <ExpandingBorderBox {...args} variant="highContrast">
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2">A11y</Typography>
          </Box>
        </ExpandingBorderBox>
      </Box>
    </Box>
  ),
}

/**
 * Dark mode demonstration - toggle Storybook's theme to see the difference.
 * Borders automatically adapt to use light colors on dark backgrounds.
 */
export const DarkModeReady: Story = {
  args: {
    largestBorderSize: 10,
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Toggle between light and dark mode in Storybook to see how the borders automatically adapt their colors for proper contrast.",
      },
    },
  },
  render: (args) => (
    <Box sx={{ width: 350, height: 220 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Theme Aware
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Borders adapt to light/dark mode
          </Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * High contrast variant for maximum accessibility.
 * Uses 40% → 65% → 95% opacity gradient for WCAG AA compliance.
 * Recommended for users who need enhanced visibility.
 */
export const HighContrastVariant: Story = {
  args: {
    largestBorderSize: 8,
    variant: "highContrast",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The highContrast variant provides maximum visibility with a 40% → 65% → 95% opacity gradient, designed for users who need enhanced accessibility.",
      },
    },
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 200 }}>
      <ExpandingBorderBox {...args}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            High Contrast
          </Typography>
          <Typography variant="body2" color="text.secondary">
            WCAG AA compliant borders
          </Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}
