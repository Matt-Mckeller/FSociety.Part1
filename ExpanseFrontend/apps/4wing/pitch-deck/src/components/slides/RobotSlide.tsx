'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import LightModeIcon from '@mui/icons-material/LightMode';
import WifiIcon from '@mui/icons-material/Wifi';

const specs = [
  {
    icon: <MicIcon sx={{ fontSize: 24 }} />,
    title: 'Omnidirectional Mic',
    description: 'Noise-canceling for clear transcription',
  },
  {
    icon: <VideocamIcon sx={{ fontSize: 24 }} />,
    title: '1080p Camera',
    description: 'Wide-angle for nonverbal analysis',
  },
  {
    icon: <LightModeIcon sx={{ fontSize: 24 }} />,
    title: 'Status LEDs',
    description: 'RGB indicators for device state',
  },
  {
    icon: <WifiIcon sx={{ fontSize: 24 }} />,
    title: 'Wireless',
    description: 'WiFi + Bluetooth connectivity',
  },
];

const statusLights = [
  { color: '#22C55E', label: 'Idle / Ready' },
  { color: '#3B82F6', label: 'Recording' },
  { color: '#F59E0B', label: 'Processing' },
  { color: '#EF4444', label: 'Needs Attention' },
  { color: '#6B7280', label: 'Privacy Mode' },
];

export default function RobotSlide() {
  return (
    <SlideLayout background="gradient">
      <Grid container spacing={3} alignItems="center" sx={{ maxWidth: 960, width: '100%' }}>
        {/* Robot Visual */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Robot placeholder visualization */}
            <Box
              className="animate-float"
              sx={{
                width: 180,
                height: 210,
                borderRadius: '40% 40% 50% 50%',
                background: 'linear-gradient(180deg, #7C3AED 0%, #5B21B6 50%, #3B0D7A 100%)',
                boxShadow: '0 20px 50px rgba(124, 58, 237, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                border: '2px solid rgba(167, 139, 250, 0.5)',
              }}
            >
              {/* Eyes */}
              <Box sx={{ display: 'flex', gap: 2.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #A78BFA 60%, #7C3AED 100%)',
                    boxShadow: '0 0 20px rgba(167, 139, 250, 0.8)',
                  }}
                />
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #A78BFA 60%, #7C3AED 100%)',
                    boxShadow: '0 0 20px rgba(167, 139, 250, 0.8)',
                  }}
                />
              </Box>
              {/* Smile */}
              <Box
                sx={{
                  width: 40,
                  height: 16,
                  borderRadius: '0 0 20px 20px',
                  border: '3px solid rgba(255, 255, 255, 0.8)',
                  borderTop: 'none',
                }}
              />
              {/* Recording indicator */}
              <Box
                className="animate-pulse"
                sx={{
                  position: 'absolute',
                  top: 14,
                  right: 20,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#3B82F6',
                  boxShadow: '0 0 15px #3B82F6',
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Chip
            label="Companion Robot"
            sx={{
              mb: 2,
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.8rem',
            }}
          />

          <Typography
            variant="h3"
            sx={{
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Friendly & Non-Intrusive
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 2, maxWidth: 420, fontSize: '0.85rem' }}
          >
            A calming presence that reduces discomfort of being recorded.
            The robot is <strong>passive</strong>—it never speaks or interrupts sessions.
          </Typography>

          {/* Specs */}
          <Grid container spacing={1.5} sx={{ mb: 2 }}>
            {specs.map((spec, i) => (
              <Grid size={{ xs: 6 }} key={i}>
                <Card
                  sx={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(124, 58, 237, 0.15)',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#FFFFFF',
                      boxShadow: '0 6px 20px rgba(124, 58, 237, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ color: 'primary.main', mb: 0.5 }}>
                      {spec.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                      {spec.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                      {spec.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Status lights */}
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
            Status Indicators
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {statusLights.map((status, i) => (
              <Chip
                key={i}
                label={status.label}
                size="small"
                sx={{
                  background: `${status.color}20`,
                  border: `1px solid ${status.color}50`,
                  color: status.color,
                  '&::before': {
                    content: '""',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: status.color,
                    marginRight: 1,
                  },
                }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </SlideLayout>
  );
}
