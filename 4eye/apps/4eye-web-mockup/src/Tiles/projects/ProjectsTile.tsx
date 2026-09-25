import { TileContainer } from "@expanse/hud"
import { Section, Hero, BulletList, Quote, CallToAction } from "@4eye/web/components/layout";
import { StrategyOfferingsDetailSection } from "@4eye/web/components/strategy/StrategyOfferingsDetailSection";
import dynamic from "next/dynamic";
import {
  hero,
  topAreas,
  topStrategies,
  positioningQuote,
  cta,
} from "./content";

const DayToDaySection = dynamic(
  () => import("@4eye/web/Tiles/projects/DayToDaySection").then((m) => m.DayToDaySection),
  { ssr: false },
);

const PlanningSection = dynamic(
  () => import("@4eye/web/Tiles/projects/PlanningSection").then((m) => m.PlanningSection),
  { ssr: false },
);

export default function ProjectsTile() {
  return (
    <TileContainer mode="scroll">
      <Section id="hero" tone="accent">
        <Hero {...hero} />
      </Section>
      <Section id="live-planning">
        <PlanningSection />
      </Section>
      <Section id="areas">
        <BulletList {...topAreas} />
      </Section>
      <Section id="strategies">
        <BulletList {...topStrategies} />
      </Section>
      <Section id="offerings-detail">
        <StrategyOfferingsDetailSection />
      </Section>
      <Section id="quote" tone="muted">
        <Quote {...positioningQuote} />
      </Section>
      <Section id="day-to-day">
        <DayToDaySection />
      </Section>
      <Section id="cta" tone="accent">
        <CallToAction {...cta} />
      </Section>
    </TileContainer>
  );
}
