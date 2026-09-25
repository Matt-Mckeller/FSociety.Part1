"use client";

/**
 * CatalogSlideContent — the visible body of the Catalog slide.
 *
 * Reads everything it needs from {@link CatalogSlideContext}; the outer
 * `<CatalogSlide />` shell is just composition + state wiring.
 */

import { Box, Stack } from "@mui/material";
import { BrandWordplayHeadline } from "@4eye/web/Tiles/home/shared/BrandWordplay";
import { SlideHeader } from "@4eye/web/Tiles/home/shared/SlideHeader";
import { ModalityPlusGrid } from "../modalities";
import { useCatalogSlideContext } from "../state/CatalogSlideContext";

export function CatalogSlideContent() {
  const { eyebrow, isActive, pillsVisible, markFinalStageReached } =
    useCatalogSlideContext();

  return (
    <Stack spacing={{ xs: 4, md: 5 }} sx={{ width: "100%" }}>
      <SlideHeader
        eyebrow={eyebrow}
        titleSlot={
          <BrandWordplayHeadline
            isActive={isActive}
            holdSecByStage={[1.05, 1.08, 1.42, 1.08]}
            sx={{
              fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
            onFinalStageReached={markFinalStageReached}
          />
        }
      />
      <Box
        sx={{
          width: "100%",
          height: "20px"
        }} />
      {/* Modality plus grid — revealed once the wordplay animation settles. */}
      <Box
        sx={{
          opacity: pillsVisible ? 1 : 0,
          transform: pillsVisible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
          pointerEvents: pillsVisible ? "auto" : "none",
          display: "flex",
          justifyContent: "center",
          mt: { xs: 3, md: 4 },
        }}
      >
        <ModalityPlusGrid />
      </Box>
    </Stack>
  );
}

export default CatalogSlideContent;
