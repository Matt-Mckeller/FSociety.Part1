"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid, Chip, Stack } from "@mui/material"
import ConstructionIcon from "@mui/icons-material/Construction"

/**
 * # Future Game Components
 * 
 * These are placeholder components for upcoming game features.
 * They are currently empty shells awaiting implementation.
 */

const FutureComponentsDocumentation = () => {
  const futureComponents = [
    { 
      name: "Achievement", 
      description: "Component for displaying player achievements and milestones",
      category: "Rewards"
    },
    { 
      name: "Badge", 
      description: "Visual badge component for earned accomplishments",
      category: "Rewards"
    },
    { 
      name: "Equipment", 
      description: "Component for displaying equippable gear items",
      category: "Inventory"
    },
    { 
      name: "InventoryGrid", 
      description: "Grid layout for displaying inventory items",
      category: "Inventory"
    },
    { 
      name: "InventorySlot", 
      description: "Single slot component for inventory item display",
      category: "Inventory"
    },
    { 
      name: "LootBox", 
      description: "Animated loot box component for reward reveals",
      category: "Rewards"
    },
    { 
      name: "TrophyReward", 
      description: "Trophy display component for special achievements",
      category: "Rewards"
    },
  ]

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <ConstructionIcon color="warning" sx={{ fontSize: 40 }} />
        <Typography variant="h4">
          Future Game Components
        </Typography>
      </Box>
      
      <Typography variant="body1" paragraph>
        The following components are planned for future implementation. They currently exist
        as empty placeholder files in <code>packages/ui/game/components/future/</code>.
      </Typography>

      <Grid container spacing={2}>
        {futureComponents.map((component) => (
          <Grid item xs={12} sm={6} key={component.name}>
            <Paper sx={{ p: 2, height: "100%", opacity: 0.8 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h6" gutterBottom>
                  {component.name}
                </Typography>
                <Chip 
                  label={component.category} 
                  size="small" 
                  color={component.category === "Rewards" ? "secondary" : "primary"}
                  variant="outlined"
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {component.description}
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
          Implementation Notes
        </Typography>
        <Typography variant="body2">
          These components will be part of the expanded gamification system, including:
        </Typography>
        <ul>
          <li>Achievement tracking and display</li>
          <li>Badge collection and showcase</li>
          <li>Inventory management with equippable items</li>
          <li>Loot box opening animations</li>
          <li>Trophy and special reward displays</li>
        </ul>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof FutureComponentsDocumentation> = {
  title: "Game/Components/Future/Overview",
  component: FutureComponentsDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Placeholder components for upcoming game features.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FutureComponentsDocumentation>

export const Overview: Story = {}
