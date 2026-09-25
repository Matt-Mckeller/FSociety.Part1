/**
 * Brand Presentation Section
 *
 * Displays presentation style and next generation format.
 */

import { Box, Typography, Card, CardContent, Chip } from "@mui/material"
import { expanseEduDocs } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function BrandPresentation() {
  const branding = (expanseEduDocs as any).branding

  if (!branding?.presentationStyle) {
    return (
      <DocSection title="🎬 Presentation Style">
        <Typography variant="body1" color="text.secondary">
          Presentation style data not available.
        </Typography>
      </DocSection>
    )
  }

  return (
    <DocSection title="🎬 Presentation Style">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Next generation presentation format and features.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {branding.presentationStyle.nextGeneration?.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Format:</strong>{" "}
            {branding.presentationStyle.nextGeneration?.format}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Purpose:</strong>{" "}
            {branding.presentationStyle.nextGeneration?.purpose}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600}>
            Features:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {branding.presentationStyle.nextGeneration?.features?.map(
              (feature: string, i: number) => (
                <Chip key={i} label={feature} color="success" />
              ),
            )}
          </Box>
        </CardContent>
      </Card>
    </DocSection>
  )
}
