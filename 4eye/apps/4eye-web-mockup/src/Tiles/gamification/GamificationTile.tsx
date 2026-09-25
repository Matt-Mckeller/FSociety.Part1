import { TileContainer } from "@expanse/hud"
import { Section, Hero, BulletList, Quote, CallToAction } from "@4eye/web/components/layout";
import { hero, pillars, quotes, cta } from "./content";
import { GamificationProfileSection } from "./GamificationProfileSection";

export default function GamificationTile() {
  return (
    <TileContainer mode="scroll">
      <Section id="hero" tone="accent">
        <Hero {...hero} />
      </Section>
      <Section id="list">
        <BulletList {...pillars} />
      </Section>
      <Section id="profile" tone="accent">
        <GamificationProfileSection />
      </Section>
      <Section id="quote" tone="muted">
        <Quote {...quotes[0]} />
      </Section>
      <Section id="quote-2" tone="muted">
        <Quote {...quotes[1]} />
      </Section>
      <Section id="cta" tone="accent">
        <CallToAction {...cta} />
      </Section>
    </TileContainer>
  );
}
