import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import type { JSX } from "react";

export default function ExpanseServicesPage(): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 3,
        py: 8,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth={false} sx={{ width: "100%", maxWidth: 720 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="overline" sx={{
              color: "text.secondary"
            }}>
              Fresh Baseline
            </Typography>
            <Typography variant="h3" component="h1" sx={{
              fontWeight: 700
            }}>
              Expanse Services
            </Typography>
            <Typography variant="body1" sx={{
              color: "text.secondary"
            }}>
              This app has been reset to a minimal starter so new routes, demos, and shared package
              integrations can be rebuilt from a clean foundation.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
