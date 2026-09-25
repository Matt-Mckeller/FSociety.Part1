"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid, Chip, Stack, Divider } from "@mui/material"

/**
 * # Game Views - Additional Components
 * 
 * These views provide various game-related displays including reward claiming,
 * profile displays, and ticket components.
 */

const GameViewsDocumentation = () => {
  const gameViews = [
    { 
      name: "ClaimEventRewardDisplayModal", 
      description: "Modal dialog for displaying claimed event rewards with close functionality",
      status: "Implemented",
      requirements: ["ClaimEventRewardDisplayContext", "AnalyticsContext", "GraphQL"]
    },
    { 
      name: "ClaimEventRewardsView", 
      description: "View showing claimable rewards with character animations and progress bar",
      status: "Implemented",
      requirements: ["ClaimEventRewardDisplayContext", "AnalyticsContext"]
    },
    { 
      name: "OpenLootView", 
      description: "Interactive loot box opening experience with chest animation and reward reveals",
      status: "Implemented",
      requirements: ["InventoryContext"]
    },
    { 
      name: "ProfileDisplay", 
      description: "User profile display with level, currency, experience and optional icons",
      status: "Implemented",
      requirements: ["ProgressContext", "WalletContext"]
    },
    { 
      name: "TicketEventSampleDisplay", 
      description: "Sample display of the TicketCard component",
      status: "Implemented",
      requirements: []
    },
    { 
      name: "TicketWithCharactersOnTop", 
      description: "Ticket card with character illustrations positioned above",
      status: "Implemented",
      requirements: []
    },
  ]

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h4" gutterBottom>
        Additional Game Views
      </Typography>
      
      <Typography variant="body1" paragraph>
        These view components provide comprehensive game-related displays for rewards,
        profiles, and ticket events. They typically require various context providers.
      </Typography>

      <Grid container spacing={2}>
        {gameViews.map((view) => (
          <Grid item xs={12} key={view.name}>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h6">
                  {view.name}
                </Typography>
                <Chip 
                  label={view.status} 
                  size="small" 
                  color="success"
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                {view.description}
              </Typography>
              {view.requirements.length > 0 && (
                <>
                  <Typography variant="caption" color="text.secondary">
                    Requirements:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                    {view.requirements.map((req) => (
                      <Chip key={req} label={req} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Usage Examples
      </Typography>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          TicketWithCharactersOnTop
        </Typography>
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`import { TicketWithCharactersOnTop } from "expanse.ui/game"

// Simple usage - displays ticket card with characters
<TicketWithCharactersOnTop />`}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          ProfileDisplay
        </Typography>
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`import { ProfileDisplay } from "expanse.ui/game"

<ProfileDisplay
  enableLabels={true}
  barHeight={50}
  displayIcons={true}
/>`}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: "warning.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Context Requirements
        </Typography>
        <Typography variant="body2">
          Most game views require context providers to function. Ensure the following
          are available in your component tree:
        </Typography>
        <ul>
          <li><strong>ProgressContext</strong> - For level and XP display</li>
          <li><strong>WalletContext</strong> - For currency display</li>
          <li><strong>InventoryContext</strong> - For loot box operations</li>
          <li><strong>ClaimEventRewardDisplayContext</strong> - For reward claiming flows</li>
          <li><strong>AnalyticsContext</strong> - For event tracking</li>
        </ul>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof GameViewsDocumentation> = {
  title: "Game/Views/Additional/Overview",
  component: GameViewsDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Additional game view components for rewards, profiles, and tickets.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof GameViewsDocumentation>

export const Overview: Story = {}
