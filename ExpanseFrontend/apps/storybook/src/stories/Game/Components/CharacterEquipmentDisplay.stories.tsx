import type { Meta, StoryObj } from "@storybook/react"
import {
  CharacterEquipmentDisplay,
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

const meta: Meta<typeof CharacterEquipmentDisplay> = {
  title: "Game/Components/CharacterEquipmentDisplay",
  component: CharacterEquipmentDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A WoW-style character equipment display with equipment slots positioned around a character visualization. Supports head, chest, hands, and weapon slots with boost/power-up bars.",
      },
    },
  },
  argTypes: {
    slotSize: {
      control: { type: "range", min: 40, max: 80, step: 4 },
      description: "Size of each equipment slot",
    },
    characterScale: {
      control: { type: "range", min: 0.5, max: 2, step: 0.1 },
      description: "Scale of the character display",
    },
    showSlotLabels: {
      control: "boolean",
      description: "Show labels below each slot",
    },
  },
}

export default meta
type Story = StoryObj<typeof CharacterEquipmentDisplay>

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
  { id: "luck", label: "Luck Boost", value: 50, color: "#9C27B0", icon: "🍀" },
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
  chest: sampleEquipment.chest,
  mainHand: sampleEquipment.mainHand,
}

// Character element for stories
const CharacterElement = ({ scale = 0.6 }: { scale?: number }) => (
  <Box sx={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
    <StaticCharacter state={CharacterState.forwardStanding} />
  </Box>
)

export const Empty: Story = {
  args: {
    equipment: emptyEquipment,
    title: "Equipment",
    slotSize: 56,
    showSlotLabels: true,
  },
}

export const WithCharacter: Story = {
  args: {
    equipment: emptyEquipment,
    characterElement: <CharacterElement />,
    title: "Equipment",
    slotSize: 56,
    showSlotLabels: true,
  },
}

export const PartiallyEquipped: Story = {
  args: {
    equipment: partialEquipment,
    characterElement: <CharacterElement />,
    title: "Equipment",
    slotSize: 56,
    showSlotLabels: true,
  },
}

export const FullyEquipped: Story = {
  args: {
    equipment: fullEquipment,
    characterElement: <CharacterElement />,
    title: "Equipment",
    slotSize: 56,
    showSlotLabels: true,
  },
}

export const WithBoostBars: Story = {
  args: {
    equipment: fullEquipment,
    characterElement: <CharacterElement />,
    title: "Equipment",
    slotSize: 56,
    showSlotLabels: true,
    boostBars: sampleBoosts,
  },
}

export const NoLabels: Story = {
  args: {
    equipment: fullEquipment,
    characterElement: <CharacterElement />,
    title: "Equipment",
    slotSize: 56,
    showSlotLabels: false,
  },
}

export const LargeSlots: Story = {
  args: {
    equipment: fullEquipment,
    characterElement: <CharacterElement scale={0.8} />,
    title: "Equipment",
    slotSize: 72,
    showSlotLabels: true,
  },
}

export const SmallSlots: Story = {
  args: {
    equipment: fullEquipment,
    characterElement: <CharacterElement scale={0.5} />,
    title: "Equipment",
    slotSize: 44,
    showSlotLabels: true,
  },
}

export const InteractiveDemo: Story = {
  render: () => {
    const [equipment, setEquipment] =
      React.useState<EquipmentState>(partialEquipment)
    const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)

    const handleSlotClick = (
      slotType: string,
      item: InventorySlotItem | null,
    ) => {
      setSelectedSlot(slotType)
      console.log("Clicked slot:", slotType, item)
    }

    const handleEquipItem = (slotType: string, item: InventorySlotItem) => {
      console.log("Double-clicked to unequip:", slotType, item)
      // Simulate unequipping
      setEquipment((prev) => ({ ...prev, [slotType]: null }))
    }

    const resetEquipment = () => {
      setEquipment(fullEquipment)
      setSelectedSlot(null)
    }

    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Click to select slot, double-click to unequip
        </Typography>
        <CharacterEquipmentDisplay
          equipment={equipment}
          characterElement={<CharacterElement />}
          title="Equipment"
          slotSize={56}
          selectedSlot={selectedSlot as any}
          onSlotClick={handleSlotClick as any}
          onEquipItem={handleEquipItem as any}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          <Button variant="outlined" size="small" onClick={resetEquipment}>
            Reset Equipment
          </Button>
        </Stack>
        {selectedSlot && (
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Selected: <strong>{selectedSlot}</strong>
          </Typography>
        )}
      </Box>
    )
  },
}

export const DifferentCharacterPoses: Story = {
  render: () => (
    <Stack direction="row" spacing={4} flexWrap="wrap">
      <Box>
        <Typography
          variant="caption"
          sx={{ display: "block", mb: 1, textAlign: "center" }}
        >
          Forward Standing
        </Typography>
        <CharacterEquipmentDisplay
          equipment={partialEquipment}
          characterElement={
            <Box sx={{ transform: "scale(0.5)", transformOrigin: "center" }}>
              <StaticCharacter state={CharacterState.forwardStanding} />
            </Box>
          }
          slotSize={48}
        />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ display: "block", mb: 1, textAlign: "center" }}
        >
          Celebration
        </Typography>
        <CharacterEquipmentDisplay
          equipment={fullEquipment}
          characterElement={
            <Box sx={{ transform: "scale(0.5)", transformOrigin: "center" }}>
              <StaticCharacter state={CharacterState.celebration1} />
            </Box>
          }
          slotSize={48}
        />
      </Box>
    </Stack>
  ),
}
