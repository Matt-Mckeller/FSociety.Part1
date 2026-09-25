"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Box, Button, IconButton, Tooltip, Typography, alpha } from "@mui/material";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import { useSurface } from "@4eye/web/components/surface";

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  contextSummary?: string;
  /** Unix ms timestamp — set at creation time. */
  timestamp?: number;
}

interface AiChatTranscriptProps {
  messages: AiChatMessage[];
  /** When true shows the assistant typing indicator. */
  isLoading?: boolean;
  /** Empty-state control that loads a plan document into the center. */
  onOpenPlan?: () => void;
  /** Label for the empty-state plan control when a draft already exists. */
  planButtonLabel?: string;
  /** Optional strip above the message list (attached plan, etc.). */
  banner?: ReactNode;
}

/** Who is speaking. Run through `ink()` so both read correctly in either mode. */
const ROLE_COLOR = {
  user: "#3b82f6",
  assistant: "#a855f7",
} as const;

function formatTime(ts?: number): string {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Animated three-dot typing indicator. */
function TypingDots({ color }: { color: string }) {
  return (
    <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", height: 16 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: alpha(color, 0.8),
            animation: "typing-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
            "@keyframes typing-bounce": {
              "0%, 80%, 100%": { transform: "scale(0.6)", opacity: 0.4 },
              "40%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      ))}
    </Box>
  );
}

/**
 * AiChatTranscript — scrollable message list.
 *
 * Features:
 * - Auto-scrolls to bottom on new messages and while loading.
 * - Typing indicator (three animated dots) when `isLoading`.
 * - Per-message timestamp (hover-revealed below bubble).
 * - Hover-revealed copy button per bubble.
 * - Empty-state hint when no messages.
 *
 * Colors come from `useSurface` rather than the light-on-dark literals this
 * used to carry, because the surface no longer forces its own dark page — the
 * literals only worked while it did.
 */
export function AiChatTranscript({
  messages,
  isLoading = false,
  onOpenPlan,
  planButtonLabel = "Plan document",
  banner,
}: AiChatTranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const surface = useSurface();
  const assistantInk = surface.ink(ROLE_COLOR.assistant);

  // Auto-scroll whenever messages change or loading state flips.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          color: surface.text.faint,
          textAlign: "center",
          px: 4,
        }}
      >
        <SmartToyRoundedIcon sx={{ fontSize: 56, opacity: 0.5 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: surface.text.md }}>
          AI Chat
        </Typography>
        <Typography variant="body2">
          Pick a domain, attach goals/projects, select context entities — then ask away.
        </Typography>
        {onOpenPlan && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<DescriptionRoundedIcon sx={{ fontSize: 16 }} />}
            onClick={onOpenPlan}
            sx={{
              mt: 0.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 12,
              borderColor: surface.dividerBorder,
              color: surface.text.md,
              "&:hover": { borderColor: surface.text.lo, bgcolor: surface.chipBg },
            }}
          >
            {planButtonLabel}
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        py: 1.5,
        // Custom thin scrollbar for the glass card.
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        "&::-webkit-scrollbar-thumb": { bgcolor: surface.dividerBorder, borderRadius: 2 },
      }}
    >
      {banner}
      {messages.map((m) => {
        const isUser = m.role === "user";
        const roleColor = ROLE_COLOR[m.role];
        const roleInk = surface.ink(roleColor);

        return (
          <Box
            key={m.id}
            sx={{
              display: "flex",
              gap: 1.25,
              alignSelf: isUser ? "flex-end" : "flex-start",
              maxWidth: "82%",
              flexDirection: isUser ? "row-reverse" : "row",
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(roleColor, 0.2),
                alignSelf: "flex-start",
                mt: 0.25,
              }}
            >
              {m.role === "assistant" ? (
                <SmartToyRoundedIcon sx={{ fontSize: 16, color: roleInk }} />
              ) : (
                <PersonRoundedIcon sx={{ fontSize: 16, color: roleInk }} />
              )}
            </Box>

            {/* Bubble + meta */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
                gap: 0.25,
                position: "relative",
                // Reveal copy button + timestamp on hover of the whole group.
                "& .msg-copy-btn": { opacity: 0, pointerEvents: "none" },
                "& .msg-timestamp": { opacity: 0 },
                "&:hover .msg-copy-btn": { opacity: 1, pointerEvents: "auto" },
                "&:hover .msg-timestamp": { opacity: 1 },
              }}
            >
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  bgcolor: isUser ? alpha(roleColor, 0.16) : surface.chipBg,
                  border: "1px solid",
                  borderColor: isUser ? alpha(roleColor, 0.3) : surface.dividerBorder,
                  borderLeft: !isUser ? `2px solid ${alpha(roleColor, 0.5)}` : undefined,
                  position: "relative",
                }}
              >
                {/* Copy button — top corner, revealed on hover */}
                <Tooltip title="Copy" arrow placement={isUser ? "left" : "right"}>
                  <IconButton
                    className="msg-copy-btn"
                    size="small"
                    onClick={() => navigator.clipboard.writeText(m.text)}
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: isUser ? "auto" : -10,
                      left: isUser ? -10 : "auto",
                      transition: "opacity 150ms",
                      bgcolor: surface.tooltipBg,
                      border: "1px solid",
                      borderColor: surface.dividerBorder,
                      width: 22,
                      height: 22,
                      "&:hover": { bgcolor: surface.chromeBg },
                    }}
                  >
                    <ContentCopyRoundedIcon sx={{ fontSize: 11, color: surface.text.md }} />
                  </IconButton>
                </Tooltip>

                <Typography
                  variant="body2"
                  sx={{ color: surface.text.hi, whiteSpace: "pre-wrap", lineHeight: 1.6 }}
                >
                  {m.text}
                </Typography>

                {m.contextSummary && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: surface.text.faint,
                      mt: 0.75,
                      display: "block",
                      fontSize: "0.65rem",
                      borderTop: "1px solid",
                      borderColor: surface.dividerBorder,
                      pt: 0.5,
                    }}
                  >
                    Context: {m.contextSummary}
                  </Typography>
                )}
              </Box>

              {/* Timestamp — revealed on hover */}
              <Typography
                className="msg-timestamp"
                variant="caption"
                sx={{
                  color: surface.text.faint,
                  fontSize: "0.62rem",
                  transition: "opacity 150ms",
                  px: 0.5,
                }}
              >
                {formatTime(m.timestamp)}
              </Typography>
            </Box>
          </Box>
        );
      })}

      {/* Typing indicator — shown while assistant is responding */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            gap: 1.25,
            alignSelf: "flex-start",
            maxWidth: "82%",
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(ROLE_COLOR.assistant, 0.2),
            }}
          >
            <SmartToyRoundedIcon sx={{ fontSize: 16, color: assistantInk }} />
          </Box>
          <Box
            sx={{
              px: 1.75,
              py: 1.25,
              borderRadius: "4px 16px 16px 16px",
              bgcolor: surface.chipBg,
              border: "1px solid",
              borderColor: surface.dividerBorder,
              borderLeft: `2px solid ${alpha(ROLE_COLOR.assistant, 0.5)}`,
            }}
          >
            <TypingDots color={assistantInk} />
          </Box>
        </Box>
      )}

      {/* Scroll anchor */}
      <Box ref={bottomRef} />
    </Box>
  );
}
