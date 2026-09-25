import type { Meta, StoryObj } from "@storybook/react"
import {
  InventorySlot,
  InventorySlotItem,
} from "../../../../../expanseEdu/src/modules/game/ui/InventorySlot.component"
import { Box, Stack, Typography } from "@mui/material"

const meta: Meta<typeof InventorySlot> = {
  title: "Game/Components/InventorySlot",
  component: InventorySlot,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A WoW-style inventory slot component for displaying items with rarity colors, tooltips, and interaction states.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "range", min: 32, max: 128, step: 8 },
      description: "Pixel size of the slot",
    },
    isSelected: {
      control: "boolean",
      description: "Whether the slot is currently selected",
    },
    isEquipped: {
      control: "boolean",
      description: "Whether the item is equipped",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slot is disabled",
    },
    showQuantity: {
      control: "boolean",
      description: "Show quantity badge for stackable items",
    },
    showRarity: {
      control: "boolean",
      description: "Show rarity-colored border",
    },
  },
}

export default meta
type Story = StoryObj<typeof InventorySlot>

// Sample items for stories
const sampleItems: Record<string, InventorySlotItem> = {
  common: {
    id: "1",
    name: "Wooden Sword",
    description: "A basic wooden training sword",
    rarity: "common",
    category: "weapon",
  },
  uncommon: {
    id: "2",
    name: "Iron Shield",
    description: "A sturdy iron shield for defense",
    rarity: "uncommon",
    category: "armor",
  },
  rare: {
    id: "3",
    name: "Blue Mage Robes",
    description: "Enchanted robes that boost magic power",
    rarity: "rare",
    category: "armor",
  },
  epic: {
    id: "4",
    name: "Shadow Dagger",
    description: "A legendary blade forged in darkness",
    rarity: "epic",
    category: "weapon",
  },
  legendary: {
    id: "5",
    name: "Crown of Knowledge",
    description: "The legendary crown worn by ancient scholars",
    rarity: "legendary",
    category: "accessory",
  },
  stackable: {
    id: "6",
    name: "Health Potion",
    description: "Restores 50 HP",
    rarity: "common",
    quantity: 99,
    category: "consumable",
  },
}

export const Empty: Story = {
  args: {
    size: 64,
    slotLabel: "Head",
  },
}

export const WithCommonItem: Story = {
  args: {
    item: sampleItems.common,
    size: 64,
  },
}

export const WithUncommonItem: Story = {
  args: {
    item: sampleItems.uncommon,
    size: 64,
  },
}

export const WithRareItem: Story = {
  args: {
    item: sampleItems.rare,
    size: 64,
  },
}

export const WithEpicItem: Story = {
  args: {
    item: sampleItems.epic,
    size: 64,
  },
}

export const WithLegendaryItem: Story = {
  args: {
    item: sampleItems.legendary,
    size: 64,
  },
}

export const Selected: Story = {
  args: {
    item: sampleItems.rare,
    size: 64,
    isSelected: true,
  },
}

export const Equipped: Story = {
  args: {
    item: sampleItems.epic,
    size: 64,
    isEquipped: true,
  },
}

export const Disabled: Story = {
  args: {
    item: sampleItems.common,
    size: 64,
    disabled: true,
  },
}

export const StackableItem: Story = {
  args: {
    item: sampleItems.stackable,
    size: 64,
    showQuantity: true,
  },
}

export const LargeSize: Story = {
  args: {
    item: sampleItems.legendary,
    size: 96,
  },
}

export const SmallSize: Story = {
  args: {
    item: sampleItems.rare,
    size: 48,
  },
}

export const AllRarities: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      {Object.entries(sampleItems)
        .filter(([key]) => key !== "stackable")
        .map(([key, item]) => (
          <Box key={key} textAlign="center">
            <InventorySlot item={item} size={64} />
            <Typography
              variant="caption"
              sx={{ textTransform: "capitalize", mt: 1, display: "block" }}
            >
              {item.rarity}
            </Typography>
          </Box>
        ))}
    </Stack>
  ),
}

export const InteractiveDemo: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string | null>(null)

    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Click to select, double-click to &ldquo;equip&rdquo; (check console)
        </Typography>
        <Stack direction="row" spacing={1}>
          {Object.values(sampleItems).map((item) => (
            <InventorySlot
              key={item.id}
              item={item}
              size={56}
              isSelected={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
              onDoubleClick={(item) => console.log("Equipped:", item.name)}
            />
          ))}
        </Stack>
      </Box>
    )
  },
}

// Need React for InteractiveDemo
import React from "react"
