"use client";

import { Box, Typography } from "@mui/material";
import {
  DONATE_INTRO,
  DONATE_SECTIONS,
  TESTIMONY,
  type DonateSection,
} from "@yen/content/donate";

function SectionCard({ section }: { section: DonateSection }) {
  const playful = section.tone === "playful";

  return (
    <Box
      id={section.id}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        borderLeft: `3px solid ${section.accent}`,
        bgcolor: playful ? `${section.accent}0a` : "background.paper",
        scrollMarginTop: 24,
      }}
    >
      <Typography sx={{ fontSize: 19, fontWeight: 680, color: section.accent }}>
        {section.title}
      </Typography>
      <Typography sx={{ fontSize: 14.5, color: "text.secondary", mt: 0.5, mb: 1.75, fontStyle: playful ? "italic" : "normal" }}>
        {section.lede}
      </Typography>

      {section.body.map((p) => (
        <Typography key={p} sx={{ fontSize: 15, lineHeight: 1.65, mb: 1.25, maxWidth: "68ch" }}>
          {p}
        </Typography>
      ))}

      {section.items && (
        <Box component="ul" sx={{ m: 0, mt: 1, pl: 2.5, display: "grid", gap: 0.75 }}>
          {section.items.map((item) => (
            <Typography component="li" key={item} sx={{ fontSize: 15, lineHeight: 1.6 }}>
              {item}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}

export function DonateBoard() {
  return (
    <Box>
      <Box sx={{ mb: 4, maxWidth: "68ch" }}>
        {DONATE_INTRO.map((p) => (
          <Typography key={p} sx={{ fontSize: 16.5, lineHeight: 1.65, mb: 1.25 }}>
            {p}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { zero: "1fr", laptopL: "repeat(2, minmax(0, 1fr))" },
          alignItems: "start",
        }}
      >
        {DONATE_SECTIONS.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </Box>

      <Box
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 2,
          border: "1px dashed",
          borderColor: "divider",
          maxWidth: "72ch",
        }}
      >
        <Typography sx={{ fontSize: 19, fontWeight: 680, mb: 1.5 }}>
          {TESTIMONY.title}
        </Typography>
        {TESTIMONY.body.map((p) => (
          <Typography key={p} sx={{ fontSize: 15, lineHeight: 1.65, mb: 1.25, color: "text.secondary" }}>
            {p}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
