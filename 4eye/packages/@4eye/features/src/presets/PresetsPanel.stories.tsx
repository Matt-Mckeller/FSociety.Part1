/**
 * PresetsPanel stories — full provider wrapper.
 *
 * These stories use the real React context providers from @4eye/features
 * so all interactive behaviour (save / apply / delete) works.
 *
 * White background per brand guidelines.
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box } from "@mui/material";
import {
  AISettingsProvider,
  ChatInputContextProvider,
  ContextActionBarProvider,
  ContextDataProvider,
  DomainProvider,
  GoalsProvider,
  PresetsPanel,
  PresetsProvider,
  ProfileContextProvider,
  ProjectsProvider,
  TargetingProvider,
} from "@4eye/features";

/** Minimal provider stack the panel needs */
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DomainProvider>
      <GoalsProvider>
        <ProjectsProvider>
          <ContextDataProvider>
            <AISettingsProvider>
              <ContextActionBarProvider>
                <ProfileContextProvider>
                  <TargetingProvider>
                    <ChatInputContextProvider>
                      <PresetsProvider>{children}</PresetsProvider>
                    </ChatInputContextProvider>
                  </TargetingProvider>
                </ProfileContextProvider>
              </ContextActionBarProvider>
            </AISettingsProvider>
          </ContextDataProvider>
        </ProjectsProvider>
      </GoalsProvider>
    </DomainProvider>
  );
}

const meta: Meta = {
  title: "Layout Systems / HUD Components / AiChat / PresetsPanel",
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

/** Empty state — no presets saved */
export const EmptyState: Story = {
  render: () => (
    <Providers>
      <Box
        sx={{
          width: 480,
          height: 400,
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <PresetsPanel />
      </Box>
    </Providers>
  ),
};

/** Panel with pre-seeded presets via decorator — using a child component trick. */
export const WithPresets: Story = {
  render: () => {
    // We render the panel — user can use "Save current" to add presets
    // interactively in Storybook.
    return (
      <Providers>
        <Box
          sx={{
            width: 520,
            height: 500,
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <PresetsPanel />
        </Box>
      </Providers>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the Save current button to create presets, then see them listed with PresetSymbol + apply/delete actions.",
      },
    },
  },
};

/** Narrow width — 320px */
export const Narrow: Story = {
  render: () => (
    <Providers>
      <Box
        sx={{
          width: 320,
          height: 400,
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <PresetsPanel />
      </Box>
    </Providers>
  ),
};
