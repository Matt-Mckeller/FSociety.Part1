/**
 * Inspirational Quotes Section
 *
 * Displays inspirational quotes and their relevance.
 */

import {
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Paper,
  Divider,
} from "@mui/material"
import { designNotes } from "../../../../data/docs"
import { DocSection } from "../../common"

interface InspirationalQuote {
  quote: string
  author?: string
  source?: string
  relevance: string
}

export default function InspirationalQuotes() {
  const { inspirationalQuotes } = designNotes

  return (
    <DocSection title={`💬 ${inspirationalQuotes.title}`}>
      <Grid container spacing={2}>
        {inspirationalQuotes.quotes.map(
          (quote: InspirationalQuote, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Paper sx={{ p: 2, bgcolor: "action.hover", mb: 2 }}>
                    <Typography variant="body1" fontStyle="italic">
                      "{quote.quote}"
                    </Typography>
                  </Paper>
                  {quote.author && (
                    <Typography variant="subtitle2" color="primary">
                      — {quote.author}
                    </Typography>
                  )}
                  {quote.source && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Source: {quote.source}
                    </Typography>
                  )}
                  <Divider sx={{ my: 1 }} />
                  <Alert severity="success">
                    <Typography variant="body2">{quote.relevance}</Typography>
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </DocSection>
  )
}
