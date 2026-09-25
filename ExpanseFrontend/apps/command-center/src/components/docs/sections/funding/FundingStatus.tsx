/**
 * Funding Status Section
 *
 * Funding to date, paths, and investment reasons.
 * Migrated from DocsView.tsx renderFundingStatus()
 */

import { Typography, Card, CardContent, Grid } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { funding } from "../../../../data/docs"

export default function FundingStatus() {
  return (
    <DocSection title="Funding Status" icon="💰">
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Funding To Date
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Type:</strong> {funding.fundingToDate.type}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {funding.fundingToDate.description}
          </Typography>
          <Typography variant="h5" color="success.main">
            {funding.fundingToDate.estimatedValue}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {funding.fundingToDate.notes}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        📋 Funding Paths
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {funding.fundingPaths.map((path) => (
          <Grid item xs={12} sm={6} md={4} key={path.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {path.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {path.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        🌟 Top Reasons to Invest
      </Typography>
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
        {funding.investmentReasons.map((reason, i) => (
          <Card key={i}>
            <CardContent>
              <Typography variant="h6" color="primary">
                {reason.reason}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reason.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
