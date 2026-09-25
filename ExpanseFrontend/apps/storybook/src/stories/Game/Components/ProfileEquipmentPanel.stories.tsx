import type { Meta, StoryObj } from "@storybook/react"
import {
  ProfileEquipmentPanel,
  EquippedItemsBar,
} from "../../../../../expanseEdu/src/modules/game/ui/ProfileEquipmentPanel.component"
import {
  EquipmentState,
  BoostBar,
} from "../../../../../expanseEdu/src/modules/game/ui/CharacterEquipmentDisplay.component"
import { InventorySlotItem } from "../../../../../expanseEdu/src/modules/game/ui/InventorySlot.component"
import {
  StaticCharacter,
  CharacterState,
} from "expanse.ui/game"
import { Box, Stack, Typography, Button } from "@mui/material"
import React from "react"

const meta: Meta<typeof ProfileEquipmentPanel> = {
  title: "Game/Components/ProfileEquipmentPanel",
  component: ProfileEquipmentPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive profile equipment panel combining character display, equipment slots, quick slots bar, and boost indicators. WoW-style layout for game profiles.",
      },
    },
  },
  argTypes: {
    slotSize: {
      control: { type: "range", min: 40, max: 72, step: 4 },
      description: "Size of each equipment slot",
    },
    showQuickSlots: {
      control: "boolean",
      description: "Show the quick slots bar at the bottom",
    },
    playerLevel: {
      control: { type: "range", min: 1, max: 100, step: 1 },
      description: "Player level displayed in header",
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileEquipmentPanel>

// Sample equipment items
const sampleEquipment: Record<string, InventorySlotItem> = {
  head: {
    id: "helm-1",
    name: "Scholar's Cap",
    description: "A cap worn by those seeking knowledge",
    rarity: "rare",
    category: "head",
  },
  chest: {
    id: "chest-1",
    name: "Leather Tunic",
    description: "Light and flexible armor",
    rarity: "uncommon",
    category: "chest",
  },
  hands: {
    id: "hands-1",
    name: "Enchanted Gloves",
    description: "Gloves that enhance dexterity",
    rarity: "rare",
    category: "hands",
  },
  mainHand: {
    id: "weapon-1",
    name: "Crystal Staff",
    description: "A staff imbued with magical energy",
    rarity: "epic",
    category: "weapon",
  },
  offHand: {
    id: "shield-1",
    name: "Arcane Tome",
    description: "A spellbook with ancient knowledge",
    rarity: "rare",
    category: "offhand",
  },
}

// Quick slot items
const quickSlotItems: (InventorySlotItem | null)[] = [
  {
    id: "potion-1",
    name: "Health Potion",
    description: "Restores 50 HP",
    rarity: "common",
    quantity: 15,
    category: "consumable",
  },
  {
    id: "potion-2",
    name: "Mana Potion",
    description: "Restores 30 MP",
    rarity: "uncommon",
    quantity: 8,
    category: "consumable",
  },
  null,
  {
    id: "scroll-1",
    name: "Teleport Scroll",
    description: "Teleports to last checkpoint",
    rarity: "rare",
    quantity: 3,
    category: "consumable",
  },
  null,
  null,
]

// Sample boost bars
const sampleBoosts: BoostBar[] = [
  { id: "xp", label: "XP Boost", value: 75, color: "#4CAF50", icon: "⚡" },
  {
    id: "speed",
    label: "Speed Boost",
    value: 30,
    color: "#2196F3",
    icon: "🏃",
  },
]

const emptyEquipment: EquipmentState = {}

const fullEquipment: EquipmentState = {
  head: sampleEquipment.head,
  chest: sampleEquipment.chest,
  hands: sampleEquipment.hands,
  mainHand: sampleEquipment.mainHand,
  offHand: sampleEquipment.offHand,
}

const partialEquipment: EquipmentState = {
  head: sampleEquipment.head,
  mainHand: sampleEquipment.mainHand,
}

// Character element for stories
const CharacterElement = ({ scale = 0.6 }: { scale?: number }) => (
  <Box sx={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
    <StaticCharacter state={CharacterState.forwardStanding} />
  </Box>
)

export const Default: Story = {
  args: {
    playerName: "Hero123",
    playerLevel: 42,
    equipment: fullEquipment,
    characterElement: <CharacterElement />,
    equippedItems: quickSlotItems,
    boostBars: sampleBoosts,
    showQuickSlots: true,
    slotSize: 52,
  },
}

export const EmptyProfile: Story = {
  args: {
    playerName: "NewPlayer",
    playerLevel: 1,
    equipment: emptyEquipment,
    characterElement: <CharacterElement />,
    equippedItems: [],
    boostBars: [],
    showQuickSlots: true,
    slotSize: 52,
  },
}

export const PartiallyEquipped: Story = {
  args: {
    playerName: "Adventurer",
    playerLevel: 15,
    equipment: partialEquipment,
    characterElement: <CharacterElement />,
    equippedItems: quickSlotItems.slice(0, 3),
    boostBars: [sampleBoosts[0]],
    showQuickSlots: true,
    slotSize: 52,
  },
}

export const NoQuickSlots: Story = {
  args: {
    playerName: "Minimalist",
    playerLevel: 50,
    equipment: fullEquipment,
    characterElement: <CharacterElement />,
    boostBars: sampleBoosts,
    showQuickSlots: false,
    slotSize: 52,
  },
}

export const HighLevelPlayer: Story = {
  args: {
    playerName: "LegendaryMage",
    playerLevel: 99,
    equipment: {
      head: { ...sampleEquipment.head, rarity: "legendary" as const },
      chest: { ...sampleEquipment.chest, rarity: "legendary" as const },
      hands: { ...sampleEquipment.hands, rarity: "epic" as const },
      mainHand: { ...sampleEquipment.mainHand, rarity: "legendary" as const },
      offHand: { ...sampleEquipment.offHand, rarity: "epic" as const },
    },
    characterElement: <CharacterElement />,
    equippedItems: quickSlotItems,
    boostBars: [
      { id: "xp", label: "XP Boost", value: 100, color: "#FF9800", icon: "⚡" },
      {
        id: "speed",
        label: "Speed Boost",
        value: 80,
        color: "#2196F3",
        icon: "🏃",
      },
      {
        id: "luck",
        label: "Luck Boost",
        value: 65,
        color: "#9C27B0",
        icon: "🍀",
      },
    ],
    showQuickSlots: true,
    slotSize: 52,
  },
}

export const InteractiveDemo: Story = {
  render: () => {
    const [equipment, setEquipment] =
      React.useState<EquipmentState>(fullEquipment)
    const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)
    const [selectedQuickSlot, setSelectedQuickSlot] = React.useState<
      number | null
    >(null)

    const handleEquipmentClick = (
      slotType: string,
      item: InventorySlotItem | null,
    ) => {
      setSelectedSlot(slotType)
      setSelectedQuickSlot(null)
      console.log("Equipment slot clicked:", slotType, item)
    }

    const handleQuickSlotClick = (
      item: InventorySlotItem | null,
      index: number,
    ) => {
      setSelectedQuickSlot(index)
      setSelectedSlot(null)
      console.log("Quick slot clicked:", index, item)
    }

    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, textAlign: "center" }}>
          Click to select equipment or quick slots
        </Typography>
        <ProfileEquipmentPanel
          playerName="InteractivePlayer"
          playerLevel={35}
          equipment={equipment}
          characterElement={<CharacterElement />}
          equippedItems={quickSlotItems}
          boostBars={sampleBoosts}
          selectedEquipmentSlot={selectedSlot as any}
          selectedEquippedIndex={selectedQuickSlot}
          onEquipmentSlotClick={handleEquipmentClick as any}
          onEquippedItemClick={handleQuickSlotClick}
        />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          {selectedSlot && (
            <Typography variant="body2">
              Selected Equipment: <strong>{selectedSlot}</strong>
            </Typography>
          )}
          {selectedQuickSlot !== null && (
            <Typography variant="body2">
              Selected Quick Slot: <strong>{selectedQuickSlot + 1}</strong>
            </Typography>
          )}
        </Box>
      </Box>
    )
  },
}

// Equipped Items Bar standalone story
export const EquippedItemsBarStory: Story = {
  name: "Equipped Items Bar (Standalone)",
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Full Quick Slots
        </Typography>
        <EquippedItemsBar items={quickSlotItems} maxSlots={6} slotSize={48} />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Empty Quick Slots
        </Typography>
        <EquippedItemsBar items={[]} maxSlots={6} slotSize={48} />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Compact (4 slots)
        </Typography>
        <EquippedItemsBar
          items={quickSlotItems.slice(0, 2)}
          maxSlots={4}
          slotSize={40}
        />
      </Box>
    </Stack>
  ),
}
