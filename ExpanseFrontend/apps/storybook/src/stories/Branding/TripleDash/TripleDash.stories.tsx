import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack, Paper } from "@mui/material"
import { TripleDash } from "expanse.ui/theme"

/**
 * TripleDash is a decorative SVG component with three parallel lines in a 1:2:3 ratio.
 * It's designed for branding, section dividers, and artistic decorations.
 *
 * The component is fully responsive and stretches to fill its container.
 *
 * ## Features
 * - **Orientation**: Horizontal or vertical
 * - **Alignment**: Start, end, or center aligned
 * - **Order**: Ascending (short→long) or descending (long→short)
 * - **Colors**: Theme-aware with support for individual line colors
 * - **Animations**: Optional entrance animations with stagger effects
 */
const meta: Meta<typeof TripleDash> = {
  title: "Branding/TripleDash",
  component: TripleDash,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Direction the lines extend",
    },
    align: {
      control: "radio",
      options: ["start", "end", "center"],
      description: "Alignment of line ends",
    },
    order: {
      control: "radio",
      options: ["ascending", "descending"],
      description: "Order of line lengths",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 10, step: 0.5 },
      description: "Thickness of each line in pixels",
    },
    gap: {
      control: { type: "range", min: 0, max: 20, step: 1 },
      description: "Gap between lines (auto-calculated if not set)",
    },
    borderRadius: {
      control: { type: "range", min: 0, max: 10, step: 0.5 },
      description: "Border radius of line ends",
    },
    color: {
      control: "text",
      description: "Color - theme path (primary.main) or CSS color",
    },
  },
}

export default meta
type Story = StoryObj<typeof TripleDash>

// ============================================================================
// Basic Examples
// ============================================================================

/**
 * Default horizontal triple dash with end alignment
 */
export const Default: Story = {
  render: (args) => (
    <Box sx={{ width: 300, height: 20 }}>
      <TripleDash {...args} />
    </Box>
  ),
}

/**
 * Vertical orientation - great for sidebars and vertical decorations
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <Box sx={{ width: 20, height: 200 }}>
      <TripleDash {...args} />
    </Box>
  ),
}

// ============================================================================
// Alignment Variations
// ============================================================================

/**
 * All alignment options side by side
 */
export const AllAlignments: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 400 }}>
      {(["start", "center", "end"] as const).map((align) => (
        <Box key={align}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
            align=&quot;{align}&quot;
          </Typography>
          <Box sx={{ height: 20, width: "100%", border: "1px dashed", borderColor: "divider" }}>
            <TripleDash align={align} />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

/**
 * Order variations - ascending vs descending
 */
export const OrderVariations: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 400 }}>
      {(["ascending", "descending"] as const).map((order) => (
        <Box key={order}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
            order=&quot;{order}&quot;
          </Typography>
          <Box sx={{ height: 20, width: "100%", border: "1px dashed", borderColor: "divider" }}>
            <TripleDash order={order} />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Orientation Matrix
// ============================================================================

/**
 * Complete matrix of orientation + alignment combinations
 */
export const OrientationAlignmentMatrix: Story = {
  render: () => (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
      {(["start", "center", "end"] as const).map((align) => (
        <Stack key={align} spacing={2} alignItems="center">
          <Typography variant="subtitle2">{align}</Typography>
          
          <Box sx={{ width: "100%" }}>
            <Typography variant="caption" color="text.secondary">Horizontal</Typography>
            <Box sx={{ height: 20, width: 150, border: "1px dashed", borderColor: "divider" }}>
              <TripleDash align={align} orientation="horizontal" />
            </Box>
          </Box>
          
          <Box>
            <Typography variant="caption" color="text.secondary">Vertical</Typography>
            <Box sx={{ width: 20, height: 150, border: "1px dashed", borderColor: "divider" }}>
              <TripleDash align={align} orientation="vertical" />
            </Box>
          </Box>
        </Stack>
      ))}
    </Box>
  ),
}

// ============================================================================
// Color Variations
// ============================================================================

/**
 * Using theme palette colors
 */
export const ThemeColors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      {["primary.main", "secondary.main", "error.main", "success.main", "text.primary", "text.secondary"].map((color) => (
        <Box key={color}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
            {color}
          </Typography>
          <Box sx={{ height: 16, width: "100%" }}>
            <TripleDash color={color} />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

/**
 * Individual colors per line - gradient effect
 */
export const GradientColors: Story = {
  args: {
    color: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
  },
  render: (args) => (
    <Box sx={{ width: 400, height: 24 }}>
      <TripleDash {...args} />
    </Box>
  ),
}

/**
 * Brand color palette per line
 */
export const BrandColors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
          Primary palette
        </Typography>
        <Box sx={{ height: 20 }}>
          <TripleDash color={["primary.light", "primary.main", "primary.dark"]} />
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
          Secondary palette
        </Typography>
        <Box sx={{ height: 20 }}>
          <TripleDash color={["secondary.light", "secondary.main", "secondary.dark"]} />
        </Box>
      </Box>
    </Stack>
  ),
}

// ============================================================================
// Animations
// ============================================================================

/**
 * Stagger-in animation - lines fade and slide in sequentially
 */
export const AnimationStaggerIn: Story = {
  args: {
    animation: {
      type: "stagger-in",
      duration: 400,
      staggerDelay: 150,
    },
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 24 }}>
      <TripleDash {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Lines animate in with a fade and slide effect, staggered by 150ms each.",
      },
    },
  },
}

/**
 * Grow animation - lines scale from 0 to full length
 */
export const AnimationGrow: Story = {
  args: {
    animation: {
      type: "grow",
      duration: 500,
      staggerDelay: 100,
    },
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 24 }}>
      <TripleDash {...args} />
    </Box>
  ),
}

/**
 * Fade-in animation - simple opacity transition
 */
export const AnimationFadeIn: Story = {
  args: {
    animation: {
      type: "fade-in",
      duration: 600,
      staggerDelay: 200,
    },
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 24 }}>
      <TripleDash {...args} />
    </Box>
  ),
}

/**
 * Slide-in animation - lines slide from alignment direction
 */
export const AnimationSlideIn: Story = {
  args: {
    animation: {
      type: "slide-in",
      duration: 400,
      staggerDelay: 100,
    },
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 24 }}>
      <TripleDash {...args} />
    </Box>
  ),
}

/**
 * Animation on hover - replays animation when hovered
 */
export const AnimationOnHover: Story = {
  args: {
    animation: {
      type: "grow",
      duration: 300,
      staggerDelay: 80,
      animateOnHover: true,
    },
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 24, cursor: "pointer" }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
        Hover to animate
      </Typography>
      <TripleDash {...args} />
    </Box>
  ),
}

/**
 * All animation types comparison
 */
export const AllAnimations: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 400 }}>
      {(["stagger-in", "grow", "fade-in", "slide-in"] as const).map((type) => (
        <Box key={type}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
            {type}
          </Typography>
          <Box sx={{ height: 20, width: "100%" }}>
            <TripleDash 
              animation={{ 
                type, 
                duration: 400, 
                staggerDelay: 120,
                animateOnHover: true,
              }} 
            />
          </Box>
        </Box>
      ))}
      <Typography variant="caption" color="text.secondary" textAlign="center">
        Hover each to replay animation
      </Typography>
    </Stack>
  ),
}

// ============================================================================
// Responsive / Container Filling
// ============================================================================

/**
 * Fills container automatically - resize the viewport to see scaling
 */
export const ResponsiveContainer: Story = {
  render: () => (
    <Box sx={{ width: "100%", maxWidth: 800, p: 2, border: "1px dashed", borderColor: "divider" }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
        Resize viewport to see responsive scaling
      </Typography>
      <Box sx={{ height: 24, width: "100%" }}>
        <TripleDash color="primary.main" />
      </Box>
    </Box>
  ),
}

/**
 * Various container sizes
 */
export const SizeComparison: Story = {
  render: () => (
    <Stack spacing={4}>
      {[100, 200, 400, 600].map((width) => (
        <Box key={width}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
            {width}px wide
          </Typography>
          <Box sx={{ height: 16, width }}>
            <TripleDash />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

/**
 * Stroke width variations
 */
export const StrokeWidthVariations: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 300 }}>
      {[2, 3, 4, 6, 8].map((strokeWidth) => (
        <Box key={strokeWidth}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
            strokeWidth={strokeWidth}
          </Typography>
          <Box sx={{ height: strokeWidth * 5, width: "100%" }}>
            <TripleDash strokeWidth={strokeWidth} />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Real-world Usage Examples
// ============================================================================

/**
 * As a section divider
 */
export const AsSectionDivider: Story = {
  render: () => (
    <Box sx={{ width: 500 }}>
      <Typography variant="h5" gutterBottom>Section Title</Typography>
      <Typography color="text.secondary" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore.
      </Typography>
      
      <Box sx={{ height: 16, width: 200, my: 4 }}>
        <TripleDash color="primary.main" />
      </Box>
      
      <Typography variant="h5" gutterBottom>Next Section</Typography>
      <Typography color="text.secondary">
        Ut enim ad minim veniam, quis nostrud exercitation.
      </Typography>
    </Box>
  ),
}

/**
 * As card corner decoration
 */
export const AsCardDecoration: Story = {
  render: () => (
    <Paper sx={{ width: 350, p: 3, position: "relative" }}>
      {/* Top right corner */}
      <Box sx={{ position: "absolute", top: 16, right: 16, width: 80, height: 12 }}>
        <TripleDash color="primary.light" align="end" />
      </Box>
      
      <Typography variant="h6" gutterBottom>Card Title</Typography>
      <Typography color="text.secondary" paragraph>
        A decorative card with TripleDash elements positioned in corners 
        for visual interest.
      </Typography>
      
      {/* Bottom left corner */}
      <Box sx={{ position: "absolute", bottom: 16, left: 16, width: 60, height: 10 }}>
        <TripleDash color="primary.light" align="start" order="descending" />
      </Box>
    </Paper>
  ),
}

/**
 * Vertical sidebar decoration
 */
export const AsSidebarDecoration: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Paper sx={{ width: 60, p: 2, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: 12, height: 200 }}>
          <TripleDash orientation="vertical" color="secondary.main" />
        </Box>
      </Paper>
      
      <Paper sx={{ width: 300, p: 3 }}>
        <Typography variant="h6" gutterBottom>Main Content</Typography>
        <Typography color="text.secondary">
          The vertical TripleDash in the sidebar provides a subtle 
          decorative element that enhances the visual hierarchy.
        </Typography>
      </Paper>
    </Box>
  ),
}

/**
 * Hero section decoration
 */
export const AsHeroDecoration: Story = {
  render: () => (
    <Box 
      sx={{ 
        width: 600, 
        p: 6, 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 2,
        color: "white",
        textAlign: "center",
      }}
    >
      <Box sx={{ height: 20, width: 200, mx: "auto", mb: 3 }}>
        <TripleDash 
          color="rgba(255,255,255,0.8)" 
          align="center"
          animation={{ type: "stagger-in", duration: 500, staggerDelay: 150 }}
        />
      </Box>
      
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.9 }}>
        A stunning hero section with decorative elements
      </Typography>
      
      <Box sx={{ height: 20, width: 200, mx: "auto", mt: 3 }}>
        <TripleDash 
          color="rgba(255,255,255,0.8)" 
          align="center" 
          order="descending"
          animation={{ type: "stagger-in", duration: 500, staggerDelay: 150 }}
        />
      </Box>
    </Box>
  ),
}

// ============================================================================
// Playground
// ============================================================================

/**
 * Full interactive playground - adjust all controls
 */
export const Playground: Story = {
  args: {
    orientation: "horizontal",
    align: "end",
    order: "ascending",
    strokeWidth: 3,
    color: "text.primary",
  },
  render: (args) => (
    <Box sx={{ width: args.orientation === "horizontal" ? 400 : 30, height: args.orientation === "horizontal" ? 30 : 300 }}>
      <TripleDash {...args} />
    </Box>
  ),
}
