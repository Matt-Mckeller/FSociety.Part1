"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Stack } from "@mui/material"
import { 
  ProgressContext, 
  WalletContext 
} from "expanse.ui/game"

// Import the simple status bar components
// Note: These components require context providers to display data

/**
 * # Simple Status Bar Components
 * 
 * These components display individual status bars for currency, profile icon, and progress.
 * They use the ExpandingBar component and pull data from context providers.
 */

// Mock providers
const MockProgressProvider = ({ children, level = 5, percentage = 65 }: { children: React.ReactNode, level?: number, percentage?: number }) => (
  <ProgressContext.Provider value={{ 
    progressLevel: level, 
    progressPercentage: percentage,
    addManualExperience: () => {},
  }}>
    {children}
  </ProgressContext.Provider>
)

const MockWalletProvider = ({ children, coins = 1250 }: { children: React.ReactNode, coins?: number }) => (
  <WalletContext.Provider value={{ 
    coins: { xcoins: { coinId: '1', quantity: coins, name: 'XCoins', coinIconText: '🪙', schoolId: '', classId: '' } },
    gems: {},
    tickets: {},
    essences: {},
    refetchWallet: async () => {},
    addManualCoins: () => {},
    addManualGems: () => {},
    addManualTickets: () => {},
    addManualEssences: () => {},
  }}>
    {children}
  </WalletContext.Provider>
)

// Documentation component
const SimpleStatusBarsDocumentation = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h5" gutterBottom>
        Simple Status Bar Components
      </Typography>
      
      <Typography variant="body1" paragraph>
        These components provide compact status displays using the ExpandingBar component.
        They automatically pull data from their respective context providers.
      </Typography>

      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            CurrencyStatusBarSimple
          </Typography>
          <Typography variant="body2" paragraph>
            Displays the user's coin balance in a compact expanding bar format.
            Uses WalletContext to get the current coin count.
          </Typography>
          <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12 }}>
{`import { CurrencyStatusBarSimple } from "expanse.ui/game"

// Requires WalletContext
<CurrencyStatusBarSimple />`}
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ProfileIconStatusBarSimple
          </Typography>
          <Typography variant="body2" paragraph>
            Displays the user's level with a profile icon in a compact format.
            Uses ProgressContext to get the current level.
          </Typography>
          <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12 }}>
{`import { ProfileIconStatusBarSimple } from "expanse.ui/game"

// Requires ProgressContext
<ProfileIconStatusBarSimple />`}
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ProgressStatusBar
          </Typography>
          <Typography variant="body2" paragraph>
            Displays the user's progress percentage toward the next reward/level.
            Uses ProgressContext to get the current progress percentage.
          </Typography>
          <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12 }}>
{`import { ProgressStatusBar } from "expanse.ui/game"

// Requires ProgressContext
<ProgressStatusBar />`}
          </Box>
        </Paper>
      </Stack>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Context Requirements
        </Typography>
        <Typography variant="body2">
          These components require their respective context providers to be available
          in the component tree. They are typically used together with ProfileStatusDisplay
          which combines all three status bars.
        </Typography>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof SimpleStatusBarsDocumentation> = {
  title: "Game/Components/SimpleStatusBars",
  component: SimpleStatusBarsDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Simple status bar components for currency, level, and progress display.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SimpleStatusBarsDocumentation>

export const Documentation: Story = {}
