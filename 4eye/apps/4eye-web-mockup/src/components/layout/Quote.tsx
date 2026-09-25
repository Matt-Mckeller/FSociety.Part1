import { Stack, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export interface QuoteProps {
  quote: string;
  attribution?: string;
}

/**
 * Pull-quote block with quote-mark icon and optional attribution.
 * Pure content composition — wrap in a `<Section tone="muted">` for
 * page placement.
 */
export function Quote({ quote, attribution }: QuoteProps) {
  return (
    <Stack spacing={3} sx={{
      alignItems: "center"
    }}>
      <FormatQuoteIcon sx={{ fontSize: 56, color: "primary.main", opacity: 0.5 }} />
      <Typography
        variant="h3"
        sx={{ maxWidth: 800, fontWeight: 500, fontStyle: "italic" }}
      >
        “{quote}”
      </Typography>
      {attribution && (
        <Typography variant="subtitle1" sx={{
          color: "text.secondary"
        }}>
          — {attribution}
        </Typography>
      )}
    </Stack>
  );
}
