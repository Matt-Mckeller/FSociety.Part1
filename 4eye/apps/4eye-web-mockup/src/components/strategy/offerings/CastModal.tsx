"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { useRef } from "react";
import gsap from "gsap";
import { useGsap } from "@4eye/web/hooks/animation";

export type CastKey = "visualize" | "story" | "expand" | "reflect";

interface CastModalProps {
  open: boolean;
  cast: CastKey | null;
  topic: string;
  onClose: () => void;
}

const CAST_META: Record<
  CastKey,
  { label: string; Icon: typeof VisibilityIcon; color: string }
> = {
  visualize: { label: "Visualize", Icon: VisibilityIcon,    color: "#3b82f6" },
  story:     { label: "Story",     Icon: AutoStoriesIcon,   color: "#22c55e" },
  expand:    { label: "Expand",    Icon: OpenInFullIcon,    color: "#f97316" },
  reflect:   { label: "Reflect",   Icon: PsychologyAltIcon, color: "#a855f7" },
};

const TRANSFORMS: Record<CastKey, (topic: string) => string> = {
  visualize: (t) =>
    `Picture ${t.toLowerCase()} as a glowing concentric diagram — at the center, you. Each ring outward is one habit, one relationship, one win. Tap a ring and 4eye plays the path to it.`,
  story: (t) =>
    `Once, ${t.toLowerCase()} was a closed door. You found a key shaped like attention. Each turn unlocked a small light. By the end you were not at the door anymore — you were the room.`,
  expand: (t) =>
    `${t}\n  ↳ atomic habits compounded over weeks\n  ↳ measured by 4eye's ambient signal, not by guilt\n  ↳ every decision becomes a function: I.choose(growth) → +1 confidence\n  ↳ you stop fighting yourself and start writing yourself`,
  reflect: (t) =>
    `Reflect on ${t.toLowerCase()}:\n\n  → What did you already know?\n  → What surprised you most?\n  → One way you can apply this today.\n\n4eye will log your answers and surface patterns over time.`,
};

export default function CastModal({ open, cast, topic, onClose }: CastModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(
    ref,
    () => {
      if (!open || !cast) return;
      gsap.from(".cast-body", { opacity: 0, y: 12, duration: 0.45, ease: "power2.out" });
      gsap.from(".cast-tag", {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.6)",
      });
    },
    [open, cast],
  );

  if (!cast) return null;
  const meta = CAST_META[cast];
  const transformed = TRANSFORMS[cast](topic);
  const Icon = meta.Icon;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { sx: { borderRadius: 3, border: "1px solid", borderColor: "divider" } }
      }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" spacing={1.5} sx={{
          alignItems: "center"
        }}>
          <Box
            className="cast-tag"
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${meta.color}1a`,
              color: meta.color,
            }}
          >
            <Icon fontSize="small" />
          </Box>
          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.18em", fontWeight: 700, lineHeight: 1, color: meta.color }}
            >
              {meta.label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, mt: 0.5 }}>
              {topic}
            </Typography>
          </Box>
        </Stack>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent ref={ref}>
        <Box
          className="cast-body"
          sx={{
            mt: 1,
            p: 2.5,
            bgcolor: "rgba(66,133,244,0.04)",
            border: "1px solid",
            borderColor: "primary.light",
            borderRadius: 2,
            fontFamily: cast === "expand" ? "monospace" : "inherit",
            fontSize: cast === "expand" ? 14 : 16,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            color: "text.primary",
          }}
        >
          {transformed}
        </Box>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip
            size="small"
            label="+5 XP awarded"
            sx={{
              bgcolor: "success.main",
              color: "success.contrastText",
              fontWeight: 700,
            }}
          />
          <Chip size="small" variant="outlined" label="Cast complete" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
