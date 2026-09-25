"use client";

import { Stack } from "@mui/material";
import GoalToggle from "@4eye/web/components/strategy/offerings/GoalToggle";
import { OfferingsBlocksPanel } from "@4eye/web/components/strategy/offerings/OfferingsBlocksPanel";
import { FutureBenefits } from "@4eye/web/components/strategy/offerings/FutureBenefits";
import {
  OFFERING_GOAL_OPTIONS,
  type OfferingGoalKey,
} from "@4eye/web/components/strategy/offerings/offerings-blocks";
import { SlideHeader } from "@4eye/web/Tiles/home/shared/SlideHeader";

/**
 * Full offerings grid + future-cast experience, mounted on `/projects`
 * so the home Offerings slide can stay a tight brand beat (wordplay +
 * modality cluster).
 */
export function StrategyOfferingsDetailSection() {
  return (
    <Stack spacing={{ xs: 4, md: 5 }} sx={{ width: "100%", py: 2 }}>
      <SlideHeader
        eyebrow="Our Offerings"
        title="Configure your human and maximize learning."
        subtitle="Learn, Earn, and Compete. In Person and Online."
        align="flex-start"
      />

      <GoalToggle<OfferingGoalKey>
        options={OFFERING_GOAL_OPTIONS}
        defaultKey="all"
        renderPanel={(k) => <OfferingsBlocksPanel active={k} />}
      />

      <FutureBenefits registerCastOrbChromeHide={false} />
    </Stack>
  );
}
