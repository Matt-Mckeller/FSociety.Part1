<!-- ---
applyTo: "**/*.stories.tsx,**/*.stories.mdx,**/.storybook/**"
---

# Storybook

## Rules
- White (#ffffff) background default
- Use ThemeProvider with toolbar controls
- Args-based stories
- Include a11y testing
- Document component props

## User Preferences
- Background: WHITE (#ffffff) — not dark
- Containers: subtle borders or shadows for visibility
- Paper/Card on white: use #f5f5f5 (light gray), not transparent

## Examples
- Storybook config: `packages/@expanse/shell/.storybook/`
- Stories: `packages/@expanse/shell/src/**/*.stories.tsx`

## Story Template
```tsx
import type { Meta, StoryObj } from "@storybook/react"
import { ComponentName } from "./ComponentName"

const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
  parameters: {
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] }
  }
}
export default meta

type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
  args: {
    // props
  }
}
```

## Don't
- Dark backgrounds (unless specifically needed)
- rgba with low opacity on white (invisible)
- Skip args (use them for controls) -->
