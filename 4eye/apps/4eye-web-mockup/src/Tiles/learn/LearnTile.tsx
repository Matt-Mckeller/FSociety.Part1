import { TileContainer } from "@expanse/hud"
import { Section, Hero, FeatureCardGrid, Quote, CallToAction } from "@4eye/web/components/layout";
import { hero, projects, marketingQuote, cta } from "./content";

export default function LearnTile() {
  return (
    <TileContainer mode="scroll">
      <Section id="hero" tone="accent">
        <Hero {...hero} />
      </Section>
      <Section id="grid" maxWidth="lg">
        <FeatureCardGrid {...projects} />
      </Section>
      <Section id="marketing-quote" tone="muted">
        <Quote {...marketingQuote} />
      </Section>
      <Section id="cta" tone="accent">
        <CallToAction {...cta} />
      </Section>
    </TileContainer>
  );
}
