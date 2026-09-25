/**
 * Privacy Security Section
 *
 * Privacy and security information.
 * Migrated from DocsView.tsx renderPrivacySecurity()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { legal } from "../../../../data/docs"

export default function PrivacySecurity() {
  return (
    <DocSection title="Privacy & Security" icon="🔒">
      <Alert severity="info" sx={{ mb: 3 }}>
        {legal.overview.keyMessage}
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔐 Encryption
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>At Rest:</strong>{" "}
                {legal.privacySecurity.encryption.atRest}
              </Typography>
              <Typography variant="body2">
                <strong>In Transit:</strong>{" "}
                {legal.privacySecurity.encryption.inTransit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ☁️ Hosting
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Provider:</strong>{" "}
                {legal.privacySecurity.hosting.provider}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {legal.privacySecurity.hosting.features.map((f, i) => (
                  <Chip key={i} label={f} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🛡️ Data Protection
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Name Obscuring</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {legal.privacySecurity.dataProtection.nameObscuring}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Data Deletion</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {legal.privacySecurity.dataProtection.dataDeletion}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">DPA Required</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {legal.privacySecurity.dataProtection.dpaRequired}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 2, display: "block" }}
      >
        Reference:{" "}
        <a
          href={legal.privacySecurity.reference}
          target="_blank"
          rel="noopener noreferrer"
        >
          {legal.privacySecurity.reference}
        </a>
      </Typography>
    </DocSection>
  )
}
