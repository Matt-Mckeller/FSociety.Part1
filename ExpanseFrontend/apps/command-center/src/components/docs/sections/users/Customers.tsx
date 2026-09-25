/**
 * Customers Section
 *
 * Customer types and their characteristics.
 * Migrated from DocsView.tsx renderCustomers()
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
import { users } from "../../../../data/docs"
import type { CustomerType } from "../../../../types/docs"

export default function Customers() {
  return (
    <DocSection title="Customer Types" icon="👥">
      <Alert severity="info" sx={{ mb: 3 }}>
        {users.overview.summary}
      </Alert>
      <Grid container spacing={3}>
        {(users.customers as CustomerType[]).map((customer) => (
          <Grid item xs={12} md={6} key={customer.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Typography variant="h5">{customer.icon}</Typography>
                  <Typography variant="h6" color="primary">
                    {customer.type}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  <strong>Role:</strong> {customer.role}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Benefits:
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}
                >
                  {customer.benefits.map((b, i) => (
                    <Chip key={i} label={b} size="small" variant="outlined" />
                  ))}
                </Box>
                <Typography variant="body2">
                  <strong>Motivation:</strong> {customer.motivation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
