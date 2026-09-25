/**
 * AI Chat HUD — AISettingsPanel stories
 *
 * Shows the redesigned AI Settings Panel:
 *  - Default state (collapsed Workflow row)
 *  - Workflow expanded
 *  - Inside AISettingsPanelShell (starry background, rounded top)
 *
 * All stories use a white background per brand guidelines.
 * The panel itself uses DUSK_HORIZON (dark/starry) so it's self-contained
 * against white.
 */
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { AISettingsPanelShell } from "../../hud-components/ai-settings-panel";

// We cannot easily import @4eye/features here (circular dep risk), so we
// render a visual mockup of the panel content using the shell alone.
// Full functional stories should be added to the 4eye-web-mockup storybook
// which has access to all providers.

const meta: Meta<typeof AISettingsPanelShell> = {
  title: "Layout Systems / HUD Components / AiChat / AISettingsPanel",
  component: AISettingsPanelShell,
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof AISettingsPanelShell>;

/** Standalone shell — shows the visual frame with placeholder content */
export const ShellOnly: Story = {
  render: () => (
    <Box sx={{ maxWidth: 760, mx: "auto", pt: 4 }}>
      <AISettingsPanelShell>
        <Box
          sx={{
            p: 2,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {["Accuracy", "Time", "Power", "Mode"].map((label) => (
            <Box
              key={label}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 99,
                bgcolor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.75)",
                fontSize: 12,
              }}
            >
              {label}: auto
            </Box>
          ))}
        </Box>
      </AISettingsPanelShell>
    </Box>
  ),
};

/** Animated slide-up panel above a mock input bar */
export const SlideUpAboveInputBar: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <Box
        sx={{
          maxWidth: 760,
          mx: "auto",
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 0,
        }}
      >
        {open && (
          <AISettingsPanelShell>
            <Box sx={{ p: 2 }}>
              {[
                "Time · Power — Past/Present/Future/Max · Ion → Unlimited",
                "Basic row — Accuracy · Mode",
                "Workflow row — Plan · Test  (▶ Ask · Review)",
                "When row — Duration · Schedule",
                "Randomness slider",
              ].map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    py: 0.75,
                    px: 1,
                    borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 12,
                    fontFamily: "monospace",
                  }}
                >
                  {row}
                </Box>
              ))}
            </Box>
          </AISettingsPanelShell>
        )}
        {/* Mock input bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#1e2640",
            borderRadius: open ? "0 0 12px 12px" : 2,
            px: 1.5,
            py: 0.75,
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
              "&:hover": { bgcolor: open ? "#7c3aed" : "rgba(139,92,246,0.08)" },
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
    );
  },
};

/** Width variants — narrow / standard / wide */
export const WidthVariants: Story = {
  render: () => {
    const widths = [320, 640, 960];
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
        {widths.map((w) => (
          <Box key={w}>
            <Box sx={{ mb: 0.5, fontSize: 12, color: "#666" }}>width={w}px</Box>
            <AISettingsPanelShell width={w}>
              <Box sx={{ p: 1.5, color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
                AI Settings content at {w}px
              </Box>
            </AISettingsPanelShell>
          </Box>
        ))}
      </Box>
    );
  },
};
