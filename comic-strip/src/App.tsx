import { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import HomeIcon from "@mui/icons-material/HomeRounded";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalkRounded";
import LocalCafeIcon from "@mui/icons-material/LocalCafeRounded";
import GridViewIcon from "@mui/icons-material/GridViewRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import {
  Navigation,
  Keyboard,
  Zoom,
  Thumbs,
  FreeMode,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import "./app.css";

import img1 from "../1-1.png";
import img2 from "../1-2.png";
import img3 from "../1-3.png";
import img4 from "../2-4.png";
import img5 from "../2-5.png";
import img6 from "../2-6.png";
import img7 from "../2-7.png";
import img8 from "../3-8.png";
import img9 from "../3-9.png";
import overview from "../comic-strip-meh.png";

type SceneKind = "bedroom" | "streets" | "cafe" | "overview";
type Slide = {
  src: string;
  alt: string;
  loop: 1 | 2 | 3 | "All";
  scene: string;
  kind: SceneKind;
};

const slides: Slide[] = [
  { src: img1, loop: 1, scene: "Bedroom", kind: "bedroom", alt: "Loop 1 — Bedroom" },
  { src: img2, loop: 1, scene: "Streets", kind: "streets", alt: "Loop 1 — Streets" },
  { src: img3, loop: 1, scene: "Cafe", kind: "cafe", alt: "Loop 1 — Cafe" },
  { src: img4, loop: 2, scene: "Bedroom", kind: "bedroom", alt: "Loop 2 — Bedroom" },
  { src: img5, loop: 2, scene: "Streets", kind: "streets", alt: "Loop 2 — Streets" },
  { src: img6, loop: 2, scene: "Cafe", kind: "cafe", alt: "Loop 2 — Cafe" },
  { src: img7, loop: 2, scene: "Cafe II", kind: "cafe", alt: "Loop 2 — Cafe (cont.)" },
  { src: img8, loop: 3, scene: "Bedroom", kind: "bedroom", alt: "Loop 3 — Bedroom" },
  { src: img9, loop: 3, scene: "Cafe", kind: "cafe", alt: "Loop 3 — Cafe" },
  { src: overview, loop: "All", scene: "Overview", kind: "overview", alt: "Full overview" },
];

const PANEL_COUNT = 9;

const SceneIcon = ({ kind, size = 14 }: { kind: SceneKind; size?: number }) => {
  const sx = { fontSize: size };
  if (kind === "bedroom") return <HomeIcon sx={sx} />;
  if (kind === "streets") return <DirectionsWalkIcon sx={sx} />;
  if (kind === "cafe") return <LocalCafeIcon sx={sx} />;
  return <GridViewIcon sx={sx} />;
};

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const active = slides[activeIndex];
  const progress =
    activeIndex < PANEL_COUNT ? ((activeIndex + 1) / PANEL_COUNT) * 100 : 100;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      stageRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key >= "1" && e.key <= "9") {
        mainSwiper?.slideTo(parseInt(e.key, 10) - 1);
      } else if (e.key === "0") {
        mainSwiper?.slideTo(9);
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mainSwiper]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Sticky top bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 3 }, py: 1.25 }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, lineHeight: 1.1 }}
            >
              Echoes of the Tide
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Loop Noir · 9 panels
            </Typography>
          </Box>
          <LoopProgress active={active.loop} activeIndex={activeIndex} />
        </Stack>
      </Box>

      {/* Stage */}
      <Box
        ref={stageRef}
        sx={{ px: { xs: 0, md: 2 }, py: 2, bgcolor: "background.default" }}
      >
        <Paper
          elevation={0}
          sx={{
            mx: "auto",
            maxWidth: 1400,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            position: "relative",
          }}
        >
          <Tooltip title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}>
            <IconButton
              size="small"
              onClick={toggleFullscreen}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 5,
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "#fff" },
                boxShadow: "0 1px 6px rgba(0,0,0,0.15)",
              }}
            >
              {isFullscreen ? (
                <FullscreenExitIcon fontSize="small" />
              ) : (
                <FullscreenIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Swiper
            modules={[Navigation, Keyboard, Zoom, Thumbs, EffectFade]}
            navigation
            keyboard={{ enabled: true }}
            zoom
            effect="fade"
            fadeEffect={{ crossFade: true }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            slidesPerView={1}
            onSwiper={setMainSwiper}
            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            style={
              {
                ["--swiper-theme-color" as string]: "#3f6cd1",
                ["--swiper-navigation-size" as string]: "28px",
              } as React.CSSProperties
            }
          >
            {slides.map((s) => (
              <SwiperSlide key={s.src}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: { xs: "55vh", md: "72vh" },
                    p: { xs: 2, md: 4 },
                  }}
                >
                  <div className="swiper-zoom-container">
                    <img
                      src={s.src}
                      alt={s.alt}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "72vh",
                        objectFit: "contain",
                        borderRadius: 8,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                      }}
                    />
                  </div>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Linear progress under image */}
          <Box sx={{ position: "relative", height: 3, bgcolor: "rgba(0,0,0,0.06)" }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                width: `${progress}%`,
                bgcolor: "primary.main",
                transition: "width .35s ease",
              }}
            />
          </Box>

          {/* Timeline */}
          <Box sx={{ bgcolor: "#fafafa", px: { xs: 1.5, md: 2 }, py: 2 }}>
            <Swiper
              modules={[Thumbs, FreeMode, Navigation]}
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView="auto"
              freeMode
              watchSlidesProgress
              navigation
              className="thumbs-swiper"
            >
              {slides.map((s, i) => {
                const isOverview = s.loop === "All";
                const startsLoop =
                  !isOverview && (i === 0 || slides[i - 1].loop !== s.loop);
                return (
                  <SwiperSlide
                    key={`thumb-${s.src}`}
                    style={{ width: isOverview ? 132 : 112 }}
                  >
                    <ThumbTile
                      slide={s}
                      index={i}
                      active={activeIndex === i}
                      sameLoopAsActive={!isOverview && s.loop === active.loop}
                      startsLoop={startsLoop}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 1.5 }}
            >
              ← → to navigate · 1–9 jumps to a panel · 0 = overview · F = fullscreen
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

function ThumbTile({
  slide,
  index,
  active,
  sameLoopAsActive,
  startsLoop,
}: {
  slide: Slide;
  index: number;
  active: boolean;
  sameLoopAsActive: boolean;
  startsLoop: boolean;
}) {
  const isOverview = slide.loop === "All";

  let opacity = 0.55;
  if (active) opacity = 1;
  else if (sameLoopAsActive || isOverview) opacity = 0.95;

  return (
    <Box sx={{ position: "relative", pt: startsLoop ? 2.25 : 0 }}>
      {startsLoop && (
        <Typography
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1,
            color:
              active || sameLoopAsActive ? "primary.main" : "text.secondary",
            textTransform: "uppercase",
          }}
        >
          Loop {slide.loop}
        </Typography>
      )}
      <Box
        sx={{
          position: "relative",
          cursor: "pointer",
          borderRadius: 1.5,
          overflow: "hidden",
          border: "2px solid",
          borderColor: active ? "primary.main" : "transparent",
          boxShadow: active
            ? "0 6px 18px rgba(63,108,209,0.4)"
            : "0 1px 3px rgba(0,0,0,0.08)",
          transform: active ? "scale(1.04)" : "scale(1)",
          opacity,
          transition:
            "border-color .15s, transform .18s, box-shadow .18s, opacity .18s",
          "&:hover": {
            transform: active ? "scale(1.04)" : "translateY(-2px)",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            backgroundImage: `url(${slide.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 4,
            left: 4,
            bgcolor: "rgba(0,0,0,0.72)",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            px: 0.75,
            py: 0.25,
            borderRadius: 0.75,
            letterSpacing: 0.4,
          }}
        >
          {isOverview ? "ALL" : index + 1}
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            px: 0.75,
            py: 0.5,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0))",
            color: "#fff",
          }}
        >
          <SceneIcon kind={slide.kind} />
          <Typography
            sx={{ fontSize: 10, fontWeight: 600, lineHeight: 1.2 }}
            noWrap
          >
            {slide.scene}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function LoopProgress({
  active,
  activeIndex,
}: {
  active: Slide["loop"];
  activeIndex: number;
}) {
  const loops: Array<{ n: 1 | 2 | 3; range: [number, number] }> = [
    { n: 1, range: [0, 2] },
    { n: 2, range: [3, 6] },
    { n: 3, range: [7, 8] },
  ];

  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      {loops.map(({ n, range }) => {
        const isActive = active === n;
        const total = range[1] - range[0] + 1;
        const positionInLoop = isActive ? activeIndex - range[0] + 1 : 0;
        return (
          <Stack key={n} alignItems="center" spacing={0.25}>
            <Stack direction="row" spacing={0.5}>
              {Array.from({ length: total }).map((_, i) => {
                const filled = isActive && i < positionInLoop;
                return (
                  <Box
                    key={i}
                    sx={{
                      width: 18,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: filled
                        ? "primary.main"
                        : isActive
                        ? "rgba(63,108,209,0.25)"
                        : "rgba(0,0,0,0.1)",
                      transition: "background-color .2s",
                    }}
                  />
                );
              })}
            </Stack>
            <Typography
              sx={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 0.6,
                color: isActive ? "primary.main" : "text.disabled",
              }}
            >
              LOOP {n}
            </Typography>
          </Stack>
        );
      })}
      <Box sx={{ width: 1, height: 28, bgcolor: "divider", mx: 0.5 }} />
      <Typography
        sx={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 0.6,
          color: active === "All" ? "primary.main" : "text.disabled",
        }}
      >
        OVERVIEW
      </Typography>
    </Stack>
  );
}
