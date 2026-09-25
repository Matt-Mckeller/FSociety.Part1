import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../components/Button"

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: { onClick: { action: "clicked" } },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { label: "Primary Button" },
}
