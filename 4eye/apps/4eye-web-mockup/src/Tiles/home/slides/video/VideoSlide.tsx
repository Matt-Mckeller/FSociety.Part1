"use client";

import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useCallback, useRef, useState } from "react";
import { useGsap } from "@4eye/web/hooks/animation";
import gsap from "gsap";
import { useExploration } from "@4eye/web/components/exploration";
import { SlideShell } from "@4eye/web/Tiles/home/slides/shared";
import { VideoActionBar } from "./VideoActionBar";

export default function VideoSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const { exploreOnce } = useExploration();

  const handlePlay = useCallback(() => {
    exploreOnce("media:home-reel-watched");
  }, [exploreOnce]);

  const handleMuteToggle = useCallback(() => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  }, [muted]);

  // Overlay text enters after a short delay so the first video frame
  // has a chance to render and the text doesn't clash with a blank screen.
  useGsap(ref, () => {
    gsap.from(".video-eyebrow", {
      y: -10,
      opacity: 0,
      duration: 0.5,
      delay: 0.4,
      ease: "power2.out",
    });
    gsap.from(".video-tagline", {
      y: 12,
      opacity: 0,
      duration: 0.6,
      delay: 0.6,
      ease: "power3.out",
    });
    gsap.from(".video-mute-btn", {
      opacity: 0,
      duration: 0.4,
      delay: 1.0,
      ease: "power2.out",
    });
  });

  return (
    <SlideShell tone="default" id="video" maxWidth={false}>
      <VideoActionBar />

      {/* Full-height video container */}
      <Box
        ref={ref}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          bgcolor: "#000",
        }}
      >
        {/* Centered player. `poster` paints a meaningful first frame
            immediately (the video's own opening frame is black, and iOS
            Safari won't render any frame without a poster) so the slide
            never flashes black while the video buffers. */}
        <Box
          component="video"
          ref={videoRef}
          src="/videos/intro-opener.mp4"
          poster="/images/intro-opener-poster.jpg"
          preload="metadata"
          autoPlay
          muted
          loop={false}
          playsInline
          controls
          onPlay={handlePlay}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            display: "block",
            // Hide the browser's built-in mute button since we supply our own
            // (works in most browsers via the custom overlay pattern)
          }}
        />

        {/* Minimal text overlay — top-left eyebrow + tagline */}
        <Stack
          spacing={0.5}
          sx={{
            position: "absolute",
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 28 },
            pointerEvents: "none",
          }}
        >
          <Typography
            className="video-eyebrow"
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.70)",
              letterSpacing: "0.22em",
              fontWeight: 700,
              fontSize: "0.65rem",
              lineHeight: 1,
            }}
          >
            4eye
          </Typography>
          <Typography
            className="video-tagline"
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.2,
              textShadow: "0 1px 6px rgba(0,0,0,0.55)",
            }}
          >
            The classrooms of tomorrow, available soon.
          </Typography>
        </Stack>

        {/* Mute toggle — bottom-right corner */}
        <Tooltip title={muted ? "Unmute" : "Mute"} placement="top">
          <IconButton
            className="video-mute-btn"
            onClick={handleMuteToggle}
            size="small"
            sx={{
              position: "absolute",
              bottom: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
              bgcolor: "rgba(0,0,0,0.45)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,0,0,0.65)" },
              backdropFilter: "blur(4px)",
            }}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </SlideShell>
  );
}
