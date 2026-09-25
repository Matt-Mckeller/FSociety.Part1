"use client";

import { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import { TileContainer } from "@expanse/hud";
import { JournalTile } from "@4eye/web/Tiles/journal";

type Tab = "notes" | "recaps";

const TABS: { id: Tab; label: string }[] = [
  { id: "notes", label: "Notes" },
  { id: "recaps", label: "Recaps" },
];

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <Box sx={{ display: "flex", gap: 0.5, mb: 3 }}>
      {TABS.map((t) => (
        <ButtonBase
          key={t.id}
          onClick={() => onChange(t.id)}
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: 2,
            fontSize: 13,
            fontWeight: 700,
            border: "1px solid",
            borderColor: active === t.id ? "primary.main" : "divider",
            color: active === t.id ? "primary.main" : "text.secondary",
            bgcolor: active === t.id ? "primary.50" : "transparent",
            transition: "all 120ms ease",
            "&:hover": { borderColor: "primary.light", color: "primary.main" },
          }}
        >
          {t.label}
        </ButtonBase>
      ))}
    </Box>
  );
}

export default function NotesPage() {
  const [tab, setTab] = useState<Tab>("notes");

  return (
    <TileContainer mode="fit">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          color: "text.primary",
          p: 1.5,
          boxSizing: "border-box",
        }}
      >
        <TabBar active={tab} onChange={setTab} />

        {tab === "notes" ? (
          <Box sx={{ flex: 1, minHeight: 0 }}>
            <JournalTile />
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SummarizeRoundedIcon sx={{ fontSize: 64, opacity: 0.4 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Recaps
            </Typography>
          </Box>
        )}
      </Box>
    </TileContainer>
  );
}
