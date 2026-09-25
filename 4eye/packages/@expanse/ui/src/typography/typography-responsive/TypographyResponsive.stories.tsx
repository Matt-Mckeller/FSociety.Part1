import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TypographyResponsive } from './TypographyResponsive';
import { Box, Paper, Slider, Typography, Stack, alpha, useTheme } from '@mui/material';

const meta: Meta<typeof TypographyResponsive> = {
  title: 'Layout Systems/Core/Utils/Typography Responsive',
  component: TypographyResponsive,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# TypographyResponsive

Typography component that automatically shrinks font size to fit text within a specified number of lines.

## How it works

Unlike CSS \`clamp()\` which scales based on viewport size, this component:
- Measures actual text content and container width
- Shrinks font until text fits within \`desiredLineCount\` lines
- Adapts to any text length dynamically
- Uses ResizeObserver to respond to container size changes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`desiredLineCount\` | number | 1 | Target number of lines |
| \`minFontSize\` | number | 10 | Minimum font size (px) |
| \`debug\` | boolean | false | Enable console logging |

Inherits all MUI Typography props.
        `,
      },
    },
  },
  argTypes: {
    desiredLineCount: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of lines to fit text within',
    },
    minFontSize: {
      control: { type: 'number', min: 6, max: 24 },
      description: 'Minimum font size in pixels',
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TypographyResponsive>;

// =============================================================================
// Basic Stories
// =============================================================================

export const Default: Story = {
  args: {
    children: 'This text automatically shrinks to fit on one line',
    variant: 'h4',
    desiredLineCount: 1,
  },
  decorators: [
    (Story) => (
      <Paper sx={{ width: 400, p: 3 }} elevation={3}>
        <Story />
      </Paper>
    ),
  ],
};

export const LongText: Story = {
  args: {
    children:
      'This is a much longer piece of text that would normally overflow or wrap to multiple lines but will shrink to fit within the container',
    variant: 'h4',
    desiredLineCount: 1,
  },
  decorators: [
    (Story) => (
      <Paper sx={{ width: 350, p: 3 }} elevation={3}>
        <Story />
      </Paper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Long text shrinks proportionally to fit on one line.',
      },
    },
  },
};

export const TwoLines: Story = {
  args: {
    children:
      'This text is configured to fit within two lines maximum, so it can wrap once before the font size starts shrinking to accommodate the content.',
    variant: 'body1',
    desiredLineCount: 2,
  },
  decorators: [
    (Story) => (
      <Paper sx={{ width: 300, p: 3 }} elevation={3}>
        <Story />
      </Paper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Text configured to fit within two lines.',
      },
    },
  },
};

export const MinFontSize: Story = {
  args: {
    children:
      'This extremely long text demonstrates the minimum font size limit - it will shrink but never go below 12px to remain readable.',
    variant: 'h5',
    desiredLineCount: 1,
    minFontSize: 12,
  },
  decorators: [
    (Story) => (
      <Paper sx={{ width: 200, p: 3 }} elevation={3}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            mb: 1,
            display: 'block'
          }}>
          Min font size: 12px
        </Typography>
        <Story />
      </Paper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates minimum font size constraint to maintain readability.',
      },
    },
  },
};

// =============================================================================
// Interactive Demos
// =============================================================================

export const InteractiveWidth: StoryObj = {
  render: () => {
    const [width, setWidth] = useState(400);
    const theme = useTheme();

    return (
      <Box sx={{ width: 500, p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Container Width: {width}px
        </Typography>
        <Slider
          value={width}
          onChange={(_, v) => setWidth(v as number)}
          min={150}
          max={500}
          sx={{ mb: 3 }}
        />

        <Paper
          sx={{
            width,
            p: 3,
            transition: 'width 0.2s ease-out',
            border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
          elevation={2}
        >
          <TypographyResponsive variant="h4" desiredLineCount={1}>
            Dynamic Responsive Title
          </TypographyResponsive>
        </Paper>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - drag the slider to resize the container and watch the text adapt.',
      },
    },
  },
};

export const SideBySideComparison: StoryObj = {
  render: () => {
    const theme = useTheme();
    const text = 'Responsive Typography Component Demo';

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Regular vs Responsive Typography
        </Typography>
        <Stack direction="row" spacing={3}>
          <Box sx={{ width: 200 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                mb: 1,
                display: 'block'
              }}>
              Standard Typography (overflows)
            </Typography>
            <Paper sx={{ p: 2, overflow: 'hidden' }} elevation={2}>
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {text}
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ width: 200 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                mb: 1,
                display: 'block'
              }}>
              TypographyResponsive (shrinks)
            </Typography>
            <Paper
              sx={{
                p: 2,
                border: `2px solid ${alpha(theme.palette.success.main, 0.3)}`,
              }}
              elevation={2}
            >
              <TypographyResponsive variant="h5" desiredLineCount={1}>
                {text}
              </TypographyResponsive>
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison between standard Typography (with ellipsis) and TypographyResponsive.',
      },
    },
  },
};

// =============================================================================
// Use Cases
// =============================================================================

export const CardTitles: StoryObj = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      {[
        { title: 'Short Title', subtitle: 'Brief description' },
        { title: 'Medium Length Title Here', subtitle: 'A bit more descriptive text' },
        {
          title: 'This Is A Very Long Card Title That Would Normally Overflow',
          subtitle: 'Extended description with additional context',
        },
      ].map((card, i) => (
        <Paper key={i} sx={{ p: 2 }} elevation={2}>
          <TypographyResponsive variant="h6" desiredLineCount={1} sx={{ mb: 0.5 }}>
            {card.title}
          </TypographyResponsive>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            {card.subtitle}
          </Typography>
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: card titles that adapt to their length.',
      },
    },
  },
};

export const Dashboard: StoryObj = {
  render: () => {
    const theme = useTheme();
    const metrics = [
      { label: 'Total Revenue This Quarter', value: '$1,234,567' },
      { label: 'Active Users', value: '45,678' },
      { label: 'Customer Satisfaction Score', value: '94.5%' },
      { label: 'Avg Page Load', value: '1.2s' },
    ];

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          p: 2,
          width: 700,
        }}
      >
        {metrics.map((metric, i) => (
          <Paper
            key={i}
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: alpha(
                [
                  theme.palette.primary.main,
                  theme.palette.secondary.main,
                  theme.palette.success.main,
                  theme.palette.info.main,
                ][i],
                0.05
              ),
            }}
            elevation={1}
          >
            <TypographyResponsive
              variant="body2"
              color="text.secondary"
              desiredLineCount={1}
              sx={{ mb: 1 }}
            >
              {metric.label}
            </TypographyResponsive>
            <Typography variant="h5" sx={{
              fontWeight: 700
            }}>
              {metric.value}
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Dashboard metric cards with responsive labels.',
      },
    },
  },
};

export const NavigationTabs: StoryObj = {
  render: () => {
    const theme = useTheme();
    const tabs = [
      'Home',
      'Products',
      'About Us',
      'Contact & Support',
      'Blog',
      'Documentation & API Reference',
    ];

    return (
      <Paper
        sx={{
          display: 'flex',
          gap: 0,
          borderRadius: 2,
          overflow: 'hidden',
        }}
        elevation={3}
      >
        {tabs.map((tab, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              minWidth: 80,
              maxWidth: 120,
              py: 1.5,
              px: 1,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: i === 0 ? 'primary.main' : 'transparent',
              color: i === 0 ? 'primary.contrastText' : 'text.primary',
              '&:hover': {
                bgcolor: i === 0 ? 'primary.dark' : 'action.hover',
              },
              transition: 'background-color 0.2s',
            }}
          >
            <TypographyResponsive
              variant="body2"
              desiredLineCount={1}
              sx={{ fontWeight: i === 0 ? 600 : 400 }}
            >
              {tab}
            </TypographyResponsive>
          </Box>
        ))}
      </Paper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation tabs with variable-length labels.',
      },
    },
  },
};

// =============================================================================
// Variants
// =============================================================================

export const AllVariants: StoryObj = {
  render: () => {
    const text = 'The quick brown fox jumps over the lazy dog while the sun sets slowly';
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'] as const;

    return (
      <Stack spacing={2} sx={{ width: 400, p: 2 }}>
        {variants.map((variant) => (
          <Paper key={variant} sx={{ p: 2 }} elevation={1}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 0.5
              }}>
              {variant}
            </Typography>
            <TypographyResponsive variant={variant} desiredLineCount={1}>
              {text}
            </TypographyResponsive>
          </Paper>
        ))}
      </Stack>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'All typography variants with responsive sizing.',
      },
    },
  },
};
