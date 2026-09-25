import { TileContainer } from "@expanse/hud"
import { Section, Hero, Quote, CallToAction } from "@4eye/web/components/layout";
import {
  hero,
  closingQuote,
  cta,
} from "./content";

export default function MarketingContentTile() {
  return (
    <TileContainer mode="scroll">
      <Section id="hero" tone="accent">
        <Hero {...hero} />
      </Section>
      <Section id="quote" tone="muted">
        <Quote {...closingQuote} />
      </Section>
      <Section id="cta" tone="accent">
        <CallToAction {...cta} />
      </Section>
    </TileContainer>
  );
}
