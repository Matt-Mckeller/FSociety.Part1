'use client'

import { Box, Typography, Paper, Button, Stack, Chip } from '@mui/material'
import { PyramidLayout } from '../../components/layout/pyramid'
import { PyramidAppShell } from '../../components/layout'

export default function PyramidDemoPage() {
  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <PyramidLayout
        colorScheme="primary"
        elevation="subtle"
        corners={{
          show: true,
          size: 48,
          borderRadius: 12,
          animated: true,
        }}
        slots={{
          header: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                color: 'white',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                🎯 PYRAMID LAYOUT DEMO
              </Typography>
            </Box>
          ),
          footer: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                color: 'white',
              }}
            >
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Footer Area - Layer 1 (Outer)
              </Typography>
            </Box>
          ),
          leftNav: (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'white',
                gap: 1,
              }}
            >
              <Typography sx={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontSize: 10, opacity: 0.8 }}>
                NAV
              </Typography>
            </Box>
          ),
          rightNav: (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'white',
                gap: 1,
              }}
            >
              <Typography sx={{ writingMode: 'vertical-lr', textOrientation: 'mixed', fontSize: 10, opacity: 0.8 }}>
                ACTIONS
              </Typography>
            </Box>
          ),
          actionBar: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                color: 'white',
                gap: 2,
              }}
            >
              <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', fontSize: 10, py: 0 }}>
                Action 1
              </Button>
              <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', fontSize: 10, py: 0 }}>
                Action 2
              </Button>
            </Box>
          ),
          statusBar: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                color: 'white',
                px: 2,
              }}
            >
              <Chip label="Status: Active" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', height: 18, fontSize: 10 }} />
              <Typography variant="caption" sx={{ opacity: 0.8, fontSize: 10 }}>
                Layer 2 (Middle)
              </Typography>
            </Box>
          ),
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Paper elevation={0} sx={{ p: 4, maxWidth: 600, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Pyramid Layout
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              This is the primary content area (Layer 3 - Inner). The layout features 3 nested elevation layers 
              with decorative corner triangles pointing inward.
            </Typography>
            
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
              <Chip label="Layer 1: Outer" color="primary" />
              <Chip label="Layer 2: Middle" color="secondary" />
              <Chip label="Layer 3: Inner" variant="outlined" />
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" gutterBottom>
                Features:
              </Typography>
              <Stack spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">✓ 3 nested elevation layers</Typography>
                <Typography variant="body2" color="text.secondary">✓ Rounded corner triangles</Typography>
                <Typography variant="body2" color="text.secondary">✓ Border slots for navigation/actions</Typography>
                <Typography variant="body2" color="text.secondary">✓ Theme-aware colors</Typography>
                <Typography variant="body2" color="text.secondary">✓ Responsive design</Typography>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </PyramidLayout>
    </Box>
  )
}
