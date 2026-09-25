/**
 * AISettingsPanel — functional stories using real context providers.
 *
 * Shows the redesigned panel (row layout + Workflow collapse, + Context
 * sources section) inside the DUSK_HORIZON shell from @expanse/shell.
 *
 * White background per brand guidelines.
 */
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  AISettingsPanel,
  AISettingsProvider,
  ContextSourcesPicker,
  ContextDataProvider,
  DomainProvider,
  GoalsProvider,
  ProjectsProvider,
  useAISettings,
} from "@4eye/features";
import { AISettingsPanelShell } from "@expanse/hud";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DomainProvider>
      <GoalsProvider>
        <ProjectsProvider>
          <ContextDataProvider>
            <AISettingsProvider>{children}</AISettingsProvider>
          </ContextDataProvider>
        </ProjectsProvider>
      </GoalsProvider>
    </DomainProvider>
  );
}

const meta: Meta = {
  title: "Layout Systems / HUD Components / AiChat / AISettingsPanel (functional)",
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

/** Panel inside DUSK_HORIZON shell — default */
export const Default: Story = {
  render: () => (
    <Providers>
      <Box sx={{ maxWidth: 760, mx: "auto", pt: 2 }}>
        <AISettingsPanelShell>
          <AISettingsPanel />
        </AISettingsPanelShell>
      </Box>
    </Providers>
  ),
};

/** Animated toggle — mirrors production behaviour */
export const AnimatedToggle: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <Providers>
        <Box sx={{ maxWidth: 760, mx: "auto", mt: 12, display: "flex", flexDirection: "column", gap: 0 }}>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <AISettingsPanelShell>
                  <AISettingsPanel />
                </AISettingsPanelShell>
              </motion.div>
            )}
          </AnimatePresence>
          <Box
            sx={{
              height: 52,
              bgcolor: "#1a2542",
              borderRadius: open ? "0 0 12px 12px" : 2,
              border: "1px solid rgba(255,255,255,0.12)",
              borderTop: open ? "none" : "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              px: 2,
              gap: 1,
              transition: "border-radius 0.15s",
            }}
          >
            <Button
              size="small"
              variant={open ? "contained" : "outlined"}
              onClick={() => setOpen((v) => !v)}
              sx={{
                textTransform: "none",
                fontSize: 11,
                bgcolor: open ? "#8b5cf6" : undefined,
                borderColor: "#8b5cf6",
                color: open ? "white" : "#8b5cf6",
              }}
            >
              ⚙ Settings
            </Button>
            <Box
              sx={{
                flex: 1,
                height: 28,
                bgcolor: "rgba(255,255,255,0.06)",
                borderRadius: 1,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </Box>
        </Box>
      </Providers>
    );
  },
};

/** Wide — 960px max (production width) */
export const Wide: Story = {
  render: () => (
    <Providers>
      <Box sx={{ maxWidth: 960, mx: "auto", pt: 2 }}>
        <AISettingsPanelShell width="100%">
          <AISettingsPanel />
        </AISettingsPanelShell>
      </Box>
    </Providers>
  ),
};

/** Context sources picker standalone — matches the composer popover */
function PickerDemo() {
  const { settings, toggleContextSource } = useAISettings();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Live — toggles are wired to AISettingsContext.
      </Typography>
      <ContextSourcesPicker
        sources={settings.contextSources}
        onToggle={toggleContextSource}
      />
    </Box>
  );
}

export const ContextSources: Story = {
  render: () => (
    <Providers>
      <Box sx={{ maxWidth: 400, mx: "auto", pt: 4 }}>
        <PickerDemo />
      </Box>
    </Providers>
  ),
};
