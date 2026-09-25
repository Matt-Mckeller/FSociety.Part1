import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import {
  InventoryView,
  OpenLootView,
  InventorySidePanel,
  ClaimEventRewardsView,
  ClaimEventRewardDisplayModal,
  InventoryRewardDetailView,
} from "expanse.ui/game"
import {
  MockGameProvider,
  mockClaimEventRewardDisplayDefault,
} from "../../../mocks/game-context"

// =============================================================================
// Mock Data for Inventory Components
// =============================================================================

// Create mock loot boxes
const mockLootBoxes = [
  {
    id: "lootbox-1",
    status: "new" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "lootbox-2",
    status: "new" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "lootbox-3",
    status: "new" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Create mock rewards (using any to avoid complex classification typing)
const mockRewards = [
  {
    id: "reward-1",
    classification: { category: "coins", variant: "xcoins" },
    dictionaryIndex: "coins.xcoins",
    uniqueRewardId: "unique-1",
    quantity: 100,
    isTradeable: false,
    category: "coins",
    variant: "xcoins",
    name: "XCoins",
    description: "Standard game currency",
  },
  {
    id: "reward-2",
    classification: { category: "gems", variant: "xgems" },
    dictionaryIndex: "gems.xgems",
    uniqueRewardId: "unique-2",
    quantity: 10,
    isTradeable: false,
    category: "gems",
    variant: "xgems",
    name: "XGems",
    description: "Premium game currency",
  },
  {
    id: "reward-3",
    classification: { category: "gameEquipment", variant: "sword" },
    dictionaryIndex: "gameEquipment_Sword1",
    uniqueRewardId: "unique-3",
    quantity: 1,
    isTradeable: true,
    category: "gameEquipment",
    variant: "sword",
    name: "Hero's Blade",
    description: "A legendary sword with mystical powers",
    rarity: "rare",
  },
  {
    id: "reward-4",
    classification: { category: "teacher", variant: "recognition" },
    dictionaryIndex: "teacher.recognition",
    uniqueRewardId: "unique-4",
    quantity: 1,
    isTradeable: false,
    category: "teacher",
    variant: "recognition",
    name: "Teacher Recognition Award",
    description: "Special recognition from your teacher",
    classStoreId: "class-1",
  },
]

// Mock inventory items - using 'sword' variant which exists in RewardDictionaryIndividualEntries
const mockInventoryItems = [
  {
    id: "inv-1",
    classification: { category: "gameEquipment", variant: "sword" },
    dictionaryIndex: "gameEquipment_Sword1",
    uniqueRewardId: "inv-unique-1",
    quantity: 1,
    isTradeable: true,
    category: "gameEquipment",
    variant: "sword",
    name: "Hero's Blade",
    description: "A sharp sword for combat",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Mock redeeemed rewards for claim view
const mockRedeemedRewards = {
  id: "redeemed-1",
  lootBoxes: mockLootBoxes.slice(0, 1),
  experienceIncrease: 250,
  walletIncrease: {
    coins: { xcoins: 50 },
    gems: { xgems: 5 },
    essences: {},
    tickets: {},
  },
}

/**
 * Complex inventory-related view components that require game context
 */
const meta: Meta = {
  title: "Game/Views/InventoryViews",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Inventory and loot-related views for managing player items, rewards, and loot boxes.",
      },
    },
  },
}

export default meta

// =============================================================================
// InventoryView Stories
// =============================================================================

/**
 * Main inventory view showing owned rewards, loot boxes, and classroom rewards
 */
export const InventoryViewDefault: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        inventory: mockInventoryItems as any,
        ownedRewards: mockRewards,
        unopenedLootBoxes: mockLootBoxes,
      }}
    >
      <Box sx={{ height: "600px" }}>
        <InventoryView />
      </Box>
    </MockGameProvider>
  ),
  name: "InventoryView - Default",
}

export const InventoryViewEmpty: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        inventory: [],
        ownedRewards: [],
        unopenedLootBoxes: [],
      }}
    >
      <Box sx={{ height: "400px" }}>
        <InventoryView />
      </Box>
    </MockGameProvider>
  ),
  name: "InventoryView - Empty",
}

export const InventoryViewWithManyLootBoxes: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        inventory: mockInventoryItems as any,
        ownedRewards: mockRewards,
        unopenedLootBoxes: [
          ...mockLootBoxes,
          { id: "lb-4", status: "new" as const, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "lb-5", status: "new" as const, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
      }}
    >
      <Box sx={{ height: "600px" }}>
        <InventoryView />
      </Box>
    </MockGameProvider>
  ),
  name: "InventoryView - Many Loot Boxes",
}

// =============================================================================
// OpenLootView Stories
// =============================================================================

/**
 * View for opening loot boxes and revealing rewards
 */
export const OpenLootViewDefault: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        unopenedLootBoxes: mockLootBoxes,
        openedLootBoxes: [],
        lootBoxRewardsBeingAccepted: [],
      }}
    >
      <Box sx={{ p: 4 }}>
        <OpenLootView />
      </Box>
    </MockGameProvider>
  ),
  name: "OpenLootView - Default",
}

export const OpenLootViewNoBoxes: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        unopenedLootBoxes: [],
        openedLootBoxes: [],
        lootBoxRewardsBeingAccepted: [],
      }}
    >
      <Box sx={{ p: 4 }}>
        <OpenLootView />
      </Box>
    </MockGameProvider>
  ),
  name: "OpenLootView - No Boxes",
}

export const OpenLootViewSingleBox: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        unopenedLootBoxes: [mockLootBoxes[0]],
        openedLootBoxes: [],
        lootBoxRewardsBeingAccepted: [],
      }}
    >
      <Box sx={{ p: 4 }}>
        <OpenLootView />
      </Box>
    </MockGameProvider>
  ),
  name: "OpenLootView - Single Box",
}

// =============================================================================
// InventorySidePanel Stories
// =============================================================================

/**
 * Side panel showing inventory summary
 */
export const InventorySidePanelDefault: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        inventory: mockInventoryItems as any,
        unopenedLootBoxes: mockLootBoxes,
      }}
    >
      <Box sx={{ width: 300, height: 500, border: "1px solid #ddd" }}>
        <InventorySidePanel />
      </Box>
    </MockGameProvider>
  ),
  name: "InventorySidePanel - Default",
}

export const InventorySidePanelEmpty: StoryObj = {
  render: () => (
    <MockGameProvider
      mockInventory={{
        inventory: [],
        unopenedLootBoxes: [],
      }}
    >
      <Box sx={{ width: 300, height: 400, border: "1px solid #ddd" }}>
        <InventorySidePanel />
      </Box>
    </MockGameProvider>
  ),
  name: "InventorySidePanel - Empty",
}

// =============================================================================
// ClaimEventRewardsView Stories
// =============================================================================

/**
 * View for claiming event rewards (inline, non-modal version)
 */
export const ClaimEventRewardsViewDefault: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Box sx={{ p: 4, maxWidth: 500 }}>
        <ClaimEventRewardsView displayActions={true} displayTitle={true} />
      </Box>
    </MockGameProvider>
  ),
  name: "ClaimEventRewardsView - Default",
}

export const ClaimEventRewardsViewNoTitle: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Box sx={{ p: 4, maxWidth: 500 }}>
        <ClaimEventRewardsView displayActions={true} displayTitle={false} />
      </Box>
    </MockGameProvider>
  ),
  name: "ClaimEventRewardsView - No Title",
}

export const ClaimEventRewardsViewNoActions: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Box sx={{ p: 4, maxWidth: 500 }}>
        <ClaimEventRewardsView displayActions={false} displayTitle={true} />
      </Box>
    </MockGameProvider>
  ),
  name: "ClaimEventRewardsView - No Actions",
}

// =============================================================================
// ClaimEventRewardDisplayModal Stories
// =============================================================================

/**
 * Modal dialog for claiming rewards
 * Note: Modal visibility is controlled by context, so we set isModalOpen to true
 */
export const ClaimEventRewardDisplayModalOpen: StoryObj = {
  render: () => {
    // Create custom mock with modal open
    const customClaimEventContext = {
      ...mockClaimEventRewardDisplayDefault,
      isModalOpen: true,
      redeemedEventRewards: mockRedeemedRewards,
    }

    return (
      <MockGameProvider>
        <Box sx={{ minHeight: 400 }}>
          {/* The modal is controlled by context - we show a placeholder here */}
          <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
            <p>
              The ClaimEventRewardDisplayModal is rendered via context.
              <br />
              In the actual app, it appears when rewards are claimed.
            </p>
          </Box>
        </Box>
      </MockGameProvider>
    )
  },
  name: "ClaimEventRewardDisplayModal - Info",
}

// =============================================================================
// InventoryRewardDetailView Stories
// =============================================================================

/**
 * Detailed view of a single reward with redeem action
 */
export const InventoryRewardDetailViewDefault: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Box sx={{ p: 4, maxWidth: 400 }}>
        <InventoryRewardDetailView reward={mockRewards[2] as any} />
      </Box>
    </MockGameProvider>
  ),
  name: "InventoryRewardDetailView - Game Equipment",
}

export const InventoryRewardDetailViewTeacher: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Box sx={{ p: 4, maxWidth: 400 }}>
        <InventoryRewardDetailView reward={mockRewards[3] as any} />
      </Box>
    </MockGameProvider>
  ),
  name: "InventoryRewardDetailView - Teacher Reward",
}

export const InventoryRewardDetailViewCoins: StoryObj = {
  render: () => (
    <MockGameProvider>
      <Box sx={{ p: 4, maxWidth: 400 }}>
        <InventoryRewardDetailView reward={mockRewards[0] as any} />
      </Box>
    </MockGameProvider>
  ),
  name: "InventoryRewardDetailView - Coins",
}
