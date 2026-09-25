import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper } from "@mui/material"
import { RewardImage } from "../../../../../../packages/ui/game/components/reward/RewardImage"
import { InventoryItemImage } from "../../../../../../packages/ui/game/components/reward/InventoryItemImage"
import { MockGameProvider } from "../../../mocks/game-context"

// =============================================================================
// Mock Data for Image Components
// =============================================================================

// Mock rewards for RewardImage component
const mockCoinReward = {
  id: "reward-coins",
  classification: { category: "coins", variant: "xcoins" },
  dictionaryIndex: "coins.xcoins",
  uniqueRewardId: "coin-unique",
  quantity: 100,
  isTradeable: false,
  category: "coins",
  variant: "xcoins",
}

const mockGemReward = {
  id: "reward-gems",
  classification: { category: "gems", variant: "xgems" },
  dictionaryIndex: "gems.xgems",
  uniqueRewardId: "gem-unique",
  quantity: 25,
  isTradeable: false,
  category: "gems",
  variant: "xgems",
}

const mockExperienceReward = {
  id: "reward-exp",
  classification: { category: "experience", variant: "standard" },
  dictionaryIndex: "experience.standard",
  uniqueRewardId: "exp-unique",
  quantity: 500,
  isTradeable: false,
  category: "experience",
  variant: "standard",
}

const mockTicketReward = {
  id: "reward-ticket",
  classification: { category: "lotteryTickets", variant: "weeklyLottery" },
  dictionaryIndex: "lotteryTickets.weeklyLottery",
  uniqueRewardId: "ticket-unique",
  quantity: 3,
  isTradeable: false,
  category: "lotteryTickets",
  variant: "weeklyLottery",
}

const mockEssenceReward = {
  id: "reward-essence",
  classification: { category: "gameEssence", variant: "fire" },
  dictionaryIndex: "gameEssence.fire",
  uniqueRewardId: "essence-unique",
  quantity: 10,
  isTradeable: false,
  category: "gameEssence",
  variant: "fire",
}

// Mock inventory items for InventoryItemImage
const mockEquipmentItem = {
  id: "inv-equipment",
  classification: { category: "gameEquipment", variant: "sword" },
  dictionaryIndex: "gameEquipment.sword",
  uniqueRewardId: "equip-unique",
  quantity: 1,
  isTradeable: true,
  category: "gameEquipment",
  variant: "sword",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const mockConsumableItem = {
  id: "inv-consumable",
  classification: { category: "gameConsumables", variant: "potion" },
  dictionaryIndex: "gameConsumables.potion",
  uniqueRewardId: "consume-unique",
  quantity: 5,
  isTradeable: true,
  category: "gameConsumables",
  variant: "potion",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

/**
 * Image components for rendering reward and inventory item visuals
 */
const meta: Meta = {
  title: "Game/Components/ImageComponents",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Image components for displaying reward and inventory item icons with proper theming.",
      },
    },
  },
}

export default meta

// =============================================================================
// RewardImage Stories
// =============================================================================

/**
 * Displays an image/icon for a reward based on its classification
 */
export const RewardImageCoins: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <RewardImage reward={mockCoinReward as any} width={100} height={100} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "RewardImage - Coins",
}

export const RewardImageGems: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <RewardImage reward={mockGemReward as any} width={100} height={100} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "RewardImage - Gems",
}

export const RewardImageExperience: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <RewardImage reward={mockExperienceReward as any} width={100} height={100} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "RewardImage - Experience",
}

export const RewardImageTickets: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <RewardImage reward={mockTicketReward as any} width={100} height={100} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "RewardImage - Lottery Tickets",
}

export const RewardImageEssence: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <RewardImage reward={mockEssenceReward as any} width={100} height={100} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "RewardImage - Game Essence",
}

export const RewardImageSmall: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 50, height: 50, position: "relative" }}>
          <RewardImage reward={mockCoinReward as any} width={50} height={50} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "RewardImage - Small Size",
}

export const RewardImageLarge: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 200, height: 200, position: "relative" }}>
          <RewardImage reward={mockGemReward as any} width={200} height={200} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "RewardImage - Large Size",
}

// =============================================================================
// InventoryItemImage Stories
// =============================================================================

/**
 * Displays an image/icon for an inventory item based on its classification
 */
export const InventoryItemImageEquipment: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <InventoryItemImage item={mockEquipmentItem as any} width={100} height={100} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "InventoryItemImage - Equipment",
}

export const InventoryItemImageConsumable: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <InventoryItemImage item={mockConsumableItem as any} width={100} height={100} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "InventoryItemImage - Consumable",
}

export const InventoryItemImageSmall: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 50, height: 50, position: "relative" }}>
          <InventoryItemImage item={mockEquipmentItem as any} width={50} height={50} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "InventoryItemImage - Small Size",
}

export const InventoryItemImageLarge: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ width: 200, height: 200, position: "relative" }}>
          <InventoryItemImage item={mockEquipmentItem as any} width={200} height={200} />
        </Box>
      </Paper>
    </MockGameProvider>
  ),
  name: "InventoryItemImage - Large Size",
}

// =============================================================================
// Comparison Story
// =============================================================================

/**
 * Shows all reward types side by side for comparison
 */
export const AllRewardTypes: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Box sx={{ width: 80, height: 80, position: "relative", mb: 1 }}>
            <RewardImage reward={mockCoinReward as any} width={80} height={80} />
          </Box>
          <span>Coins</span>
        </Paper>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Box sx={{ width: 80, height: 80, position: "relative", mb: 1 }}>
            <RewardImage reward={mockGemReward as any} width={80} height={80} />
          </Box>
          <span>Gems</span>
        </Paper>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Box sx={{ width: 80, height: 80, position: "relative", mb: 1 }}>
            <RewardImage reward={mockExperienceReward as any} width={80} height={80} />
          </Box>
          <span>Experience</span>
        </Paper>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Box sx={{ width: 80, height: 80, position: "relative", mb: 1 }}>
            <RewardImage reward={mockTicketReward as any} width={80} height={80} />
          </Box>
          <span>Tickets</span>
        </Paper>
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Box sx={{ width: 80, height: 80, position: "relative", mb: 1 }}>
            <RewardImage reward={mockEssenceReward as any} width={80} height={80} />
          </Box>
          <span>Essence</span>
        </Paper>
      </Box>
    </MockGameProvider>
  ),
  name: "All Reward Types - Comparison",
}
