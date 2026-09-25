/**
 * Communication Notifications Section
 *
 * Displays notification types and delivery options.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { communication } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function CommNotifications() {
  const { notifications } = communication

  return (
    <DocSection title={`🔔 ${notifications.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {notifications.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                For Students
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {notifications.notificationTypes.students.map(
                  (n: string, i: number) => (
                    <li key={i}>
                      <Typography variant="body2">{n}</Typography>
                    </li>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                For Parents
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {notifications.notificationTypes.parents.map(
                  (n: string, i: number) => (
                    <li key={i}>
                      <Typography variant="body2">{n}</Typography>
                    </li>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                For Teachers
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {notifications.notificationTypes.teachers.map(
                  (n: string, i: number) => (
                    <li key={i}>
                      <Typography variant="body2">{n}</Typography>
                    </li>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Inbox Features
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {notifications.inboxFeatures.map((feat: string, i: number) => (
                  <Chip key={i} label={feat} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Delivery Options
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {notifications.deliveryOptions.map(
                  (opt: string, i: number) => (
                    <Chip key={i} label={opt} size="small" color="primary" />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}
