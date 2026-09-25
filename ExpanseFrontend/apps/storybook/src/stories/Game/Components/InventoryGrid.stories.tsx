import type { Meta, StoryObj } from "@storybook/react"
import { InventoryGrid } from "../../../../../expanseEdu/src/modules/game/ui/InventoryGrid.component"
import { InventorySlotItem } from "../../../../../expanseEdu/src/modules/game/ui/InventorySlot.component"
import { Box, Stack, Typography } from "@mui/material"
import React from "react"

const meta: Meta<typeof InventoryGrid> = {
  title: "Game/Components/InventoryGrid",
  component: InventoryGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A WoW-style inventory grid for displaying collections of items with selection and interaction support.",
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: "range", min: 3, max: 10, step: 1 },
      description: "Number of columns in the grid",
    },
    rows: {
      control: { type: "range", min: 2, max: 10, step: 1 },
      description: "Number of rows in the grid",
    },
    slotSize: {
      control: { type: "range", min: 40, max: 96, step: 8 },
      description: "Pixel size of each slot",
    },
    gap: {
      control: { type: "range", min: 2, max: 16, step: 2 },
      description: "Gap between slots in pixels",
    },
    showEmptySlots: {
      control: "boolean",
      description: "Show empty slots to fill the grid",
    },
  },
}

export default meta
type Story = StoryObj<typeof InventoryGrid>

// Sample items for stories
const sampleItems: InventorySlotItem[] = [
  {
    id: "1",
    name: "Wooden Sword",
    description: "A basic wooden training sword",
    rarity: "common",
    category: "weapon",
  },
  {
    id: "2",
    name: "Iron Shield",
    description: "A sturdy iron shield for defense",
    rarity: "uncommon",
    category: "armor",
  },
  {
    id: "3",
    name: "Blue Mage Robes",
    description: "Enchanted robes that boost magic power",
    rarity: "rare",
    category: "armor",
  },
  {
    id: "4",
    name: "Shadow Dagger",
    description: "A legendary blade forged in darkness",
    rarity: "epic",
    category: "weapon",
  },
  {
    id: "5",
    name: "Crown of Knowledge",
    description: "The legendary crown worn by ancient scholars",
    rarity: "legendary",
    category: "accessory",
  },
  {
    id: "6",
    name: "Health Potion",
    description: "Restores 50 HP",
    rarity: "common",
    quantity: 15,
    category: "consumable",
  },
  {
    id: "7",
    name: "Mana Potion",
    description: "Restores 30 MP",
    rarity: "uncommon",
    quantity: 8,
    category: "consumable",
  },
  {
    id: "8",
    name: "Bronze Helmet",
    description: "Basic head protection",
    rarity: "common",
    category: "armor",
  },
  {
    id: "9",
    name: "Magic Ring",
    description: "Increases magic power by 5",
    rarity: "rare",
    category: "accessory",
  },
  {
    id: "10",
    name: "Dragon Scale",
    description: "A rare crafting material",
    rarity: "epic",
    quantity: 3,
    category: "material",
  },
]

export const Default: Story = {
  args: {
    items: sampleItems,
    columns: 5,
    maxSlots: 20,
    slotSize: 56,
    gap: 4,
    title: "Inventory",
    showEmptySlots: true,
  },
}

export const Empty: Story = {
  args: {
    items: [],
    columns: 5,
    maxSlots: 20,
    slotSize: 56,
    title: "Empty Inventory",
    showEmptySlots: true,
  },
}

export const Full: Story = {
  args: {
    items: [
      ...sampleItems,
      ...sampleItems.map((item) => ({ ...item, id: `${item.id}-copy` })),
    ],
    columns: 5,
    maxSlots: 20,
    slotSize: 56,
    title: "Full Inventory",
    showEmptySlots: true,
  },
}

export const LargeGrid: Story = {
  args: {
    items: sampleItems,
    columns: 8,
    maxSlots: 40,
    slotSize: 48,
    gap: 4,
    title: "Large Inventory",
    showEmptySlots: true,
  },
}

export const CompactGrid: Story = {
  args: {
    items: sampleItems.slice(0, 6),
    columns: 3,
    maxSlots: 9,
    slotSize: 48,
    gap: 2,
    title: "Quick Slots",
    showEmptySlots: true,
  },
}

export const NoEmptySlots: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    columns: 5,
    slotSize: 56,
    title: "Items Only",
    showEmptySlots: false,
  },
}

export const InteractiveDemo: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
      null,
    )
    const [items, setItems] =
      React.useState<(InventorySlotItem | null)[]>(sampleItems)

    const handleSlotClick = (item: InventorySlotItem | null, index: number) => {
      setSelectedIndex(index)
      console.log("Selected slot:", index, item)
    }

    const handleDoubleClick = (item: InventorySlotItem, index: number) => {
      console.log("Double-clicked item:", item.name, "at index:", index)
      // Simulate using/equipping item
    }

    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Click to select, double-click to use item (check console)
        </Typography>
        <InventoryGrid
          items={items}
          columns={5}
          maxSlots={20}
          slotSize={56}
          title="Interactive Inventory"
          selectedIndex={selectedIndex}
          onSlotClick={handleSlotClick}
          onItemDoubleClick={handleDoubleClick}
        />
        {selectedIndex !== null && items[selectedIndex] && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Selected: <strong>{items[selectedIndex]?.name}</strong>
          </Typography>
        )}
      </Box>
    )
  },
}

export const MultipleGrids: Story = {
  render: () => (
    <Stack spacing={2}>
      <InventoryGrid
        items={sampleItems.filter((i) => i.category === "weapon")}
        columns={4}
        maxSlots={8}
        slotSize={48}
        title="Weapons"
      />
      <InventoryGrid
        items={sampleItems.filter((i) => i.category === "armor")}
        columns={4}
        maxSlots={8}
        slotSize={48}
        title="Armor"
      />
      <InventoryGrid
        items={sampleItems.filter((i) => i.category === "consumable")}
        columns={4}
        maxSlots={8}
        slotSize={48}
        title="Consumables"
      />
    </Stack>
  ),
}
