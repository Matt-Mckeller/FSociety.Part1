/**
 * Game Social Section
 *
 * Displays social features and recognition systems.
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

interface SocialFeature {
  name: string
  description?: string
  implementationDifficulty?: string
  value?: string
  types?: string[]
  features?: string[]
  restrictions?: string[]
  risks?: string[]
  considerations?: string[]
}

interface RecognitionType {
  type: string
  description: string
  feature?: string
}

export default function GameSocial() {
  const { social, recognition } = gameMechanics

  return (
    <DocSection title={`👥 ${social.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {social.description}
      </Typography>

      <DocAccordion title="💬 Social Features" defaultExpanded>
        <Grid container spacing={2}>
          {social.features.map((feature: SocialFeature, i: number) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {feature.name}
                    </Typography>
                    {feature.implementationDifficulty && (
                      <Chip
                        label={feature.implementationDifficulty}
                        size="small"
                        color={
                          feature.implementationDifficulty === "Hard"
                            ? "error"
                            : "default"
                        }
                      />
                    )}
                  </Box>
                  {feature.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {feature.description}
                    </Typography>
                  )}
                  {feature.value && (
                    <Chip
                      label={`Value: ${feature.value}`}
                      size="small"
                      color="success"
                      sx={{ mb: 1 }}
                    />
                  )}
                  {feature.types && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Types:
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {feature.types.map((type, j) => (
                          <li key={j}>
                            <Typography variant="caption">{type}</Typography>
                          </li>
                        ))}
                      </Box>
                    </Box>
                  )}
                  {feature.features && (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      {feature.features.map((f, j) => (
                        <Chip key={j} label={f} size="small" variant="outlined" />
                      ))}
                    </Box>
                  )}
                  {feature.restrictions && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      <Typography variant="caption">
                        <strong>Restrictions:</strong>{" "}
                        {feature.restrictions.join(", ")}
                      </Typography>
                    </Alert>
                  )}
                  {feature.risks && feature.risks.length > 0 && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      <Typography variant="caption">
                        <strong>Risks:</strong> {feature.risks.join("; ")}
                      </Typography>
                    </Alert>
                  )}
                  {feature.considerations && (
                    <Alert severity="info" sx={{ mt: 1 }}>
                      <Typography variant="caption">
                        {feature.considerations.join(" ")}
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DocAccordion>

      <DocAccordion title="🏅 Recognition System" defaultExpanded>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {recognition.description}
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {recognition.recognitionTypes.map(
            (rt: RecognitionType, i: number) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {rt.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {rt.description}
                    </Typography>
                    {rt.feature && (
                      <Typography
                        variant="caption"
                        color="primary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        Feature: {rt.feature}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Certificates
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2, mb: 2 }}>
          {recognition.certificates.map((cert: string, i: number) => (
            <li key={i}>
              <Typography variant="body2">{cert}</Typography>
            </li>
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary">
          Social Sharing: {social.socialSharing}
        </Typography>
      </DocAccordion>
    </DocSection>
  )
}
