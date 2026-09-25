"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Stack } from "@mui/material";

/**
 * Sibling chrome for record apps (Photos · Videos · Social · …).
 * Keeps media surfaces one click apart without bouncing through home.
 */
const TABS = [
  { href: "/photos", label: "Photos", accent: "#d97706" },
  { href: "/videos", label: "Videos", accent: "#ef4444" },
  { href: "/social", label: "Social", accent: "#db2777" },
  { href: "/posts", label: "Posts", accent: "#8b5cf6" },
  { href: "/live", label: "Live", accent: "#0ea5e9" },
] as const;

export function MediaRecordNav() {
  const pathname = usePathname() ?? "";

  return (
    <Stack
      direction="row"
      component="nav"
      aria-label="Media sections"
      sx={{
        gap: 0.75,
        flexWrap: "wrap",
        mt: 2.5,
        pl: 2.5,
      }}
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Box
            key={tab.href}
            component={Link}
            href={tab.href}
            sx={{
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: active ? 700 : 600,
              textDecoration: "none",
              color: active ? "common.white" : "text.secondary",
              bgcolor: active ? tab.accent : "transparent",
              border: "1px solid",
              borderColor: active ? tab.accent : "divider",
              transition: "background-color 120ms ease, color 120ms ease",
              "&:hover": {
                color: active ? "common.white" : "text.primary",
                borderColor: tab.accent,
              },
            }}
          >
            {tab.label}
          </Box>
        );
      })}
    </Stack>
  );
}
