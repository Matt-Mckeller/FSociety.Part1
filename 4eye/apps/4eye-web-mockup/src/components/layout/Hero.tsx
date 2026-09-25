"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useGsap } from "@4eye/web/hooks/animation";

/**
 * Imperative handle exposed by {@link Hero}. Lets a parent restart the
 * entry timeline on demand (e.g. a "Replay" affordance).
 */
export interface HeroHandle {
  /** Restart the entry timeline from the beginning. */
  replay: () => void;
}

export interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  actionLabel?: string;
  /**
   * URL the action button should navigate to. Mutually exclusive with
   * `actionOnClick` — if both are provided, `actionOnClick` wins.
   */
  actionHref?: string;
  /**
   * Click handler for the action button. Use this when the button should
   * trigger an in-page state change rather than navigate. When provided,
   * the button is rendered as a `<button>` instead of a Next `<Link>`.
   */
  actionOnClick?: () => void;
  /**
   * Optional element rendered above the eyebrow (e.g. a mascot or logo).
   * Joins the entry timeline alongside the other hero elements.
   */
  mascot?: ReactNode;
  /** Hover/focus on the action button — useful for anticipatory effects. */
  onActionHover?: () => void;
  /** Click on the action button, fired before the action's own onClick/href. */
  onActionClick?: () => void;
  /** Optional icon rendered as the button's startIcon. */
  actionIcon?: ReactNode;
}

/**
 * Hero block — eyebrow, title, optional mascot/subtitle/CTA, animated
 * pulsing halo. Pure content composition — wrap in a `<Section>` for
 * page placement and tone.
 */
export const Hero = forwardRef<HeroHandle, HeroProps>(function Hero(
  {
    eyebrow,
    title,
    subtitle,
    actionLabel,
    actionHref,
    actionOnClick,
    mascot,
    onActionHover,
    onActionClick,
    actionIcon,
  },
  handleRef,
) {
  const ref = useRef<HTMLDivElement>(null);
  const entryTlRef = useRef<gsap.core.Timeline | null>(null);

  // Halo pulse — infinite ambient loop, separate context so it survives
  // replays of the entry timeline.
  useGsap(ref, () => {
    gsap.to(".hero-halo", {
      scale: 1.08,
      opacity: 0.55,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // Entry timeline — one-shot. Stored in a ref so `replay()` can call
  // `.restart()`. Built inside its own gsap.context so cleanup reverts
  // any from-state inline styles GSAP applied to the targets.
  useGsap(ref, () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-halo", { scale: 0.6, opacity: 0, duration: 0.9, ease: "power2.out" })
      .from(
        ".hero-mascot",
        { y: -16, opacity: 0, scale: 0.6, duration: 0.55, ease: "back.out(1.6)" },
        "-=0.7",
      )
      .from(".hero-eyebrow", { y: -12, opacity: 0, duration: 0.5 }, "-=0.4")
      .from(".hero-title", { y: 24, opacity: 0, scale: 0.94, duration: 0.7 }, "-=0.3")
      .from(".hero-subtitle", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(
        ".hero-action",
        { y: 12, opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.6)" },
        "-=0.25",
      );
    entryTlRef.current = tl;
    return () => {
      entryTlRef.current = null;
    };
  });

  useImperativeHandle(
    handleRef,
    () => ({
      replay: () => {
        entryTlRef.current?.restart();
      },
    }),
    [],
  );

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      {/* Soft pulsing accent halo behind the title */}
      <Box
        className="hero-halo"
        aria-hidden
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 320, md: 520 },
          height: { xs: 320, md: 520 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(25,118,210,0.18) 0%, rgba(25,118,210,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}>
        {mascot && (
          <Box className="hero-mascot" sx={{ display: "inline-flex", mb: -1 }}>
            {mascot}
          </Box>
        )}
        {eyebrow && (
          <Typography
            className="hero-eyebrow"
            variant="overline"
            color="primary"
            sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography
          className="hero-title"
          variant="h1"
          sx={{
            textAlign: "center",
            fontSize: { zero: "2.25rem", tablet: "3rem", laptop: "4rem" },
            lineHeight: 1.1,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Box
            className="hero-subtitle"
            sx={{ maxWidth: 720, textAlign: "center", color: "text.secondary" }}
          >
            {typeof subtitle === "string" ? (
              <Typography variant="h5" sx={{
                color: "inherit"
              }}>
                {subtitle}
              </Typography>
            ) : (
              subtitle
            )}
          </Box>
        )}
        {actionLabel && (actionOnClick || actionHref) && (
          <Button
            className="hero-action"
            {...(actionOnClick
              ? {
                  onClick: () => {
                    onActionClick?.();
                    actionOnClick();
                  },
                }
              : {
                  component: Link,
                  href: actionHref!,
                  onClick: onActionClick,
                })}
            onMouseEnter={onActionHover}
            onFocus={onActionHover}
            variant="contained"
            size="large"
            startIcon={actionIcon}
            sx={{ mt: 2, px: 4 }}
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
});
