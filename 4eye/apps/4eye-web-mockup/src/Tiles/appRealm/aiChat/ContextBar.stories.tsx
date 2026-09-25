import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { ContextBar, ContextDataProvider } from "@4eye/features";

const meta: Meta<typeof ContextBar> = {
  title: "AppRealm/AiChat/ContextBar",
  component: ContextBar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <ContextDataProvider>
        <Box sx={{ p: 3, maxWidth: 900 }}>
          <Story />
        </Box>
      </ContextDataProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContextBar>;

export const CompactGrouped: Story = {
  args: {
    onOpenKind: (kind) => console.log("open", kind),
  },
};
