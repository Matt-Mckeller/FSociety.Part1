/**
 * Monetization Purchases Section
 *
 * Displays real money purchase options.
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
import { monetization } from "../../../../data/docs"
import { DocSection } from "../../common"

interface PurchasableItem {
  category: string
  examples: string[]
}

export default function MonetizationPurchases() {
  const { realMoneyPurchases } = monetization

  return (
    <DocSection title={`🛒 ${realMoneyPurchases.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {realMoneyPurchases.description}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {realMoneyPurchases.purchasableItems.map(
          (item: PurchasableItem, i: number) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {item.category}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {item.examples.map((ex: string, j: number) => (
                      <Chip
                        key={j}
                        label={ex}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Alert severity="info">
        <Typography variant="body2">
          <strong>Philosophy:</strong> {realMoneyPurchases.philosophy}
        </Typography>
      </Alert>
    </DocSection>
  )
}
