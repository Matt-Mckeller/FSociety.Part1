import { Typography, Paper, Box, Chip, Stack, Card, CardContent, Grid } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';

const characterCards = [
  { name: 'StaticCharacter', emoji: '🧍', description: 'Character in static pose for transitions', usage: 'Section intros' },
  { name: 'CharacterForwardStanding', emoji: '🧑‍🎓', description: 'Character facing forward', usage: 'Welcome screens' },
  { name: 'CharacterCelebration1', emoji: '🎉', description: 'Celebration animation for achievements', usage: 'Level up, quest complete' },
  { name: 'CharacterCelebration2', emoji: '🥳', description: 'Alternate celebration animation', usage: 'Special milestones' },
  { name: 'CharacterPushingBar', emoji: '💪', description: 'Animated character pushing progress bar', usage: 'XP gain, loading' },
  { name: 'WalkingCharacter', emoji: '🏃', description: 'Animated walking character', usage: 'Transitions, journeys' },
];

const brandingCards = [
  { 
    name: 'Triple Dash', 
    icon: '━━━', 
    description: 'Signature 3-line dash element', 
    usage: 'Section transitions',
    visual: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, my: 1 }}>
        <Box sx={{ width: 40, height: 3, bgcolor: '#f472b6', borderRadius: 1 }} />
        <Box sx={{ width: 40, height: 3, bgcolor: '#f472b6', borderRadius: 1, opacity: 0.7 }} />
        <Box sx={{ width: 40, height: 3, bgcolor: '#f472b6', borderRadius: 1, opacity: 0.4 }} />
      </Box>
    )
  },
  { 
    name: 'ExpandingBar', 
    icon: '▬▬▬', 
    description: 'Animated expanding bar for transitions', 
    usage: 'Decorative reveals',
    visual: (
      <Box sx={{ my: 1, position: 'relative', height: 8 }}>
        <Box sx={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 60, 
          height: 8, 
          background: 'linear-gradient(90deg, transparent, #f472b6, transparent)',
          borderRadius: 1 
        }} />
      </Box>
    )
  },
  { 
    name: 'ExpandingBorderBox', 
    icon: '▢', 
    description: 'Box with animated expanding border', 
    usage: 'Content focus',
    visual: (
      <Box sx={{ 
        my: 1, 
        width: 40, 
        height: 30, 
        border: '2px solid #f472b6',
        borderRadius: 1,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 2,
          border: '1px dashed #f472b6',
          borderRadius: 0.5,
          opacity: 0.5
        }
      }} />
    )
  },
  { 
    name: 'ExpanseLoadingSpinner', 
    icon: '⟳', 
    description: 'Branded loading spinner', 
    usage: 'Loading states',
    visual: (
      <Box sx={{ 
        my: 1, 
        width: 30, 
        height: 30, 
        border: '3px solid #f0f0f0',
        borderTop: '3px solid #f472b6',
        borderRadius: '50%',
      }} />
    )
  },
];

const usageContexts = [
  { context: 'Section Transitions', description: 'Characters and branding elements animate between major sections', elements: ['StaticCharacter', 'Triple Dash', 'WalkingCharacter'] },
  { context: 'Level Up / XP Gain', description: 'Celebration animations and expanding bars reward progress', elements: ['CharacterCelebration1/2', 'ExpandingBar'] },
  { context: 'Loading States', description: 'Branded spinner maintains engagement during loads', elements: ['ExpanseLoadingSpinner', 'CharacterPushingBar'] },
  { context: 'Content Focus', description: 'Border animations draw attention to key content', elements: ['ExpandingBorderBox'] },
];

export default function DecorativePage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
        <Box sx={{ 
          bgcolor: '#f472b6', 
          borderRadius: 2, 
          p: 1.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(244, 114, 182, 0.4)'
        }}>
          <AutoAwesomeIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            Decorative Elements
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visual animations and branding elements that bring life to the presentation experience
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2.5, 
          mb: 4, 
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
          borderLeft: '4px solid #f472b6',
          borderRadius: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: '#be185d' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label="Slide Engine" 
            size="small" 
            sx={{ 
              bgcolor: '#f472b6', 
              color: 'white', 
              fontWeight: 600,
              mr: 0.5 
            }} 
          />
          <Chip 
            label="Lottie Animations" 
            size="small" 
            sx={{ 
              bgcolor: '#ec4899', 
              color: 'white', 
              fontWeight: 600 
            }} 
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 500 }}>
          React Context Dependencies:
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip 
            label="AnimationContext" 
            size="small" 
            variant="outlined" 
            sx={{ fontSize: '0.75rem', borderColor: '#f472b6', color: '#be185d' }} 
          />
          <Chip 
            label="ThemeContext" 
            size="small" 
            variant="outlined" 
            sx={{ fontSize: '0.75rem', borderColor: '#f472b6', color: '#be185d' }} 
          />
          <Chip 
            label="TransitionContext" 
            size="small" 
            variant="outlined" 
            sx={{ fontSize: '0.75rem', borderColor: '#f472b6', color: '#be185d' }} 
          />
        </Stack>
      </Paper>

      {/* Expanse Character Cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        🎭 Expanse Character Animations
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Animated character components from Storybook used for transitions and celebrations
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {characterCards.map((char) => (
          <Grid item xs={12} sm={6} md={4} key={char.name}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#f472b6',
                  boxShadow: '0 4px 12px rgba(244, 114, 182, 0.15)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box sx={{ 
                    fontSize: 28, 
                    width: 44, 
                    height: 44, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#fdf2f8',
                    borderRadius: 1.5
                  }}>
                    {char.emoji}
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {char.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {char.description}
                </Typography>
                <Chip 
                  label={char.usage} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#fce7f3', 
                    color: '#be185d', 
                    fontSize: '0.7rem',
                    fontWeight: 500 
                  }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Branding Elements Cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        ✨ Branding Elements
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Signature visual elements that reinforce the Expanse brand identity
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {brandingCards.map((item) => (
          <Grid item xs={12} sm={6} key={item.name}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#f472b6',
                  boxShadow: '0 4px 12px rgba(244, 114, 182, 0.15)',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.description}
                    </Typography>
                    <Chip 
                      label={item.usage} 
                      size="small" 
                      sx={{ 
                        bgcolor: '#fce7f3', 
                        color: '#be185d', 
                        fontSize: '0.7rem',
                        fontWeight: 500 
                      }} 
                    />
                  </Box>
                  <Box sx={{ 
                    ml: 2, 
                    p: 1.5, 
                    bgcolor: '#fafafa', 
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 60
                  }}>
                    {item.visual}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Typography Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        🔤 Typography
      </Typography>
      <Card 
        elevation={0}
        sx={{ 
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 2,
          mb: 4
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              fontSize: 24, 
              width: 44, 
              height: 44, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: '#fdf2f8',
              borderRadius: 1.5
            }}>
              Aa
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                TypographyResponsive
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Auto-scales text to viewport — useful for slide content
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Usage Context Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        📍 Usage Context
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        When and where decorative elements appear in the presentation flow
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {usageContexts.map((ctx) => (
          <Grid item xs={12} sm={6} key={ctx.context}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                height: '100%',
                bgcolor: '#fafafa',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.100'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: '#be185d' }}>
                {ctx.context}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {ctx.description}
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {ctx.elements.map((el) => (
                  <Chip 
                    key={el}
                    label={el} 
                    size="small" 
                    sx={{ 
                      fontSize: '0.65rem',
                      bgcolor: 'white',
                      border: '1px solid #e5e7eb'
                    }} 
                  />
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Related Features */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2.5, 
          mt: 4,
          bgcolor: '#f8fafc',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          🔗 Related Features
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Link href="/docs/features/theming" style={{ textDecoration: 'none' }}>
            <Chip 
              label="Theming & Styling" 
              size="small" 
              clickable
              sx={{ 
                bgcolor: '#ede9fe',
                color: '#7c3aed',
                fontWeight: 500,
                '&:hover': { bgcolor: '#ddd6fe' }
              }} 
            />
          </Link>
          <Link href="/docs/features/feedback" style={{ textDecoration: 'none' }}>
            <Chip 
              label="Feedback & Rewards" 
              size="small" 
              clickable
              sx={{ 
                bgcolor: '#fef3c7',
                color: '#d97706',
                fontWeight: 500,
                '&:hover': { bgcolor: '#fde68a' }
              }} 
            />
          </Link>
          <Link href="/docs/features/game-ui" style={{ textDecoration: 'none' }}>
            <Chip 
              label="Game UI Elements" 
              size="small" 
              clickable
              sx={{ 
                bgcolor: '#dbeafe',
                color: '#2563eb',
                fontWeight: 500,
                '&:hover': { bgcolor: '#bfdbfe' }
              }} 
            />
          </Link>
        </Stack>
      </Paper>
    </>
  );
}
