/**
 * Further Reading Section
 *
 * Displays academic studies, topics, and recommended books.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface AcademicStudy {
  title: string
  authors?: string
  publication?: string
  keyFindings: string
}

export default function FurtherReading() {
  const { furtherReading } = researchExtensions

  return (
    <DocSection title={`📚 ${furtherReading.title}`}>
      <Typography variant="h6" gutterBottom>
        Academic Studies
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {furtherReading.academicStudies.map(
          (study: AcademicStudy, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {study.title}
                  </Typography>
                  {study.authors && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Authors: {study.authors}
                    </Typography>
                  )}
                  {study.publication && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Publication: {study.publication}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {study.keyFindings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Topics to Explore
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {furtherReading.topics.map((t: string, i: number) => (
                  <Chip key={i} label={t} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Recommended Books
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {furtherReading.books.map((b: string, i: number) => (
                  <li key={i}>
                    <Typography variant="body2">{b}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}
