/**
 * Game Personalization Section
 *
 * Displays customization categories, rarity system, and collectibles.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
} from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection, DocAccordion } from "../../common"

interface PersonalizationCategory {
  name: string
  description: string
  status?: string
  mechanics?: string
  examplePerks?: string[]
}

export default function GamePersonalization() {
  const { personalization } = gameMechanics

  return (
    <DocSection title={`🎨 ${personalization.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {personalization.description}
      </Typography>

      <DocAccordion title="🎭 Customization Categories" defaultExpanded>
        <Grid container spacing={2}>
          {personalization.categories.map(
            (cat: PersonalizationCategory, i: number) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {cat.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {cat.description}
                    </Typography>
                    {cat.status && (
                      <Chip label={cat.status} size="small" sx={{ mr: 1 }} />
                    )}
                    {cat.mechanics && (
                      <Alert severity="info" sx={{ mt: 1 }}>
                        <Typography variant="caption">
                          {cat.mechanics}
                        </Typography>
                      </Alert>
                    )}
                    {cat.examplePerks && cat.examplePerks.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" fontWeight={600}>
                          Example Perks:
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                          {cat.examplePerks.slice(0, 3).map((perk, j) => (
                            <li key={j}>
                              <Typography variant="caption">{perk}</Typography>
                            </li>
                          ))}
                          {cat.examplePerks.length > 3 && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              +{cat.examplePerks.length - 3} more...
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </DocAccordion>

      <DocAccordion title="💎 Rarity System" defaultExpanded>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {personalization.raritySystem.description}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {personalization.raritySystem.tiers.map((tier: string, i: number) => {
            const colors = [
              "default",
              "success",
              "info",
              "secondary",
              "warning",
            ] as const
            return <Chip key={i} label={tier} color={colors[i] || "default"} />
          })}
        </Box>
      </DocAccordion>

      <DocAccordion title="📦 Collectibles">
        <Card>
          <CardContent>
            <Typography variant="body2">
              {personalization.collectibles.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Example: {personalization.collectibles.example}
            </Typography>
          </CardContent>
        </Card>
      </DocAccordion>
    </DocSection>
  )
}
