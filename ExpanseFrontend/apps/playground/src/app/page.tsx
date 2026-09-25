"use client"

import { Box, Container, Typography, Button } from "@mui/material"
import Link from "next/link"

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        🎮 Expanse Playground
      </Typography>

      <Typography variant="h5" paragraph align="center" color="text.secondary">
        Testing ground for Expanse components and features
      </Typography>

      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          href="/lottie-gallery"
          variant="contained"
          size="large"
          sx={{ minWidth: 300 }}
        >
          🎨 Lottie Animation Gallery
        </Button>

        <Button
          component={Link}
          href="/lottie-theming"
          variant="contained"
          size="large"
          sx={{ minWidth: 300 }}
        >
          🎭 Lottie Theming Demo
        </Button>

        <Button
          component={Link}
          href="/lottie-generator"
          variant="contained"
          size="large"
          sx={{ minWidth: 300 }}
        >
          🤖 AI Lottie Generator
        </Button>

        <Button
          component={Link}
          href="/lottie-naming-tool"
          variant="contained"
          size="large"
          sx={{ minWidth: 300 }}
        >
          🏷️ Lottie Naming Tool
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          All tools ready to use!
        </Typography>
      </Box>

      <Box sx={{ mt: 8, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available Demos & Tools:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" gutterBottom>
            <Link
              href="/lottie-gallery"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <strong>/lottie-gallery</strong> - Browse and preview all Lottie
              animations with filtering and controls
            </Link>
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            <Link
              href="/lottie-theming"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <strong>/lottie-theming</strong> - Advanced theming system with
              live preview and theme variants
            </Link>
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            <Link
              href="/lottie-generator"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <strong>/lottie-generator</strong> - AI-powered Lottie animation
              generator with visual analysis
            </Link>
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            <Link
              href="/lottie-naming-tool"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <strong>/lottie-naming-tool</strong> - Intelligent component
              naming tool for Lottie files
            </Link>
          </Typography>
          <Typography component="li" variant="body1" gutterBottom>
            <Link
              href="/logo-animation"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <strong>/logo-animation</strong> - Explore animation options for
              ExpanseLogoV3 moon absorption effect
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            💡 Quick Tips:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2, mb: 0 }}>
            <li>All tools support real-time preview</li>
            <li>Theming system works with custom colors</li>
            <li>Generator uses Claude AI for intelligent creation</li>
            <li>Naming tool helps organize complex animations</li>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
