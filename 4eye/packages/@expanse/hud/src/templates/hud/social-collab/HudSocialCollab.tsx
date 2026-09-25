"use client";
/**
 * HUD Template: Social Collab
 *
 * Collaboration-focused layout for team environments:
 * - Participant avatars with presence indicators
 * - Chat panel (collapsible)
 * - Voice/video controls
 * - Screen share and reactions
 * - Activity feed
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for collaborative workspaces and video calls.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  AvatarGroup,
  Badge,
  Paper,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

import { ActionOrb } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: Date;
}

export interface HudSocialCollabProps {
  children?: ReactNode;
  participants?: Participant[];
  messages?: ChatMessage[];
  currentUserId?: string;
  onSendMessage?: (text: string) => void;
  onReaction?: (type: string) => void;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudSocialCollab({
  children,
  participants = [],
  messages = [],
  currentUserId = "me",
  onSendMessage,
  onReaction,
}: HudSocialCollabProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const onlineParticipants = participants.filter((p) => p.isOnline);
  const unreadCount = 3; // Would come from props in real app

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage?.(messageInput.trim());
      setMessageInput("");
    }
  };

  const bgColor = "#0f0f14";
  const textColor = "#ffffff";
  const accentColor = "#8b5cf6";

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================================================================= */}
      {/* TOP BAR - Participants */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          zIndex: 1000,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      >
        {/* Participant avatars */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AvatarGroup max={5} sx={{ "& .MuiAvatar-root": { width: 36, height: 36 } }}>
            {onlineParticipants.map((p) => (
              <Badge
                key={p.id}
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  p.isSpeaking ? (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#22c55e",
                        borderRadius: "50%",
                        border: "2px solid #0f0f14",
                        animation: "pulse 1s infinite",
                        "@keyframes pulse": {
                          "0%, 100%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.2)" },
                        },
                      }}
                    />
                  ) : null
                }
              >
                <Avatar src={p.avatar} alt={p.name}>
                  {p.name[0]}
                </Avatar>
              </Badge>
            ))}
          </AvatarGroup>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.6 }}>
            {onlineParticipants.length} online
          </Typography>
        </Box>

        {/* Room info */}
        <Chip
          label="Design Review"
          size="small"
          sx={{
            bgcolor: "rgba(139, 92, 246, 0.2)",
            color: accentColor,
            border: `1px solid ${accentColor}40`,
          }}
        />

        {/* More options */}
        <IconButton sx={{ color: textColor, opacity: 0.6 }}>
          <MoreHorizIcon />
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM CONTROLS - Voice/Video/Share */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 1.5,
          bgcolor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1000,
        }}
      >
        {/* Mic */}
        <IconButton
          onClick={() => setIsMuted(!isMuted)}
          sx={{
            color: isMuted ? "#ef4444" : textColor,
            bgcolor: isMuted ? "rgba(239, 68, 68, 0.2)" : "transparent",
            "&:hover": { bgcolor: isMuted ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.1)" },
          }}
        >
          {isMuted ? <MicOffIcon /> : <MicIcon />}
        </IconButton>

        {/* Video */}
        <IconButton
          onClick={() => setIsVideoOn(!isVideoOn)}
          sx={{
            color: !isVideoOn ? "#ef4444" : textColor,
            bgcolor: !isVideoOn ? "rgba(239, 68, 68, 0.2)" : "transparent",
            "&:hover": { bgcolor: !isVideoOn ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.1)" },
          }}
        >
          {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>

        {/* Screen share */}
        <IconButton
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          sx={{
            color: isScreenSharing ? "#22c55e" : textColor,
            bgcolor: isScreenSharing ? "rgba(34, 197, 94, 0.2)" : "transparent",
            "&:hover": {
              bgcolor: isScreenSharing ? "rgba(34, 197, 94, 0.3)" : "rgba(255,255,255,0.1)",
            },
          }}
        >
          {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
        </IconButton>

        <Box sx={{ width: 1, height: 24, bgcolor: "rgba(255,255,255,0.2)", mx: 1 }} />

        {/* Reactions */}
        <IconButton onClick={() => onReaction?.("thumbsUp")} sx={{ color: textColor }}>
          <ThumbUpIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => onReaction?.("heart")} sx={{ color: textColor }}>
          <FavoriteIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => onReaction?.("emoji")} sx={{ color: textColor }}>
          <EmojiEmotionsIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* CHAT TOGGLE ORB */}
      {/* ================================================================= */}
      <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
        <Badge badgeContent={isChatOpen ? 0 : unreadCount} color="error">
          <ActionOrb
            icon={<ChatIcon />}
            label="Chat"
            size="lg"
            variant={isChatOpen ? "solid" : "glow"}
            color="primary"
            colorMode="dark"
            onClick={() => setIsChatOpen(!isChatOpen)}
          />
        </Badge>
      </Box>

      {/* ================================================================= */}
      {/* CHAT PANEL */}
      {/* ================================================================= */}
      {isChatOpen && (
        <Paper
          sx={{
            position: "fixed",
            top: 80,
            right: 24,
            bottom: 100,
            width: 320,
            bgcolor: "rgba(15, 15, 20, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
          }}
        >
          {/* Chat header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ color: textColor }}>
              Chat
            </Typography>
            <IconButton size="small" onClick={() => setIsChatOpen(false)} sx={{ color: textColor }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <List sx={{ flex: 1, overflow: "auto", p: 1 }}>
            {messages.map((msg) => (
              <ListItem
                key={msg.id}
                sx={{
                  alignItems: "flex-start",
                  py: 1,
                  px: 1,
                  bgcolor:
                    msg.senderId === currentUserId ? "rgba(139, 92, 246, 0.1)" : "transparent",
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  <Avatar src={msg.senderAvatar} sx={{ width: 28, height: 28 }}>
                    {msg.senderName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="caption" sx={{ color: textColor, opacity: 0.6 }}>
                      {msg.senderName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: textColor }}>
                      {msg.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              slotProps={{
                input: {
                sx: {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: textColor,
                  "& fieldset": { border: "none" },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleSendMessage} sx={{ color: accentColor }}>
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                },
              }}
            />
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: textColor, opacity: 0.2, mb: 2 }}>
            Collaboration Space
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.4 }}>
            {onlineParticipants.length} participants | {isMuted ? "Muted" : "Unmuted"} |{" "}
            {isVideoOn ? "Video On" : "Video Off"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
