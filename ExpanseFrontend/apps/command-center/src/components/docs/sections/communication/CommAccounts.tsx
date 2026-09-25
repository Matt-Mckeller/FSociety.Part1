/**
 * Communication Accounts Section
 *
 * Displays user account types and privacy controls.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { communication } from "../../../../data/docs"
import { DocSection } from "../../common"

interface UserType {
  type: string
  features: string[]
}

export default function CommAccounts() {
  const { userAccounts } = communication

  return (
    <DocSection title={`👤 ${userAccounts.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {userAccounts.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Account Features
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {userAccounts.accountFeatures.map(
                  (feat: string, i: number) => (
                    <Chip
                      key={i}
                      label={feat}
                      size="small"
                      variant="outlined"
                    />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Privacy Controls
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {userAccounts.privacyControls.map(
                  (ctrl: string, i: number) => (
                    <Chip
                      key={i}
                      label={ctrl}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        User Types
      </Typography>
      <Grid container spacing={2}>
        {userAccounts.userTypes.map((user: UserType, i: number) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {user.type}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, mt: 1 }}>
                  {user.features.map((feat: string, j: number) => (
                    <li key={j}>
                      <Typography variant="caption">{feat}</Typography>
                    </li>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
