"use client";

import React from "react";
import { Box, Stack, Typography, Paper } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import gsap from "gsap";
import { ActionOrb, useRegisterHudChromeHide } from "@expanse/hud"
import GoalToggle from "./GoalToggle";
import CastModal, { type CastKey } from "./CastModal";
import { useMarketingProgress } from "@4eye/web/components/marketing-progress";
import { useGsap } from "@4eye/web/hooks/animation";
import { useOnLeaveViewport } from "@4eye/web/hooks/dom";

type LifeContext = "school" | "learning" | "healing" | "work" | "life" | "everyone";

const OPTIONS: { key: LifeContext; label: string }[] = [
  { key: "school", label: "School" },
  { key: "learning", label: "Learning" },
  { key: "healing", label: "Healing" },
  { key: "work", label: "Work" },
  { key: "life", label: "Life" },
  { key: "everyone", label: "For Everyone" },
];

const CONTENT: Record<
  LifeContext,
  { headline: string; bullets: string[] }
> = {
  school: {
    headline: "The future of learning and school",
    bullets: [
      "Autonomy in how you learn",
      "Real engagement, not compliance",
      "Customized learning experiences for each student",
    ],
  },
  learning: {
    headline: "The future of learning",
    bullets: [
      "Learn while living",
      "Maximized retention via gamification",
      "Plan and learn with AGI assistance",
    ],
  },
  healing: {
    headline: "The future of healing",
    bullets: [
      "Control your own mind",
      "Build patient, resilient routines",
      "Replace conflict with playful signal",
    ],
  },
  work: {
    headline: "The future of work",
    bullets: [
      "Improved time management",
      "Better communication with teams",
      "Get more out of every hour",
    ],
  },
  life: {
    headline: "The future of life",
    bullets: [
      "Improved relationships",
      "Improved pleasure and presence",
      "Become who you want to be",
    ],
  },
  everyone: {
    headline: "For everyone",
    bullets: [
      "Become a master of life",
      "Improved relationships, time, and pleasure",
      "Plan and learn with AGI assistance",
    ],
  },
};

function BenefitsPanel({ active }: { active: LifeContext }) {
  const ref = useRef<HTMLDivElement>(null);
  const c = CONTENT[active];

  useGsap(
    ref,
    () => {
      gsap.from(".fut-headline", { y: 12, opacity: 0, duration: 0.4 });
      gsap.from(".fut-line", {
        x: -12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.1,
      });
    },
    [active],
  );

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        className="fut-headline"
        variant="h4"
        sx={{ fontWeight: 700, mb: 2 }}
      >
        {c.headline}
      </Typography>
      <Stack spacing={1.25}>
        {c.bullets.map((b) => (
          <Stack
            key={b}
            className="fut-line"
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "flex-start"
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "primary.main",
                mt: 1.25,
                flexShrink: 0,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {b}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

const CAST_ORBS: { key: CastKey; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "visualize", label: "Visualize", icon: <VisibilityIcon />,    color: "#3b82f6" },
  { key: "story",     label: "Story",     icon: <AutoStoriesIcon />,   color: "#22c55e" },
  { key: "expand",    label: "Expand",    icon: <OpenInFullIcon />,    color: "#f97316" },
  { key: "reflect",   label: "Reflect",   icon: <PsychologyAltIcon />, color: "#a855f7" },
];

export interface FutureBenefitsProps {
  /**
   * When true (default), hides the HUD bottom orb bar while this block is
   * mounted so cast orbs read as the main target. Disable on standalone
   * pages (e.g. `/projects`) so global HUD chrome stays intact.
   */
  registerCastOrbChromeHide?: boolean;
}

export function FutureBenefits({
  registerCastOrbChromeHide = true,
}: FutureBenefitsProps) {
  const [active, setActive] = useState<LifeContext>("school");
  const [cast, setCast] = useState<CastKey | null>(null);
  const { addXp, awardOnce } = useMarketingProgress();

  // Hide the HUD's bottom orb bar while this slide is on-screen so the
  // in-slide cast orbs read as the primary action target.
  useRegisterHudChromeHide({
    id: "future-of-cast-orbs",
    hide: registerCastOrbChromeHide ? ["bottomOrbBar"] : [],
    label: "FutureBenefits cast orbs",
  });

  // Refs for fly-down animation on slide-out.
  const orbRowRef = useRef<HTMLDivElement | null>(null);
  const orbRefs = useRef<Array<HTMLDivElement | null>>([]);

  // When the slide leaves the viewport, fly each cast orb DOWN toward where
  // the HUD orb bar lives (bottom-center). The HUD bar reappears via the
  // chrome-hide registration being released on unmount; this animation gives
  // the user a visual handoff cue before that happens.
  const onLeave = useCallback(() => {
    const targetY = (typeof window !== "undefined" ? window.innerHeight : 800);
    orbRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: targetY * 0.45,
        scale: 0.55,
        opacity: 0,
        duration: 0.55,
        delay: i * 0.04,
        ease: "power3.in",
      });
    });
  }, []);
  const onReturn = useCallback(() => {
    orbRefs.current.forEach((el) => {
      if (el) gsap.set(el, { clearProps: "transform,opacity" });
    });
  }, []);
  useOnLeaveViewport(orbRowRef, onLeave, { onReturn, threshold: 0.05 });

  const handleCast = (key: CastKey) => {
    setCast(key);
    awardOnce(`cast:${key}:${active}`, () => addXp(5));
  };

  return (
    <>
      <Stack spacing={4} sx={{ width: "100%" }}>
        <Stack
          spacing={1}
          sx={{
            alignItems: "center",
            textAlign: "center"
          }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ letterSpacing: "0.16em", fontWeight: 700 }}
          >
            The Future Of...
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800 }}>
            Pick a future. Cast a transform.
          </Typography>
        </Stack>

        <GoalToggle<LifeContext>
          options={OPTIONS}
          value={active}
          onChange={setActive}
          renderPanel={(k) => <BenefitsPanel active={k} />}
        />

        {/* Cast orbs — appear after picking a future. Pushed lower so the
            row reads as its own band beneath the future panel. */}
        <Stack
          spacing={1.25}
          sx={{
            alignItems: "center",
            pt: { xs: 4, md: 6 }
          }}>
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.16em",
              fontWeight: 700
            }}>
            Cast a transform on this future
          </Typography>
          <Stack
            ref={orbRowRef}
            direction="row"
            spacing={3}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
            {CAST_ORBS.map((o, i) => (
              <Box
                key={o.key}
                ref={(el: HTMLDivElement | null) => {
                  orbRefs.current[i] = el;
                }}
                sx={{ display: "inline-flex", willChange: "transform, opacity" }}
              >
                <ActionOrb
                  icon={o.icon}
                  label={o.label}
                  showInlineLabel
                  labelPosition="below"
                  variant="glow"
                  shape="circle"
                  size="lg"
                  color={o.color}
                  onClick={() => handleCast(o.key)}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <CastModal
        open={cast !== null}
        cast={cast}
        topic={CONTENT[active].headline}
        onClose={() => setCast(null)}
      />
    </>
  );
}

export default FutureBenefits;
