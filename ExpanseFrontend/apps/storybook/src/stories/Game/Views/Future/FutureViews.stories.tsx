"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid, Chip, Stack } from "@mui/material"
import ConstructionIcon from "@mui/icons-material/Construction"

/**
 * # Future Game Views
 * 
 * These are placeholder views for upcoming game features.
 * They currently contain only empty template components.
 */

const FutureViewsDocumentation = () => {
  const futureViews = [
    { 
      name: "BadgeDetailView", 
      description: "Detailed view of a specific badge with stats and requirements",
      category: "Details"
    },
    { 
      name: "CurrencyDisplay", 
      description: "Comprehensive currency display with multiple currency types",
      category: "Stats"
    },
    { 
      name: "EquipmentDisplay", 
      description: "Display of equipped items and gear slots",
      category: "Inventory"
    },
    { 
      name: "ExperienceDisplay", 
      description: "Detailed XP breakdown and progression display",
      category: "Stats"
    },
    { 
      name: "ExperienceHistoryDisplay", 
      description: "Timeline of XP gains with source tracking",
      category: "History"
    },
    { 
      name: "GearDetailView", 
      description: "Detailed view of a specific gear item with stats",
      category: "Details"
    },
    { 
      name: "InventoryDisplay", 
      description: "Full inventory management display with categories",
      category: "Inventory"
    },
    { 
      name: "LootBoxDisplay", 
      description: "Display of available and opened loot boxes",
      category: "Rewards"
    },
    { 
      name: "NFTDetailView", 
      description: "Detailed view for NFT collectibles with metadata",
      category: "Details"
    },
    { 
      name: "RewardEventHistoryDisplay", 
      description: "History of reward events and claims",
      category: "History"
    },
  ]

  const categories = ["Details", "Stats", "Inventory", "History", "Rewards"]
  const categoryColors: Record<string, "primary" | "secondary" | "success" | "warning" | "info"> = {
    "Details": "primary",
    "Stats": "secondary", 
    "Inventory": "success",
    "History": "info",
    "Rewards": "warning"
  }

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <ConstructionIcon color="warning" sx={{ fontSize: 40 }} />
        <Typography variant="h4">
          Future Game Views
        </Typography>
      </Box>
      
      <Typography variant="body1" paragraph>
        The following views are planned for future implementation. They currently exist
        as template components in <code>packages/ui/game/views/future/</code>.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {categories.map((cat) => (
          <Chip 
            key={cat}
            label={cat} 
            color={categoryColors[cat]}
            variant="outlined"
            size="small"
          />
        ))}
      </Stack>

      <Grid container spacing={2}>
        {futureViews.map((view) => (
          <Grid item xs={12} sm={6} key={view.name}>
            <Paper sx={{ p: 2, height: "100%", opacity: 0.8 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {view.name}
                </Typography>
                <Chip 
                  label={view.category} 
                  size="small" 
                  color={categoryColors[view.category]}
                  variant="outlined"
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {view.description}
              </Typography>
              <Chip 
                label="Not Implemented" 
                size="small" 
                sx={{ mt: 2 }}
                color="warning"
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Implementation Roadmap
        </Typography>
        <Typography variant="body2" paragraph>
          These views will provide comprehensive game data visualization including:
        </Typography>
        <ul>
          <li><strong>Detail Views:</strong> In-depth item, badge, and NFT displays</li>
          <li><strong>Stats Views:</strong> Player progression and currency tracking</li>
          <li><strong>Inventory Views:</strong> Item management and equipment systems</li>
          <li><strong>History Views:</strong> Activity logs and reward tracking</li>
        </ul>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof FutureViewsDocumentation> = {
  title: "Game/Views/Future/Overview",
  component: FutureViewsDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Placeholder views for upcoming game features.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FutureViewsDocumentation>

export const Overview: Story = {}
