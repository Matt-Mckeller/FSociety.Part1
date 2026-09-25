import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

// ─── Root ────────────────────────────────────────────────────────────────────

/** Full-width container that holds the animated ref for GSAP. */
export const SlideRoot = styled(Box)({
  position: "relative",
  width: "100%",
});

// ─── Title area ──────────────────────────────────────────────────────────────

/** Vertically-stacked heading section above the hero. */
export const TitleSection = styled(Stack)({
  marginBottom: "clamp(6px, 1.5vh, 20px)",
});
TitleSection.defaultProps = {
  spacing: 1,
  alignItems: "center",
  textAlign: "center",
};

/** Horizontal + vertical centred group that holds the two headline lines. */
export const TitleLineGroup = styled(Stack)({
  maxWidth: 1100,
});
TitleLineGroup.defaultProps = {
  spacing: 0.25,
  alignItems: "center",
};

/**
 * First headline: "Control Attention." — base brand size.
 * Uses `min(vw, vh)` so font scales with whichever viewport axis is smaller,
 * keeping the headline from eating the slide height on short viewports.
 */
export const HeadingLine = styled(Typography)({
  fontSize: "clamp(1.3rem, min(4.2vw, 5.2vh), 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
});

/** Second headline: "Control Your Mind." — slightly larger, primary accent. */
export const AccentHeadingLine = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1.5rem, min(5vw, 6vh), 4rem)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: theme.palette.primary.main,
}));

// ─── Hero ─────────────────────────────────────────────────────────────────────

/** Relative-positioned frame that contains the glow backdrop + character. */
export const HeroSection = styled(Box)({
  position: "relative",
  marginBottom: "clamp(6px, 1.5vh, 20px)",
});

/**
 * Full-bleed radial glow layered behind the controller character.
 * Duo preset: soft purple cloud centre, wider blue halo.
 */
export const BackdropGlow = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "180%",
  height: "180%",
  background: [
    "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(139,92,246,0.16) 0%, transparent 70%)",
    "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(59,130,246,0.09) 0%, transparent 80%)",
  ].join(", "),
  pointerEvents: "none",
  zIndex: 0,
});

/** Stacking context wrapper that lifts the character above the glow. */
export const CharacterWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
});

// ─── Brain-wiring strip ───────────────────────────────────────────────────────

/** Bottom margin wrapper for the BrainWiringStrip. */
export const BrainStripSection = styled(Box)({
  marginBottom: "clamp(8px, 2vh, 24px)",
});

// ─── Topic labels ─────────────────────────────────────────────────────────────

/** Outer row that centres the topic label grid horizontally. */
export const TopicLabelsSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

/** Flex column that stacks the two label rows with a small gap. */
export const TopicLabelGrid = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px", // 0.5 × 8px — text-list tighter row gap
});

/** One horizontal row of topic labels. `wrap` allows the first row to reflow. */
export const TopicLabelRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "wrap",
})<{ wrap?: boolean }>(({ wrap }) => ({
  display: "flex",
  flexWrap: wrap ? "wrap" : "nowrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px", // 2 × 8px — text-list spacing between labels
}));

/**
 * Individual topic label rendered as plain text (text-list style).
 * Mono-dark tint: slate-700 text, no background or border chrome.
 */
export const TopicLabel = styled(Box)({
  paddingLeft: "6px",   // 0.75 spacing units
  paddingRight: "6px",
  paddingTop: "2px",    // 0.25 spacing units
  paddingBottom: "2px",
  borderRadius: 0,
  backgroundColor: "transparent",
  color: "#334155",
  border: "none",
  boxShadow: "none",
  fontWeight: 600,
  fontSize: "clamp(0.8rem, min(1.1vw, 1.6vh), 1.1rem)",
  letterSpacing: "0.005em",
});

// ─── Focus chip ───────────────────────────────────────────────────────────────

/**
 * 3-layer expanding ring: three blue halos pulse outward in staggered
 * phases, matching the primary brand colour.
 */
const focusRingExpand = keyframes`
  0%   { box-shadow: 0 0 0  0px rgba(25,118,210,0.65),
                     0 0 0  0px rgba(25,118,210,0.40),
                     0 0 0  0px rgba(25,118,210,0.20); }
  30%  { box-shadow: 0 0 0  5px rgba(25,118,210,0.28),
                     0 0 0  0px rgba(25,118,210,0.40),
                     0 0 0  0px rgba(25,118,210,0.20); }
  60%  { box-shadow: 0 0 0 11px rgba(25,118,210,0.00),
                     0 0 0  5px rgba(25,118,210,0.28),
                     0 0 0  0px rgba(25,118,210,0.20); }
  90%  { box-shadow: 0 0 0 11px rgba(25,118,210,0.00),
                     0 0 0 11px rgba(25,118,210,0.00),
                     0 0 0  5px rgba(25,118,210,0.28); }
  100% { box-shadow: 0 0 0 11px rgba(25,118,210,0.00),
                     0 0 0 11px rgba(25,118,210,0.00),
                     0 0 0 11px rgba(25,118,210,0.00); }
`;

/**
 * Vibrant chip variant — rendered when focus mode is active.
 * All chips use the theme primary blue; `colorIndex` drives stagger only.
 */
export const FocusTopicLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "colorIndex",
})<{ colorIndex: number }>(({ theme, colorIndex }) => ({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  fontWeight: 700,
  borderRadius: "20px",
  paddingLeft: "14px",
  paddingRight: "14px",
  paddingTop: "4px",
  paddingBottom: "4px",
  fontSize: "clamp(0.8rem, min(1.1vw, 1.6vh), 1.1rem)",
  letterSpacing: "0.01em",
  animation: `${focusRingExpand} 2s ease-out infinite`,
  animationDelay: `${colorIndex * 0.18}s`,
  transition: "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
}));

/** Trailing italic "and more" hint at the end of the second label row. */
export const AndMoreLabel = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  fontSize: "clamp(0.75rem, min(1vw, 1.5vh), 1.05rem)",
  marginLeft: "4px",
  color: theme.palette.text.secondary,
}));
