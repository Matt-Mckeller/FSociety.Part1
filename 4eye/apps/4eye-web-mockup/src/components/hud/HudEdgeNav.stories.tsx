import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import { HudEdgeNav, type HudEdgeNavVariant, type HudNavDirection } from "./HudEdgeNav";

const meta: Meta<typeof HudEdgeNav> = {
  title: "HUD / Map / HudEdgeNav",
  component: HudEdgeNav,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    docs: {
      description: {
        component: `
**HudEdgeNav** — exploration of up/down/left/right "change screen" navigation
mounted around the **edges of the HUD** (between existing chrome) rather than
on the minimap tile arrows.

Each variant is shown inside a mock HUD frame (top bar + left rail + bottom
AI bar) so you can see how the affordances float *inside* the safe area,
between components. Use the **inset** lever to push them further from the edge.

Mobile: the "edge-*" and "floating-cards" variants assume a wide viewport;
on narrow screens prefer **corner-dpad** or **mobile-bar**.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HudEdgeNav>;

const directions = {
  up: { label: "Money", icon: InsightsRoundedIcon, color: "#3b82f6" },
  down: { label: "Who", icon: HomeRoundedIcon, color: "#f97316" },
  left: { label: "Projects", icon: InsightsRoundedIcon, color: "#3b82f6" },
  right: { label: "Learn", icon: SchoolRoundedIcon, color: "#a855f7" },
};

const CHROME = { top: 56, left: 56, bottom: 64 };

/**
 * Mock HUD frame: a relatively-positioned content area surrounded by the
 * persistent chrome the edge-nav must float *between*.
 */
function HudFrame({ children, width = 720, height = 460 }: { children: ReactNode; width?: number; height?: number }) {
  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        bgcolor: "#ffffff",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #eef2f6",
        boxShadow: "0 10px 40px rgba(15,23,42,0.08)",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, #3b82f612, transparent 38%), radial-gradient(circle at 100% 100%, #a855f712, transparent 38%)",
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: CHROME.top,
          display: "flex",
          alignItems: "center",
          px: 2,
          gap: 1.5,
          borderBottom: "1px solid #eef2f6",
          bgcolor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          zIndex: 10,
        }}
      >
        <Box sx={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#00b8d4,#3b82f6)" }} />
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 700 }}>4eye</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>Lvl 4 · 1,240 ✦</Typography>
      </Box>

      {/* Left rail */}
      <Box
        sx={{
          position: "absolute",
          top: CHROME.top,
          left: 0,
          bottom: 0,
          width: CHROME.left,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.25,
          py: 2,
          borderRight: "1px solid #eef2f6",
          bgcolor: "rgba(255,255,255,0.6)",
          zIndex: 10,
        }}
      >
        {["#00b8d4", "#3b82f6", "#a855f7", "#FF8FB1"].map((c, i) => (
          <Box key={i} sx={{ width: 28, height: 28, borderRadius: 1.5, bgcolor: c, opacity: i === 0 ? 1 : 0.4 }} />
        ))}
      </Box>

      {/* Map / content placeholder */}
      <Box
        sx={{
          position: "absolute",
          top: CHROME.top,
          left: CHROME.left,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: 3,
            bgcolor: "#eff6ff",
            border: "1px dashed #bfdbfe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SportsEsportsRoundedIcon sx={{ fontSize: 40, color: "#93c5fd" }} />
        </Box>
      </Box>

      {/* Bottom AI bar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 280,
          height: 40,
          borderRadius: 20,
          bgcolor: "#fafafa",
          border: "1px solid #eef2f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>Ask anything…</Typography>
      </Box>

      {/* The edge-nav overlay lives here, between the chrome */}
      {children}
    </Box>
  );
}

function VariantStage({ variant, inset = 16 }: { variant: HudEdgeNavVariant; inset?: number }) {
  const [last, setLast] = useState<HudNavDirection | null>(null);
  return (
    <Box>
      <HudFrame>
        <HudEdgeNav variant={variant} directions={directions} inset={inset} onNavigate={setLast} />
      </HudFrame>
      <Typography sx={{ mt: 1.5, fontSize: "0.72rem", color: "#475569" }}>
        Last navigated: <b>{last ?? "—"}</b>
      </Typography>
    </Box>
  );
}

export const EdgeLabels: Story = {
  name: "Variant A — edge label pills",
  parameters: {
    docs: { description: { story: "Arrow + label + symbol pill at each edge midpoint, floating inside the safe area between the chrome." } },
  },
  render: () => <VariantStage variant="edge-labels" />,
};

export const EdgeArrows: Story = {
  name: "Variant B — minimal edge arrows",
  parameters: {
    docs: { description: { story: "Compact circular arrow chips at each edge; the destination label is revealed on hover (tooltip). Lowest visual footprint." } },
  },
  render: () => <VariantStage variant="edge-arrows" />,
};

export const FloatingCards: Story = {
  name: "Variant C — floating destination cards",
  parameters: {
    docs: { description: { story: "Inset destination cards (direction + label + symbol) floating away from each edge — the clearest 'where does this go' read." } },
  },
  render: () => <VariantStage variant="floating-cards" inset={28} />,
};

export const IncreasedInset: Story = {
  name: "Variant A — increased inset",
  parameters: {
    docs: { description: { story: "Same edge pills with a larger inset, pulling the affordances further inward — useful when edge chrome is dense." } },
  },
  render: () => <VariantStage variant="edge-labels" inset={40} />,
};

export const CornerDpad: Story = {
  name: "Variant D — corner D-pad (mobile-friendly)",
  parameters: {
    docs: { description: { story: "Compact D-pad cluster anchored in a corner. Keeps the edges clear and works on narrow screens." } },
  },
  render: () => <VariantStage variant="corner-dpad" />,
};

export const MobileBar: Story = {
  name: "Variant E — mobile bottom bar",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    docs: { description: { story: "Bottom segmented bar with all four directions — the recommended pattern when edge-floating doesn't fit a narrow viewport." } },
  },
  render: () => (
    <Box>
      <HudFrame width={360} height={520}>
        <HudEdgeNav variant="mobile-bar" directions={directions} inset={64} />
      </HudFrame>
    </Box>
  ),
};
