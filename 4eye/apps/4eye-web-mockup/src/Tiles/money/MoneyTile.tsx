import { TileContainer } from "@expanse/hud"
import { Section, Hero, BulletList, CallToAction } from "@4eye/web/components/layout";
import { hero, model, cta } from "./content";

export default function MoneyTile() {
  return (
    <TileContainer mode="scroll">
      <Section id="hero" tone="accent">
        <Hero {...hero} />
      </Section>
      <Section id="model">
        <BulletList {...model} />
      </Section>
      <Section id="cta" tone="accent">
        <CallToAction {...cta} />
      </Section>
    </TileContainer>
  );
}
