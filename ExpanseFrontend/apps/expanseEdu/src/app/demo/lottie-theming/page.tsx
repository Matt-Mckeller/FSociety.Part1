"use client"

import { Box, Container, Typography, Paper, Grid } from "@mui/material"
import dynamic from "next/dynamic"

// Dynamic import to prevent SSR issues with lottie-web
const AngelWingsHalo = dynamic(
  () =>
    import("expanse.dynamicAssets").then((mod) => ({
      default: mod.AngelWingsHalo,
    })),
  { ssr: false },
)

/**
 * Test page for verifying Lottie custom theming system
 *
 * This page displays the AngelWingsHalo animation to verify:
 * 1. Custom theme config is loading correctly
 * 2. Halo gradient uses palette.primary.dark/main/light
 * 3. Animation works across all MUI themes
 */
export default function LottieThemingTestPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom align="center">
        🎨 Lottie Custom Theming Test
      </Typography>

      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        This page tests the new custom theme configuration system for Lottie
        animations. The AngelWingsHalo halo gradient should theme using
        primary.dark, primary.main, and primary.light.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          AngelWingsHalo with Custom Theme Config
        </Typography>

        <Typography
          variant="body2"
          paragraph
          align="center"
          color="text.secondary"
        >
          The halo gradient should automatically match the current MUI theme's
          primary colors.
          <br />
          Wings remain white (not themed). Halo uses custom color mappings.
        </Typography>

        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <AngelWingsHalo width="400px" />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              ✅ Expected Behavior
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" gutterBottom>
                Halo inner glow: Uses <code>primary.dark</code>
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Halo mid-tone: Uses <code>primary.main</code>
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Halo outer glow: Uses <code>primary.light</code>
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Wings: Remain white (not themed)
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Auto-detects theme from MUI palette
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              🧪 Testing Instructions
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" gutterBottom>
                Open browser console
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Use theme switcher to change themes
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Verify halo colors match primary palette
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Test all 9 themes (purple, blue, red, orange, green ×
                light/dark)
              </Typography>
              <Typography component="li" variant="body2" gutterBottom>
                Check console for "Using custom theme config" messages
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          📁 Implementation Files
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 2, fontFamily: "monospace", fontSize: "0.875rem" }}
        >
          <Typography component="li" variant="body2" gutterBottom>
            <strong>Config:</strong>{" "}
            packages/dynamicAssets/lotties/AngelWingsHalo.theme.ts
          </Typography>
          <Typography component="li" variant="body2" gutterBottom>
            <strong>Registry:</strong>{" "}
            packages/dynamicAssets/lotties/lottieThemeRegistry.ts
          </Typography>
          <Typography component="li" variant="body2" gutterBottom>
            <strong>Utility:</strong>{" "}
            packages/dynamicAssets/theming/lottieTheming.ts
          </Typography>
          <Typography component="li" variant="body2" gutterBottom>
            <strong>Component:</strong>{" "}
            packages/dynamicAssets/lotties/AngelWingsHalo.tsx
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
