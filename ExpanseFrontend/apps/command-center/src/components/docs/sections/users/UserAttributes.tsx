/**
 * User Attributes Section
 *
 * User persona attributes and parent insights.
 * Migrated from DocsView.tsx renderUserAttributes()
 */

import {
  Typography,
  Card,
  CardContent,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { users } from "../../../../data/docs"

export default function UserAttributes() {
  return (
    <DocSection title="User Persona Attributes" icon="🎯">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Characteristics of potential users across the education ecosystem
      </Typography>
      <Grid container spacing={1}>
        {users.userPersonaAttributes.map((attr, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="body2">• {attr}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        👨‍👩‍👧 Parent Insights
      </Typography>
      <Alert severity="warning" sx={{ mb: 2 }}>
        Source: {users.parentInsights.source}
      </Alert>
      {users.parentInsights.challenges.map((challenge, i) => (
        <Card key={i} sx={{ mb: 1 }}>
          <CardContent sx={{ py: 1.5 }}>
            <Typography variant="body2">• {challenge}</Typography>
          </CardContent>
        </Card>
      ))}
    </DocSection>
  )
}
