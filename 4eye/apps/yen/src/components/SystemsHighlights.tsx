"use client";

import { Container } from "@mui/material";
import {
  SYSTEM_BANDS,
  SYSTEM_HIGHLIGHTS,
  highlightsInBand,
} from "@yen/content/systems-highlights";
import { PureTextCatalogue, QuietLegendaryMark } from "./PureTextCatalogue";

export { QuietLegendaryMark };

/**
 * Tech highlights for The systems underneath — Pure text only.
 * Shared catalogue chrome lives in {@link PureTextCatalogue}.
 */
export function SystemsHighlights() {
  const bands = SYSTEM_BANDS.map((b) => ({
    id: b.id,
    label: b.label,
    blurb: b.blurb,
    items: highlightsInBand(b.id).map((h) => ({
      id: h.id,
      title: h.title,
      blurb: h.blurb,
      href: h.href,
      rarity: h.rarity,
      chip: h.chip,
      note: h.note,
      legendaryTitle:
        h.id === "web4"
          ? "Legendary · Web 4 intro"
          : h.id === "processes"
            ? "Legendary · Processes"
            : undefined,
    })),
  }));

  return (
    <PureTextCatalogue
      eyebrow={`Pure text · ${SYSTEM_HIGHLIGHTS.length} entries`}
      footer="Web 4 leads · Symbol Grid is an example, not the final OS · Show all drops the clip into page scroll"
      bands={bands}
      maxHeight={{ zero: 420, tablet: 460, laptop: 520 }}
      storageKey="yen.systemsCatalogue.expanded"
    />
  );
}

/** Thin wrapper when systems highlights need the page container alone. */
export function SystemsHighlightsBand() {
  return (
    <Container maxWidth="laptopL" sx={{ pt: 2 }}>
      <SystemsHighlights />
    </Container>
  );
}
