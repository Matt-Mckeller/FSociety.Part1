"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { SlideShell } from "@4eye/web/Tiles/home/slides/shared";
import {
  VisionControlCharacter,
  BrainStripPulseProvider,
  BrainWiringStrip,
} from "@expanse/character/vision";
import { Achievement, CoinBurst } from "./vision-brand";
import { SlideHeader } from "@4eye/web/Tiles/home/shared/SlideHeader";
import { useGsap } from "@4eye/web/hooks/animation";
import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { ControlActionBar } from "./ControlActionBar";
import {
  UNIFIED,
  VARIANT_MAP,
  CHIP_LABEL_SETS,
  CONTROLLER_POSITION_BOTTOM,
  stripTintTokens,
  type ChipLabelSetName,
} from "./variants";
import {
  SlideRoot,
  TitleSection,
  TitleLineGroup,
  HeadingLine,
  AccentHeadingLine,
  HeroSection,
  BackdropGlow,
  CharacterWrapper,
  BrainStripSection,
  TopicLabelsSection,
  TopicLabelGrid,
  TopicLabelRow,
  TopicLabel,
  FocusTopicLabel,
  AndMoreLabel,
} from "./controlSlideStyled";

export interface ControlSlideProps {
  /**
   * Which named variant to render. Resolves against VARIANT_MAP;
   * falls back to "unified" if the id is not found.
   */
  variantId?: string;
}

export default function ControlSlide({ variantId = "unified" }: ControlSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [chipLabelSet, setChipLabelSet] = useState<ChipLabelSetName | null>(null);
  const { activeId } = useSlideshow();
  const isActive = activeId === "control";

  // Resolve variant config — fall back to UNIFIED if unknown id
  const variantConfig = VARIANT_MAP[variantId] ?? UNIFIED;
  const activeChipLabelSet = chipLabelSet ?? variantConfig.chipLabelSet;
  const stripTokens = stripTintTokens(variantConfig.strip);
  const chipLabels = CHIP_LABEL_SETS[activeChipLabelSet];

  // Auto-enable focus mode 5 s after the slide becomes active;
  // reset when navigating away so the animation replays on return.
  useEffect(() => {
    if (!isActive) {
      setFocusMode(false);
      return;
    }
    const timer = setTimeout(() => setFocusMode(true), 5000);
    return () => clearTimeout(timer);
  }, [isActive]);

  // Reset per-slide state when the variant changes
  useEffect(() => {
    setFocusMode(false);
    setChipLabelSet(null);
  }, [variantId]);

  useGsap(ref, () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".play-title", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 })
      .from(".play-tagline", { y: 12, opacity: 0, duration: 0.45, stagger: 0.12 }, "-=0.2")
      .from(".play-cta", { scale: 0.95, opacity: 0, duration: 0.4, ease: "back.out(1.6)" }, "-=0.1");
  });

  const chipLabelSetNames: ChipLabelSetName[] = ["pillars", "skills", "habits", "brand"];
  const handleToggleChipSet = () => {
    setChipLabelSet((prev) => {
      const current = prev ?? variantConfig.chipLabelSet;
      const idx = chipLabelSetNames.indexOf(current);
      return chipLabelSetNames[(idx + 1) % chipLabelSetNames.length] ?? current;
    });
  };

  return (
    <SlideShell tone="default" maxWidth="lg" id="play">
      <ControlActionBar
        focusMode={focusMode}
        onToggleFocus={() => setFocusMode((f) => !f)}
        chipLabelSet={activeChipLabelSet}
        onToggleChipSet={handleToggleChipSet}
      />
      <BrainStripPulseProvider>
        <SlideRoot ref={ref}>
          {/* ── Headline ──────────────────────────────────────────────── */}
          <TitleSection>
            <SlideHeader
              eyebrow="Play"
              eyebrowClassName="play-title"
              titleClassName="play-title"
              titleSlot={
                <TitleLineGroup>
                  <HeadingLine className="play-title" component="h2" color="text.primary">
                    Control Attention.
                  </HeadingLine>
                  <AccentHeadingLine className="play-title" component="h2">
                    Control Your Mind.
                  </AccentHeadingLine>
                </TitleLineGroup>
              }
            />
          </TitleSection>
          {/* ── Controller character ──────────────────────────────────── */}
          <HeroSection className="play-title">
            <BackdropGlow
              aria-hidden="true"
              sx={variantConfig.backdropGlow ? { background: variantConfig.backdropGlow } : undefined}
            />
            <CharacterWrapper>
              <VisionControlCharacter
                controllerPalette={variantConfig.controllerPalette}
                device={variantConfig.device}
                gamification={variantConfig.gamification}
                animationVariant={variantConfig.animationVariant}
                controllerPositionPct={CONTROLLER_POSITION_BOTTOM[variantConfig.controllerPosition]}
                xpLabel={variantConfig.xpLabel}
                achievementSlot={<Achievement label="Interact!" />}
                coinBurstSlot={<CoinBurst />}
              />
            </CharacterWrapper>
          </HeroSection>
          {/* ── Brain-wiring strip ────────────────────────────────────── */}
          <BrainStripSection className="play-title">
            <BrainWiringStrip
              lineColor={stripTokens.lineColor}
              nodeOverride={stripTokens.nodeOverride}
            />
          </BrainStripSection>
          {/* ── Topic pillar labels ───────────────────────────────────── */}
          <TopicLabelsSection className="play-cta">
            <TopicLabelGrid>
              <TopicLabelRow wrap>
                {chipLabels.slice(0, 6).map((topic, i) =>
                  focusMode ? (
                    <FocusTopicLabel key={topic} colorIndex={i}>{topic}</FocusTopicLabel>
                  ) : (
                    <TopicLabel key={topic}>{topic}</TopicLabel>
                  )
                )}
              </TopicLabelRow>
              <TopicLabelRow>
                {chipLabels.slice(6).map((topic, i) =>
                  focusMode ? (
                    <FocusTopicLabel key={topic} colorIndex={i + 6}>{topic}</FocusTopicLabel>
                  ) : (
                    <TopicLabel key={topic}>{topic}</TopicLabel>
                  )
                )}
                <AndMoreLabel>and more</AndMoreLabel>
              </TopicLabelRow>
            </TopicLabelGrid>
          </TopicLabelsSection>
        </SlideRoot>
      </BrainStripPulseProvider>
    </SlideShell>
  );
}
