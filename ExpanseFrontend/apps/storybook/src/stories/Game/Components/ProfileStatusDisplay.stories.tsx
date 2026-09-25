"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Grid, Typography, Chip, Paper, Divider } from "@mui/material"
import { ProfileStatusDisplay } from "expanse.ui/game"
import { ProgressContext, WalletContext } from "expanse.ui/game"

// Mock providers for the status components
const MockProgressProvider = ({
  children,
  level = 5,
  percentage = 65,
}: {
  children: React.ReactNode
  level?: number
  percentage?: number
}) => (
  <ProgressContext.Provider
    value={{
      progressLevel: level,
      progressPercentage: percentage,
      addManualExperience: () => {},
    }}
  >
    {children}
  </ProgressContext.Provider>
)

const MockWalletProvider = ({
  children,
  coins = 1250,
}: {
  children: React.ReactNode
  coins?: number
}) => (
  <WalletContext.Provider
    value={{
      coins: {
        xcoins: {
          coinId: "1",
          quantity: coins,
          name: "XCoins",
          coinIconText: "🪙",
          schoolId: "",
          classId: "",
        },
      },
      gems: {},
      tickets: {},
      essences: {},
      refetchWallet: async () => {},
      addManualCoins: () => {},
      addManualGems: () => {},
      addManualTickets: () => {},
      addManualEssences: () => {},
    }}
  >
    {children}
  </WalletContext.Provider>
)

const meta: Meta<typeof ProfileStatusDisplay> = {
  title: "Game/Components/ProfileStatusDisplay",
  component: ProfileStatusDisplay,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Displays user profile status including level, currency, and experience progress.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MockProgressProvider>
        <MockWalletProvider>
          <Box sx={{ width: 300, bgcolor: "background.paper", p: 2 }}>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProfileStatusDisplay>

export const Default: Story = {
  args: {
    layout: "staircase",
  },
}

export const StaircaseLayout: Story = {
  name: "Staircase Layout (Vertical Right-Aligned)",
  args: {
    layout: "staircase",
    barHeight: 28,
  },
}

export const HorizontalLayout: Story = {
  name: "Horizontal Layout (Small to Large)",
  args: {
    layout: "horizontal",
    barHeight: 28,
  },
  decorators: [
    (Story) => (
      <MockProgressProvider>
        <MockWalletProvider>
          <Box sx={{ width: 400, bgcolor: "background.paper", p: 2 }}>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const CustomBarHeight: Story = {
  name: "Custom Bar Height (40px)",
  args: {
    layout: "staircase",
    barHeight: 40,
  },
}

export const SmallBarHeight: Story = {
  name: "Small Bar Height (20px)",
  args: {
    layout: "staircase",
    barHeight: 20,
  },
}

export const HighLevel: Story = {
  args: {
    layout: "staircase",
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={25} percentage={88}>
        <MockWalletProvider coins={50000}>
          <Box sx={{ width: 300, bgcolor: "background.paper", p: 2 }}>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const NewPlayer: Story = {
  args: {
    layout: "staircase",
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={1} percentage={10}>
        <MockWalletProvider coins={50}>
          <Box sx={{ width: 300, bgcolor: "background.paper", p: 2 }}>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const HorizontalHighLevel: Story = {
  name: "Horizontal - High Level Player",
  args: {
    layout: "horizontal",
    barHeight: 32,
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={50} percentage={95}>
        <MockWalletProvider coins={999999}>
          <Box sx={{ width: 500, bgcolor: "background.paper", p: 2 }}>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

// ============================================
// Display State Stories
// ============================================

export const ActiveState: Story = {
  name: "Display State: Active",
  args: {
    layout: "staircase",
    barHeight: 36,
    displayState: "active",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active state shows the component at full opacity - the default appearance when the component should draw attention.",
      },
    },
  },
}

export const InteractiveState: Story = {
  name: "Display State: Interactive",
  args: {
    layout: "staircase",
    barHeight: 36,
    displayState: "interactive",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive state shows the component at reduced opacity (60%) but brightens to full opacity on hover. Ideal for elements that should be accessible but not distracting.",
      },
    },
  },
}

export const InactiveState: Story = {
  name: "Display State: Inactive (Grayscale)",
  args: {
    layout: "staircase",
    barHeight: 36,
    displayState: "inactive",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Inactive state shows the component with grayscale colors and a light opacity border. Hover to see it transition back to full color. Use when the component should be visible but not draw attention.",
      },
    },
  },
}

export const AllStatesComparison: Story = {
  name: "All Display States Comparison",
  render: () => (
    <MockProgressProvider level={15} percentage={72}>
      <MockWalletProvider coins={5000}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Active State (Full Color)
            </Typography>
            <ProfileStatusDisplay
              layout="staircase"
              barHeight={32}
              displayState="active"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Interactive State (Grayscale → Full Color on hover)
            </Typography>
            <ProfileStatusDisplay
              layout="staircase"
              barHeight={32}
              displayState="interactive"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Inactive State (Grayscale + Light Border, subtle hover)
            </Typography>
            <ProfileStatusDisplay
              layout="staircase"
              barHeight={32}
              displayState="inactive"
            />
          </Box>
        </Box>
      </MockWalletProvider>
    </MockProgressProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of all display states. Hover over each to see the interaction behavior.",
      },
    },
  },
}

// ============================================
// Scaling Stories
// ============================================

export const ScalingComparison: Story = {
  name: "Font/Icon Scaling at Different Heights",
  render: () => (
    <MockProgressProvider level={25} percentage={65}>
      <MockWalletProvider coins={12500}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 2,
            bgcolor: "background.paper",
            width: 350,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              20px height (compact)
            </Typography>
            <ProfileStatusDisplay layout="staircase" barHeight={20} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              28px height (default)
            </Typography>
            <ProfileStatusDisplay layout="staircase" barHeight={28} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              36px height
            </Typography>
            <ProfileStatusDisplay layout="staircase" barHeight={36} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              40px height (reference)
            </Typography>
            <ProfileStatusDisplay layout="staircase" barHeight={40} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              52px height (large)
            </Typography>
            <ProfileStatusDisplay layout="staircase" barHeight={52} />
          </Box>
        </Box>
      </MockWalletProvider>
    </MockProgressProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how icons and fonts scale proportionally with bar height. The reference height is 40px - sizes above and below scale accordingly.",
      },
    },
  },
}

// ============================================
// Expandable Animation Stories
// ============================================

export const ExpandableHover: Story = {
  name: "Expandable - Hover Trigger",
  args: {
    layout: "staircase",
    barHeight: 36,
    expandable: true,
    expansionTrigger: "hover",
    expansionDirection: "down",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Only the profile/level bar is visible initially. Hover to expand and reveal the currency and progress bars.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={12} percentage={45}>
        <MockWalletProvider coins={2500}>
          <Box
            sx={{
              width: 300,
              bgcolor: "background.paper",
              p: 4,
              minHeight: 200,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Hover over the profile bar to expand
            </Typography>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const ExpandableClick: Story = {
  name: "Expandable - Click Trigger (with Ripple)",
  args: {
    layout: "staircase",
    barHeight: 36,
    expandable: true,
    expansionTrigger: "click",
    expansionDirection: "down",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click on the profile bar to toggle expansion. Features ripple effect and shadow feedback on click. Better for touch devices and when you want more explicit user intent.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={8} percentage={78}>
        <MockWalletProvider coins={1800}>
          <Box
            sx={{
              width: 300,
              bgcolor: "background.paper",
              p: 4,
              minHeight: 200,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Click the profile bar - notice ripple effect!
            </Typography>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const ExpandableDirectionUp: Story = {
  name: "Expandable - Expand Upward",
  args: {
    layout: "staircase",
    barHeight: 36,
    expandable: true,
    expansionTrigger: "hover",
    expansionDirection: "up",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Expands upward from the profile bar. Useful when the component is positioned at the bottom of a container.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={20} percentage={33}>
        <MockWalletProvider coins={8000}>
          <Box
            sx={{
              width: 300,
              bgcolor: "background.paper",
              p: 4,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
              Hover to expand upward
            </Typography>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const ExpandableHorizontalRight: Story = {
  name: "Expandable Horizontal - Expand Right",
  args: {
    layout: "horizontal",
    barHeight: 32,
    expandable: true,
    expansionTrigger: "hover",
    expansionDirection: "right",
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal layout that expands to the right on hover.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={15} percentage={55}>
        <MockWalletProvider coins={4200}>
          <Box sx={{ width: 500, bgcolor: "background.paper", p: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Hover to expand right
            </Typography>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const ExpandableHorizontalLeft: Story = {
  name: "Expandable Horizontal - Expand Left",
  args: {
    layout: "horizontal",
    barHeight: 32,
    expandable: true,
    expansionTrigger: "hover",
    expansionDirection: "left",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal layout that expands to the left on hover. Useful when the component is positioned on the right side of a container.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={18} percentage={82}>
        <MockWalletProvider coins={15000}>
          <Box
            sx={{
              width: 500,
              bgcolor: "background.paper",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
              Hover to expand left
            </Typography>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const ExpandableDefaultExpanded: Story = {
  name: "Expandable - Default Expanded",
  args: {
    layout: "staircase",
    barHeight: 36,
    expandable: true,
    expansionTrigger: "click",
    expansionDirection: "down",
    defaultExpanded: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Starts in the expanded state. Click to collapse.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={30} percentage={90}>
        <MockWalletProvider coins={50000}>
          <Box
            sx={{
              width: 300,
              bgcolor: "background.paper",
              p: 4,
              minHeight: 200,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Click to collapse
            </Typography>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

// ============================================
// Combined Features
// ============================================

export const InteractiveExpandable: Story = {
  name: "Interactive + Expandable",
  args: {
    layout: "staircase",
    barHeight: 36,
    displayState: "interactive",
    expandable: true,
    expansionTrigger: "hover",
    expansionDirection: "down",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combines interactive display state with expandable behavior. The component is dimmed when not interacted with and expands on hover.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MockProgressProvider level={22} percentage={67}>
        <MockWalletProvider coins={9500}>
          <Box
            sx={{
              width: 300,
              bgcolor: "background.paper",
              p: 4,
              minHeight: 200,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Interactive + Expandable: Hover to see both effects
            </Typography>
            <Story />
          </Box>
        </MockWalletProvider>
      </MockProgressProvider>
    ),
  ],
}

export const AllExpansionDirections: Story = {
  name: "All Expansion Directions",
  render: () => (
    <MockProgressProvider level={10} percentage={50}>
      <MockWalletProvider coins={3000}>
        <Box sx={{ p: 3, maxWidth: 900 }}>
          {/* Layer Reference Legend */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 4,
              bgcolor: "grey.50",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Bar Components & Animation Layers
            </Typography>

            {/* Bar Components */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              <Chip
                label="Bar 1: ProfileIconStatusBarSimple"
                size="small"
                color="primary"
                sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
              />
              <Chip
                label="Bar 2: CurrencyStatusBarSimple"
                size="small"
                color="secondary"
                sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
              />
              <Chip
                label="Bar 3: ProgressStatusBar"
                size="small"
                color="success"
                sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* ExpandingBar Layers */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Each bar uses <code>ExpandingBar</code> with these visual layers:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Chip
                label="Outer Stroke"
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
              <Chip
                label="Middle Fill (fades via middleFillOpacity)"
                size="small"
                variant="outlined"
                color="warning"
                sx={{ fontSize: "0.7rem" }}
              />
              <Chip
                label="Inner Content"
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2 }}
            >
              Animation: Outer stroke + inner content appear immediately, middle
              fill fades in via GSAP (controlled by{" "}
              <code>middleFillOpacity</code> prop)
            </Typography>
          </Paper>

          {/* Expansion Direction Grid */}
          <Grid container spacing={3}>
            {/* Down */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Chip label="↓" size="small" color="info" />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Expand Down
                  </Typography>
                  <Chip
                    label="staircase"
                    size="small"
                    variant="outlined"
                    sx={{ ml: "auto" }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <ProfileStatusDisplay
                    layout="staircase"
                    barHeight={28}
                    expandable
                    expansionTrigger="hover"
                    expansionDirection="down"
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Up */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Chip label="↑" size="small" color="info" />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Expand Up
                  </Typography>
                  <Chip
                    label="staircase"
                    size="small"
                    variant="outlined"
                    sx={{ ml: "auto" }}
                  />
                </Box>
                <Box sx={{ mt: "auto" }}>
                  <ProfileStatusDisplay
                    layout="staircase"
                    barHeight={28}
                    expandable
                    expansionTrigger="hover"
                    expansionDirection="up"
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Right */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Chip label="→" size="small" color="info" />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Expand Right
                  </Typography>
                  <Chip
                    label="horizontal"
                    size="small"
                    variant="outlined"
                    sx={{ ml: "auto" }}
                  />
                </Box>
                <ProfileStatusDisplay
                  layout="horizontal"
                  barHeight={28}
                  expandable
                  expansionTrigger="hover"
                  expansionDirection="right"
                />
              </Paper>
            </Grid>

            {/* Left */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    width: "100%",
                  }}
                >
                  <Chip label="←" size="small" color="info" />
                  <Typography variant="subtitle2" fontWeight={600}>
                    Expand Left
                  </Typography>
                  <Chip
                    label="horizontal"
                    size="small"
                    variant="outlined"
                    sx={{ ml: "auto" }}
                  />
                </Box>
                <ProfileStatusDisplay
                  layout="horizontal"
                  barHeight={28}
                  expandable
                  expansionTrigger="hover"
                  expansionDirection="left"
                />
              </Paper>
            </Grid>
          </Grid>

          {/* GSAP Config Reference */}
          <Paper
            elevation={0}
            sx={{
              mt: 4,
              p: 2,
              bgcolor: "grey.900",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontFamily: "monospace",
                color: "grey.300",
                whiteSpace: "pre-wrap",
              }}
            >
              {`GSAP_CONFIG = {
  expandDuration: 0.18,     // 180ms for inner fill fade-in
  collapseDuration: 0.12,   // 120ms for inner fill fade-out  
  staggerDelay: 0.12,       // 120ms delay before bar 3's fill fades in
  easeExpand: 'power2.out',
  easeCollapse: 'power2.in',
}`}
            </Typography>
          </Paper>
        </Box>
      </MockWalletProvider>
    </MockProgressProvider>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Showcases all four expansion directions with GSAP-powered animations. Bar frames appear immediately on hover while the inner fill fades in with staggered timing (Bar 2 first, Bar 3 after 120ms).",
      },
    },
  },
}
