/**
 * Lottie Studio Home Page
 * Main wizard interface for processing Lottie animations
 */

import { Box, Container, Typography } from '@mui/material'
import { WizardContainer } from '@/components/wizard/WizardContainer'
import { Header } from '@/components/layout/Header'

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #a15bca 0%, #e1c2f5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Lottie Studio
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Transform your Lottie animations with AI-powered naming, metadata generation,
            and theme creation.
          </Typography>
        </Box>
        <WizardContainer />
      </Container>
    </Box>
  )
}
