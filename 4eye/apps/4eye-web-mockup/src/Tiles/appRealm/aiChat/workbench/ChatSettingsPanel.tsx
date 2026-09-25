"use client";

/**
 * ChatSettingsPanel — AI settings as a dock column, with the chat
 * actions that used to live only on the oversized bottom orbs.
 */

import * as React from "react";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import LayersClearRoundedIcon from "@mui/icons-material/LayersClearRounded";
import { AISettingsPanel, useChatInputContext } from "@4eye/features";
import { DUSK_HORIZON_BACKGROUND } from "@expanse/theme";

import { useSurface } from "@4eye/web/components/surface";

export function ChatSettingsPanel({ onNewChat }: { onNewChat: () => void }) {
  const surface = useSurface();
  const { clearAll, summary } = useChatInputContext();

  return (
    <Stack sx={{ height: "100%", minHeight: 0, gap: 1 }}>
      <Stack sx={{ flexDirection: "row", gap: 0.5, px: 0.5, pt: 0.5, flexShrink: 0 }}>
        <QuickAction
          icon={<AddCommentRoundedIcon sx={{ fontSize: 14 }} />}
          label="New chat"
          onClick={onNewChat}
          color={surface.text.md}
        />
        <QuickAction
          icon={<LayersClearRoundedIcon sx={{ fontSize: 14 }} />}
          label="Clear context"
          onClick={clearAll}
          color={surface.text.md}
          disabled={!summary}
        />
      </Stack>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          borderRadius: 1.5,
          background: DUSK_HORIZON_BACKGROUND,
        }}
      >
        <AISettingsPanel />
      </Box>
    </Stack>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
  color,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
  disabled?: boolean;
}) {
  const surface = useSurface();
  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled}
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        py: 0.55,
        px: 0.75,
        borderRadius: 1.25,
        border: "1px solid",
        borderColor: surface.dividerBorder,
        color: disabled ? surface.text.faint : color,
        opacity: disabled ? 0.45 : 1,
        "&:hover": disabled ? undefined : { bgcolor: alpha(color, 0.08) },
      }}
    >
      {icon}
      <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </Typography>
    </ButtonBase>
  );
}
