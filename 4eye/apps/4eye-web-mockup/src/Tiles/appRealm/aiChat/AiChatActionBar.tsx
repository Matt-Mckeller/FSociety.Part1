"use client";

import { useMemo } from "react";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import LayersClearRoundedIcon from "@mui/icons-material/LayersClearRounded";
import {
  useRegisterHudChromeHide,
  useRegisterRightRailItem,
  type OrbItem,
} from "@expanse/hud";
import { useChatInputContext } from "@4eye/features";

import { ChatActionFab } from "./ChatActionFab";

interface AiChatActionBarProps {
  onNewChat: () => void;
  onToggleSettings: () => void;
  onToggleContext: () => void;
  settingsOpen: boolean;
  contextOpen: boolean;
}

/**
 * AiChatActionBar — chat actions as a right-rail FAB speed-dial.
 *
 * The global HUD orb bar is hidden on this screen. The four chat
 * actions collapse into one chat button on the right rail; hover or
 * click fans the orbs out around it.
 */
export function AiChatActionBar({
  onNewChat,
  onToggleSettings,
  onToggleContext,
  settingsOpen,
  contextOpen,
}: AiChatActionBarProps) {
  const { clearAll, summary } = useChatInputContext();

  useRegisterHudChromeHide({
    id: "ai-chat-hide-default-orbs",
    hide: ["bottomOrbBar"],
    label: "AI chat replaces default orb bar",
  });

  const items = useMemo<OrbItem[]>(
    () => [
      {
        id: "ai-new-chat",
        icon: <AddCommentRoundedIcon />,
        label: "New Chat",
        onClick: onNewChat,
      },
      {
        id: "ai-toggle-settings",
        icon: <AutoAwesomeIcon />,
        label: settingsOpen ? "Hide AI Settings" : "AI Settings",
        onClick: onToggleSettings,
        color: settingsOpen ? "ai" : undefined,
      },
      {
        id: "ai-toggle-context",
        icon: <CategoryRoundedIcon />,
        label: contextOpen ? "Hide Context" : "Select Context",
        onClick: onToggleContext,
        color: contextOpen ? "cyan" : undefined,
      },
      {
        id: "ai-clear-context",
        icon: <LayersClearRoundedIcon />,
        label: "Clear Context",
        onClick: clearAll,
        disabled: !summary,
      },
    ],
    [onNewChat, onToggleSettings, onToggleContext, settingsOpen, contextOpen, clearAll, summary],
  );

  const node = useMemo(() => <ChatActionFab items={items} />, [items]);

  useRegisterRightRailItem({
    id: "ai-chat-actions",
    order: 10,
    node,
    label: "AI Chat actions",
  });

  return null;
}
