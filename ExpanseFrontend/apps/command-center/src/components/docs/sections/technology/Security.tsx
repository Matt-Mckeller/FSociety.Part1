/**
 * Security Section
 *
 * Security compliance, authentication, and features.
 * Migrated from DocsView.tsx renderSecurity()
 */

import { Typography, Card, CardContent, Box, Chip, Grid } from "@mui/material"
import { DocSection } from "../../common"
import { technology } from "../../../../data/docs"

export default function Security() {
  return (
    <DocSection title="Security" icon="🔒">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                📋 Compliance
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {technology.security.compliance.map((item) => (
                  <Chip key={item} label={item} color="success" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🔐 Authentication
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {technology.security.authentication.map((item, i) => (
                  <Typography component="li" key={i} variant="body2">
                    {item}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🛡️ Security Features
              </Typography>
              <Grid container spacing={2}>
                {technology.security.features.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box
                      sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1 }}
                    >
                      <Typography variant="body2">{item}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}
