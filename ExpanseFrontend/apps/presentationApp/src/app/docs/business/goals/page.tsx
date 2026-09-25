import { Typography, Box, Paper, Stack, Divider, Chip, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';

const primaryGoals = [
  {
    goal: 'Gamified Learning Experience',
    description: 'Combine presentation content with gamification (XP, coins, quests, achievements) to increase engagement and retention',
  },
  {
    goal: 'AI-Powered Personalization',
    description: 'Provide 140+ AI actions that transform, supplement, and reinforce content for personalized learning',
  },
  {
    goal: 'Real-Time Collaboration',
    description: 'Enable presenter-audience sync, live reactions, cursor sharing, and screen sharing via WebSockets',
  },
  {
    goal: 'Accessibility & Inclusion',
    description: 'Support content variants for ADHD, autism, dyslexia, and other learning needs through layered content system',
  },
  {
    goal: 'Modular & Reusable',
    description: 'Build highly modular components documented in Storybook for reuse across Expanse products',
  },
];

const successCriteria = [
  'Users can complete presentations with clear progress tracking',
  'Gamification elements (XP, coins, quests) drive continued engagement',
  'AI actions measurably improve comprehension (tracked via quiz performance)',
  'Accessibility modes are functional and user-selectable',
  'Real-time presenter mode works reliably with <100ms sync delay',
  'Content can be authored once and served in multiple variants (audience, accessibility, language)',
];

export default function GoalsPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Goals
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Project objectives and success criteria for PresentationApp.
        </Typography>
      </Box>

      {/* Primary Goals */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
        Primary Goals
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        {primaryGoals.map((item, index) => (
          <Paper 
            key={item.goal}
            variant="outlined" 
            sx={{ 
              p: 2.5, 
              borderLeft: '4px solid #1565c0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Box 
              sx={{ 
                width: 28, 
                height: 28, 
                borderRadius: '50%', 
                bgcolor: '#1565c0', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '0.875rem',
                flexShrink: 0,
              }}
            >
              {index + 1}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {item.goal}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {item.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Success Criteria */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Success Criteria
      </Typography>
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={1.5}>
          {successCriteria.map((criterion) => (
            <Box key={criterion} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20, mt: 0.25 }} />
              <Typography variant="body1">{criterion}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
