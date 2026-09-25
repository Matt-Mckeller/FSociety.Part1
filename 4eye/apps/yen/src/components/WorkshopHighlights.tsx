"use client";

import { Container } from "@mui/material";
import {
  WORKSHOP_CONCEPT_BANDS,
  WORKSHOP_CONCEPTS,
  workshopConceptsInBand,
} from "@yen/content/workshop-concepts";
import { PureTextCatalogue } from "./PureTextCatalogue";

/**
 * Workshop concepts — Learning, Currency, Equipment, Quests, Progression, Gamification.
 *
 * Reading-first: expanded by default, clearer bands, Learning leads. Sits above
 * the workshop AppTiles.
 */
export function WorkshopHighlights() {
  const bands = WORKSHOP_CONCEPT_BANDS.map((b) => ({
    id: b.id,
    label: b.label,
    blurb: b.blurb,
    items: workshopConceptsInBand(b.id).map((c) => ({
      id: c.id,
      title: c.title,
      blurb: c.blurb,
      href: c.href,
      rarity: c.rarity,
      chip: c.chip,
      note: c.note,
      legendaryTitle:
        c.id === "learning"
          ? "Start here · Learning loop"
          : c.id === "gamification"
            ? "Legendary · Gamification spine"
            : c.id === "cc-docs"
              ? "Legendary · Command Center documentation"
              : undefined,
    })),
  }));

  return (
    <PureTextCatalogue
      eyebrow={`How it works · ${WORKSHOP_CONCEPTS.length} cards`}
      intro="Start with Learning if you are new. Each card is one idea — open it to read, then use Open in the product for the live screens."
      footer="Core ideas explain · Open in the product runs · Written out goes deeper · grayed AppTiles below are inventory only"
      bands={bands}
      defaultExpanded
      readable
      maxHeight={{ zero: 420, tablet: 480, laptop: 520 }}
      storageKey="yen.workshopCatalogue.expanded.v2"
    />
  );
}

export function WorkshopHighlightsBand() {
  return (
    <Container maxWidth="laptopL" sx={{ pt: 2 }}>
      <WorkshopHighlights />
    </Container>
  );
}
