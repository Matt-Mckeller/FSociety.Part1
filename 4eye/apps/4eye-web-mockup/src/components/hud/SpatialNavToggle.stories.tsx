import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { SpatialNavToggle, type SpatialNavItem } from "./SpatialNavToggle";

const meta: Meta<typeof SpatialNavToggle> = {
  title: "HUD / Map / SpatialNavToggle",
  component: SpatialNavToggle,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    docs: {
      description: {
        component: `
**SpatialNavToggle** — Plan §3.2 "On-Page Navigation Toggles".

A nestable, spatial way to switch between many sub-pages on a single page
(like the Chat Page's top screen-switcher). Collapsed, it shows a **primary
pill** (icon + label + caret) with a **2nd row of small icon chips**. On
click it expands into a **popover** where the icons **morph** into a fuller
vertical list — each row slides into place with its label revealing next to
it (staggered).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpatialNavToggle>;

const navItems: SpatialNavItem[] = [
  { id: "home", label: "Home", icon: HomeRoundedIcon, color: "#00b8d4", description: "Your dashboard" },
  { id: "projects", label: "Projects", icon: InsightsRoundedIcon, color: "#3b82f6", description: "Active work" },
  { id: "learn", label: "Learn", icon: SchoolRoundedIcon, color: "#5B8DEF", description: "Courses & lessons" },
  { id: "play", label: "Play", icon: SportsEsportsRoundedIcon, color: "#a855f7", description: "Games & quests" },
  { id: "people", label: "People", icon: GroupsRoundedIcon, color: "#FF8FB1", description: "Friends & teams" },
  { id: "chat", label: "Chat", icon: ChatRoundedIcon, color: "#7DD3C0", description: "Talk to 4eye" },
  { id: "settings", label: "Settings", icon: SettingsRoundedIcon, color: "#94a3b8", description: "Preferences" },
];

const Stage = ({ children, height = 360 }: { children: ReactNode; height?: number }) => (
  <Box
    sx={{
      width: 520,
      height,
      bgcolor: "#ffffff",
      border: "1px solid #eef2f6",
      borderRadius: 3,
      p: 3,
      position: "relative",
      boxShadow: "0 6px 24px rgba(15,23,42,0.05)",
    }}
  >
    {children}
  </Box>
);

export const Default: Story = {
  name: "Default — collapsed cluster",
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <Stage>
        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8", mb: 2 }}>
          On-page navigation · click the pill to expand
        </Typography>
        <SpatialNavToggle items={navItems} activeId={active} onChange={setActive} />
        <Typography sx={{ position: "absolute", bottom: 16, left: 24, fontSize: "0.7rem", color: "#475569" }}>
          Active page: <b>{active}</b>
        </Typography>
      </Stage>
    );
  },
};

export const TopOfPage: Story = {
  name: "Nested — top-of-page screen switcher",
  parameters: {
    docs: {
      description: {
        story:
          "Dropped into the top strip of a page, mirroring the Chat Page screen-switcher. The component is self-contained, so it can nest anywhere.",
      },
    },
  },
  render: () => {
    const [active, setActive] = useState("projects");
    const current = navItems.find((i) => i.id === active);
    return (
      <Stage height={420}>
        {/* Mock page top strip */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            pb: 2,
            mb: 2,
            borderBottom: "1px solid #eef2f6",
          }}
        >
          <SpatialNavToggle items={navItems} activeId={active} onChange={setActive} />
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#00b8d4,#3b82f6)",
            }}
          />
        </Box>
        {/* Mock page body reacting to selection */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: current?.color }}>
            {current?.label}
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>
            {current?.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, mt: 1.5 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: 80,
                  borderRadius: 2,
                  bgcolor: `${current?.color}10`,
                  border: `1px solid ${current?.color}26`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Stage>
    );
  },
};

export const CompactSet: Story = {
  name: "Compact — 4 destinations",
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <Stage>
        <SpatialNavToggle items={navItems.slice(0, 4)} activeId={active} onChange={setActive} />
      </Stage>
    );
  },
};
