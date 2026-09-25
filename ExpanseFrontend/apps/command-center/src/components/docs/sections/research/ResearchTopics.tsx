/**
 * Research Topics Section
 *
 * Research topics with findings.
 * Migrated from DocsView.tsx renderResearchTopics()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { research } from "../../../../data/docs"
import type { ResearchTopic } from "../../../../types/docs"

export default function ResearchTopics() {
  return (
    <DocSection title="Research Topics" icon="🔬">
      <Grid container spacing={3}>
        {(research.topics as ResearchTopic[]).map((topic) => (
          <Grid item xs={12} key={topic.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  {topic.icon} {topic.name}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {topic.findings.map((finding, i) => (
                    <Grid item xs={12} md={6} key={i}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "action.hover",
                          borderRadius: 1,
                          height: "100%",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                        >
                          {finding.title}
                        </Typography>
                        <Chip
                          label={finding.source}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {finding.summary}
                        </Typography>
                        <Alert
                          severity="info"
                          variant="outlined"
                          sx={{ mt: 1 }}
                        >
                          <Typography variant="caption">
                            <strong>Application:</strong> {finding.application}
                          </Typography>
                        </Alert>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
