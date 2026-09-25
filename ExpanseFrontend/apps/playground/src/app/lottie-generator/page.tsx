"use client"

import { useState } from "react"
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Stack,
  Chip,
  Tabs,
  Tab,
} from "@mui/material"
import {
  AutoAwesome,
  Brush,
  Settings,
  CheckCircle,
  Analytics,
} from "@mui/icons-material"
import GeneratorForm from "./components/GeneratorForm"
import AnimationPreview from "./components/AnimationPreview"
import AnalysisCard from "./components/AnalysisCard"
import type { LottieAnimation } from "./types"

export default function LottieGeneratorPage() {
  const [generatedAnimation, setGeneratedAnimation] =
    useState<LottieAnimation | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            🎨 Lottie Animation Generator
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Generate custom Lottie animations using AI with visual analysis
          </Typography>
        </Box>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left Column - Generator Form */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Generate
              </Typography>
              <GeneratorForm onGenerate={setGeneratedAnimation} />
            </Paper>
          </Grid>

          {/* Right Column - Preview & Analysis */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                sx={{ mb: 2 }}
              >
                <Tab label="Preview" icon={<Brush />} iconPosition="start" />
                <Tab
                  label="Analysis"
                  icon={<Analytics />}
                  iconPosition="start"
                  disabled={!generatedAnimation}
                />
              </Tabs>

              {activeTab === 0 && (
                <Box>
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    Preview
                  </Typography>
                  <AnimationPreview animationData={generatedAnimation} />
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    Visual Analysis & Feedback
                  </Typography>
                  <AnalysisCard animation={generatedAnimation} />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Info Section */}
        <Paper elevation={2} sx={{ mt: 3, p: 3 }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    ✍️
                  </Typography>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    1. Describe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Write a description of the animation you want or pick from
                    examples
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    🎨
                  </Typography>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    2. Generate & Preview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI generates the animation and you can preview it instantly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    📊
                  </Typography>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    3. Analyze & Improve
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get AI-powered visual feedback and improvement suggestions
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Features */}
        <Paper elevation={1} sx={{ mt: 3, p: 3, bgcolor: "primary.50" }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Features
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<CheckCircle />}
              label="AI-powered generation"
              size="small"
            />
            <Chip
              icon={<CheckCircle />}
              label="Visual quality analysis"
              size="small"
            />
            <Chip
              icon={<CheckCircle />}
              label="Improvement suggestions"
              size="small"
            />
            <Chip
              icon={<CheckCircle />}
              label="Color palette recommendations"
              size="small"
            />
            <Chip
              icon={<CheckCircle />}
              label="Animation enhancements"
              size="small"
            />
            <Chip
              icon={<CheckCircle />}
              label="Technical metrics"
              size="small"
            />
            <Chip
              icon={<CheckCircle />}
              label="Save to filesystem"
              size="small"
            />
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
